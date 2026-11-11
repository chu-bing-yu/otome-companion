import test from 'node:test';
import assert from 'node:assert/strict';

import {
  defaultVitals, normalizeVitals, applyEvent, levelOf, energyFactor, addCompanyMs
} from '../src/core/vitals.js';
import { dayKey } from '../src/core/format.js';

const NOW = new Date('2026-11-11T10:00:00').getTime();

test('默认数值在初始范围内', function () {
  const v = defaultVitals(NOW);
  assert.equal(v.day, dayKey(NOW));
  assert.ok(v.energy > 0 && v.energy <= v.energyMax);
  assert.equal(v.affinity, 0);
  assert.equal(v.rounds, 0);
});

test('点触扣能量、加经验', function () {
  const before = defaultVitals(NOW);
  const { vitals, delta } = applyEvent(before, { type: 'tap' }, NOW);
  assert.equal(vitals.energy, before.energy - 1);
  assert.ok(vitals.xp > before.xp);
  assert.equal(delta.energy, -1);
});

test('能量不会掉到负数以下', function () {
  const low = Object.assign(defaultVitals(NOW), { energy: 0 });
  const { vitals } = applyEvent(low, { type: 'tap' }, NOW);
  assert.equal(vitals.energy, 0);
});

test('完成一轮专注：加好感与轮次、扣能量', function () {
  const before = defaultVitals(NOW);
  const { vitals } = applyEvent(before, { type: 'focusRound', ms: 25 * 60000 }, NOW);
  assert.equal(vitals.rounds, before.rounds + 1);
  assert.equal(vitals.affinity, before.affinity + 2);
  assert.equal(vitals.focusMs, 25 * 60000);
  assert.ok(vitals.energy < before.energy);
});

test('送礼回能量并加好感', function () {
  const before = Object.assign(defaultVitals(NOW), { energy: 40 });
  const { vitals } = applyEvent(before, { type: 'gift' }, NOW);
  assert.ok(vitals.energy > before.energy);
  assert.equal(vitals.affinity, before.affinity + 3);
  assert.equal(vitals.gifts, 1);
});

test('能量上限被钳制', function () {
  const full = Object.assign(defaultVitals(NOW), { energy: 100 });
  const { vitals } = applyEvent(full, { type: 'gift' }, NOW);
  assert.equal(vitals.energy, 100);
});

test('跨天重置今日共处与聊天计数，并回复能量', function () {
  const yesterday = new Date('2026-11-10T22:00:00').getTime();
  const old = Object.assign(defaultVitals(yesterday), {
    energy: 20,
    todayMs: 3600e3,
    chatToday: 12
  });
  const v = normalizeVitals(old, NOW, 100);
  assert.equal(v.day, dayKey(NOW));
  assert.equal(v.todayMs, 0);
  assert.equal(v.chatToday, 0);
  assert.ok(v.energy > 20);
});

test('陪伴时长按秒累加', function () {
  const v0 = defaultVitals(NOW);
  const v1 = addCompanyMs(v0, 5000, NOW);
  assert.equal(v1.todayMs, 5000);
  assert.equal(v1.totalMs, 5000);
});

test('低能量时互动收益打折', function () {
  const healthy = Object.assign(defaultVitals(NOW), { energy: 80, affinity: 0 });
  const tired = Object.assign(defaultVitals(NOW), { energy: 10, affinity: 0 });
  const a = applyEvent(healthy, { type: 'chat' }, NOW).vitals;
  const b = applyEvent(tired, { type: 'chat' }, NOW).vitals;
  assert.ok(a.affinity >= b.affinity);
  assert.equal(energyFactor(tired), 0.7);
});

test('聊天每日有上限', function () {
  const capped = Object.assign(defaultVitals(NOW), { chatToday: 20 });
  const { vitals, note } = applyEvent(capped, { type: 'chat' }, NOW);
  assert.equal(note, 'chat_cap');
  assert.equal(vitals.affinity, capped.affinity);
});

test('等级按经验递增', function () {
  const v = defaultVitals(NOW);
  assert.equal(levelOf(v), 1);
  assert.equal(levelOf(Object.assign({}, v, { xp: 120 })), 2);
  assert.equal(levelOf(Object.assign({}, v, { xp: 240 })), 3);
});
