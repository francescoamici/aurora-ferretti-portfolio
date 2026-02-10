import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function Hero() {
  const { t } = useTranslation('profile');

  // Random rotation for subtitle
  const subtitleRotation = useMemo(() => (Math.random() * 4 - 2), []);

  // Pick a random word in the bio to highlight yellow
  const bioText = t('bioShort');
  const words = bioText.split(' ');
  const highlightIndex = useMemo(() => Math.floor(Math.random() * words.length), []);

  return (
    <section className="relative bg-raw-white border-b-[8px] border-harsh-black overflow-hidden">
      {/* GIANT NAME - overflows on purpose */}
      <div className="relative pt-8 md:pt-16 pb-0">
        <motion.h1
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.1, ease: 'linear' }}
          className="font-display uppercase leading-[0.85] tracking-[-0.02em] whitespace-nowrap"
          style={{
            fontSize: 'clamp(120px, 22vw, 300px)',
            marginLeft: '-0.05em',
            /* Let it overflow right */
            width: '150%',
          }}
        >
          {profile.firstName}
        </motion.h1>

        <motion.h1
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.1, delay: 0.05, ease: 'linear' }}
          className="font-display uppercase leading-[0.85] tracking-[-0.02em] whitespace-nowrap"
          style={{
            fontSize: 'clamp(120px, 22vw, 300px)',
            marginLeft: '-0.05em',
            width: '150%',
          }}
        >
          {profile.lastName}
        </motion.h1>
      </div>

      {/* SUBTITLE - terminal style with rotation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.05, delay: 0.15 }}
        className="px-4 md:px-8 py-8 border-t-[4px] border-harsh-black mt-4"
        style={{ transform: `rotate(${subtitleRotation}deg)` }}
      >
        <div className="font-mono text-sm md:text-base">
          <span className="text-blue font-bold">{'>'}</span>{' '}
          <span className="font-bold">{t('titles.artDirector')}</span>
          <span className="text-blue"> // </span>
          <span className="font-bold">{t('titles.visualDesigner')}</span>
          <span className="text-blue"> // </span>
          <span className="font-bold">{t('titles.illustrator')}</span>
          <span className="animate-flicker ml-1">_</span>
        </div>
      </motion.div>

      {/* BIO - terminal readout */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.1, delay: 0.2 }}
        className="px-4 md:px-8 pb-12 md:pb-20"
      >
        <p className="font-mono text-sm md:text-lg leading-relaxed max-w-4xl">
          {words.map((word, i) => (
            <span key={i}>
              {i === highlightIndex ? (
                <span className="bg-yellow px-1 font-bold">{word}</span>
              ) : (
                word
              )}
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      </motion.div>

      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 font-mono text-xs text-blue">
        <div>LAT 41.9028</div>
        <div>LNG 12.4964</div>
        <div className="mt-1 text-yellow font-bold">ROMA</div>
      </div>
    </section>
  );
}
