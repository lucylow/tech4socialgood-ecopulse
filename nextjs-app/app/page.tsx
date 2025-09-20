'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Send, RotateCcw, Play, Pause, Brain, Users, Thermometer, AlertTriangle, Loader2 } from 'lucide-react'

// Dynamically import the 3D components to avoid SSR issues
const Globe = dynamic(() => import('../components/Globe'), { ssr: false })
const MetricsPanel = dynamic(() => import('../components/MetricsPanel'), { ssr: false })

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

interface AICommand {
  command: string
  analysis: string
  timestamp: Date
  responseTime: number
  model: string
}

// Import mock data for better command suggestions
import { MOCK_COMMAND_SUGGESTIONS } from '../lib/mockHooks'

const exampleCommands = [
  "Build 100 renewable energy plants",
  "Plant 1 million trees worldwide", 
  "Install solar panels on every roof",
  "Switch to electric vehicles globally",
  "Protect the Amazon rainforest",
  "Clean up ocean plastic waste",
  "Implement carbon capture technology",
  "Restore coral reef ecosystems",
  "Reduce industrial emissions by 50%",
  "Promote sustainable agriculture",
  "Build green cities with smart grids",
  "Create marine protected areas",
  "Develop renewable energy storage",
  "Support wildlife conservation",
  "Implement circular economy practices",
  "Reduce food waste globally",
  "Promote public transportation"
]

const availableModels = [
  { id: 'llama3.2:1b', name: 'Llama 3.2 (1B)', description: 'Fast, minimal reasoning (default)', disabled: false },
  { id: 'deepseek-r1:8b', name: 'DeepSeek R1 (8B)', description: 'Slow & accurate', disabled: true },
  { id: 'qwen3:8b', name: 'Qwen3 (8B)', description: 'Fast inference', disabled: true },
  { id: 'deepseek-r1:1.5b', name: 'DeepSeek R1 (1.5B)', description: 'Fast inference', disabled: true }
]

export default function Home() {
  const [metrics, setMetrics] = useState<EarthMetrics>({
    co2Level: 415, // Starting CO2 level (ppm)
    toxicityLevel: 5, // Starting toxicity level (1-100)
    temperature: 30, // Starting temperature (°C) - hotter baseline
    humanPopulation: 9000000000, // 9 billion humans
    animalPopulation: 100000000000, // 100 billion animals
    plantPopulation: 1000000000000,
    oceanAcidity: 8.1, // pH level
    iceCapMelting: 10, // Percentage melted
  })

  const [isSimulationRunning, setIsSimulationRunning] = useState(false)
  const [pollutionLevel, setPollutionLevel] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [commandHistory, setCommandHistory] = useState<AICommand[]>([])
  const [currentAnalysis, setCurrentAnalysis] = useState<string>('')
  const [aiThinkingLog, setAiThinkingLog] = useState<string[]>([])
  const [specialEvent, setSpecialEvent] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState('llama3.2:1b')
  const inputRef = useRef<HTMLInputElement>(null)

  // AI thinking process simulation
  const thinkingSteps = [
    "Analyzing environmental impact...",
    "Calculating CO2 emissions...",
    "Estimating population effects...",
    "Computing temperature changes...",
    "Assessing ocean acidification...",
    "Evaluating biodiversity loss...",
    "Projecting climate consequences...",
    "Finalizing impact assessment..."
  ]

  const processUserCommand = async (command: string) => {
    setIsProcessing(true)
    setAiThinkingLog([])
    setCurrentAnalysis('')
    
    const startTime = Date.now()
    
    // Simulate AI thinking process
    for (let i = 0; i < thinkingSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setAiThinkingLog(prev => [...prev, thinkingSteps[i]])
    }

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
          model: 'llama3.2:1b', // Always use llama3.2:1b
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to process command')
      }

      const data = await response.json()
      const endTime = Date.now()
      const responseTime = (endTime - startTime) / 1000

      // Update metrics
      setMetrics(data.metrics)
      setPollutionLevel(data.pollutionLevel)
      setCurrentAnalysis(data.analysis)
      setSpecialEvent(data.specialEvent)

      // Add to command history
      const newCommand: AICommand = {
        command,
        analysis: data.analysis,
        timestamp: new Date(),
        responseTime,
        model: 'llama3.2:1b' // Always use llama3.2:1b
      }
      setCommandHistory(prev => [newCommand, ...prev.slice(0, 9)]) // Keep last 10

    } catch (error) {
      console.error('Error processing command:', error)
      setCurrentAnalysis('Error: Failed to process command. Please try again.')
    } finally {
      setIsProcessing(false)
      setAiThinkingLog([])
      // Special events are permanent until full reset or God save
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isProcessing && userInput.trim()) {
      processUserCommand(userInput.trim())
    }
  }

  const handleExampleClick = (example: string) => {
    if (isProcessing) return
    setUserInput(example)
    // Auto-submit after a short delay
    setTimeout(() => {
      processUserCommand(example)
    }, 100)
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
    setCommandHistory([])
    setCurrentAnalysis('')
    setSpecialEvent(null)
    setAiThinkingLog([])
    setIsProcessing(false)
  }

  // Auto-simulation loop for continuous degradation
  useEffect(() => {
    if (!isSimulationRunning || isProcessing) return // Pause auto-sim when processing commands

    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        co2Level: Math.min(prev.co2Level + 0.1, 2000), // Much slower degradation
        toxicityLevel: Math.min(prev.toxicityLevel + 0.05, 100),
        temperature: Math.min(prev.temperature + 0.01, 50),
        humanPopulation: Math.max(prev.humanPopulation - 100, 0),
        animalPopulation: Math.max(prev.animalPopulation - 500, 0),
        plantPopulation: Math.max(prev.plantPopulation - 5000, 0),
        oceanAcidity: Math.max(prev.oceanAcidity - 0.001, 6.0),
        iceCapMelting: Math.min(prev.iceCapMelting + 0.05, 100),
      }))
    }, 5000) // Much slower - every 5 seconds instead of 2

    return () => clearInterval(interval)
  }, [isSimulationRunning, isProcessing]) // Also depend on isProcessing

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="globe-container">
      {/* 3D Globe */}
      <Globe 
        pollutionLevel={pollutionLevel} 
        metrics={metrics} 
        specialEvent={specialEvent}
      />
      
      {/* Pollution Overlay */}
      <div className="pollution-overlay">
        {pollutionLevel > 0 && (
          <div 
            className="absolute inset-0 bg-red-500 opacity-20"
            style={{ opacity: Math.min(pollutionLevel / 100 * 0.4, 0.4) }}
          />
        )}
      </div>

      {/* Control Panel */}
      <div className="absolute top-4 left-4 z-20">
        <div className="metrics-panel rounded-xl p-6 mb-4 max-w-sm max-h-[80vh] overflow-y-auto bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 shadow-2xl">
          <div className="mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-1">
              🌍 EcoPulse
            </h1>
            <p className="text-sm text-gray-400">Climate Impact Simulation Platform</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Enhanced with comprehensive environmental data</span>
            </div>
          </div>
          
          {/* Simulation Controls */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setIsSimulationRunning(!isSimulationRunning)}
              disabled={isProcessing}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isSimulationRunning ? <Pause size={16} /> : <Play size={16} />}
              {isSimulationRunning ? 'Pause' : 'Start'} Simulation
            </button>
            <button
              onClick={resetEarth}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          {/* Command Input */}
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Describe an environmental action..."
                disabled={isProcessing}
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 disabled:bg-gray-700/50 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
              <button
                type="submit"
                disabled={isProcessing || !userInput.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
              >
                {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                Send
              </button>
            </div>
          </form>

          {/* Example Commands */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-3 text-gray-300 flex items-center gap-2">
              <Brain size={14} className="text-blue-400" />
              Suggested Actions:
            </h3>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {exampleCommands.slice(0, 6).map((example, index) => {
                const mockSuggestion = MOCK_COMMAND_SUGGESTIONS.find(cmd => cmd.command === example);
                const category = mockSuggestion?.category || 'positive';
                const icon = mockSuggestion?.icon || '🌱';
                const impact = mockSuggestion?.impact || 'medium';
                
                return (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(example)}
                    disabled={isProcessing}
                    className={`block w-full text-left px-3 py-2 text-xs rounded-lg border transition-all duration-200 backdrop-blur-sm ${
                      category === 'positive' 
                        ? 'bg-green-700/20 hover:bg-green-700/40 border-green-500/30 hover:border-green-400/60 text-green-200' 
                        : category === 'negative'
                        ? 'bg-red-700/20 hover:bg-red-700/40 border-red-500/30 hover:border-red-400/60 text-red-200'
                        : 'bg-gray-700/50 hover:bg-gray-700/70 border-gray-600/30 hover:border-gray-500/50 text-gray-300'
                    } disabled:bg-gray-800/50 disabled:text-gray-500 disabled:border-gray-600/20`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{icon}</span>
                      <span className="flex-1">{example}</span>
                      <span className={`text-xs px-1 py-0.5 rounded ${
                        impact === 'low' ? 'bg-green-500/20 text-green-300' :
                        impact === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        impact === 'high' ? 'bg-orange-500/20 text-orange-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {impact}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Thinking Log */}
          {aiThinkingLog.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-3 text-gray-300 flex items-center gap-2">
                <Brain size={14} className="text-blue-400" />
                AI Analysis:
              </h3>
              <div className="space-y-2 bg-gray-800/30 rounded-lg p-3 backdrop-blur-sm">
                {aiThinkingLog.map((step, index) => (
                  <div key={index} className="text-xs text-gray-300 flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse"></div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Analysis */}
          {currentAnalysis && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-3 text-gray-300 flex items-center gap-2">
                <AlertTriangle size={14} className="text-yellow-400" />
                Impact Analysis:
              </h3>
              <div className="max-h-40 overflow-y-auto bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4 rounded-lg border border-gray-600/30 backdrop-blur-sm">
                <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">
                  {currentAnalysis}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metrics Panel */}
      <div className="absolute top-4 right-4 z-20">
        <MetricsPanel metrics={metrics} pollutionLevel={pollutionLevel} />
      </div>

      {/* Command History */}
      <div className="absolute bottom-4 right-4 z-20">
        <div className="metrics-panel rounded-xl p-4 max-w-md bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 shadow-2xl">
          <h3 className="text-sm font-semibold mb-3 text-gray-300 flex items-center gap-2">
            <Users size={14} className="text-blue-400" />
            Recent Actions:
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {commandHistory.map((cmd, index) => (
              <div key={index} className="text-xs border-l-2 border-blue-500 pl-2">
                <div className="text-gray-400 mb-1">
                  <span className="font-semibold">{cmd.model}</span> • {cmd.responseTime.toFixed(1)}s
                </div>
                <div className="text-gray-300 mb-1">{cmd.command}</div>
                <div className="text-gray-500 text-xs">{cmd.timestamp.toLocaleTimeString()}</div>
              </div>
            ))}
            {commandHistory.length === 0 && (
              <div className="text-gray-500 text-xs">No commands yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Model Selection */}
      <div className="absolute bottom-4 left-4 z-20">
        <div className="metrics-panel rounded-xl p-4 bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 shadow-2xl">
          <h3 className="text-sm font-semibold mb-3 text-gray-300 flex items-center gap-2">
            <Brain size={14} className="text-green-400" />
            AI Model:
          </h3>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel('llama3.2:1b')}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm disabled:bg-gray-700"
          >
            {availableModels.map((model) => (
              <option key={model.id} value={model.id} disabled={model.disabled}>
                {model.name} - {model.description}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
} 