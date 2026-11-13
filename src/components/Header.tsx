import { useState } from 'react';
import { motion } from 'motion/react';
import { FileDown, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenCv: () => void;
}

/**
 * Crisp pixel-botanical lily bloom inspired by white trumpet lilies & Manipur's Siroi lily.
 */
function PixelLilyBloom({
  variant = 'white',
  className = '',
}: {
  variant?: 'white' | 'siroi';
  className?: string;
}) {
  const petalOuter = variant === 'siroi' ? '#F4A6BE' : '#FFFFFF';
  const petalInner = variant === 'siroi' ? '#FAD4E0' : '#F4F7EE';
  const petalShade = variant === 'siroi' ? '#DF7C9C' : '#D5E3CE';

  return (
    <svg
      viewBox="0 0 24 24"
      className={`pixel-render ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {/* Stem & leaves */}
      <rect x="11" y="15" width="2" height="9" fill="#2E7D32" />
      <rect x="6" y="17" width="5" height="2" fill="#4CAF50" />
      <rect x="5" y="16" width="3" height="2" fill="#388E3C" />
      <rect x="13" y="18" width="5" height="2" fill="#4CAF50" />
      <rect x="16" y="17" width="3" height="2" fill="#388E3C" />

      {/* 6-petal starry lily blossom */}
      <rect x="10" y="2" width="4" height="6" fill={petalOuter} />
      <rect x="11" y="3" width="2" height="4" fill={petalInner} />

      <rect x="4" y="6" width="6" height="4" fill={petalOuter} />
      <rect x="5" y="7" width="4" height="2" fill={petalInner} />

      <rect x="14" y="6" width="6" height="4" fill={petalOuter} />
      <rect x="15" y="7" width="4" height="2" fill={petalInner} />

      <rect x="5" y="11" width="5" height="4" fill={petalShade} />
      <rect x="6" y="11" width="3" height="3" fill={petalOuter} />

      <rect x="14" y="11" width="5" height="4" fill={petalShade} />
      <rect x="15" y="11" width="3" height="3" fill={petalOuter} />

      <rect x="10" y="12" width="4" height="5" fill={petalShade} />
      <rect x="11" y="12" width="2" height="4" fill={petalOuter} />

      {/* Center throat & golden pollen anthers */}
      <rect x="9" y="8" width="6" height="5" fill="#DCE8B6" />
      <rect x="10" y="9" width="4" height="3" fill="#FFF8D6" />
      <rect x="9" y="9" width="1" height="1" fill="#E59A00" />
      <rect x="14" y="9" width="1" height="1" fill="#E59A00" />
      <rect x="11" y="7" width="2" height="1" fill="#E59A00" />
      <rect x="11" y="12" width="2" height="1" fill="#C67C00" />
    </svg>
  );
}

/**
 * Trailing pixel lily bud & leaf cluster along the bottom seam of the header.
 */
function LilyVineCluster({
  flip = false,
  className = '',
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 96 28"
      className={`pixel-render ${flip ? '-scale-x-100' : ''} ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {/* Flowing stem along header base */}
      <rect x="0" y="23" width="38" height="2" fill="#388E3C" />
      <rect x="34" y="21" width="28" height="2" fill="#4CAF50" />
      <rect x="58" y="23" width="34" height="2" fill="#2E7D32" />

      {/* Lily leaves */}
      <rect x="8" y="17" width="10" height="3" fill="#4CAF50" />
      <rect x="12" y="15" width="8" height="2" fill="#66BB6A" />
      <rect x="26" y="18" width="9" height="3" fill="#2E7D32" />
      <rect x="44" y="15" width="11" height="3" fill="#4CAF50" />
      <rect x="64" y="17" width="10" height="3" fill="#66BB6A" />
      <rect x="78" y="19" width="8" height="2" fill="#388E3C" />

      {/* Small white lily bud */}
      <rect x="21" y="13" width="3" height="9" fill="#2E7D32" />
      <rect x="19" y="8" width="7" height="5" fill="#FFFFFF" />
      <rect x="20" y="6" width="5" height="3" fill="#F4F7EE" />
      <rect x="22" y="9" width="2" height="2" fill="#E59A00" />

      {/* Accent pink Siroi lily bud */}
      <rect x="70" y="12" width="2" height="10" fill="#2E7D32" />
      <rect x="68" y="8" width="6" height="4" fill="#F4A6BE" />
      <rect x="69" y="6" width="4" height="2" fill="#FAD4E0" />
      <rect x="70" y="9" width="2" height="1" fill="#E59A00" />
    </svg>
  );
}

export function Header({ onOpenCv }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-sm border-b-2 border-[#C8D8C2] overflow-hidden">
      {/* ================= BOTANICAL LILY GARLAND DECORATION ================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Soft mint wash at outer corners */}
        <div className="absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-[#EBF4E6]/85 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#EBF4E6]/85 to-transparent" />

        {/* Left corner blooming lilies */}
        <motion.div
          animate={{ rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-0.5 sm:left-2 bottom-0 flex items-end gap-0.5 origin-bottom"
        >
          <PixelLilyBloom variant="siroi" className="w-7 h-7 sm:w-11 sm:h-11" />
          <PixelLilyBloom variant="white" className="w-5 h-5 sm:w-8 sm:h-8 -ml-2 opacity-95" />
        </motion.div>

        {/* Left-center trailing lily vine (visible across wide header blank gap) */}
        <div className="hidden xl:flex items-end absolute left-[24%] bottom-0 opacity-85">
          <LilyVineCluster className="w-32 h-9" />
          <motion.div
            animate={{ rotate: [1.5, -1.5, 1.5] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
            className="-ml-4 origin-bottom"
          >
            <PixelLilyBloom variant="white" className="w-8 h-8" />
          </motion.div>
        </div>

        {/* Right-center trailing lily vine (fills space between Contact & Download CV) */}
        <div className="hidden xl:flex items-end absolute right-[19%] bottom-0 opacity-85">
          <motion.div
            animate={{ rotate: [-1.2, 1.8, -1.2] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="-mr-3 origin-bottom"
          >
            <PixelLilyBloom variant="siroi" className="w-8 h-8" />
          </motion.div>
          <LilyVineCluster flip className="w-28 h-8" />
        </div>

        {/* Right corner blooming lilies */}
        <motion.div
          animate={{ rotate: [1.5, -1.5, 1.5] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden sm:flex items-end gap-0.5 absolute right-1 sm:right-2 bottom-0 origin-bottom"
        >
          <PixelLilyBloom variant="white" className="w-8 h-8 -mr-2 opacity-95" />
          <PixelLilyBloom variant="siroi" className="w-10 h-10 sm:w-11 sm:h-11" />
        </motion.div>

        {/* Subtle vine stitch across the full bottom border */}
        <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#4CAF50]/60 via-[#A6CE39]/35 to-[#4CAF50]/60" />
      </div>

      {/* ================= FOREGROUND HEADER CONTENT ================= */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-6 lg:gap-8">
        {/* Zone 1: Wordmark with subtle lily emblem */}
        <a
          href="#top"
          className="inline-flex items-center gap-1.5 font-pixel text-[17px] sm:text-2xl font-bold tracking-tight text-[#142419] whitespace-nowrap shrink-0 pl-6 sm:pl-10 lg:pl-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2F7D32]"
        >
          <span>Souvik Mohanty</span>
        </a>

        {/* Zone 2: 5 concise single-line navigation links in Space Mono field-ledger font */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 font-mono-tabular text-[13px] font-bold tracking-tight text-[#2D4032] bg-[#FAF9F5]/80 px-3 py-1 rounded-full"
        >
          <a
            href="#field-walk"
            className="hover:text-[#2E7D32] hover:underline decoration-[#E59A00] decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Field Walk
          </a>
          <a
            href="#publications"
            className="hover:text-[#2E7D32] hover:underline decoration-[#E59A00] decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Publications
          </a>
          <a
            href="#awards"
            className="hover:text-[#2E7D32] hover:underline decoration-[#E59A00] decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Awards
          </a>
          <a
            href="#photo-book"
            className="hover:text-[#2E7D32] hover:underline decoration-[#E59A00] decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Photo Book
          </a>
          <a
            href="#contact"
            className="hover:text-[#2E7D32] hover:underline decoration-[#E59A00] decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 sm:pr-10 lg:pr-8">
          <button
            type="button"
            onClick={onOpenCv}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 font-mono-tabular text-[11px] sm:text-xs font-bold text-[#142419] bg-[#E59A00] hover:bg-[#D18B00] border-2 border-[#142419] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#142419]"
          >
            <FileDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
            <span>Download CV</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 border border-[#D8E2D5] bg-[#FAF9F5]/90 rounded-md text-[#142419] hover:bg-[#EFECE2] transition-colors shrink-0 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="relative z-10 md:hidden border-t border-[#D8E2D5] bg-[#FAF9F5] px-4 py-3 flex items-center justify-between gap-3 overflow-x-auto font-mono-tabular text-xs font-bold"
        >
          <a
            href="#field-walk"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#142419] hover:text-[#2E7D32] py-2 px-2 whitespace-nowrap shrink-0"
          >
            Field Walk
          </a>
          <a
            href="#publications"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#142419] hover:text-[#2E7D32] py-2 px-2 whitespace-nowrap shrink-0"
          >
            Publications
          </a>
          <a
            href="#awards"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#142419] hover:text-[#2E7D32] py-2 px-2 whitespace-nowrap shrink-0"
          >
            Awards
          </a>
          <a
            href="#photo-book"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#142419] hover:text-[#2E7D32] py-2 px-2 whitespace-nowrap shrink-0"
          >
            Photo Book
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#142419] hover:text-[#2E7D32] py-2 px-2 whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}
