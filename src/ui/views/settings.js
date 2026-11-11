/** 设置：角色 / 舞台 / 专注 / 热区 / 数据 */

import { h, clear } from '../dom.js';
import {
  button, dialog, field, textInput, textArea, segmented, switchRow,
  stepperRow, sliderRow
} from '../components.js';
import { FOCUS } from '../../core/settings.js';
import { normalizeZone } from '../../core/touch.js';
import { TONE_LABELS } from '../../core/prompts.js';

function section(title, children) {
  return h('div', { class: 'oc-section' }, [
    title ? h('div', { class: 'oc-section__title', text: title }) : null,
    h('div', { class: 'oc-list' }, children)
  ]);
}

export default {
  mount: function (body, ctx) {
    var state = ctx.state;
    var wrap = h('div', {});
    var importInput = h('input', {
      type: 'file',
      accept: '.json,application/json',
      style: 'display:none',
      onchange: function (e) {
        var file = e.target.files && e.target.files[0];
        e.target.value = '';
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function () {
          try {
            var payload = JSON.parse(String(reader.result || '{}'));
            ctx.actions.importAll(payload).then(function () {
              ctx.host.ui.toast('已导入');
              render();
            }).catch(function () {
              ctx.host.ui.toast('导入失败：文件格式不对');
            });
          } catch (err) {
            ctx.host.ui.toast('导入失败：不是有效的 JSON');
          }
        };
        reader.readAsText(file);
      }
    });

    body.appendChild(importInput);
    body.appendChild(wrap);

    function editZone(zone) {
      var draft = normalizeZone(zone || {});
      var nameInput = textInput(draft.name, '部位名字', 12);
      var linesArea = textArea(draft.lines.join('\n'), '一行一句，点这个部位时随机说', 4);
      var promptArea = textArea(draft.prompt, '这个部位的补充设定，例如「怕痒」', 2);
      var useAI = draft.useAI;
      var cooldown = draft.cooldownSec;

      var aiSwitch = switchRow('让 AI 即兴回一句', '关闭则只用上面的台词库', useAI, function (v) { useAI = v; });
      var cooldownRow = stepperRow('冷却', '同一处连点不会刷屏', cooldown, [0, 60], 1, function (v) { return v + ' 秒'; }, function (v) { cooldown = v; });

      dialog({
        title: zone ? '编辑热区' : '新增热区',
        body: h('div', {}, [
          field('名字', nameInput),
          field('台词库', linesArea),
          field('补充设定', promptArea),
          h('div', { class: 'oc-list' }, [aiSwitch, cooldownRow])
        ]),
        actions: [
          zone ? { label: '删除', value: 'remove', variant: 'danger' } : { label: '取消', value: false },
          { label: '保存', value: 'ok', variant: 'primary' }
        ]
      }).then(function (result) {
        if (result === 'remove' && zone) {
          ctx.actions.dropZone(zone.id);
          render();
          return;
        }
        if (result !== 'ok') return;
        ctx.actions.saveZone(normalizeZone({
          id: draft.id,
          name: String(nameInput.value || '').trim(),
          lines: String(linesArea.value || '').split('\n').map(function (s) { return s.trim(); }).filter(Boolean),
          prompt: String(promptArea.value || '').trim(),
          useAI: useAI,
          cooldownSec: cooldown,
          x: draft.x, y: draft.y, w: draft.w, h: draft.h, shape: draft.shape
        }));
        render();
        ctx.host.ui.toast('热区已保存');
      });
    }

    function editZonePosition(zone) {
      var draft = normalizeZone(zone);
      var bodyEl = h('div', {});
      var preview = h('div', {
        style: 'position:relative;aspect-ratio:1;border-radius:12px;border:1px solid var(--oc-line-soft);background:rgba(255,255,255,.03);margin-bottom:6px;overflow:hidden'
      });
      var box = h('div', {
        style: 'position:absolute;border:1px solid rgba(232,201,138,.7);background:rgba(232,201,138,.14);border-radius:4px'
      });
      preview.appendChild(box);

      function paint() {
        box.style.left = (draft.x * 100) + '%';
        box.style.top = (draft.y * 100) + '%';
        box.style.width = (draft.w * 100) + '%';
        box.style.height = (draft.h * 100) + '%';
      }

      bodyEl.appendChild(preview);
      bodyEl.appendChild(sliderRow('横向位置', '', draft.x * 100, 0, 100, 1, function (v) { return Math.round(v) + '%'; }, function (v) {
        draft.x = v / 100; paint();
      }));
      bodyEl.appendChild(sliderRow('纵向位置', '顶部为 0%，头部大约在 8–25%', draft.y * 100, 0, 100, 1, function (v) { return Math.round(v) + '%'; }, function (v) {
        draft.y = v / 100; paint();
      }));
      bodyEl.appendChild(sliderRow('宽度', '', draft.w * 100, 2, 100, 1, function (v) { return Math.round(v) + '%'; }, function (v) {
        draft.w = v / 100; paint();
      }));
      bodyEl.appendChild(sliderRow('高度', '', draft.h * 100, 2, 100, 1, function (v) { return Math.round(v) + '%'; }, function (v) {
        draft.h = v / 100; paint();
      }));
      paint();

      dialog({
        title: '「' + draft.name + '」的位置',
        body: bodyEl,
        actions: [
          { label: '取消', value: false },
          { label: '保存位置', value: 'ok', variant: 'primary' }
        ]
      }).then(function (result) {
        if (result !== 'ok') return;
        ctx.actions.saveZone(draft);
        render();
      });
    }

    function exportDialog() {
      ctx.actions.exportAll().then(function (payload) {
        var json = JSON.stringify(payload);
        var area = h('textarea', {
          class: 'oc-input oc-textarea',
          rows: '8',
          readonly: true,
          style: 'font-family:ui-monospace,Consolas,monospace;font-size:10.5px'
        });
        area.value = json;

        dialog({
          title: '导出数据',
          body: h('div', {}, [
            h('p', { class: 'oc-row__sub', text: '包含设置、衣装、场景、日志、回忆与本地图片，约 ' + Math.round(json.length / 1024) + ' KB。' }),
            area
          ]),
          actions: [
            { label: '全选', value: 'select' },
            { label: '复制', value: 'copy', variant: 'primary' }
          ]
        }).then(function (result) {
          if (result === 'select') {
            area.focus();
            area.select();
            return;
          }
          if (result === 'copy') {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(json).then(function () {
                ctx.host.ui.toast('已复制到剪贴板');
              }).catch(function () {
                area.focus();
                area.select();
              });
            } else {
              area.focus();
              area.select();
            }
          }
        });
      });
    }

    function render() {
      var s = state.get();
      var st = s.settings;
      clear(wrap);

      /* 角色 */
      var nameInput = textInput(st.charName, s.character ? '留空则用「' + s.character.name + '」' : '他', 16);
      nameInput.addEventListener('change', function () {
        ctx.actions.saveSettings({ charName: String(nameInput.value || '').trim() });
      });

      var titleInput = textInput(st.title, '一行称号', 24);
      titleInput.addEventListener('change', function () {
        ctx.actions.saveSettings({ title: String(titleInput.value || '').trim() });
      });

      var poemInput = textInput(st.poem, '右侧竖排的一句话', 48);
      poemInput.addEventListener('change', function () {
        ctx.actions.saveSettings({ poem: String(poemInput.value || '').trim() });
      });

      wrap.appendChild(section('角色', [
        h('div', { style: 'padding:10px 0' }, [
          field('名字', nameInput),
          field('称号', titleInput),
          field('诗句', poemInput)
        ]),
        switchRow('显示诗句', '右侧竖排的那一行', st.showPoem, function (v) {
          ctx.actions.saveSettings({ showPoem: v });
          render();
        }),
        switchRow('AI 对话', '关闭后点触只用本地台词', st.aiEnabled, function (v) {
          ctx.actions.saveSettings({ aiEnabled: v });
          render();
        }),
        h('div', { style: 'padding:10px 0' }, [
          field('语气', segmented(Object.keys(TONE_LABELS).map(function (k) {
            return { id: k, name: { gentle: '温柔', playful: '轻佻', cool: '克制' }[k] || k };
          }), st.aiTone, function (id) {
            ctx.actions.saveSettings({ aiTone: id });
          }))
        ])
      ]));

      /* 舞台 */
      wrap.appendChild(section('舞台', [
        sliderRow('脖子分界线', '往上切得多，头部动的范围就大', st.neck * 100, 12, 90, 1, function (v) {
          return Math.round(v) + '%';
        }, function (v) {
          ctx.actions.saveSettings({ neck: v / 100 });
        }),
        sliderRow('动态幅度', '呼吸、摇摆、视线跟随的整体强度', st.motionScale * 100, 0, 180, 5, function (v) {
          return Math.round(v) + '%';
        }, function (v) {
          ctx.actions.saveSettings({ motionScale: v / 100 });
        }),
        sliderRow('视线锚点 X', '头部中心的横向位置', st.anchorX * 100, 10, 90, 1, function (v) {
          return Math.round(v) + '%';
        }, function (v) {
          ctx.actions.saveSettings({ anchorX: v / 100 });
        }),
        sliderRow('视线锚点 Y', '头部中心的纵向位置', st.anchorY * 100, 5, 60, 1, function (v) {
          return Math.round(v) + '%';
        }, function (v) {
          ctx.actions.saveSettings({ anchorY: v / 100 });
        }),
        switchRow('呼吸与摇摆', '关掉就完全静止', st.breath, function (v) {
          ctx.actions.saveSettings({ breath: v });
          render();
        }),
        switchRow('视线跟随', '指针移动时人物跟着轻轻偏头', st.lookFollow, function (v) {
          ctx.actions.saveSettings({ lookFollow: v });
          render();
        })
      ]));

      /* 专注 */
      wrap.appendChild(section('专注', [
        stepperRow('每轮时长', '', st.focusMinutes, FOCUS.minutes, 5, function (v) { return v + ' 分钟'; }, function (v) {
          ctx.actions.saveSettings({ focusMinutes: v });
        }),
        stepperRow('每轮组数', '完成一轮算一次默契', st.focusRounds, FOCUS.rounds, 1, function (v) { return v + ' 轮'; }, function (v) {
          ctx.actions.saveSettings({ focusRounds: v });
        }),
        stepperRow('组间休息', '', st.breakMinutes, FOCUS.breakMinutes, 1, function (v) { return v + ' 分钟'; }, function (v) {
          ctx.actions.saveSettings({ breakMinutes: v });
        }),
        stepperRow('能量上限', '超过这个值不再累积', st.energyMax, [20, 200], 10, function (v) { return String(v); }, function (v) {
          ctx.actions.saveSettings({ energyMax: v });
        })
      ]));

      /* 热区 */
      var zoneRows = [h('div', { style: 'padding:8px 0' },
        button('新增热区', { icon: 'plus', onClick: function () { editZone(null); } })
      )];

      s.zones.forEach(function (zone) {
        zoneRows.push(h('div', { class: 'oc-row' }, [
          h('div', { class: 'oc-row__main' }, [
            h('div', { class: 'oc-row__title', text: zone.name }),
            h('div', { class: 'oc-row__sub', text: '台词 ' + zone.lines.length + ' 句 · ' + (zone.useAI ? 'AI 即兴' : '只用台词库') + ' · 冷却 ' + zone.cooldownSec + 's' })
          ]),
          button('位置', {
            variant: 'ghost',
            onClick: function () { editZonePosition(zone); }
          }),
          button('编辑', {
            onClick: function () { editZone(zone); }
          })
        ]));
      });
      wrap.appendChild(section('点触热区', zoneRows));

      /* 数据 */
      wrap.appendChild(section('数据', [
        h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap;padding:10px 0' }, [
          button('导出', { icon: 'upload', onClick: exportDialog }),
          button('导入', { icon: 'link', variant: 'ghost', onClick: function () { importInput.click(); } }),
          button('清空全部', {
            variant: 'danger',
            onClick: function () {
              ctx.host.ui.confirm({
                title: '清空全部数据？',
                message: '设置、衣装、场景、礼物、日志、回忆都会删掉，无法恢复。'
              }).then(function (ok) {
                if (!ok) return;
                ctx.actions.resetAll().then(function () {
                  ctx.host.ui.toast('已清空');
                  render();
                });
              });
            }
          })
        ])
      ]));

      wrap.appendChild(h('p', {
        style: 'text-align:center;font-size:9.5px;letter-spacing:.16em;color:var(--oc-text-3);margin:18px 0 4px;font-family:var(--oc-sans)',
        text: 'OTOME COMPANION v' + __VERSION__
      }));
    }

    var unsubscribe = state.subscribe(function (s, keys) {
      if (keys.indexOf('settings') !== -1 || keys.indexOf('zones') !== -1) render();
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
