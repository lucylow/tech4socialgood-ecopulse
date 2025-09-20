'use client'

import { useState } from 'react'
import { BookOpen, Target, Users, Globe, Award, Lightbulb, AlertTriangle } from 'lucide-react'

interface EducationalPanelProps {
  onActionClick: (action: string) => void
}

export default function EducationalPanel({ onActionClick }: EducationalPanelProps) {
  const [activeTab, setActiveTab] = useState<'objectives' | 'standards' | 'actions'>('objectives')

  const learningObjectives = {
    'Middle School': [
      'Understand cause-and-effect relationships in environmental systems',
      'Identify how human actions impact climate and ecosystems',
      'Recognize the importance of biodiversity and conservation',
      'Learn about renewable vs. non-renewable resources'
    ],
    'High School': [
      'Analyze complex environmental systems and feedback loops',
      'Evaluate the effectiveness of different climate solutions',
      'Understand the science behind greenhouse gas effects',
      'Explore policy implications of environmental decisions'
    ],
    'University/Adult': [
      'Critically assess climate data and scientific models',
      'Analyze systemic interventions and their trade-offs',
      'Evaluate environmental justice and equity implications',
      'Understand international climate agreements and policies'
    ]
  }

  const standardsAlignment = [
    {
      standard: 'NGSS MS-ESS3-5',
      description: 'Ask questions to clarify evidence of factors that have caused the rise in global temperatures over the past century.',
      grade: 'Middle School'
    },
    {
      standard: 'NGSS HS-ESS3-6',
      description: 'Use computational thinking to illustrate the relationships among management of natural resources, sustainability, and biodiversity.',
      grade: 'High School'
    },
    {
      standard: 'UN SDG 13: Climate Action',
      description: 'Take urgent action to combat climate change and its impacts.',
      grade: 'All Ages'
    },
    {
      standard: 'Climate Literacy Principle 3',
      description: 'Life on Earth depends on, is shaped by, and affects climate.',
      grade: 'All Ages'
    }
  ]

  const suggestedActions = {
    'Positive Solutions': [
      { action: 'Plant 1 million trees worldwide', icon: '🌳', impact: 'Carbon sequestration, habitat restoration' },
      { action: 'Build 100 renewable energy plants', icon: '⚡', impact: 'Clean electricity, reduced emissions' },
      { action: 'Switch to electric vehicles globally', icon: '🚗', impact: 'Reduced air pollution, lower CO2' },
      { action: 'Clean up ocean plastic waste', icon: '🌊', impact: 'Marine ecosystem protection' },
      { action: 'Implement carbon capture technology', icon: '🔬', impact: 'Direct CO2 removal from atmosphere' }
    ],
    'Negative Scenarios': [
      { action: 'Build 1000 coal power plants', icon: '🏭', impact: 'Massive CO2 emissions, air pollution' },
      { action: 'Cut down the Amazon rainforest', icon: '🌲', impact: 'Deforestation, biodiversity loss' },
      { action: 'Release 50 million tons of CO2', icon: '☁️', impact: 'Accelerated climate change' },
      { action: 'Dump nuclear waste in the ocean', icon: '☢️', impact: 'Marine contamination, health risks' }
    ]
  }

  return (
    <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <BookOpen size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Educational Framework</h3>
          <p className="text-sm text-slate-400">Curriculum-aligned climate education</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('objectives')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'objectives' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          <Target size={16} className="inline mr-2" />
          Learning Objectives
        </button>
        <button
          onClick={() => setActiveTab('standards')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'standards' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          <Award size={16} className="inline mr-2" />
          Standards
        </button>
        <button
          onClick={() => setActiveTab('actions')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'actions' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          <Lightbulb size={16} className="inline mr-2" />
          Actions
        </button>
      </div>

      {/* Content */}
      {activeTab === 'objectives' && (
        <div className="space-y-4">
          <p className="text-sm text-slate-300 mb-4">
            EcoPulse supports differentiated learning objectives across educational levels:
          </p>
          {Object.entries(learningObjectives).map(([level, objectives]) => (
            <div key={level} className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-300 mb-2 flex items-center gap-2">
                <Users size={16} />
                {level}
              </h4>
              <ul className="space-y-1">
                {objectives.map((objective, index) => (
                  <li key={index} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'standards' && (
        <div className="space-y-4">
          <p className="text-sm text-slate-300 mb-4">
            EcoPulse aligns with established educational standards:
          </p>
          {standardsAlignment.map((standard, index) => (
            <div key={index} className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-blue-300">{standard.standard}</h4>
                <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded">
                  {standard.grade}
                </span>
              </div>
              <p className="text-sm text-slate-300">{standard.description}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'actions' && (
        <div className="space-y-6">
          <p className="text-sm text-slate-300 mb-4">
            Explore these educational scenarios to understand climate impacts:
          </p>
          
          {/* Positive Actions */}
          <div>
            <h4 className="font-semibold text-emerald-300 mb-3 flex items-center gap-2">
              <Globe size={16} />
              Positive Solutions
            </h4>
            <div className="grid gap-2">
              {suggestedActions['Positive Solutions'].map((item, index) => (
                <button
                  key={index}
                  onClick={() => onActionClick(item.action)}
                  className="p-3 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 rounded-lg text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-emerald-300">{item.action}</div>
                      <div className="text-xs text-emerald-400 mt-1">{item.impact}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Negative Actions */}
          <div>
            <h4 className="font-semibold text-red-300 mb-3 flex items-center gap-2">
              <AlertTriangle size={16} />
              Negative Scenarios (Educational)
            </h4>
            <div className="grid gap-2">
              {suggestedActions['Negative Scenarios'].map((item, index) => (
                <button
                  key={index}
                  onClick={() => onActionClick(item.action)}
                  className="p-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-red-300">{item.action}</div>
                      <div className="text-xs text-red-400 mt-1">{item.impact}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

