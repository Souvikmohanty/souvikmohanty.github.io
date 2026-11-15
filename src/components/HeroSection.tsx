import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import {
  PixelBeeIcon,
  PixelResearcher,
  PixelStopProp,
  type ResearcherEmote,
} from './PixelSprites';

interface HeroSectionProps {
  onStartWalk: (stopIndex?: number) => void;
}

const SIMPLE_HERO_POSES: ResearcherEmote[] = ['wave', 'stand', 'inspect', 'stand'];

export function HeroSection({ onStartWalk }: HeroSectionProps) {
  const [heroNote, setHeroNote] = useState<'idle' | 'bee' | 'souvik'>('idle');
  const [poseIdx, setPoseIdx] = useState(0);

  useEffect(() => {
    if (heroNote !== 'idle') return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setPoseIdx((prev) => (prev + 1) % SIMPLE_HERO_POSES.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [heroNote]);

  const displayEmote: ResearcherEmote =
    heroNote === 'bee'
      ? 'inspect'
      : heroNote === 'souvik'
        ? 'wave'
        : SIMPLE_HERO_POSES[poseIdx];

  return (
    <section
      id="top"
      className="relative overflow-x-clip bg-transparent"
    >
      <div className="relative">
        {/* Lush Layered Imphal Valley Hills & Misty Mountain Ridges across horizon */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-44 sm:h-56 overflow-hidden opacity-95"
        >
          <svg
            viewBox="0 0 1200 180"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="heroFarPeak" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9ED1BC" />
                <stop offset="100%" stopColor="#D6EFE0" />
              </linearGradient>
              <linearGradient id="heroMidHill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#77B98D" />
                <stop offset="100%" stopColor="#A9D8B5" />
              </linearGradient>
              <linearGradient id="heroNearHill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#529563" />
                <stop offset="100%" stopColor="#76B483" />
              </linearGradient>
            </defs>

            {/* Layer 1: High distant misty Manipur mountain peaks */}
            <polygon
              points="0,180 0,118 95,86 210,116 345,58 490,104 645,44 795,92 940,34 1075,78 1165,54 1200,68 1200,180"
              fill="url(#heroFarPeak)"
            />
            {/* Sunlit left slopes on far peaks */}
            <polygon points="345,58 310,100 345,76" fill="#BCE5CE" opacity="0.7" />
            <polygon points="645,44 595,94 645,66" fill="#BCE5CE" opacity="0.75" />
            <polygon points="940,34 888,88 940,56" fill="#C4EAD4" opacity="0.8" />

            {/* Layer 2: Rolling forested Imphal valley hills */}
            <polygon
              points="0,180 0,136 130,102 275,134 425,84 565,124 720,76 870,114 1020,66 1135,98 1200,82 1200,180"
              fill="url(#heroMidHill)"
            />
            {/* Sunlit forest ridge highlights */}
            <polygon points="425,84 378,120 432,98" fill="#95D0A4" opacity="0.65" />
            <polygon points="720,76 672,112 728,90" fill="#95D0A4" opacity="0.65" />
            <polygon points="1020,66 968,104 1026,82" fill="#9FD7AC" opacity="0.7" />

            {/* Subtle distant pixel pine/tree silhouettes along mid ridge */}
            {[124, 134, 418, 428, 712, 722, 732, 1010, 1022, 1032].map((tx, idx) => {
              const ty = tx < 200 ? 96 : tx < 500 ? 78 : tx < 800 ? 70 : 60;
              return (
                <g key={tx} opacity="0.85">
                  <rect x={tx} y={ty + (idx % 2) * 3} width="8" height="10" fill="#5FA372" />
                  <rect x={tx + 2} y={ty - 4 + (idx % 2) * 3} width="4" height="4" fill="#5FA372" />
                </g>
              );
            })}

            {/* Layer 3: Lush emerald foothills behind the meadow fence & Souvik */}
            <polygon
              points="0,180 0,154 170,132 340,154 510,122 680,146 845,112 995,138 1125,116 1200,132 1200,180"
              fill="url(#heroNearHill)"
            />
            {/* Soft valley mist band between near & far hills */}
            <rect x="0" y="150" width="1200" height="30" fill="#E6F4EA" opacity="0.18" />
          </svg>
        </div>

      <div className="relative z-10 max-w-[1160px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          {/* Left: Bold Minimalist Retro Headline + Field-Diary Bio */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 pb-4 lg:pb-12"
          >
            <p className="font-mono-tabular text-xs sm:text-sm font-bold text-[#2E7D32] mb-3">
              Agricultural Entomology · CAU Imphal · Ph.D. Scholar
            </p>

            <h1
              className="font-pixel text-4xl sm:text-6xl lg:text-[4.25rem] font-bold tracking-tight text-[#18261C] leading-[1.02] mb-5"
              style={{ textWrap: 'balance' }}
            >
              Souvik’s{' '}
              <span className="text-[#2E7D32]">Digital Diary</span>
            </h1>

            <p className="font-mono-tabular text-[13.5px] sm:text-[15px] text-[#1E2E22] leading-[1.75] max-w-[54ch] mb-8">
              I am Souvik, an Entomologist dedicated to studying insects, their behaviour, and
              their role in stabilizing modern agricultural ecosystems—centering my work on the
              first biological documentation of the stingless bee{' '}
              <em className="italic font-bold text-[#2E7D32]">Tetragonula srikantanathi</em>,
              bamboo hives, and crop pollination in Northeast India.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onStartWalk(-1)}
                data-cursor="Start walk"
                className="inline-flex items-center gap-2.5 px-6 py-3 text-sm sm:text-base font-bold text-[#18261C] bg-[#E59A00] hover:bg-[#F2B705] border-2 border-[#18261C] pixel-box-sm transition-transform active:translate-x-[2px] active:translate-y-[2px] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span className="font-pixel text-base">Start the Field Walk</span>
                <ArrowDown className="w-4 h-4 animate-bounce shrink-0" aria-hidden="true" />
              </button>

              <a
                href="#publications"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-sm sm:text-base font-semibold text-[#18261C] hover:text-[#2E7D32] underline decoration-2 underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                <span>Read Papers</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* Right: Grounded Pixel Meadow Scene (Flush onto Grass Strip!) */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex flex-col items-center lg:items-end justify-end pt-4 pb-0"
          >
            {/* Interactive Pixel Speech Bubble */}
            <div className="mb-3 min-h-[38px] flex items-center justify-center lg:justify-end">
              <div className="px-3.5 py-1.5 bg-[#FFFDF7] border-2 border-[#18261C] pixel-box-sm font-pixel text-xs sm:text-sm text-[#18261C]">
                {heroNote === 'bee'
                  ? 'Tetragonula srikantanathi — gentle & stingless!'
                  : heroNote === 'souvik'
                    ? 'Scroll down to walk my 6 field stops!'
                    : 'Click a bee or scroll to explore'}
              </div>
            </div>

            {/* Grounded Diorama Container — sits directly on the grass border */}
            <div className="relative w-full max-w-[440px] h-[220px] sm:h-[245px] flex items-end justify-between px-2">
              {/* 16-Bit Shaded Pixel Clouds */}
              <div className="absolute top-0 left-3 pointer-events-none" aria-hidden="true">
                <svg viewBox="0 0 40 20" className="w-24 h-12 pixel-render opacity-95" shapeRendering="crispEdges">
                  {/* Soft sky-slate contour */}
                  <rect x="12" y="3" width="14" height="1" fill="#77A7BF" />
                  <rect x="8" y="4" width="4" height="2" fill="#77A7BF" />
                  <rect x="26" y="4" width="5" height="2" fill="#77A7BF" />
                  <rect x="4" y="6" width="4" height="3" fill="#77A7BF" />
                  <rect x="31" y="6" width="5" height="3" fill="#77A7BF" />
                  <rect x="2" y="9" width="2" height="5" fill="#77A7BF" />
                  <rect x="36" y="9" width="2" height="5" fill="#77A7BF" />
                  <rect x="4" y="14" width="32" height="1" fill="#6594AD" />
                  {/* Main cumulus body */}
                  <rect x="12" y="4" width="14" height="4" fill="#FFFFFF" />
                  <rect x="8" y="6" width="23" height="4" fill="#FFFFFF" />
                  <rect x="4" y="9" width="32" height="4" fill="#F2FAFE" />
                  {/* Warm specular puff & cool underside shading */}
                  <rect x="14" y="5" width="8" height="2" fill="#FFFFFF" />
                  <rect x="7" y="11" width="26" height="2" fill="#DDF0F9" />
                  <rect x="4" y="13" width="32" height="1" fill="#BCE0F1" />
                </svg>
              </div>
              <div className="hidden sm:block absolute top-5 right-36 pointer-events-none" aria-hidden="true">
                <svg viewBox="0 0 28 14" className="w-16 h-8 pixel-render opacity-85" shapeRendering="crispEdges">
                  <rect x="8" y="3" width="10" height="1" fill="#82AFC5" />
                  <rect x="5" y="4" width="3" height="2" fill="#82AFC5" />
                  <rect x="18" y="4" width="4" height="2" fill="#82AFC5" />
                  <rect x="3" y="6" width="2" height="4" fill="#82AFC5" />
                  <rect x="22" y="6" width="2" height="4" fill="#82AFC5" />
                  <rect x="5" y="10" width="17" height="1" fill="#73A1B8" />
                  <rect x="8" y="4" width="10" height="4" fill="#FFFFFF" />
                  <rect x="5" y="6" width="17" height="3" fill="#F2FAFE" />
                  <rect x="5" y="9" width="17" height="1" fill="#C4E5F4" />
                </svg>
              </div>

              {/* Wooden Garden Fence & Bamboo Clump behind right props */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 flex items-end justify-between pointer-events-none px-1"
              >
                {/* Left wildflowers & shaded clover tuft (16-bit outlined) */}
                <svg viewBox="0 0 36 22" className="w-14 h-9 pixel-render" shapeRendering="crispEdges">
                  {/* Outline */}
                  <rect x="4" y="9" width="6" height="5" fill="#1E1B2A" />
                  <rect x="6" y="14" width="2" height="8" fill="#1E1B2A" />
                  <rect x="17" y="7" width="6" height="5" fill="#1E1B2A" />
                  <rect x="19" y="12" width="2" height="10" fill="#1E1B2A" />
                  <rect x="27" y="11" width="5" height="4" fill="#1E1B2A" />
                  <rect x="29" y="15" width="2" height="7" fill="#1E1B2A" />
                  {/* Grass blades */}
                  <rect x="2" y="17" width="3" height="5" fill="#255C2B" />
                  <rect x="3" y="16" width="2" height="6" fill="#4CAF50" />
                  <rect x="11" y="15" width="3" height="7" fill="#255C2B" />
                  <rect x="12" y="14" width="2" height="8" fill="#66BB6A" />
                  <rect x="23" y="16" width="3" height="6" fill="#255C2B" />
                  <rect x="24" y="15" width="2" height="7" fill="#66BB6A" />
                  {/* Stems & leaves */}
                  <rect x="6" y="14" width="2" height="8" fill="#388E3C" />
                  <rect x="19" y="12" width="2" height="10" fill="#2E7D32" />
                  <rect x="29" y="15" width="2" height="7" fill="#388E3C" />
                  {/* Blossoms */}
                  <rect x="5" y="10" width="4" height="3" fill="#F2B705" />
                  <rect x="6" y="10" width="2" height="2" fill="#FFF3B0" />
                  <rect x="18" y="8" width="4" height="3" fill="#FFFDF7" />
                  <rect x="19" y="9" width="2" height="1" fill="#F2B705" />
                  <rect x="28" y="12" width="3" height="2" fill="#F4A6BE" />
                </svg>

                {/* Center 16-bit wooden garden fence with bevels, nails & climbing vine */}
                <svg viewBox="0 0 92 32" className="w-40 h-14 pixel-render opacity-95" shapeRendering="crispEdges">
                  {/* Dark #1E1B2A silhouette for fence rails */}
                  <rect x="0" y="11" width="92" height="6" fill="#1E1B2A" />
                  <rect x="0" y="20" width="92" height="6" fill="#1E1B2A" />
                  {/* Posts outline */}
                  <rect x="5" y="6" width="8" height="26" fill="#1E1B2A" />
                  <rect x="29" y="6" width="8" height="26" fill="#1E1B2A" />
                  <rect x="53" y="6" width="8" height="26" fill="#1E1B2A" />
                  <rect x="77" y="6" width="8" height="26" fill="#1E1B2A" />
                  {/* Post caps */}
                  <rect x="6" y="5" width="6" height="2" fill="#1E1B2A" />
                  <rect x="30" y="5" width="6" height="2" fill="#1E1B2A" />
                  <rect x="54" y="5" width="6" height="2" fill="#1E1B2A" />
                  <rect x="78" y="5" width="6" height="2" fill="#1E1B2A" />
                  {/* Horizontal rails fill + highlight + underside shadow */}
                  <rect x="1" y="12" width="90" height="4" fill="#9C7350" />
                  <rect x="1" y="12" width="90" height="1" fill="#C49B66" />
                  <rect x="1" y="15" width="90" height="1" fill="#6D4C3D" />
                  <rect x="1" y="21" width="90" height="4" fill="#9C7350" />
                  <rect x="1" y="21" width="90" height="1" fill="#C49B66" />
                  <rect x="1" y="24" width="90" height="1" fill="#6D4C3D" />
                  {/* Vertical posts fill + sunlit left edge + shadow right edge */}
                  {[6, 30, 54, 78].map((px) => (
                    <g key={px}>
                      <rect x={px} y="7" width="6" height="25" fill="#8D6E63" />
                      <rect x={px} y="7" width="2" height="25" fill="#B68B60" />
                      <rect x={px + 4} y="7" width="2" height="25" fill="#5D4037" />
                      <rect x={px + 1} y="6" width="4" height="1" fill="#C49B66" />
                      {/* Iron nail heads */}
                      <rect x={px + 2} y="13" width="2" height="2" fill="#3B281B" />
                      <rect x={px + 2} y="22" width="2" height="2" fill="#3B281B" />
                    </g>
                  ))}
                  {/* Climbing green vine pixels on third post */}
                  <rect x="52" y="16" width="5" height="3" fill="#1E1B2A" />
                  <rect x="55" y="19" width="6" height="4" fill="#1E1B2A" />
                  <rect x="53" y="17" width="3" height="2" fill="#66BB6A" />
                  <rect x="56" y="20" width="4" height="2" fill="#388E3C" />
                  <rect x="57" y="20" width="2" height="1" fill="#8CE07A" />
                </svg>

                {/* Right 16-bit outlined bamboo grove with nodes & leaf clusters */}
                <svg viewBox="0 0 36 52" className="w-16 h-24 pixel-render opacity-95" shapeRendering="crispEdges">
                  {/* Left taller bamboo culm */}
                  <rect x="7" y="3" width="7" height="49" fill="#1E1B2A" />
                  <rect x="8" y="4" width="5" height="48" fill="#388E3C" />
                  <rect x="8" y="4" width="2" height="48" fill="#66BB6A" />
                  <rect x="12" y="4" width="1" height="48" fill="#255C2B" />
                  <rect x="7" y="14" width="7" height="2" fill="#1E1B2A" />
                  <rect x="8" y="13" width="5" height="1" fill="#A5D6A7" />
                  <rect x="7" y="27" width="7" height="2" fill="#1E1B2A" />
                  <rect x="8" y="26" width="5" height="1" fill="#A5D6A7" />
                  <rect x="7" y="40" width="7" height="2" fill="#1E1B2A" />
                  {/* Right medium bamboo culm */}
                  <rect x="18" y="11" width="7" height="41" fill="#1E1B2A" />
                  <rect x="19" y="12" width="5" height="40" fill="#4CAF50" />
                  <rect x="19" y="12" width="2" height="40" fill="#8CE07A" />
                  <rect x="23" y="12" width="1" height="40" fill="#255C2B" />
                  <rect x="18" y="23" width="7" height="2" fill="#1E1B2A" />
                  <rect x="19" y="22" width="5" height="1" fill="#C8E6C9" />
                  <rect x="18" y="36" width="7" height="2" fill="#1E1B2A" />
                  {/* Outlined bamboo leaf sprays */}
                  <rect x="1" y="7" width="7" height="4" fill="#1E1B2A" />
                  <rect x="2" y="8" width="5" height="2" fill="#66BB6A" />
                  <rect x="2" y="8" width="3" height="1" fill="#A5D6A7" />
                  <rect x="13" y="8" width="7" height="4" fill="#1E1B2A" />
                  <rect x="14" y="9" width="5" height="2" fill="#66BB6A" />
                  <rect x="24" y="15" width="8" height="4" fill="#1E1B2A" />
                  <rect x="25" y="16" width="6" height="2" fill="#74C365" />
                  <rect x="26" y="16" width="3" height="1" fill="#A5D6A7" />
                  <rect x="24" y="26" width="6" height="4" fill="#1E1B2A" />
                  <rect x="25" y="27" width="4" height="2" fill="#4CAF50" />
                </svg>
              </div>

              {/* Hovering Interactive Bees */}
              <button
                type="button"
                onMouseEnter={() => setHeroNote('bee')}
                onMouseLeave={() => setHeroNote('idle')}
                onClick={() => onStartWalk(2)}
                data-cursor="Inspect bee"
                aria-label="Inspect stingless bee research"
                className="absolute top-8 right-24 animate-bee-hover cursor-pointer p-1 focus-visible:outline-2 focus-visible:outline-[#18261C]"
              >
                <PixelBeeIcon className="w-8 h-8" />
              </button>
              <button
                type="button"
                onMouseEnter={() => setHeroNote('bee')}
                onMouseLeave={() => setHeroNote('idle')}
                onClick={() => onStartWalk(2)}
                data-cursor="Inspect bee"
                aria-label="Inspect stingless bee research"
                className="absolute top-16 right-8 animate-bee-hover cursor-pointer p-1 focus-visible:outline-2 focus-visible:outline-[#18261C]"
                style={{ animationDelay: '0.85s' }}
              >
                <PixelBeeIcon className="w-6 h-6" />
              </button>

              {/* Foreground Characters & Flowers seated flush on ground (-mb-1 overlaps top grass edge cleanly) */}
              <div className="relative z-10 w-full flex items-end justify-between -mb-[3px]">
                {/* Left Mustard Cluster */}
                <button
                  type="button"
                  onMouseEnter={() => setHeroNote('bee')}
                  onMouseLeave={() => setHeroNote('idle')}
                  onClick={() => onStartWalk(3)}
                  aria-label="Jump to mustard pollination trials"
                  className="cursor-pointer transition-transform hover:-translate-y-1 shrink-0"
                >
                  <PixelStopProp specimenId="mustard-blossom" className="w-16 h-16 sm:w-20 sm:h-20" />
                </button>

                {/* Small outlined grass & flower tuft between left flowers and Souvik */}
                <svg
                  viewBox="0 0 26 18"
                  aria-hidden="true"
                  className="w-9 h-6 pixel-render shrink-0 -mx-2"
                  shapeRendering="crispEdges"
                >
                  <rect x="3" y="4" width="6" height="5" fill="#1E1B2A" />
                  <rect x="5" y="9" width="2" height="9" fill="#1E1B2A" />
                  <rect x="17" y="3" width="6" height="5" fill="#1E1B2A" />
                  <rect x="19" y="8" width="2" height="10" fill="#1E1B2A" />
                  <rect x="11" y="10" width="4" height="8" fill="#255C2B" />
                  <rect x="12" y="9" width="2" height="9" fill="#66BB6A" />
                  <rect x="5" y="9" width="2" height="9" fill="#388E3C" />
                  <rect x="4" y="5" width="4" height="3" fill="#FFFDF7" />
                  <rect x="5" y="6" width="2" height="1" fill="#F2B705" />
                  <rect x="19" y="8" width="2" height="10" fill="#2E7D32" />
                  <rect x="18" y="4" width="4" height="3" fill="#F2B705" />
                  <rect x="19" y="4" width="2" height="1" fill="#FFF3B0" />
                </svg>

                {/* Souvik standing squarely on the path */}
                <button
                  type="button"
                  onMouseEnter={() => setHeroNote('souvik')}
                  onMouseLeave={() => setHeroNote('idle')}
                  onClick={() => onStartWalk(0)}
                  data-cursor="Walk trail"
                  aria-label="Start field walk with Souvik"
                  className="w-24 h-28 sm:w-28 sm:h-32 cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-[#18261C]"
                >
                  <PixelResearcher
                    stridePhase={0}
                    isInspecting={displayEmote === 'inspect'}
                    emote={displayEmote}
                    className="w-full h-full"
                  />
                </button>

                {/* Small outlined flower patch between Souvik and hive */}
                <svg
                  viewBox="0 0 26 18"
                  aria-hidden="true"
                  className="w-9 h-6 pixel-render shrink-0 -mx-2"
                  shapeRendering="crispEdges"
                >
                  <rect x="2" y="5" width="6" height="5" fill="#1E1B2A" />
                  <rect x="4" y="10" width="2" height="8" fill="#1E1B2A" />
                  <rect x="16" y="4" width="6" height="5" fill="#1E1B2A" />
                  <rect x="18" y="9" width="2" height="9" fill="#1E1B2A" />
                  <rect x="10" y="11" width="4" height="7" fill="#255C2B" />
                  <rect x="11" y="10" width="2" height="8" fill="#66BB6A" />
                  <rect x="4" y="10" width="2" height="8" fill="#388E3C" />
                  <rect x="3" y="6" width="4" height="3" fill="#F2B705" />
                  <rect x="4" y="6" width="2" height="1" fill="#FFF3B0" />
                  <rect x="18" y="9" width="2" height="9" fill="#2E7D32" />
                  <rect x="17" y="5" width="4" height="3" fill="#FF8A65" />
                  <rect x="18" y="6" width="2" height="1" fill="#FFE0B2" />
                </svg>

                {/* Mustard + Bamboo Hive */}
                <div className="flex items-end shrink-0">
                  <button
                    type="button"
                    onMouseEnter={() => setHeroNote('bee')}
                    onMouseLeave={() => setHeroNote('idle')}
                    onClick={() => onStartWalk(2)}
                    data-cursor="Bamboo hives"
                    aria-label="Jump to bamboo hive research"
                    className="cursor-pointer transition-transform hover:-translate-y-1"
                  >
                    <PixelStopProp specimenId="stingless-bee" className="w-20 h-20 sm:w-24 sm:h-24" />
                  </button>
                  <button
                    type="button"
                    onMouseEnter={() => setHeroNote('bee')}
                    onMouseLeave={() => setHeroNote('idle')}
                    onClick={() => onStartWalk(3)}
                    data-cursor="Mustard trials"
                    aria-label="Jump to mustard pollination trials"
                    className="hidden sm:block cursor-pointer transition-transform hover:-translate-y-1 -ml-3"
                  >
                    <PixelStopProp specimenId="mustard-blossom" className="w-16 h-16" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </div>

      {/* Continuous 16-Bit Pixel Turf + Textured Subsoil Ledge */}
      <div className="relative z-20 w-full" aria-hidden="true">
        <div
          className="h-5 w-full relative overflow-hidden"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 16' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='64' height='2' fill='%231E1B2A'/%3E%3Crect x='0' y='2' width='64' height='2' fill='%2374C365'/%3E%3Crect x='0' y='4' width='64' height='5' fill='%234A934A'/%3E%3Crect x='0' y='9' width='64' height='3' fill='%232D6B35'/%3E%3Crect x='0' y='12' width='64' height='4' fill='%23255C2B'/%3E%3Crect x='6' y='2' width='4' height='2' fill='%239BE888'/%3E%3Crect x='24' y='2' width='6' height='2' fill='%239BE888'/%3E%3Crect x='46' y='2' width='4' height='2' fill='%239BE888'/%3E%3Crect x='14' y='5' width='5' height='3' fill='%23387D3A'/%3E%3Crect x='36' y='4' width='6' height='3' fill='%23387D3A'/%3E%3Crect x='54' y='6' width='4' height='3' fill='%23387D3A'/%3E%3Crect x='11' y='2' width='2' height='2' fill='%23F2B705'/%3E%3Crect x='33' y='3' width='2' height='2' fill='%23FFFDF7'/%3E%3Crect x='51' y='2' width='2' height='2' fill='%23F4A6BE'/%3E%3Crect x='8' y='11' width='4' height='2' fill='%234A934A'/%3E%3Crect x='28' y='11' width='5' height='2' fill='%234A934A'/%3E%3Crect x='48' y='11' width='4' height='2' fill='%234A934A'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-x',
            backgroundSize: '80px 20px',
            imageRendering: 'pixelated',
          }}
        />
        <div
          className="h-3.5 w-full border-b-3 border-[#1E1B2A]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 12' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='64' height='12' fill='%235D4037'/%3E%3Crect x='0' y='0' width='64' height='2' fill='%233B281B'/%3E%3Crect x='10' y='4' width='6' height='4' fill='%231E1B2A'/%3E%3Crect x='11' y='5' width='4' height='2' fill='%2378909C'/%3E%3Crect x='11' y='5' width='2' height='1' fill='%23B0BEC5'/%3E%3Crect x='26' y='5' width='8' height='2' fill='%23452D24'/%3E%3Crect x='42' y='3' width='5' height='4' fill='%231E1B2A'/%3E%3Crect x='43' y='4' width='3' height='2' fill='%238D6E63'/%3E%3Crect x='54' y='7' width='6' height='2' fill='%23452D24'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-x',
            backgroundSize: '80px 14px',
            imageRendering: 'pixelated',
          }}
        />
      </div>
    </section>
  );
}
