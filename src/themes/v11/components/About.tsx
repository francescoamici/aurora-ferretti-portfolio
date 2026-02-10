import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

const highlightWords = ['Arkage', 'Lufthansa', 'Oreo', 'UPS', 'Quasar Institute', '110/110'];

function highlightBrands(text: string) {
  const parts: { text: string; highlighted: boolean }[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    let earliestIndex = remaining.length;
    let matchedWord = '';

    for (const word of highlightWords) {
      const idx = remaining.indexOf(word);
      if (idx !== -1 && idx < earliestIndex) {
        earliestIndex = idx;
        matchedWord = word;
      }
    }

    if (matchedWord && earliestIndex < remaining.length) {
      if (earliestIndex > 0) {
        parts.push({ text: remaining.slice(0, earliestIndex), highlighted: false });
      }
      parts.push({ text: matchedWord, highlighted: true });
      remaining = remaining.slice(earliestIndex + matchedWord.length);
    } else {
      parts.push({ text: remaining, highlighted: false });
      break;
    }
  }

  return parts;
}

export default function About() {
  const { t } = useTranslation('profile');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  const bioExtended = t('bioExtended');
  const sentences = bioExtended.split(/(?<=\.)\s+/);
  const pullQuote = sentences[0] || '';
  const remainingText = sentences.slice(1).join(' ');
  const highlightedParts = highlightBrands(remainingText);

  return (
    <section id="about" ref={sectionRef} className="relative py-28 md:py-36 bg-cream">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="font-accent text-sm tracking-[0.3em] uppercase text-gold">
            {t('titles.artDirector', { ns: 'profile' })}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: decorative line and drop cap area */}
          <div className="lg:col-span-1 hidden lg:flex flex-col items-center">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-px bg-gradient-to-b from-gold via-gold/40 to-transparent"
            />
          </div>

          {/* Main content */}
          <div className="lg:col-span-8">
            {/* Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12"
            >
              <div className="w-40 h-48 md:w-48 md:h-56 relative overflow-hidden rounded-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cream/10" />
                <img
                  src={profile.portraitCutout}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>

          {/* Pull quote */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12"
            >
              <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] leading-snug italic text-charcoal">
                <span className="font-display text-5xl md:text-6xl lg:text-7xl not-italic font-semibold text-gold/80 float-left mr-3 mt-1 leading-none">
                  {pullQuote.charAt(0)}
                </span>
                {pullQuote.slice(1)}
              </p>
            </motion.div>

            {/* Thin gold divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-16 h-px bg-gold mb-10 origin-left"
            />

            {/* Body text with highlighted brands */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-body text-base md:text-lg leading-relaxed text-charcoal-light">
                {highlightedParts.map((part, i) =>
                  part.highlighted ? (
                    <span key={i} className="text-gold font-semibold">
                      {part.text}
                    </span>
                  ) : (
                    <span key={i}>{part.text}</span>
                  )
                )}
              </p>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex items-center gap-3"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gold/30">
                <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-accent text-lg tracking-wide text-charcoal-light">
                {profile.location}
              </span>
            </motion.div>
          </div>

          {/* Right: decorative sidebar */}
          <div className="lg:col-span-3 hidden lg:block relative">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="sticky top-32"
            >
              {/* Decorative card */}
              <div className="relative p-6 border border-gold/15 rounded-sm">
                <div className="absolute top-0 left-6 w-8 h-px bg-gold" />
                <div className="absolute bottom-0 right-6 w-8 h-px bg-gold" />

                <div className="space-y-6">
                  {profile.title.map((title, i) => (
                    <div key={i}>
                      <span className="font-accent text-sm tracking-[0.2em] uppercase text-gold/70 block mb-1">
                        0{i + 1}
                      </span>
                      <span className="font-display text-lg text-charcoal">{title}</span>
                    </div>
                  ))}
                </div>

                {/* Decorative diagonal line */}
                <svg className="absolute -bottom-4 -right-4 w-16 h-16 text-gold/15" viewBox="0 0 64 64">
                  <line x1="0" y1="64" x2="64" y2="0" stroke="currentColor" strokeWidth="1" />
                  <line x1="16" y1="64" x2="64" y2="16" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
