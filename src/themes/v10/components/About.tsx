import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';

export default function About() {
  const { t } = useTranslation('profile');

  return (
    <section className="relative bg-film-black py-24 md:py-36 film-grain">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* ACT I chapter marker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.5 }}
          className="flex items-center gap-6 mb-20"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/40" />
          <h2 className="font-display text-gold text-xs md:text-sm tracking-[0.4em] uppercase">
            Act I
          </h2>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>

        {/* Director's note label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-display text-[10px] tracking-[0.4em] text-gold/70 uppercase mb-10 text-center"
          style={{ fontVariant: 'small-caps' }}
        >
          About the Director
        </motion.p>

        {/* Bio text with drop cap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <p className="font-body text-warm-white/85 text-lg md:text-xl leading-relaxed md:leading-[1.9] drop-cap">
            {t('bioExtended')}
          </p>
        </motion.div>

        {/* Decorative gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-16 gold-rule"
        />
      </div>
    </section>
  );
}
