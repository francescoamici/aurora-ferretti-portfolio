import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

function FloatingParticle({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gold/20"
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, -10, 0],
        opacity: [0.15, 0.35, 0.15],
      }}
      transition={{
        duration: 8 + delay * 2,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}

const particles = [
  { delay: 0, x: 15, y: 25, size: 4 },
  { delay: 1.2, x: 75, y: 15, size: 3 },
  { delay: 2.5, x: 85, y: 55, size: 5 },
  { delay: 0.8, x: 25, y: 70, size: 3 },
  { delay: 3.1, x: 60, y: 80, size: 4 },
  { delay: 1.6, x: 90, y: 35, size: 3 },
  { delay: 4.0, x: 40, y: 20, size: 4 },
  { delay: 2.0, x: 10, y: 50, size: 3 },
  { delay: 3.5, x: 55, y: 45, size: 5 },
  { delay: 0.4, x: 70, y: 68, size: 3 },
];

export default function Hero() {
  const { t } = useTranslation();
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % profile.title.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream to-cream-dark" />

      {/* Large decorative warm glow (top-right) */}
      <div
        className="absolute -top-[20%] -right-[15%] w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(184,150,62,0.15) 0%, rgba(184,169,154,0.08) 40%, transparent 70%)',
        }}
      />

      {/* Secondary warm glow (bottom-left) */}
      <div
        className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(194,105,61,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Floating gold particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Decorative gold lines + Name */}
        <div className="flex items-center justify-center gap-6 md:gap-10">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="hidden md:block h-px w-20 bg-gradient-to-r from-transparent to-gold/60 origin-right"
          />

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-display italic font-light text-espresso"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', lineHeight: 0.95 }}
            >
              {profile.firstName}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="font-display font-light text-gold tracking-[0.05em]"
              style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', lineHeight: 1.1 }}
            >
              {profile.lastName}
            </motion.h2>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="hidden md:block h-px w-20 bg-gradient-to-l from-transparent to-gold/60 origin-left"
          />
        </div>

        {/* Cycling titles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 h-8 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={titleIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
              className="font-accent italic text-taupe text-lg md:text-xl"
            >
              {profile.title[titleIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-5 font-body text-sm text-espresso/50 tracking-wide flex items-center justify-center gap-2"
        >
          <svg className="w-3.5 h-3.5 text-sienna/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {profile.location}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-10"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-sienna/40 text-sienna font-body text-sm font-medium tracking-wide hover:bg-sienna hover:text-cream transition-all duration-500"
          >
            {t('hero.cta')}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-accent italic text-xs text-taupe/70">{t('hero.scroll')}</span>
        <motion.div
          animate={{ height: [16, 28, 16] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
