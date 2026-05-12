// 博主日常页面生成器：自动归集标签或分类为「日常」或「感悟」的文章
hexo.extend.generator.register('blog-daily', function (locals) {
  const targetTerms = ['日常', '感悟']
  const filtered = locals.posts.filter(post => {
    const tagNames = (post.tags && post.tags.data) ? post.tags.data.map(t => t.name) : []
    const catNames = (post.categories && post.categories.data) ? post.categories.data.map(c => c.name) : []
    const allNames = [...tagNames, ...catNames]
    return targetTerms.some(t => allNames.includes(t))
  })

  return {
    path: 'blog-daily/index.html',
    data: {
      title: '博主日常',
      posts: filtered.sort('-date'),
      __page: true
    },
    layout: 'blog-daily'
  }
})
