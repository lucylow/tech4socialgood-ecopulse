import { Users, Thermometer, AlertTriangle, Droplets, Snowflake, Leaf, Zap, TrendingUp, Activity } from 'lucide-react'

interface MetricsPanelProps {
  selectedMetric: string
  onMetricSelect: (metric: string) => void
}

const mockMetrics = {
  temperature: { value: 1.2, unit: '°C above baseline', trend: '+0.1' },
  co2: { value: 421.3, unit: 'ppm', trend: '+2.1' },
  pollution: { value: 73.8, unit: '% AQI', trend: '+5.2' },
  oceanLevel: { value: 21.6, unit: 'cm rise', trend: '+3.2' },
  iceSheet: { value: 287, unit: 'Gt/year loss', trend: '+12.3' },
  biodiversity: { value: 68.1, unit: '% remaining', trend: '-2.4' }
}

export function MetricsPanel({ selectedMetric, onMetricSelect }: MetricsPanelProps) {
  const metrics = [
    {
      id: 'temperature',
      name: 'Global Temperature',
      icon: Thermometer,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-900/20',
      borderColor: 'border-orange-500/30',
      data: mockMetrics.temperature
    },
    {
      id: 'co2',
      name: 'CO₂ Concentration',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-900/20',
      borderColor: 'border-yellow-500/30',
      data: mockMetrics.co2
    },
    {
      id: 'pollution',
      name: 'Air Quality Index',
      icon: AlertTriangle,
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-900/20',
      borderColor: 'border-red-500/30',
      data: mockMetrics.pollution
    },
    {
      id: 'oceanLevel',
      name: 'Sea Level Rise',
      icon: Droplets,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-500/30',
      data: mockMetrics.oceanLevel
    },
    {
      id: 'iceSheet',
      name: 'Ice Sheet Loss',
      icon: Snowflake,
      color: 'from-cyan-400 to-blue-500',
      bgColor: 'bg-cyan-900/20',
      borderColor: 'border-cyan-500/30',
      data: mockMetrics.iceSheet
    },
    {
      id: 'biodiversity',
      name: 'Biodiversity Index',
      icon: Leaf,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-500/30',
      data: mockMetrics.biodiversity
    }
  ]

  const getTrendColor = (trend: string) => {
    const value = parseFloat(trend)
    if (value > 0) return 'text-red-400'
    if (value < 0) return 'text-green-400'
    return 'text-gray-400'
  }

  const getTrendIcon = (trend: string) => {
    const value = parseFloat(trend)
    if (value > 0) return '↗'
    if (value < 0) return '↘'
    return '→'
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Activity className="h-6 w-6 text-emerald-400" />
          <h3 className="text-xl font-semibold text-white">Climate Metrics</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon
            const isSelected = selectedMetric === metric.id
            
            return (
              <button
                key={metric.id}
                onClick={() => onMetricSelect(metric.id)}
                className={`
                  w-full p-4 rounded-xl border transition-all duration-300 text-left
                  ${isSelected 
                    ? `${metric.bgColor} ${metric.borderColor} border-2 scale-105` 
                    : 'bg-slate-950/30 border-slate-700 hover:bg-slate-900/50 hover:border-slate-600'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.color}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-white">
                      {metric.name}
                    </span>
                  </div>
                  
                  {isSelected && (
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-white">
                      {metric.data.value}
                    </p>
                    <p className="text-xs text-slate-400">
                      {metric.data.unit}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-sm font-medium ${getTrendColor(metric.data.trend)}`}>
                      {getTrendIcon(metric.data.trend)} {Math.abs(parseFloat(metric.data.trend))}
                    </p>
                    <p className="text-xs text-slate-400">vs last year</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Educational Tip */}
      <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-emerald-400/20 rounded-lg">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-emerald-300 mb-1">
              Climate Education
            </h4>
            <p className="text-xs text-emerald-200/80">
              Click on different metrics to explore real-time climate data visualizations. Each metric shows current values and trends to help understand climate change impacts.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}