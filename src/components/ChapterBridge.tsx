import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { ArrowDown, BookOpen, Camera, Mail, Sparkles } from 'lucide-react';
import {
  PixelBeeIcon,
  PixelPatentSealIcon,
  PixelResearcher,
  PixelStopProp,
  PixelTrophyIcon,
} from './PixelSprites';

export type BridgeVariant =
  | 'hero-to-walk'
  | 'lab-to-library'
  | 'library-to-awards'
  | 'awards-to-album'
  | 'album-to-contact';

const BRIDGE_META: Record<
  BridgeVariant,
  {
    chapterTag: string;
    kicker: string;
    title: string;
    bgClass: string;
    accentColor: string;
    pillBorder: string;
  }
> = {
  'hero-to-walk': {
    chapterTag: '01',
    kicker: 'STEPPING ONTO THE FIELD TRAIL',
    title: '6 Stops · LPU Punjab to CAU Imphal',
    bgClass: 'bg-transparent',
    accentColor: '#2E7D32',
    pillBorder: 'shadow-[4px_4px_0_#2E7D32]',
  },
  'lab-to-library': {
    chapterTag: '02',
    kicker: 'SURFACING FROM M.SC. THESIS LAB',
    title: 'Next Chapter · Publications & Monographs',
    bgClass: 'bg-transparent',
    accentColor: '#E59A00',
    pillBorder: 'shadow-[4px_4px_0_#E59A00]',
  },
  'library-to-awards': {
    chapterTag: '03',
    kicker: 'ENTERING THE RECOGNITION HALL',
    title: 'Next Chapter · Awards, Patent & Credentials',
    bgClass: 'bg-transparent',
    accentColor: '#2E7D32',
    pillBorder: 'shadow-[4px_4px_0_#2E7D32]',
  },
  'awards-to-album': {
    chapterTag: '04',
    kicker: 'OPENING FIELD & CAMPUS MEMORIES',
    title: 'Next Chapter · Souvik’s Photo Book',
    bgClass: 'bg-transparent',
    accentColor: '#E59A00',
    pillBorder: 'shadow-[4px_4px_0_#E59A00]',
  },
  'album-to-contact': {
    chapterTag: '05',
    kicker: 'ARRIVING AT THE RESEARCHER OUTPOST',
    title: 'Final Stop · Collaborate & Say Hello',
    bgClass: 'bg-transparent',
    accentColor: '#2E7D32',
    pillBorder: 'shadow-[4px_4px_0_#2E7D32]',
  },
};

export function ChapterBridge({ variant }: { variant: BridgeVariant }) {
  const bridgeRef = useRef<HTMLDivElement>(null);
  const meta = BRIDGE_META[variant];
  const [walkStride, setWalkStride] = useState<1 | 2>(1);

  const { scrollYProgress } = useScroll({
    target: bridgeRef,
    offset: ['start 95%', 'end 20%'],
  });

  // Drive live pixel walking stride directly from scroll progress for hero-to-walk
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (variant !== 'hero-to-walk') return;
    setWalkStride(Math.floor(latest * 18) % 2 === 0 ? 1 : 2);
  });

  // Scroll-choreographed 3D transforms (compositor-only: transform & opacity)
  const runnerX = useTransform(scrollYProgress, [0, 1], [-145, 145]);
  const oppositeX = useTransform(scrollYProgress, [0, 1], [115, -115]);
  const signRotateX = useTransform(scrollYProgress, [0, 0.48, 1], [38, 0, 0]);
  const signY = useTransform(scrollYProgress, [0, 0.5, 1], [22, 0, -4]);
  const signScale = useTransform(scrollYProgress, [0, 0.55, 1], [0.86, 1.03, 1]);
  const signOpacity = useTransform(scrollYProgress, [0, 0.28, 0.85, 1], [0.35, 1, 1, 0.92]);
  const ribbonScaleX = useTransform(scrollYProgress, [0.05, 0.82], [0.04, 1]);
  const climbY = useTransform(scrollYProgress, [0, 0.5, 1], [16, -12, 8]);
  const bobWaveY = useTransform(scrollYProgress, [0, 0.5, 1], [10, -10, 6]);
  const walkBounceY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, -8, 0, -8, 0, -4]
  );
  const parallaxTilt = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <div
      ref={bridgeRef}
      aria-hidden="true"
      className={`relative overflow-hidden py-8 sm:py-11 ${meta.bgClass}`}
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 relative flex flex-col items-center">
        {/* Scroll-Drawn 3D Path Track */}
        <div className="relative w-full max-w-2xl h-16 flex items-center justify-center mb-3">
          {/* Muted dashed base trail */}
          <div className="absolute inset-x-4 sm:inset-x-6 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#18261C]/22" />

          {/* Active scroll-drawn progress beam */}
          <motion.div
            style={{ scaleX: ribbonScaleX, backgroundColor: meta.accentColor }}
            className="absolute left-4 right-4 sm:left-6 sm:right-6 top-1/2 -translate-y-1/2 h-[3px] origin-center"
          />

          {/* Endcaps on the path */}
          <span className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#FFFDF7] border-2 border-[#18261C] rotate-45" />
          <span className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#FFFDF7] border-2 border-[#18261C] rotate-45" />

          {/* Hero -> Field Walk: Animated Pixel Souvik jogging across the meadow with bee & net */}
          {variant === 'hero-to-walk' && (
            <>
              <motion.div
                style={{ x: runnerX, y: walkBounceY }}
                className="relative z-10 flex items-end gap-1.5"
              >
                <div className="w-12 h-14">
                  <PixelResearcher
                    stridePhase={walkStride}
                    isInspecting={false}
                    className="w-full h-full"
                  />
                </div>
                <div className="animate-bee-hover mb-8">
                  <PixelBeeIcon className="w-6 h-6" />
                </div>
              </motion.div>

              <motion.div
                style={{ x: oppositeX, y: bobWaveY, rotate: parallaxTilt }}
                className="absolute right-10 sm:right-16 pointer-events-none"
              >
                <PixelStopProp specimenId="entomology-net" className="w-9 h-9" />
              </motion.div>
            </>
          )}

          {/* Lab -> Library */}
          {variant === 'lab-to-library' && (
            <>
              <motion.div
                style={{ x: runnerX, y: climbY }}
                className="relative z-10 flex items-center gap-1.5"
              >
                <div className="w-11 h-12">
                  <PixelResearcher stridePhase={1} isInspecting={false} className="w-full h-full" />
                </div>
                <div className="bg-[#FFFDF7] border-2 border-[#18261C] p-1.5 shadow-[2px_2px_0_#18261C]">
                  <BookOpen className="w-4 h-4 text-[#2E7D32]" />
                </div>
              </motion.div>
              <motion.div
                style={{ x: oppositeX, y: bobWaveY }}
                className="absolute right-10 sm:right-16 animate-bee-hover"
              >
                <PixelBeeIcon className="w-6 h-6" />
              </motion.div>
            </>
          )}

          {/* Library -> Awards */}
          {variant === 'library-to-awards' && (
            <>
              <motion.div
                style={{ x: runnerX, y: bobWaveY, rotate: parallaxTilt }}
                className="relative z-10 bg-[#FFFDF7] border-2 border-[#18261C] p-1.5 rounded-xl shadow-[3px_3px_0_#E59A00]"
              >
                <PixelTrophyIcon className="w-7 h-7" />
              </motion.div>
              <motion.div
                style={{ x: oppositeX, y: climbY }}
                className="relative z-10 bg-[#FFFDF7] border-2 border-[#18261C] p-1.5 rounded-xl shadow-[3px_3px_0_#2E7D32] ml-4"
              >
                <PixelPatentSealIcon className="w-7 h-7" />
              </motion.div>
            </>
          )}

          {/* Awards -> Photo Book */}
          {variant === 'awards-to-album' && (
            <>
              <motion.div
                style={{ x: runnerX, y: bobWaveY, rotate: parallaxTilt }}
                className="relative z-10 flex items-center gap-2"
              >
                <div className="bg-white border-2 border-[#18261C] p-1.5 -rotate-6 shadow-[3px_3px_0_#E59A00]">
                  <Camera className="w-5 h-5 text-[#18261C]" />
                </div>
                <div className="w-6 h-7 bg-[#FFFDF7] border-2 border-[#18261C] p-0.5 rotate-6 shadow-[2px_2px_0_#18261C] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#E59A00]" />
                </div>
              </motion.div>
              <motion.div
                style={{ x: oppositeX, y: climbY }}
                className="absolute right-12 sm:right-20 animate-bee-hover"
              >
                <PixelBeeIcon className="w-6 h-6" />
              </motion.div>
            </>
          )}

          {/* Photo Book -> Contact */}
          {variant === 'album-to-contact' && (
            <>
              <motion.div
                style={{ x: runnerX, y: bobWaveY }}
                className="relative z-10 flex items-center gap-2"
              >
                <div className="animate-bee-hover">
                  <PixelBeeIcon className="w-6 h-6" />
                </div>
                <div className="bg-[#FFFDF7] border-2 border-[#18261C] px-2.5 py-1.5 rounded-lg shadow-[3px_3px_0_#2E7D32]">
                  <Mail className="w-4 h-4 text-[#2E7D32]" />
                </div>
              </motion.div>
              <motion.div
                style={{ x: oppositeX, y: climbY }}
                className="relative z-10 w-10 h-11 opacity-90"
              >
                <PixelResearcher stridePhase={2} isInspecting={false} className="w-full h-full" />
              </motion.div>
            </>
          )}
        </div>

        {/* 3D Perspective Chapter Waypoint Sign */}
        <div style={{ perspective: '950px' }}>
          <motion.div
            style={{
              rotateX: signRotateX,
              y: signY,
              scale: signScale,
              opacity: signOpacity,
              transformOrigin: 'center bottom',
            }}
            className={`inline-flex items-center gap-3 bg-[#FFFDF7] border-2 border-[#18261C] ${meta.pillBorder} px-4 py-2`}
          >
            <span className="font-pixel text-xs font-bold bg-[#18261C] text-[#FFE066] px-2 py-1 leading-none">
              {meta.chapterTag}
            </span>
            <div className="text-left">
              <span className="block font-mono-tabular text-[10px] font-bold text-[#2E7D32] tracking-wider leading-tight">
                {meta.kicker}
              </span>
              <div className="flex items-center gap-1.5 font-pixel text-xs sm:text-sm font-bold text-[#18261C] mt-0.5 leading-tight">
                <span>{meta.title}</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#E59A00] shrink-0" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
