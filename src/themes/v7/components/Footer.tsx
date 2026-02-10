import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative bg-prussian border-t border-white/5 overflow-hidden">
      {/* Top racing stripe */}
      <div className="h-[2px] racing-stripe" />

      {/* Speed lines decoration */}
      <div className="absolute top-8 left-0 w-[25%] h-[1px] bg-gradient-to-r from-red/20 to-transparent" />
      <div className="absolute top-12 left-0 w-[15%] h-[1px] bg-gradient-to-r from-orange/15 to-transparent" />
      <div className="absolute bottom-8 right-0 w-[20%] h-[1px] bg-gradient-to-l from-red/15 to-transparent" />

      {/* Diagonal stripe overlay */}
      <div className="absolute inset-0 diagonal-stripe opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left - brand mark */}
          <div className="flex items-center gap-2">
            <span className="font-display text-lg tracking-[0.3em] text-white/30 uppercase">
              AURORA
            </span>
            <span className="text-red font-big font-700 text-xl">/</span>
            <span className="font-display text-lg tracking-[0.3em] text-red/50 uppercase">
              F
            </span>
          </div>

          {/* Center - tagline */}
          <motion.p
            className="font-display text-xs sm:text-sm tracking-[0.4em] text-white/20 uppercase"
            style={{ transform: 'rotate(-1deg)' }}
          >
            VELOCITA <span className="text-red/30">&middot;</span> ROMA <span className="text-red/30">&middot;</span> 2025
          </motion.p>

          {/* Right - credits */}
          <p className="font-body text-xs tracking-[0.1em] text-white/15">
            &copy; {new Date().getFullYear()} Aurora Ferretti
          </p>
        </div>
      </div>

      {/* Bottom racing stripe */}
      <div className="h-[1px] racing-stripe opacity-40" />
    </footer>
  );
}
