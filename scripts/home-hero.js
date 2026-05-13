// 首页 Hero + 精选阅读 统一注入
// 所有首页模块在此 filter 内追加，避免多个 replace 竞争注入顺序
hexo.extend.filter.register('after_render:html', function (str, data) {
  if (!data.page || data.page.__index !== true) return str

  const hero = `
<div class="home-hero">
  <h1 class="home-hero-title">你好，我是覆</h1>
  <p class="home-hero-tags">技术折腾 / 项目实验 / 世界线记录 / 硬核资源</p>
  <p class="home-hero-desc">记录每一次折腾、上线和世界线偏移。</p>
  <div class="home-hero-buttons">
    <a href="/archives/" class="home-hero-btn home-hero-btn-primary">开始阅读</a>
    <a href="/projects/" class="home-hero-btn home-hero-btn-secondary">查看项目</a>
  </div>
</div>`

  const featured = `
<section class="featured-posts">
  <h2 class="featured-heading">精选阅读</h2>
  <div class="featured-grid">

    <a class="featured-card" href="/2026/05/11/前置环境以及Claude下载运用全流程/">
      <span class="featured-tag featured-tag-tutorial">教程</span>
      <h3 class="featured-card-title">Claude Code 安装与前置环境配置全流程教程</h3>
      <p class="featured-card-desc">从 Git、Node.js、VS Code 到 Claude Code 与 CC Switch，整理一套适合新手照着做的 AI 编码环境搭建流程。</p>
      <span class="featured-card-btn">阅读文章 →</span>
    </a>

    <a class="featured-card" href="/2026/05/07/2026-05-09-mbti-test-site/">
      <span class="featured-tag featured-tag-project">实战</span>
      <h3 class="featured-card-title">从零搭建了一个 MBTI 性格测试网站</h3>
      <p class="featured-card-desc">一次从想法、页面设计、结果逻辑到上线分享的完整小项目复盘。</p>
      <span class="featured-card-btn">阅读文章 →</span>
    </a>

    <a class="featured-card" href="/2026/04/27/hello-world/">
      <span class="featured-tag featured-tag-daily">日常</span>
      <h3 class="featured-card-title">博客上线记录</h3>
      <p class="featured-card-desc">记录这个小站的起点、方向和后续折腾计划。</p>
      <span class="featured-card-btn">阅读文章 →</span>
    </a>

  </div>
</section>`

  return str.replace('<div id="recent-posts"', hero + featured + '\n<div id="recent-posts"')
})
