/** 回忆：双列卡片墙 */

import { h, clear } from '../dom.js';
import { dialog, emptyState, button } from '../components.js';
import { memoryKindLabel } from '../../core/memories.js';
import { resolveAssetSrc } from '../../core/assets.js';
import { fmtDateTime } from '../../core/format.js';
import { activeScene } from '../../core/scenes.js';

export default {
  mount: function (body, ctx) {
    var state = ctx.state;
    var wrap = h('div', {});
    body.appendChild(wrap);

    function findByRef(ref, list) {
      if (!ref) return null;
      for (var i = 0; i < list.length; i++) {
        if (list[i].ref === ref) return list[i];
      }
      return null;
    }

    function open(memory) {
      var s = state.get();
      var scene = findByRef(memory.sceneRef, s.scenes);
      var src = scene ? resolveAssetSrc(scene.ref, { assets: s.assets }) : '';
      var shot = src
        ? h('div', {
          style: 'aspect-ratio:4/3;border-radius:12px;margin-bottom:12px;background-size:cover;background-position:center;background-image:url("' +
            src.replace(/"/g, '%22') + '")'
        })
        : h('div', {
          style: 'aspect-ratio:4/3;border-radius:12px;margin-bottom:12px;background:linear-gradient(160deg,' +
            (memory.tint || '#121722') + ',#080b11)'
        });

      dialog({
        title: memory.title,
        body: h('div', {}, [
          shot,
          h('div', { class: 'oc-row__sub', text: fmtDateTime(memory.at) + ' · ' + memoryKindLabel(memory.kind) }),
          h('p', { style: 'font-size:12.5px;line-height:1.8;margin:10px 0 0', text: memory.text || '（没有留下字）' })
        ]),
        actions: [
          { label: '删除这条', value: 'remove', variant: 'danger' },
          { label: '关闭', value: false, variant: 'primary' }
        ]
      }).then(function (result) {
        if (result !== 'remove') return;
        ctx.actions.removeMemory(memory.id);
        render();
      });
    }

    function render() {
      var s = state.get();
      clear(wrap);

      if (!s.memories.length) {
        wrap.style.padding = '0';
        wrap.appendChild(emptyState(
          '还没有回忆',
          '完成一轮专注、送出一件礼物，重要的时刻会自动留在这里。'
        ));
        return;
      }

      var grid = h('div', { class: 'oc-cards' });
      s.memories.forEach(function (memory) {
        var scene = findByRef(memory.sceneRef, s.scenes);
        var src = scene ? resolveAssetSrc(scene.ref, { assets: s.assets }) : '';
        var media = h('div', {
          class: 'oc-memocard__media',
          style: src
            ? 'background-image:url("' + src.replace(/"/g, '%22') + '")'
            : 'background:linear-gradient(160deg,' + (memory.tint || '#121722') + ',#080b11)'
        }, src ? [] : [h('span', { text: memoryKindLabel(memory.kind) })]);

        grid.appendChild(h('div', {
          class: 'oc-memocard',
          onclick: function () { open(memory); }
        }, [
          media,
          h('div', { class: 'oc-memocard__body' }, [
            h('div', { class: 'oc-memocard__title', text: memory.title }),
            h('div', { class: 'oc-memocard__text', text: memory.text }),
            h('div', { class: 'oc-memocard__day', text: fmtDateTime(memory.at) })
          ])
        ]));
      });

      wrap.appendChild(grid);
    }

    var unsubscribe = state.subscribe(function (s, keys) {
      if (keys.indexOf('memories') !== -1 || keys.indexOf('assets') !== -1) render();
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
