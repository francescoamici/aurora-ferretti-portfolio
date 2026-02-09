import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { profile } from '@auror/data';
import { useTranslation } from '@auror/i18n';

function TypingText({ texts }: { texts: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[currentIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 60 + Math.random() * 40);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 30);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentIndex, texts]);

  return (
    <span className="font-mono text-cyan">
      <span className="text-white/40">{`> `}</span>
      <span className="text-green">loading</span>
      <span className="text-white/40">: </span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className="text-cyan"
      >
        _
      </motion.span>
    </span>
  );
}

function Meteor({ delay, top, duration }: { delay: number; top: string; duration: number }) {
  return (
    <motion.div
      className="absolute w-[2px] h-[80px] rounded-full"
      style={{
        top,
        right: '-100px',
        background: 'linear-gradient(180deg, #00F0FF, transparent)',
        boxShadow: '0 0 6px #00F0FF, 0 0 12px #00F0FF',
      }}
      animate={{
        x: [0, -800],
        y: [0, 400],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: delay * 2 + 3,
        ease: 'linear',
      }}
    />
  );
}

export default function Hero() {
  const { t } = useTranslation('profile');
  const roles = useMemo(
    () => [
      t('titles.artDirector'),
      t('titles.visualDesigner'),
      t('titles.illustrator'),
    ],
    [t],
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-space">
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg animate-grid opacity-60" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0B0B1A_70%)]" />

      {/* Meteors */}
      <Meteor delay={0} top="15%" duration={2.5} />
      <Meteor delay={2} top="30%" duration={3} />
      <Meteor delay={5} top="55%" duration={2} />
      <Meteor delay={8} top="75%" duration={2.8} />
      <Meteor delay={3.5} top="10%" duration={3.2} />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* AURORA */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-display font-black text-cyan leading-none"
          style={{ fontSize: 'clamp(5rem, 15vw, 16rem)' }}
        >
          <motion.span
            className="neon-cyan inline-block"
            animate={{
              textShadow: [
                '0 0 7px #00F0FF, 0 0 10px #00F0FF, 0 0 21px #00F0FF, 0 0 42px #00F0FF',
                '0 0 10px #00F0FF, 0 0 20px #00F0FF, 0 0 40px #00F0FF, 0 0 80px #00F0FF',
                '0 0 7px #00F0FF, 0 0 10px #00F0FF, 0 0 21px #00F0FF, 0 0 42px #00F0FF',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            AURORA
          </motion.span>
        </motion.h1>

        {/* FERRETTI */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="font-display font-bold text-magenta leading-none mt-2"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}
        >
          <motion.span
            className="neon-magenta inline-block"
            animate={{
              textShadow: [
                '0 0 7px #FF00E5, 0 0 10px #FF00E5, 0 0 21px #FF00E5, 0 0 42px #FF00E5',
                '0 0 10px #FF00E5, 0 0 20px #FF00E5, 0 0 40px #FF00E5, 0 0 80px #FF00E5',
                '0 0 7px #FF00E5, 0 0 10px #FF00E5, 0 0 21px #FF00E5, 0 0 42px #FF00E5',
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            FERRETTI
          </motion.span>
        </motion.h2>

        {/* Terminal typing roles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 text-lg md:text-xl"
        >
          <TypingText texts={roles} />
        </motion.div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-4 font-mono text-sm text-green/80"
        >
          <span className="text-white/30">{'// '}</span>
          based_in: {profile.location}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase">
              scroll
            </span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-cyan/60 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
