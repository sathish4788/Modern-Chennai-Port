import React from 'react';
import {
  Coins,
  Star,
  Volume2,
  VolumeX,
  Music,
  Package,
  RotateCcw,
  LayoutDashboard,
  Trophy,
  Compass,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { PlayerScore, GameStage } from '../types/game';
import { sound } from '../utils/soundEngine';

interface ScoreHeaderProps {
  activeView: 'main_menu' | 'level1' | 'level2' | 'level2_celebration';
  score: PlayerScore;
  currentStage: GameStage;
  totalBoxes: number;
  currentCapacityText?: string;
  quizScore?: number;
  badgesCount?: number;
  isMuted: boolean;
  isMusicMuted: boolean;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onRestartRound: () => void;
  onGoToDashboard: () => void;
}

export const ScoreHeader: React.FC<ScoreHeaderProps> = ({
  activeView,
  score,
  totalBoxes,
  currentCapacityText,
  quizScore = 0,
  badgesCount = 0,
  isMuted,
  isMusicMuted,
  onToggleSound,
  onToggleMusic,
  onRestartRound,
  onGoToDashboard,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Tagline + Dashboard return */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onGoToDashboard();
            }}
            title="Go to Main Dashboard"
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-amber-500 p-0.5 shadow-md flex items-center justify-center transform group-hover:scale-105 transition">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-lg font-black text-amber-400">
                ⚓
              </div>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-1.5 leading-none">
                <span>Modern Chennai Port</span>
                <span className="hidden md:inline-block text-[11px] font-bold text-amber-400 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">
                  {activeView === 'level2' || activeView === 'level2_celebration'
                    ? 'Junior Port Captain'
                    : 'Logistics Manager'}
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">
                Count It. Load It. Ship It. Deliver It!
              </p>
            </div>
          </button>

          {/* Quick Dashboard link button if inside a level */}
          {activeView !== 'main_menu' && (
            <button
              onClick={() => {
                sound.playClick();
                onGoToDashboard();
              }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
              <span>Menu</span>
            </button>
          )}
        </div>

        {/* Dynamic Center Stats Display */}
        <div className="flex items-center gap-2 sm:gap-4">
          {activeView === 'level2' || activeView === 'level2_celebration' ? (
            /* Level 2 Quiz Stats */
            <>
              <div
                title="Port Quiz Score"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-extrabold text-xs sm:text-sm shadow-sm"
              >
                <Trophy className="w-4 h-4 text-cyan-400" />
                <span>{quizScore} / 30</span>
                <span className="text-[10px] text-cyan-400/80 uppercase font-bold hidden xs:inline">
                  Points
                </span>
              </div>

              <div
                title="Badges Unlocked"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-extrabold text-xs sm:text-sm"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>{badgesCount} / 6</span>
                <span className="text-[10px] text-amber-400/80 uppercase font-bold hidden xs:inline">
                  Badges
                </span>
              </div>
            </>
          ) : (
            /* Level 1 Logistics Stats */
            <>
              <div
                title="Cargo Coins Wallet"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-extrabold text-xs sm:text-sm shadow-sm"
              >
                <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>{score.coins}</span>
                <span className="text-[10px] text-amber-400/80 uppercase font-bold hidden xs:inline">
                  Coins
                </span>
              </div>

              <div
                title="Stars Earned"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 font-extrabold text-xs sm:text-sm"
              >
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{score.stars}</span>
              </div>

              <div
                title="Active Cargo Boxes"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-xs"
              >
                <Package className="w-4 h-4 text-cyan-400" />
                <span>{totalBoxes} Boxes</span>
                {currentCapacityText && (
                  <span className="text-slate-400 text-[11px]">({currentCapacityText})</span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Action Controls & PWA Install */}
        <div className="flex items-center gap-2">
          {/* Sound Effect Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleSound();
            }}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              isMuted
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Music Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleMusic();
            }}
            title={isMusicMuted ? 'Turn Music On' : 'Turn Music Off'}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              isMusicMuted
                ? 'bg-slate-800/50 border-slate-700/50 text-slate-500'
                : 'bg-teal-500/10 border-teal-500/30 text-teal-300 hover:text-white'
            }`}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Restart Round button if in Level 1 */}
          {activeView === 'level1' && (
            <button
              onClick={() => {
                sound.playClick();
                onRestartRound();
              }}
              title="Restart Level 1 Logistics Journey"
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* PWA Install Button */}
          <PWAInstallButton variant="compact" />
        </div>
      </div>
    </header>
  );
};
