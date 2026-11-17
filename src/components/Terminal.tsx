import { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  content: string;
  timestamp: string;
}

const initialLines: TerminalLine[] = [
  { type: 'system', content: '🚀 FreeCode Ultra v1.0.0 — Local AI Coding Agent', timestamp: '00:00:01' },
  { type: 'system', content: '✅ Ollama connected — qwen2.5-coder:7b loaded (4.1GB)', timestamp: '00:00:01' },
  { type: 'system', content: '✅ Memory initialized — SQLite at ~/.freecode/memory.db', timestamp: '00:00:02' },
  { type: 'system', content: '✅ Agent pool ready — 5 agents standing by', timestamp: '00:00:02' },
  { type: 'system', content: '─────────────────────────────────────────────────', timestamp: '' },
  { type: 'output', content: 'Type a task or command. The agent will handle the rest.', timestamp: '00:00:03' },
];

const demoResponses: Record<string, TerminalLine[]> = {
  'fix the react bug': [
    { type: 'output', content: '🤖 [Planner] Analyzing request...', timestamp: '' },
    { type: 'output', content: '📋 [Planner] Plan generated:', timestamp: '' },
    { type: 'output', content: '   1. Read src/App.tsx (inspect state management)', timestamp: '' },
    { type: 'output', content: '   2. Identify useEffect dependency issue', timestamp: '' },
    { type: 'output', content: '   3. Fix missing dependency array entry', timestamp: '' },
    { type: 'output', content: '   4. Run tests to verify', timestamp: '' },
    { type: 'success', content: '✅ [Coder] Reading src/App.tsx...', timestamp: '' },
    { type: 'success', content: '✅ [Coder] Found issue: useEffect missing "userId" dep', timestamp: '' },
    { type: 'success', content: '✅ [Coder] Applied fix at line 42', timestamp: '' },
    { type: 'output', content: '🧪 [Tester] Running npm test...', timestamp: '' },
    { type: 'success', content: '✅ All 47 tests passing', timestamp: '' },
    { type: 'success', content: '📝 [Git] Changes staged: src/App.tsx', timestamp: '' },
  ],
  'optimize the api': [
    { type: 'output', content: '🤖 [Planner] Delegating to Backend Agent...', timestamp: '' },
    { type: 'output', content: '📋 [Backend Agent] Analyzing API endpoints...', timestamp: '' },
    { type: 'output', content: '   Found 12 endpoints, 3 with N+1 queries', timestamp: '' },
    { type: 'success', content: '✅ Added eager loading to /api/users', timestamp: '' },
    { type: 'success', content: '✅ Added response caching to /api/products', timestamp: '' },
    { type: 'success', content: '✅ Batched queries in /api/orders (-67% DB calls)', timestamp: '' },
    { type: 'success', content: '📊 Performance: avg response time 340ms → 89ms', timestamp: '' },
  ],
  'help': [
    { type: 'output', content: '📖 FreeCode Ultra — Available Commands:', timestamp: '' },
    { type: 'output', content: '   "fix the react bug"    — Debug and fix React issues', timestamp: '' },
    { type: 'output', content: '   "optimize the api"     — Performance optimization', timestamp: '' },
    { type: 'output', content: '   "refactor <file>"      — Code cleanup', timestamp: '' },
    { type: 'output', content: '   "write tests for <x>"  — Generate test suite', timestamp: '' },
    { type: 'output', content: '   "explain <code>"       — Code explanation', timestamp: '' },
    { type: 'output', content: '   "git commit"           — Auto-commit with AI message', timestamp: '' },
    { type: 'output', content: '   "status"               — Show agent & model status', timestamp: '' },
  ],
  'status': [
    { type: 'output', content: '📊 System Status:', timestamp: '' },
    { type: 'success', content: '   ✅ Ollama: Running (qwen2.5-coder:7b)', timestamp: '' },
    { type: 'success', content: '   ✅ Memory: 1,204 entries (SQLite)', timestamp: '' },
    { type: 'success', content: '   ✅ Agents: 5 active, 0 queued', timestamp: '' },
    { type: 'output', content: '   📁 Project: freecode-ultra', timestamp: '' },
    { type: 'output', content: '   🕐 Session: 2h 34m 12s', timestamp: '' },
    { type: 'output', content: '   🔤 Tokens: 124,847 generated', timestamp: '' },
  ],
};

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const getTimestamp = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userLine: TerminalLine = {
      type: 'input',
      content: input.trim(),
      timestamp: getTimestamp(),
    };

    setLines((prev) => [...prev, userLine]);
    const cmd = input.trim().toLowerCase();
    setInput('');
    setIsProcessing(true);

    // Find matching response
    const matchedKey = Object.keys(demoResponses).find((key) => cmd.includes(key));
    const response = matchedKey
      ? demoResponses[matchedKey]
      : [
          { type: 'output' as const, content: `🤖 Processing: "${input.trim()}"...`, timestamp: getTimestamp() },
          { type: 'success' as const, content: '✅ Task completed successfully. Changes applied.', timestamp: getTimestamp() },
        ];

    // Simulate streaming response
    for (let i = 0; i < response.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 400));
      const line = { ...response[i], timestamp: getTimestamp() };
      setLines((prev) => [...prev, line]);
    }

    setIsProcessing(false);
    inputRef.current?.focus();
  };

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'input': return 'text-emerald-400';
      case 'output': return 'text-gray-300';
      case 'error': return 'text-red-400';
      case 'success': return 'text-cyan-400';
      case 'system': return 'text-gray-500';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span>💻</span> Agent Terminal
          </h1>
          <p className="text-xs text-gray-500 mt-1">Interactive AI coding console — type naturally</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${isProcessing ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
            {isProcessing ? '⏳ Processing' : '● Ready'}
          </span>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col min-h-[500px]">
        {/* Title Bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border-b border-gray-800">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="text-[10px] text-gray-500 ml-2 font-mono">freecode-agent — zsh — 120×40</span>
        </div>

        {/* Terminal Content */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
          {lines.map((line, i) => (
            <div key={i} className={`py-0.5 ${getLineColor(line.type)}`}>
              {line.type === 'input' ? (
                <span>
                  <span className="text-emerald-500">❯ </span>
                  <span className="text-white">{line.content}</span>
                </span>
              ) : (
                <span>{line.content}</span>
              )}
            </div>
          ))}
          {isProcessing && (
            <div className="py-0.5 text-gray-500 animate-pulse">
              <span className="inline-block w-2 h-4 bg-emerald-400 mr-1 animate-pulse" />
              Agent is thinking...
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-gray-800 p-3 flex items-center gap-2">
          <span className="text-emerald-400 font-mono text-sm">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a task... (try 'fix the react bug', 'optimize the api', 'help', 'status')"
            className="flex-1 bg-transparent text-white text-sm font-mono outline-none placeholder:text-gray-600"
            disabled={isProcessing}
            autoFocus
          />
          <button
            type="submit"
            disabled={isProcessing || !input.trim()}
            className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-medium hover:bg-emerald-500/20 disabled:opacity-30 transition-colors"
          >
            Run ↵
          </button>
        </form>
      </div>

      {/* Quick Commands */}
      <div className="mt-4 flex flex-wrap gap-2">
        {['fix the react bug', 'optimize the api', 'status', 'help'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => { setInput(cmd); inputRef.current?.focus(); }}
            className="text-xs px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors font-mono"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
