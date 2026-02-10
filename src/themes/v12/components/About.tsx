import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

/* ---------- Decorative Leaf Icon ---------- */

function SectionLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 24" fill="none" className={className}>
      <path
        d="M10 2C10 2 4 7 4 14C4 18.4 6.7 21 10 21C13.3 21 16 18.4 16 14C16 7 10 2 10 2Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M10 21V6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path d="M10 12C7.5 10 6 9 6 9" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M10 9C12.5 7 14 6 14 6" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Handwritten Margin Annotation ---------- */

function MarginNote({
  text,
  side,
  top,
}: {
  text: string;
  side: 'left' | 'right';
  top: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={`absolute hidden xl:block ${
        side === 'left' ? '-left-40' : '-right-40'
      }`}
      style={{ top }}
      initial={{ opacity: 0, x: side === 'left' ? -20 : 20, rotate: side === 'left' ? -6 : 4 }}
      animate={inView ? { opacity: 0.5, x: 0, rotate: side === 'left' ? -3 : 2 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <p className="w-32 font-hand text-base leading-snug text-sage">
        {text}
      </p>
      {/* Arrow pointing to card */}
      <svg
        width="40"
        height="20"
        viewBox="0 0 40 20"
        fill="none"
        className={`mt-1 text-sage/40 ${side === 'left' ? '' : 'scale-x-[-1]'}`}
      >
        <path
          d="M2 10C10 10 25 8 38 4"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M34 2L38 4L35 7"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

/* ---------- Background Blob ---------- */

function SubtleBlob({ className, color }: { className?: string; color: string }) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        background: color,
        filter: 'blur(100px)',
        borderRadius: '40% 60% 55% 45% / 55% 45% 60% 40%',
      }}
    />
  );
}

/* ---------- About Component ---------- */

export default function About() {
  const { t } = useTranslation();
  const { t: tp } = useTranslation('profile');
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const bioText = tp('bioExtended');

  // Highlight brand names
  const highlightWords = ['Arkage', 'Lufthansa', 'Oreo', 'UPS', 'Quasar Institute'];

  function renderBio(text: string) {
    const parts: (string | React.ReactElement)[] = [];
    let remaining = text;
    let keyIndex = 0;

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

      if (matchedWord) {
        if (earliestIndex > 0) {
          parts.push(remaining.slice(0, earliestIndex));
        }
        parts.push(
          <span key={keyIndex++} className="font-medium text-terra">
            {matchedWord}
          </span>
        );
        remaining = remaining.slice(earliestIndex + matchedWord.length);
      } else {
        parts.push(remaining);
        remaining = '';
      }
    }

    return parts;
  }

  return (
    <section id="about" className="relative py-24 lg:py-32" ref={sectionRef}>
      {/* Background blobs */}
      <SubtleBlob className="top-10 -left-20 h-80 w-80" color="#7A9B6D08" />
      <SubtleBlob className="bottom-10 right-0 h-60 w-60" color="#C67D4A06" />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-12 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionLeaf className="h-6 w-5 text-sage" />
          <h2 className="font-display text-3xl font-medium tracking-tight text-earth sm:text-4xl">
            {t('sections.about')}
          </h2>
        </motion.div>

        {/* Bio Card */}
        <div className="relative">
          {/* Margin annotations */}
          <MarginNote
            text="design + business = magic"
            side="left"
            top="20%"
          />
          <MarginNote
            text="110/110 cum laude!"
            side="right"
            top="55%"
          />

          <motion.div
            className="relative rounded-3xl bg-cream-light/80 p-8 shadow-[0_4px_40px_rgba(122,155,109,0.06)] ring-1 ring-sage/5 sm:p-10 lg:p-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Small decorative corner leaves */}
            <svg
              className="absolute top-4 right-4 h-8 w-8 text-sage/10"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 2C18 2 22 8 22 14C22 18 20 22 16 22"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                d="M22 2C18 4 14 8 12 14"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </svg>

            <p className="text-base leading-relaxed text-earth/80 sm:text-lg sm:leading-relaxed">
              {renderBio(bioText)}
            </p>

            {/* Location pill */}
            <motion.div
              className="mt-8 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 rounded-full border border-olive/20 bg-olive-light px-4 py-1.5">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-sage">
                  <path
                    d="M7 1C7 1 3 5 3 8.5C3 10.7 4.8 12.5 7 12.5C9.2 12.5 11 10.7 11 8.5C11 5 7 1 7 1Z"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-sm font-medium text-earth/70">
                  {profile.location}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
