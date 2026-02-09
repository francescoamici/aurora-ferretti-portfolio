import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section className="relative py-32 md:py-44 px-6 overflow-hidden">
      {/* Subtle lavender-to-white gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(232, 224, 240, 0.15) 0%, rgba(255, 255, 255, 0) 100%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Headline in Sorts Mill Goudy italic */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2 }}
          className="font-display italic text-charcoal leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          {t('contact.title')}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 font-body text-sm text-charcoal-light max-w-md mx-auto"
        >
          {t('contact.subtitle')}
        </motion.p>

        {/* Email link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-10"
        >
          <a
            href={`mailto:${profile.email}`}
            className="group inline-block font-accent text-lg md:text-xl text-charcoal relative"
          >
            <span>{profile.email}</span>
            <span className="absolute bottom-0 left-0 w-full h-px bg-rose scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </a>
        </motion.div>

        {/* Social links as text separated by thin vertical lines */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-0"
        >
          {profile.links.map((link, i) => (
            <span key={link.platform} className="flex items-center">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[11px] tracking-[0.15em] uppercase text-charcoal-light hover:text-charcoal transition-colors duration-500 px-4"
              >
                {link.label}
              </a>
              {i < profile.links.length - 1 && (
                <span className="w-px h-3 bg-silver" />
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
