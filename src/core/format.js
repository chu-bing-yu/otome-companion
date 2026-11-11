/** 格式化小工具：纯函数，不读系统时间（时间一律由调用方传入） */

export function clamp(n, min, max) {
  var v = Number(n);
  if (!isFinite(v)) return min;
  if (v < min) return min;
  if (v > max) return max;
  return v;
}

export function pad2(n) {
  return n < 10 ? '0' + n : String(n);
}

/** 本地日期键 YYYY-MM-DD */
export function dayKey(ts) {
  var d = new Date(Number(ts) || 0);
  return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
}

/** 01h 35m；不足一小时只显示 35m，小于 1 分钟显示 0m */
export function fmtDuration(ms) {
  var total = Math.max(0, Math.floor(Number(ms) / 60000));
  var h = Math.floor(total / 60);
  var m = total % 60;
  if (h > 0) return pad2(h) + 'h ' + pad2(m) + 'm';
  return m + 'm';
}

/** 01h 35m：顶部状态栏用，始终带小时位，数字不会跳宽度 */
export function fmtDurationLong(ms) {
  var total = Math.max(0, Math.floor(Number(ms) / 60000));
  return pad2(Math.floor(total / 60)) + 'h ' + pad2(total % 60) + 'm';
}

/** 18:42 */
export function fmtClock(ms) {
  var total = Math.max(0, Math.ceil(Number(ms) / 1000));
  var m = Math.floor(total / 60);
  var s = total % 60;
  return pad2(m) + ':' + pad2(s);
}

/** 25:00（给 / 之后的总额） */
export function fmtClockLong(ms) {
  var total = Math.max(0, Math.round(Number(ms) / 1000));
  var m = Math.floor(total / 60);
  var s = total % 60;
  return pad2(m) + ':' + pad2(s);
}

/** 10-12 14:05 */
export function fmtDateTime(ts) {
  var d = new Date(Number(ts) || 0);
  return (d.getMonth() + 1) + '-' + pad2(d.getDate()) + ' ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes());
}

export function fmtTime(ts) {
  var d = new Date(Number(ts) || 0);
  return pad2(d.getHours()) + ':' + pad2(d.getMinutes());
}

/** 今天 / 昨天 / 10-12 */
export function dayLabel(key, todayKey) {
  if (key === todayKey) return '今天';
  var d = new Date(todayKey + 'T00:00:00');
  d.setDate(d.getDate() - 1);
  var y = d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  if (key === y) return '昨天';
  return key.slice(5);
}
