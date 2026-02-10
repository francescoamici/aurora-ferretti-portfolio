import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="relative bg-nero px-6 py-40">
      {/* Decorative gold element top */}
      <motion.div
        className="absolute left-1/2 top-0 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-gold/40"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      <div className="mx-auto max-w-3xl text-center">
        {/* Section label */}
        <motion.p
          className="mb-6 text-xs tracking-[0.4em] text-gold/60 uppercase"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {t('sections.contact')}
        </motion.p>

        {/* Main heading */}
        <motion.h2
          className="font-display text-5xl font-bold text-ivory md:text-7xl"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {t('contact.title')}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="mt-6 font-accent text-xl text-ivory/50 md:text-2xl"
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {t('contact.subtitle')}
        </motion.p>

        {/* Email CTA */}
        <motion.div
          className="mt-12"
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <a
            href={`mailto:${profile.email}`}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-gold/40 px-10 py-4 font-display text-lg tracking-wider text-gold transition-all duration-500 hover:border-gold hover:bg-gold hover:text-nero"
          >
            <span className="relative z-10">{profile.email}</span>
            <motion.span
              className="relative z-10 inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              &#8594;
            </motion.span>
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="mx-auto mt-16 h-px w-16 bg-gold/30"
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />

        {/* Social links */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-8"
          custom={5}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {profile.links.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-widest text-ivory/40 uppercase transition-colors duration-300 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Decorative gold element bottom */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-24 w-px -translate-x-1/2 bg-gradient-to-t from-transparent to-gold/40"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
    </section>
  );
}
