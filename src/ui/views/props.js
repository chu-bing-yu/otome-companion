/** 礼物：道具库 + 送出一份 */

import { h, clear } from '../dom.js';
import { button, dialog, field, textInput, textArea, segmented, emptyState } from '../components.js';
import { resolveAssetSrc, refLabel } from '../../core/assets.js';
import { PROP_ICONS } from '../../core/props.js';

var ICON_GLYPH = { flower: '❀', book: '❖', candy: '✦', star: '✧', tea: '☾' };

function glyphOf(icon) {
  return ICON_GLYPH[icon] || ICON_GLYPH.flower;
}

export default {
  mount: function (body, ctx) {
    var state = ctx.state;

    var listBox = h('div', { class: 'oc-list' });
    var head = h('div', { style: 'display:flex;align-items:center;gap:8px;padding:0 0 10px' }, [
      h('span', { class: 'oc-eyebrow', text: '道具库' }),
      h('div', { style: 'margin-left:auto' },
        button('新增礼物', { icon: 'plus', onClick: function () { editProp(null); } }))
    ]);

    body.appendChild(head);
    body.appendChild(listBox);

    function editProp(prop) {
      var draft = prop ? Object.assign({}, prop) : { name: '', icon: 'flower', lines: [], ref: '' };
      var nameInput = textInput(draft.name, '礼物名字', 14);
      var linesArea = textArea((draft.lines || []).join('\n'), '一行一句，收到礼物时随机说一句', 3);
      var urlInput = textInput(draft.ref && /^url:/.test(draft.ref) ? draft.ref.slice(4) : '', '可选：图片外链', 300);
      var iconPicker = segmented(PROP_ICONS.map(function (p) {
        return { id: p.id, name: p.name };
      }), draft.icon, function (id) { draft.icon = id; });

      dialog({
        title: prop ? '编辑礼物' : '新增礼物',
        body: h('div', {}, [
          field('名字', nameInput),
          field('图标', iconPicker),
          field('收到时说的话', linesArea, '不填就用通用台词。'),
          field('图片外链', urlInput, '有图会盖住图标。')
        ]),
        actions: [
          prop ? { label: '删除', value: 'remove', variant: 'danger' } : { label: '取消', value: false },
          { label: '保存', value: 'ok', variant: 'primary' }
        ]
      }).then(async function (result) {
        if (result === 'remove' && prop) {
          ctx.actions.dropProp(prop.id);
          render();
          return;
        }
        if (result !== 'ok') return;

        var url = String(urlInput.value || '').trim();
        var lines = String(linesArea.value || '').split('\n')
          .map(function (s) { return s.trim(); })
          .filter(Boolean);

        await ctx.actions.saveProp({
          id: draft.id || undefined,
          name: String(nameInput.value || '').trim(),
          icon: draft.icon,
          lines: lines,
          ref: /^https?:\/\//i.test(url) ? url : (draft.ref || '')
        });
        render();
        ctx.host.ui.toast('已保存');
      });
    }

    function render() {
      var s = state.get();
      clear(listBox);

      if (!s.props.length) {
        listBox.style.padding = '0';
        listBox.style.border = 'none';
        listBox.style.background = 'none';
        listBox.appendChild(emptyState(
          '还没有准备礼物',
          '加一件小东西，送出去会涨好感，也会留一条回忆。',
          button('新增礼物', { variant: 'primary', icon: 'plus', onClick: function () { editProp(null); } })
        ));
        return;
      }

      listBox.style.padding = '2px 12px';
      listBox.style.border = '1px solid var(--oc-line-soft)';
      listBox.style.background = 'rgba(255,255,255,.025)';

      s.props.forEach(function (prop) {
        var src = resolveAssetSrc(prop.ref, { assets: s.assets });
        var iconBox = h('div', { class: 'oc-prop__icon' }, [
          src ? h('img', { src: src, alt: '', loading: 'lazy' }) : h('span', { text: glyphOf(prop.icon) })
        ]);

        listBox.appendChild(h('div', { class: 'oc-prop' }, [
          iconBox,
          h('div', { class: 'oc-prop__main' }, [
            h('div', { class: 'oc-prop__name', text: prop.name }),
            h('div', { class: 'oc-prop__sub', text: prop.lines[0] || refLabel(prop.ref, '说出的话随机') })
          ]),
          prop.given ? h('span', { class: 'oc-prop__given', text: '已送 ' + prop.given }) : null,
          button('送出', {
            variant: 'primary',
            onClick: function () {
              ctx.actions.gift(prop.id);
              render();
            }
          }),
          h('button', {
            class: 'oc-iconbtn', type: 'button', 'aria-label': '编辑',
            onclick: function () { editProp(prop); }
          }, [h('span', { class: 'oc-icon', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4.5 19.5h4L19 9a2.1 2.1 0 0 0-3-3L5.5 16.5z"/></svg>' })])
        ]));
      });
    }

    var unsubscribe = state.subscribe(function (s, keys) {
      if (keys.indexOf('props') !== -1 || keys.indexOf('assets') !== -1) render();
    });

    render();

    return {
      destroy: function () {
        unsubscribe();
        clear(listBox);
      }
    };
  }
};
