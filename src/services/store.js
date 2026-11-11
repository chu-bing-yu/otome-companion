/**
 * 持久化：主数据一个 key 一份，图片单独 key（oc:asset:<id>），
 * 避免每次心跳把几 MB 的 dataURL 跟着小对象一起重写。
 * 写操作 400ms debounce；unmount 时 flush。
 */

import { MAX_ASSETS } from '../core/assets.js';

export var KEYS = {
  settings: 'oc:settings',
  vitals: 'oc:vitals',
  session: 'oc:session',
  wardrobe: 'oc:wardrobe',
  scenes: 'oc:scenes',
  props: 'oc:props',
  logs: 'oc:logs',
  memories: 'oc:memories',
  zones: 'oc:zones',
  chat: 'oc:chat',
  meta: 'oc:meta',
  assetIndex: 'oc:assetIndex'
};

export function assetKey(id) {
  return 'oc:asset:' + id;
}

var DEBOUNCE_MS = 400;

export function createStore(host) {
  var pending = {};
  var timer = null;
  var writing = null;

  function flush() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    var batch = pending;
    pending = {};
    var keys = Object.keys(batch);
    if (!keys.length) return Promise.resolve();
    writing = Promise.all(keys.map(function (key) {
      return host.storage.set(key, batch[key]);
    }));
    return writing;
  }

  function schedule(key, value) {
    pending[key] = value;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      timer = null;
      flush();
    }, DEBOUNCE_MS);
  }

  async function read(key, fallback) {
    var value = await host.storage.get(key);
    return value === undefined || value === null ? fallback : value;
  }

  async function loadAll() {
    var keys = Object.keys(KEYS);
    var values = await Promise.all(keys.map(function (k) { return read(KEYS[k], null); }));
    var out = {};
    keys.forEach(function (k, i) { out[k] = values[i]; });
    return out;
  }

  /** 启动时只取当前要显示的那几张图，其余用到再懒加载 */
  async function loadAssetData(ids) {
    var out = {};
    var list = (ids || []).filter(function (id) { return /^[a-z0-9]{4,40}$/i.test(String(id || '')); });
    await Promise.all(list.map(async function (id) {
      var value = await read(assetKey(id), '');
      if (typeof value === 'string' && /^data:image\//i.test(value)) out[id] = value;
    }));
    return out;
  }

  async function putAsset(record) {
    if (!record || !record.id) return false;
    var ok = await host.storage.set(assetKey(record.id), record.dataUrl);
    return ok;
  }

  async function removeAsset(id) {
    return host.storage.remove(assetKey(id));
  }

  /** 清掉索引里已经不存在的图片 key，避免存储里留垃圾 */
  async function pruneAssets(index) {
    var ids = Object.keys(index || {});
    if (ids.length <= MAX_ASSETS) return;
    ids.slice(MAX_ASSETS).forEach(function (id) { removeAsset(id); });
  }

  function save(which, value) {
    var key = KEYS[which];
    if (!key) return;
    schedule(key, value);
  }

  async function exportAll() {
    await flush();
    var data = await loadAll();
    var index = data.assetIndex && typeof data.assetIndex === 'object' ? data.assetIndex : {};
    var assets = await loadAssetData(Object.keys(index));
    return {
      kind: 'otome-companion-export',
      version: 1,
      exportedAt: Date.now(),
      data: data,
      assets: assets
    };
  }

  async function clearAll() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    pending = {};
    var keys = Object.keys(KEYS).map(function (k) { return KEYS[k]; });
    var index = await read(KEYS.assetIndex, {});
    Object.keys(index || {}).forEach(function (id) { keys.push(assetKey(id)); });
    await Promise.all(keys.map(function (key) { return host.storage.remove(key); }));
  }

  return {
    KEYS: KEYS,
    loadAll: loadAll,
    loadAssetData: loadAssetData,
    putAsset: putAsset,
    removeAsset: removeAsset,
    pruneAssets: pruneAssets,
    save: save,
    flush: flush,
    exportAll: exportAll,
    clearAll: clearAll
  };
}
