import { motion } from 'framer-motion';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="py-12 px-6"
    >
      {/* Thin silver line */}
      <div className="max-w-5xl mx-auto">
        <div className="h-px bg-silver mb-10" />

        <div className="text-center space-y-2">
          <p className="font-body text-[10px] tracking-[0.2em] uppercase text-dove">
            &copy; {year} Aurora Ferretti
          </p>
          <p className="font-accent text-xs italic text-dove/60">
            Made with care in Roma
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
