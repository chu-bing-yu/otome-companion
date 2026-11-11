/**
 * 真 Live2D 预留：只有检测到 Cubism Core 与模型资源时才创建，
 * 否则返回 null，由 index.js 自动降级到 pseudo 渲染器。
 *
 * 首版不内置 cubism core（体积与授权都不合适），所以正常情况一律返回 null。
 * 以后要接真模型：实现 createLive2DRenderer 的同一套接口即可，界面层零改动。
 */

export function hasCubismCore() {
  return typeof window !== 'undefined' && !!window.Live2DCubismCore;
}

/**
 * @returns {null | object} 与 pseudo 渲染器同一契约
 */
export function createLive2DRenderer(opts) {
  var model = opts && opts.model;
  if (!model || model.kind !== 'live2d') return null;
  if (!hasCubismCore()) {
    if (window.console && console.info) {
      console.info('[otome-companion] 没有检测到 Cubism Core，降级为分层立绘渲染');
    }
    return null;
  }
  // 真正的 Cubism 渲染在后续版本接入，这里先明确返回 null 走降级
  return null;
}

export function describeModel(model) {
  if (!model || !model.kind) return '分层立绘';
  if (model.kind === 'live2d') return hasCubismCore() ? 'Live2D' : '分层立绘（Live2D 不可用）';
  return '分层立绘';
}
