import React, { useState } from 'react';
import { Anchor, Check, ArrowRight, Lightbulb, Truck, ShieldCheck } from 'lucide-react';
import { CharacterGuide } from '../CharacterGuide';
import { RoundConfig } from '../../types/game';
import { getLevel5Question } from '../../utils/mathEngine';
import { sound } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Level5ReturnShipProps {
  config: RoundConfig;
  onComplete: (bonusCoins: number, starsEarned: number) => void;
}

export const Level5ReturnShip: React.FC<Level5ReturnShipProps> = ({ config, onComplete }) => {
  const [question] = useState(() => getLevel5Question(config.importBoxes));
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  // Unloading animation state
  const totalTrucksNeeded = config.importBoxes / 50;
  const [unloadedBoxes, setUnloadedBoxes] = useState(0);
  const [animationFinished, setAnimationFinished] = useState(false);

  const handleSelectOption = (val: number) => {
    if (isCorrect) return;
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

      startUnloadingSequence();
    } else {
      setIsAnswered(true);
      setIsCorrect(false);
      setAttemptCount((prev) => prev + 1);
      setShowHint(true);
      sound.playHintSound();
    }
  };

  const startUnloadingSequence = () => {
    sound.playShipHorn();
    let current = 0;
    const interval = setInterval(() => {
      current += 25;
      sound.playBoxLoad();
      setUnloadedBoxes(Math.min(current, config.importBoxes));

      if (current >= config.importBoxes) {
        clearInterval(interval);
        setTimeout(() => {
          sound.playTruckStart();
          setAnimationFinished(true);
        }, 500);
      }
    }, 180);
  };

  const handleProceed = () => {
    sound.playClick();
    const stars = attemptCount === 0 ? 3 : 2;
    const coins = 70;
    onComplete(coins, stars);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Level Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-teal-700 via-cyan-700 to-blue-800 rounded-3xl p-4 sm:p-6 text-white shadow-xl">
        <div>
          <span className="text-xs font-black uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full">
            LEVEL 5: THE RETURN SHIP ARRIVES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2 font-heading">
            Import Cargo Receiving Dock
          </h2>
          <p className="text-sm font-semibold text-teal-100">
            Chennai Home Port · Unloading Incoming International Goods
          </p>
        </div>

        {/* Live Badges */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900/60 backdrop-blur px-4 py-2 rounded-2xl border border-white/20 text-center">
            <div className="text-[10px] uppercase font-bold text-teal-300">Imported Boxes</div>
            <div className="text-2xl font-black">{config.importBoxes}</div>
          </div>
          <div className="bg-slate-900/60 backdrop-blur px-4 py-2 rounded-2xl border border-white/20 text-center">
            <div className="text-[10px] uppercase font-bold text-teal-300">Truck Capacity</div>
            <div className="text-2xl font-black">50 Boxes</div>
          </div>
        </div>
      </div>

      {/* Manager Raj Guide Dialogue */}
      <CharacterGuide
        message={
          isCorrect
            ? 'Great news! The return vessel has docked safely. Our harbour cranes are transferring the imported cargo containers directly onto container trucks ready for the godown!'
            : attemptCount > 0
            ? "Good try! We have 150 imported boxes arriving. Each port truck can carry 50 boxes. Let's count by 50s: 50, 100, 150! How many trucks is that?"
            : question.prompt
        }
        mood={isCorrect ? 'celebrating' : attemptCount > 0 ? 'thinking' : 'explaining'}
        hint={question.explanationHint}
        showHint={showHint}
        onToggleHint={() => setShowHint(!showHint)}
      />

      {/* Dock Unloading Scene */}
      <div className="bg-slate-800/90 rounded-3xl p-6 border-2 border-slate-700 shadow-2xl relative overflow-hidden">
        {/* Dock Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-6">
          <div className="flex items-center gap-2">
            <Anchor className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-300">
              Chennai Port Import Terminal Berth #2 · Incoming Vessel: M.V. PEARL BAY
            </span>
          </div>

          <div className="text-xs font-bold text-teal-300 flex items-center gap-1">
            <Lightbulb className="w-4 h-4" />
            <span>Math: {config.importBoxes} Import Boxes ÷ 50 = {totalTrucksNeeded} Trucks</span>
          </div>
        </div>

        {/* Visual Graphic: Docking ship & cranes transferring onto trucks */}
        <div className="relative mb-6 rounded-2xl bg-gradient-to-b from-sky-950 via-slate-900 to-slate-950 p-4 border border-slate-700/80 overflow-hidden">
          <svg viewBox="0 0 600 200" className="w-full h-52 sm:h-60">
            {/* Water and dock */}
            <rect y="110" width="600" height="90" fill="#0369a1" />
            <rect x="0" y="140" width="280" height="60" fill="#334155" />
            <rect x="0" y="140" width="280" height="6" fill="#facc15" />

            {/* Arriving Return Ship */}
            <path d="M 270 120 L 310 175 L 590 175 L 600 120 Z" fill="#0284c7" />
            <rect x="290" y="115" width="290" height="8" rx="2" fill="#ffffff" />
            <text x="440" y="155" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle">
              M.V. PEARL BAY (IMPORT)
            </text>

            {/* Gantry crane unloading */}
            <path d="M 120 140 L 150 20 L 170 20 L 200 140" stroke="#f59e0b" strokeWidth="7" fill="none" />
            <line x1="60" y1="20" x2="420" y2="20" stroke="#f59e0b" strokeWidth="8" />

            {/* Waiting Delivery Trucks on Dock */}
            {Array.from({ length: totalTrucksNeeded }).map((_, idx) => (
              <g key={idx} transform={`translate(${15 + idx * 85}, 105)`}>
                <rect width="50" height="24" rx="3" fill="#059669" stroke="#047857" strokeWidth="1.5" />
                <rect x="50" y="6" width="20" height="18" rx="2" fill="#2563eb" />
                <circle cx="15" cy="25" r="5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
                <circle cx="38" cy="25" r="5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
                <circle cx="60" cy="25" r="5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
                <text x="25" y="16" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                  TRUCK {idx + 1}
                </text>
              </g>
            ))}
          </svg>

          {/* Unload counter */}
          <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur px-4 py-2 rounded-2xl border border-cyan-400/40 text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Import Unloading Progress
            </span>
            <span className="text-xl font-black text-cyan-300">
              {unloadedBoxes} / {config.importBoxes} Boxes
            </span>
          </div>
        </div>

        {/* Question Choices */}
        {!isCorrect ? (
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-teal-400/30">
            <h3 className="text-lg sm:text-xl font-black text-white text-center mb-2 font-heading">
              {question.prompt}
            </h3>
            <p className="text-center text-xs text-teal-300 font-bold mb-6">
              Pick the correct number of trucks for the {config.importBoxes} incoming boxes:
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
                  <Truck className="w-5 h-5 text-teal-400 mb-1" />
                  <span>{opt}</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Trucks
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Return Shipment Arrived Banner */
          <div className="bg-gradient-to-r from-teal-950/90 via-emerald-950/90 to-slate-900 border-2 border-teal-400 rounded-2xl p-6 text-center animate-in fade-in">
            <div className="inline-flex p-3 rounded-full bg-teal-400 text-slate-950 mb-3 shadow-lg">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
              RETURN SHIPMENT ARRIVED!
            </h3>
            <p className="text-teal-200 text-sm sm:text-base font-bold mt-1">
              {question.mathFormula}
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-black my-2">
              <ShieldCheck className="w-4 h-4 text-teal-300" />
              <span>New Badge Unlocked: International Cargo Master</span>
            </div>
            <p className="text-xs text-teal-300 mt-1">
              Reward: +70 Cargo Coins · +{attemptCount === 0 ? '3' : '2'} Stars!
            </p>

            {animationFinished && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleProceed}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-lg hover:scale-105 active:scale-95 transition shadow-xl font-heading cursor-pointer"
                >
                  <span>DELIVER GOODS TO GODOWN</span>
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
