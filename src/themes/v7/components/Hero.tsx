import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

function SpeedLines() {
  const lines = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        width: 40 + Math.random() * 200,
        height: 1 + Math.random() * 2,
        duration: 1.5 + Math.random() * 3,
        delay: Math.random() * 4,
        color:
          i % 3 === 0
            ? 'rgba(230,57,70,0.4)'
            : i % 3 === 1
              ? 'rgba(247,127,0,0.3)'
              : 'rgba(252,191,73,0.2)',
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines.map((line) => (
        <div
          key={line.id}
          className="absolute speed-line"
          style={{
            top: `${line.top}%`,
            left: '-200px',
            width: `${line.width}px`,
            height: `${line.height}px`,
            background: `linear-gradient(90deg, transparent, ${line.color}, transparent)`,
            ['--duration' as string]: `${line.duration}s`,
            ['--delay' as string]: `${line.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const { t } = useTranslation('profile');
  const roles = [
    t('titles.artDirector'),
    t('titles.visualDesigner'),
    t('titles.illustrator'),
  ];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-prussian">
      {/* Speed lines background */}
      <SpeedLines />

      {/* Diagonal stripe overlay */}
      <div className="absolute inset-0 diagonal-stripe opacity-30 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24">
        <div className="relative">
          {/* AURORA - massive display */}
          <motion.div
            initial={{ x: -200, opacity: 0, filter: 'blur(12px)' }}
            animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{ transform: 'rotate(-3deg)' }}
          >
            <h1
              className="font-big font-800 uppercase leading-[0.85] tracking-tight text-white"
              style={{ fontSize: 'clamp(120px, 22vw, 300px)' }}
            >
              {/* Velocity lines pseudo-element via spans */}
              <span className="relative inline-block">
                AURORA
                {/* Trailing velocity lines */}
                <span className="absolute top-[20%] -right-[15%] w-[40%] h-[2px] bg-gradient-to-r from-red/60 to-transparent" />
                <span className="absolute top-[45%] -right-[20%] w-[50%] h-[1px] bg-gradient-to-r from-orange/40 to-transparent" />
                <span className="absolute top-[70%] -right-[12%] w-[35%] h-[1.5px] bg-gradient-to-r from-yellow/30 to-transparent" />
              </span>
            </h1>
          </motion.div>

          {/* FERRETTI - overlapping, different style */}
          <motion.div
            initial={{ x: 200, opacity: 0, filter: 'blur(12px)' }}
            animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative -mt-[0.15em]"
            style={{ transform: 'rotate(-3deg)' }}
          >
            <h2
              className="font-display uppercase leading-[0.85] tracking-[0.05em] text-transparent"
              style={{
                fontSize: 'clamp(80px, 15vw, 200px)',
                WebkitTextStroke: '2px rgba(230,57,70,0.7)',
              }}
            >
              <span className="relative inline-block ml-[10%]">
                FERRETTI
                <span className="absolute top-[25%] -right-[18%] w-[45%] h-[1.5px] bg-gradient-to-r from-red/50 to-transparent" />
                <span className="absolute top-[60%] -right-[10%] w-[30%] h-[1px] bg-gradient-to-r from-orange/30 to-transparent" />
              </span>
            </h2>
          </motion.div>

          {/* Red accent slash */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: -5 }}
            transition={{ duration: 0.3, delay: 0.3, type: 'spring', stiffness: 300 }}
            className="absolute top-[30%] left-[45%] sm:left-[35%]"
          >
            <span className="text-red font-big font-800 text-[120px] sm:text-[180px] leading-none select-none opacity-20">
              /
            </span>
          </motion.div>

          {/* Cycling roles with speed blur */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-8 ml-[5%]"
            style={{ transform: 'rotate(-2deg)' }}
          >
            <div className="flex items-center gap-3">
              <span className="w-12 h-[2px] bg-red" />
              <div className="h-10 overflow-hidden relative">
                <motion.span
                  key={currentRole}
                  initial={{ filter: 'blur(8px)', opacity: 0, x: 30 }}
                  animate={{ filter: 'blur(0px)', opacity: 1, x: 0 }}
                  exit={{ filter: 'blur(8px)', opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  className="font-body text-2xl sm:text-3xl font-500 tracking-[0.15em] uppercase text-orange absolute whitespace-nowrap"
                >
                  {roles[currentRole]}
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Location line */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.55 }}
            className="mt-16 sm:mt-24"
            style={{ transform: 'rotate(-4deg)' }}
          >
            <p className="font-display text-lg sm:text-xl tracking-[0.4em] uppercase text-white/40">
              ROMA <span className="text-red">/</span> ITALIA <span className="text-red">/</span> 2025
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-[-80px] right-4 sm:right-8"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span
                className="font-display text-xs tracking-[0.3em] text-white/30 uppercase"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                SCROLL
              </span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-red/60 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative speed lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red/40 to-transparent" />
    </section>
  );
}
