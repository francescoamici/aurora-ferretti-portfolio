import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

/* ---------- Botanical SVG Accents ---------- */

function SmallLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" fill="none" className={className}>
      <path
        d="M12 2C12 2 4 10 4 20C4 25.5 7.6 28 12 28C16.4 28 20 25.5 20 20C20 10 12 2 12 2Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M12 28V8M12 16C9 13 7 11 7 11M12 12C15 10 17 8 17 8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SmallBranch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" fill="none" className={className}>
      <path
        d="M2 38C10 30 20 20 30 18C40 16 50 18 58 10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="18" cy="24" r="3" fill="currentColor" opacity="0.12" />
      <circle cx="36" cy="15" r="2.5" fill="currentColor" opacity="0.12" />
      <circle cx="48" cy="12" r="2" fill="currentColor" opacity="0.12" />
      <path d="M18 24C15 20 14 18 14 18" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M36 15C38 11 40 9 40 9" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Firefly Particles ---------- */

function Fireflies() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 5,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, #C67D4A80, #C67D4A00)',
            boxShadow: `0 0 ${p.size * 2}px ${p.size}px #C67D4A20`,
          }}
          animate={{
            y: [0, -30, -10, -40, 0],
            x: [0, 15, -10, 20, 0],
            opacity: [0, 0.7, 0.3, 0.8, 0],
            scale: [0.8, 1.2, 0.9, 1.3, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Organic Blob ---------- */

function OrganicBlob({
  className,
  color,
  delay = 0,
}: {
  className?: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        background: color,
        filter: 'blur(80px)',
      }}
      animate={{
        borderRadius: [
          '40% 60% 70% 30% / 40% 50% 60% 50%',
          '60% 40% 30% 70% / 50% 60% 40% 60%',
          '30% 60% 50% 40% / 60% 30% 70% 40%',
          '50% 40% 60% 50% / 40% 60% 30% 70%',
          '40% 60% 70% 30% / 40% 50% 60% 50%',
        ],
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

/* ---------- Scroll Indicator ---------- */

function ScrollIndicator() {
  const { t } = useTranslation();

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <span className="font-hand text-base text-earth/50">{t('hero.scroll')}</span>
      <motion.svg
        width="20"
        height="32"
        viewBox="0 0 20 32"
        fill="none"
        className="text-sage"
      >
        <path
          d="M10 2C10 2 6 8 6 14C6 17.3 7.8 20 10 20C12.2 20 14 17.3 14 14C14 8 10 2 10 2Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <motion.path
          d="M10 20V30"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>
    </motion.div>
  );
}

/* ---------- Hero Component ---------- */

export default function Hero() {
  const { t } = useTranslation('profile');
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const titles = [
    t('titles.artDirector'),
    t('titles.visualDesigner'),
    t('titles.illustrator'),
  ];

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream"
    >
      {/* Background Blobs */}
      <OrganicBlob
        className="top-[10%] -left-[10%] h-[500px] w-[500px] lg:h-[700px] lg:w-[700px]"
        color="#7A9B6D12"
        delay={0}
      />
      <OrganicBlob
        className="top-[30%] right-[5%] h-[400px] w-[400px] lg:h-[550px] lg:w-[550px]"
        color="#C67D4A10"
        delay={3}
      />
      <OrganicBlob
        className="bottom-[5%] left-[20%] h-[350px] w-[350px] lg:h-[500px] lg:w-[500px]"
        color="#A8B89A10"
        delay={6}
      />

      {/* Fireflies */}
      <Fireflies />

      {/* Botanical accent - top right */}
      <motion.div
        className="absolute top-24 right-12 hidden text-sage/30 lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <SmallLeaf className="h-16 w-12" />
      </motion.div>

      {/* Botanical accent - bottom left */}
      <motion.div
        className="absolute bottom-32 left-8 hidden text-terra/25 lg:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <SmallBranch className="h-10 w-16" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 px-6 text-center"
      >
        {/* Small decorative sprig above name */}
        <motion.div
          className="mx-auto mb-6 flex justify-center text-sage/40"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
            <path d="M16 18V4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M16 10C12 7 8 6 4 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <path d="M16 10C20 7 24 6 28 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <circle cx="4" cy="6" r="2" fill="currentColor" opacity="0.3" />
            <circle cx="28" cy="6" r="2" fill="currentColor" opacity="0.3" />
            <circle cx="16" cy="3" r="2.5" fill="currentColor" opacity="0.3" />
          </svg>
        </motion.div>

        {/* Name */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-6xl font-light italic leading-[0.95] tracking-tight text-earth sm:text-7xl md:text-8xl lg:text-9xl"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            {profile.firstName}
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-6xl font-light italic leading-[0.95] tracking-tight text-earth sm:text-7xl md:text-8xl lg:text-9xl"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          >
            {profile.lastName}
          </motion.h1>
        </div>

        {/* Titles in handwriting */}
        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {titles.map((title, i) => (
            <span key={i} className="flex items-center gap-3">
              {i > 0 && (
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-terra/50" />
              )}
              <span className="font-hand text-xl text-earth/60 sm:text-2xl">
                {title}
              </span>
            </span>
          ))}
        </motion.div>

        {/* Location */}
        <motion.p
          className="mt-4 flex items-center justify-center gap-2 text-sm font-medium tracking-wide text-sage/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-sage">
            <path
              d="M7 1C7 1 3 5 3 8.5C3 10.7 4.8 12.5 7 12.5C9.2 12.5 11 10.7 11 8.5C11 5 7 1 7 1Z"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
          {profile.location}
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full border border-sage/30 bg-sage/5 px-7 py-3 font-hand text-lg text-sage transition-all hover:border-sage/60 hover:bg-sage/10"
          >
            {useTranslation().t('hero.cta')}
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-sage transition-transform group-hover:translate-y-0.5"
            >
              <path d="M4 6L8 10L12 6" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
