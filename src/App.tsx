import React, { useState } from 'react';
import { GameStage, PlayerScore, RoundConfig } from './types/game';
import { createRoundConfig } from './utils/mathEngine';
import { sound } from './utils/soundEngine';

import { ScoreHeader } from './components/ScoreHeader';
import { JourneyMap } from './components/JourneyMap';
import { OfflineIndicator } from './components/OfflineIndicator';

import { IntroScene } from './components/scenes/IntroScene';
import { Level1Factory } from './components/scenes/Level1Factory';
import { Level2Railway } from './components/scenes/Level2Railway';
import { Level3Port } from './components/scenes/Level3Port';
import { Level4ShipJourney } from './components/scenes/Level4ShipJourney';
import { Level5ReturnShip } from './components/scenes/Level5ReturnShip';
import { Level6GodownDelivery } from './components/scenes/Level6GodownDelivery';
import { CelebrationModal } from './components/scenes/CelebrationModal';

export default function App() {
  const [currentStage, setCurrentStage] = useState<GameStage>('intro');
  const [selectedBoxes, setSelectedBoxes] = useState<number>(200);
  const [roundConfig, setRoundConfig] = useState<RoundConfig>(() => createRoundConfig(200));

  // Audio toggles
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicMuted, setIsMusicMuted] = useState(false);

  // Player scoring & wallet
  const [score, setScore] = useState<PlayerScore>({
    coins: 500, // Starting cargo wallet
    stars: 0,
    questionsAnswered: 0,
    firstTryCorrect: 0,
    missionsCompleted: 0,
    coinsSpent: 0,
  });

  const handleToggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    sound.setSoundEnabled(!nextState);
  };

  const handleToggleMusic = () => {
    const nextState = !isMusicMuted;
    setIsMusicMuted(nextState);
    sound.setMusicEnabled(!nextState);
  };

  const handleStartJourney = (boxes: number) => {
    const newConfig = createRoundConfig(boxes);
    setRoundConfig(newConfig);
    setCurrentStage('level1_factory');
  };

  const handleRestartRound = () => {
    setCurrentStage('intro');
  };

  // Stage completion handlers
  const handleLevel1Complete = (coinsEarned: number, starsEarned: number) => {
    setScore((prev) => ({
      ...prev,
      coins: prev.coins + coinsEarned,
      stars: prev.stars + starsEarned,
      questionsAnswered: prev.questionsAnswered + 1,
    }));
    setCurrentStage('level2_railway');
  };

  const handleLevel2Complete = (coinsEarned: number, starsEarned: number) => {
    setScore((prev) => ({
      ...prev,
      coins: prev.coins + coinsEarned,
      stars: prev.stars + starsEarned,
      questionsAnswered: prev.questionsAnswered + 1,
    }));
    setCurrentStage('level3_port');
  };

  const handleLevel3Complete = (coinsCost: number, coinsEarned: number, starsEarned: number) => {
    setScore((prev) => ({
      ...prev,
      coins: prev.coins - coinsCost + coinsEarned,
      coinsSpent: prev.coinsSpent + coinsCost,
      stars: prev.stars + starsEarned,
      questionsAnswered: prev.questionsAnswered + 1,
    }));
    setCurrentStage('level4_ship_journey');
  };

  const handleLevel4Complete = (bonusCoins: number, starsEarned: number) => {
    setScore((prev) => ({
      ...prev,
      coins: prev.coins + bonusCoins,
      stars: prev.stars + starsEarned,
    }));
    setCurrentStage('level5_return_ship');
  };

  const handleLevel5Complete = (bonusCoins: number, starsEarned: number) => {
    setScore((prev) => ({
      ...prev,
      coins: prev.coins + bonusCoins,
      stars: prev.stars + starsEarned,
      questionsAnswered: prev.questionsAnswered + 1,
    }));
    setCurrentStage('level6_godown_delivery');
  };

  const handleLevel6Complete = (bonusCoins: number, starsEarned: number) => {
    setScore((prev) => ({
      ...prev,
      coins: prev.coins + bonusCoins,
      stars: prev.stars + starsEarned,
      missionsCompleted: prev.missionsCompleted + 1,
    }));
    setCurrentStage('celebration');
  };

  const getCapacityText = (): string => {
    switch (currentStage) {
      case 'level1_factory': return '50 boxes / Lorry';
      case 'level2_railway': return '25 boxes / Train Car';
      case 'level3_port': return '100 boxes / Container';
      case 'level4_ship_journey': return 'Ocean Vessel Transit';
      case 'level5_return_ship': return '50 boxes / Truck';
      case 'level6_godown_delivery': return 'Godown Stacking';
      default: return '50–100 boxes / unit';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Nunito',sans-serif]">
      {/* Top Fixed Score & Controls Bar */}
      <ScoreHeader
        score={score}
        currentStage={currentStage}
        totalBoxes={roundConfig.totalBoxes}
        currentCapacityText={getCapacityText()}
        isMuted={isMuted}
        isMusicMuted={isMusicMuted}
        onToggleSound={handleToggleSound}
        onToggleMusic={handleToggleMusic}
        onRestartRound={handleRestartRound}
      />

      {/* 10-Milestone Journey Progress Map */}
      <JourneyMap currentStage={currentStage} />

      {/* Main Game Screen Router */}
      <main className="flex-1 py-4 sm:py-6">
        {currentStage === 'intro' && (
          <IntroScene
            onStartJourney={handleStartJourney}
            selectedBoxes={selectedBoxes}
            setSelectedBoxes={setSelectedBoxes}
          />
        )}

        {currentStage === 'level1_factory' && (
          <Level1Factory
            config={roundConfig}
            onComplete={handleLevel1Complete}
          />
        )}

        {currentStage === 'level2_railway' && (
          <Level2Railway
            config={roundConfig}
            onComplete={handleLevel2Complete}
          />
        )}

        {currentStage === 'level3_port' && (
          <Level3Port
            config={roundConfig}
            playerScore={score}
            onComplete={handleLevel3Complete}
          />
        )}

        {currentStage === 'level4_ship_journey' && (
          <Level4ShipJourney
            config={roundConfig}
            onComplete={handleLevel4Complete}
          />
        )}

        {currentStage === 'level5_return_ship' && (
          <Level5ReturnShip
            config={roundConfig}
            onComplete={handleLevel5Complete}
          />
        )}

        {currentStage === 'level6_godown_delivery' && (
          <Level6GodownDelivery
            config={roundConfig}
            onComplete={handleLevel6Complete}
          />
        )}

        {currentStage === 'celebration' && (
          <CelebrationModal
            score={score}
            config={roundConfig}
            onPlayAgain={() => {
              sound.playClick();
              setCurrentStage('intro');
            }}
          />
        )}
      </main>

      {/* Offline Status Toast */}
      <OfflineIndicator />

      {/* Footer */}
      <footer className="bg-slate-900/90 border-t border-slate-800/80 py-3 px-4 text-center text-xs text-slate-400 print:hidden">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-semibold">
            Modern Chennai Port · Porter Game – The Great Cargo Adventure
          </p>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>PWA Enabled</span>
            <span>·</span>
            <span>Multiplication & Division Math</span>
            <span>·</span>
            <span className="text-amber-400 font-bold">100% Offline Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
