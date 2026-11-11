import test from 'node:test';
import assert from 'node:assert/strict';

import {
  computeIdle, computeLookTarget, computeLookOffset, stepLook,
  computePress, stepBlink, newBlinkState, composeFrame, toTransform, DEFAULTS
} from '../src/core/motion.js';

test('呼吸在零点附近对称', function () {
  const a = computeIdle(0, {}, 1);
  const half = computeIdle(DEFAULTS.breathPeriod / 2, {}, 1);
  assert.ok(Math.abs(a.scaleY) < 1e-9);
  assert.ok(Math.abs(half.scaleY) < 1e-6);
});

test('关掉呼吸后所有位移为零', function () {
  const f = computeIdle(1234, { breath: false }, 1);
  assert.deepEqual(f, { scaleY: 0, shiftY: 0, swayDeg: 0 });
});

test('幅度系数线性生效', function () {
  const t = DEFAULTS.breathPeriod / 4;
  const a = computeIdle(t, {}, 1);
  const b = computeIdle(t, {}, 2);
  assert.ok(Math.abs(b.scaleY - a.scaleY * 2) < 1e-9);
});

test('视线死区内输出为零', function () {
  const target = computeLookTarget({ x: 0.5, y: 0.28 }, { x: 0.5, y: 0.28 }, {});
  assert.equal(target.x, 0);
  assert.equal(target.y, 0);
});

test('视线超界被钳制在 -1..1', function () {
  const t = computeLookTarget({ x: 5, y: -5 }, { x: 0.5, y: 0.28 }, {});
  assert.ok(t.x <= 1 && t.x >= -1);
  assert.ok(t.y <= 1 && t.y >= -1);
});

test('指针缺失时目标为零', function () {
  assert.deepEqual(computeLookTarget(null, { x: 0.5, y: 0.28 }, {}), { x: 0, y: 0 });
});

test('位移上限被缩放系数约束', function () {
  const target = { x: 1, y: 1 };
  const o = computeLookOffset(target, {}, 1);
  assert.equal(o.tx, DEFAULTS.lookMaxX);
  assert.equal(o.ty, DEFAULTS.lookMaxY);
  const halfScale = computeLookOffset(target, {}, 0.5);
  assert.equal(halfScale.tx, DEFAULTS.lookMaxX * 0.5);
});

test('指数趋近与帧率无关', function () {
  const target = { tx: 4, ty: 2, tilt: 0.4 };
  let a = { tx: 0, ty: 0, tilt: 0 };
  let b = { tx: 0, ty: 0, tilt: 0 };

  for (let i = 0; i < 30; i++) a = stepLook(a, target, 1 / 30, {});
  for (let i = 0; i < 120; i++) b = stepLook(b, target, 1 / 120, {});

  assert.ok(Math.abs(a.tx - b.tx) < 0.05, 'tx 相差 ' + Math.abs(a.tx - b.tx));
  assert.ok(Math.abs(a.tilt - b.tilt) < 0.05);
});

test('松手后回正比跟随时慢', function () {
  const follow = stepLook({ tx: 0, ty: 0, tilt: 0 }, { tx: 4, ty: 0, tilt: 0 }, 0.1, {});
  const back = stepLook({ tx: 4, ty: 0, tilt: 0 }, { tx: 0, ty: 0, tilt: 0 }, 0.1, {});
  assert.ok(follow.tx > 4 - back.tx, '跟随应该比回正快');
});

test('点按回弹最终回到 1', function () {
  const start = computePress(0, {});
  assert.equal(start.sy, 1);
  const squashed = computePress(45, {});
  assert.ok(squashed.sy < 1, '按下 45ms 时被压扁');
  const mid = computePress(200, {});
  assert.ok(mid.glow >= 0 && mid.glow <= 1);
  const end = computePress(2000, {});
  assert.deepEqual(end, { sx: 1, sy: 1, glow: 0 });
});

test('眨眼在间隔内不重叠', function () {
  let state = newBlinkState(0, 0);
  assert.ok(state.nextAt >= DEFAULTS.blinkMinGap);

  // 第一次眨眼
  let r = stepBlink(state, state.nextAt, 0);
  assert.equal(r.changed, true);
  const closeMid = stepBlink(r.state, state.nextAt + 40, 0);
  assert.ok(closeMid.value > 0);

  // 眨眼结束后会排出下一次，且不会立刻再眨
  const after = stepBlink(r.state, state.nextAt + 200, 0);
  assert.equal(after.value, 0);
  assert.ok(after.state.nextAt > state.nextAt + 200);
});

test('composeFrame 输出的上下层不同步', function () {
  const frame = composeFrame({
    t: 900,
    look: { tx: 4, ty: 2, tilt: 0.4 },
    press: { sx: 1, sy: 1, glow: 0 },
    motionScale: 1,
    opts: {}
  });
  assert.notEqual(frame.upper.x, frame.lower.x);
  assert.ok(frame.lower.x < frame.upper.x);
});

test('transform 字符串可被 CSS 解析', function () {
  const s = toTransform({ x: 1.234, y: -0.5, rot: 0.4, sx: 1.02, sy: 0.98 });
  assert.match(s, /^translate3d\(1\.23px,-0\.50px,0\) rotate\(0\.400deg\) scale\(1\.0200,0\.9800\)$/);
});
