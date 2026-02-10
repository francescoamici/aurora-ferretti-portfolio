import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { profile } from '@auror/data';
import { useTranslation } from '@auror/i18n';

export default function Contact() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-40 px-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-12">
          {t('contact.title', { defaultValue: "Let's talk." })}
        </h2>

        <div className="mb-12">
          <a
            href={`mailto:${profile.email}`}
            className="font-body text-xl md:text-2xl text-black/60 decoration-red decoration-2 underline-offset-4 hover:underline hover:text-black transition-colors duration-300"
          >
            {profile.email}
          </a>
        </div>

        <div className="flex items-center justify-center gap-8">
          {profile.links.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-black/30 hover:text-red transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
