'use client'

import { useState, useEffect, useRef } from 'react'
import EducationalPanel from '@/components/EducationalPanel'
import EnhancedAnalysisPanel from '@/components/EnhancedAnalysis'
import AccessibilityPanel from '@/components/AccessibilityPanel'

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

export default function Home() {
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
  const [enhancedAnalysis, setEnhancedAnalysis] = useState<any>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Accessibility state
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    reducedMotion: false,
    fontSize: 'medium' as 'small' | 'medium' | 'large',
    colorBlindness: 'none' as 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia',
    screenReader: false,
    keyboardNavigation: false,
    audioDescriptions: false
  })

  const processUserCommand = async (command: string) => {
    setIsProcessing(true)
    setCurrentAnalysis('')
    
    try {
      const response = await fetch('/api/process-command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          command,
          currentMetrics: metrics,
          pollutionLevel,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to process command')
      }

      const data = await response.json()
      setMetrics(data.metrics)
      setPollutionLevel(data.pollutionLevel)
      setCurrentAnalysis(data.analysis)
      setEnhancedAnalysis(data)

    } catch (error) {
      console.error('Error processing command:', error)
      setCurrentAnalysis('Error: Failed to process command. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isProcessing && userInput.trim()) {
      processUserCommand(userInput.trim())
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
    setEnhancedAnalysis(null)
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

  // Focus input on mount
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
    <div 
      className={`min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white ${accessibilitySettings.highContrast ? 'high-contrast' : ''} ${accessibilitySettings.reducedMotion ? 'reduced-motion' : ''}`}
      role="main"
      aria-label="EcoPulse Climate Impact Simulation"
    >
      {/* Skip to main content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

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
      <main id="main-content" className="relative">
        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Globe Visualization */}
            <div className="lg:col-span-2 relative">
              <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 h-96">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">Interactive Climate Education</h2>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 bg-emerald-400 rounded-full ${accessibilitySettings.reducedMotion ? '' : 'animate-pulse'}`}></div>
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
                  <div className="text-center">
                    <div className="text-8xl mb-4">🌍</div>
                    <p className="text-white text-lg font-medium">Interactive Earth Model</p>
                    <p className="text-slate-300 text-sm">Environmental simulation in progress</p>
                    {pollutionLevel > 0 && (
                      <div className="mt-4 p-4 bg-red-900/30 border border-red-500/30 rounded-lg">
                        <p className="text-red-300">Pollution Level: {pollutionLevel.toFixed(1)}%</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Control Panel */}
            <div className="space-y-6">
              {/* Educational Framework Panel */}
              <EducationalPanel onActionClick={processUserCommand} />
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
                    title="Restore Earth to pristine condition - learn how positive actions can heal our planet"
                  >
                    🌱 Reset Earth
                  </button>
                </div>
                
                {/* Educational Action Suggestions */}
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
                    <div className="mt-3 p-2 bg-blue-900/30 border border-blue-500/30 rounded text-xs">
                      <strong>📚 Educational Connection:</strong> This demonstrates the interconnected nature of Earth's climate systems. 
                      Understanding these relationships helps us make informed decisions about environmental policies and personal actions.
                    </div>
                  </div>
                )}
              </div>

              {/* Metrics Panel */}
              <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Earth Health Metrics</h3>
                
                <div className="space-y-4">
                  {/* CO2 Levels */}
                  <div className="bg-slate-800/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">CO₂ Level:</span>
                      <span className={`text-sm font-semibold ${getHealthColor(metrics.co2Level, 2000, true)}`}>
                        {metrics.co2Level.toFixed(0)} ppm
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          metrics.co2Level < 600 ? 'bg-green-400' : 
                          metrics.co2Level < 1000 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${Math.min((metrics.co2Level / 2000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Temperature */}
                  <div className="bg-slate-800/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">Temperature:</span>
                      <span className={`text-sm font-semibold ${getHealthColor(metrics.temperature, 50)}`}>
                        {metrics.temperature.toFixed(1)}°C
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          metrics.temperature < 35 ? 'bg-blue-400' : 
                          metrics.temperature < 40 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${Math.min((metrics.temperature / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Population Metrics */}
                  <div className="bg-slate-800/30 rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase">Biodiversity</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-300">Humans:</span>
                        <span className="text-gray-300">{formatNumber(metrics.humanPopulation)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-300">Animals:</span>
                        <span className="text-gray-300">{formatNumber(metrics.animalPopulation)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-300">Plants:</span>
                        <span className="text-gray-300">{formatNumber(metrics.plantPopulation)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Overall Pollution */}
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300 font-semibold">Pollution Level:</span>
                      <span className={`text-sm font-bold ${getHealthColor(pollutionLevel, 100)}`}>
                        {pollutionLevel.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          pollutionLevel < 30 ? 'bg-green-400' : 
                          pollutionLevel < 70 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${pollutionLevel}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced AI Analysis Panel */}
          {enhancedAnalysis && enhancedAnalysis.predictions && (
            <div className="mt-8">
              <EnhancedAnalysisPanel analysis={enhancedAnalysis} />
            </div>
          )}
        </div>
      </main>
      
      {/* Accessibility Panel */}
      <AccessibilityPanel onSettingsChange={setAccessibilitySettings} />
    </div>
  )
}