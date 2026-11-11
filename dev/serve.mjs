/** 本地预览服务器：npm run preview → http://127.0.0.1:8124/dev/preview.html */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

const ROOT = resolve('.');
const PORT = Number(process.env.PORT) || 8124;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
};

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
    res.writeHead(200, {
      'content-type': MIME[extname(file)] || 'application/octet-stream',
      'cache-control': 'no-store'
    });
    res.end(body);
  } catch (e) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('not found');
  }
});

server.listen(PORT, '127.0.0.1', function () {
  console.log('预览：http://127.0.0.1:' + PORT + '/dev/preview.html');
  console.log('按 Ctrl+C 结束');
});
