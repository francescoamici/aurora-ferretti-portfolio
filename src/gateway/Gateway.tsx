import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Theme data                                                        */
/* ------------------------------------------------------------------ */

interface Theme {
  num: number;
  name: string;
  subtitle: string;
  desc: string;
  colors: string[];
  accent: string;
}

const themes: Theme[] = [
  { num: 1, name: 'Nero Assoluto', subtitle: 'Dark Luxury', desc: 'Exclusive art gallery at night', colors: ['#0A0A0A', '#C9A96E', '#F5F0E8', '#6B1D2A'], accent: '#C9A96E' },
  { num: 2, name: 'Carta Bianca', subtitle: 'Minimalist White', desc: 'Japanese zen, extreme whitespace', colors: ['#FFFFFF', '#000000', '#E63946'], accent: '#E63946' },
  { num: 3, name: 'Brutalismo', subtitle: 'Raw Brutalism', desc: 'Aggressive, convention-breaking', colors: ['#F0EDE6', '#000000', '#0000FF', '#FFD700'], accent: '#0000FF' },
  { num: 4, name: 'Rinascimento', subtitle: 'Editorial Magazine', desc: 'Luxury Italian art magazine', colors: ['#F8F4EF', '#3D2B1F', '#C75B39', '#1B4965'], accent: '#C75B39' },
  { num: 5, name: 'Neon Roma', subtitle: 'Cyberpunk', desc: 'Ancient Rome through cyberpunk lens', colors: ['#0B0B1A', '#00F0FF', '#FF00E5', '#39FF14'], accent: '#00F0FF' },
  { num: 6, name: 'Giardino Segreto', subtitle: 'Organic Nature', desc: 'Hidden gardens of Roman villas', colors: ['#FDF8F0', '#2D5016', '#C67D4A', '#C4798B'], accent: '#2D5016' },
  { num: 7, name: 'Futurismo Italiano', subtitle: 'Speed & Dynamism', desc: 'Boccioni and Balla digital tribute', colors: ['#0A1628', '#E63946', '#F77F00', '#FCBF49'], accent: '#E63946' },
  { num: 8, name: 'Giocoso', subtitle: 'Playful Memphis', desc: 'Pure joy, geometric confetti', colors: ['#FFB4C8', '#FFE66D', '#4361EE', '#FF6B6B', '#95E1D3'], accent: '#4361EE' },
  { num: 9, name: 'Architetto', subtitle: 'Swiss Grid Design', desc: 'Mathematical precision, pure system', colors: ['#FFFFFF', '#000000', '#DA291C', '#666666'], accent: '#DA291C' },
  { num: 10, name: 'Cinematica', subtitle: 'Cinematic Film', desc: 'Portfolio as a film', colors: ['#0D0D0D', '#F5F0E8', '#8B0000', '#D4A848'], accent: '#D4A848' },
  { num: 11, name: 'Atelier', subtitle: 'Soft Luxury Editorial', desc: 'Magazine-style elegance, gold accents', colors: ['#FAF7F2', '#E8C4C4', '#2D2D2D', '#C4A265'], accent: '#C4A265' },
  { num: 12, name: 'Botanica', subtitle: 'Organic & Natural', desc: 'Flowing botanical design, handwritten warmth', colors: ['#FDF6ED', '#7A9B6D', '#C67D4A', '#D4A0A0'], accent: '#7A9B6D' },
  { num: 13, name: 'Lumière', subtitle: 'Minimalist Light', desc: 'Ultra-clean, airy, exquisite typography', colors: ['#FFFFFF', '#F5F5F5', '#E8E0F0', '#D4A0A0'], accent: '#D4A0A0' },
  { num: 14, name: 'Maison', subtitle: 'Warm & Sophisticated', desc: 'Rich textures, glassmorphism, warm tones', colors: ['#FFF8F0', '#B8A99A', '#C2693D', '#6B1D2A'], accent: '#C2693D' },
  { num: 15, name: 'Étoile', subtitle: 'Modern Chic', desc: 'Fashion editorial, bold typography', colors: ['#FAF9F7', '#1A1A1A', '#E8B4B8', '#C9B06B'], accent: '#C9B06B' },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.6,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

/* ------------------------------------------------------------------ */
/*  Noise SVG (inline, no external assets)                            */
/* ------------------------------------------------------------------ */

function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]">
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Theme Card                                                        */
/* ------------------------------------------------------------------ */

function ThemeCard({ theme }: { theme: Theme }) {
  const paddedNum = String(theme.num).padStart(2, '0');

  return (
    <motion.a
      href={`/v${theme.num}/`}
      variants={cardVariants}
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      className="group relative block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
      style={{
        // @ts-expect-error CSS custom property
        '--accent': theme.accent,
      }}
    >
      {/* Hover glow layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 60px -12px ${theme.accent}22, 0 0 40px -8px ${theme.accent}18`,
          border: `1px solid ${theme.accent}30`,
        }}
      />

      {/* Top accent line */}
      <div
        className="h-[2px] w-full opacity-40 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }}
      />

      <div className="relative px-6 pb-7 pt-6">
        {/* Large faded number */}
        <span
          className="absolute -top-1 right-4 select-none font-[Playfair_Display] text-[5.5rem] font-semibold leading-none tracking-tight opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.09]"
          style={{ color: theme.accent }}
        >
          {paddedNum}
        </span>

        {/* Theme number label */}
        <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-white/30">
          Tema {paddedNum}
        </p>

        {/* Name */}
        <h3 className="mb-1 font-[Playfair_Display] text-xl font-semibold text-white/90 transition-colors duration-300 group-hover:text-white">
          {theme.name}
        </h3>

        {/* Subtitle */}
        <p className="mb-3 text-sm font-light tracking-wide text-white/40">
          {theme.subtitle}
        </p>

        {/* Description */}
        <p className="mb-5 text-[0.8rem] leading-relaxed text-white/25">
          {theme.desc}
        </p>

        {/* Color palette dots + arrow */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {theme.colors.map((color, i) => (
              <span
                key={i}
                className="inline-block h-3 w-3 rounded-full ring-1 ring-white/10"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* Arrow indicator */}
          <span className="translate-x-0 text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/50">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  Gateway                                                           */
/* ------------------------------------------------------------------ */

export default function Gateway() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white selection:bg-white/20">
      <NoiseOverlay />

      {/* Ambient radial gradients */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[70vh] w-[80vw] -translate-x-1/2 rounded-full bg-white/[0.015] blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[40vh] w-[50vw] rounded-full bg-white/[0.008] blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-24 sm:px-8 md:pt-32 lg:pt-40">

        {/* ---- Header ---- */}
        <header className="mb-20 text-center md:mb-28">
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mx-auto mb-10 h-px w-16 origin-center bg-white/20"
          />

          <motion.p
            custom={0.1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mb-4 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-white/30"
          >
            Portfolio Collection
          </motion.p>

          <motion.h1
            custom={0.2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mb-5 font-[Playfair_Display] text-5xl font-normal italic leading-tight tracking-tight text-white/90 sm:text-6xl md:text-7xl"
          >
            Aurora Ferretti
          </motion.h1>

          <motion.p
            custom={0.35}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-sm font-light tracking-[0.15em] text-white/35 sm:text-base"
          >
            Art Director{' '}
            <span className="mx-2 text-white/15">&middot;</span>{' '}
            Visual Designer{' '}
            <span className="mx-2 text-white/15">&middot;</span>{' '}
            Illustrator
          </motion.p>
        </header>

        {/* ---- Section title ---- */}
        <motion.div
          custom={0.5}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mb-12 flex items-center gap-4"
        >
          <h2 className="whitespace-nowrap text-[0.65rem] font-medium uppercase tracking-[0.3em] text-white/30">
            15 Portfolio Designs
          </h2>
          <div className="h-px w-full bg-white/[0.06]" />
        </motion.div>

        {/* ---- Card grid ---- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {themes.map((theme) => (
            <ThemeCard key={theme.num} theme={theme} />
          ))}
        </motion.div>

        {/* ---- Footer ---- */}
        <motion.footer
          custom={1.6}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-24 flex flex-col items-center gap-3 text-center md:mt-32"
        >
          <div className="mx-auto mb-2 h-px w-10 bg-white/10" />
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-white/20">
            Roma, Italia
          </p>
          <p className="text-[0.6rem] tracking-[0.2em] text-white/10">
            &copy; {new Date().getFullYear()}
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
