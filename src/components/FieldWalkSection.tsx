import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'motion/react';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Flag,
  MapPin,
  Search,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  FIELD_MILESTONES,
  type FieldMilestone,
  type SpecimenDetail,
} from '../data/portfolioData';
import { soundFx } from '../utils/soundFx';
import { PixelBeeIcon, PixelResearcher, PixelStopProp } from './PixelSprites';

interface FieldWalkSectionProps {
  onSelectSpecimen: (specimen: SpecimenDetail, milestoneTitle: string) => void;
}

const TOTAL_PANELS = FIELD_MILESTONES.length + 1; // Panel 0 = Trailhead, Panels 1..6 = Milestones

// Piecewise dwell curve: character walks between stops and pauses right beside each landmark
const WALK_KEYFRAMES_INPUT = [
  0.0, 0.03,
  0.12, 0.19,
  0.28, 0.35,
  0.44, 0.51,
  0.6, 0.67,
  0.76, 0.83,
  0.91, 1.0,
];

const WALK_TRACK_OUTPUT = [
  '0%', '0%',
  '-14.285714%', '-14.285714%',
  '-28.571429%', '-28.571429%',
  '-42.857143%', '-42.857143%',
  '-57.142857%', '-57.142857%',
  '-71.428571%', '-71.428571%',
  '-85.714286%', '-85.714286%',
];

const WALK_CLOUDS_OUTPUT = [
  '0%', '0%',
  '-4.5%', '-4.5%',
  '-9%', '-9%',
  '-13.5%', '-13.5%',
  '-18%', '-18%',
  '-22.5%', '-22.5%',
  '-27%', '-27%',
];

const WALK_HILLS_OUTPUT = [
  '0%', '0%',
  '-7.5%', '-7.5%',
  '-15%', '-15%',
  '-22.5%', '-22.5%',
  '-30%', '-30%',
  '-37.5%', '-37.5%',
  '-45%', '-45%',
];

const WALK_MIDGROUND_OUTPUT = [
  '0%', '0%',
  '-10.5%', '-10.5%',
  '-21%', '-21%',
  '-31.5%', '-31.5%',
  '-42%', '-42%',
  '-52.5%', '-52.5%',
  '-63%', '-63%',
];

export const STOP_DWELL_RANGES: Array<{ start: number; end: number; center: number }> = [
  { start: 0.116, end: 0.194, center: 0.155 }, // Stop 01
  { start: 0.276, end: 0.354, center: 0.315 }, // Stop 02
  { start: 0.436, end: 0.514, center: 0.475 }, // Stop 03
  { start: 0.596, end: 0.674, center: 0.635 }, // Stop 04
  { start: 0.756, end: 0.834, center: 0.795 }, // Stop 05
  { start: 0.906, end: 1.0, center: 0.955 },   // Stop 06 (Now · PhD CAU)
];

export function FieldWalkSection({ onSelectSpecimen }: FieldWalkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const [arrivedStop, setArrivedStop] = useState<number | null>(null);
  const [hudStop, setHudStop] = useState<number>(-1); // -1 = Trailhead
  const [isWalking, setIsWalking] = useState(false);
  const [strideTick, setStrideTick] = useState(false);
  const [distanceMeters, setDistanceMeters] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const walkTimeoutRef = useRef<number | null>(null);
  const lastArrivedRef = useRef<number | null>(null);
  const lastStepSoundRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 64px', 'end end'],
  });

  const trackX = useTransform(scrollYProgress, WALK_KEYFRAMES_INPUT, WALK_TRACK_OUTPUT);
  const cloudsX = useTransform(scrollYProgress, WALK_KEYFRAMES_INPUT, WALK_CLOUDS_OUTPUT);
  const hillsX = useTransform(scrollYProgress, WALK_KEYFRAMES_INPUT, WALK_HILLS_OUTPUT);
  const midgroundX = useTransform(scrollYProgress, WALK_KEYFRAMES_INPUT, WALK_MIDGROUND_OUTPUT);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.min(1, Math.max(0, latest));
    setDistanceMeters(Math.round(clamped * 600));

    let matchedStop: number | null = null;
    let closestHudStop = -1;

    for (let i = 0; i < STOP_DWELL_RANGES.length; i++) {
      const range = STOP_DWELL_RANGES[i];
      if (clamped >= range.start) {
        closestHudStop = i;
      }
      if (clamped >= range.start && clamped <= range.end) {
        matchedStop = i;
      }
    }

    setHudStop(closestHudStop);

    // Pop the milestone box & play the arrival SFX on the EXACT same frame
    if (matchedStop !== lastArrivedRef.current) {
      lastArrivedRef.current = matchedStop;
      setArrivedStop(matchedStop);
      if (matchedStop !== null) {
        soundFx.playMilestoneArrive(matchedStop === FIELD_MILESTONES.length - 1);
      }
    }

    // Only walk & play footstep SFX when moving between stops (not while dwelling at a stop!)
    if (matchedStop === null && clamped > 0.025) {
      setIsWalking(true);
      const now = Date.now();
      if (now - lastStepSoundRef.current > 210) {
        lastStepSoundRef.current = now;
        soundFx.playStep();
      }
      if (walkTimeoutRef.current !== null) {
        window.clearTimeout(walkTimeoutRef.current);
      }
      walkTimeoutRef.current = window.setTimeout(() => {
        setIsWalking(false);
      }, 150);
    } else {
      setIsWalking(false);
      if (walkTimeoutRef.current !== null) {
        window.clearTimeout(walkTimeoutRef.current);
        walkTimeoutRef.current = null;
      }
    }
  });

  // 2-frame pixel stride cycle while walking
  useEffect(() => {
    if (!isWalking) {
      setStrideTick(false);
      return;
    }
    const timer = window.setInterval(() => {
      setStrideTick((prev) => !prev);
    }, 125);
    return () => window.clearInterval(timer);
  }, [isWalking]);

  useEffect(() => {
    return () => {
      if (walkTimeoutRef.current !== null) {
        window.clearTimeout(walkTimeoutRef.current);
      }
    };
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFx.setEnabled(next);
  };

  // stopIndex: -1 = Trailhead, 0..5 = Milestones 01..06
  const scrollToStop = (stopIndex: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const clamped = Math.min(FIELD_MILESTONES.length - 1, Math.max(-1, stopIndex));
    const rect = el.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top - 64;
    const scrollableDistance = el.offsetHeight - (window.innerHeight - 64);
    if (scrollableDistance <= 0) return;
    const ratio = clamped < 0 ? 0 : STOP_DWELL_RANGES[clamped].center;
    window.scrollTo({
      top: sectionTop + scrollableDistance * ratio,
      behavior: 'smooth',
    });
  };

  const handleInspectClick = (milestone: FieldMilestone) => {
    soundFx.playInspectOpen();
    onSelectSpecimen(milestone.specimen, `${milestone.stepNumber}. ${milestone.shortTitle}`);
  };

  const activeMilestone = hudStop >= 0 ? FIELD_MILESTONES[hudStop] : null;
  const stridePhase: 0 | 1 | 2 = !isWalking ? 0 : strideTick ? 1 : 2;

  return (
    <section
      id="field-walk"
      ref={sectionRef}
      aria-label="Scroll-Driven Agricultural Field Walk"
      className="relative h-[560vh] bg-transparent"
    >
      {/* Sticky Field Stage across all viewports */}
      <div
        className="sticky top-16 h-[calc(100vh-4rem)] w-full overflow-hidden flex flex-col justify-between bg-[#CDEAF8]/20 border-b-4 border-[#18261C]"
      >
        {/* ================= FIELD HUD BAR ================= */}
        <div className="relative z-30 bg-[#FFFDF7] border-b-3 border-[#18261C] px-3 sm:px-6 py-2.5">
          <div className="max-w-[1160px] mx-auto flex items-center justify-between gap-3 sm:gap-5">
            {/* Active Milestone & Distance */}
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-pixel text-xs sm:text-sm px-2 py-0.5 bg-[#18261C] text-[#FFF8E1] tabular-nums shrink-0">
                {activeMilestone ? `${activeMilestone.stepNumber}/0${FIELD_MILESTONES.length}` : 'START'}
              </span>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-[#18261C] truncate">
                  {activeMilestone ? activeMilestone.shortTitle : 'Trailhead'}
                </p>
                <p className="text-[11px] text-[#4C6050] flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-[#2E7D32] shrink-0" aria-hidden="true" />
                  <span className="truncate">
                    {activeMilestone ? activeMilestone.location : 'Scroll to start walking'}
                  </span>
                  <span aria-hidden="true" className="hidden sm:inline mx-1">
                    ·
                  </span>
                  <span className="hidden sm:inline font-mono-tabular font-semibold text-[#18261C]">
                    {distanceMeters}m
                  </span>
                </p>
              </div>
            </div>

            {/* Interactive Milestone Progress Bar */}
            <div
              className="hidden sm:block flex-1 max-w-lg"
              role="group"
              aria-label="Field walk milestones"
            >
              <div className="relative flex items-center justify-between">
                <div
                  aria-hidden="true"
                  className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-2 bg-[#E6DEC8] border border-[#18261C]"
                >
                  <motion.div
                    className="h-full bg-[#2E7D32] origin-left"
                    style={{ scaleX: scrollYProgress }}
                  />
                </div>

                {FIELD_MILESTONES.map((milestone, idx) => {
                  const isArrived = arrivedStop === idx;
                  const isVisited = hudStop >= idx;
                  return (
                    <button
                      key={milestone.id}
                      type="button"
                      onClick={() => scrollToStop(idx)}
                      title={`${milestone.stepNumber}. ${milestone.shortTitle}`}
                      aria-label={`Jump to milestone ${milestone.stepNumber}: ${milestone.shortTitle}`}
                      aria-current={isArrived ? 'step' : undefined}
                      className={`relative z-10 w-8 h-8 font-mono-tabular text-[11px] font-bold border-2 border-[#18261C] transition-transform cursor-pointer flex items-center justify-center ${
                        isArrived
                          ? 'bg-[#E59A00] text-[#18261C] scale-110'
                          : isVisited
                            ? 'bg-[#2E7D32] text-white hover:scale-105'
                            : 'bg-[#FFFDF7] text-[#4C6050] hover:bg-[#EEF5EA]'
                      }`}
                    >
                      {milestone.isNowStop ? 'NOW' : milestone.stepNumber}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Controls & 8-Bit Audio Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => scrollToStop(hudStop - 1)}
                disabled={hudStop <= -1}
                aria-label="Previous field stop"
                className="w-8 h-8 sm:w-9 sm:h-9 inline-flex items-center justify-center bg-white hover:bg-[#EFECE2] border-2 border-[#18261C] disabled:opacity-35 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollToStop(hudStop + 1)}
                disabled={hudStop >= FIELD_MILESTONES.length - 1}
                aria-label="Next field stop"
                className="w-8 h-8 sm:w-9 sm:h-9 inline-flex items-center justify-center bg-[#E59A00] hover:bg-[#F2B705] border-2 border-[#18261C] disabled:opacity-35 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleToggleSound}
                aria-pressed={soundEnabled}
                aria-label={soundEnabled ? 'Mute 8-bit sound effects' : 'Enable 8-bit sound effects'}
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 h-8 sm:h-9 text-xs font-bold border-2 border-[#18261C] transition-colors whitespace-nowrap cursor-pointer ${
                  soundEnabled
                    ? 'bg-[#2E7D32] text-white'
                    : 'bg-white text-[#18261C] hover:bg-[#EFECE2]'
                }`}
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                ) : (
                  <VolumeX className="w-4 h-4 shrink-0" aria-hidden="true" />
                )}
                <span className="hidden md:inline">
                  {soundEnabled ? 'SFX On' : 'SFX Off'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= PARALLAX PIXEL WORLD CANVAS ================= */}
        <div className="relative flex-1 w-full overflow-hidden">

          {/* Parallax Layer 1: Pixel Clouds */}
          <motion.div
            style={{ x: cloudsX }}
            aria-hidden="true"
            className="absolute top-5 left-0 w-[190%] flex justify-around pointer-events-none"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
              <svg
                key={n}
                viewBox="0 0 64 24"
                className="w-24 sm:w-32 h-10 pixel-render opacity-90"
                shapeRendering="crispEdges"
              >
                <rect x="14" y="6" width="28" height="12" fill="#FFFFFF" />
                <rect x="8" y="10" width="44" height="8" fill="#FFFFFF" />
                <rect x="20" y="2" width="16" height="6" fill="#FFFFFF" />
                <rect x="8" y="16" width="44" height="2" fill="#D5EEF8" />
              </svg>
            ))}
          </motion.div>

          {/* Parallax Layer 2: Distant Hills */}
          <motion.div
            style={{ x: hillsX }}
            aria-hidden="true"
            className="absolute bottom-[68px] left-0 w-[230%] h-36 sm:h-48 pointer-events-none"
          >
            <svg
              viewBox="0 0 1600 160"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <polygon
                points="0,160 0,130 140,122 280,128 420,96 580,58 720,98 880,42 1040,86 1200,32 1360,78 1500,48 1600,80 1600,160"
                fill="#9BC9A4"
              />
              <polygon
                points="0,160 0,142 180,134 340,140 500,112 640,88 790,118 960,76 1120,108 1280,68 1440,104 1600,82 1600,160"
                fill="#6BA877"
              />
            </svg>
          </motion.div>

          {/* Parallax Layer 3: Midground Bamboo Groves & Wooden Fences */}
          <motion.div
            style={{ x: midgroundX }}
            aria-hidden="true"
            className="absolute bottom-[68px] left-0 w-[320%] h-20 flex items-end justify-around pointer-events-none"
          >
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className="flex items-end gap-4 opacity-80">
                {i % 2 === 0 ? (
                  <div className="flex items-end gap-1.5">
                    <div className="w-2.5 h-14 bg-[#458B4B]" />
                    <div className="w-2.5 h-20 bg-[#2E7D32]" />
                    <div className="w-2 h-11 bg-[#56A05C]" />
                  </div>
                ) : (
                  <div className="flex items-end gap-5">
                    <div className="w-2.5 h-8 bg-[#7B593B] border border-[#18261C]" />
                    <div className="w-12 h-2 bg-[#9B724E] border border-[#18261C] mb-4 -mx-6" />
                    <div className="w-2.5 h-8 bg-[#7B593B] border border-[#18261C]" />
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Main 700% Foreground Track: Panel 0 = Trailhead, Panels 1..6 = Stops 01..06 */}
          <motion.div
            className="relative z-10 h-full flex"
            style={{ x: trackX, width: `${TOTAL_PANELS * 100}%` }}
          >
            {/* Panel 0: Trailhead */}
            <div
              className="h-full relative"
              style={{ width: `${100 / TOTAL_PANELS}%` }}
            >
              <div className="absolute bottom-[65px] left-[36%] sm:left-[34%] flex items-end gap-4">
                <div className="flex flex-col items-start">
                  <div className="px-3 py-1.5 bg-[#FFFDF7] border-2 border-[#18261C] pixel-box-sm font-pixel text-xs text-[#18261C] mb-1 whitespace-nowrap">
                    SCROLL TO WALK →
                  </div>
                  <svg viewBox="0 0 24 28" className="w-12 h-14 pixel-render" shapeRendering="crispEdges" aria-hidden="true">
                    <rect x="10" y="10" width="4" height="18" fill="#6D4C41" />
                    <rect x="2" y="4" width="18" height="8" fill="#D7A449" />
                    <rect x="3" y="5" width="16" height="6" fill="#F2C879" />
                    <rect x="19" y="6" width="3" height="4" fill="#D7A449" />
                    <rect x="5" y="7" width="10" height="2" fill="#18261C" />
                  </svg>
                </div>

                <svg viewBox="0 0 28 16" aria-hidden="true" className="w-10 h-6 pixel-render" shapeRendering="crispEdges">
                  <rect x="5" y="8" width="2" height="8" fill="#2E7D32" />
                  <rect x="4" y="5" width="4" height="3" fill="#F2B705" />
                  <rect x="14" y="10" width="2" height="6" fill="#388E3C" />
                  <rect x="21" y="7" width="2" height="9" fill="#2E7D32" />
                  <rect x="20" y="4" width="4" height="3" fill="#FFFDF7" />
                </svg>
              </div>
            </div>

            {/* Panels 1..6: Milestone Stops */}
            {FIELD_MILESTONES.map((milestone, idx) => {
              const isArrived = arrivedStop === idx;

              return (
                <div
                  key={milestone.id}
                  className="h-full relative"
                  style={{ width: `${100 / TOTAL_PANELS}%` }}
                >
                  {/* Milestone Prop placed at left-[34%] right next to Souvik's hand lens */}
                  <div className="absolute bottom-[65px] left-[32%] sm:left-[33%] right-4 flex flex-col items-start">
                    {/* Pop-up Retro Quest Plaque (strictly synchronized with dwell arrival!) */}
                    <div className="mb-2 min-h-[150px] flex items-end">
                      <AnimatePresence>
                        {isArrived && (
                          <motion.article
                            key={milestone.id}
                            initial={{ opacity: 0, scale: 0.82, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.86, y: 8 }}
                            transition={{
                              type: 'spring',
                              stiffness: 460,
                              damping: 26,
                            }}
                            className="relative w-[236px] sm:w-[360px] bg-[#FFFDF7] border-2 border-[#18261C] pixel-box"
                          >
                            {/* Two-Tone Header Strip */}
                            <div
                              className={`px-3.5 py-1.5 border-b-2 border-[#18261C] flex items-center justify-between gap-2 ${
                                milestone.isNowStop
                                  ? 'bg-[#2E7D32] text-[#FFFDF7]'
                                  : milestone.isPatentStop
                                    ? 'bg-[#E59A00] text-[#18261C]'
                                    : 'bg-[#18261C] text-[#FFF8E1]'
                              }`}
                            >
                              <span className="font-pixel text-[11px] sm:text-xs tracking-wide truncate">
                                {milestone.stepNumber} · {milestone.eraLabel}
                              </span>
                              {milestone.isPatentStop ? (
                                <span className="inline-flex items-center gap-1 font-pixel text-[10px] shrink-0">
                                  <Award className="w-3 h-3" aria-hidden="true" />
                                  <span>PATENT</span>
                                </span>
                              ) : milestone.isNowStop ? (
                                <span className="inline-flex items-center gap-1 font-pixel text-[10px] shrink-0">
                                  <Flag className="w-3 h-3" aria-hidden="true" />
                                  <span>NOW</span>
                                </span>
                              ) : (
                                <span className="font-mono-tabular text-[10px] opacity-85 truncate">
                                  {milestone.location}
                                </span>
                              )}
                            </div>

                            {/* Compact 1-Line Body */}
                            <div className="p-3 sm:p-4">
                              <h2 className="font-pixel text-base sm:text-lg font-bold text-[#18261C] leading-snug mb-1">
                                {milestone.title}
                              </h2>

                              <p className="text-xs sm:text-[13px] text-[#2D3E31] leading-snug mb-3">
                                {milestone.oneLiner}
                              </p>

                              <div className="flex items-center justify-between gap-2">
                                <span className="font-mono-tabular text-[10px] sm:text-[11px] text-[#4C6050] truncate">
                                  {milestone.institution}
                                </span>
                                {!milestone.isNowStop && (
                                  <button
                                    type="button"
                                    onClick={() => handleInspectClick(milestone)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-[#18261C] bg-[#E59A00] hover:bg-[#F2B705] border-2 border-[#18261C] whitespace-nowrap shrink-0 cursor-pointer"
                                  >
                                    <Search className="w-3 h-3" aria-hidden="true" />
                                    <span>Inspect</span>
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Crisp SVG Pixel Speech Pointer aimed down at Prop & Souvik */}
                            <svg
                              viewBox="0 0 18 10"
                              aria-hidden="true"
                              className="absolute -bottom-[10px] left-6 w-4 h-2.5 pointer-events-none"
                            >
                              <polygon points="0,0 18,0 6,10" fill="#18261C" />
                              <polygon points="2,0 15,0 6,8" fill="#FFFDF7" />
                            </svg>
                          </motion.article>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Ground-Level Plant / Hive / Patent Prop seated flush on grass right beside Souvik */}
                    <div className="flex items-end gap-3">
                      {milestone.isNowStop ? (
                        <div className="relative flex flex-col items-start">
                          <span className="mb-1 font-mono-tabular text-[10px] font-bold text-[#18261C] bg-[#FFFDF7]/95 px-1.5 py-0.5 border border-[#18261C] whitespace-nowrap">
                            {milestone.stepNumber} · {milestone.shortTitle}
                          </span>
                          <div className="relative">
                            <PixelStopProp
                              specimenId={milestone.specimen.id}
                              className="w-20 h-20 sm:w-28 sm:h-28"
                            />
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleInspectClick(milestone)}
                          className="group relative flex flex-col items-start cursor-pointer transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-[#18261C]"
                          aria-label={`Inspect ${milestone.specimen.commonName}`}
                        >
                          <span className="mb-1 font-mono-tabular text-[10px] font-bold text-[#18261C] bg-[#FFFDF7]/95 px-1.5 py-0.5 border border-[#18261C] whitespace-nowrap">
                            {milestone.stepNumber} · {milestone.shortTitle}
                          </span>
                          <div className="relative">
                            <PixelStopProp
                              specimenId={milestone.specimen.id}
                              className="w-20 h-20 sm:w-28 sm:h-28"
                            />
                            {(milestone.specimen.id === 'stingless-bee' ||
                              milestone.specimen.id === 'mustard-blossom') && (
                              <div className="absolute -top-2 -right-2 animate-bee-hover">
                                <PixelBeeIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                              </div>
                            )}
                          </div>
                        </button>
                      )}

                      <svg
                        viewBox="0 0 28 16"
                        aria-hidden="true"
                        className="w-10 h-6 pixel-render"
                        shapeRendering="crispEdges"
                      >
                        <rect x="5" y="7" width="2" height="9" fill="#2E7D32" />
                        <rect x="4" y="4" width="4" height="3" fill="#FF8A65" />
                        <rect x="14" y="10" width="2" height="6" fill="#4CAF50" />
                        <rect x="21" y="8" width="2" height="8" fill="#2E7D32" />
                        <rect x="20" y="5" width="4" height="3" fill="#F2B705" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Clean Fixed-in-frame Walking Pixel Researcher Sprite positioned right beside the left-[33%] prop */}
          <div className="pointer-events-none absolute bottom-[65px] left-[8%] sm:left-[22%] z-20">
            <div className="w-20 h-24 sm:w-24 sm:h-28">
              <PixelResearcher
                stridePhase={stridePhase}
                isInspecting={!isWalking && arrivedStop !== null}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Foreground Turf & Soil Horizon */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[68px] z-10 pointer-events-none"
          >
            <div className="h-4 bg-[#4CAF50] border-t-3 border-[#18261C]" />
            <div className="h-2.5 bg-[#2E7D32]" />
            <div className="h-[42px] bg-[#543B28] flex items-center justify-around">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="w-5 h-2 bg-[#362417]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
