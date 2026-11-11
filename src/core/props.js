/** 道具库与送礼结算。道具可以没有图片，用内置图标兜底。 */

import { normalizeAssetRef, makeAssetId } from './assets.js';

export var MAX_PROPS = 20;

export var PROP_ICONS = [
  { id: 'flower', name: '花' },
  { id: 'book', name: '书' },
  { id: 'candy', name: '糖' },
  { id: 'star', name: '星' },
  { id: 'tea', name: '茶' }
];

function pickIcon(raw) {
  for (var i = 0; i < PROP_ICONS.length; i++) {
    if (PROP_ICONS[i].id === raw) return raw;
  }
  return PROP_ICONS[0].id;
}

export function normalizeProp(raw) {
  var src = raw && typeof raw === 'object' ? raw : {};
  var id = String(src.id || '');
  if (!/^[a-z0-9_-]{4,32}$/i.test(id)) id = 'pr_' + makeAssetId();

  var lines = [];
  if (Array.isArray(src.lines)) {
    src.lines.forEach(function (line) {
      var t = String(line === undefined || line === null ? '' : line).trim().slice(0, 60);
      if (t && lines.indexOf(t) === -1) lines.push(t);
    });
  }

  return {
    id: id,
    name: String(src.name || '').trim().slice(0, 14) || '小礼物',
    ref: normalizeAssetRef(src.ref),
    icon: pickIcon(src.icon),
    lines: lines.slice(0, 6),
    given: Math.max(0, Math.round(Number(src.given) || 0)),
    at: Number(src.at) || 0
  };
}

export function normalizeProps(raw) {
  if (!Array.isArray(raw)) return [];
  var seen = {};
  var out = [];
  raw.forEach(function (item) {
    var prop = normalizeProp(item);
    if (seen[prop.id]) return;
    seen[prop.id] = true;
    out.push(prop);
  });
  return out.slice(0, MAX_PROPS);
}

export function upsertProp(props, prop) {
  var next = normalizeProps(props);
  var item = normalizeProp(prop);
  var replaced = false;
  next = next.map(function (p) {
    if (p.id !== item.id) return p;
    replaced = true;
    return item;
  });
  if (!replaced) next.push(item);
  return normalizeProps(next);
}

export function removeProp(props, id) {
  return normalizeProps(props).filter(function (p) { return p.id !== id; });
}

export function markGiven(props, id) {
  return normalizeProps(props).map(function (p) {
    return p.id === id ? Object.assign({}, p, { given: p.given + 1 }) : p;
  });
}

/** 送礼台词：道具自带优先，否则用通用句 */
export function giftLine(prop, random) {
  var lines = (prop && prop.lines) || [];
  if (lines.length) {
    var r = typeof random === 'number' ? random : 0.5;
    var idx = Math.floor(Math.max(0, Math.min(0.999999, r)) * lines.length);
    return lines[idx];
  }
  var name = prop && prop.name ? prop.name : '这个';
  return '……' + name + '？我收下了。';
}
