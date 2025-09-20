// Mock hooks and utilities for EcoPulse frontend

import { MOCK_SCENARIOS, MOCK_BASELINE_METRICS } from './mockData';

export interface MockCommandSuggestion {
  command: string;
  category: 'positive' | 'negative' | 'neutral' | 'catastrophic';
  description: string;
  icon: string;
  impact: 'low' | 'medium' | 'high' | 'extreme';
}

export const MOCK_COMMAND_SUGGESTIONS: MockCommandSuggestion[] = [
  // Positive Actions
  {
    command: "Build 100 renewable energy plants",
    category: 'positive',
    description: "Deploy solar and wind energy infrastructure",
    icon: "⚡",
    impact: 'high'
  },
  {
    command: "Plant 1 million trees worldwide",
    category: 'positive',
    description: "Large-scale reforestation initiative",
    icon: "🌳",
    impact: 'high'
  },
  {
    command: "Switch to electric vehicles globally",
    category: 'positive',
    description: "Replace fossil fuel vehicles with EVs",
    icon: "🚗",
    impact: 'high'
  },
  {
    command: "Install solar panels on every roof",
    category: 'positive',
    description: "Mass solar panel deployment",
    icon: "☀️",
    impact: 'medium'
  },
  {
    command: "Clean up ocean plastic waste",
    category: 'positive',
    description: "Remove plastic pollution from oceans",
    icon: "🌊",
    impact: 'medium'
  },
  {
    command: "Implement carbon capture technology",
    category: 'positive',
    description: "Deploy CCS systems globally",
    icon: "🌍",
    impact: 'high'
  },
  {
    command: "Protect the Amazon rainforest",
    category: 'positive',
    description: "Conserve and restore Amazon ecosystems",
    icon: "🌲",
    impact: 'high'
  },
  {
    command: "Build green cities with smart grids",
    category: 'positive',
    description: "Develop sustainable urban infrastructure",
    icon: "🏙️",
    impact: 'medium'
  },
  {
    command: "Promote sustainable agriculture",
    category: 'positive',
    description: "Transition to eco-friendly farming",
    icon: "🚜",
    impact: 'medium'
  },
  {
    command: "Reduce food waste globally",
    category: 'positive',
    description: "Minimize food waste and improve efficiency",
    icon: "🍎",
    impact: 'low'
  },

  // Negative Actions (for educational purposes)
  {
    command: "Build 1000 coal power plants",
    category: 'negative',
    description: "Expand fossil fuel infrastructure",
    icon: "🏭",
    impact: 'high'
  },
  {
    command: "Cut down the Amazon rainforest",
    category: 'negative',
    description: "Mass deforestation operation",
    icon: "🌲",
    impact: 'extreme'
  },
  {
    command: "Release 50 million tons of CO2",
    category: 'negative',
    description: "Massive greenhouse gas release",
    icon: "💨",
    impact: 'high'
  },
  {
    command: "Dump nuclear waste in the ocean",
    category: 'negative',
    description: "Contaminate marine ecosystems",
    icon: "☢️",
    impact: 'extreme'
  },
  {
    command: "Build 10,000 factories in China",
    category: 'negative',
    description: "Massive industrial expansion",
    icon: "🏭",
    impact: 'high'
  },
  {
    command: "Destroy all coral reefs",
    category: 'negative',
    description: "Eliminate marine biodiversity",
    icon: "🪸",
    impact: 'extreme'
  },
  {
    command: "Burn all fossil fuel reserves",
    category: 'negative',
    description: "Consume all remaining fossil fuels",
    icon: "🔥",
    impact: 'extreme'
  },
  {
    command: "Poison all freshwater sources",
    category: 'negative',
    description: "Contaminate global water supply",
    icon: "💧",
    impact: 'extreme'
  },

  // Catastrophic Events
  {
    command: "Smash a meteor into Earth",
    category: 'catastrophic',
    description: "Asteroid impact simulation",
    icon: "☄️",
    impact: 'extreme'
  },
  {
    command: "Start a nuclear war",
    category: 'catastrophic',
    description: "Global nuclear conflict",
    icon: "💥",
    impact: 'extreme'
  },
  {
    command: "Crash the moon into Earth",
    category: 'catastrophic',
    description: "Lunar collision event",
    icon: "🌙",
    impact: 'extreme'
  },
  {
    command: "Erupt all volcanoes simultaneously",
    category: 'catastrophic',
    description: "Global volcanic eruption",
    icon: "🌋",
    impact: 'extreme'
  },
  {
    command: "Melt all polar ice caps",
    category: 'catastrophic',
    description: "Complete ice sheet collapse",
    icon: "🧊",
    impact: 'extreme'
  },
  {
    command: "Release methane from permafrost",
    category: 'catastrophic',
    description: "Massive methane release",
    icon: "❄️",
    impact: 'extreme'
  },

  // Divine Intervention
  {
    command: "God saves the Earth",
    category: 'positive',
    description: "Divine environmental restoration",
    icon: "✨",
    impact: 'extreme'
  }
];

export interface MockEnvironmentalFact {
  fact: string;
  category: 'climate' | 'biodiversity' | 'pollution' | 'energy' | 'ocean';
  severity: 'low' | 'medium' | 'high' | 'extreme';
  source?: string;
}

export const MOCK_ENVIRONMENTAL_FACTS: MockEnvironmentalFact[] = [
  {
    fact: "The last decade was the warmest on record globally.",
    category: 'climate',
    severity: 'high',
    source: 'NASA'
  },
  {
    fact: "Over 1 million species are at risk of extinction due to human activities.",
    category: 'biodiversity',
    severity: 'extreme',
    source: 'IPBES'
  },
  {
    fact: "Plastic pollution in oceans could outweigh fish by 2050.",
    category: 'pollution',
    severity: 'high',
    source: 'Ellen MacArthur Foundation'
  },
  {
    fact: "Renewable energy now provides over 30% of global electricity.",
    category: 'energy',
    severity: 'medium',
    source: 'IEA'
  },
  {
    fact: "Ocean acidification has increased by 30% since the Industrial Revolution.",
    category: 'ocean',
    severity: 'high',
    source: 'NOAA'
  },
  {
    fact: "Forests absorb about 2.6 billion tons of CO2 annually.",
    category: 'climate',
    severity: 'medium',
    source: 'Global Forest Watch'
  },
  {
    fact: "Air pollution causes 7 million premature deaths worldwide each year.",
    category: 'pollution',
    severity: 'extreme',
    source: 'WHO'
  },
  {
    fact: "Solar energy costs have dropped 90% in the last decade.",
    category: 'energy',
    severity: 'low',
    source: 'IRENA'
  },
  {
    fact: "Coral reefs support 25% of marine life despite covering less than 1% of oceans.",
    category: 'biodiversity',
    severity: 'medium',
    source: 'NOAA'
  },
  {
    fact: "Permafrost thaw could release 1.7 trillion tons of carbon by 2100.",
    category: 'climate',
    severity: 'extreme',
    source: 'Nature Climate Change'
  }
];

export interface MockRegionalData {
  region: string;
  population: number;
  co2Emissions: number; // million tons per year
  renewablePercentage: number;
  deforestationRate: number; // hectares per year
  airQualityIndex: number; // 0-500
  temperatureChange: number; // °C since pre-industrial
}

export const MOCK_REGIONAL_DATA: MockRegionalData[] = [
  {
    region: "North America",
    population: 579000000,
    co2Emissions: 5900,
    renewablePercentage: 22,
    deforestationRate: 1000000,
    airQualityIndex: 45,
    temperatureChange: 1.8
  },
  {
    region: "Europe",
    population: 746000000,
    co2Emissions: 3700,
    renewablePercentage: 38,
    deforestationRate: 200000,
    airQualityIndex: 35,
    temperatureChange: 1.5
  },
  {
    region: "Asia",
    population: 4600000000,
    co2Emissions: 18000,
    renewablePercentage: 28,
    deforestationRate: 5000000,
    airQualityIndex: 85,
    temperatureChange: 2.1
  },
  {
    region: "Africa",
    population: 1300000000,
    co2Emissions: 1200,
    renewablePercentage: 35,
    deforestationRate: 3000000,
    airQualityIndex: 65,
    temperatureChange: 1.9
  },
  {
    region: "South America",
    population: 430000000,
    co2Emissions: 1100,
    renewablePercentage: 45,
    deforestationRate: 4000000,
    airQualityIndex: 55,
    temperatureChange: 1.7
  },
  {
    region: "Oceania",
    population: 42000000,
    co2Emissions: 400,
    renewablePercentage: 32,
    deforestationRate: 100000,
    airQualityIndex: 25,
    temperatureChange: 1.6
  }
];

export function getRandomEnvironmentalFact(): MockEnvironmentalFact {
  return MOCK_ENVIRONMENTAL_FACTS[Math.floor(Math.random() * MOCK_ENVIRONMENTAL_FACTS.length)];
}

export function getCommandsByCategory(category: 'positive' | 'negative' | 'neutral' | 'catastrophic'): MockCommandSuggestion[] {
  return MOCK_COMMAND_SUGGESTIONS.filter(cmd => cmd.category === category);
}

export function getRandomCommand(category?: 'positive' | 'negative' | 'neutral' | 'catastrophic'): MockCommandSuggestion {
  const commands = category ? getCommandsByCategory(category) : MOCK_COMMAND_SUGGESTIONS;
  return commands[Math.floor(Math.random() * commands.length)];
}

export function getRegionalDataByRegion(region: string): MockRegionalData | undefined {
  return MOCK_REGIONAL_DATA.find(data => data.region === region);
}

export function calculateGlobalAverages(): MockRegionalData {
  const total = MOCK_REGIONAL_DATA.reduce((acc, region) => ({
    population: acc.population + region.population,
    co2Emissions: acc.co2Emissions + region.co2Emissions,
    renewablePercentage: acc.renewablePercentage + region.renewablePercentage,
    deforestationRate: acc.deforestationRate + region.deforestationRate,
    airQualityIndex: acc.airQualityIndex + region.airQualityIndex,
    temperatureChange: acc.temperatureChange + region.temperatureChange
  }), {
    population: 0,
    co2Emissions: 0,
    renewablePercentage: 0,
    deforestationRate: 0,
    airQualityIndex: 0,
    temperatureChange: 0
  });

  const count = MOCK_REGIONAL_DATA.length;
  
  return {
    region: "Global Average",
    population: Math.round(total.population / count),
    co2Emissions: Math.round(total.co2Emissions / count),
    renewablePercentage: Math.round(total.renewablePercentage / count),
    deforestationRate: Math.round(total.deforestationRate / count),
    airQualityIndex: Math.round(total.airQualityIndex / count),
    temperatureChange: Math.round(total.temperatureChange / count * 10) / 10
  };
}

export function getImpactColor(impact: 'low' | 'medium' | 'high' | 'extreme'): string {
  switch (impact) {
    case 'low': return 'text-green-400';
    case 'medium': return 'text-yellow-400';
    case 'high': return 'text-orange-400';
    case 'extreme': return 'text-red-400';
    default: return 'text-gray-400';
  }
}

export function getCategoryIcon(category: 'positive' | 'negative' | 'neutral' | 'catastrophic'): string {
  switch (category) {
    case 'positive': return '✅';
    case 'negative': return '⚠️';
    case 'neutral': return '⚪';
    case 'catastrophic': return '💥';
    default: return '❓';
  }
}
