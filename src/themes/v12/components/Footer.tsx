import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

/* ---------- Plant SVG ---------- */

function PlantIcon() {
  return (
    <svg width="28" height="36" viewBox="0 0 28 36" fill="none" className="text-sage">
      {/* Stem */}
      <path d="M14 34V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Left leaf */}
      <path
        d="M14 24C10 20 5 18 3 18C3 18 5 24 11 27C12.5 27.5 13.5 27 14 26"
        fill="currentColor"
        opacity="0.12"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      {/* Right leaf */}
      <path
        d="M14 18C18 14 23 12 25 12C25 12 23 18 17 21C15.5 21.5 14.5 21 14 20"
        fill="currentColor"
        opacity="0.12"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      {/* Top bud */}
      <path
        d="M14 14C14 8 11 4 11 2C11 2 14 1 14 1C14 1 17 2 17 2C17 4 14 8 14 14"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M11 2C11 2 14 1 14 1C14 1 17 2 17 2"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------- Footer Component ---------- */

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-sage/8 py-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 lg:px-8">
        {/* Plant icon */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <PlantIcon />
        </motion.div>

        {/* Cultivated with care */}
        <motion.p
          className="font-hand text-lg text-earth/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {t('footer.madeWith')} &hearts; {t('footer.inRome')}
        </motion.p>

        {/* Copyright */}
        <motion.p
          className="text-xs text-earth/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          &copy; {currentYear} {profile.name}. {t('footer.rights')}.
        </motion.p>
      </div>
    </footer>
  );
}
