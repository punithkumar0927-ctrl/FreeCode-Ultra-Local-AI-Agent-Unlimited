import { useState } from 'react';

interface Agent {
  id: string;
  name: string;
  role: string;
  icon: string;
  status: 'active' | 'idle' | 'queued' | 'error';
  tasksCompleted: number;
  specialization: string;
  model: string;
  logs: string[];
}

const agents: Agent[] = [
  {
    id: 'planner',
    name: 'Planner',
    role: 'Task Decomposition',
    icon: '📋',
    status: 'idle',
    tasksCompleted: 12,
    specialization: 'Breaks complex tasks into steps, generates execution plans',
    model: 'qwen2.5-coder:7b',
    logs: ['[14:23] Generated plan for React refactor (4 steps)', '[14:20] Analyzed project structure', '[14:15] Created dependency graph'],
  },
  {
    id: 'coder',
    name: 'Coder',
    role: 'Code Generation',
    icon: '💻',
    status: 'active',
    tasksCompleted: 8,
    specialization: 'Writes, edits, and refactors code across languages',
    model: 'qwen2.5-coder:7b',
    logs: ['[14:25] Editing src/App.tsx line 42...', '[14:24] Reading file context...', '[14:22] Analyzing imports...'],
  },
  {
    id: 'debugger',
    name: 'Debugger',
    role: 'Error Analysis',
    icon: '🐛',
    status: 'idle',
    tasksCompleted: 5,
    specialization: 'Identifies bugs, traces errors, suggests fixes',
    model: 'qwen2.5-coder:7b',
    logs: ['[14:10] Fixed null reference in UserService', '[14:05] Traced async race condition', '[13:58] Identified memory leak in useEffect'],
  },
  {
    id: 'reviewer',
    name: 'Reviewer',
    role: 'Code Review',
    icon: '🔍',
    status: 'queued',
    tasksCompleted: 3,
    specialization: 'Reviews code quality, security, and best practices',
    model: 'qwen2.5-coder:7b',
    logs: ['[14:18] Approved: auth middleware changes', '[14:12] Flagged: potential SQL injection', '[14:00] Reviewed: API endpoint structure'],
  },
  {
    id: 'deployer',
    name: 'Deployer',
    role: 'Build & Deploy',
    icon: '🚀',
    status: 'idle',
    tasksCompleted: 2,
    specialization: 'Handles builds, tests, git operations, and deployments',
    model: 'qwen2.5-coder:7b',
    logs: ['[13:45] Built production bundle (2.1MB)', '[13:40] Ran full test suite (47/47)', '[13:35] Created git tag v1.2.0'],
  },
];

export default function AgentPanel() {
  const [selectedAgent, setSelectedAgent] = useState<string>('coder');
  const [isRunning, setIsRunning] = useState(false);

  const selected = agents.find((a) => a.id === selectedAgent)!;

  const simulateTask = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 3000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span>🤖</span> Multi-Agent System
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Specialized agents collaborate to handle complex coding tasks — inspired by Claude Code
        </p>
      </div>

      {/* Workflow Visualization */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-white mb-4">Workflow Pipeline</h2>
        <div className="flex items-center justify-between overflow-x-auto pb-2">
          {agents.map((agent, i) => (
            <div key={agent.id} className="flex items-center">
              <button
                onClick={() => setSelectedAgent(agent.id)}
                className={`flex flex-col items-center p-3 rounded-lg transition-all min-w-[100px] ${
                  selectedAgent === agent.id
                    ? 'bg-emerald-500/10 border border-emerald-500/30'
                    : 'hover:bg-gray-800'
                }`}
              >
                <span className="text-2xl mb-1">{agent.icon}</span>
                <span className="text-xs font-medium text-white">{agent.name}</span>
                <span
                  className={`text-[9px] mt-1 px-1.5 py-0.5 rounded-full ${
                    agent.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : agent.status === 'queued'
                      ? 'bg-amber-500/20 text-amber-400'
                      : agent.status === 'error'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {agent.status}
                </span>
              </button>
              {i < agents.length - 1 && (
                <div className="mx-2 text-gray-600 text-xs">→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent Details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{selected.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-white">{selected.name} Agent</h3>
                <p className="text-xs text-gray-500">{selected.role} • {selected.model}</p>
              </div>
              <span
                className={`ml-auto text-xs px-2 py-1 rounded-full ${
                  selected.status === 'active'
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {selected.status === 'active' ? '● Active' : '○ Idle'}
              </span>
            </div>

            <p className="text-sm text-gray-400 mb-4">{selected.specialization}</p>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-white">{selected.tasksCompleted}</p>
                <p className="text-[10px] text-gray-500">Tasks Done</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-emerald-400">98%</p>
                <p className="text-[10px] text-gray-500">Success Rate</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                <p className="text-lg font-bold text-cyan-400">1.2s</p>
                <p className="text-[10px] text-gray-500">Avg Response</p>
              </div>
            </div>

            {/* Agent Logs */}
            <div className="bg-gray-950 rounded-lg p-3 font-mono text-xs">
              <p className="text-gray-500 mb-2">// Agent Logs</p>
              {selected.logs.map((log, i) => (
                <p key={i} className="text-gray-400 py-0.5">{log}</p>
              ))}
            </div>
          </div>

          {/* Delegation Example */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Delegation Example</h3>
            <div className="bg-gray-950 rounded-lg p-4 font-mono text-xs space-y-2">
              <p className="text-gray-500">// User request</p>
              <p className="text-emerald-400">"Refactor the authentication module"</p>
              <p className="text-gray-500 mt-3">// Agent delegation chain</p>
              <p className="text-cyan-400">→ Planner: Break into 3 subtasks</p>
              <p className="text-cyan-400">→ Coder: Rewrite auth middleware</p>
              <p className="text-cyan-400">→ Reviewer: Security audit</p>
              <p className="text-cyan-400">→ Deployer: Run tests & commit</p>
              <p className="text-gray-500 mt-3">// Result</p>
              <p className="text-emerald-400">✅ 4 files modified, 23 tests passing</p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* All Agents */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Agent Registry</h3>
            <div className="space-y-2">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent.id)}
                  className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-all ${
                    selectedAgent === agent.id ? 'bg-gray-800' : 'hover:bg-gray-800/50'
                  }`}
                >
                  <span>{agent.icon}</span>
                  <span className="text-xs text-white flex-1">{agent.name}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    agent.status === 'active' ? 'bg-emerald-400' :
                    agent.status === 'queued' ? 'bg-amber-400' : 'bg-gray-600'
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Simulate */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Task Simulation</h3>
            <p className="text-xs text-gray-500 mb-3">Watch agents collaborate on a task</p>
            <button
              onClick={simulateTask}
              disabled={isRunning}
              className="w-full py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {isRunning ? '⏳ Running...' : '▶ Run Demo Task'}
            </button>
            {isRunning && (
              <div className="mt-3 space-y-1">
                {['📋 Planning...', '💻 Coding...', '🔍 Reviewing...', '🚀 Deploying...'].map((step, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
                    {step}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Conflict Handling */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Conflict Resolution</h3>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> File locking (no concurrent edits)
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Permission whitelisting
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Dangerous command blocking
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Rollback on failure
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
