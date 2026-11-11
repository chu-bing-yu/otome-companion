/**
 * 立绘点触：纯逻辑，无 DOM、不读时间。
 * 热区坐标全部归一化到 0–1，换屏幕尺寸不会歪。
 */

import { clamp } from './format.js';

export var TOUCH_SHAPES = ['rect', 'ellipse'];
export var MAX_ZONES = 24;
export var MAX_ZONE_LINES = 20;
export var MAX_LINE_CHARS = 80;

export var PRESET_ZONES = [
  { name: '发顶', x: 0.34, y: 0.06, w: 0.32, h: 0.12, shape: 'ellipse', lines: ['……别揉乱。', '头发会乱。'] },
  { name: '脸颊', x: 0.36, y: 0.2, w: 0.28, h: 0.14, shape: 'ellipse', lines: ['……碰哪儿呢。', '脸有点热。'] },
  { name: '手', x: 0.6, y: 0.52, w: 0.18, h: 0.16, shape: 'ellipse', lines: ['要牵手吗。', '手是凉的，别介意。'] },
  { name: '腰', x: 0.33, y: 0.55, w: 0.3, h: 0.14, shape: 'ellipse', lines: ['别、别闹。', '那里不行。'] }
];

function newZoneId() {
  return 'z_' + Math.random().toString(36).slice(2, 8);
}

function clamp01(value, fallback) {
  var n = Number(value);
  if (!isFinite(n)) return fallback;
  return Math.round(clamp(n, 0, 1) * 1000) / 1000;
}

export function normalizeZone(raw, fallbackId) {
  var src = raw && typeof raw === 'object' ? raw : {};
  var id = String(src.id || '');
  if (!/^[a-zA-Z0-9_-]{3,24}$/.test(id)) {
    id = fallbackId && /^[a-zA-Z0-9_-]{3,24}$/.test(fallbackId) ? fallbackId : newZoneId();
  }

  var x = clamp01(src.x, 0.35);
  var y = clamp01(src.y, 0.3);
  var w = clamp01(src.w, 0.3);
  var h = clamp01(src.h, 0.2);
  if (w < 0.02) w = 0.02;
  if (h < 0.02) h = 0.02;
  if (x + w > 1) x = Math.max(0, 1 - w);
  if (y + h > 1) y = Math.max(0, 1 - h);

  var lines = [];
  if (Array.isArray(src.lines)) {
    src.lines.forEach(function (line) {
      var t = String(line === undefined || line === null ? '' : line).trim().slice(0, MAX_LINE_CHARS);
      if (!t || lines.indexOf(t) !== -1) return;
      lines.push(t);
    });
  }

  var cooldown = Math.round(Number(src.cooldownSec));
  if (!isFinite(cooldown)) cooldown = 3;
  cooldown = Math.round(clamp(cooldown, 0, 60));

  return {
    id: id,
    name: String(src.name || '').trim().slice(0, 12) || '热区',
    x: x,
    y: y,
    w: w,
    h: h,
    shape: TOUCH_SHAPES.indexOf(src.shape) !== -1 ? src.shape : 'rect',
    lines: lines.slice(0, MAX_ZONE_LINES),
    useAI: !!src.useAI,
    prompt: String(src.prompt || '').slice(0, 500),
    cooldownSec: cooldown
  };
}

export function normalizeZones(raw) {
  if (!Array.isArray(raw)) return [];
  var seen = {};
  var out = [];
  raw.forEach(function (item) {
    var zone = normalizeZone(item);
    if (seen[zone.id]) return;
    seen[zone.id] = true;
    out.push(zone);
  });
  return out.slice(0, MAX_ZONES);
}

export function presetZones() {
  return PRESET_ZONES.map(function (z) { return normalizeZone(z); });
}

function inEllipse(zone, x, y) {
  var rx = zone.w / 2;
  var ry = zone.h / 2;
  if (!rx || !ry) return false;
  var dx = (x - (zone.x + rx)) / rx;
  var dy = (y - (zone.y + ry)) / ry;
  return dx * dx + dy * dy <= 1;
}

function inRect(zone, x, y) {
  return x >= zone.x && x <= zone.x + zone.w && y >= zone.y && y <= zone.y + zone.h;
}

/** 命中测试：后加的热区优先（方便覆盖在身体上的小热区） */
export function zoneAtPoint(zones, x, y) {
  if (!Array.isArray(zones)) return null;
  for (var i = zones.length - 1; i >= 0; i--) {
    var zone = zones[i];
    var hit = zone.shape === 'ellipse' ? inEllipse(zone, x, y) : inRect(zone, x, y);
    if (hit) return zone;
  }
  return null;
}

/** 同一热区冷却，避免连点刷屏与连续计费 */
export function canTap(zone, now, lastAt) {
  if (!zone) return false;
  var wait = Math.max(0, Number(zone.cooldownSec) || 0) * 1000;
  if (!wait) return true;
  return !lastAt || now - lastAt >= wait;
}

/** 从台词库里随机取一句；random 可注入便于测试 */
export function pickZoneLine(zone, random) {
  if (!zone || !zone.lines || !zone.lines.length) return '';
  var r = typeof random === 'function' ? random() : (typeof random === 'number' ? random : Math.random());
  var index = Math.floor(clamp(Math.max(0, Math.min(0.999999, r)) * zone.lines.length, 0, zone.lines.length - 1));
  return zone.lines[index];
}

/** 没配台词时的兜底：不弹错，也不假装有事发生 */
export function fallbackTapLine(zone) {
  if (!zone) return '……嗯？';
  return zone.name ? '（' + zone.name + '）嗯。' : '……嗯。';
}

/** 立绘来源归一化：只接受 http(s) / data:image / blob: */
export function normalizePortrait(raw) {
  var src = String(raw || '').trim();
  if (!src) return '';
  if (/^data:image\//i.test(src)) return src;
  if (/^blob:/i.test(src)) return src;
  if (/^https?:\/\//i.test(src)) return src;
  return '';
}
