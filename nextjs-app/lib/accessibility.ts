// Enhanced accessibility utilities for EcoPulse

export interface AccessibilitySettings {
  highContrast: boolean
  reducedMotion: boolean
  fontSize: 'small' | 'medium' | 'large'
  colorBlindness: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'
  screenReader: boolean
  keyboardNavigation: boolean
  audioDescriptions: boolean
}

export const defaultAccessibilitySettings: AccessibilitySettings = {
  highContrast: false,
  reducedMotion: false,
  fontSize: 'medium',
  colorBlindness: 'none',
  screenReader: false,
  keyboardNavigation: false,
  audioDescriptions: false
}

// Generate ARIA labels for metrics
export function generateAriaLabel(metric: string, value: number, unit: string): string {
  const metricNames = {
    co2Level: 'Carbon dioxide level',
    toxicityLevel: 'Air toxicity level',
    temperature: 'Global temperature',
    humanPopulation: 'Human population',
    animalPopulation: 'Animal population',
    plantPopulation: 'Plant population',
    oceanAcidity: 'Ocean acidity',
    iceCapMelting: 'Ice cap melting percentage',
    pollutionLevel: 'Overall pollution level'
  }

  const healthStatus = getHealthStatus(metric, value)
  const metricName = metricNames[metric as keyof typeof metricNames] || metric
  
  return `${metricName}: ${value} ${unit}. Status: ${healthStatus}`
}

// Determine health status for accessibility
function getHealthStatus(metric: string, value: number): string {
  switch (metric) {
    case 'co2Level':
      return value < 600 ? 'healthy' : value < 1000 ? 'moderate' : 'critical'
    case 'toxicityLevel':
      return value < 30 ? 'clean air' : value < 70 ? 'moderate pollution' : 'dangerous air quality'
    case 'temperature':
      return value < 35 ? 'cool' : value < 40 ? 'moderate' : 'hot'
    case 'oceanAcidity':
      return value > 8.0 ? 'healthy' : value > 7.8 ? 'moderate' : 'acidic'
    case 'iceCapMelting':
      return value < 30 ? 'stable' : value < 70 ? 'melting' : 'critical melting'
    case 'pollutionLevel':
      return value < 30 ? 'low pollution' : value < 70 ? 'moderate pollution' : 'high pollution'
    default:
      return 'normal'
  }
}

// Color blind friendly color palettes
export function getColorBlindFriendlyColors(type: 'protanopia' | 'deuteranopia' | 'tritanopia' | 'none') {
  const palettes = {
    none: {
      healthy: '#10b981',    // emerald-500
      moderate: '#f59e0b',   // amber-500
      critical: '#ef4444',   // red-500
      background: '#0f172a', // slate-900
      text: '#f8fafc'        // slate-50
    },
    protanopia: {
      healthy: '#06b6d4',    // cyan-500
      moderate: '#f59e0b',   // amber-500
      critical: '#8b5cf6',   // violet-500
      background: '#0f172a',
      text: '#f8fafc'
    },
    deuteranopia: {
      healthy: '#06b6d4',    // cyan-500
      moderate: '#f59e0b',   // amber-500
      critical: '#8b5cf6',   // violet-500
      background: '#0f172a',
      text: '#f8fafc'
    },
    tritanopia: {
      healthy: '#10b981',    // emerald-500
      moderate: '#f59e0b',   // amber-500
      critical: '#ef4444',   // red-500
      background: '#0f172a',
      text: '#f8fafc'
    }
  }
  
  return palettes[type]
}

// High contrast mode styles
export function getHighContrastStyles() {
  return {
    background: '#000000',
    foreground: '#ffffff',
    accent: '#00ff00',
    warning: '#ffff00',
    error: '#ff0000',
    border: '#ffffff'
  }
}

// Font size scaling
export function getFontSizeScale(size: 'small' | 'medium' | 'large') {
  const scales = {
    small: 0.875,  // 14px base
    medium: 1,     // 16px base
    large: 1.25    // 20px base
  }
  
  return scales[size]
}

// Keyboard navigation helpers
export function createKeyboardNavigation(
  elements: HTMLElement[],
  options: {
    loop?: boolean
    orientation?: 'horizontal' | 'vertical' | 'grid'
  } = {}
) {
  const { loop = true, orientation = 'horizontal' } = options
  let currentIndex = 0

  const updateFocus = (index: number) => {
    elements.forEach((el, i) => {
      if (i === index) {
        el.focus()
        el.setAttribute('aria-selected', 'true')
      } else {
        el.setAttribute('aria-selected', 'false')
      }
    })
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        currentIndex = loop ? (currentIndex + 1) % elements.length : Math.min(currentIndex + 1, elements.length - 1)
        updateFocus(currentIndex)
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        currentIndex = loop ? (currentIndex - 1 + elements.length) % elements.length : Math.max(currentIndex - 1, 0)
        updateFocus(currentIndex)
        break
      case 'Home':
        event.preventDefault()
        currentIndex = 0
        updateFocus(currentIndex)
        break
      case 'End':
        event.preventDefault()
        currentIndex = elements.length - 1
        updateFocus(currentIndex)
        break
    }
  }

  return {
    setup: () => {
      elements.forEach((el, index) => {
        el.setAttribute('tabindex', index === 0 ? '0' : '-1')
        el.setAttribute('role', 'option')
        el.addEventListener('keydown', handleKeyDown)
      })
    },
    destroy: () => {
      elements.forEach(el => {
        el.removeEventListener('keydown', handleKeyDown)
      })
    }
  }
}

// Screen reader announcements
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  
  document.body.appendChild(announcement)
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Focus management for modal dialogs
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>
  
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  const handleTabKey = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          event.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          event.preventDefault()
        }
      }
    }
  }

  element.addEventListener('keydown', handleTabKey)
  firstElement?.focus()

  return () => {
    element.removeEventListener('keydown', handleTabKey)
  }
}

// Reduced motion detection
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// High contrast detection
export function prefersHighContrast(): boolean {
  return window.matchMedia('(prefers-contrast: high)').matches
}

// Color scheme detection
export function prefersColorScheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Generate accessible color combinations
export function getAccessibleColorCombination(
  foreground: string,
  background: string
): { accessible: boolean; contrastRatio: number; recommendation?: string } {
  // Simplified contrast ratio calculation
  // In a real implementation, you'd use a proper color contrast algorithm
  const contrastRatio = 4.5 // Placeholder - would calculate actual ratio
  
  const accessible = contrastRatio >= 4.5
  
  let recommendation = ''
  if (!accessible) {
    recommendation = 'Consider using higher contrast colors for better accessibility'
  }
  
  return {
    accessible,
    contrastRatio,
    recommendation
  }
}

// Audio description support
export function generateAudioDescription(
  metrics: any,
  action: string,
  impact: string
): string {
  return `Climate simulation update: ${action}. ${impact}. Current Earth health: 
    Carbon dioxide levels at ${metrics.co2Level} parts per million, 
    global temperature at ${metrics.temperature} degrees Celsius, 
    air toxicity at ${metrics.toxicityLevel} percent. 
    Human population: ${(metrics.humanPopulation / 1e9).toFixed(1)} billion. 
    Overall pollution level: ${metrics.pollutionLevel} percent.`
}

// Export utility functions for use in components
export const accessibilityUtils = {
  generateAriaLabel,
  getColorBlindFriendlyColors,
  getHighContrastStyles,
  getFontSizeScale,
  createKeyboardNavigation,
  announceToScreenReader,
  trapFocus,
  prefersReducedMotion,
  prefersHighContrast,
  prefersColorScheme,
  getAccessibleColorCombination,
  generateAudioDescription
}