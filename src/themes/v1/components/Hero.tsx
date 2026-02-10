import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

function GoldParticle({ delay }: { delay: number }) {
  const randomX = useMemo(() => Math.random() * 100, []);
  const randomDuration = useMemo(() => 4 + Math.random() * 6, []);
  const randomSize = useMemo(() => 2 + Math.random() * 3, []);
  const randomDrift = useMemo(() => (Math.random() - 0.5) * 80, []);

  return (
    <motion.div
      className="absolute rounded-full bg-gold"
      style={{
        width: randomSize,
        height: randomSize,
        left: `${randomX}%`,
        bottom: '-5%',
      }}
      initial={{ opacity: 0, y: 0, x: 0 }}
      animate={{
        opacity: [0, 0.8, 0.4, 0],
        y: [0, -window.innerHeight * 0.7],
        x: [0, randomDrift],
      }}
      transition={{
        duration: randomDuration,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  );
}

export default function Hero() {
  const { t } = useTranslation('profile');
  const roles = profile.title;
  const [currentRole, setCurrentRole] = useState(0);

  const cycleRole = useCallback(() => {
    setCurrentRole((prev) => (prev + 1) % roles.length);
  }, [roles.length]);

  useEffect(() => {
    const interval = setInterval(cycleRole, 2800);
    return () => clearInterval(interval);
  }, [cycleRole]);

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: Math.random() * 8,
      })),
    [],
  );

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-nero"
    >
      {/* Gold particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <GoldParticle key={p.id} delay={p.delay} />
        ))}
      </div>

      {/* Radial glow behind the name */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.03] blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* First name */}
          <h1
            className="font-display font-bold leading-none"
            style={{
              fontSize: 'clamp(5rem, 15vw, 12.5rem)',
            }}
          >
            <span
              className="inline-block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #C9A96E 0%, #F5F0E8 40%, #C9A96E 60%, #D4B97E 100%)',
                backgroundSize: '200% 200%',
                animation: 'shimmer 4s ease-in-out infinite',
              }}
            >
              {profile.firstName}
            </span>
          </h1>

          {/* Last name */}
          <h1
            className="font-display font-bold leading-none tracking-wide text-ivory"
            style={{
              fontSize: 'clamp(5rem, 15vw, 12.5rem)',
            }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              {profile.lastName}
            </motion.span>
          </h1>
        </motion.div>

        {/* Role cycling */}
        <motion.div
          className="mt-8 h-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentRole}
              className="font-accent text-2xl font-light tracking-[0.3em] text-gold/80 md:text-3xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5 }}
            >
              {roles[currentRole]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Location */}
        <motion.p
          className="mt-6 text-sm tracking-[0.25em] text-ivory/30 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          {t('location')}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="h-10 w-px bg-gradient-to-b from-transparent via-gold/50 to-gold"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="text-[10px] tracking-[0.3em] text-gold/40 uppercase">
          {t('scroll', { ns: 'common', defaultValue: 'Scroll' })}
        </span>
      </motion.div>

      {/* Shimmer keyframes */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}
