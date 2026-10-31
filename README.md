# 个人主页 · GitHub Pages

一个零依赖的静态个人主页，使用 GitHub Pages 发布。

## 本地预览

直接用浏览器打开 `index.html` 即可，或启动一个本地静态服务器：

```bash
npx serve .
# 或
python -m http.server 8000
```

## 目录结构

```
.
├── index.html              # 首页（单页结构）
├── 404.html                # 404 页面（样式内联，可适配任意路径）
├── .nojekyll               # 禁用 Jekyll 处理
├── assets/
│   ├── style.css           # 全部样式
│   └── main.js             # 交互脚本
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Actions 自动部署到 Pages
```

## 发布到 GitHub Pages

### 方式一：GitHub Actions（推荐）

1. 推送本目录到 GitHub 仓库的 `main` 分支。
2. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
3. `.github/workflows/deploy.yml` 会自动构建并发布，无需手动操作。

> 工作流使用 `actions/configure-pages@v5` 与 `actions/deploy-pages@v4`，
> 部署无需任何密钥。

### 方式二：从分支直接部署

1. 推送本目录到 `main` 分支。
2. 仓库 **Settings → Pages → Build and deployment → Source** 选择
   **Deploy from a branch**，分支选 `main`，目录选 `/ (root)`。

## 自定义内容

所有可替换内容集中在 `index.html`：

- 标题与 SEO：`<title>`、`<meta name="description">`
- 个人信息：`#about` 区块的「快速事实」列表
- 项目：`#work` 区块中的三个 `.project` 卡片
- 技能与百分比：`#skills` 区块（百分比同时用于进度条宽度）
- 联系方式：`#contact` 区块中的 `.contact-card` 链接

深色模式跟随系统 `prefers-color-scheme`，无需手动切换。
