/**
 * 无头 Edge 端到端验证：加载真实产物 plugin.js，通过 CDP 真实点按。
 * 运行：npm run e2e（需要先 npm run build）
 * 自定义浏览器：$env:EDGE_PATH="...\msedge.exe"
 */

import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { mkdtempSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { extname, join, resolve } from 'node:path';

const ROOT = resolve('.');
const EDGE = process.env.EDGE_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const HTTP_PORT = 8124;
const CDP_PORT = 9334;
const SHOT_DIR = join(ROOT, 'dev', 'shots');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp'
};

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: !!ok, detail: detail === undefined ? '' : String(detail) });
  console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail === undefined ? '' : '  → ' + detail));
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------------- 静态服务器 ---------------- */

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const url = decodeURIComponent(String(req.url || '/').split('?')[0]);
      const file = resolve(ROOT, '.' + (url === '/' ? '/dev/preview.html' : url));
      if (!file.startsWith(ROOT)) {
        res.writeHead(403).end('forbidden');
        return;
      }
      const info = await stat(file);
      if (!info.isFile()) throw new Error('not a file');
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
      res.end(body);
    } catch (e) {
      res.writeHead(404).end('not found');
    }
  });
  return new Promise((ok) => server.listen(HTTP_PORT, '127.0.0.1', () => ok(server)));
}

/* ---------------- CDP ---------------- */

async function waitForCdp() {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch('http://127.0.0.1:' + CDP_PORT + '/json/list');
      const list = await res.json();
      const page = list.find((t) => t.type === 'page');
      if (page && page.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch (e) { /* 还没起来 */ }
    await sleep(200);
  }
  throw new Error('Edge 调试端口没有就绪');
}

function createCdp(ws) {
  let seq = 0;
  const pending = new Map();
  const listeners = [];

  ws.addEventListener('message', (event) => {
    let msg;
    try { msg = JSON.parse(String(event.data)); } catch (e) { return; }
    if (msg.id && pending.has(msg.id)) {
      const p = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) p.reject(new Error(msg.error.message || 'cdp error'));
      else p.resolve(msg.result);
      return;
    }
    listeners.forEach((fn) => fn(msg));
  });

  return {
    send(method, params) {
      const id = ++seq;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params: params || {} }));
      });
    },
    on(fn) { listeners.push(fn); },
    close() { try { ws.close(); } catch (e) { /* 忽略 */ } }
  };
}

async function launchEdge(userDataDir) {
  const child = spawn(EDGE, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--mute-audio',
    '--no-first-run',
    '--no-default-browser-check',
    '--remote-debugging-port=' + CDP_PORT,
    '--user-data-dir=' + userDataDir,
    '--window-size=460,940',
    'about:blank'
  ], { stdio: 'ignore' });
  return child;
}

/* ---------------- 主流程 ---------------- */

const PAGE_URL = 'http://127.0.0.1:' + HTTP_PORT + '/dev/preview.html';

async function main() {
  if (!existsSync(join(ROOT, 'plugin.js'))) {
    console.error('先执行 npm run build');
    process.exit(1);
  }

  await mkdir(SHOT_DIR, { recursive: true });
  const server = await startServer();
  const userDataDir = mkdtempSync(join(tmpdir(), 'oc-e2e-'));
  const edge = await launchEdge(userDataDir);

  let cdp = null;
  const errors = [];

  try {
    const wsUrl = await waitForCdp();
    const ws = new WebSocket(wsUrl);
    await new Promise((ok, fail) => {
      ws.addEventListener('open', ok, { once: true });
      ws.addEventListener('error', fail, { once: true });
    });
    cdp = createCdp(ws);

    cdp.on((msg) => {
      if (msg.method === 'Runtime.exceptionThrown') {
        const d = msg.params && msg.params.exceptionDetails;
        errors.push('exception: ' + (d && (d.text + ' ' + ((d.exception && d.exception.description) || ''))));
      }
      if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
        errors.push('console.error: ' + (msg.params.args || []).map((a) => a.value || a.description || '').join(' '));
      }
      if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
        const text = String(msg.params.entry.text || '');
        // 预览页没有 favicon，这类资源 404 不算插件问题
        if (!/Failed to load resource/.test(text)) errors.push('log: ' + text);
      }
    });

    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Log.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 460, height: 940, deviceScaleFactor: 2, mobile: true
    });

    await cdp.send('Page.navigate', { url: PAGE_URL });
    await sleep(1200);

    const evalJs = async (expression) => {
      const res = await cdp.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (res.exceptionDetails) return undefined;
      return res.result && res.result.value;
    };

    for (let i = 0; i < 30; i++) {
      const ready = await evalJs("!!document.querySelector('.oc-root .oc-dock')");
      if (ready) break;
      await sleep(200);
    }

    /* ---------- 结构 ---------- */
    check('舞台挂载', await evalJs("!!document.querySelector('.oc-render')"));
    check('底部四入口', (await evalJs("document.querySelectorAll('.oc-dock__item').length")) === 4);
    check('HUD 顶部', await evalJs("!!document.querySelector('.oc-top')"));
    check('FOCUS 卡', await evalJs("!!document.querySelector('.oc-focuscard')"));
    check('角色状态卡', await evalJs("!!document.querySelector('.oc-statuscard')"));
    check('首次引导可见', await evalJs("!!document.querySelector('.oc-guide') && getComputedStyle(document.querySelector('.oc-guide')).display !== 'none'"));

    const phoneRect = await evalJs("(function(){var r=document.querySelector('.phone').getBoundingClientRect();return {x:r.left,y:r.top,w:r.width,h:r.height};})()");

    async function shot(name) {
      if (!phoneRect) return;
      const cap = await cdp.send('Page.captureScreenshot', {
        format: 'png',
        clip: { x: phoneRect.x, y: phoneRect.y, width: phoneRect.w, height: phoneRect.h, scale: 1 }
      });
      await writeFile(join(SHOT_DIR, name + '.png'), Buffer.from(cap.data, 'base64'));
      console.log('截图：dev/shots/' + name + '.png');
    }

    async function clickEl(selector) {
      const rect = await evalJs('(function(){var el=document.querySelector(' + JSON.stringify(selector) + ');if(!el)return null;var r=el.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};})()');
      if (!rect) return false;
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: rect.x, y: rect.y, button: 'none' });
      await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: rect.x, y: rect.y, button: 'left', clickCount: 1 });
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: rect.x, y: rect.y, button: 'left', clickCount: 1 });
      await sleep(420);
      return true;
    }

    /* ---------- 切面板 ---------- */
    check('点 CHAT 打开通讯', await clickEl('.oc-dock__item[data-route="chat"]'));
    check('通讯面板已开', await evalJs("document.querySelector('.oc-sheet').classList.contains('is-open')"));
    check('面板标题是通讯', (await evalJs("document.querySelector('.oc-sheet__title').textContent")) === '通讯');

    check('点关闭', await clickEl('.oc-sheet__close'));
    check('面板已收起', await evalJs("!document.querySelector('.oc-sheet').classList.contains('is-open')"));

    /* ---------- 塞演示立绘 ---------- */
    check('点演示立绘', await clickEl('#mockPortrait'));
    await sleep(1600);
    for (let i = 0; i < 20; i++) {
      const ok = await evalJs("!!document.querySelector('.oc-char__img') && !!document.querySelector('.oc-char__img').src");
      if (ok) break;
      await sleep(200);
    }
    const diag = await evalJs("(function(){var raw=localStorage.getItem('otome-companion:mock-storage')||'{}';var s={};try{s=JSON.parse(raw);}catch(e){}var imgs=document.querySelectorAll('.oc-char__img');return {keys:Object.keys(s),imgs:imgs.length,src:imgs[0]?(imgs[0].getAttribute('src')||'').slice(0,26):'none',wardrobe:(s['oc:wardrobe']||[])[0]||null,index:s['oc:assetIndex']||null};})()");
    if (diag) console.log('diag ' + JSON.stringify(diag).slice(0, 400));
    check('立绘已加载', await evalJs("!!document.querySelector('.oc-char__img').getAttribute('src')"));
    check('引导已消失', await evalJs("getComputedStyle(document.querySelector('.oc-guide')).display === 'none'"));

    /* ---------- 点角色 ---------- */
    await clickEl('.oc-char');
    await sleep(300);
    check('点触出现气泡', await evalJs("document.querySelector('.oc-bubble').classList.contains('is-on')"));

    /* ---------- 截图 ---------- */
    await shot('stage');

    await clickEl('.oc-dock__item[data-route="scene"]');
    await sleep(500);
    await shot('scene');

    /* ---------- 其他面板截图 ---------- */
    await clickEl('.oc-sheet__close');
    await clickEl('.oc-dock__item[data-route="wardrobe"]');
    await sleep(500);
    await shot('wardrobe');
    await clickEl('.oc-sheet__close');

    await clickEl('.oc-dock__item[data-route="chat"]');
    await sleep(400);
    await shot('chat');
    await clickEl('.oc-sheet__close');

    await clickEl('.oc-dock__item[data-route="focus"]');
    await sleep(400);
    await shot('focus');
    await clickEl('.oc-sheet__close');

    await clickEl('.oc-side .oc-roundbtn');
    await sleep(500);
    await shot('logs');
    await clickEl('.oc-drawer .oc-sheet__close');

    check('运行无报错', errors.length === 0, errors.slice(0, 3).join(' | '));
  } finally {
    if (cdp) cdp.close();
    try { edge.kill(); } catch (e) { /* 忽略 */ }
    server.close();
    await sleep(400);
    try { rmSync(userDataDir, { recursive: true, force: true }); } catch (e) { /* 忽略 */ }
  }

  const failed = results.filter((r) => !r.ok);
  console.log('\n' + (results.length - failed.length) + ' / ' + results.length + ' 通过');
  process.exit(failed.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
