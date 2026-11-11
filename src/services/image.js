/**
 * 图片压缩：长边 1080，透明图走 webp/png，其余走 jpeg。
 * 宿主没有「上传图片转 URL」的接口，本地图只能压成 dataURL 存 KV，
 * 所以这里必须把体积压到 1.5MB 以内，超了就继续降尺寸。
 */

import { MAX_DATAURL_BYTES } from '../core/assets.js';

var MAX_SIDE = 1080;
var MIN_SIDE = 480;
var QUALITY = 0.9;

function loadImage(file) {
  return new Promise(function (resolve, reject) {
    var url = URL.createObjectURL(file);
    var img = new Image();
    img.onload = function () {
      resolve({ img: img, url: url });
    };
    img.onerror = function () {
      URL.revokeObjectURL(url);
      reject(new Error('图片解码失败'));
    };
    img.src = url;
  });
}

function drawToCanvas(img, maxSide) {
  var w = img.naturalWidth || img.width;
  var h = img.naturalHeight || img.height;
  var scale = Math.min(1, maxSide / Math.max(w, h));
  var cw = Math.max(1, Math.round(w * scale));
  var ch = Math.max(1, Math.round(h * scale));

  var canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  var ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, cw, ch);
  return { canvas: canvas, w: cw, h: ch };
}

/** 采样四角，判断是不是透明背景立绘 */
function hasAlpha(canvas) {
  try {
    var ctx = canvas.getContext('2d');
    var points = [
      [0, 0],
      [canvas.width - 1, 0],
      [0, canvas.height - 1],
      [canvas.width - 1, canvas.height - 1]
    ];
    for (var i = 0; i < points.length; i++) {
      var px = ctx.getImageData(points[i][0], points[i][1], 1, 1).data;
      if (px[3] < 250) return true;
    }
  } catch (e) {
    return false;
  }
  return false;
}

function encode(canvas, type, quality) {
  try {
    return canvas.toDataURL(type, quality);
  } catch (e) {
    return '';
  }
}

/**
 * @returns {Promise<{dataUrl: string, w: number, h: number, bytes: number}>}
 */
export async function compressImage(file, opts) {
  var o = opts || {};
  var limit = o.limit || MAX_DATAURL_BYTES;
  var maxSide = o.maxSide || MAX_SIDE;

  var loaded = await loadImage(file);
  try {
    var result = null;

    while (maxSide >= MIN_SIDE) {
      var drawn = drawToCanvas(loaded.img, maxSide);
      var transparent = hasAlpha(drawn.canvas);
      var dataUrl = '';

      if (transparent) {
        dataUrl = encode(drawn.canvas, 'image/webp', QUALITY);
        // 个别 webview 不支持 webp 编码，会回退成 png
        if (!/^data:image\/webp/i.test(dataUrl)) {
          dataUrl = encode(drawn.canvas, 'image/png');
        }
      } else {
        dataUrl = encode(drawn.canvas, 'image/webp', QUALITY);
        if (!dataUrl || dataUrl.length > limit) {
          var jpeg = encode(drawn.canvas, 'image/jpeg', 0.82);
          if (jpeg && (!dataUrl || jpeg.length < dataUrl.length)) dataUrl = jpeg;
        }
      }

      if (dataUrl && /^data:image\//i.test(dataUrl) && dataUrl.length <= limit) {
        result = { dataUrl: dataUrl, w: drawn.w, h: drawn.h, bytes: dataUrl.length };
        break;
      }
      maxSide = Math.round(maxSide * 0.75);
    }

    if (!result) throw new Error('too_large');
    return result;
  } finally {
    URL.revokeObjectURL(loaded.url);
  }
}

/** 外链图片也检查一下能不能加载，避免存了个死链 */
export function probeImage(url, timeoutMs) {
  return new Promise(function (resolve) {
    var done = false;
    var img = new Image();
    var timer = setTimeout(function () {
      if (done) return;
      done = true;
      resolve(false);
    }, timeoutMs || 8000);

    img.onload = function () {
      if (done) return;
      done = true;
      clearTimeout(timer);
      resolve(true);
    };
    img.onerror = function () {
      if (done) return;
      done = true;
      clearTimeout(timer);
      resolve(false);
    };
    img.src = url;
  });
}

export function formatBytes(bytes) {
  var n = Number(bytes) || 0;
  if (n < 1024) return n + ' B';
  if (n < 1024 * 1024) return (n / 1024).toFixed(0) + ' KB';
  return (n / 1024 / 1024).toFixed(1) + ' MB';
}
