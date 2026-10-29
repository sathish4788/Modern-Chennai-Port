import React, { useState, useEffect } from 'react';
import { Warehouse, Check, ArrowRight, Play, Square, ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';
import { CharacterGuide } from '../CharacterGuide';
import { RoundConfig } from '../../types/game';
import { sound } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Level6GodownDeliveryProps {
  config: RoundConfig;
  onComplete: (bonusCoins: number, starsEarned: number) => void;
}

export const Level6GodownDelivery: React.FC<Level6GodownDeliveryProps> = ({ config, onComplete }) => {
  // Driving game state
  const [truckX, setTruckX] = useState(15); // Progress from Port (10%) to Godown (85%)
  const [truckLane, setTruckLane] = useState<'left' | 'center' | 'right'>('center');
  const [isDriving, setIsDriving] = useState(false);
  const [isAutoDrive, setIsAutoDrive] = useState(false);
  const [hasArrived, setHasArrived] = useState(false);

  // Unloading animation at Godown
  const [unloadingProgress, setUnloadingProgress] = useState(0);
  const [isUnloaded, setIsUnloaded] = useState(false);

  // Auto-drive or driving tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if ((isDriving || isAutoDrive) && !hasArrived) {
      interval = setInterval(() => {
        setTruckX((prev) => {
          const next = prev + (isAutoDrive ? 2.5 : 2);
          if (next >= 85) {
            setHasArrived(true);
            setIsDriving(false);
            sound.playForkliftBeep();
            return 85;
          }
          return next;
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDriving, isAutoDrive, hasArrived]);

  // Handle Arrival & Forklift Unload Sequence
  useEffect(() => {
    if (hasArrived && !isUnloaded) {
      let currentBoxes = 0;
      const unloadInterval = setInterval(() => {
        currentBoxes += 15;
        sound.playBoxLoad();
        setUnloadingProgress(Math.min(currentBoxes, config.importBoxes));

        if (currentBoxes >= config.importBoxes) {
          clearInterval(unloadInterval);
          setIsUnloaded(true);
          sound.playSuccessFanfare();
          confetti({
            particleCount: 70,
            spread: 80,
            origin: { y: 0.6 },
          });
        }
      }, 120);
      return () => clearInterval(unloadInterval);
    }
  }, [hasArrived, isUnloaded, config.importBoxes]);

  const handleForwardDown = () => {
    sound.playClick();
    setIsDriving(true);
  };

  const handleForwardUp = () => {
    setIsDriving(false);
  };

  const handleLaneChange = (dir: 'left' | 'right') => {
    sound.playClick();
    if (dir === 'left') {
      if (truckLane === 'right') setTruckLane('center');
      else if (truckLane === 'center') setTruckLane('left');
    } else {
      if (truckLane === 'left') setTruckLane('center');
      else if (truckLane === 'center') setTruckLane('right');
    }
  };

  const handleProceed = () => {
    sound.playClick();
    onComplete(100, 3);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-emerald-700 via-teal-700 to-amber-600 rounded-3xl p-4 sm:p-6 text-white shadow-xl">
        <div>
          <span className="text-xs font-black uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full">
            LEVEL 6: PORT TO GODOWN DELIVERY
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2 font-heading">
            Chennai Central Godown (Warehouse)
          </h2>
          <p className="text-sm font-semibold text-emerald-100">
            Road Transit & Warehouse Stacking · Final Stage of Logistics Cycle
          </p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur px-4 py-2 rounded-2xl border border-white/20 text-center">
          <div className="text-[10px] uppercase font-bold text-amber-300">Transit Distance</div>
          <div className="text-2xl font-black">
            {Math.min(Math.round(((truckX - 15) / 70) * 100), 100)}%
          </div>
        </div>
      </div>

      {/* Manager Raj Dialogue */}
      <CharacterGuide
        message={
          isUnloaded
            ? 'Superstar delivery! All incoming goods are neatly stacked on warehouse pallets. The Godown manager has signed the delivery certificate!'
            : hasArrived
            ? 'The truck has parked in the designated receiving bay! Watch the forklift and conveyor belt unpack all goods into the warehouse.'
            : isAutoDrive
            ? 'Cruising smoothly on Auto-Drive! Heading down the scenic Chennai Port Road to the central godown.'
            : 'Guide the container truck along the scenic port road to the godown. Press Forward to drive, or switch on Auto-Drive!'
        }
        mood={isUnloaded ? 'celebrating' : 'happy'}
      />

      {/* Road & Warehouse Simulation View */}
      <div className="bg-slate-800/90 rounded-3xl p-6 border-2 border-slate-700 shadow-2xl relative overflow-hidden">
        {/* Scenic Road Canvas */}
        <div className="relative rounded-2xl bg-gradient-to-b from-sky-400 via-emerald-200 to-slate-900 h-64 sm:h-72 border-2 border-slate-700 overflow-hidden shadow-inner">
          {/* Sky & Palm Trees / Chennai Scenery */}
          <div className="absolute top-2 left-6 text-2xl select-none">🌴</div>
          <div className="absolute top-4 left-32 text-2xl select-none">🌴</div>
          <div className="absolute top-2 right-40 text-2xl select-none">🌴</div>
          <div className="absolute top-6 right-16 text-2xl select-none">🌴</div>

          {/* Start Point: Chennai Port Exit */}
          <div className="absolute top-10 left-3 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700 text-[10px] font-bold text-cyan-300">
            Chennai Port Gate 1
          </div>

          {/* End Point: Godown Warehouse Structure */}
          <div className="absolute top-6 right-3 bg-amber-900/90 px-3 py-2 rounded-xl border-2 border-amber-400 text-white shadow-lg text-center z-20">
            <Warehouse className="w-6 h-6 text-amber-300 mx-auto" />
            <span className="text-[11px] font-black uppercase tracking-wider block">
              Central Godown
            </span>
          </div>

          {/* Paved Highway Road */}
          <div className="absolute bottom-4 left-0 right-0 h-32 bg-slate-800 border-t-4 border-slate-600 flex flex-col justify-between py-2">
            {/* Lane Dash Line */}
            <div className="w-full border-t-2 border-dashed border-amber-300 opacity-60" />
            <div className="w-full border-t-2 border-dashed border-white/40" />

            {/* Truck on the Road */}
            <div
              className="absolute transition-all duration-200 ease-linear flex items-center"
              style={{
                left: `${truckX}%`,
                top: truckLane === 'left' ? '12px' : truckLane === 'center' ? '40px' : '68px',
              }}
            >
              {/* Cartoon Delivery Truck SVG */}
              <svg viewBox="0 0 100 50" className="w-24 sm:w-28 h-auto drop-shadow-xl">
                {/* Container trailer */}
                <rect x="5" y="10" width="55" height="28" rx="3" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
                <rect x="12" y="14" width="40" height="20" rx="2" fill="#38bdf8" opacity="0.3" />
                <text x="32" y="27" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">
                  IMPORT CARGO
                </text>
                {/* Cab */}
                <path d="M 60 18 L 74 18 L 86 28 L 86 38 L 60 38 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                <path d="M 65 21 L 73 21 L 81 28 L 65 28 Z" fill="#bae6fd" />
                <circle cx="87" cy="30" r="2.5" fill="#fef08a" />
                {/* Wheels */}
                <circle cx="18" cy="40" r="6" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="48" cy="40" r="6" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="75" cy="40" r="6" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Driving Controls or Auto-Drive Panel */}
        {!hasArrived ? (
          <div className="mt-6 bg-slate-900/90 rounded-2xl p-5 border border-slate-700 flex flex-wrap items-center justify-between gap-4">
            {/* Auto Drive Toggle for Kids */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsAutoDrive(!isAutoDrive);
                }}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                  isAutoDrive
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAutoDrive ? 'Auto-Drive ON' : 'Enable Auto-Drive'}</span>
              </button>
              <span className="text-xs text-slate-400 hidden sm:inline">
                (Press for relaxed cruising directly to the warehouse)
              </span>
            </div>

            {/* Manual Directional Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleLaneChange('left')}
                className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 active:scale-95 transition cursor-pointer"
                title="Change Lane Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleLaneChange('right')}
                className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 active:scale-95 transition cursor-pointer"
                title="Change Lane Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onMouseDown={handleForwardDown}
                onMouseUp={handleForwardUp}
                onTouchStart={handleForwardDown}
                onTouchEnd={handleForwardUp}
                className={`px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 select-none active:scale-95 transition cursor-pointer ${
                  isDriving
                    ? 'bg-amber-400 text-slate-950 scale-105'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg'
                }`}
              >
                <Play className="w-5 h-5 fill-current" />
                <span>FORWARD</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setIsDriving(false);
                }}
                className="p-3 bg-rose-950 text-rose-300 hover:bg-rose-900 rounded-xl border border-rose-800 active:scale-95 transition cursor-pointer"
                title="Stop"
              >
                <Square className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          /* Warehouse Unloading & Stacking Visual */
          <div className="mt-6 bg-slate-900/90 rounded-2xl p-6 border-2 border-amber-400/60 animate-in fade-in">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Warehouse className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-black text-white font-heading">
                  Godown Receiving & Inventory Stacking
                </h3>
              </div>

              <div className="px-3 py-1 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 font-extrabold text-xs">
                Inventory: {unloadingProgress} / {config.importBoxes} Stored
              </div>
            </div>

            {/* Warehouse Pallet Stacks */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-6 sm:grid-cols-10 gap-1.5 mb-4">
              {Array.from({ length: Math.floor(unloadingProgress / 15) }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-8 rounded-sm bg-gradient-to-t from-amber-600 to-yellow-400 border border-amber-700 flex items-center justify-center text-[10px] font-black text-slate-900 shadow-sm animate-in zoom-in"
                >
                  📦
                </div>
              ))}
            </div>

            {/* Complete Card */}
            {isUnloaded && (
              <div className="bg-gradient-to-r from-emerald-950/90 to-teal-950/90 rounded-xl p-5 border border-emerald-400 text-center animate-in fade-in">
                <div className="inline-flex p-2 rounded-full bg-emerald-500 text-slate-950 mb-2">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white font-heading">
                  TASK 4 COMPLETE – GOODS SAFELY DELIVERED TO THE GODOWN!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-200 mt-1 font-semibold">
                  Entire logistics journey successfully executed: Factory ➔ Lorry ➔ Train ➔ Ship ➔ Return ➔ Godown!
                </p>

                <div className="mt-5 flex justify-center">
                  <button
                    onClick={handleProceed}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-lg hover:scale-105 active:scale-95 transition shadow-xl font-heading cursor-pointer"
                  >
                    <span>VIEW CELEBRATION & CERTIFICATE</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
