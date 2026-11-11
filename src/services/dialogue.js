/**
 * 台词服务：拼上下文 → 调宿主 AI → 清理 → 解析指令。
 * 不持 Key，不持会话状态；限额与冷却由 container 负责。
 * 任何失败都返回 { ok:false, reason }，由调用方用本地台词兜底，不弹错。
 */

import { buildSystemPrompt, buildTouchPrompt } from '../core/prompts.js';
import { parseCommands } from '../core/commands.js';

var TIMEOUT_MS = 25000;
var HISTORY_LIMIT = 8;

function withTimeout(promise, ms) {
  return new Promise(function (resolve) {
    var done = false;
    var timer = setTimeout(function () {
      if (done) return;
      done = true;
      resolve({ ok: false, reason: 'timeout' });
    }, ms);

    promise.then(function (value) {
      if (done) return;
      done = true;
      clearTimeout(timer);
      resolve(value);
    }, function (err) {
      if (done) return;
      done = true;
      clearTimeout(timer);
      resolve({ ok: false, reason: 'error', error: err });
    });
  });
}

/** 清掉模型的坏习惯：代码块、角色名前缀、多余空行 */
export function cleanupText(text, limit) {
  var out = String(text || '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\r\n/g, '\n')
    .trim();

  out = out.replace(/^[^\n：:]{1,12}[：:]\s*/, '');
  out = out.replace(/\n{3,}/g, '\n\n');
  var max = limit || 160;
  if (out.length > max) out = out.slice(0, max).trim();
  return out;
}

function toMessages(history, system, userText) {
  var msgs = [{ role: 'system', content: system }];
  var list = Array.isArray(history) ? history.slice(-HISTORY_LIMIT) : [];
  list.forEach(function (m) {
    if (!m || !m.text) return;
    var role = m.role === 'user' ? 'user' : 'assistant';
    msgs.push({ role: role, content: String(m.text).slice(0, 400) });
  });
  msgs.push({ role: 'user', content: userText });
  return msgs;
}

export function createDialogue(deps) {
  var host = deps.host;
  var getContext = deps.getContext;

  async function call(messages, temperature) {
    return withTimeout(host.ai.chat({
      messages: messages,
      temperature: temperature
    }), TIMEOUT_MS);
  }

  function systemOf(extra) {
    var ctx = getContext() || {};
    return buildSystemPrompt({
      charName: ctx.charName,
      userName: ctx.userName,
      tone: ctx.tone,
      sceneName: ctx.sceneName,
      outfitName: ctx.outfitName,
      energy: ctx.energy,
      energyMax: ctx.energyMax,
      affinity: ctx.affinity,
      rounds: ctx.rounds,
      recent: ctx.recent
    }) + (extra ? '\n' + extra : '');
  }

  /**
   * 通讯页说话。
   * @returns {{ok: boolean, text: string, commands: Array, reason: string}}
   */
  async function chat(userText, history) {
    if (!host.caps.ai) return { ok: false, text: '', commands: [], reason: 'no_api' };
    var result = await call(toMessages(history, systemOf(''), String(userText).slice(0, 300)), 0.9);
    if (!result.ok) return { ok: false, text: '', commands: [], reason: result.reason };

    var parsed = parseCommands(cleanupText(result.text, 160));
    if (!parsed.text) return { ok: false, text: '', commands: [], reason: 'empty' };
    return { ok: true, text: parsed.text, commands: parsed.commands, reason: '' };
  }

  /** 点触即兴反应：给一句短台词，可以带动作 */
  async function react(zone, basePrompt) {
    if (!host.caps.ai) return { ok: false, text: '', commands: [], reason: 'no_api' };
    var extra = buildTouchPrompt(zone, basePrompt || '');
    var result = await call([
      { role: 'system', content: systemOf(extra) },
      { role: 'user', content: '（对方碰了你的' + ((zone && zone.name) || '身体') + '）' }
    ], 1.0);

    if (!result.ok) return { ok: false, text: '', commands: [], reason: result.reason };
    var parsed = parseCommands(cleanupText(result.text, 60));
    if (!parsed.text) return { ok: false, text: '', commands: [], reason: 'empty' };
    return { ok: true, text: parsed.text, commands: parsed.commands, reason: '' };
  }

  /** 专注结束的一句总结，失败就静默用本地台词 */
  async function remark(kind) {
    if (!host.caps.ai) return { ok: false, text: '', commands: [], reason: 'no_api' };
    var nudge = kind === 'focus'
      ? '（一轮专注结束，说一句很短的话。不要超过 25 字。）'
      : '（对方送了礼物，说一句很短的话。不要超过 25 字。）';
    var result = await call([
      { role: 'system', content: systemOf('') },
      { role: 'user', content: nudge }
    ], 0.9);
    if (!result.ok) return { ok: false, text: '', commands: [], reason: result.reason };
    var parsed = parseCommands(cleanupText(result.text, 60));
    if (!parsed.text) return { ok: false, text: '', commands: [], reason: 'empty' };
    return { ok: true, text: parsed.text, commands: parsed.commands, reason: '' };
  }

  return { chat: chat, react: react, remark: remark };
}
