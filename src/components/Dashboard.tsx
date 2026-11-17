import { View } from '../App';
import { useState, useEffect } from 'react';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

function StatCard({ label, value, icon, color, sub }: { label: string; value: string; icon: string; color: string; sub: string }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${color}`}>{sub}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function ActivityItem({ time, action, detail, color }: { time: string; action: string; detail: string; color: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-800/50 last:border-0">
      <div className={`w-2 h-2 rounded-full mt-1.5 ${color} shrink-0`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-200">{action}</p>
        <p className="text-xs text-gray-500 truncate">{detail}</p>
      </div>
      <span className="text-[10px] text-gray-600 shrink-0">{time}</span>
    </div>
  );
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setUptime((u) => u + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-3xl">⚡</span> FreeCode Ultra
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Local-first AI coding agent • No cloud • No limits • No subscriptions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-center">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Session Uptime</p>
            <p className="text-sm font-mono text-emerald-400">{formatUptime(uptime)}</p>
          </div>
          <button
            onClick={() => onNavigate('terminal')}
            className="bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
          >
            New Task →
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Tokens Generated (Session)" value="124,847" icon="🔤" color="bg-emerald-500/10 text-emerald-400" sub="Unlimited" />
        <StatCard label="Files Modified" value="38" icon="📄" color="bg-cyan-500/10 text-cyan-400" sub="Today" />
        <StatCard label="Active Models" value="3" icon="🧠" color="bg-purple-500/10 text-purple-400" sub="Ollama" />
        <StatCard label="Memory Entries" value="1,204" icon="💾" color="bg-amber-500/10 text-amber-400" sub="SQLite" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Agent Status */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Agent Workflow</h2>
            <button onClick={() => onNavigate('agents')} className="text-xs text-emerald-400 hover:text-emerald-300">View All →</button>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Planner', status: 'idle', tasks: 12, icon: '📋' },
              { name: 'Coder', status: 'active', tasks: 8, icon: '💻' },
              { name: 'Debugger', status: 'idle', tasks: 5, icon: '🐛' },
              { name: 'Reviewer', status: 'queued', tasks: 3, icon: '🔍' },
              { name: 'Deployer', status: 'idle', tasks: 2, icon: '🚀' },
            ].map((agent) => (
              <div key={agent.name} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <span className="text-xl">{agent.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{agent.name}</p>
                  <p className="text-[10px] text-gray-500">{agent.tasks} tasks completed</p>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    agent.status === 'active'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : agent.status === 'queued'
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {agent.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
            <span className="text-[10px] text-gray-500">Live</span>
          </div>
          <div>
            <ActivityItem time="2m ago" action="File edited" detail="src/App.tsx — Fixed state management bug" color="bg-emerald-400" />
            <ActivityItem time="5m ago" action="Test passed" detail="npm test — 47/47 tests passing" color="bg-cyan-400" />
            <ActivityItem time="8m ago" action="Git commit" detail="fix: resolve memory leak in useEffect" color="bg-purple-400" />
            <ActivityItem time="12m ago" action="Model loaded" detail="qwen2.5-coder:7b — 4.1GB" color="bg-amber-400" />
            <ActivityItem time="15m ago" action="Memory saved" detail="Checkpoint #847 — project state" color="bg-rose-400" />
            <ActivityItem time="20m ago" action="Task delegated" detail="Backend agent → API optimization" color="bg-emerald-400" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Fix Bug', icon: '🐛', desc: 'Debug & fix issues', view: 'terminal' as View },
            { label: 'Refactor', icon: '🔄', desc: 'Clean up code', view: 'agents' as View },
            { label: 'Pull Model', icon: '📥', desc: 'Download new AI', view: 'models' as View },
            { label: 'View Memory', icon: '🧠', desc: 'Browse context', view: 'memory' as View },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => onNavigate(action.view)}
              className="p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-gray-600 rounded-lg text-left transition-all group"
            >
              <span className="text-2xl mb-2 block">{action.icon}</span>
              <p className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">{action.label}</p>
              <p className="text-[10px] text-gray-500">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/10 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-emerald-400 mb-2">🔒 100% Local</h3>
          <p className="text-xs text-gray-400">No cloud APIs, no data leaves your machine. Your code stays private forever.</p>
        </div>
        <div className="bg-gradient-to-br from-cyan-500/5 to-transparent border border-cyan-500/10 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-cyan-400 mb-2">∞ Unlimited Usage</h3>
          <p className="text-xs text-gray-400">No daily limits, no token caps. Generate as much code as you need, whenever you need it.</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/5 to-transparent border border-purple-500/10 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-purple-400 mb-2">🤖 Multi-Agent</h3>
          <p className="text-xs text-gray-400">Specialized agents for coding, debugging, reviewing, and deploying — all working together.</p>
        </div>
      </div>
    </div>
  );
}
