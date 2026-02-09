import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

export default function Hero() {
  const { t } = useTranslation('profile');

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: (delay: number) => ({
      opacity: 1,
      transition: { duration: 1.2, delay, ease: 'easeOut' },
    }),
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-parchment px-6 overflow-hidden">
      {/* Subtle background texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233D2B1F' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate="visible"
        className="text-center relative z-10"
      >
        {/* Main title */}
        <div className="mb-8">
          <motion.h1
            variants={letterVariants}
            className="font-display italic text-brown leading-[0.85]"
            style={{ fontSize: 'clamp(4rem, 15vw, 12rem)' }}
          >
            {profile.firstName.toUpperCase()}
          </motion.h1>
          <motion.h1
            variants={letterVariants}
            className="font-display italic text-brown leading-[0.85] -mt-1"
            style={{ fontSize: 'clamp(4rem, 15vw, 12rem)' }}
          >
            {profile.lastName.toUpperCase()}
          </motion.h1>
        </div>

        {/* Subtitle with titles */}
        <motion.p
          variants={fadeIn}
          custom={1.0}
          initial="hidden"
          animate="visible"
          className="font-caps text-brown/60 text-[0.7rem] md:text-xs tracking-[0.3em] uppercase small-caps mt-8"
        >
          {t('titles.artDirector')} &middot; {t('titles.visualDesigner')} &middot; {t('titles.illustrator')}
        </motion.p>

        {/* Ornamental divider */}
        <motion.div
          variants={fadeIn}
          custom={1.4}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-4 mt-10"
        >
          <span className="block w-16 md:w-24 h-px bg-brown/25" />
          <span className="text-brown/40 text-xs">&#9670;</span>
          <span className="block w-16 md:w-24 h-px bg-brown/25" />
        </motion.div>

        {/* Location and date */}
        <motion.p
          variants={fadeIn}
          custom={1.8}
          initial="hidden"
          animate="visible"
          className="font-caps text-brown/40 text-[0.6rem] md:text-[0.7rem] tracking-[0.25em] uppercase mt-8"
        >
          Roma, MMXXV
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-caps text-brown/30 text-[0.55rem] tracking-[0.2em] uppercase">
          {t('hero.scroll', { ns: 'common' })}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-brown/20"
        />
      </motion.div>
    </section>
  );
}
