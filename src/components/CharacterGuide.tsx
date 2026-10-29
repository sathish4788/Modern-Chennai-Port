import React from 'react';
import { Volume2, Sparkles, HelpCircle } from 'lucide-react';
import { sound } from '../utils/soundEngine';

interface CharacterGuideProps {
  message: string;
  mood?: 'happy' | 'celebrating' | 'thinking' | 'explaining';
  hint?: string;
  showHint?: boolean;
  onToggleHint?: () => void;
}

export const CharacterGuide: React.FC<CharacterGuideProps> = ({
  message,
  mood = 'happy',
  hint,
  showHint,
  onToggleHint,
}) => {
  const handleReadAloud = () => {
    sound.playClick();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = showHint && hint ? `${message}. Hint: ${hint}` : message;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.pitch = 1.1; // Friendly warm young manager voice
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-slate-800/90 backdrop-blur-md border-2 border-amber-400/30 rounded-3xl p-4 sm:p-5 shadow-xl transition-all">
      {/* Cartoon Character Avatar: Manager Raj */}
      <div className="relative flex-shrink-0 group">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-amber-600 p-1 shadow-lg shadow-orange-500/20 transform group-hover:scale-105 transition">
          <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center overflow-hidden relative">
            {/* SVG Illustration of Friendly Logistics Manager */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Sky background inside avatar */}
              <circle cx="50" cy="50" r="48" fill="#0284c7" />

              {/* Cap: Navy blue with bright yellow trim */}
              <path d="M26 35 Q50 18 74 35 Q50 28 26 35 Z" fill="#1e3a8a" />
              <path d="M22 35 C20 35 48 30 78 35 C82 35 84 38 78 40 C60 41 40 41 22 40 C18 39 18 35 22 35 Z" fill="#f59e0b" />
              {/* Cap Badge */}
              <circle cx="50" cy="28" r="4.5" fill="#facc15" />
              <text x="50" y="30" fontSize="5" fontWeight="900" fill="#1e3a8a" textAnchor="middle">PORT</text>

              {/* Head / Face */}
              <circle cx="50" cy="52" r="21" fill="#fcd34d" />

              {/* Cheeks blush */}
              <circle cx="37" cy="56" r="3.5" fill="#f87171" opacity="0.6" />
              <circle cx="63" cy="56" r="3.5" fill="#f87171" opacity="0.6" />

              {/* Expressive cartoon eyes */}
              {mood === 'celebrating' ? (
                // Happy arc eyes
                <>
                  <path d="M38 48 Q42 43 46 48" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M54 48 Q58 43 62 48" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </>
              ) : mood === 'thinking' ? (
                // Curious glance up-right
                <>
                  <circle cx="42" cy="48" r="3.5" fill="#1e293b" />
                  <circle cx="58" cy="48" r="3.5" fill="#1e293b" />
                  <circle cx="44" cy="46.5" r="1.2" fill="#ffffff" />
                  <circle cx="60" cy="46.5" r="1.2" fill="#ffffff" />
                  <path d="M36 43 Q42 41 46 44" stroke="#1e293b" strokeWidth="2" fill="none" />
                  <path d="M54 44 Q58 41 64 42" stroke="#1e293b" strokeWidth="2" fill="none" />
                </>
              ) : (
                // Friendly bright eyes
                <>
                  <circle cx="42" cy="50" r="3" fill="#1e293b" />
                  <circle cx="58" cy="50" r="3" fill="#1e293b" />
                  <circle cx="43" cy="49" r="1" fill="#ffffff" />
                  <circle cx="59" cy="49" r="1" fill="#ffffff" />
                </>
              )}

              {/* Cheerful Smile */}
              {mood === 'celebrating' ? (
                <path d="M41 58 Q50 69 59 58 Z" fill="#ef4444" stroke="#1e293b" strokeWidth="1.5" />
              ) : (
                <path d="M42 59 Q50 66 58 59" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              )}

              {/* High-visibility yellow safety vest & blue shirt */}
              <path d="M30 73 Q50 78 70 73 L76 100 L24 100 Z" fill="#3b82f6" />
              {/* Safety vest stripes */}
              <path d="M32 73 L42 100 L35 100 L25 73 Z" fill="#eab308" />
              <path d="M68 73 L58 100 L65 100 L75 73 Z" fill="#eab308" />
              {/* Reflective silver strip */}
              <rect x="33" y="86" width="34" height="4" rx="1" fill="#e2e8f0" />
            </svg>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow">
          Manager Raj
        </div>
      </div>

      {/* Speech Bubble & Action Controls */}
      <div className="flex-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-between gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Logistics Guide
          </span>

          <div className="flex items-center gap-2">
            {/* Read Aloud button for accessibility */}
            <button
              onClick={handleReadAloud}
              title="Read message aloud"
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-xl transition cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-cyan-400" />
            </button>

            {/* Hint toggle button if hint provided */}
            {hint && onToggleHint && (
              <button
                onClick={() => {
                  sound.playHintSound();
                  onToggleHint();
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  showHint
                    ? 'bg-amber-400 text-slate-900 shadow-md'
                    : 'bg-slate-700/80 hover:bg-slate-700 text-amber-300'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
              </button>
            )}
          </div>
        </div>

        <p className="text-slate-100 text-sm sm:text-base font-semibold leading-relaxed">
          "{message}"
        </p>

        {/* Visual Hint Box */}
        {showHint && hint && (
          <div className="mt-3 p-3 rounded-2xl bg-amber-400/10 border border-amber-400/40 text-amber-200 text-xs sm:text-sm animate-in fade-in flex items-start gap-2">
            <span className="text-lg">💡</span>
            <div>
              <p className="font-bold text-amber-300">Manager Raj's Smart Clue:</p>
              <p className="mt-0.5 text-slate-200">{hint}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
