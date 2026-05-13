# 部署前检查清单

Hexo + Butterfly 博客部署到 GitHub Pages 之前的逐项检查。按顺序过一遍，避免坏页面上线。

## 目录

- [1. Git 状态检查](#1-git-状态检查)
- [2. 构建检查](#2-构建检查)
- [3. 大文件检查](#3-大文件检查)
- [4. 页面检查](#4-页面检查)
- [5. 导航检查](#5-导航检查)
- [6. 移动端检查](#6-移动端检查)
- [7. 评论区检查](#7-评论区检查)
- [8. 外链检查](#8-外链检查)
- [9. 部署后检查](#9-部署后检查)
- [10. 回滚方法](#10-回滚方法)

---

## 1. Git 状态检查

```bash
# 确认在正确分支
git branch --show-current

# 确认没有未提交的改动
git status

# 确认要部署的改动
git diff origin/master..HEAD --stat
```

| 检查项 | 通过标准 |
|--------|----------|
| 分支 | `blog-upgrade-v1` 或预期分支 |
| 状态 | `nothing to commit, working tree clean` |
| 无敏感文件 | 未提交 `.env`、API key、token 等 |
| 无大文件误提交 | `source/img` 下无 > 500KB 图片（PNG/JPG 需要先压缩再提交） |

---

## 2. 构建检查

```bash
# 清理旧构建
npx hexo clean

# 重新生成
npx hexo generate
```

| 检查项 | 通过标准 |
|--------|----------|
| 构建输出 | 无红色报错 |
| 文件生成 | 输出 `XX files generated` |
| `public/index.html` | 存在 |
| `public/search.json` | 存在（本地搜索依赖） |
| `public/css/custom.css` | 存在 |

如果构建报错，常见原因：
- YAML 缩进不一致（检查 `_config.butterfly.yml` 最近的修改）
- front-matter 冒号后缺少空格（`tags:标签` → `tags: 标签`）
- 使用了未闭合的 HTML 标签

---

## 3. 大文件检查

```bash
find public/ -type f -size +500k -exec ls -lh {} \;
```

| 结果 | 处理 |
|------|------|
| 无输出 | 通过 |
| `wallpaper-assets/wallpaper.png` | 可接受（壁纸原图），但建议删除或移出 `source/` |
| 其他大图 | **必须压缩** — 转 WebP、降低分辨率、确保 ≤ 200KB（封面图）/ ≤ 500KB（内容图） |

### 图片规范

| 位置 | 格式 | 大小上限 | 说明 |
|------|------|:--:|------|
| `source/img/文章/` | WebP | 200KB | 文章封面图 |
| `source/img/` 根目录 | WebP | 500KB | 首页头图、背景 |
| 任何位置 | PNG/JPG | — | 先转 WebP 再放入 source/img |

**重要**：`public/` 是构建产物，由 `hexo generate` 自动生成。如果 `public/` 里有大文件，说明 `source/` 里放了未压缩原图。**不能只删 `public/` 的文件**，必须找到 `source/` 中的源文件处理。

---

## 4. 页面检查

```bash
# 本地预览
npx hexo server
```

逐个访问 http://localhost:4000 以下路径：

| 页面 | URL | 检查项 |
|------|-----|--------|
| 首页 | `/` | Hero 显示、精选阅读 3 张卡片、文章列表正常、封面图加载 |
| 文章归档 | `/archives/` | 所有文章显示、时间线完整 |
| 分类 | `/categories/` | 分类列表正常 |
| 标签 | `/tags/` | 标签云正常、点击标签可筛选 |
| 关于 | `/about/` | 4 张卡片完整、联络链接可点击、无评论框 |
| 资源汇总 | `/anime/` | 快速入口 3 卡片、锚点跳转有效、有效链接可点击、待补充卡片不可点击、无评论框 |
| 实验项目 | `/projects/` | 3 个 FG 卡片、MBTI 外链可访问、文章链接有效、无评论框 |
| 留言板 | `/message/` | 评论框正常加载 |
| 站点记录 | `/site-log/` | 更新记录完整 |
| 博主日常 | `/blog-daily/` | 日常类文章已归集 |
| 友链 | `/link/` | 友链列表正常、无评论框 |
| 404 | `/nonexistent` | 404 页面显示（如果开启） |

### 文章页通用检查

- [ ] 封面图加载、不超出屏幕
- [ ] 目录 (TOC) 正常展开
- [ ] 代码块高亮正常、可横向滚动（移动端）
- [ ] 图片点击放大（medium_zoom）
- [ ] 文章内链接有效
- [ ] 上一篇 / 下一篇导航
- [ ] 版权声明（CC BY-NC-SA 4.0）
- [ ] 评论框加载

---

## 5. 导航检查

| 检查项 | 预期 |
|--------|------|
| 主导航 3 项 | 首页、文章、资源 |
| "关于"二级菜单 5 项 | 关于我、实验项目、MBTI、博主日常、留言板 |
| MBTI 链接 | 外链直达 `mbti-flame-ten.vercel.app`，`target="_blank"` |
| 友链/站点记录 | 不在导航中，但页面可直访 |
| 移动端菜单 | 可展开、可收起 |

---

## 6. 移动端检查

DevTools 切换到 375px / 414px 视口。

| 检查项 | 通过标准 |
|--------|----------|
| 无横向滚动条 | 所有页面无 `overflow-x` 滚动 |
| 导航栏 | 汉堡菜单可展开、可收起 |
| 首页 Hero | 标题字号正常、按钮不溢出 |
| 精选阅读卡片 | 单列显示、整卡可点击 |
| 文章图片 | 不超过屏幕宽度 |
| 代码块 | 可横向滚动、不撑破页面 |
| 表格 | 可横向滚动 |
| 资源汇总卡片 | 网格正常、待补充卡片可见 |
| 关于页表格 | 不超出屏幕 |
| 评论框 | 宽度适配、输入框可用 |
| 右下角按钮 | 不遮挡内容 |

---

## 7. 评论区检查

| 页面 | 评论状态 | 检查 |
|------|:--:|------|
| 文章页 | ✅ 开启 | Waline 正常加载 |
| 留言板 `/message/` | ✅ 开启 | Waline 正常加载 |
| 关于 `/about/` | ❌ 关闭 | 无评论框 |
| 资源汇总 `/anime/` | ❌ 关闭 | 无评论框 |
| 实验项目 `/projects/` | ❌ 关闭 | 无评论框 |
| 站点记录 `/site-log/` | ❌ 关闭 | 无评论框 |
| 友链 `/link/` | ❌ 关闭 | 无评论框 |
| 博主日常 `/blog-daily/` | — | 按需 |

### Waline 服务检查

- [ ] `https://12-ashen-three.vercel.app` 可访问
- [ ] 评论懒加载生效（滚动到评论框时才加载）
- [ ] 暗色模式下评论 UI 正常

---

## 8. 外链检查

| 页面 | 外链 | 检查 |
|------|------|------|
| 导航"关于"→MBTI | `mbti-flame-ten.vercel.app` | 可访问 |
| 项目页 FG-002 | `mbti-flame-ten.vercel.app` | 可访问 |
| 资源汇总 | 13 个资源站 | 抽查 3–5 个可访问 |
| 关于页 | Bilibili / 网易云 / Email | 链接正确 |
| footer | 主题/框架版权链接 | 可访问 |

---

## 9. 部署后检查

```bash
# 部署
npx hexo deploy
```

部署后立即检查：

- [ ] `https://lllsj666.github.io` 可访问
- [ ] 首页 Hero + 精选阅读正常
- [ ] 导航一级/二级菜单正常
- [ ] 移动端无横向溢出
- [ ] Waline 评论正常
- [ ] 新页面（projects 等）无 404
- [ ] 搜索可用
- [ ] DevTools Console 无红色报错

---

## 10. 回滚方法

### 回退部署

```bash
# 在 .deploy_git 中回退
cd .deploy_git
git log --oneline -5
git revert <commit-hash>
git push origin main
```

### 回退源码

```bash
# 回退到上一个 commit
git log --oneline -5
git revert <commit-hash>
npx hexo clean && npx hexo generate && npx hexo deploy
```

### 只回退配置文件

```bash
git checkout HEAD~1 -- _config.butterfly.yml
git checkout HEAD~1 -- source/css/custom.css
npx hexo clean && npx hexo generate && npx hexo deploy
```

---

## 快速检查脚本

```bash
echo "=== 1. Git 状态 ===" && git status && echo ""
echo "=== 2. 构建 ===" && npx hexo clean && npx hexo generate && echo ""
echo "=== 3. 大文件 ===" && find public/ -type f -size +500k -exec ls -lh {} \; && echo ""
echo "=== 4. 关键文件 ===" && ls -lh public/index.html public/search.json public/css/custom.css && echo ""
echo "=== 完成 ===" && echo "请手动执行 npx hexo server 逐页检查"
```

---

> 最后更新：2026-05-13
