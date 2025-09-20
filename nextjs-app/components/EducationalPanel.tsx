'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, Target, Users, Globe, Leaf } from 'lucide-react';

interface EducationalPanelProps {
  onActionClick: (action: string) => void;
}

export default function EducationalPanel({ onActionClick }: EducationalPanelProps) {
  const educationalActions = [
    {
      id: 'trees',
      title: 'Reforestation',
      description: 'Plant trees to absorb CO₂',
      action: 'Plant 1 million trees worldwide',
      icon: Leaf,
      color: 'bg-green-600 hover:bg-green-700',
      impact: 'Reduces atmospheric CO₂, improves air quality'
    },
    {
      id: 'renewable',
      title: 'Clean Energy',
      description: 'Switch to renewable sources',
      action: 'Build 100 renewable energy plants',
      icon: Globe,
      color: 'bg-blue-600 hover:bg-blue-700',
      impact: 'Reduces fossil fuel dependence'
    },
    {
      id: 'transport',
      title: 'Green Transport',
      description: 'Electrify transportation',
      action: 'Switch to electric vehicles globally',
      icon: Target,
      color: 'bg-purple-600 hover:bg-purple-700',
      impact: 'Lowers emissions from transport'
    },
    {
      id: 'ocean',
      title: 'Ocean Cleanup',
      description: 'Remove plastic pollution',
      action: 'Clean up ocean plastic waste',
      icon: Users,
      color: 'bg-cyan-600 hover:bg-cyan-700',
      impact: 'Protects marine ecosystems'
    }
  ];

  return (
    <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-6 h-6 text-emerald-400" />
        <h3 className="text-lg font-semibold text-white">Educational Framework</h3>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-yellow-400">Learning Objectives</span>
        </div>
        <p className="text-sm text-gray-300">
          Explore how human actions impact Earth's climate systems. Each action demonstrates 
          the interconnected nature of environmental science.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {educationalActions.map((action, index) => (
          <motion.button
            key={action.id}
            onClick={() => onActionClick(action.action)}
            className={`p-4 rounded-lg border border-slate-600 transition-all duration-200 text-left ${action.color}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-3">
              <action.icon className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-white text-sm mb-1">{action.title}</h4>
                <p className="text-xs text-gray-200 mb-2">{action.description}</p>
                <p className="text-xs text-gray-300 italic">{action.impact}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
        <p className="text-xs text-emerald-300">
          <strong>💡 Educational Tip:</strong> Each action shows real-time impact on multiple 
          environmental metrics, helping you understand the complexity of climate systems.
        </p>
      </div>
    </div>
  );
}