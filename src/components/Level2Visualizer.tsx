import React from 'react';
import { QuizQuestion } from '../data/portQuizQuestions';

interface Level2VisualizerProps {
  question: QuizQuestion;
  isCorrect: boolean;
  selectedAnswer: 'A' | 'B' | 'C' | null;
}

export const Level2Visualizer: React.FC<Level2VisualizerProps> = ({
  question,
  isCorrect,
}) => {
  // Render specific animated visual based on question ID
  switch (question.id) {
    // ---------------------------------------------
    // MISSION 1: KNOW YOUR PORT (Q1 - Q5)
    // ---------------------------------------------
    case 1: // What is a port?
      return (
        <div className="relative w-full h-52 sm:h-60 bg-gradient-to-b from-sky-400 via-sky-200 to-blue-700 rounded-2xl overflow-hidden p-3 flex flex-col justify-end shadow-inner">
          <svg viewBox="0 0 500 200" className="w-full h-full">
            {/* Sky & Sun */}
            <circle cx="430" cy="40" r="24" fill="#facc15" />
            <path d="M 60 40 Q 80 25 100 40 Q 120 25 140 40 L 140 50 L 60 50 Z" fill="#ffffff" opacity="0.8" />
            {/* Sea */}
            <rect y="120" width="500" height="80" fill="#0284c7" />
            <path d="M 0 125 Q 125 120 250 125 T 500 125 L 500 200 L 0 200 Z" fill="#0369a1" opacity="0.5" />
            {/* Concrete Quay / Berth */}
            <rect x="0" y="130" width="180" height="70" fill="#475569" />
            <rect x="0" y="130" width="180" height="6" fill="#facc15" />
            {/* Cargo Ship Docked */}
            <path d="M 170 120 L 200 165 L 430 165 L 450 120 Z" fill="#dc2626" />
            <rect x="210" y="115" width="220" height="7" fill="#ffffff" rx="2" />
            {/* Containers on ship */}
            <rect x="220" y="90" width="45" height="25" rx="3" fill="#2563eb" />
            <rect x="270" y="90" width="45" height="25" rx="3" fill="#f97316" />
            <rect x="320" y="90" width="45" height="25" rx="3" fill="#10b981" />
            <rect x="245" y="65" width="45" height="25" rx="3" fill="#eab308" />
            {/* Port Crane on quay */}
            <path d="M 50 130 L 70 30 L 90 30 L 110 130" stroke="#f59e0b" strokeWidth="5" fill="none" />
            <line x1="30" y1="30" x2="250" y2="30" stroke="#f59e0b" strokeWidth="6" />
            <line x1="170" y1="30" x2="170" y2="75" stroke="#334155" strokeWidth="2" strokeDasharray="3,3" />
            <rect x="155" y="75" width="30" height="15" rx="2" fill="#2563eb" />
            {/* Text label */}
            <text x="325" y="150" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
              CHENNAI PORT QUAY
            </text>
          </svg>
          <div className="absolute top-2 left-3 bg-slate-900/80 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-300">
            A bustling port where cargo ships load & unload!
          </div>
        </div>
      );

    case 2: // Which machine lifts heavy containers?
      return (
        <div className="relative w-full h-52 sm:h-60 bg-gradient-to-b from-sky-400 via-sky-300 to-slate-800 rounded-2xl overflow-hidden p-3 shadow-inner">
          <svg viewBox="0 0 500 200" className="w-full h-full">
            {/* Giant Crane */}
            <path d="M 120 180 L 160 25 L 190 25 L 230 180" stroke="#f59e0b" strokeWidth="8" fill="none" />
            <line x1="70" y1="25" x2="430" y2="25" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" />
            <line x1="140" y1="80" x2="210" y2="80" stroke="#f59e0b" strokeWidth="4" />
            <line x1="130" y1="130" x2="220" y2="130" stroke="#f59e0b" strokeWidth="4" />
            {/* Hoist Cable */}
            <line x1="300" y1="25" x2="300" y2="95" stroke="#1e293b" strokeWidth="3" />
            {/* Spreader bar & 20-ton Container being lifted */}
            <rect x="260" y="95" width="80" height="10" rx="2" fill="#1e293b" />
            <g className={isCorrect ? 'animate-bounce' : ''}>
              <rect x="250" y="105" width="100" height="45" rx="4" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
              <line x1="275" y1="105" x2="275" y2="150" stroke="#60a5fa" strokeWidth="2" />
              <line x1="300" y1="105" x2="300" y2="150" stroke="#60a5fa" strokeWidth="2" />
              <line x1="325" y1="105" x2="325" y2="150" stroke="#60a5fa" strokeWidth="2" />
              <text x="300" y="132" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">
                HEAVY CRANE
              </text>
            </g>
          </svg>
          <div className="absolute top-2 left-3 bg-slate-900/80 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-300">
            Quayside Gantry Crane lifting a heavy 20-ton container!
          </div>
        </div>
      );

    case 3: // Why do we use containers?
      return (
        <div className="relative w-full h-52 sm:h-60 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 rounded-2xl overflow-hidden p-3 flex items-center justify-center shadow-inner">
          <div className="flex flex-wrap items-center justify-center gap-4 text-center">
            {/* Container box with protection shield */}
            <div className="p-4 rounded-2xl bg-blue-900/40 border-2 border-blue-400 max-w-xs shadow-lg">
              <div className="text-4xl mb-2">📦 ➔ 🛡️</div>
              <h4 className="text-sm font-black text-amber-300">Safe Steel Container</h4>
              <p className="text-xs text-slate-200 mt-1">
                Keeps thousands of boxes safe from ocean waves, rain, wind, and rough transport!
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-900/40 border-2 border-emerald-400 max-w-xs shadow-lg">
              <div className="text-4xl mb-2">🚚 🚂 🚢</div>
              <h4 className="text-sm font-black text-emerald-300">Fits on Lorries, Trains & Ships</h4>
              <p className="text-xs text-slate-200 mt-1">
                Standard ISO containers transfer seamlessly between road, rail, and sea.
              </p>
            </div>
          </div>
        </div>
      );

    case 4: // What does a lighthouse do?
      return (
        <div className="relative w-full h-52 sm:h-60 bg-gradient-to-b from-slate-950 via-indigo-950 to-blue-950 rounded-2xl overflow-hidden p-3 shadow-inner">
          <svg viewBox="0 0 500 200" className="w-full h-full">
            {/* Night Stars */}
            <circle cx="80" cy="30" r="1.5" fill="#ffffff" />
            <circle cx="220" cy="25" r="1.5" fill="#ffffff" />
            <circle cx="360" cy="35" r="1.5" fill="#ffffff" />
            <circle cx="450" cy="20" r="2" fill="#ffffff" />
            {/* Crescent Moon */}
            <path d="M 430 30 A 18 18 0 0 0 445 48 A 15 15 0 1 1 430 30 Z" fill="#fef08a" />
            {/* Seawater */}
            <rect y="130" width="500" height="70" fill="#0f172a" />
            {/* Lighthouse Tower with red & white stripes */}
            <polygon points="120,170 145,50 175,50 200,170" fill="#ffffff" />
            <polygon points="126,140 140,80 180,80 194,140" fill="#dc2626" />
            <rect x="142" y="32" width="36" height="20" rx="3" fill="#f59e0b" />
            {/* Glowing Light Beam */}
            <polygon points="160,42 480,10 490,110" fill="#fef08a" opacity="0.4" className="animate-pulse" />
            {/* Ship in distance guided by beam */}
            <path d="M 370 140 L 390 160 L 440 160 L 450 140 Z" fill="#475569" />
            <rect x="400" y="128" width="18" height="12" fill="#cbd5e1" />
          </svg>
          <div className="absolute top-2 left-3 bg-slate-900/80 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-300">
            Lighthouse rotating bright light beam guiding ships safely!
          </div>
        </div>
      );

    case 5: // What does a breakwater do?
      return (
        <div className="relative w-full h-52 sm:h-60 bg-gradient-to-b from-sky-300 via-sky-200 to-blue-800 rounded-2xl overflow-hidden p-3 shadow-inner">
          <svg viewBox="0 0 500 200" className="w-full h-full">
            {/* Wild rough ocean on left */}
            <path d="M 0 120 Q 30 90 60 120 T 120 120 T 180 120 L 180 200 L 0 200 Z" fill="#0369a1" />
            <text x="90" y="170" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
              ROUGH WAVES
            </text>
            {/* Breakwater Stone Barrier Wall in middle */}
            <polygon points="180,190 200,90 230,90 250,190" fill="#475569" />
            <polygon points="200,90 215,75 230,75 245,90" fill="#64748b" />
            <text x="215" y="140" fill="#facc15" fontSize="10" fontWeight="900" textAnchor="middle">
              BREAKWATER
            </text>
            {/* Calm peaceful harbour basin on right */}
            <rect x="250" y="130" width="250" height="70" fill="#38bdf8" />
            <path d="M 320 125 L 340 155 L 430 155 L 445 125 Z" fill="#ef4444" />
            <text x="375" y="180" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">
              CALM HARBOUR WATER
            </text>
          </svg>
          <div className="absolute top-2 left-3 bg-slate-900/80 px-2.5 py-1 rounded-lg text-xs font-bold text-teal-300">
            Breakwater stops strong waves, making the port water calm!
          </div>
        </div>
      );

    // ---------------------------------------------
    // MISSION 2: SCIENCE AT THE PORT (Q6 - Q10)
    // ---------------------------------------------
    case 6: // Why can a big ship float?
      return (
        <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-sky-300 via-sky-100 to-blue-700 rounded-2xl overflow-hidden p-3 shadow-inner">
          <svg viewBox="0 0 500 200" className="w-full h-full">
            {/* Water */}
            <rect y="110" width="500" height="90" fill="#0284c7" opacity="0.8" />
            {/* Floating Ship with wide hollow hull */}
            <g className="animate-rock" transform="translate(140, 60)">
              {/* Hollow cross section visualization */}
              <path d="M 20 40 Q 110 100 200 40 L 220 15 L 0 15 Z" fill="#dc2626" />
              {/* Air space inside hull */}
              <path d="M 25 35 Q 110 85 195 35 L 205 20 L 15 20 Z" fill="#ffffff" />
              <text x="110" y="45" fill="#0284c7" fontSize="11" fontWeight="900" textAnchor="middle">
                AIR-FILLED HOLLOW HULL
              </text>
              <text x="110" y="60" fill="#0f172a" fontSize="9" fontWeight="bold" textAnchor="middle">
                (Low average density)
              </text>
              {/* Upward buoyancy arrows */}
              <line x1="50" y1="85" x2="50" y2="55" stroke="#facc15" strokeWidth="3" markerEnd="url(#arrow)" />
              <line x1="110" y1="90" x2="110" y2="60" stroke="#facc15" strokeWidth="4" />
              <line x1="170" y1="85" x2="170" y2="55" stroke="#facc15" strokeWidth="3" />
            </g>
            <text x="250" y="175" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
              Upward Buoyant Water Force = Weight of Displaced Water
            </text>
          </svg>
          <div className="absolute top-2 left-3 bg-slate-900/80 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-300">
            Interactive: Wide, hollow shape full of air pushes water up to float!
          </div>
        </div>
      );

    case 7: // What can solar panels make from sunlight?
      return (
        <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-amber-200 via-sky-200 to-slate-800 rounded-2xl overflow-hidden p-3 shadow-inner">
          <svg viewBox="0 0 500 200" className="w-full h-full">
            {/* Radiant Sun */}
            <circle cx="90" cy="50" r="32" fill="#f59e0b" className="animate-pulse" />
            {/* Sunbeams falling on solar panels */}
            <line x1="120" y1="65" x2="220" y2="120" stroke="#facc15" strokeWidth="3" strokeDasharray="6,4" />
            <line x1="130" y1="50" x2="260" y2="110" stroke="#facc15" strokeWidth="3" strokeDasharray="6,4" />
            <line x1="110" y1="80" x2="180" y2="130" stroke="#facc15" strokeWidth="3" strokeDasharray="6,4" />
            {/* Solar Panels Grid */}
            <g transform="translate(180, 100) skewX(-20)">
              <rect width="130" height="70" rx="3" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="3" />
              <line x1="32" y1="0" x2="32" y2="70" stroke="#93c5fd" strokeWidth="1.5" />
              <line x1="65" y1="0" x2="65" y2="70" stroke="#93c5fd" strokeWidth="1.5" />
              <line x1="97" y1="0" x2="97" y2="70" stroke="#93c5fd" strokeWidth="1.5" />
              <line x1="0" y1="35" x2="130" y2="35" stroke="#93c5fd" strokeWidth="1.5" />
            </g>
            {/* Power Cable to Lightbulb */}
            <path d="M 320 145 Q 360 170 390 145" fill="none" stroke="#22c55e" strokeWidth="4" />
            {/* Lightbulb glowing bright electricity */}
            <circle cx="410" cy="130" r="22" fill="#facc15" className="animate-pulse" />
            <text x="410" y="135" fill="#0f172a" fontSize="18" textAnchor="middle">⚡</text>
            <text x="410" y="175" fill="#facc15" fontSize="12" fontWeight="bold" textAnchor="middle">
              ELECTRICITY!
            </text>
          </svg>
          <div className="absolute top-2 left-3 bg-slate-900/80 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-300">
            Interactive: Sunlight ➔ Photovoltaic Cells ➔ Clean Electricity!
          </div>
        </div>
      );

    case 8: // Wind pushes a flag: What is this push called?
      return (
        <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-700 rounded-2xl overflow-hidden p-3 shadow-inner">
          <svg viewBox="0 0 500 200" className="w-full h-full">
            {/* Ground & Flagpole */}
            <rect x="0" y="170" width="500" height="30" fill="#047857" />
            <line x1="140" y1="170" x2="140" y2="30" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
            <circle cx="140" cy="27" r="6" fill="#facc15" />
            {/* Animated Waving Port Flag */}
            <path
              d="M 143 32 Q 200 15 250 35 Q 200 55 143 70 Z"
              fill="#ef4444"
              className="animate-pulse-subtle"
            />
            <text x="180" y="52" fill="#ffffff" fontSize="11" fontWeight="bold">
              PORT FLAG
            </text>
            {/* Wind Gust Lines */}
            <path d="M 40 45 Q 80 40 120 45" stroke="#ffffff" strokeWidth="3" fill="none" strokeDasharray="8,4" />
            <path d="M 20 65 Q 70 60 120 65" stroke="#ffffff" strokeWidth="3" fill="none" strokeDasharray="8,4" />
            <path d="M 50 85 Q 90 80 125 85" stroke="#ffffff" strokeWidth="3" fill="none" strokeDasharray="8,4" />
            {/* Big Force Arrow */}
            <text x="340" y="70" fill="#0f172a" fontSize="18" fontWeight="900">
              💨 WIND PUSH = FORCE
            </text>
            <text x="340" y="95" fill="#1e293b" fontSize="12" fontWeight="bold">
              (A push or pull in science)
            </text>
          </svg>
          <div className="absolute top-2 left-3 bg-slate-900/80 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-300">
            Interactive: Wind gusts exert physical FORCE to flutter the flag!
          </div>
        </div>
      );

    case 9: // Why does a life jacket help?
      return (
        <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-sky-400 via-sky-200 to-blue-700 rounded-2xl overflow-hidden p-3 shadow-inner">
          <svg viewBox="0 0 500 200" className="w-full h-full">
            {/* Seawater */}
            <rect y="105" width="500" height="95" fill="#0284c7" />
            <path d="M 0 110 Q 125 102 250 110 T 500 110 L 500 200 L 0 200 Z" fill="#0369a1" opacity="0.6" />
            {/* Character floating safely with orange life jacket */}
            <g className="animate-float" transform="translate(210, 45)">
              {/* Head */}
              <circle cx="40" cy="20" r="16" fill="#fcd34d" />
              {/* Cheerful face */}
              <circle cx="34" cy="18" r="2" fill="#1e293b" />
              <circle cx="46" cy="18" r="2" fill="#1e293b" />
              <path d="M 34 25 Q 40 30 46 25" stroke="#1e293b" strokeWidth="2" fill="none" />
              {/* Bright Orange Life Jacket with reflective strips */}
              <path d="M 20 36 C 20 36 20 70 34 70 L 40 50 L 46 70 C 60 70 60 36 60 36 Z" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
              <line x1="24" y1="48" x2="36" y2="48" stroke="#ffffff" strokeWidth="3" />
              <line x1="44" y1="48" x2="56" y2="48" stroke="#ffffff" strokeWidth="3" />
            </g>
            <text x="250" y="165" fill="#ffffff" fontSize="14" fontWeight="900" textAnchor="middle">
              Buoyant Foam Traps Air ➔ Helps Person Float!
            </text>
          </svg>
          <div className="absolute top-2 left-3 bg-slate-900/80 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-300">
            Interactive: Lightweight buoyant jacket provides upward flotation!
          </div>
        </div>
      );

    case 10: // What is special about sea water?
      return (
        <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-sky-400 via-sky-200 to-blue-900 rounded-2xl overflow-hidden p-3 shadow-inner flex items-center justify-around">
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-sky-400/40 text-center max-w-xs">
            <div className="text-4xl mb-1">🌊 ➔ 🧂</div>
            <h4 className="text-sm font-black text-cyan-300">Seawater Contains Salt!</h4>
            <p className="text-xs text-slate-200 mt-1">
              Natural ocean water contains dissolved minerals and sodium chloride (salt), which makes it salty and denser than tap water.
            </p>
          </div>

          {/* Simple salt beaker demonstration graphic */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-amber-400/40 text-center">
            <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto">
              {/* Glass Beaker */}
              <rect x="25" y="20" width="50" height="65" rx="5" fill="#38bdf8" fillOpacity="0.2" stroke="#bae6fd" strokeWidth="3" />
              {/* Saline Water */}
              <rect x="27" y="45" width="46" height="38" rx="2" fill="#0284c7" fillOpacity="0.6" />
              {/* White Salt crystals floating & settled */}
              <circle cx="40" cy="75" r="2.5" fill="#ffffff" />
              <circle cx="50" cy="78" r="3" fill="#ffffff" />
              <circle cx="60" cy="76" r="2.5" fill="#ffffff" />
              <circle cx="45" cy="65" r="2" fill="#ffffff" />
              <circle cx="55" cy="62" r="2" fill="#ffffff" />
            </svg>
            <span className="text-xs font-bold text-amber-300">NaCl Salt Crystals</span>
          </div>
        </div>
      );

    // ---------------------------------------------
    // MISSION 3: PORT MATHS (Q11 - Q15)
    // ---------------------------------------------
    case 11: // 4 rows with 5 containers in each row
      return (
        <div className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden p-4 border border-slate-700 shadow-inner flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-amber-300">
            <span>Container Yard Grid: 4 Rows × 5 Columns</span>
            <span>4 × 5 = 20 Containers</span>
          </div>

          {/* 4 rows x 5 containers visual grid */}
          <div className="grid grid-rows-4 gap-2 my-auto">
            {Array.from({ length: 4 }).map((_, rIdx) => (
              <div key={rIdx} className="grid grid-cols-5 gap-2">
                {Array.from({ length: 5 }).map((_, cIdx) => (
                  <div
                    key={cIdx}
                    className="h-7 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 border border-blue-400 flex items-center justify-center text-[10px] font-black text-white shadow-sm"
                  >
                    #{rIdx * 5 + cIdx + 1}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="text-center text-xs text-slate-300 font-semibold">
            Count rows: Row 1 (5) + Row 2 (5) + Row 3 (5) + Row 4 (5) = 20 total
          </div>
        </div>
      );

    case 12: // Ship has 18 containers, crane unloads 7
      return (
        <div className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden p-4 border border-slate-700 shadow-inner flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
            <span>Math: 18 - 7 Unloaded = 11 Left on Ship</span>
            <span className="text-amber-300">Crane Unloading Sequence</span>
          </div>

          {/* Ship Deck with 18 slots: 11 kept (blue), 7 unloaded (crossed out/orange) */}
          <div className="grid grid-cols-6 gap-2 my-auto">
            {Array.from({ length: 18 }).map((_, idx) => {
              const isUnloaded = idx >= 11;
              return (
                <div
                  key={idx}
                  className={`h-9 rounded-lg border flex flex-col items-center justify-center text-[10px] font-black transition-all ${
                    isUnloaded
                      ? 'bg-orange-500/20 border-orange-500 text-orange-300 opacity-60 line-through'
                      : 'bg-blue-600 border-blue-300 text-white shadow-md'
                  }`}
                >
                  <span>{isUnloaded ? 'OFF' : `#${idx + 1}`}</span>
                  <span className="text-[8px]">{isUnloaded ? 'UNLOAD' : 'ON SHIP'}</span>
                </div>
              );
            })}
          </div>

          <div className="text-center text-xs text-slate-300 font-semibold">
            18 initial containers - 7 lifted off = 11 containers remain on deck!
          </div>
        </div>
      );

    case 13: // Crane moves 3 containers each time, works 4 times
      return (
        <div className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden p-4 border border-slate-700 shadow-inner flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-amber-300">
            <span>3 Containers per lift × 4 Lifts = 12 Moved</span>
            <span className="text-emerald-300">Repeated Addition: 3 + 3 + 3 + 3</span>
          </div>

          {/* 4 Lifts visualization */}
          <div className="grid grid-cols-4 gap-3 my-auto">
            {Array.from({ length: 4 }).map((_, liftIdx) => (
              <div key={liftIdx} className="bg-slate-800/90 p-2 rounded-xl border border-amber-400/40 text-center">
                <span className="text-[10px] font-bold text-amber-300 block mb-1">
                  Lift #{liftIdx + 1}
                </span>
                <div className="space-y-1">
                  <div className="h-4 rounded bg-amber-500 text-[8px] font-black text-slate-950 flex items-center justify-center">Box 1</div>
                  <div className="h-4 rounded bg-amber-500 text-[8px] font-black text-slate-950 flex items-center justify-center">Box 2</div>
                  <div className="h-4 rounded bg-amber-500 text-[8px] font-black text-slate-950 flex items-center justify-center">Box 3</div>
                </div>
                <span className="text-[9px] text-slate-300 mt-1 block font-bold">= 3 units</span>
              </div>
            ))}
          </div>

          <div className="text-center text-xs text-slate-300 font-semibold">
            Count in threes: 3, 6, 9, 12! Total containers moved = 12.
          </div>
        </div>
      );

    case 14: // Two ships carry 24 containers each
      return (
        <div className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden p-4 border border-slate-700 shadow-inner flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-teal-300">
            <span>Ship A (24) + Ship B (24) = 48 Containers</span>
            <span className="text-amber-300">Double 24 = 48</span>
          </div>

          <div className="grid grid-cols-2 gap-4 my-auto">
            <div className="p-3 rounded-2xl bg-slate-800/80 border-2 border-red-500/60 text-center">
              <span className="text-2xl">🚢</span>
              <h4 className="text-xs font-black text-red-300 mt-1">M.V. CHENNAI STAR</h4>
              <div className="text-xl font-black text-white my-1 font-heading">24 Containers</div>
              <p className="text-[10px] text-slate-400">Export Manifest Berth 1</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/80 border-2 border-blue-500/60 text-center">
              <span className="text-2xl">🚢</span>
              <h4 className="text-xs font-black text-blue-300 mt-1">M.V. COROMANDEL</h4>
              <div className="text-xl font-black text-white my-1 font-heading">24 Containers</div>
              <p className="text-[10px] text-slate-400">Export Manifest Berth 2</p>
            </div>
          </div>

          <div className="text-center text-xs text-amber-300 font-bold">
            24 + 24 = 48 containers altogether!
          </div>
        </div>
      );

    case 15: // 30 boxes shared equally among 5 trucks
      return (
        <div className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden p-4 border border-slate-700 shadow-inner flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
            <span>30 Boxes ÷ 5 Trucks = 6 Boxes per Truck</span>
            <span className="text-emerald-300">Equal Division</span>
          </div>

          {/* 5 Trucks with 6 boxes each */}
          <div className="grid grid-cols-5 gap-2 my-auto">
            {Array.from({ length: 5 }).map((_, tIdx) => (
              <div key={tIdx} className="bg-slate-800 p-2 rounded-xl border border-teal-500/40 text-center">
                <span className="text-xl">🚚</span>
                <span className="text-[10px] font-bold text-teal-300 block mb-1">
                  Truck #{tIdx + 1}
                </span>
                <div className="grid grid-cols-2 gap-1">
                  {Array.from({ length: 6 }).map((_, bIdx) => (
                    <div key={bIdx} className="h-3 rounded-xs bg-amber-400 border border-amber-600" />
                  ))}
                </div>
                <span className="text-[10px] font-black text-white mt-1 block">6 Boxes</span>
              </div>
            ))}
          </div>

          <div className="text-center text-xs text-slate-300 font-semibold">
            Sharing 30 boxes equally into 5 trucks gives exactly 6 boxes per truck!
          </div>
        </div>
      );

    // ---------------------------------------------
    // MISSION 4: GREEN & SUSTAINABLE PORT (Q16 - Q20)
    // ---------------------------------------------
    case 16: // Which vehicle is cleaner?
      return (
        <div className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden p-4 border border-slate-700 shadow-inner flex items-center justify-around">
          <div className="p-4 rounded-2xl bg-emerald-950/60 border-2 border-emerald-400 text-center max-w-xs shadow-lg">
            <div className="text-4xl mb-1">⚡ 🚚 🍃</div>
            <h4 className="text-sm font-black text-emerald-300">Electric Cargo Vehicle</h4>
            <p className="text-xs text-slate-200 mt-1">
              Zero exhaust smoke, super quiet, and charges from port solar power!
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-center max-w-xs opacity-60">
            <div className="text-4xl mb-1">💨 🚛 ⚠️</div>
            <h4 className="text-sm font-bold text-rose-300">Polluting Diesel Truck</h4>
            <p className="text-xs text-slate-300 mt-1">
              Produces black smoke and soot that pollutes the harbour air.
            </p>
          </div>
        </div>
      );

    case 17: // Segregated bins
      return (
        <div className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden p-4 border border-slate-700 shadow-inner flex flex-col justify-between">
          <div className="text-xs font-bold text-emerald-300 text-center">
            Segregated Waste Station: Put materials in separate color-coded bins!
          </div>

          <div className="grid grid-cols-3 gap-4 my-auto">
            <div className="p-3 rounded-2xl bg-blue-900/40 border-2 border-blue-400 text-center">
              <span className="text-3xl">📄</span>
              <h4 className="text-xs font-black text-blue-300 mt-1">BLUE BIN</h4>
              <p className="text-[10px] text-slate-200 mt-0.5">Paper & Cardboard</p>
            </div>
            <div className="p-3 rounded-2xl bg-yellow-900/40 border-2 border-yellow-400 text-center">
              <span className="text-3xl">🧴</span>
              <h4 className="text-xs font-black text-yellow-300 mt-1">YELLOW BIN</h4>
              <p className="text-[10px] text-slate-200 mt-0.5">Plastic Bottles & Bags</p>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-900/40 border-2 border-emerald-400 text-center">
              <span className="text-3xl">🍎</span>
              <h4 className="text-xs font-black text-emerald-300 mt-1">GREEN BIN</h4>
              <p className="text-[10px] text-slate-200 mt-0.5">Organic & Food Waste</p>
            </div>
          </div>

          <div className="text-center text-xs text-slate-300 font-semibold">
            Segregation allows recycling and prevents trash from reaching our oceans!
          </div>
        </div>
      );

    case 18: // Oil spill cleaned quickly
      return (
        <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-sky-400 to-blue-900 rounded-2xl overflow-hidden p-3 shadow-inner flex items-center justify-around">
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-400 text-center max-w-sm">
            <div className="text-4xl mb-1">🐬 🦤 🪸</div>
            <h4 className="text-sm font-black text-emerald-300">Protect Marine Wildlife!</h4>
            <p className="text-xs text-slate-200 mt-1">
              Oil spills form a suffocating layer on water that harms fish gills, coats bird feathers, and destroys coral reefs if not contained immediately.
            </p>
          </div>
        </div>
      );

    case 19: // Save electricity during bright day
      return (
        <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-amber-300 via-sky-200 to-slate-900 rounded-2xl overflow-hidden p-4 shadow-inner flex items-center justify-around">
          <div className="bg-slate-900/85 p-4 rounded-2xl border border-amber-400 text-center max-w-xs shadow-lg">
            <span className="text-3xl">☀️ ➔ 💡❌</span>
            <h4 className="text-sm font-black text-amber-300 mt-1">Use Sunlight & Switch Off Lamps</h4>
            <p className="text-xs text-slate-200 mt-1">
              Natural daylight is 100% free! Turning off unneeded lamps saves energy and cuts port emissions.
            </p>
          </div>
        </div>
      );

    case 20: // Protect the sea: put plastic in correct bin
      return (
        <div className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden p-4 border border-slate-700 shadow-inner flex items-center justify-around">
          <div className="bg-emerald-950/70 p-4 rounded-2xl border-2 border-emerald-400 text-center max-w-sm shadow-xl">
            <span className="text-4xl mb-1 block">🗑️ 🐢 🌊</span>
            <h4 className="text-sm font-black text-emerald-300">Put Plastic in the Correct Bin</h4>
            <p className="text-xs text-slate-200 mt-1">
              Sea turtles often mistake plastic bags for jellyfish. Keeping plastics in recycling bins protects sea creatures!
            </p>
          </div>
        </div>
      );

    // ---------------------------------------------
    // MISSION 5: SAFETY & GENERAL AWARENESS (Q21 - Q25)
    // ---------------------------------------------
    case 21: // Red traffic signal
      return (
        <div className="relative w-full h-56 sm:h-64 bg-slate-950 rounded-2xl overflow-hidden p-4 border border-slate-700 shadow-inner flex items-center justify-around">
          {/* Traffic Signal Post */}
          <div className="bg-slate-900 p-3 rounded-2xl border-2 border-slate-700 flex flex-col items-center gap-2 shadow-2xl">
            <div className="w-8 h-8 rounded-full bg-red-500 shadow-[0_0_16px_#ef4444] animate-pulse" />
            <div className="w-8 h-8 rounded-full bg-yellow-900/30 border border-slate-700" />
            <div className="w-8 h-8 rounded-full bg-emerald-900/30 border border-slate-700" />
            <span className="text-[10px] font-black text-red-400 uppercase">RED = STOP</span>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-red-500/50 max-w-xs text-center">
            <span className="text-3xl">🛑 🚚</span>
            <h4 className="text-sm font-black text-white mt-1">Truck Stops Completely</h4>
            <p className="text-xs text-slate-300 mt-1">
              Drivers must stop at red signals to keep rail crossings, pedestrians, and forklifts safe.
            </p>
          </div>
        </div>
      );

    case 22: // What protects a worker's head?
      return (
        <div className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden p-4 border border-slate-700 shadow-inner flex items-center justify-around">
          <div className="bg-slate-800/90 p-5 rounded-2xl border-2 border-amber-400 text-center max-w-xs shadow-xl">
            <span className="text-5xl mb-2 block">⛑️</span>
            <h4 className="text-base font-black text-amber-300">Hard Safety Helmet</h4>
            <p className="text-xs text-slate-200 mt-1">
              A sturdy safety helmet cushions and shields workers from falling items or low-hanging hooks.
            </p>
          </div>
        </div>
      );

    case 23: // Chennai is on the coast of which water body?
      return (
        <div className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden p-4 border border-slate-700 shadow-inner flex items-center justify-center">
          <svg viewBox="0 0 400 180" className="w-full h-full max-w-md">
            {/* Outline of Southern Indian Coastline */}
            <path d="M 60 20 L 160 20 L 180 80 L 190 120 L 150 170 L 120 170 L 80 120 Z" fill="#047857" />
            <text x="120" y="70" fill="#ffffff" fontSize="12" fontWeight="bold">INDIA</text>
            {/* Arabian Sea on West */}
            <text x="40" y="110" fill="#38bdf8" fontSize="10" fontWeight="bold">Arabian Sea</text>
            {/* Bay of Bengal on East */}
            <rect x="200" y="20" width="180" height="140" fill="#0284c7" rx="8" />
            <text x="290" y="80" fill="#ffffff" fontSize="14" fontWeight="900" textAnchor="middle">
              BAY OF BENGAL
            </text>
            <text x="290" y="105" fill="#facc15" fontSize="10" textAnchor="middle">
              (Chennai Coastline)
            </text>
            {/* Chennai Port Pin */}
            <circle cx="185" cy="85" r="5" fill="#ef4444" className="animate-ping" />
            <circle cx="185" cy="85" r="4" fill="#ef4444" />
            <text x="175" y="82" fill="#facc15" fontSize="10" fontWeight="bold" textAnchor="end">
              Chennai ⚓
            </text>
          </svg>
        </div>
      );

    case 24: // Railway tracks near port
      return (
        <div className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden p-4 border border-slate-700 shadow-inner flex items-center justify-around">
          <div className="bg-slate-800/90 p-4 rounded-2xl border border-teal-400 text-center max-w-sm shadow-xl">
            <span className="text-4xl mb-1 block">🚂 ➔ 🏙️ 🏭</span>
            <h4 className="text-sm font-black text-teal-300">Fast Long-Distance Cargo Transit</h4>
            <p className="text-xs text-slate-200 mt-1">
              Trains carry hundreds of containers simultaneously from the harbour docks across thousands of kilometers to inland cities!
            </p>
          </div>
        </div>
      );

    case 25: // What should visitors do?
      return (
        <div className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden p-4 border border-slate-700 shadow-inner flex items-center justify-around">
          <div className="bg-slate-800/90 p-4 rounded-2xl border-2 border-emerald-400 text-center max-w-sm shadow-xl">
            <span className="text-4xl mb-1 block">🚸 📋 🦺</span>
            <h4 className="text-sm font-black text-emerald-300">Follow Signs & Stay in Safe Areas</h4>
            <p className="text-xs text-slate-200 mt-1">
              Always walk within green walkways, wear visitor safety vests, and obey all port signage.
            </p>
          </div>
        </div>
      );

    // ---------------------------------------------
    // MISSION 6: JUNIOR PORT CAPTAIN FINAL (Q26 - Q30)
    // ---------------------------------------------
    case 26: // Fallen container emergency
      return (
        <div className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden p-4 border border-amber-400/50 shadow-inner flex items-center justify-around">
          <div className="p-4 rounded-2xl bg-amber-950/60 border-2 border-amber-400 text-center max-w-sm">
            <span className="text-4xl mb-1 block">🚨 🚧 📞</span>
            <h4 className="text-sm font-black text-amber-300">1st Priority: Human Safety & Cordon</h4>
            <p className="text-xs text-slate-200 mt-1">
              Keep everyone far back from the fallen container and alert the port safety emergency team immediately!
            </p>
          </div>
        </div>
      );

    case 27: // Strong waves: breakwater
      return (
        <div className="relative w-full h-56 sm:h-64 bg-gradient-to-b from-sky-400 to-blue-900 rounded-2xl overflow-hidden p-3 shadow-inner flex items-center justify-around">
          <div className="bg-slate-900/85 p-4 rounded-2xl border-2 border-cyan-400 text-center max-w-sm">
            <span className="text-4xl mb-1 block">🌊 🧱 ⚓</span>
            <h4 className="text-sm font-black text-cyan-300">The Harbour Breakwater</h4>
            <p className="text-xs text-slate-200 mt-1">
              The sturdy stone breakwater dissipates ocean wave energy so water inside the port remains peaceful and calm.
            </p>
          </div>
        </div>
      );

    case 28: // Lights on during bright sunlight
      return (
        <div className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden p-4 border border-emerald-400/40 shadow-inner flex items-center justify-around">
          <div className="bg-emerald-950/60 p-4 rounded-2xl border-2 border-emerald-400 text-center max-w-sm">
            <span className="text-4xl mb-1 block">💡❌ 🌿 ☀️</span>
            <h4 className="text-sm font-black text-emerald-300">Green Captain Action</h4>
            <p className="text-xs text-slate-200 mt-1">
              Switch off unnecessary lights to conserve power and keep our port green and energy-efficient!
            </p>
          </div>
        </div>
      );

    case 29: // Plastic bottle near water
      return (
        <div className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden p-4 border border-teal-400/40 shadow-inner flex items-center justify-around">
          <div className="bg-teal-950/60 p-4 rounded-2xl border-2 border-teal-400 text-center max-w-sm">
            <span className="text-4xl mb-1 block">🧴 ➔ 🗑️ ✅</span>
            <h4 className="text-sm font-black text-teal-300">Recycle Immediately</h4>
            <p className="text-xs text-slate-200 mt-1">
              Pick up the loose plastic bottle and put it into the proper recycling bin before ocean winds blow it into the water!
            </p>
          </div>
        </div>
      );

    case 30: // Cargo arrival order
      return (
        <div className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden p-4 border border-amber-400 shadow-inner flex flex-col justify-between">
          <div className="text-xs font-bold text-amber-300 text-center">
            Standard Maritime Logistics Sequence:
          </div>

          <div className="grid grid-cols-3 gap-3 my-auto text-center">
            <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
              <span className="text-2xl">1. 🚢</span>
              <h5 className="text-[11px] font-black text-white mt-1">Ship Stops Safely</h5>
              <p className="text-[9px] text-slate-300">Moors at berth securely</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
              <span className="text-2xl">2. 🏗️</span>
              <h5 className="text-[11px] font-black text-white mt-1">Crane Unloads</h5>
              <p className="text-[9px] text-slate-300">Lifts containers off deck</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
              <span className="text-2xl">3. 🚚</span>
              <h5 className="text-[11px] font-black text-white mt-1">Moves to Yard</h5>
              <p className="text-[9px] text-slate-300">Stored neatly on pallets</p>
            </div>
          </div>

          <div className="text-center text-xs text-emerald-300 font-bold">
            Ship stops safely ➔ Crane unloads ➔ Containers go to the yard!
          </div>
        </div>
      );

    default:
      return null;
  }
};
