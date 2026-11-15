import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PixelBeeIcon, PixelResearcher } from './PixelSprites';

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LOADING_DURATION_MS = 900;
const INTRO_SEEN_KEY = 'souvik-intro-seen';

function getFieldStatus(progress: number): string {
  if (progress < 34) return 'Packing insect net & field notebook...';
  if (progress < 68) return 'Spotting Tetragonula srikantanathi...';
  if (progress < 96) return 'Opening CAU Imphal field diary...';
  return 'Ready for the Field Walk!';
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      return window.sessionStorage.getItem(INTRO_SEEN_KEY) !== '1';
    } catch {
      return true;
    }
  });
  const [progress, setProgress] = useState(0);
  const [stridePhase, setStridePhase] = useState<1 | 2>(1);

  const dismissLoader = () => {
    try {
      window.sessionStorage.setItem(INTRO_SEEN_KEY, '1');
    } catch {
      // Ignore storage failures in restricted contexts
    }
    setVisible(false);
    onComplete?.();
  };

  // Smooth eased 0 -> 100 progress animation
  useEffect(() => {
    if (!visible) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setProgress(100);
      const quickTimer = window.setTimeout(dismissLoader, 160);
      return () => window.clearTimeout(quickTimer);
    }

    let rafId = 0;
    let finishTimer: number | null = null;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const raw = Math.min(1, elapsed / LOADING_DURATION_MS);
      // Ease-out-in feel with gentle hesitation before reaching 100
      const eased = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
      const pct = Math.min(100, Math.round(eased * 100));
      setProgress(pct);

      if (raw < 1) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        finishTimer = window.setTimeout(dismissLoader, 140);
      }
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      if (finishTimer !== null) window.clearTimeout(finishTimer);
    };
  }, [visible]);

  // Brisk 2-frame walk cycle while Souvik crosses the loading trail
  useEffect(() => {
    if (!visible) return;
    const interval = window.setInterval(() => {
      setStridePhase((prev) => (prev === 1 ? 2 : 1));
    }, 170);
    return () => window.clearInterval(interval);
  }, [visible]);

  const statusText = getFieldStatus(progress);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="field-loader"
          initial={{ y: 0, opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          }}
          role="status"
          aria-live="polite"
          aria-label="Loading Souvik Mohanty's Digital Diary"
          className="fixed inset-0 z-50 bg-[#F6F3E8] notebook-grid border-b-4 border-[#18261C] flex flex-col items-center justify-center px-6 select-none overflow-hidden"
        >
          {/* Decorative corner pixel lilies echoing the site header */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#2E7D32] via-[#E59A00] to-[#2E7D32]"
          />

          <div className="w-full max-w-md flex flex-col items-center text-center">
            {/* Brand Title Lockup */}
            <p className="font-mono-tabular text-[11px] font-bold tracking-widest text-[#2E7D32] uppercase mb-1.5">
              CAU Imphal · Agricultural Entomology
            </p>
            <h2 className="font-pixel text-3xl sm:text-4xl font-bold text-[#18261C] tracking-tight mb-10">
              Souvik’s Digital Diary
            </h2>

            {/* Animated Character Walking Across the Progress Trail */}
            <div className="relative w-full pt-20 pb-3 mb-4 text-left">
              {/* Moving Sprite Group: Travels strictly from left edge to right edge of the progress bar */}
              <div
                style={{ transform: `translate3d(${progress}%, 0, 0)` }}
                className="absolute top-0 left-0 w-full pointer-events-none will-change-transform"
              >
                <div
                  style={{ transform: `translate3d(-${progress}%, 0, 0)` }}
                  className="inline-flex items-end will-change-transform"
                >
                  <div className="w-16 h-[74px] sm:w-[70px] sm:h-20">
                    <PixelResearcher
                      stridePhase={progress >= 100 ? 0 : stridePhase}
                      isInspecting={progress >= 100}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="animate-bee-hover -ml-3 mb-11">
                    <PixelBeeIcon className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Checkpoint Flower Dots along the trail */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-5 flex items-center justify-between px-1 pointer-events-none"
              >
                {[0, 35, 70, 100].map((mark) => {
                  const passed = progress >= mark;
                  return (
                    <span
                      key={mark}
                      className={`w-2.5 h-2.5 rounded-full border-2 border-[#18261C] transition-colors ${
                        passed ? 'bg-[#FFE066]' : 'bg-[#FFFDF7]'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Tactile 16-bit Progress Bar */}
              <div className="relative h-5 w-full bg-[#EAE4D1] border-2 border-[#18261C] shadow-[4px_4px_0_#18261C] overflow-hidden">
                <div
                  style={{
                    transform: `scaleX(${progress / 100})`,
                    transformOrigin: 'left center',
                  }}
                  className="w-full h-full bg-gradient-to-r from-[#2E7D32] via-[#4CAF50] to-[#E59A00] relative will-change-transform"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 bg-white/30"
                  />
                </div>
              </div>
            </div>

            {/* Live Status Line & Crisp Tabular Percentage */}
            <div className="w-full flex items-center justify-between gap-4 mt-1">
              <p className="font-mono-tabular text-xs sm:text-sm font-semibold text-[#2D3E31] text-left">
                {statusText}
              </p>
              <span className="font-pixel text-lg sm:text-xl font-bold text-[#18261C] tabular-nums shrink-0">
                {progress}%
              </span>
            </div>
          </div>

          {/* Skip Intro Control */}
          <button
            type="button"
            onClick={dismissLoader}
            className="mt-10 font-mono-tabular text-xs font-bold text-[#4C6050] hover:text-[#18261C] underline decoration-2 underline-offset-4 cursor-pointer transition-colors"
          >
            Skip intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
