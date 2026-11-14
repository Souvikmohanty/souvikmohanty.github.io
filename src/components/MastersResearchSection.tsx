import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react';
import { ArrowDown, Layers, Microscope, Sun, Volume2, VolumeX } from 'lucide-react';
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
        {/* C-shaped creamy larva */}
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
      {/* Exarate pupa */}
      <rect x="8" y="4" width="8" height="5" fill="#6D4C41" />
      <rect x="9" y="6" width="2" height="2" fill="#18261C" />
      <rect x="13" y="6" width="2" height="2" fill="#18261C" />
      <rect x="7" y="9" width="10" height="7" fill="#D7A449" />
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
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const expeditionRef = useRef<HTMLDivElement>(null);

  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [isClimbing, setIsClimbing] = useState(false);
  const [strideTick, setStrideTick] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => soundFx.isEnabled());

  const climbTimeoutRef = useRef<number | null>(null);
  const lastClimbSoundRef = useRef(0);
  const lastStationRef = useRef(0);
  const burrowChimePlayedRef = useRef(false);

  // Scroll-linked descent through the subterranean burrow diorama
  const { scrollYProgress: dropProgress } = useScroll({
    target: dropZoneRef,
    offset: ['start 90%', 'end 35%'],
  });
  const dropCharacterY = useTransform(dropProgress, [0, 1], [6, 132]);
  const parallaxRootsX = useTransform(dropProgress, [0, 1], [-12, 12]);
  const parallaxDoorX = useTransform(dropProgress, [0, 1], [12, -12]);
  const parallaxBeesY = useTransform(dropProgress, [0, 1], [20, -18]);

  // Scroll-linked vertical expedition progress through the 3 thesis chapters
  const { scrollYProgress: expeditionProgress } = useScroll({
    target: expeditionRef,
    offset: ['start 25%', 'end 75%'],
  });
  const vineWalkerY = useTransform(expeditionProgress, [0, 1], [8, 290]);
  const mobileWalkerX = useTransform(expeditionProgress, [0, 1], ['2%', '81%']);
  const mobileWalkerY = useTransform(expeditionProgress, [0, 1], [0, 8]);

  const triggerClimb = (latest?: number) => {
    setIsClimbing(true);
    const now = Date.now();
    if (
      (latest === undefined || (latest > 0.02 && latest < 0.98)) &&
      now - lastClimbSoundRef.current > 220
    ) {
      lastClimbSoundRef.current = now;
      soundFx.playClimbStep();
    }
    if (climbTimeoutRef.current !== null) {
      window.clearTimeout(climbTimeoutRef.current);
    }
    climbTimeoutRef.current = window.setTimeout(() => {
      setIsClimbing(false);
    }, 150);
  };

  useMotionValueEvent(dropProgress, 'change', (latest) => {
    triggerClimb(latest);
    if (latest > 0.14 && latest < 0.85) {
      if (!burrowChimePlayedRef.current) {
        burrowChimePlayedRef.current = true;
        soundFx.playBurrowEnter();
      }
    } else if (latest <= 0.05 || latest >= 0.96) {
      burrowChimePlayedRef.current = false;
    }
  });
  useMotionValueEvent(expeditionProgress, 'change', (latest) => {
    triggerClimb(latest);
  });

  useEffect(() => {
    if (!isClimbing) {
      setStrideTick(false);
      return;
    }
    const timer = window.setInterval(() => {
      setStrideTick((prev) => !prev);
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

  const stridePhase: 0 | 1 | 2 = !isClimbing ? 0 : strideTick ? 1 : 2;
  const activeChapter = MASTERS_CHAPTERS[activeChapterIdx] ?? MASTERS_CHAPTERS[0];
  const stationIcons = [Microscope, Layers, Sun];

  return (
    <section
      id="masters-research"
      aria-labelledby="masters-research-heading"
      className="relative notebook-grid pb-10 overflow-x-clip"
    >
      {/* ================= CREATIVE SUBTERRANEAN BURROW LADDER DROP ================= */}
      <div
        ref={dropZoneRef}
        className="relative bg-[#543B28] border-b-4 border-[#18261C] overflow-hidden"
      >
        {/* Top soil grass-to-earth root fringe */}
        <div
          aria-hidden="true"
          className="h-4 w-full bg-[#3E2A1C] border-b-2 border-[#18261C] flex items-center justify-around"
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="w-3 h-2 bg-[#2B1B11]" />
          ))}
        </div>

        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 relative h-[270px] sm:h-[290px] grid grid-cols-12 items-stretch">
          {/* LEFT SUBTERRANEAN DIORAMA: Hanging roots, embedded bamboo hive & pollen pots */}
          <motion.div
            style={{ x: parallaxRootsX }}
            aria-hidden="true"
            className="hidden sm:flex col-span-4 flex-col justify-between py-6 pr-4 pointer-events-none"
          >
            {/* Dangling Roots & Glowing Resin Stones */}
            <div className="flex items-start gap-6">
              <svg viewBox="0 0 40 36" className="w-16 h-14 pixel-render" shapeRendering="crispEdges">
                <rect x="6" y="0" width="3" height="24" fill="#8D6E63" />
                <rect x="9" y="10" width="6" height="2" fill="#8D6E63" />
                <rect x="18" y="0" width="4" height="30" fill="#6D4C41" />
                <rect x="22" y="16" width="8" height="2" fill="#6D4C41" />
                <rect x="30" y="0" width="2" height="18" fill="#8D6E63" />
              </svg>
              <div className="bg-[#3E2A1C] border-2 border-[#18261C] px-3 py-2 text-[#FFF8E1] shadow-[3px_3px_0_#18261C]">
                <p className="font-pixel text-[11px] text-[#FFE066]">UNDERGROUND NEST</p>
                <p className="font-mono-tabular text-[10px] opacity-85">
                  Entering IBDC Study Shaft
                </p>
              </div>
            </div>

            {/* Buried Bamboo Hive & Amber Honey Pots */}
            <div className="flex items-end gap-4">
              <svg viewBox="0 0 48 28" className="w-24 h-14 pixel-render" shapeRendering="crispEdges">
                {/* Buried bamboo log segment */}
                <rect x="2" y="8" width="44" height="14" fill="#A17233" />
                <rect x="2" y="8" width="44" height="3" fill="#D7A449" />
                <rect x="2" y="19" width="44" height="3" fill="#6D4C41" />
                <rect x="14" y="8" width="2" height="14" fill="#6D4C41" />
                <rect x="32" y="8" width="2" height="14" fill="#6D4C41" />
                {/* Glowing honey pots inside */}
                <rect x="19" y="12" width="4" height="5" fill="#F2B705" />
                <rect x="25" y="13" width="4" height="4" fill="#FFE066" />
              </svg>
              <motion.div style={{ y: parallaxBeesY }} className="animate-bee-hover mb-4">
                <PixelBeeIcon className="w-7 h-7" />
              </motion.div>
            </div>
          </motion.div>

          {/* CENTER CARVED LADDER SHAFT + DESCENDING SOUVIK */}
          <div className="col-span-12 sm:col-span-4 flex flex-col items-center justify-between relative">
            {/* Carved Lighter Earth Burrow Shaft */}
            <div className="relative w-44 sm:w-48 h-full bg-[#362417] border-x-4 border-[#18261C] flex flex-col items-center">
              {/* Top Wooden Trapdoor Sign */}
              <div className="mt-3 z-20 px-3 py-1 bg-[#FFE066] border-2 border-[#18261C] shadow-[3px_3px_0_#18261C] font-pixel text-[11px] text-[#18261C] flex items-center gap-1.5 whitespace-nowrap">
                <ArrowDown className="w-3 h-3" aria-hidden="true" />
                <span>DOWN TO M.SC. LAB</span>
                <ArrowDown className="w-3 h-3" aria-hidden="true" />
              </div>

              {/* Hanging Pixel Lanterns Left & Right */}
              <div
                aria-hidden="true"
                className="absolute top-14 left-2.5 w-3 h-4 bg-[#F2B705] border border-[#18261C] shadow-[0_0_12px_rgba(242,183,5,0.7)]"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-14 right-2.5 w-3 h-4 bg-[#F2B705] border border-[#18261C] shadow-[0_0_12px_rgba(242,183,5,0.7)]"
              />

              {/* Full-height Wooden Ladder */}
              <div
                aria-hidden="true"
                className="w-11 flex-1 border-x-4 border-[#8D6E63] bg-[#6D4C41]/25 flex flex-col justify-evenly py-1 my-1"
              >
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="h-1.5 w-full bg-[#A17233] border-y border-[#18261C]" />
                ))}
              </div>

              {/* Descending Researcher & Stingless Bee Companion */}
              <motion.div
                style={{ y: dropCharacterY }}
                className="absolute top-10 z-20 flex items-center gap-1 pointer-events-none"
              >
                <div className="w-16 h-20">
                  <PixelResearcher
                    stridePhase={stridePhase}
                    isInspecting={false}
                    className="w-full h-full"
                  />
                </div>
                <div className="animate-bee-hover -mt-8">
                  <PixelBeeIcon className="w-6 h-6" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT SUBTERRANEAN DIORAMA: Microscope Lab Doorway + Glowing Sign */}
          <motion.div
            style={{ x: parallaxDoorX }}
            aria-hidden="true"
            className="hidden sm:flex col-span-4 flex-col justify-between items-end py-6 pl-4 pointer-events-none"
          >
            {/* Buried stones & rootlets */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-4 bg-[#6D4C41] border-2 border-[#18261C]" />
              <div className="w-10 h-5 bg-[#4E342E] border-2 border-[#18261C]" />
              <div className="w-4 h-3 bg-[#8D6E63] border-2 border-[#18261C]" />
            </div>

            {/* Subterranean Wooden Field Lab Doorway */}
            <div className="flex items-end gap-4">
              <div className="bg-[#FFFDF7] border-2 border-[#18261C] px-3 py-2 shadow-[4px_4px_0_#2E7D32]">
                <p className="font-pixel text-xs text-[#2E7D32]">3 CHAPTERS AHEAD</p>
                <p className="font-mono-tabular text-[10px] text-[#18261C]">
                  Biology · Nesting · Foraging
                </p>
              </div>
              <svg viewBox="0 0 32 36" className="w-16 h-18 pixel-render" shapeRendering="crispEdges">
                {/* Warm glowing arched lab door */}
                <rect x="4" y="4" width="24" height="32" fill="#2E7D32" />
                <rect x="7" y="7" width="18" height="29" fill="#8D6E63" />
                <rect x="10" y="11" width="12" height="10" fill="#FFE066" />
                <rect x="21" y="24" width="2" height="3" fill="#F2B705" />
              </svg>
            </div>
          </motion.div>
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
          {/* LEFT FLOATING BAMBOO-VINE VERTICAL TRAIL (No outer box!) */}
          <aside className="hidden md:block md:col-span-4 sticky top-28">
            <div className="relative h-[400px] pl-2">
              {/* Vertical Bamboo Stalk Track */}
              <div
                aria-hidden="true"
                className="absolute left-9 top-6 bottom-6 w-3.5 rounded-full bg-[#E6DEC8] border-2 border-[#18261C] overflow-hidden"
              >
                <motion.div
                  style={{ scaleY: expeditionProgress, originY: 0 }}
                  className="w-full h-full bg-[#2E7D32]"
                />
              </div>

              {/* Animated Souvik + Bee Climbing Down the Open Vine */}
              <motion.div
                style={{ y: vineWalkerY }}
                className="absolute left-1 z-20 pointer-events-none flex items-start"
              >
                <div className="w-16 h-20">
                  <PixelResearcher
                    stridePhase={stridePhase}
                    isInspecting={!isClimbing}
                    className="w-full h-full"
                  />
                </div>
                <div className="animate-bee-hover -ml-3 mt-1">
                  <PixelBeeIcon className="w-5 h-5" />
                </div>
              </motion.div>

              {/* 3 Floating Wooden Signpost Medallions */}
              <div className="relative z-10 h-full flex flex-col justify-between pl-16 py-3">
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

            <div className="mt-4 pl-16 space-y-3">
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
