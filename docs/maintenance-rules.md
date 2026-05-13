# 博客长期维护规则

本文档是博客的"宪法"。我和 Claude Code 以后修改站点时，先读这份文档。

## 目录

- [1. 导航规则](#1-导航规则)
- [2. 图片规则](#2-图片规则)
- [3. 页面规则](#3-页面规则)
- [4. CSS 规则](#4-css-规则)
- [5. 评论区规则](#5-评论区规则)
- [6. 项目页规则](#6-项目页规则)
- [7. 资源页规则](#7-资源页规则)
- [8. 提交规则](#8-提交规则)

---

## 1. 导航规则

### 当前结构

```yaml
menu:
  首页: / || fas fa-home
  文章: /archives/ || fas fa-archive
  资源: /anime/ || fas fa-tv
  关于:
    关于我: /about/ || fas fa-user
    实验项目: /projects/ || fas fa-code
    MBTI : https://mbti-flame-ten.vercel.app/ || fas fa-brain
    博主日常: /blog-daily/ || fas fa-feather-alt
    留言板: /message/ || fas fa-comment-dots
```

### 规则

| 规则 | 说明 |
|------|------|
| 一级导航 ≤ 4 项 | 保持简洁。当前：首页 / 文章 / 资源 / 关于 |
| 个人向入口归入"关于" | 项目、日常、留言板、博主日常等放在二级菜单 |
| MBTI 可直达 | "关于"→MBTI 外链直达，同时保留在 `/projects/` 页面中 |
| 不删除已有页面 | 友链 `/link/`、站点记录 `/site-log/` 页面保留，只是暂时不放入导航 |
| 分类/标签不放导航 | 已通过侧边栏卡片提供入口 |
| 不滥用二级菜单 | "关于"已收纳 5 项，不要再往里塞一级入口 |

### 禁止

- ❌ 不要为了精简导航而删除已有页面文件
- ❌ 不要在一级导航放外链（MBTI 放在二级）
- ❌ 不要把个人向入口（日常、留言）放在一级导航

---

## 2. 图片规则

### 规范

| 位置 | 格式 | 大小上限 |
|------|------|:--:|
| 文章封面 | WebP | 200KB |
| 首页头图 | WebP | 500KB |
| 背景图 | WebP | 500KB |
| 文章内图片 | WebP | 500KB |
| 看板娘立绘 | PNG/WebP | 300KB |

### 规则

| 规则 | 说明 |
|------|------|
| WebP 优先 | 所有新图片用 WebP，PNG 只在需要透明通道时使用 |
| JPG 要压缩 | 存量 JPG 慢慢替换为 WebP |
| 不放原图到 source | `wallpaper-assets/` 等原图目录放在 `source/` 之外或 .gitignore |
| 路径统一 | 文章封面 `/img/文章/xxx.webp`，通用图 `/img/xxx.webp` |

### 大文件排查

```bash
find public/ -type f -size +500k -exec ls -lh {} \;
find source/img -type f -size +500k -exec ls -lh {} \; 2>/dev/null
```

### 禁止

- ❌ **不能只删 `public/` 中的大文件** — `public/` 是构建产物，必须找到 `source/` 中的源文件处理
- ❌ 不要在 `source/img` 下放未压缩的 PNG/JPG 原图
- ❌ 不要保留 `backup`、`保存`、`assets` 等临时目录在 `source/img` 中

---

## 3. 页面规则

### 现有页面清单

| 页面 | 文件路径 | 类型 | 评论 |
|------|----------|------|:--:|
| 首页 | `source/index.md`（不存在，由 Hexo 生成） | index | - |
| 文章归档 | 自动生成 | archive | - |
| 分类 | `source/categories/index.md` | categories | ❌ |
| 标签 | `source/tags/index.md` | tags | ❌ |
| 关于 | `source/about/index.md` | about | ❌ |
| 资源汇总 | `source/anime/index.md` | anime | ❌ |
| 实验项目 | `source/projects/index.md` | projects | ❌ |
| 友链 | `source/link/index.md` | link | ❌ |
| 留言板 | `source/message/index.md` | message | ✅ |
| 站点记录 | `source/site-log/index.md` | site-log | ❌ |
| 博主日常 | 由 `scripts/blog-daily-generator.js` 生成 | 自定义 | — |

### 规则

| 规则 | 说明 |
|------|------|
| 不删除已有页面 | 即使从导航移除，页面文件保留，URL 可直访 |
| 不破坏 URL | 已有页面的 permalink 不要改，避免外链失效 |
| 新页面用合适 type | about/page/link/projects/anime 等，匹配 Butterfly 模板 |
| 首页不改主题源码 | 用 `scripts/home-hero.js` 的 `after_render:html` filter 注入 Hero 和精选阅读 |
| 博主日常用脚本生成 | 不要改主题主题的 `blog-daily.pug`，通过 generator 脚本维护 |

### 禁止

- ❌ 不要创建 `source/index.md` 来覆盖首页（会丢失文章列表）
- ❌ 不要在 `_posts/` 目录之外放文章

---

## 4. CSS 规则

### 文件

- **唯一入口**：`source/css/custom.css`（~4477 行，21 个编号分区）
- **注入方式**：`_config.butterfly.yml` → `inject.head`

### 规则

| 规则 | 说明 |
|------|------|
| 只追加，不删除 | 不在 custom.css 中间删除或重排已有样式 |
| 新模块追加到末尾 | 用 `/* ==== NN. Name ==== */` 格式分区 |
| 声明顺序 | 变量 → 桌面端样式 → 移动端 `@media` → 暗色模式 `[data-theme="dark"]` |
| 移动端断点 | `900px`（平板）、`768px`（手机横屏）、`600px`（手机竖屏）、`480px`（小屏） |
| 复用变量 | 优先用 `--fu-*`（已有体系）和 `--fg-*`（FG 组件体系） |
| 不重命名 class | 被 `home-hero.js`、`anime/index.md`、`about/index.md` 使用的 class 名不能改 |
| 不引入 JS 依赖 | 纯 CSS 实现 |

### 禁止

- ❌ 不修改 `themes/butterfly/` 下的任何文件
- ❌ 不引入新的 CSS 库或框架
- ❌ 不要大面积重写或"重构" custom.css

---

## 5. 评论区规则

### 评论开关矩阵

| 页面类型 | 评论 | front-matter |
|----------|:--:|------|
| 文章页 (`_posts/`) | ✅ 开启 | `comments: true` 或省略 |
| 留言板 | ✅ 开启 | `comments: true` |
| 关于 / 资源汇总 / 实验项目 / 友链 / 站点记录 | ❌ 关闭 | `comments: false` |
| 分类 / 标签 | ❌ 关闭 | `comments: false` |
| 博主日常 | 按需 | 生成时决定 |

### 规则

| 规则 | 说明 |
|------|------|
| 非互动页面关闭评论 | about、anime、projects、link、site-log 评论关闭 |
| Waline 懒加载 | `_config.butterfly.yml` 中 `comments.lazyload: true` |
| 不隐藏 Waline 登录 | 已通过 custom.css 隐藏（`#09 Waline 评论区优化`） |
| 服务端 | `https://12-ashen-three.vercel.app` |

---

## 6. 项目页规则

### 页面

- 文件：`source/projects/index.md`
- 类型：`projects`
- 评论：`false`

### FG 编号体系

| 编号 | 项目 | 状态 |
|------|------|:--:|
| FG-001 | 博客框架 | 运行中 |
| FG-002 | MBTI 性格测试网站 | 运行中 |
| FG-003 | Claude Code 环境教程体系 | 持续更新 |
| FG-004 | 待分配 | — |

### 规则

| 规则 | 说明 |
|------|------|
| 每个项目一个 FG 编号 | 依次递增，不跳号 |
| 项目页用 about-card | 复用已有 `about-card` 和 `resource-tag` 样式 |
| 项目复盘用专用模板 | `docs/templates/project-review-template.md` |
| MBTI 外链保留 | 在 FG-002 卡片中保留 `mbti-flame-ten.vercel.app` 链接 |
| 文章链接 | 使用已验证的 permalink 路径，不猜测 |

### 已知文章 permalink

| 文章 | 路径 |
|------|------|
| 博客上线记录 | `/2026/04/27/hello-world/` |
| MBTI 复盘 | `/2026/05/07/2026-05-09-mbti-test-site/` |
| Claude Code 教程 | `/2026/05/11/前置环境以及Claude下载运用全流程/` |

---

## 7. 资源页规则

### 页面

- 文件：`source/anime/index.md`
- 类型：`anime`
- 评论：`false`

### 卡片类型

| 类型 | HTML 元素 | CSS 类 | 场景 |
|------|-----------|--------|------|
| 有效资源 | `<a>` | `resource-card` | 有真实链接 |
| 待补充 | `<div>` | `resource-placeholder` | 尚未找到链接 |

### 规则

| 规则 | 说明 |
|------|------|
| 所有外链 `target="_blank" rel="noopener"` | 安全 + 新标签页打开 |
| 无效链接用 `resource-placeholder` | 不用 `href="#"` 假链接 |
| 待补充标签 `resource-tag-pending` | 橙色虚线边框，视觉上与可点击卡片区分 |
| 快速入口保留 | `quick-grid` + `quick-card` 锚点跳转 |
| 保持三区结构 | 动漫资源 / 漫画资源 / 硬核工具 |
| 后续计划保持更新 | 补充新资源后同步更新后续计划 |

---

## 8. 提交规则

### 提交前

```bash
git status                    # 确认无遗漏
npx hexo clean && npx hexo generate  # 确认构建通过
find public/ -type f -size +500k -exec ls -lh {} \;  # 确认无大文件
```

### 提交信息

| 类型 | 前缀示例 |
|------|----------|
| 修复 | `fix: xxx` |
| 新功能/页面 | `feat: xxx` |
| 配置调整 | `chore: xxx` |
| 样式 | `style: xxx` |
| 文档 | `docs: xxx` |

### 部署

```bash
npx hexo deploy
# 部署后立即检查 https://lllsj666.github.io 首页、导航、移动端
```

### 禁止

- ❌ 不要跳过 `hexo generate` 直接 deploy
- ❌ 不要提交 `public/` 到博客源码仓库（由 `.gitignore` 忽略）
- ❌ 不要提交 `.deploy_git/` 改动到博客源码仓库
- ❌ 不要修改 `.deploy_git/` 中的文件手动部署
- ❌ 不要为了修复 `public/` 问题而手动编辑 `public/` 中的文件
- ❌ 不要 `--force` push 到 `main` 分支

---

> 最后更新：2026-05-13
