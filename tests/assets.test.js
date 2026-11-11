import test from 'node:test';
import assert from 'node:assert/strict';

import {
  normalizeAssetRef, refKind, refId, normalizeAssetIndex,
  normalizeAssetRecord, resolveAssetSrc, countBySlot, refLabel, MAX_DATAURL_BYTES
} from '../src/core/assets.js';

const PNG = 'data:image/png;base64,iVBORw0KGgo=';

test('三种引用形态', function () {
  assert.equal(normalizeAssetRef('https://a.com/x.png'), 'url:https://a.com/x.png');
  assert.equal(normalizeAssetRef('url:https://a.com/x.png'), 'url:https://a.com/x.png');
  assert.equal(normalizeAssetRef('local:abcd1234'), 'local:abcd1234');
  assert.equal(normalizeAssetRef('builtin:scene-night'), 'builtin:scene-night');
});

test('非法协议一律拒绝', function () {
  assert.equal(normalizeAssetRef('javascript:alert(1)'), '');
  assert.equal(normalizeAssetRef('data:image/png;base64,xx'), '');
  assert.equal(normalizeAssetRef('file:///c:/a.png'), '');
  assert.equal(normalizeAssetRef(''), '');
});

test('kind 与 id 拆分', function () {
  assert.equal(refKind('url:https://a.com/b.png'), 'url');
  assert.equal(refId('url:https://a.com/b.png'), 'https://a.com/b.png');
  assert.equal(refKind('nope'), '');
});

test('索引记录没有 dataUrl 也要保留', function () {
  const index = normalizeAssetIndex({
    abcd1234: { name: '立绘', slot: 'portrait', w: 600, h: 900, at: 1 }
  });
  assert.ok(index.abcd1234);
  assert.equal(index.abcd1234.w, 600);
});

test('索引会按时间裁掉最旧的', function () {
  const raw = {};
  for (let i = 0; i < 50; i++) {
    raw['id' + String(i).padStart(4, '0')] = { at: i, slot: 'portrait' };
  }
  const index = normalizeAssetIndex(raw);
  assert.ok(Object.keys(index).length <= 40);
});

test('运行时 map 支持字符串与对象两种形态', function () {
  assert.equal(resolveAssetSrc('local:abcd1234', { assets: { abcd1234: PNG } }), PNG);
  assert.equal(resolveAssetSrc('local:abcd1234', { assets: { abcd1234: { dataUrl: PNG } } }), PNG);
  assert.equal(resolveAssetSrc('local:abcd1234', { assets: {} }), '');
});

test('外链与内置解析', function () {
  assert.equal(resolveAssetSrc('url:https://a.com/x.png', {}), 'https://a.com/x.png');
  assert.equal(resolveAssetSrc('builtin:night', { builtin: { night: 'https://a.com/n.png' } }), 'https://a.com/n.png');
  assert.equal(resolveAssetSrc('builtin:none', { builtin: {} }), '');
});

test('超大 dataURL 的记录被拒绝', function () {
  const huge = 'data:image/png;base64,' + 'A'.repeat(MAX_DATAURL_BYTES);
  assert.equal(normalizeAssetRecord({ id: 'abcd1234', dataUrl: huge }), null);
  assert.ok(normalizeAssetRecord({ id: 'abcd1234', dataUrl: PNG }));
});

test('槽位统计与短名', function () {
  const index = normalizeAssetIndex({
    aaaa1111: { slot: 'portrait', at: 1 },
    bbbb2222: { slot: 'scene', at: 2 }
  });
  const count = countBySlot(index);
  assert.equal(count.portrait, 1);
  assert.equal(count.scene, 1);
  assert.equal(refLabel('url:https://a.com/pic-night.png'), 'pic-night.png');
});
