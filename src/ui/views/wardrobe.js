/** 衣装：多套立绘，切换即换人 */

import { h, clear } from '../dom.js';
import { icon, button, dialog, field, textInput, emptyState } from '../components.js';
import { resolveAssetSrc, refLabel } from '../../core/assets.js';

function pickName(file) {
  return String(file && file.name || '立绘').replace(/\.[^.]+$/, '').slice(0, 14) || '立绘';
}

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
        if (!file) return;
        uploadFile(file);
      }
    });

    var grid = h('div', { class: 'oc-cards' });
    var head = h('div', { class: 'oc-sheet__head', style: 'padding:0 0 10px' }, [
      h('span', { class: 'oc-eyebrow', text: '已拥有' }),
      h('div', { style: 'margin-left:auto;display:flex;gap:8px' }, [
        button('上传', { icon: 'upload', onClick: function () { fileInput.click(); } }),
        button('外链', { icon: 'link', variant: 'ghost', onClick: openUrlDialog })
      ])
    ]);

    body.appendChild(fileInput);
    body.appendChild(head);
    body.appendChild(grid);

    async function uploadFile(file) {
      try {
        ctx.host.ui.toast('正在压缩…');
        var ref = await ctx.actions.addLocalAsset(file, 'portrait', pickName(file));
        var item = await ctx.actions.saveOutfit({ name: pickName(file), ref: ref });
        await ctx.actions.switchOutfit(item.id);
        ctx.actions.finishOnboard();
        ctx.host.ui.toast('立绘已保存');
        render();
      } catch (err) {
        ctx.host.ui.toast('图片太大，压到 1.5MB 以内仍失败，换一张或改用外链');
      }
    }

    function openUrlDialog() {
      var urlInput = textInput('', 'https://… 图片直链', 400);
      dialog({
        title: '用图片外链',
        body: h('div', {}, [
          field('图片地址', urlInput, '外链不占本机存储；加载失败会显示占位。'),
        ]),
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
        var item = await ctx.actions.saveOutfit({ name: '外链衣装', ref: url });
        await ctx.actions.switchOutfit(item.id);
        ctx.actions.finishOnboard();
        render();
      });
    }

    function render() {
      var s = state.get();
      clear(grid);

      if (!s.wardrobe.length) {
        grid.style.display = 'block';
        grid.appendChild(emptyState(
          '衣柜是空的',
          '上传第一张人物立绘，舞台就会亮起来。透明背景 PNG 效果最好。',
          button('从相册选择', { variant: 'primary', icon: 'upload', onClick: function () { fileInput.click(); } })
        ));
        return;
      }

      grid.style.display = '';
      s.wardrobe.forEach(function (outfit) {
        var src = resolveAssetSrc(outfit.ref, { assets: s.assets });
        var media = h('div', { class: 'oc-card__media' }, [
          src ? h('img', { src: src, alt: outlineName(outfit), loading: 'lazy' })
            : h('span', { class: 'oc-card__ph', text: refLabel(outfit.ref, '未设置') })
        ]);

        var card = h('div', {
          class: 'oc-card' + (outfit.id === s.outfitId ? ' is-active' : ''),
          onclick: function () { ctx.actions.switchOutfit(outfit.id); }
        }, [
          media,
          h('div', { class: 'oc-card__name', text: outfit.name }),
          outfit.id === s.outfitId ? h('div', { class: 'oc-card__check' }, [icon('check')]) : null
        ]);

        // 长按删除
        var timer = null;
        card.addEventListener('pointerdown', function () {
          timer = setTimeout(function () {
            timer = null;
            confirmRemove(outfit);
          }, 620);
        });
        ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (type) {
          card.addEventListener(type, function () {
            if (timer) {
              clearTimeout(timer);
              timer = null;
            }
          });
        });

        grid.appendChild(card);
      });
    }

    function outlineName(outfit) {
      return outfit.name || '立绘';
    }

    function confirmRemove(outfit) {
      dialog({
        title: '移除「' + outfit.name + '」',
        body: h('p', { class: 'oc-row__sub', text: '只从衣柜移除，不影响聊天与回忆。' }),
        actions: [
          { label: '取消', value: false },
          { label: '移除', value: 'ok', variant: 'danger' }
        ]
      }).then(function (result) {
        if (result !== 'ok') return;
        ctx.actions.dropOutfit(outfit.id);
        render();
      });
    }

    var unsubscribe = state.subscribe(function (s, keys) {
      if (keys.indexOf('wardrobe') !== -1 || keys.indexOf('outfitId') !== -1 || keys.indexOf('assets') !== -1) render();
    });

    render();

    return {
      destroy: function () {
        unsubscribe();
        clear(grid);
      }
    };
  }
};
