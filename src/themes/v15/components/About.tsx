import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

export default function About() {
  const { t } = useTranslation('profile');
  const { t: tc } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const bio = t('bio');
  const bioExtended = t('bioExtended');

  // Split bio into first sentence (pull quote) and rest
  const firstSentenceMatcher = bio.match(/^(.+?[.!?])\s*(.*)/s);
  const pullQuote = firstSentenceMatcher ? firstSentenceMatcher[1] : bio;
  const restOfBio = firstSentenceMatcher ? firstSentenceMatcher[2] : '';

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-36">
      {/* Top rule */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          className="w-full h-px bg-noir/10"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 mt-16 md:mt-24">
        {/* Section label */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="font-accent text-xs uppercase tracking-[0.3em] text-gold">
            {tc('sections.about')}
          </span>
        </motion.div>

        {/* Pull quote - first sentence in large display */}
        <motion.blockquote
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-display italic text-2xl md:text-4xl lg:text-5xl text-noir leading-snug md:leading-snug max-w-4xl">
            {pullQuote}
          </p>
        </motion.blockquote>

        {/* Body text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {restOfBio && (
              <p className="font-body text-sm md:text-base text-noir/70 leading-relaxed md:leading-loose">
                {restOfBio}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <p className="font-body text-sm md:text-base text-noir/70 leading-relaxed md:leading-loose">
              {bioExtended}
            </p>
          </motion.div>
        </div>

        {/* Location */}
        <motion.div
          className="mt-12 md:mt-16 flex items-center gap-3"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-blush-deep"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span className="font-accent text-sm tracking-[0.15em] text-noir/60">
            {profile.location}
          </span>
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 mt-16 md:mt-24">
        <motion.div
          className="w-full h-px bg-noir/10"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'right' }}
        />
      </div>
    </section>
  );
}
