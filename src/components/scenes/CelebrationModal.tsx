import React, { useState, useEffect } from 'react';
import { Award, Star, Coins, RotateCcw, Printer, CheckCircle2, Trophy, ArrowRight, LayoutDashboard, Sparkles, Unlock } from 'lucide-react';
import { CharacterGuide } from '../CharacterGuide';
import { PlayerScore, RoundConfig } from '../../types/game';
import { sound } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface CelebrationModalProps {
  score: PlayerScore;
  config: RoundConfig;
  onPlayAgain: () => void;
  onProceedToLevel2: () => void;
  onGoToDashboard: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  score,
  config,
  onPlayAgain,
  onProceedToLevel2,
  onGoToDashboard,
}) => {
  const [playerName, setPlayerName] = useState('Cargo Champion');
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    sound.playSuccessFanfare();
    // Confetti blast
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  const totalLorries = config.totalBoxes / config.lorryCapacity;
  const totalTrainCars = config.totalBoxes / config.trainCompartmentCapacity;
  const totalContainers = config.totalBoxes / config.containerCapacity;
  const totalBoxesCombined = config.totalBoxes + config.importBoxes;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Hero Header */}
      <div className="text-center bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 p-6 sm:p-8 rounded-3xl text-slate-950 shadow-2xl relative overflow-hidden">
        <div className="inline-flex p-3 rounded-full bg-slate-950 text-amber-400 mb-3 shadow-xl animate-bounce">
          <Trophy className="w-10 h-10" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">
          LOGISTICS SUPERSTAR!
        </h2>
        <p className="mt-1 text-lg sm:text-xl font-extrabold text-slate-900 font-heading">
          Cargo Champion of Modern Chennai Port
        </p>
      </div>

      {/* Manager Raj Speech */}
      <CharacterGuide
        message="Well done, Cargo Champion! You used your maths skills to move goods by road, rail, and sea. You delivered the export shipment and safely brought new goods back to the godown. You are now a true Logistics Superstar!"
        mood="celebrating"
      />

      {/* Printable / Displayable Official Certificate */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 border-4 border-amber-400/80 shadow-2xl relative print:m-0 print:border-4 print:border-amber-600 print:text-black print:bg-white">
        {/* Certificate Watermark / Frame */}
        <div className="border-2 border-dashed border-amber-400/40 rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
          {/* Top Seal */}
          <div className="flex items-center justify-center gap-2 mb-2 text-amber-400">
            <Award className="w-8 h-8" />
            <span className="text-xs font-black uppercase tracking-widest text-amber-300">
              Chennai Port Authority · Certificate of Logistics Excellence
            </span>
            <Award className="w-8 h-8" />
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-white font-heading mt-2">
            LOGISTICS SUPERSTAR – CARGO CHAMPION!
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
            This certifies that
          </p>

          {/* Child's Name (Editable!) */}
          <div className="my-3">
            {isEditingName ? (
              <div className="inline-flex items-center gap-2">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                  className="text-2xl sm:text-3xl font-black text-amber-300 bg-slate-800 border-b-2 border-amber-400 px-3 py-1 rounded text-center font-heading focus:outline-none"
                  autoFocus
                />
              </div>
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                title="Click to edit name on certificate"
                className="text-2xl sm:text-4xl font-black text-amber-300 underline decoration-amber-400/50 hover:decoration-amber-300 underline-offset-8 font-heading cursor-pointer"
              >
                {playerName} ✏️
              </button>
            )}
          </div>

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            has mastered multiplication, division, grouping, and cargo management across road, rail, and maritime transportation at Modern Chennai Port.
          </p>

          {/* Logistics Journey Cycle Ribbon */}
          <div className="my-6 p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] font-bold text-amber-300 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span>Factory</span>
            <span>➔</span>
            <span>Lorry</span>
            <span>➔</span>
            <span>Railway Station</span>
            <span>➔</span>
            <span>Freight Train</span>
            <span>➔</span>
            <span>Container Yard</span>
            <span>➔</span>
            <span>Ship</span>
            <span>➔</span>
            <span>International Port</span>
            <span>➔</span>
            <span>Return Ship</span>
            <span>➔</span>
            <span>Godown</span>
          </div>

          {/* Final Scorecard Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">
                Total Boxes Handled
              </span>
              <span className="text-lg font-black text-cyan-300">
                {totalBoxesCombined} Boxes
              </span>
            </div>

            <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">
                Lorries Dispatched
              </span>
              <span className="text-lg font-black text-orange-400">
                {totalLorries} Lorries
              </span>
            </div>

            <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">
                Train Cars Used
              </span>
              <span className="text-lg font-black text-teal-400">
                {totalTrainCars} Wagons
              </span>
            </div>

            <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">
                Shipping Containers
              </span>
              <span className="text-lg font-black text-blue-400">
                {totalContainers} TEUs
              </span>
            </div>

            <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700">
              <span className="text-[10px] text-slate-400 font-bold block uppercase flex items-center gap-1">
                <Coins className="w-3 h-3 text-amber-400" />
                <span>Cargo Coins Spent</span>
              </span>
              <span className="text-lg font-black text-rose-300">
                {score.coinsSpent} Coins
              </span>
            </div>

            <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700">
              <span className="text-[10px] text-slate-400 font-bold block uppercase flex items-center gap-1">
                <Coins className="w-3 h-3 text-amber-400" />
                <span>Wallet Balance</span>
              </span>
              <span className="text-lg font-black text-amber-400">
                {score.coins} Coins
              </span>
            </div>

            <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700">
              <span className="text-[10px] text-slate-400 font-bold block uppercase flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span>Stars Earned</span>
              </span>
              <span className="text-lg font-black text-yellow-300">
                {score.stars} Stars
              </span>
            </div>

            <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700">
              <span className="text-[10px] text-slate-400 font-bold block uppercase flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Math Accuracy</span>
              </span>
              <span className="text-lg font-black text-emerald-400">
                100% Complete
              </span>
            </div>
          </div>
        </div>

        {/* Level 2 Unlocked Callout Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-teal-900/80 to-blue-950/80 border-2 border-cyan-400 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden shadow-xl animate-in zoom-in-95">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center flex-shrink-0 text-2xl">
              <Unlock className="w-6 h-6 text-cyan-300 animate-bounce" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1 justify-center sm:justify-start">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Achievement: Level 2 Unlocked!
              </span>
              <h4 className="text-lg font-black text-white font-heading">
                Ready to become a Junior Port Captain?
              </h4>
              <p className="text-xs text-slate-300">
                Explore science, port maths, green energy, safety and Captain Buddy's 30 challenges!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playSuccessFanfare();
              onProceedToLevel2();
            }}
            className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-black text-base shadow-xl font-heading cursor-pointer active:scale-95 transition"
          >
            <span>START LEVEL 2: JUNIOR PORT CAPTAIN</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Actions & Replay Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 cursor-pointer transition"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Print or Save Certificate</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onGoToDashboard();
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 cursor-pointer transition"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              <span>Main Dashboard</span>
            </button>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onPlayAgain();
            }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl font-heading cursor-pointer active:scale-95 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>REPLAY LEVEL 1 MISSION</span>
          </button>
        </div>
      </div>
    </div>
  );
};

