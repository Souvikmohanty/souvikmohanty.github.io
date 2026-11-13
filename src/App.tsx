import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FieldWalkSection, STOP_DWELL_RANGES } from './components/FieldWalkSection';
import { MastersResearchSection } from './components/MastersResearchSection';
import { PublicationsSection } from './components/PublicationsSection';
import { AwardsSection } from './components/AwardsSection';
import { PhotoBookSection } from './components/PhotoBookSection';
import { ContactSection } from './components/ContactSection';
import { ChapterBridge } from './components/ChapterBridge';
import { SolarSkyBackdrop } from './components/SolarSkyBackdrop';
import { LoadingScreen } from './components/LoadingScreen';
import { SpecimenModal } from './components/SpecimenModal';
import { CvModal } from './components/CvModal';
import { soundFx } from './utils/soundFx';
import { FIELD_MILESTONES, type SpecimenDetail } from './data/portfolioData';

export default function App() {
  const [selectedSpecimen, setSelectedSpecimen] = useState<{
    specimen: SpecimenDetail;
    milestoneTitle: string;
  } | null>(null);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const handleStartWalk = (stopIndex = -1) => {
    const fieldSection = document.getElementById('field-walk');
    if (!fieldSection) return;
    const sectionTop = fieldSection.getBoundingClientRect().top + window.scrollY - 64;
    if (stopIndex < 0) {
      window.scrollTo({ top: sectionTop, behavior: 'smooth' });
      return;
    }
    const clamped = Math.min(FIELD_MILESTONES.length - 1, Math.max(0, stopIndex));
    const scrollableDistance = fieldSection.offsetHeight - (window.innerHeight - 64);
    const ratio = STOP_DWELL_RANGES[clamped].center;
    window.scrollTo({
      top: sectionTop + Math.max(0, scrollableDistance) * ratio,
      behavior: 'smooth',
    });
  };

  const handleCloseSpecimen = () => {
    soundFx.playInspectClose();
    setSelectedSpecimen(null);
  };

  return (
    <MotionConfig reducedMotion="user">
      <LoadingScreen />
      <div className="min-h-screen flex flex-col relative text-[#18261C]">
        <SolarSkyBackdrop />
        <Header onOpenCv={() => setCvModalOpen(true)} />

        <main className="relative z-10 flex-1">
          <HeroSection onStartWalk={handleStartWalk} />

          <ChapterBridge variant="hero-to-walk" />

          <FieldWalkSection
            onSelectSpecimen={(specimen, milestoneTitle) =>
              setSelectedSpecimen({ specimen, milestoneTitle })
            }
          />

          <MastersResearchSection />

          <ChapterBridge variant="lab-to-library" />

          <PublicationsSection />

          <ChapterBridge variant="library-to-awards" />

          <AwardsSection />

          <ChapterBridge variant="awards-to-album" />

          <PhotoBookSection />

          <ChapterBridge variant="album-to-contact" />

          <ContactSection onOpenCv={() => setCvModalOpen(true)} />
        </main>

        <footer className="relative z-10 bg-[#181D30] text-[#E6DEC8] border-t-3 border-[#18261C] py-8">
          <div className="max-w-[1160px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#CDE0CF]">
            <p className="font-medium text-[#FFFDF7]">
              © {new Date().getFullYear()} Souvik Mohanty · Agricultural Entomology, CAU Imphal
            </p>
            <div className="flex items-center gap-5 font-semibold">
              <a href="#top" className="hover:text-[#FFE066] transition-colors">
                Top
              </a>
              <a href="#field-walk" className="hover:text-[#FFE066] transition-colors">
                Field Walk
              </a>
              <a href="#publications" className="hover:text-[#FFE066] transition-colors">
                Publications
              </a>
              <a href="#awards" className="hover:text-[#FFE066] transition-colors">
                Awards
              </a>
              <a href="#photo-book" className="hover:text-[#FFE066] transition-colors">
                Photo Book
              </a>
              <a href="#contact" className="hover:text-[#FFE066] transition-colors">
                Contact
              </a>
            </div>
          </div>
        </footer>

        <SpecimenModal
          specimen={selectedSpecimen?.specimen ?? null}
          milestoneTitle={selectedSpecimen?.milestoneTitle}
          onClose={handleCloseSpecimen}
        />

        <CvModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
      </div>
    </MotionConfig>
  );
}
