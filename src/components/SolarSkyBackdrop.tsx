import { motion, useScroll, useTransform } from 'motion/react';

/**
 * Global fixed scroll-choreographed diurnal sky backdrop:
 * Morning bright blue sky at top (#top) -> afternoon sage -> golden hour amber
 * -> evening sunset & twilight dusk stars as the Pixel Sun sinks to the horizon at #contact.
 */
export function SolarSkyBackdrop() {
  const { scrollYProgress } = useScroll();

  // Compositor-only sky crossfade opacities
  const afternoonOpacity = useTransform(
    scrollYProgress,
    [0, 0.24, 0.52, 0.72, 0.82],
    [0, 0, 0.92, 0.8, 0]
  );
  const goldenOpacity = useTransform(
    scrollYProgress,
    [0.48, 0.68, 0.82, 0.94],
    [0, 0.88, 0.95, 0]
  );
  const eveningOpacity = useTransform(
    scrollYProgress,
    [0.74, 0.86, 0.94, 1],
    [0, 0.72, 1, 1]
  );

  // Pixel Sun orbital descent from high morning sky -> setting behind evening hills
  const sunY = useTransform(scrollYProgress, [0, 0.35, 0.72, 1], ['7vh', '24vh', '52vh', '79vh']);
  const sunX = useTransform(scrollYProgress, [0, 0.5, 0.85, 1], ['0vw', '-5vw', '-9vw', '-6vw']);
  const sunScale = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1.08, 1.24]);

  // Sun color stage opacities (Morning Gold -> Golden Amber -> Coral Sunset)
  const amberSunOpacity = useTransform(scrollYProgress, [0.42, 0.65, 0.88], [0, 1, 0]);
  const sunsetSunOpacity = useTransform(scrollYProgress, [0.72, 0.88, 1], [0, 1, 1]);
  const sunsetHaloOpacity = useTransform(scrollYProgress, [0.68, 0.9, 1], [0, 0.85, 1]);

  // Evening twinkling pixel stars & horizon dusk hills
  const starsOpacity = useTransform(scrollYProgress, [0.78, 0.9, 1], [0, 0.85, 1]);
  const horizonHillsOpacity = useTransform(scrollYProgress, [0.8, 0.92, 1], [0, 0.75, 1]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 top-16 pointer-events-none z-0 overflow-hidden"
    >
      {/* Layer 1 (Base 0%): Bright Morning Blue Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#92D2F5] via-[#CDEAF8] to-[#E6F4EA]" />

      {/* Layer 2 (~25-70%): Afternoon Sunlit Sage-Cream */}
      <motion.div
        style={{ opacity: afternoonOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-[#DDEFE0] via-[#F2F2E2] to-[#F6F3E8]"
      />

      {/* Layer 3 (~50-90%): Golden Hour Honey-Apricot */}
      <motion.div
        style={{ opacity: goldenOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-[#F5C581] via-[#F8D9AC] to-[#FAECD3]"
      />

      {/* Layer 4 (~75-100%): Evening Sunset & Twilight Dusk */}
      <motion.div
        style={{ opacity: eveningOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-[#1E2547] via-[#6F3E5D] via-52% to-[#E56D43]"
      />

      {/* Warm Evening Lower Horizon Glow */}
      <motion.div
        style={{ opacity: eveningOpacity }}
        className="absolute inset-x-0 bottom-0 h-[42vh] bg-gradient-to-t from-[#F4A259]/55 via-[#DF6B45]/25 to-transparent"
      />

      {/* Pixel Stars emerging in Evening Sky */}
      <motion.div
        style={{ opacity: starsOpacity }}
        className="absolute inset-x-0 top-0 h-[46vh]"
      >
        {[
          { left: '8%', top: '12%', size: 4, delay: '0s' },
          { left: '19%', top: '26%', size: 3, delay: '0.7s' },
          { left: '31%', top: '10%', size: 4, delay: '1.2s' },
          { left: '44%', top: '22%', size: 3, delay: '0.4s' },
          { left: '58%', top: '14%', size: 4, delay: '1.5s' },
          { left: '72%', top: '28%', size: 3, delay: '0.9s' },
          { left: '84%', top: '11%', size: 4, delay: '0.2s' },
          { left: '91%', top: '24%', size: 3, delay: '1.1s' },
        ].map((star, idx) => (
          <span
            key={idx}
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
            className="absolute bg-[#FFF8D6] animate-pulse"
          />
        ))}
      </motion.div>

      {/* Descending Pixel Sun */}
      <motion.div
        style={{ y: sunY, x: sunX, scale: sunScale }}
        className="absolute right-[6vw] sm:right-[9vw] top-0 will-change-transform"
      >
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
          {/* Expanding Sunset Glow Halo */}
          <motion.div
            style={{ opacity: sunsetHaloOpacity }}
            className="absolute -inset-8 rounded-full bg-radial from-[#FF8C42]/55 via-[#FF5E3A]/20 to-transparent blur-md"
          />

          {/* Stage A: Bright Morning Yellow Pixel Sun */}
          <svg
            viewBox="0 0 20 20"
            className="w-full h-full pixel-render relative z-10"
            shapeRendering="crispEdges"
          >
            <rect x="6" y="4" width="8" height="12" fill="#F2B705" />
            <rect x="4" y="6" width="12" height="8" fill="#F2B705" />
            <rect x="6" y="6" width="8" height="8" fill="#FFE066" />
            <rect x="7" y="7" width="6" height="6" fill="#FFF4B8" />
            <rect x="9" y="1" width="2" height="2" fill="#FFE066" />
            <rect x="9" y="17" width="2" height="2" fill="#FFE066" />
            <rect x="1" y="9" width="2" height="2" fill="#FFE066" />
            <rect x="17" y="9" width="2" height="2" fill="#FFE066" />
          </svg>

          {/* Stage B: Golden Hour Amber Pixel Sun Overlay */}
          <motion.svg
            style={{ opacity: amberSunOpacity }}
            viewBox="0 0 20 20"
            className="w-full h-full pixel-render absolute inset-0 z-20"
            shapeRendering="crispEdges"
          >
            <rect x="6" y="4" width="8" height="12" fill="#E57C00" />
            <rect x="4" y="6" width="12" height="8" fill="#E57C00" />
            <rect x="6" y="6" width="8" height="8" fill="#FFB300" />
            <rect x="7" y="7" width="6" height="6" fill="#FFE066" />
          </motion.svg>

          {/* Stage C: Coral-Tangerine Sunset Pixel Sun Overlay */}
          <motion.svg
            style={{ opacity: sunsetSunOpacity }}
            viewBox="0 0 20 20"
            className="w-full h-full pixel-render absolute inset-0 z-30"
            shapeRendering="crispEdges"
          >
            <rect x="5" y="5" width="10" height="10" fill="#D9482B" />
            <rect x="6" y="4" width="8" height="12" fill="#E65C32" />
            <rect x="4" y="6" width="12" height="8" fill="#E65C32" />
            <rect x="6" y="6" width="8" height="8" fill="#FF8C42" />
            <rect x="7" y="7" width="6" height="6" fill="#FFD166" />
          </motion.svg>
        </div>
      </motion.div>

      {/* Evening Sunset Silhouette Horizon Ridges (at bottom of viewport as sun sets) */}
      <motion.div
        style={{ opacity: horizonHillsOpacity }}
        className="absolute inset-x-0 bottom-0 h-28 sm:h-36 z-40"
      >
        <svg viewBox="0 0 1200 140" preserveAspectRatio="none" className="w-full h-full">
          <polygon
            points="0,140 0,88 150,62 320,98 490,54 670,86 840,48 1020,82 1200,56 1200,140"
            fill="#342647"
            fillOpacity="0.82"
          />
          <polygon
            points="0,140 0,108 190,82 380,112 560,76 740,104 920,72 1080,96 1200,78 1200,140"
            fill="#1D1B30"
            fillOpacity="0.92"
          />
        </svg>
      </motion.div>
    </div>
  );
}
