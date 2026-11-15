import type { SpecimenId } from '../data/portfolioData';
import souvikStandImg from '../assets/sprites/souvik_stand.png';
import souvikWalk1Img from '../assets/sprites/souvik_walk1.png';
import souvikWalk2Img from '../assets/sprites/souvik_walk2.png';
import souvikWalkPass1Img from '../assets/sprites/souvik_walk_pass1.png';
import souvikWalkPass2Img from '../assets/sprites/souvik_walk_pass2.png';
import souvikWalkWaveImg from '../assets/sprites/souvik_walk_wave.png';
import souvikWaveImg from '../assets/sprites/souvik_wave.png';
import souvikThumbsUpImg from '../assets/sprites/souvik_thumbsup.png';
import souvikInspectImg from '../assets/sprites/souvik_inspect.png';
import souvikNetImg from '../assets/sprites/souvik_net.png';
import souvikClimb1Img from '../assets/sprites/souvik_climb1.png';
import souvikClimb2Img from '../assets/sprites/souvik_climb2.png';
import souvikSlideImg from '../assets/sprites/souvik_slide.png';
import souvikInformalStandImg from '../assets/sprites/souvik_informal_stand.png';
import souvikInformalWaveImg from '../assets/sprites/souvik_informal_wave.png';
import souvikInformalThumbsUpImg from '../assets/sprites/souvik_informal_thumbsup.png';

export type ResearcherEmote = 'stand' | 'wave' | 'thumbs-up' | 'inspect' | 'net' | 'slide';

const RESEARCHER_SPRITE_URLS = [
  souvikStandImg,
  souvikWalk1Img,
  souvikWalk2Img,
  souvikWalkPass1Img,
  souvikWalkPass2Img,
  souvikWalkWaveImg,
  souvikWaveImg,
  souvikThumbsUpImg,
  souvikInspectImg,
  souvikNetImg,
  souvikClimb1Img,
  souvikClimb2Img,
  souvikSlideImg,
  souvikInformalStandImg,
  souvikInformalWaveImg,
  souvikInformalThumbsUpImg,
];

if (typeof window !== 'undefined') {
  for (const src of RESEARCHER_SPRITE_URLS) {
    const img = new Image();
    img.src = src;
  }
}

interface PixelResearcherProps {
  stridePhase: 0 | 1 | 2 | 3 | 4; // 0 = standing/emote, 1 = stride A, 2 = stride B, 3 = pass A, 4 = pass B
  isInspecting: boolean;
  isJumping?: boolean;
  climbPhase?: 0 | 1 | 2; // 1 = left arm up climbing rung, 2 = right arm up climbing rung
  emote?: ResearcherEmote;
  className?: string;
}

/**
 * 16-bit pixel-art researcher sprite (Souvik) rendered from crisp extracted sprites
 * featuring khaki sun hat, sunglasses, entomology vest, 4-frame walk cycle, ladder climb frames, slide pose, and standing emotes.
 */
export function PixelResearcher({
  stridePhase,
  isInspecting,
  isJumping = false,
  climbPhase = 0,
  emote,
  className = '',
}: PixelResearcherProps) {
  let spriteSrc = souvikStandImg;
  const resolvedEmote: ResearcherEmote =
    emote ?? (isInspecting ? 'inspect' : 'stand');

  if (climbPhase === 1) {
    spriteSrc = souvikClimb1Img;
  } else if (climbPhase === 2) {
    spriteSrc = souvikClimb2Img;
  } else if (isJumping) {
    spriteSrc = souvikWalkWaveImg;
  } else if (stridePhase === 1) {
    spriteSrc = souvikWalk1Img;
  } else if (stridePhase === 2) {
    spriteSrc = souvikWalk2Img;
  } else if (stridePhase === 3) {
    spriteSrc = souvikWalkPass1Img;
  } else if (stridePhase === 4) {
    spriteSrc = souvikWalkPass2Img;
  } else {
    switch (resolvedEmote) {
      case 'wave':
        spriteSrc = souvikWaveImg;
        break;
      case 'thumbs-up':
        spriteSrc = souvikThumbsUpImg;
        break;
      case 'inspect':
        spriteSrc = souvikInspectImg;
        break;
      case 'net':
        spriteSrc = souvikNetImg;
        break;
      case 'slide':
        spriteSrc = souvikSlideImg;
        break;
      case 'stand':
      default:
        spriteSrc = souvikStandImg;
        break;
    }
  }

  const hideGroundShadow = isJumping || climbPhase !== 0 || (stridePhase === 0 && resolvedEmote === 'slide');

  return (
    <div
      aria-hidden="true"
      className={`relative select-none pointer-events-none ${className}`}
    >
      {!hideGroundShadow && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[58%] h-[6%] rounded-full bg-[#18261C]/28"
        />
      )}
      <img
        src={spriteSrc}
        alt=""
        draggable={false}
        decoding="async"
        className="relative w-full h-full object-contain object-bottom pixel-render"
      />
    </div>
  );
}

/**
 * 16-bit pixel-art field trail hurdles (stones, insects, and natural obstacles)
 * randomly placed between milestones for Souvik to jump over.
 */
export function PixelHurdle({
  variant,
  className = '',
}: {
  variant: number;
  className?: string;
}) {
  const kind = ((variant % 10) + 10) % 10;

  return (
    <svg
      viewBox="0 0 36 24"
      className={`pixel-render ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {kind === 0 && (
        /* Mossy field stone */
        <>
          <rect x="6" y="11" width="24" height="12" fill="#78909C" />
          <rect x="9" y="7" width="18" height="5" fill="#90A4AE" />
          <rect x="12" y="5" width="10" height="3" fill="#4CAF50" />
          <rect x="9" y="8" width="5" height="3" fill="#2E7D32" />
          <rect x="6" y="19" width="24" height="4" fill="#546E7A" />
          <rect x="6" y="23" width="24" height="1" fill="#18261C" />
        </>
      )}
      {kind === 1 && (
        /* Stacked flat river stones (cobble cairn) */
        <>
          <rect x="5" y="17" width="26" height="6" fill="#607D8B" />
          <rect x="7" y="16" width="22" height="2" fill="#90A4AE" />
          <rect x="9" y="11" width="18" height="5" fill="#78909C" />
          <rect x="11" y="10" width="14" height="2" fill="#B0BEC5" />
          <rect x="13" y="6" width="10" height="4" fill="#8D6E63" />
          <rect x="15" y="5" width="6" height="2" fill="#BCAAA4" />
          <rect x="5" y="23" width="26" height="1" fill="#18261C" />
        </>
      )}
      {kind === 2 && (
        /* Spotted crimson beetle / ladybug */
        <>
          <rect x="8" y="10" width="18" height="10" fill="#D32F2F" />
          <rect x="10" y="7" width="14" height="4" fill="#E53935" />
          <rect x="6" y="12" width="4" height="7" fill="#18261C" />
          <rect x="4" y="10" width="2" height="2" fill="#18261C" />
          <rect x="4" y="15" width="2" height="2" fill="#18261C" />
          {/* Beetle spots */}
          <rect x="13" y="9" width="3" height="3" fill="#18261C" />
          <rect x="19" y="11" width="3" height="3" fill="#18261C" />
          <rect x="14" y="15" width="3" height="3" fill="#18261C" />
          {/* Legs */}
          <rect x="10" y="20" width="2" height="3" fill="#18261C" />
          <rect x="16" y="20" width="2" height="3" fill="#18261C" />
          <rect x="22" y="20" width="2" height="3" fill="#18261C" />
        </>
      )}
      {kind === 3 && (
        /* Emerald field grasshopper */
        <>
          <rect x="10" y="12" width="16" height="5" fill="#558B2F" />
          <rect x="7" y="10" width="5" height="6" fill="#7CB342" />
          <rect x="8" y="11" width="2" height="2" fill="#18261C" />
          <rect x="4" y="8" width="3" height="2" fill="#33691E" />
          {/* Big hind jumping leg */}
          <rect x="19" y="6" width="3" height="7" fill="#8BC34A" />
          <rect x="22" y="8" width="3" height="12" fill="#558B2F" />
          <rect x="25" y="18" width="3" height="2" fill="#33691E" />
          <rect x="10" y="17" width="2" height="4" fill="#33691E" />
          <rect x="14" y="17" width="2" height="4" fill="#33691E" />
        </>
      )}
      {kind === 4 && (
        /* Hovering teal-blue dragonfly */
        <>
          {/* Shimmering wings */}
          <rect x="8" y="3" width="9" height="4" fill="#E0F7FA" />
          <rect x="19" y="3" width="9" height="4" fill="#E0F7FA" />
          <rect x="10" y="8" width="7" height="3" fill="#B2EBF2" />
          <rect x="19" y="8" width="7" height="3" fill="#B2EBF2" />
          {/* Slender body */}
          <rect x="16" y="6" width="4" height="5" fill="#00897B" />
          <rect x="17" y="11" width="2" height="9" fill="#00ACC1" />
          <rect x="16" y="7" width="1" height="2" fill="#18261C" />
          <rect x="19" y="7" width="1" height="2" fill="#18261C" />
          {/* Grass reed beneath */}
          <rect x="9" y="21" width="18" height="2" fill="#2E7D32" />
        </>
      )}
      {kind === 5 && (
        /* Fluttering monarch butterfly over flower */
        <>
          <rect x="7" y="4" width="8" height="7" fill="#FB8C00" />
          <rect x="21" y="4" width="8" height="7" fill="#FB8C00" />
          <rect x="9" y="6" width="4" height="3" fill="#FFE082" />
          <rect x="23" y="6" width="4" height="3" fill="#FFE082" />
          <rect x="16" y="5" width="4" height="9" fill="#18261C" />
          <rect x="14" y="3" width="2" height="2" fill="#18261C" />
          <rect x="20" y="3" width="2" height="2" fill="#18261C" />
          {/* Tiny meadow flower below */}
          <rect x="17" y="16" width="2" height="7" fill="#2E7D32" />
          <rect x="15" y="15" width="6" height="3" fill="#F4A6BE" />
        </>
      )}
      {kind === 6 && (
        /* Fallen bamboo culm log */
        <>
          <rect x="3" y="11" width="30" height="10" fill="#A17233" />
          <rect x="3" y="11" width="30" height="3" fill="#D7A449" />
          <rect x="12" y="10" width="2" height="12" fill="#5D4037" />
          <rect x="23" y="10" width="2" height="12" fill="#5D4037" />
          <rect x="16" y="5" width="2" height="6" fill="#2E7D32" />
          <rect x="18" y="4" width="5" height="3" fill="#4CAF50" />
          <rect x="3" y="21" width="30" height="2" fill="#18261C" />
        </>
      )}
      {kind === 7 && (
        /* Blooming mustard bush */
        <>
          <rect x="6" y="10" width="24" height="12" fill="#2E7D32" />
          <rect x="9" y="6" width="18" height="7" fill="#4CAF50" />
          <rect x="11" y="5" width="3" height="3" fill="#F2B705" />
          <rect x="18" y="4" width="3" height="3" fill="#FFE066" />
          <rect x="22" y="8" width="3" height="3" fill="#F2B705" />
          <rect x="9" y="12" width="3" height="3" fill="#FFE066" />
          <rect x="6" y="22" width="24" height="2" fill="#18261C" />
        </>
      )}
      {kind === 8 && (
        /* Stacked earthen honey pots */
        <>
          <rect x="6" y="12" width="10" height="10" fill="#B8683C" />
          <rect x="7" y="10" width="8" height="2" fill="#D78E5D" />
          <rect x="19" y="12" width="10" height="10" fill="#B8683C" />
          <rect x="20" y="10" width="8" height="2" fill="#D78E5D" />
          <rect x="12" y="4" width="11" height="9" fill="#C9794A" />
          <rect x="13" y="2" width="9" height="2" fill="#F2B705" />
          <rect x="6" y="22" width="23" height="2" fill="#18261C" />
        </>
      )}
      {kind === 9 && (
        /* Sandy ant-hill mound with pebbles */
        <>
          <rect x="6" y="16" width="24" height="7" fill="#C68B59" />
          <rect x="10" y="11" width="16" height="5" fill="#D7A472" />
          <rect x="14" y="8" width="8" height="3" fill="#E6BE94" />
          <rect x="16" y="8" width="4" height="3" fill="#4E342E" />
          <rect x="9" y="20" width="3" height="2" fill="#78909C" />
          <rect x="24" y="19" width="3" height="2" fill="#78909C" />
          {/* Tiny foraging ants */}
          <rect x="11" y="14" width="2" height="1" fill="#18261C" />
          <rect x="22" y="13" width="2" height="1" fill="#18261C" />
          <rect x="6" y="23" width="24" height="1" fill="#18261C" />
        </>
      )}
    </svg>
  );
}

/**
 * Small 16-bit outlined ambient insects & mossy stones for living trail ecosystem detail.
 */
export function PixelAmbientInsect({
  kind,
  className = '',
}: {
  kind: 'butterfly' | 'dragonfly' | 'beetle' | 'stone';
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 18 14"
      className={`pixel-render ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {kind === 'butterfly' && (
        <>
          {/* Outlined monarch wings */}
          <rect x="2" y="2" width="5" height="5" fill="#1E1B2A" />
          <rect x="11" y="2" width="5" height="5" fill="#1E1B2A" />
          <rect x="3" y="3" width="3" height="3" fill="#F2B705" />
          <rect x="12" y="3" width="3" height="3" fill="#F2B705" />
          <rect x="4" y="3" width="1" height="1" fill="#FFF4B8" />
          <rect x="13" y="3" width="1" height="1" fill="#FFF4B8" />
          <rect x="3" y="7" width="4" height="4" fill="#1E1B2A" />
          <rect x="11" y="7" width="4" height="4" fill="#1E1B2A" />
          <rect x="4" y="7" width="2" height="3" fill="#FB8C00" />
          <rect x="12" y="7" width="2" height="3" fill="#FB8C00" />
          {/* Body & antennae */}
          <rect x="8" y="3" width="2" height="8" fill="#1E1B2A" />
          <rect x="6" y="1" width="1" height="2" fill="#1E1B2A" />
          <rect x="11" y="1" width="1" height="2" fill="#1E1B2A" />
        </>
      )}
      {kind === 'dragonfly' && (
        <>
          <rect x="2" y="3" width="6" height="3" fill="#1E1B2A" />
          <rect x="10" y="3" width="6" height="3" fill="#1E1B2A" />
          <rect x="3" y="4" width="4" height="1" fill="#E0F7FA" />
          <rect x="11" y="4" width="4" height="1" fill="#E0F7FA" />
          <rect x="8" y="2" width="2" height="10" fill="#1E1B2A" />
          <rect x="8" y="3" width="2" height="7" fill="#00ACC1" />
          <rect x="8" y="3" width="1" height="2" fill="#80DEEA" />
        </>
      )}
      {kind === 'beetle' && (
        <>
          <rect x="3" y="4" width="11" height="7" fill="#1E1B2A" />
          <rect x="4" y="5" width="9" height="5" fill="#D32F2F" />
          <rect x="5" y="5" width="4" height="2" fill="#FF5252" />
          <rect x="6" y="6" width="2" height="2" fill="#1E1B2A" />
          <rect x="10" y="7" width="2" height="2" fill="#1E1B2A" />
          <rect x="2" y="6" width="2" height="3" fill="#1E1B2A" />
          <rect x="5" y="11" width="1" height="2" fill="#1E1B2A" />
          <rect x="11" y="11" width="1" height="2" fill="#1E1B2A" />
        </>
      )}
      {kind === 'stone' && (
        <>
          <rect x="2" y="6" width="14" height="6" fill="#1E1B2A" />
          <rect x="4" y="4" width="10" height="3" fill="#1E1B2A" />
          <rect x="3" y="7" width="12" height="4" fill="#607D8B" />
          <rect x="5" y="5" width="8" height="3" fill="#90A4AE" />
          <rect x="6" y="5" width="4" height="1" fill="#CFD8DC" />
          <rect x="10" y="6" width="3" height="2" fill="#4CAF50" />
        </>
      )}
    </svg>
  );
}

/**
 * 16-bit pixel avatar portrait for Hero & Contact.
 */
export function PixelSouvikPortrait({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`pixel-render ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect width="32" height="32" fill="#D5EEF9" />
      <rect x="0" y="24" width="32" height="8" fill="#5CB85C" />
      {/* Sun hat */}
      <rect x="8" y="3" width="16" height="3" fill="#D5AB5B" />
      <rect x="5" y="6" width="22" height="2" fill="#A1742A" />
      <rect x="8" y="5" width="16" height="1" fill="#2E7D32" />
      {/* Head */}
      <rect x="9" y="8" width="14" height="10" fill="#C98B5E" />
      <rect x="9" y="8" width="3" height="4" fill="#231812" />
      <rect x="20" y="8" width="3" height="3" fill="#231812" />
      <rect x="12" y="12" width="2" height="2" fill="#18261C" />
      <rect x="18" y="12" width="2" height="2" fill="#18261C" />
      <rect x="14" y="15" width="4" height="1" fill="#7D4527" />
      {/* Shoulders & vest */}
      <rect x="6" y="18" width="20" height="14" fill="#3B6D42" />
      <rect x="10" y="18" width="12" height="14" fill="#D8C89E" />
      <rect x="14" y="18" width="4" height="3" fill="#FFFDF7" />
      {/* Tiny pixel bee on shoulder */}
      <rect x="23" y="13" width="4" height="3" fill="#F2B705" />
      <rect x="24" y="13" width="1" height="3" fill="#18261C" />
      <rect x="24" y="11" width="2" height="2" fill="#FFFDF7" />
    </svg>
  );
}

/**
 * Renders distinct 16-bit outlined & shaded pixel props for each of the 6 field-walk stops.
 */
export function PixelStopProp({
  specimenId,
  className = '',
}: {
  specimenId: SpecimenId;
  className?: string;
}) {
  switch (specimenId) {
    case 'maize-armyworm':
      return (
        <svg
          viewBox="0 0 36 34"
          className={`pixel-render ${className}`}
          aria-hidden="true"
          shapeRendering="crispEdges"
        >
          {/* Tassel with crisp outline */}
          <rect x="13" y="2" width="10" height="4" fill="#1E1B2A" />
          <rect x="15" y="6" width="6" height="4" fill="#1E1B2A" />
          <rect x="14" y="3" width="8" height="2" fill="#E59A00" />
          <rect x="16" y="4" width="4" height="4" fill="#FFE066" />
          {/* Outlined maize stalk */}
          <rect x="15" y="9" width="6" height="25" fill="#1E1B2A" />
          <rect x="16" y="10" width="4" height="24" fill="#388E3C" />
          <rect x="17" y="10" width="1" height="24" fill="#66BB6A" />
          {/* Left & right leaves */}
          <rect x="6" y="15" width="10" height="5" fill="#1E1B2A" />
          <rect x="7" y="16" width="8" height="3" fill="#2E7D32" />
          <rect x="8" y="16" width="5" height="1" fill="#66BB6A" />
          <rect x="20" y="13" width="11" height="5" fill="#1E1B2A" />
          <rect x="21" y="14" width="9" height="3" fill="#388E3C" />
          <rect x="22" y="14" width="6" height="1" fill="#81C784" />
          <rect x="7" y="23" width="9" height="5" fill="#1E1B2A" />
          <rect x="8" y="24" width="7" height="3" fill="#2E7D32" />
          {/* Shaded golden corn cob */}
          <rect x="20" y="18" width="7" height="10" fill="#1E1B2A" />
          <rect x="21" y="19" width="5" height="8" fill="#E59A00" />
          <rect x="22" y="20" width="3" height="6" fill="#FFE066" />
          <rect x="21" y="25" width="5" height="2" fill="#4CAF50" />
          {/* Spotted armyworm caterpillar on left leaf */}
          <rect x="8" y="13" width="8" height="4" fill="#1E1B2A" />
          <rect x="9" y="14" width="6" height="2" fill="#A1887F" />
          <rect x="10" y="14" width="1" height="2" fill="#4E342E" />
          <rect x="13" y="14" width="1" height="2" fill="#4E342E" />
        </svg>
      );

    case 'entomology-net':
      return (
        <svg
          viewBox="0 0 36 34"
          className={`pixel-render ${className}`}
          aria-hidden="true"
          shapeRendering="crispEdges"
        >
          {/* Wooden handle with outline & bevel highlight */}
          <rect x="9" y="12" width="5" height="22" fill="#1E1B2A" />
          <rect x="10" y="13" width="3" height="21" fill="#795548" />
          <rect x="11" y="13" width="1" height="21" fill="#A1887F" />
          {/* Steel hoop & shaded mesh bag */}
          <rect x="7" y="4" width="12" height="11" fill="#1E1B2A" />
          <rect x="8" y="5" width="10" height="2" fill="#90A4AE" />
          <rect x="8" y="7" width="10" height="7" fill="#E8F4F8" />
          <rect x="9" y="8" width="4" height="5" fill="#FFFFFF" />
          <rect x="13" y="9" width="4" height="4" fill="#B2EBF2" />
          {/* Outlined leather-bound field notebook */}
          <rect x="17" y="19" width="16" height="15" fill="#1E1B2A" />
          <rect x="18" y="20" width="14" height="13" fill="#6D4C41" />
          <rect x="20" y="21" width="11" height="11" fill="#FFFDF7" />
          <rect x="20" y="21" width="11" height="2" fill="#E6DEC8" />
          <rect x="22" y="24" width="3" height="2" fill="#E59A00" />
          <rect x="26" y="24" width="3" height="2" fill="#2E7D32" />
          <rect x="22" y="28" width="6" height="1" fill="#1E1B2A" />
          <rect x="27" y="30" width="2" height="3" fill="#D32F2F" />
        </svg>
      );

    case 'stingless-bee':
      return (
        <svg
          viewBox="0 0 36 34"
          className={`pixel-render ${className}`}
          aria-hidden="true"
          shapeRendering="crispEdges"
        >
          {/* Outlined timber hive stand */}
          <rect x="8" y="21" width="5" height="13" fill="#1E1B2A" />
          <rect x="23" y="21" width="5" height="13" fill="#1E1B2A" />
          <rect x="9" y="22" width="3" height="12" fill="#5D4037" />
          <rect x="10" y="22" width="1" height="12" fill="#8D6E63" />
          <rect x="24" y="22" width="3" height="12" fill="#5D4037" />
          <rect x="25" y="22" width="1" height="12" fill="#8D6E63" />
          {/* Shaded split-bamboo log hive */}
          <rect x="5" y="13" width="26" height="10" fill="#1E1B2A" />
          <rect x="6" y="14" width="24" height="8" fill="#A68B4C" />
          <rect x="6" y="14" width="24" height="2" fill="#E0C378" />
          <rect x="6" y="20" width="24" height="2" fill="#7D6432" />
          {/* Bamboo node ridges */}
          <rect x="13" y="14" width="2" height="8" fill="#6D5428" />
          <rect x="15" y="14" width="1" height="8" fill="#E0C378" />
          <rect x="22" y="14" width="2" height="8" fill="#6D5428" />
          <rect x="24" y="14" width="1" height="8" fill="#E0C378" />
          {/* Resin propolis entrance tunnel */}
          <rect x="2" y="15" width="4" height="6" fill="#1E1B2A" />
          <rect x="3" y="16" width="3" height="4" fill="#3E2723" />
          <rect x="3" y="17" width="2" height="2" fill="#C67D00" />
          {/* 3 outlined stingless bees hovering above hive */}
          <rect x="7" y="5" width="5" height="4" fill="#1E1B2A" />
          <rect x="8" y="6" width="3" height="2" fill="#F2B705" />
          <rect x="9" y="4" width="2" height="2" fill="#FFFFFF" />
          <rect x="16" y="3" width="5" height="4" fill="#1E1B2A" />
          <rect x="17" y="4" width="3" height="2" fill="#F2B705" />
          <rect x="18" y="2" width="2" height="2" fill="#FFFFFF" />
          <rect x="24" y="6" width="5" height="4" fill="#1E1B2A" />
          <rect x="25" y="7" width="3" height="2" fill="#F2B705" />
          <rect x="26" y="5" width="2" height="2" fill="#FFFFFF" />
        </svg>
      );

    case 'mustard-blossom':
      return (
        <svg
          viewBox="0 0 36 34"
          className={`pixel-render ${className}`}
          aria-hidden="true"
          shapeRendering="crispEdges"
        >
          {/* Outlined branching green stems & leaves */}
          <rect x="10" y="14" width="4" height="20" fill="#1E1B2A" />
          <rect x="21" y="12" width="4" height="22" fill="#1E1B2A" />
          <rect x="15" y="17" width="4" height="17" fill="#1E1B2A" />
          <rect x="11" y="15" width="2" height="19" fill="#388E3C" />
          <rect x="22" y="13" width="2" height="21" fill="#388E3C" />
          <rect x="16" y="18" width="2" height="16" fill="#4CAF50" />
          {/* Leaves */}
          <rect x="6" y="22" width="5" height="5" fill="#1E1B2A" />
          <rect x="7" y="23" width="4" height="3" fill="#4CAF50" />
          <rect x="24" y="20" width="6" height="5" fill="#1E1B2A" />
          <rect x="24" y="21" width="5" height="3" fill="#4CAF50" />
          {/* Shaded golden mustard florets */}
          <rect x="8" y="9" width="8" height="7" fill="#1E1B2A" />
          <rect x="9" y="10" width="6" height="5" fill="#F2B705" />
          <rect x="11" y="11" width="2" height="2" fill="#FFF8B8" />
          <rect x="19" y="7" width="8" height="7" fill="#1E1B2A" />
          <rect x="20" y="8" width="6" height="5" fill="#F2B705" />
          <rect x="22" y="9" width="2" height="2" fill="#FFF8B8" />
          <rect x="13" y="12" width="8" height="7" fill="#1E1B2A" />
          <rect x="14" y="13" width="6" height="5" fill="#FFD54F" />
          <rect x="16" y="14" width="2" height="2" fill="#FFFFFF" />
          {/* Visiting bee */}
          <rect x="18" y="2" width="5" height="4" fill="#1E1B2A" />
          <rect x="19" y="3" width="3" height="2" fill="#F2B705" />
          <rect x="20" y="1" width="2" height="2" fill="#FFFFFF" />
        </svg>
      );

    case 'patent-monitor':
      return (
        <svg
          viewBox="0 0 36 34"
          className={`pixel-render ${className}`}
          aria-hidden="true"
          shapeRendering="crispEdges"
        >
          {/* Wooden post */}
          <rect x="15" y="18" width="6" height="16" fill="#1E1B2A" />
          <rect x="16" y="19" width="4" height="15" fill="#6D4C41" />
          <rect x="17" y="19" width="1" height="15" fill="#9C7350" />
          {/* Antenna */}
          <rect x="23" y="1" width="4" height="5" fill="#1E1B2A" />
          <rect x="24" y="2" width="2" height="4" fill="#E59A00" />
          {/* Monitor housing */}
          <rect x="7" y="5" width="22" height="16" fill="#1E1B2A" />
          <rect x="8" y="6" width="20" height="14" fill="#37474F" />
          <rect x="10" y="8" width="16" height="10" fill="#F2B705" />
          <rect x="11" y="9" width="5" height="7" fill="#FFE082" />
          <rect x="18" y="10" width="6" height="2" fill="#1E1B2A" />
          <rect x="18" y="14" width="4" height="2" fill="#2E7D32" />
        </svg>
      );

    case 'phd-crest':
      return (
        <svg
          viewBox="0 0 36 35"
          className={`pixel-render ${className}`}
          aria-hidden="true"
          shapeRendering="crispEdges"
        >
          {/* Flagpole & finial */}
          <rect x="9" y="3" width="5" height="32" fill="#1E1B2A" />
          <rect x="10" y="4" width="3" height="30" fill="#5D4037" />
          <rect x="10" y="2" width="3" height="2" fill="#FFE066" />
          {/* Outlined fluttering banner */}
          <rect x="13" y="4" width="20" height="13" fill="#1E1B2A" />
          <rect x="14" y="5" width="18" height="11" fill="#E59A00" />
          <rect x="16" y="7" width="14" height="7" fill="#FFF8E1" />
          <rect x="18" y="9" width="10" height="3" fill="#2E7D32" />
          {/* Base stone */}
          <rect x="5" y="31" width="13" height="4" fill="#1E1B2A" />
          <rect x="6" y="32" width="11" height="3" fill="#6D4C41" />
          {/* Thesis book */}
          <rect x="19" y="23" width="14" height="12" fill="#1E1B2A" />
          <rect x="20" y="24" width="12" height="10" fill="#2E7D32" />
          <rect x="22" y="26" width="8" height="6" fill="#FFFDF7" />
          <rect x="24" y="28" width="4" height="2" fill="#E59A00" />
        </svg>
      );
  }
}

export function PixelBeeIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 16"
      className={`pixel-render ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {/* Crisp outlined double wings */}
      <rect x="5" y="1" width="5" height="4" fill="#1E1B2A" />
      <rect x="9" y="1" width="5" height="4" fill="#1E1B2A" />
      <rect x="6" y="2" width="3" height="3" fill="#FFFFFF" />
      <rect x="10" y="2" width="3" height="3" fill="#E0F7FA" />
      {/* Outlined bee body */}
      <rect x="2" y="5" width="13" height="7" fill="#1E1B2A" />
      <rect x="15" y="7" width="1" height="3" fill="#1E1B2A" />
      {/* Golden shaded stripes */}
      <rect x="5" y="6" width="9" height="5" fill="#F2B705" />
      <rect x="6" y="6" width="2" height="2" fill="#FFF4B8" />
      <rect x="7" y="6" width="2" height="5" fill="#1E1B2A" />
      <rect x="11" y="6" width="2" height="5" fill="#1E1B2A" />
      {/* Face & bright eye */}
      <rect x="3" y="7" width="2" height="3" fill="#1E1B2A" />
      <rect x="3" y="8" width="1" height="1" fill="#FFFDF7" />
    </svg>
  );
}

export type InformalHostPose = 'stand' | 'wave' | 'thumbs-up';

/**
 * 16-bit informal pixel-art Souvik (sunglasses, maroon plaid shirt, blue jeans & boots)
 * welcoming visitors to Publications & Field Monographs.
 */
export function PixelInformalResearcher({
  pose,
  wavePhase = false,
  className = '',
}: {
  pose?: InformalHostPose;
  wavePhase?: boolean;
  className?: string;
}) {
  const resolvedPose: InformalHostPose = pose ?? (wavePhase ? 'wave' : 'stand');
  const spriteSrc =
    resolvedPose === 'wave'
      ? souvikInformalWaveImg
      : resolvedPose === 'thumbs-up'
        ? souvikInformalThumbsUpImg
        : souvikInformalStandImg;

  return (
    <div
      aria-hidden="true"
      className={`relative select-none pointer-events-none ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[62%] h-[5%] rounded-full bg-[#18261C]/25"
      />
      <img
        src={spriteSrc}
        alt=""
        draggable={false}
        decoding="async"
        className="relative w-full h-full object-contain object-bottom pixel-render"
      />
    </div>
  );
}

/**
 * 16-bit pixel-art golden trophy cup for Featured Honors.
 */
export function PixelTrophyIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`pixel-render ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {/* Cup rim & handles */}
      <rect x="6" y="4" width="12" height="2" fill="#FFE066" />
      <rect x="3" y="5" width="3" height="4" fill="#E59A00" />
      <rect x="18" y="5" width="3" height="4" fill="#E59A00" />
      <rect x="4" y="6" width="2" height="2" fill="#FFFDF7" fillOpacity="0" />
      {/* Cup bowl */}
      <rect x="6" y="6" width="12" height="6" fill="#F2B705" />
      <rect x="8" y="7" width="3" height="4" fill="#FFE066" />
      <rect x="8" y="12" width="8" height="2" fill="#D49B00" />
      {/* Stem */}
      <rect x="10" y="14" width="4" height="3" fill="#E59A00" />
      {/* Base */}
      <rect x="7" y="17" width="10" height="2" fill="#6D4C41" />
      <rect x="6" y="19" width="12" height="2" fill="#18261C" />
      <rect x="9" y="17" width="6" height="1" fill="#FFE066" />
    </svg>
  );
}

/**
 * 16-bit pixel-art patent wax seal / blueprint badge for Design Patent 466702-001.
 */
export function PixelPatentSealIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`pixel-render ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {/* Emerald ribbon tails */}
      <rect x="8" y="15" width="3" height="7" fill="#2E7D32" />
      <rect x="13" y="15" width="3" height="7" fill="#1F5A22" />
      {/* Rosette outer ring */}
      <rect x="6" y="4" width="12" height="12" fill="#18261C" />
      <rect x="4" y="6" width="16" height="8" fill="#18261C" />
      <rect x="7" y="5" width="10" height="10" fill="#E59A00" />
      <rect x="5" y="7" width="14" height="6" fill="#E59A00" />
      {/* Inner cream medallion */}
      <rect x="8" y="6" width="8" height="8" fill="#FFFDF7" />
      {/* Center checkmark/star */}
      <rect x="11" y="8" width="2" height="4" fill="#2E7D32" />
      <rect x="9" y="9" width="6" height="2" fill="#2E7D32" />
    </svg>
  );
}

/**
 * Clean recognizable YouTube logo mark with crisp white play triangle.
 */
export function YouTubeLogoIcon({ className = 'w-8 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 26" className={className} aria-hidden="true">
      <rect x="1" y="1" width="34" height="24" rx="7" fill="#FF0000" />
      <polygon points="14,7.5 14,18.5 24,13" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * Clean recognizable Behance "Bē" logo mark matching YouTubeLogoIcon proportions.
 */
export function BehanceLogoIcon({ className = 'w-8 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 26" className={className} aria-hidden="true">
      <rect x="1" y="1" width="34" height="24" rx="7" fill="#1769FF" />
      <path
        d="M7.8 7.5h4.9c2.1 0 3.3 1 3.3 2.6 0 1.1-.6 1.9-1.5 2.3 1.2.4 1.9 1.3 1.9 2.7 0 1.9-1.4 3.1-3.7 3.1H7.8V7.5zm2.2 4.1h2.4c.9 0 1.4-.4 1.4-1.2 0-.8-.5-1.2-1.4-1.2H10v2.4zm0 4.6h2.6c1 0 1.6-.5 1.6-1.4 0-.9-.6-1.4-1.6-1.4H10v2.8z"
        fill="#FFFFFF"
      />
      <rect x="20" y="8.2" width="5.4" height="1.6" rx="0.5" fill="#FFFFFF" />
      <path
        d="M22.8 10.6c2.4 0 4 1.6 4 4.1v.6H21c.2 1 .9 1.6 2 1.6.8 0 1.4-.3 1.8-.8l1.4 1.1c-.8.9-1.9 1.4-3.3 1.4-2.5 0-4.2-1.6-4.2-4 0-2.3 1.7-4 4.1-4zm-1.8 3.2h3.6c-.1-.9-.8-1.5-1.8-1.5s-1.6.6-1.8 1.5z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/**
 * 16-bit studio vignette featuring informal Souvik (maroon plaid shirt, sunglasses & jeans)
 * standing beside his creative desk with a glowing video-editing & design laptop and coffee mug.
 */
export function PixelInformalStudio({
  pose = 'wave',
  workPhase = false,
  className = '',
}: {
  pose?: InformalHostPose;
  workPhase?: boolean;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label="16-bit pixel character of Souvik in his maroon plaid shirt and sunglasses next to his creative video and design studio desk"
      className={`relative inline-flex items-end justify-center select-none pointer-events-none ${className}`}
    >
      {/* Shared studio ground shadow */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-2 right-1 h-2 rounded-full bg-[#18261C]/30"
      />

      {/* Informal Souvik Sprite */}
      <PixelInformalResearcher
        pose={workPhase ? 'thumbs-up' : pose}
        className="relative z-10 w-[78px] h-[132px] sm:w-[84px] sm:h-[142px] shrink-0"
      />

      {/* 16-bit Creative Studio Desk & Glowing Video + Design Screen */}
      <svg
        viewBox="0 0 64 56"
        className="relative z-0 -ml-2 w-28 sm:w-32 h-auto pixel-render shrink-0"
        aria-hidden="true"
        shapeRendering="crispEdges"
      >
        {/* Desk Legs & Shadow */}
        <rect x="7" y="34" width="4" height="20" fill="#18261C" />
        <rect x="8" y="34" width="2" height="19" fill="#64748B" />
        <rect x="52" y="34" width="4" height="20" fill="#18261C" />
        <rect x="53" y="34" width="2" height="19" fill="#64748B" />
        <rect x="11" y="35" width="41" height="2" fill="#18261C" fillOpacity="0.22" />

        {/* Desk Top */}
        <rect x="3" y="30" width="58" height="5" fill="#18261C" />
        <rect x="4" y="31" width="56" height="1" fill="#C49A7E" />
        <rect x="4" y="32" width="56" height="2" fill="#8D6E63" />

        {/* Laptop Base & Keyboard */}
        <rect x="10" y="27" width="24" height="4" fill="#18261C" />
        <rect x="11" y="28" width="22" height="2" fill="#CBD5E1" />
        <rect x="13" y="27" width="14" height="2" fill="#334155" />
        <rect x="15" y="28" width="10" height="1" fill="#7DD3FC" fillOpacity="0.45" />

        {/* Laptop / Studio Monitor Angled Screen */}
        <rect x="28" y="6" width="22" height="22" fill="#18261C" />
        <rect x="29" y="7" width="20" height="20" fill="#334155" />
        <rect x="30" y="8" width="18" height="17" fill="#0F172A" />

        {/* Top Half: YouTube Video Player */}
        <rect x="31" y="9" width="10" height="7" fill="#FF0000" />
        <rect x="32" y="9" width="8" height="1" fill="#FF5252" />
        <rect x="35" y="11" width="1" height="3" fill="#FFFFFF" />
        <rect x="36" y="11" width="1" height="3" fill="#FFFFFF" />
        <rect x="37" y="12" width="1" height="1" fill="#FFFFFF" />

        {/* Right Side: Behance Design Canvas Badge */}
        <rect x="42" y="9" width="5" height="7" fill="#1769FF" />
        <rect x="43" y="11" width="3" height="1" fill="#FFFFFF" />
        <rect x="43" y="13" width="2" height="2" fill="#FFE066" />

        {/* Bottom Half: Editing Timeline & Vector Grid */}
        <rect x="31" y="18" width="11" height="2" fill="#FF4E45" />
        <rect x="31" y="21" width="8" height="2" fill="#FFE066" />
        <rect x="40" y="21" width="7" height="2" fill="#38BDF8" />
        <g className="animate-pixel-playhead">
          <rect x="34" y="17" width="1" height="7" fill="#FFFFFF" />
          <rect x="33" y="17" width="3" height="1" fill="#FFE066" />
        </g>

        {/* Steaming Coffee Mug on Desk */}
        <rect x="52" y="24" width="6" height="6" fill="#18261C" />
        <rect x="53" y="25" width="4" height="4" fill="#FFFDF7" />
        <rect x="53" y="26" width="4" height="1" fill="#E59A00" />
        <rect x="58" y="25" width="2" height="3" fill="#18261C" />
        <rect x="58" y="26" width="1" height="1" fill="#FFFDF7" />
        <g className="animate-pixel-steam">
          <rect x="54" y="20" width="1" height="2" fill="#FFFDF7" fillOpacity="0.85" />
          <rect x="56" y="17" width="1" height="2" fill="#FFE066" fillOpacity="0.85" />
        </g>

        {/* Creative Spark Burst on Tap */}
        {workPhase && (
          <>
            <rect x="32" y="2" width="2" height="2" fill="#FFE066" />
            <rect x="38" y="1" width="2" height="2" fill="#7DD3FC" />
            <rect x="45" y="3" width="2" height="2" fill="#FF4E45" />
          </>
        )}
      </svg>
    </div>
  );
}
