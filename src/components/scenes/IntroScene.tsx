import React from 'react';
import { Play, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { PWAInstallButton } from '../PWAInstallButton';
import { CharacterGuide } from '../CharacterGuide';
import { sound } from '../../utils/soundEngine';

interface IntroSceneProps {
  onStartJourney: (selectedBoxes: number) => void;
  selectedBoxes: number;
  setSelectedBoxes: (boxes: number) => void;
}

export const IntroScene: React.FC<IntroSceneProps> = ({
  onStartJourney,
  selectedBoxes,
  setSelectedBoxes,
}) => {
  const boxPresets = [
    { count: 200, label: 'Standard Mission', desc: '4 Lorries · 8 Train Cars · 2 Containers', badge: 'Recommended' },
    { count: 100, label: 'Quick Starter', desc: '2 Lorries · 4 Train Cars · 1 Container' },
    { count: 300, label: 'Pro Dispatcher', desc: '6 Lorries · 12 Train Cars · 3 Containers' },
    { count: 400, label: 'Mega Cargo Fleet', desc: '8 Lorries · 16 Train Cars · 4 Containers' },
  ];

  const handleStart = () => {
    sound.playSuccessFanfare();
    sound.startBackgroundMusic();
    onStartJourney(selectedBoxes);
  };

  return (
    <div className="relative min-h-[calc(100vh-130px)] flex flex-col justify-between p-4 sm:p-8 max-w-6xl mx-auto">
      {/* Background Hero Scene: Sunrise over Chennai Harbor */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-sky-400 via-amber-200 to-blue-700 p-6 sm:p-10 shadow-2xl border-4 border-slate-700">
        {/* Animated Sun & Clouds */}
        <div className="absolute top-6 right-12 w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-[0_0_60px_rgba(251,191,36,0.8)] animate-pulse" />
        <div className="absolute top-10 left-10 text-white/40 text-4xl select-none animate-float">
          ☁️
        </div>
        <div className="absolute top-20 right-1/3 text-white/50 text-5xl select-none animate-float" style={{ animationDelay: '1.5s' }}>
          ☁️
        </div>

        {/* Foreground Scenic Silhouette: Port Cranes, Ship, Train, Lorries */}
        <div className="relative z-10 text-center max-w-3xl mx-auto mt-2 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur border border-amber-400/40 text-amber-300 font-bold text-xs uppercase tracking-wider mb-4 shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>The Great Cargo Adventure</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight drop-shadow-sm font-heading">
            Modern Chennai Port
          </h2>
          <p className="mt-2 text-lg sm:text-2xl font-extrabold text-blue-950 font-heading">
            “Count It. Load It. Ship It. Deliver It!”
          </p>
        </div>

        {/* Illustrated Panorama Backdrop */}
        <div className="relative z-10 w-full h-44 sm:h-56 bg-slate-900/85 backdrop-blur-md rounded-2xl border border-blue-400/30 p-4 flex flex-col justify-end overflow-hidden shadow-inner">
          {/* Harbor Skyline SVG */}
          <svg viewBox="0 0 800 200" className="w-full h-full object-cover">
            {/* Distant Sea & Horizon */}
            <rect y="110" width="800" height="90" fill="#0369a1" />
            <path d="M 0 115 Q 200 110 400 115 T 800 115 L 800 200 L 0 200 Z" fill="#0284c7" opacity="0.6" />

            {/* Chennai Port Giant Gantry Cranes */}
            <path d="M 500 110 L 530 20 L 550 20 L 580 110" stroke="#f59e0b" strokeWidth="6" fill="none" />
            <line x1="510" y1="20" x2="720" y2="20" stroke="#f59e0b" strokeWidth="8" />
            <line x1="620" y1="20" x2="620" y2="65" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4,4" />
            <rect x="600" y="65" width="40" height="20" rx="3" fill="#3b82f6" />

            {/* Container Ship at Dock */}
            <path d="M 380 95 L 410 135 L 750 135 L 770 95 Z" fill="#dc2626" />
            <rect x="420" y="65" width="45" height="30" rx="2" fill="#10b981" />
            <rect x="470" y="65" width="45" height="30" rx="2" fill="#f97316" />
            <rect x="520" y="65" width="45" height="30" rx="2" fill="#3b82f6" />
            <rect x="445" y="38" width="45" height="27" rx="2" fill="#eab308" />

            {/* Freight Train on Left Track */}
            <rect x="30" y="125" width="70" height="35" rx="6" fill="#1e293b" />
            <circle cx="45" cy="162" r="7" fill="#64748b" />
            <circle cx="65" cy="162" r="7" fill="#64748b" />
            <circle cx="85" cy="162" r="7" fill="#64748b" />
            <rect x="110" y="130" width="75" height="30" rx="4" fill="#059669" />
            <circle cx="125" cy="162" r="7" fill="#64748b" />
            <circle cx="170" cy="162" r="7" fill="#64748b" />

            {/* Waiting Lorries */}
            <rect x="220" y="135" width="80" height="30" rx="4" fill="#ea580c" />
            <rect x="280" y="125" width="35" height="40" rx="4" fill="#ea580c" />
            <circle cx="240" cy="167" r="7" fill="#1e293b" />
            <circle cx="295" cy="167" r="7" fill="#1e293b" />

            {/* Stacked Cardboard Pallets */}
            <rect x="330" y="138" width="22" height="15" rx="2" fill="#d97706" />
            <rect x="333" y="123" width="22" height="15" rx="2" fill="#d97706" />
            <rect x="355" y="138" width="22" height="15" rx="2" fill="#b45309" />
          </svg>

          {/* Bottom badge */}
          <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between text-[11px] text-slate-300 font-bold">
            <span className="flex items-center gap-1 text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Tamil Nadu Maritime Board · Chennai Port Authority
            </span>
            <span className="text-cyan-300 hidden sm:inline">
              Road · Rail · Maritime Logistics Simulation
            </span>
          </div>
        </div>
      </div>

      {/* Manager Raj Dialogue Box */}
      <div className="mt-6">
        <CharacterGuide
          message="Welcome, Cargo Champion! Today, you are in charge of our logistics company. Your mission is to move goods from the factory to a ship, deliver them to another country, and bring new goods safely back to our godown. Solve the maths challenges, load the cargo, and become a Logistics Superstar!"
          mood="celebrating"
        />
      </div>

      {/* Cargo Box Size Selector & Start Button */}
      <div className="mt-6 bg-slate-800/80 backdrop-blur-md rounded-3xl p-6 border-2 border-slate-700">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Select Cargo Mission Difficulty:</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {boxPresets.map((preset) => (
            <button
              key={preset.count}
              onClick={() => {
                sound.playClick();
                setSelectedBoxes(preset.count);
              }}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                selectedBoxes === preset.count
                  ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg shadow-amber-500/10 scale-[1.02]'
                  : 'bg-slate-900/60 border-slate-700/80 text-slate-400 hover:border-slate-500 hover:text-slate-200'
              }`}
            >
              {preset.badge && (
                <span className="absolute -top-2.5 right-3 bg-amber-400 text-slate-950 font-black text-[10px] uppercase px-2 py-0.5 rounded-full shadow">
                  {preset.badge}
                </span>
              )}
              <div className="text-2xl font-black text-white font-heading">
                {preset.count} Boxes
              </div>
              <div className="text-xs font-bold text-amber-300 mt-1">
                {preset.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {preset.desc}
              </div>
            </button>
          ))}
        </div>

        {/* Start Button & Install Action */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-700/80">
          <PWAInstallButton variant="prominent" />

          <button
            onClick={handleStart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xl shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer font-heading"
          >
            <Play className="w-6 h-6 fill-slate-950" />
            <span>START JOURNEY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
