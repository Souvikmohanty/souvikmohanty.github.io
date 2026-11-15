import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react';
import { ArrowRight, Layers, Microscope, Sun, Volume2, VolumeX } from 'lucide-react';
import {
  DEVELOPMENT_BARS,
  FORAGING_SLOTS,
  MASTERS_CHAPTERS,
  NEST_ZONES,
  THESIS_METADATA,
  WEEKLY_PEI,
  type MastersChapter,
} from '../data/mastersResearchData';
import { PixelBeeIcon, PixelResearcher } from './PixelSprites';
import { soundFx } from '../utils/soundFx';

/* ============================================================================
   3D SCROLL-ANIMATED THESIS VISUALIZERS (No nested square boxes!)
   ============================================================================ */

function StageSpecimenArt({ stage }: { stage: string }) {
  if (stage === 'Egg') {
    return (
      <svg viewBox="0 0 24 24" className="w-8 h-8 pixel-render" shapeRendering="crispEdges" aria-hidden="true">
        <rect x="9" y="5" width="6" height="14" fill="#FFFDF7" />
        <rect x="8" y="7" width="8" height="10" fill="#FFFDF7" />
        <rect x="10" y="6" width="2" height="8" fill="#FFE082" />
        <rect x="9" y="4" width="6" height="1" fill="#18261C" />
        <rect x="9" y="19" width="6" height="1" fill="#18261C" />
        <rect x="7" y="7" width="1" height="10" fill="#18261C" />
        <rect x="16" y="7" width="1" height="10" fill="#18261C" />
      </svg>
    );
  }
  if (stage === 'Larva') {
    return (
      <svg viewBox="0 0 24 24" className="w-8 h-8 pixel-render" shapeRendering="crispEdges" aria-hidden="true">
        {/* Outlined C-shaped creamy larva */}
        <rect x="6" y="5" width="10" height="6" fill="#1E1B2A" />
        <rect x="4" y="8" width="6" height="9" fill="#1E1B2A" />
        <rect x="6" y="14" width="11" height="6" fill="#1E1B2A" />
        <rect x="12" y="12" width="6" height="6" fill="#1E1B2A" />
        <rect x="7" y="6" width="8" height="4" fill="#FFF8E1" />
        <rect x="5" y="9" width="4" height="7" fill="#FFF8E1" />
        <rect x="7" y="15" width="9" height="4" fill="#FFE082" />
        <rect x="13" y="13" width="4" height="4" fill="#FFF8E1" />
        <rect x="8" y="7" width="2" height="2" fill="#E6C36A" />
        <rect x="6" y="11" width="2" height="2" fill="#E6C36A" />
        <rect x="10" y="16" width="2" height="2" fill="#D7A449" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 pixel-render" shapeRendering="crispEdges" aria-hidden="true">
      {/* Outlined Exarate pupa */}
      <rect x="7" y="3" width="10" height="6" fill="#1E1B2A" />
      <rect x="6" y="8" width="12" height="9" fill="#1E1B2A" />
      <rect x="7" y="16" width="10" height="5" fill="#1E1B2A" />
      <rect x="8" y="4" width="8" height="5" fill="#6D4C41" />
      <rect x="9" y="6" width="2" height="2" fill="#1E1B2A" />
      <rect x="13" y="6" width="2" height="2" fill="#1E1B2A" />
      <rect x="7" y="9" width="10" height="7" fill="#D7A449" />
      <rect x="8" y="9" width="3" height="6" fill="#F2C879" />
      <rect x="8" y="16" width="8" height="4" fill="#A17233" />
      <rect x="10" y="11" width="4" height="2" fill="#FFFDF7" />
    </svg>
  );
}

function Biology3DPodiums() {
  const podiumHeights = [68, 108, 152];
  const sideColors = ['#D49B00', '#C48100', '#1F5A22'];
  const topColors = ['#FFE066', '#FFC107', '#4CAF50'];

  return (
    <div className="relative py-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <span className="font-pixel text-xs sm:text-sm text-[#2E7D32] tracking-wide">
          3D BROOD METAMORPHOSIS PODIUM · 50 MARKED CELLS
        </span>
        <span className="font-mono-tabular text-xs font-bold text-[#18261C] bg-[#FFE066] px-2.5 py-1 border-2 border-[#18261C]">
          Total Cycle: 47.28 ± 2.45 days
        </span>
      </div>

      {/* 3D Extruded Isometric Columns + Bee Finale */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 items-end pt-4 pb-2">
        {DEVELOPMENT_BARS.map((bar, idx) => (
          <motion.div
            key={bar.stage}
            initial={{ opacity: 0, y: 28, rotateX: 18 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Floating specimen */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.4 + idx * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-2 flex flex-col items-center"
            >
              <StageSpecimenArt stage={bar.stage} />
              <span className="font-pixel text-xs text-[#18261C] mt-1">{bar.stage}</span>
            </motion.div>

            {/* 3D Isometric Extruded Block (tap for lab chime) */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => soundFx.playSpecimenTap(idx)}
              className="relative w-full max-w-[110px] cursor-pointer text-left bg-transparent border-0 p-0 focus-visible:outline-2 focus-visible:outline-[#18261C]"
              style={{ perspective: '600px' }}
              aria-label={`${bar.stage} stage: ${bar.days} days (${bar.pct}% of cycle)`}
            >
              {/* Top 3D bevel face */}
              <div
                style={{ backgroundColor: topColors[idx] }}
                className="h-3 mx-1 border-2 border-b-0 border-[#18261C] transform -skew-x-12 origin-bottom"
              />
              {/* Front column face */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, delay: idx * 0.14, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: `${podiumHeights[idx]}px`,
                  backgroundColor: bar.color,
                  originY: 1,
                  boxShadow: `6px 6px 0px ${sideColors[idx]}`,
                }}
                className={`w-full border-2 border-[#18261C] flex flex-col items-center justify-center p-2 text-center ${
                  bar.stage === 'Pupa' ? 'text-white' : 'text-[#18261C]'
                }`}
              >
                <span className="font-pixel text-base sm:text-lg font-bold leading-none">
                  {bar.days}d
                </span>
                <span className="font-mono-tabular text-[10px] mt-1 opacity-90">
                  {bar.pct}% cycle
                </span>
              </motion.div>
            </motion.button>
            <p className="font-mono-tabular text-[11px] font-semibold text-[#2D3E31] mt-3 text-center">
              {bar.note}
            </p>
          </motion.div>
        ))}

        {/* 4th Column: Emerging Stingless Bee */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-3 sm:col-span-1 flex sm:flex-col items-center justify-center gap-3 sm:gap-2 pb-2 pt-3 sm:pt-0"
        >
          <div className="animate-bee-hover p-3 bg-[#FFFDF7] border-2 border-[#18261C] rounded-full shadow-[4px_4px_0_#2E7D32]">
            <PixelBeeIcon className="w-10 h-10" />
          </div>
          <div className="text-left sm:text-center">
            <p className="font-pixel text-sm font-bold text-[#2E7D32]">ADULT WORKER</p>
            <p className="font-mono-tabular text-[11px] text-[#4C6050]">
              Eclosion ~ Day 47
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Nesting3DBambooCutaway() {
  return (
    <div className="relative py-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <span className="font-pixel text-xs sm:text-sm text-[#B86800] tracking-wide">
          3D SPLIT BAMBOO HIVE CUTAWAY · 5 INTERNAL ZONES
        </span>
        <span className="font-mono-tabular text-xs font-bold text-[#18261C] bg-[#FFFDF7] px-2.5 py-1 border-2 border-[#18261C]">
          Mean Cavity: 39.80 cm × Ø 9.05 cm
        </span>
      </div>

      {/* 3D Cylindrical Bamboo Log Cutaway */}
      <motion.div
        initial={{ opacity: 0, rotateX: 14, y: 20 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: '900px' }}
        className="relative"
      >
        {/* Top curved bamboo rind highlight */}
        <div className="h-4 mx-2 rounded-t-full bg-gradient-to-b from-[#A1887F] to-[#6D4C41] border-2 border-b-0 border-[#18261C]" />

        {/* Main Cutaway Bamboo Chamber */}
        <div className="relative rounded-2xl border-3 border-[#18261C] bg-[#4E342E] p-2.5 sm:p-3 shadow-[0_8px_0_#2C1D18]">
          {/* Node Ring accents */}
          <div
            aria-hidden="true"
            className="flex justify-between text-[10px] font-mono-tabular text-[#FFE082] px-1 mb-1.5"
          >
            <span>◀ Oval/Tunnel Entrance + Batumen</span>
            <span className="hidden sm:inline">Involucrum Shield</span>
            <span>Posterior Seal ▶</span>
          </div>

          <div className="flex items-stretch gap-1 h-20 sm:h-24 rounded-xl overflow-hidden border-2 border-[#18261C] bg-[#2D1F18] p-1">
            {NEST_ZONES.map((z, idx) => (
              <motion.button
                key={z.zone}
                type="button"
                onClick={() => soundFx.playSpecimenTap(idx)}
                whileTap={{ scale: 0.97 }}
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: `${z.pct}%`,
                  backgroundColor: z.color,
                  originX: 0,
                  boxShadow: 'inset 0 -6px 0 rgba(24,38,28,0.22)',
                }}
                className={`rounded-lg border border-[#18261C] flex flex-col items-center justify-center px-1 text-center cursor-pointer hover:brightness-105 transition-[filter] ${
                  z.textLight ? 'text-white' : 'text-[#18261C]'
                }`}
                aria-label={`${z.zone} zone: ${z.lengthCm} cm`}
              >
                <span className="font-pixel text-[10px] sm:text-xs leading-tight font-bold">
                  {z.zone}
                </span>
                <span className="font-mono-tabular text-[10px] sm:text-[11px] font-bold mt-0.5">
                  {z.lengthCm} cm
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating Specimen Callout Chips (Organic rounded chips, not boxy grid) */}
      <div className="mt-5 flex flex-wrap gap-3">
        <div className="flex-1 min-w-[155px] bg-[#FFFDF7] rounded-2xl border-2 border-[#18261C] px-4 py-2.5 shadow-[4px_4px_0_#2E7D32]">
          <p className="font-mono-tabular text-[10px] text-[#4C6050]">Brood Cell (Horizontal Comb)</p>
          <p className="font-pixel text-sm sm:text-base font-bold text-[#18261C]">
            2.74 × 3.25 mm
          </p>
        </div>
        <div className="flex-1 min-w-[155px] bg-[#FFFDF7] rounded-2xl border-2 border-[#18261C] px-4 py-2.5 shadow-[4px_4px_0_#E59A00]">
          <p className="font-mono-tabular text-[10px] text-[#4C6050]">Honey Storage Pots</p>
          <p className="font-pixel text-sm sm:text-base font-bold text-[#18261C]">
            6.94 × 7.29 mm
          </p>
        </div>
        <div className="flex-1 min-w-[155px] bg-[#FFFDF7] rounded-2xl border-2 border-[#18261C] px-4 py-2.5 shadow-[4px_4px_0_#6D4C41]">
          <p className="font-mono-tabular text-[10px] text-[#4C6050]">Pollen Storage Pots</p>
          <p className="font-pixel text-sm sm:text-base font-bold text-[#18261C]">
            7.27 × 7.29 mm
          </p>
        </div>
      </div>
    </div>
  );
}

function Foraging3DRapeseedStage() {
  return (
    <div className="relative py-4 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-pixel text-xs sm:text-sm text-[#2E7D32] tracking-wide">
          3D DIURNAL FLIGHT COLUMNS &amp; WEEKLY PEI · FEB 2026
        </span>
        <span className="font-mono-tabular text-xs font-bold text-[#18261C] bg-[#FFE066] px-2.5 py-1 border-2 border-[#18261C]">
          Peak Window: 11:00–13:00 h
        </span>
      </div>

      {/* 3D Extruded Time-Slot Towers */}
      <div className="grid grid-cols-3 gap-4 items-end pt-4">
        {FORAGING_SLOTS.map((slot, idx) => {
          const isPeak = slot.slot.startsWith('11:00');
          const heightPx = isPeak ? 136 : idx === 2 ? 92 : 66;
          return (
            <motion.div
              key={slot.slot}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="flex flex-col items-center"
            >
              {isPeak && (
                <div className="animate-bee-hover mb-1 flex items-center gap-1">
                  <PixelBeeIcon className="w-6 h-6" />
                  <span className="font-pixel text-[10px] text-[#B86800]">PEAK!</span>
                </div>
              )}

              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => soundFx.playSpecimenTap(idx)}
                className="w-full max-w-[130px] cursor-pointer text-left bg-transparent border-0 p-0 focus-visible:outline-2 focus-visible:outline-[#18261C]"
                aria-label={`${slot.slot}: ${slot.outgoing} out, ${slot.rate} flowers per minute`}
              >
                {/* Isometric top cap */}
                <div
                  className={`h-2.5 mx-1 border-2 border-b-0 border-[#18261C] transform -skew-x-12 origin-bottom ${
                    isPeak ? 'bg-[#FFE066]' : 'bg-[#A5D6A7]'
                  }`}
                />
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    height: `${heightPx}px`,
                    originY: 1,
                    boxShadow: isPeak ? '6px 6px 0 #B86800' : '5px 5px 0 #2E7D32',
                  }}
                  className={`w-full border-2 border-[#18261C] flex flex-col items-center justify-center p-2 text-center ${
                    isPeak ? 'bg-[#E59A00] text-[#18261C]' : 'bg-[#6BA877] text-white'
                  }`}
                >
                  <span className="font-pixel text-sm sm:text-base font-bold leading-tight">
                    {slot.outgoing} out
                  </span>
                  <span className="font-mono-tabular text-[10px] font-semibold mt-0.5">
                    {slot.rate} fl/min
                  </span>
                  <span className="font-mono-tabular text-[10px] opacity-90">
                    {slot.speed} s/fl
                  </span>
                </motion.div>
              </motion.button>
              <p className="font-mono-tabular text-[11px] font-bold text-[#18261C] mt-3 text-center">
                {slot.slot}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Weekly PEI Pill Bars */}
      <div className="pt-2">
        <div className="flex items-center justify-between text-xs font-mono-tabular mb-2.5">
          <span className="font-pixel text-[#18261C]">WEEKLY POLLINATION EFFICIENCY INDEX</span>
          <span className="font-bold text-[#2E7D32]">Mean PEI: 353.13</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {WEEKLY_PEI.map((w, idx) => {
            const isPeak = w.week === 'Wk 3';
            return (
              <motion.div
                key={w.week}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`rounded-2xl border-2 border-[#18261C] px-3 py-2.5 text-center ${
                  isPeak
                    ? 'bg-[#2E7D32] text-white shadow-[4px_4px_0_#18261C]'
                    : 'bg-[#FFFDF7] text-[#18261C] shadow-[3px_3px_0_#D8E2D5]'
                }`}
              >
                <p className="font-mono-tabular text-[10px] opacity-85">
                  {w.week} · {w.dates}
                </p>
                <p className="font-pixel text-lg font-bold leading-tight mt-0.5">
                  {w.pei}
                </p>
                <p className="font-mono-tabular text-[10px] opacity-90">
                  {w.ra} RA · {w.pollen} gr
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   DYNAMIC 3D-PERSPECTIVE OPEN CHAPTER STAGE (Breaks away from boxy walls)
   ============================================================================ */

interface ChapterStageProps {
  chapter: MastersChapter;
  index: number;
  isActive: boolean;
  onBecomeActive: (index: number) => void;
}

function ChapterStage({
  chapter,
  index,
  isActive,
  onBecomeActive,
}: ChapterStageProps) {
  const stageRef = useRef<HTMLElement>(null);
  const inView = useInView(stageRef, { amount: 0.4 });

  // Continuous 3D tilt-into-place scroll animation!
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start 92%', 'center 52%'],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  useEffect(() => {
    if (inView) {
      onBecomeActive(index);
    }
  }, [inView, index, onBecomeActive]);

  const tiltClasses = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];

  const accentBadgeColor =
    chapter.id === 'biology'
      ? 'bg-[#18261C] text-[#FFF8E1]'
      : chapter.id === 'nesting'
        ? 'bg-[#E59A00] text-[#18261C]'
        : 'bg-[#2E7D32] text-[#FFFDF7]';

  return (
    <motion.article
      id={`thesis-${chapter.id}`}
      ref={stageRef}
      style={{
        perspective: '1100px',
        rotateX,
        scale,
        transformOrigin: 'center top',
      }}
      className="scroll-mt-28 relative pb-12 sm:pb-16 border-b-2 border-dashed border-[#18261C]/25 last:border-b-0"
    >
      {/* Floating Ribbon Marker + Title (Open typography directly on notebook grid) */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span
          className={`font-pixel text-xs sm:text-sm px-3 py-1 border-2 border-[#18261C] shadow-[3px_3px_0_#18261C] ${accentBadgeColor}`}
        >
          {chapter.stepNumber} · {chapter.badge}
        </span>
        {isActive && (
          <span className="font-mono-tabular text-[11px] font-bold text-[#2E7D32]">
            ● Active Station
          </span>
        )}
      </div>

      <h3 className="font-pixel text-2xl sm:text-4xl font-bold text-[#18261C] tracking-tight leading-tight">
        {chapter.title}
      </h3>
      <p className="font-mono-tabular text-xs sm:text-sm font-semibold text-[#2E7D32] mt-1 mb-4">
        {chapter.subtitle}
      </p>

      <p className="text-sm sm:text-base text-[#2D3E31] leading-relaxed max-w-2xl mb-6">
        {chapter.summary}
      </p>

      {/* Centerpiece 3D Interactive Thesis Stage (Soft floating sheet with layered 3D shadow) */}
      <div className="relative rounded-3xl bg-[#FFFDF7] border-3 border-[#18261C] p-5 sm:p-7 shadow-[8px_8px_0_#2E7D32] mb-6">
        {chapter.id === 'biology' ? (
          <Biology3DPodiums />
        ) : chapter.id === 'nesting' ? (
          <Nesting3DBambooCutaway />
        ) : (
          <Foraging3DRapeseedStage />
        )}
      </div>

      {/* Open-Air Key Findings & Method Callout (Left accent border, no heavy box outline) */}
      <div className="border-l-4 border-[#E59A00] pl-4 sm:pl-5 py-1 space-y-2.5">
        <p className="font-pixel text-xs text-[#18261C] tracking-wide uppercase">
          How It Was Studied &amp; Key Insights
        </p>
        <p className="text-xs sm:text-sm text-[#2D3E31] leading-relaxed">
          {chapter.methodNote}
        </p>
        <ul className="space-y-1.5 pt-1">
          {chapter.highlights.map((item) => (
            <li
              key={item}
              className="text-xs sm:text-sm text-[#18261C] leading-relaxed flex items-start gap-2"
            >
              <span aria-hidden="true" className="font-pixel text-[#2E7D32] mt-0.5">
                ▸
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Casual Taped Photo Gallery (ready for upcoming thesis plates) */}
      {chapter.photos && chapter.photos.length > 0 && (
        <div className="pt-6">
          <p className="font-mono-tabular text-xs font-semibold text-[#4C6050] mb-3">
            Thesis Field &amp; Lab Plates
          </p>
          <div
            className={`grid gap-3.5 ${
              chapter.photos.length === 2
                ? 'grid-cols-2 max-w-sm'
                : chapter.photos.length >= 5
                  ? 'grid-cols-2 sm:grid-cols-3'
                  : 'grid-cols-2 sm:grid-cols-4'
            }`}
          >
            {chapter.photos.map((photo, idx) => (
              <figure
                key={photo.src}
                className={`relative bg-white p-1.5 pb-2 border-2 border-[#18261C] pixel-box-sm transition-transform hover:rotate-0 ${
                  tiltClasses[idx % tiltClasses.length]
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-[#E59A00]/65 border border-[#18261C]/40"
                />
                <div className="aspect-square overflow-hidden bg-[#EBF3E8] border border-[#18261C]/30 mb-1.5">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-cover ${
                      photo.objectPosition ?? 'object-center'
                    }`}
                  />
                </div>
                <figcaption className="font-mono-tabular text-[10px] text-[#2D3E31] leading-tight text-center">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
}

/* ============================================================================
   MAIN SECTION: CREATIVE UNDERGROUND BURROW DROP + 3D VERTICAL EXPEDITION
   ============================================================================ */

export function MastersResearchSection() {
  const trailBridgeRef = useRef<HTMLDivElement>(null);
  const expeditionRef = useRef<HTMLDivElement>(null);

  const MASTERS_WALK_FRAMES: ReadonlyArray<1 | 2 | 3 | 4> = [1, 3, 2, 4];

  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [isClimbing, setIsClimbing] = useState(false);
  const [walkStep, setWalkStep] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(() => soundFx.isEnabled());

  const climbTimeoutRef = useRef<number | null>(null);
  const lastClimbSoundRef = useRef(0);
  const lastStationRef = useRef(0);
  const isClimbingRef = useRef(false);

  // Simple scroll-driven forward walk across the campus bridge toward the M.Sc. Lab
  const { scrollYProgress: trailProgress } = useScroll({
    target: trailBridgeRef,
    offset: ['start 90%', 'end 35%'],
  });
  const walkX = useTransform(trailProgress, [0, 0.45, 0.85, 1], ['20%', '43%', '64%', '69%']);
  const walkY = useTransform(trailProgress, [0, 0.28, 0.5, 0.72, 1], [0, -9, -9, 0, -2]);

  // Scroll-linked vertical expedition progress through the 3 thesis chapters
  const { scrollYProgress: expeditionProgress } = useScroll({
    target: expeditionRef,
    offset: ['start 25%', 'end 75%'],
  });
  const slideX = useTransform(expeditionProgress, [0, 0.35, 0.72, 1], [4, 18, 40, 62]);
  const slideY = useTransform(expeditionProgress, [0, 0.35, 0.72, 1], [-2, 92, 198, 270]);
  const slideRotate = useTransform(expeditionProgress, [0, 0.35, 0.78, 1], [5, 11, 7, 0]);
  const mobileWalkerX = useTransform(expeditionProgress, [0, 1], ['2%', '81%']);
  const mobileWalkerY = useTransform(expeditionProgress, [0, 1], [0, 8]);

  const triggerStepMotion = (latest?: number, softStep = false) => {
    if (!isClimbingRef.current) {
      isClimbingRef.current = true;
      setIsClimbing(true);
    }
    const now = Date.now();
    if (
      (latest === undefined || (latest > 0.02 && latest < 0.98)) &&
      now - lastClimbSoundRef.current > 220
    ) {
      lastClimbSoundRef.current = now;
      if (softStep) {
        soundFx.playStep();
      } else {
        soundFx.playClimbStep();
      }
    }
    if (climbTimeoutRef.current !== null) {
      window.clearTimeout(climbTimeoutRef.current);
    }
    climbTimeoutRef.current = window.setTimeout(() => {
      isClimbingRef.current = false;
      setIsClimbing(false);
    }, 150);
  };

  useMotionValueEvent(trailProgress, 'change', (latest) => {
    triggerStepMotion(latest, true);
  });
  useMotionValueEvent(expeditionProgress, 'change', (latest) => {
    triggerStepMotion(latest, false);
  });

  useEffect(() => {
    if (!isClimbing) {
      setWalkStep(0);
      return;
    }
    const timer = window.setInterval(() => {
      setWalkStep((prev) => (prev + 1) % MASTERS_WALK_FRAMES.length);
    }, 125);
    return () => window.clearInterval(timer);
  }, [isClimbing]);

  useEffect(() => {
    const unsubscribe = soundFx.subscribe(setSoundEnabled);
    return () => {
      unsubscribe();
      if (climbTimeoutRef.current !== null) {
        window.clearTimeout(climbTimeoutRef.current);
      }
    };
  }, []);

  const handleStationBecomeActive = (idx: number) => {
    setActiveChapterIdx(idx);
    if (lastStationRef.current !== idx) {
      lastStationRef.current = idx;
      soundFx.playStationFocus(idx);
    }
  };

  const scrollToChapter = (chapterId: MastersChapter['id'], idx?: number) => {
    const targetIdx = idx ?? MASTERS_CHAPTERS.findIndex((c) => c.id === chapterId);
    if (targetIdx >= 0) {
      soundFx.playStationFocus(targetIdx);
      lastStationRef.current = targetIdx;
    }
    const el = document.getElementById(`thesis-${chapterId}`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFx.setEnabled(next);
  };

  const stridePhase: 0 | 1 | 2 | 3 | 4 = !isClimbing
    ? 0
    : MASTERS_WALK_FRAMES[walkStep % MASTERS_WALK_FRAMES.length];
  const activeChapter = MASTERS_CHAPTERS[activeChapterIdx] ?? MASTERS_CHAPTERS[0];
  const stationIcons = [Microscope, Layers, Sun];

  return (
    <section
      id="masters-research"
      aria-labelledby="masters-research-heading"
      className="relative notebook-grid pb-10 overflow-x-clip"
    >
      {/* ================= SUNLIT CAMPUS BRIDGE -> M.SC. ENTOMOLOGY LAB ================= */}
      <div
        ref={trailBridgeRef}
        className="relative border-b-4 border-[#18261C] overflow-hidden bg-gradient-to-b from-transparent via-[#E5F2DF]/55 to-[#CBE2C1]/90"
      >
        {/* Distant Manipur Foothills Silhouette (keeps descending Sun visible in SolarSkyBackdrop) */}
        <svg
          viewBox="0 0 1200 180"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-x-0 bottom-4 w-full h-36 sm:h-44 pointer-events-none"
        >
          <polygon
            points="0,180 0,98 110,68 230,96 380,48 530,90 690,44 850,86 1010,54 1140,80 1200,66 1200,180"
            fill="#83BC7E"
            fillOpacity="0.65"
          />
          <polygon
            points="0,180 0,124 140,96 310,126 480,86 640,120 820,88 990,118 1130,96 1200,110 1200,180"
            fill="#5C9D5B"
            fillOpacity="0.78"
          />
          {/* Distant hillside campus trees */}
          <rect x="276" y="88" width="12" height="24" fill="#3B7A43" fillOpacity="0.55" />
          <rect x="578" y="84" width="14" height="24" fill="#3B7A43" fillOpacity="0.55" />
          <rect x="920" y="88" width="12" height="22" fill="#3B7A43" fillOpacity="0.55" />
        </svg>

        {/* Stage Content */}
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 relative h-[244px] sm:h-[268px] flex items-end justify-between">
          {/* LEFT: End of Field Walk Signpost + Field Crate & Net */}
          <div
            aria-hidden="true"
            className="relative z-10 flex items-end gap-3 pb-7 pointer-events-none"
          >
            <div className="flex flex-col items-center">
              <div className="bg-[#FFFDF7] border-2 border-[#18261C] px-2.5 py-1.5 shadow-[3px_3px_0_#18261C] text-left">
                <p className="font-pixel text-[10px] sm:text-[11px] text-[#2E7D32] leading-tight">
                  FIELD WALK COMPLETE
                </p>
                <p className="font-mono-tabular text-[10px] font-bold text-[#18261C] mt-0.5 flex items-center gap-1">
                  <span>To M.Sc. Lab</span>
                  <ArrowRight className="w-3 h-3 text-[#E59A00]" />
                </p>
              </div>
              <div className="w-2.5 h-10 bg-[#8D6E63] border-x-2 border-[#18261C]" />
            </div>

            <svg
              viewBox="0 0 56 44"
              className="hidden sm:block w-20 h-16 pixel-render shrink-0"
              shapeRendering="crispEdges"
            >
              {/* Leaning sweep net */}
              <rect x="34" y="8" width="3" height="32" fill="#1E1B2A" />
              <rect x="35" y="9" width="1" height="30" fill="#C49B66" />
              <rect x="31" y="2" width="11" height="8" fill="#1E1B2A" />
              <rect x="32" y="3" width="9" height="6" fill="#E0F7FA" />
              {/* Wooden field collection crate */}
              <rect x="8" y="22" width="24" height="18" fill="#1E1B2A" />
              <rect x="9" y="23" width="22" height="16" fill="#B68B60" />
              <rect x="10" y="24" width="20" height="3" fill="#D4AA7D" />
              <rect x="9" y="30" width="22" height="2" fill="#6D4C41" />
              <rect x="15" y="23" width="2" height="16" fill="#8D6E63" />
              <rect x="23" y="23" width="2" height="16" fill="#8D6E63" />
              {/* Specimen jar sitting on crate */}
              <rect x="14" y="13" width="9" height="9" fill="#1E1B2A" />
              <rect x="15" y="14" width="7" height="2" fill="#E59A00" />
              <rect x="15" y="16" width="7" height="5" fill="#E0F7FA" />
              <rect x="17" y="18" width="3" height="2" fill="#2E7D32" />
              {/* Wildflowers */}
              <rect x="2" y="32" width="2" height="8" fill="#2E7D32" />
              <rect x="1" y="29" width="4" height="3" fill="#FFE066" />
            </svg>
          </div>

          {/* CENTER STREAM & ARCHED BAMBOO FOOTBRIDGE + COBBLESTONE LAB PATH */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-5 z-0 flex justify-center pointer-events-none"
          >
            <svg
              viewBox="0 0 380 54"
              className="w-[340px] sm:w-[460px] h-14 sm:h-16 pixel-render"
              shapeRendering="crispEdges"
            >
              {/* Loktak-style sparkling stream under footbridge */}
              <rect x="76" y="42" width="128" height="12" fill="#1E1B2A" />
              <rect x="78" y="44" width="124" height="10" fill="#4FC3F7" />
              <rect x="86" y="46" width="26" height="2" fill="#B3E5FC" />
              <rect x="148" y="48" width="32" height="2" fill="#B3E5FC" />
              <rect x="116" y="45" width="8" height="4" fill="#2E7D32" />

              {/* Arched wooden & bamboo footbridge */}
              <rect x="72" y="34" width="136" height="8" fill="#1E1B2A" />
              <rect x="86" y="29" width="108" height="7" fill="#1E1B2A" />
              <rect x="74" y="36" width="132" height="4" fill="#B68B60" />
              <rect x="88" y="31" width="104" height="5" fill="#D4AA7D" />
              {/* Bridge railing posts & handrail */}
              <rect x="80" y="20" width="4" height="16" fill="#1E1B2A" />
              <rect x="81" y="21" width="2" height="14" fill="#8D6E63" />
              <rect x="138" y="16" width="4" height="16" fill="#1E1B2A" />
              <rect x="139" y="17" width="2" height="14" fill="#8D6E63" />
              <rect x="196" y="20" width="4" height="16" fill="#1E1B2A" />
              <rect x="197" y="21" width="2" height="14" fill="#8D6E63" />
              <rect x="82" y="20" width="116" height="4" fill="#1E1B2A" />
              <rect x="82" y="21" width="116" height="2" fill="#E59A00" />

              {/* Stepping stones leading from bridge to CAU Imphal M.Sc. Lab steps */}
              <rect x="216" y="40" width="22" height="8" fill="#1E1B2A" />
              <rect x="218" y="41" width="18" height="5" fill="#90A4AE" />
              <rect x="246" y="38" width="24" height="10" fill="#1E1B2A" />
              <rect x="248" y="39" width="20" height="7" fill="#B0BEC5" />
              <rect x="278" y="35" width="28" height="13" fill="#1E1B2A" />
              <rect x="280" y="36" width="24" height="10" fill="#CFD8DC" />
            </svg>
          </div>

          {/* SCROLL-LINKED FORWARD WALK: Walks steadily across bridge toward the M.Sc. Lab */}
          <motion.div
            style={{ left: walkX, y: walkY }}
            aria-hidden="true"
            className="absolute bottom-7 z-20 pointer-events-none"
          >
            <div className="w-16 h-20 sm:w-20 sm:h-24">
              <PixelResearcher
                stridePhase={stridePhase}
                isInspecting={false}
                emote="stand"
                className="w-full h-full"
              />
            </div>
          </motion.div>

          {/* RIGHT: Sunlit CAU Imphal M.Sc. Entomology Lab Pavilion */}
          <div
            aria-hidden="true"
            className="relative z-10 flex flex-col items-end pb-7 ml-auto pointer-events-none"
          >
            <div className="hidden sm:block bg-[#FFFDF7] border-2 border-[#18261C] px-3 py-1.5 shadow-[4px_4px_0_#2E7D32] mb-3.5">
              <p className="font-pixel text-[11px] text-[#2E7D32]">M.SC. ENTOMOLOGY LAB</p>
              <p className="font-mono-tabular text-[10px] text-[#18261C]">
                3 Chapters: Biology · Nesting · Foraging
              </p>
            </div>

              {/* 16-Bit CAU Imphal Entomology Research Pavilion */}
              <svg
                viewBox="0 0 112 96"
                className="w-32 h-28 sm:w-44 sm:h-38 pixel-render shrink-0"
                shapeRendering="crispEdges"
              >
              {/* Pitched Campus Roof + Finial */}
              <rect x="52" y="4" width="6" height="8" fill="#1E1B2A" />
              <rect x="53" y="5" width="4" height="6" fill="#E59A00" />
              <rect x="14" y="18" width="84" height="10" fill="#1E1B2A" />
              <rect x="26" y="12" width="60" height="8" fill="#1E1B2A" />
              <rect x="6" y="26" width="100" height="10" fill="#1E1B2A" />

              <rect x="28" y="14" width="56" height="6" fill="#2E7D32" />
              <rect x="16" y="20" width="80" height="7" fill="#3B8C3F" />
              <rect x="8" y="27" width="96" height="7" fill="#1F5A22" />
              {/* Roof gold trim */}
              <rect x="10" y="32" width="92" height="2" fill="#FFE066" />

              {/* Cream Research Pavilion Walls */}
              <rect x="12" y="34" width="88" height="58" fill="#1E1B2A" />
              <rect x="14" y="36" width="84" height="54" fill="#FFF8E1" />
              <rect x="14" y="36" width="84" height="4" fill="#E6DEC8" />

              {/* Lab Header Signboard above Door */}
              <rect x="34" y="38" width="44" height="11" fill="#1E1B2A" />
              <rect x="35" y="39" width="42" height="9" fill="#FFE066" />
              <rect x="39" y="42" width="34" height="3" fill="#18261C" />

              {/* Glowing Left Arched Lab Window (Microscope silhouette inside!) */}
              <rect x="18" y="48" width="20" height="22" fill="#1E1B2A" />
              <rect x="20" y="50" width="16" height="18" fill="#FFD54F" />
              <rect x="21" y="51" width="6" height="7" fill="#FFF9C4" />
              {/* Silhouette Microscope inside lit window */}
              <rect x="26" y="57" width="4" height="7" fill="#5D4037" />
              <rect x="24" y="64" width="8" height="3" fill="#4E342E" />
              <rect x="18" y="69" width="20" height="3" fill="#8D6E63" />

              {/* Open Welcoming Lab Entrance Doorway */}
              <rect x="44" y="53" width="24" height="37" fill="#1E1B2A" />
              <rect x="46" y="55" width="20" height="35" fill="#F9A825" />
              <rect x="48" y="57" width="16" height="33" fill="#FFF3B0" />
              {/* Swung-open wooden door panel */}
              <rect x="61" y="55" width="7" height="35" fill="#1E1B2A" />
              <rect x="62" y="56" width="5" height="33" fill="#8D6E63" />
              <rect x="63" y="70" width="2" height="3" fill="#FFE066" />

              {/* Glowing Right Window + Specimen Shelf */}
              <rect x="74" y="48" width="20" height="22" fill="#1E1B2A" />
              <rect x="76" y="50" width="16" height="18" fill="#FFD54F" />
              <rect x="77" y="51" width="6" height="7" fill="#FFF9C4" />
              <rect x="81" y="58" width="5" height="7" fill="#2E7D32" />
              <rect x="74" y="69" width="20" height="3" fill="#8D6E63" />

              {/* Hanging Warm Porch Lantern */}
              <rect x="40" y="49" width="4" height="6" fill="#1E1B2A" />
              <rect x="41" y="50" width="2" height="4" fill="#FFF59D" />

              {/* Stone Entrance Porch & Steps */}
              <rect x="38" y="88" width="36" height="6" fill="#1E1B2A" />
              <rect x="40" y="89" width="32" height="4" fill="#B0BEC5" />
              {/* Potted Marigolds flanking porch */}
              <rect x="18" y="82" width="10" height="10" fill="#1E1B2A" />
              <rect x="19" y="83" width="8" height="8" fill="#A1887F" />
              <rect x="20" y="76" width="6" height="6" fill="#2E7D32" />
              <rect x="21" y="74" width="4" height="3" fill="#F2B705" />
              <rect x="84" y="82" width="10" height="10" fill="#1E1B2A" />
              <rect x="85" y="83" width="8" height="8" fill="#A1887F" />
              <rect x="86" y="76" width="6" height="6" fill="#2E7D32" />
              <rect x="87" y="74" width="4" height="3" fill="#FF8A65" />
            </svg>
          </div>
        </div>

        {/* Continuous 16-Bit Meadow Turf Floor matching FieldWalkSection */}
        <div aria-hidden="true" className="relative z-10 w-full">
          <div className="h-4 w-full bg-[#53A344] border-t-2 border-[#18261C] flex items-start justify-around overflow-hidden">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-1.5 bg-[#76C85A] border-r border-[#3B7D31]/40"
              />
            ))}
          </div>
          <div className="h-3 w-full bg-[#3E7E35] border-t border-[#2E6227]" />
        </div>
      </div>

      {/* ================= OPEN EDITORIAL THESIS HEADER (No heavy box!) ================= */}
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="font-mono-tabular text-xs font-bold text-[#2E7D32] uppercase tracking-wider">
              {THESIS_METADATA.degree} · {THESIS_METADATA.period}
            </span>
            <span className="font-pixel text-xs px-2.5 py-0.5 bg-[#E59A00] text-[#18261C] border-2 border-[#18261C]">
              REG: {THESIS_METADATA.registrationNo}
            </span>
            <button
              type="button"
              onClick={handleToggleSound}
              aria-pressed={soundEnabled}
              aria-label={soundEnabled ? 'Mute expedition sound effects' : 'Enable expedition sound effects'}
              className={`md:hidden ml-auto inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold border-2 border-[#18261C] rounded-md transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-[#2E7D32] text-white'
                  : 'bg-[#FFFDF7] text-[#18261C]'
              }`}
            >
              {soundEnabled ? (
                <Volume2 className="w-3 h-3 shrink-0" aria-hidden="true" />
              ) : (
                <VolumeX className="w-3 h-3 shrink-0" aria-hidden="true" />
              )}
              <span>{soundEnabled ? 'SFX On' : 'SFX Off'}</span>
            </button>
          </div>

          <h2
            id="masters-research-heading"
            className="font-pixel text-3xl sm:text-5xl font-bold text-[#18261C] tracking-tight leading-tight mb-4"
          >
            {THESIS_METADATA.sectionHeading}
          </h2>

          <p className="text-lg sm:text-2xl font-bold text-[#18261C] leading-snug border-l-4 border-[#2E7D32] pl-4 py-1 max-w-4xl mb-8">
            “Bioecology of Stingless Bee Species{' '}
            <em className="italic">Tetragonula srikantanathi</em> (Viraktamath and Thangjam) in
            Manipur Valley Conditions”
          </p>

          {/* Clean Borderless 3-Column Thesis Metadata (Top accent strip instead of boxes!) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t-2 border-b-2 border-[#18261C]/20 py-5 text-xs sm:text-sm text-[#2D3E31]">
            <div>
              <div className="w-8 h-1 bg-[#2E7D32] mb-2" />
              <p className="font-pixel text-xs text-[#4C6050] mb-1">INSTITUTION</p>
              <p className="font-bold text-[#18261C]">{THESIS_METADATA.department}</p>
              <p>{THESIS_METADATA.university}</p>
            </div>
            <div>
              <div className="w-8 h-1 bg-[#E59A00] mb-2" />
              <p className="font-pixel text-xs text-[#4C6050] mb-1">RESEARCH SITE</p>
              <p className="font-bold text-[#18261C]">{THESIS_METADATA.site}</p>
            </div>
            <div>
              <div className="w-8 h-1 bg-[#18261C] mb-2" />
              <p className="font-pixel text-xs text-[#4C6050] mb-1">TAXONOMIC CONFIRMATION</p>
              <p>{THESIS_METADATA.speciesOrigin}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ================= MOBILE STICKY EXPEDITION CLIMBER & TRAIL ================= */}
      <div className="md:hidden sticky top-16 z-20 bg-[#FAF9F5]/95 backdrop-blur-sm border-b-2 border-[#C8D8C2] px-3 pt-1.5 pb-2 shadow-[0_4px_12px_rgba(24,38,28,0.06)]">
        {/* Live Scroll-Driven Souvik + Bee Descending the Sloped Bamboo Vine */}
        <div className="relative h-14 w-full overflow-hidden">
          {/* Sloping Bamboo Vine Track */}
          <div
            aria-hidden="true"
            className="absolute inset-x-3 bottom-3 h-2 rounded-full bg-[#E6DEC8] border border-[#18261C]/70 overflow-hidden rotate-[1.8deg] origin-left"
          >
            <motion.div
              style={{ scaleX: expeditionProgress, originX: 0 }}
              className="w-full h-full bg-gradient-to-r from-[#2E7D32] to-[#4CAF50]"
            />
          </div>

          {/* Bamboo node ticks */}
          <div
            aria-hidden="true"
            className="absolute inset-x-4 bottom-2.5 flex items-center justify-between pointer-events-none"
          >
            <span className="w-1.5 h-3 bg-[#8D6E63] border border-[#18261C] rounded-xs" />
            <span className="w-1.5 h-3 bg-[#8D6E63] border border-[#18261C] rounded-xs translate-y-[4px]" />
            <span className="w-1.5 h-3 bg-[#8D6E63] border border-[#18261C] rounded-xs translate-y-[8px]" />
          </div>

          {/* Animated Walking/Descending Pixel Souvik + Bee */}
          <motion.div
            style={{ x: mobileWalkerX, y: mobileWalkerY }}
            className="w-full h-full pointer-events-none flex items-start"
          >
            <div className="flex items-start">
              <div className="w-10 h-11 shrink-0">
                <PixelResearcher
                  stridePhase={stridePhase}
                  isInspecting={!isClimbing}
                  className="w-full h-full"
                />
              </div>
              <div className="animate-bee-hover -ml-2 mt-0.5 shrink-0">
                <PixelBeeIcon className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Open-Air Non-Boxy Chapter Milestones */}
        <div className="flex items-center justify-between gap-2 pt-1">
          {MASTERS_CHAPTERS.map((ch, idx) => {
            const active = activeChapterIdx === idx;
            const passed = activeChapterIdx > idx;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => scrollToChapter(ch.id)}
                className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1 px-1 font-pixel text-[11px] transition-colors whitespace-nowrap truncate cursor-pointer ${
                  active
                    ? 'text-[#18261C] font-bold underline decoration-[#E59A00] decoration-2 underline-offset-4'
                    : passed
                      ? 'text-[#2E7D32] font-semibold'
                      : 'text-[#4C6050] hover:text-[#18261C]'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`w-2 h-2 rounded-full border border-[#18261C] shrink-0 ${
                    active
                      ? 'bg-[#E59A00] scale-110'
                      : passed
                        ? 'bg-[#2E7D32]'
                        : 'bg-[#FFFDF7]'
                  }`}
                />
                <span>
                  {ch.stepNumber}.{' '}
                  {ch.id === 'biology' ? 'Biology' : ch.id === 'nesting' ? 'Nesting' : 'Foraging'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= OPEN-AIR 3D VERTICAL EXPEDITION STAGE ================= */}
      <div
        ref={expeditionRef}
        className="max-w-[1160px] mx-auto px-4 sm:px-6 pb-20 sm:pb-24 pt-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT 16-BIT WOODEN & BAMBOO EXPEDITION SLIDE */}
          <aside className="hidden md:block md:col-span-4 sticky top-28">
            <div className="relative h-[400px] pl-1">
              {/* 16-Bit Curved Wooden/Bamboo Playground Slide */}
              <svg
                viewBox="0 0 116 380"
                aria-hidden="true"
                className="absolute left-0 top-2 w-[112px] h-[366px] pointer-events-none"
              >
                {/* Wooden back support ladder frame & top launch platform */}
                <rect x="10" y="34" width="6" height="314" fill="#6D4C41" stroke="#1E1B2A" strokeWidth="2.5" />
                <rect x="24" y="34" width="5" height="314" fill="#5D4037" stroke="#1E1B2A" strokeWidth="2.5" />
                {/* Mid brace support post under slide */}
                <rect x="52" y="180" width="6" height="168" fill="#5D4037" stroke="#1E1B2A" strokeWidth="2.5" />
                <rect x="76" y="294" width="5" height="54" fill="#5D4037" stroke="#1E1B2A" strokeWidth="2.5" />
                {/* Back step rungs */}
                {[78, 128, 178, 228, 278, 326].map((ry) => (
                  <rect
                    key={ry}
                    x="11"
                    y={ry}
                    width="17"
                    height="5"
                    fill="#A17233"
                    stroke="#1E1B2A"
                    strokeWidth="2"
                  />
                ))}
                {/* Top launch deck & handrail */}
                <path
                  d="M 8 34 L 8 18 Q 8 14 14 14 L 30 14 Q 34 14 34 20 L 34 34"
                  fill="none"
                  stroke="#E59A00"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <rect x="6" y="32" width="32" height="8" rx="2" fill="#C49B66" stroke="#1E1B2A" strokeWidth="2.5" />

                {/* Grassy cushions at slide base */}
                <rect x="4" y="346" width="108" height="10" rx="4" fill="#4CAF50" stroke="#1E1B2A" strokeWidth="2.5" />
                <rect x="12" y="348" width="90" height="3" fill="#74C365" />

                {/* Slide Chute Dark Outline + Honey-Bamboo Chute Body */}
                <path
                  d="M 24 38 C 38 106, 58 206, 80 296 C 85 316, 94 330, 108 332"
                  fill="none"
                  stroke="#1E1B2A"
                  strokeWidth="24"
                  strokeLinecap="round"
                />
                <path
                  d="M 24 38 C 38 106, 58 206, 80 296 C 85 316, 94 330, 108 332"
                  fill="none"
                  stroke="#C49B66"
                  strokeWidth="19"
                  strokeLinecap="round"
                />
                <path
                  d="M 24 38 C 38 106, 58 206, 80 296 C 85 316, 94 330, 108 332"
                  fill="none"
                  stroke="#F6D58E"
                  strokeWidth="12"
                  strokeLinecap="round"
                />

                {/* Animated Emerald-Gold Trail lighting up behind Souvik as he slides */}
                <motion.path
                  d="M 24 38 C 38 106, 58 206, 80 296 C 85 316, 94 330, 108 332"
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="7"
                  strokeLinecap="round"
                  style={{ pathLength: expeditionProgress }}
                  opacity="0.72"
                />
              </svg>

              {/* Animated Souvik Sliding Down the Chute upon Scrolling */}
              <motion.div
                style={{ x: slideX, y: slideY, rotate: slideRotate }}
                className="absolute left-0 top-0 z-20 pointer-events-none will-change-transform"
              >
                <div className="w-16 h-20">
                  <PixelResearcher
                    stridePhase={0}
                    climbPhase={0}
                    isInspecting={false}
                    emote="slide"
                    className="w-full h-full"
                  />
                </div>
              </motion.div>

              {/* 3 Floating Wooden Signpost Medallions */}
              <div className="relative z-10 h-full flex flex-col justify-between pl-28 py-3">
                {MASTERS_CHAPTERS.map((ch, idx) => {
                  const Icon = stationIcons[idx] ?? Microscope;
                  const isCurrent = activeChapterIdx === idx;
                  const isPassed = activeChapterIdx > idx;

                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => scrollToChapter(ch.id)}
                      className={`text-left rounded-2xl px-4 py-3 border-2 border-[#18261C] transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#E59A00] text-[#18261C] shadow-[5px_5px_0_#18261C] translate-x-1.5 scale-[1.03]'
                          : isPassed
                            ? 'bg-[#2E7D32] text-white shadow-[3px_3px_0_#18261C] hover:opacity-95'
                            : 'bg-[#FFFDF7] text-[#2D3E31] shadow-[3px_3px_0_#D8E2D5] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span className="font-pixel text-sm font-bold">
                          {ch.stepNumber}.{' '}
                          {ch.id === 'biology'
                            ? 'Biology'
                            : ch.id === 'nesting'
                              ? 'Nesting Arch.'
                              : 'Foraging'}
                        </span>
                      </div>
                      <p
                        className={`font-mono-tabular text-[11px] mt-0.5 truncate ${
                          isPassed && !isCurrent ? 'text-[#EBF3E8]' : 'opacity-80'
                        }`}
                      >
                        {ch.id === 'biology'
                          ? '47.28 d brood cycle'
                          : ch.id === 'nesting'
                            ? '5-zone bamboo hive'
                            : 'Rapeseed PEI 492.91'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pl-28 space-y-3">
              <div>
                <p className="font-mono-tabular text-[10px] font-bold text-[#4C6050] uppercase">
                  Exploring Station {activeChapter.stepNumber} / 03
                </p>
                <p className="font-pixel text-sm font-bold text-[#18261C] truncate">
                  {activeChapter.title}
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggleSound}
                aria-pressed={soundEnabled}
                aria-label={soundEnabled ? 'Mute expedition sound effects' : 'Enable expedition sound effects'}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border-2 border-[#18261C] rounded-lg transition-colors cursor-pointer ${
                  soundEnabled
                    ? 'bg-[#2E7D32] text-white shadow-[2px_2px_0_#18261C]'
                    : 'bg-[#FFFDF7] text-[#18261C] hover:bg-[#EFECE2]'
                }`}
              >
                {soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                )}
                <span>{soundEnabled ? 'SFX On' : 'SFX Off'}</span>
              </button>
            </div>
          </aside>

          {/* RIGHT 3D PERSPECTIVE SCROLL CHAPTERS */}
          <div className="md:col-span-8 space-y-12 sm:space-y-16">
            {MASTERS_CHAPTERS.map((chapter, idx) => (
              <ChapterStage
                key={chapter.id}
                chapter={chapter}
                index={idx}
                isActive={activeChapterIdx === idx}
                onBecomeActive={handleStationBecomeActive}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
