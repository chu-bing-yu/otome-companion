/** 回忆卡：重要时刻留档，带当时的场景/衣装引用，可回看可删除。 */

import { dayKey } from './format.js';
import { normalizeAssetRef } from './assets.js';

export var MAX_MEMORIES = 60;

export var MEMORY_KIND = {
  FIRST: 'first',
  FOCUS: 'focus',
  GIFT: 'gift',
  LEVEL: 'level',
  SCENE: 'scene'
};

var KINDS = Object.keys(MEMORY_KIND).map(function (k) { return MEMORY_KIND[k]; });

export function makeMemoryId(at) {
  return 'mm_' + String(at || 0).toString(36) + Math.random().toString(36).slice(2, 5);
}

export function normalizeMemory(raw) {
  var src = raw && typeof raw === 'object' ? raw : {};
  var at = Number(src.at) || 0;
  if (!at) return null;
  var id = String(src.id || '');
  if (!/^[a-z0-9_]{4,32}$/i.test(id)) id = makeMemoryId(at);

  return {
    id: id,
    at: at,
    day: dayKey(at),
    kind: KINDS.indexOf(src.kind) !== -1 ? src.kind : MEMORY_KIND.FIRST,
    title: String(src.title || '').trim().slice(0, 18) || '这一刻',
    text: String(src.text || '').trim().slice(0, 80),
    sceneRef: normalizeAssetRef(src.sceneRef),
    outfitRef: normalizeAssetRef(src.outfitRef),
    tint: /^#[0-9a-f]{6}$/i.test(String(src.tint || '')) ? String(src.tint) : '#121722'
  };
}

export function normalizeMemories(raw) {
  if (!Array.isArray(raw)) return [];
  var seen = {};
  var out = [];
  raw.forEach(function (item) {
    var mm = normalizeMemory(item);
    if (!mm || seen[mm.id]) return;
    seen[mm.id] = true;
    out.push(mm);
  });
  out.sort(function (a, b) { return b.at - a.at; });
  return out.slice(0, MAX_MEMORIES);
}

export function appendMemory(list, entry) {
  var mm = normalizeMemory(entry);
  if (!mm) return normalizeMemories(list);
  return normalizeMemories([mm].concat(normalizeMemories(list)));
}

export function removeMemory(list, id) {
  return normalizeMemories(list).filter(function (m) { return m.id !== id; });
}

export function hasKind(list, kind) {
  return normalizeMemories(list).some(function (m) { return m.kind === kind; });
}

export function memoryKindLabel(kind) {
  var labels = { first: '初遇', focus: '专注', gift: '礼物', level: '晋级', scene: '场景' };
  return labels[kind] || '回忆';
}
