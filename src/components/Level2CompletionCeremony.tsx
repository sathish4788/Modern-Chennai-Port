import React, { useState, useEffect } from 'react';
import { Award, Trophy, Printer, RotateCcw, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { sound } from '../utils/soundEngine';
import confetti from 'canvas-confetti';
import { BADGE_DEFINITIONS } from '../data/portQuizQuestions';

interface Level2CompletionCeremonyProps {
  score: number; // out of 30
  firstTryCount: number;
  onReturnToMenu: () => void;
  onReplayLevel2: () => void;
}

export const Level2CompletionCeremony: React.FC<Level2CompletionCeremonyProps> = ({
  score,
  firstTryCount,
  onReturnToMenu,
  onReplayLevel2,
}) => {
  const [playerName, setPlayerName] = useState('Junior Port Captain');
  const [isEditingName, setIsEditingName] = useState(false);
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  useEffect(() => {
    sound.playSuccessFanfare();
    const count = 250;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 30, startVelocity: 60 });
    fire(0.2, { spread: 70 });
    fire(0.35, { spread: 110, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 130, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 130, startVelocity: 50 });
  }, []);

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Top Grand Fanfare Banner */}
      <div className="text-center bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 p-6 sm:p-8 rounded-3xl text-slate-950 shadow-2xl relative overflow-hidden">
        <div className="inline-flex p-3.5 rounded-full bg-slate-950 text-amber-400 mb-3 shadow-xl animate-bounce">
          <Trophy className="w-12 h-12" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white drop-shadow">
          JUNIOR PORT CAPTAIN CEREMONY
        </h2>
        <p className="mt-1 text-lg sm:text-xl font-extrabold text-amber-300 font-heading">
          All 30 Educational Port Challenges Successfully Completed!
        </p>
      </div>

      {/* Captain Buddy Speech Card */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-slate-800/90 backdrop-blur-md border-2 border-cyan-400/50 rounded-3xl p-5 shadow-xl">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-1 flex items-center justify-center flex-shrink-0 shadow-lg">
          <span className="text-4xl">👨‍✈️</span>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-black uppercase tracking-wider text-cyan-300">
              Captain Buddy says:
            </span>
          </div>
          <p className="text-white text-base sm:text-lg font-bold leading-relaxed">
            "Congratulations! You have explored the port, learned how ships work, solved port mathematics, protected the environment and understood important safety rules. You are officially a Junior Port Captain!"
          </p>
        </div>
      </div>

      {/* 6 Achievement Badges Showcase */}
      <div className="bg-slate-900/90 rounded-3xl p-6 border-2 border-slate-700 shadow-xl">
        <h3 className="text-center text-sm font-black uppercase tracking-wider text-amber-400 mb-4 flex items-center justify-center gap-2">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>All 6 Achievement Badges Earned</span>
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {BADGE_DEFINITIONS.map((badge) => (
            <div
              key={badge.id}
              className="p-3.5 rounded-2xl bg-slate-800/80 border-2 border-emerald-400/50 text-center flex flex-col items-center justify-center gap-1 shadow-md hover:scale-105 transition"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-2xl shadow-inner mb-1">
                {badge.icon}
              </div>
              <span className="text-[11px] font-black text-white font-heading leading-tight">
                {badge.title}
              </span>
              <span className="text-[9px] font-bold text-emerald-300 uppercase">
                UNLOCKED ✓
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Official Printable Certificate */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 border-4 border-cyan-400/80 shadow-2xl relative print:m-0 print:border-4 print:border-cyan-600 print:text-black print:bg-white">
        <div className="border-2 border-dashed border-cyan-400/40 rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
          {/* Certificate Header */}
          <div className="flex items-center justify-center gap-2 mb-2 text-cyan-400">
            <Award className="w-8 h-8" />
            <span className="text-xs font-black uppercase tracking-widest text-cyan-300">
              MODERN CHENNAI MINI PORT · CHENNAI PORT AUTHORITY
            </span>
            <Award className="w-8 h-8" />
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-white font-heading mt-2">
            JUNIOR PORT CAPTAIN CERTIFICATE
          </h3>
          <p className="text-xs sm:text-sm text-cyan-200 font-semibold mt-1">
            Awarded for successfully completing all 30 educational challenges.
          </p>

          <p className="text-xs text-slate-400 mt-4 uppercase tracking-wider font-bold">
            THIS CERTIFIES THAT
          </p>

          {/* Player Name (Click to Edit) */}
          <div className="my-2">
            {isEditingName ? (
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                className="text-2xl sm:text-4xl font-black text-amber-300 bg-slate-800 border-b-2 border-amber-400 px-4 py-1 rounded text-center font-heading focus:outline-none"
                autoFocus
              />
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

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mt-2">
            has demonstrated exceptional mastery across maritime navigation, port science, container mathematics, green sustainable technologies, and coastal safety protocols.
          </p>

          {/* 6 Completed Categories Pills */}
          <div className="my-6 flex flex-wrap items-center justify-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
              1. Know Your Port
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
              2. Science at the Port
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
              3. Port Maths
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
              4. Green & Sustainable Port
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
              5. Safety & General Awareness
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
              6. Junior Port Captain
            </span>
          </div>

          {/* Score & Date Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left">
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">
                Quiz Score
              </span>
              <span className="text-xl font-black text-amber-400 font-heading">
                {score} / 30 Points
              </span>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">
                First-Try Mastery
              </span>
              <span className="text-xl font-black text-emerald-400 font-heading">
                {firstTryCount} / 30
              </span>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">
                Date of Completion
              </span>
              <span className="text-xs font-bold text-slate-200 mt-1 block">
                {currentDate}
              </span>
            </div>
          </div>

          {/* Tribute to Sishya School Class 3A project */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
            Inspired by the Modern Chennai Mini Port Model project by{' '}
            <strong className="text-slate-200">
              Hanvith · Darshika · Mahir · Mithvansh · Shambhiga
            </strong>{' '}
            (Sishya School Class 3A)
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 cursor-pointer transition"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Print or Save Certificate</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onReplayLevel2();
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 cursor-pointer transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay Level 2</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onReturnToMenu();
              }}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-sm shadow-xl font-heading cursor-pointer active:scale-95 transition"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>RETURN TO MAIN DASHBOARD</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
