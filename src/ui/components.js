/** 通用组件：图标、弹层、步进器、开关、分段选择、表单行 */

import { h, clear } from './dom.js';
import { iconMarkup } from './icons.js';

export function icon(name, cls) {
  return h('span', { class: 'oc-icon' + (cls ? ' ' + cls : ''), svg: iconMarkup(name) });
}

export function button(label, opts) {
  var o = opts || {};
  return h('button', {
    class: 'oc-btn' + (o.variant ? ' oc-btn--' + o.variant : '') + (o.block ? ' oc-btn--block' : ''),
    type: 'button',
    disabled: !!o.disabled,
    onclick: o.onClick
  }, o.icon ? [icon(o.icon), h('span', { text: label })] : label);
}

/** 底部弹层 / 对话框：返回 Promise，值为选中的 action.value */
export function dialog(opts) {
  var o = opts || {};
  return new Promise(function (resolve) {
    var finished = false;

    var body = h('div', { class: 'oc-dialog__body' });
    if (o.setup) o.setup(body);
    else if (o.body) body.appendChild(o.body);

    var actions = h('div', { class: 'oc-dialog__actions' });
    (o.actions || [{ label: '关闭', value: false }]).forEach(function (a) {
      actions.appendChild(h('button', {
        class: 'oc-btn' + (a.variant ? ' oc-btn--' + a.variant : ''),
        type: 'button',
        text: a.label,
        onclick: function () { close(a.value); }
      }));
    });

    var card = h('div', { class: 'oc-dialog' }, [
      o.title ? h('div', { class: 'oc-dialog__title', text: o.title }) : null,
      body,
      actions
    ]);

    var mask = h('div', {
      class: 'oc-mask',
      onclick: function (e) { if (e.target === mask) close(false); }
    }, [card]);

    document.body.appendChild(mask);
    requestAnimationFrame(function () { mask.classList.add('is-open'); });

    function close(value) {
      if (finished) return;
      finished = true;
      mask.classList.remove('is-open');
      setTimeout(function () {
        if (mask.parentNode) mask.parentNode.removeChild(mask);
      }, 220);
      resolve(value);
    }

    mask.__ocClose = close;
  });
}

export function dialogCount() {
  return document.querySelectorAll('.oc-mask').length;
}

export function stepperRow(label, desc, value, range, step, format, onChange) {
  var valueEl = h('span', { class: 'oc-stepper__value', text: format(value) });
  var minus = h('button', {
    class: 'oc-stepper__btn', type: 'button', text: '−',
    onclick: function () { set(value - step); }
  });
  var plus = h('button', {
    class: 'oc-stepper__btn', type: 'button', text: '+',
    onclick: function () { set(value + step); }
  });

  function set(next) {
    if (next < range[0] || next > range[1]) return;
    value = next;
    valueEl.textContent = format(value);
    minus.disabled = value <= range[0];
    plus.disabled = value >= range[1];
    onChange(value);
  }

  minus.disabled = value <= range[0];
  plus.disabled = value >= range[1];

  return h('div', { class: 'oc-row' }, [
    h('div', { class: 'oc-row__main' }, [
      h('div', { class: 'oc-row__title', text: label }),
      desc ? h('div', { class: 'oc-row__sub', text: desc }) : null
    ]),
    h('div', { class: 'oc-stepper' }, [minus, valueEl, plus])
  ]);
}

export function switchRow(label, desc, checked, onChange) {
  var btn = h('button', {
    class: 'oc-switch',
    type: 'button',
    role: 'switch',
    'aria-checked': String(checked),
    onclick: function () {
      checked = !checked;
      btn.setAttribute('aria-checked', String(checked));
      onChange(checked);
    }
  });
  return h('div', { class: 'oc-row' }, [
    h('div', { class: 'oc-row__main' }, [
      h('div', { class: 'oc-row__title', text: label }),
      desc ? h('div', { class: 'oc-row__sub', text: desc }) : null
    ]),
    btn
  ]);
}

/** 滑块行：适用于 0–1 的比例参数 */
export function sliderRow(label, desc, value, min, max, step, format, onInput) {
  var valueEl = h('span', { class: 'oc-stepper__value', text: format(value) });
  var input = h('input', {
    class: 'oc-range',
    type: 'range',
    min: String(min),
    max: String(max),
    step: String(step),
    value: String(value)
  });
  input.addEventListener('input', function () {
    var next = Number(input.value);
    valueEl.textContent = format(next);
    onInput(next);
  });

  return h('div', { class: 'oc-row', style: 'flex-direction:column;align-items:stretch;gap:2px' }, [
    h('div', { style: 'display:flex;align-items:baseline;gap:8px' }, [
      h('div', { class: 'oc-row__title', text: label }),
      valueEl
    ]),
    desc ? h('div', { class: 'oc-row__sub', text: desc }) : null,
    input
  ]);
}

export function segmented(items, value, onPick) {
  var buttons = items.map(function (item) {
    return h('button', {
      class: 'oc-seg__btn' + (item.id === value ? ' is-active' : ''),
      type: 'button',
      text: item.name,
      onclick: function () {
        buttons.forEach(function (b, i) { b.classList.toggle('is-active', items[i].id === item.id); });
        onPick(item.id);
      }
    });
  });
  return h('div', { class: 'oc-seg' }, buttons);
}

export function field(label, input, hint) {
  return h('label', { class: 'oc-field' }, [
    h('span', { class: 'oc-field__label', text: label }),
    input,
    hint ? h('span', { class: 'oc-field__hint', text: hint }) : null
  ]);
}

export function textInput(value, placeholder, maxlength) {
  return h('input', {
    class: 'oc-input',
    type: 'text',
    value: value || '',
    placeholder: placeholder || '',
    maxlength: String(maxlength || 40)
  });
}

export function textArea(value, placeholder, rows) {
  var el = h('textarea', {
    class: 'oc-input oc-textarea',
    rows: String(rows || 3),
    placeholder: placeholder || ''
  });
  el.value = value || '';
  return el;
}

export function emptyState(title, desc, action) {
  return h('div', { class: 'oc-empty' }, [
    h('div', { class: 'oc-empty__title', text: title }),
    desc ? h('div', { class: 'oc-empty__desc', text: desc }) : null,
    action || null
  ]);
}

export function clearNode(node) {
  clear(node);
  return node;
}
