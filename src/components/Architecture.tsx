export default function Architecture() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span>🏗️</span> System Architecture
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Monorepo structure — shared backend for web + desktop (Tauri)
        </p>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-white mb-6">High-Level Architecture</h2>
        <div className="flex flex-col items-center gap-4">
          {/* Top Layer - Clients */}
          <div className="flex items-center gap-6">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 text-center min-w-[140px]">
              <span className="text-2xl block mb-1">🌐</span>
              <p className="text-xs font-bold text-emerald-400">Web App</p>
              <p className="text-[10px] text-gray-500">React + Vite</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-xl p-4 text-center min-w-[140px]">
              <span className="text-2xl block mb-1">🖥️</span>
              <p className="text-xs font-bold text-cyan-400">Desktop App</p>
              <p className="text-[10px] text-gray-500">Tauri 2.0</p>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center">
            <div className="w-px h-6 bg-gray-700" />
            <span className="text-[10px] text-gray-500 bg-gray-900 px-2">HTTP/WebSocket</span>
            <div className="w-px h-6 bg-gray-700" />
          </div>

          {/* Middle Layer - Backend */}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-5 text-center min-w-[400px]">
            <span className="text-2xl block mb-1">⚙️</span>
            <p className="text-xs font-bold text-purple-400">Shared Backend (Fastify)</p>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="text-[10px] px-2 py-0.5 bg-gray-800 text-gray-400 rounded">REST API</span>
              <span className="text-[10px] px-2 py-0.5 bg-gray-800 text-gray-400 rounded">WebSocket</span>
              <span className="text-[10px] px-2 py-0.5 bg-gray-800 text-gray-400 rounded">MCP Server</span>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center">
            <div className="w-px h-6 bg-gray-700" />
            <span className="text-[10px] text-gray-500 bg-gray-900 px-2">Internal</span>
            <div className="w-px h-6 bg-gray-700" />
          </div>

          {/* Bottom Layer - Core */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-center min-w-[120px]">
              <span className="text-xl block mb-1">🤖</span>
              <p className="text-[10px] font-bold text-amber-400">Agent Core</p>
              <p className="text-[9px] text-gray-500">AI Logic</p>
            </div>
            <div className="bg-gradient-to-br from-rose-500/10 to-rose-500/5 border border-rose-500/20 rounded-xl p-4 text-center min-w-[120px]">
              <span className="text-xl block mb-1">🧠</span>
              <p className="text-[10px] font-bold text-rose-400">Ollama Provider</p>
              <p className="text-[9px] text-gray-500">Local AI</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-4 text-center min-w-[120px]">
              <span className="text-xl block mb-1">💾</span>
              <p className="text-[10px] font-bold text-blue-400">Memory</p>
              <p className="text-[9px] text-gray-500">SQLite</p>
            </div>
            <div className="bg-gradient-to-br from-teal-500/10 to-teal-500/5 border border-teal-500/20 rounded-xl p-4 text-center min-w-[120px]">
              <span className="text-xl block mb-1">🔧</span>
              <p className="text-[10px] font-bold text-teal-400">Tools</p>
              <p className="text-[9px] text-gray-500">File/Terminal</p>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center">
            <div className="w-px h-6 bg-gray-700" />
            <span className="text-[10px] text-gray-500 bg-gray-900 px-2">Process</span>
            <div className="w-px h-6 bg-gray-700" />
          </div>

          {/* OS Layer */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-center min-w-[400px]">
            <span className="text-2xl block mb-1">🖥️</span>
            <p className="text-xs font-bold text-gray-300">Local OS (Windows/Linux/macOS)</p>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="text-[10px] px-2 py-0.5 bg-gray-700 text-gray-400 rounded">File System</span>
              <span className="text-[10px] px-2 py-0.5 bg-gray-700 text-gray-400 rounded">Terminal</span>
              <span className="text-[10px] px-2 py-0.5 bg-gray-700 text-gray-400 rounded">Git</span>
              <span className="text-[10px] px-2 py-0.5 bg-gray-700 text-gray-400 rounded">Ollama</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monorepo Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Monorepo Structure</h2>
          <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs space-y-0.5">
            <p className="text-emerald-400">FREECODE-ULTRA/</p>
            <p className="text-gray-400 pl-3">├── <span className="text-cyan-400">apps/</span></p>
            <p className="text-gray-500 pl-6">├── <span className="text-white">web/</span> <span className="text-gray-600"># React + Vite</span></p>
            <p className="text-gray-500 pl-6">└── <span className="text-white">desktop/</span> <span className="text-gray-600"># Tauri 2</span></p>
            <p className="text-gray-400 pl-3">├── <span className="text-cyan-400">packages/</span></p>
            <p className="text-gray-500 pl-6">├── <span className="text-white">agent-core/</span> <span className="text-gray-600"># AI logic</span></p>
            <p className="text-gray-500 pl-6">├── <span className="text-white">ollama-provider/</span> <span className="text-gray-600"># Local AI</span></p>
            <p className="text-gray-500 pl-6">├── <span className="text-white">memory/</span> <span className="text-gray-600"># SQLite</span></p>
            <p className="text-gray-500 pl-6">└── <span className="text-white">tools/</span> <span className="text-gray-600"># File/Terminal ops</span></p>
            <p className="text-gray-400 pl-3">├── <span className="text-cyan-400">backend/</span> <span className="text-gray-600"># Fastify (shared)</span></p>
            <p className="text-gray-400 pl-3">├── <span className="text-cyan-400">docs/</span></p>
            <p className="text-gray-400 pl-3">└── <span className="text-cyan-400">scripts/</span> <span className="text-gray-600"># Windows batch</span></p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Key Dependencies</h2>
          <div className="space-y-2">
            {[
              { name: 'react', version: '^18.2.0', desc: 'UI Framework', color: 'text-cyan-400' },
              { name: 'fastify', version: '^4.25.0', desc: 'Backend Server', color: 'text-emerald-400' },
              { name: 'sqlite3', version: '^5.1.6', desc: 'Persistent Memory', color: 'text-blue-400' },
              { name: 'ollama', version: '^0.1.0', desc: 'Local AI SDK', color: 'text-purple-400' },
              { name: 'monaco-editor', version: '^0.45.0', desc: 'Code Editor', color: 'text-amber-400' },
              { name: 'xterm', version: '^5.3.0', desc: 'Terminal Emulator', color: 'text-rose-400' },
              { name: '@tauri-apps/api', version: '^1.5.0', desc: 'Desktop Bridge', color: 'text-teal-400' },
            ].map((dep) => (
              <div key={dep.name} className="flex items-center gap-3 p-2 bg-gray-800/50 rounded-lg">
                <span className={`text-xs font-mono ${dep.color}`}>{dep.name}</span>
                <span className="text-[10px] text-gray-600">{dep.version}</span>
                <span className="text-[10px] text-gray-500 ml-auto">{dep.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Flow */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-white mb-4">Agent Execution Flow</h2>
        <div className="flex items-center justify-between overflow-x-auto pb-2">
          {[
            { step: '1', label: 'User Input', icon: '👤', desc: 'Natural language task' },
            { step: '2', label: 'Planner', icon: '📋', desc: 'Generate execution plan' },
            { step: '3', label: 'Memory', icon: '💾', desc: 'Retrieve past context' },
            { step: '4', label: 'Approval', icon: '✅', desc: 'User confirms plan' },
            { step: '5', label: 'Execution', icon: '⚡', desc: 'Run tools & edit files' },
            { step: '6', label: 'Verify', icon: '🧪', desc: 'Run tests & validate' },
            { step: '7', label: 'Commit', icon: '📝', desc: 'Git commit changes' },
          ].map((item, i) => (
            <div key={item.step} className="flex items-center">
              <div className="flex flex-col items-center p-3 min-w-[90px]">
                <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-bold text-emerald-400 mb-1">
                  {item.step}
                </div>
                <span className="text-lg">{item.icon}</span>
                <span className="text-[10px] text-white font-medium mt-1">{item.label}</span>
                <span className="text-[9px] text-gray-500">{item.desc}</span>
              </div>
              {i < 6 && <div className="text-gray-600 text-xs mx-1">→</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Security & Permissions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-3">🔒 Security Model</h2>
          <div className="space-y-3">
            {[
              { label: 'Directory Whitelisting', desc: 'Only access allowed project directories', status: 'active' },
              { label: 'Command Blocking', desc: 'Block rm -rf, format, and dangerous commands', status: 'active' },
              { label: 'User Approval', desc: 'Require confirmation for file writes', status: 'active' },
              { label: 'Sandboxed Execution', desc: 'Terminal commands run in isolated context', status: 'active' },
              { label: 'No Network Exfil', desc: 'No data sent to external services', status: 'active' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-2 bg-gray-800/50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div className="flex-1">
                  <p className="text-xs text-white">{item.label}</p>
                  <p className="text-[10px] text-gray-500">{item.desc}</p>
                </div>
                <span className="text-[9px] text-emerald-400">●</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-3">🎯 Design Principles</h2>
          <div className="space-y-3">
            {[
              { icon: '🔒', label: 'Local-First', desc: 'No cloud dependency, works offline' },
              { icon: '∞', label: 'Unlimited', desc: 'No daily limits, no token caps' },
              { icon: '🔌', label: 'No API Keys', desc: 'Ollama runs locally, free forever' },
              { icon: '💾', label: 'Persistent', desc: 'SQLite memory survives restarts' },
              { icon: '🤖', label: 'Multi-Agent', desc: 'Specialized agents collaborate' },
              { icon: '🖥️', label: 'Cross-Platform', desc: 'Web + Desktop (Tauri) shared backend' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-2 bg-gray-800/50 rounded-lg">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <p className="text-xs text-white">{item.label}</p>
                  <p className="text-[10px] text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
