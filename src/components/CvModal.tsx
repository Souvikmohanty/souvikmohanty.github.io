import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Printer, X } from 'lucide-react';
import {
  AWARDS,
  FIELD_MILESTONES,
  PUBLICATIONS,
  RESEARCHER_PROFILE,
  generatePlainCvText,
} from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CvModal({ isOpen, onClose }: CvModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const handleDownloadTxt = () => {
    const content = generatePlainCvText();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Souvik_Mohanty_Entomology_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#142419]/70 backdrop-blur-xs"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg bg-[#FAF9F5] border-2 border-[#142419] pixel-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Action toolbar */}
            <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#FAF9F5] border-b border-[#D8E2D5]">
              <h2 id="cv-modal-title" className="text-base sm:text-lg font-bold text-[#142419]">
                Curriculum Vitae Preview
              </h2>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadTxt}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#142419] bg-white hover:bg-[#EFECE2] border border-[#142419] rounded-md transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Download (.txt)</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrintPdf}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#142419] bg-[#E59A00] hover:bg-[#D18B00] border border-[#142419] rounded-md transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" aria-hidden="true" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-[#142419] bg-white hover:bg-[#EFECE2] text-[#142419] transition-colors cursor-pointer"
                  aria-label="Close CV preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable academic CV sheet */}
            <div id="printable-cv-sheet" className="p-6 sm:p-8 bg-white text-[#142419] space-y-6">
              <div className="border-b border-[#D8E2D5] pb-5">
                <h3 className="text-2xl font-bold tracking-tight">{RESEARCHER_PROFILE.name}</h3>
                <p className="text-sm sm:text-base font-medium text-[#2F7D32] mt-1">
                  {RESEARCHER_PROFILE.role} · {RESEARCHER_PROFILE.affiliation}
                </p>
                <p className="text-xs sm:text-sm text-[#4B6150] mt-2">
                  Email: {RESEARCHER_PROFILE.email}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold tracking-wider text-[#2F7D32] uppercase mb-2.5">
                  Education & Research Trajectory
                </h4>
                <div className="space-y-3">
                  {FIELD_MILESTONES.filter((m) => !m.isPatentStop)
                    .slice()
                    .reverse()
                    .map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                        <div>
                          <p className="text-sm font-semibold text-[#142419]">
                            {item.title} — {item.institution}
                          </p>
                          <p className="text-xs text-[#4B6150]">{item.highlightLabel}</p>
                        </div>
                        <span className="font-mono-tabular text-xs text-[#304235] shrink-0">
                          {item.eraLabel} · {item.location}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold tracking-wider text-[#2F7D32] uppercase mb-2.5">
                  Patent &amp; Agricultural Innovation
                </h4>
                <p className="text-sm text-[#304235] leading-relaxed">
                  Insect Monitoring &amp; Control Device — Design No. 466702-001 (Class 10-05),
                  registered with The Patent Office, Government of India (21/07/2025). Multi-modal
                  pest detection with non-chemical deterrents designed to preserve pollinators.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold tracking-wider text-[#2F7D32] uppercase mb-2.5">
                  Selected Publications
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-[#304235] leading-relaxed">
                  {PUBLICATIONS.map((pub) => (
                    <li key={pub.id}>{pub.citationText}</li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="text-xs font-bold tracking-wider text-[#2F7D32] uppercase mb-2.5">
                  Honors & Recognitions
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#304235]">
                  {AWARDS.map((award) => (
                    <li key={award.id}>
                      <span className="font-mono-tabular font-semibold text-[#142419]">
                        {award.year}
                      </span>{' '}
                      · {award.title} ({award.organization})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
