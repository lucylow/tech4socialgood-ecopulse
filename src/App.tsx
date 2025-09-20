'use client'

import { useState, useEffect, useRef } from 'react'
import { Globe } from './components/Globe'
import { MetricsPanel } from './components/MetricsPanel'

interface EarthMetrics {
  co2Level: number
  toxicityLevel: number
  temperature: number
  humanPopulation: number
  animalPopulation: number
  plantPopulation: number
  oceanAcidity: number
  iceCapMelting: number
}

function App() {
  const [metrics, setMetrics] = useState<EarthMetrics>({
    co2Level: 415,
    toxicityLevel: 5,
    temperature: 30,
    humanPopulation: 9000000000,
    animalPopulation: 100000000000,
    plantPopulation: 1000000000000,
    oceanAcidity: 8.1,
    iceCapMelting: 10,
  })

  const [isSimulationRunning, setIsSimulationRunning] = useState(false)
  const [pollutionLevel, setPollutionLevel] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const processUserCommand = async (command: string) => {
    setIsProcessing(true)
    setCurrentAnalysis('')
    
    // Simulate processing for demo
    setTimeout(() => {
      setCurrentAnalysis(`Processed command: "${command}". This simulation helps students understand how human actions directly impact climate systems. Each action demonstrates the interconnected nature of environmental science.`)
      
      // Update metrics based on command type
      if (command.toLowerCase().includes('tree') || command.toLowerCase().includes('plant')) {
        setMetrics(prev => ({
          ...prev,
          co2Level: Math.max(prev.co2Level - 10, 350),
          plantPopulation: prev.plantPopulation + 1000000000,
        }))
        setPollutionLevel(prev => Math.max(prev - 5, 0))
      } else if (command.toLowerCase().includes('energy') || command.toLowerCase().includes('renewable')) {
        setMetrics(prev => ({
          ...prev,
          co2Level: Math.max(prev.co2Level - 15, 350),
          temperature: Math.max(prev.temperature - 0.5, 25),
        }))
        setPollutionLevel(prev => Math.max(prev - 8, 0))
      }
      
      setIsProcessing(false)
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isProcessing && userInput.trim()) {
      processUserCommand(userInput.trim())
      setUserInput('')
    }
  }

  const resetEarth = () => {
    setMetrics({
      co2Level: 415,
      toxicityLevel: 5,
      temperature: 30,
      humanPopulation: 9000000000,
      animalPopulation: 100000000000,
      plantPopulation: 1000000000000,
      oceanAcidity: 8.1,
      iceCapMelting: 10,
    })
    setPollutionLevel(0)
    setIsSimulationRunning(false)
    setCurrentAnalysis('')
    setIsProcessing(false)
  }

  // Auto-simulation loop
  useEffect(() => {
    if (!isSimulationRunning || isProcessing) return

    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        co2Level: Math.min(prev.co2Level + 0.1, 2000),
        toxicityLevel: Math.min(prev.toxicityLevel + 0.05, 100),
        temperature: Math.min(prev.temperature + 0.01, 50),
        humanPopulation: Math.max(prev.humanPopulation - 100, 0),
        animalPopulation: Math.max(prev.animalPopulation - 500, 0),
        plantPopulation: Math.max(prev.plantPopulation - 5000, 0),
        oceanAcidity: Math.max(prev.oceanAcidity - 0.001, 6.0),
        iceCapMelting: Math.min(prev.iceCapMelting + 0.05, 100),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [isSimulationRunning, isProcessing])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K'
    return num.toFixed(0)
  }

  const getHealthColor = (value: number, max: number, reverse = false) => {
    const percentage = value / max
    const adjustedPercentage = reverse ? 1 - percentage : percentage
    
    if (adjustedPercentage < 0.3) return 'text-green-400'
    if (adjustedPercentage < 0.7) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white">
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🌍</span>
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Globe Visualization */}
            <div className="lg:col-span-2 relative">
              <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 h-96">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">Interactive Climate Education</h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-emerald-400 text-sm">Live Simulation</span>
                  </div>
                </div>
                <div className="mb-4 p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-200 text-sm">
                    <strong>Learning Goal:</strong> Explore how human actions impact our planet's climate systems. 
                    Try commands like "plant 1 million trees" or "build renewable energy plants" to see positive changes!
                  </p>
                </div>
                <div className="h-full bg-slate-950/50 rounded-xl relative overflow-hidden flex items-center justify-center">
                  <Globe />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-white text-lg font-medium">Interactive Earth Model</p>
                    <p className="text-slate-300 text-sm">Environmental simulation in progress</p>
                    {pollutionLevel > 0 && (
                      <div className="mt-2 p-2 bg-red-900/30 border border-red-500/30 rounded-lg">
                        <p className="text-red-300 text-sm">Pollution Level: {pollutionLevel.toFixed(1)}%</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Control Panel */}
            <div className="space-y-6">
              {/* Educational Framework Panel */}
              <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">🎓 Educational Framework</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
                    <h4 className="text-sm font-semibold text-yellow-400 mb-2">🎯 Learning Objectives</h4>
                    <p className="text-blue-200 text-sm">
                      Explore how human actions impact Earth's climate systems. Each action demonstrates the 
                      interconnected nature of environmental science.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-green-900/30 border border-green-500/30 rounded-lg">
                      <h5 className="text-xs font-semibold text-green-300 mb-1">🌱 Reforestation</h5>
                      <p className="text-green-200 text-xs">Plant trees to absorb CO₂</p>
                      <p className="text-green-100 text-xs italic">Reduces atmospheric CO₂, improves air quality</p>
                    </div>
                    
                    <div className="p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg">
                      <h5 className="text-xs font-semibold text-blue-300 mb-1">⚡ Clean Energy</h5>
                      <p className="text-blue-200 text-xs">Switch to renewable sources</p>
                      <p className="text-blue-100 text-xs italic">Reduces fossil fuel dependence</p>
                    </div>
                    
                    <div className="p-3 bg-purple-900/30 border border-purple-500/30 rounded-lg">
                      <h5 className="text-xs font-semibold text-purple-300 mb-1">🚗 Green Transport</h5>
                      <p className="text-purple-200 text-xs">Electrify transportation</p>
                      <p className="text-purple-100 text-xs italic">Lowers emissions from transport</p>
                    </div>
                    
                    <div className="p-3 bg-cyan-900/30 border border-cyan-500/30 rounded-lg">
                      <h5 className="text-xs font-semibold text-cyan-300 mb-1">🌊 Ocean Cleanup</h5>
                      <p className="text-cyan-200 text-xs">Remove plastic pollution</p>
                      <p className="text-cyan-100 text-xs italic">Protects marine ecosystems</p>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
                    <p className="text-yellow-200 text-xs">
                      <strong>💡 Educational Tip:</strong> Each action shows real-time impact on multiple environmental metrics, 
                      helping you understand the complexity of climate systems.
                    </p>
                  </div>
                </div>
              </div>

              {/* Simulation Controls */}
              <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Simulation Controls</h3>
                
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setIsSimulationRunning(!isSimulationRunning)}
                    disabled={isProcessing}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg transition-colors"
                  >
                    {isSimulationRunning ? 'Pause' : 'Start'} Simulation
                  </button>
                  <button
                    onClick={resetEarth}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    title="Restore Earth to pristine condition"
                  >
                    🌱 Reset Earth
                  </button>
                </div>
                
                {/* Quick Actions */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-emerald-300 mb-2">💡 Try These Educational Actions:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => processUserCommand("Plant 1 million trees worldwide")}
                      disabled={isProcessing}
                      className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 rounded-lg text-xs transition-colors"
                    >
                      🌳 Plant Trees
                    </button>
                    <button
                      onClick={() => processUserCommand("Build 100 renewable energy plants")}
                      disabled={isProcessing}
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg text-xs transition-colors"
                    >
                      ⚡ Clean Energy
                    </button>
                    <button
                      onClick={() => processUserCommand("Switch to electric vehicles globally")}
                      disabled={isProcessing}
                      className="px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg text-xs transition-colors"
                    >
                      🚗 Electric Cars
                    </button>
                    <button
                      onClick={() => processUserCommand("Clean up ocean plastic waste")}
                      disabled={isProcessing}
                      className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 rounded-lg text-xs transition-colors"
                    >
                      🌊 Ocean Cleanup
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mb-4">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Ask: 'What if we planted 1 million trees?' or 'Show me the impact of renewable energy'"
                      disabled={isProcessing}
                      className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 disabled:bg-slate-700"
                    />
                    <button
                      type="submit"
                      disabled={isProcessing || !userInput.trim()}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg transition-colors"
                    >
                      {isProcessing ? 'Processing...' : 'Send'}
                    </button>
                  </div>
                </form>

                {currentAnalysis && (
                  <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
                    <h4 className="text-sm font-semibold text-yellow-400 mb-2">🧠 Learning Analysis:</h4>
                    <div className="text-sm text-gray-200 whitespace-pre-line">
                      {currentAnalysis}
                    </div>
                  </div>
                )}
              </div>

              {/* Metrics Panel */}
              <MetricsPanel metrics={metrics} pollutionLevel={pollutionLevel} formatNumber={formatNumber} getHealthColor={getHealthColor} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App