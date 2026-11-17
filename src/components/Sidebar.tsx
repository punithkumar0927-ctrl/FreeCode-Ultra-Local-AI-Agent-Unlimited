import { View } from '../App';

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const navItems: { id: View; label: string; icon: string; description: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '⚡', description: 'Overview & Stats' },
  { id: 'terminal', label: 'Terminal', icon: '💻', description: 'Agent Console' },
  { id: 'agents', label: 'Agents', icon: '🤖', description: 'Multi-Agent Workflow' },
  { id: 'models', label: 'Models', icon: '🧠', description: 'Ollama Models' },
  { id: 'memory', label: 'Memory', icon: '💾', description: 'Persistent Storage' },
  { id: 'architecture', label: 'Architecture', icon: '🏗️', description: 'System Design' },
];

export default function Sidebar({ currentView, onNavigate, collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300 shrink-0`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-sm font-bold text-gray-900">
          FC
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-sm font-bold text-white">FreeCode Ultra</h1>
            <p className="text-[10px] text-gray-500">Local AI Agent • Unlimited</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
              currentView === item.id
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {!collapsed && (
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-[10px] text-gray-500">{item.description}</p>
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Status */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-gray-400">Ollama Connected</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs text-gray-400">Agent Active</span>
          </div>
          <p className="text-[10px] text-gray-600 mt-2">v1.0.0 • Local-First</p>
        </div>
      )}

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="p-3 border-t border-gray-800 text-gray-500 hover:text-white transition-colors text-center"
      >
        {collapsed ? '→' : '← Collapse'}
      </button>
    </aside>
  );
}
