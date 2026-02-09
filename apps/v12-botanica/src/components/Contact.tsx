import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

/* ---------- Botanical Corner SVGs ---------- */

function CornerLeafTopLeft() {
  return (
    <svg className="absolute -top-1 -left-1 h-16 w-16 text-sage/15" viewBox="0 0 64 64" fill="none">
      <path d="M4 60C4 30 16 10 40 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M20 30C14 24 10 20 8 18" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="8" cy="18" r="3" fill="currentColor" opacity="0.2" />
      <path d="M30 16C26 10 22 6 22 6" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="22" cy="6" r="2.5" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function CornerLeafBottomRight() {
  return (
    <svg className="absolute -bottom-1 -right-1 h-16 w-16 rotate-180 text-sage/15" viewBox="0 0 64 64" fill="none">
      <path d="M4 60C4 30 16 10 40 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M20 30C14 24 10 20 8 18" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="8" cy="18" r="3" fill="currentColor" opacity="0.2" />
      <path d="M30 16C26 10 22 6 22 6" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="22" cy="6" r="2.5" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

/* ---------- Sprout Icon ---------- */

function SproutIcon() {
  return (
    <svg width="40" height="48" viewBox="0 0 40 48" fill="none" className="text-sage">
      {/* Stem */}
      <path
        d="M20 46V20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Left leaf */}
      <path
        d="M20 28C14 22 6 20 4 20C4 20 6 28 14 32C16 33 18 32 20 30"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M20 28C14 22 6 20 4 20C4 20 6 28 14 32C16 33 18 32 20 30"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Right leaf */}
      <path
        d="M20 22C26 16 34 14 36 14C36 14 34 22 26 26C24 27 22 26 20 24"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M20 22C26 16 34 14 36 14C36 14 34 22 26 26C24 27 22 26 20 24"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Top bud */}
      <path
        d="M20 20C20 12 16 6 16 4C16 4 20 2 20 2C20 2 24 4 24 4C24 6 20 12 20 20"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M16 4C16 4 20 2 20 2C20 2 24 4 24 4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------- Contact Component ---------- */

export default function Contact() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="relative py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-xl px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-cream-light/90 p-8 shadow-[0_4px_40px_rgba(122,155,109,0.08)] ring-1 ring-sage/8 sm:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Decorative corners */}
          <CornerLeafTopLeft />
          <CornerLeafBottomRight />

          {/* Top gradient line */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-sage/20 to-transparent" />
          {/* Bottom gradient line */}
          <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-sage/20 to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Sprout icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
            >
              <SproutIcon />
            </motion.div>

            {/* Headline */}
            <motion.h2
              className="mt-6 font-display text-3xl font-medium tracking-tight text-earth sm:text-4xl"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {t('contact.title')}
            </motion.h2>

            <motion.p
              className="mt-3 max-w-sm text-base text-earth/60"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {t('contact.subtitle')}
            </motion.p>

            {/* Email Button */}
            <motion.a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-sage px-7 py-3 font-medium text-cream-light shadow-[0_2px_12px_rgba(122,155,109,0.25)] transition-all hover:bg-sage-medium hover:shadow-[0_4px_20px_rgba(122,155,109,0.35)]"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-cream-light">
                <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 6L9 10L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t('contact.email')}
            </motion.a>

            {/* Handwritten annotation */}
            <motion.p
              className="mt-4 font-hand text-base text-earth/35"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {profile.email}
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {profile.links.map((link, i) => (
                <span key={link.platform} className="flex items-center gap-2">
                  {i > 0 && (
                    <span className="inline-block h-1 w-1 rounded-full bg-earth/20" />
                  )}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-earth/50 transition-colors hover:text-sage"
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
