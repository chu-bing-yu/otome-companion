/**
 * 外壳：舞台常驻，其余页面以半屏面板 / 右侧抽屉的形式叠在上面。
 * 舞台不随路由重建，立绘与 rAF 不会因为切页抖动。
 */

import { h, clear } from '../ui/dom.js';
import { icon } from '../ui/components.js';

import stageView from '../ui/views/stage.js';
import chatView from '../ui/views/chat.js';
import wardrobeView from '../ui/views/wardrobe.js';
import sceneView from '../ui/views/scene.js';
import focusView from '../ui/views/focus.js';
import propsView from '../ui/views/props.js';
import logsView from '../ui/views/logs.js';
import memoriesView from '../ui/views/memories.js';
import settingsView from '../ui/views/settings.js';

var SHEETS = {
  chat: { title: '通讯', sub: 'CHAT', view: chatView },
  wardrobe: { title: '衣装', sub: 'WARDROBE', view: wardrobeView },
  scene: { title: '场景', sub: 'SCENE', view: sceneView },
  focus: { title: '专注', sub: 'FOCUS', view: focusView },
  props: { title: '礼物', sub: 'GIFTS', view: propsView },
  settings: { title: '设置', sub: 'SETTINGS', view: settingsView }
};

var DRAWERS = {
  logs: { title: '日志', view: logsView },
  memories: { title: '回忆', view: memoriesView }
};

var DOCK = [
  { id: 'chat', label: 'CHAT', icon: 'chat', title: '通讯' },
  { id: 'wardrobe', label: 'WARDROBE', icon: 'wardrobe', title: '衣装' },
  { id: 'scene', label: 'SCENE', icon: 'scene', title: '场景' },
  { id: 'focus', label: 'FOCUS', icon: 'focus', title: '专注' }
];

export function mountShell(container, ctx) {
  var state = ctx.state;
  var initial = state.get();

  var root = h('div', { class: 'oc-root' });
  container.appendChild(root);
  container.classList.add('oc-host');

  var stage = stageView.mount(root, ctx);

  var scrim = h('div', {
    class: 'oc-scrim',
    onclick: function () { closeAll(); }
  });

  var sheetTitle = h('div', { class: 'oc-sheet__title' });
  var sheetSub = h('div', { class: 'oc-sheet__sub' });
  var sheetBody = h('div', { class: 'oc-sheet__body' });

  var sheet = h('section', { class: 'oc-sheet', 'data-open': 'false' }, [
    h('div', { class: 'oc-sheet__handle' }),
    h('div', { class: 'oc-sheet__head' }, [
      h('div', {}, [sheetTitle, sheetSub]),
      h('button', {
        class: 'oc-sheet__close', type: 'button', 'aria-label': '关闭',
        onclick: function () { ctx.actions.closeSheet(); }
      }, [icon('close')])
    ]),
    sheetBody
  ]);

  var drawerTitle = h('div', { class: 'oc-drawer__title' });
  var drawerBody = h('div', { class: 'oc-drawer__body' });
  var drawer = h('aside', { class: 'oc-drawer', 'data-open': 'false' }, [
    h('div', { class: 'oc-drawer__head' }, [
      drawerTitle,
      h('button', {
        class: 'oc-sheet__close', type: 'button', 'aria-label': '关闭',
        onclick: function () { ctx.actions.closeDrawer(); }
      }, [icon('close')])
    ]),
    drawerBody
  ]);

  var dockItems = DOCK.map(function (item) {
    var btn = h('button', {
      class: 'oc-dock__item',
      type: 'button',
      dataset: { route: item.id },
      'aria-label': item.title,
      onclick: function () {
        var s = state.get();
        if (s.sheet === item.id) ctx.actions.closeSheet();
        else ctx.actions.openSheet(item.id);
      }
    }, [
      h('span', { class: 'oc-dock__ring' }, [icon(item.icon)]),
      h('span', { class: 'oc-dock__label', text: item.label })
    ]);
    return btn;
  });

  var dock = h('nav', { class: 'oc-dock' }, dockItems);

  root.appendChild(scrim);
  root.appendChild(sheet);
  root.appendChild(drawer);
  root.appendChild(dock);

  var currentSheet = null;
  var currentDrawer = null;

  function mountSheet(name) {
    if (currentSheet && currentSheet.destroy) currentSheet.destroy();
    currentSheet = null;
    clear(sheetBody);
    var def = SHEETS[name];
    if (!def) return;
    sheetTitle.textContent = def.title;
    sheetSub.textContent = def.sub;
    currentSheet = def.view.mount(sheetBody, ctx) || null;
  }

  function mountDrawer(name) {
    if (currentDrawer && currentDrawer.destroy) currentDrawer.destroy();
    currentDrawer = null;
    clear(drawerBody);
    var def = DRAWERS[name];
    if (!def) return;
    drawerTitle.textContent = def.title;
    currentDrawer = def.view.mount(drawerBody, ctx) || null;
  }

  function syncSheet(name) {
    if (name) {
      mountSheet(name);
      sheet.classList.add('is-open');
      sheet.setAttribute('data-open', 'true');
      scrim.classList.add('is-on');
    } else {
      sheet.classList.remove('is-open');
      sheet.setAttribute('data-open', 'false');
      if (!state.get().drawer) scrim.classList.remove('is-on');
      setTimeout(function () {
        if (!state.get().sheet) {
          if (currentSheet && currentSheet.destroy) currentSheet.destroy();
          currentSheet = null;
          clear(sheetBody);
        }
      }, 360);
    }
    updateDock(name);
  }

  function syncDrawer(name) {
    if (name) {
      mountDrawer(name);
      drawer.classList.add('is-open');
      drawer.setAttribute('data-open', 'true');
      scrim.classList.add('is-on');
    } else {
      drawer.classList.remove('is-open');
      drawer.setAttribute('data-open', 'false');
      if (!state.get().sheet) scrim.classList.remove('is-on');
      setTimeout(function () {
        if (!state.get().drawer) {
          if (currentDrawer && currentDrawer.destroy) currentDrawer.destroy();
          currentDrawer = null;
          clear(drawerBody);
        }
      }, 360);
    }
  }

  function updateDock(active) {
    dockItems.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.route === active);
    });
  }

  function closeAll() {
    if (state.get().sheet) ctx.actions.closeSheet();
    if (state.get().drawer) ctx.actions.closeDrawer();
  }

  var unsubscribe = state.subscribe(function (s, keys) {
    if (keys.indexOf('sheet') !== -1) syncSheet(s.sheet);
    if (keys.indexOf('drawer') !== -1) syncDrawer(s.drawer);
  });

  if (initial.sheet) syncSheet(initial.sheet);
  if (initial.drawer) syncDrawer(initial.drawer);
  updateDock(initial.sheet);

  return {
    root: root,
    destroy: function () {
      unsubscribe();
      if (stage && stage.destroy) stage.destroy();
      if (currentSheet && currentSheet.destroy) currentSheet.destroy();
      if (currentDrawer && currentDrawer.destroy) currentDrawer.destroy();
      currentSheet = null;
      currentDrawer = null;
      clear(sheetBody);
      clear(drawerBody);
      root.remove();
      container.classList.remove('oc-host');
    }
  };
}
