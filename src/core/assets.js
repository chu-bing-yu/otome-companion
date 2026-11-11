/**
 * 素材引用三态：builtin / url / local。
 * 全项目只认 `slot:kind:id` 这一种字符串，避免 UI 里散落三套分支。
 *
 *   builtin:portrait-default    → 插件仓 raw 直链（常量表，可为空）
 *   url:https://…               → 用户外链
 *   local:a1b2c3                → roche.storage 里的 oc:asset:a1b2c3（dataURL）
 */

import { clamp } from './format.js';

export var SLOTS = ['portrait', 'scene', 'prop', 'outfit'];

export var MAX_ASSETS = 40;
export var MAX_DATAURL_BYTES = 1.5 * 1024 * 1024;

/** 内置素材表：首版不放示例素材，保留能力等以后加 */
export var BUILTIN = {
  scene: [
    { id: 'night-room', name: '夜色书房', tint: '#0A0D13' }
  ]
};

export var DEFAULT_SCENES = [
  { id: 'sc_night', name: '夜色书房', ref: '', tint: '#0A0D13', light: '#E8C98A', weather: '夜' },
  { id: 'sc_dawn', name: '晨雾窗边', ref: '', tint: '#131A24', light: '#A9C4E8', weather: '雾' }
];

function isHttp(value) {
  return /^https?:\/\/[^\s]+$/i.test(value);
}

export function isDataUrl(value) {
  return /^data:image\//i.test(String(value || ''));
}

export function makeAssetId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/**
 * @returns {string} '' 或 `kind:id`
 */
export function normalizeAssetRef(raw) {
  var src = String(raw === undefined || raw === null ? '' : raw).trim();
  if (!src) return '';
  if (/^builtin:[a-z0-9_-]{1,40}$/i.test(src)) return src;
  if (/^local:[a-z0-9]{4,40}$/i.test(src)) return src;
  if (/^url:https?:\/\//i.test(src)) {
    return isHttp(src.slice(4)) ? src : '';
  }
  if (isHttp(src)) return 'url:' + src;
  return '';
}

export function refKind(ref) {
  var s = String(ref || '');
  var i = s.indexOf(':');
  if (i <= 0) return '';
  var kind = s.slice(0, i);
  return ['builtin', 'url', 'local'].indexOf(kind) !== -1 ? kind : '';
}

export function refId(ref) {
  var s = String(ref || '');
  var i = s.indexOf(':');
  return i > 0 ? s.slice(i + 1) : '';
}

/** 展示用短名：外链取文件名，本地/内置取 id */
export function refLabel(ref, fallback) {
  var kind = refKind(ref);
  if (!kind) return fallback || '未设置';
  var id = refId(ref);
  if (kind === 'url') {
    var clean = id.split('?')[0].split('#')[0];
    var name = clean.slice(clean.lastIndexOf('/') + 1);
    return name ? decodeURIComponent(name).slice(0, 24) : '外链图片';
  }
  return id.slice(0, 20);
}

/** 索引记录：只有元数据，图片本身在 oc:asset:<id> 里 */
export function normalizeIndexRecord(raw, key) {
  var src = raw && typeof raw === 'object' ? raw : {};
  var id = String(src.id || key || '');
  if (!/^[a-z0-9]{4,40}$/i.test(id)) return null;
  return {
    id: id,
    name: String(src.name || '').trim().slice(0, 14) || '图片',
    slot: SLOTS.indexOf(src.slot) !== -1 ? src.slot : 'portrait',
    w: Math.max(0, Math.round(Number(src.w) || 0)),
    h: Math.max(0, Math.round(Number(src.h) || 0)),
    at: Number(src.at) || 0
  };
}

export function normalizeAssetRecord(raw) {
  var src = raw && typeof raw === 'object' ? raw : {};
  var dataUrl = isDataUrl(src.dataUrl) ? String(src.dataUrl) : '';
  if (!dataUrl || dataUrl.length > MAX_DATAURL_BYTES) return null;
  var base = normalizeIndexRecord(src);
  if (!base) return null;
  base.dataUrl = dataUrl;
  return base;
}

/** 资产索引：没有 dataUrl 也要保留，否则重开 App 就找不到图了 */
export function normalizeAssetIndex(raw) {
  var src = raw && typeof raw === 'object' ? raw : {};
  var list = [];
  Object.keys(src).forEach(function (key) {
    var rec = normalizeIndexRecord(src[key], key);
    if (rec) list.push(rec);
  });
  list.sort(function (a, b) { return b.at - a.at; });
  var out = {};
  list.slice(0, MAX_ASSETS).forEach(function (rec) { out[rec.id] = rec; });
  return out;
}

/** 资产表：{ [id]: record }，超上限按时间裁掉最旧的 */
export function normalizeAssetMap(raw) {
  var src = raw && typeof raw === 'object' ? raw : {};
  var out = {};
  var list = [];
  Object.keys(src).forEach(function (key) {
    var rec = normalizeAssetRecord(Object.assign({ id: key }, src[key] || {}));
    if (rec) list.push(rec);
  });
  list.sort(function (a, b) { return b.at - a.at; });
  list.slice(0, MAX_ASSETS).forEach(function (rec) { out[rec.id] = rec; });
  return out;
}

export function assetById(assets, id) {
  return (assets && Object.prototype.hasOwnProperty.call(assets, id)) ? assets[id] : null;
}

/**
 * 解析成可直接塞进 <img src> 的字符串；解析不到返回 ''，由 UI 画占位。
 * deps: { assets, builtin: { id: url } }
 */
export function resolveAssetSrc(ref, deps) {
  var kind = refKind(ref);
  if (!kind) return '';
  var id = refId(ref);
  var d = deps || {};
  if (kind === 'url') return isHttp(id) ? id : '';
  if (kind === 'local') {
    var rec = assetById(d.assets, id);
    // 运行时 assets 存的是 dataUrl 字符串，导入时也可能是 { dataUrl }
    if (typeof rec === 'string') return isDataUrl(rec) ? rec : '';
    return rec && rec.dataUrl ? rec.dataUrl : '';
  }
  var builtin = d.builtin || {};
  return isHttp(builtin[id]) ? builtin[id] : '';
}

/** 素材槽位统计，用于设置页展示与容量检查 */
export function countBySlot(assets) {
  var out = { portrait: 0, scene: 0, prop: 0, outfit: 0 };
  Object.keys(assets || {}).forEach(function (key) {
    var rec = assets[key];
    if (rec && out[rec.slot] !== undefined) out[rec.slot] += 1;
  });
  return out;
}

export function totalBytes(assets) {
  return Object.keys(assets || {}).reduce(function (sum, key) {
    var rec = assets[key];
    return sum + (rec && rec.dataUrl ? rec.dataUrl.length : 0);
  }, 0);
}

export function clampScale(value) {
  return clamp(Number(value) || 1, 0.4, 2.2);
}
