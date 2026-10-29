import React, { useState, useEffect } from 'react';
import { Train, Check, ArrowRight, Lightbulb, Clock } from 'lucide-react';
import { CharacterGuide } from '../CharacterGuide';
import { RoundConfig } from '../../types/game';
import { getLevel2Question } from '../../utils/mathEngine';
import { sound } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Level2RailwayProps {
  config: RoundConfig;
  onComplete: (coinsEarned: number, starsEarned: number) => void;
}

export const Level2Railway: React.FC<Level2RailwayProps> = ({ config, onComplete }) => {
  const [question] = useState(() => getLevel2Question(config));
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  // Train animation state
  const totalCompartmentsNeeded = config.totalBoxes / config.trainCompartmentCapacity;
  const [loadedCountPerCompartment, setLoadedCountPerCompartment] = useState<number[]>([]);
  const [activeCarIdx, setActiveCarIdx] = useState<number>(0);
  const [isDeparting, setIsDeparting] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    setLoadedCountPerCompartment(new Array(totalCompartmentsNeeded).fill(0));
  }, [totalCompartmentsNeeded]);

  const handleSelectOption = (val: number) => {
    if (isCorrect) return;
    sound.playClick();
    setSelectedAnswer(val);

    if (val === question.correctAnswer) {
      setIsCorrect(true);
      setIsAnswered(true);
      sound.playSuccessFanfare();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });

      startTrainLoadingSequence();
    } else {
      setIsAnswered(true);
      setIsCorrect(false);
      setAttemptCount((prev) => prev + 1);
      setShowHint(true);
      sound.playHintSound();
    }
  };

  const startTrainLoadingSequence = () => {
    let currentCar = 0;
    let boxesInCurrent = 0;

    const interval = setInterval(() => {
      boxesInCurrent += 5;
      sound.playBoxLoad();

      setLoadedCountPerCompartment((prev) => {
        const next = [...prev];
        next[currentCar] = Math.min(boxesInCurrent, config.trainCompartmentCapacity);
        return next;
      });

      if (boxesInCurrent >= config.trainCompartmentCapacity) {
        currentCar++;
        boxesInCurrent = 0;
        setActiveCarIdx(currentCar);

        if (currentCar >= totalCompartmentsNeeded) {
          clearInterval(interval);

          // Train departure sequence
          setTimeout(() => {
            sound.playTrainWhistle();
            setIsDeparting(true);
          }, 400);

          setTimeout(() => {
            setAnimationFinished(true);
          }, 1800);
        }
      }
    }, 100);
  };

  const handleProceed = () => {
    sound.playClick();
    const stars = attemptCount === 0 ? 3 : 2;
    const coins = 75;
    onComplete(coins, stars);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Level Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 rounded-3xl p-4 sm:p-6 text-white shadow-xl">
        <div>
          <span className="text-xs font-black uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full">
            LEVEL 2: LORRY TO RAILWAY STATION & TRAIN
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2 font-heading">
            Chennai Central Freight Terminal
          </h2>
          <p className="text-sm font-semibold text-emerald-100">
            Railway Goods Yard · Math Focus: 5 Times Table & Division by 25
          </p>
        </div>

        {/* Live Badges */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900/60 backdrop-blur px-4 py-2 rounded-2xl border border-white/20 text-center">
            <div className="text-[10px] uppercase font-bold text-teal-300">Total Arrived Boxes</div>
            <div className="text-2xl font-black">{config.totalBoxes}</div>
          </div>
          <div className="bg-slate-900/60 backdrop-blur px-4 py-2 rounded-2xl border border-white/20 text-center">
            <div className="text-[10px] uppercase font-bold text-teal-300">Each Compartment Holds</div>
            <div className="text-2xl font-black">{config.trainCompartmentCapacity}</div>
          </div>
        </div>
      </div>

      {/* Manager Raj Guide Dialogue */}
      <CharacterGuide
        message={
          isCorrect
            ? 'Super work, Cargo Champion! The conveyor belts are rolling and boxes are loading into each freight compartment. Listen to that train whistle!'
            : attemptCount > 0
            ? "Good try! Remember, each train compartment holds 25 boxes. Let's count by 25s: 25, 50, 75, 100... How many do we need for all our boxes?"
            : `We have ${config.totalBoxes} boxes at the railway station. Each train compartment can carry ${config.trainCompartmentCapacity} boxes. How many compartments do we need?`
        }
        mood={isCorrect ? 'celebrating' : attemptCount > 0 ? 'thinking' : 'explaining'}
        hint={question.explanationHint}
        showHint={showHint}
        onToggleHint={() => setShowHint(!showHint)}
      />

      {/* Railway Platform View */}
      <div className="bg-slate-800/90 rounded-3xl p-6 border-2 border-slate-700 shadow-2xl relative overflow-hidden">
        {/* Station Ambience Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 text-slate-300 text-xs font-bold border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Platform 1 · Express Cargo Express #12601</span>
            </div>
            <span className="text-xs text-emerald-400 font-bold hidden sm:inline">
              Chennai → Chennai International Port Line
            </span>
          </div>

          <div className="text-xs font-bold text-cyan-300 flex items-center gap-1">
            <Lightbulb className="w-4 h-4" />
            <span>Formula: Total Boxes ÷ Compartment Capacity = Compartments Needed</span>
          </div>
        </div>

        {/* Train Locomotive & Wagons Visualizer */}
        <div className="relative mb-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 overflow-x-auto no-scrollbar">
          {/* Animated Puff of Steam */}
          {isDeparting && (
            <div className="absolute top-2 left-16 text-3xl animate-bounce">
              💨
            </div>
          )}

          <div
            className={`flex items-end gap-2 transition-transform duration-1000 ${
              isDeparting ? 'translate-x-12' : ''
            }`}
          >
            {/* Locomotive Engine */}
            <div className="flex-shrink-0 w-36 h-28 bg-gradient-to-t from-slate-900 via-blue-900 to-blue-700 rounded-t-2xl rounded-br-lg p-2 relative border-2 border-blue-500 shadow-lg">
              <div className="text-[10px] font-black text-amber-400 tracking-wider">
                WAG-9 CHENNAI
              </div>
              <div className="w-8 h-6 bg-cyan-200/90 rounded-md border border-cyan-400 mt-1" />
              {/* Headlight */}
              <div className="absolute bottom-6 right-2 w-4 h-4 rounded-full bg-amber-300 shadow-[0_0_12px_#facc15] animate-pulse" />
              {/* Wheels */}
              <div className="absolute -bottom-3 left-2 right-2 flex justify-between">
                <div className="w-5 h-5 rounded-full bg-slate-600 border-2 border-slate-400" />
                <div className="w-5 h-5 rounded-full bg-slate-600 border-2 border-slate-400" />
                <div className="w-5 h-5 rounded-full bg-slate-600 border-2 border-slate-400" />
              </div>
            </div>

            {/* Freight Compartments */}
            {Array.from({ length: totalCompartmentsNeeded }).map((_, idx) => {
              const loaded = loadedCountPerCompartment[idx] || 0;
              const isFull = loaded >= config.trainCompartmentCapacity;
              const isCurrentlyLoading = activeCarIdx === idx && !isFull && isCorrect;

              return (
                <div
                  key={idx}
                  className={`flex-shrink-0 w-28 h-24 rounded-t-xl p-2 relative border-2 transition-all ${
                    isFull
                      ? 'bg-emerald-900/60 border-emerald-400'
                      : isCurrentlyLoading
                      ? 'bg-amber-900/60 border-amber-400 scale-105'
                      : 'bg-slate-900 border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-black text-slate-300">
                    <span>Car #{idx + 1}</span>
                    <span className={isFull ? 'text-emerald-300' : 'text-amber-400'}>
                      {loaded}/{config.trainCompartmentCapacity}
                    </span>
                  </div>

                  {/* Inside Boxes Graphic */}
                  <div className="mt-1 grid grid-cols-5 gap-0.5">
                    {Array.from({ length: Math.floor(loaded / 5) }).map((_, bIdx) => (
                      <div
                        key={bIdx}
                        className="h-3 rounded-xs bg-amber-400 border border-amber-600 shadow-xs"
                      />
                    ))}
                  </div>

                  {/* Wagon Coupler & Wheels */}
                  <div className="absolute -bottom-2 left-2 right-2 flex justify-between">
                    <div className="w-4 h-4 rounded-full bg-slate-600 border border-slate-400" />
                    <div className="w-4 h-4 rounded-full bg-slate-600 border border-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Railway Tracks SVG */}
          <div className="mt-4 w-full h-4 relative">
            <div className="absolute top-1 left-0 right-0 h-1 bg-slate-600" />
            <div className="absolute top-2 left-0 right-0 h-1 bg-slate-600" />
            <div className="flex justify-between">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="w-1.5 h-3 bg-amber-900/90 rounded-xs" />
              ))}
            </div>
          </div>
        </div>

        {/* Maths Question & 4 Choice Options */}
        {!isCorrect ? (
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-teal-400/30">
            <h3 className="text-lg sm:text-xl font-black text-white text-center mb-2 font-heading">
              {question.prompt}
            </h3>
            <p className="text-center text-xs text-teal-300 font-bold mb-6">
              Pick the correct number of train compartments:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {question.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-5 rounded-2xl border-2 font-black text-2xl transition-all cursor-pointer font-heading flex flex-col items-center justify-center gap-1 ${
                    selectedAnswer === opt && opt !== question.correctAnswer
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-shake'
                      : 'bg-slate-800 border-slate-700 hover:border-teal-400 hover:bg-slate-700/80 text-white hover:scale-105'
                  }`}
                >
                  <Train className="w-5 h-5 text-teal-400 mb-1" />
                  <span>{opt}</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Compartments
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Task 2 Complete Banner */
          <div className="bg-gradient-to-r from-emerald-900/90 to-teal-900/90 border-2 border-emerald-400 rounded-2xl p-6 text-center animate-in fade-in">
            <div className="inline-flex p-3 rounded-full bg-emerald-500 text-slate-950 mb-3 shadow-lg">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
              TASK 2 COMPLETE – TRAIN SUCCESSFULLY LOADED!
            </h3>
            <p className="text-emerald-200 text-sm sm:text-base font-bold mt-1">
              {question.mathFormula}
            </p>
            <p className="text-xs text-emerald-300 mt-1">
              Reward: +75 Cargo Coins · +{attemptCount === 0 ? '3' : '2'} Stars!
            </p>

            {animationFinished && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleProceed}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-black text-lg hover:scale-105 active:scale-95 transition shadow-xl font-heading cursor-pointer"
                >
                  <span>PROCEED TO CONTAINER YARD</span>
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
