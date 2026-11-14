import type { SpecimenId } from '../data/portfolioData';

interface PixelResearcherProps {
  stridePhase: 0 | 1 | 2; // 0 = idle/inspect, 1 = left step, 2 = right step
  isInspecting: boolean;
  isJumping?: boolean;
  className?: string;
}

/**
 * 16-bit pixel-art researcher sprite (Souvik) with field sun hat,
 * khaki entomology vest, hand lens, field notebook, jump pose, and 2-frame walk cycle.
 */
export function PixelResearcher({
  stridePhase,
  isInspecting,
  isJumping = false,
  className = '',
}: PixelResearcherProps) {
  const bobOffset = isJumping ? -2 : stridePhase === 1 ? -1 : 0;

  return (
    <svg
      viewBox="0 0 36 41"
      className={`pixel-render ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {/* Ground shadow (hidden while airborne so ground layer handles shadow) */}
      {!isJumping && (
        <rect x="8" y="39" width="18" height="2" fill="#18261C" fillOpacity="0.28" />
      )}

      <g transform={`translate(0, ${bobOffset})`}>
        {/* Wide-brim field sun hat */}
        <rect x="9" y="2" width="16" height="2" fill="#D5AB5B" />
        <rect x="8" y="4" width="18" height="3" fill="#BE9042" />
        <rect x="4" y="7" width="26" height="2" fill="#A1742A" />
        <rect x="9" y="6" width="16" height="1" fill="#2E7D32" />

        {/* Head & facial features */}
        <rect x="10" y="9" width="14" height="8" fill="#C98B5E" />
        <rect x="10" y="9" width="3" height="3" fill="#231812" />
        <rect x="21" y="9" width="3" height="2" fill="#231812" />
        {/* Eyes & warm smile */}
        <rect x="14" y="12" width="2" height="2" fill="#18261C" />
        <rect x="20" y="12" width="2" height="2" fill="#18261C" />
        <rect x="16" y="15" width="4" height="1" fill="#7D4527" />

        {/* Entomology field vest & collar */}
        <rect x="9" y="17" width="16" height="12" fill="#3B6D42" />
        <rect x="11" y="17" width="12" height="11" fill="#D8C89E" />
        <rect x="12" y="19" width="4" height="3" fill="#BA9F6D" />
        <rect x="18" y="19" width="4" height="3" fill="#BA9F6D" />
        <rect x="15" y="17" width="4" height="2" fill="#FFFDF7" />

        {/* Back arm (swings during walk) */}
        {stridePhase === 1 ? (
          <>
            <rect x="5" y="18" width="4" height="6" fill="#3B6D42" />
            <rect x="4" y="24" width="3" height="2" fill="#C98B5E" />
          </>
        ) : (
          <>
            <rect x="6" y="18" width="3" height="7" fill="#3B6D42" />
            <rect x="5" y="25" width="3" height="2" fill="#C98B5E" />
          </>
        )}

        {/* Field notebook tucked under arm */}
        <rect x="3" y="22" width="4" height="5" fill="#FFFDF7" />
        <rect x="3" y="22" width="4" height="1" fill="#E59A00" />

        {/* Front arm — raised with hand lens when inspecting, swings when jumping/walking */}
        {isJumping ? (
          <>
            <rect x="25" y="14" width="4" height="5" fill="#3B6D42" />
            <rect x="28" y="12" width="3" height="3" fill="#C98B5E" />
          </>
        ) : isInspecting ? (
          <>
            <rect x="25" y="16" width="4" height="3" fill="#3B6D42" />
            <rect x="28" y="14" width="3" height="3" fill="#C98B5E" />
            {/* Magnifying hand lens + crisp lens gleam */}
            <rect x="30" y="8" width="5" height="5" fill="#9AE0F4" />
            <rect x="31" y="9" width="2" height="1" fill="#FFFFFF" />
            <rect x="30" y="8" width="5" height="1" fill="#18261C" />
            <rect x="30" y="12" width="5" height="1" fill="#18261C" />
            <rect x="29" y="9" width="1" height="3" fill="#18261C" />
            <rect x="35" y="9" width="1" height="3" fill="#18261C" />
            <rect x="30" y="13" width="1" height="2" fill="#5D4037" />
          </>
        ) : stridePhase === 2 ? (
          <>
            <rect x="25" y="18" width="4" height="6" fill="#3B6D42" />
            <rect x="27" y="24" width="3" height="2" fill="#C98B5E" />
          </>
        ) : (
          <>
            <rect x="25" y="18" width="3" height="7" fill="#3B6D42" />
            <rect x="25" y="25" width="3" height="2" fill="#C98B5E" />
          </>
        )}

        {/* Field trousers */}
        <rect x="11" y="29" width="12" height="4" fill="#4E3F30" />

        {/* Jump pose or alternating walking/idle legs */}
        {isJumping ? (
          <>
            {/* Airborne tucked legs */}
            <rect x="8" y="31" width="5" height="4" fill="#3D3024" />
            <rect x="6" y="35" width="6" height="2" fill="#18261C" />
            <rect x="20" y="30" width="6" height="4" fill="#3D3024" />
            <rect x="22" y="34" width="6" height="2" fill="#18261C" />
          </>
        ) : stridePhase === 1 ? (
          <>
            {/* Left leg forward, right leg back */}
            <rect x="8" y="33" width="5" height="5" fill="#3D3024" />
            <rect x="7" y="38" width="6" height="2" fill="#18261C" />
            <rect x="20" y="32" width="5" height="4" fill="#3D3024" />
            <rect x="21" y="36" width="6" height="2" fill="#18261C" />
          </>
        ) : stridePhase === 2 ? (
          <>
            {/* Left leg back, right leg forward */}
            <rect x="10" y="32" width="5" height="4" fill="#3D3024" />
            <rect x="9" y="36" width="6" height="2" fill="#18261C" />
            <rect x="19" y="33" width="5" height="5" fill="#3D3024" />
            <rect x="20" y="38" width="6" height="2" fill="#18261C" />
          </>
        ) : (
          <>
            {/* Standing steady */}
            <rect x="11" y="33" width="5" height="5" fill="#3D3024" />
            <rect x="11" y="38" width="5" height="2" fill="#18261C" />
            <rect x="18" y="33" width="5" height="5" fill="#3D3024" />
            <rect x="18" y="38" width="5" height="2" fill="#18261C" />
          </>
        )}
      </g>
    </svg>
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
 * Small ambient insects & stones for living trail ecosystem detail.
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
      viewBox="0 0 16 12"
      className={`pixel-render ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {kind === 'butterfly' && (
        <>
          <rect x="2" y="2" width="5" height="4" fill="#F2B705" />
          <rect x="9" y="2" width="5" height="4" fill="#F2B705" />
          <rect x="3" y="6" width="4" height="3" fill="#FB8C00" />
          <rect x="9" y="6" width="4" height="3" fill="#FB8C00" />
          <rect x="7" y="2" width="2" height="7" fill="#18261C" />
        </>
      )}
      {kind === 'dragonfly' && (
        <>
          <rect x="2" y="2" width="5" height="2" fill="#E0F7FA" />
          <rect x="9" y="2" width="5" height="2" fill="#E0F7FA" />
          <rect x="7" y="2" width="2" height="8" fill="#00897B" />
        </>
      )}
      {kind === 'beetle' && (
        <>
          <rect x="4" y="4" width="8" height="5" fill="#D32F2F" />
          <rect x="3" y="5" width="2" height="3" fill="#18261C" />
          <rect x="6" y="5" width="2" height="2" fill="#18261C" />
          <rect x="9" y="6" width="2" height="2" fill="#18261C" />
        </>
      )}
      {kind === 'stone' && (
        <>
          <rect x="2" y="6" width="12" height="5" fill="#78909C" />
          <rect x="4" y="4" width="8" height="2" fill="#B0BEC5" />
          <rect x="3" y="10" width="10" height="1" fill="#455A64" />
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
 * Renders distinct 16-bit pixel props for each of the 6 field-walk stops.
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
          <rect x="16" y="10" width="4" height="24" fill="#4CAF50" />
          <rect x="8" y="16" width="8" height="3" fill="#2E7D32" />
          <rect x="20" y="14" width="9" height="3" fill="#388E3C" />
          <rect x="9" y="24" width="7" height="3" fill="#388E3C" />
          <rect x="20" y="19" width="5" height="8" fill="#F2B705" />
          <rect x="21" y="20" width="3" height="6" fill="#FFD54F" />
          <rect x="14" y="4" width="8" height="3" fill="#D7A449" />
          <rect x="16" y="7" width="4" height="3" fill="#C48F35" />
          <rect x="9" y="14" width="6" height="2" fill="#8D6E63" />
          <rect x="9" y="14" width="1" height="2" fill="#18261C" />
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
          <rect x="10" y="12" width="3" height="22" fill="#795548" />
          <rect x="8" y="6" width="10" height="2" fill="#18261C" />
          <rect x="8" y="8" width="10" height="7" fill="#E8F4F8" />
          <rect x="10" y="10" width="6" height="4" fill="#CBE7F0" />
          <rect x="18" y="20" width="14" height="14" fill="#6D4C41" />
          <rect x="20" y="22" width="10" height="10" fill="#FFFDF7" />
          <rect x="22" y="24" width="2" height="2" fill="#E59A00" />
          <rect x="26" y="24" width="2" height="2" fill="#2E7D32" />
          <rect x="24" y="28" width="2" height="2" fill="#18261C" />
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
          <rect x="9" y="22" width="3" height="12" fill="#5D4037" />
          <rect x="24" y="22" width="3" height="12" fill="#5D4037" />
          <rect x="6" y="14" width="24" height="8" fill="#A68B4C" />
          <rect x="6" y="14" width="24" height="2" fill="#C4A962" />
          <rect x="14" y="14" width="2" height="8" fill="#7D6432" />
          <rect x="23" y="14" width="2" height="8" fill="#7D6432" />
          <rect x="3" y="16" width="3" height="4" fill="#3E2723" />
          <rect x="8" y="6" width="3" height="2" fill="#18261C" />
          <rect x="9" y="5" width="2" height="1" fill="#CBE7F0" />
          <rect x="17" y="4" width="3" height="2" fill="#18261C" />
          <rect x="18" y="3" width="2" height="1" fill="#CBE7F0" />
          <rect x="25" y="7" width="3" height="2" fill="#18261C" />
          <rect x="26" y="6" width="2" height="1" fill="#CBE7F0" />
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
          <rect x="11" y="15" width="2" height="19" fill="#2E7D32" />
          <rect x="22" y="13" width="2" height="21" fill="#2E7D32" />
          <rect x="16" y="18" width="2" height="16" fill="#388E3C" />
          <rect x="7" y="23" width="4" height="3" fill="#4CAF50" />
          <rect x="24" y="21" width="5" height="3" fill="#4CAF50" />
          <rect x="9" y="10" width="6" height="5" fill="#F2B705" />
          <rect x="11" y="11" width="2" height="2" fill="#FFF176" />
          <rect x="20" y="8" width="6" height="5" fill="#F2B705" />
          <rect x="22" y="9" width="2" height="2" fill="#FFF176" />
          <rect x="14" y="13" width="6" height="5" fill="#FFD54F" />
          <rect x="19" y="5" width="3" height="2" fill="#18261C" />
          <rect x="20" y="4" width="2" height="1" fill="#E6F4F9" />
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
          <rect x="16" y="18" width="4" height="16" fill="#6D4C41" />
          <rect x="8" y="6" width="20" height="14" fill="#18261C" />
          <rect x="10" y="8" width="16" height="10" fill="#F2B705" />
          <rect x="12" y="10" width="4" height="6" fill="#FFE082" />
          <rect x="18" y="10" width="6" height="2" fill="#18261C" />
          <rect x="18" y="14" width="4" height="2" fill="#2E7D32" />
          <rect x="24" y="2" width="2" height="4" fill="#18261C" />
          <rect x="23" y="1" width="4" height="2" fill="#E59A00" />
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
          <rect x="10" y="4" width="3" height="30" fill="#18261C" />
          <rect x="13" y="5" width="18" height="11" fill="#E59A00" />
          <rect x="15" y="7" width="14" height="7" fill="#FFF8E1" />
          <rect x="17" y="9" width="10" height="3" fill="#2E7D32" />
          <rect x="6" y="32" width="11" height="3" fill="#4A3525" />
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
      viewBox="0 0 16 16"
      className={`pixel-render ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect x="5" y="3" width="3" height="3" fill="#E8F6FC" />
      <rect x="9" y="3" width="3" height="3" fill="#E8F6FC" />
      <rect x="4" y="6" width="8" height="5" fill="#F2B705" />
      <rect x="6" y="6" width="2" height="5" fill="#18261C" />
      <rect x="10" y="6" width="2" height="5" fill="#18261C" />
      <rect x="2" y="7" width="2" height="3" fill="#18261C" />
      <rect x="2" y="8" width="1" height="1" fill="#FFFDF7" />
    </svg>
  );
}

/**
 * 16-bit suited pixel-art researcher (Souvik) welcoming visitors to Publications.
 */
export function PixelSuitedResearcher({
  wavePhase = false,
  className = '',
}: {
  wavePhase?: boolean;
  className?: string;
}) {
  const bobOffset = wavePhase ? -1 : 0;

  return (
    <svg
      viewBox="0 0 38 42"
      className={`pixel-render ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {/* Ground shadow */}
      <rect x="9" y="40" width="18" height="2" fill="#18261C" fillOpacity="0.25" />

      <g transform={`translate(0, ${bobOffset})`}>
        {/* Neat dark hair (formal style, no sun hat) */}
        <rect x="11" y="4" width="14" height="3" fill="#231812" />
        <rect x="10" y="6" width="16" height="3" fill="#231812" />
        <rect x="13" y="5" width="4" height="1" fill="#3D2B22" />

        {/* Head, beard trim, glasses & warm welcoming smile */}
        <rect x="11" y="9" width="14" height="9" fill="#C98B5E" />
        <rect x="10" y="9" width="2" height="5" fill="#231812" />
        <rect x="24" y="9" width="2" height="4" fill="#231812" />
        {/* Glasses & eyes */}
        <rect x="12" y="11" width="5" height="3" fill="#18261C" />
        <rect x="19" y="11" width="5" height="3" fill="#18261C" />
        <rect x="13" y="12" width="3" height="1" fill="#9AE0F4" />
        <rect x="20" y="12" width="3" height="1" fill="#9AE0F4" />
        <rect x="14" y="12" width="1" height="1" fill="#18261C" />
        <rect x="21" y="12" width="1" height="1" fill="#18261C" />
        <rect x="17" y="12" width="2" height="1" fill="#18261C" />
        {/* Light neat beard + smile */}
        <rect x="12" y="16" width="12" height="2" fill="#3B2920" />
        <rect x="16" y="15" width="4" height="1" fill="#FFFDF7" />

        {/* Formal dark tailored suit jacket, white shirt & emerald/gold tie */}
        <rect x="9" y="18" width="18" height="13" fill="#1D2B3A" />
        {/* Suit lapel highlights */}
        <rect x="12" y="18" width="2" height="7" fill="#2C3F54" />
        <rect x="22" y="18" width="2" height="7" fill="#2C3F54" />
        {/* Crisp white dress shirt V-front */}
        <rect x="15" y="18" width="6" height="8" fill="#FFFDF7" />
        {/* Gold & emerald academic necktie */}
        <rect x="17" y="18" width="2" height="2" fill="#E59A00" />
        <rect x="17" y="20" width="2" height="6" fill="#2E7D32" />
        <rect x="17" y="26" width="2" height="1" fill="#1F5A22" />
        {/* Gold pocket square on jacket chest */}
        <rect x="21" y="21" width="3" height="2" fill="#E59A00" />
        {/* Suit button */}
        <rect x="17" y="28" width="2" height="1" fill="#101820" />

        {/* Left arm holding bound academic monograph */}
        <rect x="6" y="19" width="3" height="8" fill="#1D2B3A" />
        <rect x="5" y="26" width="3" height="2" fill="#C98B5E" />
        <rect x="2" y="21" width="5" height="6" fill="#2E7D32" />
        <rect x="3" y="22" width="3" height="4" fill="#FFFDF7" />
        <rect x="2" y="21" width="1" height="6" fill="#E59A00" />

        {/* Right arm raised in a cheerful welcoming wave (alternates with wavePhase) */}
        {wavePhase ? (
          <>
            <rect x="27" y="17" width="4" height="3" fill="#1D2B3A" />
            <rect x="30" y="13" width="3" height="5" fill="#1D2B3A" />
            <rect x="31" y="10" width="3" height="3" fill="#C98B5E" />
            <rect x="33" y="9" width="1" height="2" fill="#C98B5E" />
          </>
        ) : (
          <>
            <rect x="27" y="18" width="4" height="3" fill="#1D2B3A" />
            <rect x="29" y="15" width="3" height="4" fill="#1D2B3A" />
            <rect x="30" y="12" width="3" height="3" fill="#C98B5E" />
            <rect x="29" y="11" width="1" height="2" fill="#C98B5E" />
          </>
        )}

        {/* Tailored dress trousers */}
        <rect x="11" y="31" width="6" height="8" fill="#16212D" />
        <rect x="19" y="31" width="6" height="8" fill="#16212D" />
        {/* Polished leather dress shoes */}
        <rect x="10" y="38" width="7" height="2" fill="#18261C" />
        <rect x="19" y="38" width="7" height="2" fill="#18261C" />
      </g>
    </svg>
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
 * 16-bit pixel-art vignette of casual Souvik (sunglasses, open amber overshirt, charcoal tee,
 * denim jeans & crimson sneakers) sitting at a sleek studio desk, actively working and editing
 * YouTube videos on his open glowing laptop.
 */
export function PixelLaptopSouvik({
  workPhase = false,
  className = '',
}: {
  workPhase?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 96 72"
      className={`pixel-render ${className}`}
      role="img"
      aria-label="Small pixel character of Souvik in casual clothes and sunglasses working on his laptop"
      shapeRendering="crispEdges"
    >
      {/* Ground shadow under chair and desk */}
      <rect x="11" y="66" width="74" height="3" fill="#18261C" fillOpacity="0.35" />
      <rect x="15" y="68" width="66" height="1" fill="#18261C" fillOpacity="0.2" />

      {/* ============ STUDIO SWIVEL CHAIR (LEFT) ============ */}
      <rect x="12" y="23" width="6" height="17" fill="#18261C" />
      <rect x="13" y="24" width="4" height="15" fill="#334155" />
      <rect x="13" y="24" width="1" height="14" fill="#475569" />
      <rect x="14" y="40" width="2" height="7" fill="#1E293B" />
      <rect x="14" y="44" width="20" height="5" fill="#18261C" />
      <rect x="15" y="45" width="18" height="3" fill="#334155" />
      <rect x="15" y="45" width="18" height="1" fill="#475569" />
      <rect x="23" y="49" width="3" height="12" fill="#334155" />
      <rect x="24" y="49" width="1" height="12" fill="#64748B" />
      <rect x="17" y="61" width="15" height="2" fill="#18261C" />
      <rect x="18" y="61" width="13" height="1" fill="#475569" />
      <rect x="16" y="63" width="3" height="3" fill="#0F172A" />
      <rect x="23" y="63" width="3" height="3" fill="#0F172A" />
      <rect x="30" y="63" width="3" height="3" fill="#0F172A" />

      {/* ============ SOUVIK SEATED LEGS (UNDER DESK) ============ */}
      <rect x="18" y="40" width="18" height="5" fill="#18261C" />
      <rect x="19" y="41" width="16" height="3" fill="#35537D" />
      <rect x="20" y="41" width="14" height="1" fill="#4D74A8" />
      <rect x="31" y="43" width="6" height="19" fill="#18261C" />
      <rect x="32" y="43" width="4" height="18" fill="#35537D" />
      <rect x="32" y="44" width="2" height="16" fill="#4D74A8" />
      <rect x="31" y="61" width="10" height="5" fill="#18261C" />
      <rect x="32" y="62" width="7" height="2" fill="#D32F2F" />
      <rect x="32" y="64" width="8" height="1" fill="#FFFDF7" />
      <rect x="38" y="63" width="2" height="1" fill="#FFFDF7" />

      {/* ============ MINIMAL STUDIO DESK ============ */}
      <rect x="39" y="50" width="3" height="16" fill="#18261C" />
      <rect x="40" y="50" width="1" height="15" fill="#64748B" />
      <rect x="81" y="50" width="3" height="16" fill="#18261C" />
      <rect x="82" y="50" width="1" height="15" fill="#64748B" />
      <rect x="36" y="47" width="51" height="4" fill="#18261C" />
      <rect x="37" y="48" width="49" height="1" fill="#A1887F" />
      <rect x="37" y="49" width="49" height="1" fill="#6D4C41" />

      {/* ============ OPEN 3/4 PIXEL LAPTOP ON DESK ============ */}
      <rect x="42" y="44" width="23" height="4" fill="#18261C" />
      <rect x="43" y="45" width="21" height="2" fill="#CBD5E1" />
      <rect x="45" y="44" width="14" height="2" fill="#334155" />
      <rect x="46" y="44" width="2" height="1" fill="#94A3B8" />
      <rect x="50" y="44" width="3" height="1" fill="#94A3B8" />
      <rect x="55" y="44" width="2" height="1" fill="#94A3B8" />

      {/* Screen lid angled up in 3/4 view facing Souvik */}
      <rect x="62" y="20" width="16" height="6" fill="#18261C" />
      <rect x="61" y="26" width="16" height="6" fill="#18261C" />
      <rect x="60" y="32" width="16" height="6" fill="#18261C" />
      <rect x="59" y="38" width="16" height="7" fill="#18261C" />

      <rect x="63" y="21" width="14" height="5" fill="#475569" />
      <rect x="62" y="26" width="14" height="6" fill="#475569" />
      <rect x="61" y="32" width="14" height="6" fill="#475569" />
      <rect x="60" y="38" width="14" height="6" fill="#475569" />
      <rect x="77" y="21" width="1" height="5" fill="#94A3B8" />
      <rect x="76" y="26" width="1" height="6" fill="#94A3B8" />
      <rect x="75" y="32" width="1" height="6" fill="#94A3B8" />
      <rect x="74" y="38" width="1" height="6" fill="#94A3B8" />

      {/* Glowing dark screen display */}
      <rect x="63" y="22" width="12" height="5" fill="#0F172A" />
      <rect x="62" y="27" width="12" height="5" fill="#0F172A" />
      <rect x="61" y="32" width="12" height="6" fill="#0F172A" />
      <rect x="60" y="38" width="12" height="4" fill="#0F172A" />

      {/* Mini YouTube video player & crisp white play triangle */}
      <rect x="63" y="24" width="10" height="7" fill="#FF0000" />
      <rect x="64" y="24" width="8" height="1" fill="#FF5252" />
      <rect x="67" y="26" width="1" height="3" fill="#FFFFFF" />
      <rect x="68" y="26" width="1" height="3" fill="#FFFFFF" />
      <rect x="69" y="27" width="1" height="1" fill="#FFFFFF" />

      {/* Video editing timeline tracks + animated playhead */}
      <rect x="62" y="34" width="9" height="2" fill="#FF4E45" />
      <rect x="61" y="37" width="7" height="2" fill="#FFE066" />
      <rect x="69" y="37" width="2" height="2" fill="#38BDF8" />
      <g className="animate-pixel-playhead">
        <rect x="63" y="33" width="1" height="8" fill="#FFFFFF" />
        <rect x="62" y="33" width="3" height="1" fill="#FFE066" />
      </g>

      {/* Soft cyan screen glow reflected on keyboard */}
      <rect x="49" y="45" width="9" height="1" fill="#7DD3FC" fillOpacity="0.35" />

      {/* ============ STEAMING COFFEE MUG ON DESK ============ */}
      <rect x="79" y="42" width="6" height="5" fill="#18261C" />
      <rect x="80" y="43" width="4" height="3" fill="#FFFDF7" />
      <rect x="80" y="44" width="4" height="1" fill="#E59A00" />
      <rect x="85" y="43" width="1" height="3" fill="#FFFDF7" />
      <g className="animate-pixel-steam">
        <rect x="81" y="39" width="1" height="2" fill="#CBD5E1" />
        <rect x="83" y="36" width="1" height="2" fill="#CBD5E1" />
      </g>

      {/* ============ SOUVIK TORSO, HEAD & TYPING ARMS ============ */}
      {/* Back/left arm reaching seamlessly to keyboard */}
      <rect x="29" y="30" width="7" height="5" fill="#18261C" />
      <rect x="30" y="31" width="5" height="3" fill="#D48800" />
      <rect x="34" y="34" width="6" height="7" fill="#18261C" />
      <rect x="35" y="35" width="4" height="5" fill="#D48800" />
      <rect x="37" y="39" width="8" height="4" fill="#18261C" />
      <rect x="38" y="40" width="7" height="2" fill="#D48800" />
      <g className="animate-pixel-type-left">
        <rect x="44" y="41" width="4" height="3" fill="#18261C" />
        <rect x="45" y="41" width="2" height="2" fill="#C98B5E" />
      </g>

      {/* Casual Amber-Mustard Overshirt over Charcoal Graphic Tee */}
      <rect x="18" y="24" width="15" height="17" fill="#18261C" />
      <rect x="19" y="25" width="13" height="15" fill="#E59A00" />
      <rect x="20" y="25" width="11" height="3" fill="#F2B705" />
      <rect x="29" y="26" width="4" height="13" fill="#263238" />
      <rect x="31" y="30" width="2" height="2" fill="#FFE066" />

      {/* Front/right arm reaching seamlessly onto keyboard */}
      <rect x="23" y="29" width="6" height="10" fill="#18261C" />
      <rect x="24" y="30" width="4" height="8" fill="#E59A00" />
      <rect x="27" y="38" width="21" height="5" fill="#18261C" />
      <rect x="28" y="39" width="20" height="3" fill="#F2B705" />
      <g className="animate-pixel-type-right">
        <rect x="47" y="41" width="5" height="3" fill="#18261C" />
        <rect x="48" y="41" width="3" height="2" fill="#C98B5E" />
      </g>

      {/* Head (3/4 profile facing right toward glowing screen) */}
      <rect x="21" y="10" width="14" height="6" fill="#18261C" />
      <rect x="23" y="8" width="6" height="3" fill="#18261C" />
      <rect x="19" y="12" width="4" height="6" fill="#18261C" />
      <rect x="22" y="14" width="14" height="10" fill="#18261C" />

      <rect x="22" y="11" width="12" height="4" fill="#241712" />
      <rect x="24" y="9" width="5" height="2" fill="#241712" />
      <rect x="20" y="13" width="3" height="4" fill="#241712" />
      <rect x="25" y="10" width="4" height="1" fill="#4E3529" />

      <rect x="23" y="14" width="12" height="9" fill="#C98B5E" />
      <rect x="22" y="15" width="2" height="4" fill="#241712" />
      <rect x="22" y="17" width="2" height="2" fill="#B87A4E" />
      <rect x="26" y="21" width="9" height="2" fill="#2B1D16" />
      <rect x="31" y="20" width="3" height="1" fill="#FFFDF7" />

      {/* Cool dark sunglasses reflecting laptop screen glow */}
      <rect x="24" y="16" width="13" height="3" fill="#18261C" />
      <rect x="29" y="16" width="4" height="2" fill="#0F172A" />
      <rect x="34" y="16" width="3" height="2" fill="#0F172A" />
      <rect x="30" y="16" width="2" height="1" fill="#7DD3FC" />
      <rect x="35" y="16" width="1" height="1" fill="#FFFFFF" />

      {/* Optional subtle spark burst when clicked */}
      {workPhase && (
        <>
          <rect x="65" y="16" width="1" height="2" fill="#FFE066" />
          <rect x="69" y="15" width="1" height="2" fill="#7DD3FC" />
          <rect x="73" y="17" width="2" height="1" fill="#FF4E45" />
        </>
      )}
    </svg>
  );
}
