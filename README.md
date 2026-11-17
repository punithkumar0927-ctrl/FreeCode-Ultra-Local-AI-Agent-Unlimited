# ⚡ FreeCode Ultra — Local AI Coding Agent (Unlimited)

> **Production-grade, local-first AI coding agent** — No paid APIs, no daily limits, no cloud dependency.

🔗 **Live Preview:** http://localhost:3000/

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| ⚡ **Dashboard** | Live stats, agent status, recent activity, quick actions |
| 💻 **Terminal** | Interactive AI coding console with streaming responses |
| 🤖 **Multi-Agent** | Planner, Coder, Debugger, Reviewer, Deployer agents |
| 🧠 **Model Manager** | Ollama model management — install, switch, monitor |
| 💾 **Persistent Memory** | SQLite-backed storage — resumes tasks across sessions |
| 🏗️ **Architecture** | Full system design diagram & monorepo structure |

## 🛠️ Tech Stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** — Dark theme UI
- **Ollama** — Local AI inference (no API keys needed)
- **SQLite** — Persistent memory
- **Fastify** — Shared backend
- **Tauri 2** — Desktop app (Windows/Linux/macOS)

## 📦 Getting Started

### Prerequisites

```bash
node --version    # v18+
npm --version     # v9+
ollama --version  # Install from https://ollama.com
```

### Install & Run

```bash
# Clone the repo
git clone https://github.com/punithkumar0927-ctrl/-FreeCode-Ultra-Local-AI-Agent-Unlimited.git
cd -FreeCode-Ultra-Local-AI-Agent-Unlimited

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# → http://localhost:5173
```

### Pull AI Models (Ollama)

```bash
ollama pull qwen2.5-coder:7b   # Default model (4.1GB)
ollama pull llama3:8b           # Alternative (4.7GB)
ollama pull codellama:13b       # Code specialist (7.4GB)
```

## 📁 Project Structure

```
FREECODE-ULTRA/
├── apps/
│   ├── web/              # React + Vite (local web)
│   └── desktop/          # Tauri 2 (Windows app)
├── packages/
│   ├── agent-core/       # AI logic + tools
│   ├── ollama-provider/  # Local AI engine
│   ├── memory/           # SQLite persistence
│   └── tools/            # File/terminal ops
├── backend/              # Fastify (shared)
├── src/
│   ├── App.tsx           # Main app
│   ├── main.tsx          # Entry point
│   ├── index.css         # Styles
│   └── components/
│       ├── Sidebar.tsx
│       ├── Dashboard.tsx
│       ├── Terminal.tsx
│       ├── AgentPanel.tsx
│       ├── ModelManager.tsx
│       ├── MemoryPanel.tsx
│       └── Architecture.tsx
├── docs/
└── scripts/              # Windows batch files
```

## 🔒 Design Principles

- 🔒 **Local-First** — No cloud dependency, works offline
- ∞ **Unlimited** — No daily limits, no token caps
- 🔌 **No API Keys** — Ollama runs locally, free forever
- 💾 **Persistent** — SQLite memory survives restarts
- 🤖 **Multi-Agent** — Specialized agents collaborate
- 🖥️ **Cross-Platform** — Web + Desktop shared backend

## 🛡️ Security

- Directory whitelisting (only allowed project dirs)
- Dangerous command blocking (`rm -rf`, `format`, etc.)
- User approval required for file writes
- Sandboxed terminal execution
- No network exfiltration — data never leaves your machine

## 📄 License

MIT — Free for personal and commercial use.

---

**Built with ❤️ for developers who want unlimited local AI coding assistance.**
