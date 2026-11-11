/** 专注：圆环倒计时 + 结算 */

import { h, clear } from '../dom.js';
import { icon, button, field, textInput } from '../components.js';
import { STATUS, remainingOf, progressOf } from '../../core/session.js';
import { fmtClock, fmtClockLong } from '../../core/format.js';

export default {
  mount: function (body, ctx) {
    var state = ctx.state;

    var ring = h('div', { class: 'oc-bigring' });
    var roundEl = h('div', { class: 'oc-bigring__round' });
    var timeEl = h('div', { class: 'oc-bigring__time' });
    var taskEl = h('div', { class: 'oc-bigring__task' });
    ring.appendChild(h('div', { class: 'oc-bigring__inner' }, [roundEl, timeEl, taskEl]));

    var mainBtn = h('button', { class: 'oc-btn oc-btn--primary', type: 'button' });
    var subBtn = h('button', { class: 'oc-btn oc-btn--ghost', type: 'button' });

    var actions = h('div', { class: 'oc-focusview__actions' }, [mainBtn, subBtn]);

    var taskInput = textInput(state.get().settings.taskLabel, '这一轮要做什么', 40);
    taskInput.addEventListener('change', function () {
      ctx.actions.saveSettings({ taskLabel: String(taskInput.value || '').trim() });
    });

    var root = h('div', { class: 'oc-focusview' }, [
      ring,
      actions,
      h('div', { style: 'width:100%;max-width:300px;margin-top:14px' }, [
        field('这一轮的任务', taskInput, '写具体一点，结算时会一起记进回忆。')
      ])
    ]);
    body.appendChild(root);

    mainBtn.addEventListener('click', function () {
      var s = state.get();
      var sess = s.session;
      if (!sess || sess.status === STATUS.DONE) {
        if (sess && sess.status === STATUS.DONE) ctx.actions.discardSession();
        ctx.actions.startFocus();
        render();
        return;
      }
      if (sess.status === STATUS.RUNNING) {
        ctx.actions.pauseFocus();
      } else if (sess.status === STATUS.PAUSED) {
        ctx.actions.resumeFocus();
      }
      render();
    });

    subBtn.addEventListener('click', function () {
      var s = state.get();
      var sess = s.session;

      if (sess && sess.status === STATUS.DONE) {
        if (s.nextSession) ctx.actions.nextRoundNow();
        else ctx.actions.discardSession();
        render();
        return;
      }

      if (!sess) {
        ctx.host.ui.toast('先点开始，再谈放弃');
        return;
      }

      ctx.host.ui.confirm({ title: '中止这一轮？', message: '这一轮不会记进回忆。' }).then(function (ok) {
        if (!ok) return;
        ctx.actions.abortFocus();
        render();
      });
    });

    function render() {
      var s = state.get();
      var sess = s.session;
      var now = s.now;

      if (!sess) {
        roundEl.textContent = 'READY';
        timeEl.textContent = fmtClockLong(s.settings.focusMinutes * 60000);
        taskEl.textContent = s.settings.taskLabel || '未设定任务';
        ring.style.setProperty('--oc-progress', '0');
        mainBtn.textContent = '开始专注';
        subBtn.textContent = '共 ' + s.settings.focusRounds + ' 轮';
        subBtn.disabled = true;
        return;
      }

      var progress = progressOf(sess, now);
      ring.style.setProperty('--oc-progress', String(progress));
      roundEl.textContent = (sess.kind === 'break' ? 'BREAK' : 'ROUND') + ' ' + sess.round + ' / ' + sess.rounds;
      timeEl.textContent = fmtClock(remainingOf(sess, now));
      taskEl.textContent = sess.taskLabel || '未设定任务';

      if (sess.status === STATUS.RUNNING) {
        mainBtn.textContent = '暂停';
        subBtn.textContent = '中止';
        subBtn.disabled = false;
      } else if (sess.status === STATUS.PAUSED) {
        mainBtn.textContent = '继续';
        subBtn.textContent = '中止';
        subBtn.disabled = false;
      } else {
        mainBtn.textContent = s.nextSession ? '开始下一轮' : '再来一轮';
        subBtn.textContent = s.nextSession ? '休息 ' + s.settings.breakMinutes + ' 分钟' : '结束';
        subBtn.disabled = false;
        timeEl.textContent = '00:00';
        roundEl.textContent = s.nextSession
          ? (s.nextSession.kind === 'break' ? 'BREAK NEXT' : 'ROUND ' + s.nextSession.round)
          : 'COMPLETE';
        taskEl.textContent = s.nextSession
          ? (s.nextSession.kind === 'break' ? '先休息一下' : '下一轮：第 ' + s.nextSession.round + ' 轮')
          : '这一轮结束了';
      }
    }

    var unsubscribe = state.subscribe(function (s, keys) {
      if (keys.indexOf('session') !== -1 || keys.indexOf('settings') !== -1 ||
        keys.indexOf('vitals') !== -1 || keys.indexOf('now') !== -1) render();
    });

    render();

    return {
      destroy: function () {
        unsubscribe();
        clear(root);
      }
    };
  }
};
