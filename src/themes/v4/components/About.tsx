import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import OrnamentalDivider from './OrnamentalDivider';

export default function About() {
  const { t, i18n } = useTranslation('profile');
  const lang = i18n.language?.startsWith('it') ? 'it' : 'en';

  const bioExtended = t('bioExtended');
  const bioSentences = bioExtended.split('. ');
  const midPoint = Math.ceil(bioSentences.length / 2);

  const firstHalf = bioSentences.slice(0, midPoint).join('. ') + (bioSentences.length > midPoint ? '.' : '');
  const secondHalf = bioSentences.slice(midPoint).join('. ');

  // Pull quote - a key phrase
  const pullQuote = lang === 'it'
    ? 'Il design migliore nasce dall\u2019incontro tra pensiero analitico e sensibilit\u00e0 creativa.'
    : 'The best design emerges from the intersection of analytical thinking and creative sensitivity.';

  const sectionHeader = lang === 'it' ? 'Chi Sono' : 'About';

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] },
    }),
  };

  return (
    <section id="about" className="bg-parchment py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-caps text-[0.7rem] tracking-[0.3em] uppercase text-brown/50 small-caps">
            {sectionHeader}
          </h2>
        </motion.div>

        {/* Two-column editorial layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Left column - with drop cap */}
          <motion.div
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="font-body text-brown/85 text-base md:text-lg leading-[1.85] drop-cap">
              {firstHalf}
            </p>
          </motion.div>

          {/* Right column */}
          <motion.div
            variants={fadeUp}
            custom={0.4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="font-body text-brown/85 text-base md:text-lg leading-[1.85]">
              {secondHalf}
            </p>
          </motion.div>
        </div>

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-20 mb-4 text-center"
        >
          <div className="h-px bg-terracotta/30 mb-8" />
          <p className="font-subhead italic text-terracotta text-xl md:text-2xl lg:text-3xl leading-relaxed px-4">
            &ldquo;{pullQuote}&rdquo;
          </p>
          <div className="h-px bg-terracotta/30 mt-8" />
        </motion.blockquote>
      </div>

      <OrnamentalDivider className="mt-16" />
    </section>
  );
}
