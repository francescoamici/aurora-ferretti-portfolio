import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

export default function Contact() {
  const { t, i18n } = useTranslation('common');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contatto" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Diagonal stripes background */}
      <div className="absolute inset-0 diagonal-stripe opacity-20 pointer-events-none" />

      {/* Speed lines */}
      <div className="absolute top-20 left-0 w-[50%] h-[1px] bg-gradient-to-r from-red/30 to-transparent" />
      <div className="absolute top-24 left-0 w-[35%] h-[1px] bg-gradient-to-r from-orange/20 to-transparent" />
      <div className="absolute bottom-20 right-0 w-[40%] h-[1px] bg-gradient-to-l from-red/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* LAUNCH header */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2
            className="font-big font-800 text-8xl sm:text-9xl lg:text-[11rem] uppercase tracking-tight text-red leading-[0.85]"
            style={{ transform: 'rotate(-3deg)' }}
          >
            {i18n.language === 'it' ? 'CONTATTO' : 'LAUNCH'}
          </h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="font-body text-xl sm:text-2xl tracking-[0.15em] text-white/50 mt-6"
            style={{ transform: 'rotate(-1deg)' }}
          >
            {i18n.language === 'it'
              ? 'Pronti ad accelerare?'
              : 'Ready to accelerate?'}
          </motion.p>
        </motion.div>

        {/* Launch button - email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.35 }}
          className="flex justify-center mb-20"
        >
          <a
            href={`mailto:${profile.email}`}
            className="group relative inline-block"
          >
            {/* Outer glow on hover */}
            <div className="absolute -inset-3 bg-red/0 group-hover:bg-red/10 transition-all duration-200 blur-xl" />

            <motion.div
              className="relative bg-red px-12 sm:px-16 py-6 sm:py-8 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              style={{ clipPath: 'polygon(4% 0, 100% 0, 96% 100%, 0 100%)' }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />

              <div className="relative flex items-center gap-4">
                <span className="font-display text-2xl sm:text-3xl tracking-[0.2em] uppercase text-white">
                  {t('contact.email')}
                </span>
                <motion.span
                  className="font-display text-2xl text-white/80"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  &rarr;&rarr;
                </motion.span>
              </div>
            </motion.div>
          </a>
        </motion.div>

        {/* Email display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="text-center mb-16"
        >
          <a
            href={`mailto:${profile.email}`}
            className="font-body text-lg sm:text-xl tracking-[0.15em] text-white/30 hover:text-orange transition-colors duration-200"
          >
            {profile.email}
          </a>
        </motion.div>

        {/* Social links - speed styled */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="flex justify-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {profile.links.map((link, index) => (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.08, duration: 0.2 }}
                whileHover={{ x: 4 }}
                className="group flex items-center gap-2"
              >
                <span className="text-red/40 group-hover:text-red transition-colors duration-150 font-big font-700">/</span>
                <span className="font-display text-sm sm:text-base tracking-[0.25em] uppercase text-white/50 group-hover:text-white transition-colors duration-150">
                  {link.label}
                </span>
                <span className="w-0 group-hover:w-6 h-[1px] bg-orange transition-all duration-200" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Orange/yellow accent decorations */}
        <div className="mt-20 flex items-center justify-center gap-4">
          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent to-orange/30" />
          <div className="w-3 h-3 bg-orange/20" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
          <div className="w-3 h-3 bg-yellow/20" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
          <div className="w-20 h-[2px] bg-gradient-to-l from-transparent to-yellow/30" />
        </div>
      </div>
    </section>
  );
}
