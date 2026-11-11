/**
 * 渲染器工厂：统一契约，真 Live2D 不可用时自动降级到分层立绘。
 *
 * 契约（两个实现必须都满足）：
 *   setScene(scene, src) / setPortrait(src) / setOptions(patch)
 *   setPointer(x, y) / clearPointer() / setExpression(id) / playMotion(id)
 *   press(clientX, clientY) / toStagePoint(x, y) / imageRect()
 *   pause() / resume() / destroy()
 */

import { createPseudoRenderer } from './pseudo.js';
import { createLive2DRenderer } from './live2d.js';

export function createRenderer(opts) {
  var options = opts || {};
  var model = options.model || { kind: 'pseudo' };

  if (model.kind === 'live2d') {
    var l2d = createLive2DRenderer(options);
    if (l2d) return l2d;
  }

  return createPseudoRenderer(options);
}

export { createPseudoRenderer, createLive2DRenderer };
