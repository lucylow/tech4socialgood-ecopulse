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
  formatNumber: (num: number) => string
  getHealthColor: (value: number, max: number, reverse?: boolean) => string
}

export function MetricsPanel({ metrics, pollutionLevel, formatNumber, getHealthColor }: MetricsPanelProps) {
  return (
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

        {/* Ocean Acidity */}
        <div className="bg-slate-800/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Ocean pH:</span>
            <span className={`text-sm font-semibold ${getHealthColor(8.5 - metrics.oceanAcidity, 2.5)}`}>
              {metrics.oceanAcidity.toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                metrics.oceanAcidity > 7.8 ? 'bg-green-400' : 
                metrics.oceanAcidity > 7.5 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${Math.min(((metrics.oceanAcidity - 6) / 2.5) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Ice Cap Melting */}
        <div className="bg-slate-800/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Ice Cap Loss:</span>
            <span className={`text-sm font-semibold ${getHealthColor(metrics.iceCapMelting, 100)}`}>
              {metrics.iceCapMelting.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                metrics.iceCapMelting < 30 ? 'bg-green-400' : 
                metrics.iceCapMelting < 70 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${metrics.iceCapMelting}%` }}
            ></div>
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
  )
}