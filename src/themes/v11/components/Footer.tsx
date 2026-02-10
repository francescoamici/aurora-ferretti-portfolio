import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-cream">
      {/* Thin gold separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-10 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Made with care in Roma */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-accent text-sm tracking-wider text-charcoal-light/60"
          >
            {t('footer.madeWith')}{' '}
            <span className="text-blush-deep">&#9829;</span>{' '}
            {t('footer.inRome')}
          </motion.p>

          {/* Logo mark */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display text-lg text-charcoal/20 italic"
          >
            AF
          </motion.span>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-xs text-charcoal-light/40 tracking-wide"
          >
            &copy; {currentYear} {profile.name}. {t('footer.rights')}.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
