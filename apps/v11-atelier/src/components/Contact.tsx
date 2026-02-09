import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

export default function Contact() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* Subtle blush gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-blush-light/30 to-cream" />

      {/* Decorative gold corner brackets */}
      <div className="absolute inset-0 mx-auto max-w-4xl pointer-events-none hidden md:block">
        {/* Top-left bracket */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-8 left-8 w-16 h-16 text-gold/30"
          viewBox="0 0 64 64"
          fill="none"
        >
          <path d="M2 24 L2 2 L24 2" stroke="currentColor" strokeWidth="1" />
          <circle cx="2" cy="2" r="2" fill="currentColor" />
        </motion.svg>

        {/* Top-right bracket */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute top-8 right-8 w-16 h-16 text-gold/30"
          viewBox="0 0 64 64"
          fill="none"
        >
          <path d="M62 24 L62 2 L40 2" stroke="currentColor" strokeWidth="1" />
          <circle cx="62" cy="2" r="2" fill="currentColor" />
        </motion.svg>

        {/* Bottom-left bracket */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute bottom-8 left-8 w-16 h-16 text-gold/30"
          viewBox="0 0 64 64"
          fill="none"
        >
          <path d="M2 40 L2 62 L24 62" stroke="currentColor" strokeWidth="1" />
          <circle cx="2" cy="62" r="2" fill="currentColor" />
        </motion.svg>

        {/* Bottom-right bracket */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute bottom-8 right-8 w-16 h-16 text-gold/30"
          viewBox="0 0 64 64"
          fill="none"
        >
          <path d="M62 40 L62 62 L40 62" stroke="currentColor" strokeWidth="1" />
          <circle cx="62" cy="62" r="2" fill="currentColor" />
        </motion.svg>
      </div>

      <div className="relative mx-auto max-w-3xl px-6 md:px-10 text-center">
        {/* Accent label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-accent text-xs tracking-[0.3em] uppercase text-gold block mb-6"
        >
          {t('sections.contact')}
        </motion.span>

        {/* Editorial headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic text-charcoal leading-tight"
        >
          {t('contact.title')}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-lg text-charcoal-light mt-6 max-w-md mx-auto"
        >
          {t('contact.subtitle')}
        </motion.p>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-px bg-gold mx-auto mt-10 mb-10"
        />

        {/* Email button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-3 px-10 py-4 border-2 border-gold text-gold hover:bg-gold hover:text-cream transition-all duration-500 font-accent text-lg tracking-wider"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {t('contact.email')}
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <span className="font-accent text-sm text-charcoal-light/50 tracking-wider block mb-5">
            {t('contact.or')}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {profile.links.map((link, i) => (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                className="group relative font-accent text-base tracking-wider text-charcoal-light hover:text-gold transition-colors duration-300"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
