import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, BookOpen, Check, Copy } from 'lucide-react';
import {
  PUBLICATIONS,
  PUBLISHED_ABSTRACTS,
  type AbstractFormat,
  type PublicationItem,
  type PublicationTopic,
} from '../data/portfolioData';
import { PixelSuitedResearcher } from './PixelSprites';

const TOPICS: PublicationTopic[] = [
  'All',
  'Pest Management',
  'Sustainable Farming',
];

const ABSTRACT_FILTERS: { label: string; value: AbstractFormat }[] = [
  { label: 'All Abstracts', value: 'All' },
  { label: 'Oral Presentations', value: 'Oral Presentation' },
  { label: 'Poster Presentations', value: 'Poster Presentation' },
];

function PublicationIndexEntry({
  pub,
  index,
  isCopied,
  onCopy,
}: {
  pub: PublicationItem;
  index: number;
  isCopied: boolean;
  onCopy: (id: string, citation: string) => void;
}) {
  const rowRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start 92%', 'center 62%'],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

  const spineColor =
    pub.topic === 'Pest Management'
      ? 'bg-[#2E7D32] text-[#FFFDF7]'
      : 'bg-[#E59A00] text-[#18261C]';

  const indexLabel = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      ref={rowRef}
      style={{
        perspective: '1000px',
        rotateX,
        scale,
        transformOrigin: 'center top',
      }}
      className="group relative py-6 sm:py-7 border-t-2 border-[#18261C]/18 last:border-b-2 transition-colors hover:bg-[#FFFDF7]/80 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
        {/* Column 1: Editorial Index + Year + 3D Miniature Monograph Spine */}
        <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-12 border-2 border-[#18261C] shadow-[4px_4px_0_#18261C] flex flex-col items-center justify-center transition-transform duration-200 group-hover:-translate-y-1 group-hover:-rotate-3 ${spineColor}`}
              aria-hidden="true"
            >
              <BookOpen className="w-4 h-4 mb-0.5" />
              <span className="font-pixel text-[11px] leading-none font-bold">{indexLabel}</span>
            </div>

            <div>
              <span className="block font-pixel text-xl sm:text-2xl font-bold text-[#18261C] leading-none">
                {pub.year}
              </span>
              <span className="block font-mono-tabular text-[11px] font-semibold text-[#2E7D32] mt-1">
                {pub.topic}
              </span>
            </div>
          </div>
        </div>

        {/* Column 2: Clean Typographic Title, Metadata & Plain Takeaway */}
        <div className="lg:col-span-7 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#4C6050] mb-1.5">
            <span className="font-semibold text-[#18261C]">{pub.journal}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">{pub.volumeIssue}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular text-[#5E6E61]">{pub.doiOrIdentifier}</span>
          </div>

          <h3
            className="text-lg sm:text-xl font-bold text-[#18261C] tracking-tight leading-snug mb-1.5"
            style={{ textWrap: 'balance' }}
          >
            {pub.title}
          </h3>

          <p className="font-mono-tabular text-xs text-[#4C6050] mb-2.5">{pub.authors}</p>

          <p className="text-sm text-[#2D3E31] leading-relaxed max-w-[68ch]">
            {pub.plainSummary}
          </p>
        </div>

        {/* Column 3: Compact Inline Action Controls */}
        <div className="lg:col-span-3 flex flex-wrap lg:flex-col items-stretch lg:items-end justify-start gap-2 pt-1">
          <button
            type="button"
            onClick={() => onCopy(pub.id, pub.citationText)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#18261C] bg-[#FFFDF7] hover:bg-[#FFE066] border-2 border-[#18261C] shadow-[3px_3px_0_#18261C] active:translate-x-[1px] active:translate-y-[1px] transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#2E7D32]" aria-hidden="true" />
                <span>Citation Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Copy Citation</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <a
              href={pub.scholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#18261C] bg-white hover:bg-[#EEF5EA] border-2 border-[#18261C] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Scholar</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#2E7D32]" aria-hidden="true" />
            </a>

            <a
              href={pub.researchGateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#18261C] bg-white hover:bg-[#EEF5EA] border-2 border-[#18261C] transition-colors whitespace-nowrap shrink-0"
            >
              <span>ResearchGate</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#2E7D32]" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function AbstractScrollCard({
  abs,
  idx,
  isCopied,
  onCopy,
}: {
  abs: (typeof PUBLISHED_ABSTRACTS)[number];
  idx: number;
  isCopied: boolean;
  onCopy: (id: string, citation: string) => void;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 95%', 'center 65%'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [idx % 2 === 0 ? -5 : 5, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const ruleScaleX = useTransform(scrollYProgress, [0, 1], [0.15, 1]);

  const isOral = abs.presentationType === 'Oral Presentation';

  return (
    <motion.article
      ref={cardRef}
      style={{
        perspective: '900px',
        rotateX,
        rotateY,
        y,
        scale,
        transformOrigin: 'center top',
      }}
      className="group relative pt-4 pb-2 flex flex-col justify-between transition-colors hover:bg-[#FFFDF7]/75 px-3 -mx-3 rounded-xl"
    >
      {/* Scroll-drawn animated top accent bar */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: ruleScaleX, originX: 0 }}
        className={`absolute top-0 left-3 right-3 h-[3px] ${
          isOral ? 'bg-[#2E7D32]' : 'bg-[#E59A00]'
        }`}
      />

      <div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs mb-2 pt-1">
          <span className="font-pixel text-sm font-bold text-[#18261C] px-1.5 py-0.5 bg-[#FFFDF7] border border-[#18261C] shadow-[2px_2px_0_#18261C] transition-transform group-hover:-rotate-3">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <span
            className={`font-mono-tabular font-bold ${
              isOral ? 'text-[#2E7D32]' : 'text-[#B86800]'
            }`}
          >
            {abs.presentationType}
          </span>
          <span aria-hidden="true" className="text-[#4C6050]">
            ·
          </span>
          <span className="font-mono-tabular font-semibold text-[#4C6050]">{abs.date}</span>
        </div>

        <h4
          className="text-base sm:text-[17px] font-bold text-[#18261C] tracking-tight leading-snug mb-1.5"
          style={{ textWrap: 'balance' }}
        >
          {abs.title}
        </h4>

        <p className="font-mono-tabular text-xs text-[#2D3E31]">
          {abs.conference}
          {abs.note ? ` · ${abs.note}` : ''}
        </p>
      </div>

      <div className="mt-3 pt-2 flex items-center justify-end">
        <button
          type="button"
          onClick={() => onCopy(abs.id, abs.citationText)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-[#18261C] bg-[#FFFDF7] hover:bg-[#FFE066] border border-[#18261C] shadow-[2px_2px_0_#18261C] transition-all whitespace-nowrap shrink-0 cursor-pointer"
        >
          {isCopied ? (
            <>
              <Check className="w-3 h-3 text-[#2E7D32]" aria-hidden="true" />
              <span>Abstract Citation Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" aria-hidden="true" />
              <span>Copy Abstract Citation</span>
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}

export function PublicationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const hostInView = useInView(headerRef, { amount: 0.35 });

  const { scrollYProgress: sectionEnter } = useScroll({
    target: sectionRef,
    offset: ['start 96%', 'start 46%'],
  });
  const headerRotateX = useTransform(sectionEnter, [0, 1], [14, 0]);
  const headerY = useTransform(sectionEnter, [0, 1], [34, 0]);
  const headerScale = useTransform(sectionEnter, [0, 1], [0.96, 1]);
  const headerOpacity = useTransform(sectionEnter, [0, 0.45, 1], [0.35, 0.92, 1]);

  const [activeTopic, setActiveTopic] = useState<PublicationTopic>('All');
  const [abstractFilter, setAbstractFilter] = useState<AbstractFormat>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [wavePhase, setWavePhase] = useState(false);

  // Suited Souvik waves joyfully as visitors scroll into the section
  useEffect(() => {
    if (!hostInView) {
      setWavePhase(false);
      return;
    }
    const interval = window.setInterval(() => {
      setWavePhase((prev) => !prev);
    }, 340);
    return () => window.clearInterval(interval);
  }, [hostInView]);

  const filteredPublications =
    activeTopic === 'All'
      ? PUBLICATIONS
      : PUBLICATIONS.filter((pub) => pub.topic === activeTopic);

  const filteredAbstracts =
    abstractFilter === 'All'
      ? PUBLISHED_ABSTRACTS
      : PUBLISHED_ABSTRACTS.filter((abs) => abs.presentationType === abstractFilter);

  const handleCopyCitation = async (id: string, citation: string) => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopiedId(id);
      window.setTimeout(() => {
        setCopiedId((prev) => (prev === id ? null : prev));
      }, 2000);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="publications"
      className="py-14 sm:py-20 notebook-grid overflow-x-clip"
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6" style={{ perspective: '1200px' }}>
        {/* Heading Row + Suited Pixel Character with Overhead Welcome Message Box */}
        <motion.div
          ref={headerRef}
          style={{
            rotateX: headerRotateX,
            y: headerY,
            scale: headerScale,
            opacity: headerOpacity,
            transformOrigin: 'center bottom',
          }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-6">
            {/* Suited Researcher Character & Overhead Welcome Message Bubble */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex flex-col items-center self-start sm:self-end shrink-0"
            >
              {/* Small Welcome Message Box floating above character's head */}
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.85 }}
                animate={
                  hostInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0.85, y: 4, scale: 0.94 }
                }
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="relative mb-2.5 z-10 bg-[#FFFDF7] border-2 border-[#18261C] shadow-[3px_3px_0_#E59A00] px-2.5 py-1.5 text-center whitespace-nowrap"
              >
                <p className="font-pixel text-[11px] font-bold text-[#18261C] leading-tight">
                  Welcome! Read &amp; cite my papers
                </p>
                {/* Pixel Speech Bubble Tail */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#FFFDF7] border-r-2 border-b-2 border-[#18261C] rotate-45"
                />
              </motion.div>

              <div className="w-20 h-[88px] sm:w-22 sm:h-24">
                <PixelSuitedResearcher wavePhase={wavePhase} className="w-full h-full" />
              </div>
            </motion.div>

            {/* Editorial Title Block */}
            <div>
              <p className="font-pixel text-xs text-[#2E7D32] mb-1.5 tracking-wide">
                SCHOLARLY ARCHIVE · {PUBLICATIONS.length} ARTICLES &amp; {PUBLISHED_ABSTRACTS.length}{' '}
                PUBLISHED ABSTRACTS
              </p>
              <h2
                className="font-pixel text-3xl sm:text-4xl font-bold tracking-tight text-[#18261C]"
                style={{ textWrap: 'balance' }}
              >
                Publications &amp; Field Monographs
              </h2>
              <p className="text-sm sm:text-base text-[#4C6050] mt-2 max-w-[54ch]">
                Peer-reviewed articles on maize IPM and regenerative farming alongside conference
                abstracts published across oral and poster proceedings.
              </p>
            </div>
          </div>

          {/* Segmented Topic Filter Tabs */}
          <div
            className="flex flex-wrap items-center gap-1 p-1 bg-[#EAE4D1] border-2 border-[#18261C] self-start lg:self-end shrink-0"
            role="tablist"
            aria-label="Filter publications by research topic"
          >
            {TOPICS.map((topic) => {
              const isSelected = activeTopic === topic;
              return (
                <button
                  key={topic}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTopic(topic)}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#E59A00] text-[#18261C] border border-[#18261C]'
                      : 'text-[#3B4E3F] hover:text-[#18261C]'
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Open-Air Editorial Ledger for Journal & Review Articles */}
        <div>
          {filteredPublications.map((pub, index) => (
            <PublicationIndexEntry
              key={pub.id}
              pub={pub}
              index={index}
              isCopied={copiedId === pub.id}
              onCopy={handleCopyCitation}
            />
          ))}
        </div>

        {/* ================= PUBLISHED ABSTRACTS FROM CV (OPEN 2-COLUMN LEDGER) ================= */}
        <div className="mt-14 pt-10 border-t-2 border-dashed border-[#18261C]/30">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-pixel text-xs text-[#B86800] mb-1 tracking-wide">
                CURRICULUM VITAE · CONFERENCE PROCEEDINGS
              </p>
              <h3
                className="font-pixel text-2xl sm:text-3xl font-bold tracking-tight text-[#18261C]"
                style={{ textWrap: 'balance' }}
              >
                Published Abstracts (Oral &amp; Poster)
              </h3>
            </div>

            {/* Segmented Format Filter */}
            <div
              className="flex flex-wrap items-center gap-1 p-1 bg-[#EAE4D1] border-2 border-[#18261C] self-start md:self-auto shrink-0"
              role="tablist"
              aria-label="Filter conference abstracts by presentation type"
            >
              {ABSTRACT_FILTERS.map((tab) => {
                const isSelected = abstractFilter === tab.value;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setAbstractFilter(tab.value)}
                    className={`px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#2E7D32] text-white border border-[#18261C]'
                        : 'text-[#3B4E3F] hover:text-[#18261C]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {filteredAbstracts.map((abs, idx) => (
              <AbstractScrollCard
                key={abs.id}
                abs={abs}
                idx={idx}
                isCopied={copiedId === abs.id}
                onCopy={handleCopyCitation}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
