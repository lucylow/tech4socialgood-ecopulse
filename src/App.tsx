import { useState } from 'react'
import { Globe } from './components/Globe'
import { MetricsPanel } from './components/MetricsPanel'
import { Leaf, Globe as GlobeIcon, Zap } from 'lucide-react'

function App() {
  const [selectedMetric, setSelectedMetric] = useState<string>('temperature')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <Zap className="absolute -bottom-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">EcoPulse</h1>
              <p className="text-sm text-emerald-300">AI Climate Education</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 bg-emerald-900/50 border border-emerald-700 rounded-lg">
              <span className="text-emerald-300 text-sm font-medium">Tech 4 Social Good</span>
            </div>
            <GlobeIcon className="h-6 w-6 text-emerald-400 animate-spin" style={{animationDuration: '8s'}} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
            
            {/* Globe Visualization */}
            <div className="lg:col-span-2 relative">
              <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">Climate Impact Visualization</h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-emerald-400 text-sm">Live Data</span>
                  </div>
                </div>
                <div className="h-full bg-slate-950/50 rounded-xl relative overflow-hidden">
                  <Globe selectedMetric={selectedMetric} />
                  
                  {/* Overlay Info */}
                  <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-3">
                    <p className="text-white text-sm font-medium">Interactive Earth Model</p>
                    <p className="text-slate-300 text-xs">Click and drag to explore</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Panel */}
            <div className="space-y-6">
              <MetricsPanel 
                selectedMetric={selectedMetric}
                onMetricSelect={setSelectedMetric}
              />
              
              {/* AI Assistant Preview */}
              <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                    <Zap className="h-4 w-4 text-slate-900" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">AI Climate Coach</h3>
                </div>
                <div className="bg-slate-950/50 rounded-lg p-4">
                  <p className="text-slate-300 text-sm mb-3">
                    💡 <strong>Did you know?</strong> The current temperature anomaly shows a +1.2°C increase since pre-industrial times.
                  </p>
                  <p className="text-emerald-400 text-sm">
                    Ask me about climate patterns, solutions, or how you can make an impact! 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App