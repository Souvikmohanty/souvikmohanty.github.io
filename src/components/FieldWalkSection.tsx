import { useEffect, useMemo, useRef, useState } from 'react';
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
import {
  PixelAmbientInsect,
  PixelBeeIcon,
  PixelHurdle,
  PixelResearcher,
  PixelStopProp,
} from './PixelSprites';

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

const WALK_SEGMENTS: Array<[number, number]> = [
  [0.03, 0.12],
  [0.19, 0.28],
  [0.35, 0.44],
  [0.51, 0.6],
  [0.67, 0.76],
  [0.83, 0.91],
];

const HURDLE_SLOTS = [
  { frac: 0.37, posClass: 'left-[55%] sm:left-[62%]' },
  { frac: 0.46, posClass: 'left-[64%] sm:left-[71%]' },
  { frac: 0.54, posClass: 'left-[72%] sm:left-[79%]' },
  { frac: 0.62, posClass: 'left-[80%] sm:left-[87%]' },
];

const AMBIENT_POS_CLASSES = [
  'left-[14%]',
  'left-[26%]',
  'left-[46%]',
  'left-[58%]',
  'left-[74%]',
  'left-[89%]',
];

const AMBIENT_KINDS: Array<'butterfly' | 'dragonfly' | 'beetle' | 'stone'> = [
  'stone',
  'beetle',
  'butterfly',
  'dragonfly',
];

function MidgroundLandmark({ kind }: { kind: number }) {
  switch (kind % 8) {
    case 0:
      /* Traditional Apiary Bee-Box Stand */
      return (
        <div className="flex items-end gap-2">
          <svg viewBox="0 0 36 28" className="w-16 h-12 pixel-render" shapeRendering="crispEdges">
            <rect x="4" y="16" width="28" height="3" fill="#5D4037" />
            <rect x="6" y="19" width="3" height="9" fill="#4E342E" />
            <rect x="27" y="19" width="3" height="9" fill="#4E342E" />
            <rect x="7" y="9" width="10" height="7" fill="#D7A449" />
            <rect x="6" y="7" width="12" height="2" fill="#2E7D32" />
            <rect x="19" y="10" width="10" height="6" fill="#E6BE73" />
            <rect x="18" y="8" width="12" height="2" fill="#E59A00" />
            <rect x="11" y="13" width="2" height="2" fill="#18261C" />
            <rect x="23" y="13" width="2" height="2" fill="#18261C" />
          </svg>
        </div>
      );
    case 1:
      /* Lush Banyan Tree with Aerial Roots */
      return (
        <svg viewBox="0 0 44 36" className="w-20 h-16 pixel-render" shapeRendering="crispEdges">
          <rect x="18" y="16" width="8" height="20" fill="#6D4C41" />
          <rect x="11" y="18" width="2" height="18" fill="#5D4037" />
          <rect x="31" y="18" width="2" height="18" fill="#5D4037" />
          <rect x="6" y="8" width="32" height="10" fill="#2E7D32" />
          <rect x="10" y="3" width="24" height="7" fill="#4CAF50" />
          <rect x="16" y="10" width="10" height="4" fill="#66BB6A" />
        </svg>
      );
    case 2:
      /* Field Irrigation Pond & Reeds */
      return (
        <svg viewBox="0 0 48 24" className="w-20 h-10 pixel-render" shapeRendering="crispEdges">
          <rect x="4" y="18" width="40" height="5" fill="#4FC3F7" />
          <rect x="8" y="16" width="32" height="3" fill="#81D4FA" />
          <rect x="10" y="7" width="2" height="13" fill="#2E7D32" />
          <rect x="14" y="10" width="2" height="10" fill="#388E3C" />
          <rect x="9" y="5" width="4" height="3" fill="#6D4C41" />
          <rect x="34" y="11" width="2" height="9" fill="#2E7D32" />
          <rect x="20" y="17" width="6" height="2" fill="#4CAF50" />
          <rect x="22" y="15" width="3" height="2" fill="#F4A6BE" />
        </svg>
      );
    case 3:
      /* Countryside Farm Windmill */
      return (
        <svg viewBox="0 0 32 40" className="w-14 h-18 pixel-render" shapeRendering="crispEdges">
          <rect x="13" y="12" width="6" height="28" fill="#8D6E63" />
          <rect x="11" y="28" width="10" height="12" fill="#6D4C41" />
          <rect x="14" y="9" width="4" height="4" fill="#E59A00" />
          <rect x="6" y="9" width="8" height="2" fill="#FFFDF7" />
          <rect x="18" y="9" width="8" height="2" fill="#FFFDF7" />
          <rect x="15" y="2" width="2" height="8" fill="#FFFDF7" />
          <rect x="15" y="12" width="2" height="8" fill="#FFFDF7" />
        </svg>
      );
    case 4:
      /* Blooming Manipur Siroi Lily & Wildflower Clump */
      return (
        <svg viewBox="0 0 36 24" className="w-16 h-10 pixel-render" shapeRendering="crispEdges">
          <rect x="8" y="12" width="2" height="12" fill="#2E7D32" />
          <rect x="6" y="8" width="6" height="4" fill="#F4A6BE" />
          <rect x="18" y="10" width="2" height="14" fill="#388E3C" />
          <rect x="15" y="6" width="8" height="4" fill="#FAD4E0" />
          <rect x="18" y="7" width="2" height="2" fill="#E59A00" />
          <rect x="28" y="13" width="2" height="11" fill="#2E7D32" />
          <rect x="26" y="10" width="6" height="3" fill="#FFFDF7" />
        </svg>
      );
    case 5:
      /* Golden Mustard / Rapeseed Crop Rows */
      return (
        <svg viewBox="0 0 44 24" className="w-20 h-11 pixel-render" shapeRendering="crispEdges">
          <rect x="4" y="13" width="2" height="11" fill="#2E7D32" />
          <rect x="3" y="9" width="4" height="4" fill="#F2B705" />
          <rect x="12" y="11" width="2" height="13" fill="#388E3C" />
          <rect x="10" y="7" width="6" height="4" fill="#FFE066" />
          <rect x="22" y="12" width="2" height="12" fill="#2E7D32" />
          <rect x="20" y="8" width="6" height="4" fill="#F2B705" />
          <rect x="32" y="10" width="2" height="14" fill="#388E3C" />
          <rect x="30" y="6" width="6" height="4" fill="#FFE066" />
        </svg>
      );
    case 6:
      /* Tall Staggered Bamboo Grove */
      return (
        <div className="flex items-end gap-1.5">
          <div className="w-2.5 h-14 bg-[#458B4B] border-b border-[#18261C]/30" />
          <div className="w-2.5 h-20 bg-[#2E7D32]" />
          <div className="w-2 h-12 bg-[#66BB6A]" />
          <div className="w-2.5 h-16 bg-[#388E3C]" />
        </div>
      );
    default:
      /* Glass Research Greenhouse & Bamboo Fence */
      return (
        <svg viewBox="0 0 44 28" className="w-20 h-12 pixel-render" shapeRendering="crispEdges">
          <rect x="6" y="12" width="32" height="16" fill="#E0F7FA" />
          <rect x="10" y="6" width="24" height="6" fill="#B2EBF2" />
          <rect x="6" y="12" width="32" height="2" fill="#2E7D32" />
          <rect x="14" y="14" width="2" height="14" fill="#5D4037" />
          <rect x="28" y="14" width="2" height="14" fill="#5D4037" />
          <rect x="19" y="19" width="6" height="9" fill="#81C784" />
        </svg>
      );
  }
}

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
  const [isJumping, setIsJumping] = useState(false);
  const [strideTick, setStrideTick] = useState(false);
  const [idleBeat, setIdleBeat] = useState(0);
  const [showHello, setShowHello] = useState(true);
  const [distanceMeters, setDistanceMeters] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const walkTimeoutRef = useRef<number | null>(null);
  const helloTimeoutRef = useRef<number | null>(null);
  const lastArrivedRef = useRef<number | null>(null);
  const lastJumpedHurdleRef = useRef<number | null>(null);
  const lastStepSoundRef = useRef(0);
  const lastDistanceRef = useRef(0);
  const isJumpingRef = useRef(false);
  const lastHudStopRef = useRef(-1);
  const isWalkingRef = useRef(false);
  const showHelloRef = useRef(true);

  // Randomize hurdle types (stones, insects, logs, pots), horizontal placements, and jump heights
  const randomizedHurdles = useMemo(() => {
    // Shuffle a curated pool of stones (0,1), insects (2,3,4,5), and field hurdles (6,7,8,9)
    const stoneAndInsectPool = [0, 1, 2, 3, 4, 5].sort(() => Math.random() - 0.5);
    const extraPool = [6, 7, 8, 9].sort(() => Math.random() - 0.5);
    const pickedVariants = [
      stoneAndInsectPool[0],
      stoneAndInsectPool[1],
      extraPool[0],
      stoneAndInsectPool[2],
      stoneAndInsectPool[3],
      extraPool[1],
    ];
    const peakHeights = [-66, -74, -80];

    return WALK_SEGMENTS.map(([segStart, segEnd], idx) => {
      const slot = HURDLE_SLOTS[Math.floor(Math.random() * HURDLE_SLOTS.length)];
      const midpoint = segStart + slot.frac * (segEnd - segStart);
      const peakY = peakHeights[Math.floor(Math.random() * peakHeights.length)];
      const variant = pickedVariants[idx];
      const isInsect = variant >= 2 && variant <= 5;
      return {
        id: `hurdle-${idx}`,
        panelIndex: idx,
        variant,
        isInsect,
        posClass: slot.posClass,
        midpoint,
        peakY,
      };
    });
  }, []);

  // Scatter random decorative stones & ambient insects along every panel
  const ambientCritters = useMemo(() => {
    return Array.from({ length: TOTAL_PANELS }).map((_, panelIdx) => {
      const count = 2 + (panelIdx % 2);
      return Array.from({ length: count }).map((__, itemIdx) => {
        const kind =
          AMBIENT_KINDS[Math.floor(Math.random() * AMBIENT_KINDS.length)];
        const posClass =
          AMBIENT_POS_CLASSES[(panelIdx * 2 + itemIdx * 3) % AMBIENT_POS_CLASSES.length];
        return {
          key: `critter-${panelIdx}-${itemIdx}`,
          kind,
          posClass,
          isAerial: kind === 'butterfly' || kind === 'dragonfly',
        };
      });
    });
  }, []);

  const jumpCurve = useMemo(() => {
    const inputs: number[] = [0];
    const ys: number[] = [0];
    const rotates: number[] = [0];
    const shadows: number[] = [1];

    for (const hurdle of randomizedHurdles) {
      const m = hurdle.midpoint;
      const midY = Math.round(hurdle.peakY * 0.66);
      inputs.push(m - 0.024, m - 0.012, m, m + 0.012, m + 0.024);
      ys.push(0, midY, hurdle.peakY, midY, 0);
      rotates.push(0, -7, 0, 5, 0);
      shadows.push(1, 0.62, 0.44, 0.62, 1);
    }

    inputs.push(1);
    ys.push(0);
    rotates.push(0);
    shadows.push(1);

    return { inputs, ys, rotates, shadows };
  }, [randomizedHurdles]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 64px', 'end end'],
  });

  const trackX = useTransform(scrollYProgress, WALK_KEYFRAMES_INPUT, WALK_TRACK_OUTPUT);
  const cloudsX = useTransform(scrollYProgress, WALK_KEYFRAMES_INPUT, WALK_CLOUDS_OUTPUT);
  const hillsX = useTransform(scrollYProgress, WALK_KEYFRAMES_INPUT, WALK_HILLS_OUTPUT);
  const midgroundX = useTransform(scrollYProgress, WALK_KEYFRAMES_INPUT, WALK_MIDGROUND_OUTPUT);
  const jumpY = useTransform(scrollYProgress, jumpCurve.inputs, jumpCurve.ys);
  const jumpRotate = useTransform(scrollYProgress, jumpCurve.inputs, jumpCurve.rotates);
  const jumpShadowScale = useTransform(scrollYProgress, jumpCurve.inputs, jumpCurve.shadows);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.min(1, Math.max(0, latest));
    const steppedMeters = Math.round(clamped * 120) * 5;
    if (steppedMeters !== lastDistanceRef.current) {
      lastDistanceRef.current = steppedMeters;
      setDistanceMeters(steppedMeters);
    }

    // Hide Hello chat bubble as soon as the visitor scrolls into the trail
    if (clamped > 0.015) {
      if (showHelloRef.current) {
        showHelloRef.current = false;
        setShowHello(false);
      }
      if (helloTimeoutRef.current !== null) {
        window.clearTimeout(helloTimeoutRef.current);
        helloTimeoutRef.current = null;
      }
    }

    // Check randomized hurdle jump windows
    let jumpingHurdle: number | null = null;
    for (let h = 0; h < randomizedHurdles.length; h++) {
      if (Math.abs(clamped - randomizedHurdles[h].midpoint) < 0.022) {
        jumpingHurdle = h;
        break;
      }
    }
    const nextJumping = jumpingHurdle !== null;
    if (nextJumping !== isJumpingRef.current) {
      isJumpingRef.current = nextJumping;
      setIsJumping(nextJumping);
    }
    if (jumpingHurdle !== null) {
      if (lastJumpedHurdleRef.current !== jumpingHurdle) {
        lastJumpedHurdleRef.current = jumpingHurdle;
        soundFx.playJump();
      }
    } else {
      lastJumpedHurdleRef.current = null;
    }

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

    if (closestHudStop !== lastHudStopRef.current) {
      lastHudStopRef.current = closestHudStop;
      setHudStop(closestHudStop);
    }

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
      if (!isWalkingRef.current) {
        isWalkingRef.current = true;
        setIsWalking(true);
      }
      const now = Date.now();
      if (jumpingHurdle === null && now - lastStepSoundRef.current > 210) {
        lastStepSoundRef.current = now;
        soundFx.playStep();
      }
      if (walkTimeoutRef.current !== null) {
        window.clearTimeout(walkTimeoutRef.current);
      }
      walkTimeoutRef.current = window.setTimeout(() => {
        isWalkingRef.current = false;
        setIsWalking(false);
      }, 150);
    } else {
      if (isWalkingRef.current) {
        isWalkingRef.current = false;
        setIsWalking(false);
      }
      if (clamped <= 0.015 && !showHelloRef.current) {
        showHelloRef.current = true;
        setShowHello(true);
      }
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

  // Playful idle animation: opens magnifying glass & gently shifts legs when stationary
  useEffect(() => {
    if (isWalking || isJumping) return;
    const timer = window.setInterval(() => {
      setIdleBeat((prev) => (prev + 1) % 4);
    }, 520);
    return () => window.clearInterval(timer);
  }, [isWalking, isJumping]);

  useEffect(() => {
    const unsubscribe = soundFx.subscribe(setSoundEnabled);
    return () => {
      unsubscribe();
      if (walkTimeoutRef.current !== null) {
        window.clearTimeout(walkTimeoutRef.current);
      }
      if (helloTimeoutRef.current !== null) {
        window.clearTimeout(helloTimeoutRef.current);
      }
    };
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFx.setEnabled(next);
  };

  const handleCharacterPoke = () => {
    soundFx.playToggleOn();
    setIdleBeat((prev) => (prev + 1) % 4);
    showHelloRef.current = true;
    setShowHello(true);
    if (helloTimeoutRef.current !== null) {
      window.clearTimeout(helloTimeoutRef.current);
    }
    if (hudStop >= 0) {
      helloTimeoutRef.current = window.setTimeout(() => {
        showHelloRef.current = false;
        setShowHello(false);
      }, 2000);
    }
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
  const idleStridePhase: 0 | 1 | 2 = idleBeat === 1 ? 1 : idleBeat === 3 ? 2 : 0;
  const stridePhase: 0 | 1 | 2 = isJumping ? 1 : isWalking ? (strideTick ? 1 : 2) : idleStridePhase;
  const isIdleInspecting = !isWalking && !isJumping && idleBeat !== 0;

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

          {/* Parallax Layer 1: Varied Pixel Clouds, Birds & Aerial Butterflies */}
          <motion.div
            style={{ x: cloudsX }}
            aria-hidden="true"
            className="absolute top-3 left-0 w-[195%] flex items-start justify-around pointer-events-none"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className={`flex items-center gap-3 ${
                  n % 3 === 1 ? 'mt-5' : n % 3 === 2 ? 'mt-2' : 'mt-0'
                }`}
              >
                {n % 3 === 0 ? (
                  <svg viewBox="0 0 64 24" className="w-24 sm:w-32 h-10 pixel-render opacity-90" shapeRendering="crispEdges">
                    <rect x="14" y="6" width="28" height="12" fill="#FFFFFF" />
                    <rect x="8" y="10" width="44" height="8" fill="#FFFFFF" />
                    <rect x="20" y="2" width="16" height="6" fill="#FFFFFF" />
                    <rect x="8" y="16" width="44" height="2" fill="#D5EEF8" />
                  </svg>
                ) : n % 3 === 1 ? (
                  <svg viewBox="0 0 56 20" className="w-20 sm:w-28 h-8 pixel-render opacity-85" shapeRendering="crispEdges">
                    <rect x="6" y="10" width="44" height="6" fill="#FFFFFF" />
                    <rect x="14" y="5" width="22" height="6" fill="#FFFDF7" />
                    <rect x="6" y="15" width="44" height="2" fill="#CDEAF8" />
                  </svg>
                ) : (
                  <div className="flex items-center gap-4">
                    <svg viewBox="0 0 28 14" className="w-10 h-5 pixel-render opacity-75" shapeRendering="crispEdges">
                      <rect x="2" y="4" width="3" height="2" fill="#3B5B4A" />
                      <rect x="5" y="6" width="2" height="2" fill="#3B5B4A" />
                      <rect x="7" y="4" width="3" height="2" fill="#3B5B4A" />
                      <rect x="16" y="2" width="3" height="2" fill="#3B5B4A" />
                      <rect x="19" y="4" width="2" height="2" fill="#3B5B4A" />
                      <rect x="21" y="2" width="3" height="2" fill="#3B5B4A" />
                    </svg>
                    <svg viewBox="0 0 48 20" className="w-16 sm:w-24 h-8 pixel-render opacity-85" shapeRendering="crispEdges">
                      <rect x="10" y="6" width="26" height="10" fill="#FFFFFF" />
                      <rect x="4" y="10" width="38" height="6" fill="#FFFDF7" />
                      <rect x="4" y="15" width="38" height="2" fill="#D5EEF8" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Parallax Layer 2: Multi-Region Panorama (Campus -> Manipur Hills -> Loktak -> Greenhouses) */}
          <motion.div
            style={{ x: hillsX }}
            aria-hidden="true"
            className="absolute bottom-[68px] left-0 w-[235%] h-40 sm:h-52 pointer-events-none"
          >
            <svg
              viewBox="0 0 2400 170"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              {/* Far misty sky peaks */}
              <polygon
                points="0,170 0,136 160,126 320,134 500,104 680,68 860,108 1040,48 1220,96 1420,38 1620,84 1820,54 2020,92 2220,46 2400,82 2400,170"
                fill="#A5D2AE"
              />
              {/* Distant LPU Campus Silhouettes & Ag Silo (Left) */}
              <rect x="180" y="96" width="18" height="44" fill="#89B994" />
              <rect x="184" y="84" width="10" height="12" fill="#77A883" />
              <rect x="206" y="110" width="44" height="30" fill="#89B994" />
              <rect x="330" y="104" width="20" height="36" fill="#7FB08A" />
              {/* Distant Loktak Floating Phumdi Hills & Boat Silhouette (Middle) */}
              <rect x="920" y="128" width="210" height="18" fill="#79B4BE" opacity="0.65" />
              <polygon points="985,128 1005,128 1000,133 990,133" fill="#4E6E58" />
              {/* Distant CAU Imphal Research Conservatory Silhouette (Right) */}
              <polygon points="1870,118 1900,102 1930,118" fill="#7DB18A" />
              <rect x="1874" y="118" width="52" height="24" fill="#89B994" />
              {/* Near emerald valley foothills */}
              <polygon
                points="0,170 0,148 190,138 380,146 570,118 760,94 950,124 1140,86 1340,118 1540,74 1740,110 1940,80 2140,114 2400,88 2400,170"
                fill="#6BA877"
              />
            </svg>
          </motion.div>

          {/* Parallax Layer 3: Varied Countryside Biome Landmarks */}
          <motion.div
            style={{ x: midgroundX }}
            aria-hidden="true"
            className="absolute bottom-[68px] left-0 w-[330%] h-24 flex items-end justify-around pointer-events-none opacity-90"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 1, 5, 0, 2, 4, 6, 3, 7, 5, 1].map((landmarkKind, i) => (
              <div key={i} className="shrink-0">
                <MidgroundLandmark kind={landmarkKind} />
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

              {/* Ambient scattered stones & field insects in Trailhead panel */}
              {ambientCritters[0]?.map((critter) => (
                <div
                  key={critter.key}
                  aria-hidden="true"
                  className={`pointer-events-none absolute ${
                    critter.isAerial
                      ? 'bottom-[138px] sm:bottom-[155px] animate-bee-hover'
                      : 'bottom-[65px]'
                  } ${critter.posClass}`}
                >
                  <PixelAmbientInsect kind={critter.kind} className="w-5 h-4 sm:w-6 sm:h-5" />
                </div>
              ))}

              {/* Randomized Hurdle 0 between Trailhead & Milestone 01 */}
              {randomizedHurdles[0] && (
                <div
                  aria-hidden="true"
                  className={`absolute bottom-[65px] ${randomizedHurdles[0].posClass} -translate-x-1/2 pointer-events-none flex flex-col items-center ${
                    randomizedHurdles[0].isInsect ? 'animate-bee-hover' : ''
                  }`}
                >
                  <PixelHurdle
                    variant={randomizedHurdles[0].variant}
                    className="w-12 h-8 sm:w-14 sm:h-9"
                  />
                </div>
              )}
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
                  {/* Milestone Prop placed cleanly right next to Souvik's hand lens */}
                  <div className="absolute bottom-[65px] left-[24%] sm:left-[33%] right-3 sm:right-4 flex flex-col items-start">
                    {/* Pop-up Retro Quest Plaque (strictly synchronized with dwell arrival!) */}
                    <div className="mb-2 min-h-[150px] flex items-end w-full">
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
                            className="relative w-full max-w-[260px] sm:max-w-[360px] bg-[#FFFDF7] border-2 border-[#18261C] pixel-box"
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
                                    data-cursor="Inspect specimen"
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
                          data-cursor="Inspect specimen"
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

                  {/* Ambient scattered stones & random insects in Panel idx+1 */}
                  {ambientCritters[idx + 1]?.map((critter) => (
                    <div
                      key={critter.key}
                      aria-hidden="true"
                      className={`pointer-events-none absolute ${
                        critter.isAerial
                          ? 'bottom-[138px] sm:bottom-[158px] animate-bee-hover'
                          : 'bottom-[65px]'
                      } ${critter.posClass}`}
                    >
                      <PixelAmbientInsect kind={critter.kind} className="w-5 h-4 sm:w-6 sm:h-5" />
                    </div>
                  ))}

                  {/* Randomized hurdle between Milestone idx and idx+1 */}
                  {idx < FIELD_MILESTONES.length - 1 && randomizedHurdles[idx + 1] && (
                    <div
                      aria-hidden="true"
                      className={`absolute bottom-[65px] ${randomizedHurdles[idx + 1].posClass} -translate-x-1/2 pointer-events-none flex flex-col items-center ${
                        randomizedHurdles[idx + 1].isInsect ? 'animate-bee-hover' : ''
                      }`}
                    >
                      <PixelHurdle
                        variant={randomizedHurdles[idx + 1].variant}
                        className="w-12 h-8 sm:w-14 sm:h-9"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Interactive Fixed-in-frame Pixel Researcher with Hello Bubble & Hurdle Jump Physics */}
          <div className="absolute bottom-[65px] left-[4%] sm:left-[22%] z-20 flex flex-col items-center">
            {/* Dynamic ground shadow that shrinks cleanly while Souvik jumps */}
            <motion.div
              aria-hidden="true"
              style={{ scaleX: jumpShadowScale }}
              className="pointer-events-none absolute -bottom-0.5 w-12 sm:w-14 h-2 rounded-full bg-[#18261C]/30"
            />

            <motion.div
              style={{ y: jumpY, rotate: jumpRotate }}
              className="relative flex flex-col items-center"
            >
              {/* Small "Hello!" chat bubble above head — disappears on scroll */}
              <AnimatePresence>
                {showHello && !isWalking && (
                  <motion.div
                    key="souvik-hello-bubble"
                    initial={{ opacity: 0, y: 6, scale: 0.85 }}
                    animate={{ opacity: 1, y: [0, -3, 0], scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.8 }}
                    transition={{
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.2 },
                      y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className="pointer-events-none absolute -top-11 sm:-top-12 left-1/2 -translate-x-1/2 z-30"
                  >
                    <div className="relative px-2.5 py-1 bg-[#FFFDF7] border-2 border-[#18261C] shadow-[3px_3px_0_#18261C] whitespace-nowrap flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#2E7D32]" aria-hidden="true" />
                      <span className="font-pixel text-xs sm:text-sm font-bold text-[#18261C]">
                        Hello!
                      </span>
                      <svg
                        viewBox="0 0 12 8"
                        aria-hidden="true"
                        className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-3 h-2"
                      >
                        <polygon points="0,0 12,0 6,8" fill="#18261C" />
                        <polygon points="2,0 10,0 6,6" fill="#FFFDF7" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={handleCharacterPoke}
                aria-label="Say hello to Souvik and toggle magnifying glass"
                className="w-20 h-24 sm:w-24 sm:h-28 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#18261C] bg-transparent border-0 p-0"
              >
                <PixelResearcher
                  stridePhase={stridePhase}
                  isInspecting={isIdleInspecting}
                  isJumping={isJumping}
                  className="w-full h-full"
                />
              </button>
            </motion.div>
          </div>

          {/* Foreground Turf & Varied Subsoil Horizon */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[68px] z-10 pointer-events-none"
          >
            <div className="h-4 bg-[#4CAF50] border-t-3 border-[#18261C] flex items-end justify-around px-4">
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  className={
                    i % 4 === 0
                      ? 'w-2 h-1.5 bg-[#F2B705]'
                      : i % 4 === 2
                        ? 'w-2.5 h-1 bg-[#F4A6BE]'
                        : 'w-2 h-1.5 bg-[#2E7D32]'
                  }
                />
              ))}
            </div>
            <div className="h-2.5 bg-[#2E7D32]" />
            <div className="h-[42px] bg-[#543B28] flex items-center justify-around px-3">
              {Array.from({ length: 16 }).map((_, i) =>
                i % 3 === 0 ? (
                  <div key={i} className="w-4 h-2.5 rounded-sm bg-[#78909C]/75 border border-[#18261C]/30" />
                ) : i % 3 === 1 ? (
                  <div key={i} className="w-7 h-1.5 bg-[#362417]" />
                ) : (
                  <div key={i} className="w-2.5 h-2.5 bg-[#8D6E63]/65" />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
