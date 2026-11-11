/** 互动日志：按天分组的时间轴，上限裁剪，旧的先丢。 */

import { clamp, dayKey } from './format.js';

export var MAX_LOGS = 300;

export var LOG_KIND = {
  TAP: 'tap',
  CHAT: 'chat',
  FOCUS: 'focus',
  GIFT: 'gift',
  SCENE: 'scene',
  OUTFIT: 'outfit',
  LEVEL: 'level'
};

export function makeLogId(at) {
  return 'lg_' + String(at || 0).toString(36) + Math.random().toString(36).slice(2, 5);
}

export function normalizeLog(raw) {
  var src = raw && typeof raw === 'object' ? raw : {};
  var at = Number(src.at) || 0;
  if (!at) return null;
  var text = String(src.text || '').trim().slice(0, 80);
  if (!text) return null;
  var kind = Object.keys(LOG_KIND).map(function (k) { return LOG_KIND[k]; }).indexOf(src.kind) !== -1
    ? src.kind
    : LOG_KIND.TAP;
  var id = String(src.id || '');
  if (!/^[a-z0-9_]{4,32}$/i.test(id)) id = makeLogId(at);
  return { id: id, at: at, day: dayKey(at), kind: kind, text: text };
}

export function normalizeLogs(raw) {
  if (!Array.isArray(raw)) return [];
  var seen = {};
  var out = [];
  raw.forEach(function (item) {
    var log = normalizeLog(item);
    if (!log || seen[log.id]) return;
    seen[log.id] = true;
    out.push(log);
  });
  out.sort(function (a, b) { return b.at - a.at; });
  return out.slice(0, MAX_LOGS);
}

export function appendLog(logs, entry) {
  var log = normalizeLog(entry);
  if (!log) return normalizeLogs(logs);
  return normalizeLogs([log].concat(normalizeLogs(logs)));
}

export function removeLog(logs, id) {
  return normalizeLogs(logs).filter(function (l) { return l.id !== id; });
}

/** 按天分组（新 → 旧） */
export function groupByDay(logs) {
  var map = {};
  var order = [];
  normalizeLogs(logs).forEach(function (log) {
    if (!map[log.day]) {
      map[log.day] = [];
      order.push(log.day);
    }
    map[log.day].push(log);
  });
  return order.map(function (day) { return { day: day, items: map[day] }; });
}

export function filterByDay(logs, day) {
  return normalizeLogs(logs).filter(function (l) { return l.day === day; });
}

export function recentLogs(logs, count) {
  return normalizeLogs(logs).slice(0, clamp(count || 6, 1, MAX_LOGS));
}

export function logKindLabel(kind) {
  var labels = {
    tap: '触碰',
    chat: '通讯',
    focus: '专注',
    gift: '礼物',
    scene: '场景',
    outfit: '衣装',
    level: '升级'
  };
  return labels[kind] || '互动';
}
