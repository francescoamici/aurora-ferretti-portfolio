import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

export default function Hero() {
  const { t } = useTranslation();

  // Split bio into words for sequential reveal
  const bio = t('bio', { ns: 'profile' });
  const bioWords = bio.split(' ');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Subtle lavender gradient wash — barely perceptible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(232, 224, 240, 0.25) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Name — massive centered display type */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="font-display text-charcoal leading-[0.95] tracking-tight"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 11rem)' }}
        >
          {profile.firstName}
          <br />
          {profile.lastName}
        </motion.h1>

        {/* Small rose dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2, ease: 'easeOut' }}
          className="w-1.5 h-1.5 rounded-full bg-rose mx-auto mt-8 mb-8"
        />

        {/* Titles — tiny uppercase tracking */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1"
        >
          {profile.title.map((title, i) => (
            <span key={i}>
              <span className="font-body text-[11px] tracking-[0.25em] uppercase text-charcoal-light/60">
                {t(`titles.${title === 'Art Director' ? 'artDirector' : title === 'Visual Designer' ? 'visualDesigner' : 'illustrator'}`, { ns: 'profile' })}
              </span>
              {i < profile.title.length - 1 && (
                <span className="text-dove ml-6">/</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* Bio — word-by-word reveal */}
        <div className="mt-12 md:mt-16 max-w-xl mx-auto">
          <p className="font-accent text-charcoal-light text-base md:text-lg leading-relaxed">
            {bioWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 2 + i * 0.04,
                  ease: 'easeOut',
                }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-body text-[9px] tracking-[0.3em] uppercase text-dove">
          {t('hero.scroll')}
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-silver origin-top"
        />
      </motion.div>
    </section>
  );
}
