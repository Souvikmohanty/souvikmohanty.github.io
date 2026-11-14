import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'motion/react';
import {
  ArrowUpRight,
  Check,
  Copy,
  FileDown,
  MapPin,
  Send,
  Sparkles,
} from 'lucide-react';
import { RESEARCHER_PROFILE } from '../data/portfolioData';
import { PixelBeeIcon } from './PixelSprites';

interface ContactSectionProps {
  onOpenCv: () => void;
}

interface InquiryTopic {
  id: string;
  label: string;
  subject: string;
  starter: string;
}

const INQUIRY_TOPICS: InquiryTopic[] = [
  {
    id: 'stingless-bees',
    label: 'Stingless Bees',
    subject: 'Inquiry: Tetragonula srikantanathi & Bamboo Hive Research',
    starter:
      'Hi Souvik, I read about your M.Sc. thesis on Tetragonula srikantanathi and bamboo hives and would love to discuss...',
  },
  {
    id: 'ipm',
    label: 'Crop IPM',
    subject: 'Discussion: Integrated Pest Management & Biocontrol',
    starter:
      'Hi Souvik, I am interested in your work on maize Fall Armyworm compatibility and reduced-dose biocontrol...',
  },
  {
    id: 'collab',
    label: 'Collaborate',
    subject: 'Research Collaboration — Agricultural Entomology',
    starter:
      'Hello Souvik, we are exploring a collaboration in entomology / pollinator conservation and would like to connect...',
  },
  {
    id: 'hello',
    label: 'Say Hello',
    subject: 'Hello from your Field Portfolio!',
    starter:
      'Hi Souvik, really enjoyed walking through your research diary! Wanted to reach out regarding...',
  },
];

/* ================= BRAND VECTOR LOGOS FOR SCIENTIFIC & SOCIAL PROFILES ================= */

function GoogleScholarLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="16" fill="#4285F4" />
      <path d="M16 7L6 13L16 19L26 13L16 7Z" fill="#FFFFFF" />
      <path
        d="M9.8 16.5V21C9.8 23 12.6 24.8 16 24.8C19.4 24.8 22.2 23 22.2 21V16.5L16 20.2L9.8 16.5Z"
        fill="#D2E3FC"
      />
      <rect x="24" y="13.5" width="2" height="7.5" rx="1" fill="#FABB05" />
    </svg>
  );
}

function ResearchGateLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="16" fill="#00CCBB" />
      <text
        x="7.5"
        y="22.5"
        fill="#FFFFFF"
        fontFamily="Georgia, serif"
        fontWeight="700"
        fontSize="15.5"
      >
        R
      </text>
      <text
        x="18.5"
        y="14.5"
        fill="#FFFFFF"
        fontFamily="Georgia, serif"
        fontWeight="700"
        fontSize="9.5"
      >
        G
      </text>
    </svg>
  );
}

function OrcidLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="16" fill="#A6CE39" />
      <circle cx="10.4" cy="10" r="1.45" fill="#FFFFFF" />
      <rect x="9.2" y="12.8" width="2.4" height="10.2" rx="0.6" fill="#FFFFFF" />
      <path
        d="M14.3 12.8H18.4C22.1 12.8 24.2 15.1 24.2 17.9C24.2 20.7 22 23 18.4 23H14.3V12.8ZM16.7 14.9V20.9H18.3C20.6 20.9 21.8 19.6 21.8 17.9C21.8 16.2 20.5 14.9 18.3 14.9H16.7Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function LinkedInLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="16" fill="#0A66C2" />
      <circle cx="9.8" cy="10.2" r="1.75" fill="#FFFFFF" />
      <rect x="8.2" y="13.5" width="3.1" height="10.6" rx="0.6" fill="#FFFFFF" />
      <path
        d="M13.8 13.5H16.7V15C17.3 14.1 18.6 13.2 20.4 13.2C23.4 13.2 24.5 15.1 24.5 18V24.1H21.4V18.7C21.4 17 20.8 16 19.4 16C18 16 16.9 17 16.9 18.6V24.1H13.8V13.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function ContactSection({ onOpenCv }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stemRef = useRef<HTMLDivElement>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [draftCopied, setDraftCopied] = useState(false);
  const [justLaunched, setJustLaunched] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(INQUIRY_TOPICS[0].id);
  const [subject, setSubject] = useState<string>(INQUIRY_TOPICS[0].subject);
  const [messageBody, setMessageBody] = useState<string>(INQUIRY_TOPICS[0].starter);

  const { scrollYProgress: sectionEnter } = useScroll({
    target: sectionRef,
    offset: ['start 94%', 'center 62%'],
  });

  const leftSlideX = useTransform(sectionEnter, [0, 1], [-28, 0]);
  const postcardRotate = useTransform(sectionEnter, [0, 1], [-4, -1]);
  const postcardY = useTransform(sectionEnter, [0, 1], [44, 0]);
  const stageOpacity = useTransform(sectionEnter, [0, 0.45, 1], [0.3, 0.9, 1]);
  const beeFlyX = useTransform(sectionEnter, [0, 1], [-18, 4]);
  const stemScaleY = useTransform(sectionEnter, [0.1, 0.9], [0.1, 1]);

  const handleSelectTopic = (topic: InquiryTopic) => {
    setSelectedTopicId(topic.id);
    setSubject(topic.subject);
    setMessageBody(topic.starter);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(RESEARCHER_PROFILE.email);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2200);
    } catch {
      setEmailCopied(false);
    }
  };

  const handleCopyEmailAndNote = async () => {
    try {
      await navigator.clipboard.writeText(
        `To: ${RESEARCHER_PROFILE.email}\nSubject: ${subject}\n\n${messageBody}`
      );
      setDraftCopied(true);
      window.setTimeout(() => setDraftCopied(false), 2200);
    } catch {
      setDraftCopied(false);
    }
  };

  const handleLaunchEmail = () => {
    setJustLaunched(true);
    window.setTimeout(() => setJustLaunched(false), 1200);
  };

  const mailtoHref = `mailto:${RESEARCHER_PROFILE.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(messageBody)}`;

  const scientificProfiles = [
    {
      label: 'Google Scholar',
      subtitle: 'Citations & Papers',
      href: RESEARCHER_PROFILE.links.googleScholar,
      Logo: GoogleScholarLogo,
      ringColor: 'group-hover:border-[#4285F4]',
      shadowColor: 'group-hover:shadow-[0_10px_0_#4285F4]',
      floatOffset: 'lg:-translate-y-2',
    },
    {
      label: 'ResearchGate',
      subtitle: 'Preprints & Reads',
      href: RESEARCHER_PROFILE.links.researchGate,
      Logo: ResearchGateLogo,
      ringColor: 'group-hover:border-[#00CCBB]',
      shadowColor: 'group-hover:shadow-[0_10px_0_#00CCBB]',
      floatOffset: 'lg:translate-y-3',
    },
    {
      label: 'ORCID',
      subtitle: '0009-0003-6958-6994',
      href: RESEARCHER_PROFILE.links.orcid,
      Logo: OrcidLogo,
      ringColor: 'group-hover:border-[#A6CE39]',
      shadowColor: 'group-hover:shadow-[0_10px_0_#A6CE39]',
      floatOffset: 'lg:-translate-y-1',
    },
    {
      label: 'LinkedIn',
      subtitle: 'Academic Network',
      href: RESEARCHER_PROFILE.links.linkedin,
      Logo: LinkedInLogo,
      ringColor: 'group-hover:border-[#0A66C2]',
      shadowColor: 'group-hover:shadow-[0_10px_0_#0A66C2]',
      floatOffset: 'lg:translate-y-2',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-14 sm:py-22 bg-gradient-to-b from-transparent via-[#1B1E38]/18 to-[#16192E]/42 overflow-x-clip"
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
        {/* ================= MAIN OPEN-AIR 2-COLUMN STAGE (NO SQUARE BOXES!) ================= */}
        <motion.div
          style={{ opacity: stageOpacity }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16"
        >
          {/* LEFT: OPEN EDITORIAL FIELD IDENTITY + FLOATING MEDALLION + BOTANICAL PROMPTS */}
          <motion.div style={{ x: leftSlideX }} className="lg:col-span-5">
            {/* Circular Animated Medallion + Floating Greeting Bubble */}
            <div className="flex items-center gap-5 mb-6">
              <div className="relative shrink-0">
                {/* Rotating dashed orbital ring */}
                <motion.div
                  aria-hidden="true"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-2.5 rounded-full border-2 border-dashed border-[#FFE066]/70 pointer-events-none"
                />
                <div className="relative w-24 h-24 rounded-full border-3 border-[#18261C] shadow-[4px_5px_0_#E59A00] overflow-hidden bg-[#18261C]">
                  <img
                    src="./assets/souvik-profile-bw.jpg"
                    alt="Souvik Mohanty portrait"
                    className="w-full h-full object-cover object-center grayscale contrast-110"
                  />
                </div>
                {/* Buzzing bee companion hovering right above head */}
                <motion.div
                  style={{ x: beeFlyX }}
                  className="absolute -top-5 left-1/2 -translate-x-1/2 animate-bee-hover pointer-events-none z-10"
                >
                  <PixelBeeIcon className="w-7 h-7" />
                </motion.div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 bg-[#FFFDF7] border-2 border-[#18261C] px-3 py-1 rounded-full shadow-[2px_2px_0_#E59A00] mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#2E7D32] animate-pulse" />
                  <span className="font-mono-tabular text-[11px] font-bold text-[#18261C]">
                    Open to Collaborations
                  </span>
                </div>
                <p className="font-pixel text-xs text-[#FFE066] tracking-wide drop-shadow-[1px_1px_0_#18261C]">
                  SUNSET HORIZON · OUTPOST
                </p>
                <h2
                  className="font-pixel text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFDF7] leading-none mt-1 drop-shadow-[2px_2px_0_#18261C]"
                  style={{ textWrap: 'balance' }}
                >
                  Say Hello!
                </h2>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#FFF8EB] leading-relaxed mb-6 max-w-[48ch] drop-shadow-[0_1px_2px_rgba(20,18,38,0.65)]">
              Let’s talk stingless bees, sustainable pest management, or new research ideas from
              CAU Imphal and beyond.
            </p>

            {/* Open Scroll-Drawn Botanical Stem Prompts (Zero Card Box!) */}
            <div ref={stemRef} className="relative pl-6 mb-7 space-y-3.5">
              <div
                aria-hidden="true"
                className="absolute left-1.5 top-1 bottom-1 w-[2px] bg-[#FFFDF7]/25"
              />
              <motion.div
                aria-hidden="true"
                style={{ scaleY: stemScaleY, originY: 0 }}
                className="absolute left-1.5 top-1 bottom-1 w-[2px] bg-[#FFE066]"
              />

              {[
                'Stingless bee nesting biology & bamboo hive design',
                'Maize IPM, Fall Armyworm & pollinator-safe biocontrol',
                'Invited seminars, joint manuscripts & lab exchanges',
              ].map((item) => (
                <div
                  key={item}
                  className="relative flex items-start gap-2.5 text-sm text-[#FFFDF7] drop-shadow-[0_1px_2px_rgba(20,18,38,0.6)]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[22px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#FFE066] border-2 border-[#18261C]"
                  />
                  <span className="font-medium leading-snug">{item}</span>
                </div>
              ))}
            </div>

            {/* Inline Tactile Email Strip + CV Pill (Directly on Canvas) */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t-2 border-dashed border-[#FFFDF7]/30">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FFFDF7] hover:bg-[#FFE066] border-2 border-[#18261C] shadow-[3px_3px_0_#18261C] transition-all cursor-pointer"
                title="Copy email address"
              >
                <span className="font-mono-tabular text-xs font-bold text-[#18261C]">
                  {RESEARCHER_PROFILE.email}
                </span>
                {emailCopied ? (
                  <Check className="w-3.5 h-3.5 text-[#2E7D32]" aria-hidden="true" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#4C6050] group-hover:text-[#18261C]" aria-hidden="true" />
                )}
              </button>

              <button
                type="button"
                onClick={onOpenCv}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-[#18261C] bg-[#E59A00] hover:bg-[#F2B705] border-2 border-[#18261C] shadow-[3px_3px_0_#18261C] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Full CV</span>
              </button>

              <span className="inline-flex items-center gap-1 font-mono-tabular text-[11px] font-semibold text-[#FFE066] drop-shadow-[1px_1px_0_#18261C]">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>CAU Imphal</span>
              </span>
            </div>
          </motion.div>

          {/* RIGHT: TILTED 3D AIRMAIL POSTCARD COMPOSER WITH PERFORATED PIXEL BEE STAMP */}
          <div className="lg:col-span-7" style={{ perspective: '1200px' }}>
            <motion.div
              style={{ rotate: postcardRotate, y: postcardY }}
              whileHover={{ rotate: 0, y: -4 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className="relative bg-[#FFFDF7] border-3 border-[#18261C] shadow-[10px_12px_0_#18261C] overflow-hidden"
            >
              {/* Classic Diagonal Airmail Top & Bottom Ribbons */}
              <div
                aria-hidden="true"
                className="h-2.5 w-full bg-[repeating-linear-gradient(135deg,#2E7D32_0px,#2E7D32_14px,#FFFDF7_14px,#FFFDF7_22px,#E59A00_22px,#E59A00_36px,#FFFDF7_36px,#FFFDF7_44px)] border-b-2 border-[#18261C]"
              />

              <div className="p-5 sm:p-7 relative">
                {/* Perforated Postage Stamp Badge in Top-Right */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="font-pixel text-xs text-[#2E7D32] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#E59A00]" aria-hidden="true" />
                      <span>FIELD DISPATCH POSTCARD</span>
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#18261C] tracking-tight mt-0.5">
                      Send a Quick Note
                    </h3>
                  </div>

                  {/* Pixel Stamp with Serrated Dashed Border */}
                  <div className="hidden sm:flex flex-col items-center justify-center w-20 h-20 bg-[#F6F3E8] border-2 border-dashed border-[#18261C] p-1.5 rotate-3 shrink-0 shadow-[2px_2px_0_#E59A00]">
                    <PixelBeeIcon className="w-8 h-8 animate-bee-hover" />
                    <span className="font-mono-tabular text-[9px] font-bold text-[#18261C] tracking-tight mt-1">
                      IMPHAL AIR
                    </span>
                  </div>
                </div>

                {/* Animated Topic Selector Strip */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {INQUIRY_TOPICS.map((topic) => {
                    const active = topic.id === selectedTopicId;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => handleSelectTopic(topic)}
                        className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold border-2 border-[#18261C] transition-colors cursor-pointer ${
                          active
                            ? 'text-[#18261C]'
                            : 'bg-[#F6F3E8] text-[#3B4E3F] hover:bg-white'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="contact-topic-pill"
                            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                            className="absolute inset-0 rounded-full bg-[#FFE066] -z-0"
                          />
                        )}
                        <span className="relative z-10">{topic.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Postcard Ruled Lines Input Area */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTopicId}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-3 mb-5"
                  >
                    <div className="border-b-2 border-[#18261C]/20 pb-2">
                      <label
                        htmlFor="postcard-subject"
                        className="font-mono-tabular text-[10px] font-bold text-[#2E7D32] uppercase mr-2"
                      >
                        RE:
                      </label>
                      <input
                        id="postcard-subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-transparent text-sm font-bold text-[#18261C] focus:outline-none placeholder:text-[#4C6050]/50"
                      />
                    </div>

                    <div className="bg-[linear-gradient(transparent_27px,#18261C1A_28px)] bg-[length:100%_28px]">
                      <label htmlFor="postcard-body" className="sr-only">
                        Your message note
                      </label>
                      <textarea
                        id="postcard-body"
                        rows={3}
                        value={messageBody}
                        onChange={(e) => setMessageBody(e.target.value)}
                        className="w-full bg-transparent text-sm text-[#2D3E31] leading-[28px] focus:outline-none resize-none"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Launch Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyEmailAndNote}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-[#18261C] bg-[#F6F3E8] hover:bg-[#EAE4D1] border-2 border-[#18261C] transition-colors cursor-pointer"
                  >
                    {draftCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#2E7D32]" aria-hidden="true" />
                        <span>Draft Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Copy Draft</span>
                      </>
                    )}
                  </button>

                  <motion.a
                    href={mailtoHref}
                    onClick={handleLaunchEmail}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#2E7D32] hover:bg-[#256628] border-2 border-[#18261C] shadow-[4px_4px_0_#18261C]"
                  >
                    <motion.span
                      animate={justLaunched ? { x: [0, 14, 0], y: [0, -10, 0] } : {}}
                      transition={{ duration: 0.45 }}
                      className="inline-flex"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                    </motion.span>
                    <span>Send via Email App</span>
                  </motion.a>
                </div>
              </div>

              {/* Bottom Airmail Stripe */}
              <div
                aria-hidden="true"
                className="h-2 w-full bg-[repeating-linear-gradient(135deg,#2E7D32_0px,#2E7D32_14px,#FFFDF7_14px,#FFFDF7_22px,#E59A00_22px,#E59A00_36px,#FFFDF7_36px,#FFFDF7_44px)] border-t-2 border-[#18261C]"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* ================= FLOATING CIRCULAR BRAND SOCIAL MEDALLIONS (ZERO BOXES!) ================= */}
        <div className="relative pt-8 border-t-2 border-dashed border-[#FFFDF7]/30">
          <div className="text-center mb-8">
            <p className="font-pixel text-xs text-[#FFE066] tracking-wide drop-shadow-[1px_1px_0_#18261C]">
              FIND MY WORK ACROSS THE WEB
            </p>
            <h3 className="font-pixel text-xl sm:text-2xl font-bold text-[#FFFDF7] mt-0.5 drop-shadow-[2px_2px_0_#18261C]">
              Scientific &amp; Social Profiles
            </h3>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Subtle connecting dotted botanical curve on desktop */}
            <svg
              aria-hidden="true"
              viewBox="0 0 800 90"
              className="hidden lg:block absolute top-5 left-12 right-12 w-[calc(100%-6rem)] h-20 pointer-events-none"
              fill="none"
            >
              <path
                d="M 40 32 Q 220 75 400 32 T 760 32"
                stroke="#FFFDF7"
                strokeOpacity="0.4"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
            </svg>

            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {scientificProfiles.map((profile, idx) => {
                const Logo = profile.Logo;
                return (
                  <motion.a
                    key={profile.label}
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: idx * 0.07 }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className={`group flex flex-col items-center text-center cursor-pointer ${profile.floatOffset}`}
                  >
                    {/* Tactile Circular Brand Medallion */}
                    <div
                      className={`relative w-20 h-20 rounded-full bg-[#FFFDF7] border-3 border-[#18261C] shadow-[0_6px_0_#18261C] p-2.5 flex items-center justify-center transition-all duration-200 ${profile.ringColor} ${profile.shadowColor}`}
                    >
                      <Logo className="w-full h-full transition-transform duration-200 group-hover:rotate-[-6deg] group-hover:scale-105" />
                      <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FFE066] border-2 border-[#18261C] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#18261C]" aria-hidden="true" />
                      </span>
                    </div>

                    <span className="font-pixel text-sm sm:text-base font-bold text-[#FFFDF7] mt-3 group-hover:text-[#FFE066] transition-colors drop-shadow-[1px_1px_0_#18261C]">
                      {profile.label}
                    </span>
                    <span className="font-mono-tabular text-[11px] text-[#FDE8D7] mt-0.5 drop-shadow-[0_1px_1px_rgba(20,18,38,0.8)]">
                      {profile.subtitle}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
