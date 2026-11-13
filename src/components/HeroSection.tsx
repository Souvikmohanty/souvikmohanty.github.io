import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { FIELD_MILESTONES } from '../data/portfolioData';
import { PixelBeeIcon, PixelResearcher, PixelStopProp } from './PixelSprites';

interface HeroSectionProps {
  onStartWalk: (stopIndex?: number) => void;
}

export function HeroSection({ onStartWalk }: HeroSectionProps) {
  const [heroNote, setHeroNote] = useState<'idle' | 'bee' | 'souvik'>('idle');

  return (
    <section
      id="top"
      className="relative overflow-x-clip bg-transparent"
    >
      {/* Subtle Distant Pixel Hills across lower horizon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[58px] sm:bottom-[52px] h-28 sm:h-36 overflow-hidden opacity-85"
      >
        <svg
          viewBox="0 0 1200 140"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <polygon
            points="0,140 0,95 140,68 290,104 460,55 620,92 780,44 950,84 1090,48 1200,76 1200,140"
            fill="#A6D1AE"
          />
          <polygon
            points="0,140 0,112 190,88 370,118 540,80 710,108 880,70 1040,100 1200,78 1200,140"
            fill="#76B282"
          />
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
              {/* Pixel Cloud */}
              <div className="absolute top-0 left-4 pointer-events-none" aria-hidden="true">
                <svg viewBox="0 0 32 14" className="w-20 h-9 pixel-render opacity-95" shapeRendering="crispEdges">
                  <rect x="6" y="4" width="18" height="7" fill="#FFFFFF" />
                  <rect x="3" y="6" width="26" height="5" fill="#FFFFFF" />
                  <rect x="10" y="2" width="10" height="4" fill="#FFFFFF" />
                </svg>
              </div>

              {/* Wooden Garden Fence & Bamboo Clump behind right props */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 flex items-end justify-between pointer-events-none px-1"
              >
                {/* Left wildflowers & grass tuft */}
                <svg viewBox="0 0 32 20" className="w-12 h-8 pixel-render" shapeRendering="crispEdges">
                  <rect x="4" y="12" width="2" height="8" fill="#2E7D32" />
                  <rect x="3" y="10" width="4" height="3" fill="#F2B705" />
                  <rect x="10" y="14" width="2" height="6" fill="#388E3C" />
                  <rect x="16" y="11" width="2" height="9" fill="#2E7D32" />
                  <rect x="15" y="9" width="4" height="3" fill="#FFFDF7" />
                  <rect x="24" y="15" width="2" height="5" fill="#4CAF50" />
                </svg>

                {/* Center wooden garden fence */}
                <svg viewBox="0 0 80 28" className="w-36 h-12 pixel-render opacity-90" shapeRendering="crispEdges">
                  <rect x="6" y="6" width="4" height="22" fill="#7D5A3C" />
                  <rect x="28" y="6" width="4" height="22" fill="#7D5A3C" />
                  <rect x="50" y="6" width="4" height="22" fill="#7D5A3C" />
                  <rect x="72" y="6" width="4" height="22" fill="#7D5A3C" />
                  <rect x="0" y="11" width="80" height="3" fill="#9C7350" />
                  <rect x="0" y="19" width="80" height="3" fill="#9C7350" />
                </svg>

                {/* Right bamboo grove */}
                <svg viewBox="0 0 28 48" className="w-12 h-24 pixel-render opacity-85" shapeRendering="crispEdges">
                  <rect x="6" y="4" width="4" height="44" fill="#3C8D40" />
                  <rect x="6" y="16" width="4" height="1" fill="#256029" />
                  <rect x="6" y="30" width="4" height="1" fill="#256029" />
                  <rect x="14" y="10" width="4" height="38" fill="#4CAF50" />
                  <rect x="14" y="24" width="4" height="1" fill="#256029" />
                  <rect x="2" y="8" width="4" height="2" fill="#66BB6A" />
                  <rect x="18" y="14" width="5" height="2" fill="#66BB6A" />
                </svg>
              </div>

              {/* Hovering Interactive Bees */}
              <button
                type="button"
                onMouseEnter={() => setHeroNote('bee')}
                onMouseLeave={() => setHeroNote('idle')}
                onClick={() => onStartWalk(2)}
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

                {/* Small grass & flower tuft between left flowers and Souvik */}
                <svg
                  viewBox="0 0 24 16"
                  aria-hidden="true"
                  className="w-8 h-5 pixel-render shrink-0 -mx-2"
                  shapeRendering="crispEdges"
                >
                  <rect x="4" y="8" width="2" height="8" fill="#2E7D32" />
                  <rect x="3" y="5" width="4" height="3" fill="#FFFDF7" />
                  <rect x="12" y="10" width="2" height="6" fill="#388E3C" />
                  <rect x="18" y="7" width="2" height="9" fill="#2E7D32" />
                  <rect x="17" y="4" width="4" height="3" fill="#F2B705" />
                </svg>

                {/* Souvik standing squarely on the path */}
                <button
                  type="button"
                  onMouseEnter={() => setHeroNote('souvik')}
                  onMouseLeave={() => setHeroNote('idle')}
                  onClick={() => onStartWalk(0)}
                  aria-label="Start field walk with Souvik"
                  className="w-24 h-28 sm:w-28 sm:h-32 cursor-pointer transition-transform hover:-translate-y-1 shrink-0 focus-visible:outline-2 focus-visible:outline-[#18261C]"
                >
                  <PixelResearcher
                    stridePhase={0}
                    isInspecting={heroNote !== 'idle'}
                    className="w-full h-full"
                  />
                </button>

                {/* Small flower patch between Souvik and hive */}
                <svg
                  viewBox="0 0 24 16"
                  aria-hidden="true"
                  className="w-8 h-5 pixel-render shrink-0 -mx-2"
                  shapeRendering="crispEdges"
                >
                  <rect x="3" y="9" width="2" height="7" fill="#2E7D32" />
                  <rect x="2" y="6" width="4" height="3" fill="#F2B705" />
                  <rect x="11" y="11" width="2" height="5" fill="#4CAF50" />
                  <rect x="17" y="8" width="2" height="8" fill="#2E7D32" />
                  <rect x="16" y="5" width="4" height="3" fill="#FF8A65" />
                </svg>

                {/* Mustard + Bamboo Hive */}
                <div className="flex items-end shrink-0">
                  <button
                    type="button"
                    onMouseEnter={() => setHeroNote('bee')}
                    onMouseLeave={() => setHeroNote('idle')}
                    onClick={() => onStartWalk(2)}
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

      {/* Continuous Ground Turf + Soil Band + Minimalist Chapter Index */}
      <div className="relative z-20 w-full">
        {/* Pixel Grass Turf with Flowers & Soil Edge */}
        <div className="h-4 bg-[#4CAF50] border-t-3 border-[#18261C] relative overflow-hidden" aria-hidden="true">
          <div className="max-w-[1160px] mx-auto h-full flex items-center justify-around opacity-55">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} className="w-3 h-1 bg-[#2E7D32]" />
            ))}
          </div>
        </div>
        <div className="h-2.5 bg-[#543B28] border-b-2 border-[#18261C]" aria-hidden="true" />

        {/* Open-Air Non-Boxy Field Walk Trail Index */}
        <div className="bg-[#FFFDF7] border-b-2 border-[#18261C]/15">
          <div className="max-w-[1160px] mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between gap-2 mb-2.5 lg:hidden">
              <span className="font-mono-tabular text-[10px] font-bold tracking-wider text-[#2E7D32] uppercase">
                Field Trail Stops
              </span>
              <span className="font-mono-tabular text-[10px] text-[#4C6050]">
                Tap to jump
              </span>
            </div>

            <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-center lg:justify-between gap-x-4 gap-y-3">
              {/* Subtle connecting dotted trail line across desktop */}
              <div
                aria-hidden="true"
                className="hidden lg:block absolute left-3 right-3 top-1/2 -translate-y-1/2 border-t-2 border-dotted border-[#18261C]/20 pointer-events-none"
              />

              {FIELD_MILESTONES.map((stop, idx) => (
                <motion.button
                  key={stop.id}
                  type="button"
                  onClick={() => onStartWalk(idx)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.04 * idx }}
                  whileHover={{ x: 2 }}
                  className="group relative z-10 flex items-center gap-2 text-left cursor-pointer py-0.5 lg:bg-[#FFFDF7] lg:px-2 min-w-0"
                >
                  <span
                    aria-hidden="true"
                    className={`w-2.5 h-2.5 rounded-full shrink-0 transition-transform group-hover:scale-125 ${
                      stop.isNowStop
                        ? 'bg-[#E59A00] ring-3 ring-[#FFE066]/70'
                        : 'bg-[#2E7D32]'
                    }`}
                  />
                  <span
                    className={`font-mono-tabular text-[11px] font-bold shrink-0 ${
                      stop.isNowStop ? 'text-[#C67C00]' : 'text-[#2E7D32]'
                    }`}
                  >
                    {stop.stepNumber}
                  </span>
                  <span className="font-pixel text-[13px] sm:text-sm text-[#18261C] group-hover:text-[#2E7D32] group-hover:underline decoration-[#E59A00] decoration-2 underline-offset-4 truncate transition-colors">
                    {stop.shortTitle}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
