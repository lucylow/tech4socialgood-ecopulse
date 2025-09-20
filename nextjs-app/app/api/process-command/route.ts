import { NextRequest, NextResponse } from "next/server";
import { findMatchingScenario, calculateMockImpact, MOCK_SCENARIOS } from "@/lib/mockData";
import { 
  generatePredictions, 
  generateComparison, 
  personalizeAnalysis, 
  assessEducationalValue,
  generateActionRecommendations,
  EnhancedAnalysis,
  PersonalizationProfile
} from "@/lib/aiEnhancements";

export async function POST(request: NextRequest) {
  try {
    const {
      command,
      currentMetrics,
      pollutionLevel,
      model = "llama3.2:1b",
    } = await request.json();

    // Try to find matching scenario in mock data first
    const matchingScenario = findMatchingScenario(command);
    if (matchingScenario) {
      console.log(`Using mock scenario: ${matchingScenario.name}`);
      const mockResult = calculateMockImpact(currentMetrics, matchingScenario, pollutionLevel);
      
      // Enhance with AI capabilities
      const enhancedResult: EnhancedAnalysis = {
        ...mockResult,
        predictions: [
          generatePredictions(mockResult.metrics, command, 'short'),
          generatePredictions(mockResult.metrics, command, 'medium'),
          generatePredictions(mockResult.metrics, command, 'long')
        ],
        educationalValue: assessEducationalValue(command, mockResult),
        actionRecommendations: generateActionRecommendations(command, mockResult)
      };
      
      return NextResponse.json(enhancedResult);
    }

    // Check for catastrophic events
    const lowerCommand = command.toLowerCase();
    let specialEvent = null;
    let isCatastrophic = false;
    let catastrophicType = "";

    if (
      lowerCommand.includes("meteor") ||
      lowerCommand.includes("asteroid") ||
      lowerCommand.includes("smash")
    ) {
      specialEvent = "meteor";
      isCatastrophic = true;
      catastrophicType = "meteor";
    } else if (
      lowerCommand.includes("nuclear") ||
      lowerCommand.includes("bomb") ||
      lowerCommand.includes("war")
    ) {
      specialEvent = "nuclear";
      isCatastrophic = true;
      catastrophicType = "nuclear";
    } else if (
      lowerCommand.includes("volcano") ||
      lowerCommand.includes("erupt")
    ) {
      specialEvent = "volcano";
      isCatastrophic = true;
      catastrophicType = "volcano";
    } else if (
      lowerCommand.includes("moon") ||
      lowerCommand.includes("lunar") ||
      lowerCommand.includes("crash")
    ) {
      specialEvent = "moon";
      isCatastrophic = true;
      catastrophicType = "moon";
    } else if (lowerCommand.includes("god") && lowerCommand.includes("save")) {
      specialEvent = "god";
      isCatastrophic = false;
      catastrophicType = "god";
    }

    // Adjust prompt based on model
    const isQwen = model.includes("qwen");
    const isDeepseekSmall =
      model.includes("deepseek-r1:1.5b") || model.includes("deepseek-r1:7b");
    const prompt = `
You are an environmental AI expert analyzing the impact of human actions on Earth. You must calculate realistic environmental effects and return them in JSON format.

Current Earth State:
- CO2 Level: ${currentMetrics.co2Level} ppm
- Air Toxicity: ${currentMetrics.toxicityLevel}%
- Temperature: ${currentMetrics.temperature}°C
- Human Population: ${currentMetrics.humanPopulation.toLocaleString()}
- Animal Population: ${currentMetrics.animalPopulation.toLocaleString()}
- Plant Population: ${currentMetrics.plantPopulation.toLocaleString()}
- Ocean pH: ${currentMetrics.oceanAcidity}
- Ice Cap Melting: ${currentMetrics.iceCapMelting}%
- Overall Pollution Level: ${pollutionLevel}%

User Command: "${command}"

${
  isCatastrophic
    ? `This is a CATASTROPHIC EVENT (${catastrophicType.toUpperCase()}) that will cause MASSIVE environmental destruction and population loss.`
    : ""
}

Calculate the environmental impact of this action. Consider:
1. CO2 emissions and their effect on atmospheric levels
2. Air pollution and toxicity increases
3. Temperature changes (global warming effects)
4. Impact on human population (health, mortality) - IMPORTANT: 
   - Deadly events KILL people, reducing population
   - Pollution and environmental damage can cause health problems and population decline
   - Adding vehicles/emissions typically harms human health, not improves it
5. Impact on animal populations (habitat loss, extinction)
6. Impact on plant populations (deforestation, growth)
7. Ocean acidification effects
8. Ice cap melting acceleration
9. Overall pollution level increase

CRITICAL LOGIC RULES:
- Adding vehicles/emissions = BAD for human health and population
- Pollution = BAD for all life forms
- Environmental damage = DECREASES populations, not increases them
- Only positive environmental actions (clean energy, conservation) should increase populations

${
  isCatastrophic
    ? `
CRITICAL: For catastrophic events like nuclear war, meteor impacts, and moon crashes:
- These events KILL massive numbers of people
- Human population MUST DECREASE significantly
- These are extinction-level threats to humanity
- Do NOT increase human population during deadly events
`
    : ""
}

${
  isCatastrophic
    ? `
For catastrophic events, use these guidelines:
- METEOR: Massive population loss (50-90%), extreme temperature rise, global devastation
- NUCLEAR: NUCLEAR WAR KILLS PEOPLE - human population MUST DECREASE by 70-95% due to explosions, radiation, nuclear winter, and societal collapse. This is a MASS EXTINCTION EVENT for humans.
- VOLCANO: Significant population loss (20-40%), massive CO2 release, global cooling then warming
- MOON: Complete extinction event (99%+ population loss), massive debris field, global firestorm, atmospheric destruction
`
    : ""
}

${
  catastrophicType === "god"
    ? `
For the GOD SAVE event, this is a MIRACULOUS HEALING that restores Earth to pristine condition:
- All metrics return to starting values (CO2: 415ppm, Toxicity: 5%, Temperature: 30°C, etc.)
- All populations restored to maximum (Humans: 9B, Animals: 100B, Plants: 1T)
- Pollution reduced to 0%
- This is a divine intervention that completely heals the planet
`
    : ""
}

${
  isQwen
    ? "Return a valid JSON object with this structure:"
    : isDeepseekSmall
    ? "IMPORTANT: Return ONLY a valid JSON object with this exact structure, no explanations or think tags:"
    : "Return ONLY a valid JSON object with this exact structure:"
}
{
  "analysis": "Detailed explanation of environmental impact",
  "metrics": {
    "co2Level": number,
    "toxicityLevel": number,
    "temperature": number,
    "humanPopulation": number,
    "animalPopulation": number,
    "plantPopulation": number,
    "oceanAcidity": number,
    "iceCapMelting": number
  },
  "pollutionLevel": number,
  "specialEvent": "${specialEvent || null}"
}

${
  isDeepseekSmall
    ? `CRITICAL: The specialEvent field MUST be set to "${
        specialEvent || null
      }" exactly as shown.`
    : ""
}

Ensure all numbers are realistic and within reasonable ranges. CO2: 0-2000 ppm, Toxicity: 0-100%, Temperature: -50 to 50°C, Populations: positive numbers, Ocean pH: 6.0-9.0, Ice Melting: 0-100%, Pollution: 0-100%.
${
  isQwen
    ? "Return only the JSON, no other text."
    : isDeepseekSmall
    ? "CRITICAL: Return ONLY the JSON object above, no explanations, no think tags, no code examples, just the JSON."
    : ""
}
`;

    // Try to call Ollama, but fallback to mock data if unavailable
    let ollamaResponse;
    try {
      ollamaResponse = await fetch("http://127.0.0.1:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          prompt: prompt,
          stream: false,
        }),
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(30000) // 30 second timeout
      });

      if (!ollamaResponse.ok) {
        throw new Error(`Ollama request failed: ${ollamaResponse.statusText}`);
      }
    } catch (ollamaError) {
      console.log('Ollama unavailable, using enhanced mock fallback:', ollamaError);
      
      // Enhanced mock fallback with better scenario matching
      const fallbackScenario = createFallbackScenario(command, isCatastrophic, catastrophicType);
      const mockResult = calculateMockImpact(currentMetrics, fallbackScenario, pollutionLevel);
      return NextResponse.json(mockResult);
    }

    const ollamaData = await ollamaResponse.json();
    let responseText = ollamaData.response;

    // Debug logging for deepseek models
    if (
      model.includes("deepseek-r1:1.5b") ||
      model.includes("deepseek-r1:7b")
    ) {
      console.log("=== DEEPSEEK RESPONSE DEBUG ===");
      console.log("Model:", model);
      console.log("Special Event:", specialEvent);
      console.log("Full response:", responseText);
      console.log("Response length:", responseText.length);
      console.log("Contains <think>:", responseText.includes("<think>"));
      console.log("Contains {:", responseText.includes("{"));
      console.log("Contains }:", responseText.includes("}"));
      console.log("=== END DEBUG ===");
    }

    // Try to extract JSON from the response with multiple strategies
    let parsedResponse = null;

    // Strategy 1: Look for JSON object
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.log("JSON parse failed for matched content:", jsonMatch[0]);
      }
    }

    // Strategy 2: If no JSON found, try to parse the entire response
    if (!parsedResponse) {
      try {
        parsedResponse = JSON.parse(responseText.trim());
      } catch (parseError) {
        console.log("Full response parse failed:", responseText);
      }
    }

    // Strategy 3: Handle Qwen's think tags and extract JSON from within
    if (!parsedResponse && responseText.includes("<think>")) {
      // Remove think tags and try to find JSON
      const cleanText = responseText
        .replace(/<think>[\s\S]*?<\/think>/g, "")
        .trim();
      const cleanJsonMatch = cleanText.match(/\{[\s\S]*\}/);
      if (cleanJsonMatch) {
        try {
          parsedResponse = JSON.parse(cleanJsonMatch[0]);
        } catch (parseError) {
          console.log(
            "JSON parse failed for cleaned content:",
            cleanJsonMatch[0]
          );
        }
      }
    }

    // Strategy 4: Handle deepseek-r1:1.5b responses with explanations
    if (
      !parsedResponse &&
      (model.includes("deepseek-r1:1.5b") || model.includes("deepseek-r1:7b"))
    ) {
      // Remove all text before the first { and after the last }
      const jsonStart = responseText.indexOf("{");
      const jsonEnd = responseText.lastIndexOf("}") + 1;
      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        const extractedJson = responseText.substring(jsonStart, jsonEnd);
        try {
          parsedResponse = JSON.parse(extractedJson);
        } catch (parseError) {
          console.log(
            "JSON parse failed for extracted content:",
            extractedJson
          );
        }
      }
    }

    // Strategy 5: If still no JSON, create a fallback response
    if (!parsedResponse) {
      console.log("Creating fallback response for model:", model);
      console.log("Response that failed to parse:", responseText);

      // Create a more intelligent fallback based on the command
      const commandLower = command.toLowerCase();
      let co2Increase = 20;
      let toxicityIncrease = 5;
      let tempIncrease = 0.5;
      let humanLoss = 1000000;
      let animalLoss = 5000000;
      let plantLoss = 10000000;
      let pollutionIncrease = 3;

      // Adjust based on command type
      if (
        commandLower.includes("car") ||
        commandLower.includes("drive") ||
        commandLower.includes("transport")
      ) {
        co2Increase = 30;
        toxicityIncrease = 8;
        tempIncrease = 0.8;
        pollutionIncrease = 5;
      } else if (
        commandLower.includes("factory") ||
        commandLower.includes("industry") ||
        commandLower.includes("manufacture")
      ) {
        co2Increase = 50;
        toxicityIncrease = 15;
        tempIncrease = 1.2;
        pollutionIncrease = 10;
      } else if (
        commandLower.includes("deforest") ||
        commandLower.includes("cut") ||
        commandLower.includes("tree")
      ) {
        co2Increase = 40;
        plantLoss = 50000000;
        animalLoss = 10000000;
        pollutionIncrease = 8;
      } else if (
        commandLower.includes("pollute") ||
        commandLower.includes("waste") ||
        commandLower.includes("dump")
      ) {
        toxicityIncrease = 20;
        pollutionIncrease = 15;
        humanLoss = 2000000;
      }

      // For catastrophic events, ensure they have appropriate impact
      if (isCatastrophic) {
        if (catastrophicType === "nuclear") {
          co2Increase = 135;
          toxicityIncrease = 80;
          tempIncrease = -16; // Nuclear winter
          humanLoss = 7650000000; // 85% loss
          animalLoss = 50000000000;
          plantLoss = 300000000000;
          pollutionIncrease = 80;
        } else if (catastrophicType === "meteor") {
          co2Increase = 200;
          toxicityIncrease = 60;
          tempIncrease = 15; // Global warming from impact
          humanLoss = 8100000000; // 90% loss
          animalLoss = 90000000000;
          plantLoss = 800000000000;
          pollutionIncrease = 70;
        } else if (catastrophicType === "volcano") {
          co2Increase = 300;
          toxicityIncrease = 40;
          tempIncrease = -10; // Initial cooling, then warming
          humanLoss = 3600000000; // 40% loss
          animalLoss = 40000000000;
          plantLoss = 200000000000;
          pollutionIncrease = 50;
        } else if (catastrophicType === "moon") {
          co2Increase = 500; // Massive atmospheric disruption
          toxicityIncrease = 95; // Near complete atmospheric poisoning
          tempIncrease = 50; // Global firestorm
          humanLoss = 8991000000; // 99.9% loss - near extinction
          animalLoss = 99900000000; // 99.9% loss
          plantLoss = 999000000000; // 99.9% loss
          pollutionIncrease = 95; // Complete environmental collapse
        } else if (catastrophicType === "god") {
          // God saves the Earth - reset everything to pristine condition
          co2Increase = 415 - currentMetrics.co2Level; // Reset to 415ppm
          toxicityIncrease = 5 - currentMetrics.toxicityLevel; // Reset to 5%
          tempIncrease = 30 - currentMetrics.temperature; // Reset to 30°C
          humanLoss = currentMetrics.humanPopulation - 9000000000; // Restore to 9B
          animalLoss = currentMetrics.animalPopulation - 100000000000; // Restore to 100B
          plantLoss = currentMetrics.plantPopulation - 1000000000000; // Restore to 1T
          pollutionIncrease = 0 - pollutionLevel; // Reset to 0%
        }
      }

      parsedResponse = {
        analysis: `The command "${command}" will have environmental consequences. ${responseText.substring(
          0,
          200
        )}...`,
        metrics: {
          co2Level: Math.min(currentMetrics.co2Level + co2Increase, 2000),
          toxicityLevel: Math.min(
            currentMetrics.toxicityLevel + toxicityIncrease,
            100
          ),
          temperature: Math.min(currentMetrics.temperature + tempIncrease, 50),
          humanPopulation: Math.max(
            currentMetrics.humanPopulation - humanLoss,
            0
          ),
          animalPopulation: Math.max(
            currentMetrics.animalPopulation - animalLoss,
            0
          ),
          plantPopulation: Math.max(
            currentMetrics.plantPopulation - plantLoss,
            0
          ),
          oceanAcidity: Math.max(currentMetrics.oceanAcidity - 0.01, 6.0),
          iceCapMelting: Math.min(currentMetrics.iceCapMelting + 1, 100),
        },
        pollutionLevel: Math.min(pollutionLevel + pollutionIncrease, 100),
        specialEvent: specialEvent,
      };
    }

    // Validate and sanitize the response
    let validatedMetrics = {
      co2Level: Math.max(
        0,
        Math.min(
          parsedResponse.metrics?.co2Level || currentMetrics.co2Level,
          2000
        )
      ),
      toxicityLevel: Math.max(
        0,
        Math.min(
          parsedResponse.metrics?.toxicityLevel || currentMetrics.toxicityLevel,
          100
        )
      ),
      temperature: Math.max(
        -50,
        Math.min(
          parsedResponse.metrics?.temperature || currentMetrics.temperature,
          50
        )
      ),
      humanPopulation: Math.max(
        0,
        parsedResponse.metrics?.humanPopulation ||
          currentMetrics.humanPopulation
      ),
      animalPopulation: Math.max(
        0,
        parsedResponse.metrics?.animalPopulation ||
          currentMetrics.animalPopulation
      ),
      plantPopulation: Math.max(
        0,
        parsedResponse.metrics?.plantPopulation ||
          currentMetrics.plantPopulation
      ),
      oceanAcidity: Math.max(
        6.0,
        Math.min(
          parsedResponse.metrics?.oceanAcidity || currentMetrics.oceanAcidity,
          9.0
        )
      ),
      iceCapMelting: Math.max(
        0,
        Math.min(
          parsedResponse.metrics?.iceCapMelting || currentMetrics.iceCapMelting,
          100
        )
      ),
    };

    // Log any unusual AI responses for debugging
    if (
      isCatastrophic &&
      validatedMetrics.humanPopulation > currentMetrics.humanPopulation
    ) {
      console.log(
        "AI WARNING: Catastrophic event increased human population - this seems incorrect"
      );
      console.log("Event:", catastrophicType);
      console.log(
        "Population change:",
        currentMetrics.humanPopulation,
        "→",
        validatedMetrics.humanPopulation
      );
    }

    const validatedPollutionLevel = Math.max(
      0,
      Math.min(parsedResponse.pollutionLevel || pollutionLevel, 100)
    );

    // Create before/after comparison for the analysis
    const createComparisonText = () => {
      const changes = [];

      if (validatedMetrics.co2Level !== currentMetrics.co2Level) {
        const change = validatedMetrics.co2Level - currentMetrics.co2Level;
        const direction = change > 0 ? "↑" : "↓";
        changes.push(
          `CO₂: ${currentMetrics.co2Level}ppm ${direction} ${validatedMetrics.co2Level}ppm`
        );
      }

      if (validatedMetrics.toxicityLevel !== currentMetrics.toxicityLevel) {
        const change =
          validatedMetrics.toxicityLevel - currentMetrics.toxicityLevel;
        const direction = change > 0 ? "↑" : "↓";
        changes.push(
          `Air Toxicity: ${currentMetrics.toxicityLevel}% ${direction} ${validatedMetrics.toxicityLevel}%`
        );
      }

      if (validatedMetrics.temperature !== currentMetrics.temperature) {
        const change =
          validatedMetrics.temperature - currentMetrics.temperature;
        const direction = change > 0 ? "↑" : "↓";
        changes.push(
          `Temperature: ${currentMetrics.temperature}°C ${direction} ${validatedMetrics.temperature}°C`
        );
      }

      if (validatedMetrics.humanPopulation !== currentMetrics.humanPopulation) {
        const change =
          validatedMetrics.humanPopulation - currentMetrics.humanPopulation;
        const direction = change > 0 ? "↑" : "↓";
        changes.push(
          `Humans: ${currentMetrics.humanPopulation.toLocaleString()} ${direction} ${validatedMetrics.humanPopulation.toLocaleString()}`
        );
      }

      if (
        validatedMetrics.animalPopulation !== currentMetrics.animalPopulation
      ) {
        const change =
          validatedMetrics.animalPopulation - currentMetrics.animalPopulation;
        const direction = change > 0 ? "↑" : "↓";
        changes.push(
          `Animals: ${currentMetrics.animalPopulation.toLocaleString()} ${direction} ${validatedMetrics.animalPopulation.toLocaleString()}`
        );
      }

      if (validatedMetrics.plantPopulation !== currentMetrics.plantPopulation) {
        const change =
          validatedMetrics.plantPopulation - currentMetrics.plantPopulation;
        const direction = change > 0 ? "↑" : "↓";
        changes.push(
          `Plants: ${currentMetrics.plantPopulation.toLocaleString()} ${direction} ${validatedMetrics.plantPopulation.toLocaleString()}`
        );
      }

      if (validatedMetrics.oceanAcidity !== currentMetrics.oceanAcidity) {
        const change =
          validatedMetrics.oceanAcidity - currentMetrics.oceanAcidity;
        const direction = change > 0 ? "↑" : "↓";
        changes.push(
          `Ocean pH: ${currentMetrics.oceanAcidity} ${direction} ${validatedMetrics.oceanAcidity}`
        );
      }

      if (validatedMetrics.iceCapMelting !== currentMetrics.iceCapMelting) {
        const change =
          validatedMetrics.iceCapMelting - currentMetrics.iceCapMelting;
        const direction = change > 0 ? "↑" : "↓";
        changes.push(
          `Ice Melting: ${currentMetrics.iceCapMelting}% ${direction} ${validatedMetrics.iceCapMelting}%`
        );
      }

      if (validatedPollutionLevel !== pollutionLevel) {
        const change = validatedPollutionLevel - pollutionLevel;
        const direction = change > 0 ? "↑" : "↓";
        changes.push(
          `Pollution: ${pollutionLevel}% ${direction} ${validatedPollutionLevel}%`
        );
      }

      return changes.length > 0 ? `\n\n📊 Changes:\n${changes.join("\n")}` : "";
    };

    const comparisonText = createComparisonText();
    const enhancedAnalysis =
      (parsedResponse.analysis ||
        "Environmental impact calculated successfully.") + comparisonText;

    const finalResponse = {
      analysis: enhancedAnalysis,
      metrics: validatedMetrics,
      pollutionLevel: validatedPollutionLevel,
      specialEvent: parsedResponse.specialEvent || specialEvent,
    };

    // Debug logging for final response
    if (
      model.includes("deepseek-r1:1.5b") ||
      model.includes("deepseek-r1:7b")
    ) {
      console.log("=== FINAL RESPONSE DEBUG ===");
      console.log("Model:", model);
      console.log("Final specialEvent:", finalResponse.specialEvent);
      console.log("Parsed specialEvent:", parsedResponse.specialEvent);
      console.log("Original specialEvent:", specialEvent);
      console.log("=== END FINAL DEBUG ===");
    }

    return NextResponse.json(finalResponse);
  } catch (error) {
    console.error("Error processing command:", error);
    return NextResponse.json(
      {
        error: "Failed to process command",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Enhanced fallback scenario creation for when Ollama is unavailable
function createFallbackScenario(command: string, isCatastrophic: boolean, catastrophicType: string) {
  const lowerCommand = command.toLowerCase();
  
  // Create a dynamic scenario based on command analysis
  const baseImpact = {
    co2Change: 0,
    toxicityChange: 0,
    temperatureChange: 0,
    humanPopulationChange: 0,
    animalPopulationChange: 0,
    plantPopulationChange: 0,
    oceanAcidityChange: 0,
    iceCapMeltingChange: 0,
    pollutionChange: 0
  };

  let analysis = `Analyzing the environmental impact of: "${command}"`;
  let category: 'positive' | 'negative' | 'neutral' | 'catastrophic' = 'neutral';

  // Analyze command content for environmental impact
  if (lowerCommand.includes('renewable') || lowerCommand.includes('solar') || lowerCommand.includes('wind') || lowerCommand.includes('clean energy')) {
    category = 'positive';
    Object.assign(baseImpact, {
      co2Change: -30,
      toxicityChange: -10,
      temperatureChange: -0.5,
      humanPopulationChange: 10000000,
      pollutionChange: -15
    });
    analysis = 'Implementing renewable energy sources reduces carbon emissions and improves air quality, benefiting both human health and the environment.';
  } else if (lowerCommand.includes('tree') || lowerCommand.includes('plant') || lowerCommand.includes('forest')) {
    category = 'positive';
    Object.assign(baseImpact, {
      co2Change: -50,
      toxicityChange: -5,
      temperatureChange: -0.3,
      animalPopulationChange: 1000000000,
      plantPopulationChange: 50000000000,
      pollutionChange: -10
    });
    analysis = 'Tree planting and forest restoration act as natural carbon sinks, improve air quality, and provide habitat for wildlife.';
  } else if (lowerCommand.includes('electric') || lowerCommand.includes('ev')) {
    category = 'positive';
    Object.assign(baseImpact, {
      co2Change: -25,
      toxicityChange: -15,
      temperatureChange: -0.4,
      pollutionChange: -12
    });
    analysis = 'Electric vehicles eliminate direct emissions from transportation, significantly reducing urban air pollution and greenhouse gas emissions.';
  } else if (lowerCommand.includes('pollute') || lowerCommand.includes('waste') || lowerCommand.includes('dump')) {
    category = 'negative';
    Object.assign(baseImpact, {
      co2Change: 40,
      toxicityChange: 20,
      temperatureChange: 1.0,
      humanPopulationChange: -5000000,
      animalPopulationChange: -100000000,
      pollutionChange: 25
    });
    analysis = 'Pollution and waste disposal have severe negative impacts on air and water quality, harming human health and ecosystems.';
  } else if (lowerCommand.includes('factory') || lowerCommand.includes('industry')) {
    category = 'negative';
    Object.assign(baseImpact, {
      co2Change: 60,
      toxicityChange: 25,
      temperatureChange: 1.5,
      humanPopulationChange: -10000000,
      pollutionChange: 30
    });
    analysis = 'Industrial activities release significant amounts of greenhouse gases and pollutants, contributing to climate change and air quality degradation.';
  } else if (lowerCommand.includes('deforest') || lowerCommand.includes('cut') || lowerCommand.includes('destroy')) {
    category = 'negative';
    Object.assign(baseImpact, {
      co2Change: 80,
      toxicityChange: 10,
      temperatureChange: 1.2,
      animalPopulationChange: -2000000000,
      plantPopulationChange: -100000000000,
      pollutionChange: 20
    });
    analysis = 'Deforestation releases stored carbon, destroys critical wildlife habitats, and eliminates natural carbon sinks, accelerating climate change.';
  } else if (isCatastrophic) {
    category = 'catastrophic';
    if (catastrophicType === 'nuclear') {
      Object.assign(baseImpact, {
        co2Change: 200,
        toxicityChange: 80,
        temperatureChange: -15,
        humanPopulationChange: -7650000000,
        animalPopulationChange: -50000000000,
        plantPopulationChange: -300000000000,
        pollutionChange: 85
      });
      analysis = 'Nuclear war would cause immediate mass casualties and long-term environmental devastation through radiation and nuclear winter.';
    } else if (catastrophicType === 'meteor') {
      Object.assign(baseImpact, {
        co2Change: 300,
        toxicityChange: 70,
        temperatureChange: 20,
        humanPopulationChange: -8100000000,
        animalPopulationChange: -90000000000,
        plantPopulationChange: -800000000000,
        pollutionChange: 80
      });
      analysis = 'A large meteor impact would cause massive destruction, global firestorms, and long-term climate disruption.';
    } else if (catastrophicType === 'moon') {
      Object.assign(baseImpact, {
        co2Change: 500,
        toxicityChange: 95,
        temperatureChange: 50,
        humanPopulationChange: -8991000000,
        animalPopulationChange: -99900000000,
        plantPopulationChange: -999000000000,
        pollutionChange: 95
      });
      analysis = 'A moon collision would be an extinction-level event, vaporizing oceans and making Earth uninhabitable.';
    }
  } else {
    // Default neutral impact for unrecognized commands
    Object.assign(baseImpact, {
      co2Change: 10,
      toxicityChange: 2,
      temperatureChange: 0.1,
      pollutionChange: 3
    });
    analysis = `The environmental impact of "${command}" has been calculated based on general environmental principles.`;
  }

  return {
    id: 'fallback-scenario',
    name: 'Dynamic Environmental Impact',
    description: `Environmental impact analysis for: ${command}`,
    category,
    keywords: [],
    impact: baseImpact,
    specialEvent: isCatastrophic ? catastrophicType : undefined,
    analysis,
    duration: 'immediate' as const,
    region: ['global']
  };
}
