import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('it') ? 'it' : 'en';

  const editionText = 'Edizione I \u00B7 Roma \u00B7 MMXXV';
  const rightsText = lang === 'it' ? 'Tutti i diritti riservati' : 'All rights reserved';
  const madeWithText = lang === 'it'
    ? 'Realizzato con cura a Roma'
    : 'Crafted with care in Rome';

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="bg-parchment pb-10 pt-4"
    >
      {/* Top thin rule */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-brown/15 mb-8" />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center space-y-3">
        {/* Edition line */}
        <p className="font-caps text-[0.6rem] tracking-[0.25em] uppercase text-brown/35 small-caps">
          {editionText}
        </p>

        {/* Made with care */}
        <p className="font-body text-brown/25 text-[0.7rem] italic">
          {madeWithText}
        </p>

        {/* Rights */}
        <p className="font-caps text-[0.55rem] tracking-[0.2em] uppercase text-brown/25 small-caps">
          &copy; {new Date().getFullYear()} Aurora Ferretti &middot; {rightsText}
        </p>
      </div>
    </motion.footer>
  );
}
