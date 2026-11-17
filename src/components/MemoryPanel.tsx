import { useState } from 'react';

interface MemoryEntry {
  id: number;
  projectId: string;
  key: string;
  type: 'file' | 'context' | 'checkpoint' | 'conversation';
  value: string;
  timestamp: string;
  size: string;
}

const memoryEntries: MemoryEntry[] = [
  { id: 1, projectId: 'freecode-ultra', key: 'file:src/App.tsx', type: 'file', value: 'Last edited: Added multi-agent workflow component. State management uses useReducer pattern.', timestamp: '2 min ago', size: '2.4 KB' },
  { id: 2, projectId: 'freecode-ultra', key: 'context:auth-module', type: 'context', value: 'Authentication uses JWT tokens stored in httpOnly cookies. Middleware validates on every request.', timestamp: '15 min ago', size: '1.1 KB' },
  { id: 3, projectId: 'freecode-ultra', key: 'checkpoint:#847', type: 'checkpoint', value: 'Full project state saved. 47 tests passing. Last commit: fix: resolve memory leak.', timestamp: '20 min ago', size: '8.7 KB' },
  { id: 4, projectId: 'freecode-ultra', key: 'conversation:refactor-task', type: 'conversation', value: 'User requested auth module refactor. Agent completed in 3 steps. All tests passed.', timestamp: '1 hr ago', size: '4.2 KB' },
  { id: 5, projectId: 'freecode-ultra', key: 'file:src/utils/api.ts', type: 'file', value: 'API client with retry logic, request interceptors, and error handling. Uses axios instance.', timestamp: '2 hr ago', size: '1.8 KB' },
  { id: 6, projectId: 'freecode-ultra', key: 'context:db-schema', type: 'context', value: 'PostgreSQL schema: users, projects, tasks tables. Relations: user→projects (1:N), project→tasks (1:N).', timestamp: '3 hr ago', size: '3.1 KB' },
  { id: 7, projectId: 'freecode-ultra', key: 'checkpoint:#846', type: 'checkpoint', value: 'Previous checkpoint. API optimization completed. Response times improved by 74%.', timestamp: '4 hr ago', size: '7.9 KB' },
  { id: 8, projectId: 'freecode-ultra', key: 'conversation:bug-fix', type: 'conversation', value: 'Fixed N+1 query in /api/users endpoint. Added eager loading with JOIN. Tests updated.', timestamp: '5 hr ago', size: '2.8 KB' },
];

export default function MemoryPanel() {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<MemoryEntry | null>(null);

  const filtered = memoryEntries.filter((entry) => {
    const matchesFilter = filter === 'all' || entry.type === filter;
    const matchesSearch = entry.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.value.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'file': return 'bg-emerald-500/10 text-emerald-400';
      case 'context': return 'bg-cyan-500/10 text-cyan-400';
      case 'checkpoint': return 'bg-purple-500/10 text-purple-400';
      case 'conversation': return 'bg-amber-500/10 text-amber-400';
      default: return 'bg-gray-700 text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'file': return '📄';
      case 'context': return '🧠';
      case 'checkpoint': return '💾';
      case 'conversation': return '💬';
      default: return '📦';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span>💾</span> Persistent Memory
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            SQLite-backed storage — resumes tasks across sessions, no cloud required
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-1 rounded-full">
            SQLite • ~/.freecode/memory.db
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="text-xl font-bold text-white">1,204</p>
          <p className="text-[10px] text-gray-500">Total Entries</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="text-xl font-bold text-white">24.7 MB</p>
          <p className="text-[10px] text-gray-500">Database Size</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="text-xl font-bold text-emerald-400">847</p>
          <p className="text-[10px] text-gray-500">Checkpoints</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="text-xl font-bold text-cyan-400">5 min</p>
          <p className="text-[10px] text-gray-500">Auto-save Interval</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Memory List */}
        <div className="lg:col-span-2">
          {/* Search & Filter */}
          <div className="flex items-center gap-3 mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search memory entries..."
              className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 outline-none focus:border-gray-600"
            />
            <div className="flex items-center gap-1">
              {['all', 'file', 'context', 'checkpoint', 'conversation'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                    filter === f
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-gray-800 text-gray-500 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Entries */}
          <div className="space-y-2">
            {filtered.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                className={`w-full text-left bg-gray-900 border rounded-lg p-4 transition-all ${
                  selectedEntry?.id === entry.id ? 'border-emerald-500/30' : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span>{getTypeIcon(entry.type)}</span>
                  <span className="text-xs font-mono text-white">{entry.key}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${getTypeColor(entry.type)}`}>
                    {entry.type}
                  </span>
                  <span className="ml-auto text-[10px] text-gray-600">{entry.timestamp}</span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2">{entry.value}</p>
                <p className="text-[10px] text-gray-600 mt-1">{entry.size}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="space-y-4">
          {selectedEntry ? (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{getTypeIcon(selectedEntry.type)}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${getTypeColor(selectedEntry.type)}`}>
                  {selectedEntry.type}
                </span>
              </div>
              <h3 className="text-sm font-mono text-white mb-2">{selectedEntry.key}</h3>
              <p className="text-xs text-gray-400 mb-4">{selectedEntry.value}</p>
              <div className="space-y-2 text-[10px] text-gray-500">
                <p>Project: {selectedEntry.projectId}</p>
                <p>Size: {selectedEntry.size}</p>
                <p>Saved: {selectedEntry.timestamp}</p>
                <p>ID: #{selectedEntry.id}</p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
              <p className="text-2xl mb-2">💾</p>
              <p className="text-xs text-gray-500">Select an entry to view details</p>
            </div>
          )}

          {/* Schema */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Database Schema</h3>
            <div className="bg-gray-950 rounded-lg p-3 font-mono text-[10px] space-y-1">
              <p className="text-purple-400">CREATE TABLE project_memory (</p>
              <p className="text-gray-400 pl-3">id INTEGER PRIMARY KEY,</p>
              <p className="text-gray-400 pl-3">project_id TEXT,</p>
              <p className="text-gray-400 pl-3">key TEXT,</p>
              <p className="text-gray-400 pl-3">value TEXT,</p>
              <p className="text-gray-400 pl-3">type TEXT,</p>
              <p className="text-gray-400 pl-3">timestamp DATETIME</p>
              <p className="text-purple-400">);</p>
            </div>
          </div>

          {/* Features */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Memory Features</h3>
            <div className="space-y-2">
              {[
                { icon: '💾', label: 'Auto-checkpointing every 5 min' },
                { icon: '🗜️', label: 'Context compression when full' },
                { icon: '🔍', label: 'Semantic search across entries' },
                { icon: '🔄', label: 'Session resume on restart' },
                { icon: '🔒', label: 'Local-only, encrypted at rest' },
              ].map((feature) => (
                <div key={feature.label} className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{feature.icon}</span>
                  {feature.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
