import test from 'node:test';
import assert from 'node:assert/strict';

import { parseCommands, numericDelta, firstOf, hasResidue } from '../src/core/commands.js';

test('解析合法指令并清掉正文里的标记', function () {
  const r = parseCommands('别站那么远。\n[[oc:motion:lean]]\n[[oc:expr:shy]]');
  assert.equal(r.text, '别站那么远。');
  assert.equal(r.commands.length, 2);
  assert.equal(firstOf(r.commands, 'motion'), 'lean');
  assert.equal(firstOf(r.commands, 'expr'), 'shy');
});

test('未知类型整条丢弃', function () {
  const r = parseCommands('嗯。[[oc:teleport:home]]');
  assert.equal(r.commands.length, 0);
  assert.equal(r.text, '嗯。');
  assert.equal(hasResidue(r.text), false);
});

test('动作不在白名单时丢弃', function () {
  const r = parseCommands('[[oc:motion:fly]]');
  assert.equal(r.commands.length, 0);
});

test('同类型只保留第一条', function () {
  const r = parseCommands('[[oc:expr:smile]][[oc:expr:sad]]');
  assert.equal(r.commands.length, 1);
  assert.equal(r.commands[0].arg, 'smile');
});

test('好感与能量有上限钳制', function () {
  const a = parseCommands('[[oc:affinity:+9]]');
  assert.equal(a.commands[0].arg, '+2');
  const b = parseCommands('[[oc:energy:-99]]');
  assert.equal(b.commands[0].arg, '-3');
});

test('非数字参数被丢弃', function () {
  assert.equal(parseCommands('[[oc:affinity:很多]]').commands.length, 0);
  assert.equal(parseCommands('[[oc:affinity:0]]').commands.length, 0);
});

test('纯文本不受影响', function () {
  const text = '今天下雨了，记得带伞。';
  const r = parseCommands(text);
  assert.equal(r.text, text);
  assert.equal(r.commands.length, 0);
});

test('半截标记不算指令但能被识别为残留', function () {
  const r = parseCommands('我在 [[oc:motion:');
  assert.equal(r.commands.length, 0);
  assert.equal(hasResidue(r.text), true);
});

test('数值指令聚合成一次增量', function () {
  const r = parseCommands('[[oc:affinity:+2]][[oc:energy:-1]]');
  const d = numericDelta(r.commands);
  assert.equal(d.affinity, 2);
  assert.equal(d.energy, -1);
});

test('小写 type 大小写混写都能认', function () {
  const r = parseCommands('[[OC:MOTION:WAVE]]');
  assert.equal(r.commands.length, 1);
  assert.equal(r.commands[0].arg, 'wave');
});
