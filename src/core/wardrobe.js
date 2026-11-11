/** 衣装 = 一套立绘的引用。第一套是默认装扮，切换后舞台立刻换图。 */

import { normalizeAssetRef, makeAssetId } from './assets.js';

export var MAX_OUTFITS = 12;

export function normalizeOutfit(raw) {
  var src = raw && typeof raw === 'object' ? raw : {};
  var id = String(src.id || '');
  if (!/^[a-z0-9_-]{4,32}$/i.test(id)) id = 'of_' + makeAssetId();
  var ref = normalizeAssetRef(src.ref);
  return {
    id: id,
    name: String(src.name || '').trim().slice(0, 14) || '默认装扮',
    ref: ref,
    at: Number(src.at) || 0
  };
}

export function normalizeWardrobe(raw) {
  if (!Array.isArray(raw)) return [];
  var seen = {};
  var out = [];
  raw.forEach(function (item) {
    var outfit = normalizeOutfit(item);
    if (seen[outfit.id]) return;
    seen[outfit.id] = true;
    out.push(outfit);
  });
  return out.slice(0, MAX_OUTFITS);
}

/** 当前装扮：找不到就退回第一套；衣柜为空返回 null */
export function activeOutfit(wardrobe, outfitId) {
  if (!Array.isArray(wardrobe) || !wardrobe.length) return null;
  for (var i = 0; i < wardrobe.length; i++) {
    if (wardrobe[i].id === outfitId) return wardrobe[i];
  }
  return wardrobe[0];
}

export function upsertOutfit(wardrobe, outfit) {
  var next = normalizeWardrobe(wardrobe);
  var item = normalizeOutfit(outfit);
  var replaced = false;
  next = next.map(function (o) {
    if (o.id !== item.id) return o;
    replaced = true;
    return item;
  });
  if (!replaced) next.push(item);
  return normalizeWardrobe(next);
}

export function removeOutfit(wardrobe, id) {
  return normalizeWardrobe(wardrobe).filter(function (o) { return o.id !== id; });
}

export function renameOutfit(wardrobe, id, name) {
  return normalizeWardrobe(wardrobe).map(function (o) {
    if (o.id !== id) return o;
    return Object.assign({}, o, { name: String(name || '').trim().slice(0, 14) || o.name });
  });
}
