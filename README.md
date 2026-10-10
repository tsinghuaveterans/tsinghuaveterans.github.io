# tsinghuaveterans.github.io

北美清华老兵足球队的静态官网，部署于 GitHub Pages：<https://tsinghuaveterans.github.io>。

## 目录

- `index.html`：页面结构与内容。
- `styles.css`：视觉样式与响应式布局。
- `script.js`：图片轮播、放大查看与侧边导航状态。
- `assets/`：页面实际引用的图片、队徽与 2026 校友杯赛程 PDF。
- `.nojekyll`：禁用 GitHub Pages 的 Jekyll 处理，按原样托管静态文件。

## 本地预览

```bash
python3 -m http.server 4173
```

然后打开 <http://localhost:4173>。

## 维护

- 新增或替换图片时，请放到 `assets/` 并同步修改 `index.html`。
- 直播和打赏目前尚未启用；取得正式的 YouTube/支付链接或二维码后，再接入外部入口。
- 站内外链均以新标签页打开。
