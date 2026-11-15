import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PixelLaptopSouvik, YouTubeLogoIcon } from './PixelSprites';
import { soundFx } from '../utils/soundFx';

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@aweirdconnection';

export function YouTubeSection() {
  const [workPhase, setWorkPhase] = useState(false);

  const handleCharacterTap = () => {
    soundFx.playToggleOn();
    setWorkPhase((prev) => !prev);
  };

  return (
    <section
      id="youtube"
      aria-labelledby="youtube-heading"
      className="relative py-8 sm:py-11 bg-transparent overflow-x-clip"
    >
      <div className="max-w-[780px] mx-auto px-4 sm:px-6 text-center">
        {/* Compact Heading on Top */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <h2
            id="youtube-heading"
            className="font-pixel text-xl sm:text-3xl font-bold tracking-tight text-[#FFFDF7] drop-shadow-[2px_2px_0_#18261C]"
            style={{ textWrap: 'balance' }}
          >
            For fun, I make YouTube videos
          </h2>
        </motion.div>

        {/* Compact Side-by-Side Row: Small Working Character + Embedded YT Logo & Link */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-7">
          <motion.button
            type="button"
            onClick={handleCharacterTap}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            data-cursor="Edit clip"
            className="relative cursor-pointer bg-transparent border-0 p-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFE066]"
            aria-label="Tap Souvik working on his laptop"
          >
            <PixelLaptopSouvik
              workPhase={workPhase}
              className="w-44 sm:w-48 h-auto drop-shadow-[0_8px_0_rgba(18,16,34,0.4)]"
            />
          </motion.button>

          <motion.a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playToggleOn()}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            data-cursor="Open YouTube"
            className="group inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#161B2B] hover:bg-[#1E253B] text-[#FFFDF7] border-2 border-[#FFFDF7] shadow-[4px_4px_0_#FF0000] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="inline-flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
              <YouTubeLogoIcon className="w-8 h-5.5" />
            </span>
            <span className="text-left">
              <span className="block font-pixel text-sm sm:text-base font-bold leading-none group-hover:text-[#FFE066] transition-colors">
                @aweirdconnection
              </span>
              <span className="block font-mono-tabular text-[11px] text-[#CBD5E1] mt-1">
                youtube.com/@aweirdconnection
              </span>
            </span>
            <ArrowUpRight
              className="w-4 h-4 text-[#FFE066] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
