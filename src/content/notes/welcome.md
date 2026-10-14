---
title: 欢迎来到我的笔记站
description: 站点已切换为 Astro 驱动的静态笔记站，这里是使用说明
pubDate: 2026-10-14
tags:
  - 站点
---

这个站点由 [Astro](https://astro.build) 构建，纯静态输出，部署在 GitHub Pages。

## 如何写一篇笔记

在 `src/content/notes/` 下新建一个 `.md` 文件，文件名就是 URL（支持子目录）：

```markdown
---
title: 笔记标题
description: 一句话摘要（可选，显示在列表和 SEO）
pubDate: 2026-10-14
updatedDate: 2026-10-15 # 可选
tags: [标签A, 标签B] # 可选
draft: false # true 则不发布
---

正文用标准 Markdown 写。
```

## 本地预览与发布

```bash
pnpm dev      # 本地开发，默认 http://localhost:4321
pnpm build    # 产出 dist/ 静态文件
```

推送到 `main` 后，GitHub Actions 会自动构建并发布到 Pages。
