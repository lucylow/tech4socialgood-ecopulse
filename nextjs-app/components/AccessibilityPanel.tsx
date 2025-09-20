'use client'

import { useState, useEffect } from 'react'
import { Settings, Eye, Volume2, Keyboard, Palette, Type } from 'lucide-react'
import { AccessibilitySettings, defaultAccessibilitySettings } from '@/lib/accessibility'

interface AccessibilityPanelProps {
  onSettingsChange: (settings: AccessibilitySettings) => void
}

export default function AccessibilityPanel({ onSettingsChange }: AccessibilityPanelProps) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultAccessibilitySettings)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('ecopulse-accessibility-settings')
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      setSettings({ ...defaultAccessibilitySettings, ...parsed })
    }
  }, [])

  useEffect(() => {
    // Save settings to localStorage and notify parent
    localStorage.setItem('ecopulse-accessibility-settings', JSON.stringify(settings))
    onSettingsChange(settings)
    
    // Apply accessibility settings to document
    applyAccessibilitySettings(settings)
  }, [settings, onSettingsChange])

  const applyAccessibilitySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement
    
    // High contrast
    if (newSettings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
    
    // Reduced motion
    if (newSettings.reducedMotion) {
      root.classList.add('reduced-motion')
    } else {
      root.classList.remove('reduced-motion')
    }
    
    // Font size
    root.style.fontSize = `${16 * (newSettings.fontSize === 'small' ? 0.875 : newSettings.fontSize === 'large' ? 1.25 : 1)}px`
    
    // Color blindness
    root.setAttribute('data-color-blindness', newSettings.colorBlindness)
  }

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <>
      {/* Accessibility Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        aria-label="Open accessibility settings"
        title="Accessibility Settings"
      >
        <Settings size={24} className="text-white" />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-40 w-80 bg-slate-900/95 backdrop-blur-lg border border-slate-700 rounded-xl shadow-2xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Accessibility Settings</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Close accessibility settings"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye size={20} className="text-blue-400" />
                  <div>
                    <label className="text-sm font-medium text-white">High Contrast</label>
                    <p className="text-xs text-slate-400">Increase color contrast</p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('highContrast', !settings.highContrast)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.highContrast ? 'bg-blue-600' : 'bg-slate-600'
                  }`}
                  role="switch"
                  aria-checked={settings.highContrast}
                  aria-label="Toggle high contrast mode"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Reduced Motion */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 size={20} className="text-green-400" />
                  <div>
                    <label className="text-sm font-medium text-white">Reduced Motion</label>
                    <p className="text-xs text-slate-400">Minimize animations</p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.reducedMotion ? 'bg-green-600' : 'bg-slate-600'
                  }`}
                  role="switch"
                  aria-checked={settings.reducedMotion}
                  aria-label="Toggle reduced motion mode"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Font Size */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Type size={20} className="text-purple-400" />
                  <label className="text-sm font-medium text-white">Font Size</label>
                </div>
                <div className="flex gap-2">
                  {(['small', 'medium', 'large'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => updateSetting('fontSize', size)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        settings.fontSize === size
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Blindness Support */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Palette size={20} className="text-orange-400" />
                  <label className="text-sm font-medium text-white">Color Vision</label>
                </div>
                <select
                  value={settings.colorBlindness}
                  onChange={(e) => updateSetting('colorBlindness', e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="none">Standard Colors</option>
                  <option value="protanopia">Protanopia (Red-blind)</option>
                  <option value="deuteranopia">Deuteranopia (Green-blind)</option>
                  <option value="tritanopia">Tritanopia (Blue-blind)</option>
                </select>
              </div>

              {/* Screen Reader */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Volume2 size={20} className="text-cyan-400" />
                  <div>
                    <label className="text-sm font-medium text-white">Screen Reader</label>
                    <p className="text-xs text-slate-400">Enhanced ARIA labels</p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('screenReader', !settings.screenReader)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.screenReader ? 'bg-cyan-600' : 'bg-slate-600'
                  }`}
                  role="switch"
                  aria-checked={settings.screenReader}
                  aria-label="Toggle screen reader support"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.screenReader ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Keyboard Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Keyboard size={20} className="text-yellow-400" />
                  <div>
                    <label className="text-sm font-medium text-white">Keyboard Navigation</label>
                    <p className="text-xs text-slate-400">Enhanced keyboard support</p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('keyboardNavigation', !settings.keyboardNavigation)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.keyboardNavigation ? 'bg-yellow-600' : 'bg-slate-600'
                  }`}
                  role="switch"
                  aria-checked={settings.keyboardNavigation}
                  aria-label="Toggle keyboard navigation support"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.keyboardNavigation ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Reset Button */}
            <div className="mt-6 pt-4 border-t border-slate-700">
              <button
                onClick={() => setSettings(defaultAccessibilitySettings)}
                className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
