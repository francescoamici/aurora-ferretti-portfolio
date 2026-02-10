import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';
import { motion } from 'framer-motion';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="relative bg-raw-white border-b-[8px] border-harsh-black">
      {/* DECORATIVE STARS */}
      <div className="bg-yellow border-b-[4px] border-harsh-black py-2 text-center">
        <span className="font-mono text-harsh-black text-2xl tracking-[1em]">
          {'\u2605\u2605\u2605\u2605\u2605'}
        </span>
      </div>

      {/* HUGE TEXT */}
      <div className="px-4 md:px-8 py-12 md:py-24 text-center">
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.1 }}
          viewport={{ once: true }}
          className="font-display text-blue uppercase leading-[0.9]"
          style={{ fontSize: 'clamp(60px, 15vw, 200px)' }}
        >
          {t('contact.title')}
        </motion.h2>
      </div>

      {/* EMAIL - 90s style */}
      <div className="border-t-[4px] border-harsh-black px-4 md:px-8 py-8 md:py-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto border-[4px] border-harsh-black p-6 md:p-10 hard-shadow bg-raw-white text-center"
        >
          <div className="font-mono text-xs uppercase tracking-[0.3em] mb-4 font-bold">
            {t('contact.email')}
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-lg md:text-2xl text-blue underline underline-offset-8 decoration-4 hover:bg-blue hover:text-raw-white px-2 py-1 transition-none"
          >
            {profile.email}
          </a>

          <div className="font-mono text-xs uppercase tracking-[0.3em] mt-8 mb-4 font-bold">
            {t('contact.or')}
          </div>

          <p className="font-mono text-sm mb-6 opacity-70">
            {t('contact.subtitle')}
          </p>

          {/* SOCIAL LINKS - raw list */}
          <div className="space-y-3">
            {profile.links.map((link) => (
              <div key={link.platform}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-blue underline underline-offset-4 decoration-2 hover:bg-blue hover:text-raw-white px-2 py-1 transition-none uppercase tracking-[0.15em]"
                >
                  {'\u2192'} {link.label}
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* DECORATIVE STARS */}
      <div className="bg-yellow py-2 text-center">
        <span className="font-mono text-harsh-black text-2xl tracking-[1em]">
          {'\u2605\u2605\u2605\u2605\u2605'}
        </span>
      </div>
    </section>
  );
}
