import { motion } from 'framer-motion';
import { profile } from '@auror/data';
import { useTranslation } from '@auror/i18n';

export default function Footer() {
  const { i18n } = useTranslation();
  const isIt = i18n.language?.startsWith('it');
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-cream pb-8 pt-0">
      {/* Gold line separator */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          {/* Monogram */}
          <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center mb-5">
            <span className="font-display text-xs text-gold tracking-wide">AF</span>
          </div>

          {/* Crafted tagline */}
          <p className="font-accent italic text-sm text-taupe">
            {isIt ? 'Creato con calore a Roma' : 'Crafted with warmth in Roma'}
          </p>

          {/* Copyright */}
          <p className="mt-2 font-body text-xs text-espresso/30">
            &copy; {year} {profile.name}
          </p>

          {/* Social links */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
            {profile.links.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs text-espresso/30 hover:text-sienna transition-colors duration-400"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
