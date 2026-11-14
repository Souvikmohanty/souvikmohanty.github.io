import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { ArrowDown, BookOpen, Camera, Mail, Sparkles } from 'lucide-react';
import {
  PixelAmbientInsect,
  PixelBeeIcon,
  PixelHurdle,
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
  const [isHopping, setIsHopping] = useState(false);

  const { scrollYProgress } = useScroll({
    target: bridgeRef,
    offset: ['start 95%', 'end 20%'],
  });

  // Drive live pixel walking stride & hop state directly from scroll progress for hero-to-walk
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (variant !== 'hero-to-walk') return;
    setWalkStride(Math.floor(latest * 20) % 2 === 0 ? 1 : 2);
    setIsHopping(latest > 0.36 && latest < 0.62);
  });

  // Scroll-choreographed 3D transforms (compositor-only: transform & opacity)
  const runnerX = useTransform(scrollYProgress, [0, 1], [-155, 155]);
  const oppositeX = useTransform(scrollYProgress, [0, 1], [115, -115]);
  const hillsDriftX = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const butterflyX = useTransform(scrollYProgress, [0, 1], [120, -140]);
  const butterflyY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [10, -16, 4, -14]);
  const signRotateX = useTransform(scrollYProgress, [0, 0.48, 1], [34, 0, 0]);
  const signY = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -4]);
  const signScale = useTransform(scrollYProgress, [0, 0.55, 1], [0.88, 1.02, 1]);
  const signOpacity = useTransform(scrollYProgress, [0, 0.25, 0.88, 1], [0.25, 1, 1, 0.94]);
  const ribbonScaleX = useTransform(scrollYProgress, [0.05, 0.85], [0.04, 1]);
  const climbY = useTransform(scrollYProgress, [0, 0.5, 1], [16, -12, 8]);
  const bobWaveY = useTransform(scrollYProgress, [0, 0.5, 1], [10, -10, 6]);
  // Natural jog + playful jump over central trail pebble at 0.5
  const meadowJumpY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.38, 0.49, 0.6, 0.8, 1],
    [0, -5, 0, -34, 0, -5, 0],
  );
  const meadowJumpRotate = useTransform(
    scrollYProgress,
    [0, 0.38, 0.45, 0.49, 0.54, 0.6, 1],
    [0, 0, -8, 0, 6, 0, 0],
  );
  const parallaxTilt = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  if (variant === 'hero-to-walk') {
    return (
      <div
        ref={bridgeRef}
        aria-hidden="true"
        className="relative overflow-hidden bg-gradient-to-b from-[#E3F4FC]/70 via-[#E9F6FA]/55 to-[#CDE9D1]/70 pt-6 sm:pt-8 pb-0"
      >
        {/* Open-Air 3D Perspective Chapter Headline in the Sky */}
        <div
          style={{ perspective: '950px' }}
          className="relative z-20 max-w-[1160px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center mb-1"
        >
          <motion.div
            style={{
              rotateX: signRotateX,
              y: signY,
              scale: signScale,
              opacity: signOpacity,
              transformOrigin: 'center bottom',
            }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="font-pixel text-[11px] font-bold bg-[#18261C] text-[#FFE066] px-2 py-0.5 leading-none">
                {meta.chapterTag}
              </span>
              <span className="font-mono-tabular text-[11px] font-bold text-[#2E7D32] tracking-wider uppercase">
                {meta.kicker}
              </span>
            </div>
            <div className="flex items-center gap-2 font-pixel text-base sm:text-xl font-bold text-[#18261C]">
              <span>{meta.title}</span>
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex text-[#E59A00]"
              >
                <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Parallax Meadow Hills, Fluttering Butterfly & Clouds Behind Jogging Track */}
        <div className="relative h-28 sm:h-32 overflow-hidden">
          <motion.div
            style={{ x: hillsDriftX }}
            className="pointer-events-none max-w-[1280px] mx-auto relative h-full"
          >
            {/* Floating wispy clouds */}
            <svg
              viewBox="0 0 64 20"
              className="absolute top-1 left-[12%] w-24 h-7 pixel-render opacity-85"
              shapeRendering="crispEdges"
            >
              <rect x="10" y="6" width="38" height="8" fill="#FFFFFF" />
              <rect x="18" y="2" width="20" height="6" fill="#FFFFFF" />
              <rect x="10" y="13" width="38" height="2" fill="#D5EEF8" />
            </svg>
            <svg
              viewBox="0 0 48 16"
              className="hidden sm:block absolute top-2 right-[16%] w-20 h-6 pixel-render opacity-80"
              shapeRendering="crispEdges"
            >
              <rect x="6" y="6" width="34" height="6" fill="#FFFFFF" />
              <rect x="14" y="2" width="16" height="5" fill="#FFFDF7" />
            </svg>

            {/* Animated fluttering butterfly crossing the meadow */}
            <motion.div
              style={{ x: butterflyX, y: butterflyY }}
              className="absolute top-5 left-1/2 animate-bee-hover"
            >
              <PixelAmbientInsect kind="butterfly" className="w-6 h-5 sm:w-7 sm:h-6" />
            </motion.div>

            {/* Layered distant emerald ridges */}
            <svg
              viewBox="0 0 1200 90"
              preserveAspectRatio="none"
              className="absolute bottom-0 inset-x-0 w-full h-16 sm:h-20"
            >
              <polygon
                points="0,90 0,58 140,42 300,60 470,30 650,52 840,26 1020,48 1200,32 1200,90"
                fill="#A7D4AB"
                opacity="0.75"
              />
              <polygon
                points="0,90 0,70 180,58 360,72 560,46 760,64 960,44 1200,58 1200,90"
                fill="#76B681"
                opacity="0.85"
              />
            </svg>
          </motion.div>

          {/* Foreground Jogging Track Seated Right on the Hillside Turf */}
          <div className="absolute inset-x-0 bottom-0 z-10 max-w-[1160px] mx-auto px-4 sm:px-6 h-20 flex items-end justify-center">
            {/* Scroll-filled emerald meadow path line */}
            <div className="absolute bottom-1 inset-x-6 sm:inset-x-24 h-1.5 rounded-full bg-[#DCEAD6]/80 overflow-hidden">
              <motion.div
                style={{ scaleX: ribbonScaleX }}
                className="w-full h-full bg-gradient-to-r from-[#2E7D32] via-[#4CAF50] to-[#E59A00] origin-left"
              />
            </div>

            {/* Left stone & wildflowers */}
            <div className="absolute bottom-1 left-8 sm:left-28 flex items-end gap-2 opacity-90">
              <PixelAmbientInsect kind="stone" className="w-5 h-4" />
              <svg viewBox="0 0 20 14" className="w-6 h-4 pixel-render" shapeRendering="crispEdges">
                <rect x="4" y="6" width="2" height="8" fill="#2E7D32" />
                <rect x="3" y="3" width="4" height="3" fill="#F2B705" />
                <rect x="13" y="8" width="2" height="6" fill="#388E3C" />
                <rect x="12" y="5" width="4" height="3" fill="#F4A6BE" />
              </svg>
            </div>

            {/* Central trail hurdle stone that Souvik hops over mid-scroll */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
              <PixelHurdle variant={0} className="w-10 h-6 sm:w-12 sm:h-7" />
            </div>

            {/* Counter-drifting entomology net */}
            <motion.div
              style={{ x: oppositeX, rotate: parallaxTilt }}
              className="absolute bottom-1 right-8 sm:right-28 flex items-end gap-2 opacity-90"
            >
              <PixelStopProp specimenId="entomology-net" className="w-8 h-8 sm:w-9 sm:h-9" />
            </motion.div>

            {/* Walking & Hopping Pixel Souvik + Bee */}
            <motion.div
              style={{ x: runnerX, y: meadowJumpY, rotate: meadowJumpRotate }}
              className="relative z-10 flex items-end gap-1 mb-0.5"
            >
              <div className="w-12 h-14 sm:w-14 sm:h-16">
                <PixelResearcher
                  stridePhase={walkStride}
                  isInspecting={false}
                  isJumping={isHopping}
                  className="w-full h-full"
                />
              </div>
              <div className="animate-bee-hover mb-8">
                <PixelBeeIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Lush Emerald Grass Rim Melting Smoothly Into Field Walk Stage */}
        <div className="h-2.5 bg-gradient-to-r from-[#4CAF50] via-[#66BB6A] to-[#4CAF50]" />
      </div>
    );
  }

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
