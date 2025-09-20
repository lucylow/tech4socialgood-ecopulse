// Mock data service for EcoPulse environmental simulation

export interface EnvironmentalScenario {
  id: string;
  name: string;
  description: string;
  category: 'positive' | 'negative' | 'neutral' | 'catastrophic';
  keywords: string[];
  impact: {
    co2Change: number;
    toxicityChange: number;
    temperatureChange: number;
    humanPopulationChange: number;
    animalPopulationChange: number;
    plantPopulationChange: number;
    oceanAcidityChange: number;
    iceCapMeltingChange: number;
    pollutionChange: number;
  };
  specialEvent?: string;
  analysis: string;
  duration: 'immediate' | 'short' | 'medium' | 'long';
  region?: string[];
}

export interface MockMetrics {
  co2Level: number;
  toxicityLevel: number;
  temperature: number;
  humanPopulation: number;
  animalPopulation: number;
  plantPopulation: number;
  oceanAcidity: number;
  iceCapMelting: number;
}

export const MOCK_SCENARIOS: EnvironmentalScenario[] = [
  // Positive Environmental Actions
  {
    id: 'renewable-energy',
    name: 'Renewable Energy Implementation',
    description: 'Building renewable energy infrastructure',
    category: 'positive',
    keywords: ['renewable', 'solar', 'wind', 'clean energy', 'green energy', 'sustainable energy'],
    impact: {
      co2Change: -25,
      toxicityChange: -8,
      temperatureChange: -0.3,
      humanPopulationChange: 50000000, // Jobs and health benefits
      animalPopulationChange: 100000000,
      plantPopulationChange: 50000000000,
      oceanAcidityChange: 0.02,
      iceCapMeltingChange: -2,
      pollutionChange: -12
    },
    analysis: 'Implementing renewable energy sources significantly reduces CO2 emissions and air pollution. This creates green jobs, improves air quality, and helps combat climate change. The transition to clean energy benefits both human health and environmental ecosystems.',
    duration: 'medium',
    region: ['global']
  },
  {
    id: 'reforestation',
    name: 'Global Reforestation',
    description: 'Large-scale tree planting and forest restoration',
    category: 'positive',
    keywords: ['tree', 'plant', 'forest', 'reforestation', 'reforestation', 'green', 'carbon capture'],
    impact: {
      co2Change: -40,
      toxicityChange: -5,
      temperatureChange: -0.5,
      humanPopulationChange: 10000000,
      animalPopulationChange: 2000000000,
      plantPopulationChange: 100000000000,
      oceanAcidityChange: 0.01,
      iceCapMeltingChange: -1,
      pollutionChange: -8
    },
    analysis: 'Large-scale reforestation acts as a natural carbon sink, absorbing CO2 from the atmosphere. Trees improve air quality, provide habitat for wildlife, and help regulate global temperatures through evapotranspiration.',
    duration: 'long',
    region: ['global']
  },
  {
    id: 'electric-vehicles',
    name: 'Electric Vehicle Adoption',
    description: 'Mass adoption of electric vehicles worldwide',
    category: 'positive',
    keywords: ['electric', 'vehicle', 'car', 'ev', 'battery', 'transport', 'emission'],
    impact: {
      co2Change: -30,
      toxicityChange: -12,
      temperatureChange: -0.4,
      humanPopulationChange: 20000000,
      animalPopulationChange: 500000000,
      plantPopulationChange: 20000000000,
      oceanAcidityChange: 0.015,
      iceCapMeltingChange: -1.5,
      pollutionChange: -15
    },
    analysis: 'Electric vehicles eliminate direct emissions from transportation, significantly reducing urban air pollution and greenhouse gas emissions. This improves public health and reduces dependence on fossil fuels.',
    duration: 'medium',
    region: ['global']
  },
  {
    id: 'ocean-cleanup',
    name: 'Ocean Plastic Cleanup',
    description: 'Removing plastic waste from oceans',
    category: 'positive',
    keywords: ['ocean', 'plastic', 'cleanup', 'waste', 'marine', 'pollution'],
    impact: {
      co2Change: -5,
      toxicityChange: -3,
      temperatureChange: 0,
      humanPopulationChange: 5000000,
      animalPopulationChange: 5000000000,
      plantPopulationChange: 10000000000,
      oceanAcidityChange: 0.005,
      iceCapMeltingChange: 0,
      pollutionChange: -5
    },
    analysis: 'Ocean cleanup removes harmful plastic waste that threatens marine ecosystems. This protects marine life, improves water quality, and helps restore ocean biodiversity.',
    duration: 'short',
    region: ['ocean']
  },
  {
    id: 'carbon-capture',
    name: 'Carbon Capture Technology',
    description: 'Deploying carbon capture and storage systems',
    category: 'positive',
    keywords: ['carbon', 'capture', 'storage', 'ccs', 'technology', 'emission'],
    impact: {
      co2Change: -50,
      toxicityChange: -6,
      temperatureChange: -0.6,
      humanPopulationChange: 10000000,
      animalPopulationChange: 100000000,
      plantPopulationChange: 10000000000,
      oceanAcidityChange: 0.02,
      iceCapMeltingChange: -2.5,
      pollutionChange: -8
    },
    analysis: 'Carbon capture technology directly removes CO2 from the atmosphere or industrial emissions. This innovative solution helps achieve net-zero emissions and slows climate change.',
    duration: 'medium',
    region: ['global']
  },

  // Negative Environmental Actions
  {
    id: 'deforestation',
    name: 'Deforestation',
    description: 'Large-scale forest clearing',
    category: 'negative',
    keywords: ['deforest', 'cut', 'tree', 'clear', 'logging', 'destroy'],
    impact: {
      co2Change: 60,
      toxicityChange: 8,
      temperatureChange: 1.2,
      humanPopulationChange: -10000000,
      animalPopulationChange: -2000000000,
      plantPopulationChange: -50000000000,
      oceanAcidityChange: -0.02,
      iceCapMeltingChange: 3,
      pollutionChange: 15
    },
    analysis: 'Deforestation releases stored carbon, reduces biodiversity, and eliminates natural carbon sinks. This accelerates climate change and destroys critical wildlife habitats.',
    duration: 'short',
    region: ['global']
  },
  {
    id: 'amazon-deforestation',
    name: 'Amazon Rainforest Deforestation',
    description: 'Cutting down 30% of the Amazon rainforest',
    category: 'negative',
    keywords: ['amazon', 'rainforest', 'deforest', 'cut down', '30%', 'brazil', 'south america', 'tropical'],
    impact: {
      co2Change: 120,
      toxicityChange: 15,
      temperatureChange: 2.5,
      humanPopulationChange: -50000000,
      animalPopulationChange: -5000000000,
      plantPopulationChange: -150000000000,
      oceanAcidityChange: -0.05,
      iceCapMeltingChange: 8,
      pollutionChange: 25
    },
    analysis: 'The Amazon rainforest is the world\'s largest carbon sink, storing approximately 200 billion tons of carbon. Deforestation of 30% would release massive amounts of CO2, accelerate climate change, destroy countless species, and disrupt global weather patterns. This catastrophic loss would be irreversible and devastating for global climate stability.',
    duration: 'medium',
    region: ['south america', 'amazon', 'brazil'],
    specialEvent: 'Amazon Deforestation Crisis'
  },
  {
    id: 'industrial-pollution',
    name: 'Industrial Pollution',
    description: 'Increased industrial emissions and waste',
    category: 'negative',
    keywords: ['factory', 'industry', 'manufacture', 'pollute', 'emission', 'waste'],
    impact: {
      co2Change: 80,
      toxicityChange: 25,
      temperatureChange: 1.5,
      humanPopulationChange: -50000000,
      animalPopulationChange: -1000000000,
      plantPopulationChange: -20000000000,
      oceanAcidityChange: -0.05,
      iceCapMeltingChange: 4,
      pollutionChange: 30
    },
    analysis: 'Industrial pollution releases massive amounts of greenhouse gases and toxic chemicals. This severely impacts air quality, human health, and environmental ecosystems.',
    duration: 'medium',
    region: ['global']
  },
  {
    id: 'fossil-fuel-burn',
    name: 'Fossil Fuel Burning',
    description: 'Massive fossil fuel consumption',
    category: 'negative',
    keywords: ['fossil', 'fuel', 'coal', 'oil', 'gas', 'burn', 'combustion'],
    impact: {
      co2Change: 100,
      toxicityChange: 20,
      temperatureChange: 2.0,
      humanPopulationChange: -20000000,
      animalPopulationChange: -500000000,
      plantPopulationChange: -10000000000,
      oceanAcidityChange: -0.03,
      iceCapMeltingChange: 5,
      pollutionChange: 25
    },
    analysis: 'Burning fossil fuels releases enormous amounts of CO2 and pollutants. This is the primary driver of climate change and air pollution, with severe health and environmental consequences.',
    duration: 'medium',
    region: ['global']
  },

  // Catastrophic Events
  {
    id: 'nuclear-war',
    name: 'Nuclear War',
    description: 'Global nuclear conflict',
    category: 'catastrophic',
    keywords: ['nuclear', 'war', 'bomb', 'conflict', 'atomic'],
    impact: {
      co2Change: 200,
      toxicityChange: 85,
      temperatureChange: -15, // Nuclear winter
      humanPopulationChange: -7650000000, // 85% loss
      animalPopulationChange: -50000000000,
      plantPopulationChange: -300000000000,
      oceanAcidityChange: -0.1,
      iceCapMeltingChange: -10,
      pollutionChange: 85
    },
    specialEvent: 'nuclear',
    analysis: 'Nuclear war would cause immediate mass casualties and long-term environmental devastation. Nuclear winter would lower global temperatures, while radiation would poison ecosystems for generations.',
    duration: 'immediate',
    region: ['global']
  },
  {
    id: 'meteor-impact',
    name: 'Meteor Impact',
    description: 'Large asteroid impact on Earth',
    category: 'catastrophic',
    keywords: ['meteor', 'asteroid', 'impact', 'smash', 'collision'],
    impact: {
      co2Change: 300,
      toxicityChange: 70,
      temperatureChange: 20, // Global firestorm
      humanPopulationChange: -8100000000, // 90% loss
      animalPopulationChange: -90000000000,
      plantPopulationChange: -800000000000,
      oceanAcidityChange: -0.2,
      iceCapMeltingChange: 50,
      pollutionChange: 80
    },
    specialEvent: 'meteor',
    analysis: 'A large meteor impact would cause massive destruction, global firestorms, and long-term climate disruption. The impact would release enormous amounts of dust and gases into the atmosphere.',
    duration: 'immediate',
    region: ['global']
  },
  {
    id: 'volcanic-eruption',
    name: 'Supervolcano Eruption',
    description: 'Massive volcanic eruption',
    category: 'catastrophic',
    keywords: ['volcano', 'erupt', 'volcanic', 'lava', 'ash'],
    impact: {
      co2Change: 400,
      toxicityChange: 50,
      temperatureChange: -8, // Volcanic winter, then warming
      humanPopulationChange: -3600000000, // 40% loss
      animalPopulationChange: -40000000000,
      plantPopulationChange: -200000000000,
      oceanAcidityChange: -0.15,
      iceCapMeltingChange: 20,
      pollutionChange: 60
    },
    specialEvent: 'volcano',
    analysis: 'A supervolcano eruption would inject massive amounts of ash and gases into the atmosphere, causing global cooling followed by warming. This would severely impact agriculture and ecosystems.',
    duration: 'long',
    region: ['global']
  },
  {
    id: 'moon-crash',
    name: 'Moon Collision',
    description: 'Moon crashing into Earth',
    category: 'catastrophic',
    keywords: ['moon', 'lunar', 'crash', 'collision', 'impact'],
    impact: {
      co2Change: 500,
      toxicityChange: 95,
      temperatureChange: 50, // Global firestorm
      humanPopulationChange: -8991000000, // 99.9% loss
      animalPopulationChange: -99900000000,
      plantPopulationChange: -999000000000,
      oceanAcidityChange: -0.5,
      iceCapMeltingChange: 100,
      pollutionChange: 95
    },
    specialEvent: 'moon',
    analysis: 'A moon collision would be an extinction-level event. The massive impact would vaporize oceans, create a global firestorm, and destroy the atmosphere, making Earth uninhabitable.',
    duration: 'immediate',
    region: ['global']
  },
  {
    id: 'divine-intervention',
    name: 'Divine Intervention',
    description: 'Miraculous healing of the planet',
    category: 'positive',
    keywords: ['god', 'save', 'divine', 'miracle', 'heal'],
    impact: {
      co2Change: -415, // Reset to baseline
      toxicityChange: -5, // Reset to baseline
      temperatureChange: -30, // Reset to baseline
      humanPopulationChange: 9000000000, // Restore to full
      animalPopulationChange: 100000000000,
      plantPopulationChange: 1000000000000,
      oceanAcidityChange: 8.1, // Reset to baseline
      iceCapMeltingChange: -10, // Reset to baseline
      pollutionChange: -100 // Reset to 0
    },
    specialEvent: 'god',
    analysis: 'Divine intervention miraculously restores Earth to its pristine condition. All environmental damage is reversed, populations are restored, and the planet is healed to its natural state.',
    duration: 'immediate',
    region: ['global']
  }
];

export const MOCK_BASELINE_METRICS: MockMetrics = {
  co2Level: 415,
  toxicityLevel: 5,
  temperature: 30,
  humanPopulation: 9000000000,
  animalPopulation: 100000000000,
  plantPopulation: 1000000000000,
  oceanAcidity: 8.1,
  iceCapMelting: 10
};

export const MOCK_ANALYSIS_TEMPLATES = {
  positive: [
    "This positive environmental action will help restore Earth's natural balance.",
    "Implementing this solution contributes to long-term sustainability and ecosystem health.",
    "This action demonstrates how human innovation can work in harmony with nature.",
    "The environmental benefits of this action will be felt for generations to come."
  ],
  negative: [
    "This action will have detrimental effects on Earth's delicate ecosystems.",
    "The environmental damage from this action may take decades to reverse.",
    "This demonstrates the urgent need for sustainable alternatives.",
    "The long-term consequences of this action could be irreversible."
  ],
  catastrophic: [
    "This catastrophic event would fundamentally alter life on Earth.",
    "The scale of destruction from this event would be unprecedented.",
    "This event would cause mass extinctions and environmental collapse.",
    "The aftermath of this event would last for centuries or millennia."
  ],
  neutral: [
    "This action will have minimal environmental impact in the short term.",
    "The long-term effects of this action require further study.",
    "This action represents a neutral change to current environmental conditions.",
    "The environmental implications of this action are complex and multifaceted."
  ]
};

export function findMatchingScenario(command: string): EnvironmentalScenario | null {
  const lowerCommand = command.toLowerCase();
  
  // Find exact keyword matches first
  for (const scenario of MOCK_SCENARIOS) {
    for (const keyword of scenario.keywords) {
      if (lowerCommand.includes(keyword.toLowerCase())) {
        return scenario;
      }
    }
  }
  
  // If no exact match, try fuzzy matching for common patterns
  const fuzzyMatches = [
    { pattern: /renewable|solar|wind|clean energy/, scenarioId: 'renewable-energy' },
    { pattern: /plant.*tree|reforest|green/, scenarioId: 'reforestation' },
    { pattern: /electric.*car|ev|battery.*car/, scenarioId: 'electric-vehicles' },
    { pattern: /ocean.*clean|plastic.*clean/, scenarioId: 'ocean-cleanup' },
    { pattern: /carbon.*capture|ccs/, scenarioId: 'carbon-capture' },
    { pattern: /deforest|cut.*tree|logging/, scenarioId: 'deforestation' },
    { pattern: /factory|industry|manufacture/, scenarioId: 'industrial-pollution' },
    { pattern: /fossil|coal|oil|gas.*burn/, scenarioId: 'fossil-fuel-burn' },
    { pattern: /nuclear|atomic.*war/, scenarioId: 'nuclear-war' },
    { pattern: /meteor|asteroid|smash/, scenarioId: 'meteor-impact' },
    { pattern: /volcano|erupt/, scenarioId: 'volcanic-eruption' },
    { pattern: /moon.*crash|lunar.*collision/, scenarioId: 'moon-crash' },
    { pattern: /god.*save|divine/, scenarioId: 'divine-intervention' }
  ];
  
  for (const match of fuzzyMatches) {
    if (match.pattern.test(lowerCommand)) {
      const scenario = MOCK_SCENARIOS.find(s => s.id === match.scenarioId);
      if (scenario) return scenario;
    }
  }
  
  return null;
}

export function calculateMockImpact(
  currentMetrics: MockMetrics,
  scenario: EnvironmentalScenario,
  pollutionLevel: number
) {
  const newMetrics = {
    co2Level: Math.max(0, Math.min(2000, currentMetrics.co2Level + scenario.impact.co2Change)),
    toxicityLevel: Math.max(0, Math.min(100, currentMetrics.toxicityLevel + scenario.impact.toxicityChange)),
    temperature: Math.max(-50, Math.min(50, currentMetrics.temperature + scenario.impact.temperatureChange)),
    humanPopulation: Math.max(0, currentMetrics.humanPopulation + scenario.impact.humanPopulationChange),
    animalPopulation: Math.max(0, currentMetrics.animalPopulation + scenario.impact.animalPopulationChange),
    plantPopulation: Math.max(0, currentMetrics.plantPopulation + scenario.impact.plantPopulationChange),
    oceanAcidity: Math.max(6.0, Math.min(9.0, currentMetrics.oceanAcidity + scenario.impact.oceanAcidityChange)),
    iceCapMelting: Math.max(0, Math.min(100, currentMetrics.iceCapMelting + scenario.impact.iceCapMeltingChange))
  };
  
  const newPollutionLevel = Math.max(0, Math.min(100, pollutionLevel + scenario.impact.pollutionChange));
  
  return {
    metrics: newMetrics,
    pollutionLevel: newPollutionLevel,
    specialEvent: scenario.specialEvent || null,
    analysis: generateMockAnalysis(currentMetrics, newMetrics, scenario, pollutionLevel, newPollutionLevel)
  };
}

function generateMockAnalysis(
  currentMetrics: MockMetrics,
  newMetrics: MockMetrics,
  scenario: EnvironmentalScenario,
  oldPollution: number,
  newPollution: number
): string {
  const changes = [];
  
  if (newMetrics.co2Level !== currentMetrics.co2Level) {
    const change = newMetrics.co2Level - currentMetrics.co2Level;
    const direction = change > 0 ? 'increased' : 'decreased';
    changes.push(`CO₂ levels ${direction} by ${Math.abs(change).toFixed(0)} ppm`);
  }
  
  if (newMetrics.toxicityLevel !== currentMetrics.toxicityLevel) {
    const change = newMetrics.toxicityLevel - currentMetrics.toxicityLevel;
    const direction = change > 0 ? 'increased' : 'decreased';
    changes.push(`Air toxicity ${direction} by ${Math.abs(change).toFixed(1)}%`);
  }
  
  if (newMetrics.temperature !== currentMetrics.temperature) {
    const change = newMetrics.temperature - currentMetrics.temperature;
    const direction = change > 0 ? 'increased' : 'decreased';
    changes.push(`Global temperature ${direction} by ${Math.abs(change).toFixed(1)}°C`);
  }
  
  if (newMetrics.humanPopulation !== currentMetrics.humanPopulation) {
    const change = newMetrics.humanPopulation - currentMetrics.humanPopulation;
    const direction = change > 0 ? 'increased' : 'decreased';
    changes.push(`Human population ${direction} by ${Math.abs(change).toLocaleString()}`);
  }
  
  if (newMetrics.animalPopulation !== currentMetrics.animalPopulation) {
    const change = newMetrics.animalPopulation - currentMetrics.animalPopulation;
    const direction = change > 0 ? 'increased' : 'decreased';
    changes.push(`Animal population ${direction} by ${Math.abs(change).toLocaleString()}`);
  }
  
  if (newMetrics.plantPopulation !== currentMetrics.plantPopulation) {
    const change = newMetrics.plantPopulation - currentMetrics.plantPopulation;
    const direction = change > 0 ? 'increased' : 'decreased';
    changes.push(`Plant population ${direction} by ${Math.abs(change).toLocaleString()}`);
  }
  
  if (newPollution !== oldPollution) {
    const change = newPollution - oldPollution;
    const direction = change > 0 ? 'increased' : 'decreased';
    changes.push(`Overall pollution ${direction} by ${Math.abs(change).toFixed(1)}%`);
  }
  
  const template = MOCK_ANALYSIS_TEMPLATES[scenario.category][
    Math.floor(Math.random() * MOCK_ANALYSIS_TEMPLATES[scenario.category].length)
  ];
  
  let analysis = `${scenario.analysis}\n\n`;
  if (changes.length > 0) {
    analysis += `📊 Key Changes:\n${changes.join('\n')}`;
  }
  
  return analysis;
}
