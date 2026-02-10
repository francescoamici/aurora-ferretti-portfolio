import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative bg-black">
      {/* Fade to black effect at top */}
      <div className="h-24 bg-gradient-to-b from-film-black to-black" />

      <div className="py-12 md:py-16 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          {/* Directed by */}
          <p className="font-display italic text-gold text-sm md:text-base tracking-[0.15em]">
            Directed by Aurora Ferretti
          </p>

          {/* Roma, MMXXV */}
          <p className="font-mono text-[10px] tracking-[0.3em] text-warm-white/25 mt-4 uppercase">
            Roma, MMXXV
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
