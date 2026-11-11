/**
 * 伪 Live2D 渲染器：一张立绘 + 一条脖子分界线 = 上下两层。
 * 只写 transform / opacity / filter，浏览器全程走合成层，不重排。
 *
 * 单一 rAF 循环驱动，页面隐藏时暂停；所有参数来自 core/motion.js 的纯函数。
 */

import { h, clear } from '../ui/dom.js';
import {
  computeIdle, computeLookTarget, computeLookOffset, stepLook,
  computePress, toTransform, DEFAULTS
} from '../core/motion.js';

var EXPR_FILTER = {
  calm: 'none',
  smile: 'brightness(1.05) saturate(1.04)',
  shy: 'brightness(1.03) saturate(1.08)',
  sad: 'brightness(0.9) saturate(0.82)',
  surprise: 'brightness(1.07) saturate(1.02)'
};

var MOTION_DURATION = { wave: 760, nod: 620, shy: 900, lean: 820, turn: 640 };

function zeroTarget() {
  return { tx: 0, ty: 0, tilt: 0 };
}

export function createPseudoRenderer(opts) {
  var options = opts || {};
  var mount = options.mount;

  var state = {
    neck: 0.38,
    motionScale: 1,
    breath: true,
    lookFollow: true,
    anchor: { x: 0.5, y: 0.28 },
    fit: 'contain'
  };

  var root = h('div', { class: 'oc-render' });

  var sceneLayer = h('div', { class: 'oc-scene' });
  var sceneA = h('div', { class: 'oc-scene__img is-on' });
  var sceneB = h('div', { class: 'oc-scene__img' });
  var ambient = h('div', { class: 'oc-scene__ambient' });
  sceneLayer.appendChild(sceneA);
  sceneLayer.appendChild(sceneB);
  sceneLayer.appendChild(ambient);

  var stageShade = h('div', { class: 'oc-shade' });

  var charBox = h('div', { class: 'oc-char' });
  var lookLayer = h('div', { class: 'oc-char__look' });
  var breatheLayer = h('div', { class: 'oc-char__breathe' });

  var lowerImg = h('img', { class: 'oc-char__img oc-char__img--lower', alt: '', draggable: 'false' });
  var upperWrap = h('div', { class: 'oc-char__upper' });
  var upperImg = h('img', { class: 'oc-char__img oc-char__img--upper', alt: '', draggable: 'false' });
  var upperTint = h('div', { class: 'oc-char__tint' });

  upperWrap.appendChild(upperImg);
  upperWrap.appendChild(upperTint);
  breatheLayer.appendChild(lowerImg);
  breatheLayer.appendChild(upperWrap);
  lookLayer.appendChild(breatheLayer);
  charBox.appendChild(lookLayer);

  var focalGlow = h('div', { class: 'oc-char__glow' });
  var pressRing = h('div', { class: 'oc-press-ring' });
  var emptyHint = h('div', { class: 'oc-char__empty' });

  root.appendChild(sceneLayer);
  root.appendChild(stageShade);
  root.appendChild(ambient);
  root.appendChild(charBox);
  root.appendChild(focalGlow);
  root.appendChild(pressRing);
  root.appendChild(emptyHint);

  if (mount) mount.appendChild(root);

  /* ---------------- 状态与循环 ---------------- */

  var raf = 0;
  var lastAt = 0;
  var idleStart = 0;
  var look = zeroTarget();
  var pointer = null;
  var pressAt = -1e9;
  var motion = { type: '', startAt: 0, duration: 0 };
  var expression = 'calm';
  var natW = 0;
  var natH = 0;
  var portraitSrc = '';
  var destroyed = false;
  var sceneToken = 0;
  var sceneFront = true;

  function nowMs() {
    return (window.performance && performance.now) ? performance.now() : Date.now();
  }

  function applyNeck() {
    var pct = Math.round(state.neck * 1000) / 10;
    upperWrap.style.clipPath = 'polygon(0 0, 100% 0, 100% ' + pct + '%, 0 ' + pct + '%)';
    upperWrap.style.webkitClipPath = upperWrap.style.clipPath;
  }

  function motionOffset(now) {
    if (!motion.type) return { dx: 0, dy: 0, drot: 0, scale: 1 };
    var t = (now - motion.startAt) / motion.duration;
    if (t >= 1) {
      motion = { type: '', startAt: 0, duration: 0 };
      return { dx: 0, dy: 0, drot: 0, scale: 1 };
    }
    var decay = 1 - t;
    var e = Math.sin(t * Math.PI);
    switch (motion.type) {
      case 'wave':
        return { dx: Math.sin(t * Math.PI * 4) * 3 * decay, dy: -e * 1.5, drot: Math.sin(t * Math.PI * 4) * 0.6 * decay, scale: 1 };
      case 'nod':
        return { dx: 0, dy: -e * 4, drot: 0, scale: 1 };
      case 'shy':
        return { dx: 0, dy: e * 1.2, drot: -e * 0.5, scale: 1 - e * 0.012 };
      case 'lean':
        return { dx: e * 2, dy: 0, drot: e * 1.1, scale: 1 };
      case 'turn':
        return { dx: e * 2.4, dy: 0, drot: -e * 0.5, scale: 1 };
      default:
        return { dx: 0, dy: 0, drot: 0, scale: 1 };
    }
  }

  function frame(now) {
    var elapsed = idleStart ? now - idleStart : 0;
    var idle = computeIdle(elapsed, { breath: state.breath }, state.motionScale);

    var target = state.lookFollow ? computeLookOffset(
      computeLookTarget(pointer, state.anchor, { deadZone: DEFAULTS.deadZone }),
      { lookMaxX: DEFAULTS.lookMaxX * state.motionScale, lookMaxY: DEFAULTS.lookMaxY * state.motionScale, lookTilt: DEFAULTS.lookTilt * state.motionScale }
    ) : zeroTarget();

    var dt = lastAt ? (now - lastAt) / 1000 : 0;
    look = stepLook(look, target, dt, {});

    var press = computePress(now - pressAt, {});
    var extra = motionOffset(now);

    var upper = {
      x: look.tx + extra.dx,
      y: idle.shiftY + extra.dy,
      rot: idle.swayDeg + look.tilt + extra.drot,
      sx: press.sx * extra.scale,
      sy: (1 + idle.scaleY) * press.sy * extra.scale
    };
    var lower = {
      x: (look.tx + extra.dx) * 0.35,
      y: idle.shiftY * 0.55 + extra.dy * 0.4,
      rot: extra.drot * 0.3,
      sx: 1,
      sy: 1
    };

    lookLayer.style.transform = 'translate3d(' + (look.tx + extra.dx).toFixed(2) + 'px,' +
      (idle.shiftY + extra.dy).toFixed(2) + 'px,0) rotate(' + (idle.swayDeg + look.tilt + extra.drot).toFixed(3) + 'deg)';
    lowerImg.style.transform = 'translate3d(' + lower.x.toFixed(2) + 'px,' + lower.y.toFixed(2) + 'px,0)';
    upperImg.style.transform = toTransform(upper);
    upperImg.style.transformOrigin = '50% 100%';

    focalGlow.style.opacity = press.glow > 0 ? String(press.glow * 0.9) : '0';
    lastAt = now;
  }

  function loop() {
    if (destroyed) return;
    frame(nowMs());
    raf = requestAnimationFrame(loop);
  }

  function start() {
    if (raf || destroyed) return;
    lastAt = 0;
    raf = requestAnimationFrame(loop);
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function onVisibility() {
    if (document.visibilityState === 'hidden') stop();
    else start();
  }

  document.addEventListener('visibilitychange', onVisibility);
  start();

  /* ---------------- 对外接口 ---------------- */

  function setScene(scene, src) {
    var tint = (scene && scene.tint) || '#0A0D13';
    var light = (scene && scene.light) || '#E8C98A';
    root.style.setProperty('--oc-scene-tint', tint);
    root.style.setProperty('--oc-scene-light', light);
    ambient.style.background = 'radial-gradient(120% 80% at 50% 18%, ' + hexAlpha(light, 0.16) + ', transparent 62%)';

    if (!src) {
      sceneA.style.backgroundImage = '';
      sceneB.style.backgroundImage = '';
      root.classList.add('oc-render--no-scene');
      return;
    }

    root.classList.remove('oc-render--no-scene');
    var token = ++sceneToken;
    var img = new Image();
    img.onload = function () {
      if (destroyed || token !== sceneToken) return;
      var incoming = sceneFront ? sceneB : sceneA;
      var outgoing = sceneFront ? sceneA : sceneB;
      incoming.style.backgroundImage = 'url("' + src.replace(/"/g, '%22') + '")';
      incoming.classList.add('is-on');
      outgoing.classList.remove('is-on');
      sceneFront = !sceneFront;
    };
    img.onerror = function () {
      if (token !== sceneToken) return;
      sceneA.style.backgroundImage = '';
      root.classList.add('oc-render--no-scene');
    };
    img.src = src;
  }

  function hexAlpha(hex, alpha) {
    var h = String(hex || '').replace('#', '');
    if (h.length !== 6) return 'rgba(232,201,138,' + alpha + ')';
    var r = parseInt(h.slice(0, 2), 16);
    var g = parseInt(h.slice(2, 4), 16);
    var b = parseInt(h.slice(4, 6), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  function setPortrait(src) {
    portraitSrc = String(src || '');
    if (!portraitSrc) {
      lowerImg.removeAttribute('src');
      upperImg.removeAttribute('src');
      natW = 0;
      natH = 0;
      root.classList.add('oc-render--empty');
      emptyHint.textContent = '长按这里设置人物立绘';
      return;
    }
    root.classList.remove('oc-render--empty');
    emptyHint.textContent = '';
    var token = portraitSrc;
    var probe = new Image();
    probe.onload = function () {
      if (destroyed || token !== portraitSrc) return;
      natW = probe.naturalWidth || 0;
      natH = probe.naturalHeight || 0;
      root.style.setProperty('--oc-portrait-ratio', natW && natH ? String(natW / natH) : '0.62');
    };
    probe.src = portraitSrc;
    lowerImg.src = portraitSrc;
    upperImg.src = portraitSrc;
  }

  function setOptions(patch) {
    var p = patch || {};
    if (typeof p.neck === 'number') state.neck = p.neck;
    if (typeof p.motionScale === 'number') state.motionScale = p.motionScale;
    if (typeof p.breath === 'boolean') state.breath = p.breath;
    if (typeof p.lookFollow === 'boolean') state.lookFollow = p.lookFollow;
    if (p.anchor && isFinite(p.anchor.x) && isFinite(p.anchor.y)) state.anchor = { x: p.anchor.x, y: p.anchor.y };
    if (p.fit === 'cover' || p.fit === 'contain') state.fit = p.fit;
    root.setAttribute('data-fit', state.fit);
    applyNeck();
  }

  function setPointer(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
      pointer = null;
      return;
    }
    pointer = { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) };
  }

  function clearPointer() {
    pointer = null;
  }

  function setExpression(id) {
    var key = EXPR_FILTER[id] ? id : 'calm';
    expression = key;
    lowerImg.style.filter = EXPR_FILTER[key];
    upperImg.style.filter = EXPR_FILTER[key];
    root.setAttribute('data-expr', key);
  }

  function playMotion(id) {
    var duration = MOTION_DURATION[id];
    if (!duration) return;
    motion = { type: id, startAt: nowMs(), duration: duration };
  }

  function press(clientX, clientY) {
    pressAt = nowMs();
    var rect = root.getBoundingClientRect();
    if (isFinite(clientX) && isFinite(clientY) && rect.width) {
      pressRing.style.left = (clientX - rect.left) + 'px';
      pressRing.style.top = (clientY - rect.top) + 'px';
      pressRing.classList.remove('is-on');
      // 强制重排以重启动画
      void pressRing.offsetWidth;
      pressRing.classList.add('is-on');
    }
    return { x: rect.width ? (clientX - rect.left) / rect.width : 0.5, y: rect.height ? (clientY - rect.top) / rect.height : 0.5 };
  }

  /** 图像实际显示区域（object-fit: contain 的 letterbox 要扣掉） */
  function imageRect() {
    var rect = root.getBoundingClientRect();
    if (!natW || !natH) return rect;
    var scale = state.fit === 'cover'
      ? Math.max(rect.width / natW, rect.height / natH)
      : Math.min(rect.width / natW, rect.height / natH);
    var w = natW * scale;
    var h = natH * scale;
    return {
      left: rect.left + (rect.width - w) / 2,
      top: rect.top + (rect.height - h) / 2,
      width: w,
      height: h
    };
  }

  /** 客户端坐标 → 立绘归一化坐标 0–1 */
  function toStagePoint(clientX, clientY) {
    var r = imageRect();
    if (!r.width || !r.height) return null;
    return {
      x: (clientX - r.left) / r.width,
      y: (clientY - r.top) / r.height
    };
  }

  function stagePointOfEvent(e) {
    var r = root.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
  }

  function setEyesClosed() {
    /* 单图不做假眼皮：需要真正的闭眼层才有意义，接口先留空 */
  }

  function destroy() {
    destroyed = true;
    stop();
    document.removeEventListener('visibilitychange', onVisibility);
    clear(pressRing);
    if (root.parentNode) root.parentNode.removeChild(root);
  }

  applyNeck();
  setExpression('calm');

  return {
    el: root,
    kind: 'pseudo',
    setScene: setScene,
    setPortrait: setPortrait,
    setOptions: setOptions,
    setPointer: setPointer,
    clearPointer: clearPointer,
    setExpression: setExpression,
    playMotion: playMotion,
    setEyesClosed: setEyesClosed,
    press: press,
    toStagePoint: toStagePoint,
    stagePointOfEvent: stagePointOfEvent,
    imageRect: imageRect,
    expression: function () { return expression; },
    portraitSrc: function () { return portraitSrc; },
    pause: stop,
    resume: start,
    destroy: destroy
  };
}
