/**
 * 姿态计算：纯函数，不碰 DOM、不读系统时间。
 * 单张立绘能做的全部微动都在这里，渲染器只负责把数字写成 transform。
 *
 * 坐标约定：指针与锚点都用舞台归一化坐标 0–1，左上角为 (0,0)。
 */

import { clamp } from './format.js';

export var DEFAULTS = {
  breathPeriod: 3600,
  breathScaleY: 0.0075,
  breathShiftY: 1.5,
  swayPeriod: 9200,
  swayDeg: 0.5,
  lookMaxX: 4,
  lookMaxY: 2.5,
  lookTilt: 0.4,
  followTau: 0.25,
  tiltTau: 0.35,
  returnTau: 1.2,
  deadZone: 0.08,
  pressMs: 320,
  glowMs: 520,
  blinkCloseMs: 52,
  blinkHoldMs: 18,
  blinkOpenMs: 68,
  blinkMinGap: 3000,
  blinkMaxGap: 7000
};

function opt(opts, key) {
  var o = opts || {};
  return typeof o[key] === 'number' ? o[key] : DEFAULTS[key];
}

function easeOutCubic(t) {
  var x = clamp(t, 0, 1);
  return 1 - Math.pow(1 - x, 3);
}

function easeOutBack(t) {
  var x = clamp(t, 0, 1);
  var c1 = 1.70158;
  var c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

/** 呼吸与重心摇摆；t 为毫秒，scale 为整体幅度系数 */
export function computeIdle(t, opts, scale) {
  var k = typeof scale === 'number' ? scale : 1;
  var o = opts || {};
  if (o.breath === false) return { scaleY: 0, shiftY: 0, swayDeg: 0 };

  var breathPeriod = opt(o, 'breathPeriod');
  var swayPeriod = opt(o, 'swayPeriod');
  var phase = ((t % breathPeriod) / breathPeriod) * Math.PI * 2;
  var swayPhase = ((t % swayPeriod) / swayPeriod) * Math.PI * 2;

  return {
    scaleY: Math.sin(phase) * opt(o, 'breathScaleY') * k,
    shiftY: Math.sin(phase - Math.PI / 2) * opt(o, 'breathShiftY') * k,
    swayDeg: Math.sin(swayPhase) * opt(o, 'swayDeg') * k
  };
}

/** 指针（0–1 归一化）相对锚点的目标方向，返回 -1..1 */
export function computeLookTarget(pointer, anchor, opts) {
  var a = anchor || { x: 0.5, y: 0.28 };
  if (!pointer || !isFinite(pointer.x) || !isFinite(pointer.y)) return { x: 0, y: 0 };

  var dead = opt(opts, 'deadZone');
  var spanX = Math.max(0.08, a.x > 0.5 ? a.x : 1 - a.x);
  var spanY = Math.max(0.08, a.y > 0.5 ? a.y : 1 - a.y);
  var rawX = clamp((pointer.x - a.x) / spanX, -1, 1);
  var rawY = clamp((pointer.y - a.y) / spanY, -1, 1);

  function applyDead(v) {
    var s = v < 0 ? -1 : 1;
    var m = Math.abs(v);
    if (m <= dead) return 0;
    return s * ((m - dead) / (1 - dead));
  }

  return { x: applyDead(rawX), y: applyDead(rawY) };
}

/** 目标方向 → 像素位移与倾角 */
export function computeLookOffset(target, opts, scale) {
  var k = typeof scale === 'number' ? scale : 1;
  var t = target || { x: 0, y: 0 };
  return {
    tx: t.x * opt(opts, 'lookMaxX') * k,
    ty: t.y * opt(opts, 'lookMaxY') * k,
    tilt: t.x * opt(opts, 'lookTilt') * k
  };
}

/** 与帧率无关的指数趋近；目标为零时用更慢的回正时间常数 */
export function stepLook(current, target, dtSec, opts) {
  var cur = current || { tx: 0, ty: 0, tilt: 0 };
  var tgt = target || { tx: 0, ty: 0, tilt: 0 };
  var dt = Math.max(0, Math.min(0.1, Number(dtSec) || 0));
  if (!dt) return { tx: cur.tx, ty: cur.ty, tilt: cur.tilt };

  var idle = !tgt.tx && !tgt.ty;
  var tauPos = idle ? opt(opts, 'returnTau') : opt(opts, 'followTau');
  var tauTilt = idle ? opt(opts, 'returnTau') : opt(opts, 'tiltTau');

  var kp = 1 - Math.exp(-dt / tauPos);
  var kt = 1 - Math.exp(-dt / tauTilt);

  return {
    tx: cur.tx + (tgt.tx - cur.tx) * kp,
    ty: cur.ty + (tgt.ty - cur.ty) * kp,
    tilt: cur.tilt + (tgt.tilt - cur.tilt) * kt
  };
}

/** 点按回弹：先轻微压扁，再弹性还原；glow 与回弹同步衰减 */
export function computePress(elapsedMs, opts) {
  var o = opts || {};
  var pressMs = opt(o, 'pressMs');
  var glowMs = opt(o, 'glowMs');
  var e = Math.max(0, Number(elapsedMs) || 0);

  if (e > pressMs && e > glowMs) return { sx: 1, sy: 1, glow: 0 };

  var squash = Math.min(1, e / 70); // 0→1 压下去
  var back = e <= 70 ? 0 : easeOutBack((e - 70) / Math.max(1, pressMs - 70));
  var amount = e <= 70 ? squash : 1 - back;
  amount = clamp(amount, 0, 1);

  return {
    sx: 1 + 0.03 * amount,
    sy: 1 - 0.03 * amount,
    glow: 1 - easeOutCubic(e / glowMs)
  };
}

/** 眨眼状态机：state 可持久化，random 可注入便于测试 */
export function newBlinkState(now, random) {
  var r = typeof random === 'number' ? random : 0.5;
  var gap = DEFAULTS.blinkMinGap + (DEFAULTS.blinkMaxGap - DEFAULTS.blinkMinGap) * clamp(r, 0, 1);
  return { nextAt: now + gap, startAt: 0 };
}

/**
 * @returns {{state: object, value: number, changed: boolean}}
 * value 0=睁开 1=完全闭合
 */
export function stepBlink(state, now, random) {
  var s = state && state.nextAt ? state : newBlinkState(now, random);
  var duration = DEFAULTS.blinkCloseMs + DEFAULTS.blinkHoldMs + DEFAULTS.blinkOpenMs;
  var changed = false;

  if (!s.startAt && now >= s.nextAt) {
    s = { nextAt: s.nextAt, startAt: now };
    changed = true;
  }

  if (!s.startAt) return { state: s, value: 0, changed: false };

  var e = now - s.startAt;
  if (e >= duration) {
    return { state: newBlinkState(now, random), value: 0, changed: true };
  }

  var value;
  if (e < DEFAULTS.blinkCloseMs) {
    value = e / DEFAULTS.blinkCloseMs;
  } else if (e < DEFAULTS.blinkCloseMs + DEFAULTS.blinkHoldMs) {
    value = 1;
  } else {
    var t = (e - DEFAULTS.blinkCloseMs - DEFAULTS.blinkHoldMs) / DEFAULTS.blinkOpenMs;
    value = 1 - t;
  }

  return { state: s, value: clamp(value, 0, 1), changed: changed };
}

/** 把一次完整姿态压成渲染器要的几个数 */
export function composeFrame(input) {
  var i = input || {};
  var scale = typeof i.motionScale === 'number' ? i.motionScale : 1;
  var idle = computeIdle(i.t || 0, i.opts, scale);
  var look = i.look || { tx: 0, ty: 0, tilt: 0 };
  var press = i.press || { sx: 1, sy: 1, glow: 0 };
  var blink = typeof i.blink === 'number' ? i.blink : 0;

  return {
    upper: {
      x: look.tx,
      y: idle.shiftY,
      rot: idle.swayDeg + look.tilt,
      sx: press.sx,
      sy: (1 + idle.scaleY) * press.sy
    },
    lower: {
      x: look.tx * 0.35,
      y: idle.shiftY * 0.55,
      rot: 0,
      sx: 1,
      sy: 1
    },
    blink: blink,
    glow: press.glow
  };
}

export function toTransform(frame) {
  if (!frame) return 'translate3d(0,0,0)';
  return 'translate3d(' + frame.x.toFixed(2) + 'px,' + frame.y.toFixed(2) + 'px,0) ' +
    'rotate(' + frame.rot.toFixed(3) + 'deg) scale(' + frame.sx.toFixed(4) + ',' + frame.sy.toFixed(4) + ')';
}
