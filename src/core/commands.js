/**
 * 角色回复里的指令解析：[[oc:motion:wave]] / [[oc:expr:smile]] / [[oc:affinity:+1]]
 * 只认白名单，参数不合法整条丢弃；正文里绝不残留指令片段。
 */

export var MARK_TYPES = ['motion', 'expr', 'affinity', 'energy'];

export var MOTIONS = ['idle', 'wave', 'nod', 'shy', 'lean', 'turn'];
export var EXPRS = ['calm', 'smile', 'shy', 'sad', 'surprise'];

var MAX_COMMANDS = 6;
var PATTERN = /\[\[\s*oc\s*:\s*([a-z_]+)\s*(?::\s*([^\]\n]{0,32}))?\s*\]\]/gi;

function clampNumArg(arg, max) {
  var n = Number(String(arg).replace(/^\+/, ''));
  if (!isFinite(n) || n === 0) return 0;
  var v = Math.max(-max, Math.min(max, Math.round(n)));
  return v;
}

function validArg(type, arg) {
  var a = String(arg || '').trim().toLowerCase();
  if (type === 'motion') return MOTIONS.indexOf(a) !== -1 ? a : '';
  if (type === 'expr') return EXPRS.indexOf(a) !== -1 ? a : '';
  if (type === 'affinity') {
    var v = clampNumArg(a, 2);
    return v ? (v > 0 ? '+' + v : String(v)) : '';
  }
  if (type === 'energy') {
    var e = clampNumArg(a, 3);
    return e ? (e > 0 ? '+' + e : String(e)) : '';
  }
  return '';
}

/**
 * @returns {{ text: string, commands: Array<{type: string, arg: string}> }}
 */
export function parseCommands(input) {
  var src = String(input === undefined || input === null ? '' : input);
  var commands = [];
  var seen = {};

  var text = src.replace(PATTERN, function (whole, type, arg) {
    var t = String(type || '').toLowerCase();
    if (MARK_TYPES.indexOf(t) === -1) return '';
    var a = validArg(t, arg);
    if (!a) return '';
    if (seen[t]) return '';
    seen[t] = true;
    if (commands.length >= MAX_COMMANDS) return '';
    commands.push({ type: t, arg: a });
    return '';
  });

  // 去掉指令后可能留下多余空行与首尾空白
  text = text.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();

  return { text: text, commands: commands };
}

/** 正文里是否还残留半截指令（用于判定角色没按格式回） */
export function hasResidue(text) {
  return /\[\[\s*oc\s*:/i.test(String(text || ''));
}

/** 数值指令聚合成一次 applyEvent 的增量 */
export function numericDelta(commands) {
  var out = { affinity: 0, energy: 0 };
  (commands || []).forEach(function (c) {
    if (c.type === 'affinity') out.affinity += Number(c.arg) || 0;
    if (c.type === 'energy') out.energy += Number(c.arg) || 0;
  });
  out.affinity = Math.max(-2, Math.min(2, out.affinity));
  out.energy = Math.max(-3, Math.min(3, out.energy));
  return out;
}

export function firstOf(commands, type) {
  for (var i = 0; i < (commands || []).length; i++) {
    if (commands[i].type === type) return commands[i].arg;
  }
  return '';
}
