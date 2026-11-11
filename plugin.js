/* otome-companion v0.1.0 | built 2026-11-11T13:49:03.047Z */
(() => {
  // src/ui/theme.css
  var theme_default = '/* 暗夜乙游：夜色玻璃 + 淡金细边 + 暖白文字 */\n\n.oc-root,\n.oc-mask,\n.oc-toast {\n  --oc-gold: #E8C98A;\n  --oc-gold-dim: #C9A063;\n  --oc-gold-deep: #8A6B3C;\n  --oc-ink: #0A0D13;\n  --oc-ink-2: #121722;\n  --oc-ink-3: #1B2230;\n  --oc-text: #F3EFE7;\n  --oc-text-2: #C8C2B6;\n  --oc-text-3: #8C877E;\n  --oc-glass: rgba(18, 23, 34, .52);\n  --oc-glass-deep: rgba(10, 13, 19, .72);\n  --oc-line: rgba(232, 201, 138, .22);\n  --oc-line-soft: rgba(255, 255, 255, .09);\n  --oc-danger: #E0685F;\n  --oc-ok: #7FD1C1;\n  --oc-serif: "Songti SC", "STSong", "Noto Serif CJK SC", "Noto Serif SC", "SimSun", Georgia, serif;\n  --oc-sans: -apple-system, "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif;\n  --oc-radius: 16px;\n  --oc-shadow: 0 18px 42px rgba(0, 0, 0, .46);\n}\n\n.oc-root *,\n.oc-mask *,\n.oc-toast * {\n  box-sizing: border-box;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.oc-root {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  background: var(--oc-ink);\n  color: var(--oc-text);\n  font-family: var(--oc-serif);\n  font-size: 12.5px;\n  line-height: 1.6;\n  -webkit-user-select: none;\n  user-select: none;\n  -webkit-font-smoothing: antialiased;\n}\n\n.oc-icon {\n  display: inline-flex;\n  width: 18px;\n  height: 18px;\n  flex: 0 0 auto;\n}\n\n.oc-icon svg {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\n/* ---------------- 玻璃面板 ---------------- */\n\n.oc-glass {\n  background: linear-gradient(158deg, rgba(26, 32, 45, .66), rgba(10, 13, 19, .74));\n  border: 1px solid var(--oc-line);\n  border-radius: var(--oc-radius);\n  -webkit-backdrop-filter: blur(16px) saturate(1.15);\n  backdrop-filter: blur(16px) saturate(1.15);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), var(--oc-shadow);\n}\n\n.oc-eyebrow {\n  font-family: var(--oc-sans);\n  font-size: 8.5px;\n  letter-spacing: .26em;\n  text-transform: uppercase;\n  color: var(--oc-text-3);\n}\n\n.oc-gold {\n  color: var(--oc-gold);\n}\n\n.oc-num {\n  font-family: var(--oc-sans);\n  font-variant-numeric: tabular-nums;\n  letter-spacing: .02em;\n}\n\n/* ---------------- 按钮 ---------------- */\n\n.oc-btn {\n  appearance: none;\n  border: 1px solid var(--oc-line);\n  background: rgba(255, 255, 255, .04);\n  color: var(--oc-text);\n  font-family: var(--oc-serif);\n  font-size: 12.5px;\n  padding: 9px 16px;\n  border-radius: 999px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  cursor: pointer;\n  transition: background .18s ease, border-color .18s ease, transform .18s ease;\n}\n\n.oc-btn:active {\n  transform: scale(.97);\n  background: rgba(255, 255, 255, .08);\n}\n\n.oc-btn:disabled {\n  opacity: .38;\n  cursor: default;\n}\n\n.oc-btn--primary {\n  background: linear-gradient(180deg, rgba(232, 201, 138, .94), rgba(201, 160, 99, .94));\n  border-color: rgba(232, 201, 138, .8);\n  color: #221a0c;\n  font-weight: 600;\n  box-shadow: 0 8px 20px rgba(232, 201, 138, .18);\n}\n\n.oc-btn--ghost {\n  background: transparent;\n  border-color: var(--oc-line-soft);\n  color: var(--oc-text-2);\n}\n\n.oc-btn--danger {\n  border-color: rgba(224, 104, 95, .42);\n  color: #E9A9A4;\n  background: rgba(224, 104, 95, .08);\n}\n\n.oc-btn--block {\n  width: 100%;\n}\n\n/* ---------------- 表单 ---------------- */\n\n.oc-input {\n  width: 100%;\n  background: rgba(6, 9, 14, .5);\n  border: 1px solid var(--oc-line-soft);\n  border-radius: 10px;\n  color: var(--oc-text);\n  font-family: var(--oc-serif);\n  font-size: 13px;\n  padding: 9px 11px;\n  outline: none;\n  transition: border-color .18s ease;\n  -webkit-user-select: text;\n  user-select: text;\n}\n\n.oc-input:focus {\n  border-color: rgba(232, 201, 138, .5);\n}\n\n.oc-textarea {\n  resize: none;\n  line-height: 1.7;\n}\n\n.oc-field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 12px;\n}\n\n.oc-field__label {\n  font-size: 11px;\n  letter-spacing: .12em;\n  color: var(--oc-text-3);\n  font-family: var(--oc-sans);\n}\n\n.oc-field__hint {\n  font-size: 10.5px;\n  color: var(--oc-text-3);\n  line-height: 1.5;\n}\n\n.oc-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 11px 2px;\n  border-bottom: 1px solid rgba(255, 255, 255, .05);\n}\n\n.oc-row:last-child {\n  border-bottom: none;\n}\n\n.oc-row__main {\n  flex: 1;\n  min-width: 0;\n}\n\n.oc-row__title {\n  font-size: 12.5px;\n  color: var(--oc-text);\n}\n\n.oc-row__sub {\n  font-size: 10.5px;\n  color: var(--oc-text-3);\n  margin-top: 2px;\n  line-height: 1.5;\n}\n\n.oc-stepper {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n  border: 1px solid var(--oc-line-soft);\n  border-radius: 999px;\n  padding: 2px;\n  background: rgba(6, 9, 14, .4);\n}\n\n.oc-stepper__btn {\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  border: none;\n  background: transparent;\n  color: var(--oc-text-2);\n  font-size: 15px;\n  line-height: 1;\n  cursor: pointer;\n}\n\n.oc-stepper__btn:disabled {\n  opacity: .3;\n}\n\n.oc-stepper__value {\n  min-width: 44px;\n  text-align: center;\n  font-family: var(--oc-sans);\n  font-size: 11.5px;\n  color: var(--oc-gold);\n}\n\n.oc-range {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 100%;\n  height: 3px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, .14);\n  outline: none;\n  margin: 8px 0 2px;\n}\n\n.oc-range::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 15px;\n  height: 15px;\n  border-radius: 50%;\n  background: var(--oc-gold);\n  border: none;\n  box-shadow: 0 0 12px rgba(232, 201, 138, .45);\n  cursor: pointer;\n}\n\n.oc-range::-moz-range-thumb {\n  width: 15px;\n  height: 15px;\n  border-radius: 50%;\n  background: var(--oc-gold);\n  border: none;\n  cursor: pointer;\n}\n\n.oc-switch {\n  width: 42px;\n  height: 24px;\n  border-radius: 999px;\n  border: 1px solid var(--oc-line-soft);\n  background: rgba(6, 9, 14, .6);\n  position: relative;\n  cursor: pointer;\n  flex: 0 0 auto;\n  transition: background .2s ease, border-color .2s ease;\n}\n\n.oc-switch::after {\n  content: "";\n  position: absolute;\n  top: 2px;\n  left: 2px;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: var(--oc-text-3);\n  transition: transform .2s ease, background .2s ease;\n}\n\n.oc-switch[aria-checked="true"] {\n  background: rgba(232, 201, 138, .22);\n  border-color: rgba(232, 201, 138, .5);\n}\n\n.oc-switch[aria-checked="true"]::after {\n  transform: translateX(18px);\n  background: var(--oc-gold);\n}\n\n.oc-seg {\n  display: flex;\n  gap: 4px;\n  padding: 3px;\n  border-radius: 999px;\n  background: rgba(6, 9, 14, .5);\n  border: 1px solid var(--oc-line-soft);\n}\n\n.oc-seg__btn {\n  flex: 1;\n  border: none;\n  background: transparent;\n  color: var(--oc-text-3);\n  font-family: var(--oc-sans);\n  font-size: 11px;\n  padding: 6px 8px;\n  border-radius: 999px;\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n.oc-seg__btn.is-active {\n  background: rgba(232, 201, 138, .16);\n  color: var(--oc-gold);\n}\n\n/* ---------------- 弹层 ---------------- */\n\n.oc-mask {\n  position: fixed;\n  inset: 0;\n  z-index: 9998;\n  display: flex;\n  align-items: flex-end;\n  justify-content: center;\n  background: rgba(3, 5, 9, .62);\n  -webkit-backdrop-filter: blur(3px);\n  backdrop-filter: blur(3px);\n  opacity: 0;\n  transition: opacity .22s ease;\n  padding-bottom: env(safe-area-inset-bottom, 0px);\n}\n\n.oc-mask.is-open {\n  opacity: 1;\n}\n\n.oc-dialog {\n  width: 100%;\n  max-width: 430px;\n  max-height: 88vh;\n  overflow-y: auto;\n  padding: 20px 18px 16px;\n  border-radius: 22px 22px 0 0;\n  border: 1px solid var(--oc-line);\n  border-bottom: none;\n  background: linear-gradient(180deg, rgba(24, 30, 43, .97), rgba(9, 12, 18, .99));\n  box-shadow: 0 -18px 50px rgba(0, 0, 0, .5);\n  transform: translateY(14px);\n  transition: transform .26s cubic-bezier(.22, .8, .24, 1);\n  font-family: var(--oc-serif);\n  color: var(--oc-text);\n  font-size: 12.5px;\n}\n\n.oc-mask.is-open .oc-dialog {\n  transform: translateY(0);\n}\n\n.oc-dialog__title {\n  font-size: 15px;\n  letter-spacing: .1em;\n  margin-bottom: 14px;\n  color: var(--oc-text);\n}\n\n.oc-dialog__body {\n  margin-bottom: 16px;\n}\n\n.oc-dialog__actions {\n  display: flex;\n  gap: 8px;\n  justify-content: flex-end;\n  flex-wrap: wrap;\n}\n\n.oc-dialog__actions .oc-btn {\n  min-width: 84px;\n}\n\n/* ---------------- 空状态 / 提示 ---------------- */\n\n.oc-empty {\n  padding: 28px 18px;\n  text-align: center;\n  color: var(--oc-text-3);\n}\n\n.oc-empty__title {\n  font-size: 13px;\n  color: var(--oc-text-2);\n  letter-spacing: .08em;\n  margin-bottom: 6px;\n}\n\n.oc-empty__desc {\n  font-size: 11px;\n  line-height: 1.7;\n}\n\n.oc-toast {\n  position: fixed;\n  left: 50%;\n  bottom: calc(env(safe-area-inset-bottom, 0px) + 96px);\n  transform: translate(-50%, 8px);\n  padding: 9px 16px;\n  border-radius: 999px;\n  background: rgba(8, 11, 17, .92);\n  border: 1px solid var(--oc-line);\n  color: var(--oc-text);\n  font-family: var(--oc-serif);\n  font-size: 12px;\n  z-index: 9999;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity .2s ease, transform .2s ease;\n  max-width: 78vw;\n  text-align: center;\n}\n\n.oc-toast.is-on {\n  opacity: 1;\n  transform: translate(-50%, 0);\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .oc-root *,\n  .oc-mask * {\n    animation-duration: .001ms !important;\n    transition-duration: .001ms !important;\n  }\n}\n';

  // src/ui/base.css
  var base_default = "/* 骨架：舞台宿主、HUD 容器、底部入口、半屏面板、右侧抽屉 */\n\n.oc-frame {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  flex-direction: column;\n}\n\n.oc-host {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  min-height: 320px;\n  overflow: hidden;\n}\n\n.oc-stage-host {\n  position: absolute;\n  inset: 0;\n}\n\n.oc-hud {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n}\n\n.oc-hud__layer {\n  position: absolute;\n  inset: 0;\n}\n\n.oc-hud button,\n.oc-hud__card,\n.oc-dock,\n.oc-sheet,\n.oc-drawer {\n  pointer-events: auto;\n}\n\n/* ---------------- 底部四入口 ---------------- */\n\n.oc-dock {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: calc(env(safe-area-inset-bottom, 0px) + 14px);\n  display: flex;\n  justify-content: center;\n  gap: 26px;\n  z-index: 12;\n}\n\n.oc-dock__item {\n  appearance: none;\n  background: none;\n  border: none;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 7px;\n  color: var(--oc-text-3);\n  cursor: pointer;\n  transition: color .2s ease, transform .2s ease;\n}\n\n.oc-dock__item:active {\n  transform: scale(.94);\n}\n\n.oc-dock__ring {\n  width: 46px;\n  height: 46px;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  border: 1px solid rgba(232, 201, 138, .26);\n  background: radial-gradient(circle at 50% 30%, rgba(46, 55, 74, .82), rgba(9, 12, 18, .88));\n  box-shadow: 0 10px 22px rgba(0, 0, 0, .44), inset 0 0 14px rgba(232, 201, 138, .07);\n  transition: border-color .2s ease, box-shadow .2s ease;\n}\n\n.oc-dock__ring .oc-icon {\n  width: 20px;\n  height: 20px;\n  color: var(--oc-gold);\n  opacity: .82;\n}\n\n.oc-dock__item.is-active {\n  color: var(--oc-gold);\n}\n\n.oc-dock__item.is-active .oc-dock__ring {\n  border-color: rgba(232, 201, 138, .62);\n  box-shadow: 0 10px 24px rgba(0, 0, 0, .5), 0 0 20px rgba(232, 201, 138, .18), inset 0 0 16px rgba(232, 201, 138, .12);\n}\n\n.oc-dock__label {\n  font-family: var(--oc-sans);\n  font-size: 8.5px;\n  letter-spacing: .2em;\n  text-transform: uppercase;\n}\n\n/* ---------------- 半屏面板 ---------------- */\n\n.oc-scrim {\n  position: absolute;\n  inset: 0;\n  background: rgba(4, 6, 10, .48);\n  -webkit-backdrop-filter: blur(5px);\n  backdrop-filter: blur(5px);\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity .28s ease;\n  z-index: 14;\n}\n\n.oc-scrim.is-on {\n  opacity: 1;\n  pointer-events: auto;\n}\n\n.oc-sheet {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  height: 74%;\n  z-index: 16;\n  display: flex;\n  flex-direction: column;\n  border-radius: 22px 22px 0 0;\n  border-top: 1px solid var(--oc-line);\n  background: linear-gradient(180deg, rgba(22, 28, 40, .95), rgba(8, 11, 17, .98));\n  -webkit-backdrop-filter: blur(22px) saturate(1.2);\n  backdrop-filter: blur(22px) saturate(1.2);\n  box-shadow: 0 -22px 56px rgba(0, 0, 0, .55);\n  transform: translateY(103%);\n  transition: transform .36s cubic-bezier(.22, .8, .24, 1);\n  will-change: transform;\n  pointer-events: none;\n}\n\n.oc-sheet.is-open {\n  transform: translateY(0);\n  pointer-events: auto;\n}\n\n.oc-sheet__handle {\n  width: 38px;\n  height: 3px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, .16);\n  margin: 10px auto 0;\n  flex: 0 0 auto;\n}\n\n.oc-sheet__head {\n  display: flex;\n  align-items: baseline;\n  gap: 10px;\n  padding: 14px 20px 10px;\n  flex: 0 0 auto;\n}\n\n.oc-sheet__title {\n  font-size: 15px;\n  letter-spacing: .14em;\n}\n\n.oc-sheet__sub {\n  font-size: 10.5px;\n  color: var(--oc-text-3);\n  font-family: var(--oc-sans);\n  letter-spacing: .1em;\n  margin-left: auto;\n}\n\n.oc-sheet__close {\n  margin-left: auto;\n  width: 28px;\n  height: 28px;\n  border-radius: 50%;\n  border: 1px solid var(--oc-line-soft);\n  background: transparent;\n  color: var(--oc-text-3);\n  display: grid;\n  place-items: center;\n  cursor: pointer;\n}\n\n.oc-sheet__close .oc-icon {\n  width: 14px;\n  height: 14px;\n}\n\n.oc-sheet__body {\n  flex: 1;\n  overflow-y: auto;\n  overscroll-behavior: contain;\n  padding: 4px 18px calc(env(safe-area-inset-bottom, 0px) + 26px);\n  -webkit-overflow-scrolling: touch;\n}\n\n/* ---------------- 右侧抽屉 ---------------- */\n\n.oc-drawer {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: 86%;\n  max-width: 360px;\n  z-index: 18;\n  display: flex;\n  flex-direction: column;\n  border-left: 1px solid var(--oc-line);\n  background: linear-gradient(200deg, rgba(21, 27, 39, .97), rgba(7, 10, 15, .99));\n  -webkit-backdrop-filter: blur(22px);\n  backdrop-filter: blur(22px);\n  box-shadow: -20px 0 60px rgba(0, 0, 0, .6);\n  transform: translateX(104%);\n  transition: transform .36s cubic-bezier(.22, .8, .24, 1);\n  pointer-events: none;\n}\n\n.oc-drawer.is-open {\n  transform: translateX(0);\n  pointer-events: auto;\n}\n\n.oc-drawer__head {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: calc(env(safe-area-inset-top, 0px) + 18px) 18px 12px;\n  flex: 0 0 auto;\n}\n\n.oc-drawer__title {\n  font-size: 15px;\n  letter-spacing: .16em;\n}\n\n.oc-drawer__body {\n  flex: 1;\n  overflow-y: auto;\n  overscroll-behavior: contain;\n  padding: 0 18px calc(env(safe-area-inset-bottom, 0px) + 24px);\n  -webkit-overflow-scrolling: touch;\n}\n\n/* ---------------- 通用块 ---------------- */\n\n.oc-section {\n  margin-bottom: 18px;\n}\n\n.oc-section__title {\n  font-family: var(--oc-sans);\n  font-size: 9.5px;\n  letter-spacing: .24em;\n  text-transform: uppercase;\n  color: var(--oc-text-3);\n  margin: 16px 2px 8px;\n}\n\n.oc-list {\n  border-radius: 14px;\n  border: 1px solid var(--oc-line-soft);\n  background: rgba(255, 255, 255, .025);\n  padding: 2px 12px;\n}\n\n.oc-grid {\n  display: grid;\n  gap: 10px;\n}\n\n/* ---------------- 横屏 / 平板 ---------------- */\n\n@media (min-width: 720px) and (orientation: landscape) {\n  .oc-sheet {\n    left: auto;\n    right: 14px;\n    bottom: 14px;\n    top: 14px;\n    height: auto;\n    width: 420px;\n    border-radius: 20px;\n    border: 1px solid var(--oc-line);\n    transform: translateX(calc(100% + 20px));\n  }\n\n  .oc-sheet.is-open {\n    transform: translateX(0);\n  }\n\n  .oc-sheet__handle {\n    display: none;\n  }\n\n  .oc-dock {\n    justify-content: flex-start;\n    left: 22px;\n    bottom: 20px;\n    gap: 22px;\n  }\n}\n";

  // src/ui/stage.css
  var stage_default = '/* 舞台：背景 / 立绘 / HUD 卡片 / 气泡 */\n\n.oc-render {\n  position: absolute;\n  inset: 0;\n  overflow: hidden;\n  --oc-scene-tint: #0A0D13;\n  --oc-scene-light: #E8C98A;\n}\n\n.oc-scene {\n  position: absolute;\n  inset: 0;\n  background:\n    radial-gradient(58% 38% at 76% 10%, rgba(232, 201, 138, .16), transparent 72%),\n    radial-gradient(52% 44% at 16% 32%, rgba(108, 140, 186, .12), transparent 74%),\n    linear-gradient(180deg, #151b28 0%, #0b0f16 46%, #06080c 100%);\n}\n\n/* 无背景图时的窗光：斜向暖光带 + 地面反光 */\n.oc-scene::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(112deg, transparent 46%, rgba(232, 201, 138, .08) 52%, transparent 62%),\n    radial-gradient(60% 22% at 50% 100%, rgba(232, 201, 138, .06), transparent 70%);\n  pointer-events: none;\n}\n\n.oc-scene__img {\n  position: absolute;\n  inset: 0;\n  background-size: cover;\n  background-position: center 28%;\n  opacity: 0;\n  transition: opacity .48s ease;\n  will-change: opacity;\n}\n\n.oc-scene__img.is-on {\n  opacity: 1;\n}\n\n.oc-scene__ambient {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  mix-blend-mode: screen;\n  opacity: .9;\n}\n\n.oc-shade {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background:\n    linear-gradient(180deg, rgba(10, 8, 6, .88) 0%, rgba(40, 22, 8, .22) 20%, rgba(6, 9, 14, 0) 38%, rgba(10, 8, 6, .48) 70%, rgba(6, 6, 8, .95) 100%);\n  box-shadow: inset 0 0 120px rgba(0, 0, 0, .55);\n}\n\n/* ---------------- 立绘 ---------------- */\n\n.oc-char {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  will-change: transform;\n}\n\n.oc-char__look,\n.oc-char__breathe {\n  position: absolute;\n  inset: 0;\n  will-change: transform;\n}\n\n.oc-char__img {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n  object-position: center bottom;\n  transform-origin: 50% 100%;\n  -webkit-user-drag: none;\n  pointer-events: none;\n}\n\n.oc-char__upper {\n  position: absolute;\n  inset: 0;\n  will-change: transform;\n}\n\n.oc-char__tint {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  opacity: .16;\n  mix-blend-mode: soft-light;\n  background: radial-gradient(70% 50% at 50% 12%, var(--oc-scene-light, #E8C98A), transparent 70%);\n}\n\n.oc-render--empty .oc-char__img {\n  opacity: 0;\n}\n\n.oc-char__empty {\n  position: absolute;\n  left: 50%;\n  top: 46%;\n  transform: translate(-50%, -50%);\n  padding: 14px 22px;\n  border-radius: 14px;\n  border: 1px dashed rgba(232, 201, 138, .3);\n  color: rgba(243, 239, 231, .5);\n  font-size: 12px;\n  letter-spacing: .12em;\n  pointer-events: none;\n  text-align: center;\n  max-width: 72%;\n  line-height: 1.7;\n}\n\n.oc-render:not(.oc-render--empty) .oc-char__empty {\n  display: none;\n}\n\n.oc-char__glow {\n  position: absolute;\n  left: 50%;\n  top: 34%;\n  width: 78%;\n  aspect-ratio: 1;\n  transform: translate(-50%, -50%);\n  border-radius: 50%;\n  pointer-events: none;\n  opacity: 0;\n  background: radial-gradient(circle, rgba(232, 201, 138, .18), rgba(232, 201, 138, 0) 62%);\n  transition: opacity .18s linear;\n}\n\n.oc-press-ring {\n  position: absolute;\n  width: 12px;\n  height: 12px;\n  margin: -6px 0 0 -6px;\n  border-radius: 50%;\n  border: 1px solid rgba(232, 201, 138, .8);\n  pointer-events: none;\n  opacity: 0;\n}\n\n.oc-press-ring.is-on {\n  animation: oc-ring .62s ease-out forwards;\n}\n\n@keyframes oc-ring {\n  0% {\n    opacity: .9;\n    transform: scale(1);\n  }\n\n  100% {\n    opacity: 0;\n    transform: scale(9);\n  }\n}\n\n/* ---------------- 顶部状态 ---------------- */\n\n.oc-top {\n  position: absolute;\n  top: calc(env(safe-area-inset-top, 0px) + 26px);\n  left: 16px;\n  right: 14px;\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  z-index: 6;\n}\n\n.oc-id {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  min-width: 0;\n  max-width: 46%;\n}\n\n.oc-avatar {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  overflow: hidden;\n  flex: 0 0 auto;\n  border: 1px solid rgba(232, 201, 138, .4);\n  background: radial-gradient(circle at 50% 30%, #2a3244, #0b0e15);\n  box-shadow: 0 0 0 3px rgba(232, 201, 138, .06), 0 8px 18px rgba(0, 0, 0, .5);\n  display: grid;\n  place-items: center;\n}\n\n.oc-avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.oc-avatar__ph {\n  font-size: 15px;\n  color: var(--oc-gold);\n  opacity: .7;\n}\n\n.oc-id__main {\n  min-width: 0;\n}\n\n.oc-id__line {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.oc-id__name {\n  font-size: 15.5px;\n  letter-spacing: .1em;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.oc-id__lv {\n  font-family: var(--oc-sans);\n  font-size: 9px;\n  letter-spacing: .06em;\n  color: var(--oc-gold);\n  border: 1px solid rgba(232, 201, 138, .34);\n  border-radius: 3px;\n  padding: 1px 4px;\n  flex: 0 0 auto;\n}\n\n.oc-id__title {\n  font-size: 10px;\n  color: var(--oc-text-3);\n  letter-spacing: .14em;\n  margin-top: 2px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.oc-stats {\n  margin-left: auto;\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  padding-top: 2px;\n  flex: 0 0 auto;\n}\n\n.oc-stat {\n  display: inline-flex;\n  align-items: center;\n  gap: 3px;\n  font-family: var(--oc-sans);\n  font-size: 10px;\n  color: var(--oc-text-2);\n  white-space: nowrap;\n}\n\n.oc-stat .oc-icon {\n  width: 12px;\n  height: 12px;\n  color: var(--oc-gold);\n  opacity: .9;\n}\n\n.oc-stat b {\n  font-size: 12.5px;\n  font-weight: 600;\n  color: var(--oc-text);\n}\n\n.oc-stat i {\n  font-style: normal;\n  color: var(--oc-text-3);\n  font-size: 9px;\n}\n\n.oc-iconbtn {\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  border: 1px solid var(--oc-line-soft);\n  background: rgba(10, 13, 19, .5);\n  color: var(--oc-text-2);\n  display: grid;\n  place-items: center;\n  cursor: pointer;\n  flex: 0 0 auto;\n}\n\n.oc-iconbtn .oc-icon {\n  width: 13px;\n  height: 13px;\n}\n\n/* ---------------- FOCUS 卡 ---------------- */\n\n.oc-focuscard {\n  position: absolute;\n  top: calc(env(safe-area-inset-top, 0px) + 86px);\n  left: 16px;\n  width: 170px;\n  padding: 12px 13px 11px;\n  z-index: 6;\n  border-radius: 15px;\n}\n\n.oc-focuscard__head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 9px;\n}\n\n.oc-focuscard__state {\n  font-family: var(--oc-sans);\n  font-size: 9px;\n  letter-spacing: .12em;\n  color: var(--oc-gold);\n  opacity: .9;\n}\n\n.oc-focuscard__row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.oc-ring {\n  width: 52px;\n  height: 52px;\n  flex: 0 0 auto;\n  border-radius: 50%;\n  position: relative;\n  display: grid;\n  place-items: center;\n  background: conic-gradient(rgba(232, 201, 138, .9) calc(var(--oc-progress, 0) * 360deg), rgba(255, 255, 255, .08) 0);\n  box-shadow: inset 0 0 0 1px rgba(232, 201, 138, .16), 0 0 18px rgba(232, 201, 138, .08);\n  transition: background .3s linear;\n}\n\n.oc-ring::after {\n  content: "";\n  position: absolute;\n  inset: 3px;\n  border-radius: 50%;\n  background: #0b0f16;\n}\n\n.oc-ring__text {\n  position: relative;\n  z-index: 2;\n  font-family: var(--oc-sans);\n  font-size: 11px;\n  letter-spacing: .02em;\n  color: var(--oc-gold);\n  font-variant-numeric: tabular-nums;\n}\n\n.oc-focuscard__meta {\n  min-width: 0;\n}\n\n.oc-focuscard__time {\n  font-family: var(--oc-sans);\n  font-size: 23px;\n  line-height: 1.1;\n  font-variant-numeric: tabular-nums;\n  letter-spacing: .01em;\n  color: var(--oc-text);\n}\n\n.oc-focuscard__total {\n  font-family: var(--oc-sans);\n  font-size: 9.5px;\n  color: var(--oc-text-3);\n  margin-top: 1px;\n}\n\n.oc-focuscard__task {\n  margin-top: 9px;\n  padding-top: 8px;\n  border-top: 1px solid rgba(255, 255, 255, .06);\n  font-size: 10.5px;\n  color: var(--oc-text-2);\n  display: flex;\n  gap: 5px;\n  align-items: center;\n  cursor: pointer;\n}\n\n.oc-focuscard__task span {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.oc-focuscard__task em {\n  margin-left: auto;\n  font-style: normal;\n  color: var(--oc-gold);\n  opacity: .8;\n}\n\n/* ---------------- 右侧诗句与悬浮钮 ---------------- */\n\n.oc-poem {\n  position: absolute;\n  right: 13px;\n  top: 25%;\n  writing-mode: vertical-rl;\n  text-orientation: upright;\n  max-height: 50%;\n  white-space: nowrap;\n  font-size: 10.5px;\n  letter-spacing: .22em;\n  line-height: 1.9;\n  color: rgba(243, 239, 231, .4);\n  text-shadow: 0 0 14px rgba(0, 0, 0, .7);\n  pointer-events: none;\n  z-index: 5;\n}\n\n.oc-side {\n  position: absolute;\n  right: 12px;\n  top: 62%;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  z-index: 7;\n}\n\n.oc-roundbtn {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  border: 1px solid rgba(232, 201, 138, .24);\n  background: rgba(10, 13, 19, .62);\n  color: var(--oc-gold);\n  cursor: pointer;\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n  transition: transform .18s ease, border-color .18s ease;\n}\n\n.oc-roundbtn:active {\n  transform: scale(.93);\n  border-color: rgba(232, 201, 138, .5);\n}\n\n.oc-roundbtn .oc-icon {\n  width: 15px;\n  height: 15px;\n}\n\n/* ---------------- 角色状态卡 ---------------- */\n\n.oc-statuscard {\n  position: absolute;\n  left: 16px;\n  bottom: calc(env(safe-area-inset-bottom, 0px) + 92px);\n  width: 214px;\n  padding: 11px 13px 12px;\n  z-index: 6;\n  border-radius: 15px;\n}\n\n.oc-statuscard__head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n\n.oc-statuscard__title {\n  font-size: 10.5px;\n  letter-spacing: .16em;\n  color: var(--oc-text-2);\n}\n\n.oc-statuscard__fold {\n  font-family: var(--oc-sans);\n  font-size: 9px;\n  color: var(--oc-gold);\n  opacity: .8;\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0;\n}\n\n.oc-meter {\n  display: flex;\n  align-items: baseline;\n  gap: 4px;\n  font-family: var(--oc-sans);\n  font-size: 9.5px;\n  color: var(--oc-text-3);\n  margin-bottom: 5px;\n}\n\n.oc-meter__label {\n  color: var(--oc-text-2);\n}\n\n.oc-meter__value {\n  margin-left: auto;\n  color: var(--oc-gold);\n  font-variant-numeric: tabular-nums;\n}\n\n.oc-bar {\n  height: 3px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, .1);\n  overflow: hidden;\n  margin-bottom: 9px;\n}\n\n.oc-bar__fill {\n  height: 100%;\n  border-radius: 999px;\n  background: linear-gradient(90deg, rgba(232, 201, 138, .55), rgba(232, 201, 138, .95));\n  transition: width .4s ease;\n}\n\n.oc-minirow {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 10px;\n  color: var(--oc-text-3);\n  padding: 2.5px 0;\n}\n\n.oc-minirow .oc-icon {\n  width: 11px;\n  height: 11px;\n  color: var(--oc-gold);\n  opacity: .7;\n}\n\n.oc-minirow b {\n  color: var(--oc-text);\n  font-weight: 500;\n  font-family: var(--oc-sans);\n  font-size: 11px;\n}\n\n.oc-statuscard.is-folded .oc-meter,\n.oc-statuscard.is-folded .oc-bar,\n.oc-statuscard.is-folded .oc-minirow {\n  display: none;\n}\n\n.oc-minirow--link {\n  margin-top: 4px;\n  padding-top: 6px;\n  border-top: 1px solid rgba(255, 255, 255, .06);\n  color: var(--oc-gold);\n  opacity: .8;\n  cursor: pointer;\n}\n\n.oc-mark {\n  position: absolute;\n  left: 18px;\n  bottom: calc(env(safe-area-inset-bottom, 0px) + 8px);\n  font-family: var(--oc-sans);\n  font-size: 7.5px;\n  letter-spacing: .26em;\n  color: rgba(243, 239, 231, .2);\n  z-index: 4;\n  pointer-events: none;\n}\n\n/* ---------------- 气泡 ---------------- */\n\n.oc-bubble {\n  position: absolute;\n  left: 50%;\n  bottom: 31%;\n  max-width: 76%;\n  padding: 11px 15px;\n  border-radius: 15px;\n  border: 1px solid var(--oc-line);\n  background: rgba(8, 11, 17, .84);\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n  font-size: 13px;\n  line-height: 1.75;\n  letter-spacing: .02em;\n  color: var(--oc-text);\n  box-shadow: 0 14px 34px rgba(0, 0, 0, .5);\n  transform: translate(-50%, 8px);\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity .22s ease, transform .22s ease;\n  z-index: 9;\n  text-align: left;\n}\n\n.oc-bubble.is-on {\n  opacity: 1;\n  transform: translate(-50%, 0);\n}\n\n.oc-bubble::after {\n  content: "";\n  position: absolute;\n  left: 50%;\n  bottom: -5px;\n  width: 8px;\n  height: 8px;\n  margin-left: -4px;\n  transform: rotate(45deg);\n  background: rgba(8, 11, 17, .84);\n  border-right: 1px solid var(--oc-line);\n  border-bottom: 1px solid var(--oc-line);\n}\n\n/* ---------------- 内容卡片 ---------------- */\n\n.oc-card {\n  position: relative;\n  border-radius: 14px;\n  border: 1px solid var(--oc-line-soft);\n  background: rgba(255, 255, 255, .03);\n  overflow: hidden;\n  cursor: pointer;\n  transition: border-color .2s ease, transform .2s ease;\n}\n\n.oc-card:active {\n  transform: scale(.985);\n}\n\n.oc-card.is-active {\n  border-color: rgba(232, 201, 138, .6);\n  box-shadow: 0 0 0 1px rgba(232, 201, 138, .18), 0 10px 26px rgba(0, 0, 0, .45);\n}\n\n.oc-card__media {\n  position: relative;\n  aspect-ratio: 3 / 4;\n  background: linear-gradient(160deg, #1a2130, #0a0d13);\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n}\n\n.oc-card__media img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center top;\n}\n\n.oc-card__ph {\n  font-size: 10px;\n  color: var(--oc-text-3);\n  letter-spacing: .14em;\n}\n\n.oc-card__name {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  padding: 18px 9px 7px;\n  font-size: 11px;\n  letter-spacing: .08em;\n  background: linear-gradient(180deg, transparent, rgba(5, 7, 11, .9));\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.oc-card__check {\n  position: absolute;\n  top: 7px;\n  right: 7px;\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  background: rgba(232, 201, 138, .92);\n  color: #1d1608;\n  display: grid;\n  place-items: center;\n}\n\n.oc-card__check .oc-icon {\n  width: 11px;\n  height: 11px;\n}\n\n.oc-cards {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 10px;\n}\n\n.oc-cards--three {\n  grid-template-columns: repeat(3, 1fr);\n}\n\n.oc-scenerow {\n  display: flex;\n  gap: 10px;\n  overflow-x: auto;\n  padding: 2px 2px 10px;\n  scroll-snap-type: x mandatory;\n}\n\n.oc-scenerow::-webkit-scrollbar {\n  display: none;\n}\n\n.oc-scenecard {\n  flex: 0 0 62%;\n  scroll-snap-align: center;\n  border-radius: 16px;\n  overflow: hidden;\n  border: 1px solid var(--oc-line-soft);\n  background: rgba(255, 255, 255, .03);\n  position: relative;\n}\n\n.oc-scenecard.is-active {\n  border-color: rgba(232, 201, 138, .6);\n  box-shadow: 0 0 26px rgba(232, 201, 138, .14);\n}\n\n.oc-scenecard__media {\n  aspect-ratio: 16 / 10;\n  display: grid;\n  place-items: center;\n  background-size: cover;\n  background-position: center;\n}\n\n.oc-scenecard__meta {\n  padding: 9px 12px 11px;\n  display: flex;\n  align-items: baseline;\n  gap: 8px;\n}\n\n.oc-scenecard__name {\n  font-size: 12px;\n  letter-spacing: .1em;\n}\n\n.oc-scenecard__weather {\n  font-family: var(--oc-sans);\n  font-size: 9px;\n  color: var(--oc-text-3);\n  margin-left: auto;\n}\n\n/* ---------------- 专注页 ---------------- */\n\n.oc-focusview {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 8px 0 20px;\n}\n\n.oc-bigring {\n  width: min(56vw, 214px);\n  aspect-ratio: 1;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  position: relative;\n  margin: 10px auto 16px;\n  background: conic-gradient(rgba(232, 201, 138, .92) calc(var(--oc-progress, 0) * 360deg), rgba(255, 255, 255, .07) 0);\n}\n\n.oc-bigring::after {\n  content: "";\n  position: absolute;\n  inset: 6px;\n  border-radius: 50%;\n  background: radial-gradient(circle at 50% 30%, #141a25, #080b11 70%);\n  border: 1px solid rgba(255, 255, 255, .05);\n}\n\n.oc-bigring__inner {\n  position: relative;\n  z-index: 2;\n  text-align: center;\n}\n\n.oc-bigring__round {\n  font-family: var(--oc-sans);\n  font-size: 9.5px;\n  letter-spacing: .22em;\n  color: var(--oc-gold);\n  opacity: .85;\n}\n\n.oc-bigring__time {\n  font-family: var(--oc-sans);\n  font-size: 40px;\n  line-height: 1.15;\n  font-variant-numeric: tabular-nums;\n  letter-spacing: .01em;\n  margin: 4px 0 2px;\n}\n\n.oc-bigring__task {\n  font-size: 10.5px;\n  color: var(--oc-text-3);\n  max-width: 150px;\n  margin: 0 auto;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.oc-focusview__actions {\n  display: flex;\n  gap: 10px;\n  margin-top: 4px;\n}\n\n/* ---------------- 侧栏时间轴 / 回忆 ---------------- */\n\n.oc-timeline {\n  position: relative;\n  padding-left: 14px;\n  border-left: 1px solid rgba(232, 201, 138, .14);\n  margin-left: 3px;\n}\n\n.oc-logitem {\n  position: relative;\n  padding: 8px 0 10px;\n}\n\n.oc-logitem::before {\n  content: "";\n  position: absolute;\n  left: -18px;\n  top: 13px;\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: rgba(232, 201, 138, .6);\n  box-shadow: 0 0 8px rgba(232, 201, 138, .5);\n}\n\n.oc-logitem__meta {\n  display: flex;\n  align-items: baseline;\n  gap: 7px;\n  font-family: var(--oc-sans);\n  font-size: 9px;\n  color: var(--oc-text-3);\n  letter-spacing: .1em;\n}\n\n.oc-logitem__text {\n  font-size: 12px;\n  line-height: 1.7;\n  margin-top: 3px;\n  color: var(--oc-text-2);\n}\n\n.oc-daylabel {\n  font-family: var(--oc-sans);\n  font-size: 9.5px;\n  letter-spacing: .2em;\n  color: var(--oc-gold);\n  opacity: .7;\n  margin: 16px 0 8px;\n}\n\n.oc-memocard {\n  border-radius: 14px;\n  border: 1px solid var(--oc-line-soft);\n  overflow: hidden;\n  background: rgba(255, 255, 255, .03);\n  cursor: pointer;\n}\n\n.oc-memocard__media {\n  aspect-ratio: 4 / 3;\n  background-size: cover;\n  background-position: center;\n  display: grid;\n  place-items: center;\n  font-size: 9px;\n  color: rgba(243, 239, 231, .28);\n  letter-spacing: .16em;\n}\n\n.oc-memocard__body {\n  padding: 9px 10px 10px;\n}\n\n.oc-memocard__title {\n  font-size: 11.5px;\n  letter-spacing: .06em;\n}\n\n.oc-memocard__text {\n  font-size: 10px;\n  color: var(--oc-text-3);\n  margin-top: 3px;\n  line-height: 1.6;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n.oc-memocard__day {\n  font-family: var(--oc-sans);\n  font-size: 8.5px;\n  color: var(--oc-gold);\n  opacity: .6;\n  margin-top: 5px;\n  letter-spacing: .14em;\n}\n\n/* ---------------- 通讯 ---------------- */\n\n.oc-chat {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n\n.oc-chat__list {\n  flex: 1;\n  overflow-y: auto;\n  padding: 6px 2px 10px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.oc-msg {\n  max-width: 82%;\n  padding: 9px 13px;\n  border-radius: 14px;\n  font-size: 12.5px;\n  line-height: 1.75;\n  word-break: break-word;\n  white-space: pre-wrap;\n}\n\n.oc-msg--char {\n  align-self: flex-start;\n  border: 1px solid var(--oc-line);\n  background: linear-gradient(150deg, rgba(30, 37, 52, .8), rgba(12, 16, 24, .86));\n  border-bottom-left-radius: 5px;\n}\n\n.oc-msg--user {\n  align-self: flex-end;\n  border: 1px solid rgba(255, 255, 255, .1);\n  background: rgba(243, 239, 231, .1);\n  border-bottom-right-radius: 5px;\n  color: var(--oc-text);\n}\n\n.oc-msg--sys {\n  align-self: center;\n  font-size: 9.5px;\n  letter-spacing: .12em;\n  color: var(--oc-text-3);\n  background: none;\n  border: none;\n  padding: 2px;\n}\n\n.oc-chat__input {\n  flex: 0 0 auto;\n  display: flex;\n  gap: 8px;\n  align-items: flex-end;\n  padding: 8px 0 2px;\n  border-top: 1px solid rgba(255, 255, 255, .06);\n}\n\n.oc-chat__input .oc-input {\n  flex: 1;\n  max-height: 84px;\n  resize: none;\n}\n\n.oc-send {\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  border: 1px solid rgba(232, 201, 138, .4);\n  background: rgba(232, 201, 138, .16);\n  color: var(--oc-gold);\n  display: grid;\n  place-items: center;\n  cursor: pointer;\n  flex: 0 0 auto;\n}\n\n.oc-send .oc-icon {\n  width: 15px;\n  height: 15px;\n}\n\n.oc-typing {\n  align-self: flex-start;\n  display: flex;\n  gap: 3px;\n  padding: 10px 13px;\n}\n\n.oc-typing i {\n  width: 4px;\n  height: 4px;\n  border-radius: 50%;\n  background: var(--oc-text-3);\n  animation: oc-dot 1s infinite ease-in-out;\n}\n\n.oc-typing i:nth-child(2) {\n  animation-delay: .15s;\n}\n\n.oc-typing i:nth-child(3) {\n  animation-delay: .3s;\n}\n\n@keyframes oc-dot {\n  0%, 100% {\n    opacity: .25;\n    transform: translateY(0);\n  }\n\n  50% {\n    opacity: .9;\n    transform: translateY(-2px);\n  }\n}\n\n/* ---------------- 道具 ---------------- */\n\n.oc-prop {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  padding: 10px 2px;\n  border-bottom: 1px solid rgba(255, 255, 255, .05);\n}\n\n.oc-prop:last-child {\n  border-bottom: none;\n}\n\n.oc-prop__icon {\n  width: 40px;\n  height: 40px;\n  border-radius: 11px;\n  flex: 0 0 auto;\n  display: grid;\n  place-items: center;\n  border: 1px solid var(--oc-line-soft);\n  background: rgba(255, 255, 255, .04);\n  overflow: hidden;\n  color: var(--oc-gold);\n}\n\n.oc-prop__icon img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.oc-prop__main {\n  flex: 1;\n  min-width: 0;\n}\n\n.oc-prop__name {\n  font-size: 12px;\n}\n\n.oc-prop__sub {\n  font-size: 10px;\n  color: var(--oc-text-3);\n  margin-top: 2px;\n}\n\n.oc-prop__given {\n  font-family: var(--oc-sans);\n  font-size: 9px;\n  color: var(--oc-gold);\n  opacity: .7;\n}\n\n/* 首次引导 */\n\n.oc-guide {\n  position: absolute;\n  left: 50%;\n  bottom: calc(env(safe-area-inset-bottom, 0px) + 86px);\n  transform: translateX(-50%);\n  width: min(84%, 320px);\n  padding: 14px 16px;\n  z-index: 10;\n  border-radius: 16px;\n}\n\n.oc-guide__title {\n  font-size: 13px;\n  letter-spacing: .1em;\n  margin-bottom: 4px;\n}\n\n.oc-guide__desc {\n  font-size: 10.5px;\n  color: var(--oc-text-3);\n  line-height: 1.7;\n  margin-bottom: 10px;\n}\n\n.oc-guide__actions {\n  display: flex;\n  gap: 8px;\n}\n\n@media (min-width: 720px) and (orientation: landscape) {\n  .oc-char {\n    right: 34%;\n  }\n\n  .oc-poem {\n    right: auto;\n    left: 46%;\n    top: 22%;\n  }\n\n  .oc-side {\n    right: auto;\n    left: 46%;\n    top: 56%;\n  }\n\n  .oc-focuscard {\n    width: 186px;\n  }\n\n  .oc-statuscard {\n    width: 232px;\n  }\n\n  .oc-mark {\n    left: 22px;\n  }\n}\n';

  // src/services/host.js
  function isFn(obj, name) {
    return !!obj && typeof obj[name] === "function";
  }
  function clone(value) {
    if (value === void 0) return void 0;
    try {
      return JSON.parse(JSON.stringify(value));
    } catch (e) {
      return value;
    }
  }
  function createHost(roche) {
    var api = roche || {};
    var memory = {};
    var storageUsable = isFn(api.storage, "get") && isFn(api.storage, "set");
    var caps = {
      storage: storageUsable,
      storageDelete: isFn(api.storage, "delete"),
      ui: !!api.ui,
      uiToast: isFn(api.ui, "toast"),
      uiConfirm: isFn(api.ui, "confirm"),
      uiClose: isFn(api.ui, "closeApp"),
      character: isFn(api.character, "list"),
      persona: isFn(api.persona, "getActiveUserPersona"),
      personaForConversation: isFn(api.persona, "getUserPersonaForConversation"),
      conversation: isFn(api.conversation, "list"),
      memory: isFn(api.memory, "getLongTerm"),
      memoryShort: isFn(api.memory, "getShortTerm"),
      worldbook: isFn(api.worldbook, "list"),
      ai: isFn(api.ai, "chat")
    };
    async function safe(label, fn, fallback) {
      try {
        return await fn();
      } catch (e) {
        if (window.console && console.warn) console.warn("[otome-companion] " + label + " 失败:", e && e.message);
        return fallback;
      }
    }
    var storage = {
      async get(key) {
        if (!storageUsable) return clone(memory[key]);
        var v = await safe("storage.get " + key, function() {
          return api.storage.get(key);
        }, void 0);
        return v === void 0 ? clone(memory[key]) : v;
      },
      async set(key, value) {
        memory[key] = clone(value);
        if (!storageUsable) return false;
        var ok = await safe("storage.set " + key, function() {
          return api.storage.set(key, clone(value));
        }, false);
        return ok !== false;
      },
      async remove(key) {
        delete memory[key];
        if (!caps.storageDelete) return true;
        await safe("storage.delete " + key, function() {
          return api.storage.delete(key);
        }, null);
        return true;
      }
    };
    var ui = {
      toast(message) {
        if (caps.uiToast) {
          safe("ui.toast", function() {
            return api.ui.toast(message);
          });
          return;
        }
        if (window.console) console.info("[toast]", message);
      },
      async confirm(opts) {
        if (caps.uiConfirm) {
          var r = await safe("ui.confirm", function() {
            return api.ui.confirm(opts);
          }, null);
          if (typeof r === "boolean") return r;
        }
        return window.confirm((opts && opts.title ? opts.title + "\n\n" : "") + (opts && opts.message ? opts.message : ""));
      },
      closeApp() {
        if (caps.uiClose) safe("ui.closeApp", function() {
          return api.ui.closeApp();
        });
      }
    };
    var character = {
      async list() {
        if (!caps.character) return [];
        var r = await safe("character.list", function() {
          return api.character.list();
        }, []);
        return Array.isArray(r) ? r : [];
      },
      async get(id) {
        if (!isFn(api.character, "get") || !id) return null;
        return await safe("character.get", function() {
          return api.character.get(id);
        }, null);
      }
    };
    var persona = {
      async active() {
        if (!caps.persona) return null;
        return await safe("persona.getActiveUserPersona", function() {
          return api.persona.getActiveUserPersona();
        }, null);
      },
      async forConversation(conversationId) {
        if (!conversationId) return persona.active();
        if (caps.personaForConversation) {
          var p = await safe("persona.getUserPersonaForConversation", function() {
            return api.persona.getUserPersonaForConversation(conversationId);
          }, null);
          if (p) return p;
        }
        return persona.active();
      }
    };
    var memoryApi = {
      async shortTerm(conversationId, limit) {
        if (!caps.memoryShort) return [];
        var r = await safe("memory.getShortTerm", function() {
          return api.memory.getShortTerm({ conversationId, limit: limit || 8 });
        }, []);
        return Array.isArray(r) ? r : [];
      },
      async longTerm(conversationId) {
        if (!caps.memory) return null;
        return await safe("memory.getLongTerm", function() {
          return api.memory.getLongTerm({ conversationId });
        }, null);
      }
    };
    var ai = {
      /** 统一返回 { ok, text } / { ok:false, reason }，业务层不再 try/catch */
      async chat(opts) {
        if (!caps.ai) return { ok: false, reason: "no_api" };
        try {
          var r = await api.ai.chat(opts);
          var text2 = r && (r.text || r.content || r.message);
          if (!text2) return { ok: false, reason: "empty" };
          return {
            ok: true,
            text: String(text2),
            model: String(r && (r.model || r.modelName) || "")
          };
        } catch (e) {
          if (window.console && console.warn) console.warn("[otome-companion] ai.chat 失败:", e && e.message);
          return { ok: false, reason: "error", error: e };
        }
      }
    };
    return {
      caps,
      raw: api,
      storage,
      ui,
      character,
      persona,
      ai,
      memory: memoryApi
    };
  }

  // src/core/format.js
  function clamp(n, min, max) {
    var v = Number(n);
    if (!isFinite(v)) return min;
    if (v < min) return min;
    if (v > max) return max;
    return v;
  }
  function pad2(n) {
    return n < 10 ? "0" + n : String(n);
  }
  function dayKey(ts) {
    var d = new Date(Number(ts) || 0);
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  }
  function fmtDuration(ms) {
    var total = Math.max(0, Math.floor(Number(ms) / 6e4));
    var h2 = Math.floor(total / 60);
    var m = total % 60;
    if (h2 > 0) return pad2(h2) + "h " + pad2(m) + "m";
    return m + "m";
  }
  function fmtDurationLong(ms) {
    var total = Math.max(0, Math.floor(Number(ms) / 6e4));
    return pad2(Math.floor(total / 60)) + "h " + pad2(total % 60) + "m";
  }
  function fmtClock(ms) {
    var total = Math.max(0, Math.ceil(Number(ms) / 1e3));
    var m = Math.floor(total / 60);
    var s = total % 60;
    return pad2(m) + ":" + pad2(s);
  }
  function fmtClockLong(ms) {
    var total = Math.max(0, Math.round(Number(ms) / 1e3));
    var m = Math.floor(total / 60);
    var s = total % 60;
    return pad2(m) + ":" + pad2(s);
  }
  function fmtDateTime(ts) {
    var d = new Date(Number(ts) || 0);
    return d.getMonth() + 1 + "-" + pad2(d.getDate()) + " " + pad2(d.getHours()) + ":" + pad2(d.getMinutes());
  }
  function fmtTime(ts) {
    var d = new Date(Number(ts) || 0);
    return pad2(d.getHours()) + ":" + pad2(d.getMinutes());
  }
  function dayLabel(key, todayKey) {
    if (key === todayKey) return "今天";
    var d = /* @__PURE__ */ new Date(todayKey + "T00:00:00");
    d.setDate(d.getDate() - 1);
    var y = d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
    if (key === y) return "昨天";
    return key.slice(5);
  }

  // src/core/assets.js
  var SLOTS = ["portrait", "scene", "prop", "outfit"];
  var MAX_ASSETS = 40;
  var MAX_DATAURL_BYTES = 1.5 * 1024 * 1024;
  var DEFAULT_SCENES = [
    { id: "sc_night", name: "夜色书房", ref: "", tint: "#0A0D13", light: "#E8C98A", weather: "夜" },
    { id: "sc_dawn", name: "晨雾窗边", ref: "", tint: "#131A24", light: "#A9C4E8", weather: "雾" }
  ];
  function isHttp(value) {
    return /^https?:\/\/[^\s]+$/i.test(value);
  }
  function isDataUrl(value) {
    return /^data:image\//i.test(String(value || ""));
  }
  function makeAssetId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }
  function normalizeAssetRef(raw) {
    var src = String(raw === void 0 || raw === null ? "" : raw).trim();
    if (!src) return "";
    if (/^builtin:[a-z0-9_-]{1,40}$/i.test(src)) return src;
    if (/^local:[a-z0-9]{4,40}$/i.test(src)) return src;
    if (/^url:https?:\/\//i.test(src)) {
      return isHttp(src.slice(4)) ? src : "";
    }
    if (isHttp(src)) return "url:" + src;
    return "";
  }
  function refKind(ref) {
    var s = String(ref || "");
    var i = s.indexOf(":");
    if (i <= 0) return "";
    var kind = s.slice(0, i);
    return ["builtin", "url", "local"].indexOf(kind) !== -1 ? kind : "";
  }
  function refId(ref) {
    var s = String(ref || "");
    var i = s.indexOf(":");
    return i > 0 ? s.slice(i + 1) : "";
  }
  function refLabel(ref, fallback) {
    var kind = refKind(ref);
    if (!kind) return fallback || "未设置";
    var id = refId(ref);
    if (kind === "url") {
      var clean = id.split("?")[0].split("#")[0];
      var name = clean.slice(clean.lastIndexOf("/") + 1);
      return name ? decodeURIComponent(name).slice(0, 24) : "外链图片";
    }
    return id.slice(0, 20);
  }
  function normalizeIndexRecord(raw, key) {
    var src = raw && typeof raw === "object" ? raw : {};
    var id = String(src.id || key || "");
    if (!/^[a-z0-9]{4,40}$/i.test(id)) return null;
    return {
      id,
      name: String(src.name || "").trim().slice(0, 14) || "图片",
      slot: SLOTS.indexOf(src.slot) !== -1 ? src.slot : "portrait",
      w: Math.max(0, Math.round(Number(src.w) || 0)),
      h: Math.max(0, Math.round(Number(src.h) || 0)),
      at: Number(src.at) || 0
    };
  }
  function normalizeAssetIndex(raw) {
    var src = raw && typeof raw === "object" ? raw : {};
    var list = [];
    Object.keys(src).forEach(function(key) {
      var rec = normalizeIndexRecord(src[key], key);
      if (rec) list.push(rec);
    });
    list.sort(function(a, b) {
      return b.at - a.at;
    });
    var out = {};
    list.slice(0, MAX_ASSETS).forEach(function(rec) {
      out[rec.id] = rec;
    });
    return out;
  }
  function assetById(assets, id) {
    return assets && Object.prototype.hasOwnProperty.call(assets, id) ? assets[id] : null;
  }
  function resolveAssetSrc(ref, deps) {
    var kind = refKind(ref);
    if (!kind) return "";
    var id = refId(ref);
    var d = deps || {};
    if (kind === "url") return isHttp(id) ? id : "";
    if (kind === "local") {
      var rec = assetById(d.assets, id);
      if (typeof rec === "string") return isDataUrl(rec) ? rec : "";
      return rec && rec.dataUrl ? rec.dataUrl : "";
    }
    var builtin = d.builtin || {};
    return isHttp(builtin[id]) ? builtin[id] : "";
  }

  // src/services/store.js
  var KEYS = {
    settings: "oc:settings",
    vitals: "oc:vitals",
    session: "oc:session",
    wardrobe: "oc:wardrobe",
    scenes: "oc:scenes",
    props: "oc:props",
    logs: "oc:logs",
    memories: "oc:memories",
    zones: "oc:zones",
    chat: "oc:chat",
    meta: "oc:meta",
    assetIndex: "oc:assetIndex"
  };
  function assetKey(id) {
    return "oc:asset:" + id;
  }
  var DEBOUNCE_MS = 400;
  function createStore(host) {
    var pending = {};
    var timer = null;
    var writing = null;
    function flush() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      var batch = pending;
      pending = {};
      var keys = Object.keys(batch);
      if (!keys.length) return Promise.resolve();
      writing = Promise.all(keys.map(function(key) {
        return host.storage.set(key, batch[key]);
      }));
      return writing;
    }
    function schedule(key, value) {
      pending[key] = value;
      if (timer) clearTimeout(timer);
      timer = setTimeout(function() {
        timer = null;
        flush();
      }, DEBOUNCE_MS);
    }
    async function read(key, fallback) {
      var value = await host.storage.get(key);
      return value === void 0 || value === null ? fallback : value;
    }
    async function loadAll() {
      var keys = Object.keys(KEYS);
      var values = await Promise.all(keys.map(function(k) {
        return read(KEYS[k], null);
      }));
      var out = {};
      keys.forEach(function(k, i) {
        out[k] = values[i];
      });
      return out;
    }
    async function loadAssetData(ids) {
      var out = {};
      var list = (ids || []).filter(function(id) {
        return /^[a-z0-9]{4,40}$/i.test(String(id || ""));
      });
      await Promise.all(list.map(async function(id) {
        var value = await read(assetKey(id), "");
        if (typeof value === "string" && /^data:image\//i.test(value)) out[id] = value;
      }));
      return out;
    }
    async function putAsset(record) {
      if (!record || !record.id) return false;
      var ok = await host.storage.set(assetKey(record.id), record.dataUrl);
      return ok;
    }
    async function removeAsset(id) {
      return host.storage.remove(assetKey(id));
    }
    async function pruneAssets(index) {
      var ids = Object.keys(index || {});
      if (ids.length <= MAX_ASSETS) return;
      ids.slice(MAX_ASSETS).forEach(function(id) {
        removeAsset(id);
      });
    }
    function save(which, value) {
      var key = KEYS[which];
      if (!key) return;
      schedule(key, value);
    }
    async function exportAll() {
      await flush();
      var data = await loadAll();
      var index = data.assetIndex && typeof data.assetIndex === "object" ? data.assetIndex : {};
      var assets = await loadAssetData(Object.keys(index));
      return {
        kind: "otome-companion-export",
        version: 1,
        exportedAt: Date.now(),
        data,
        assets
      };
    }
    async function clearAll() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      pending = {};
      var keys = Object.keys(KEYS).map(function(k) {
        return KEYS[k];
      });
      var index = await read(KEYS.assetIndex, {});
      Object.keys(index || {}).forEach(function(id) {
        keys.push(assetKey(id));
      });
      await Promise.all(keys.map(function(key) {
        return host.storage.remove(key);
      }));
    }
    return {
      KEYS,
      loadAll,
      loadAssetData,
      putAsset,
      removeAsset,
      pruneAssets,
      save,
      flush,
      exportAll,
      clearAll
    };
  }

  // src/core/prompts.js
  var TONE_LABELS = {
    gentle: "温柔克制，话不多但很准",
    playful: "轻佻爱逗，句子短、爱用反问",
    cool: "冷静寡言，情绪靠细节透露"
  };
  var DEFAULT_SYSTEM = [
    "你正在扮演「{{char}}」，和「{{user}}」相处。",
    "语气：{{tone}}。",
    "此刻场景：{{scene}}；对方穿着：{{outfit}}。",
    "当前状态：陪伴能量 {{energy}}/{{energyMax}}，好感 {{affinity}}，已共同完成 {{rounds}} 轮专注。",
    "最近发生：{{recent}}",
    "",
    "回复要求：",
    "1. 只说 1–3 句，总字数不超过 60 字，不要旁白式解释，不要括号里写心理活动。",
    "2. 可以在回复末尾单独一行追加动作与表情指令，格式只能是：",
    "   [[oc:motion:wave]] 动作，可选 idle/wave/nod/shy/lean/turn",
    "   [[oc:expr:smile]] 表情，可选 calm/smile/shy/sad/surprise",
    "   [[oc:affinity:+1]] 好感变化，只能 +1 或 -1",
    "3. 指令必须单独一行、不要加反引号、不要解释指令本身；不需要时就不写。",
    "4. 不要提「指令」「提示词」「AI」这些词，也不要跳出角色。"
  ].join("\n");
  function fill(template, vars) {
    return String(template || "").replace(/\{\{(\w+)\}\}/g, function(whole, key) {
      return vars[key] === void 0 || vars[key] === null ? "" : String(vars[key]);
    });
  }
  function buildSystemPrompt(opts) {
    var o = opts || {};
    var recent = Array.isArray(o.recent) && o.recent.length ? o.recent.map(function(item) {
      return "· " + item;
    }).join("\n") : "· 还没有特别的记录";
    var base = o.template && String(o.template).trim() ? String(o.template) : DEFAULT_SYSTEM;
    return fill(base, {
      char: o.charName || "他",
      user: o.userName || "你",
      tone: TONE_LABELS[o.tone] || TONE_LABELS.gentle,
      scene: o.sceneName || "夜色书房",
      outfit: o.outfitName || "默认装扮",
      energy: Math.round(Number(o.energy) || 0),
      energyMax: Math.round(Number(o.energyMax) || 100),
      affinity: Math.round(Number(o.affinity) || 0),
      rounds: Math.round(Number(o.rounds) || 0),
      recent
    });
  }
  function buildTouchPrompt(zone, base) {
    var parts = [];
    if (base) parts.push(base);
    if (zone && zone.prompt) parts.push("部位「" + zone.name + "」的设定：" + zone.prompt);
    parts.push("对方刚碰了你的" + (zone && zone.name || "身体") + "，用一句话回应，不要超过 30 字。");
    return parts.join("\n");
  }
  var FALLBACK_LINES = {
    tap: ["……嗯？", "怎么了。", "（看了你一眼）"],
    chat_empty: ["……你想说什么。", "我听着。"],
    ai_off: ["（没有说话，只是把视线移开）"],
    focus_done: ["这一轮结束了。休息一下。", "辛苦了。剩下的待会儿再说。"],
    gift: ["……谢谢。", "收下了。"]
  };
  function pickFallback(kind, random) {
    var list = FALLBACK_LINES[kind] || FALLBACK_LINES.tap;
    var r = typeof random === "number" ? random : 0.5;
    return list[Math.floor(Math.max(0, Math.min(0.999999, r)) * list.length)];
  }

  // src/core/commands.js
  var MARK_TYPES = ["motion", "expr", "affinity", "energy"];
  var MOTIONS = ["idle", "wave", "nod", "shy", "lean", "turn"];
  var EXPRS = ["calm", "smile", "shy", "sad", "surprise"];
  var MAX_COMMANDS = 6;
  var PATTERN = /\[\[\s*oc\s*:\s*([a-z_]+)\s*(?::\s*([^\]\n]{0,32}))?\s*\]\]/gi;
  function clampNumArg(arg, max) {
    var n = Number(String(arg).replace(/^\+/, ""));
    if (!isFinite(n) || n === 0) return 0;
    var v = Math.max(-max, Math.min(max, Math.round(n)));
    return v;
  }
  function validArg(type, arg) {
    var a = String(arg || "").trim().toLowerCase();
    if (type === "motion") return MOTIONS.indexOf(a) !== -1 ? a : "";
    if (type === "expr") return EXPRS.indexOf(a) !== -1 ? a : "";
    if (type === "affinity") {
      var v = clampNumArg(a, 2);
      return v ? v > 0 ? "+" + v : String(v) : "";
    }
    if (type === "energy") {
      var e = clampNumArg(a, 3);
      return e ? e > 0 ? "+" + e : String(e) : "";
    }
    return "";
  }
  function parseCommands(input) {
    var src = String(input === void 0 || input === null ? "" : input);
    var commands = [];
    var seen = {};
    var text2 = src.replace(PATTERN, function(whole, type, arg) {
      var t = String(type || "").toLowerCase();
      if (MARK_TYPES.indexOf(t) === -1) return "";
      var a = validArg(t, arg);
      if (!a) return "";
      if (seen[t]) return "";
      seen[t] = true;
      if (commands.length >= MAX_COMMANDS) return "";
      commands.push({ type: t, arg: a });
      return "";
    });
    text2 = text2.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    return { text: text2, commands };
  }
  function numericDelta(commands) {
    var out = { affinity: 0, energy: 0 };
    (commands || []).forEach(function(c) {
      if (c.type === "affinity") out.affinity += Number(c.arg) || 0;
      if (c.type === "energy") out.energy += Number(c.arg) || 0;
    });
    out.affinity = Math.max(-2, Math.min(2, out.affinity));
    out.energy = Math.max(-3, Math.min(3, out.energy));
    return out;
  }
  function firstOf(commands, type) {
    for (var i = 0; i < (commands || []).length; i++) {
      if (commands[i].type === type) return commands[i].arg;
    }
    return "";
  }

  // src/services/dialogue.js
  var TIMEOUT_MS = 25e3;
  var HISTORY_LIMIT = 8;
  function withTimeout(promise, ms) {
    return new Promise(function(resolve) {
      var done = false;
      var timer = setTimeout(function() {
        if (done) return;
        done = true;
        resolve({ ok: false, reason: "timeout" });
      }, ms);
      promise.then(function(value) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve(value);
      }, function(err) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve({ ok: false, reason: "error", error: err });
      });
    });
  }
  function cleanupText(text2, limit) {
    var out = String(text2 || "").replace(/```[\s\S]*?```/g, "").replace(/\r\n/g, "\n").trim();
    out = out.replace(/^[^\n：:]{1,12}[：:]\s*/, "");
    out = out.replace(/\n{3,}/g, "\n\n");
    var max = limit || 160;
    if (out.length > max) out = out.slice(0, max).trim();
    return out;
  }
  function toMessages(history, system, userText) {
    var msgs = [{ role: "system", content: system }];
    var list = Array.isArray(history) ? history.slice(-HISTORY_LIMIT) : [];
    list.forEach(function(m) {
      if (!m || !m.text) return;
      var role = m.role === "user" ? "user" : "assistant";
      msgs.push({ role, content: String(m.text).slice(0, 400) });
    });
    msgs.push({ role: "user", content: userText });
    return msgs;
  }
  function createDialogue(deps) {
    var host = deps.host;
    var getContext = deps.getContext;
    async function call(messages, temperature) {
      return withTimeout(host.ai.chat({
        messages,
        temperature
      }), TIMEOUT_MS);
    }
    function systemOf(extra) {
      var ctx = getContext() || {};
      return buildSystemPrompt({
        charName: ctx.charName,
        userName: ctx.userName,
        tone: ctx.tone,
        sceneName: ctx.sceneName,
        outfitName: ctx.outfitName,
        energy: ctx.energy,
        energyMax: ctx.energyMax,
        affinity: ctx.affinity,
        rounds: ctx.rounds,
        recent: ctx.recent
      }) + (extra ? "\n" + extra : "");
    }
    async function chat(userText, history) {
      if (!host.caps.ai) return { ok: false, text: "", commands: [], reason: "no_api" };
      var result = await call(toMessages(history, systemOf(""), String(userText).slice(0, 300)), 0.9);
      if (!result.ok) return { ok: false, text: "", commands: [], reason: result.reason };
      var parsed = parseCommands(cleanupText(result.text, 160));
      if (!parsed.text) return { ok: false, text: "", commands: [], reason: "empty" };
      return { ok: true, text: parsed.text, commands: parsed.commands, reason: "" };
    }
    async function react(zone, basePrompt) {
      if (!host.caps.ai) return { ok: false, text: "", commands: [], reason: "no_api" };
      var extra = buildTouchPrompt(zone, basePrompt || "");
      var result = await call([
        { role: "system", content: systemOf(extra) },
        { role: "user", content: "（对方碰了你的" + (zone && zone.name || "身体") + "）" }
      ], 1);
      if (!result.ok) return { ok: false, text: "", commands: [], reason: result.reason };
      var parsed = parseCommands(cleanupText(result.text, 60));
      if (!parsed.text) return { ok: false, text: "", commands: [], reason: "empty" };
      return { ok: true, text: parsed.text, commands: parsed.commands, reason: "" };
    }
    async function remark(kind) {
      if (!host.caps.ai) return { ok: false, text: "", commands: [], reason: "no_api" };
      var nudge = kind === "focus" ? "（一轮专注结束，说一句很短的话。不要超过 25 字。）" : "（对方送了礼物，说一句很短的话。不要超过 25 字。）";
      var result = await call([
        { role: "system", content: systemOf("") },
        { role: "user", content: nudge }
      ], 0.9);
      if (!result.ok) return { ok: false, text: "", commands: [], reason: result.reason };
      var parsed = parseCommands(cleanupText(result.text, 60));
      if (!parsed.text) return { ok: false, text: "", commands: [], reason: "empty" };
      return { ok: true, text: parsed.text, commands: parsed.commands, reason: "" };
    }
    return { chat, react, remark };
  }

  // src/services/image.js
  var MAX_SIDE = 1080;
  var MIN_SIDE = 480;
  var QUALITY = 0.9;
  function loadImage(file) {
    return new Promise(function(resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function() {
        resolve({ img, url });
      };
      img.onerror = function() {
        URL.revokeObjectURL(url);
        reject(new Error("图片解码失败"));
      };
      img.src = url;
    });
  }
  function drawToCanvas(img, maxSide) {
    var w = img.naturalWidth || img.width;
    var h2 = img.naturalHeight || img.height;
    var scale = Math.min(1, maxSide / Math.max(w, h2));
    var cw = Math.max(1, Math.round(w * scale));
    var ch = Math.max(1, Math.round(h2 * scale));
    var canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, cw, ch);
    return { canvas, w: cw, h: ch };
  }
  function hasAlpha(canvas) {
    try {
      var ctx = canvas.getContext("2d");
      var points = [
        [0, 0],
        [canvas.width - 1, 0],
        [0, canvas.height - 1],
        [canvas.width - 1, canvas.height - 1]
      ];
      for (var i = 0; i < points.length; i++) {
        var px = ctx.getImageData(points[i][0], points[i][1], 1, 1).data;
        if (px[3] < 250) return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }
  function encode(canvas, type, quality) {
    try {
      return canvas.toDataURL(type, quality);
    } catch (e) {
      return "";
    }
  }
  async function compressImage(file, opts) {
    var o = opts || {};
    var limit = o.limit || MAX_DATAURL_BYTES;
    var maxSide = o.maxSide || MAX_SIDE;
    var loaded = await loadImage(file);
    try {
      var result = null;
      while (maxSide >= MIN_SIDE) {
        var drawn = drawToCanvas(loaded.img, maxSide);
        var transparent = hasAlpha(drawn.canvas);
        var dataUrl = "";
        if (transparent) {
          dataUrl = encode(drawn.canvas, "image/webp", QUALITY);
          if (!/^data:image\/webp/i.test(dataUrl)) {
            dataUrl = encode(drawn.canvas, "image/png");
          }
        } else {
          dataUrl = encode(drawn.canvas, "image/webp", QUALITY);
          if (!dataUrl || dataUrl.length > limit) {
            var jpeg = encode(drawn.canvas, "image/jpeg", 0.82);
            if (jpeg && (!dataUrl || jpeg.length < dataUrl.length)) dataUrl = jpeg;
          }
        }
        if (dataUrl && /^data:image\//i.test(dataUrl) && dataUrl.length <= limit) {
          result = { dataUrl, w: drawn.w, h: drawn.h, bytes: dataUrl.length };
          break;
        }
        maxSide = Math.round(maxSide * 0.75);
      }
      if (!result) throw new Error("too_large");
      return result;
    } finally {
      URL.revokeObjectURL(loaded.url);
    }
  }

  // src/ui/dom.js
  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function(key) {
        var v = attrs[key];
        if (v === null || v === void 0 || v === false) return;
        if (key === "class") el.className = v;
        else if (key === "text") el.textContent = v;
        else if (key === "svg") el.innerHTML = v;
        else if (key === "dataset") {
          Object.keys(v).forEach(function(d) {
            el.dataset[d] = v[d];
          });
        } else if (key.slice(0, 2) === "on" && typeof v === "function") {
          el.addEventListener(key.slice(2).toLowerCase(), v);
        } else if (v === true) {
          el.setAttribute(key, "");
        } else {
          el.setAttribute(key, v);
        }
      });
    }
    append(el, children);
    return el;
  }
  function append(parent, children) {
    if (children === null || children === void 0 || children === false) return parent;
    if (Array.isArray(children)) {
      children.forEach(function(c) {
        append(parent, c);
      });
      return parent;
    }
    if (typeof children === "string" || typeof children === "number") {
      parent.appendChild(document.createTextNode(String(children)));
      return parent;
    }
    if (children.nodeType) parent.appendChild(children);
    return parent;
  }
  function clear(node) {
    while (node && node.firstChild) node.removeChild(node.firstChild);
    return node;
  }

  // src/core/motion.js
  var DEFAULTS = {
    breathPeriod: 3600,
    breathScaleY: 75e-4,
    breathShiftY: 1.5,
    swayPeriod: 9200,
    swayDeg: 0.5,
    lookMaxX: 4,
    lookMaxY: 2.5,
    lookTilt: 0.4,
    followTau: 0.25,
    tiltTau: 0.35,
    returnTau: 1.2,
    deadZone: 0.08,
    pressMs: 320,
    glowMs: 520,
    blinkCloseMs: 52,
    blinkHoldMs: 18,
    blinkOpenMs: 68,
    blinkMinGap: 3e3,
    blinkMaxGap: 7e3
  };
  function opt(opts, key) {
    var o = opts || {};
    return typeof o[key] === "number" ? o[key] : DEFAULTS[key];
  }
  function easeOutCubic(t) {
    var x = clamp(t, 0, 1);
    return 1 - Math.pow(1 - x, 3);
  }
  function easeOutBack(t) {
    var x = clamp(t, 0, 1);
    var c1 = 1.70158;
    var c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }
  function computeIdle(t, opts, scale) {
    var k = typeof scale === "number" ? scale : 1;
    var o = opts || {};
    if (o.breath === false) return { scaleY: 0, shiftY: 0, swayDeg: 0 };
    var breathPeriod = opt(o, "breathPeriod");
    var swayPeriod = opt(o, "swayPeriod");
    var phase = t % breathPeriod / breathPeriod * Math.PI * 2;
    var swayPhase = t % swayPeriod / swayPeriod * Math.PI * 2;
    return {
      scaleY: Math.sin(phase) * opt(o, "breathScaleY") * k,
      shiftY: Math.sin(phase - Math.PI / 2) * opt(o, "breathShiftY") * k,
      swayDeg: Math.sin(swayPhase) * opt(o, "swayDeg") * k
    };
  }
  function computeLookTarget(pointer, anchor, opts) {
    var a = anchor || { x: 0.5, y: 0.28 };
    if (!pointer || !isFinite(pointer.x) || !isFinite(pointer.y)) return { x: 0, y: 0 };
    var dead = opt(opts, "deadZone");
    var spanX = Math.max(0.08, a.x > 0.5 ? a.x : 1 - a.x);
    var spanY = Math.max(0.08, a.y > 0.5 ? a.y : 1 - a.y);
    var rawX = clamp((pointer.x - a.x) / spanX, -1, 1);
    var rawY = clamp((pointer.y - a.y) / spanY, -1, 1);
    function applyDead(v) {
      var s = v < 0 ? -1 : 1;
      var m = Math.abs(v);
      if (m <= dead) return 0;
      return s * ((m - dead) / (1 - dead));
    }
    return { x: applyDead(rawX), y: applyDead(rawY) };
  }
  function computeLookOffset(target, opts, scale) {
    var k = typeof scale === "number" ? scale : 1;
    var t = target || { x: 0, y: 0 };
    return {
      tx: t.x * opt(opts, "lookMaxX") * k,
      ty: t.y * opt(opts, "lookMaxY") * k,
      tilt: t.x * opt(opts, "lookTilt") * k
    };
  }
  function stepLook(current, target, dtSec, opts) {
    var cur = current || { tx: 0, ty: 0, tilt: 0 };
    var tgt = target || { tx: 0, ty: 0, tilt: 0 };
    var dt = Math.max(0, Math.min(0.1, Number(dtSec) || 0));
    if (!dt) return { tx: cur.tx, ty: cur.ty, tilt: cur.tilt };
    var idle = !tgt.tx && !tgt.ty;
    var tauPos = idle ? opt(opts, "returnTau") : opt(opts, "followTau");
    var tauTilt = idle ? opt(opts, "returnTau") : opt(opts, "tiltTau");
    var kp = 1 - Math.exp(-dt / tauPos);
    var kt = 1 - Math.exp(-dt / tauTilt);
    return {
      tx: cur.tx + (tgt.tx - cur.tx) * kp,
      ty: cur.ty + (tgt.ty - cur.ty) * kp,
      tilt: cur.tilt + (tgt.tilt - cur.tilt) * kt
    };
  }
  function computePress(elapsedMs, opts) {
    var o = opts || {};
    var pressMs = opt(o, "pressMs");
    var glowMs = opt(o, "glowMs");
    var e = Math.max(0, Number(elapsedMs) || 0);
    if (e > pressMs && e > glowMs) return { sx: 1, sy: 1, glow: 0 };
    var squash = Math.min(1, e / 70);
    var back = e <= 70 ? 0 : easeOutBack((e - 70) / Math.max(1, pressMs - 70));
    var amount = e <= 70 ? squash : 1 - back;
    amount = clamp(amount, 0, 1);
    return {
      sx: 1 + 0.03 * amount,
      sy: 1 - 0.03 * amount,
      glow: 1 - easeOutCubic(e / glowMs)
    };
  }
  function toTransform(frame) {
    if (!frame) return "translate3d(0,0,0)";
    return "translate3d(" + frame.x.toFixed(2) + "px," + frame.y.toFixed(2) + "px,0) rotate(" + frame.rot.toFixed(3) + "deg) scale(" + frame.sx.toFixed(4) + "," + frame.sy.toFixed(4) + ")";
  }

  // src/render/pseudo.js
  var EXPR_FILTER = {
    calm: "none",
    smile: "brightness(1.05) saturate(1.04)",
    shy: "brightness(1.03) saturate(1.08)",
    sad: "brightness(0.9) saturate(0.82)",
    surprise: "brightness(1.07) saturate(1.02)"
  };
  var MOTION_DURATION = { wave: 760, nod: 620, shy: 900, lean: 820, turn: 640 };
  function zeroTarget() {
    return { tx: 0, ty: 0, tilt: 0 };
  }
  function createPseudoRenderer(opts) {
    var options = opts || {};
    var mount2 = options.mount;
    var state = {
      neck: 0.38,
      motionScale: 1,
      breath: true,
      lookFollow: true,
      anchor: { x: 0.5, y: 0.28 },
      fit: "contain"
    };
    var root = h("div", { class: "oc-render" });
    var sceneLayer = h("div", { class: "oc-scene" });
    var sceneA = h("div", { class: "oc-scene__img is-on" });
    var sceneB = h("div", { class: "oc-scene__img" });
    var ambient = h("div", { class: "oc-scene__ambient" });
    sceneLayer.appendChild(sceneA);
    sceneLayer.appendChild(sceneB);
    sceneLayer.appendChild(ambient);
    var stageShade = h("div", { class: "oc-shade" });
    var charBox = h("div", { class: "oc-char" });
    var lookLayer = h("div", { class: "oc-char__look" });
    var breatheLayer = h("div", { class: "oc-char__breathe" });
    var lowerImg = h("img", { class: "oc-char__img oc-char__img--lower", alt: "", draggable: "false" });
    var upperWrap = h("div", { class: "oc-char__upper" });
    var upperImg = h("img", { class: "oc-char__img oc-char__img--upper", alt: "", draggable: "false" });
    var upperTint = h("div", { class: "oc-char__tint" });
    upperWrap.appendChild(upperImg);
    upperWrap.appendChild(upperTint);
    breatheLayer.appendChild(lowerImg);
    breatheLayer.appendChild(upperWrap);
    lookLayer.appendChild(breatheLayer);
    charBox.appendChild(lookLayer);
    var focalGlow = h("div", { class: "oc-char__glow" });
    var pressRing = h("div", { class: "oc-press-ring" });
    var emptyHint = h("div", { class: "oc-char__empty" });
    root.appendChild(sceneLayer);
    root.appendChild(stageShade);
    root.appendChild(ambient);
    root.appendChild(charBox);
    root.appendChild(focalGlow);
    root.appendChild(pressRing);
    root.appendChild(emptyHint);
    if (mount2) mount2.appendChild(root);
    var raf = 0;
    var lastAt = 0;
    var idleStart = 0;
    var look = zeroTarget();
    var pointer = null;
    var pressAt = -1e9;
    var motion = { type: "", startAt: 0, duration: 0 };
    var expression = "calm";
    var natW = 0;
    var natH = 0;
    var portraitSrc = "";
    var destroyed = false;
    var sceneToken = 0;
    var sceneFront = true;
    function nowMs() {
      return window.performance && performance.now ? performance.now() : Date.now();
    }
    function applyNeck() {
      var pct = Math.round(state.neck * 1e3) / 10;
      upperWrap.style.clipPath = "polygon(0 0, 100% 0, 100% " + pct + "%, 0 " + pct + "%)";
      upperWrap.style.webkitClipPath = upperWrap.style.clipPath;
    }
    function motionOffset(now) {
      if (!motion.type) return { dx: 0, dy: 0, drot: 0, scale: 1 };
      var t = (now - motion.startAt) / motion.duration;
      if (t >= 1) {
        motion = { type: "", startAt: 0, duration: 0 };
        return { dx: 0, dy: 0, drot: 0, scale: 1 };
      }
      var decay = 1 - t;
      var e = Math.sin(t * Math.PI);
      switch (motion.type) {
        case "wave":
          return { dx: Math.sin(t * Math.PI * 4) * 3 * decay, dy: -e * 1.5, drot: Math.sin(t * Math.PI * 4) * 0.6 * decay, scale: 1 };
        case "nod":
          return { dx: 0, dy: -e * 4, drot: 0, scale: 1 };
        case "shy":
          return { dx: 0, dy: e * 1.2, drot: -e * 0.5, scale: 1 - e * 0.012 };
        case "lean":
          return { dx: e * 2, dy: 0, drot: e * 1.1, scale: 1 };
        case "turn":
          return { dx: e * 2.4, dy: 0, drot: -e * 0.5, scale: 1 };
        default:
          return { dx: 0, dy: 0, drot: 0, scale: 1 };
      }
    }
    function frame(now) {
      var elapsed = idleStart ? now - idleStart : 0;
      var idle = computeIdle(elapsed, { breath: state.breath }, state.motionScale);
      var target = state.lookFollow ? computeLookOffset(
        computeLookTarget(pointer, state.anchor, { deadZone: DEFAULTS.deadZone }),
        { lookMaxX: DEFAULTS.lookMaxX * state.motionScale, lookMaxY: DEFAULTS.lookMaxY * state.motionScale, lookTilt: DEFAULTS.lookTilt * state.motionScale }
      ) : zeroTarget();
      var dt = lastAt ? (now - lastAt) / 1e3 : 0;
      look = stepLook(look, target, dt, {});
      var press2 = computePress(now - pressAt, {});
      var extra = motionOffset(now);
      var upper = {
        x: look.tx + extra.dx,
        y: idle.shiftY + extra.dy,
        rot: idle.swayDeg + look.tilt + extra.drot,
        sx: press2.sx * extra.scale,
        sy: (1 + idle.scaleY) * press2.sy * extra.scale
      };
      var lower = {
        x: (look.tx + extra.dx) * 0.35,
        y: idle.shiftY * 0.55 + extra.dy * 0.4,
        rot: extra.drot * 0.3,
        sx: 1,
        sy: 1
      };
      lookLayer.style.transform = "translate3d(" + (look.tx + extra.dx).toFixed(2) + "px," + (idle.shiftY + extra.dy).toFixed(2) + "px,0) rotate(" + (idle.swayDeg + look.tilt + extra.drot).toFixed(3) + "deg)";
      lowerImg.style.transform = "translate3d(" + lower.x.toFixed(2) + "px," + lower.y.toFixed(2) + "px,0)";
      upperImg.style.transform = toTransform(upper);
      upperImg.style.transformOrigin = "50% 100%";
      focalGlow.style.opacity = press2.glow > 0 ? String(press2.glow * 0.9) : "0";
      lastAt = now;
    }
    function loop() {
      if (destroyed) return;
      frame(nowMs());
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (raf || destroyed) return;
      lastAt = 0;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }
    function onVisibility() {
      if (document.visibilityState === "hidden") stop();
      else start();
    }
    document.addEventListener("visibilitychange", onVisibility);
    start();
    function setScene(scene, src) {
      var tint = scene && scene.tint || "#0A0D13";
      var light = scene && scene.light || "#E8C98A";
      root.style.setProperty("--oc-scene-tint", tint);
      root.style.setProperty("--oc-scene-light", light);
      ambient.style.background = "radial-gradient(120% 80% at 50% 18%, " + hexAlpha(light, 0.16) + ", transparent 62%)";
      if (!src) {
        sceneA.style.backgroundImage = "";
        sceneB.style.backgroundImage = "";
        root.classList.add("oc-render--no-scene");
        return;
      }
      root.classList.remove("oc-render--no-scene");
      var token = ++sceneToken;
      var img = new Image();
      img.onload = function() {
        if (destroyed || token !== sceneToken) return;
        var incoming = sceneFront ? sceneB : sceneA;
        var outgoing = sceneFront ? sceneA : sceneB;
        incoming.style.backgroundImage = 'url("' + src.replace(/"/g, "%22") + '")';
        incoming.classList.add("is-on");
        outgoing.classList.remove("is-on");
        sceneFront = !sceneFront;
      };
      img.onerror = function() {
        if (token !== sceneToken) return;
        sceneA.style.backgroundImage = "";
        root.classList.add("oc-render--no-scene");
      };
      img.src = src;
    }
    function hexAlpha(hex, alpha) {
      var h2 = String(hex || "").replace("#", "");
      if (h2.length !== 6) return "rgba(232,201,138," + alpha + ")";
      var r = parseInt(h2.slice(0, 2), 16);
      var g = parseInt(h2.slice(2, 4), 16);
      var b = parseInt(h2.slice(4, 6), 16);
      return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
    }
    function setPortrait(src) {
      portraitSrc = String(src || "");
      if (!portraitSrc) {
        lowerImg.removeAttribute("src");
        upperImg.removeAttribute("src");
        natW = 0;
        natH = 0;
        root.classList.add("oc-render--empty");
        emptyHint.textContent = "长按这里设置人物立绘";
        return;
      }
      root.classList.remove("oc-render--empty");
      emptyHint.textContent = "";
      var token = portraitSrc;
      var probe = new Image();
      probe.onload = function() {
        if (destroyed || token !== portraitSrc) return;
        natW = probe.naturalWidth || 0;
        natH = probe.naturalHeight || 0;
        root.style.setProperty("--oc-portrait-ratio", natW && natH ? String(natW / natH) : "0.62");
      };
      probe.src = portraitSrc;
      lowerImg.src = portraitSrc;
      upperImg.src = portraitSrc;
    }
    function setOptions(patch) {
      var p = patch || {};
      if (typeof p.neck === "number") state.neck = p.neck;
      if (typeof p.motionScale === "number") state.motionScale = p.motionScale;
      if (typeof p.breath === "boolean") state.breath = p.breath;
      if (typeof p.lookFollow === "boolean") state.lookFollow = p.lookFollow;
      if (p.anchor && isFinite(p.anchor.x) && isFinite(p.anchor.y)) state.anchor = { x: p.anchor.x, y: p.anchor.y };
      if (p.fit === "cover" || p.fit === "contain") state.fit = p.fit;
      root.setAttribute("data-fit", state.fit);
      applyNeck();
    }
    function setPointer(x, y) {
      if (typeof x !== "number" || typeof y !== "number") {
        pointer = null;
        return;
      }
      pointer = { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) };
    }
    function clearPointer() {
      pointer = null;
    }
    function setExpression(id) {
      var key = EXPR_FILTER[id] ? id : "calm";
      expression = key;
      lowerImg.style.filter = EXPR_FILTER[key];
      upperImg.style.filter = EXPR_FILTER[key];
      root.setAttribute("data-expr", key);
    }
    function playMotion(id) {
      var duration = MOTION_DURATION[id];
      if (!duration) return;
      motion = { type: id, startAt: nowMs(), duration };
    }
    function press(clientX, clientY) {
      pressAt = nowMs();
      var rect = root.getBoundingClientRect();
      if (isFinite(clientX) && isFinite(clientY) && rect.width) {
        pressRing.style.left = clientX - rect.left + "px";
        pressRing.style.top = clientY - rect.top + "px";
        pressRing.classList.remove("is-on");
        void pressRing.offsetWidth;
        pressRing.classList.add("is-on");
      }
      return { x: rect.width ? (clientX - rect.left) / rect.width : 0.5, y: rect.height ? (clientY - rect.top) / rect.height : 0.5 };
    }
    function imageRect() {
      var rect = root.getBoundingClientRect();
      if (!natW || !natH) return rect;
      var scale = state.fit === "cover" ? Math.max(rect.width / natW, rect.height / natH) : Math.min(rect.width / natW, rect.height / natH);
      var w = natW * scale;
      var h2 = natH * scale;
      return {
        left: rect.left + (rect.width - w) / 2,
        top: rect.top + (rect.height - h2) / 2,
        width: w,
        height: h2
      };
    }
    function toStagePoint(clientX, clientY) {
      var r = imageRect();
      if (!r.width || !r.height) return null;
      return {
        x: (clientX - r.left) / r.width,
        y: (clientY - r.top) / r.height
      };
    }
    function stagePointOfEvent(e) {
      var r = root.getBoundingClientRect();
      if (!r.width || !r.height) return null;
      return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
    }
    function setEyesClosed() {
    }
    function destroy() {
      destroyed = true;
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      clear(pressRing);
      if (root.parentNode) root.parentNode.removeChild(root);
    }
    applyNeck();
    setExpression("calm");
    return {
      el: root,
      kind: "pseudo",
      setScene,
      setPortrait,
      setOptions,
      setPointer,
      clearPointer,
      setExpression,
      playMotion,
      setEyesClosed,
      press,
      toStagePoint,
      stagePointOfEvent,
      imageRect,
      expression: function() {
        return expression;
      },
      portraitSrc: function() {
        return portraitSrc;
      },
      pause: stop,
      resume: start,
      destroy
    };
  }

  // src/render/live2d.js
  function hasCubismCore() {
    return typeof window !== "undefined" && !!window.Live2DCubismCore;
  }
  function createLive2DRenderer(opts) {
    var model = opts && opts.model;
    if (!model || model.kind !== "live2d") return null;
    if (!hasCubismCore()) {
      if (window.console && console.info) {
        console.info("[otome-companion] 没有检测到 Cubism Core，降级为分层立绘渲染");
      }
      return null;
    }
    return null;
  }

  // src/render/index.js
  function createRenderer(opts) {
    var options = opts || {};
    var model = options.model || { kind: "pseudo" };
    if (model.kind === "live2d") {
      var l2d = createLive2DRenderer(options);
      if (l2d) return l2d;
    }
    return createPseudoRenderer(options);
  }

  // src/core/settings.js
  var LIMITS = {
    charName: [0, 16],
    title: [0, 24],
    poem: [0, 48],
    zoneName: [1, 12],
    zoneLines: 20,
    zoneLineChars: 80,
    zones: 24,
    assetName: [1, 14],
    noteChars: 60
  };
  var FOCUS = {
    minutes: [5, 120],
    rounds: [1, 12],
    breakMinutes: [1, 30]
  };
  function defaultSettings() {
    return {
      version: 1,
      characterId: "",
      charName: "",
      title: "与你 · 共赴星海",
      poem: "有些距离，不是隔阂，而是为了更好地相遇",
      showPoem: true,
      aiEnabled: true,
      aiTone: "gentle",
      // 舞台参数
      neck: 0.38,
      anchorX: 0.5,
      anchorY: 0.28,
      breath: true,
      lookFollow: true,
      motionScale: 1,
      portraitFit: "contain",
      // 专注
      focusMinutes: 25,
      focusRounds: 4,
      breakMinutes: 5,
      taskLabel: "",
      // 数值
      energyMax: 100,
      // 其他
      showHud: true,
      onboardingDone: false
    };
  }
  function clampNum(value, fallback, min, max) {
    var n = Number(value);
    if (!isFinite(n)) return fallback;
    return clamp(n, min, max);
  }
  function text(value, fallback, max) {
    var s = String(value === void 0 || value === null ? "" : value).trim();
    if (!s) return fallback;
    return s.slice(0, max);
  }
  function mergeSettings(raw) {
    var base = defaultSettings();
    var src = raw && typeof raw === "object" ? raw : {};
    var out = {
      version: 1,
      characterId: String(src.characterId || ""),
      charName: String(src.charName || "").slice(0, LIMITS.charName[1]),
      title: text(src.title, base.title, LIMITS.title[1]),
      poem: text(src.poem, base.poem, LIMITS.poem[1]),
      showPoem: src.showPoem !== false,
      aiEnabled: src.aiEnabled !== false,
      aiTone: ["gentle", "playful", "cool"].indexOf(src.aiTone) !== -1 ? src.aiTone : base.aiTone,
      neck: clampNum(src.neck, base.neck, 0.12, 0.9),
      anchorX: clampNum(src.anchorX, base.anchorX, 0.1, 0.9),
      anchorY: clampNum(src.anchorY, base.anchorY, 0.05, 0.6),
      breath: src.breath !== false,
      lookFollow: src.lookFollow !== false,
      motionScale: clampNum(src.motionScale, 1, 0, 1.8),
      portraitFit: src.portraitFit === "cover" ? "cover" : "contain",
      focusMinutes: Math.round(clampNum(src.focusMinutes, base.focusMinutes, FOCUS.minutes[0], FOCUS.minutes[1])),
      focusRounds: Math.round(clampNum(src.focusRounds, base.focusRounds, FOCUS.rounds[0], FOCUS.rounds[1])),
      breakMinutes: Math.round(clampNum(src.breakMinutes, base.breakMinutes, FOCUS.breakMinutes[0], FOCUS.breakMinutes[1])),
      taskLabel: String(src.taskLabel || "").slice(0, 40),
      energyMax: Math.round(clampNum(src.energyMax, base.energyMax, 20, 200)),
      showHud: src.showHud !== false,
      onboardingDone: !!src.onboardingDone
    };
    return out;
  }
  function patchSettings(settings, patch) {
    return mergeSettings(Object.assign({}, settings, patch || {}));
  }
  function charNameOf(settings, character) {
    var custom = String(settings && settings.charName || "").trim();
    if (custom) return custom;
    var name = character && (character.name || character.handle);
    return String(name || "他").slice(0, LIMITS.charName[1]);
  }

  // src/core/vitals.js
  var ENERGY_DEFAULT = 78;
  var AFFINITY_MAX = 9999;
  var DAILY_CHAT_CAP = 20;
  var COST = {
    tap: 1,
    chat: 1,
    focusRound: 6,
    focusAbort: 2,
    gift: 0
  };
  var GAIN = {
    tapXp: 1,
    chatXp: 6,
    focusXp: 20,
    focusAffinity: 2,
    giftAffinity: 3,
    giftEnergy: 6,
    restEnergy: 20,
    giftXp: 10
  };
  function defaultVitals(now) {
    return {
      day: dayKey(now),
      energy: ENERGY_DEFAULT,
      energyMax: 100,
      affinity: 0,
      rounds: 0,
      focusMs: 0,
      todayMs: 0,
      totalMs: 0,
      taps: 0,
      chats: 0,
      gifts: 0,
      xp: 0,
      chatToday: 0
    };
  }
  function num(value, fallback) {
    var n = Number(value);
    return isFinite(n) ? n : fallback;
  }
  function normalizeVitals(raw, now, energyMax) {
    var base = defaultVitals(now);
    var src = raw && typeof raw === "object" ? raw : {};
    var max = Math.round(clamp(num(energyMax, src.energyMax || base.energyMax), 20, 200));
    var v = {
      day: typeof src.day === "string" && /^\d{4}-\d{2}-\d{2}$/.test(src.day) ? src.day : base.day,
      energy: clamp(num(src.energy, base.energy), 0, max),
      energyMax: max,
      affinity: Math.round(clamp(num(src.affinity, 0), 0, AFFINITY_MAX)),
      rounds: Math.max(0, Math.round(num(src.rounds, 0))),
      focusMs: Math.max(0, num(src.focusMs, 0)),
      todayMs: Math.max(0, num(src.todayMs, 0)),
      totalMs: Math.max(0, num(src.totalMs, 0)),
      taps: Math.max(0, Math.round(num(src.taps, 0))),
      chats: Math.max(0, Math.round(num(src.chats, 0))),
      gifts: Math.max(0, Math.round(num(src.gifts, 0))),
      xp: Math.max(0, Math.round(num(src.xp, 0))),
      chatToday: Math.max(0, Math.round(num(src.chatToday, 0)))
    };
    var today = dayKey(now);
    if (v.day !== today) {
      v.day = today;
      v.todayMs = 0;
      v.chatToday = 0;
      v.energy = clamp(v.energy + 40, 0, v.energyMax);
    }
    return v;
  }
  function levelOf(vitals) {
    var xp = Math.max(0, Number(vitals && vitals.xp) || 0);
    return 1 + Math.floor(xp / 120);
  }
  function energyFactor(vitals) {
    var e = Math.max(0, Number(vitals && vitals.energy) || 0);
    if (e <= 0) return 0;
    if (e < 20) return 0.7;
    return 1;
  }
  function deltaOf(before, after) {
    return {
      energy: Math.round((after.energy - before.energy) * 10) / 10,
      affinity: after.affinity - before.affinity,
      xp: after.xp - before.xp,
      rounds: after.rounds - before.rounds
    };
  }
  function applyEvent(vitals, event, now) {
    var e = event || {};
    var v = normalizeVitals(vitals, now, e.energyMax);
    var before = { energy: v.energy, affinity: v.affinity, xp: v.xp, rounds: v.rounds };
    var note = "";
    var factor = energyFactor(v);
    switch (e.type) {
      case "tap":
        v.energy = clamp(v.energy - COST.tap, 0, v.energyMax);
        v.taps += 1;
        v.xp += Math.round(GAIN.tapXp * factor);
        if (factor === 0) note = "tired";
        break;
      case "chat":
        if (v.chatToday >= DAILY_CHAT_CAP) {
          note = "chat_cap";
          break;
        }
        v.energy = clamp(v.energy - COST.chat, 0, v.energyMax);
        v.chats += 1;
        v.chatToday += 1;
        v.affinity = clamp(v.affinity + Math.max(1, Math.round(1 * factor)), 0, AFFINITY_MAX);
        v.xp += Math.round(GAIN.chatXp * factor);
        if (factor === 0) note = "tired";
        break;
      case "focusRound":
        v.energy = clamp(v.energy - COST.focusRound, 0, v.energyMax);
        v.rounds += 1;
        v.focusMs += Math.max(0, num(e.ms, 0));
        v.affinity = clamp(v.affinity + GAIN.focusAffinity, 0, AFFINITY_MAX);
        v.xp += GAIN.focusXp;
        break;
      case "focusAbort":
        v.energy = clamp(v.energy - COST.focusAbort, 0, v.energyMax);
        break;
      case "gift":
        v.energy = clamp(v.energy + GAIN.giftEnergy, 0, v.energyMax);
        v.affinity = clamp(v.affinity + GAIN.giftAffinity, 0, AFFINITY_MAX);
        v.gifts += 1;
        v.xp += GAIN.giftXp;
        break;
      case "rest":
        v.energy = clamp(v.energy + GAIN.restEnergy, 0, v.energyMax);
        break;
      case "company": {
        var ms = Math.max(0, num(e.ms, 0));
        v.todayMs += ms;
        v.totalMs += ms;
        break;
      }
      case "dayRollover":
        v.day = dayKey(now);
        v.todayMs = 0;
        v.chatToday = 0;
        v.energy = clamp(v.energy + 40, 0, v.energyMax);
        break;
      default:
        break;
    }
    var beforeLevel = levelOf(before);
    var afterLevel = levelOf(v);
    if (afterLevel > beforeLevel && note !== "tired") note = "levelup";
    return { vitals: v, delta: deltaOf(before, v), note };
  }

  // src/core/session.js
  var STATUS = {
    IDLE: "idle",
    RUNNING: "running",
    PAUSED: "paused",
    DONE: "done"
  };
  var KIND = {
    FOCUS: "focus",
    BREAK: "break"
  };
  function createSession(opts, now) {
    var o = opts || {};
    var totalMs = Math.max(1e3, Number(o.totalMs) || 0);
    return {
      kind: o.kind === KIND.BREAK ? KIND.BREAK : KIND.FOCUS,
      status: STATUS.RUNNING,
      startAt: now,
      endAt: now + totalMs,
      totalMs,
      remainingMs: totalMs,
      pausedAt: 0,
      round: Math.max(1, Math.round(Number(o.round) || 1)),
      rounds: Math.max(1, Math.round(Number(o.rounds) || 1)),
      taskLabel: String(o.taskLabel || "").slice(0, 40),
      startedAt: now,
      finishedAt: 0
    };
  }
  function normalizeSession(raw) {
    if (!raw || typeof raw !== "object") return null;
    var status = [STATUS.RUNNING, STATUS.PAUSED, STATUS.DONE].indexOf(raw.status) !== -1 ? raw.status : STATUS.DONE;
    var totalMs = Math.max(0, Number(raw.totalMs) || 0);
    return {
      kind: raw.kind === KIND.BREAK ? KIND.BREAK : KIND.FOCUS,
      status,
      startAt: Number(raw.startAt) || 0,
      endAt: Number(raw.endAt) || 0,
      totalMs,
      remainingMs: clamp(Number(raw.remainingMs) || 0, 0, totalMs || 1e12),
      pausedAt: Number(raw.pausedAt) || 0,
      round: Math.max(1, Math.round(Number(raw.round) || 1)),
      rounds: Math.max(1, Math.round(Number(raw.rounds) || 1)),
      taskLabel: String(raw.taskLabel || "").slice(0, 40),
      startedAt: Number(raw.startedAt) || 0,
      finishedAt: Number(raw.finishedAt) || 0
    };
  }
  function remainingOf(session, now) {
    if (!session) return 0;
    if (session.status === STATUS.PAUSED) return Math.max(0, session.remainingMs);
    if (session.status === STATUS.DONE) return 0;
    if (session.status === STATUS.IDLE) return Math.max(0, session.totalMs);
    return Math.max(0, session.endAt - now);
  }
  function elapsedOf(session, now) {
    if (!session) return 0;
    if (session.status === STATUS.DONE) return session.totalMs;
    return clamp(session.totalMs - remainingOf(session, now), 0, session.totalMs);
  }
  function progressOf(session, now) {
    if (!session || !session.totalMs) return 0;
    return clamp(elapsedOf(session, now) / session.totalMs, 0, 1);
  }
  function isExpired(session, now) {
    return !!session && session.status === STATUS.RUNNING && remainingOf(session, now) <= 0;
  }
  function pause(session, now) {
    if (!session || session.status !== STATUS.RUNNING) return session;
    var next = Object.assign({}, session, {
      status: STATUS.PAUSED,
      remainingMs: remainingOf(session, now),
      pausedAt: now
    });
    return next;
  }
  function resume(session, now) {
    if (!session || session.status !== STATUS.PAUSED) return session;
    var remaining = Math.max(0, session.remainingMs);
    return Object.assign({}, session, {
      status: STATUS.RUNNING,
      endAt: now + remaining,
      pausedAt: 0
    });
  }
  function complete(session, now) {
    if (!session) return session;
    return Object.assign({}, session, {
      status: STATUS.DONE,
      remainingMs: 0,
      endAt: now,
      finishedAt: now
    });
  }
  function abort(session, now) {
    if (!session) return session;
    return Object.assign({}, session, {
      status: STATUS.DONE,
      remainingMs: 0,
      finishedAt: now
    });
  }
  function restore(raw, now) {
    var s = normalizeSession(raw);
    if (!s) return null;
    if (s.status === STATUS.RUNNING) {
      if (s.endAt <= 0) return abort(s, now);
      if (s.endAt <= now) return complete(s, now);
      s.remainingMs = s.endAt - now;
    }
    if (s.status === STATUS.PAUSED && s.remainingMs <= 0) {
      s.remainingMs = s.totalMs;
    }
    return s;
  }
  function nextRound(session) {
    if (!session) return { round: 1, kind: KIND.FOCUS };
    if (session.kind === KIND.FOCUS) {
      return { round: session.round, kind: KIND.BREAK };
    }
    return { round: Math.min(session.rounds, session.round + 1), kind: KIND.FOCUS };
  }

  // src/core/touch.js
  var TOUCH_SHAPES = ["rect", "ellipse"];
  var MAX_ZONES = 24;
  var MAX_ZONE_LINES = 20;
  var MAX_LINE_CHARS = 80;
  var PRESET_ZONES = [
    { name: "发顶", x: 0.34, y: 0.06, w: 0.32, h: 0.12, shape: "ellipse", lines: ["……别揉乱。", "头发会乱。"] },
    { name: "脸颊", x: 0.36, y: 0.2, w: 0.28, h: 0.14, shape: "ellipse", lines: ["……碰哪儿呢。", "脸有点热。"] },
    { name: "手", x: 0.6, y: 0.52, w: 0.18, h: 0.16, shape: "ellipse", lines: ["要牵手吗。", "手是凉的，别介意。"] },
    { name: "腰", x: 0.33, y: 0.55, w: 0.3, h: 0.14, shape: "ellipse", lines: ["别、别闹。", "那里不行。"] }
  ];
  function newZoneId() {
    return "z_" + Math.random().toString(36).slice(2, 8);
  }
  function clamp01(value, fallback) {
    var n = Number(value);
    if (!isFinite(n)) return fallback;
    return Math.round(clamp(n, 0, 1) * 1e3) / 1e3;
  }
  function normalizeZone(raw, fallbackId) {
    var src = raw && typeof raw === "object" ? raw : {};
    var id = String(src.id || "");
    if (!/^[a-zA-Z0-9_-]{3,24}$/.test(id)) {
      id = fallbackId && /^[a-zA-Z0-9_-]{3,24}$/.test(fallbackId) ? fallbackId : newZoneId();
    }
    var x = clamp01(src.x, 0.35);
    var y = clamp01(src.y, 0.3);
    var w = clamp01(src.w, 0.3);
    var h2 = clamp01(src.h, 0.2);
    if (w < 0.02) w = 0.02;
    if (h2 < 0.02) h2 = 0.02;
    if (x + w > 1) x = Math.max(0, 1 - w);
    if (y + h2 > 1) y = Math.max(0, 1 - h2);
    var lines = [];
    if (Array.isArray(src.lines)) {
      src.lines.forEach(function(line) {
        var t = String(line === void 0 || line === null ? "" : line).trim().slice(0, MAX_LINE_CHARS);
        if (!t || lines.indexOf(t) !== -1) return;
        lines.push(t);
      });
    }
    var cooldown = Math.round(Number(src.cooldownSec));
    if (!isFinite(cooldown)) cooldown = 3;
    cooldown = Math.round(clamp(cooldown, 0, 60));
    return {
      id,
      name: String(src.name || "").trim().slice(0, 12) || "热区",
      x,
      y,
      w,
      h: h2,
      shape: TOUCH_SHAPES.indexOf(src.shape) !== -1 ? src.shape : "rect",
      lines: lines.slice(0, MAX_ZONE_LINES),
      useAI: !!src.useAI,
      prompt: String(src.prompt || "").slice(0, 500),
      cooldownSec: cooldown
    };
  }
  function normalizeZones(raw) {
    if (!Array.isArray(raw)) return [];
    var seen = {};
    var out = [];
    raw.forEach(function(item) {
      var zone = normalizeZone(item);
      if (seen[zone.id]) return;
      seen[zone.id] = true;
      out.push(zone);
    });
    return out.slice(0, MAX_ZONES);
  }
  function presetZones() {
    return PRESET_ZONES.map(function(z) {
      return normalizeZone(z);
    });
  }
  function inEllipse(zone, x, y) {
    var rx = zone.w / 2;
    var ry = zone.h / 2;
    if (!rx || !ry) return false;
    var dx = (x - (zone.x + rx)) / rx;
    var dy = (y - (zone.y + ry)) / ry;
    return dx * dx + dy * dy <= 1;
  }
  function inRect(zone, x, y) {
    return x >= zone.x && x <= zone.x + zone.w && y >= zone.y && y <= zone.y + zone.h;
  }
  function zoneAtPoint(zones, x, y) {
    if (!Array.isArray(zones)) return null;
    for (var i = zones.length - 1; i >= 0; i--) {
      var zone = zones[i];
      var hit = zone.shape === "ellipse" ? inEllipse(zone, x, y) : inRect(zone, x, y);
      if (hit) return zone;
    }
    return null;
  }
  function canTap(zone, now, lastAt) {
    if (!zone) return false;
    var wait = Math.max(0, Number(zone.cooldownSec) || 0) * 1e3;
    if (!wait) return true;
    return !lastAt || now - lastAt >= wait;
  }
  function pickZoneLine(zone, random) {
    if (!zone || !zone.lines || !zone.lines.length) return "";
    var r = typeof random === "function" ? random() : typeof random === "number" ? random : Math.random();
    var index = Math.floor(clamp(Math.max(0, Math.min(0.999999, r)) * zone.lines.length, 0, zone.lines.length - 1));
    return zone.lines[index];
  }
  function fallbackTapLine(zone) {
    if (!zone) return "……嗯？";
    return zone.name ? "（" + zone.name + "）嗯。" : "……嗯。";
  }

  // src/core/wardrobe.js
  var MAX_OUTFITS = 12;
  function normalizeOutfit(raw) {
    var src = raw && typeof raw === "object" ? raw : {};
    var id = String(src.id || "");
    if (!/^[a-z0-9_-]{4,32}$/i.test(id)) id = "of_" + makeAssetId();
    var ref = normalizeAssetRef(src.ref);
    return {
      id,
      name: String(src.name || "").trim().slice(0, 14) || "默认装扮",
      ref,
      at: Number(src.at) || 0
    };
  }
  function normalizeWardrobe(raw) {
    if (!Array.isArray(raw)) return [];
    var seen = {};
    var out = [];
    raw.forEach(function(item) {
      var outfit = normalizeOutfit(item);
      if (seen[outfit.id]) return;
      seen[outfit.id] = true;
      out.push(outfit);
    });
    return out.slice(0, MAX_OUTFITS);
  }
  function activeOutfit(wardrobe, outfitId) {
    if (!Array.isArray(wardrobe) || !wardrobe.length) return null;
    for (var i = 0; i < wardrobe.length; i++) {
      if (wardrobe[i].id === outfitId) return wardrobe[i];
    }
    return wardrobe[0];
  }
  function upsertOutfit(wardrobe, outfit) {
    var next = normalizeWardrobe(wardrobe);
    var item = normalizeOutfit(outfit);
    var replaced = false;
    next = next.map(function(o) {
      if (o.id !== item.id) return o;
      replaced = true;
      return item;
    });
    if (!replaced) next.push(item);
    return normalizeWardrobe(next);
  }
  function removeOutfit(wardrobe, id) {
    return normalizeWardrobe(wardrobe).filter(function(o) {
      return o.id !== id;
    });
  }

  // src/core/scenes.js
  var MAX_SCENES = 12;
  var LIGHT_PRESETS = [
    { id: "warm", name: "暖灯", light: "#E8C98A" },
    { id: "moon", name: "月色", light: "#A9C4E8" },
    { id: "dusk", name: "黄昏", light: "#E09A7A" },
    { id: "cold", name: "冷雨", light: "#8FA9B8" }
  ];
  function normalizeScene(raw) {
    var src = raw && typeof raw === "object" ? raw : {};
    var id = String(src.id || "");
    if (!/^[a-z0-9_-]{4,32}$/i.test(id)) id = "sc_" + makeAssetId();
    return {
      id,
      name: String(src.name || "").trim().slice(0, 12) || "未命名场景",
      ref: normalizeAssetRef(src.ref),
      tint: /^#[0-9a-f]{6}$/i.test(String(src.tint || "")) ? String(src.tint) : "#0A0D13",
      light: /^#[0-9a-f]{6}$/i.test(String(src.light || "")) ? String(src.light) : "#E8C98A",
      weather: String(src.weather || "").slice(0, 4),
      at: Number(src.at) || 0
    };
  }
  function normalizeScenes(raw) {
    if (!Array.isArray(raw)) return defaultScenes();
    var seen = {};
    var out = [];
    raw.forEach(function(item) {
      var scene = normalizeScene(item);
      if (seen[scene.id]) return;
      seen[scene.id] = true;
      out.push(scene);
    });
    return out.length ? out.slice(0, MAX_SCENES) : defaultScenes();
  }
  function defaultScenes() {
    return DEFAULT_SCENES.map(normalizeScene);
  }
  function activeScene(scenes, sceneId) {
    if (!Array.isArray(scenes) || !scenes.length) return null;
    for (var i = 0; i < scenes.length; i++) {
      if (scenes[i].id === sceneId) return scenes[i];
    }
    return scenes[0];
  }
  function upsertScene(scenes, scene) {
    var next = normalizeScenes(scenes);
    var item = normalizeScene(scene);
    var replaced = false;
    next = next.map(function(s) {
      if (s.id !== item.id) return s;
      replaced = true;
      return item;
    });
    if (!replaced) next.push(item);
    return normalizeScenes(next);
  }
  function removeScene(scenes, id) {
    var next = normalizeScenes(scenes).filter(function(s) {
      return s.id !== id;
    });
    return next.length ? next : defaultScenes();
  }

  // src/core/props.js
  var MAX_PROPS = 20;
  var PROP_ICONS = [
    { id: "flower", name: "花" },
    { id: "book", name: "书" },
    { id: "candy", name: "糖" },
    { id: "star", name: "星" },
    { id: "tea", name: "茶" }
  ];
  function pickIcon(raw) {
    for (var i = 0; i < PROP_ICONS.length; i++) {
      if (PROP_ICONS[i].id === raw) return raw;
    }
    return PROP_ICONS[0].id;
  }
  function normalizeProp(raw) {
    var src = raw && typeof raw === "object" ? raw : {};
    var id = String(src.id || "");
    if (!/^[a-z0-9_-]{4,32}$/i.test(id)) id = "pr_" + makeAssetId();
    var lines = [];
    if (Array.isArray(src.lines)) {
      src.lines.forEach(function(line) {
        var t = String(line === void 0 || line === null ? "" : line).trim().slice(0, 60);
        if (t && lines.indexOf(t) === -1) lines.push(t);
      });
    }
    return {
      id,
      name: String(src.name || "").trim().slice(0, 14) || "小礼物",
      ref: normalizeAssetRef(src.ref),
      icon: pickIcon(src.icon),
      lines: lines.slice(0, 6),
      given: Math.max(0, Math.round(Number(src.given) || 0)),
      at: Number(src.at) || 0
    };
  }
  function normalizeProps(raw) {
    if (!Array.isArray(raw)) return [];
    var seen = {};
    var out = [];
    raw.forEach(function(item) {
      var prop = normalizeProp(item);
      if (seen[prop.id]) return;
      seen[prop.id] = true;
      out.push(prop);
    });
    return out.slice(0, MAX_PROPS);
  }
  function upsertProp(props, prop) {
    var next = normalizeProps(props);
    var item = normalizeProp(prop);
    var replaced = false;
    next = next.map(function(p) {
      if (p.id !== item.id) return p;
      replaced = true;
      return item;
    });
    if (!replaced) next.push(item);
    return normalizeProps(next);
  }
  function removeProp(props, id) {
    return normalizeProps(props).filter(function(p) {
      return p.id !== id;
    });
  }
  function markGiven(props, id) {
    return normalizeProps(props).map(function(p) {
      return p.id === id ? Object.assign({}, p, { given: p.given + 1 }) : p;
    });
  }
  function giftLine(prop, random) {
    var lines = prop && prop.lines || [];
    if (lines.length) {
      var r = typeof random === "number" ? random : 0.5;
      var idx = Math.floor(Math.max(0, Math.min(0.999999, r)) * lines.length);
      return lines[idx];
    }
    var name = prop && prop.name ? prop.name : "这个";
    return "……" + name + "？我收下了。";
  }

  // src/core/logs.js
  var MAX_LOGS = 300;
  var LOG_KIND = {
    TAP: "tap",
    CHAT: "chat",
    FOCUS: "focus",
    GIFT: "gift",
    SCENE: "scene",
    OUTFIT: "outfit",
    LEVEL: "level"
  };
  function makeLogId(at) {
    return "lg_" + String(at || 0).toString(36) + Math.random().toString(36).slice(2, 5);
  }
  function normalizeLog(raw) {
    var src = raw && typeof raw === "object" ? raw : {};
    var at = Number(src.at) || 0;
    if (!at) return null;
    var text2 = String(src.text || "").trim().slice(0, 80);
    if (!text2) return null;
    var kind = Object.keys(LOG_KIND).map(function(k) {
      return LOG_KIND[k];
    }).indexOf(src.kind) !== -1 ? src.kind : LOG_KIND.TAP;
    var id = String(src.id || "");
    if (!/^[a-z0-9_]{4,32}$/i.test(id)) id = makeLogId(at);
    return { id, at, day: dayKey(at), kind, text: text2 };
  }
  function normalizeLogs(raw) {
    if (!Array.isArray(raw)) return [];
    var seen = {};
    var out = [];
    raw.forEach(function(item) {
      var log = normalizeLog(item);
      if (!log || seen[log.id]) return;
      seen[log.id] = true;
      out.push(log);
    });
    out.sort(function(a, b) {
      return b.at - a.at;
    });
    return out.slice(0, MAX_LOGS);
  }
  function appendLog(logs, entry) {
    var log = normalizeLog(entry);
    if (!log) return normalizeLogs(logs);
    return normalizeLogs([log].concat(normalizeLogs(logs)));
  }
  function groupByDay(logs) {
    var map = {};
    var order = [];
    normalizeLogs(logs).forEach(function(log) {
      if (!map[log.day]) {
        map[log.day] = [];
        order.push(log.day);
      }
      map[log.day].push(log);
    });
    return order.map(function(day) {
      return { day, items: map[day] };
    });
  }
  function recentLogs(logs, count) {
    return normalizeLogs(logs).slice(0, clamp(count || 6, 1, MAX_LOGS));
  }
  function logKindLabel(kind) {
    var labels = {
      tap: "触碰",
      chat: "通讯",
      focus: "专注",
      gift: "礼物",
      scene: "场景",
      outfit: "衣装",
      level: "升级"
    };
    return labels[kind] || "互动";
  }

  // src/core/memories.js
  var MAX_MEMORIES = 60;
  var MEMORY_KIND = {
    FIRST: "first",
    FOCUS: "focus",
    GIFT: "gift",
    LEVEL: "level",
    SCENE: "scene"
  };
  var KINDS = Object.keys(MEMORY_KIND).map(function(k) {
    return MEMORY_KIND[k];
  });
  function makeMemoryId(at) {
    return "mm_" + String(at || 0).toString(36) + Math.random().toString(36).slice(2, 5);
  }
  function normalizeMemory(raw) {
    var src = raw && typeof raw === "object" ? raw : {};
    var at = Number(src.at) || 0;
    if (!at) return null;
    var id = String(src.id || "");
    if (!/^[a-z0-9_]{4,32}$/i.test(id)) id = makeMemoryId(at);
    return {
      id,
      at,
      day: dayKey(at),
      kind: KINDS.indexOf(src.kind) !== -1 ? src.kind : MEMORY_KIND.FIRST,
      title: String(src.title || "").trim().slice(0, 18) || "这一刻",
      text: String(src.text || "").trim().slice(0, 80),
      sceneRef: normalizeAssetRef(src.sceneRef),
      outfitRef: normalizeAssetRef(src.outfitRef),
      tint: /^#[0-9a-f]{6}$/i.test(String(src.tint || "")) ? String(src.tint) : "#121722"
    };
  }
  function normalizeMemories(raw) {
    if (!Array.isArray(raw)) return [];
    var seen = {};
    var out = [];
    raw.forEach(function(item) {
      var mm = normalizeMemory(item);
      if (!mm || seen[mm.id]) return;
      seen[mm.id] = true;
      out.push(mm);
    });
    out.sort(function(a, b) {
      return b.at - a.at;
    });
    return out.slice(0, MAX_MEMORIES);
  }
  function appendMemory(list, entry) {
    var mm = normalizeMemory(entry);
    if (!mm) return normalizeMemories(list);
    return normalizeMemories([mm].concat(normalizeMemories(list)));
  }
  function removeMemory(list, id) {
    return normalizeMemories(list).filter(function(m) {
      return m.id !== id;
    });
  }
  function hasKind(list, kind) {
    return normalizeMemories(list).some(function(m) {
      return m.kind === kind;
    });
  }
  function memoryKindLabel(kind) {
    var labels = { first: "初遇", focus: "专注", gift: "礼物", level: "晋级", scene: "场景" };
    return labels[kind] || "回忆";
  }

  // src/app/container.js
  var TICK_MS = 1e3;
  var CHAT_LIMIT = 60;
  var BUBBLE_MS = 4600;
  var TAP_AI_COOLDOWN = 6e3;
  function createState(initial) {
    var state = initial;
    var subs = /* @__PURE__ */ new Set();
    return {
      get: function() {
        return state;
      },
      set: function(patch) {
        var keys = Object.keys(patch);
        state = Object.assign({}, state, patch);
        subs.forEach(function(fn) {
          try {
            fn(state, keys);
          } catch (e) {
            console.error("[otome-companion] 状态更新失败", e);
          }
        });
      },
      subscribe: function(fn) {
        subs.add(fn);
        return function() {
          subs.delete(fn);
        };
      },
      clearSubs: function() {
        subs.clear();
      }
    };
  }
  function makeMsgId(at) {
    return "msg_" + String(at).toString(36) + Math.random().toString(36).slice(2, 5);
  }
  function normalizeChat(raw) {
    if (!Array.isArray(raw)) return [];
    return raw.filter(function(m) {
      return m && (m.role === "user" || m.role === "char") && typeof m.text === "string";
    }).slice(-CHAT_LIMIT).map(function(m) {
      return {
        id: String(m.id || makeMsgId(Number(m.at) || Date.now())),
        role: m.role,
        text: String(m.text).slice(0, 400),
        at: Number(m.at) || 0
      };
    });
  }
  async function createApp(opts) {
    var host = createHost(opts.roche);
    var store = createStore(host);
    var saved = await store.loadAll();
    var settings = mergeSettings(saved.settings);
    var energyMax = settings.energyMax;
    var vitals = normalizeVitals(saved.vitals, Date.now(), energyMax);
    var session = saved.session ? restore(saved.session, Date.now()) : null;
    var wardrobe = normalizeWardrobe(saved.wardrobe);
    var scenes = normalizeScenes(saved.scenes);
    var props = normalizeProps(saved.props);
    var zones = normalizeZones(saved.zones);
    var logs = normalizeLogs(saved.logs);
    var memories = normalizeMemories(saved.memories);
    var chat = normalizeChat(saved.chat);
    var assetIndex = normalizeAssetIndex(saved.assetIndex);
    if (!zones.length) zones = presetZones();
    var characters = await host.character.list();
    var character = null;
    if (settings.characterId) {
      character = characters.filter(function(c) {
        return c.id === settings.characterId;
      })[0] || null;
    }
    if (!character && characters.length) character = characters[0];
    var persona = await host.persona.active();
    var bootIds = [];
    var outfit = activeOutfit(wardrobe, settings.outfitId);
    var scene = activeScene(scenes, settings.sceneId);
    [outfit && outfit.ref, scene && scene.ref].forEach(function(ref) {
      if (refKind(ref) === "local") bootIds.push(refId(ref));
    });
    var assets = await store.loadAssetData(bootIds);
    var state = createState({
      now: Date.now(),
      route: "stage",
      sheet: "",
      drawer: "",
      settings,
      vitals,
      session,
      wardrobe,
      outfitId: outfit ? outfit.id : "",
      scenes,
      sceneId: scene ? scene.id : "",
      props,
      zones,
      logs,
      memories,
      chat,
      assets,
      assetIndex,
      character,
      characters,
      persona,
      bubble: null,
      statusCardFolded: false,
      aiBusy: false,
      onboard: !outfit || !outfit.ref
    });
    var renderer = null;
    var stagerEl = null;
    var bubbleTimer = null;
    var saveTick = 0;
    var lastTapAI = 0;
    var ticker = null;
    var destroyed = false;
    var expression = "calm";
    function get() {
      return state.get();
    }
    function set(patch) {
      if (destroyed) return;
      state.set(patch);
    }
    function persist(which, value) {
      store.save(which, value);
    }
    function nameOf() {
      return charNameOf(get().settings, get().character);
    }
    function pushLog(kind, text2, at) {
      var next = appendLog(get().logs, { at: at || Date.now(), kind, text: text2 });
      set({ logs: next });
      persist("logs", next);
      return next;
    }
    function pushMemory(entry) {
      var next = appendMemory(get().memories, Object.assign({
        sceneRef: currentSceneRef(),
        outfitRef: currentOutfitRef()
      }, entry));
      set({ memories: next });
      persist("memories", next);
      return next;
    }
    function currentOutfitRef() {
      var o = activeOutfit(get().wardrobe, get().outfitId);
      return o ? o.ref : "";
    }
    function currentSceneRef() {
      var s = activeScene(get().scenes, get().sceneId);
      return s ? s.ref : "";
    }
    function applyVitals(event) {
      var result = applyEvent(get().vitals, event, Date.now());
      set({ vitals: result.vitals });
      saveTick = 0;
      persist("vitals", result.vitals);
      if (result.note === "levelup") {
        pushLog("level", "升到了 LV." + levelOf(result.vitals));
        pushMemory({
          at: Date.now(),
          kind: "level",
          title: "LV." + levelOf(result.vitals),
          text: "默契到了新的高度。",
          tint: "#1B2230"
        });
      }
      if (result.note === "tired") {
        showBubble("……有点累了。陪我坐一会儿吧。");
      }
      return result;
    }
    function showBubble(text2, kind) {
      if (!text2) return;
      if (bubbleTimer) clearTimeout(bubbleTimer);
      var at = Date.now();
      set({ bubble: { text: text2, at, kind: kind || "say" } });
      bubbleTimer = setTimeout(function() {
        bubbleTimer = null;
        if (!destroyed) set({ bubble: null });
      }, BUBBLE_MS);
    }
    function clearBubble() {
      if (bubbleTimer) clearTimeout(bubbleTimer);
      bubbleTimer = null;
      set({ bubble: null });
    }
    function sceneSrc() {
      var sc = activeScene(get().scenes, get().sceneId);
      return sc ? resolveAssetSrc(sc.ref, { assets: get().assets }) : "";
    }
    function portraitSrc() {
      var o = activeOutfit(get().wardrobe, get().outfitId);
      return o ? resolveAssetSrc(o.ref, { assets: get().assets }) : "";
    }
    function syncRenderer() {
      if (!renderer) return;
      var s = get();
      var sc = activeScene(s.scenes, s.sceneId);
      renderer.setOptions({
        neck: s.settings.neck,
        motionScale: s.settings.motionScale,
        breath: s.settings.breath,
        lookFollow: s.settings.lookFollow,
        anchor: { x: s.settings.anchorX, y: s.settings.anchorY },
        fit: s.settings.portraitFit
      });
      renderer.setScene(sc, sceneSrc());
      renderer.setPortrait(portraitSrc());
    }
    function attachStage(el) {
      stagerEl = el;
      if (renderer) renderer.destroy();
      renderer = createRenderer({ mount: el, model: { kind: "pseudo" } });
      syncRenderer();
      return renderer;
    }
    function detachStage() {
      if (renderer) {
        renderer.destroy();
        renderer = null;
      }
      stagerEl = null;
    }
    async function ensureAssets(refs) {
      var ids = [];
      (refs || []).forEach(function(ref) {
        if (refKind(ref) === "local") {
          var id = refId(ref);
          if (!get().assets[id]) ids.push(id);
        }
      });
      if (!ids.length) return;
      var loaded = await store.loadAssetData(ids);
      set({ assets: Object.assign({}, get().assets, loaded) });
    }
    async function addLocalAsset(file, slot, name) {
      var res = await compressImage(file);
      var id = makeAssetId();
      await store.putAsset({ id, dataUrl: res.dataUrl });
      var index = Object.assign({}, get().assetIndex);
      index[id] = { name: name || "图片", slot: slot || "portrait", w: res.w, h: res.h, at: Date.now() };
      var nextAssets = Object.assign({}, get().assets);
      nextAssets[id] = res.dataUrl;
      set({ assetIndex: index, assets: nextAssets });
      persist("assetIndex", index);
      return "local:" + id;
    }
    async function removeAsset(id) {
      var index = Object.assign({}, get().assetIndex);
      delete index[id];
      var nextAssets = Object.assign({}, get().assets);
      delete nextAssets[id];
      set({ assetIndex: index, assets: nextAssets });
      persist("assetIndex", index);
      await store.removeAsset(id);
    }
    var dialogue = createDialogue({
      host,
      getContext: function() {
        var s = get();
        var sc = activeScene(s.scenes, s.sceneId);
        var o = activeOutfit(s.wardrobe, s.outfitId);
        return {
          charName: nameOf(),
          userName: s.persona && (s.persona.name || s.persona.handle) || "你",
          tone: s.settings.aiTone,
          sceneName: sc ? sc.name : "夜色书房",
          outfitName: o ? o.name : "默认装扮",
          energy: s.vitals.energy,
          energyMax: s.vitals.energyMax,
          affinity: s.vitals.affinity,
          rounds: s.vitals.rounds,
          recent: recentLogs(s.logs, 4).map(function(l) {
            return l.text;
          })
        };
      }
    });
    function applyCommands(commands) {
      var motion = firstOf(commands, "motion");
      var expr = firstOf(commands, "expr");
      if (motion && renderer) renderer.playMotion(motion);
      if (expr && renderer) {
        expression = expr;
        renderer.setExpression(expr);
      }
      var delta = numericDelta(commands);
      if (delta.affinity || delta.energy) {
        var v = get().vitals;
        var next = normalizeVitals(v, Date.now(), v.energyMax);
        next.affinity = Math.max(0, Math.min(9999, next.affinity + delta.affinity));
        next.energy = Math.max(0, Math.min(next.energyMax, next.energy + delta.energy));
        set({ vitals: next });
        persist("vitals", next);
      }
    }
    var tapLog = {};
    function tapAt(zone, point, clientX, clientY) {
      var now = Date.now();
      if (renderer) renderer.press(clientX, clientY);
      if (zone && !canTap(zone, now, tapLog[zone.id])) {
        return { ok: false, reason: "cooldown" };
      }
      if (zone) tapLog[zone.id] = now;
      applyVitals({ type: "tap" });
      var fallback = zone ? pickZoneLine(zone) || fallbackTapLine(zone) : pickFallback("tap", Math.random());
      showBubble(fallback);
      pushLog("tap", zone ? "碰了碰" + zone.name : "轻轻碰了一下");
      if (!zone || !zone.useAI) return { ok: true, source: "local" };
      if (!get().settings.aiEnabled) return { ok: true, source: "ai_off" };
      if (now - lastTapAI < TAP_AI_COOLDOWN) return { ok: true, source: "throttle" };
      lastTapAI = now;
      set({ aiBusy: true });
      dialogue.react(zone, "").then(function(result) {
        set({ aiBusy: false });
        if (destroyed) return;
        if (!result.ok) return;
        showBubble(result.text);
        applyCommands(result.commands);
      }).catch(function() {
        set({ aiBusy: false });
      });
      return { ok: true, source: "ai" };
    }
    async function sendChat(text2) {
      var value = String(text2 || "").trim().slice(0, 300);
      if (!value) return { ok: false, reason: "empty" };
      if (get().aiBusy) return { ok: false, reason: "busy" };
      var now = Date.now();
      var list = get().chat.concat([{ id: makeMsgId(now), role: "user", text: value, at: now }]).slice(-CHAT_LIMIT);
      set({ chat: list, aiBusy: true });
      persist("chat", list);
      var history = list.slice(0, -1).map(function(m) {
        return { role: m.role === "user" ? "user" : "char", text: m.text };
      });
      var result = await dialogue.chat(value, history);
      if (destroyed) return result;
      set({ aiBusy: false });
      if (!result.ok) {
        var fallback = pickFallback(result.reason === "no_api" ? "ai_off" : "chat_empty", Math.random());
        var fbList = get().chat.concat([
          { id: makeMsgId(Date.now()), role: "char", text: fallback, at: Date.now() }
        ]).slice(-CHAT_LIMIT);
        set({ chat: fbList });
        persist("chat", fbList);
        return { ok: false, reason: result.reason };
      }
      var next = get().chat.concat([
        { id: makeMsgId(Date.now()), role: "char", text: result.text, at: Date.now() }
      ]).slice(-CHAT_LIMIT);
      set({ chat: next });
      persist("chat", next);
      applyCommands(result.commands);
      applyVitals({ type: "chat" });
      pushLog("chat", value.slice(0, 30));
      return result;
    }
    function startFocus() {
      var s = get().settings;
      var v = get().vitals;
      var sess = createSession({
        totalMs: s.focusMinutes * 6e4,
        round: 1,
        rounds: s.focusRounds,
        taskLabel: s.taskLabel
      }, Date.now());
      set({ session: sess, route: "focus" });
      persist("session", sess);
      return sess;
    }
    function pauseFocus() {
      var sess = get().session;
      if (!sess) return;
      var next = pause(sess, Date.now());
      set({ session: next });
      persist("session", next);
    }
    function resumeFocus() {
      var sess = get().session;
      if (!sess) return;
      var next = resume(sess, Date.now());
      set({ session: next });
      persist("session", next);
    }
    function abortFocus() {
      var sess = get().session;
      if (!sess) return;
      applyVitals({ type: "focusAbort" });
      set({ session: abort(sess, Date.now()) });
      persist("session", null);
      pushLog("focus", "中止了一轮专注");
    }
    function finishRound(now) {
      var sess = get().session;
      if (!sess) return;
      applyVitals({ type: "focusRound", ms: sess.totalMs });
      pushLog("focus", "完成第 " + sess.round + " / " + sess.rounds + " 轮专注");
      pushMemory({
        at: now,
        kind: "focus",
        title: "第 " + sess.round + " 轮专注",
        text: (sess.taskLabel || "一起安静了一会儿") + " · " + Math.round(sess.totalMs / 6e4) + " 分钟",
        tint: "#121722"
      });
      var isLast = sess.round >= sess.rounds;
      var nextInfo = nextRound(sess);
      var nextSess = createSession({
        kind: nextInfo.kind,
        totalMs: nextInfo.kind === "break" ? get().settings.breakMinutes * 6e4 : get().settings.focusMinutes * 6e4,
        round: nextInfo.round,
        rounds: sess.rounds,
        taskLabel: get().settings.taskLabel
      }, now);
      var done = complete(sess, now);
      set({ session: done, nextSession: isLast ? null : nextSess });
      persist("session", done);
      var line = pickFallback("focus_done", Math.random());
      showBubble(line);
      if (get().settings.aiEnabled) {
        dialogue.remark("focus").then(function(result) {
          if (destroyed || !result.ok) return;
          showBubble(result.text);
          applyCommands(result.commands);
        }).catch(function() {
        });
      }
    }
    function nextRoundNow() {
      var nextSess = get().nextSession;
      if (!nextSess) {
        set({ session: null, nextSession: null, route: "stage" });
        persist("session", null);
        return;
      }
      var fresh = createSession({
        kind: nextSess.kind,
        totalMs: nextSess.totalMs,
        round: nextSess.round,
        rounds: nextSess.rounds,
        taskLabel: nextSess.taskLabel
      }, Date.now());
      set({ session: fresh, nextSession: null });
      persist("session", fresh);
    }
    function discardSession() {
      set({ session: null, nextSession: null, route: "stage" });
      persist("session", null);
    }
    function gift(propId) {
      var list = get().props;
      var prop = list.filter(function(p) {
        return p.id === propId;
      })[0];
      if (!prop) return { ok: false, reason: "not_found" };
      var nextProps = markGiven(list, propId);
      set({ props: nextProps });
      persist("props", nextProps);
      applyVitals({ type: "gift" });
      var line = giftLine(prop, Math.random());
      showBubble(line);
      pushLog("gift", "送出「" + prop.name + "」");
      pushMemory({
        at: Date.now(),
        kind: "gift",
        title: prop.name,
        text: line,
        tint: "#1B2230"
      });
      if (get().settings.aiEnabled) {
        dialogue.remark("gift").then(function(result) {
          if (destroyed || !result.ok) return;
          showBubble(result.text);
          applyCommands(result.commands);
        }).catch(function() {
        });
      }
      return { ok: true };
    }
    async function switchOutfit(id) {
      var o = activeOutfit(get().wardrobe, id);
      if (!o) return;
      var nextSettings = Object.assign({}, get().settings, { outfitId: o.id });
      set({ outfitId: o.id, onboard: !o.ref, settings: nextSettings });
      persist("settings", nextSettings);
      await ensureAssets([o.ref]);
      syncRenderer();
      pushLog("outfit", "换上了「" + o.name + "」");
    }
    async function saveOutfit(outfit2) {
      var item = normalizeOutfit(outfit2);
      var next = upsertOutfit(get().wardrobe, item);
      set({ wardrobe: next });
      persist("wardrobe", next);
      await ensureAssets([item.ref]);
      if (get().outfitId === item.id) syncRenderer();
      return item;
    }
    function dropOutfit(id) {
      var next = removeOutfit(get().wardrobe, id);
      var outfitId = get().outfitId === id ? next[0] ? next[0].id : "" : get().outfitId;
      set({ wardrobe: next, outfitId });
      persist("wardrobe", next);
      syncRenderer();
    }
    async function switchScene(id) {
      var sc = activeScene(get().scenes, id);
      if (!sc) return;
      var nextSettings = Object.assign({}, get().settings, { sceneId: sc.id });
      set({ sceneId: sc.id, settings: nextSettings });
      persist("settings", nextSettings);
      await ensureAssets([sc.ref]);
      syncRenderer();
      pushLog("scene", "场景换成「" + sc.name + "」");
    }
    async function saveScene(scene2) {
      var item = normalizeScene(scene2);
      var next = upsertScene(get().scenes, item);
      set({ scenes: next });
      persist("scenes", next);
      await ensureAssets([item.ref]);
      if (get().sceneId === item.id) syncRenderer();
      return item;
    }
    function dropScene(id) {
      var next = removeScene(get().scenes, id);
      var sceneId = get().sceneId === id ? next[0].id : get().sceneId;
      set({ scenes: next, sceneId });
      persist("scenes", next);
      syncRenderer();
    }
    async function saveProp(prop) {
      var item = normalizeProp(prop);
      var next = upsertProp(get().props, item);
      set({ props: next });
      persist("props", next);
      await ensureAssets([item.ref]);
      return item;
    }
    function dropProp(id) {
      var next = removeProp(get().props, id);
      set({ props: next });
      persist("props", next);
    }
    function saveZone(zone) {
      var list = get().zones.slice();
      var idx = -1;
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === zone.id) {
          idx = i;
          break;
        }
      }
      if (idx === -1) list.push(zone);
      else list[idx] = zone;
      var next = normalizeZones(list);
      set({ zones: next });
      persist("zones", next);
    }
    function dropZone(id) {
      var next = get().zones.filter(function(z) {
        return z.id !== id;
      });
      set({ zones: next });
      persist("zones", next);
    }
    function saveSettings(patch) {
      var next = patchSettings(get().settings, patch);
      set({ settings: next });
      persist("settings", next);
      if (patch && patch.energyMax) {
        var v = normalizeVitals(get().vitals, Date.now(), next.energyMax);
        set({ vitals: v });
        persist("vitals", v);
      }
      if (renderer) syncRenderer();
      return next;
    }
    function setRoute(route) {
      set({ route });
    }
    function openSheet(name) {
      set({ sheet: name, drawer: "" });
      if (name === "wardrobe") ensureAssets(get().wardrobe.map(function(o) {
        return o.ref;
      }));
      if (name === "scene") ensureAssets(get().scenes.map(function(s) {
        return s.ref;
      }));
      if (name === "props") ensureAssets(get().props.map(function(p) {
        return p.ref;
      }));
    }
    function closeSheet() {
      set({ sheet: "" });
    }
    function openDrawer(name) {
      set({ drawer: name, sheet: "" });
    }
    function closeDrawer() {
      set({ drawer: "" });
    }
    function setPointer(x, y) {
      if (!renderer) return;
      if (typeof x !== "number") {
        renderer.clearPointer();
        return;
      }
      renderer.setPointer(x, y);
    }
    function toggleStatusCard() {
      set({ statusCardFolded: !get().statusCardFolded });
    }
    function finishOnboard() {
      saveSettings({ onboardingDone: true });
      set({ onboard: false });
    }
    function tick() {
      var now = Date.now();
      var s = get();
      var patch = { now };
      if (s.vitals.day !== dayKey(now)) {
        var rolled = applyEvent(s.vitals, { type: "dayRollover" }, now);
        patch.vitals = rolled.vitals;
        persist("vitals", rolled.vitals);
      }
      if (document.visibilityState !== "hidden") {
        var v = applyEvent(patch.vitals || s.vitals, { type: "company", ms: TICK_MS }, now).vitals;
        patch.vitals = v;
        saveTick += 1;
        if (saveTick >= 10) {
          saveTick = 0;
          persist("vitals", v);
        }
      }
      if (s.session && s.session.status === STATUS.RUNNING && isExpired(s.session, now)) {
        set(patch);
        finishRound(now);
        return;
      }
      set(patch);
    }
    function startTicker() {
      if (ticker) clearInterval(ticker);
      ticker = setInterval(tick, TICK_MS);
    }
    startTicker();
    async function exportAll() {
      return store.exportAll();
    }
    async function importAll(payload) {
      if (!payload || payload.kind !== "otome-companion-export" || !payload.data) {
        throw new Error("格式不对");
      }
      var d = payload.data;
      var nextSettings = mergeSettings(d.settings);
      var nextVitals = normalizeVitals(d.vitals, Date.now(), nextSettings.energyMax);
      var nextWardrobe = normalizeWardrobe(d.wardrobe);
      var nextScenes = normalizeScenes(d.scenes);
      var nextProps = normalizeProps(d.props);
      var nextZones = normalizeZones(d.zones);
      var nextLogs = normalizeLogs(d.logs);
      var nextMemories = normalizeMemories(d.memories);
      var nextChat = normalizeChat(d.chat);
      var nextIndex = normalizeAssetIndex(d.assetIndex);
      var assetData = payload.assets && typeof payload.assets === "object" ? payload.assets : {};
      Object.keys(nextIndex).forEach(function(id) {
        var dataUrl = assetData[id];
        if (typeof dataUrl === "string" && /^data:image\//i.test(dataUrl)) {
          store.putAsset({ id, dataUrl });
        }
      });
      set({
        settings: nextSettings,
        vitals: nextVitals,
        wardrobe: nextWardrobe,
        outfitId: activeOutfit(nextWardrobe, nextSettings.outfitId) ? activeOutfit(nextWardrobe, nextSettings.outfitId).id : "",
        scenes: nextScenes,
        sceneId: activeScene(nextScenes, nextSettings.sceneId) ? activeScene(nextScenes, nextSettings.sceneId).id : "",
        props: nextProps,
        zones: nextZones.length ? nextZones : presetZones(),
        logs: nextLogs,
        memories: nextMemories,
        chat: nextChat,
        assetIndex: nextIndex,
        assets: Object.assign({}, get().assets, assetData),
        session: null
      });
      persist("settings", nextSettings);
      persist("vitals", nextVitals);
      persist("wardrobe", nextWardrobe);
      persist("scenes", nextScenes);
      persist("props", nextProps);
      persist("zones", get().zones);
      persist("logs", nextLogs);
      persist("memories", nextMemories);
      persist("chat", nextChat);
      persist("assetIndex", nextIndex);
      syncRenderer();
      return true;
    }
    async function resetAll() {
      await store.clearAll();
      var s = mergeSettings(null);
      var v = normalizeVitals(null, Date.now(), s.energyMax);
      set({
        settings: s,
        vitals: v,
        session: null,
        wardrobe: [],
        outfitId: "",
        scenes: normalizeScenes(null),
        sceneId: normalizeScenes(null)[0].id,
        props: [],
        zones: presetZones(),
        logs: [],
        memories: [],
        chat: [],
        assets: {},
        assetIndex: {},
        bubble: null,
        onboard: true
      });
      syncRenderer();
    }
    function destroy() {
      destroyed = true;
      if (ticker) clearInterval(ticker);
      ticker = null;
      if (bubbleTimer) clearTimeout(bubbleTimer);
      bubbleTimer = null;
      detachStage();
      store.flush();
      state.clearSubs();
    }
    function status() {
      var s = get();
      return {
        route: s.route,
        sheet: s.sheet,
        drawer: s.drawer,
        charName: nameOf(),
        energy: s.vitals.energy,
        affinity: s.vitals.affinity,
        level: levelOf(s.vitals),
        todayText: fmtDuration(s.vitals.todayMs),
        rounds: s.vitals.rounds,
        session: s.session ? {
          status: s.session.status,
          round: s.session.round,
          rounds: s.session.rounds,
          remainingMs: s.session.remainingMs
        } : null,
        groups: groupByDay(s.logs).length,
        hasFocusMemory: hasKind(s.memories, "focus")
      };
    }
    return {
      ctx: {
        host,
        store,
        state,
        actions: {
          setRoute,
          openSheet,
          closeSheet,
          openDrawer,
          closeDrawer,
          setPointer,
          tapAt,
          sendChat,
          startFocus,
          pauseFocus,
          resumeFocus,
          abortFocus,
          nextRoundNow,
          discardSession,
          gift,
          switchOutfit,
          saveOutfit,
          dropOutfit,
          switchScene,
          saveScene,
          dropScene,
          saveProp,
          dropProp,
          saveZone,
          dropZone,
          saveSettings,
          addLocalAsset,
          removeAsset,
          ensureAssets,
          toggleStatusCard,
          finishOnboard,
          exportAll,
          importAll,
          resetAll,
          showBubble,
          clearBubble,
          removeMemory: function(id) {
            var next = removeMemory(get().memories, id);
            set({ memories: next });
            persist("memories", next);
          },
          removeLog: function(id) {
            var next = get().logs.filter(function(l) {
              return l.id !== id;
            });
            set({ logs: next });
            persist("logs", next);
          }
        },
        attachStage,
        detachStage,
        getRenderer: function() {
          return renderer;
        },
        sceneSrc,
        portraitSrc,
        status,
        syncRenderer,
        destroy
      },
      destroy
    };
  }

  // src/ui/icons.js
  function path(d, extra) {
    return '<path d="' + d + '" ' + (extra || "") + "/>";
  }
  var BASE = 'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
  var ICON_PATHS = {
    chat: path("M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H10l-4 4v-4H6.5A2.5 2.5 0 0 1 4 13.5z"),
    wardrobe: path("M12 4.2a2.1 2.1 0 0 1 2.1 2.1c0 1.2-.9 1.7-2.1 2.3") + path("M12 8.6 3.8 14.4a1.2 1.2 0 0 0 .68 2.2h15.04a1.2 1.2 0 0 0 .68-2.2L12 8.6z"),
    scene: path("M4 17.5 9 12l3.2 3.4L15 12l5 5.5M4 5.5h16v13H4z") + '<circle cx="8.5" cy="9" r="1.4"/>',
    focus: path("M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z") + path("M12 7.5V12l3 2"),
    log: path("M5 4.5h14v15H5z") + path("M8.5 8.5h7M8.5 12h7M8.5 15.5h4"),
    memory: path("M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9z"),
    settings: path("M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z") + path("M19.4 13.5a7.6 7.6 0 0 0 0-3l1.6-1.2-1.8-3.1-1.9.8a7.6 7.6 0 0 0-2.6-1.5L14.4 3h-3.6l-.3 2.5a7.6 7.6 0 0 0-2.6 1.5l-1.9-.8L4.2 9.3 5.8 10.5a7.6 7.6 0 0 0 0 3l-1.6 1.2 1.8 3.1 1.9-.8a7.6 7.6 0 0 0 2.6 1.5l.3 2.5h3.6l.3-2.5a7.6 7.6 0 0 0 2.6-1.5l1.9.8 1.8-3.1z"),
    bolt: path("M13 2.5 5.5 13.5H11l-1 8 7.5-11H12z"),
    heart: path("M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9z"),
    clock: path("M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z") + path("M12 7v5.2l3.4 2"),
    plus: path("M12 5v14M5 12h14"),
    close: path("M6 6l12 12M18 6 6 18"),
    back: path("M14.5 5 8 12l6.5 7"),
    check: path("M5 12.5 9.5 17 19 7"),
    trash: path("M5 7h14M9.5 7V4.8h5V7M7 7l1 13h8l1-13"),
    upload: path("M12 16V4.5M8 8.5 12 4.5l4 4M4.5 15.5V19h15v-3.5"),
    link: path("M10 14a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 1 0-5.7-5.7L11.5 6") + path("M14 10a4 4 0 0 0-5.7 0L5.7 12.6a4 4 0 1 0 5.7 5.7L12.5 18"),
    image: path("M4 5.5h16v13H4z") + path("M4 15l4.5-4.5 3.5 3.5 3-3L20 15"),
    edit: path("M4.5 19.5h4L19 9a2.1 2.1 0 0 0-3-3L5.5 16.5z"),
    play: path("M8 5.5 18 12 8 18.5z"),
    pause: path("M9 5.5v13M15 5.5v13"),
    reset: path("M4.5 12a7.5 7.5 0 1 0 2.4-5.5") + path("M4 4.5V9h4.5")
  };
  function iconMarkup(name) {
    var body = ICON_PATHS[name] || ICON_PATHS.heart;
    return '<svg viewBox="0 0 24 24" ' + BASE + ' aria-hidden="true">' + body + "</svg>";
  }

  // src/ui/components.js
  function icon(name, cls) {
    return h("span", { class: "oc-icon" + (cls ? " " + cls : ""), svg: iconMarkup(name) });
  }
  function button(label, opts) {
    var o = opts || {};
    return h("button", {
      class: "oc-btn" + (o.variant ? " oc-btn--" + o.variant : "") + (o.block ? " oc-btn--block" : ""),
      type: "button",
      disabled: !!o.disabled,
      onclick: o.onClick
    }, o.icon ? [icon(o.icon), h("span", { text: label })] : label);
  }
  function dialog(opts) {
    var o = opts || {};
    return new Promise(function(resolve) {
      var finished = false;
      var body = h("div", { class: "oc-dialog__body" });
      if (o.setup) o.setup(body);
      else if (o.body) body.appendChild(o.body);
      var actions = h("div", { class: "oc-dialog__actions" });
      (o.actions || [{ label: "关闭", value: false }]).forEach(function(a) {
        actions.appendChild(h("button", {
          class: "oc-btn" + (a.variant ? " oc-btn--" + a.variant : ""),
          type: "button",
          text: a.label,
          onclick: function() {
            close(a.value);
          }
        }));
      });
      var card = h("div", { class: "oc-dialog" }, [
        o.title ? h("div", { class: "oc-dialog__title", text: o.title }) : null,
        body,
        actions
      ]);
      var mask = h("div", {
        class: "oc-mask",
        onclick: function(e) {
          if (e.target === mask) close(false);
        }
      }, [card]);
      document.body.appendChild(mask);
      requestAnimationFrame(function() {
        mask.classList.add("is-open");
      });
      function close(value) {
        if (finished) return;
        finished = true;
        mask.classList.remove("is-open");
        setTimeout(function() {
          if (mask.parentNode) mask.parentNode.removeChild(mask);
        }, 220);
        resolve(value);
      }
      mask.__ocClose = close;
    });
  }
  function stepperRow(label, desc, value, range, step, format, onChange) {
    var valueEl = h("span", { class: "oc-stepper__value", text: format(value) });
    var minus = h("button", {
      class: "oc-stepper__btn",
      type: "button",
      text: "−",
      onclick: function() {
        set(value - step);
      }
    });
    var plus = h("button", {
      class: "oc-stepper__btn",
      type: "button",
      text: "+",
      onclick: function() {
        set(value + step);
      }
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
    return h("div", { class: "oc-row" }, [
      h("div", { class: "oc-row__main" }, [
        h("div", { class: "oc-row__title", text: label }),
        desc ? h("div", { class: "oc-row__sub", text: desc }) : null
      ]),
      h("div", { class: "oc-stepper" }, [minus, valueEl, plus])
    ]);
  }
  function switchRow(label, desc, checked, onChange) {
    var btn = h("button", {
      class: "oc-switch",
      type: "button",
      role: "switch",
      "aria-checked": String(checked),
      onclick: function() {
        checked = !checked;
        btn.setAttribute("aria-checked", String(checked));
        onChange(checked);
      }
    });
    return h("div", { class: "oc-row" }, [
      h("div", { class: "oc-row__main" }, [
        h("div", { class: "oc-row__title", text: label }),
        desc ? h("div", { class: "oc-row__sub", text: desc }) : null
      ]),
      btn
    ]);
  }
  function sliderRow(label, desc, value, min, max, step, format, onInput) {
    var valueEl = h("span", { class: "oc-stepper__value", text: format(value) });
    var input = h("input", {
      class: "oc-range",
      type: "range",
      min: String(min),
      max: String(max),
      step: String(step),
      value: String(value)
    });
    input.addEventListener("input", function() {
      var next = Number(input.value);
      valueEl.textContent = format(next);
      onInput(next);
    });
    return h("div", { class: "oc-row", style: "flex-direction:column;align-items:stretch;gap:2px" }, [
      h("div", { style: "display:flex;align-items:baseline;gap:8px" }, [
        h("div", { class: "oc-row__title", text: label }),
        valueEl
      ]),
      desc ? h("div", { class: "oc-row__sub", text: desc }) : null,
      input
    ]);
  }
  function segmented(items, value, onPick) {
    var buttons = items.map(function(item) {
      return h("button", {
        class: "oc-seg__btn" + (item.id === value ? " is-active" : ""),
        type: "button",
        text: item.name,
        onclick: function() {
          buttons.forEach(function(b, i) {
            b.classList.toggle("is-active", items[i].id === item.id);
          });
          onPick(item.id);
        }
      });
    });
    return h("div", { class: "oc-seg" }, buttons);
  }
  function field(label, input, hint) {
    return h("label", { class: "oc-field" }, [
      h("span", { class: "oc-field__label", text: label }),
      input,
      hint ? h("span", { class: "oc-field__hint", text: hint }) : null
    ]);
  }
  function textInput(value, placeholder, maxlength) {
    return h("input", {
      class: "oc-input",
      type: "text",
      value: value || "",
      placeholder: placeholder || "",
      maxlength: String(maxlength || 40)
    });
  }
  function textArea(value, placeholder, rows) {
    var el = h("textarea", {
      class: "oc-input oc-textarea",
      rows: String(rows || 3),
      placeholder: placeholder || ""
    });
    el.value = value || "";
    return el;
  }
  function emptyState(title, desc, action) {
    return h("div", { class: "oc-empty" }, [
      h("div", { class: "oc-empty__title", text: title }),
      desc ? h("div", { class: "oc-empty__desc", text: desc }) : null,
      action || null
    ]);
  }

  // src/ui/views/stage.js
  function setText(el, value) {
    var next = String(value === void 0 || value === null ? "" : value);
    if (el && el.textContent !== next) el.textContent = next;
  }
  function setWidth(el, ratio) {
    var pct = Math.round(Math.max(0, Math.min(1, ratio)) * 1e3) / 10;
    var next = pct + "%";
    if (el && el.style.width !== next) el.style.width = next;
  }
  var stage_default2 = {
    mount: function(hostEl, ctx) {
      var state = ctx.state;
      var stageHost = h("div", { class: "oc-stage-host" });
      hostEl.appendChild(stageHost);
      var renderer = ctx.attachStage(stageHost);
      var s = state.get();
      var charName = charNameOf(s.settings, s.character);
      var avatarInner = s.character && s.character.avatar ? h("img", { src: s.character.avatar, alt: "" }) : h("span", { class: "oc-avatar__ph", text: charName.slice(0, 1) });
      var avatar = h("div", { class: "oc-avatar" }, [avatarInner]);
      var nameEl = h("div", { class: "oc-id__name", text: charName });
      var lvEl = h("span", { class: "oc-id__lv", text: "LV." + levelOf(s.vitals) });
      var titleEl = h("div", { class: "oc-id__title", text: s.settings.title });
      var energyEl = h("b", { class: "oc-num" });
      var todayEl = h("b", { class: "oc-num" });
      var affinityEl = h("b", { class: "oc-num" });
      var gear = h("button", {
        class: "oc-iconbtn",
        type: "button",
        "aria-label": "设置",
        onclick: function() {
          ctx.actions.openSheet("settings");
        }
      }, [icon("settings")]);
      var top = h("div", { class: "oc-top" }, [
        h("div", { class: "oc-id" }, [
          avatar,
          h("div", { class: "oc-id__main" }, [
            h("div", { class: "oc-id__line" }, [nameEl, lvEl]),
            titleEl
          ])
        ]),
        h("div", { class: "oc-stats" }, [
          h("span", { class: "oc-stat" }, [icon("bolt"), energyEl, h("i", { text: "/100" })]),
          h("span", { class: "oc-stat" }, [icon("clock"), todayEl]),
          h("span", { class: "oc-stat" }, [icon("heart"), affinityEl]),
          gear
        ])
      ]);
      var focusState = h("span", { class: "oc-focuscard__state", text: "待开始" });
      var focusRound = h("span", { class: "oc-eyebrow", text: "FOCUS" });
      var ringText = h("span", { class: "oc-ring__text" });
      var focusTime = h("div", { class: "oc-focuscard__time" });
      var focusTotal = h("div", { class: "oc-focuscard__total" });
      var taskText = h("span");
      var ring = h("div", { class: "oc-ring" }, [ringText]);
      var focusCard = h("div", {
        class: "oc-focuscard oc-glass",
        onclick: function() {
          ctx.actions.openSheet("focus");
        }
      }, [
        h("div", { class: "oc-focuscard__head" }, [focusRound, focusState]),
        h("div", { class: "oc-focuscard__row" }, [
          ring,
          h("div", { class: "oc-focuscard__meta" }, [focusTime, focusTotal])
        ]),
        h("div", { class: "oc-focuscard__task" }, [taskText, h("em", { text: "›" })])
      ]);
      var poem = h("div", { class: "oc-poem", text: s.settings.poem });
      var side = h("div", { class: "oc-side" }, [
        h("button", {
          class: "oc-roundbtn",
          type: "button",
          "aria-label": "日志",
          onclick: function() {
            ctx.actions.openDrawer("logs");
          }
        }, [icon("log")]),
        h("button", {
          class: "oc-roundbtn",
          type: "button",
          "aria-label": "回忆",
          onclick: function() {
            ctx.actions.openDrawer("memories");
          }
        }, [icon("memory")])
      ]);
      var meterValue = h("span", { class: "oc-meter__value" });
      var barFill = h("div", { class: "oc-bar__fill" });
      var todayRow = h("b");
      var roundsRow = h("b");
      var foldBtn = h("button", {
        class: "oc-statuscard__fold",
        type: "button",
        text: "收起",
        onclick: function(e) {
          e.stopPropagation();
          ctx.actions.toggleStatusCard();
        }
      });
      var statusCard = h("div", { class: "oc-statuscard oc-glass" }, [
        h("div", { class: "oc-statuscard__head" }, [
          h("span", { class: "oc-statuscard__title", text: "角色状态" }),
          foldBtn
        ]),
        h("div", { class: "oc-meter" }, [
          icon("bolt"),
          h("span", { class: "oc-meter__label", text: "陪伴能量" }),
          meterValue
        ]),
        h("div", { class: "oc-bar" }, [barFill]),
        h("div", { class: "oc-minirow" }, [icon("clock"), h("span", { text: "今日共处" }), todayRow]),
        h("div", { class: "oc-minirow" }, [icon("heart"), h("span", { text: "默契记录" }), roundsRow]),
        h("div", {
          class: "oc-minirow oc-minirow--link",
          onclick: function() {
            ctx.actions.openSheet("props");
          }
        }, [icon("plus"), h("span", { text: "送一件礼物" })])
      ]);
      var bubble = h("div", { class: "oc-bubble" });
      var guide = h("div", { class: "oc-guide oc-glass" }, [
        h("div", { class: "oc-guide__title", text: "先把他的样子放进来" }),
        h("div", { class: "oc-guide__desc", text: "上传一张人物立绘（透明背景最好），再拖一条脖子线，他就会有呼吸和视线跟随。" }),
        h("div", { class: "oc-guide__actions" }, [
          h("button", {
            class: "oc-btn oc-btn--primary",
            type: "button",
            text: "上传立绘",
            onclick: function() {
              ctx.actions.openSheet("wardrobe");
            }
          }),
          h("button", {
            class: "oc-btn oc-btn--ghost",
            type: "button",
            text: "稍后再说",
            onclick: function() {
              ctx.actions.finishOnboard();
            }
          })
        ])
      ]);
      var mark = h("div", { class: "oc-mark", text: "COMPANION INTERFACE" });
      var hud = h("div", { class: "oc-hud" }, [top, focusCard, poem, side, statusCard, bubble, guide, mark]);
      hostEl.appendChild(hud);
      var down = null;
      function stagePoint(e) {
        var r = renderer || ctx.getRenderer();
        return r ? r.stagePointOfEvent(e) : null;
      }
      function onPointerMove(e) {
        var sp = stagePoint(e);
        if (!sp) return;
        ctx.actions.setPointer(sp.x, sp.y);
      }
      function onPointerLeave() {
        ctx.actions.setPointer(null);
      }
      function onPointerDown(e) {
        down = { x: e.clientX, y: e.clientY, at: Date.now(), type: e.pointerType };
        var sp = stagePoint(e);
        if (sp) ctx.actions.setPointer(sp.x, sp.y);
      }
      function onPointerUp(e) {
        if (!down) return;
        var moved = Math.abs(e.clientX - down.x) + Math.abs(e.clientY - down.y);
        var held = Date.now() - down.at;
        down = null;
        if (moved > 12 || held > 900) return;
        var r = renderer || ctx.getRenderer();
        if (!r) return;
        if (!r.portraitSrc()) {
          ctx.actions.openSheet("wardrobe");
          return;
        }
        var point = r.toStagePoint(e.clientX, e.clientY);
        if (!point) return;
        var zone = zoneAtPoint(state.get().zones, point.x, point.y);
        ctx.actions.tapAt(zone, point, e.clientX, e.clientY);
      }
      function onContextMenu(e) {
        e.preventDefault();
      }
      stageHost.addEventListener("pointermove", onPointerMove);
      stageHost.addEventListener("pointerdown", onPointerDown);
      stageHost.addEventListener("pointerup", onPointerUp);
      stageHost.addEventListener("pointercancel", onPointerLeave);
      stageHost.addEventListener("pointerleave", onPointerLeave);
      stageHost.addEventListener("contextmenu", onContextMenu);
      hud.addEventListener("contextmenu", onContextMenu);
      function renderSession(session, now, nextSession) {
        var status = session ? session.status : "";
        var progress = session ? progressOf(session, now) : 0;
        var remain = session ? remainingOf(session, now) : s.settings.focusMinutes * 6e4;
        var total = session ? session.totalMs : s.settings.focusMinutes * 6e4;
        var stateText = "待开始";
        if (status === STATUS.RUNNING) stateText = session.kind === "break" ? "休息中" : "专注中";
        else if (status === STATUS.PAUSED) stateText = "已暂停";
        else if (status === STATUS.DONE) stateText = nextSession ? "本轮结束" : "已完成";
        setText(focusState, stateText);
        setText(focusRound, "FOCUS · " + (session ? "第 " + session.round + " / " + session.rounds + " 轮" : ""));
        setText(focusTime, fmtClock(remain));
        setText(focusTotal, "/ " + fmtClockLong(total));
        setText(ringText, Math.round(progress * 100) + "%");
        ring.style.setProperty("--oc-progress", String(progress));
        setText(taskText, s.settings.taskLabel || "未设定任务");
      }
      function update() {
        var next = state.get();
        var now = next.now;
        var v = next.vitals;
        var charNameNow = charNameOf(next.settings, next.character);
        setText(nameEl, charNameNow);
        setText(lvEl, "LV." + levelOf(v));
        setText(titleEl, next.settings.title);
        setText(energyEl, Math.round(v.energy));
        setText(todayEl, fmtDurationLong(v.todayMs));
        setText(affinityEl, Math.round(v.affinity));
        renderSession(next.session, now, next.nextSession);
        setText(meterValue, Math.round(v.energy) + " / " + v.energyMax);
        setWidth(barFill, v.energyMax ? v.energy / v.energyMax : 0);
        setText(todayRow, fmtDuration(v.todayMs) + " · 累计 " + fmtDuration(v.focusMs));
        setText(roundsRow, "已共同完成 " + v.rounds + " 轮");
        poem.style.display = next.settings.showPoem && next.settings.poem ? "" : "none";
        setText(poem, next.settings.poem);
        statusCard.classList.toggle("is-folded", !!next.statusCardFolded);
        setText(foldBtn, next.statusCardFolded ? "展开" : "收起");
        guide.style.display = next.onboard ? "" : "none";
        if (next.bubble) {
          setText(bubble, next.bubble.text);
          bubble.classList.add("is-on");
        } else {
          bubble.classList.remove("is-on");
        }
        var sc = activeScene(next.scenes, next.sceneId);
        if (sc && sc.name) setText(mark, "COMPANION INTERFACE · " + sc.name);
      }
      var unsubscribe = state.subscribe(function(next, keys) {
        update();
        if (keys.indexOf("settings") !== -1 || keys.indexOf("outfitId") !== -1 || keys.indexOf("sceneId") !== -1) {
          ctx.syncRenderer();
        }
      });
      update();
      return {
        el: hud,
        update,
        destroy: function() {
          unsubscribe();
          stageHost.removeEventListener("pointermove", onPointerMove);
          stageHost.removeEventListener("pointerdown", onPointerDown);
          stageHost.removeEventListener("pointerup", onPointerUp);
          stageHost.removeEventListener("pointercancel", onPointerLeave);
          stageHost.removeEventListener("pointerleave", onPointerLeave);
          stageHost.removeEventListener("contextmenu", onContextMenu);
          clear(stageHost);
          ctx.detachStage();
        }
      };
    }
  };

  // src/ui/views/chat.js
  var chat_default = {
    mount: function(body, ctx) {
      var state = ctx.state;
      var list = h("div", { class: "oc-chat__list" });
      var input = h("textarea", {
        class: "oc-input",
        rows: "1",
        placeholder: "说点什么…",
        maxlength: "300"
      });
      var sendBtn = h("button", { class: "oc-send", type: "button", "aria-label": "发送" }, [icon("chat")]);
      var root = h("div", { class: "oc-chat" }, [
        list,
        h("div", { class: "oc-chat__input" }, [input, sendBtn])
      ]);
      body.appendChild(root);
      var sending = false;
      function scrollToEnd() {
        list.scrollTop = list.scrollHeight;
      }
      function render() {
        var s = state.get();
        clear(list);
        if (!s.chat.length) {
          list.appendChild(emptyState("还没有开始对话", "他就在这里。说第一句话试试。"));
        }
        s.chat.forEach(function(msg) {
          if (msg.role === "user") {
            list.appendChild(h("div", { class: "oc-msg oc-msg--user", text: msg.text }));
            return;
          }
          list.appendChild(h("div", { class: "oc-msg oc-msg--char" }, [
            h("div", { text: msg.text }),
            msg.at ? h("div", { class: "oc-msg--sys", text: fmtTime(msg.at) }) : null
          ]));
        });
        if (s.aiBusy) {
          list.appendChild(h("div", { class: "oc-typing" }, [h("i"), h("i"), h("i")]));
        }
        sendBtn.disabled = s.aiBusy;
        scrollToEnd();
      }
      async function doSend() {
        if (sending) return;
        var text2 = String(input.value || "").trim();
        if (!text2) return;
        input.value = "";
        sending = true;
        render();
        try {
          await ctx.actions.sendChat(text2);
        } catch (e) {
          ctx.host.ui.toast("发送失败，等会儿再试");
        }
        sending = false;
        render();
        scrollToEnd();
      }
      sendBtn.addEventListener("click", doSend);
      input.addEventListener("keydown", function(e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          doSend();
        }
      });
      var unsubscribe = state.subscribe(function(s, keys) {
        if (keys.indexOf("chat") !== -1 || keys.indexOf("aiBusy") !== -1) render();
      });
      render();
      return {
        destroy: function() {
          unsubscribe();
          clear(list);
        }
      };
    }
  };

  // src/ui/views/wardrobe.js
  function pickName(file) {
    return String(file && file.name || "立绘").replace(/\.[^.]+$/, "").slice(0, 14) || "立绘";
  }
  var wardrobe_default = {
    mount: function(body, ctx) {
      var state = ctx.state;
      var fileInput = h("input", {
        type: "file",
        accept: "image/*",
        style: "display:none",
        onchange: function(e) {
          var file = e.target.files && e.target.files[0];
          e.target.value = "";
          if (!file) return;
          uploadFile(file);
        }
      });
      var grid = h("div", { class: "oc-cards" });
      var head = h("div", { class: "oc-sheet__head", style: "padding:0 0 10px" }, [
        h("span", { class: "oc-eyebrow", text: "已拥有" }),
        h("div", { style: "margin-left:auto;display:flex;gap:8px" }, [
          button("上传", { icon: "upload", onClick: function() {
            fileInput.click();
          } }),
          button("外链", { icon: "link", variant: "ghost", onClick: openUrlDialog })
        ])
      ]);
      body.appendChild(fileInput);
      body.appendChild(head);
      body.appendChild(grid);
      async function uploadFile(file) {
        try {
          ctx.host.ui.toast("正在压缩…");
          var ref = await ctx.actions.addLocalAsset(file, "portrait", pickName(file));
          var item = await ctx.actions.saveOutfit({ name: pickName(file), ref });
          await ctx.actions.switchOutfit(item.id);
          ctx.actions.finishOnboard();
          ctx.host.ui.toast("立绘已保存");
          render();
        } catch (err) {
          ctx.host.ui.toast("图片太大，压到 1.5MB 以内仍失败，换一张或改用外链");
        }
      }
      function openUrlDialog() {
        var urlInput = textInput("", "https://… 图片直链", 400);
        dialog({
          title: "用图片外链",
          body: h("div", {}, [
            field("图片地址", urlInput, "外链不占本机存储；加载失败会显示占位。")
          ]),
          actions: [
            { label: "取消", value: false },
            { label: "添加", value: "ok", variant: "primary" }
          ]
        }).then(async function(result) {
          if (result !== "ok") return;
          var url = String(urlInput.value || "").trim();
          if (!/^https?:\/\//i.test(url)) {
            ctx.host.ui.toast("地址要以 http:// 或 https:// 开头");
            return;
          }
          var item = await ctx.actions.saveOutfit({ name: "外链衣装", ref: url });
          await ctx.actions.switchOutfit(item.id);
          ctx.actions.finishOnboard();
          render();
        });
      }
      function render() {
        var s = state.get();
        clear(grid);
        if (!s.wardrobe.length) {
          grid.style.display = "block";
          grid.appendChild(emptyState(
            "衣柜是空的",
            "上传第一张人物立绘，舞台就会亮起来。透明背景 PNG 效果最好。",
            button("从相册选择", { variant: "primary", icon: "upload", onClick: function() {
              fileInput.click();
            } })
          ));
          return;
        }
        grid.style.display = "";
        s.wardrobe.forEach(function(outfit) {
          var src = resolveAssetSrc(outfit.ref, { assets: s.assets });
          var media = h("div", { class: "oc-card__media" }, [
            src ? h("img", { src, alt: outlineName(outfit), loading: "lazy" }) : h("span", { class: "oc-card__ph", text: refLabel(outfit.ref, "未设置") })
          ]);
          var card = h("div", {
            class: "oc-card" + (outfit.id === s.outfitId ? " is-active" : ""),
            onclick: function() {
              ctx.actions.switchOutfit(outfit.id);
            }
          }, [
            media,
            h("div", { class: "oc-card__name", text: outfit.name }),
            outfit.id === s.outfitId ? h("div", { class: "oc-card__check" }, [icon("check")]) : null
          ]);
          var timer = null;
          card.addEventListener("pointerdown", function() {
            timer = setTimeout(function() {
              timer = null;
              confirmRemove(outfit);
            }, 620);
          });
          ["pointerup", "pointerleave", "pointercancel"].forEach(function(type) {
            card.addEventListener(type, function() {
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
        return outfit.name || "立绘";
      }
      function confirmRemove(outfit) {
        dialog({
          title: "移除「" + outfit.name + "」",
          body: h("p", { class: "oc-row__sub", text: "只从衣柜移除，不影响聊天与回忆。" }),
          actions: [
            { label: "取消", value: false },
            { label: "移除", value: "ok", variant: "danger" }
          ]
        }).then(function(result) {
          if (result !== "ok") return;
          ctx.actions.dropOutfit(outfit.id);
          render();
        });
      }
      var unsubscribe = state.subscribe(function(s, keys) {
        if (keys.indexOf("wardrobe") !== -1 || keys.indexOf("outfitId") !== -1 || keys.indexOf("assets") !== -1) render();
      });
      render();
      return {
        destroy: function() {
          unsubscribe();
          clear(grid);
        }
      };
    }
  };

  // src/ui/views/scene.js
  var scene_default = {
    mount: function(body, ctx) {
      var state = ctx.state;
      var fileInput = h("input", {
        type: "file",
        accept: "image/*",
        style: "display:none",
        onchange: function(e) {
          var file = e.target.files && e.target.files[0];
          e.target.value = "";
          if (file) uploadFile(file);
        }
      });
      var row = h("div", { class: "oc-scenerow" });
      var head = h("div", { style: "display:flex;gap:8px;align-items:center;padding:0 0 10px" }, [
        h("span", { class: "oc-eyebrow", text: "场景库" }),
        h("div", { style: "margin-left:auto;display:flex;gap:8px" }, [
          button("上传", { icon: "upload", onClick: function() {
            fileInput.click();
          } }),
          button("外链", { icon: "link", variant: "ghost", onClick: openUrlDialog })
        ])
      ]);
      body.appendChild(fileInput);
      body.appendChild(head);
      body.appendChild(row);
      async function uploadFile(file) {
        try {
          ctx.host.ui.toast("正在压缩…");
          var name = String(file.name || "场景").replace(/\.[^.]+$/, "").slice(0, 12) || "场景";
          var ref = await ctx.actions.addLocalAsset(file, "scene", name);
          var item = await ctx.actions.saveScene({ name, ref });
          await ctx.actions.switchScene(item.id);
          ctx.host.ui.toast("场景已保存");
          render();
        } catch (err) {
          ctx.host.ui.toast("这张图太大了，试试更小的图或外链");
        }
      }
      function openUrlDialog() {
        var urlInput = textInput("", "https://… 背景直链", 400);
        dialog({
          title: "用背景外链",
          body: h("div", {}, [field("背景地址", urlInput)]),
          actions: [
            { label: "取消", value: false },
            { label: "添加", value: "ok", variant: "primary" }
          ]
        }).then(async function(result) {
          if (result !== "ok") return;
          var url = String(urlInput.value || "").trim();
          if (!/^https?:\/\//i.test(url)) {
            ctx.host.ui.toast("地址要以 http:// 或 https:// 开头");
            return;
          }
          var item = await ctx.actions.saveScene({ name: "外链场景", ref: url });
          await ctx.actions.switchScene(item.id);
          render();
        });
      }
      function editScene(scene) {
        var light = scene.light;
        var bodyEl = h("div", {}, [
          field("环境光", segmented(LIGHT_PRESETS.map(function(p) {
            return { id: p.light, name: p.name };
          }), light, function(id) {
            light = id;
          }))
        ]);
        dialog({
          title: "「" + scene.name + "」",
          body: bodyEl,
          actions: [
            { label: "删除", value: "remove", variant: "danger" },
            { label: "应用环境光", value: "save", variant: "primary" }
          ]
        }).then(async function(result) {
          if (result === "remove") {
            ctx.actions.dropScene(scene.id);
            render();
            return;
          }
          if (result === "save") {
            await ctx.actions.saveScene(Object.assign({}, scene, { light }));
            await ctx.actions.switchScene(scene.id);
            render();
          }
        });
      }
      function render() {
        var s = state.get();
        clear(row);
        if (!s.scenes.length) {
          row.appendChild(emptyState("还没有场景", "上传一张背景图，或者直接用夜色渐变。"));
          return;
        }
        s.scenes.forEach(function(scene) {
          var src = resolveAssetSrc(scene.ref, { assets: s.assets });
          var media = h("div", {
            class: "oc-scenecard__media",
            style: src ? 'background-image:url("' + src.replace(/"/g, "%22") + '")' : "background:linear-gradient(160deg," + scene.tint + ", #080b11)"
          }, src ? [] : [h("span", { class: "oc-card__ph", text: "夜色渐变" })]);
          var card = h("div", {
            class: "oc-scenecard" + (scene.id === s.sceneId ? " is-active" : ""),
            onclick: function() {
              ctx.actions.switchScene(scene.id);
            }
          }, [
            media,
            h("div", { class: "oc-scenecard__meta" }, [
              h("span", { class: "oc-scenecard__name", text: scene.name }),
              h("span", { class: "oc-scenecard__weather", text: scene.weather || "夜" }),
              h("button", {
                class: "oc-iconbtn",
                type: "button",
                "aria-label": "编辑",
                onclick: function(e) {
                  e.stopPropagation();
                  editScene(scene);
                }
              }, [icon("edit")])
            ])
          ]);
          row.appendChild(card);
        });
      }
      var unsubscribe = state.subscribe(function(s, keys) {
        if (keys.indexOf("scenes") !== -1 || keys.indexOf("sceneId") !== -1 || keys.indexOf("assets") !== -1) render();
      });
      render();
      return {
        destroy: function() {
          unsubscribe();
          clear(row);
        }
      };
    }
  };

  // src/ui/views/focus.js
  var focus_default = {
    mount: function(body, ctx) {
      var state = ctx.state;
      var ring = h("div", { class: "oc-bigring" });
      var roundEl = h("div", { class: "oc-bigring__round" });
      var timeEl = h("div", { class: "oc-bigring__time" });
      var taskEl = h("div", { class: "oc-bigring__task" });
      ring.appendChild(h("div", { class: "oc-bigring__inner" }, [roundEl, timeEl, taskEl]));
      var mainBtn = h("button", { class: "oc-btn oc-btn--primary", type: "button" });
      var subBtn = h("button", { class: "oc-btn oc-btn--ghost", type: "button" });
      var actions = h("div", { class: "oc-focusview__actions" }, [mainBtn, subBtn]);
      var taskInput = textInput(state.get().settings.taskLabel, "这一轮要做什么", 40);
      taskInput.addEventListener("change", function() {
        ctx.actions.saveSettings({ taskLabel: String(taskInput.value || "").trim() });
      });
      var root = h("div", { class: "oc-focusview" }, [
        ring,
        actions,
        h("div", { style: "width:100%;max-width:300px;margin-top:14px" }, [
          field("这一轮的任务", taskInput, "写具体一点，结算时会一起记进回忆。")
        ])
      ]);
      body.appendChild(root);
      mainBtn.addEventListener("click", function() {
        var s = state.get();
        var sess = s.session;
        if (!sess || sess.status === STATUS.DONE) {
          if (sess && sess.status === STATUS.DONE) ctx.actions.discardSession();
          ctx.actions.startFocus();
          render();
          return;
        }
        if (sess.status === STATUS.RUNNING) {
          ctx.actions.pauseFocus();
        } else if (sess.status === STATUS.PAUSED) {
          ctx.actions.resumeFocus();
        }
        render();
      });
      subBtn.addEventListener("click", function() {
        var s = state.get();
        var sess = s.session;
        if (sess && sess.status === STATUS.DONE) {
          if (s.nextSession) ctx.actions.nextRoundNow();
          else ctx.actions.discardSession();
          render();
          return;
        }
        if (!sess) {
          ctx.host.ui.toast("先点开始，再谈放弃");
          return;
        }
        ctx.host.ui.confirm({ title: "中止这一轮？", message: "这一轮不会记进回忆。" }).then(function(ok) {
          if (!ok) return;
          ctx.actions.abortFocus();
          render();
        });
      });
      function render() {
        var s = state.get();
        var sess = s.session;
        var now = s.now;
        if (!sess) {
          roundEl.textContent = "READY";
          timeEl.textContent = fmtClockLong(s.settings.focusMinutes * 6e4);
          taskEl.textContent = s.settings.taskLabel || "未设定任务";
          ring.style.setProperty("--oc-progress", "0");
          mainBtn.textContent = "开始专注";
          subBtn.textContent = "共 " + s.settings.focusRounds + " 轮";
          subBtn.disabled = true;
          return;
        }
        var progress = progressOf(sess, now);
        ring.style.setProperty("--oc-progress", String(progress));
        roundEl.textContent = (sess.kind === "break" ? "BREAK" : "ROUND") + " " + sess.round + " / " + sess.rounds;
        timeEl.textContent = fmtClock(remainingOf(sess, now));
        taskEl.textContent = sess.taskLabel || "未设定任务";
        if (sess.status === STATUS.RUNNING) {
          mainBtn.textContent = "暂停";
          subBtn.textContent = "中止";
          subBtn.disabled = false;
        } else if (sess.status === STATUS.PAUSED) {
          mainBtn.textContent = "继续";
          subBtn.textContent = "中止";
          subBtn.disabled = false;
        } else {
          mainBtn.textContent = s.nextSession ? "开始下一轮" : "再来一轮";
          subBtn.textContent = s.nextSession ? "休息 " + s.settings.breakMinutes + " 分钟" : "结束";
          subBtn.disabled = false;
          timeEl.textContent = "00:00";
          roundEl.textContent = s.nextSession ? s.nextSession.kind === "break" ? "BREAK NEXT" : "ROUND " + s.nextSession.round : "COMPLETE";
          taskEl.textContent = s.nextSession ? s.nextSession.kind === "break" ? "先休息一下" : "下一轮：第 " + s.nextSession.round + " 轮" : "这一轮结束了";
        }
      }
      var unsubscribe = state.subscribe(function(s, keys) {
        if (keys.indexOf("session") !== -1 || keys.indexOf("settings") !== -1 || keys.indexOf("vitals") !== -1 || keys.indexOf("now") !== -1) render();
      });
      render();
      return {
        destroy: function() {
          unsubscribe();
          clear(root);
        }
      };
    }
  };

  // src/ui/views/props.js
  var ICON_GLYPH = { flower: "❀", book: "❖", candy: "✦", star: "✧", tea: "☾" };
  function glyphOf(icon2) {
    return ICON_GLYPH[icon2] || ICON_GLYPH.flower;
  }
  var props_default = {
    mount: function(body, ctx) {
      var state = ctx.state;
      var listBox = h("div", { class: "oc-list" });
      var head = h("div", { style: "display:flex;align-items:center;gap:8px;padding:0 0 10px" }, [
        h("span", { class: "oc-eyebrow", text: "道具库" }),
        h(
          "div",
          { style: "margin-left:auto" },
          button("新增礼物", { icon: "plus", onClick: function() {
            editProp(null);
          } })
        )
      ]);
      body.appendChild(head);
      body.appendChild(listBox);
      function editProp(prop) {
        var draft = prop ? Object.assign({}, prop) : { name: "", icon: "flower", lines: [], ref: "" };
        var nameInput = textInput(draft.name, "礼物名字", 14);
        var linesArea = textArea((draft.lines || []).join("\n"), "一行一句，收到礼物时随机说一句", 3);
        var urlInput = textInput(draft.ref && /^url:/.test(draft.ref) ? draft.ref.slice(4) : "", "可选：图片外链", 300);
        var iconPicker = segmented(PROP_ICONS.map(function(p) {
          return { id: p.id, name: p.name };
        }), draft.icon, function(id) {
          draft.icon = id;
        });
        dialog({
          title: prop ? "编辑礼物" : "新增礼物",
          body: h("div", {}, [
            field("名字", nameInput),
            field("图标", iconPicker),
            field("收到时说的话", linesArea, "不填就用通用台词。"),
            field("图片外链", urlInput, "有图会盖住图标。")
          ]),
          actions: [
            prop ? { label: "删除", value: "remove", variant: "danger" } : { label: "取消", value: false },
            { label: "保存", value: "ok", variant: "primary" }
          ]
        }).then(async function(result) {
          if (result === "remove" && prop) {
            ctx.actions.dropProp(prop.id);
            render();
            return;
          }
          if (result !== "ok") return;
          var url = String(urlInput.value || "").trim();
          var lines = String(linesArea.value || "").split("\n").map(function(s) {
            return s.trim();
          }).filter(Boolean);
          await ctx.actions.saveProp({
            id: draft.id || void 0,
            name: String(nameInput.value || "").trim(),
            icon: draft.icon,
            lines,
            ref: /^https?:\/\//i.test(url) ? url : draft.ref || ""
          });
          render();
          ctx.host.ui.toast("已保存");
        });
      }
      function render() {
        var s = state.get();
        clear(listBox);
        if (!s.props.length) {
          listBox.style.padding = "0";
          listBox.style.border = "none";
          listBox.style.background = "none";
          listBox.appendChild(emptyState(
            "还没有准备礼物",
            "加一件小东西，送出去会涨好感，也会留一条回忆。",
            button("新增礼物", { variant: "primary", icon: "plus", onClick: function() {
              editProp(null);
            } })
          ));
          return;
        }
        listBox.style.padding = "2px 12px";
        listBox.style.border = "1px solid var(--oc-line-soft)";
        listBox.style.background = "rgba(255,255,255,.025)";
        s.props.forEach(function(prop) {
          var src = resolveAssetSrc(prop.ref, { assets: s.assets });
          var iconBox = h("div", { class: "oc-prop__icon" }, [
            src ? h("img", { src, alt: "", loading: "lazy" }) : h("span", { text: glyphOf(prop.icon) })
          ]);
          listBox.appendChild(h("div", { class: "oc-prop" }, [
            iconBox,
            h("div", { class: "oc-prop__main" }, [
              h("div", { class: "oc-prop__name", text: prop.name }),
              h("div", { class: "oc-prop__sub", text: prop.lines[0] || refLabel(prop.ref, "说出的话随机") })
            ]),
            prop.given ? h("span", { class: "oc-prop__given", text: "已送 " + prop.given }) : null,
            button("送出", {
              variant: "primary",
              onClick: function() {
                ctx.actions.gift(prop.id);
                render();
              }
            }),
            h("button", {
              class: "oc-iconbtn",
              type: "button",
              "aria-label": "编辑",
              onclick: function() {
                editProp(prop);
              }
            }, [h("span", { class: "oc-icon", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4.5 19.5h4L19 9a2.1 2.1 0 0 0-3-3L5.5 16.5z"/></svg>' })])
          ]));
        });
      }
      var unsubscribe = state.subscribe(function(s, keys) {
        if (keys.indexOf("props") !== -1 || keys.indexOf("assets") !== -1) render();
      });
      render();
      return {
        destroy: function() {
          unsubscribe();
          clear(listBox);
        }
      };
    }
  };

  // src/ui/views/logs.js
  var logs_default = {
    mount: function(body, ctx) {
      var state = ctx.state;
      var wrap = h("div", {});
      body.appendChild(wrap);
      function render() {
        var s = state.get();
        clear(wrap);
        var groups = groupByDay(s.logs);
        if (!groups.length) {
          wrap.appendChild(emptyState("还没有日志", "点点他、说说话、做一轮专注，这里就会长长起来。"));
          return;
        }
        var today = s.vitals.day;
        groups.forEach(function(group) {
          wrap.appendChild(h("div", { class: "oc-daylabel", text: dayLabel(group.day, today) }));
          var line = h("div", { class: "oc-timeline" });
          group.items.forEach(function(item) {
            line.appendChild(h("div", { class: "oc-logitem" }, [
              h("div", { class: "oc-logitem__meta" }, [
                h("span", { text: fmtTime(item.at) }),
                h("span", { text: logKindLabel(item.kind) })
              ]),
              h("div", { class: "oc-logitem__text", text: item.text })
            ]));
          });
          wrap.appendChild(line);
        });
      }
      var unsubscribe = state.subscribe(function(s, keys) {
        if (keys.indexOf("logs") !== -1 || keys.indexOf("vitals") !== -1) render();
      });
      render();
      return {
        destroy: function() {
          unsubscribe();
          clear(wrap);
        }
      };
    }
  };

  // src/ui/views/memories.js
  var memories_default = {
    mount: function(body, ctx) {
      var state = ctx.state;
      var wrap = h("div", {});
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
        var src = scene ? resolveAssetSrc(scene.ref, { assets: s.assets }) : "";
        var shot = src ? h("div", {
          style: 'aspect-ratio:4/3;border-radius:12px;margin-bottom:12px;background-size:cover;background-position:center;background-image:url("' + src.replace(/"/g, "%22") + '")'
        }) : h("div", {
          style: "aspect-ratio:4/3;border-radius:12px;margin-bottom:12px;background:linear-gradient(160deg," + (memory.tint || "#121722") + ",#080b11)"
        });
        dialog({
          title: memory.title,
          body: h("div", {}, [
            shot,
            h("div", { class: "oc-row__sub", text: fmtDateTime(memory.at) + " · " + memoryKindLabel(memory.kind) }),
            h("p", { style: "font-size:12.5px;line-height:1.8;margin:10px 0 0", text: memory.text || "（没有留下字）" })
          ]),
          actions: [
            { label: "删除这条", value: "remove", variant: "danger" },
            { label: "关闭", value: false, variant: "primary" }
          ]
        }).then(function(result) {
          if (result !== "remove") return;
          ctx.actions.removeMemory(memory.id);
          render();
        });
      }
      function render() {
        var s = state.get();
        clear(wrap);
        if (!s.memories.length) {
          wrap.style.padding = "0";
          wrap.appendChild(emptyState(
            "还没有回忆",
            "完成一轮专注、送出一件礼物，重要的时刻会自动留在这里。"
          ));
          return;
        }
        var grid = h("div", { class: "oc-cards" });
        s.memories.forEach(function(memory) {
          var scene = findByRef(memory.sceneRef, s.scenes);
          var src = scene ? resolveAssetSrc(scene.ref, { assets: s.assets }) : "";
          var media = h("div", {
            class: "oc-memocard__media",
            style: src ? 'background-image:url("' + src.replace(/"/g, "%22") + '")' : "background:linear-gradient(160deg," + (memory.tint || "#121722") + ",#080b11)"
          }, src ? [] : [h("span", { text: memoryKindLabel(memory.kind) })]);
          grid.appendChild(h("div", {
            class: "oc-memocard",
            onclick: function() {
              open(memory);
            }
          }, [
            media,
            h("div", { class: "oc-memocard__body" }, [
              h("div", { class: "oc-memocard__title", text: memory.title }),
              h("div", { class: "oc-memocard__text", text: memory.text }),
              h("div", { class: "oc-memocard__day", text: fmtDateTime(memory.at) })
            ])
          ]));
        });
        wrap.appendChild(grid);
      }
      var unsubscribe = state.subscribe(function(s, keys) {
        if (keys.indexOf("memories") !== -1 || keys.indexOf("assets") !== -1) render();
      });
      render();
      return {
        destroy: function() {
          unsubscribe();
          clear(wrap);
        }
      };
    }
  };

  // src/ui/views/settings.js
  function section(title, children) {
    return h("div", { class: "oc-section" }, [
      title ? h("div", { class: "oc-section__title", text: title }) : null,
      h("div", { class: "oc-list" }, children)
    ]);
  }
  var settings_default = {
    mount: function(body, ctx) {
      var state = ctx.state;
      var wrap = h("div", {});
      var importInput = h("input", {
        type: "file",
        accept: ".json,application/json",
        style: "display:none",
        onchange: function(e) {
          var file = e.target.files && e.target.files[0];
          e.target.value = "";
          if (!file) return;
          var reader = new FileReader();
          reader.onload = function() {
            try {
              var payload = JSON.parse(String(reader.result || "{}"));
              ctx.actions.importAll(payload).then(function() {
                ctx.host.ui.toast("已导入");
                render();
              }).catch(function() {
                ctx.host.ui.toast("导入失败：文件格式不对");
              });
            } catch (err) {
              ctx.host.ui.toast("导入失败：不是有效的 JSON");
            }
          };
          reader.readAsText(file);
        }
      });
      body.appendChild(importInput);
      body.appendChild(wrap);
      function editZone(zone) {
        var draft = normalizeZone(zone || {});
        var nameInput = textInput(draft.name, "部位名字", 12);
        var linesArea = textArea(draft.lines.join("\n"), "一行一句，点这个部位时随机说", 4);
        var promptArea = textArea(draft.prompt, "这个部位的补充设定，例如「怕痒」", 2);
        var useAI = draft.useAI;
        var cooldown = draft.cooldownSec;
        var aiSwitch = switchRow("让 AI 即兴回一句", "关闭则只用上面的台词库", useAI, function(v) {
          useAI = v;
        });
        var cooldownRow = stepperRow("冷却", "同一处连点不会刷屏", cooldown, [0, 60], 1, function(v) {
          return v + " 秒";
        }, function(v) {
          cooldown = v;
        });
        dialog({
          title: zone ? "编辑热区" : "新增热区",
          body: h("div", {}, [
            field("名字", nameInput),
            field("台词库", linesArea),
            field("补充设定", promptArea),
            h("div", { class: "oc-list" }, [aiSwitch, cooldownRow])
          ]),
          actions: [
            zone ? { label: "删除", value: "remove", variant: "danger" } : { label: "取消", value: false },
            { label: "保存", value: "ok", variant: "primary" }
          ]
        }).then(function(result) {
          if (result === "remove" && zone) {
            ctx.actions.dropZone(zone.id);
            render();
            return;
          }
          if (result !== "ok") return;
          ctx.actions.saveZone(normalizeZone({
            id: draft.id,
            name: String(nameInput.value || "").trim(),
            lines: String(linesArea.value || "").split("\n").map(function(s) {
              return s.trim();
            }).filter(Boolean),
            prompt: String(promptArea.value || "").trim(),
            useAI,
            cooldownSec: cooldown,
            x: draft.x,
            y: draft.y,
            w: draft.w,
            h: draft.h,
            shape: draft.shape
          }));
          render();
          ctx.host.ui.toast("热区已保存");
        });
      }
      function editZonePosition(zone) {
        var draft = normalizeZone(zone);
        var bodyEl = h("div", {});
        var preview = h("div", {
          style: "position:relative;aspect-ratio:1;border-radius:12px;border:1px solid var(--oc-line-soft);background:rgba(255,255,255,.03);margin-bottom:6px;overflow:hidden"
        });
        var box = h("div", {
          style: "position:absolute;border:1px solid rgba(232,201,138,.7);background:rgba(232,201,138,.14);border-radius:4px"
        });
        preview.appendChild(box);
        function paint() {
          box.style.left = draft.x * 100 + "%";
          box.style.top = draft.y * 100 + "%";
          box.style.width = draft.w * 100 + "%";
          box.style.height = draft.h * 100 + "%";
        }
        bodyEl.appendChild(preview);
        bodyEl.appendChild(sliderRow("横向位置", "", draft.x * 100, 0, 100, 1, function(v) {
          return Math.round(v) + "%";
        }, function(v) {
          draft.x = v / 100;
          paint();
        }));
        bodyEl.appendChild(sliderRow("纵向位置", "顶部为 0%，头部大约在 8–25%", draft.y * 100, 0, 100, 1, function(v) {
          return Math.round(v) + "%";
        }, function(v) {
          draft.y = v / 100;
          paint();
        }));
        bodyEl.appendChild(sliderRow("宽度", "", draft.w * 100, 2, 100, 1, function(v) {
          return Math.round(v) + "%";
        }, function(v) {
          draft.w = v / 100;
          paint();
        }));
        bodyEl.appendChild(sliderRow("高度", "", draft.h * 100, 2, 100, 1, function(v) {
          return Math.round(v) + "%";
        }, function(v) {
          draft.h = v / 100;
          paint();
        }));
        paint();
        dialog({
          title: "「" + draft.name + "」的位置",
          body: bodyEl,
          actions: [
            { label: "取消", value: false },
            { label: "保存位置", value: "ok", variant: "primary" }
          ]
        }).then(function(result) {
          if (result !== "ok") return;
          ctx.actions.saveZone(draft);
          render();
        });
      }
      function exportDialog() {
        ctx.actions.exportAll().then(function(payload) {
          var json = JSON.stringify(payload);
          var area = h("textarea", {
            class: "oc-input oc-textarea",
            rows: "8",
            readonly: true,
            style: "font-family:ui-monospace,Consolas,monospace;font-size:10.5px"
          });
          area.value = json;
          dialog({
            title: "导出数据",
            body: h("div", {}, [
              h("p", { class: "oc-row__sub", text: "包含设置、衣装、场景、日志、回忆与本地图片，约 " + Math.round(json.length / 1024) + " KB。" }),
              area
            ]),
            actions: [
              { label: "全选", value: "select" },
              { label: "复制", value: "copy", variant: "primary" }
            ]
          }).then(function(result) {
            if (result === "select") {
              area.focus();
              area.select();
              return;
            }
            if (result === "copy") {
              if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(json).then(function() {
                  ctx.host.ui.toast("已复制到剪贴板");
                }).catch(function() {
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
        var nameInput = textInput(st.charName, s.character ? "留空则用「" + s.character.name + "」" : "他", 16);
        nameInput.addEventListener("change", function() {
          ctx.actions.saveSettings({ charName: String(nameInput.value || "").trim() });
        });
        var titleInput = textInput(st.title, "一行称号", 24);
        titleInput.addEventListener("change", function() {
          ctx.actions.saveSettings({ title: String(titleInput.value || "").trim() });
        });
        var poemInput = textInput(st.poem, "右侧竖排的一句话", 48);
        poemInput.addEventListener("change", function() {
          ctx.actions.saveSettings({ poem: String(poemInput.value || "").trim() });
        });
        wrap.appendChild(section("角色", [
          h("div", { style: "padding:10px 0" }, [
            field("名字", nameInput),
            field("称号", titleInput),
            field("诗句", poemInput)
          ]),
          switchRow("显示诗句", "右侧竖排的那一行", st.showPoem, function(v) {
            ctx.actions.saveSettings({ showPoem: v });
            render();
          }),
          switchRow("AI 对话", "关闭后点触只用本地台词", st.aiEnabled, function(v) {
            ctx.actions.saveSettings({ aiEnabled: v });
            render();
          }),
          h("div", { style: "padding:10px 0" }, [
            field("语气", segmented(Object.keys(TONE_LABELS).map(function(k) {
              return { id: k, name: { gentle: "温柔", playful: "轻佻", cool: "克制" }[k] || k };
            }), st.aiTone, function(id) {
              ctx.actions.saveSettings({ aiTone: id });
            }))
          ])
        ]));
        wrap.appendChild(section("舞台", [
          sliderRow("脖子分界线", "往上切得多，头部动的范围就大", st.neck * 100, 12, 90, 1, function(v) {
            return Math.round(v) + "%";
          }, function(v) {
            ctx.actions.saveSettings({ neck: v / 100 });
          }),
          sliderRow("动态幅度", "呼吸、摇摆、视线跟随的整体强度", st.motionScale * 100, 0, 180, 5, function(v) {
            return Math.round(v) + "%";
          }, function(v) {
            ctx.actions.saveSettings({ motionScale: v / 100 });
          }),
          sliderRow("视线锚点 X", "头部中心的横向位置", st.anchorX * 100, 10, 90, 1, function(v) {
            return Math.round(v) + "%";
          }, function(v) {
            ctx.actions.saveSettings({ anchorX: v / 100 });
          }),
          sliderRow("视线锚点 Y", "头部中心的纵向位置", st.anchorY * 100, 5, 60, 1, function(v) {
            return Math.round(v) + "%";
          }, function(v) {
            ctx.actions.saveSettings({ anchorY: v / 100 });
          }),
          switchRow("呼吸与摇摆", "关掉就完全静止", st.breath, function(v) {
            ctx.actions.saveSettings({ breath: v });
            render();
          }),
          switchRow("视线跟随", "指针移动时人物跟着轻轻偏头", st.lookFollow, function(v) {
            ctx.actions.saveSettings({ lookFollow: v });
            render();
          })
        ]));
        wrap.appendChild(section("专注", [
          stepperRow("每轮时长", "", st.focusMinutes, FOCUS.minutes, 5, function(v) {
            return v + " 分钟";
          }, function(v) {
            ctx.actions.saveSettings({ focusMinutes: v });
          }),
          stepperRow("每轮组数", "完成一轮算一次默契", st.focusRounds, FOCUS.rounds, 1, function(v) {
            return v + " 轮";
          }, function(v) {
            ctx.actions.saveSettings({ focusRounds: v });
          }),
          stepperRow("组间休息", "", st.breakMinutes, FOCUS.breakMinutes, 1, function(v) {
            return v + " 分钟";
          }, function(v) {
            ctx.actions.saveSettings({ breakMinutes: v });
          }),
          stepperRow("能量上限", "超过这个值不再累积", st.energyMax, [20, 200], 10, function(v) {
            return String(v);
          }, function(v) {
            ctx.actions.saveSettings({ energyMax: v });
          })
        ]));
        var zoneRows = [h(
          "div",
          { style: "padding:8px 0" },
          button("新增热区", { icon: "plus", onClick: function() {
            editZone(null);
          } })
        )];
        s.zones.forEach(function(zone) {
          zoneRows.push(h("div", { class: "oc-row" }, [
            h("div", { class: "oc-row__main" }, [
              h("div", { class: "oc-row__title", text: zone.name }),
              h("div", { class: "oc-row__sub", text: "台词 " + zone.lines.length + " 句 · " + (zone.useAI ? "AI 即兴" : "只用台词库") + " · 冷却 " + zone.cooldownSec + "s" })
            ]),
            button("位置", {
              variant: "ghost",
              onClick: function() {
                editZonePosition(zone);
              }
            }),
            button("编辑", {
              onClick: function() {
                editZone(zone);
              }
            })
          ]));
        });
        wrap.appendChild(section("点触热区", zoneRows));
        wrap.appendChild(section("数据", [
          h("div", { style: "display:flex;gap:8px;flex-wrap:wrap;padding:10px 0" }, [
            button("导出", { icon: "upload", onClick: exportDialog }),
            button("导入", { icon: "link", variant: "ghost", onClick: function() {
              importInput.click();
            } }),
            button("清空全部", {
              variant: "danger",
              onClick: function() {
                ctx.host.ui.confirm({
                  title: "清空全部数据？",
                  message: "设置、衣装、场景、礼物、日志、回忆都会删掉，无法恢复。"
                }).then(function(ok) {
                  if (!ok) return;
                  ctx.actions.resetAll().then(function() {
                    ctx.host.ui.toast("已清空");
                    render();
                  });
                });
              }
            })
          ])
        ]));
        wrap.appendChild(h("p", {
          style: "text-align:center;font-size:9.5px;letter-spacing:.16em;color:var(--oc-text-3);margin:18px 0 4px;font-family:var(--oc-sans)",
          text: "OTOME COMPANION v0.1.0"
        }));
      }
      var unsubscribe = state.subscribe(function(s, keys) {
        if (keys.indexOf("settings") !== -1 || keys.indexOf("zones") !== -1) render();
      });
      render();
      return {
        destroy: function() {
          unsubscribe();
          clear(wrap);
        }
      };
    }
  };

  // src/app/shell.js
  var SHEETS = {
    chat: { title: "通讯", sub: "CHAT", view: chat_default },
    wardrobe: { title: "衣装", sub: "WARDROBE", view: wardrobe_default },
    scene: { title: "场景", sub: "SCENE", view: scene_default },
    focus: { title: "专注", sub: "FOCUS", view: focus_default },
    props: { title: "礼物", sub: "GIFTS", view: props_default },
    settings: { title: "设置", sub: "SETTINGS", view: settings_default }
  };
  var DRAWERS = {
    logs: { title: "日志", view: logs_default },
    memories: { title: "回忆", view: memories_default }
  };
  var DOCK = [
    { id: "chat", label: "CHAT", icon: "chat", title: "通讯" },
    { id: "wardrobe", label: "WARDROBE", icon: "wardrobe", title: "衣装" },
    { id: "scene", label: "SCENE", icon: "scene", title: "场景" },
    { id: "focus", label: "FOCUS", icon: "focus", title: "专注" }
  ];
  function mountShell(container, ctx) {
    var state = ctx.state;
    var initial = state.get();
    var root = h("div", { class: "oc-root" });
    container.appendChild(root);
    container.classList.add("oc-host");
    var stage = stage_default2.mount(root, ctx);
    var scrim = h("div", {
      class: "oc-scrim",
      onclick: function() {
        closeAll();
      }
    });
    var sheetTitle = h("div", { class: "oc-sheet__title" });
    var sheetSub = h("div", { class: "oc-sheet__sub" });
    var sheetBody = h("div", { class: "oc-sheet__body" });
    var sheet = h("section", { class: "oc-sheet", "data-open": "false" }, [
      h("div", { class: "oc-sheet__handle" }),
      h("div", { class: "oc-sheet__head" }, [
        h("div", {}, [sheetTitle, sheetSub]),
        h("button", {
          class: "oc-sheet__close",
          type: "button",
          "aria-label": "关闭",
          onclick: function() {
            ctx.actions.closeSheet();
          }
        }, [icon("close")])
      ]),
      sheetBody
    ]);
    var drawerTitle = h("div", { class: "oc-drawer__title" });
    var drawerBody = h("div", { class: "oc-drawer__body" });
    var drawer = h("aside", { class: "oc-drawer", "data-open": "false" }, [
      h("div", { class: "oc-drawer__head" }, [
        drawerTitle,
        h("button", {
          class: "oc-sheet__close",
          type: "button",
          "aria-label": "关闭",
          onclick: function() {
            ctx.actions.closeDrawer();
          }
        }, [icon("close")])
      ]),
      drawerBody
    ]);
    var dockItems = DOCK.map(function(item) {
      var btn = h("button", {
        class: "oc-dock__item",
        type: "button",
        dataset: { route: item.id },
        "aria-label": item.title,
        onclick: function() {
          var s = state.get();
          if (s.sheet === item.id) ctx.actions.closeSheet();
          else ctx.actions.openSheet(item.id);
        }
      }, [
        h("span", { class: "oc-dock__ring" }, [icon(item.icon)]),
        h("span", { class: "oc-dock__label", text: item.label })
      ]);
      return btn;
    });
    var dock = h("nav", { class: "oc-dock" }, dockItems);
    root.appendChild(scrim);
    root.appendChild(sheet);
    root.appendChild(drawer);
    root.appendChild(dock);
    var currentSheet = null;
    var currentDrawer = null;
    function mountSheet(name) {
      if (currentSheet && currentSheet.destroy) currentSheet.destroy();
      currentSheet = null;
      clear(sheetBody);
      var def = SHEETS[name];
      if (!def) return;
      sheetTitle.textContent = def.title;
      sheetSub.textContent = def.sub;
      currentSheet = def.view.mount(sheetBody, ctx) || null;
    }
    function mountDrawer(name) {
      if (currentDrawer && currentDrawer.destroy) currentDrawer.destroy();
      currentDrawer = null;
      clear(drawerBody);
      var def = DRAWERS[name];
      if (!def) return;
      drawerTitle.textContent = def.title;
      currentDrawer = def.view.mount(drawerBody, ctx) || null;
    }
    function syncSheet(name) {
      if (name) {
        mountSheet(name);
        sheet.classList.add("is-open");
        sheet.setAttribute("data-open", "true");
        scrim.classList.add("is-on");
      } else {
        sheet.classList.remove("is-open");
        sheet.setAttribute("data-open", "false");
        if (!state.get().drawer) scrim.classList.remove("is-on");
        setTimeout(function() {
          if (!state.get().sheet) {
            if (currentSheet && currentSheet.destroy) currentSheet.destroy();
            currentSheet = null;
            clear(sheetBody);
          }
        }, 360);
      }
      updateDock(name);
    }
    function syncDrawer(name) {
      if (name) {
        mountDrawer(name);
        drawer.classList.add("is-open");
        drawer.setAttribute("data-open", "true");
        scrim.classList.add("is-on");
      } else {
        drawer.classList.remove("is-open");
        drawer.setAttribute("data-open", "false");
        if (!state.get().sheet) scrim.classList.remove("is-on");
        setTimeout(function() {
          if (!state.get().drawer) {
            if (currentDrawer && currentDrawer.destroy) currentDrawer.destroy();
            currentDrawer = null;
            clear(drawerBody);
          }
        }, 360);
      }
    }
    function updateDock(active) {
      dockItems.forEach(function(btn) {
        btn.classList.toggle("is-active", btn.dataset.route === active);
      });
    }
    function closeAll() {
      if (state.get().sheet) ctx.actions.closeSheet();
      if (state.get().drawer) ctx.actions.closeDrawer();
    }
    var unsubscribe = state.subscribe(function(s, keys) {
      if (keys.indexOf("sheet") !== -1) syncSheet(s.sheet);
      if (keys.indexOf("drawer") !== -1) syncDrawer(s.drawer);
    });
    if (initial.sheet) syncSheet(initial.sheet);
    if (initial.drawer) syncDrawer(initial.drawer);
    updateDock(initial.sheet);
    return {
      root,
      destroy: function() {
        unsubscribe();
        if (stage && stage.destroy) stage.destroy();
        if (currentSheet && currentSheet.destroy) currentSheet.destroy();
        if (currentDrawer && currentDrawer.destroy) currentDrawer.destroy();
        currentSheet = null;
        currentDrawer = null;
        clear(sheetBody);
        clear(drawerBody);
        root.remove();
        container.classList.remove("oc-host");
      }
    };
  }

  // src/main.js
  var STYLE_ID = "otome-companion-style";
  var CSS = [theme_default, base_default, stage_default].join("\n");
  var shell = null;
  var app = null;
  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }
  function removeStyle() {
    var style = document.getElementById(STYLE_ID);
    if (style && style.parentNode) style.parentNode.removeChild(style);
  }
  function removeOrphans() {
    var nodes = document.querySelectorAll(".oc-mask, .oc-toast");
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].parentNode) nodes[i].parentNode.removeChild(nodes[i]);
    }
  }
  async function mount(container, roche) {
    ensureStyle();
    container.classList.add("oc-host");
    var created = await createApp({ container, roche, version: "0.1.0" });
    app = created;
    shell = mountShell(container, created.ctx);
  }
  async function unmount(container) {
    if (shell) {
      shell.destroy();
      shell = null;
    }
    if (app) {
      app.destroy();
      app = null;
    }
    removeOrphans();
    container.replaceChildren();
    container.classList.remove("oc-host");
    removeStyle();
  }
  window.RochePlugin.register({
    id: "otome-companion",
    name: "乙游陪伴",
    version: "0.1.0",
    description: "立绘舞台、点触互动、陪伴与专注、衣装场景礼物、日志与回忆。",
    apps: [
      {
        id: "otome-companion-home",
        name: "夜之章",
        icon: "heart",
        iconImage: "",
        mount,
        unmount
      }
    ]
  });
})();
