/**
 * 陪伴数值：所有变化只走 applyEvent，纯函数、带边界钳制。
 * 事件型：tap / chat / focusRound / focusAbort / gift / rest / company / dayRollover
 */

import { clamp, dayKey } from './format.js';

export var ENERGY_DEFAULT = 78;
export var AFFINITY_MAX = 9999;
export var DAILY_CHAT_CAP = 20;

export var COST = {
  tap: 1,
  chat: 1,
  focusRound: 6,
  focusAbort: 2,
  gift: 0
};

export var GAIN = {
  tapXp: 1,
  chatXp: 6,
  focusXp: 20,
  focusAffinity: 2,
  giftAffinity: 3,
  giftEnergy: 6,
  restEnergy: 20,
  giftXp: 10
};

export function defaultVitals(now) {
  return {
    day: dayKey(now),
    energy: ENERGY_DEFAULT,
    energyMax: 100,
    affinity: 0,
    rounds: 0,
    focusMs: 0,
    todayMs: 0,
    totalMs: 0,
    taps: 0,
    chats: 0,
    gifts: 0,
    xp: 0,
    chatToday: 0
  };
}

function num(value, fallback) {
  var n = Number(value);
  return isFinite(n) ? n : fallback;
}

/** 跨天：今天共处与聊天计数归零，能量恢复一部分 */
export function normalizeVitals(raw, now, energyMax) {
  var base = defaultVitals(now);
  var src = raw && typeof raw === 'object' ? raw : {};
  var max = Math.round(clamp(num(energyMax, src.energyMax || base.energyMax), 20, 200));

  var v = {
    day: typeof src.day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(src.day) ? src.day : base.day,
    energy: clamp(num(src.energy, base.energy), 0, max),
    energyMax: max,
    affinity: Math.round(clamp(num(src.affinity, 0), 0, AFFINITY_MAX)),
    rounds: Math.max(0, Math.round(num(src.rounds, 0))),
    focusMs: Math.max(0, num(src.focusMs, 0)),
    todayMs: Math.max(0, num(src.todayMs, 0)),
    totalMs: Math.max(0, num(src.totalMs, 0)),
    taps: Math.max(0, Math.round(num(src.taps, 0))),
    chats: Math.max(0, Math.round(num(src.chats, 0))),
    gifts: Math.max(0, Math.round(num(src.gifts, 0))),
    xp: Math.max(0, Math.round(num(src.xp, 0))),
    chatToday: Math.max(0, Math.round(num(src.chatToday, 0)))
  };

  var today = dayKey(now);
  if (v.day !== today) {
    v.day = today;
    v.todayMs = 0;
    v.chatToday = 0;
    v.energy = clamp(v.energy + 40, 0, v.energyMax);
  }

  return v;
}

/** 等级：120 经验一级，参考图里 LV.12 属于长期玩家 */
export function levelOf(vitals) {
  var xp = Math.max(0, Number(vitals && vitals.xp) || 0);
  return 1 + Math.floor(xp / 120);
}

/** 当前等级内的进度 0–1 */
export function levelProgress(vitals) {
  var xp = Math.max(0, Number(vitals && vitals.xp) || 0);
  return (xp % 120) / 120;
}

/** 能量越低，互动收益越低；低于 20 打七折 */
export function energyFactor(vitals) {
  var e = Math.max(0, Number(vitals && vitals.energy) || 0);
  if (e <= 0) return 0;
  if (e < 20) return 0.7;
  return 1;
}

function deltaOf(before, after) {
  return {
    energy: Math.round((after.energy - before.energy) * 10) / 10,
    affinity: after.affinity - before.affinity,
    xp: after.xp - before.xp,
    rounds: after.rounds - before.rounds
  };
}

/**
 * @returns {{vitals: object, delta: object, note: string}}
 * note: '' | 'tired' | 'chat_cap' | 'levelup'
 */
export function applyEvent(vitals, event, now) {
  var e = event || {};
  var v = normalizeVitals(vitals, now, e.energyMax);
  var before = { energy: v.energy, affinity: v.affinity, xp: v.xp, rounds: v.rounds };
  var note = '';
  var factor = energyFactor(v);

  switch (e.type) {
    case 'tap':
      v.energy = clamp(v.energy - COST.tap, 0, v.energyMax);
      v.taps += 1;
      v.xp += Math.round(GAIN.tapXp * factor);
      if (factor === 0) note = 'tired';
      break;

    case 'chat':
      if (v.chatToday >= DAILY_CHAT_CAP) {
        note = 'chat_cap';
        break;
      }
      v.energy = clamp(v.energy - COST.chat, 0, v.energyMax);
      v.chats += 1;
      v.chatToday += 1;
      v.affinity = clamp(v.affinity + Math.max(1, Math.round(1 * factor)), 0, AFFINITY_MAX);
      v.xp += Math.round(GAIN.chatXp * factor);
      if (factor === 0) note = 'tired';
      break;

    case 'focusRound':
      v.energy = clamp(v.energy - COST.focusRound, 0, v.energyMax);
      v.rounds += 1;
      v.focusMs += Math.max(0, num(e.ms, 0));
      v.affinity = clamp(v.affinity + GAIN.focusAffinity, 0, AFFINITY_MAX);
      v.xp += GAIN.focusXp;
      break;

    case 'focusAbort':
      v.energy = clamp(v.energy - COST.focusAbort, 0, v.energyMax);
      break;

    case 'gift':
      v.energy = clamp(v.energy + GAIN.giftEnergy, 0, v.energyMax);
      v.affinity = clamp(v.affinity + GAIN.giftAffinity, 0, AFFINITY_MAX);
      v.gifts += 1;
      v.xp += GAIN.giftXp;
      break;

    case 'rest':
      v.energy = clamp(v.energy + GAIN.restEnergy, 0, v.energyMax);
      break;

    case 'company': {
      var ms = Math.max(0, num(e.ms, 0));
      v.todayMs += ms;
      v.totalMs += ms;
      break;
    }

    case 'dayRollover':
      v.day = dayKey(now);
      v.todayMs = 0;
      v.chatToday = 0;
      v.energy = clamp(v.energy + 40, 0, v.energyMax);
      break;

    default:
      break;
  }

  var beforeLevel = levelOf(before);
  var afterLevel = levelOf(v);
  if (afterLevel > beforeLevel && note !== 'tired') note = 'levelup';

  return { vitals: v, delta: deltaOf(before, v), note: note };
}

/** 陪伴时长按秒累加的显式入口，避免调用方直接改字段 */
export function addCompanyMs(vitals, ms, now) {
  return applyEvent(vitals, { type: 'company', ms: ms }, now).vitals;
}

export function affinityText(v) {
  return String(Math.round(v.affinity));
}
