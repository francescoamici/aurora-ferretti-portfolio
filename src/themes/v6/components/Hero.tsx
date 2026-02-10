import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

/* Botanical SVG leaf motif for left side */
function LeftBotanical() {
  return (
    <svg
      className="absolute left-4 md:left-12 top-1/4 w-16 md:w-24 h-auto text-forest/15"
      viewBox="0 0 80 300"
      fill="none"
    >
      {/* Main vine */}
      <path
        d="M40 0 C40 40, 35 60, 38 100 C41 140, 30 170, 35 220 C38 260, 40 280, 40 300"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Leaf 1 - left */}
      <path
        d="M38 60 C28 50, 15 48, 10 55 C5 62, 18 68, 38 60Z"
        fill="currentColor"
        opacity="0.4"
      />
      {/* Leaf 2 - right */}
      <path
        d="M38 110 C48 100, 62 98, 68 105 C72 112, 58 118, 38 110Z"
        fill="currentColor"
        opacity="0.3"
      />
      {/* Leaf 3 - left */}
      <path
        d="M35 170 C25 160, 10 158, 5 165 C0 172, 15 178, 35 170Z"
        fill="currentColor"
        opacity="0.35"
      />
      {/* Leaf 4 - right */}
      <path
        d="M35 230 C50 220, 65 220, 68 228 C71 236, 52 238, 35 230Z"
        fill="currentColor"
        opacity="0.3"
      />
      {/* Small berries */}
      <circle cx="15" cy="90" r="3" fill="currentColor" opacity="0.2" />
      <circle cx="58" cy="145" r="2.5" fill="currentColor" opacity="0.2" />
      <circle cx="10" cy="200" r="2" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

/* Botanical SVG leaf motif for right side */
function RightBotanical() {
  return (
    <svg
      className="absolute right-4 md:right-12 top-1/3 w-16 md:w-24 h-auto text-forest/15"
      viewBox="0 0 80 280"
      fill="none"
    >
      {/* Main vine */}
      <path
        d="M40 0 C40 30, 45 60, 42 100 C39 140, 48 170, 44 220 C41 250, 40 270, 40 280"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Leaf 1 - right */}
      <path
        d="M42 50 C52 40, 65 38, 70 46 C75 54, 60 58, 42 50Z"
        fill="currentColor"
        opacity="0.35"
      />
      {/* Leaf 2 - left */}
      <path
        d="M42 100 C32 90, 18 88, 12 96 C8 104, 22 108, 42 100Z"
        fill="currentColor"
        opacity="0.3"
      />
      {/* Leaf 3 - right */}
      <path
        d="M44 160 C58 150, 70 150, 73 158 C76 166, 58 168, 44 160Z"
        fill="currentColor"
        opacity="0.4"
      />
      {/* Leaf 4 - left */}
      <path
        d="M44 220 C30 212, 18 212, 14 220 C10 228, 28 230, 44 220Z"
        fill="currentColor"
        opacity="0.3"
      />
      {/* Small berries */}
      <circle cx="62" cy="78" r="2.5" fill="currentColor" opacity="0.2" />
      <circle cx="20" cy="135" r="3" fill="currentColor" opacity="0.2" />
      <circle cx="65" cy="195" r="2" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

/* Firefly particle */
function Firefly({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: 'radial-gradient(circle, rgba(198,125,74,0.6) 0%, rgba(198,125,74,0) 70%)',
      }}
      animate={{
        x: [0, 15, -10, 20, -5, 0],
        y: [0, -20, 10, -15, 25, 0],
        opacity: [0, 0.8, 0.4, 1, 0.5, 0],
        scale: [0.8, 1.2, 0.9, 1.3, 1, 0.8],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}

const fireflies = [
  { delay: 0, x: '15%', y: '25%', size: 8 },
  { delay: 1.5, x: '75%', y: '35%', size: 6 },
  { delay: 3, x: '45%', y: '60%', size: 10 },
  { delay: 0.8, x: '85%', y: '55%', size: 7 },
  { delay: 2.2, x: '25%', y: '70%', size: 5 },
  { delay: 4, x: '60%', y: '20%', size: 9 },
  { delay: 1.2, x: '35%', y: '40%', size: 6 },
  { delay: 3.5, x: '90%', y: '75%', size: 8 },
  { delay: 2.8, x: '10%', y: '50%', size: 7 },
  { delay: 0.5, x: '55%', y: '80%', size: 5 },
  { delay: 5, x: '70%', y: '15%', size: 6 },
  { delay: 1.8, x: '20%', y: '85%', size: 8 },
];

export default function Hero() {
  const { t } = useTranslation('profile');
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream"
    >
      {/* Fireflies */}
      {fireflies.map((f, i) => (
        <Firefly key={i} {...f} />
      ))}

      {/* Botanical decorations */}
      <LeftBotanical />
      <RightBotanical />

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display italic font-light text-forest leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(5rem, 15vw, 11.25rem)' }}
        >
          {profile.firstName}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-normal text-forest/70 tracking-[0.15em] mt-2"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
        >
          {profile.lastName}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="mt-8"
        >
          <p className="font-hand text-terra tracking-wide" style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}>
            {t('titles.artDirector')} &middot; {t('titles.visualDesigner')} &middot; {t('titles.illustrator')}
          </p>
        </motion.div>

        {/* Decorative leaf below roles */}
        <motion.svg
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mx-auto mt-8 text-forest/20"
          width="60"
          height="24"
          viewBox="0 0 60 24"
          fill="none"
        >
          <path
            d="M30 12 C20 4, 5 2, 2 12 C5 22, 20 20, 30 12Z"
            fill="currentColor"
          />
          <path
            d="M30 12 C40 4, 55 2, 58 12 C55 22, 40 20, 30 12Z"
            fill="currentColor"
          />
          <line x1="30" y1="0" x2="30" y2="24" stroke="currentColor" strokeWidth="1" />
        </motion.svg>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-3"
          >
            <span className="font-hand text-forest/40 text-lg">{t('scroll', { ns: 'common', defaultValue: '' }) || 'Scorri per esplorare'}</span>
            <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="text-forest/30">
              <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="1.5" />
              <motion.circle
                cx="10"
                cy="10"
                r="3"
                fill="currentColor"
                animate={{ cy: [8, 18, 8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
