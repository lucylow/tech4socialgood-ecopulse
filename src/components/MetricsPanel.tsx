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
      color: 'bg-gradient-warning',
      bgColor: 'bg-pollution-red/10',
      borderColor: 'border-pollution-red/30',
      data: mockMetrics.temperature
    },
    {
      id: 'co2',
      name: 'CO₂ Concentration',
      icon: Zap,
      color: 'bg-gradient-warning',
      bgColor: 'bg-desert-yellow/10',
      borderColor: 'border-desert-yellow/30',
      data: mockMetrics.co2
    },
    {
      id: 'pollution',
      name: 'Air Quality Index',
      icon: AlertTriangle,
      color: 'bg-gradient-warning',
      bgColor: 'bg-pollution-red/10',
      borderColor: 'border-pollution-red/30',
      data: mockMetrics.pollution
    },
    {
      id: 'oceanLevel',
      name: 'Sea Level Rise',
      icon: Droplets,
      color: 'bg-gradient-earth',
      bgColor: 'bg-earth-blue/10',
      borderColor: 'border-earth-blue/30',
      data: mockMetrics.oceanLevel
    },
    {
      id: 'iceSheet',
      name: 'Ice Sheet Loss',
      icon: Snowflake,
      color: 'bg-gradient-earth',
      bgColor: 'bg-ice-blue/10',
      borderColor: 'border-ice-blue/30',
      data: mockMetrics.iceSheet
    },
    {
      id: 'biodiversity',
      name: 'Biodiversity Index',
      icon: Leaf,
      color: 'bg-gradient-earth',
      bgColor: 'bg-toxic-green/10',
      borderColor: 'border-toxic-green/30',
      data: mockMetrics.biodiversity
    }
  ]

  const getTrendColor = (trend: string) => {
    const value = parseFloat(trend)
    if (value > 0) return 'text-pollution-red'
    if (value < 0) return 'text-toxic-green'
    return 'text-text-muted'
  }

  const getTrendIcon = (trend: string) => {
    const value = parseFloat(trend)
    if (value > 0) return '↗'
    if (value < 0) return '↘'
    return '→'
  }

  return (
    <div className="space-y-6">
      <div className="bg-surface/40 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 climate-glow">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-10 h-10 bg-gradient-earth rounded-xl flex items-center justify-center">
            <Activity className="h-5 w-5 text-text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary">Climate Metrics</h3>
            <p className="text-text-muted text-sm">Real-time environmental data</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {metrics.map((metric) => {
            const Icon = metric.icon
            const isSelected = selectedMetric === metric.id
            
            return (
              <button
                key={metric.id}
                onClick={() => onMetricSelect(metric.id)}
                className={`
                  w-full p-4 rounded-2xl border eco-transition text-left group
                  ${isSelected 
                    ? `${metric.bgColor} ${metric.borderColor} border-2 climate-glow` 
                    : 'bg-background/30 border-primary/10 hover:bg-surface/20 hover:border-primary/20'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-xl ${metric.color}`}>
                      <Icon className="h-4 w-4 text-text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-text-primary">
                      {metric.name}
                    </span>
                  </div>
                  
                  {isSelected && (
                    <div className="w-2.5 h-2.5 bg-primary-glow rounded-full animate-pulse"></div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-text-primary">
                      {metric.data.value}
                    </p>
                    <p className="text-xs text-text-muted">
                      {metric.data.unit}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${getTrendColor(metric.data.trend)}`}>
                      {getTrendIcon(metric.data.trend)} {Math.abs(parseFloat(metric.data.trend))}
                    </p>
                    <p className="text-xs text-text-muted">vs last year</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Educational Tip */}
      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 bg-primary-glow/20 rounded-xl">
            <TrendingUp className="h-4 w-4 text-primary-glow" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-glow mb-1">
              Climate Education
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Click on different metrics to explore real-time climate data visualizations. Each metric shows current values and trends to help understand climate change impacts.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}