import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="py-32 md:py-44 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section label with extending line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="flex items-center gap-6 mb-16 md:mb-20"
        >
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-dove whitespace-nowrap">
            {t('sections.about')}
          </span>
          <div className="flex-1 h-px bg-silver" />
        </motion.div>

        {/* Extended bio in accent font */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2 }}
        >
          <p className="font-accent text-charcoal text-xl md:text-2xl leading-[2] md:leading-[2.2]">
            {t('bioExtended', { ns: 'profile' })}
          </p>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 md:mt-20 pt-8 border-t border-silver"
        >
          <p className="font-body text-[11px] tracking-[0.2em] uppercase text-dove">
            {profile.location}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
