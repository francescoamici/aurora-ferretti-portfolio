import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';

export default function About() {
  const { t, i18n } = useTranslation('profile');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const bioText = t('bioExtended');

  // Highlight key phrases
  const highlightPhrases: Record<string, string[]> = {
    it: ['Art Director', 'Visual Designer', 'Arkage', 'Lufthansa', 'Oreo', 'UPS', 'Quasar Institute', '110/110 e lode'],
    en: ['Art Director', 'Visual Designer', 'Arkage', 'Lufthansa', 'Oreo', 'UPS', 'Quasar Institute', '110/110 cum laude'],
  };

  const currentHighlights = highlightPhrases[i18n.language] || highlightPhrases.it;

  function renderHighlightedText(text: string) {
    let result: (string | React.ReactElement)[] = [text];

    currentHighlights.forEach((phrase) => {
      const newResult: (string | React.ReactElement)[] = [];
      result.forEach((part) => {
        if (typeof part === 'string') {
          const parts = part.split(phrase);
          parts.forEach((p, i) => {
            if (i > 0) {
              newResult.push(
                <span key={`${phrase}-${i}`} className="text-red font-600">
                  {phrase}
                </span>
              );
            }
            newResult.push(p);
          });
        } else {
          newResult.push(part);
        }
      });
      result = newResult;
    });

    return result;
  }

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background diagonal stripe pattern */}
      <div className="absolute inset-0 diagonal-stripe opacity-20 pointer-events-none" />

      {/* Decorative speed lines */}
      <div className="absolute top-20 left-0 w-[40%] h-[1px] bg-gradient-to-r from-red/30 to-transparent" />
      <div className="absolute top-32 left-0 w-[25%] h-[1px] bg-gradient-to-r from-orange/20 to-transparent" />
      <div className="absolute bottom-20 right-0 w-[35%] h-[1px] bg-gradient-to-l from-red/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* MANIFESTO header */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
          style={{ transform: 'rotate(-5deg)' }}
        >
          <h2 className="font-big font-800 text-7xl sm:text-8xl lg:text-9xl uppercase tracking-tight text-white/10">
            MANIFESTO
          </h2>
          <div className="flex items-center gap-3 -mt-6 ml-4">
            <span className="w-16 h-[3px] bg-red" />
            <span className="font-display text-2xl tracking-[0.3em] uppercase text-red">
              {i18n.language === 'it' ? 'Chi Sono' : 'About'}
            </span>
          </div>
        </motion.div>

        {/* Bio content - dynamic off-grid tension */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left column - decorative */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-3 hidden lg:flex flex-col items-end gap-6 pt-12"
          >
            <div className="text-right" style={{ transform: 'rotate(-3deg)' }}>
              <span className="font-big font-700 text-6xl text-red/20">01</span>
            </div>
            <div className="w-full h-px bg-gradient-to-l from-red/40 to-transparent" />
            <div className="w-3/4 h-px bg-gradient-to-l from-orange/30 to-transparent" />
            <div className="w-1/2 h-px bg-gradient-to-l from-yellow/20 to-transparent" />

            {/* Vertical speed indicator */}
            <div className="flex flex-col items-center gap-1 mt-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.2 }}
                  className="h-[2px] bg-red/30"
                  style={{ width: `${20 + i * 8}px` }}
                />
              ))}
            </div>
          </motion.div>

          {/* Main bio text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-9"
          >
            <div className="relative" style={{ transform: 'rotate(-1deg)' }}>
              {/* Accent slash */}
              <span className="absolute -left-8 -top-4 text-red/20 font-big font-800 text-6xl select-none hidden sm:block">
                /
              </span>

              <p className="font-body text-xl sm:text-2xl leading-relaxed text-white/85 font-400 max-w-3xl">
                {renderHighlightedText(bioText)}
              </p>

              {/* Bottom speed accent */}
              <div className="flex items-center gap-3 mt-10">
                <div className="w-24 h-[3px] racing-stripe" />
                <span className="font-display text-sm tracking-[0.4em] text-white/30 uppercase">
                  {i18n.language === 'it' ? 'Velocita e Visione' : 'Speed & Vision'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
