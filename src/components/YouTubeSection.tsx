import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import {
  BehanceLogoIcon,
  PixelInformalStudio,
  YouTubeLogoIcon,
  type InformalHostPose,
} from './PixelSprites';
import { soundFx } from '../utils/soundFx';

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@aweirdconnection';
const BEHANCE_PROFILE_URL = 'https://www.behance.net/souvikmohanty1';

export function YouTubeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const [workPhase, setWorkPhase] = useState(false);
  const [poseTick, setPoseTick] = useState(0);

  const POSES: InformalHostPose[] = ['wave', 'stand', 'thumbs-up', 'stand'];
  const studioPose: InformalHostPose = inView ? POSES[poseTick % POSES.length] : 'stand';

  useEffect(() => {
    if (!inView) {
      setPoseTick(0);
      return;
    }
    const interval = window.setInterval(() => {
      setPoseTick((prev) => (prev + 1) % 4);
    }, 1500);
    return () => window.clearInterval(interval);
  }, [inView]);

  const handleCharacterTap = () => {
    soundFx.playToggleOn();
    setWorkPhase((prev) => !prev);
  };

  return (
    <section
      ref={sectionRef}
      id="youtube"
      aria-labelledby="youtube-heading"
      className="relative py-8 sm:py-12 bg-transparent overflow-x-clip"
    >
      <div className="max-w-[820px] mx-auto px-4 sm:px-6 text-center">
        {/* Compact Heading on Top */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5"
        >
          <h2
            id="youtube-heading"
            className="font-pixel text-xl sm:text-3xl font-bold tracking-tight text-[#FFFDF7] drop-shadow-[2px_2px_0_#18261C]"
            style={{ textWrap: 'balance' }}
          >
            I make videos and do designing for fun
          </h2>
        </motion.div>

        {/* Informal Studio Vignette + Stylish YouTube & Behance Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-9">
          <motion.button
            type="button"
            onClick={handleCharacterTap}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            data-cursor="Tap studio"
            className="relative cursor-pointer bg-transparent border-0 p-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFE066]"
            aria-label="Tap Souvik at his creative studio desk"
          >
            <PixelInformalStudio pose={studioPose} workPhase={workPhase} />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 w-full max-w-[300px] sm:w-[292px]"
          >
            {/* Stylish YouTube Link Card */}
            <motion.a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playToggleOn()}
              whileHover={{ y: -2, x: -2 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="Open YouTube"
              className="group flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#161B2B] hover:bg-[#1E253B] text-[#FFFDF7] border-2 border-[#FFFDF7] shadow-[4px_4px_0_#FF0000] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="inline-flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                  <YouTubeLogoIcon className="w-9 h-6" />
                </span>
                <span className="text-left min-w-0">
                  <span className="block font-pixel text-sm sm:text-base font-bold leading-none group-hover:text-[#FFE066] transition-colors truncate">
                    @aweirdconnection
                  </span>
                  <span className="block font-mono-tabular text-[11px] text-[#CBD5E1] mt-1 truncate">
                    youtube.com/@aweirdconnection
                  </span>
                </span>
              </div>
              <ArrowUpRight
                className="w-4 h-4 text-[#FFE066] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </motion.a>

            {/* Stylish Behance Link Card */}
            <motion.a
              href={BEHANCE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playToggleOn()}
              whileHover={{ y: -2, x: -2 }}
              whileTap={{ scale: 0.98 }}
              data-cursor="Open Behance"
              className="group flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#161B2B] hover:bg-[#1E253B] text-[#FFFDF7] border-2 border-[#FFFDF7] shadow-[4px_4px_0_#1769FF] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="inline-flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                  <BehanceLogoIcon className="w-9 h-6" />
                </span>
                <span className="text-left min-w-0">
                  <span className="block font-pixel text-sm sm:text-base font-bold leading-none group-hover:text-[#7DD3FC] transition-colors truncate">
                    souvikmohanty1
                  </span>
                  <span className="block font-mono-tabular text-[11px] text-[#CBD5E1] mt-1 truncate">
                    behance.net/souvikmohanty1
                  </span>
                </span>
              </div>
              <ArrowUpRight
                className="w-4 h-4 text-[#7DD3FC] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
