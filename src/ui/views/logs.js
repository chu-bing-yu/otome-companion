/** 日志：按天分组的时间轴 */

import { h, clear } from '../dom.js';
import { emptyState } from '../components.js';
import { groupByDay, logKindLabel } from '../../core/logs.js';
import { dayLabel, fmtTime } from '../../core/format.js';

export default {
  mount: function (body, ctx) {
    var state = ctx.state;
    var wrap = h('div', {});
    body.appendChild(wrap);

    function render() {
      var s = state.get();
      clear(wrap);
      var groups = groupByDay(s.logs);

      if (!groups.length) {
        wrap.appendChild(emptyState('还没有日志', '点点他、说说话、做一轮专注，这里就会长长起来。'));
        return;
      }

      var today = s.vitals.day;
      groups.forEach(function (group) {
        wrap.appendChild(h('div', { class: 'oc-daylabel', text: dayLabel(group.day, today) }));
        var line = h('div', { class: 'oc-timeline' });
        group.items.forEach(function (item) {
          line.appendChild(h('div', { class: 'oc-logitem' }, [
            h('div', { class: 'oc-logitem__meta' }, [
              h('span', { text: fmtTime(item.at) }),
              h('span', { text: logKindLabel(item.kind) })
            ]),
            h('div', { class: 'oc-logitem__text', text: item.text })
          ]));
        });
        wrap.appendChild(line);
      });
    }

    var unsubscribe = state.subscribe(function (s, keys) {
      if (keys.indexOf('logs') !== -1 || keys.indexOf('vitals') !== -1) render();
    });

    render();

    return {
      destroy: function () {
        unsubscribe();
        clear(wrap);
      }
    };
  }
};
