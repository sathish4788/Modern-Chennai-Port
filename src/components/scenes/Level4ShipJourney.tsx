import React, { useState, useEffect } from 'react';
import { Ship, ArrowRight, Award, Compass, Globe2 } from 'lucide-react';
import { CharacterGuide } from '../CharacterGuide';
import { RoundConfig } from '../../types/game';
import { sound } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';

interface Level4ShipJourneyProps {
  config: RoundConfig;
  onComplete: (bonusCoins: number, starsEarned: number) => void;
}

export const Level4ShipJourney: React.FC<Level4ShipJourneyProps> = ({ config, onComplete }) => {
  const [journeyProgress, setJourneyProgress] = useState(0); // 0 to 100%
  const [voyageStatus, setVoyageStatus] = useState<string>('Casting off mooring ropes at Chennai Port...');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Sound ship foghorn on departure
    sound.playShipHorn();

    const milestones = [
      { at: 10, msg: 'Mooring ropes released. M.V. CHENNAI STAR leaving dock!' },
      { at: 35, msg: 'Sailing through Bay of Bengal waters under golden sunset.' },
      { at: 65, msg: 'Navigating through international shipping sea lanes.' },
      { at: 90, msg: 'Entering international destination port waters!' },
      { at: 100, msg: 'Safely docked! Cargo manifest inspected and approved.' },
    ];

    const timer = setInterval(() => {
      setJourneyProgress((prev) => {
        const next = prev + 5;
        const currentMilestone = milestones.slice().reverse().find((m) => next >= m.at);
        if (currentMilestone) {
          setVoyageStatus(currentMilestone.msg);
        }

        if (next >= 100) {
          clearInterval(timer);
          setIsCompleted(true);
          sound.playSuccessFanfare();
          confetti({
            particleCount: 80,
            spread: 90,
            origin: { y: 0.5 },
          });
          return 100;
        }
        return next;
      });
    }, 350);

    return () => clearInterval(timer);
  }, []);

  const handleProceed = () => {
    sound.playClick();
    onComplete(80, 3);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Level Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-800 rounded-3xl p-4 sm:p-6 text-white shadow-xl">
        <div>
          <span className="text-xs font-black uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full">
            LEVEL 4: SHIP DEPARTURE & INTERNATIONAL DELIVERY
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2 font-heading">
            International Maritime Export Voyage
          </h2>
          <p className="text-sm font-semibold text-amber-100">
            Route: Chennai Port (India) ➔ Port of Singapore · Bay of Bengal Sea Route
          </p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur px-4 py-2 rounded-2xl border border-white/20 text-center">
          <div className="text-[10px] uppercase font-bold text-amber-300">Voyage Distance</div>
          <div className="text-2xl font-black">{journeyProgress}%</div>
        </div>
      </div>

      {/* Manager Raj Dialogue */}
      <CharacterGuide
        message={
          isCompleted
            ? 'Fantastic work, Cargo Champion! You solved the maths challenges, loaded the goods safely, and sent our shipment across the sea! The foreign port received all containers!'
            : 'Listen to the deep foghorn! The container ship is sailing smoothly across the ocean with all our carefully counted cargo boxes.'
        }
        mood={isCompleted ? 'celebrating' : 'happy'}
      />

      {/* Cinematic Golden-Hour Ocean Voyage Visualizer */}
      <div className="bg-slate-800/90 rounded-3xl p-6 border-2 border-slate-700 shadow-2xl relative overflow-hidden">
        {/* Sky, Sunset, Seagulls & Ocean */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-amber-500 via-rose-500 to-sky-900 h-64 sm:h-80 shadow-inner flex flex-col justify-between p-4">
          {/* Sunset Sun */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-to-t from-yellow-300 to-amber-200 blur-sm opacity-90" />

          {/* Flying Seagulls */}
          <div className="absolute top-8 left-12 text-2xl select-none animate-float">
            🦅
          </div>
          <div className="absolute top-14 right-20 text-xl select-none animate-float" style={{ animationDelay: '1s' }}>
            🦅
          </div>

          {/* Distant Lighthouse */}
          <div className="absolute top-28 left-6 text-3xl select-none">
            🗼
          </div>

          {/* Top Info overlay */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/70 backdrop-blur border border-white/20 text-xs font-bold text-amber-200">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Bearing: 112° Southeast · Calm Seas</span>
            </span>

            <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/70 backdrop-blur border border-white/20 text-xs font-bold text-cyan-200">
              <Globe2 className="w-4 h-4 text-cyan-400" />
              <span>Transit: Bay of Bengal</span>
            </span>
          </div>

          {/* Sailing Container Ship Animated along Ocean Track */}
          <div className="relative z-10 w-full h-36 flex items-end">
            <div
              className="transition-all duration-300 ease-out flex flex-col items-center"
              style={{
                marginLeft: `${Math.min(journeyProgress * 0.75, 75)}%`,
              }}
            >
              {/* Ship Graphic with Stacks */}
              <div className="animate-rock">
                <svg viewBox="0 0 160 80" className="w-36 sm:w-44 h-auto drop-shadow-2xl">
                  {/* Containers on deck */}
                  <rect x="25" y="24" width="22" height="15" rx="1.5" fill="#2563eb" />
                  <rect x="50" y="24" width="22" height="15" rx="1.5" fill="#f97316" />
                  <rect x="75" y="24" width="22" height="15" rx="1.5" fill="#059669" />
                  <rect x="37" y="10" width="22" height="14" rx="1.5" fill="#eab308" />
                  <rect x="62" y="10" width="22" height="14" rx="1.5" fill="#dc2626" />

                  {/* Bridge / Tower */}
                  <rect x="105" y="12" width="24" height="28" rx="2" fill="#ffffff" />
                  <rect x="109" y="16" width="16" height="6" rx="1" fill="#38bdf8" />
                  <line x1="117" y1="6" x2="117" y2="12" stroke="#ffffff" strokeWidth="2" />
                  <polygon points="117,6 125,9 117,12" fill="#ef4444" />

                  {/* Red Ship Hull */}
                  <path d="M 8 38 L 24 64 L 146 64 L 156 38 Z" fill="#b91c1c" />
                  <line x1="10" y1="38" x2="154" y2="38" stroke="#ffffff" strokeWidth="3" />
                  <text x="85" y="54" fill="#ffffff" fontSize="9" fontWeight="900" textAnchor="middle">
                    CHENNAI
                  </text>
                </svg>
              </div>

              {/* Water wake effect */}
              <div className="w-24 h-1.5 bg-white/40 rounded-full blur-[1px] -mt-1" />
            </div>
          </div>

          {/* Ocean Waves Layer */}
          <div className="relative z-10 w-full h-8 -mx-4 -mb-4 bg-gradient-to-r from-blue-900 to-indigo-950 flex items-center justify-between px-6 text-xs text-blue-200 font-semibold border-t border-cyan-400/30">
            <span>Chennai Coastline 🇮🇳</span>
            <span className="text-amber-300 font-bold">{voyageStatus}</span>
            <span>Singapore Terminal 🇸🇬</span>
          </div>
        </div>

        {/* Sea Route Progress Bar */}
        <div className="mt-6 bg-slate-900/90 rounded-2xl p-4 border border-slate-700">
          <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
            <span>Chennai Port Departure</span>
            <span className="text-amber-400">Voyage: {journeyProgress}% Complete</span>
            <span>Destination Port Arrival</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-700">
            <div
              className="bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 h-full rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${journeyProgress}%` }}
            />
          </div>
        </div>

        {/* Completion Celebration Badge */}
        {isCompleted && (
          <div className="mt-6 bg-gradient-to-r from-emerald-950/90 via-teal-900/90 to-slate-900 rounded-2xl p-6 border-2 border-emerald-400 text-center animate-in fade-in">
            <div className="inline-flex p-3 rounded-full bg-emerald-500 text-slate-950 mb-3 shadow-lg">
              <Award className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
              EXPORT DELIVERY SUCCESSFUL!
            </h3>
            <p className="text-emerald-200 text-sm sm:text-base font-bold mt-1">
              All {config.totalBoxes} factory boxes safely reached the destination port across the ocean.
            </p>
            <p className="text-xs text-emerald-300 mt-1">
              Export Mission Reward: +80 Cargo Coins · +3 Stars!
            </p>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleProceed}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-lg hover:scale-105 active:scale-95 transition shadow-xl font-heading cursor-pointer"
              >
                <span>PROCEED TO LEVEL 5: RETURN SHIPMENT</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
