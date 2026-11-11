/**
 * 一键发布：build → test → commit → tag → push。
 * 走 git，不经 REST API（大文件更稳，也不会被限流）。
 *
 *   npm run ship
 *   npm run ship -- "加了眨眼"
 *
 * 版本号以 package.json 为准，每次发布前必须先递增，
 * 否则宿主判定「已最新」不会更新。
 */

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

function run(cmd, args, opts) {
  return execFileSync(cmd, args, Object.assign({ stdio: 'inherit', encoding: 'utf8' }, opts || {}));
}

function capture(cmd, args) {
  return execFileSync(cmd, args, { encoding: 'utf8' }).trim();
}

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const manifest = JSON.parse(readFileSync('manifest.json', 'utf8'));

if (pkg.version !== manifest.version) {
  console.error(`版本号不一致：package.json=${pkg.version}  manifest.json=${manifest.version}`);
  process.exit(1);
}

const msg = process.argv.slice(2).join(' ').trim() || 'update';
const tag = 'v' + pkg.version;

console.log('==> build v' + pkg.version);
run(process.execPath, ['build.mjs']);

console.log('==> test');
run(process.execPath, ['--test']);

console.log('==> commit');
run('git', ['add', '-A']);
let dirty = true;
try {
  capture('git', ['diff', '--cached', '--name-only']);
  dirty = capture('git', ['diff', '--cached', '--name-only']).length > 0;
} catch (e) {
  dirty = true;
}

if (dirty) {
  run('git', ['-c', 'core.safecrlf=false', 'commit', '-m', `v${pkg.version} : ${msg}`]);
} else {
  console.log('（没有文件改动，跳过 commit）');
}

run('git', ['tag', '-f', tag]);

console.log('==> push');
run('git', ['push', 'origin', 'main']);
run('git', ['push', '-f', 'origin', tag]);

console.log(`完成：${tag} 已推送`);
console.log('核对：https://raw.githubusercontent.com/chu-bing-yu/otome-companion/main/manifest.json?x=' + Date.now());
