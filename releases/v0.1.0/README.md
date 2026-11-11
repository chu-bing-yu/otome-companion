# 乙游陪伴 · otome-companion

一个 Roche 陪伴插件：竖版全屏舞台，人物立绘站在场景里，四周叠着夜色玻璃 HUD。
上传一张立绘就能有呼吸、摇摆、视线跟随与点按回弹；配合专注、衣装、场景、礼物、日志与回忆。

## 安装

宿主 → 插件 → 添加插件，填：

```
https://raw.githubusercontent.com/chu-bing-yu/otome-companion/main/manifest.json
```

## 素材

- **人物立绘**：透明背景 PNG 最好，长边会压到 1080；也可以填图片外链。
- **背景 / 礼物图**：同上。
- 宿主没有「上传图片转 URL」的接口，本地图会压成 dataURL 存在本机，单张上限 1.5MB，超了会继续降尺寸。大图建议用外链。

## 角色动态怎么来的

单张图没有骨骼，所以用「一张图 + 一条脖子分界线 = 上下两层」：

- 呼吸：整图 `scaleY` 1.000→1.008，周期 3.6s
- 摇摆：±0.5°，周期 9.2s
- 视线跟随：指针相对头部锚点的偏移 → 最大 4px 位移 + 0.4° 倾角，250ms 指数趋近，松手 1.2s 缓慢回正
- 分层：上半身幅度 ×1.6、相位滞后，下半身 ×0.35，制造相对位移
- 点按：非均匀缩放压扁 3% 后回弹 320ms，触点扩散淡金光晕
- 眨眼：单图不做假眼皮，需要真正的闭眼层，接口已预留

设置里可以调脖子线位置、动态幅度、视线锚点、是否跟随。

## AI

角色回复里的指令：

```
[[oc:motion:wave]]          动作：idle / wave / nod / shy / lean / turn
[[oc:expr:smile]]           表情：calm / smile / shy / sad / surprise
[[oc:affinity:+1]]          好感 ±1
[[oc:energy:+2]]            能量 ±3
```

只认白名单，非法指令整条丢弃，正文里不会残留。AI 不可用、超时或关闭时自动回退本地台词，不弹错。

## 开发

```bash
npm run build      # 构建 + 归档到 releases/vX.Y.Z
npm run test       # node --test
npm run preview    # 本地预览（dev/preview.html）
npm run ship       # build + test + deploy
npm run releases   # 列出所有归档
npm run rollback -- 0.1.0          # 用旧产物回退，版本号自动 +1
```

## 发布与回滚

- 每次发布必须递增版本号，否则宿主判定「已最新」不更新。
- `build.mjs` 会把 `plugin.js / manifest.json / README.md` 归档到 `releases/vX.Y.Z/`。
- `rollback.mjs` 只替换这三件产物并改写内嵌版本号，`src/` 不动；之后 `npm run build` 会回到当前源码状态。
- `dev/release.ps1` 会 build → test → commit → push → 打 tag。
