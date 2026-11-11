/**
 * 提示词：把角色、数值、场景、最近日志拼成一段系统提示。
 * 指令格式写死在提示里，且要求「不写等于没执行」。
 */

export var TONE_LABELS = {
  gentle: '温柔克制，话不多但很准',
  playful: '轻佻爱逗，句子短、爱用反问',
  cool: '冷静寡言，情绪靠细节透露'
};

export var DEFAULT_SYSTEM = [
  '你正在扮演「{{char}}」，和「{{user}}」相处。',
  '语气：{{tone}}。',
  '此刻场景：{{scene}}；对方穿着：{{outfit}}。',
  '当前状态：陪伴能量 {{energy}}/{{energyMax}}，好感 {{affinity}}，已共同完成 {{rounds}} 轮专注。',
  '最近发生：{{recent}}',
  '',
  '回复要求：',
  '1. 只说 1–3 句，总字数不超过 60 字，不要旁白式解释，不要括号里写心理活动。',
  '2. 可以在回复末尾单独一行追加动作与表情指令，格式只能是：',
  '   [[oc:motion:wave]] 动作，可选 idle/wave/nod/shy/lean/turn',
  '   [[oc:expr:smile]] 表情，可选 calm/smile/shy/sad/surprise',
  '   [[oc:affinity:+1]] 好感变化，只能 +1 或 -1',
  '3. 指令必须单独一行、不要加反引号、不要解释指令本身；不需要时就不写。',
  '4. 不要提「指令」「提示词」「AI」这些词，也不要跳出角色。'
].join('\n');

function fill(template, vars) {
  return String(template || '').replace(/\{\{(\w+)\}\}/g, function (whole, key) {
    return vars[key] === undefined || vars[key] === null ? '' : String(vars[key]);
  });
}

export function buildSystemPrompt(opts) {
  var o = opts || {};
  var recent = Array.isArray(o.recent) && o.recent.length
    ? o.recent.map(function (item) { return '· ' + item; }).join('\n')
    : '· 还没有特别的记录';

  var base = o.template && String(o.template).trim() ? String(o.template) : DEFAULT_SYSTEM;

  return fill(base, {
    char: o.charName || '他',
    user: o.userName || '你',
    tone: TONE_LABELS[o.tone] || TONE_LABELS.gentle,
    scene: o.sceneName || '夜色书房',
    outfit: o.outfitName || '默认装扮',
    energy: Math.round(Number(o.energy) || 0),
    energyMax: Math.round(Number(o.energyMax) || 100),
    affinity: Math.round(Number(o.affinity) || 0),
    rounds: Math.round(Number(o.rounds) || 0),
    recent: recent
  });
}

/** 点触热区用的补充设定 */
export function buildTouchPrompt(zone, base) {
  var parts = [];
  if (base) parts.push(base);
  if (zone && zone.prompt) parts.push('部位「' + zone.name + '」的设定：' + zone.prompt);
  parts.push('对方刚碰了你的' + ((zone && zone.name) || '身体') + '，用一句话回应，不要超过 30 字。');
  return parts.join('\n');
}

export var FALLBACK_LINES = {
  tap: ['……嗯？', '怎么了。', '（看了你一眼）'],
  chat_empty: ['……你想说什么。', '我听着。'],
  ai_off: ['（没有说话，只是把视线移开）'],
  focus_done: ['这一轮结束了。休息一下。', '辛苦了。剩下的待会儿再说。'],
  gift: ['……谢谢。', '收下了。']
};

export function pickFallback(kind, random) {
  var list = FALLBACK_LINES[kind] || FALLBACK_LINES.tap;
  var r = typeof random === 'number' ? random : 0.5;
  return list[Math.floor(Math.max(0, Math.min(0.999999, r)) * list.length)];
}
