import React, { useState } from 'react';
import { Ship, Check, ArrowRight, Lightbulb, Coins, FileText, CheckCircle2 } from 'lucide-react';
import { CharacterGuide } from '../CharacterGuide';
import { RoundConfig, PlayerScore } from '../../types/game';
import { getLevel3Question } from '../../utils/mathEngine';
import { sound } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Level3PortProps {
  config: RoundConfig;
  playerScore: PlayerScore;
  onComplete: (coinsCost: number, coinsEarned: number, starsEarned: number) => void;
}

export const Level3Port: React.FC<Level3PortProps> = ({ config, playerScore, onComplete }) => {
  const [question] = useState(() => getLevel3Question(config));
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  // Payment & crane animation state
  const totalContainersNeeded = config.totalBoxes / config.containerCapacity;
  const totalCost = totalContainersNeeded * config.containerCostCoins;

  const [paymentDone, setPaymentDone] = useState(false);
  const [craneProgress, setCraneProgress] = useState(0); // 0 to 100%
  const [loadedContainers, setLoadedContainers] = useState<number[]>([]);
  const [activeContainerIdx, setActiveContainerIdx] = useState(0);
  const [animationFinished, setAnimationFinished] = useState(false);

  const containerColors = ['#2563eb', '#f97316', '#059669', '#eab308'];

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
    } else {
      setIsAnswered(true);
      setIsCorrect(false);
      setAttemptCount((prev) => prev + 1);
      setShowHint(true);
      sound.playHintSound();
    }
  };

  const handlePayAndLoad = () => {
    sound.playCoinSound();
    setPaymentDone(true);
    setLoadedContainers(new Array(totalContainersNeeded).fill(0));

    // Crane lifting and container packing sequence
    let currentContainer = 0;
    let boxFill = 0;

    const interval = setInterval(() => {
      boxFill += 25;
      sound.playBoxLoad();

      setLoadedContainers((prev) => {
        const next = [...prev];
        next[currentContainer] = Math.min(boxFill, config.containerCapacity);
        return next;
      });

      setCraneProgress((prev) => Math.min(prev + 12, 100));

      if (boxFill >= config.containerCapacity) {
        currentContainer++;
        boxFill = 0;
        setActiveContainerIdx(currentContainer);

        if (currentContainer >= totalContainersNeeded) {
          clearInterval(interval);
          setTimeout(() => {
            sound.playShipHorn();
            setAnimationFinished(true);
          }, 600);
        }
      }
    }, 200);
  };

  const handleProceed = () => {
    sound.playClick();
    const stars = attemptCount === 0 ? 3 : 2;
    const bonusCoins = 100;
    onComplete(totalCost, bonusCoins, stars);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Level Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 rounded-3xl p-4 sm:p-6 text-white shadow-xl">
        <div>
          <span className="text-xs font-black uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full">
            LEVEL 3: CONTAINER YARD TO OCEAN VESSEL
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2 font-heading">
            Chennai International Port Terminal
          </h2>
          <p className="text-sm font-semibold text-blue-100">
            Gantry Crane Bay · Math Focus: Division by 100 & Freight Payment
          </p>
        </div>

        {/* Live Badges */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900/60 backdrop-blur px-4 py-2 rounded-2xl border border-white/20 text-center">
            <div className="text-[10px] uppercase font-bold text-cyan-300">Total Boxes Arrived</div>
            <div className="text-2xl font-black">{config.totalBoxes}</div>
          </div>
          <div className="bg-slate-900/60 backdrop-blur px-4 py-2 rounded-2xl border border-white/20 text-center">
            <div className="text-[10px] uppercase font-bold text-cyan-300">Container Capacity</div>
            <div className="text-2xl font-black">{config.containerCapacity}</div>
          </div>
        </div>
      </div>

      {/* Manager Raj Guide Dialogue */}
      <CharacterGuide
        message={
          paymentDone
            ? 'Watch our giant Chennai Port gantry crane lift the heavy containers onto the ship! Every container is locked and secured!'
            : isCorrect
            ? `Fantastic calculation! ${totalContainersNeeded} shipping containers are needed. Review the freight fee and click PAY AND LOAD!`
            : attemptCount > 0
            ? "Good try! Remember, 1 shipping container holds 100 boxes. Divide the total boxes by 100 by dropping two zeros!"
            : `Our ship is ready to sail! Each shipping container holds ${config.containerCapacity} boxes. How many containers does our company need to ship all these goods?`
        }
        mood={paymentDone || isCorrect ? 'celebrating' : attemptCount > 0 ? 'thinking' : 'explaining'}
        hint={question.explanationHint}
        showHint={showHint}
        onToggleHint={() => setShowHint(!showHint)}
      />

      {/* Port Container Terminal Visual Area */}
      <div className="bg-slate-800/90 rounded-3xl p-6 border-2 border-slate-700 shadow-2xl relative overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-300">
              Chennai Port Quay Berth #1 · Vessel: M.V. CHENNAI STAR
            </span>
          </div>

          <div className="text-xs font-bold text-amber-300 flex items-center gap-1">
            <Lightbulb className="w-4 h-4" />
            <span>Math: {config.totalBoxes} ÷ 100 = {totalContainersNeeded} Containers</span>
          </div>
        </div>

        {/* Port Terminal Scene: Gantry Crane & Ship */}
        <div className="relative mb-6 rounded-2xl bg-gradient-to-b from-sky-900/40 via-slate-900 to-slate-950 p-4 border border-slate-700/80 overflow-hidden">
          <svg viewBox="0 0 600 220" className="w-full h-56 sm:h-64">
            {/* Distant Sea */}
            <rect y="140" width="600" height="80" fill="#0369a1" />
            <path d="M 0 150 Q 150 145 300 150 T 600 150 L 600 220 L 0 220 Z" fill="#0284c7" opacity="0.4" />

            {/* Pier / Concrete Quay */}
            <rect x="0" y="160" width="300" height="60" fill="#334155" />
            <rect x="0" y="160" width="300" height="6" fill="#facc15" />

            {/* Container Ship Hull on Right */}
            <path d="M 280 145 L 320 195 L 590 195 L 600 145 Z" fill="#dc2626" />
            <rect x="300" y="140" width="280" height="8" rx="2" fill="#ffffff" />
            <text x="440" y="175" fill="#ffffff" fontSize="14" fontWeight="900" textAnchor="middle">
              M.V. CHENNAI STAR
            </text>

            {/* Containers loaded on ship */}
            {paymentDone && (
              <>
                {Array.from({ length: totalContainersNeeded }).map((_, idx) => {
                  const isLoaded = (loadedContainers[idx] || 0) >= config.containerCapacity;
                  if (!isLoaded) return null;
                  return (
                    <g key={idx} transform={`translate(${330 + idx * 75}, 105)`}>
                      <rect
                        width="70"
                        height="35"
                        rx="4"
                        fill={containerColors[idx % containerColors.length]}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <line x1="20" y1="0" x2="20" y2="35" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
                      <line x1="45" y1="0" x2="45" y2="35" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />
                      <text x="35" y="22" fill="#ffffff" fontSize="9" fontWeight="900" textAnchor="middle">
                        100 BOXES
                      </text>
                    </g>
                  );
                })}
              </>
            )}

            {/* Gantry Crane Structure */}
            <path d="M 120 160 L 150 30 L 170 30 L 200 160" stroke="#f59e0b" strokeWidth="8" fill="none" />
            <line x1="60" y1="30" x2="450" y2="30" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" />
            {/* Crane spreader & hoist */}
            <line
              x1={paymentDone ? 200 + (craneProgress * 1.8) : 200}
              y1="35"
              x2={paymentDone ? 200 + (craneProgress * 1.8) : 200}
              y2="90"
              stroke="#334155"
              strokeWidth="3"
            />
            <rect
              x={paymentDone ? 180 + (craneProgress * 1.8) : 180}
              y="90"
              width="40"
              height="8"
              rx="2"
              fill="#1e293b"
            />
          </svg>

          {/* Quay Status Overlay */}
          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-bold text-slate-200">
            Chennai Container Freight Station (CFS)
          </div>
        </div>

        {/* Phase 1: Maths Question */}
        {!isCorrect ? (
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-cyan-400/30">
            <h3 className="text-lg sm:text-xl font-black text-white text-center mb-2 font-heading">
              {question.prompt}
            </h3>
            <p className="text-center text-xs text-cyan-300 font-bold mb-6">
              Pick the correct number of shipping containers:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {question.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-5 rounded-2xl border-2 font-black text-2xl transition-all cursor-pointer font-heading flex flex-col items-center justify-center gap-1 ${
                    selectedAnswer === opt && opt !== question.correctAnswer
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-shake'
                      : 'bg-slate-800 border-slate-700 hover:border-cyan-400 hover:bg-slate-700/80 text-white hover:scale-105'
                  }`}
                >
                  <Ship className="w-5 h-5 text-cyan-400 mb-1" />
                  <span>{opt}</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Containers
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : !paymentDone ? (
          /* Phase 2: Educational Payment Screen */
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 border-2 border-amber-400 text-center animate-in fade-in">
            <div className="inline-flex p-3 rounded-full bg-amber-400 text-slate-950 mb-3 shadow-lg">
              <Coins className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h3 className="text-2xl font-black text-white font-heading">
              Confirm Freight Charges & Loading
            </h3>

            {/* Educational Math Equation */}
            <div className="my-4 max-w-lg mx-auto bg-slate-800/90 p-4 rounded-2xl border border-amber-400/40">
              <div className="text-base sm:text-lg font-black text-amber-300 font-mono">
                {totalContainersNeeded} containers × {config.containerCostCoins} Cargo Coins = {totalCost} Cargo Coins
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Your Wallet Balance: {playerScore.coins} Coins (Balance after payment: {playerScore.coins - totalCost} Coins)
              </p>
            </div>

            <button
              onClick={handlePayAndLoad}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 text-slate-950 font-black text-lg hover:scale-105 active:scale-95 transition shadow-xl font-heading cursor-pointer"
            >
              <Coins className="w-6 h-6 fill-slate-950" />
              <span>PAY {totalCost} COINS AND LOAD CONTAINERS</span>
            </button>
          </div>
        ) : (
          /* Phase 3: Task 3 Complete & Cargo Manifest */
          <div className="bg-gradient-to-r from-emerald-900/90 to-teal-900/90 border-2 border-emerald-400 rounded-2xl p-6 text-center animate-in fade-in">
            <div className="inline-flex p-3 rounded-full bg-emerald-500 text-slate-950 mb-3 shadow-lg">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
              TASK 3 COMPLETE – SHIP READY FOR DEPARTURE!
            </h3>

            {/* Official Cargo Manifest Card */}
            <div className="max-w-md mx-auto my-4 bg-slate-900/90 rounded-2xl p-4 border border-emerald-400/40 text-left text-xs font-semibold text-slate-200 space-y-1.5 shadow-inner">
              <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-slate-700 pb-1.5">
                <FileText className="w-4 h-4" />
                <span>OFFICIAL EXPORT CARGO MANIFEST #MAA-2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Port of Loading:</span>
                <span className="font-bold text-white">Chennai Port (MAA), India</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Export Boxes:</span>
                <span className="font-bold text-emerald-300">{config.totalBoxes} Units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Containers Loaded:</span>
                <span className="font-bold text-emerald-300">{totalContainersNeeded} Standard TEUs (100 boxes/each)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Freight Paid:</span>
                <span className="font-bold text-amber-300">{totalCost} Cargo Coins</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Customs Inspection & Vessel Clearance: GRANTED</span>
              </div>
            </div>

            {animationFinished && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleProceed}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-lg hover:scale-105 active:scale-95 transition shadow-xl font-heading cursor-pointer"
                >
                  <span>SET SAIL – INTERNATIONAL VOYAGE</span>
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
