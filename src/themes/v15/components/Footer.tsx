import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-ivory py-10 md:py-14">
      {/* Top gold line */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          className="w-full h-px bg-gold/20"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'center' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 mt-8 md:mt-10">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Location */}
          <motion.p
            className="font-accent text-sm tracking-[0.2em] text-noir/40"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {profile.location}
          </motion.p>

          {/* Copyright */}
          <motion.p
            className="font-body text-[10px] uppercase tracking-[0.2em] text-gray"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            &copy; {currentYear} {profile.name}. {t('footer.rights')}.
          </motion.p>

          {/* Made with love line */}
          <motion.p
            className="font-body text-[9px] uppercase tracking-[0.15em] text-gray/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {t('footer.madeWith')} &#9825; {t('footer.inRome')}
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
