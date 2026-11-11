/**
 * 宿主适配层：全项目唯一允许接触 roche.* 的文件。
 * 负责能力探测、异常兜底与统一返回，业务层不直接碰 roche。
 */

function isFn(obj, name) {
  return !!obj && typeof obj[name] === 'function';
}

function clone(value) {
  if (value === undefined) return undefined;
  try { return JSON.parse(JSON.stringify(value)); } catch (e) { return value; }
}

export function createHost(roche) {
  var api = roche || {};
  var memory = {};
  var storageUsable = isFn(api.storage, 'get') && isFn(api.storage, 'set');

  var caps = {
    storage: storageUsable,
    storageDelete: isFn(api.storage, 'delete'),
    ui: !!api.ui,
    uiToast: isFn(api.ui, 'toast'),
    uiConfirm: isFn(api.ui, 'confirm'),
    uiClose: isFn(api.ui, 'closeApp'),
    character: isFn(api.character, 'list'),
    persona: isFn(api.persona, 'getActiveUserPersona'),
    personaForConversation: isFn(api.persona, 'getUserPersonaForConversation'),
    conversation: isFn(api.conversation, 'list'),
    memory: isFn(api.memory, 'getLongTerm'),
    memoryShort: isFn(api.memory, 'getShortTerm'),
    worldbook: isFn(api.worldbook, 'list'),
    ai: isFn(api.ai, 'chat')
  };

  async function safe(label, fn, fallback) {
    try {
      return await fn();
    } catch (e) {
      if (window.console && console.warn) console.warn('[otome-companion] ' + label + ' 失败:', e && e.message);
      return fallback;
    }
  }

  var storage = {
    async get(key) {
      if (!storageUsable) return clone(memory[key]);
      var v = await safe('storage.get ' + key, function () { return api.storage.get(key); }, undefined);
      return v === undefined ? clone(memory[key]) : v;
    },
    async set(key, value) {
      memory[key] = clone(value);
      if (!storageUsable) return false;
      var ok = await safe('storage.set ' + key, function () { return api.storage.set(key, clone(value)); }, false);
      return ok !== false;
    },
    async remove(key) {
      delete memory[key];
      if (!caps.storageDelete) return true;
      await safe('storage.delete ' + key, function () { return api.storage.delete(key); }, null);
      return true;
    }
  };

  var ui = {
    toast(message) {
      if (caps.uiToast) {
        safe('ui.toast', function () { return api.ui.toast(message); });
        return;
      }
      if (window.console) console.info('[toast]', message);
    },
    async confirm(opts) {
      if (caps.uiConfirm) {
        var r = await safe('ui.confirm', function () { return api.ui.confirm(opts); }, null);
        if (typeof r === 'boolean') return r;
      }
      return window.confirm((opts && opts.title ? opts.title + '\n\n' : '') + (opts && opts.message ? opts.message : ''));
    },
    closeApp() {
      if (caps.uiClose) safe('ui.closeApp', function () { return api.ui.closeApp(); });
    }
  };

  var character = {
    async list() {
      if (!caps.character) return [];
      var r = await safe('character.list', function () { return api.character.list(); }, []);
      return Array.isArray(r) ? r : [];
    },
    async get(id) {
      if (!isFn(api.character, 'get') || !id) return null;
      return await safe('character.get', function () { return api.character.get(id); }, null);
    }
  };

  var persona = {
    async active() {
      if (!caps.persona) return null;
      return await safe('persona.getActiveUserPersona', function () { return api.persona.getActiveUserPersona(); }, null);
    },
    async forConversation(conversationId) {
      if (!conversationId) return persona.active();
      if (caps.personaForConversation) {
        var p = await safe('persona.getUserPersonaForConversation', function () {
          return api.persona.getUserPersonaForConversation(conversationId);
        }, null);
        if (p) return p;
      }
      return persona.active();
    }
  };

  var memoryApi = {
    async shortTerm(conversationId, limit) {
      if (!caps.memoryShort) return [];
      var r = await safe('memory.getShortTerm', function () {
        return api.memory.getShortTerm({ conversationId: conversationId, limit: limit || 8 });
      }, []);
      return Array.isArray(r) ? r : [];
    },
    async longTerm(conversationId) {
      if (!caps.memory) return null;
      return await safe('memory.getLongTerm', function () {
        return api.memory.getLongTerm({ conversationId: conversationId });
      }, null);
    }
  };

  var ai = {
    /** 统一返回 { ok, text } / { ok:false, reason }，业务层不再 try/catch */
    async chat(opts) {
      if (!caps.ai) return { ok: false, reason: 'no_api' };
      try {
        var r = await api.ai.chat(opts);
        var text = r && (r.text || r.content || r.message);
        if (!text) return { ok: false, reason: 'empty' };
        return {
          ok: true,
          text: String(text),
          model: String((r && (r.model || r.modelName)) || '')
        };
      } catch (e) {
        if (window.console && console.warn) console.warn('[otome-companion] ai.chat 失败:', e && e.message);
        return { ok: false, reason: 'error', error: e };
      }
    }
  };

  return {
    caps: caps,
    raw: api,
    storage: storage,
    ui: ui,
    character: character,
    persona: persona,
    ai: ai,
    memory: memoryApi
  };
}
