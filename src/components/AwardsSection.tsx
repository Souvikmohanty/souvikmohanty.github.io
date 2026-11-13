import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Award, Cpu, Sparkles, Terminal, Wrench } from 'lucide-react';
import { ACADEMIC_CREDENTIALS, AWARDS, type AwardItem } from '../data/portfolioData';
import { PixelPatentSealIcon, PixelTrophyIcon } from './PixelSprites';

type HonorFilter = 'All' | 'Milestones' | 'Training & Tech';

function RibbonAwardNode({
  award,
  index,
}: {
  award: AwardItem;
  index: number;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ['start 92%', 'center 62%'],
  });

  const isEven = index % 2 === 0;
  const x = useTransform(scrollYProgress, [0, 1], [isEven ? -28 : 28, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <div
      ref={nodeRef}
      className="relative pl-10 sm:pl-14 pb-8 last:pb-2"
    >
      {/* Medallion Node Marker on the vertical scroll ribbon */}
      <motion.div
        style={{ scale }}
        className="absolute left-0 top-1 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFFDF7] border-2 border-[#18261C] shadow-[3px_3px_0_#2E7D32] flex items-center justify-center z-10"
      >
        <span className="font-pixel text-xs font-bold text-[#18261C]">
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>

      {/* 3D Animated Open Content Block (Soft rounded corner, zero giant flat box clones) */}
      <motion.article
        style={{
          perspective: '1000px',
          x,
          rotateX,
          scale,
          transformOrigin: 'center top',
        }}
        className="group relative py-3 border-b-2 border-dashed border-[#18261C]/20 last:border-b-0"
      >
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs mb-1.5">
          <span className="font-pixel text-sm font-bold text-[#B86800]">{award.year}</span>
          <span aria-hidden="true" className="text-[#4C6050]">
            ·
          </span>
          <span className="font-mono-tabular font-semibold text-[#2E7D32]">
            {award.category}
          </span>
          <span aria-hidden="true" className="text-[#4C6050]">
            ·
          </span>
          <span className="font-mono-tabular text-[#4C6050]">{award.organization}</span>
        </div>

        <h3
          className="text-lg sm:text-xl font-bold text-[#18261C] tracking-tight leading-snug mb-1.5 group-hover:text-[#2E7D32] transition-colors"
          style={{ textWrap: 'balance' }}
        >
          {award.title}
        </h3>

        <p className="text-sm text-[#2D3E31] leading-relaxed max-w-[68ch]">
          {award.description}
        </p>
      </motion.article>
    </div>
  );
}

export function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const podiumStageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<HonorFilter>('All');

  const { scrollYProgress: sectionEnter } = useScroll({
    target: sectionRef,
    offset: ['start 96%', 'start 46%'],
  });
  const headerRotateX = useTransform(sectionEnter, [0, 1], [14, 0]);
  const headerY = useTransform(sectionEnter, [0, 1], [32, 0]);
  const headerScale = useTransform(sectionEnter, [0, 1], [0.96, 1]);
  const headerOpacity = useTransform(sectionEnter, [0, 0.45, 1], [0.35, 0.92, 1]);

  // Scroll-linked 3D rise for the two Hero Recognition Podiums
  const { scrollYProgress: podiumProgress } = useScroll({
    target: podiumStageRef,
    offset: ['start 90%', 'center 58%'],
  });
  const podiumRotateX = useTransform(podiumProgress, [0, 1], [14, 0]);
  const leftPodiumY = useTransform(podiumProgress, [0, 1], [28, 0]);
  const rightPodiumY = useTransform(podiumProgress, [0, 1], [42, 0]);

  // Scroll-drawn golden-emerald vertical timeline spine
  const { scrollYProgress: spineProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 65%'],
  });

  // Remaining honors excluding the 2 featured pedestal honors
  const spotlightIds = new Set(['award-best-paper', 'award-patent']);
  const timelineAwards = AWARDS.filter((a) => !spotlightIds.has(a.id));

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="py-14 sm:py-20 bg-[#EBF2E6]/45 overflow-x-clip"
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6" style={{ perspective: '1200px' }}>
        {/* ================= HEADER + INTERACTIVE VIEW FILTER ================= */}
        <motion.div
          style={{
            rotateX: headerRotateX,
            y: headerY,
            scale: headerScale,
            opacity: headerOpacity,
            transformOrigin: 'center bottom',
          }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="font-pixel text-xs text-[#2E7D32] mb-1.5 tracking-wide">
              TROPHY CABINET · HONORS, PATENT &amp; TRAINING
            </p>
            <h2
              className="font-pixel text-3xl sm:text-4xl font-bold tracking-tight text-[#18261C]"
              style={{ textWrap: 'balance' }}
            >
              Awards &amp; Academic Recognitions
            </h2>
            <p className="text-sm sm:text-base text-[#4C6050] mt-2 max-w-[60ch]">
              Key accolades from national conferences, Indian design registration, hands-on
              scientific workshops, and technical certifications.
            </p>
          </div>

          <div
            className="flex flex-wrap items-center gap-1 p-1 bg-[#DCE7D4] border-2 border-[#18261C] self-start lg:self-end shrink-0"
            role="tablist"
            aria-label="Filter honors and credentials"
          >
            {(['All', 'Milestones', 'Training & Tech'] as HonorFilter[]).map((tab) => {
              const selected = filter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selected
                      ? 'bg-[#E59A00] text-[#18261C] border border-[#18261C]'
                      : 'text-[#3B4E3F] hover:text-[#18261C]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ================= PART 1: 3D ISOMETRIC SPOTLIGHT PODIUMS ================= */}
        {filter !== 'Training & Tech' && (
          <div
            ref={podiumStageRef}
            style={{ perspective: '1200px' }}
            className="mb-14"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              {/* PODIUM 01: BEST RESEARCH PAPER AWARD (ORAL) */}
              <motion.article
                style={{ rotateX: podiumRotateX, y: leftPodiumY }}
                className="relative flex flex-col"
              >
                {/* Floating Trophy Icon + Spotlight Label */}
                <div className="flex items-end justify-between px-4 mb-[-14px] relative z-10">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-16 h-16 rounded-2xl bg-[#FFFDF7] border-2 border-[#18261C] shadow-[4px_4px_0_#E59A00] flex items-center justify-center"
                  >
                    <PixelTrophyIcon className="w-11 h-11" />
                  </motion.div>

                  <span className="font-pixel text-xs font-bold text-[#18261C] bg-[#FFE066] border-2 border-[#18261C] px-3 py-1 shadow-[3px_3px_0_#18261C]">
                    2026 · BEST PAPER (ORAL)
                  </span>
                </div>

                {/* 3D Beveled Top Face */}
                <div
                  aria-hidden="true"
                  className="h-3.5 mx-3 bg-[#FFE066] border-2 border-b-0 border-[#18261C] transform -skew-x-12 origin-bottom"
                />
                {/* Main Extruded Pedestal Block */}
                <div className="rounded-b-2xl rounded-tr-2xl bg-[#FFFDF7] border-2 border-[#18261C] shadow-[8px_8px_0_#E59A00] p-6 pt-8">
                  <p className="font-mono-tabular text-xs font-bold text-[#B86800] mb-1">
                    National Conference on Natural Farming (NCNF 2026)
                  </p>
                  <h3
                    className="font-pixel text-xl sm:text-2xl font-bold text-[#18261C] leading-tight mb-2.5"
                    style={{ textWrap: 'balance' }}
                  >
                    Best Research Paper Award (Oral)
                  </h3>
                  <p className="text-sm text-[#2D3E31] leading-relaxed">
                    Awarded to Nilima Karam &amp; Souvik Mohanty for{' '}
                    <span className="italic font-medium">
                      “Management of major Defoliators of Soybean through Intercropping with Suva
                      (Anethum graveolens L.,) under Natural Farming Approach.”
                    </span>
                  </p>
                </div>
              </motion.article>

              {/* PODIUM 02: REGISTERED INDIAN DESIGN PATENT */}
              <motion.article
                style={{ rotateX: podiumRotateX, y: rightPodiumY }}
                className="relative flex flex-col"
              >
                <div className="flex items-end justify-between px-4 mb-[-14px] relative z-10">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                    className="w-16 h-16 rounded-2xl bg-[#FFFDF7] border-2 border-[#18261C] shadow-[4px_4px_0_#2E7D32] flex items-center justify-center"
                  >
                    <PixelPatentSealIcon className="w-11 h-11" />
                  </motion.div>

                  <span className="font-pixel text-xs font-bold text-white bg-[#2E7D32] border-2 border-[#18261C] px-3 py-1 shadow-[3px_3px_0_#18261C]">
                    21/07/2025 · DESIGN NO. 466702-001
                  </span>
                </div>

                {/* 3D Beveled Top Face */}
                <div
                  aria-hidden="true"
                  className="h-3.5 mx-3 bg-[#A5D6A7] border-2 border-b-0 border-[#18261C] transform -skew-x-12 origin-bottom"
                />
                {/* Main Extruded Pedestal Block */}
                <div className="rounded-b-2xl rounded-tr-2xl bg-[#FFFDF7] border-2 border-[#18261C] shadow-[8px_8px_0_#2E7D32] p-6 pt-8">
                  <p className="font-mono-tabular text-xs font-bold text-[#2E7D32] mb-1">
                    The Patent Office, Government of India · Class 10-05
                  </p>
                  <h3
                    className="font-pixel text-xl sm:text-2xl font-bold text-[#18261C] leading-tight mb-2.5"
                    style={{ textWrap: 'balance' }}
                  >
                    Registered Design Patent — Insect Monitoring Device
                  </h3>
                  <p className="text-sm text-[#2D3E31] leading-relaxed">
                    Eco-conscious, solar-assisted electro-mechanical apparatus combining multi-modal
                    AI sensing with pollinator-safe non-chemical deterrents for precision IPM.
                  </p>
                </div>
              </motion.article>
            </div>
          </div>
        )}

        {/* ================= PART 2: SCROLL-DRAWN RIBBON TIMELINE + TRAINING SPLIT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT: SCROLL-ANIMATED HONORS & SYMPOSIA TRAIL */}
          {filter !== 'Training & Tech' && (
            <div
              ref={timelineRef}
              className={filter === 'Milestones' ? 'lg:col-span-12' : 'lg:col-span-7'}
            >
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-4 h-4 text-[#E59A00]" aria-hidden="true" />
                <span className="font-pixel text-xs sm:text-sm font-bold text-[#18261C] tracking-wide">
                  CONFERENCE &amp; EXTENSION TIMELINE
                </span>
              </div>

              <div className="relative">
                {/* Base muted track */}
                <div
                  aria-hidden="true"
                  className="absolute left-[15px] sm:left-[17px] top-3 bottom-6 w-[3px] bg-[#18261C]/15"
                />
                {/* Scroll-drawn emerald progress spine */}
                <motion.div
                  aria-hidden="true"
                  style={{ scaleY: spineProgress, originY: 0 }}
                  className="absolute left-[15px] sm:left-[17px] top-3 bottom-6 w-[3px] bg-[#2E7D32]"
                />

                {timelineAwards.map((award, idx) => (
                  <RibbonAwardNode key={award.id} award={award} index={idx} />
                ))}
              </div>
            </div>
          )}

          {/* RIGHT: WORKSHOPS, TRAINING & TECHNICAL CERTIFICATIONS (OPEN LEDGER) */}
          {filter !== 'Milestones' && (
            <div className={filter === 'Training & Tech' ? 'lg:col-span-12' : 'lg:col-span-5'}>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-[#2E7D32]" aria-hidden="true" />
                <span className="font-pixel text-xs sm:text-sm font-bold text-[#18261C] tracking-wide">
                  WORKSHOPS &amp; TECHNICAL CREDENTIALS
                </span>
              </div>

              <div className="space-y-5">
                {ACADEMIC_CREDENTIALS.map((cred, idx) => {
                  const Icon =
                    cred.kind === 'Certification'
                      ? Terminal
                      : idx === 0
                        ? Wrench
                        : Cpu;

                  return (
                    <motion.div
                      key={cred.id}
                      initial={{ opacity: 0, y: 18, scale: 0.97 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{
                        duration: 0.42,
                        delay: idx * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="group relative rounded-2xl bg-[#FFFDF7]/85 hover:bg-[#FFFDF7] border-2 border-[#18261C] p-5 transition-transform hover:-translate-y-0.5 shadow-[4px_4px_0_#18261C]"
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-10 h-10 rounded-xl border-2 border-[#18261C] flex items-center justify-center shrink-0 ${
                            cred.kind === 'Certification'
                              ? 'bg-[#18261C] text-[#FFE066]'
                              : 'bg-[#E59A00] text-[#18261C]'
                          }`}
                        >
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>

                        <div className="min-w-0">
                          <p className="font-mono-tabular text-[11px] font-bold text-[#2E7D32] mb-0.5">
                            {cred.kind} · {cred.organizer}
                          </p>
                          <h4
                            className="text-sm sm:text-base font-bold text-[#18261C] leading-snug mb-1.5"
                            style={{ textWrap: 'balance' }}
                          >
                            {cred.title}
                          </h4>
                          <p className="text-xs sm:text-[13px] text-[#2D3E31] leading-relaxed">
                            {cred.detail}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
