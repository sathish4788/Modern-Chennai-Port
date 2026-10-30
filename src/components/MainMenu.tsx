import React from 'react';
import {
  Truck,
  Ship,
  Compass,
  Trophy,
  Lock,
  Unlock,
  Play,
  RotateCcw,
  Star,
  Coins,
  CheckCircle2,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { sound } from '../utils/soundEngine';
import { QuizScore } from '../data/portQuizQuestions';

interface MainMenuProps {
  level1Completed: boolean;
  level2Unlocked: boolean;
  level2Completed: boolean;
  quizScore: QuizScore;
  level1Stars: number;
  level1Coins: number;
  onSelectLevel1: () => void;
  onSelectLevel2: () => void;
  onToggleUnlockLevel2: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  level1Completed,
  level2Unlocked,
  level2Completed,
  quizScore,
  level1Stars,
  level1Coins,
  onSelectLevel1,
  onSelectLevel2,
  onToggleUnlockLevel2,
}) => {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-900 p-6 sm:p-10 shadow-2xl border-4 border-slate-700">
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur border border-amber-400/40 text-amber-300 font-bold text-xs uppercase tracking-wider mb-4 shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Interactive Educational Maritime Adventure</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow font-heading">
            Modern Chennai Port
          </h1>
          <p className="mt-2 text-lg sm:text-2xl font-extrabold text-amber-300 font-heading">
            “Count It. Load It. Ship It. Deliver It!”
          </p>

          <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-2xl mx-auto font-medium">
            Learn multiplication, division, port science, clean green energy, and coastal safety across real-world logistics and port management!
          </p>

          {/* Sishya School Class 3A project tribute pill */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/80 border border-cyan-400/30 text-xs text-cyan-200 font-semibold shadow-inner">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>
              Official Project: Sishya School Class 3A · Hanvith, Darshika, Mahir, Mithvansh, Shambhiga
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Level Cards Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEVEL 1 CARD: LOGISTICS MANAGER */}
        <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border-2 border-amber-500/50 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-amber-400 transition-all">
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                LEVEL 1
              </span>

              {level1Completed && (
                <span className="flex items-center gap-1.5 text-xs font-black text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>COMPLETED</span>
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
              LOGISTICS MANAGER
            </h3>
            <p className="text-sm text-amber-200 font-semibold mt-1">
              Transport goods by road, rail and sea.
            </p>

            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              Solve cargo grouping challenges, calculate required lorries, load freight trains, manage shipping containers, and deliver incoming goods to the godown!
            </p>

            {/* Quick stats for Level 1 */}
            <div className="mt-5 grid grid-cols-2 gap-3 text-left">
              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold uppercase flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span>Stars Earned</span>
                </span>
                <span className="text-lg font-black text-yellow-300">
                  {level1Stars} Stars
                </span>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold uppercase flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span>Cargo Wallet</span>
                </span>
                <span className="text-lg font-black text-amber-400">
                  {level1Coins} Coins
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                sound.playClick();
                onSelectLevel1();
              }}
              className="w-full inline-flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 text-slate-950 font-black text-lg shadow-xl font-heading hover:brightness-110 active:scale-[0.98] transition cursor-pointer"
            >
              {level1Completed ? <RotateCcw className="w-5 h-5" /> : <Play className="w-5 h-5 fill-slate-950" />}
              <span>{level1Completed ? 'REPLAY LEVEL 1' : 'START LEVEL 1'}</span>
            </button>
          </div>
        </div>

        {/* LEVEL 2 CARD: JUNIOR PORT CAPTAIN */}
        <div
          className={`bg-slate-900/90 rounded-3xl p-6 sm:p-8 border-2 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all ${
            level2Unlocked
              ? 'border-cyan-500/50 hover:border-cyan-400'
              : 'border-slate-800 opacity-80'
          }`}
        >
          <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                LEVEL 2
              </span>

              {level2Completed ? (
                <span className="flex items-center gap-1.5 text-xs font-black text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>COMPLETED</span>
                </span>
              ) : level2Unlocked ? (
                <span className="flex items-center gap-1.5 text-xs font-black text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                  <Unlock className="w-4 h-4 text-cyan-400" />
                  <span>UNLOCKED</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs font-black text-slate-400 px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
                  <Lock className="w-4 h-4 text-slate-500" />
                  <span>LOCKED (FINISH LEVEL 1)</span>
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
              JUNIOR PORT CAPTAIN
            </h3>
            <p className="text-sm text-cyan-200 font-semibold mt-1">
              Explore the port and complete 30 educational questions.
            </p>

            <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
              Six interactive missions: Know Your Port, Science at the Port, Port Maths, Green & Sustainable Port, Safety & General Awareness, and Captain Buddy's Final Challenge!
            </p>

            {/* Quick stats for Level 2 */}
            <div className="mt-5 grid grid-cols-2 gap-3 text-left">
              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold uppercase flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Quiz Score</span>
                </span>
                <span className="text-lg font-black text-cyan-300 font-heading">
                  {quizScore.score} / 30 Points
                </span>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold uppercase flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Badges Earned</span>
                </span>
                <span className="text-lg font-black text-amber-300">
                  {quizScore.unlockedBadges.length} / 6 Badges
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 space-y-2">
            {level2Unlocked ? (
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectLevel2();
                }}
                className="w-full inline-flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 text-slate-950 font-black text-lg shadow-xl font-heading hover:brightness-110 active:scale-[0.98] transition cursor-pointer"
              >
                {level2Completed ? <RotateCcw className="w-5 h-5" /> : <Play className="w-5 h-5 fill-slate-950" />}
                <span>{level2Completed ? 'REPLAY LEVEL 2' : 'PLAY LEVEL 2: 30 MISSIONS'}</span>
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  disabled
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-800 text-slate-500 font-bold text-base cursor-not-allowed"
                >
                  <Lock className="w-5 h-5" />
                  <span>COMPLETE LEVEL 1 TO UNLOCK</span>
                </button>

                {/* Instant Unlock Option for Teacher / Child exploration */}
                <button
                  onClick={() => {
                    sound.playClick();
                    onToggleUnlockLevel2();
                  }}
                  className="w-full text-center text-xs text-cyan-400 hover:text-cyan-300 font-bold underline cursor-pointer"
                >
                  Unlock Level 2 Now (Free Play Mode)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prominent Cross-Device PWA Install Banner */}
      <div className="bg-slate-900/90 rounded-3xl p-6 border-2 border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <h4 className="text-base sm:text-lg font-black text-white font-heading">
            Install Modern Chennai Port on Your Device
          </h4>
          <p className="text-xs sm:text-sm text-slate-300">
            Works 100% offline on Tablets, iPads, Chromebooks, Android phones & PCs with full-screen experience.
          </p>
        </div>

        <PWAInstallButton variant="prominent" />
      </div>
    </div>
  );
};
