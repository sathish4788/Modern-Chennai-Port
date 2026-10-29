export type GameStage =
  | 'intro'
  | 'level1_factory'
  | 'level2_railway'
  | 'level3_port'
  | 'level4_ship_journey'
  | 'level5_return_ship'
  | 'level6_godown_delivery'
  | 'celebration';

export interface RoundConfig {
  totalBoxes: number;
  lorryCapacity: number; // 50
  trainCompartmentCapacity: number; // 25
  containerCapacity: number; // 100
  containerCostCoins: number; // 100
  importBoxes: number; // e.g. 150
}

export interface PlayerScore {
  coins: number;
  stars: number;
  questionsAnswered: number;
  firstTryCorrect: number;
  missionsCompleted: number;
  coinsSpent: number;
}

export interface LevelQuestion {
  prompt: string;
  options: number[];
  correctAnswer: number;
  explanationHint: string;
  mathFormula: string;
}
