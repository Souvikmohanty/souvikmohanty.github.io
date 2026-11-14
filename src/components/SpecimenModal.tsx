import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Microscope, Sparkles, X } from 'lucide-react';
import type { SpecimenDetail } from '../data/portfolioData';
import { PixelStopProp } from './PixelSprites';

interface SpecimenModalProps {
  specimen: SpecimenDetail | null;
  milestoneTitle?: string;
  onClose: () => void;
}

export function SpecimenModal({
  specimen,
  milestoneTitle,
  onClose,
}: SpecimenModalProps) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [specimen?.id]);

  useEffect(() => {
    if (!specimen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [specimen, onClose]);

  const tiltClasses = [
    '-rotate-2',
    'rotate-1',
    '-rotate-1',
    'rotate-2',
    '-rotate-1',
    'rotate-1',
  ];

  return (
    <AnimatePresence>
      {specimen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18261C]/75 backdrop-blur-xs"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="specimen-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FFFDF7] border-3 border-[#18261C] pixel-box p-5 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-xs font-semibold text-[#2E7D32] mb-1">
                  <span>{specimen.category}</span>
                  {milestoneTitle && (
                    <>
                      <span aria-hidden="true" className="mx-2 text-[#889B8B]">
                        ·
                      </span>
                      <span>{milestoneTitle}</span>
                    </>
                  )}
                </p>
                <h3
                  id="specimen-modal-title"
                  className="text-xl sm:text-2xl font-bold text-[#18261C] tracking-tight"
                >
                  {specimen.commonName}
                </h3>
                <p className="text-sm italic text-[#4C6050] mt-0.5">
                  {specimen.scientificName}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 shrink-0 inline-flex items-center justify-center border-2 border-[#18261C] bg-white hover:bg-[#EFECE2] text-[#18261C] transition-colors cursor-pointer"
                aria-label="Close specimen inspection popup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch mb-5">
              <div
                className={`sm:col-span-7 border-2 border-[#18261C] overflow-hidden aspect-[4/3] ${
                  specimen.imageFit === 'contain' ? 'bg-[#101613]' : 'bg-[#E6EFE4]'
                }`}
              >
                {specimen.imageSrc && !imgError ? (
                  <img
                    src={specimen.imageSrc}
                    alt={specimen.imageAlt}
                    referrerPolicy="no-referrer"
                    decoding="async"
                    onError={() => setImgError(true)}
                    className={`w-full h-full ${
                      specimen.imageFit === 'contain' ? 'object-contain' : 'object-cover'
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-[#EBF3E8]">
                    <PixelStopProp specimenId={specimen.id} className="w-16 h-16 mb-2" />
                    <span className="text-xs font-medium text-[#2D3E31]">
                      {specimen.commonName}
                    </span>
                  </div>
                )}
              </div>

              <div className="sm:col-span-5 border-2 border-[#18261C] bg-[#F6F3E8] p-4 flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white border-2 border-[#18261C] flex items-center justify-center shrink-0">
                    <PixelStopProp specimenId={specimen.id} className="w-9 h-9" />
                  </div>
                  <p className="font-pixel text-xs text-[#2E7D32] leading-snug">
                    FIELD LOGGED
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#18261C] flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E59A00]" aria-hidden="true" />
                    <span>Quick Field Note</span>
                  </p>
                  <p className="text-xs sm:text-sm text-[#2D3E31] leading-relaxed">
                    {specimen.fieldFact}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-[#18261C] bg-white p-4">
                <p className="text-xs font-bold text-[#2E7D32] mb-1">
                  {specimen.noteHeading ??
                    (specimen.hideResearcherBox
                      ? 'What We Learned'
                      : 'For Everyone — Plain Science')}
                </p>
                <p className="text-sm sm:text-base text-[#18261C] leading-relaxed">
                  {specimen.plainLanguageNote}
                </p>
              </div>

              {!specimen.hideResearcherBox && specimen.scienceContext && (
                <div className="border-2 border-[#18261C] bg-[#EEF4EA] p-4">
                  <p className="text-xs font-bold text-[#18261C] flex items-center gap-1.5 mb-1">
                    <Microscope className="w-4 h-4 text-[#2E7D32]" aria-hidden="true" />
                    <span>For Fellow Researchers — Scientific Context</span>
                  </p>
                  <p className="text-sm text-[#2D3E31] leading-relaxed">
                    {specimen.scienceContext}
                  </p>
                </div>
              )}

              {specimen.bulletPoints && specimen.bulletPoints.length > 0 && (
                <div className="border-2 border-[#18261C] bg-[#EEF4EA] p-4">
                  <p className="text-xs font-bold text-[#18261C] mb-2.5">
                    Key Design &amp; Engineering Features
                  </p>
                  <ul className="space-y-2 text-sm text-[#2D3E31]">
                    {specimen.bulletPoints.map((pt) => (
                      <li key={pt.label} className="leading-relaxed">
                        <strong className="text-[#18261C]">{pt.label}:</strong> {pt.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Casual pinned-snapshot gallery */}
              {specimen.casualPhotos && specimen.casualPhotos.length > 0 && (
                <div className="pt-2">
                  <p className="font-mono-tabular text-xs font-semibold text-[#4C6050] mb-3">
                    Field Snaps Stuck in the Diary
                  </p>
                  <div
                    className={`grid gap-3.5 ${
                      specimen.casualPhotos.length === 2
                        ? 'grid-cols-2 max-w-sm'
                        : specimen.casualPhotos.length >= 5
                        ? 'grid-cols-2 sm:grid-cols-3'
                        : 'grid-cols-2 sm:grid-cols-4'
                    }`}
                  >
                    {specimen.casualPhotos.map((photo, idx) => (
                      <figure
                        key={photo.src}
                        className={`relative bg-white p-1.5 pb-2 border-2 border-[#18261C] pixel-box-sm transition-transform hover:rotate-0 ${
                          tiltClasses[idx % tiltClasses.length]
                        }`}
                      >
                        {/* Minimalist tape strip */}
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
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-bold text-[#18261C] bg-[#E59A00] hover:bg-[#F2B705] border-2 border-[#18261C] pixel-box-sm transition-colors cursor-pointer"
              >
                Back to Field Trail
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
