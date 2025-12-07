import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "冰冰的笔记",
  description: "BingBingNote",
  base: '/docs/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'FrontEnd', link: '/front-end' },
      { text: 'AI', link: '/ai' },
      { text: 'Go', link: '/go' },
      { text: 'Rust', link: '/rust' },
      { text: 'Java', link: '/java' },
      { text: 'Python', link: '/python' },
      { text: 'MyProjects', link: '/projects' }
      { text: 'OpenProjects', link: '/open-projects' },
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
