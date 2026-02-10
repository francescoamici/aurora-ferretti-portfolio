import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '@auror/data';
import { useTranslation } from '@auror/i18n';

const roles = ['Art Director', 'Visual Designer', 'Illustrator'];

export default function Hero() {
  const { t } = useTranslation('profile');
  const [roleIndex, setRoleIndex] = useState(0);
  const [filmStarted, setFilmStarted] = useState(false);

  useEffect(() => {
    // Simulate the "film starting" — fade from complete black
    const startTimer = setTimeout(() => setFilmStarted(true), 300);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: filmStarted ? 1 : 0 }}
      transition={{ duration: 2.5, ease: 'easeInOut' }}
      className="relative min-h-screen bg-black flex flex-col film-grain"
    >
      {/* Letterbox top bar */}
      <div className="h-[clamp(20px,5vh,60px)] bg-black flex-shrink-0 relative z-10" />

      {/* Main frame content */}
      <div className="flex-1 relative flex items-center justify-center bg-film-black">
        {/* Warm spotlight glow */}
        <div className="absolute inset-0 spotlight" />

        {/* Subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          {/* "a portfolio by" */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="font-body italic text-warm-white/60 text-sm md:text-base tracking-wide mb-6"
          >
            a portfolio by
          </motion.p>

          {/* AURORA FERRETTI */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 2 }}
            className="font-display text-gold tracking-[0.15em] md:tracking-[0.2em] leading-tight"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 7.5rem)',
            }}
          >
            AURORA
            <br />
            FERRETTI
          </motion.h1>

          {/* Rotating roles like opening credits */}
          <div className="mt-8 h-8 relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="font-display text-warm-white/70 text-xs md:text-sm tracking-[0.3em] uppercase absolute inset-x-0"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 4 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2"
            >
              <span className="font-mono text-[9px] tracking-[0.3em] text-warm-white/30 uppercase">
                {t('scroll', { ns: 'common', defaultValue: 'Scroll' })}
              </span>
              <div className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent" />
            </motion.div>
          </motion.div>
        </div>

        {/* Location timestamp — bottom right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 3.5 }}
          className="absolute bottom-6 right-6 md:bottom-10 md:right-12 z-10"
        >
          <p className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] text-warm-white/30">
            {profile.location}
          </p>
        </motion.div>
      </div>

      {/* Letterbox bottom bar */}
      <div className="h-[clamp(20px,5vh,60px)] bg-black flex-shrink-0 relative z-10" />
    </motion.section>
  );
}
