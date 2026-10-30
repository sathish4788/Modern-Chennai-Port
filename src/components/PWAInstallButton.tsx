import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2, Globe, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { sound } from '../utils/soundEngine';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'prominent';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'compact' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [installedNotice, setInstalledNotice] = useState(false);

  // If already running in standalone mode, indicate ready
  if (isInstalled) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>Installed as App</span>
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
    } else {
      // Show full step-by-step manifestation guide for any device
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        title="Install Modern Chennai Port as a standalone application on your device"
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
            Standalone App
          </span>
        )}
      </button>

      {/* Installed Toast Notification */}
      {installedNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl animate-bounce border-2 border-emerald-400">
          <CheckCircle2 className="w-6 h-6" />
          <div>
            <span className="font-black text-sm block">Application Installed!</span>
            <span className="text-xs text-emerald-100">Check your home screen or app drawer.</span>
          </div>
        </div>
      )}

      {/* Full App Manifestation Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border-2 border-teal-500/50 p-6 text-white shadow-2xl">
            <button
              onClick={() => {
                sound.playClick();
                setShowGuide(false);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-teal-500/20 border border-teal-400/40 rounded-2xl text-teal-300">
                <Smartphone className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  PWA Standalone App Setup
                </span>
                <h3 className="text-xl font-extrabold text-white font-heading">
                  Manifest as App on Any Device
                </h3>
              </div>
            </div>

            <div className="space-y-3.5 text-sm text-slate-200 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              {/* Important: In-App Browser Warning */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
                <Globe className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Important for Phones:</strong> If you opened this link inside an in-app viewer (WhatsApp, Gmail, or Social apps), tap the <strong>⋮ (three dots)</strong> at the top right and select <strong>"Open in Chrome"</strong> or <strong>"Open in Safari"</strong>. In-app browsers only allow bookmarks, while Chrome & Safari install the real standalone app!
                </p>
              </div>

              {/* Android Instructions */}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500 text-slate-900 font-black text-xs flex items-center justify-center">
                  1
                </span>
                <div>
                  <strong className="text-white">Android Phone & Tablet (Chrome):</strong>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Tap the <strong>⋮ (three dots)</strong> menu in Chrome, then tap <strong>"Install App"</strong> (or <strong>"Add to Home Screen"</strong>). Android will build and manifest the application into your phone's app drawer with the Chennai Port icon!
                  </p>
                </div>
              </div>

              {/* iOS Instructions */}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500 text-slate-900 font-black text-xs flex items-center justify-center">
                  2
                </span>
                <div>
                  <strong className="text-white">iPhone & iPad (Safari):</strong>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Tap the <strong>Share</strong> button (square box with an arrow pointing up), scroll down and choose <strong>"Add to Home Screen"</strong>. It launches in full-screen standalone app mode without Safari address bars.
                  </p>
                </div>
              </div>

              {/* PC / Chromebook Instructions */}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white font-black text-xs flex items-center justify-center">
                  3
                </span>
                <div>
                  <strong className="text-white">Chromebook / PC / Mac (Chrome or Edge):</strong>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Look for the <strong>Install</strong> icon (computer with down arrow) on the right side of the address bar, or click <strong>Install App</strong> to open it in a dedicated standalone app window.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setShowGuide(false);
              }}
              className="mt-5 w-full py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-black text-sm hover:brightness-110 active:scale-[0.98] transition cursor-pointer font-heading"
            >
              GOT IT, READY TO PLAY!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
