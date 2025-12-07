import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "冰冰的笔记",
  description: "OneNote",
  base: '/docs/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '前端', link: '/front-end' },
      { text: 'AI', link: '/ai' },
      { text: 'Python', link: '/python' },
      { text: 'Rust', link: '/rust' },
      // { text: 'Go', link: '/go' },
      // { text: 'Java', link: '/java' },
      // { text: '项目', link: '/projects' },
      // { text: '开源项目', link: '/open-projects' },
      // { text: '其他', link: '/other' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
