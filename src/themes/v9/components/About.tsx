import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';

export default function About() {
  const { t } = useTranslation('profile');

  return (
    <section id="about" className="py-[80px]">
      <div className="mx-auto max-w-[1200px] px-[24px]">
        <div className="grid grid-cols-12 gap-[24px]">
          {/* Left label column — 4 cols */}
          <div className="col-span-12 md:col-span-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-[12px] md:sticky md:top-[96px]"
            >
              <span className="red-square" />
              <span className="section-label">About</span>
            </motion.div>
          </div>

          {/* Right content column — 8 cols */}
          <div className="col-span-12 md:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <p className="body-justified m-0">
                {t('bioExtended')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="mt-[80px] mx-auto max-w-[1200px] px-[24px]">
        <div className="w-full h-[1px] bg-light-gray" />
      </div>
    </section>
  );
}
