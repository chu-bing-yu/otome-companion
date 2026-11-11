/** 极简 DOM 构建工具：避免字符串拼接与重复出错 */

export function h(tag, attrs, children) {
  var el = document.createElement(tag);
  if (attrs) {
    Object.keys(attrs).forEach(function (key) {
      var v = attrs[key];
      if (v === null || v === undefined || v === false) return;
      if (key === 'class') el.className = v;
      else if (key === 'text') el.textContent = v;
      else if (key === 'svg') el.innerHTML = v; // 仅用于内置图标常量
      else if (key === 'dataset') {
        Object.keys(v).forEach(function (d) { el.dataset[d] = v[d]; });
      } else if (key.slice(0, 2) === 'on' && typeof v === 'function') {
        el.addEventListener(key.slice(2).toLowerCase(), v);
      } else if (v === true) {
        el.setAttribute(key, '');
      } else {
        el.setAttribute(key, v);
      }
    });
  }
  append(el, children);
  return el;
}

export function append(parent, children) {
  if (children === null || children === undefined || children === false) return parent;
  if (Array.isArray(children)) {
    children.forEach(function (c) { append(parent, c); });
    return parent;
  }
  if (typeof children === 'string' || typeof children === 'number') {
    parent.appendChild(document.createTextNode(String(children)));
    return parent;
  }
  if (children.nodeType) parent.appendChild(children);
  return parent;
}

export function clear(node) {
  while (node && node.firstChild) node.removeChild(node.firstChild);
  return node;
}

/** 绑定事件并返回解绑函数，便于视图销毁时统一清理 */
export function on(el, type, handler, opts) {
  el.addEventListener(type, handler, opts);
  return function () { el.removeEventListener(type, handler, opts); };
}

export function qs(root, sel) {
  return root ? root.querySelector(sel) : null;
}

export function hasClass(el, cls) {
  return !!el && el.classList.contains(cls);
}
