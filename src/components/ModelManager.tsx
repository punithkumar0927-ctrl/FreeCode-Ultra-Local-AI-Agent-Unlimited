import { useState } from 'react';

interface Model {
  name: string;
  size: string;
  contextWindow: string;
  capabilities: string[];
  installed: boolean;
  gpu: boolean;
  speed: 'fast' | 'medium' | 'slow';
  rating: number;
}

const models: Model[] = [
  {
    name: 'qwen2.5-coder:7b',
    size: '4.1 GB',
    contextWindow: '32K',
    capabilities: ['Code Generation', 'Debugging', 'Refactoring', 'Tool Calling'],
    installed: true,
    gpu: true,
    speed: 'fast',
    rating: 4.5,
  },
  {
    name: 'llama3:8b',
    size: '4.7 GB',
    contextWindow: '8K',
    capabilities: ['General Coding', 'Explanation', 'Documentation'],
    installed: true,
    gpu: true,
    speed: 'fast',
    rating: 4.2,
  },
  {
    name: 'codellama:13b',
    size: '7.4 GB',
    contextWindow: '16K',
    capabilities: ['Code Completion', 'Fill-in-Middle', 'Multi-language'],
    installed: true,
    gpu: false,
    speed: 'medium',
    rating: 4.0,
  },
  {
    name: 'deepseek-coder:33b',
    size: '18.6 GB',
    contextWindow: '16K',
    capabilities: ['Advanced Coding', 'Complex Refactoring', 'Architecture'],
    installed: false,
    gpu: false,
    speed: 'slow',
    rating: 4.7,
  },
  {
    name: 'mistral:7b',
    size: '4.1 GB',
    contextWindow: '32K',
    capabilities: ['Fast Inference', 'Code Review', 'Summarization'],
    installed: false,
    gpu: true,
    speed: 'fast',
    rating: 4.1,
  },
  {
    name: 'phi3:14b',
    size: '7.9 GB',
    contextWindow: '128K',
    capabilities: ['Long Context', 'Reasoning', 'Math + Code'],
    installed: false,
    gpu: false,
    speed: 'medium',
    rating: 4.3,
  },
];

export default function ModelManager() {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [filter, setFilter] = useState<'all' | 'installed' | 'available'>('all');

  const handleInstall = (modelName: string) => {
    setDownloading(modelName);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setDownloading(null);
          return 0;
        }
        return p + Math.random() * 15;
      });
    }, 500);
  };

  const filteredModels = models.filter((m) => {
    if (filter === 'installed') return m.installed;
    if (filter === 'available') return !m.installed;
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🧠</span> Model Manager
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage local AI models via Ollama — no API keys, no costs, unlimited usage
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full">
            Ollama v0.3.8 • Running
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="text-xl font-bold text-white">3</p>
          <p className="text-[10px] text-gray-500">Installed</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="text-xl font-bold text-white">36.9 GB</p>
          <p className="text-[10px] text-gray-500">Total Size</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="text-xl font-bold text-emerald-400">GPU</p>
          <p className="text-[10px] text-gray-500">Acceleration</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
          <p className="text-xl font-bold text-cyan-400">∞</p>
          <p className="text-[10px] text-gray-500">Free Inference</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-4">
        {(['all', 'installed', 'available'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === f
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Model Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredModels.map((model) => (
          <div
            key={model.name}
            className={`bg-gray-900 border rounded-xl p-5 transition-all ${
              model.installed ? 'border-emerald-500/20' : 'border-gray-800'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-white font-mono">{model.name}</h3>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  {model.size} • {model.contextWindow} context • {model.speed} inference
                </p>
              </div>
              {model.installed && (
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">
                  ✓ Installed
                </span>
              )}
            </div>

            {/* Capabilities */}
            <div className="flex flex-wrap gap-1 mb-3">
              {model.capabilities.map((cap) => (
                <span key={cap} className="text-[10px] px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full">
                  {cap}
                </span>
              ))}
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 mb-3">
              {model.gpu && (
                <span className="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded-full">
                  🎮 GPU Ready
                </span>
              )}
              <span className="text-[10px] text-gray-500">
                {'★'.repeat(Math.floor(model.rating))}{'☆'.repeat(5 - Math.floor(model.rating))} {model.rating}
              </span>
            </div>

            {/* Actions */}
            {downloading === model.name ? (
              <div className="space-y-1">
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-500">
                  Downloading... {Math.min(Math.round(progress), 100)}%
                </p>
              </div>
            ) : model.installed ? (
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-medium hover:bg-emerald-500/20 transition-colors">
                  Use Model
                </button>
                <button className="py-1.5 px-3 bg-gray-800 text-gray-400 rounded-lg text-xs hover:text-red-400 transition-colors">
                  Remove
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleInstall(model.name)}
                className="w-full py-1.5 bg-cyan-500/10 text-cyan-400 rounded-lg text-xs font-medium hover:bg-cyan-500/20 transition-colors"
              >
                📥 Install via Ollama
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Ollama CLI Reference */}
      <div className="mt-6 bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Ollama CLI Reference</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <div className="bg-gray-950 rounded-lg p-3">
            <p className="text-gray-500 mb-1"># List installed models</p>
            <p className="text-emerald-400">$ ollama list</p>
          </div>
          <div className="bg-gray-950 rounded-lg p-3">
            <p className="text-gray-500 mb-1"># Pull a new model</p>
            <p className="text-emerald-400">$ ollama pull deepseek-coder:33b</p>
          </div>
          <div className="bg-gray-950 rounded-lg p-3">
            <p className="text-gray-500 mb-1"># Run interactive chat</p>
            <p className="text-emerald-400">$ ollama run qwen2.5-coder:7b</p>
          </div>
          <div className="bg-gray-950 rounded-lg p-3">
            <p className="text-gray-500 mb-1"># Check server status</p>
            <p className="text-emerald-400">$ curl localhost:11434/api/tags</p>
          </div>
        </div>
      </div>
    </div>
  );
}
