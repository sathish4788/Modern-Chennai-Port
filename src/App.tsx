import React, { useState } from 'react';
import { GameStage, PlayerScore, RoundConfig } from './types/game';
import { QuizScore } from './data/portQuizQuestions';
import { createRoundConfig } from './utils/mathEngine';
import { sound } from './utils/soundEngine';

import { ScoreHeader } from './components/ScoreHeader';
import { JourneyMap } from './components/JourneyMap';
import { OfflineIndicator } from './components/OfflineIndicator';
import { MainMenu } from './components/MainMenu';

// Level 1 Scenes
import { IntroScene } from './components/scenes/IntroScene';
import { Level1Factory } from './components/scenes/Level1Factory';
import { Level2Railway } from './components/scenes/Level2Railway';
import { Level3Port } from './components/scenes/Level3Port';
import { Level4ShipJourney } from './components/scenes/Level4ShipJourney';
import { Level5ReturnShip } from './components/scenes/Level5ReturnShip';
import { Level6GodownDelivery } from './components/scenes/Level6GodownDelivery';
import { CelebrationModal } from './components/scenes/CelebrationModal';

// Level 2 Scenes
import { Level2Quiz } from './components/Level2Quiz';
import { Level2CompletionCeremony } from './components/Level2CompletionCeremony';

type ActiveView = 'main_menu' | 'level1' | 'level2' | 'level2_celebration';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('main_menu');

  // Level 1 States
  const [currentStage, setCurrentStage] = useState<GameStage>('intro');
  const [selectedBoxes, setSelectedBoxes] = useState<number>(200);
  const [roundConfig, setRoundConfig] = useState<RoundConfig>(() => createRoundConfig(200));
  const [level1Completed, setLevel1Completed] = useState<boolean>(() => {
    return typeof window !== 'undefined' && localStorage.getItem('chennai_port_l1_done') === 'true';
  });

  // Level 2 States
  const [level2Unlocked, setLevel2Unlocked] = useState<boolean>(() => {
    return typeof window !== 'undefined' && localStorage.getItem('chennai_port_l2_unlocked') === 'true';
  });
  const [level2Completed, setLevel2Completed] = useState<boolean>(() => {
    return typeof window !== 'undefined' && localStorage.getItem('chennai_port_l2_done') === 'true';
  });
  const [quizScore, setQuizScore] = useState<QuizScore>({
    score: 0,
    answeredQuestions: {},
    currentQuestionIndex: 0,
    unlockedBadges: [],
  });

  // Audio toggles
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicMuted, setIsMusicMuted] = useState(false);

  // Player scoring & wallet for Level 1
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

  const handleStartLevel1 = () => {
    sound.playClick();
    setCurrentStage('intro');
    setActiveView('level1');
  };

  const handleStartLevel2 = () => {
    sound.playClick();
    setActiveView('level2');
  };

  const handleToggleUnlockLevel2 = () => {
    sound.playCoinSound();
    setLevel2Unlocked(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('chennai_port_l2_unlocked', 'true');
    }
  };

  const handleGoToDashboard = () => {
    sound.playClick();
    setActiveView('main_menu');
  };

  const handleStartJourney = (boxes: number) => {
    const newConfig = createRoundConfig(boxes);
    setRoundConfig(newConfig);
    setCurrentStage('level1_factory');
  };

  const handleRestartRound = () => {
    setCurrentStage('intro');
  };

  // Level 1 stage completion handlers
  const handleLevel1Complete = (coinsEarned: number, starsEarned: number) => {
    setScore((prev) => ({
      ...prev,
      coins: prev.coins + coinsEarned,
      stars: prev.stars + starsEarned,
      questionsAnswered: prev.questionsAnswered + 1,
    }));
    setCurrentStage('level2_railway');
  };

  const handleLevel2RailComplete = (coinsEarned: number, starsEarned: number) => {
    setScore((prev) => ({
      ...prev,
      coins: prev.coins + coinsEarned,
      stars: prev.stars + starsEarned,
      questionsAnswered: prev.questionsAnswered + 1,
    }));
    setCurrentStage('level3_port');
  };

  const handleLevel3PortComplete = (coinsCost: number, coinsEarned: number, starsEarned: number) => {
    setScore((prev) => ({
      ...prev,
      coins: prev.coins - coinsCost + coinsEarned,
      coinsSpent: prev.coinsSpent + coinsCost,
      stars: prev.stars + starsEarned,
      questionsAnswered: prev.questionsAnswered + 1,
    }));
    setCurrentStage('level4_ship_journey');
  };

  const handleLevel4ShipComplete = (bonusCoins: number, starsEarned: number) => {
    setScore((prev) => ({
      ...prev,
      coins: prev.coins + bonusCoins,
      stars: prev.stars + starsEarned,
    }));
    setCurrentStage('level5_return_ship');
  };

  const handleLevel5ShipComplete = (bonusCoins: number, starsEarned: number) => {
    setScore((prev) => ({
      ...prev,
      coins: prev.coins + bonusCoins,
      stars: prev.stars + starsEarned,
      questionsAnswered: prev.questionsAnswered + 1,
    }));
    setCurrentStage('level6_godown_delivery');
  };

  const handleLevel6DeliveryComplete = (bonusCoins: number, starsEarned: number) => {
    setScore((prev) => ({
      ...prev,
      coins: prev.coins + bonusCoins,
      stars: prev.stars + starsEarned,
      missionsCompleted: prev.missionsCompleted + 1,
    }));
    setLevel1Completed(true);
    setLevel2Unlocked(true); // Unlock Level 2 upon completing Level 1!
    if (typeof window !== 'undefined') {
      localStorage.setItem('chennai_port_l1_done', 'true');
      localStorage.setItem('chennai_port_l2_unlocked', 'true');
    }
    setCurrentStage('celebration');
  };

  // Level 2 Completion handlers
  const handleLevel2AllComplete = () => {
    setLevel2Completed(true);
    setActiveView('level2_celebration');
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

  // Calculate Level 2 first-try count
  const firstTryCount = Object.values(quizScore.answeredQuestions).filter(
    (q) => q.correctOnFirstTry
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Nunito',sans-serif]">
      {/* Dynamic Top Fixed Score & Controls Bar */}
      <ScoreHeader
        activeView={activeView}
        score={score}
        currentStage={currentStage}
        totalBoxes={roundConfig.totalBoxes}
        currentCapacityText={getCapacityText()}
        quizScore={quizScore.score}
        badgesCount={quizScore.unlockedBadges.length}
        isMuted={isMuted}
        isMusicMuted={isMusicMuted}
        onToggleSound={handleToggleSound}
        onToggleMusic={handleToggleMusic}
        onRestartRound={handleRestartRound}
        onGoToDashboard={handleGoToDashboard}
      />

      {/* When in Level 1, show the 10-Milestone Journey Progress Map */}
      {activeView === 'level1' && <JourneyMap currentStage={currentStage} />}

      {/* Main View Router */}
      <main className="flex-1 py-4 sm:py-6">
        {/* MAIN DASHBOARD */}
        {activeView === 'main_menu' && (
          <MainMenu
            level1Completed={level1Completed}
            level2Unlocked={level2Unlocked}
            level2Completed={level2Completed}
            quizScore={quizScore}
            level1Stars={score.stars}
            level1Coins={score.coins}
            onSelectLevel1={handleStartLevel1}
            onSelectLevel2={handleStartLevel2}
            onToggleUnlockLevel2={handleToggleUnlockLevel2}
          />
        )}

        {/* LEVEL 1: LOGISTICS MANAGER */}
        {activeView === 'level1' && (
          <>
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
                onComplete={handleLevel2RailComplete}
              />
            )}

            {currentStage === 'level3_port' && (
              <Level3Port
                config={roundConfig}
                playerScore={score}
                onComplete={handleLevel3PortComplete}
              />
            )}

            {currentStage === 'level4_ship_journey' && (
              <Level4ShipJourney
                config={roundConfig}
                onComplete={handleLevel4ShipComplete}
              />
            )}

            {currentStage === 'level5_return_ship' && (
              <Level5ReturnShip
                config={roundConfig}
                onComplete={handleLevel5ShipComplete}
              />
            )}

            {currentStage === 'level6_godown_delivery' && (
              <Level6GodownDelivery
                config={roundConfig}
                onComplete={handleLevel6DeliveryComplete}
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
                onProceedToLevel2={() => {
                  sound.playClick();
                  setActiveView('level2');
                }}
                onGoToDashboard={() => {
                  sound.playClick();
                  setActiveView('main_menu');
                }}
              />
            )}
          </>
        )}

        {/* LEVEL 2: JUNIOR PORT CAPTAIN (30 QUIZ QUESTIONS & 6 MISSIONS) */}
        {activeView === 'level2' && (
          <Level2Quiz
            quizScore={quizScore}
            onUpdateScore={(newScore) => setQuizScore(newScore)}
            onCompleteAll={handleLevel2AllComplete}
            onExitToMenu={handleGoToDashboard}
          />
        )}

        {/* LEVEL 2 COMPLETION CEREMONY & CERTIFICATE */}
        {activeView === 'level2_celebration' && (
          <Level2CompletionCeremony
            score={quizScore.score}
            firstTryCount={firstTryCount}
            onReturnToMenu={handleGoToDashboard}
            onReplayLevel2={() => {
              setQuizScore({
                score: 0,
                answeredQuestions: {},
                currentQuestionIndex: 0,
                unlockedBadges: [],
              });
              setActiveView('level2');
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
            Modern Chennai Port · Class 3A Project · Sishya School
          </p>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>Level 1: Logistics Manager</span>
            <span>·</span>
            <span>Level 2: Junior Port Captain</span>
            <span>·</span>
            <span className="text-amber-400 font-bold">100% Offline Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
