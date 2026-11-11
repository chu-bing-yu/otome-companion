/**
 * 应用内核：单一 state + subscribe + actions。
 * 业务层只往这里打事件，所有数值变化都经 core/vitals.js#applyEvent。
 */

import { createHost } from '../services/host.js';
import { createStore } from '../services/store.js';
import { createDialogue } from '../services/dialogue.js';
import { compressImage } from '../services/image.js';
import { createRenderer } from '../render/index.js';

import { mergeSettings, patchSettings, charNameOf } from '../core/settings.js';
import { normalizeVitals, applyEvent, levelOf } from '../core/vitals.js';
import {
  restore, createSession, pause as pauseSession, resume as resumeSession,
  complete as completeSession, abort as abortSession, isExpired, nextRound, STATUS
} from '../core/session.js';
import {
  normalizeZones, canTap, pickZoneLine, fallbackTapLine, presetZones
} from '../core/touch.js';
import { normalizeWardrobe, activeOutfit, upsertOutfit, removeOutfit, normalizeOutfit } from '../core/wardrobe.js';
import { normalizeScenes, activeScene, upsertScene, removeScene, normalizeScene } from '../core/scenes.js';
import { normalizeProps, upsertProp, removeProp, markGiven, giftLine, normalizeProp } from '../core/props.js';
import { normalizeLogs, appendLog, groupByDay, recentLogs } from '../core/logs.js';
import { normalizeMemories, appendMemory, removeMemory, hasKind } from '../core/memories.js';
import { normalizeAssetIndex, resolveAssetSrc, makeAssetId, refKind, refId } from '../core/assets.js';
import { numericDelta, firstOf } from '../core/commands.js';
import { dayKey, fmtDuration } from '../core/format.js';
import { pickFallback } from '../core/prompts.js';

var TICK_MS = 1000;
var CHAT_LIMIT = 60;
var BUBBLE_MS = 4600;
var TAP_AI_COOLDOWN = 6000;

function createState(initial) {
  var state = initial;
  var subs = new Set();
  return {
    get: function () { return state; },
    set: function (patch) {
      var keys = Object.keys(patch);
      state = Object.assign({}, state, patch);
      subs.forEach(function (fn) {
        try { fn(state, keys); } catch (e) { console.error('[otome-companion] 状态更新失败', e); }
      });
    },
    subscribe: function (fn) {
      subs.add(fn);
      return function () { subs.delete(fn); };
    },
    clearSubs: function () { subs.clear(); }
  };
}

function makeMsgId(at) {
  return 'msg_' + String(at).toString(36) + Math.random().toString(36).slice(2, 5);
}

function normalizeChat(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.filter(function (m) {
    return m && (m.role === 'user' || m.role === 'char') && typeof m.text === 'string';
  }).slice(-CHAT_LIMIT).map(function (m) {
    return {
      id: String(m.id || makeMsgId(Number(m.at) || Date.now())),
      role: m.role,
      text: String(m.text).slice(0, 400),
      at: Number(m.at) || 0
    };
  });
}

export async function createApp(opts) {
  var host = createHost(opts.roche);
  var store = createStore(host);

  var saved = await store.loadAll();
  var settings = mergeSettings(saved.settings);
  var energyMax = settings.energyMax;
  var vitals = normalizeVitals(saved.vitals, Date.now(), energyMax);
  var session = saved.session ? restore(saved.session, Date.now()) : null;
  var wardrobe = normalizeWardrobe(saved.wardrobe);
  var scenes = normalizeScenes(saved.scenes);
  var props = normalizeProps(saved.props);
  var zones = normalizeZones(saved.zones);
  var logs = normalizeLogs(saved.logs);
  var memories = normalizeMemories(saved.memories);
  var chat = normalizeChat(saved.chat);
  var assetIndex = normalizeAssetIndex(saved.assetIndex);

  if (!zones.length) zones = presetZones();

  var characters = await host.character.list();
  var character = null;
  if (settings.characterId) {
    character = characters.filter(function (c) { return c.id === settings.characterId; })[0] || null;
  }
  if (!character && characters.length) character = characters[0];

  var persona = await host.persona.active();

  // 启动时只加载当前用到的图，其余懒加载
  var bootIds = [];
  var outfit = activeOutfit(wardrobe, settings.outfitId);
  var scene = activeScene(scenes, settings.sceneId);
  [outfit && outfit.ref, scene && scene.ref].forEach(function (ref) {
    if (refKind(ref) === 'local') bootIds.push(refId(ref));
  });
  var assets = await store.loadAssetData(bootIds);

  var state = createState({
    now: Date.now(),
    route: 'stage',
    sheet: '',
    drawer: '',
    settings: settings,
    vitals: vitals,
    session: session,
    wardrobe: wardrobe,
    outfitId: outfit ? outfit.id : '',
    scenes: scenes,
    sceneId: scene ? scene.id : '',
    props: props,
    zones: zones,
    logs: logs,
    memories: memories,
    chat: chat,
    assets: assets,
    assetIndex: assetIndex,
    character: character,
    characters: characters,
    persona: persona,
    bubble: null,
    statusCardFolded: false,
    aiBusy: false,
    onboard: !outfit || !outfit.ref
  });

  var renderer = null;
  var stagerEl = null;
  var bubbleTimer = null;
  var saveTick = 0;
  var lastTapAI = 0;
  var ticker = null;
  var destroyed = false;
  var expression = 'calm';

  /* ---------------- 工具 ---------------- */

  function get() { return state.get(); }

  function set(patch) {
    if (destroyed) return;
    state.set(patch);
  }

  function persist(which, value) {
    store.save(which, value);
  }

  function nameOf() {
    return charNameOf(get().settings, get().character);
  }

  function pushLog(kind, text, at) {
    var next = appendLog(get().logs, { at: at || Date.now(), kind: kind, text: text });
    set({ logs: next });
    persist('logs', next);
    return next;
  }

  function pushMemory(entry) {
    var next = appendMemory(get().memories, Object.assign({
      sceneRef: currentSceneRef(),
      outfitRef: currentOutfitRef()
    }, entry));
    set({ memories: next });
    persist('memories', next);
    return next;
  }

  function currentOutfitRef() {
    var o = activeOutfit(get().wardrobe, get().outfitId);
    return o ? o.ref : '';
  }

  function currentSceneRef() {
    var s = activeScene(get().scenes, get().sceneId);
    return s ? s.ref : '';
  }

  function applyVitals(event) {
    var result = applyEvent(get().vitals, event, Date.now());
    set({ vitals: result.vitals });
    saveTick = 0;
    persist('vitals', result.vitals);

    if (result.note === 'levelup') {
      pushLog('level', '升到了 LV.' + levelOf(result.vitals));
      pushMemory({
        at: Date.now(),
        kind: 'level',
        title: 'LV.' + levelOf(result.vitals),
        text: '默契到了新的高度。',
        tint: '#1B2230'
      });
    }
    if (result.note === 'tired') {
      showBubble('……有点累了。陪我坐一会儿吧。');
    }
    return result;
  }

  function showBubble(text, kind) {
    if (!text) return;
    if (bubbleTimer) clearTimeout(bubbleTimer);
    var at = Date.now();
    set({ bubble: { text: text, at: at, kind: kind || 'say' } });
    bubbleTimer = setTimeout(function () {
      bubbleTimer = null;
      if (!destroyed) set({ bubble: null });
    }, BUBBLE_MS);
  }

  function clearBubble() {
    if (bubbleTimer) clearTimeout(bubbleTimer);
    bubbleTimer = null;
    set({ bubble: null });
  }

  /* ---------------- 舞台同步 ---------------- */

  function sceneSrc() {
    var sc = activeScene(get().scenes, get().sceneId);
    return sc ? resolveAssetSrc(sc.ref, { assets: get().assets }) : '';
  }

  function portraitSrc() {
    var o = activeOutfit(get().wardrobe, get().outfitId);
    return o ? resolveAssetSrc(o.ref, { assets: get().assets }) : '';
  }

  function syncRenderer() {
    if (!renderer) return;
    var s = get();
    var sc = activeScene(s.scenes, s.sceneId);
    renderer.setOptions({
      neck: s.settings.neck,
      motionScale: s.settings.motionScale,
      breath: s.settings.breath,
      lookFollow: s.settings.lookFollow,
      anchor: { x: s.settings.anchorX, y: s.settings.anchorY },
      fit: s.settings.portraitFit
    });
    renderer.setScene(sc, sceneSrc());
    renderer.setPortrait(portraitSrc());
  }

  function attachStage(el) {
    stagerEl = el;
    if (renderer) renderer.destroy();
    renderer = createRenderer({ mount: el, model: { kind: 'pseudo' } });
    syncRenderer();
    return renderer;
  }

  function detachStage() {
    if (renderer) {
      renderer.destroy();
      renderer = null;
    }
    stagerEl = null;
  }

  /* ---------------- 素材 ---------------- */

  async function ensureAssets(refs) {
    var ids = [];
    (refs || []).forEach(function (ref) {
      if (refKind(ref) === 'local') {
        var id = refId(ref);
        if (!get().assets[id]) ids.push(id);
      }
    });
    if (!ids.length) return;
    var loaded = await store.loadAssetData(ids);
    set({ assets: Object.assign({}, get().assets, loaded) });
  }

  async function addLocalAsset(file, slot, name) {
    var res = await compressImage(file);
    var id = makeAssetId();
    await store.putAsset({ id: id, dataUrl: res.dataUrl });
    var index = Object.assign({}, get().assetIndex);
    index[id] = { name: name || '图片', slot: slot || 'portrait', w: res.w, h: res.h, at: Date.now() };
    var nextAssets = Object.assign({}, get().assets);
    nextAssets[id] = res.dataUrl;
    set({ assetIndex: index, assets: nextAssets });
    persist('assetIndex', index);
    return 'local:' + id;
  }

  async function removeAsset(id) {
    var index = Object.assign({}, get().assetIndex);
    delete index[id];
    var nextAssets = Object.assign({}, get().assets);
    delete nextAssets[id];
    set({ assetIndex: index, assets: nextAssets });
    persist('assetIndex', index);
    await store.removeAsset(id);
  }

  /* ---------------- 对话上下文 ---------------- */

  var dialogue = createDialogue({
    host: host,
    getContext: function () {
      var s = get();
      var sc = activeScene(s.scenes, s.sceneId);
      var o = activeOutfit(s.wardrobe, s.outfitId);
      return {
        charName: nameOf(),
        userName: (s.persona && (s.persona.name || s.persona.handle)) || '你',
        tone: s.settings.aiTone,
        sceneName: sc ? sc.name : '夜色书房',
        outfitName: o ? o.name : '默认装扮',
        energy: s.vitals.energy,
        energyMax: s.vitals.energyMax,
        affinity: s.vitals.affinity,
        rounds: s.vitals.rounds,
        recent: recentLogs(s.logs, 4).map(function (l) { return l.text; })
      };
    }
  });

  function applyCommands(commands) {
    var motion = firstOf(commands, 'motion');
    var expr = firstOf(commands, 'expr');
    if (motion && renderer) renderer.playMotion(motion);
    if (expr && renderer) {
      expression = expr;
      renderer.setExpression(expr);
    }
    var delta = numericDelta(commands);
    if (delta.affinity || delta.energy) {
      var v = get().vitals;
      var next = normalizeVitals(v, Date.now(), v.energyMax);
      next.affinity = Math.max(0, Math.min(9999, next.affinity + delta.affinity));
      next.energy = Math.max(0, Math.min(next.energyMax, next.energy + delta.energy));
      set({ vitals: next });
      persist('vitals', next);
    }
  }

  /* ---------------- 点触 ---------------- */

  var tapLog = {};

  function tapAt(zone, point, clientX, clientY) {
    var now = Date.now();
    if (renderer) renderer.press(clientX, clientY);

    if (zone && !canTap(zone, now, tapLog[zone.id])) {
      return { ok: false, reason: 'cooldown' };
    }
    if (zone) tapLog[zone.id] = now;

    applyVitals({ type: 'tap' });

    var fallback = zone ? (pickZoneLine(zone) || fallbackTapLine(zone)) : pickFallback('tap', Math.random());
    showBubble(fallback);
    pushLog('tap', zone ? '碰了碰' + zone.name : '轻轻碰了一下');

    if (!zone || !zone.useAI) return { ok: true, source: 'local' };

    if (!get().settings.aiEnabled) return { ok: true, source: 'ai_off' };
    if (now - lastTapAI < TAP_AI_COOLDOWN) return { ok: true, source: 'throttle' };
    lastTapAI = now;

    set({ aiBusy: true });
    dialogue.react(zone, '').then(function (result) {
      set({ aiBusy: false });
      if (destroyed) return;
      if (!result.ok) return;
      showBubble(result.text);
      applyCommands(result.commands);
    }).catch(function () {
      set({ aiBusy: false });
    });

    return { ok: true, source: 'ai' };
  }

  /* ---------------- 通讯 ---------------- */

  async function sendChat(text) {
    var value = String(text || '').trim().slice(0, 300);
    if (!value) return { ok: false, reason: 'empty' };
    if (get().aiBusy) return { ok: false, reason: 'busy' };

    var now = Date.now();
    var list = get().chat.concat([{ id: makeMsgId(now), role: 'user', text: value, at: now }]).slice(-CHAT_LIMIT);
    set({ chat: list, aiBusy: true });
    persist('chat', list);

    var history = list.slice(0, -1).map(function (m) {
      return { role: m.role === 'user' ? 'user' : 'char', text: m.text };
    });

    var result = await dialogue.chat(value, history);
    if (destroyed) return result;

    set({ aiBusy: false });

    if (!result.ok) {
      var fallback = pickFallback(result.reason === 'no_api' ? 'ai_off' : 'chat_empty', Math.random());
      var fbList = get().chat.concat([
        { id: makeMsgId(Date.now()), role: 'char', text: fallback, at: Date.now() }
      ]).slice(-CHAT_LIMIT);
      set({ chat: fbList });
      persist('chat', fbList);
      return { ok: false, reason: result.reason };
    }

    var next = get().chat.concat([
      { id: makeMsgId(Date.now()), role: 'char', text: result.text, at: Date.now() }
    ]).slice(-CHAT_LIMIT);
    set({ chat: next });
    persist('chat', next);

    applyCommands(result.commands);
    applyVitals({ type: 'chat' });
    pushLog('chat', value.slice(0, 30));
    return result;
  }

  /* ---------------- 专注 ---------------- */

  function startFocus() {
    var s = get().settings;
    var v = get().vitals;
    var sess = createSession({
      totalMs: s.focusMinutes * 60000,
      round: 1,
      rounds: s.focusRounds,
      taskLabel: s.taskLabel
    }, Date.now());
    set({ session: sess, route: 'focus' });
    persist('session', sess);
    return sess;
  }

  function pauseFocus() {
    var sess = get().session;
    if (!sess) return;
    var next = pauseSession(sess, Date.now());
    set({ session: next });
    persist('session', next);
  }

  function resumeFocus() {
    var sess = get().session;
    if (!sess) return;
    var next = resumeSession(sess, Date.now());
    set({ session: next });
    persist('session', next);
  }

  function abortFocus() {
    var sess = get().session;
    if (!sess) return;
    applyVitals({ type: 'focusAbort' });
    set({ session: abortSession(sess, Date.now()) });
    persist('session', null);
    pushLog('focus', '中止了一轮专注');
  }

  function finishRound(now) {
    var sess = get().session;
    if (!sess) return;
    applyVitals({ type: 'focusRound', ms: sess.totalMs });
    pushLog('focus', '完成第 ' + sess.round + ' / ' + sess.rounds + ' 轮专注');
    pushMemory({
      at: now,
      kind: 'focus',
      title: '第 ' + sess.round + ' 轮专注',
      text: (sess.taskLabel || '一起安静了一会儿') + ' · ' + Math.round(sess.totalMs / 60000) + ' 分钟',
      tint: '#121722'
    });

    var isLast = sess.round >= sess.rounds;
    var nextInfo = nextRound(sess);
    var nextSess = createSession({
      kind: nextInfo.kind,
      totalMs: nextInfo.kind === 'break' ? get().settings.breakMinutes * 60000 : get().settings.focusMinutes * 60000,
      round: nextInfo.round,
      rounds: sess.rounds,
      taskLabel: get().settings.taskLabel
    }, now);

    // 保持"当前会话已结束"的状态给结算层看，同时把下一轮备好
    var done = completeSession(sess, now);
    set({ session: done, nextSession: isLast ? null : nextSess });
    persist('session', done);

    var line = pickFallback('focus_done', Math.random());
    showBubble(line);

    if (get().settings.aiEnabled) {
      dialogue.remark('focus').then(function (result) {
        if (destroyed || !result.ok) return;
        showBubble(result.text);
        applyCommands(result.commands);
      }).catch(function () {});
    }
  }

  function nextRoundNow() {
    var nextSess = get().nextSession;
    if (!nextSess) {
      set({ session: null, nextSession: null, route: 'stage' });
      persist('session', null);
      return;
    }
    var fresh = createSession({
      kind: nextSess.kind,
      totalMs: nextSess.totalMs,
      round: nextSess.round,
      rounds: nextSess.rounds,
      taskLabel: nextSess.taskLabel
    }, Date.now());
    set({ session: fresh, nextSession: null });
    persist('session', fresh);
  }

  function discardSession() {
    set({ session: null, nextSession: null, route: 'stage' });
    persist('session', null);
  }

  /* ---------------- 送礼 ---------------- */

  function gift(propId) {
    var list = get().props;
    var prop = list.filter(function (p) { return p.id === propId; })[0];
    if (!prop) return { ok: false, reason: 'not_found' };

    var nextProps = markGiven(list, propId);
    set({ props: nextProps });
    persist('props', nextProps);

    applyVitals({ type: 'gift' });
    var line = giftLine(prop, Math.random());
    showBubble(line);
    pushLog('gift', '送出「' + prop.name + '」');
    pushMemory({
      at: Date.now(),
      kind: 'gift',
      title: prop.name,
      text: line,
      tint: '#1B2230'
    });

    if (get().settings.aiEnabled) {
      dialogue.remark('gift').then(function (result) {
        if (destroyed || !result.ok) return;
        showBubble(result.text);
        applyCommands(result.commands);
      }).catch(function () {});
    }
    return { ok: true };
  }

  /* ---------------- 衣装 / 场景 ---------------- */

  async function switchOutfit(id) {
    var o = activeOutfit(get().wardrobe, id);
    if (!o) return;
    var nextSettings = Object.assign({}, get().settings, { outfitId: o.id });
    set({ outfitId: o.id, onboard: !o.ref, settings: nextSettings });
    persist('settings', nextSettings);
    await ensureAssets([o.ref]);
    syncRenderer();
    pushLog('outfit', '换上了「' + o.name + '」');
  }

  async function saveOutfit(outfit) {
    var item = normalizeOutfit(outfit);
    var next = upsertOutfit(get().wardrobe, item);
    set({ wardrobe: next });
    persist('wardrobe', next);
    await ensureAssets([item.ref]);
    if (get().outfitId === item.id) syncRenderer();
    return item;
  }

  function dropOutfit(id) {
    var next = removeOutfit(get().wardrobe, id);
    var outfitId = get().outfitId === id ? (next[0] ? next[0].id : '') : get().outfitId;
    set({ wardrobe: next, outfitId: outfitId });
    persist('wardrobe', next);
    syncRenderer();
  }

  async function switchScene(id) {
    var sc = activeScene(get().scenes, id);
    if (!sc) return;
    var nextSettings = Object.assign({}, get().settings, { sceneId: sc.id });
    set({ sceneId: sc.id, settings: nextSettings });
    persist('settings', nextSettings);
    await ensureAssets([sc.ref]);
    syncRenderer();
    pushLog('scene', '场景换成「' + sc.name + '」');
  }

  async function saveScene(scene) {
    var item = normalizeScene(scene);
    var next = upsertScene(get().scenes, item);
    set({ scenes: next });
    persist('scenes', next);
    await ensureAssets([item.ref]);
    if (get().sceneId === item.id) syncRenderer();
    return item;
  }

  function dropScene(id) {
    var next = removeScene(get().scenes, id);
    var sceneId = get().sceneId === id ? next[0].id : get().sceneId;
    set({ scenes: next, sceneId: sceneId });
    persist('scenes', next);
    syncRenderer();
  }

  /* ---------------- 道具 ---------------- */

  async function saveProp(prop) {
    var item = normalizeProp(prop);
    var next = upsertProp(get().props, item);
    set({ props: next });
    persist('props', next);
    await ensureAssets([item.ref]);
    return item;
  }

  function dropProp(id) {
    var next = removeProp(get().props, id);
    set({ props: next });
    persist('props', next);
  }

  /* ---------------- 热区 / 设置 ---------------- */

  function saveZone(zone) {
    var list = get().zones.slice();
    var idx = -1;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === zone.id) { idx = i; break; }
    }
    if (idx === -1) list.push(zone);
    else list[idx] = zone;
    var next = normalizeZones(list);
    set({ zones: next });
    persist('zones', next);
  }

  function dropZone(id) {
    var next = get().zones.filter(function (z) { return z.id !== id; });
    set({ zones: next });
    persist('zones', next);
  }

  function saveSettings(patch) {
    var next = patchSettings(get().settings, patch);
    set({ settings: next });
    persist('settings', next);
    if (patch && patch.energyMax) {
      var v = normalizeVitals(get().vitals, Date.now(), next.energyMax);
      set({ vitals: v });
      persist('vitals', v);
    }
    if (renderer) syncRenderer();
    return next;
  }

  function setRoute(route) {
    set({ route: route });
  }

  function openSheet(name) {
    set({ sheet: name, drawer: '' });
    if (name === 'wardrobe') ensureAssets(get().wardrobe.map(function (o) { return o.ref; }));
    if (name === 'scene') ensureAssets(get().scenes.map(function (s) { return s.ref; }));
    if (name === 'props') ensureAssets(get().props.map(function (p) { return p.ref; }));
  }

  function closeSheet() {
    set({ sheet: '' });
  }

  function openDrawer(name) {
    set({ drawer: name, sheet: '' });
  }

  function closeDrawer() {
    set({ drawer: '' });
  }

  function setPointer(x, y) {
    if (!renderer) return;
    if (typeof x !== 'number') { renderer.clearPointer(); return; }
    renderer.setPointer(x, y);
  }

  function toggleStatusCard() {
    set({ statusCardFolded: !get().statusCardFolded });
  }

  function finishOnboard() {
    saveSettings({ onboardingDone: true });
    set({ onboard: false });
  }

  /* ---------------- 时钟 ---------------- */

  function tick() {
    var now = Date.now();
    var s = get();
    var patch = { now: now };

    if (s.vitals.day !== dayKey(now)) {
      var rolled = applyEvent(s.vitals, { type: 'dayRollover' }, now);
      patch.vitals = rolled.vitals;
      persist('vitals', rolled.vitals);
    }

    if (document.visibilityState !== 'hidden') {
      var v = applyEvent(patch.vitals || s.vitals, { type: 'company', ms: TICK_MS }, now).vitals;
      patch.vitals = v;
      saveTick += 1;
      if (saveTick >= 10) {
        saveTick = 0;
        persist('vitals', v);
      }
    }

    if (s.session && s.session.status === STATUS.RUNNING && isExpired(s.session, now)) {
      set(patch);
      finishRound(now);
      return;
    }

    set(patch);
  }

  function startTicker() {
    if (ticker) clearInterval(ticker);
    ticker = setInterval(tick, TICK_MS);
  }

  startTicker();

  /* ---------------- 导入导出 ---------------- */

  async function exportAll() {
    return store.exportAll();
  }

  async function importAll(payload) {
    if (!payload || payload.kind !== 'otome-companion-export' || !payload.data) {
      throw new Error('格式不对');
    }
    var d = payload.data;
    var nextSettings = mergeSettings(d.settings);
    var nextVitals = normalizeVitals(d.vitals, Date.now(), nextSettings.energyMax);
    var nextWardrobe = normalizeWardrobe(d.wardrobe);
    var nextScenes = normalizeScenes(d.scenes);
    var nextProps = normalizeProps(d.props);
    var nextZones = normalizeZones(d.zones);
    var nextLogs = normalizeLogs(d.logs);
    var nextMemories = normalizeMemories(d.memories);
    var nextChat = normalizeChat(d.chat);
    var nextIndex = normalizeAssetIndex(d.assetIndex);

    var assetData = payload.assets && typeof payload.assets === 'object' ? payload.assets : {};
    Object.keys(nextIndex).forEach(function (id) {
      var dataUrl = assetData[id];
      if (typeof dataUrl === 'string' && /^data:image\//i.test(dataUrl)) {
        store.putAsset({ id: id, dataUrl: dataUrl });
      }
    });

    set({
      settings: nextSettings,
      vitals: nextVitals,
      wardrobe: nextWardrobe,
      outfitId: activeOutfit(nextWardrobe, nextSettings.outfitId) ? activeOutfit(nextWardrobe, nextSettings.outfitId).id : '',
      scenes: nextScenes,
      sceneId: activeScene(nextScenes, nextSettings.sceneId) ? activeScene(nextScenes, nextSettings.sceneId).id : '',
      props: nextProps,
      zones: nextZones.length ? nextZones : presetZones(),
      logs: nextLogs,
      memories: nextMemories,
      chat: nextChat,
      assetIndex: nextIndex,
      assets: Object.assign({}, get().assets, assetData),
      session: null
    });

    persist('settings', nextSettings);
    persist('vitals', nextVitals);
    persist('wardrobe', nextWardrobe);
    persist('scenes', nextScenes);
    persist('props', nextProps);
    persist('zones', get().zones);
    persist('logs', nextLogs);
    persist('memories', nextMemories);
    persist('chat', nextChat);
    persist('assetIndex', nextIndex);
    syncRenderer();
    return true;
  }

  async function resetAll() {
    await store.clearAll();
    var s = mergeSettings(null);
    var v = normalizeVitals(null, Date.now(), s.energyMax);
    set({
      settings: s,
      vitals: v,
      session: null,
      wardrobe: [],
      outfitId: '',
      scenes: normalizeScenes(null),
      sceneId: normalizeScenes(null)[0].id,
      props: [],
      zones: presetZones(),
      logs: [],
      memories: [],
      chat: [],
      assets: {},
      assetIndex: {},
      bubble: null,
      onboard: true
    });
    syncRenderer();
  }

  function destroy() {
    destroyed = true;
    if (ticker) clearInterval(ticker);
    ticker = null;
    if (bubbleTimer) clearTimeout(bubbleTimer);
    bubbleTimer = null;
    detachStage();
    store.flush();
    state.clearSubs();
  }

  function status() {
    var s = get();
    return {
      route: s.route,
      sheet: s.sheet,
      drawer: s.drawer,
      charName: nameOf(),
      energy: s.vitals.energy,
      affinity: s.vitals.affinity,
      level: levelOf(s.vitals),
      todayText: fmtDuration(s.vitals.todayMs),
      rounds: s.vitals.rounds,
      session: s.session ? {
        status: s.session.status,
        round: s.session.round,
        rounds: s.session.rounds,
        remainingMs: s.session.remainingMs
      } : null,
      groups: groupByDay(s.logs).length,
      hasFocusMemory: hasKind(s.memories, 'focus')
    };
  }

  return {
    ctx: {
      host: host,
      store: store,
      state: state,
      actions: {
        setRoute: setRoute,
        openSheet: openSheet,
        closeSheet: closeSheet,
        openDrawer: openDrawer,
        closeDrawer: closeDrawer,
        setPointer: setPointer,
        tapAt: tapAt,
        sendChat: sendChat,
        startFocus: startFocus,
        pauseFocus: pauseFocus,
        resumeFocus: resumeFocus,
        abortFocus: abortFocus,
        nextRoundNow: nextRoundNow,
        discardSession: discardSession,
        gift: gift,
        switchOutfit: switchOutfit,
        saveOutfit: saveOutfit,
        dropOutfit: dropOutfit,
        switchScene: switchScene,
        saveScene: saveScene,
        dropScene: dropScene,
        saveProp: saveProp,
        dropProp: dropProp,
        saveZone: saveZone,
        dropZone: dropZone,
        saveSettings: saveSettings,
        addLocalAsset: addLocalAsset,
        removeAsset: removeAsset,
        ensureAssets: ensureAssets,
        toggleStatusCard: toggleStatusCard,
        finishOnboard: finishOnboard,
        exportAll: exportAll,
        importAll: importAll,
        resetAll: resetAll,
        showBubble: showBubble,
        clearBubble: clearBubble,
        removeMemory: function (id) {
          var next = removeMemory(get().memories, id);
          set({ memories: next });
          persist('memories', next);
        },
        removeLog: function (id) {
          var next = get().logs.filter(function (l) { return l.id !== id; });
          set({ logs: next });
          persist('logs', next);
        }
      },
      attachStage: attachStage,
      detachStage: detachStage,
      getRenderer: function () { return renderer; },
      sceneSrc: sceneSrc,
      portraitSrc: portraitSrc,
      status: status,
      syncRenderer: syncRenderer,
      destroy: destroy
    },
    destroy: destroy
  };
}
