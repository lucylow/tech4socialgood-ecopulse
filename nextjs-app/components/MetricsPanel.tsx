'use client'

import { Users, Thermometer, AlertTriangle, Droplets, Snowflake, Leaf, Zap } from 'lucide-react'

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

interface MetricsPanelProps {
  metrics: EarthMetrics
  pollutionLevel: number
}

export default function MetricsPanel({ metrics, pollutionLevel }: MetricsPanelProps) {
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
    <div className="metrics-panel rounded-xl p-6 max-w-sm bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 shadow-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
          <AlertTriangle size={20} className="text-yellow-400" />
          Earth Health
        </h2>
        <p className="text-xs text-gray-400">Real-time environmental monitoring</p>
      </div>
      
      <div className="space-y-4">
        {/* CO2 Levels */}
        <div className="bg-gray-800/30 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-yellow-400" />
              <span className="text-sm text-gray-300">CO₂ Level:</span>
            </div>
            <span className={`text-sm font-semibold ${getHealthColor(metrics.co2Level, 2000, true)}`}>
              {metrics.co2Level.toFixed(0)} ppm
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                metrics.co2Level < 600 ? 'bg-green-400' : 
                metrics.co2Level < 1000 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${Math.min((metrics.co2Level / 2000) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Air Toxicity */}
        <div className="bg-gray-800/30 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-400" />
              <span className="text-sm text-gray-300">Air Toxicity:</span>
            </div>
            <span className={`text-sm font-semibold ${getHealthColor(metrics.toxicityLevel, 100)}`}>
              {metrics.toxicityLevel.toFixed(1)}%
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                metrics.toxicityLevel < 30 ? 'bg-green-400' : 
                metrics.toxicityLevel < 70 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${metrics.toxicityLevel}%` }}
            ></div>
          </div>
        </div>

        {/* Temperature */}
        <div className="bg-gray-800/30 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer size={16} className="text-orange-400" />
              <span className="text-sm text-gray-300">Temperature:</span>
            </div>
            <span className={`text-sm font-semibold ${getHealthColor(metrics.temperature, 50)}`}>
              {metrics.temperature.toFixed(1)}°C
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
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
        <div className="bg-gray-800/30 rounded-lg p-3 backdrop-blur-sm">
          <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">Biodiversity</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-blue-400" />
                <span className="text-xs text-gray-300">Humans:</span>
              </div>
              <span className="text-xs font-semibold text-gray-300">
                {formatNumber(metrics.humanPopulation)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf size={14} className="text-green-400" />
                <span className="text-xs text-gray-300">Animals:</span>
              </div>
              <span className="text-xs font-semibold text-gray-300">
                {formatNumber(metrics.animalPopulation)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf size={14} className="text-emerald-400" />
                <span className="text-xs text-gray-300">Plants:</span>
              </div>
              <span className="text-xs font-semibold text-gray-300">
                {formatNumber(metrics.plantPopulation)}
              </span>
            </div>
          </div>
        </div>

        {/* Climate Metrics */}
        <div className="bg-gray-800/30 rounded-lg p-3 backdrop-blur-sm">
          <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">Climate</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets size={14} className="text-blue-400" />
                <span className="text-xs text-gray-300">Ocean pH:</span>
              </div>
              <span className={`text-xs font-semibold ${getHealthColor(metrics.oceanAcidity, 9.0, true)}`}>
                {metrics.oceanAcidity.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Snowflake size={14} className="text-cyan-400" />
                <span className="text-xs text-gray-300">Ice Melting:</span>
              </div>
              <span className={`text-xs font-semibold ${getHealthColor(metrics.iceCapMelting, 100)}`}>
                {metrics.iceCapMelting.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Overall Pollution */}
        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg p-3 backdrop-blur-sm border border-red-500/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-400" />
              <span className="text-sm text-gray-300 font-semibold">Pollution Level:</span>
            </div>
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
  )
} 