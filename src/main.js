import themeCss from './ui/theme.css';
import baseCss from './ui/base.css';
import stageCss from './ui/stage.css';
import { createApp } from './app/container.js';
import { mountShell } from './app/shell.js';

var STYLE_ID = 'otome-companion-style';
var CSS = [themeCss, baseCss, stageCss].join('\n');

var shell = null;
var app = null;

function ensureStyle() {
  if (document.getElementById(STYLE_ID)) return;
  var style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}

function removeStyle() {
  var style = document.getElementById(STYLE_ID);
  if (style && style.parentNode) style.parentNode.removeChild(style);
}

/** 弹层挂在 body 上，卸载时一并清理，避免残留遮罩与 toast */
function removeOrphans() {
  var nodes = document.querySelectorAll('.oc-mask, .oc-toast');
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].parentNode) nodes[i].parentNode.removeChild(nodes[i]);
  }
}

async function mount(container, roche) {
  ensureStyle();
  container.classList.add('oc-host');
  var created = await createApp({ container: container, roche: roche, version: __VERSION__ });
  app = created;
  shell = mountShell(container, created.ctx);
}

async function unmount(container) {
  if (shell) {
    shell.destroy();
    shell = null;
  }
  if (app) {
    app.destroy();
    app = null;
  }
  removeOrphans();
  container.replaceChildren();
  container.classList.remove('oc-host');
  removeStyle();
}

window.RochePlugin.register({
  id: 'otome-companion',
  name: '乙游陪伴',
  version: __VERSION__,
  description: '立绘舞台、点触互动、陪伴与专注、衣装场景礼物、日志与回忆。',
  apps: [
    {
      id: 'otome-companion-home',
      name: '夜之章',
      icon: 'heart',
      iconImage: '',
      mount: mount,
      unmount: unmount
    }
  ]
});
