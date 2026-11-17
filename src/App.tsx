import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Terminal from './components/Terminal';
import AgentPanel from './components/AgentPanel';
import ModelManager from './components/ModelManager';
import MemoryPanel from './components/MemoryPanel';
import Architecture from './components/Architecture';

export type View = 'dashboard' | 'terminal' | 'agents' | 'models' | 'memory' | 'architecture';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'terminal':
        return <Terminal />;
      case 'agents':
        return <AgentPanel />;
      case 'models':
        return <ModelManager />;
      case 'memory':
        return <MemoryPanel />;
      case 'architecture':
        return <Architecture />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden">
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
