'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Clock, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';

interface EnhancedAnalysisProps {
  analysis: {
    predictions?: {
      shortTerm: any[];
      mediumTerm: any[];
      longTerm: any[];
    };
    regionalImpact?: any[];
    confidenceScore?: number;
    recommendations?: string[];
  };
}

export default function EnhancedAnalysisPanel({ analysis }: EnhancedAnalysisProps) {
  const formatMetricChange = (change: number) => {
    const sign = change > 0 ? '+' : '';
    const color = change > 0 ? 'text-red-400' : change < 0 ? 'text-green-400' : 'text-gray-400';
    return (
      <span className={color}>
        {sign}{change.toFixed(1)}%
      </span>
    );
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Enhanced AI Analysis</h3>
        {analysis.confidenceScore && (
          <div className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(analysis.confidenceScore)} bg-slate-800/50`}>
            {analysis.confidenceScore}% Confidence
          </div>
        )}
      </div>

      {analysis.predictions && (
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* Short Term Predictions */}
          <div
            className="bg-slate-800/50 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-blue-400" />
              <h4 className="font-semibold text-white text-sm">Short Term (0-5 years)</h4>
            </div>
            <div className="space-y-2">
              {analysis.predictions.shortTerm?.slice(0, 3).map((prediction: any, index: number) => (
                <div key={index} className="text-xs">
                  <span className="text-gray-300">{prediction.metric}: </span>
                  {formatMetricChange(prediction.change)}
                </div>
              ))}
            </div>
          </div>

          {/* Medium Term Predictions */}
          <div
            className="bg-slate-800/50 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-yellow-400" />
              <h4 className="font-semibold text-white text-sm">Medium Term (5-20 years)</h4>
            </div>
            <div className="space-y-2">
              {analysis.predictions.mediumTerm?.slice(0, 3).map((prediction: any, index: number) => (
                <div key={index} className="text-xs">
                  <span className="text-gray-300">{prediction.metric}: </span>
                  {formatMetricChange(prediction.change)}
                </div>
              ))}
            </div>
          </div>

          {/* Long Term Predictions */}
          <div
            className="bg-slate-800/50 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <h4 className="font-semibold text-white text-sm">Long Term (20+ years)</h4>
            </div>
            <div className="space-y-2">
              {analysis.predictions.longTerm?.slice(0, 3).map((prediction: any, index: number) => (
                <div key={index} className="text-xs">
                  <span className="text-gray-300">{prediction.metric}: </span>
                  {formatMetricChange(prediction.change)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Regional Impact */}
      {analysis.regionalImpact && analysis.regionalImpact.length > 0 && (
        <div
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-purple-400" />
            <h4 className="font-semibold text-white">Regional Impact Analysis</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {analysis.regionalImpact.slice(0, 4).map((region: any, index: number) => (
              <div key={index} className="bg-slate-800/50 rounded-lg p-3">
                <div className="text-sm font-medium text-white mb-1">{region.name}</div>
                <div className="text-xs text-gray-300">
                  Impact: <span className={region.impact > 0 ? 'text-red-400' : 'text-green-400'}>
                    {region.impact > 0 ? '+' : ''}{region.impact.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div
          className="bg-emerald-900/20 border border-emerald-500/30 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <h4 className="font-semibold text-emerald-400">AI Recommendations</h4>
          </div>
          <ul className="space-y-2">
            {analysis.recommendations.slice(0, 3).map((recommendation: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-sm text-emerald-300">
                <span className="text-emerald-400 mt-1">•</span>
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <div
        className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg"
      >
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-yellow-300">
            <strong>Educational Disclaimer:</strong> These predictions are based on simplified models 
            for educational purposes. Real climate systems are far more complex and require 
            sophisticated scientific modeling.
          </p>
        </div>
      </div>
    </div>
  );
}