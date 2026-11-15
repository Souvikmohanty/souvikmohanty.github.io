import { Suspense, lazy, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FieldWalkSection, STOP_DWELL_RANGES } from './components/FieldWalkSection';
import { ChapterBridge } from './components/ChapterBridge';
import { SolarSkyBackdrop } from './components/SolarSkyBackdrop';
import { LoadingScreen } from './components/LoadingScreen';
import { PixelCursor } from './components/PixelCursor';
import { soundFx } from './utils/soundFx';
import { FIELD_MILESTONES, type SpecimenDetail } from './data/portfolioData';

const MastersResearchSection = lazy(() =>
  import('./components/MastersResearchSection').then((m) => ({
    default: m.MastersResearchSection,
  }))
);
const PublicationsSection = lazy(() =>
  import('./components/PublicationsSection').then((m) => ({
    default: m.PublicationsSection,
  }))
);
const AwardsSection = lazy(() =>
  import('./components/AwardsSection').then((m) => ({
    default: m.AwardsSection,
  }))
);
const PhotoBookSection = lazy(() =>
  import('./components/PhotoBookSection').then((m) => ({
    default: m.PhotoBookSection,
  }))
);
const YouTubeSection = lazy(() =>
  import('./components/YouTubeSection').then((m) => ({
    default: m.YouTubeSection,
  }))
);
const ContactSection = lazy(() =>
  import('./components/ContactSection').then((m) => ({
    default: m.ContactSection,
  }))
);
const SpecimenModal = lazy(() =>
  import('./components/SpecimenModal').then((m) => ({
    default: m.SpecimenModal,
  }))
);
const CvModal = lazy(() =>
  import('./components/CvModal').then((m) => ({
    default: m.CvModal,
  }))
);

function SectionAnchorFallback({ id }: { id: string }) {
  return <div id={id} className="min-h-[360px]" aria-hidden="true" />;
}

export default function App() {
  const [selectedSpecimen, setSelectedSpecimen] = useState<{
    specimen: SpecimenDetail;
    milestoneTitle: string;
  } | null>(null);
  const [specimenModalMounted, setSpecimenModalMounted] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [cvModalMounted, setCvModalMounted] = useState(false);

  const handleOpenSpecimen = (specimen: SpecimenDetail, milestoneTitle: string) => {
    setSpecimenModalMounted(true);
    setSelectedSpecimen({ specimen, milestoneTitle });
  };

  const handleOpenCv = () => {
    setCvModalMounted(true);
    setCvModalOpen(true);
  };

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
      <PixelCursor />
      <div className="min-h-screen flex flex-col relative text-[#18261C]">
        <SolarSkyBackdrop />
        <Header onOpenCv={handleOpenCv} />

        <main className="relative z-10 flex-1">
          <HeroSection onStartWalk={handleStartWalk} />

          <div aria-hidden="true" className="h-5 sm:h-7" />

          <FieldWalkSection onSelectSpecimen={handleOpenSpecimen} />

          <Suspense fallback={<SectionAnchorFallback id="masters-research" />}>
            <MastersResearchSection />
          </Suspense>

          <ChapterBridge variant="lab-to-library" />

          <Suspense fallback={<SectionAnchorFallback id="publications" />}>
            <PublicationsSection />
          </Suspense>

          <ChapterBridge variant="library-to-awards" />

          <Suspense fallback={<SectionAnchorFallback id="awards" />}>
            <AwardsSection />
          </Suspense>

          <ChapterBridge variant="awards-to-album" />

          <Suspense fallback={<SectionAnchorFallback id="photo-book" />}>
            <PhotoBookSection />
          </Suspense>

          <Suspense fallback={<SectionAnchorFallback id="youtube" />}>
            <YouTubeSection />
          </Suspense>

          <ChapterBridge variant="youtube-to-contact" />

          <Suspense fallback={<SectionAnchorFallback id="contact" />}>
            <ContactSection onOpenCv={handleOpenCv} />
          </Suspense>
        </main>

        <footer className="relative z-10 bg-[#181D30] text-[#E6DEC8] border-t-3 border-[#18261C] py-6">
          <div className="max-w-[1160px] mx-auto px-4 sm:px-6 text-center text-xs sm:text-sm text-[#CDE0CF]">
            <p className="font-medium text-[#FFFDF7]">
              © {new Date().getFullYear()} Souvik Mohanty · Agricultural Entomology, CAU Imphal
            </p>
          </div>
        </footer>

        {specimenModalMounted && (
          <Suspense fallback={null}>
            <SpecimenModal
              specimen={selectedSpecimen?.specimen ?? null}
              milestoneTitle={selectedSpecimen?.milestoneTitle}
              onClose={handleCloseSpecimen}
            />
          </Suspense>
        )}

        {cvModalMounted && (
          <Suspense fallback={null}>
            <CvModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
          </Suspense>
        )}
      </div>
    </MotionConfig>
  );
}
