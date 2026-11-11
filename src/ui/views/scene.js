/** 场景：背景图 + 环境光 */

import { h, clear } from '../dom.js';
import { icon, button, dialog, field, textInput, segmented, emptyState } from '../components.js';
import { resolveAssetSrc } from '../../core/assets.js';
import { LIGHT_PRESETS } from '../../core/scenes.js';

export default {
  mount: function (body, ctx) {
    var state = ctx.state;

    var fileInput = h('input', {
      type: 'file',
      accept: 'image/*',
      style: 'display:none',
      onchange: function (e) {
        var file = e.target.files && e.target.files[0];
        e.target.value = '';
        if (file) uploadFile(file);
      }
    });

    var row = h('div', { class: 'oc-scenerow' });
    var head = h('div', { style: 'display:flex;gap:8px;align-items:center;padding:0 0 10px' }, [
      h('span', { class: 'oc-eyebrow', text: '场景库' }),
      h('div', { style: 'margin-left:auto;display:flex;gap:8px' }, [
        button('上传', { icon: 'upload', onClick: function () { fileInput.click(); } }),
        button('外链', { icon: 'link', variant: 'ghost', onClick: openUrlDialog })
      ])
    ]);

    body.appendChild(fileInput);
    body.appendChild(head);
    body.appendChild(row);

    async function uploadFile(file) {
      try {
        ctx.host.ui.toast('正在压缩…');
        var name = String(file.name || '场景').replace(/\.[^.]+$/, '').slice(0, 12) || '场景';
        var ref = await ctx.actions.addLocalAsset(file, 'scene', name);
        var item = await ctx.actions.saveScene({ name: name, ref: ref });
        await ctx.actions.switchScene(item.id);
        ctx.host.ui.toast('场景已保存');
        render();
      } catch (err) {
        ctx.host.ui.toast('这张图太大了，试试更小的图或外链');
      }
    }

    function openUrlDialog() {
      var urlInput = textInput('', 'https://… 背景直链', 400);
      dialog({
        title: '用背景外链',
        body: h('div', {}, [field('背景地址', urlInput)]),
        actions: [
          { label: '取消', value: false },
          { label: '添加', value: 'ok', variant: 'primary' }
        ]
      }).then(async function (result) {
        if (result !== 'ok') return;
        var url = String(urlInput.value || '').trim();
        if (!/^https?:\/\//i.test(url)) {
          ctx.host.ui.toast('地址要以 http:// 或 https:// 开头');
          return;
        }
        var item = await ctx.actions.saveScene({ name: '外链场景', ref: url });
        await ctx.actions.switchScene(item.id);
        render();
      });
    }

    function editScene(scene) {
      var light = scene.light;
      var bodyEl = h('div', {}, [
        field('环境光', segmented(LIGHT_PRESETS.map(function (p) {
          return { id: p.light, name: p.name };
        }), light, function (id) { light = id; }))
      ]);

      dialog({
        title: '「' + scene.name + '」',
        body: bodyEl,
        actions: [
          { label: '删除', value: 'remove', variant: 'danger' },
          { label: '应用环境光', value: 'save', variant: 'primary' }
        ]
      }).then(async function (result) {
        if (result === 'remove') {
          ctx.actions.dropScene(scene.id);
          render();
          return;
        }
        if (result === 'save') {
          await ctx.actions.saveScene(Object.assign({}, scene, { light: light }));
          await ctx.actions.switchScene(scene.id);
          render();
        }
      });
    }

    function render() {
      var s = state.get();
      clear(row);

      if (!s.scenes.length) {
        row.appendChild(emptyState('还没有场景', '上传一张背景图，或者直接用夜色渐变。'));
        return;
      }

      s.scenes.forEach(function (scene) {
        var src = resolveAssetSrc(scene.ref, { assets: s.assets });
        var media = h('div', {
          class: 'oc-scenecard__media',
          style: src ? 'background-image:url("' + src.replace(/"/g, '%22') + '")' : 'background:linear-gradient(160deg,' + scene.tint + ', #080b11)'
        }, src ? [] : [h('span', { class: 'oc-card__ph', text: '夜色渐变' })]);

        var card = h('div', {
          class: 'oc-scenecard' + (scene.id === s.sceneId ? ' is-active' : ''),
          onclick: function () { ctx.actions.switchScene(scene.id); }
        }, [
          media,
          h('div', { class: 'oc-scenecard__meta' }, [
            h('span', { class: 'oc-scenecard__name', text: scene.name }),
            h('span', { class: 'oc-scenecard__weather', text: scene.weather || '夜' }),
            h('button', {
              class: 'oc-iconbtn', type: 'button', 'aria-label': '编辑',
              onclick: function (e) { e.stopPropagation(); editScene(scene); }
            }, [icon('edit')])
          ])
        ]);

        row.appendChild(card);
      });
    }

    var unsubscribe = state.subscribe(function (s, keys) {
      if (keys.indexOf('scenes') !== -1 || keys.indexOf('sceneId') !== -1 || keys.indexOf('assets') !== -1) render();
    });

    render();

    return {
      destroy: function () {
        unsubscribe();
        clear(row);
      }
    };
  }
};
