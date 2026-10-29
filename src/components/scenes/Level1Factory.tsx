import React, { useState, useEffect } from 'react';
import { Truck, Check, ArrowRight, Lightbulb } from 'lucide-react';
import { CharacterGuide } from '../CharacterGuide';
import { RoundConfig } from '../../types/game';
import { getLevel1Question } from '../../utils/mathEngine';
import { sound } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Level1FactoryProps {
  config: RoundConfig;
  onComplete: (coinsEarned: number, starsEarned: number) => void;
}

export const Level1Factory: React.FC<Level1FactoryProps> = ({ config, onComplete }) => {
  const [question] = useState(() => getLevel1Question(config));
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  // Loading animation state
  const [activeLorryIndex, setActiveLorryIndex] = useState<number>(0);
  const [loadedCountPerLorry, setLoadedCountPerLorry] = useState<number[]>([]);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [headlightsOn, setHeadlightsOn] = useState(false);

  const totalLorriesNeeded = config.totalBoxes / config.lorryCapacity;

  useEffect(() => {
    // Initialize loaded counts to 0 for each lorry
    setLoadedCountPerLorry(new Array(totalLorriesNeeded).fill(0));
  }, [totalLorriesNeeded]);

  const handleSelectOption = (val: number) => {
    if (isCorrect) return; // Prevent clicking after success
    sound.playClick();
    setSelectedAnswer(val);

    if (val === question.correctAnswer) {
      setIsCorrect(true);
      setIsAnswered(true);
      sound.playSuccessFanfare();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });

      // Start cargo loading sequence
      startLoadingSequence();
    } else {
      setIsAnswered(true);
      setIsCorrect(false);
      setAttemptCount((prev) => prev + 1);
      setShowHint(true);
      sound.playHintSound();
    }
  };

  const startLoadingSequence = () => {
    let currentLorry = 0;
    let boxesInCurrent = 0;

    const interval = setInterval(() => {
      boxesInCurrent += 10;
      sound.playBoxLoad();

      setLoadedCountPerLorry((prev) => {
        const next = [...prev];
        next[currentLorry] = Math.min(boxesInCurrent, config.lorryCapacity);
        return next;
      });

      if (boxesInCurrent >= config.lorryCapacity) {
        currentLorry++;
        boxesInCurrent = 0;
        setActiveLorryIndex(currentLorry);

        if (currentLorry >= totalLorriesNeeded) {
          clearInterval(interval);
          // Sound the truck engines & flash headlights
          setTimeout(() => {
            sound.playTruckStart();
            setHeadlightsOn(true);
          }, 300);

          setTimeout(() => {
            setAnimationFinished(true);
          }, 1200);
        }
      }
    }, 120);
  };

  const handleProceed = () => {
    sound.playClick();
    const stars = attemptCount === 0 ? 3 : 2;
    const coins = 60;
    onComplete(coins, stars);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Level Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500 rounded-3xl p-4 sm:p-6 text-white shadow-xl">
        <div>
          <span className="text-xs font-black uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full">
            LEVEL 1: FACTORY TO LORRY
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2 font-heading">
            Factory Warehouse Loading Bay
          </h2>
          <p className="text-sm font-semibold text-amber-100">
            Chennai Industrial Export Zone · Math Focus: 10 & 5 Times Tables
          </p>
        </div>

        {/* Live Info Badges */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900/60 backdrop-blur px-4 py-2 rounded-2xl border border-white/20 text-center">
            <div className="text-[10px] uppercase font-bold text-amber-300">Total Boxes Ready</div>
            <div className="text-2xl font-black">{config.totalBoxes}</div>
          </div>
          <div className="bg-slate-900/60 backdrop-blur px-4 py-2 rounded-2xl border border-white/20 text-center">
            <div className="text-[10px] uppercase font-bold text-amber-300">Each Lorry Holds</div>
            <div className="text-2xl font-black">{config.lorryCapacity}</div>
          </div>
        </div>
      </div>

      {/* Manager Raj Guide Dialogue */}
      <CharacterGuide
        message={
          isCorrect
            ? 'Brilliant! You got it right! Watch the forklift and workers load 50 boxes into each lorry, then get ready to start the convoy!'
            : attemptCount > 0
            ? "Good try! Let's think about how many boxes one lorry can carry. Can you work it out using your 10 times table?"
            : `We have ${config.totalBoxes} boxes ready for delivery. Each lorry can carry ${config.lorryCapacity} boxes. How many lorries do we need?`
        }
        mood={isCorrect ? 'celebrating' : attemptCount > 0 ? 'thinking' : 'explaining'}
        hint={question.explanationHint}
        showHint={showHint}
        onToggleHint={() => setShowHint(!showHint)}
      />

      {/* Factory Warehouse Interactive View */}
      <div className="bg-slate-800/90 rounded-3xl p-6 border-2 border-slate-700 shadow-2xl relative overflow-hidden">
        {/* Factory Background Canvas */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-300">
              Chennai Factory Pallet Bay #4
            </span>
          </div>

          <div className="text-xs font-bold text-amber-400 flex items-center gap-1">
            <Lightbulb className="w-4 h-4" />
            <span>Formula: Total Boxes ÷ Lorry Capacity = Lorries Needed</span>
          </div>
        </div>

        {/* Lorry Loading Dock Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: totalLorriesNeeded }).map((_, idx) => {
            const loaded = loadedCountPerLorry[idx] || 0;
            const isFull = loaded >= config.lorryCapacity;
            const isCurrentlyLoading = activeLorryIndex === idx && !isFull && isCorrect;

            return (
              <div
                key={idx}
                className={`relative rounded-2xl p-4 border-2 transition-all ${
                  isFull
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/10'
                    : isCurrentlyLoading
                    ? 'bg-amber-950/40 border-amber-400 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-700'
                }`}
              >
                {/* Lorry Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-xs text-slate-300 flex items-center gap-1.5">
                    <Truck className={`w-4 h-4 ${isFull ? 'text-emerald-400' : 'text-amber-400'}`} />
                    Lorry #{idx + 1}
                  </span>
                  <span
                    className={`text-xs font-black px-2 py-0.5 rounded-full ${
                      isFull
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {loaded} / {config.lorryCapacity}
                  </span>
                </div>

                {/* Cartoon SVG Lorry Visual */}
                <div className="h-28 bg-slate-950/80 rounded-xl p-2 relative flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 160 80" className="w-full h-full">
                    {/* Headlights beam */}
                    {headlightsOn && (
                      <polygon points="135,42 160,30 160,54" fill="#fef08a" opacity="0.6" />
                    )}

                    {/* Cargo Container bed */}
                    <rect x="10" y="20" width="85" height="40" rx="4" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
                    {/* Inner boxes visualization */}
                    {Array.from({ length: Math.floor(loaded / 10) }).map((_, bIdx) => (
                      <rect
                        key={bIdx}
                        x={14 + (bIdx % 5) * 15}
                        y={24 + Math.floor(bIdx / 5) * 16}
                        width="12"
                        height="13"
                        rx="2"
                        fill="#fef08a"
                        stroke="#b45309"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Lorry Cabin */}
                    <path d="M98 32 L115 32 L130 45 L130 60 L98 60 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
                    {/* Windshield */}
                    <path d="M103 36 L113 36 L124 45 L103 45 Z" fill="#bae6fd" />
                    {/* Front Bumper */}
                    <rect x="130" y="52" width="6" height="8" rx="2" fill="#64748b" />
                    {/* Headlight */}
                    <circle cx="132" cy="46" r="3" fill={headlightsOn ? '#facc15' : '#e2e8f0'} />

                    {/* Wheels */}
                    <circle cx="30" cy="62" r="9" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                    <circle cx="30" cy="62" r="3" fill="#ffffff" />
                    <circle cx="75" cy="62" r="9" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                    <circle cx="75" cy="62" r="3" fill="#ffffff" />
                    <circle cx="118" cy="62" r="9" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                    <circle cx="118" cy="62" r="3" fill="#ffffff" />
                  </svg>
                </div>

                {/* Progress bar */}
                <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isFull ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                    style={{ width: `${(loaded / config.lorryCapacity) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Maths Question & 4 Choice Options */}
        {!isCorrect ? (
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-amber-400/30">
            <h3 className="text-lg sm:text-xl font-black text-white text-center mb-2 font-heading">
              {question.prompt}
            </h3>
            <p className="text-center text-xs text-amber-300 font-bold mb-6">
              Pick the correct number of lorries to load all {config.totalBoxes} factory boxes:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {question.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-5 rounded-2xl border-2 font-black text-2xl transition-all cursor-pointer font-heading flex flex-col items-center justify-center gap-1 ${
                    selectedAnswer === opt && opt !== question.correctAnswer
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-shake'
                      : 'bg-slate-800 border-slate-700 hover:border-amber-400 hover:bg-slate-700/80 text-white hover:scale-105'
                  }`}
                >
                  <span>{opt}</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Lorries
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Task 1 Complete Banner */
          <div className="bg-gradient-to-r from-emerald-900/90 to-teal-900/90 border-2 border-emerald-400 rounded-2xl p-6 text-center animate-in fade-in">
            <div className="inline-flex p-3 rounded-full bg-emerald-500 text-slate-950 mb-3 shadow-lg">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
              TASK 1 COMPLETE – FACTORY CARGO LOADED!
            </h3>
            <p className="text-emerald-200 text-sm sm:text-base font-bold mt-1">
              {question.mathFormula}
            </p>
            <p className="text-xs text-emerald-300 mt-1">
              Reward: +60 Cargo Coins · +{attemptCount === 0 ? '3' : '2'} Stars!
            </p>

            {animationFinished && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleProceed}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-lg hover:scale-105 active:scale-95 transition shadow-xl font-heading cursor-pointer"
                >
                  <span>PROCEED TO RAILWAY STATION</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
