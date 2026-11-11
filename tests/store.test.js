import test from 'node:test';
import assert from 'node:assert/strict';

import { createStore, KEYS, assetKey } from '../src/services/store.js';
import { createHost } from '../src/services/host.js';

function mockRoche(initial) {
  const data = Object.assign({}, initial || {});
  return {
    storage: {
      get(k) {
        return Promise.resolve(data[k] === undefined ? undefined : JSON.parse(JSON.stringify(data[k])));
      },
      set(k, v) {
        data[k] = JSON.parse(JSON.stringify(v));
        return Promise.resolve(true);
      },
      delete(k) {
        delete data[k];
        return Promise.resolve(true);
      }
    },
    __data: data
  };
}

test('写入有 debounce，flush 后落盘', async function () {
  const roche = mockRoche();
  const store = createStore(createHost(roche));

  store.save('settings', { a: 1 });
  assert.equal(roche.__data[KEYS.settings], undefined);

  await store.flush();
  assert.deepEqual(roche.__data[KEYS.settings], { a: 1 });
});

test('多次写同一个 key 只落最后一次', async function () {
  const roche = mockRoche();
  const store = createStore(createHost(roche));

  store.save('vitals', { energy: 1 });
  store.save('vitals', { energy: 2 });
  store.save('vitals', { energy: 3 });
  await store.flush();

  assert.deepEqual(roche.__data[KEYS.vitals], { energy: 3 });
});

test('图片单独存 key，不混进索引', async function () {
  const roche = mockRoche();
  const store = createStore(createHost(roche));

  store.save('assetIndex', { abcd1234: { name: '立绘', slot: 'portrait', at: 1 } });
  await store.putAsset({ id: 'abcd1234', dataUrl: 'data:image/png;base64,AA' });
  await store.flush();

  assert.ok(roche.__data[assetKey('abcd1234')]);
  assert.equal(roche.__data[KEYS.assetIndex].abcd1234.dataUrl, undefined);
});

test('loadAssetData 只回 dataURL', async function () {
  const roche = mockRoche({
    'oc:asset:abcd1234': 'data:image/png;base64,AA',
    'oc:asset:efgh5678': 'not-an-image'
  });
  const store = createStore(createHost(roche));
  const loaded = await store.loadAssetData(['abcd1234', 'efgh5678', 'missing']);
  assert.deepEqual(Object.keys(loaded), ['abcd1234']);
});

test('导出带图片，能再导入', async function () {
  const roche = mockRoche({
    'oc:settings': { charName: '沈时' },
    'oc:assetIndex': { abcd1234: { name: '立绘', slot: 'portrait', at: 1 } },
    'oc:asset:abcd1234': 'data:image/png;base64,AA'
  });
  const store = createStore(createHost(roche));
  const payload = await store.exportAll();

  assert.equal(payload.kind, 'otome-companion-export');
  assert.equal(payload.data.settings.charName, '沈时');
  assert.ok(payload.assets.abcd1234);
});

test('clearAll 会连图片一起删', async function () {
  const roche = mockRoche({
    'oc:assetIndex': { abcd1234: { name: 'x', slot: 'portrait', at: 1 } },
    'oc:asset:abcd1234': 'data:image/png;base64,AA',
    'oc:settings': { a: 1 }
  });
  const store = createStore(createHost(roche));
  await store.clearAll();

  assert.equal(roche.__data['oc:asset:abcd1234'], undefined);
  assert.equal(roche.__data['oc:settings'], undefined);
});

test('宿主没有 storage 时退化为内存但接口不崩', async function () {
  const store = createStore(createHost({}));
  store.save('settings', { a: 2 });
  await store.flush();
  const all = await store.loadAll();
  assert.deepEqual(all.settings, { a: 2 });
});
