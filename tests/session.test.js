import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createSession, remainingOf, progressOf, isExpired, pause, resume,
  complete, abort, restore, nextRound, isLastRound, STATUS, KIND
} from '../src/core/session.js';

const NOW = new Date('2026-11-11T10:00:00').getTime();

test('新建会话按 endAt 计算剩余', function () {
  const s = createSession({ totalMs: 25000 }, NOW);
  assert.equal(s.status, STATUS.RUNNING);
  assert.equal(remainingOf(s, NOW + 5000), 20000);
  assert.equal(progressOf(s, NOW + 5000), 0.2);
});

test('暂停后剩余时间不再随真实时间减少', function () {
  const s = createSession({ totalMs: 25000 }, NOW);
  const p = pause(s, NOW + 5000);
  assert.equal(p.status, STATUS.PAUSED);
  assert.equal(remainingOf(p, NOW + 60000), 20000);
});

test('恢复后从剩余时间继续', function () {
  const s = createSession({ totalMs: 25000 }, NOW);
  const p = pause(s, NOW + 5000);
  const r = resume(p, NOW + 60000);
  assert.equal(r.status, STATUS.RUNNING);
  assert.equal(remainingOf(r, NOW + 60000), 20000);
  assert.equal(remainingOf(r, NOW + 70000), 10000);
});

test('到期判定只在运行态生效', function () {
  const s = createSession({ totalMs: 1000 }, NOW);
  assert.equal(isExpired(s, NOW + 999), false);
  assert.equal(isExpired(s, NOW + 1001), true);
  assert.equal(isExpired(pause(s, NOW), NOW + 5000), false);
});

test('重开 App 时过期会话直接判完成', function () {
  const s = createSession({ totalMs: 1000 }, NOW);
  const restored = restore(s, NOW + 5000);
  assert.equal(restored.status, STATUS.DONE);
  assert.equal(remainingOf(restored, NOW + 5000), 0);
});

test('重开 App 时未过期会话保留剩余', function () {
  const s = createSession({ totalMs: 25000 }, NOW);
  const restored = restore(s, NOW + 5000);
  assert.equal(restored.status, STATUS.RUNNING);
  assert.equal(restored.remainingMs, 20000);
});

test('脏数据不会抛错', function () {
  assert.equal(restore(null, NOW), null);
  assert.equal(restore({ status: 'weird' }, NOW).status, STATUS.DONE);
  const s = restore({ status: 'paused', remainingMs: -5, totalMs: 1000 }, NOW);
  assert.equal(s.remainingMs, 1000);
});

test('完成与中止都进 DONE', function () {
  const s = createSession({ totalMs: 1000, round: 2, rounds: 4 }, NOW);
  assert.equal(complete(s, NOW + 1000).status, STATUS.DONE);
  assert.equal(abort(s, NOW + 500).status, STATUS.DONE);
});

test('轮次推进：专注后休息，休息后进入下一轮', function () {
  const s = createSession({ totalMs: 1000, round: 1, rounds: 4 }, NOW);
  const br = nextRound(s);
  assert.equal(br.kind, KIND.BREAK);
  assert.equal(br.round, 1);

  const brSess = Object.assign({}, s, { kind: KIND.BREAK });
  const nx = nextRound(brSess);
  assert.equal(nx.kind, KIND.FOCUS);
  assert.equal(nx.round, 2);
});

test('最后一轮可识别', function () {
  const s = createSession({ totalMs: 1000, round: 4, rounds: 4 }, NOW);
  assert.equal(isLastRound(s), true);
  assert.equal(isLastRound(createSession({ totalMs: 1000, round: 3, rounds: 4 }, NOW)), false);
});
