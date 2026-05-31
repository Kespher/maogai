# 动态化改造路线

## 第一阶段：静态刷题 + AI 讲解

当前项目已经完成：

- 题库拆分到 `public/assets/js/data/questions.js`
- 刷题逻辑拆分到 `public/assets/js/main.js`
- AI 请求通过 `functions/api/ai.js` 转发，前端不暴露 API Key

## 第二阶段：接口化题库

新增：

```text
functions/api/questions.js
```

功能：

- `GET /api/questions` 返回题库
- `GET /api/questions?type=single` 返回单选题
- `GET /api/questions?type=multi` 返回多选题

前端改造：

- `main.js` 不再直接 import `questions.js`
- 改为启动时 `fetch('/api/questions')`

## 第三阶段：错题本与学习记录

推荐使用 Cloudflare D1：

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attempts (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  question_id INTEGER,
  choice TEXT,
  is_correct INTEGER,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

新增接口：

```text
POST /api/attempts
GET  /api/wrong-questions
GET  /api/stats
```

## 第四阶段：管理后台

后台功能：

- 导入/导出题库
- 修改题目与答案
- 查看整体正确率
- 查看高频错题

这个阶段建议把前端迁移到 Vite/React，或者继续用 Vanilla JS 但拆成更多模块。
