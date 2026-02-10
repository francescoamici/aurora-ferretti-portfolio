import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="relative py-28 md:py-40 overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream-dark/50 to-cream-dark" />

      {/* Decorative gold corner brackets (SVG) */}
      <div className="absolute inset-8 md:inset-16 pointer-events-none">
        {/* Top-left */}
        <svg className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 text-gold/20" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M0 24V0h24" />
        </svg>
        {/* Top-right */}
        <svg className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 text-gold/20" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M64 24V0H40" />
        </svg>
        {/* Bottom-left */}
        <svg className="absolute bottom-0 left-0 w-12 h-12 md:w-16 md:h-16 text-gold/20" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M0 40v24h24" />
        </svg>
        {/* Bottom-right */}
        <svg className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 text-gold/20" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M64 40v24H40" />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 text-center">
        {/* Ornamental divider */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
          <div className="w-2 h-2 rotate-45 border border-gold/40" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>

        {/* Display heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display italic text-3xl md:text-5xl lg:text-6xl text-espresso leading-tight"
        >
          {t('contact.title')}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 font-body text-base md:text-lg text-espresso/60 max-w-lg mx-auto leading-relaxed"
        >
          {t('contact.subtitle')}
        </motion.p>

        {/* Email button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10"
        >
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-burgundy text-cream font-body text-sm font-medium tracking-wide hover:bg-burgundy/90 hover:shadow-lg hover:shadow-burgundy/15 transition-all duration-500"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {profile.email}
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          {profile.links.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-espresso/40 hover:text-sienna transition-colors duration-400 flex items-center gap-1.5"
            >
              <span className="w-1 h-1 rounded-full bg-gold/40" />
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
