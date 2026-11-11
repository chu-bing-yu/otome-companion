/** 场景 = 背景图 + 环境光参数。没有图时用 tint 渐变兜底，不会出现黑屏。 */

import { normalizeAssetRef, makeAssetId, DEFAULT_SCENES } from './assets.js';

export var MAX_SCENES = 12;

export var LIGHT_PRESETS = [
  { id: 'warm', name: '暖灯', light: '#E8C98A' },
  { id: 'moon', name: '月色', light: '#A9C4E8' },
  { id: 'dusk', name: '黄昏', light: '#E09A7A' },
  { id: 'cold', name: '冷雨', light: '#8FA9B8' }
];

function pickLight(id) {
  for (var i = 0; i < LIGHT_PRESETS.length; i++) {
    if (LIGHT_PRESETS[i].light === id || LIGHT_PRESETS[i].id === id) return LIGHT_PRESETS[i].light;
  }
  return LIGHT_PRESETS[0].light;
}

export function normalizeScene(raw) {
  var src = raw && typeof raw === 'object' ? raw : {};
  var id = String(src.id || '');
  if (!/^[a-z0-9_-]{4,32}$/i.test(id)) id = 'sc_' + makeAssetId();
  return {
    id: id,
    name: String(src.name || '').trim().slice(0, 12) || '未命名场景',
    ref: normalizeAssetRef(src.ref),
    tint: /^#[0-9a-f]{6}$/i.test(String(src.tint || '')) ? String(src.tint) : '#0A0D13',
    light: /^#[0-9a-f]{6}$/i.test(String(src.light || '')) ? String(src.light) : '#E8C98A',
    weather: String(src.weather || '').slice(0, 4),
    at: Number(src.at) || 0
  };
}

export function normalizeScenes(raw) {
  if (!Array.isArray(raw)) return defaultScenes();
  var seen = {};
  var out = [];
  raw.forEach(function (item) {
    var scene = normalizeScene(item);
    if (seen[scene.id]) return;
    seen[scene.id] = true;
    out.push(scene);
  });
  return out.length ? out.slice(0, MAX_SCENES) : defaultScenes();
}

export function defaultScenes() {
  return DEFAULT_SCENES.map(normalizeScene);
}

export function activeScene(scenes, sceneId) {
  if (!Array.isArray(scenes) || !scenes.length) return null;
  for (var i = 0; i < scenes.length; i++) {
    if (scenes[i].id === sceneId) return scenes[i];
  }
  return scenes[0];
}

export function upsertScene(scenes, scene) {
  var next = normalizeScenes(scenes);
  var item = normalizeScene(scene);
  var replaced = false;
  next = next.map(function (s) {
    if (s.id !== item.id) return s;
    replaced = true;
    return item;
  });
  if (!replaced) next.push(item);
  return normalizeScenes(next);
}

export function removeScene(scenes, id) {
  var next = normalizeScenes(scenes).filter(function (s) { return s.id !== id; });
  return next.length ? next : defaultScenes();
}

export function lightOf(scene) {
  return pickLight((scene && scene.light) || '');
}
