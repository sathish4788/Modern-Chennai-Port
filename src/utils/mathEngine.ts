import { RoundConfig, LevelQuestion } from '../types/game';

export const ROUND_PRESETS: number[] = [200, 300, 100, 400];

export function createRoundConfig(totalBoxes: number = 200): RoundConfig {
  return {
    totalBoxes,
    lorryCapacity: 50,
    trainCompartmentCapacity: 25,
    containerCapacity: 100,
    containerCostCoins: 100,
    importBoxes: 150, // Import cargo distinct from export cargo
  };
}

// Generate 4 plausible distinct options including the correct answer
function generateFourOptions(correct: number, step: number = 1, min: number = 1): number[] {
  const optionsSet = new Set<number>([correct]);
  
  const potentialOffsets = [-2 * step, -1 * step, 1 * step, 2 * step, 3 * step];
  // Shuffle potential offsets
  for (let i = potentialOffsets.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [potentialOffsets[i], potentialOffsets[j]] = [potentialOffsets[j], potentialOffsets[i]];
  }

  for (const offset of potentialOffsets) {
    const val = correct + offset;
    if (val >= min && !optionsSet.has(val)) {
      optionsSet.add(val);
      if (optionsSet.size === 4) break;
    }
  }

  // Fallback if needed
  let fallbackVal = min;
  while (optionsSet.size < 4) {
    if (!optionsSet.has(fallbackVal)) {
      optionsSet.add(fallbackVal);
    }
    fallbackVal += step;
  }

  const arr = Array.from(optionsSet);
  // Shuffle options
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getLevel1Question(config: RoundConfig): LevelQuestion {
  const correct = config.totalBoxes / config.lorryCapacity;
  return {
    prompt: `We have ${config.totalBoxes} cargo boxes ready at Chennai Factory. Each lorry can carry ${config.lorryCapacity} boxes. How many lorries do we need?`,
    options: generateFourOptions(correct, 1, 1),
    correctAnswer: correct,
    explanationHint: `Think of your 10 times table or 5 times table! If 1 lorry carries 50 boxes, 2 lorries carry 100 boxes. How many 50s make ${config.totalBoxes}? (${config.totalBoxes} ÷ 50 = ?)`,
    mathFormula: `${config.totalBoxes} boxes ÷ ${config.lorryCapacity} boxes/lorry = ${correct} lorries`,
  };
}

export function getLevel2Question(config: RoundConfig): LevelQuestion {
  const correct = config.totalBoxes / config.trainCompartmentCapacity;
  return {
    prompt: `All ${config.totalBoxes} boxes arrived at Chennai Harbour Station. Each train compartment can carry ${config.trainCompartmentCapacity} boxes. How many compartments do we need?`,
    options: generateFourOptions(correct, 2, 2),
    correctAnswer: correct,
    explanationHint: `Count by 25s using your 5 times table! 25, 50, 75, 100... That's 4 compartments for 100 boxes. For ${config.totalBoxes} boxes, we need double that! (${config.totalBoxes} ÷ 25 = ?)`,
    mathFormula: `${config.totalBoxes} boxes ÷ ${config.trainCompartmentCapacity} boxes/compartment = ${correct} compartments`,
  };
}

export function getLevel3Question(config: RoundConfig): LevelQuestion {
  const correct = config.totalBoxes / config.containerCapacity;
  return {
    prompt: `Our ocean container ship is waiting at Chennai Port! Each shipping container holds ${config.containerCapacity} boxes. How many shipping containers do we need?`,
    options: generateFourOptions(correct, 1, 1),
    correctAnswer: correct,
    explanationHint: `Divide by 100! Remove two zeros from ${config.totalBoxes}, or think: how many hundreds are in ${config.totalBoxes}? (${config.totalBoxes} ÷ 100 = ?)`,
    mathFormula: `${config.totalBoxes} boxes ÷ ${config.containerCapacity} boxes/container = ${correct} containers`,
  };
}

export function getLevel5Question(importBoxes: number): LevelQuestion {
  // E.g. 150 boxes arriving, each port truck carries 50 boxes
  const truckCap = 50;
  const correct = importBoxes / truckCap;
  return {
    prompt: `The return ship docked at Chennai Port with ${importBoxes} imported boxes! Each container truck carries ${truckCap} boxes to the godown. How many trucks do we need?`,
    options: generateFourOptions(correct, 1, 1),
    correctAnswer: correct,
    explanationHint: `Let's count by 50s: 50, 100, ${importBoxes}! How many 50s make ${importBoxes}? (${importBoxes} ÷ 50 = ?)`,
    mathFormula: `${importBoxes} boxes ÷ ${truckCap} boxes/truck = ${correct} trucks`,
  };
}
