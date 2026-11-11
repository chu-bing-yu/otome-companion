/* 本地预览用的假宿主：模拟 window.RochePlugin 与 roche.*
 * 只用于看界面与交互，不代表真实宿主能力。
 */
(function () {
  'use strict';

  var LS_KEY = 'otome-companion:mock-storage';

  function loadStore() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}'); } catch (e) { return {}; }
  }
  function saveStore(obj) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(obj)); } catch (e) {}
  }
  function clone(v) {
    if (v === undefined) return undefined;
    return JSON.parse(JSON.stringify(v));
  }
  function delay(ms) {
    return new Promise(function (r) { setTimeout(r, ms); });
  }

  var store = loadStore();

  var characters = [
    {
      id: 'ch_demo',
      name: '沈时',
      handle: '阿时',
      avatar: '',
      bio: '话不多，习惯先看着你。',
      persona: '沈时，二十七岁，住在旧城区的顶楼。说话慢，句子短，习惯先观察再开口；对在意的人会用动作而不是甜言蜜语。',
      conversationId: 'cv_demo'
    }
  ];

  var conversation = {
    id: 'cv_demo', type: 'dm', isGroup: false, name: '沈时', handle: '阿时',
    avatar: '', contactId: 'ch_demo', members: [], memberProfiles: [],
    mountedMemorySources: [], myActivePersonaId: 'persona_default'
  };

  var personas = [{ id: 'persona_default', name: '我', handle: '我', bio: '', persona: '普通用户' }];

  var settings = { aiEnabled: true, failAi: false, slowAi: false };

  function toast(msg) {
    var el = document.getElementById('oc-mock-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'oc-mock-toast';
      el.style.cssText = 'position:fixed;left:50%;bottom:48px;transform:translateX(-50%);background:rgba(0,0,0,.84);' +
        'color:#fff;padding:9px 16px;border-radius:999px;font:13px/1.4 -apple-system,"PingFang SC",sans-serif;z-index:99999;' +
        'transition:opacity .2s;pointer-events:none';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.opacity = '1';
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.style.opacity = '0'; }, 1800);
  }

  var REPLIES = [
    '……嗯，我在。\n[[oc:expr:smile]]',
    '今天想做什么。\n[[oc:motion:nod]]',
    '别站那么远。\n[[oc:affinity:+1]]\n[[oc:expr:shy]]',
    '（把书合上，抬眼看你）\n[[oc:motion:lean]]'
  ];

  var roche = {
    storage: {
      get: function (k) {
        return delay(10).then(function () {
          if (!Object.prototype.hasOwnProperty.call(store, k)) return undefined;
          return clone(store[k]);
        });
      },
      set: function (k, v) {
        return delay(10).then(function () {
          store[k] = clone(v);
          saveStore(store);
        });
      },
      delete: function (k) {
        return delay(10).then(function () {
          delete store[k];
          saveStore(store);
        });
      }
    },

    character: {
      list: function () { return delay(20).then(function () { return clone(characters); }); },
      get: function (id) {
        return delay(10).then(function () {
          var c = characters.filter(function (x) { return x.id === id; })[0];
          return c ? clone(c) : null;
        });
      }
    },

    persona: {
      getActiveUserPersona: function () { return delay(10).then(function () { return clone(personas[0]); }); },
      getUserPersonas: function () { return delay(10).then(function () { return clone(personas); }); },
      getUserPersonaForConversation: function () { return delay(10).then(function () { return clone(personas[0]); }); }
    },

    conversation: {
      list: function () { return delay(20).then(function () { return [clone(conversation)]; }); },
      get: function () { return delay(10).then(function () { return clone(conversation); }); }
    },

    memory: {
      getShortTerm: function () {
        return delay(20).then(function () {
          return [{ senderId: 'ch_demo', senderName: '沈时', text: '门没锁。', timestamp: Date.now() - 3600e3 }];
        });
      },
      getLongTerm: function () {
        return delay(20).then(function () { return { core: null, facts: [], vectors: [] }; });
      }
    },

    ai: {
      chat: function (opt) {
        var wait = settings.slowAi ? 2600 : 800;
        return delay(wait).then(function () {
          if (settings.failAi) throw new Error('mock: AI 请求失败');
          var last = (opt && opt.messages && opt.messages[opt.messages.length - 1]) || {};
          var content = String(last.content || '');
          if (content.indexOf('碰了') === -1 && content.indexOf('专注结束') === -1 && content.indexOf('礼物') === -1) {
            return { text: '（预览回复）' + content.slice(0, 16) + '\n[[oc:expr:smile]]' };
          }
          return { text: REPLIES[Math.floor(Math.random() * REPLIES.length)] };
        });
      }
    },

    ui: {
      toast: function (msg) { toast(msg); return Promise.resolve(); },
      confirm: function (opt) {
        var ok = window.confirm((opt && opt.title ? opt.title + '\n\n' : '') + (opt && opt.message ? opt.message : ''));
        return Promise.resolve(!!ok);
      },
      openApp: function () {},
      closeApp: function () {}
    }
  };

  window.RochePlugin = {
    register: function (plugin) {
      window.__registeredPlugin = plugin;
    }
  };
  window.roche = roche;
  window.__mock = {
    settings: settings,
    toast: toast,
    reset: function () {
      localStorage.removeItem(LS_KEY);
      location.reload();
    }
  };
})();
