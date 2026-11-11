/** 舞台（主界面）：全屏立绘 + 乙游 HUD */

import { h, clear } from '../dom.js';
import { icon } from '../components.js';
import { levelOf } from '../../core/vitals.js';
import { fmtDuration, fmtDurationLong, fmtClock, fmtClockLong } from '../../core/format.js';
import { remainingOf, progressOf, STATUS } from '../../core/session.js';
import { activeScene } from '../../core/scenes.js';
import { charNameOf } from '../../core/settings.js';
import { zoneAtPoint } from '../../core/touch.js';

function setText(el, value) {
  var next = String(value === undefined || value === null ? '' : value);
  if (el && el.textContent !== next) el.textContent = next;
}

function setWidth(el, ratio) {
  var pct = Math.round(Math.max(0, Math.min(1, ratio)) * 1000) / 10;
  var next = pct + '%';
  if (el && el.style.width !== next) el.style.width = next;
}

export default {
  mount: function (hostEl, ctx) {
    var state = ctx.state;

    var stageHost = h('div', { class: 'oc-stage-host' });
    hostEl.appendChild(stageHost);

    var renderer = ctx.attachStage(stageHost);

    var s = state.get();
    var charName = charNameOf(s.settings, s.character);

    /* ---------- 顶部 ---------- */
    var avatarInner = s.character && s.character.avatar
      ? h('img', { src: s.character.avatar, alt: '' })
      : h('span', { class: 'oc-avatar__ph', text: charName.slice(0, 1) });

    var avatar = h('div', { class: 'oc-avatar' }, [avatarInner]);
    var nameEl = h('div', { class: 'oc-id__name', text: charName });
    var lvEl = h('span', { class: 'oc-id__lv', text: 'LV.' + levelOf(s.vitals) });
    var titleEl = h('div', { class: 'oc-id__title', text: s.settings.title });

    var energyEl = h('b', { class: 'oc-num' });
    var todayEl = h('b', { class: 'oc-num' });
    var affinityEl = h('b', { class: 'oc-num' });

    var gear = h('button', {
      class: 'oc-iconbtn', type: 'button', 'aria-label': '设置',
      onclick: function () { ctx.actions.openSheet('settings'); }
    }, [icon('settings')]);

    var top = h('div', { class: 'oc-top' }, [
      h('div', { class: 'oc-id' }, [
        avatar,
        h('div', { class: 'oc-id__main' }, [
          h('div', { class: 'oc-id__line' }, [nameEl, lvEl]),
          titleEl
        ])
      ]),
      h('div', { class: 'oc-stats' }, [
        h('span', { class: 'oc-stat' }, [icon('bolt'), energyEl, h('i', { text: '/100' })]),
        h('span', { class: 'oc-stat' }, [icon('clock'), todayEl]),
        h('span', { class: 'oc-stat' }, [icon('heart'), affinityEl]),
        gear
      ])
    ]);

    /* ---------- FOCUS 卡 ---------- */
    var focusState = h('span', { class: 'oc-focuscard__state', text: '待开始' });
    var focusRound = h('span', { class: 'oc-eyebrow', text: 'FOCUS' });
    var ringText = h('span', { class: 'oc-ring__text' });
    var focusTime = h('div', { class: 'oc-focuscard__time' });
    var focusTotal = h('div', { class: 'oc-focuscard__total' });
    var taskText = h('span');
    var ring = h('div', { class: 'oc-ring' }, [ringText]);

    var focusCard = h('div', {
      class: 'oc-focuscard oc-glass',
      onclick: function () { ctx.actions.openSheet('focus'); }
    }, [
      h('div', { class: 'oc-focuscard__head' }, [focusRound, focusState]),
      h('div', { class: 'oc-focuscard__row' }, [
        ring,
        h('div', { class: 'oc-focuscard__meta' }, [focusTime, focusTotal])
      ]),
      h('div', { class: 'oc-focuscard__task' }, [taskText, h('em', { text: '›' })])
    ]);

    /* ---------- 诗句 / 悬浮钮 ---------- */
    var poem = h('div', { class: 'oc-poem', text: s.settings.poem });

    var side = h('div', { class: 'oc-side' }, [
      h('button', {
        class: 'oc-roundbtn', type: 'button', 'aria-label': '日志',
        onclick: function () { ctx.actions.openDrawer('logs'); }
      }, [icon('log')]),
      h('button', {
        class: 'oc-roundbtn', type: 'button', 'aria-label': '回忆',
        onclick: function () { ctx.actions.openDrawer('memories'); }
      }, [icon('memory')])
    ]);

    /* ---------- 角色状态卡 ---------- */
    var meterValue = h('span', { class: 'oc-meter__value' });
    var barFill = h('div', { class: 'oc-bar__fill' });
    var todayRow = h('b');
    var roundsRow = h('b');
    var foldBtn = h('button', {
      class: 'oc-statuscard__fold', type: 'button', text: '收起',
      onclick: function (e) {
        e.stopPropagation();
        ctx.actions.toggleStatusCard();
      }
    });

    var statusCard = h('div', { class: 'oc-statuscard oc-glass' }, [
      h('div', { class: 'oc-statuscard__head' }, [
        h('span', { class: 'oc-statuscard__title', text: '角色状态' }),
        foldBtn
      ]),
      h('div', { class: 'oc-meter' }, [
        icon('bolt'),
        h('span', { class: 'oc-meter__label', text: '陪伴能量' }),
        meterValue
      ]),
      h('div', { class: 'oc-bar' }, [barFill]),
      h('div', { class: 'oc-minirow' }, [icon('clock'), h('span', { text: '今日共处' }), todayRow]),
      h('div', { class: 'oc-minirow' }, [icon('heart'), h('span', { text: '默契记录' }), roundsRow]),
      h('div', {
        class: 'oc-minirow oc-minirow--link',
        onclick: function () { ctx.actions.openSheet('props'); }
      }, [icon('plus'), h('span', { text: '送一件礼物' })])
    ]);

    /* ---------- 气泡 / 引导 / 角落字 ---------- */
    var bubble = h('div', { class: 'oc-bubble' });
    var guide = h('div', { class: 'oc-guide oc-glass' }, [
      h('div', { class: 'oc-guide__title', text: '先把他的样子放进来' }),
      h('div', { class: 'oc-guide__desc', text: '上传一张人物立绘（透明背景最好），再拖一条脖子线，他就会有呼吸和视线跟随。' }),
      h('div', { class: 'oc-guide__actions' }, [
        h('button', {
          class: 'oc-btn oc-btn--primary', type: 'button', text: '上传立绘',
          onclick: function () { ctx.actions.openSheet('wardrobe'); }
        }),
        h('button', {
          class: 'oc-btn oc-btn--ghost', type: 'button', text: '稍后再说',
          onclick: function () { ctx.actions.finishOnboard(); }
        })
      ])
    ]);

    var mark = h('div', { class: 'oc-mark', text: 'COMPANION INTERFACE' });

    var hud = h('div', { class: 'oc-hud' }, [top, focusCard, poem, side, statusCard, bubble, guide, mark]);
    hostEl.appendChild(hud);

    /* ---------- 交互 ---------- */
    var down = null;

    function stagePoint(e) {
      var r = renderer || ctx.getRenderer();
      return r ? r.stagePointOfEvent(e) : null;
    }

    function onPointerMove(e) {
      var sp = stagePoint(e);
      if (!sp) return;
      ctx.actions.setPointer(sp.x, sp.y);
    }

    function onPointerLeave() {
      ctx.actions.setPointer(null);
    }

    function onPointerDown(e) {
      down = { x: e.clientX, y: e.clientY, at: Date.now(), type: e.pointerType };
      var sp = stagePoint(e);
      if (sp) ctx.actions.setPointer(sp.x, sp.y);
    }

    function onPointerUp(e) {
      if (!down) return;
      var moved = Math.abs(e.clientX - down.x) + Math.abs(e.clientY - down.y);
      var held = Date.now() - down.at;
      down = null;
      if (moved > 12 || held > 900) return;

      var r = renderer || ctx.getRenderer();
      if (!r) return;

      // 还没有立绘时，点舞台直接去衣柜
      if (!r.portraitSrc()) {
        ctx.actions.openSheet('wardrobe');
        return;
      }

      var point = r.toStagePoint(e.clientX, e.clientY);
      if (!point) return;
      var zone = zoneAtPoint(state.get().zones, point.x, point.y);
      ctx.actions.tapAt(zone, point, e.clientX, e.clientY);
    }

    function onContextMenu(e) {
      e.preventDefault();
    }

    stageHost.addEventListener('pointermove', onPointerMove);
    stageHost.addEventListener('pointerdown', onPointerDown);
    stageHost.addEventListener('pointerup', onPointerUp);
    stageHost.addEventListener('pointercancel', onPointerLeave);
    stageHost.addEventListener('pointerleave', onPointerLeave);
    stageHost.addEventListener('contextmenu', onContextMenu);
    hud.addEventListener('contextmenu', onContextMenu);

    /* ---------- 更新 ---------- */
    function renderSession(session, now, nextSession) {
      var status = session ? session.status : '';
      var progress = session ? progressOf(session, now) : 0;
      var remain = session ? remainingOf(session, now) : s.settings.focusMinutes * 60000;
      var total = session ? session.totalMs : s.settings.focusMinutes * 60000;

      var stateText = '待开始';
      if (status === STATUS.RUNNING) stateText = session.kind === 'break' ? '休息中' : '专注中';
      else if (status === STATUS.PAUSED) stateText = '已暂停';
      else if (status === STATUS.DONE) stateText = nextSession ? '本轮结束' : '已完成';

      setText(focusState, stateText);
      setText(focusRound, 'FOCUS · ' + (session ? '第 ' + session.round + ' / ' + session.rounds + ' 轮' : ''));
      setText(focusTime, fmtClock(remain));
      setText(focusTotal, '/ ' + fmtClockLong(total));
      setText(ringText, Math.round(progress * 100) + '%');
      ring.style.setProperty('--oc-progress', String(progress));
      setText(taskText, s.settings.taskLabel || '未设定任务');
    }

    function update() {
      var next = state.get();
      var now = next.now;
      var v = next.vitals;
      var charNameNow = charNameOf(next.settings, next.character);

      setText(nameEl, charNameNow);
      setText(lvEl, 'LV.' + levelOf(v));
      setText(titleEl, next.settings.title);
      setText(energyEl, Math.round(v.energy));
      setText(todayEl, fmtDurationLong(v.todayMs));
      setText(affinityEl, Math.round(v.affinity));

      renderSession(next.session, now, next.nextSession);

      setText(meterValue, Math.round(v.energy) + ' / ' + v.energyMax);
      setWidth(barFill, v.energyMax ? v.energy / v.energyMax : 0);
      setText(todayRow, fmtDuration(v.todayMs) + ' · 累计 ' + fmtDuration(v.focusMs));
      setText(roundsRow, '已共同完成 ' + v.rounds + ' 轮');

      poem.style.display = next.settings.showPoem && next.settings.poem ? '' : 'none';
      setText(poem, next.settings.poem);

      statusCard.classList.toggle('is-folded', !!next.statusCardFolded);
      setText(foldBtn, next.statusCardFolded ? '展开' : '收起');

      guide.style.display = next.onboard ? '' : 'none';

      if (next.bubble) {
        setText(bubble, next.bubble.text);
        bubble.classList.add('is-on');
      } else {
        bubble.classList.remove('is-on');
      }

      var sc = activeScene(next.scenes, next.sceneId);
      if (sc && sc.name) setText(mark, 'COMPANION INTERFACE · ' + sc.name);
    }

    var unsubscribe = state.subscribe(function (next, keys) {
      update();
      if (keys.indexOf('settings') !== -1 || keys.indexOf('outfitId') !== -1 || keys.indexOf('sceneId') !== -1) {
        ctx.syncRenderer();
      }
    });

    update();

    return {
      el: hud,
      update: update,
      destroy: function () {
        unsubscribe();
        stageHost.removeEventListener('pointermove', onPointerMove);
        stageHost.removeEventListener('pointerdown', onPointerDown);
        stageHost.removeEventListener('pointerup', onPointerUp);
        stageHost.removeEventListener('pointercancel', onPointerLeave);
        stageHost.removeEventListener('pointerleave', onPointerLeave);
        stageHost.removeEventListener('contextmenu', onContextMenu);
        clear(stageHost);
        ctx.detachStage();
      }
    };
  }
};
