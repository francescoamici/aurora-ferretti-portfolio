import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

export default function Contact() {
  const { t } = useTranslation();

  const isEn = t('nav.home') === 'Home' && t('nav.about') === 'About';

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="relative bg-cream-light rounded-3xl p-10 md:p-16 shadow-[0_4px_40px_rgba(45,80,22,0.06)] text-center overflow-hidden"
        >
          {/* Decorative border elements */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose/30 to-transparent" />

          {/* Corner botanical decorations */}
          <svg className="absolute top-4 left-4 w-12 h-12 text-forest/10" viewBox="0 0 50 50" fill="none">
            <path d="M5 45 C5 25, 25 5, 45 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 22 C15 18, 12 12, 16 10 C20 8, 22 14, 20 22Z" fill="currentColor" opacity="0.5" />
          </svg>
          <svg className="absolute top-4 right-4 w-12 h-12 text-forest/10 scale-x-[-1]" viewBox="0 0 50 50" fill="none">
            <path d="M5 45 C5 25, 25 5, 45 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 22 C15 18, 12 12, 16 10 C20 8, 22 14, 20 22Z" fill="currentColor" opacity="0.5" />
          </svg>
          <svg className="absolute bottom-4 left-4 w-12 h-12 text-forest/10 scale-y-[-1]" viewBox="0 0 50 50" fill="none">
            <path d="M5 45 C5 25, 25 5, 45 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 22 C15 18, 12 12, 16 10 C20 8, 22 14, 20 22Z" fill="currentColor" opacity="0.5" />
          </svg>
          <svg className="absolute bottom-4 right-4 w-12 h-12 text-forest/10 scale-[-1]" viewBox="0 0 50 50" fill="none">
            <path d="M5 45 C5 25, 25 5, 45 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 22 C15 18, 12 12, 16 10 C20 8, 22 14, 20 22Z" fill="currentColor" opacity="0.5" />
          </svg>

          {/* Seed / sprout icon */}
          <motion.svg
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
            className="mx-auto mb-8 text-terra"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              d="M24 38V24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M24 24 C18 18, 12 16, 10 20 C8 24, 14 28, 24 24Z"
              fill="currentColor"
              opacity="0.4"
            />
            <path
              d="M24 24 C30 18, 36 16, 38 20 C40 24, 34 28, 24 24Z"
              fill="currentColor"
              opacity="0.4"
            />
            <path
              d="M24 28 C20 22, 16 14, 20 10 C24 6, 28 14, 24 28Z"
              fill="currentColor"
              opacity="0.3"
            />
            {/* Soil line */}
            <path
              d="M12 38 C16 36, 20 37, 24 38 C28 39, 32 38, 36 38"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </motion.svg>

          <h2 className="font-display italic text-3xl md:text-4xl text-forest font-light leading-tight">
            {isEn ? "Let's Grow Something Together" : 'Facciamo Crescere Qualcosa Insieme'}
          </h2>

          <p className="font-body text-lg text-forest/60 mt-6 leading-relaxed max-w-lg mx-auto">
            {t('contact.subtitle')}
          </p>

          {/* Email link */}
          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 mt-10 px-8 py-4 bg-forest text-cream rounded-full font-body font-medium text-base hover:bg-forest-medium transition-colors duration-300 shadow-[0_4px_20px_rgba(45,80,22,0.25)]"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-cream/80">
              <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2 6L10 12L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {isEn ? 'Plant a message' : 'Pianta un messaggio'}
          </motion.a>

          {/* Handwritten note */}
          <motion.p
            initial={{ opacity: 0, rotate: -3 }}
            whileInView={{ opacity: 1, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-hand text-xl text-rose/70 mt-10 -rotate-3"
          >
            {isEn ? "I'd love to hear from you!" : 'Mi piacerebbe sentirti!'}
          </motion.p>

          {/* Social links */}
          <div className="mt-10 pt-8 border-t border-forest/10">
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {profile.links.map((link) => (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="inline-flex items-center gap-2 font-body text-sm font-medium text-forest/60 hover:text-terra transition-colors duration-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
