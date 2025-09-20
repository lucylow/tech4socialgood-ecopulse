// Accessibility utilities for EcoPulse
export const ACCESSIBILITY_CONFIG = {
  // High contrast mode colors
  highContrast: {
    background: '#000000',
    foreground: '#FFFFFF',
    primary: '#00FFFF',
    secondary: '#FFFF00',
    accent: '#FF00FF',
    success: '#00FF00',
    warning: '#FFFF00',
    error: '#FF0000',
  },
  
  // Reduced motion preferences
  reducedMotion: {
    duration: '0.01ms',
    timingFunction: 'linear',
  },
  
  // Focus indicators
  focus: {
    outline: '3px solid #00FFFF',
    outlineOffset: '2px',
    borderRadius: '4px',
  },
  
  // Minimum touch targets
  touchTarget: {
    minSize: '44px',
  },
}

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

// Check if user prefers high contrast
export const prefersHighContrast = (): boolean => {
  if (typeof window === 'undefined') return false
  try {
    return window.matchMedia('(prefers-contrast: high)').matches
  } catch {
    return false
  }
}

// Check if user prefers dark mode
export const prefersDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch {
    return false
  }
}

// Generate accessible color combinations
export const getAccessibleColors = (baseColor: string, contrast: 'AA' | 'AAA' = 'AA') => {
  // This would typically use a color contrast library
  // For now, return high contrast alternatives
  const colorMap: Record<string, { foreground: string; background: string }> = {
    primary: { foreground: '#FFFFFF', background: '#0066CC' },
    secondary: { foreground: '#000000', background: '#FFFF00' },
    success: { foreground: '#FFFFFF', background: '#006600' },
    warning: { foreground: '#000000', background: '#FFAA00' },
    error: { foreground: '#FFFFFF', background: '#CC0000' },
  }
  
  return colorMap[baseColor] || { foreground: '#FFFFFF', background: '#000000' }
}

// Generate ARIA labels for environmental metrics
export const generateAriaLabel = (metric: string, value: number, unit: string): string => {
  const metricLabels: Record<string, string> = {
    co2Level: 'Carbon Dioxide Level',
    toxicityLevel: 'Air Toxicity Level',
    temperature: 'Global Temperature',
    humanPopulation: 'Human Population',
    animalPopulation: 'Animal Population',
    plantPopulation: 'Plant Population',
    oceanAcidity: 'Ocean Acidity',
    iceCapMelting: 'Ice Cap Melting Percentage',
    pollutionLevel: 'Overall Pollution Level',
  }
  
  const label = metricLabels[metric] || metric
  return `${label}: ${value} ${unit}`
}

// Generate descriptive text for environmental scenarios
export const generateScenarioDescription = (scenario: {
  name: string
  category: string
  impact: Record<string, number>
}): string => {
  const categoryDescriptions: Record<string, string> = {
    positive: 'This is a beneficial environmental action that will help improve Earth\'s health.',
    negative: 'This is a harmful environmental action that will damage Earth\'s ecosystems.',
    catastrophic: 'This is an extremely dangerous event that could cause widespread environmental destruction.',
    neutral: 'This action will have minimal impact on Earth\'s environmental conditions.',
  }
  
  const description = categoryDescriptions[scenario.category] || 'This action will affect Earth\'s environment.'
  
  // Add impact details
  const impacts = []
  if (scenario.impact.co2Change !== 0) {
    impacts.push(`CO₂ levels will ${scenario.impact.co2Change > 0 ? 'increase' : 'decrease'} by ${Math.abs(scenario.impact.co2Change)} ppm`)
  }
  if (scenario.impact.temperatureChange !== 0) {
    impacts.push(`Temperature will ${scenario.impact.temperatureChange > 0 ? 'rise' : 'drop'} by ${Math.abs(scenario.impact.temperatureChange)}°C`)
  }
  
  const impactText = impacts.length > 0 ? ` Key impacts: ${impacts.join(', ')}.` : ''
  
  return `${description}${impactText}`
}

// Keyboard navigation utilities
export const KEYBOARD_SHORTCUTS = {
  RESET: 'KeyR',
  PAUSE: 'Space',
  FOCUS_INPUT: 'KeyI',
  SUBMIT: 'Enter',
  ESCAPE: 'Escape',
  HELP: 'F1',
} as const

export const handleKeyboardNavigation = (
  event: KeyboardEvent,
  actions: {
    onReset?: () => void
    onPause?: () => void
    onFocusInput?: () => void
    onSubmit?: () => void
    onEscape?: () => void
    onHelp?: () => void
  }
) => {
  const { code, ctrlKey, metaKey } = event
  
  // Only handle shortcuts without modifier keys for accessibility
  if (ctrlKey || metaKey) return
  
  switch (code) {
    case KEYBOARD_SHORTCUTS.RESET:
      event.preventDefault()
      actions.onReset?.()
      break
    case KEYBOARD_SHORTCUTS.PAUSE:
      event.preventDefault()
      actions.onPause?.()
      break
    case KEYBOARD_SHORTCUTS.FOCUS_INPUT:
      event.preventDefault()
      actions.onFocusInput?.()
      break
    case KEYBOARD_SHORTCUTS.SUBMIT:
      // Only handle if not already in a form input
      if (!['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement)?.tagName)) {
        event.preventDefault()
        actions.onSubmit?.()
      }
      break
    case KEYBOARD_SHORTCUTS.ESCAPE:
      event.preventDefault()
      actions.onEscape?.()
      break
    case KEYBOARD_SHORTCUTS.HELP:
      event.preventDefault()
      actions.onHelp?.()
      break
  }
}

// Screen reader announcements
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  if (typeof window === 'undefined') return
  
  try {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    
    // Remove after announcement
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement)
      }
    }, 1000)
  } catch (error) {
    console.warn('Screen reader announcement failed:', error)
  }
}

// Focus management utilities
export const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>
  
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  
  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }
  }
  
  element.addEventListener('keydown', handleTabKey)
  
  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey)
  }
}

// Language utilities for internationalization
export const SUPPORTED_LANGUAGES = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  zh: '中文',
  ja: '日本語',
  ar: 'العربية',
  hi: 'हिन्दी',
  pt: 'Português',
  ru: 'Русский',
} as const

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES

// Get user's preferred language
export const getUserPreferredLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return 'en'
  
  try {
    const browserLang = navigator.language.split('-')[0] as SupportedLanguage
    return Object.keys(SUPPORTED_LANGUAGES).includes(browserLang) ? browserLang : 'en'
  } catch {
    return 'en'
  }
}

// Format numbers for different locales
export const formatNumber = (num: number, locale: string = 'en-US'): string => {
  try {
    return new Intl.NumberFormat(locale).format(num)
  } catch {
    return num.toString()
  }
}

// Format percentages for different locales
export const formatPercentage = (num: number, locale: string = 'en-US'): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num / 100)
  } catch {
    return `${num}%`
  }
}
