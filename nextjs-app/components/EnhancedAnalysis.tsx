'use client'

import { useState } from 'react'
import { TrendingUp, Clock, Globe, Lightbulb, Target, Users } from 'lucide-react'
import { EnhancedAnalysis } from '@/lib/aiEnhancements'

interface EnhancedAnalysisProps {
  analysis: EnhancedAnalysis
}

export default function EnhancedAnalysisPanel({ analysis }: EnhancedAnalysisProps) {
  const [activeTab, setActiveTab] = useState<'predictions' | 'education' | 'actions'>('predictions')

  return (
    <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
          <Target size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Enhanced AI Analysis</h3>
          <p className="text-sm text-slate-400">Predictive modeling & educational insights</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('predictions')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'predictions' 
              ? 'bg-purple-600 text-white' 
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          <TrendingUp size={16} className="inline mr-2" />
          Predictions
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'education' 
              ? 'bg-purple-600 text-white' 
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          <Users size={16} className="inline mr-2" />
          Education
        </button>
        <button
          onClick={() => setActiveTab('actions')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'actions' 
              ? 'bg-purple-600 text-white' 
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          <Lightbulb size={16} className="inline mr-2" />
          Actions
        </button>
      </div>

      {/* Content */}
      {activeTab === 'predictions' && analysis.predictions && (
        <div className="space-y-4">
          <p className="text-sm text-slate-300 mb-4">
            AI-powered projections showing how this action would impact Earth over time:
          </p>
          {analysis.predictions.map((prediction, index) => (
            <div key={index} className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-purple-300 flex items-center gap-2">
                  <Clock size={16} />
                  {prediction.timeframe === 'short' ? '5 Years' : 
                   prediction.timeframe === 'medium' ? '20 Years' : '50 Years'}
                </h4>
                <span className="text-xs bg-green-600/20 text-green-300 px-2 py-1 rounded">
                  {prediction.confidence.toFixed(0)}% confidence
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="bg-slate-700/30 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">CO₂ Level</div>
                  <div className="text-lg font-bold text-yellow-400">
                    {prediction.projection.co2Level} ppm
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Temperature</div>
                  <div className="text-lg font-bold text-orange-400">
                    {prediction.projection.temperature}°C
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Population</div>
                  <div className="text-lg font-bold text-blue-400">
                    {(prediction.projection.population / 1e9).toFixed(1)}B
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Biodiversity</div>
                  <div className="text-lg font-bold text-emerald-400">
                    {(prediction.projection.biodiversity / 1e9).toFixed(0)}B
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-slate-300">{prediction.description}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'education' && analysis.educationalValue && (
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
              <Globe size={16} />
              Educational Value
            </h4>
            <p className="text-sm text-slate-300">{analysis.educationalValue}</p>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="font-semibold text-emerald-300 mb-3 flex items-center gap-2">
              <Users size={16} />
              Learning Outcomes
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-slate-300 flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                Understanding cause-and-effect relationships in environmental systems
              </li>
              <li className="text-sm text-slate-300 flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                Analyzing the interconnected nature of climate and ecosystems
              </li>
              <li className="text-sm text-slate-300 flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                Developing critical thinking about environmental solutions
              </li>
              <li className="text-sm text-slate-300 flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                Connecting individual actions to global environmental impact
              </li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'actions' && analysis.actionRecommendations && (
        <div className="space-y-4">
          <p className="text-sm text-slate-300 mb-4">
            Take action! Here are ways you can make a difference:
          </p>
          {analysis.actionRecommendations.map((recommendation, index) => (
            <div key={index} className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb size={16} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-300">{recommendation}</p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 mt-4">
            <h4 className="font-semibold text-blue-300 mb-2">💡 Pro Tip</h4>
            <p className="text-sm text-blue-200">
              Start small! Even individual actions like reducing energy consumption or supporting 
              sustainable companies can have a meaningful impact when multiplied across communities.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
