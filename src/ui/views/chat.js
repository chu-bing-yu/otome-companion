/** 通讯：半屏聊天室 */

import { h, clear } from '../dom.js';
import { icon, emptyState } from '../components.js';
import { charNameOf } from '../../core/settings.js';
import { fmtTime } from '../../core/format.js';

export default {
  mount: function (body, ctx) {
    var state = ctx.state;

    var list = h('div', { class: 'oc-chat__list' });
    var input = h('textarea', {
      class: 'oc-input',
      rows: '1',
      placeholder: '说点什么…',
      maxlength: '300'
    });
    var sendBtn = h('button', { class: 'oc-send', type: 'button', 'aria-label': '发送' }, [icon('chat')]);

    var root = h('div', { class: 'oc-chat' }, [
      list,
      h('div', { class: 'oc-chat__input' }, [input, sendBtn])
    ]);
    body.appendChild(root);

    var sending = false;

    function scrollToEnd() {
      list.scrollTop = list.scrollHeight;
    }

    function render() {
      var s = state.get();
      clear(list);

      if (!s.chat.length) {
        list.appendChild(emptyState('还没有开始对话', '他就在这里。说第一句话试试。'));
      }

      s.chat.forEach(function (msg) {
        if (msg.role === 'user') {
          list.appendChild(h('div', { class: 'oc-msg oc-msg--user', text: msg.text }));
          return;
        }
        list.appendChild(h('div', { class: 'oc-msg oc-msg--char' }, [
          h('div', { text: msg.text }),
          msg.at ? h('div', { class: 'oc-msg--sys', text: fmtTime(msg.at) }) : null
        ]));
      });

      if (s.aiBusy) {
        list.appendChild(h('div', { class: 'oc-typing' }, [h('i'), h('i'), h('i')]));
      }

      sendBtn.disabled = s.aiBusy;
      scrollToEnd();
    }

    async function doSend() {
      if (sending) return;
      var text = String(input.value || '').trim();
      if (!text) return;
      input.value = '';
      sending = true;
      render();
      try {
        await ctx.actions.sendChat(text);
      } catch (e) {
        ctx.host.ui.toast('发送失败，等会儿再试');
      }
      sending = false;
      render();
      scrollToEnd();
    }

    sendBtn.addEventListener('click', doSend);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        doSend();
      }
    });

    var unsubscribe = state.subscribe(function (s, keys) {
      if (keys.indexOf('chat') !== -1 || keys.indexOf('aiBusy') !== -1) render();
    });

    render();

    return {
      destroy: function () {
        unsubscribe();
        clear(list);
      }
    };
  }
};
