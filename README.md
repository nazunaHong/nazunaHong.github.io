# 个人主页

个人主页 / 作品集，静态站点，通过 GitHub Pages 发布在
**https://nazunaHong.github.io/**

仓库名 `nazunaHong.github.io` 属于 GitHub 的「用户主页站」，因此站点直接挂在
`github.io` 根域名下，无需子路径。

## 目录结构

```
index.html     页面本体（HTML / CSS / JS 全部内联）
404.html       404 兜底页（内容同 index.html）
.nojekyll      跳过 Jekyll 处理，纯静态直出
README.md      本文件
```

发布方式是「从分支部署」：`main` 分支根目录的内容即线上内容，推送即更新，
无需 GitHub Actions。

## 本地预览

```bash
python3 -m http.server 8080
# 打开 http://localhost:8080
```

## 修改内容

所有内容都在 `index.html` 里：

- **个人信息** —— 顶部导航、Hero、`#about`、`#contact` 各段文字
- **作品集** —— `#work` 区块的 `<article>` 卡片
- **技术栈百分比** —— `#stack` 里 `data-w="95"` 这类属性
- **经历时间线** —— `#path` 区块的 `.step` 结构

改完记得同步 `404.html`（`cp index.html 404.html`），再一起提交。

## 发布

命令行方式：

```bash
git add -A
git commit -m "update site"
git push origin main
```

或在 GitHub 网页端直接编辑 / 上传文件后提交到 `main` 分支。

约 1-3 分钟生效。

## 配色

CSS 变量在 `index.html` 的 `<style>` 顶部：

| 变量 | 值 | 用途 |
|---|---|---|
| `paper` | `#f7f5f0` | 页面底色 |
| `ink` | `#14171e` | 标题文字 |
| `body` | `#3a4256` | 正文文字 |
| `muted` | `#7c7a72` | 次要文字 |
| `line` | `#e9e3d6` | 分割线 / 边框 |
| `primary` | `#2f6f5e` | 主色（墨绿） |
| `accent` | `#c97b3f` | 辅色（赭石） |

## 绑定自定义域名

仓库 → Settings → Pages → Custom domain 填域名，然后在 DNS 加：

```
CNAME  www.你的域名  →  nazunahong.github.io
A      你的域名      →  185.199.108.153
A      你的域名      →  185.199.109.153
A      你的域名      →  185.199.110.153
A      你的域名      →  185.199.111.153
```

域名生效后无需改动页面里的任何资源路径。
