import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.15,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function About() {
  const { t } = useTranslation('profile');

  return (
    <section
      id="about"
      className="relative min-h-screen bg-nero px-6 py-32"
    >
      <div className="mx-auto max-w-4xl">
        {/* Gold line top */}
        <motion.div
          className="mb-16 h-px origin-left bg-gradient-to-r from-gold via-gold/50 to-transparent"
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        />

        {/* Section label */}
        <motion.p
          className="mb-12 text-xs tracking-[0.4em] text-gold/60 uppercase"
          custom={0}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {t('about', { ns: 'common', defaultValue: 'About' })}
        </motion.p>

        {/* Bio text */}
        <motion.blockquote
          className="font-accent text-2xl leading-relaxed font-light text-ivory/90 md:text-3xl lg:text-4xl"
          custom={1}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {t('bioExtended')}
        </motion.blockquote>

        {/* Location badge */}
        <motion.div
          className="mt-16 flex items-center gap-4"
          custom={2}
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="h-px w-12 bg-gold/40" />
          <div className="flex items-center gap-2 rounded-full border border-gold-dim px-5 py-2">
            <span className="text-sm text-gold">&#9679;</span>
            <span className="font-accent text-sm tracking-wider text-ivory/70">
              {profile.location}
            </span>
          </div>
        </motion.div>

        {/* Gold line bottom */}
        <motion.div
          className="mt-16 h-px origin-right bg-gradient-to-l from-gold via-gold/50 to-transparent"
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        />
      </div>
    </section>
  );
}
