import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { BookOpen, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import {
  ALBUM_SPREADS,
  ALL_ALBUM_PHOTOS,
  COVER_PREVIEW_PHOTO,
  type AlbumPhoto,
} from '../data/photoBookData';
import { soundFx } from '../utils/soundFx';

function StuckPhotoPrint({
  photo,
  onInspect,
  featured = false,
}: {
  photo: AlbumPhoto;
  onInspect: (photo: AlbumPhoto) => void;
  featured?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onInspect(photo)}
      whileHover={{ scale: 1.03, rotate: 0, y: -3 }}
      whileTap={{ scale: 0.98 }}
      data-cursor="Zoom photo"
      className={`group relative text-left bg-white p-1.5 pb-2.5 border-2 border-[#18261C] shadow-[3px_4px_0_rgba(24,38,28,0.22)] transition-shadow hover:shadow-[5px_6px_0_#E59A00] hover:z-10 cursor-pointer w-full ${
        photo.tiltClass
      } ${featured ? 'max-w-[190px] mx-auto' : ''}`}
      aria-label={`View photo: ${photo.caption}`}
    >
      {photo.tapeVariant === 'corners' ? (
        <>
          <span
            aria-hidden="true"
            className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-4 border-l-4 border-[#18261C]"
          />
          <span
            aria-hidden="true"
            className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-4 border-r-4 border-[#18261C]"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-4 border-l-4 border-[#18261C]"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-4 border-r-4 border-[#18261C]"
          />
        </>
      ) : (
        <span
          aria-hidden="true"
          className={`absolute -top-2 left-1/2 -translate-x-1/2 w-11 h-3.5 border border-[#18261C]/35 -rotate-1 ${
            photo.tapeVariant === 'green' ? 'bg-[#6BA877]/65' : 'bg-[#F2B705]/70'
          }`}
        />
      )}

      <div
        className={`relative overflow-hidden bg-[#EBF3E8] border border-[#18261C]/35 mb-1.5 ${photo.aspectClass}`}
      >
        <img
          src={photo.src}
          alt={photo.caption}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${photo.objectPosition}`}
        />
        <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-1 right-1 bg-[#18261C]/85 text-[#FFFDF7] p-1 rounded">
          <ZoomIn className="w-3 h-3" aria-hidden="true" />
        </span>
      </div>

      <p className="font-mono-tabular text-[10px] font-medium text-[#2D3E31] leading-tight text-center px-0.5">
        {photo.caption}
      </p>
    </motion.button>
  );
}

export function PhotoBookSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [turnDirection, setTurnDirection] = useState<1 | -1>(1);
  const [flipNonce, setFlipNonce] = useState(0);
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<AlbumPhoto | null>(null);

  const { scrollYProgress: sectionEnter } = useScroll({
    target: sectionRef,
    offset: ['start 96%', 'start 46%'],
  });
  const headerRotateX = useTransform(sectionEnter, [0, 1], [14, 0]);
  const headerY = useTransform(sectionEnter, [0, 1], [30, 0]);
  const headerScale = useTransform(sectionEnter, [0, 1], [0.96, 1]);
  const headerOpacity = useTransform(sectionEnter, [0, 0.45, 1], [0.35, 0.92, 1]);
  const bookStageY = useTransform(sectionEnter, [0, 1], [36, 0]);
  const bookStageOpacity = useTransform(sectionEnter, [0, 0.5, 1], [0.45, 0.95, 1]);

  const currentSpread = ALBUM_SPREADS[spreadIndex] ?? ALBUM_SPREADS[0];

  const handleOpenBook = () => {
    soundFx.playInspectOpen();
    setIsOpen(true);
  };

  const handleCloseBook = () => {
    soundFx.playInspectClose();
    setFlipNonce(0);
    setIsOpen(false);
  };

  const handleSelectSpread = (nextIdx: number) => {
    if (nextIdx === spreadIndex) return;
    setTurnDirection(nextIdx > spreadIndex ? 1 : -1);
    setSpreadIndex(nextIdx);
    setFlipNonce((n) => n + 1);
    soundFx.playStep();
  };

  const handlePrevSpread = () => {
    setTurnDirection(-1);
    setSpreadIndex((prev) => (prev - 1 + ALBUM_SPREADS.length) % ALBUM_SPREADS.length);
    setFlipNonce((n) => n + 1);
    soundFx.playStep();
  };

  const handleNextSpread = () => {
    setTurnDirection(1);
    setSpreadIndex((prev) => (prev + 1) % ALBUM_SPREADS.length);
    setFlipNonce((n) => n + 1);
    soundFx.playStep();
  };

  useEffect(() => {
    if (!activeLightboxPhoto) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxPhoto(null);
      } else if (e.key === 'ArrowRight') {
        const idx = ALL_ALBUM_PHOTOS.findIndex((p) => p.id === activeLightboxPhoto.id);
        setActiveLightboxPhoto(ALL_ALBUM_PHOTOS[(idx + 1) % ALL_ALBUM_PHOTOS.length]);
      } else if (e.key === 'ArrowLeft') {
        const idx = ALL_ALBUM_PHOTOS.findIndex((p) => p.id === activeLightboxPhoto.id);
        setActiveLightboxPhoto(
          ALL_ALBUM_PHOTOS[(idx - 1 + ALL_ALBUM_PHOTOS.length) % ALL_ALBUM_PHOTOS.length]
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeLightboxPhoto]);

  const activeLightboxIdx = activeLightboxPhoto
    ? ALL_ALBUM_PHOTOS.findIndex((p) => p.id === activeLightboxPhoto.id)
    : -1;

  return (
    <section
      ref={sectionRef}
      id="photo-book"
      aria-labelledby="photo-book-heading"
      className="py-14 sm:py-18 notebook-grid overflow-x-clip"
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6" style={{ perspective: '1200px' }}>
        {/* Section Header */}
        <motion.div
          style={{
            rotateX: headerRotateX,
            y: headerY,
            scale: headerScale,
            opacity: headerOpacity,
            transformOrigin: 'center bottom',
          }}
          className="text-center max-w-2xl mx-auto mb-7 sm:mb-9"
        >
          <p className="font-pixel text-xs text-[#2E7D32] mb-1.5 tracking-wide">
            MEMORY SCRAPBOOK · 15 SNAPSHOTS FROM CAU &amp; BEYOND
          </p>
          <h2
            id="photo-book-heading"
            className="font-pixel text-3xl sm:text-4xl font-bold tracking-tight text-[#18261C]"
            style={{ textWrap: 'balance' }}
          >
            Souvik’s Field &amp; Campus Photo Book
          </h2>
          <p className="text-sm sm:text-base text-[#4C6050] mt-2">
            {isOpen
              ? 'Flip through the pages or tap any taped print to zoom in.'
              : 'Tap the leather-bound album cover below to swing it open and browse inside.'}
          </p>
        </motion.div>

        {/* Top Bar Controls when Open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="max-w-[780px] mx-auto flex flex-wrap items-center justify-between gap-3 mb-4"
            >
              <div className="flex flex-wrap items-center gap-1 p-1 bg-[#EAE4D1] border-2 border-[#18261C]">
                {ALBUM_SPREADS.map((sp, idx) => {
                  const active = idx === spreadIndex;
                  return (
                    <button
                      key={sp.id}
                      type="button"
                      onClick={() => handleSelectSpread(idx)}
                      className={`px-3 py-1.5 font-pixel text-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#2E7D32] text-white border border-[#18261C]'
                          : 'text-[#3B4E3F] hover:text-[#18261C]'
                      }`}
                    >
                      {sp.tabLabel}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleCloseBook}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#18261C] bg-[#FFFDF7] hover:bg-[#FFE066] border-2 border-[#18261C] shadow-[3px_3px_0_#18261C] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Close Album</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= DESKTOP HINGED HARDCOVER BOOK (lg+) ================= */}
        <motion.div
          style={{ y: bookStageY, opacity: bookStageOpacity, perspective: '1800px' }}
          className="hidden lg:block max-w-[820px] mx-auto"
        >
          <AnimatePresence mode="wait" initial={false}>
            {!isOpen ? (
              <motion.div
                key="desktop-closed"
                initial={{ opacity: 0, rotateY: -35 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -85 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'left center' }}
                className="flex justify-center"
              >
                <div className="relative w-[390px] min-h-[450px]">
                  {/* Layered Cream Page Edges visible on right & bottom when closed */}
                  <div
                    aria-hidden="true"
                    className="absolute top-3 -right-3 bottom-3 w-3.5 bg-[#FAF4E4] border-2 border-l-0 border-[#18261C] rounded-r-md"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute left-3 -bottom-2.5 right-1 h-3 bg-[#EFE6CF] border-2 border-t-0 border-[#18261C] rounded-b-md"
                  />

                  <button
                    type="button"
                    onClick={handleOpenBook}
                    data-cursor="Open album"
                    className="group relative w-full h-full min-h-[450px] flex rounded-r-2xl rounded-l-md bg-[#23452A] border-3 border-[#18261C] shadow-[10px_12px_0_#18261C] overflow-hidden cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2E7D32]"
                    aria-label="Tap to open Souvik's Photo Book"
                  >
                    {/* Stitched Leather Spine */}
                    <div
                      aria-hidden="true"
                      className="w-8 bg-[#17301C] border-r-3 border-[#18261C] flex flex-col justify-between py-6 items-center shrink-0"
                    >
                      <div className="w-3.5 h-1 bg-[#E59A00]" />
                      <div className="w-0.5 flex-1 my-4 border-l-2 border-dashed border-[#E59A00]/65" />
                      <div className="w-3.5 h-1 bg-[#E59A00]" />
                    </div>

                    {/* Cover Front Details */}
                    <div className="flex-1 p-5 flex flex-col items-center justify-center text-center relative">
                      <span
                        aria-hidden="true"
                        className="absolute top-2.5 right-2.5 w-4 h-4 border-t-3 border-r-3 border-[#E59A00]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-3 border-r-3 border-[#E59A00]"
                      />

                      <div className="bg-[#FFFDF7] border-2 border-[#18261C] shadow-[3px_3px_0_#E59A00] px-4 py-1.5 mb-4">
                        <p className="font-pixel text-[10px] text-[#2E7D32] tracking-wider">
                          ARCHIVE · 2024–2026
                        </p>
                        <h3 className="font-pixel text-xl font-bold text-[#18261C] leading-tight">
                          PHOTO ALBUM
                        </h3>
                      </div>

                      {/* Cleanly Framed Cover Polaroid Snapshot */}
                      <div className="relative bg-white p-2 pb-3 border-2 border-[#18261C] shadow-[4px_4px_0_#18261C] -rotate-2 group-hover:rotate-0 transition-transform duration-300 w-48 mb-4">
                        <span
                          aria-hidden="true"
                          className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-[#F2B705]/75 border border-[#18261C]/40"
                        />
                        <div className="aspect-[4/3] overflow-hidden border border-[#18261C]/35 bg-[#EBF3E8] mb-1.5">
                          <img
                            src={COVER_PREVIEW_PHOTO.src}
                            alt={COVER_PREVIEW_PHOTO.alt}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                            className={`w-full h-full object-cover ${COVER_PREVIEW_PHOTO.objectPosition}`}
                          />
                        </div>
                        <p className="font-mono-tabular text-[10px] text-[#2D3E31]">
                          15 field &amp; campus prints inside
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E59A00] group-hover:bg-[#FFE066] text-[#18261C] border-2 border-[#18261C] shadow-[3px_3px_0_#18261C] font-pixel text-xs font-bold transition-colors">
                        <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>TAP TO OPEN ALBUM</span>
                      </div>
                    </div>

                    {/* Brass Fore-edge Clasp */}
                    <div aria-hidden="true" className="flex items-center">
                      <div className="w-3.5 h-12 bg-[#E59A00] border-2 border-r-0 border-[#18261C] rounded-l-md shadow-[-2px_2px_0_#18261C]" />
                    </div>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="desktop-open"
                initial={{ opacity: 0, scale: 0.96, rotateX: 6 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl bg-[#23452A] border-3 border-[#18261C] p-3 shadow-[10px_12px_0_#18261C]"
              >
                {/* TWIN CREAM ALBUM PAGES */}
                <div className="relative bg-[#FAF6EA] border-2 border-[#18261C] rounded-xl overflow-visible min-h-[450px] grid grid-cols-2">
                  {/* Center Spine Gutter Shadow & Bookmark Ribbon */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-transparent via-[#18261C]/16 to-transparent pointer-events-none z-10"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-3 left-1/2 -translate-x-1/2 w-[1px] bg-[#18261C]/30 pointer-events-none z-10"
                  />

                  {/* LEFT PAGE CONTENT */}
                  <div className="p-5 pr-7 flex flex-col">
                    <div className="flex items-baseline justify-between gap-2 mb-4 border-b border-[#18261C]/15 pb-1.5">
                      <div>
                        <h3 className="font-pixel text-base font-bold text-[#18261C]">
                          {currentSpread.leftTitle}
                        </h3>
                        <p className="font-mono-tabular text-[10px] text-[#4C6050]">
                          {currentSpread.leftNote}
                        </p>
                      </div>
                      <span className="font-mono-tabular text-[11px] font-bold text-[#B86800]">
                        p.{spreadIndex * 2 + 1}
                      </span>
                    </div>

                    <motion.div
                      key={`left-${currentSpread.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="grid grid-cols-2 gap-4 items-start flex-1 content-start"
                    >
                      {currentSpread.leftPhotos.map((photo) => (
                        <StuckPhotoPrint
                          key={photo.id}
                          photo={photo}
                          onInspect={setActiveLightboxPhoto}
                        />
                      ))}
                    </motion.div>
                  </div>

                  {/* RIGHT PAGE CONTENT */}
                  <div className="p-5 pl-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between gap-2 mb-4 border-b border-[#18261C]/15 pb-1.5">
                        <div>
                          <h3 className="font-pixel text-base font-bold text-[#18261C]">
                            {currentSpread.rightTitle}
                          </h3>
                          <p className="font-mono-tabular text-[10px] text-[#4C6050]">
                            {currentSpread.rightNote}
                          </p>
                        </div>
                        <span className="font-mono-tabular text-[11px] font-bold text-[#2E7D32]">
                          p.{spreadIndex * 2 + 2}
                        </span>
                      </div>

                      <motion.div
                        key={`right-${currentSpread.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                        className={
                          currentSpread.rightPhotos.length === 1
                            ? 'flex flex-col items-center gap-4'
                            : 'grid grid-cols-2 gap-4 items-start'
                        }
                      >
                        {currentSpread.rightPhotos.map((photo) => (
                          <StuckPhotoPrint
                            key={photo.id}
                            photo={photo}
                            onInspect={setActiveLightboxPhoto}
                            featured={currentSpread.rightPhotos.length === 1}
                          />
                        ))}

                        {currentSpread.rightPhotos.length === 1 && (
                          <div className="text-center max-w-xs pt-1">
                            <p className="font-pixel text-sm font-bold text-[#2E7D32]">
                              More field rolls coming soon...
                            </p>
                            <p className="font-mono-tabular text-xs text-[#4C6050] mt-1">
                              Now continuing into my Ph.D. chapter at CAU Imphal.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>

                  {/* VISIBLE 3D PAGE-FLIP LEAF WHEN SWITCHING SPREADS */}
                  <AnimatePresence>
                    {flipNonce > 0 && (
                      <motion.div
                        key={`turning-leaf-${flipNonce}`}
                        aria-hidden="true"
                        initial={{
                          rotateY: turnDirection > 0 ? 0 : -180,
                          opacity: 0.94,
                        }}
                        animate={{
                          rotateY: turnDirection > 0 ? -180 : 0,
                          opacity: [0.94, 1, 0.92, 0],
                        }}
                        transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          transformOrigin: 'left center',
                          transformStyle: 'preserve-3d',
                        }}
                        className="absolute top-0 bottom-0 left-1/2 w-1/2 z-30 pointer-events-none"
                      >
                        <div
                          style={{ backfaceVisibility: 'hidden' }}
                          className="absolute inset-0 bg-gradient-to-l from-[#EFE6CF] via-[#FAF6EA] to-[#E6DCC0] border-l-2 border-[#18261C]/35 rounded-r-xl shadow-xl"
                        />
                        <div
                          style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-[#EFE6CF] via-[#FAF6EA] to-[#E6DCC0] border-r-2 border-[#18261C]/35 rounded-l-xl shadow-xl"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ================= MOBILE / TABLET BOOK VIEW (< lg) ================= */}
        <div className="lg:hidden" style={{ perspective: '1400px' }}>
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="mobile-closed"
                initial={{ opacity: 0, rotateY: -20 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'left center' }}
                className="flex justify-center"
              >
                <button
                  type="button"
                  onClick={handleOpenBook}
                  className="group relative w-full max-w-[390px] flex rounded-r-2xl rounded-l-md bg-[#23452A] border-3 border-[#18261C] shadow-[8px_10px_0_#18261C] overflow-hidden cursor-pointer text-left"
                >
                  <div
                    aria-hidden="true"
                    className="w-7 bg-[#17301C] border-r-2 border-[#18261C] shrink-0"
                  />
                  <div className="flex-1 p-5 flex flex-col items-center text-center">
                    <div className="bg-[#FFFDF7] border-2 border-[#18261C] shadow-[3px_3px_0_#E59A00] px-4 py-1.5 mb-4">
                      <p className="font-pixel text-[10px] text-[#2E7D32]">ARCHIVE · 2024–2026</p>
                      <h3 className="font-pixel text-xl font-bold text-[#18261C]">PHOTO ALBUM</h3>
                    </div>
                    <div className="bg-white p-2 pb-3 border-2 border-[#18261C] -rotate-1 w-52 mb-4">
                      <div className="aspect-[4/3] overflow-hidden border border-[#18261C]/30 mb-1.5">
                        <img
                          src={COVER_PREVIEW_PHOTO.src}
                          alt={COVER_PREVIEW_PHOTO.alt}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                          className={`w-full h-full object-cover ${COVER_PREVIEW_PHOTO.objectPosition}`}
                        />
                      </div>
                      <p className="font-mono-tabular text-[10px] text-[#2D3E31]">
                        15 field &amp; campus prints inside
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E59A00] text-[#18261C] border-2 border-[#18261C] shadow-[3px_3px_0_#18261C] font-pixel text-xs font-bold">
                      <BookOpen className="w-4 h-4" aria-hidden="true" />
                      <span>TAP TO OPEN ALBUM</span>
                    </span>
                  </div>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="mobile-open"
                initial={{ opacity: 0, rotateY: 60 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 75 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'left center' }}
                className="rounded-2xl bg-[#23452A] border-3 border-[#18261C] p-2.5 shadow-[8px_10px_0_#18261C]"
              >
                <div className="bg-[#FAF6EA] border-2 border-[#18261C] rounded-xl p-5 space-y-6">
                  <div>
                    <div className="flex items-baseline justify-between border-b border-[#18261C]/15 pb-2 mb-4">
                      <h3 className="font-pixel text-lg font-bold text-[#18261C]">
                        {currentSpread.leftTitle}
                      </h3>
                      <span className="font-mono-tabular text-xs font-bold text-[#B86800]">
                        p.{spreadIndex * 2 + 1}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {currentSpread.leftPhotos.map((photo) => (
                        <StuckPhotoPrint
                          key={photo.id}
                          photo={photo}
                          onInspect={setActiveLightboxPhoto}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-dashed border-[#18261C]/25">
                    <div className="flex items-baseline justify-between border-b border-[#18261C]/15 pb-2 mb-4">
                      <h3 className="font-pixel text-lg font-bold text-[#18261C]">
                        {currentSpread.rightTitle}
                      </h3>
                      <span className="font-mono-tabular text-xs font-bold text-[#2E7D32]">
                        p.{spreadIndex * 2 + 2}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {currentSpread.rightPhotos.map((photo) => (
                        <StuckPhotoPrint
                          key={photo.id}
                          photo={photo}
                          onInspect={setActiveLightboxPhoto}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Page Turn Bar (Visible when Book is Open) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="max-w-[780px] mx-auto mt-5 flex items-center justify-between gap-4"
            >
              <button
                type="button"
                onClick={handlePrevSpread}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-[#18261C] bg-[#FFFDF7] hover:bg-[#FFE066] border-2 border-[#18261C] shadow-[3px_3px_0_#18261C] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <span>Previous Page</span>
              </button>

              <span className="font-mono-tabular text-xs sm:text-sm font-bold text-[#18261C] bg-[#FFFDF7] px-3 py-1.5 border-2 border-[#18261C] shadow-[2px_2px_0_#18261C]">
                Spread {currentSpread.spreadNumber} / 0{ALBUM_SPREADS.length}
              </span>

              <button
                type="button"
                onClick={handleNextSpread}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-[#18261C] bg-[#E59A00] hover:bg-[#FFE066] border-2 border-[#18261C] shadow-[3px_3px_0_#18261C] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Next Page</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ================= PHOTO ZOOM LIGHTBOX MODAL ================= */}
      {activeLightboxPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxPhoto.caption}
          className="fixed inset-0 z-50 bg-[#18261C]/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveLightboxPhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#FFFDF7] border-3 border-[#18261C] shadow-[10px_10px_0_#E59A00] p-3 sm:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="font-mono-tabular text-xs font-bold text-[#4C6050]">
                Photo {activeLightboxIdx + 1} of {ALL_ALBUM_PHOTOS.length}
              </span>
              <button
                type="button"
                onClick={() => setActiveLightboxPhoto(null)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-[#18261C] bg-[#EAE4D1] hover:bg-[#FFE066] border-2 border-[#18261C] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Close</span>
              </button>
            </div>

            <div className="bg-[#18261C]/5 border-2 border-[#18261C] overflow-hidden max-h-[70vh] flex items-center justify-center">
              <img
                src={activeLightboxPhoto.src}
                alt={activeLightboxPhoto.caption}
                referrerPolicy="no-referrer"
                decoding="async"
                className="max-h-[68vh] w-auto object-contain"
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono-tabular text-xs sm:text-sm font-bold text-[#18261C]">
                {activeLightboxPhoto.caption}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActiveLightboxPhoto(
                      ALL_ALBUM_PHOTOS[
                        (activeLightboxIdx - 1 + ALL_ALBUM_PHOTOS.length) %
                          ALL_ALBUM_PHOTOS.length
                      ]
                    )
                  }
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-[#FFFDF7] hover:bg-[#FFE066] border-2 border-[#18261C] cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Prev</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveLightboxPhoto(
                      ALL_ALBUM_PHOTOS[(activeLightboxIdx + 1) % ALL_ALBUM_PHOTOS.length]
                    )
                  }
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-[#E59A00] hover:bg-[#FFE066] border-2 border-[#18261C] cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
