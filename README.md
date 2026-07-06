# 🤖 AI Agent Course — JavaScript

> Learn to build useful, production-ready AI agents in JavaScript/TypeScript — from your first LLM API call to autonomous multi-agent systems.

---

## 📚 Course Roadmap

| Phase | Topic | Lessons |
|-------|-------|---------|
| **Phase 1** | Foundations | Your first API call, prompt engineering, structured output |
| **Phase 2** | The Agent Loop | ReAct pattern, Vercel AI SDK, memory & context |
| **Phase 3** | Real-World Tools | Web search, databases, RAG, autonomous & multi-agent systems |
| **Phase 4** | Production | Frameworks, web UI, safety, observability, final project |

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/igorusovich/ai-agent-course.git
cd ai-agent-course
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up your API key
```bash
cp .env.example .env
# Edit .env and add your OpenAI API key
```

### 4. Run Lesson 1
```bash
npm run lesson1
```

---

## 📁 Project Structure

```
ai-agent-course/
├── lessons/           # Lesson files (exercises + solutions)
├── .env.example       # Template for API keys
├── .gitignore         # Ignores node_modules and .env
├── package.json       # Dependencies
└── README.md          # This file
```

---

## 📝 Lessons

| # | Lesson | File |
|---|--------|------|
| 1 | Your First CLI Chatbot | [`lessons/lesson1-chatbot.js`](lessons/lesson1-chatbot.js) |

---

## 🔑 Where to Get API Keys

- **OpenAI**: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Anthropic**: [console.anthropic.com](https://console.anthropic.com)
- Both offer **free credits** when you sign up!

---

## ⚠️ Important: Never Commit API Keys!

The `.env` file is in `.gitignore` — never commit it! Always use `.env.example` as a template.

---

Happy learning! 🚀
