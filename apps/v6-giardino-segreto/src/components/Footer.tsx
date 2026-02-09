import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-forest/5 py-12">
      <div className="mx-auto max-w-6xl px-6">
        {/* Botanical decoration */}
        <div className="flex justify-center mb-8">
          <svg width="60" height="30" viewBox="0 0 60 30" fill="none" className="text-forest/15">
            <path d="M30 28V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M30 14 C24 8, 16 6, 14 12 C12 18, 20 20, 30 14Z" fill="currentColor" opacity="0.5" />
            <path d="M30 14 C36 8, 44 6, 46 12 C48 18, 40 20, 30 14Z" fill="currentColor" opacity="0.5" />
            <path d="M30 10 C27 4, 22 0, 26 0 C30 0, 33 4, 30 10Z" fill="currentColor" opacity="0.4" />
          </svg>
        </div>

        <div className="text-center space-y-3">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-hand text-xl text-terra/60"
          >
            Cultivated with care in Roma
          </motion.p>
          <p className="font-body text-sm text-forest/40">
            &copy; {new Date().getFullYear()} Aurora Ferretti
          </p>
        </div>
      </div>
    </footer>
  );
}
