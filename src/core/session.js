/**
 * 专注会话状态机：只用时间戳算剩余，不靠 setInterval 计数，
 * 所以切后台、锁屏、重开 App 都不会漂。
 * 陪伴时长不用这个，直接按秒累加 vitals.todayMs。
 */

import { clamp } from './format.js';

export var STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  DONE: 'done'
};

export var KIND = {
  FOCUS: 'focus',
  BREAK: 'break'
};

export function createSession(opts, now) {
  var o = opts || {};
  var totalMs = Math.max(1000, Number(o.totalMs) || 0);
  return {
    kind: o.kind === KIND.BREAK ? KIND.BREAK : KIND.FOCUS,
    status: STATUS.RUNNING,
    startAt: now,
    endAt: now + totalMs,
    totalMs: totalMs,
    remainingMs: totalMs,
    pausedAt: 0,
    round: Math.max(1, Math.round(Number(o.round) || 1)),
    rounds: Math.max(1, Math.round(Number(o.rounds) || 1)),
    taskLabel: String(o.taskLabel || '').slice(0, 40),
    startedAt: now,
    finishedAt: 0
  };
}

export function normalizeSession(raw) {
  if (!raw || typeof raw !== 'object') return null;
  var status = [STATUS.RUNNING, STATUS.PAUSED, STATUS.DONE].indexOf(raw.status) !== -1 ? raw.status : STATUS.DONE;
  var totalMs = Math.max(0, Number(raw.totalMs) || 0);
  return {
    kind: raw.kind === KIND.BREAK ? KIND.BREAK : KIND.FOCUS,
    status: status,
    startAt: Number(raw.startAt) || 0,
    endAt: Number(raw.endAt) || 0,
    totalMs: totalMs,
    remainingMs: clamp(Number(raw.remainingMs) || 0, 0, totalMs || 1e12),
    pausedAt: Number(raw.pausedAt) || 0,
    round: Math.max(1, Math.round(Number(raw.round) || 1)),
    rounds: Math.max(1, Math.round(Number(raw.rounds) || 1)),
    taskLabel: String(raw.taskLabel || '').slice(0, 40),
    startedAt: Number(raw.startedAt) || 0,
    finishedAt: Number(raw.finishedAt) || 0
  };
}

/** 剩余毫秒：运行态按 endAt 算，暂停态用存档值 */
export function remainingOf(session, now) {
  if (!session) return 0;
  if (session.status === STATUS.PAUSED) return Math.max(0, session.remainingMs);
  if (session.status === STATUS.DONE) return 0;
  if (session.status === STATUS.IDLE) return Math.max(0, session.totalMs);
  return Math.max(0, session.endAt - now);
}

export function elapsedOf(session, now) {
  if (!session) return 0;
  if (session.status === STATUS.DONE) return session.totalMs;
  return clamp(session.totalMs - remainingOf(session, now), 0, session.totalMs);
}

export function progressOf(session, now) {
  if (!session || !session.totalMs) return 0;
  return clamp(elapsedOf(session, now) / session.totalMs, 0, 1);
}

export function isExpired(session, now) {
  return !!session && session.status === STATUS.RUNNING && remainingOf(session, now) <= 0;
}

export function pause(session, now) {
  if (!session || session.status !== STATUS.RUNNING) return session;
  var next = Object.assign({}, session, {
    status: STATUS.PAUSED,
    remainingMs: remainingOf(session, now),
    pausedAt: now
  });
  return next;
}

export function resume(session, now) {
  if (!session || session.status !== STATUS.PAUSED) return session;
  var remaining = Math.max(0, session.remainingMs);
  return Object.assign({}, session, {
    status: STATUS.RUNNING,
    endAt: now + remaining,
    pausedAt: 0
  });
}

export function complete(session, now) {
  if (!session) return session;
  return Object.assign({}, session, {
    status: STATUS.DONE,
    remainingMs: 0,
    endAt: now,
    finishedAt: now
  });
}

export function abort(session, now) {
  if (!session) return session;
  return Object.assign({}, session, {
    status: STATUS.DONE,
    remainingMs: 0,
    finishedAt: now
  });
}

/**
 * 重开 App 时恢复：运行态若已过期，直接判完成；否则保留 endAt。
 * 暂停态保留剩余时间；已完成不再改。
 */
export function restore(raw, now) {
  var s = normalizeSession(raw);
  if (!s) return null;
  if (s.status === STATUS.RUNNING) {
    if (s.endAt <= 0) return abort(s, now);
    if (s.endAt <= now) return complete(s, now);
    s.remainingMs = s.endAt - now;
  }
  if (s.status === STATUS.PAUSED && s.remainingMs <= 0) {
    s.remainingMs = s.totalMs;
  }
  return s;
}

/** 下一轮是同轮次还是休息 */
export function nextRound(session) {
  if (!session) return { round: 1, kind: KIND.FOCUS };
  if (session.kind === KIND.FOCUS) {
    return { round: session.round, kind: KIND.BREAK };
  }
  return { round: Math.min(session.rounds, session.round + 1), kind: KIND.FOCUS };
}

export function isLastRound(session) {
  return !!session && session.kind === KIND.FOCUS && session.round >= session.rounds;
}
