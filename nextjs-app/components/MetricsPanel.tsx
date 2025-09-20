'use client'

import { Users, Thermometer, AlertTriangle, Droplets, Snowflake, Leaf, Zap } from 'lucide-react'
import { generateAriaLabel } from '../lib/accessibility'

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
  const formatMetricNumber = (num: number) => {
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
      className="metrics-panel rounded-2xl p-4 md:p-8 w-full bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300"
      role="region"
      aria-labelledby="earth-health-title"
      aria-describedby="earth-health-description"
    >
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg"
            aria-hidden="true"
          >
            <AlertTriangle size={20} className="text-white" />
          </div>
          <div>
            <h2 
              id="earth-health-title"
              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent"
            >
              Earth Health
            </h2>
            <p id="earth-health-description" className="text-xs md:text-sm text-slate-400 font-medium">Real-time environmental monitoring</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg"></div>
          <span className="text-xs text-emerald-300 font-medium">Live Data Stream</span>
          <div className="ml-auto text-xs text-slate-500">Updated</div>
        </div>
      </div>
      
      <div className="space-y-5">
        {/* Enhanced CO2 Levels */}
        <div 
          className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-xl p-5 backdrop-blur-sm border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-200"
          role="progressbar"
          aria-label={generateAriaLabel('co2Level', metrics.co2Level, 'ppm')}
          aria-valuenow={metrics.co2Level}
          aria-valuemin={0}
          aria-valuemax={2000}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center"
                aria-hidden="true"
              >
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-300">CO₂ Level</span>
            </div>
            <span className={`text-lg font-bold ${getHealthColor(metrics.co2Level, 2000, true)}`}>
              {metrics.co2Level.toFixed(0)} ppm
            </span>
          </div>
          <div className="relative">
            <div className="w-full bg-slate-700/60 rounded-full h-3 overflow-hidden" aria-hidden="true">
              <div 
                className={`h-3 rounded-full transition-all duration-700 ${
                  metrics.co2Level < 600 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 
                  metrics.co2Level < 1000 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gradient-to-r from-red-400 to-red-500'
                }`}
                style={{ width: `${Math.min((metrics.co2Level / 2000) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2" aria-hidden="true">
              <span>Safe</span>
              <span>Critical</span>
            </div>
          </div>
        </div>

        {/* Enhanced Air Toxicity */}
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-xl p-5 backdrop-blur-sm border border-slate-700/50 hover:border-red-500/30 transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                <AlertTriangle size={16} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-300">Air Toxicity</span>
            </div>
            <span className={`text-lg font-bold ${getHealthColor(metrics.toxicityLevel, 100)}`}>
              {metrics.toxicityLevel.toFixed(1)}%
            </span>
          </div>
          <div className="relative">
            <div className="w-full bg-slate-700/60 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full transition-all duration-700 ${
                  metrics.toxicityLevel < 30 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 
                  metrics.toxicityLevel < 70 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gradient-to-r from-red-400 to-red-500'
                }`}
                style={{ width: `${metrics.toxicityLevel}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>Clean</span>
              <span>Dangerous</span>
            </div>
          </div>
        </div>

        {/* Enhanced Temperature */}
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-xl p-5 backdrop-blur-sm border border-slate-700/50 hover:border-orange-500/30 transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Thermometer size={16} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-300">Temperature</span>
            </div>
            <span className={`text-lg font-bold ${getHealthColor(metrics.temperature, 50)}`}>
              {metrics.temperature.toFixed(1)}°C
            </span>
          </div>
          <div className="relative">
            <div className="w-full bg-slate-700/60 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full transition-all duration-700 ${
                  metrics.temperature < 35 ? 'bg-gradient-to-r from-blue-400 to-blue-500' : 
                  metrics.temperature < 40 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gradient-to-r from-red-400 to-red-500'
                }`}
                style={{ width: `${Math.min((metrics.temperature / 50) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>Cool</span>
              <span>Hot</span>
            </div>
          </div>
        </div>

        {/* Enhanced Population Metrics */}
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-xl p-5 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Users size={16} className="text-white" />
            </div>
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wide">Biodiversity</h4>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Users size={12} className="text-white" />
                </div>
                <span className="text-sm font-medium text-slate-300">Humans</span>
              </div>
              <span className="text-sm font-bold text-slate-200">
                {formatMetricNumber(metrics.humanPopulation)}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Leaf size={12} className="text-white" />
                </div>
                <span className="text-sm font-medium text-slate-300">Animals</span>
              </div>
              <span className="text-sm font-bold text-slate-200">
                {formatMetricNumber(metrics.animalPopulation)}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <Leaf size={12} className="text-white" />
                </div>
                <span className="text-sm font-medium text-slate-300">Plants</span>
              </div>
              <span className="text-sm font-bold text-slate-200">
                {formatMetricNumber(metrics.plantPopulation)}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Climate Metrics */}
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-xl p-5 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Snowflake size={16} className="text-white" />
            </div>
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wide">Climate</h4>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Droplets size={12} className="text-white" />
                </div>
                <span className="text-sm font-medium text-slate-300">Ocean pH</span>
              </div>
              <span className={`text-sm font-bold ${getHealthColor(metrics.oceanAcidity, 9.0, true)}`}>
                {metrics.oceanAcidity.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Snowflake size={12} className="text-white" />
                </div>
                <span className="text-sm font-medium text-slate-300">Ice Melting</span>
              </div>
              <span className={`text-sm font-bold ${getHealthColor(metrics.iceCapMelting, 100)}`}>
                {metrics.iceCapMelting.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Overall Pollution */}
        <div className="bg-gradient-to-br from-red-500/10 via-orange-500/10 to-red-600/10 rounded-xl p-5 backdrop-blur-sm border border-red-500/30 hover:border-red-400/50 transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                <AlertTriangle size={16} className="text-white" />
              </div>
              <span className="text-sm font-bold text-slate-300">Overall Pollution</span>
            </div>
            <span className={`text-xl font-bold ${getHealthColor(pollutionLevel, 100)}`}>
              {pollutionLevel.toFixed(1)}%
            </span>
          </div>
          <div className="relative">
            <div className="w-full bg-slate-700/60 rounded-full h-4 overflow-hidden">
              <div 
                className={`h-4 rounded-full transition-all duration-700 ${
                  pollutionLevel < 30 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 
                  pollutionLevel < 70 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gradient-to-r from-red-400 to-red-500'
                }`}
                style={{ width: `${pollutionLevel}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>Clean</span>
              <span>Moderate</span>
              <span>Critical</span>
            </div>
          </div>
          {pollutionLevel > 70 && (
            <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-red-400" />
                <span className="text-xs font-semibold text-red-300">High pollution detected!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 