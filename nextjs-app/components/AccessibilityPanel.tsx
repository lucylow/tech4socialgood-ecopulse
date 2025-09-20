'use client';

import React, { useState } from 'react';
import { Settings, Eye, MousePointer, Volume2, Keyboard, Type, Palette } from 'lucide-react';

interface AccessibilitySettings {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
  colorBlindness: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  screenReader: boolean;
  keyboardNavigation: boolean;
  audioDescriptions: boolean;
}

interface AccessibilityPanelProps {
  onSettingsChange: (settings: AccessibilitySettings) => void;
}

export default function AccessibilityPanel({ onSettingsChange }: AccessibilityPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    reducedMotion: false,
    fontSize: 'medium',
    colorBlindness: 'none',
    screenReader: false,
    keyboardNavigation: false,
    audioDescriptions: false
  });

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const fontSizeOptions = [
    { value: 'small', label: 'Small', class: 'text-sm' },
    { value: 'medium', label: 'Medium', class: 'text-base' },
    { value: 'large', label: 'Large', class: 'text-lg' }
  ];

  const colorBlindnessOptions = [
    { value: 'none', label: 'None' },
    { value: 'protanopia', label: 'Protanopia (Red-blind)' },
    { value: 'deuteranopia', label: 'Deuteranopia (Green-blind)' },
    { value: 'tritanopia', label: 'Tritanopia (Blue-blind)' }
  ];

  return (
    <>
      {/* Accessibility Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors hover:scale-110 active:scale-90"
        aria-label="Open accessibility settings"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 max-h-96 overflow-y-auto bg-slate-900/95 backdrop-blur-lg border border-slate-700 rounded-xl shadow-2xl animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Accessibility Settings</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close accessibility settings"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {/* High Contrast */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-white">High Contrast</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.highContrast}
                      onChange={(e) => updateSetting('highContrast', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${
                      settings.highContrast ? 'bg-blue-600' : 'bg-gray-600'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        settings.highContrast ? 'translate-x-5' : 'translate-x-0.5'
                      } mt-0.5`} />
                    </div>
                  </label>
                </div>

                {/* Reduced Motion */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MousePointer className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-white">Reduce Motion</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.reducedMotion}
                      onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${
                      settings.reducedMotion ? 'bg-purple-600' : 'bg-gray-600'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        settings.reducedMotion ? 'translate-x-5' : 'translate-x-0.5'
                      } mt-0.5`} />
                    </div>
                  </label>
                </div>

                {/* Font Size */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Type className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-white">Font Size</span>
                  </div>
                  <div className="flex gap-2">
                    {fontSizeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateSetting('fontSize', option.value)}
                        className={`px-3 py-1 rounded text-xs transition-colors ${
                          settings.fontSize === option.value
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Blindness Support */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-4 h-4 text-orange-400" />
                    <span className="text-sm text-white">Color Support</span>
                  </div>
                  <select
                    value={settings.colorBlindness}
                    onChange={(e) => updateSetting('colorBlindness', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-sm text-white"
                  >
                    {colorBlindnessOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Keyboard Navigation */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Keyboard className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-white">Keyboard Navigation</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.keyboardNavigation}
                      onChange={(e) => updateSetting('keyboardNavigation', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${
                      settings.keyboardNavigation ? 'bg-yellow-600' : 'bg-gray-600'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        settings.keyboardNavigation ? 'translate-x-5' : 'translate-x-0.5'
                      } mt-0.5`} />
                    </div>
                  </label>
                </div>

                {/* Audio Descriptions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-white">Audio Descriptions</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.audioDescriptions}
                      onChange={(e) => updateSetting('audioDescriptions', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${
                      settings.audioDescriptions ? 'bg-cyan-600' : 'bg-gray-600'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        settings.audioDescriptions ? 'translate-x-5' : 'translate-x-0.5'
                      } mt-0.5`} />
                    </div>
                  </label>
                </div>
              </div>

              {/* Reset Button */}
              <div className="mt-6 pt-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    const defaultSettings: AccessibilitySettings = {
                      highContrast: false,
                      reducedMotion: false,
                      fontSize: 'medium',
                      colorBlindness: 'none',
                      screenReader: false,
                      keyboardNavigation: false,
                      audioDescriptions: false
                    };
                    setSettings(defaultSettings);
                    onSettingsChange(defaultSettings);
                  }}
                  className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
}