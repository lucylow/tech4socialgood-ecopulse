'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Send, RotateCcw, Play, Pause, Brain, Users, Thermometer, AlertTriangle, Loader2, Accessibility, Languages, Settings } from 'lucide-react'

// Dynamically import the 3D components to avoid SSR issues
const Globe = dynamic(() => import('../components/Globe'), { ssr: false })
const MetricsPanel = dynamic(() => import('../components/MetricsPanel'), { ssr: false })

// Import accessibility utilities
import { 
  prefersReducedMotion, 
  prefersHighContrast, 
  generateAriaLabel, 
  generateScenarioDescription,
  handleKeyboardNavigation,
  announceToScreenReader,
  KEYBOARD_SHORTCUTS,
  ACCESSIBILITY_CONFIG,
  getUserPreferredLanguage,
  formatNumber,
  formatPercentage
} from '../lib/accessibility'

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

  // Accessibility state
  const [highContrastMode, setHighContrastMode] = useState(false)
  const [reducedMotionMode, setReducedMotionMode] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false)
  const [announcements, setAnnouncements] = useState<string[]>([])
  const [focusVisible, setFocusVisible] = useState(false)

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

  // Initialize accessibility features
  useEffect(() => {
    // Check user preferences
    setHighContrastMode(prefersHighContrast())
    setReducedMotionMode(prefersReducedMotion())
    setCurrentLanguage(getUserPreferredLanguage())
    
    // Announce page load to screen readers
    announceToScreenReader('EcoPulse climate simulation loaded. Press I to focus on input, R to reset, Space to pause simulation.')
    
    // Setup keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyboardNavigation(e, {
        onReset: () => {
          resetEarth()
          announceToScreenReader('Earth simulation reset to initial state')
        },
        onPause: () => {
          setIsSimulationRunning(!isSimulationRunning)
          announceToScreenReader(isSimulationRunning ? 'Simulation paused' : 'Simulation started')
        },
        onFocusInput: () => {
          inputRef.current?.focus()
          announceToScreenReader('Focus moved to command input')
        },
        onEscape: () => {
          setShowAccessibilityPanel(false)
          announceToScreenReader('Accessibility panel closed')
        },
        onHelp: () => {
          setShowAccessibilityPanel(true)
          announceToScreenReader('Accessibility panel opened')
        }
      })
    }
    
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSimulationRunning])

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Announce metric changes to screen readers
  useEffect(() => {
    if (metrics && announcements.length > 0) {
      const latestAnnouncement = announcements[announcements.length - 1]
      announceToScreenReader(latestAnnouncement)
    }
  }, [metrics, announcements])

  return (
    <div 
      className={`globe-container relative overflow-hidden ${highContrastMode ? 'high-contrast' : ''} ${reducedMotionMode ? 'reduced-motion' : ''}`}
      role="main"
      aria-label="EcoPulse Climate Impact Simulation"
      id="main-content"
    >
      {/* Skip to main content link for screen readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      {/* Enhanced Background with Animated Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>
        <div 
          className={`absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_transparent_0deg,_rgba(34,197,94,0.1)_60deg,_transparent_120deg,_rgba(59,130,246,0.1)_180deg,_transparent_240deg,_rgba(34,197,94,0.1)_300deg,_transparent_360deg)] ${reducedMotionMode ? '' : 'animate-spin'}`}
          style={{animationDuration: reducedMotionMode ? '0s' : '20s'}}
        ></div>
      </div>

      {/* Floating Particles Background */}
      <div 
        className="absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {Array.from({ length: reducedMotionMode ? 0 : 50 }, (_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-emerald-400/30 rounded-full ${reducedMotionMode ? '' : 'animate-pulse'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: reducedMotionMode ? '0s' : `${Math.random() * 3}s`,
              animationDuration: reducedMotionMode ? '0s' : `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* 3D Globe */}
      <Globe 
        pollutionLevel={pollutionLevel} 
        metrics={metrics} 
        specialEvent={specialEvent}
      />
      
      {/* Enhanced Pollution Overlay */}
      <div 
        className="pollution-overlay"
        aria-label={`Pollution level: ${pollutionLevel.toFixed(1)}%`}
        role="img"
      >
        {pollutionLevel > 0 && (
          <div 
            className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-orange-500/15 to-red-600/25"
            style={{ 
              opacity: Math.min(pollutionLevel / 100 * 0.6, 0.6),
              transition: reducedMotionMode ? 'none' : 'opacity 0.3s ease'
            }}
          />
        )}
      </div>

      {/* Accessibility Panel */}
      {showAccessibilityPanel && (
        <div 
          className="absolute top-4 right-4 z-50 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl p-6 max-w-sm"
          role="dialog"
          aria-labelledby="accessibility-panel-title"
          aria-modal="true"
        >
          <h2 id="accessibility-panel-title" className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Accessibility size={20} />
            Accessibility Settings
          </h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 text-white">
              <input
                type="checkbox"
                checked={highContrastMode}
                onChange={(e) => setHighContrastMode(e.target.checked)}
                className="w-4 h-4"
              />
              High Contrast Mode
            </label>
            <label className="flex items-center gap-3 text-white">
              <input
                type="checkbox"
                checked={reducedMotionMode}
                onChange={(e) => setReducedMotionMode(e.target.checked)}
                className="w-4 h-4"
              />
              Reduce Motion
            </label>
            <div>
              <label htmlFor="language-select" className="block text-sm text-gray-300 mb-2">
                Language
              </label>
              <select
                id="language-select"
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
                <option value="ar">العربية</option>
                <option value="hi">हिन्दी</option>
                <option value="pt">Português</option>
                <option value="ru">Русский</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => setShowAccessibilityPanel(false)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            aria-label="Close accessibility panel"
          >
            Close
          </button>
        </div>
      )}

      {/* Enhanced Control Panel - Responsive */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 w-full max-w-sm md:max-w-md">
        <div 
          className="metrics-panel rounded-2xl p-4 md:p-8 mb-4 md:mb-6 max-h-[85vh] overflow-y-auto bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300"
          role="region"
          aria-labelledby="control-panel-title"
        >
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <div 
                  className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
                  aria-hidden="true"
                >
                  <span className="text-2xl">🌍</span>
                </div>
                <div 
                  className={`absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full ${reducedMotionMode ? '' : 'animate-pulse'} shadow-lg`}
                  aria-hidden="true"
                ></div>
              </div>
              <div>
                <h1 
                  id="control-panel-title"
                  className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-500 bg-clip-text text-transparent"
                >
                  EcoPulse
                </h1>
                <p className="text-xs md:text-sm text-slate-400 font-medium">Climate Impact Simulation Platform</p>
              </div>
              <button
                onClick={() => setShowAccessibilityPanel(!showAccessibilityPanel)}
                className="ml-auto p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50"
                aria-label="Open accessibility settings"
                title="Accessibility Settings (F1)"
              >
                <Settings size={20} />
              </button>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <div 
                className={`w-2 h-2 bg-emerald-400 rounded-full ${reducedMotionMode ? '' : 'animate-pulse'} shadow-lg`}
                aria-hidden="true"
              ></div>
              <span className="text-xs text-emerald-300 font-medium">Live Environmental Data</span>
              <div className="ml-auto text-xs text-slate-500">AI Enhanced</div>
            </div>
          </div>
          
          {/* Enhanced Simulation Controls - Responsive */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 md:mb-6" role="group" aria-label="Simulation controls">
            <button
              onClick={() => setIsSimulationRunning(!isSimulationRunning)}
              disabled={isProcessing}
              className={`flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 disabled:from-slate-600 disabled:via-slate-700 disabled:to-slate-800 rounded-xl ${reducedMotionMode ? '' : 'transition-all duration-300'} shadow-lg hover:shadow-blue-500/25 ${reducedMotionMode ? '' : 'hover:scale-105'} disabled:hover:scale-100 disabled:shadow-none border border-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900`}
              aria-label={`${isSimulationRunning ? 'Pause' : 'Start'} simulation. Press Space bar for keyboard shortcut.`}
              title={`${isSimulationRunning ? 'Pause' : 'Start'} simulation (Space)`}
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                {isSimulationRunning ? <Pause size={16} className="sm:hidden" /> : <Play size={16} className="sm:hidden" />}
                {isSimulationRunning ? <Pause size={18} className="hidden sm:block" /> : <Play size={18} className="hidden sm:block" />}
              </div>
              <span className="font-semibold text-xs sm:text-sm">
                {isSimulationRunning ? 'Pause' : 'Start'} Simulation
              </span>
            </button>
            <button
              onClick={resetEarth}
              className={`flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:via-emerald-800 hover:to-emerald-900 rounded-xl ${reducedMotionMode ? '' : 'transition-all duration-300'} shadow-lg hover:shadow-emerald-500/25 ${reducedMotionMode ? '' : 'hover:scale-105'} border border-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900`}
              aria-label="Reset Earth to initial state. Press R for keyboard shortcut."
              title="Reset Earth (R)"
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                <RotateCcw size={16} className="sm:hidden" />
                <RotateCcw size={18} className="hidden sm:block" />
              </div>
              <span className="font-semibold text-xs sm:text-sm">Reset</span>
            </button>
          </div>

          {/* Enhanced Command Input - Responsive */}
          <form onSubmit={handleSubmit} className="mb-4 md:mb-6">
            <div className="relative">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Describe an environmental action..."
                    disabled={isProcessing}
                    className="w-full px-3 sm:px-5 py-3 sm:py-4 bg-slate-800/60 border border-slate-600/60 rounded-xl text-white placeholder-slate-400 disabled:bg-slate-700/60 backdrop-blur-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-xs sm:text-sm font-medium"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4">
                    <Brain size={14} className="sm:hidden text-slate-500" />
                    <Brain size={16} className="hidden sm:block text-slate-500" />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isProcessing || !userInput.trim()}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:via-emerald-800 hover:to-emerald-900 disabled:from-slate-600 disabled:via-slate-700 disabled:to-slate-800 rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 hover:scale-105 disabled:hover:scale-100 disabled:shadow-none border border-emerald-500/20"
                >
                  {isProcessing ? (
                    <Loader2 size={16} className="sm:hidden animate-spin" />
                  ) : (
                    <Send size={16} className="sm:hidden" />
                  )}
                  {isProcessing ? (
                    <Loader2 size={18} className="hidden sm:block animate-spin" />
                  ) : (
                    <Send size={18} className="hidden sm:block" />
                  )}
                  <span className="font-semibold text-xs sm:text-sm">Send</span>
                </button>
              </div>
            </div>
          </form>

          {/* Enhanced Example Commands */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain size={16} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-200">Suggested Actions</h3>
            </div>
            <div className="max-h-48 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
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
                    className={`group block w-full text-left px-4 py-3 text-sm rounded-xl border transition-all duration-300 backdrop-blur-sm hover:scale-105 disabled:hover:scale-100 ${
                      category === 'positive' 
                        ? 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 hover:border-emerald-400/60 text-emerald-200 shadow-emerald-500/10' 
                        : category === 'negative'
                        ? 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30 hover:border-red-400/60 text-red-200 shadow-red-500/10'
                        : 'bg-slate-700/30 hover:bg-slate-700/50 border-slate-600/30 hover:border-slate-500/50 text-slate-300 shadow-slate-500/10'
                    } disabled:bg-slate-800/50 disabled:text-slate-500 disabled:border-slate-600/20 disabled:shadow-none`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center group-hover:bg-slate-600/50 transition-colors">
                        <span className="text-lg">{icon}</span>
                      </div>
                      <div className="flex-1">
                        <span className="font-medium">{example}</span>
                      </div>
                      <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                        impact === 'low' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        impact === 'medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                        impact === 'high' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                        'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}>
                        {impact}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Enhanced AI Thinking Log */}
          {aiThinkingLog.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Brain size={16} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-200">AI Analysis</h3>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-purple-300 font-medium">Processing...</span>
                </div>
              </div>
              <div className="space-y-3 bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-xl p-4 backdrop-blur-sm border border-slate-700/50">
                {aiThinkingLog.map((step, index) => (
                  <div key={index} className="flex items-center gap-4 text-sm text-slate-300">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">{step}</span>
                    </div>
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Current Analysis */}
          {currentAnalysis && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <AlertTriangle size={16} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-200">Impact Analysis</h3>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-amber-300 font-medium">Complete</span>
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-5 rounded-xl border border-slate-600/50 backdrop-blur-sm shadow-lg">
                <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line font-medium">
                  {currentAnalysis}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Metrics Panel - Responsive */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-full max-w-sm md:max-w-md">
        <MetricsPanel metrics={metrics} pollutionLevel={pollutionLevel} />
      </div>

      {/* Enhanced Command History - Responsive */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-20 w-full max-w-sm md:max-w-lg">
        <div className="metrics-panel rounded-2xl p-4 md:p-6 bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Users size={16} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">Recent Actions</h3>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-blue-300 font-medium">Live</span>
            </div>
          </div>
          <div className="space-y-3 max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
            {commandHistory.map((cmd, index) => (
              <div key={index} className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-xs font-semibold text-blue-300">{cmd.model}</span>
                  </div>
                  <span className="text-xs text-slate-400">{cmd.responseTime.toFixed(1)}s</span>
                </div>
                <div className="text-sm text-slate-200 mb-2 font-medium">{cmd.command}</div>
                <div className="text-xs text-slate-500">{cmd.timestamp.toLocaleTimeString()}</div>
              </div>
            ))}
            {commandHistory.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users size={24} className="text-slate-500" />
                </div>
                <div className="text-slate-500 text-sm">No commands yet</div>
                <div className="text-slate-600 text-xs mt-1">Try suggesting an action above</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Model Selection - Responsive */}
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20 w-full max-w-sm md:max-w-md">
        <div className="metrics-panel rounded-2xl p-4 md:p-6 bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Brain size={16} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">AI Model</h3>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-300 font-medium">Active</span>
            </div>
          </div>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel('llama3.2:1b')}
            className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/60 rounded-xl text-white text-sm disabled:bg-slate-700/60 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 backdrop-blur-sm"
          >
            {availableModels.map((model) => (
              <option key={model.id} value={model.id} disabled={model.disabled}>
                {model.name} - {model.description}
              </option>
            ))}
          </select>
          <div className="mt-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
              <span>Optimized for environmental analysis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 