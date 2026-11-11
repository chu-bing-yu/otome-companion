/** 设置：默认值、边界、脏数据合并。纯数据，不碰 DOM。 */

import { clamp } from './format.js';

export var LIMITS = {
  charName: [0, 16],
  title: [0, 24],
  poem: [0, 48],
  zoneName: [1, 12],
  zoneLines: 20,
  zoneLineChars: 80,
  zones: 24,
  assetName: [1, 14],
  noteChars: 60
};

export var FOCUS = {
  minutes: [5, 120],
  rounds: [1, 12],
  breakMinutes: [1, 30]
};

export function defaultSettings() {
  return {
    version: 1,
    characterId: '',
    charName: '',
    title: '与你 · 共赴星海',
    poem: '有些距离，不是隔阂，而是为了更好地相遇',
    showPoem: true,
    aiEnabled: true,
    aiTone: 'gentle',
    // 舞台参数
    neck: 0.38,
    anchorX: 0.5,
    anchorY: 0.28,
    breath: true,
    lookFollow: true,
    motionScale: 1,
    portraitFit: 'contain',
    // 专注
    focusMinutes: 25,
    focusRounds: 4,
    breakMinutes: 5,
    taskLabel: '',
    // 数值
    energyMax: 100,
    // 其他
    showHud: true,
    onboardingDone: false
  };
}

function clampNum(value, fallback, min, max) {
  var n = Number(value);
  if (!isFinite(n)) return fallback;
  return clamp(n, min, max);
}

function text(value, fallback, max) {
  var s = String(value === undefined || value === null ? '' : value).trim();
  if (!s) return fallback;
  return s.slice(0, max);
}

export function mergeSettings(raw) {
  var base = defaultSettings();
  var src = raw && typeof raw === 'object' ? raw : {};

  var out = {
    version: 1,
    characterId: String(src.characterId || ''),
    charName: String(src.charName || '').slice(0, LIMITS.charName[1]),
    title: text(src.title, base.title, LIMITS.title[1]),
    poem: text(src.poem, base.poem, LIMITS.poem[1]),
    showPoem: src.showPoem !== false,
    aiEnabled: src.aiEnabled !== false,
    aiTone: ['gentle', 'playful', 'cool'].indexOf(src.aiTone) !== -1 ? src.aiTone : base.aiTone,
    neck: clampNum(src.neck, base.neck, 0.12, 0.9),
    anchorX: clampNum(src.anchorX, base.anchorX, 0.1, 0.9),
    anchorY: clampNum(src.anchorY, base.anchorY, 0.05, 0.6),
    breath: src.breath !== false,
    lookFollow: src.lookFollow !== false,
    motionScale: clampNum(src.motionScale, 1, 0, 1.8),
    portraitFit: src.portraitFit === 'cover' ? 'cover' : 'contain',
    focusMinutes: Math.round(clampNum(src.focusMinutes, base.focusMinutes, FOCUS.minutes[0], FOCUS.minutes[1])),
    focusRounds: Math.round(clampNum(src.focusRounds, base.focusRounds, FOCUS.rounds[0], FOCUS.rounds[1])),
    breakMinutes: Math.round(clampNum(src.breakMinutes, base.breakMinutes, FOCUS.breakMinutes[0], FOCUS.breakMinutes[1])),
    taskLabel: String(src.taskLabel || '').slice(0, 40),
    energyMax: Math.round(clampNum(src.energyMax, base.energyMax, 20, 200)),
    showHud: src.showHud !== false,
    onboardingDone: !!src.onboardingDone
  };

  return out;
}

export function patchSettings(settings, patch) {
  return mergeSettings(Object.assign({}, settings, patch || {}));
}

export function charNameOf(settings, character) {
  var custom = String((settings && settings.charName) || '').trim();
  if (custom) return custom;
  var name = character && (character.name || character.handle);
  return String(name || '他').slice(0, LIMITS.charName[1]);
}
