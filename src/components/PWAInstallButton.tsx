import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { sound } from '../utils/soundEngine';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'prominent';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'compact' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installedNotice, setInstalledNotice] = useState(false);

  // If already running in standalone mode, indicate ready
  if (isInstalled) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>Installed</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    sound.playClick();
    if (isInstallable) {
      const success = await install();
      if (success) {
        setInstalledNotice(true);
        setTimeout(() => setInstalledNotice(false), 4000);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // Fallback guide if browser beforeinstallprompt hasn't fired yet or browser is desktop without prompt
      setShowIOSGuide(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        title="Install Modern Chennai Port on your device"
        className={
          variant === 'prominent'
            ? 'group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold text-base shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer'
            : 'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-bold shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer'
        }
      >
        <Download className={variant === 'prominent' ? 'w-5 h-5 animate-bounce' : 'w-4 h-4'} />
        <span>Install App</span>
        {variant === 'prominent' && (
          <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">
            Any Device
          </span>
        )}
      </button>

      {/* Installed Toast Notification */}
      {installedNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-2xl animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-bold text-sm">App successfully added to your home screen!</span>
        </div>
      )}

      {/* Installation Guide Modal (for iOS or browsers without direct prompt) */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-800 border-2 border-teal-500/40 p-6 text-white shadow-2xl">
            <button
              onClick={() => {
                sound.playClick();
                setShowIOSGuide(false);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-700/60 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-teal-500/20 border border-teal-400/40 rounded-2xl text-teal-300">
                <Smartphone className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">Install on Any Device</h3>
                <p className="text-xs text-teal-300">Play offline & enjoy full-screen gameplay</p>
              </div>
            </div>

            <div className="space-y-3.5 text-sm text-slate-200 bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500 text-slate-900 font-black text-xs flex items-center justify-center">
                  1
                </span>
                <p>
                  <strong>iPhone / iPad Safari:</strong> Tap the <strong>Share</strong> button (box with upward arrow) at the bottom toolbar, then scroll and tap <strong>Add to Home Screen</strong>.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500 text-slate-900 font-black text-xs flex items-center justify-center">
                  2
                </span>
                <p>
                  <strong>Android Chrome:</strong> Tap the <strong>⋮ (three dots)</strong> menu in the top-right corner, then tap <strong>Install App</strong> or <strong>Add to Home screen</strong>.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500 text-slate-900 font-black text-xs flex items-center justify-center">
                  3
                </span>
                <p>
                  <strong>Mac / Windows / Chromebook:</strong> Click the <strong>Install</strong> icon in the browser address bar (top right) or press <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-xs font-mono">Install</kbd>.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setShowIOSGuide(false);
              }}
              className="mt-5 w-full py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-900 font-extrabold hover:brightness-110 active:scale-[0.98] transition"
            >
              Got It, Let's Play!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
