import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

function GoldParticle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gold/40"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, -10, 0],
        opacity: [0.2, 0.6, 0.2],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

function GoldCornerOrnament({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const transforms: Record<string, string> = {
    tl: '',
    tr: 'scaleX(-1)',
    bl: 'scaleY(-1)',
    br: 'scale(-1)',
  };
  const positions: Record<string, string> = {
    tl: 'top-4 left-4',
    tr: 'top-4 right-4',
    bl: 'bottom-4 left-4',
    br: 'bottom-4 right-4',
  };

  return (
    <svg
      className={`absolute ${positions[position]} w-10 h-10 text-gold/60`}
      style={{ transform: transforms[position] }}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0 L16 0 L16 2 L2 2 L2 16 L0 16 Z" fill="currentColor" />
      <circle cx="4" cy="4" r="1.5" fill="currentColor" />
    </svg>
  );
}

export default function Hero() {
  const { t } = useTranslation('profile');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacityOut = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const titles = [
    t('titles.artDirector'),
    t('titles.visualDesigner'),
    t('titles.illustrator'),
  ];

  const particles = [
    { delay: 0, x: '15%', y: '25%', size: 4 },
    { delay: 1.2, x: '80%', y: '15%', size: 3 },
    { delay: 2.5, x: '60%', y: '70%', size: 5 },
    { delay: 0.8, x: '25%', y: '80%', size: 3 },
    { delay: 3.0, x: '90%', y: '45%', size: 4 },
    { delay: 1.8, x: '45%', y: '10%', size: 3 },
    { delay: 2.2, x: '70%', y: '85%', size: 4 },
    { delay: 0.5, x: '10%', y: '55%', size: 5 },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-cream"
    >
      {/* Floating gold particles */}
      {particles.map((p, i) => (
        <GoldParticle key={i} {...p} />
      ))}

      <div className="mx-auto max-w-7xl w-full px-6 md:px-10 py-32 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left: Typography */}
          <motion.div
            className="lg:col-span-5 xl:col-span-5 relative z-10"
            style={{ y: titleY }}
          >
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.h1 className="font-display leading-none">
                <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem] italic font-medium text-charcoal">
                  {profile.firstName}
                </span>
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-light text-charcoal-light mt-1 md:mt-2">
                  {profile.lastName}
                </span>
              </motion.h1>
            </motion.div>

            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              {titles.map((title, i) => (
                <span key={i} className="flex items-center gap-3">
                  <span className="font-accent text-lg md:text-xl text-charcoal-light tracking-wide">
                    {title}
                  </span>
                  {i < titles.length - 1 && (
                    <span className="text-gold text-sm select-none">&#9671;</span>
                  )}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 flex items-center gap-2 text-sm font-accent text-charcoal-light/70 tracking-wider"
            >
              <svg className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {t('location')}
            </motion.div>
          </motion.div>

          {/* Right: Decorative Image Placeholder */}
          <motion.div
            className="lg:col-span-7 xl:col-span-7 relative"
            style={{ y: imageY }}
          >
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Main decorative rectangle */}
              <div className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] w-full max-w-lg lg:max-w-none ml-auto rounded-sm overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, #F5E1E1 0%, #FAF7F2 30%, #E8C4C4 60%, #D4A0A0 100%)',
                  }}
                />

                {/* Decorative layered shapes */}
                <div className="absolute inset-0">
                  <div
                    className="absolute top-[15%] left-[10%] w-[40%] h-[30%] rounded-sm opacity-30"
                    style={{ background: 'linear-gradient(to bottom right, #C4A265, transparent)' }}
                  />
                  <div
                    className="absolute bottom-[20%] right-[15%] w-[35%] h-[25%] rounded-sm opacity-20"
                    style={{ background: 'linear-gradient(to top left, #D4A0A0, transparent)' }}
                  />
                </div>

                {/* Diagonal decorative line */}
                <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
                  <line x1="0" y1="100%" x2="100%" y2="0" stroke="#C4A265" strokeWidth="1" />
                </svg>

                {/* Gold corner ornaments */}
                <GoldCornerOrnament position="tl" />
                <GoldCornerOrnament position="tr" />
                <GoldCornerOrnament position="bl" />
                <GoldCornerOrnament position="br" />

                {/* Center text mark */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-6xl md:text-7xl lg:text-8xl italic text-charcoal/5 select-none">
                    AF
                  </span>
                </div>
              </div>

              {/* Small decorative element offset behind */}
              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-24 h-24 md:w-32 md:h-32 border border-gold/20 rounded-sm -z-10" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ opacity: opacityOut }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="font-accent text-xs tracking-[0.3em] uppercase text-gold/70"
        >
          Scroll
        </motion.span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.div
            className="w-full h-3 bg-gold"
            animate={{ y: ['-100%', '400%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
