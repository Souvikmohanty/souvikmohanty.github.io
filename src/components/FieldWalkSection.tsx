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
  PixelResearcher,
  PixelStopProp,
  type ResearcherEmote,
} from './PixelSprites';

interface FieldWalkSectionProps {
  onSelectSpecimen: (specimen: SpecimenDetail, milestoneTitle: string) => void;
}

const TOTAL_PANELS = FIELD_MILESTONES.length + 1; // Panel 0 = Trailhead, Panels 1..6 = Milestones

// Piecewise dwell curve: character breaks into a run almost immediately after landing and pauses beside each landmark
const WALK_KEYFRAMES_INPUT = [
  0.0, 0.008,
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

const WALK_CYCLE_FRAMES: ReadonlyArray<1 | 2 | 3 | 4> = [1, 3, 2, 4];

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
      /* 16-Bit Traditional Apiary Bee-Box Stand */
      return (
        <div className="flex items-end gap-2">
          <svg viewBox="0 0 42 32" className="w-18 h-14 pixel-render" shapeRendering="crispEdges">
            {/* Dark outline */}
            <rect x="6" y="7" width="14" height="11" fill="#1E1B2A" />
            <rect x="22" y="8" width="14" height="10" fill="#1E1B2A" />
            <rect x="4" y="17" width="34" height="5" fill="#1E1B2A" />
            <rect x="6" y="22" width="5" height="10" fill="#1E1B2A" />
            <rect x="31" y="22" width="5" height="10" fill="#1E1B2A" />
            {/* Wooden stand bench + legs */}
            <rect x="5" y="18" width="32" height="3" fill="#8D6E63" />
            <rect x="5" y="18" width="32" height="1" fill="#B68B60" />
            <rect x="7" y="22" width="3" height="10" fill="#5D4037" />
            <rect x="7" y="22" width="1" height="10" fill="#8D6E63" />
            <rect x="32" y="22" width="3" height="10" fill="#5D4037" />
            <rect x="32" y="22" width="1" height="10" fill="#8D6E63" />
            {/* Left bee box + moss roof */}
            <rect x="7" y="10" width="12" height="7" fill="#D7A449" />
            <rect x="7" y="10" width="4" height="7" fill="#F2C879" />
            <rect x="6" y="8" width="14" height="2" fill="#2E7D32" />
            <rect x="6" y="8" width="6" height="1" fill="#66BB6A" />
            <rect x="11" y="14" width="4" height="2" fill="#1E1B2A" />
            <rect x="12" y="14" width="2" height="1" fill="#FFE066" />
            {/* Right bee box + amber roof */}
            <rect x="23" y="11" width="12" height="6" fill="#E6BE73" />
            <rect x="23" y="11" width="4" height="6" fill="#F7DC9C" />
            <rect x="22" y="9" width="14" height="2" fill="#C67D00" />
            <rect x="22" y="9" width="6" height="1" fill="#FFE066" />
            <rect x="27" y="14" width="4" height="2" fill="#1E1B2A" />
            <rect x="28" y="14" width="2" height="1" fill="#FFE066" />
          </svg>
        </div>
      );
    case 1:
      /* 16-Bit Lush Banyan Tree with Aerial Roots */
      return (
        <svg viewBox="0 0 48 40" className="w-22 h-18 pixel-render" shapeRendering="crispEdges">
          {/* Canopy outline */}
          <rect x="12" y="2" width="24" height="18" fill="#1E1B2A" />
          <rect x="5" y="7" width="38" height="13" fill="#1E1B2A" />
          <rect x="3" y="10" width="42" height="8" fill="#1E1B2A" />
          {/* Trunk & aerial roots outline */}
          <rect x="18" y="19" width="12" height="21" fill="#1E1B2A" />
          <rect x="10" y="20" width="4" height="20" fill="#1E1B2A" />
          <rect x="34" y="20" width="4" height="20" fill="#1E1B2A" />
          {/* Trunk & roots shading */}
          <rect x="19" y="19" width="10" height="21" fill="#6D4C41" />
          <rect x="19" y="19" width="3" height="21" fill="#8D6E63" />
          <rect x="26" y="19" width="3" height="21" fill="#4E342E" />
          <rect x="11" y="20" width="2" height="20" fill="#5D4037" />
          <rect x="35" y="20" width="2" height="20" fill="#5D4037" />
          {/* Layered canopy shadow / mid / sunlit foliage */}
          <rect x="4" y="11" width="40" height="6" fill="#255C2B" />
          <rect x="6" y="8" width="36" height="9" fill="#2E7D32" />
          <rect x="13" y="3" width="22" height="11" fill="#4CAF50" />
          <rect x="15" y="4" width="12" height="4" fill="#74C365" />
          <rect x="9" y="9" width="8" height="4" fill="#66BB6A" />
          <rect x="28" y="10" width="9" height="4" fill="#66BB6A" />
          <rect x="18" y="5" width="6" height="2" fill="#A5D6A7" />
        </svg>
      );
    case 2:
      /* 16-Bit Field Irrigation Pond, Reeds & Lotus */
      return (
        <svg viewBox="0 0 52 28" className="w-22 h-12 pixel-render" shapeRendering="crispEdges">
          {/* Cattail outlines */}
          <rect x="8" y="4" width="6" height="5" fill="#1E1B2A" />
          <rect x="10" y="9" width="2" height="12" fill="#1E1B2A" />
          <rect x="14" y="10" width="3" height="10" fill="#1E1B2A" />
          <rect x="36" y="10" width="3" height="10" fill="#1E1B2A" />
          {/* Pond rim outline */}
          <rect x="3" y="18" width="46" height="9" fill="#1E1B2A" />
          <rect x="7" y="16" width="38" height="10" fill="#1E1B2A" />
          {/* Water basin & ripples */}
          <rect x="4" y="19" width="44" height="7" fill="#29B6F6" />
          <rect x="8" y="17" width="36" height="8" fill="#4FC3F7" />
          <rect x="12" y="19" width="12" height="2" fill="#B3E5FC" />
          <rect x="30" y="21" width="10" height="2" fill="#B3E5FC" />
          <rect x="16" y="24" width="22" height="2" fill="#0288D1" />
          {/* Reeds */}
          <rect x="10" y="9" width="2" height="11" fill="#388E3C" />
          <rect x="9" y="5" width="4" height="3" fill="#6D4C41" />
          <rect x="10" y="5" width="1" height="2" fill="#8D6E63" />
          <rect x="15" y="11" width="2" height="9" fill="#66BB6A" />
          <rect x="37" y="11" width="2" height="9" fill="#388E3C" />
          {/* Lily pad & pink lotus */}
          <rect x="22" y="19" width="9" height="3" fill="#255C2B" />
          <rect x="23" y="19" width="7" height="2" fill="#66BB6A" />
          <rect x="24" y="15" width="5" height="4" fill="#1E1B2A" />
          <rect x="25" y="16" width="3" height="3" fill="#F4A6BE" />
          <rect x="26" y="16" width="1" height="2" fill="#FCE4EC" />
        </svg>
      );
    case 3:
      /* 16-Bit Countryside Farm Windmill */
      return (
        <svg viewBox="0 0 38 44" className="w-16 h-20 pixel-render" shapeRendering="crispEdges">
          {/* Tower outline */}
          <rect x="14" y="12" width="10" height="32" fill="#1E1B2A" />
          <rect x="11" y="28" width="16" height="16" fill="#1E1B2A" />
          <rect x="13" y="9" width="12" height="5" fill="#1E1B2A" />
          {/* Timber tower + sunlit bevel */}
          <rect x="15" y="13" width="8" height="30" fill="#8D6E63" />
          <rect x="15" y="13" width="3" height="30" fill="#B68B60" />
          <rect x="21" y="13" width="2" height="30" fill="#5D4037" />
          <rect x="12" y="29" width="14" height="14" fill="#6D4C41" />
          <rect x="12" y="29" width="4" height="14" fill="#8D6E63" />
          {/* Doorway */}
          <rect x="17" y="35" width="4" height="8" fill="#3B281B" />
          {/* Sail blades outline */}
          <rect x="4" y="9" width="30" height="5" fill="#1E1B2A" />
          <rect x="16" y="1" width="6" height="23" fill="#1E1B2A" />
          {/* Sails white/cream canvas */}
          <rect x="5" y="10" width="10" height="3" fill="#FFFDF7" />
          <rect x="5" y="12" width="10" height="1" fill="#D5DFE4" />
          <rect x="23" y="10" width="10" height="3" fill="#FFFDF7" />
          <rect x="23" y="12" width="10" height="1" fill="#D5DFE4" />
          <rect x="17" y="2" width="4" height="8" fill="#FFFDF7" />
          <rect x="17" y="14" width="4" height="9" fill="#FFFDF7" />
          {/* Brass rotor hub */}
          <rect x="16" y="9" width="6" height="5" fill="#1E1B2A" />
          <rect x="17" y="10" width="4" height="3" fill="#E59A00" />
          <rect x="18" y="10" width="2" height="1" fill="#FFE066" />
        </svg>
      );
    case 4:
      /* 16-Bit Blooming Manipur Siroi Lily & Wildflower Clump */
      return (
        <svg viewBox="0 0 40 28" className="w-18 h-12 pixel-render" shapeRendering="crispEdges">
          {/* Blossoms & stems dark outline */}
          <rect x="5" y="8" width="8" height="6" fill="#1E1B2A" />
          <rect x="8" y="14" width="2" height="14" fill="#1E1B2A" />
          <rect x="15" y="5" width="10" height="7" fill="#1E1B2A" />
          <rect x="19" y="12" width="2" height="16" fill="#1E1B2A" />
          <rect x="28" y="9" width="8" height="6" fill="#1E1B2A" />
          <rect x="31" y="15" width="2" height="13" fill="#1E1B2A" />
          {/* Leaves */}
          <rect x="4" y="20" width="4" height="8" fill="#255C2B" />
          <rect x="14" y="19" width="4" height="9" fill="#2E7D32" />
          <rect x="24" y="21" width="4" height="7" fill="#388E3C" />
          {/* Stems */}
          <rect x="8" y="14" width="2" height="14" fill="#388E3C" />
          <rect x="19" y="12" width="2" height="16" fill="#2E7D32" />
          <rect x="31" y="15" width="2" height="13" fill="#388E3C" />
          {/* Siroi Lily bells */}
          <rect x="6" y="9" width="6" height="4" fill="#F4A6BE" />
          <rect x="7" y="9" width="3" height="2" fill="#FCE4EC" />
          <rect x="16" y="6" width="8" height="5" fill="#F4A6BE" />
          <rect x="17" y="6" width="6" height="3" fill="#FAD4E0" />
          <rect x="19" y="8" width="2" height="2" fill="#E59A00" />
          <rect x="29" y="10" width="6" height="4" fill="#FFFDF7" />
          <rect x="31" y="11" width="2" height="2" fill="#F2B705" />
        </svg>
      );
    case 5:
      /* 16-Bit Golden Mustard / Rapeseed Crop Rows */
      return (
        <svg viewBox="0 0 48 28" className="w-22 h-12 pixel-render" shapeRendering="crispEdges">
          {[4, 15, 26, 37].map((mx, idx) => (
            <g key={mx}>
              <rect x={mx} y={idx % 2 === 0 ? 8 : 5} width="8" height="7" fill="#1E1B2A" />
              <rect x={mx + 3} y={idx % 2 === 0 ? 15 : 12} width="2" height={idx % 2 === 0 ? 13 : 16} fill="#1E1B2A" />
              <rect x={mx + 3} y={idx % 2 === 0 ? 15 : 12} width="2" height={idx % 2 === 0 ? 13 : 16} fill="#388E3C" />
              <rect x={mx + 1} y={idx % 2 === 0 ? 9 : 6} width="6" height="5" fill="#F2B705" />
              <rect x={mx + 2} y={idx % 2 === 0 ? 9 : 6} width="3" height="3" fill="#FFE066" />
              <rect x={mx + 3} y={idx % 2 === 0 ? 10 : 7} width="2" height="1" fill="#FFF8B8" />
            </g>
          ))}
          <rect x="2" y="21" width="44" height="7" fill="#255C2B" opacity="0.55" />
        </svg>
      );
    case 6:
      /* 16-Bit Outlined Bamboo Grove with Nodes & Leaves */
      return (
        <svg viewBox="0 0 40 52" className="w-18 h-22 pixel-render" shapeRendering="crispEdges">
          {/* 3 bamboo culms with #1E1B2A outline & nodes */}
          <rect x="4" y="10" width="6" height="42" fill="#1E1B2A" />
          <rect x="5" y="11" width="4" height="41" fill="#4CAF50" />
          <rect x="5" y="11" width="2" height="41" fill="#8CE07A" />
          <rect x="4" y="22" width="6" height="2" fill="#1E1B2A" />
          <rect x="4" y="36" width="6" height="2" fill="#1E1B2A" />

          <rect x="15" y="3" width="7" height="49" fill="#1E1B2A" />
          <rect x="16" y="4" width="5" height="48" fill="#2E7D32" />
          <rect x="16" y="4" width="2" height="48" fill="#66BB6A" />
          <rect x="15" y="16" width="7" height="2" fill="#1E1B2A" />
          <rect x="15" y="31" width="7" height="2" fill="#1E1B2A" />

          <rect x="27" y="14" width="6" height="38" fill="#1E1B2A" />
          <rect x="28" y="15" width="4" height="37" fill="#388E3C" />
          <rect x="28" y="15" width="2" height="37" fill="#74C365" />
          <rect x="27" y="28" width="6" height="2" fill="#1E1B2A" />
          {/* Leaves */}
          <rect x="10" y="7" width="6" height="4" fill="#1E1B2A" />
          <rect x="11" y="8" width="4" height="2" fill="#74C365" />
          <rect x="21" y="10" width="7" height="4" fill="#1E1B2A" />
          <rect x="22" y="11" width="5" height="2" fill="#66BB6A" />
          <rect x="32" y="18" width="6" height="4" fill="#1E1B2A" />
          <rect x="33" y="19" width="4" height="2" fill="#8CE07A" />
        </svg>
      );
    default:
      /* 16-Bit Glass Research Greenhouse */
      return (
        <svg viewBox="0 0 48 32" className="w-22 h-14 pixel-render" shapeRendering="crispEdges">
          {/* Frame outline */}
          <rect x="10" y="5" width="28" height="8" fill="#1E1B2A" />
          <rect x="6" y="12" width="36" height="20" fill="#1E1B2A" />
          {/* Roof glass + glint */}
          <rect x="11" y="6" width="26" height="6" fill="#B2EBF2" />
          <rect x="13" y="7" width="8" height="3" fill="#E0F7FA" />
          {/* Main glass walls */}
          <rect x="7" y="14" width="34" height="17" fill="#E0F7FA" />
          <rect x="9" y="15" width="10" height="14" fill="#FFFFFF" opacity="0.65" />
          {/* Interior plant silhouettes */}
          <rect x="10" y="24" width="6" height="6" fill="#66BB6A" />
          <rect x="32" y="23" width="6" height="7" fill="#4CAF50" />
          {/* Roof cornice & timber mullions */}
          <rect x="6" y="12" width="36" height="2" fill="#2E7D32" />
          <rect x="15" y="14" width="2" height="17" fill="#5D4037" />
          <rect x="31" y="14" width="2" height="17" fill="#5D4037" />
          {/* Greenhouse door */}
          <rect x="20" y="18" width="8" height="13" fill="#1E1B2A" />
          <rect x="21" y="19" width="6" height="12" fill="#81C784" />
          <rect x="21" y="19" width="2" height="12" fill="#A5D6A7" />
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
  const [walkStep, setWalkStep] = useState(0);
  const [idleBeat, setIdleBeat] = useState(0);
  const [showHello, setShowHello] = useState(true);
  const [distanceMeters, setDistanceMeters] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const walkTimeoutRef = useRef<number | null>(null);
  const helloTimeoutRef = useRef<number | null>(null);
  const lastArrivedRef = useRef<number | null>(null);
  const lastStepSoundRef = useRef(0);
  const lastDistanceRef = useRef(0);
  const lastHudStopRef = useRef(-1);
  const isWalkingRef = useRef(false);
  const showHelloRef = useRef(true);

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
    const steppedMeters = Math.round(clamped * 120) * 5;
    if (steppedMeters !== lastDistanceRef.current) {
      lastDistanceRef.current = steppedMeters;
      setDistanceMeters(steppedMeters);
    }

    // Hide Hello chat bubble as soon as the visitor scrolls into the trail
    if (clamped > 0.004) {
      if (showHelloRef.current) {
        showHelloRef.current = false;
        setShowHello(false);
      }
      if (helloTimeoutRef.current !== null) {
        window.clearTimeout(helloTimeoutRef.current);
        helloTimeoutRef.current = null;
      }
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

    // Walk & play footstep SFX cleanly while moving between stops along the trail
    if (matchedStop === null && clamped > 0.004) {
      if (!isWalkingRef.current) {
        isWalkingRef.current = true;
        setIsWalking(true);
      }
      const now = Date.now();
      if (now - lastStepSoundRef.current > 210) {
        lastStepSoundRef.current = now;
        soundFx.playStep();
      }
      if (walkTimeoutRef.current !== null) {
        window.clearTimeout(walkTimeoutRef.current);
      }
      walkTimeoutRef.current = window.setTimeout(() => {
        isWalkingRef.current = false;
        setIsWalking(false);
      }, 190);
    } else {
      if (isWalkingRef.current) {
        isWalkingRef.current = false;
        setIsWalking(false);
      }
      if (clamped <= 0.004 && !showHelloRef.current) {
        showHelloRef.current = true;
        setShowHello(true);
      }
      if (walkTimeoutRef.current !== null) {
        window.clearTimeout(walkTimeoutRef.current);
        walkTimeoutRef.current = null;
      }
    }
  });

  // Smooth 4-frame pixel walk cycle while moving along the trail
  useEffect(() => {
    if (!isWalking) {
      setWalkStep(0);
      return;
    }
    const timer = window.setInterval(() => {
      setWalkStep((prev) => (prev + 1) % WALK_CYCLE_FRAMES.length);
    }, 105);
    return () => window.clearInterval(timer);
  }, [isWalking]);

  // Playful idle animation: opens magnifying glass & emotes while stationary
  useEffect(() => {
    if (isWalking) return;
    const timer = window.setInterval(() => {
      setIdleBeat((prev) => (prev + 1) % 4);
    }, 520);
    return () => window.clearInterval(timer);
  }, [isWalking]);

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
  const stridePhase: 0 | 1 | 2 | 3 | 4 = isWalking
    ? WALK_CYCLE_FRAMES[walkStep % WALK_CYCLE_FRAMES.length]
    : 0;
  const isIdleInspecting = !isWalking && idleBeat !== 0;
  const idleEmote: ResearcherEmote = showHello
    ? 'wave'
    : activeMilestone?.isNowStop && idleBeat === 2
      ? 'thumbs-up'
      : idleBeat === 0
        ? 'stand'
        : idleBeat === 3
          ? 'net'
          : 'inspect';

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
        <div className="relative z-30 bg-[#FFFDF7] border-t-2 border-b-3 border-[#18261C] px-3 sm:px-6 py-2.5">
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

          {/* Parallax Layer 1: 16-Bit Shaded Pixel Clouds & Birds */}
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
                  <svg viewBox="0 0 44 20" className="w-24 sm:w-32 h-12 pixel-render opacity-95" shapeRendering="crispEdges">
                    <rect x="14" y="3" width="16" height="1" fill="#77A7BF" />
                    <rect x="9" y="4" width="5" height="2" fill="#77A7BF" />
                    <rect x="30" y="4" width="5" height="2" fill="#77A7BF" />
                    <rect x="5" y="6" width="4" height="3" fill="#77A7BF" />
                    <rect x="35" y="6" width="5" height="3" fill="#77A7BF" />
                    <rect x="3" y="9" width="2" height="5" fill="#77A7BF" />
                    <rect x="40" y="9" width="2" height="5" fill="#77A7BF" />
                    <rect x="5" y="14" width="35" height="1" fill="#6594AD" />
                    <rect x="14" y="4" width="16" height="4" fill="#FFFFFF" />
                    <rect x="9" y="6" width="26" height="4" fill="#FFFFFF" />
                    <rect x="5" y="9" width="35" height="4" fill="#F2FAFE" />
                    <rect x="8" y="11" width="29" height="2" fill="#DDF0F9" />
                    <rect x="5" y="13" width="35" height="1" fill="#BCE0F1" />
                  </svg>
                ) : n % 3 === 1 ? (
                  <svg viewBox="0 0 36 16" className="w-20 sm:w-28 h-9 pixel-render opacity-90" shapeRendering="crispEdges">
                    <rect x="11" y="3" width="14" height="1" fill="#82AFC5" />
                    <rect x="7" y="4" width="4" height="2" fill="#82AFC5" />
                    <rect x="25" y="4" width="4" height="2" fill="#82AFC5" />
                    <rect x="4" y="6" width="3" height="5" fill="#82AFC5" />
                    <rect x="29" y="6" width="3" height="5" fill="#82AFC5" />
                    <rect x="7" y="11" width="22" height="1" fill="#73A1B8" />
                    <rect x="11" y="4" width="14" height="3" fill="#FFFFFF" />
                    <rect x="7" y="6" width="22" height="4" fill="#F2FAFE" />
                    <rect x="7" y="10" width="22" height="1" fill="#C4E5F4" />
                  </svg>
                ) : (
                  <div className="flex items-center gap-4">
                    <svg viewBox="0 0 30 16" className="w-11 h-6 pixel-render opacity-85" shapeRendering="crispEdges">
                      <rect x="2" y="5" width="3" height="2" fill="#1E1B2A" />
                      <rect x="5" y="7" width="3" height="2" fill="#1E1B2A" />
                      <rect x="8" y="5" width="3" height="2" fill="#1E1B2A" />
                      <rect x="6" y="6" width="1" height="1" fill="#4E6E58" />
                      <rect x="17" y="2" width="3" height="2" fill="#1E1B2A" />
                      <rect x="20" y="4" width="3" height="2" fill="#1E1B2A" />
                      <rect x="23" y="2" width="3" height="2" fill="#1E1B2A" />
                      <rect x="21" y="3" width="1" height="1" fill="#4E6E58" />
                    </svg>
                    <svg viewBox="0 0 32 16" className="w-18 sm:w-24 h-8 pixel-render opacity-90" shapeRendering="crispEdges">
                      <rect x="9" y="3" width="13" height="1" fill="#77A7BF" />
                      <rect x="5" y="4" width="4" height="3" fill="#77A7BF" />
                      <rect x="22" y="4" width="5" height="3" fill="#77A7BF" />
                      <rect x="3" y="7" width="2" height="4" fill="#77A7BF" />
                      <rect x="27" y="7" width="2" height="4" fill="#77A7BF" />
                      <rect x="5" y="11" width="22" height="1" fill="#6594AD" />
                      <rect x="9" y="4" width="13" height="4" fill="#FFFFFF" />
                      <rect x="5" y="7" width="22" height="3" fill="#F2FAFE" />
                      <rect x="5" y="10" width="22" height="1" fill="#BCE0F1" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Parallax Layer 2: Multi-Region Imphal Valley & Foothills Panorama */}
          <motion.div
            style={{ x: hillsX }}
            aria-hidden="true"
            className="absolute bottom-[68px] left-0 w-[235%] h-48 sm:h-64 pointer-events-none"
          >
            <svg
              viewBox="0 0 2400 200"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="walkFarHills" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9BD0BA" />
                  <stop offset="100%" stopColor="#D2ECDD" />
                </linearGradient>
                <linearGradient id="walkMidHills" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#72B587" />
                  <stop offset="100%" stopColor="#A6D7B2" />
                </linearGradient>
                <linearGradient id="walkNearHills" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F9361" />
                  <stop offset="100%" stopColor="#73B282" />
                </linearGradient>
              </defs>

              {/* Layer 1: Tall distant Manipur mountain peaks (Koubru & Baruni style ridges) */}
              <polygon
                points="0,200 0,136 140,104 285,134 450,74 620,122 790,52 970,114 1150,42 1330,102 1510,36 1690,94 1865,48 2045,104 2225,52 2400,88 2400,200"
                fill="url(#walkFarHills)"
              />
              {/* Sunlit ridge faces on far peaks */}
              <polygon points="450,74 395,122 452,96" fill="#BCE6D0" opacity="0.7" />
              <polygon points="790,52 732,114 794,80" fill="#BCE6D0" opacity="0.75" />
              <polygon points="1150,42 1086,106 1154,72" fill="#C4EAD5" opacity="0.8" />
              <polygon points="1510,36 1446,100 1516,66" fill="#C4EAD5" opacity="0.8" />
              <polygon points="1865,48 1806,104 1870,74" fill="#BCE6D0" opacity="0.75" />
              <polygon points="2225,52 2168,108 2230,78" fill="#BCE6D0" opacity="0.75" />

              {/* Distant LPU Campus Silhouettes & Ag Silo (Left) */}
              <rect x="176" y="122" width="18" height="44" fill="#77A883" />
              <rect x="180" y="110" width="10" height="12" fill="#63946F" />
              <rect x="202" y="136" width="44" height="30" fill="#81B48E" />
              <rect x="328" y="128" width="20" height="38" fill="#72A47E" />

              {/* Layer 2: Rolling verdant Imphal valley hills */}
              <polygon
                points="0,200 0,154 165,130 330,156 505,104 680,144 855,90 1030,136 1215,78 1390,126 1575,74 1755,118 1930,82 2110,128 2275,88 2400,114 2400,200"
                fill="url(#walkMidHills)"
              />
              {/* Sunlit ridge highlights & forested silhouettes */}
              <polygon points="505,104 452,144 510,120" fill="#92CE9F" opacity="0.6" />
              <polygon points="855,90 802,134 862,108" fill="#92CE9F" opacity="0.6" />
              <polygon points="1215,78 1158,124 1222,98" fill="#9AD4A6" opacity="0.65" />
              <polygon points="1575,74 1518,120 1582,94" fill="#9AD4A6" opacity="0.65" />
              <polygon points="1930,82 1874,126 1936,100" fill="#92CE9F" opacity="0.6" />

              {/* Distant Loktak Floating Phumdi Water & Boat Silhouette (Middle) */}
              <rect x="920" y="156" width="220" height="18" fill="#6BB6C5" opacity="0.72" />
              <rect x="945" y="160" width="32" height="3" fill="#B3E5FC" opacity="0.8" />
              <rect x="1040" y="164" width="44" height="3" fill="#B3E5FC" opacity="0.8" />
              <polygon points="990,156 1012,156 1007,162 995,162" fill="#3A5442" />

              {/* Distant CAU Imphal Research Conservatory Silhouette (Right) */}
              <polygon points="1870,142 1904,122 1938,142" fill="#639870" />
              <rect x="1874" y="142" width="60" height="26" fill="#77AA83" />
              <rect x="1886" y="147" width="12" height="12" fill="#BEE7EE" opacity="0.7" />
              <rect x="1908" y="147" width="12" height="12" fill="#BEE7EE" opacity="0.7" />

              {/* Layer 3: Near emerald valley foothills & tree-line crests */}
              <polygon
                points="0,200 0,174 190,156 375,174 565,144 755,166 945,134 1140,160 1335,126 1530,156 1730,128 1925,154 2125,128 2285,152 2400,136 2400,200"
                fill="url(#walkNearHills)"
              />
              {[554, 570, 934, 950, 1322, 1340, 1718, 1736, 2112, 2130].map((tx, idx) => {
                const ty = tx < 800 ? 136 : tx < 1200 ? 126 : tx < 1600 ? 118 : 120;
                return (
                  <g key={tx}>
                    <rect x={tx} y={ty + (idx % 2) * 4} width="10" height="12" fill="#468557" />
                    <rect x={tx + 3} y={ty - 4 + (idx % 2) * 4} width="4" height="4" fill="#468557" />
                  </g>
                );
              })}
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
                  <svg viewBox="0 0 28 32" className="w-14 h-16 pixel-render" shapeRendering="crispEdges" aria-hidden="true">
                    {/* Post + Arrow Sign Outline */}
                    <rect x="11" y="11" width="6" height="21" fill="#1E1B2A" />
                    <rect x="2" y="4" width="21" height="10" fill="#1E1B2A" />
                    <rect x="23" y="6" width="3" height="6" fill="#1E1B2A" />
                    <rect x="26" y="8" width="1" height="2" fill="#1E1B2A" />
                    {/* Timber post */}
                    <rect x="12" y="12" width="4" height="20" fill="#6D4C41" />
                    <rect x="12" y="12" width="1" height="20" fill="#8D6E63" />
                    {/* Wooden arrow board */}
                    <rect x="3" y="5" width="19" height="8" fill="#D7A449" />
                    <rect x="4" y="6" width="17" height="5" fill="#F2C879" />
                    <rect x="22" y="7" width="3" height="4" fill="#E6BE73" />
                    <rect x="6" y="8" width="12" height="2" fill="#3B281B" />
                    <rect x="4" y="6" width="1" height="1" fill="#3B281B" />
                    <rect x="4" y="10" width="1" height="1" fill="#3B281B" />
                  </svg>
                </div>

                <svg viewBox="0 0 32 20" aria-hidden="true" className="w-12 h-8 pixel-render" shapeRendering="crispEdges">
                  <rect x="4" y="4" width="6" height="5" fill="#1E1B2A" />
                  <rect x="6" y="9" width="2" height="11" fill="#1E1B2A" />
                  <rect x="20" y="3" width="6" height="5" fill="#1E1B2A" />
                  <rect x="22" y="8" width="2" height="12" fill="#1E1B2A" />
                  <rect x="13" y="11" width="4" height="9" fill="#255C2B" />
                  <rect x="14" y="10" width="2" height="10" fill="#66BB6A" />
                  <rect x="6" y="9" width="2" height="11" fill="#388E3C" />
                  <rect x="5" y="5" width="4" height="3" fill="#F2B705" />
                  <rect x="6" y="5" width="2" height="1" fill="#FFF3B0" />
                  <rect x="22" y="8" width="2" height="12" fill="#2E7D32" />
                  <rect x="21" y="4" width="4" height="3" fill="#FFFDF7" />
                  <rect x="22" y="5" width="2" height="1" fill="#F2B705" />
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

                </div>
              );
            })}
          </motion.div>

          {/* Interactive Grounded Pixel Researcher with Hello Bubble & Smooth Walk Cycle */}
          <div className="absolute bottom-[65px] left-[4%] sm:left-[22%] z-20 flex flex-col items-center">
            <div className="relative flex flex-col items-center">
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
                  emote={idleEmote}
                  className="w-full h-full"
                />
              </button>
            </div>
          </div>

          {/* 16-Bit Foreground Turf & Varied Subsoil Horizon */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[68px] z-10 pointer-events-none"
          >
            <div
              className="h-[26px] w-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 20' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='64' height='2' fill='%231E1B2A'/%3E%3Crect x='0' y='2' width='64' height='3' fill='%2374C365'/%3E%3Crect x='0' y='5' width='64' height='7' fill='%234A934A'/%3E%3Crect x='0' y='12' width='64' height='4' fill='%232D6B35'/%3E%3Crect x='0' y='16' width='64' height='4' fill='%23255C2B'/%3E%3Crect x='5' y='2' width='5' height='2' fill='%239BE888'/%3E%3Crect x='23' y='2' width='6' height='2' fill='%239BE888'/%3E%3Crect x='45' y='2' width='5' height='2' fill='%239BE888'/%3E%3Crect x='14' y='6' width='6' height='4' fill='%23387D3A'/%3E%3Crect x='36' y='5' width='6' height='4' fill='%23387D3A'/%3E%3Crect x='54' y='7' width='5' height='3' fill='%23387D3A'/%3E%3Crect x='11' y='3' width='2' height='2' fill='%23F2B705'/%3E%3Crect x='32' y='4' width='2' height='2' fill='%23FFFDF7'/%3E%3Crect x='51' y='3' width='2' height='2' fill='%23F4A6BE'/%3E%3Crect x='8' y='15' width='5' height='3' fill='%234A934A'/%3E%3Crect x='28' y='15' width='6' height='3' fill='%234A934A'/%3E%3Crect x='48' y='15' width='5' height='3' fill='%234A934A'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat-x',
                backgroundSize: '84px 26px',
                imageRendering: 'pixelated',
              }}
            />
            <div
              className="h-[42px] w-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 28' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='80' height='28' fill='%235D4037'/%3E%3Crect x='0' y='0' width='80' height='3' fill='%233B281B'/%3E%3Crect x='10' y='8' width='8' height='6' fill='%231E1B2A'/%3E%3Crect x='11' y='9' width='6' height='4' fill='%2378909C'/%3E%3Crect x='11' y='9' width='3' height='2' fill='%23B0BEC5'/%3E%3Crect x='28' y='12' width='12' height='3' fill='%23452D24'/%3E%3Crect x='46' y='6' width='7' height='5' fill='%231E1B2A'/%3E%3Crect x='47' y='7' width='5' height='3' fill='%238D6E63'/%3E%3Crect x='47' y='7' width='2' height='1' fill='%23B68B60'/%3E%3Crect x='22' y='20' width='6' height='4' fill='%231E1B2A'/%3E%3Crect x='23' y='21' width='4' height='2' fill='%23607D8B'/%3E%3Crect x='62' y='16' width='10' height='3' fill='%23452D24'/%3E%3Crect x='4' y='20' width='8' height='2' fill='%233B281B'/%3E%3Crect x='54' y='21' width='5' height='3' fill='%23795548'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat-x',
                backgroundSize: '120px 42px',
                imageRendering: 'pixelated',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
