import { motion } from 'framer-motion';
import { profile } from '@auror/data';
import { useTranslation } from '@auror/i18n';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-film-black py-24 md:py-36 film-grain">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        {/* EPILOGUE chapter marker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.5 }}
          className="flex items-center gap-6 mb-20"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/40" />
          <h2 className="font-display text-gold text-xs md:text-sm tracking-[0.4em] uppercase whitespace-nowrap">
            Epilogue
          </h2>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>

        {/* THE NEXT CHAPTER */}
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="font-display text-gold tracking-[0.15em]"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)' }}
        >
          The Next Chapter
        </motion.h3>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-body italic text-warm-white/60 text-lg md:text-xl mt-6"
        >
          Let's create something together
        </motion.p>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="mt-10"
        >
          <a
            href={`mailto:${profile.email}`}
            className="inline-block font-display text-gold text-lg md:text-2xl tracking-[0.1em] hover:text-warm-white transition-colors duration-700 relative group"
          >
            {profile.email}
            {/* Warm glow on hover */}
            <span className="absolute -inset-4 bg-gold/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10" />
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-12 flex items-center justify-center gap-8"
        >
          {profile.links.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-warm-white/40 uppercase hover:text-gold transition-colors duration-500"
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {/* "Directed by" signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="mt-24"
        >
          <div className="gold-rule max-w-xs mx-auto mb-8" />
          <p className="font-display italic text-gold/60 text-sm tracking-[0.15em]">
            Directed by Aurora Ferretti
          </p>
        </motion.div>
      </div>
    </section>
  );
}
