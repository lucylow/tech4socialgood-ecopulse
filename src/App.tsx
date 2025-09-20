import { useState } from 'react'
import { Globe } from './components/Globe'
import { MetricsPanel } from './components/MetricsPanel'
import { Leaf, Globe as GlobeIcon, Zap } from 'lucide-react'

function App() {
  const [selectedMetric, setSelectedMetric] = useState<string>('temperature')

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-climate opacity-90"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--primary-glow)_0%,_transparent_50%)] opacity-20"></div>
      
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-earth rounded-xl flex items-center justify-center climate-glow">
                <Leaf className="h-6 w-6 text-text-primary" />
              </div>
              <Zap className="absolute -bottom-1 -right-1 h-4 w-4 text-accent animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">EcoPulse</h1>
              <p className="text-text-secondary">AI Climate Education Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 bg-surface/80 backdrop-blur-sm border border-primary/20 rounded-xl">
              <span className="text-primary-glow text-sm font-medium">Tech 4 Social Good</span>
            </div>
            <div className="w-10 h-10 bg-surface/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <GlobeIcon className="h-5 w-5 text-primary-glow animate-spin-slow" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8 min-h-[calc(100vh-200px)]">
            
            {/* Globe Visualization */}
            <div className="lg:col-span-2 relative">
              <div className="bg-surface/40 backdrop-blur-xl border border-primary/20 rounded-3xl p-8 h-full climate-glow">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary mb-2">Climate Impact Visualization</h2>
                    <p className="text-text-muted">Interactive 3D Earth model with real-time climate data</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary-glow rounded-full animate-pulse"></div>
                    <span className="text-primary-glow text-sm font-medium">Live Data</span>
                  </div>
                </div>
                
                <div className="h-[500px] bg-background/30 rounded-2xl relative overflow-hidden border border-primary/10">
                  <Globe selectedMetric={selectedMetric} />
                  
                  {/* Enhanced Overlay Info */}
                  <div className="absolute top-6 left-6 bg-surface/90 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 climate-glow">
                    <p className="text-text-primary font-semibold mb-1">Interactive Earth Model</p>
                    <p className="text-text-muted text-sm">Click and drag to explore • Scroll to zoom</p>
                  </div>
                  
                  {/* Climate Status Indicators */}
                  <div className="absolute bottom-6 right-6 space-y-2">
                    <div className="bg-surface/90 backdrop-blur-xl border border-primary/20 rounded-xl p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-earth-blue rounded-full"></div>
                        <span className="text-text-primary text-sm">Ocean Health</span>
                      </div>
                    </div>
                    <div className="bg-surface/90 backdrop-blur-xl border border-primary/20 rounded-xl p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-toxic-green rounded-full"></div>
                        <span className="text-text-primary text-sm">Forest Coverage</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="space-y-6">
              {/* Metrics Panel */}
              <MetricsPanel 
                selectedMetric={selectedMetric}
                onMetricSelect={setSelectedMetric}
              />
              
              {/* AI Climate Coach */}
              <div className="bg-surface/40 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 climate-glow">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-warning rounded-2xl flex items-center justify-center">
                    <Zap className="h-6 w-6 text-background" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">AI Climate Coach</h3>
                    <p className="text-text-muted text-sm">Your personal sustainability guide</p>
                  </div>
                </div>
                
                <div className="bg-background/50 rounded-2xl p-6 border border-primary/10">
                  <div className="mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary-glow/20 rounded-lg flex items-center justify-center mt-1">
                        <span className="text-primary-glow text-lg">💡</span>
                      </div>
                      <div>
                        <p className="text-text-primary font-medium mb-2">Climate Insight</p>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          Current global temperature is <span className="text-pollution-red font-semibold">+1.2°C</span> above pre-industrial levels. 
                          This represents critical climate acceleration.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-primary/10">
                    <p className="text-primary-glow text-sm font-medium">
                      💬 Ask me about climate patterns, sustainable solutions, or how you can make an impact!
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="bg-surface/40 backdrop-blur-xl border border-primary/20 rounded-3xl p-6">
                <h4 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <button className="w-full bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-xl p-3 text-left eco-transition">
                    <span className="text-text-primary font-medium">🌍 Explore Climate Data</span>
                  </button>
                  <button className="w-full bg-toxic-green/20 hover:bg-toxic-green/30 border border-toxic-green/30 rounded-xl p-3 text-left eco-transition">
                    <span className="text-text-primary font-medium">🌱 Carbon Footprint</span>
                  </button>
                  <button className="w-full bg-earth-blue/20 hover:bg-earth-blue/30 border border-earth-blue/30 rounded-xl p-3 text-left eco-transition">
                    <span className="text-text-primary font-medium">🌊 Ocean Health</span>
                  </button>
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