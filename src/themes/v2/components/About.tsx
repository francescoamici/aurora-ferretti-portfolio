import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

export default function About() {
  const { t } = useTranslation('profile');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const bioText: string = t('bioExtended');

  // Replace periods with red-styled periods
  const renderBioWithRedDots = (text: string) => {
    const parts = text.split('.');
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {i < parts.length - 1 && (
          <span className="text-red font-bold">.</span>
        )}
      </span>
    ));
  };

  return (
    <section id="about" className="py-40 px-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mx-auto max-w-2xl text-center"
      >
        {/* Portrait */}
        <div className="mb-12 flex justify-center">
          <div className="relative w-40 h-40">
            <img
              src={profile.portraitCutout}
              alt={profile.name}
              className="w-full h-full object-cover object-top grayscale"
            />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red" />
          </div>
        </div>

        <p
          className="font-body text-lg leading-[2] text-black/70"
        >
          {renderBioWithRedDots(bioText)}
        </p>
      </motion.div>
    </section>
  );
}
