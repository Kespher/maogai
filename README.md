# 毛概全题库刷题助手 Cloudflare 部署版

这个项目是从单文件 `毛概.html` 拆出来的 Cloudflare Pages + Pages Functions 结构。现在可以作为静态刷题网页运行；后续要加登录、错题本、AI 讲解、数据库时，可以直接沿着 `/functions/api` 扩展。

## 项目结构

```text
maogai-cloudflare-site/
├── public/                         # Cloudflare Pages 静态资源目录
│   ├── index.html                   # 页面结构，只保留 HTML
│   ├── _routes.json                 # 只让 /api/* 走 Function，静态资源不触发函数
│   ├── _headers                     # 基础安全响应头与缓存策略
│   └── assets/
│       ├── css/
│       │   └── app.css              # 自定义样式、动画、答题状态样式
│       └── js/
│           ├── main.js              # 刷题主逻辑：渲染、判题、进度、总结
│           ├── data/
│           │   └── questions.js     # 187 道题库数据
│           └── services/
│               └── aiService.js     # 前端 AI 请求封装
├── functions/
│   └── api/
│       └── ai.js                    # Cloudflare Pages Function：代理 Gemini API
├── docs/
│   └── dynamic-roadmap.md           # 后续动态化建议
├── package.json
├── wrangler.toml
└── .gitignore
```

## 本地运行

```bash
npm install
npm run dev
```

默认会用 Wrangler 启动 Pages 本地环境，静态页面在 `public/`，API 路由在 `/api/ai`。

## 部署到 Cloudflare Pages

### 方式 A：Dashboard 连接 GitHub

1. 把整个 `maogai-cloudflare-site` 文件夹上传到 GitHub。
2. Cloudflare 控制台进入 **Workers & Pages → Create application → Pages**。
3. 选择仓库。
4. 构建设置：
   - Framework preset：None
   - Build command：留空
   - Build output directory：`public`
5. 环境变量里添加：
   - `GEMINI_API_KEY`：你的 Gemini API Key
   - `GEMINI_MODEL`：可选，默认 `gemini-3.5-flash`
6. 部署。

### 方式 B：Wrangler 命令行

```bash
npm install
npx wrangler login
npm run deploy:pages
```

## 为什么把 AI Key 放到 Function 里？

原来的单文件写法是在浏览器端准备直接请求 Gemini，容易把 API Key 暴露给所有访问者。现在前端只请求 `/api/ai`，真正的密钥保存在 Cloudflare 环境变量里，由 Pages Function 代发请求。

## 后续动态化方向

- 用 Cloudflare D1 存用户、刷题记录、错题本。
- 用 KV 或 R2 存题库版本、导入文件、学习报告。
- 用 Durable Objects 做实时练习房间或多人排行榜。
- 把 `questions.js` 逐步迁移为 `/api/questions` 接口，这样题库就能在线更新，不需要重新发布前端。
