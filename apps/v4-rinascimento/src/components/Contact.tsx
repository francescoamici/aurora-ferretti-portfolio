import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

export default function Contact() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('it') ? 'it' : 'en';

  const headerLabel = lang === 'it' ? 'Corrispondenza' : 'Correspondence';
  const subtitleText = lang === 'it'
    ? 'Per collaborazioni, progetti e commissioni'
    : 'For collaborations, projects and commissions';
  const writeLabel = lang === 'it' ? 'Scrivimi' : 'Write to me';

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay, ease: 'easeOut' },
    }),
  };

  return (
    <section id="contact" className="bg-parchment py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <h2 className="font-caps text-[0.7rem] tracking-[0.3em] uppercase text-brown/50 small-caps">
            {headerLabel}
          </h2>
        </motion.div>

        {/* Ornamental top border */}
        <motion.div
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span className="w-20 h-px bg-brown/20" />
          <span className="text-brown/25 text-[0.6rem]">&#9670;</span>
          <span className="w-20 h-px bg-brown/20" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          custom={0.3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="font-body text-brown/60 text-base md:text-lg leading-relaxed mb-10"
        >
          {subtitleText}
        </motion.p>

        {/* Email */}
        <motion.div
          variants={fadeUp}
          custom={0.5}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12"
        >
          <a
            href={`mailto:${profile.email}`}
            className="inline-block font-display italic text-terracotta text-xl md:text-2xl lg:text-3xl hover:text-terracotta-light transition-colors duration-500 border-b border-terracotta/30 hover:border-terracotta/60 pb-1"
          >
            {profile.email}
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={fadeUp}
          custom={0.7}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex items-center justify-center gap-8 md:gap-10"
        >
          {profile.links.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-caps text-[0.65rem] tracking-[0.15em] uppercase text-brown/50 hover:text-terracotta transition-colors duration-500 small-caps border-b border-transparent hover:border-terracotta/40 pb-0.5"
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {/* Ornamental bottom border */}
        <motion.div
          variants={fadeUp}
          custom={0.9}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex items-center justify-center gap-4 mt-14"
        >
          <span className="w-20 h-px bg-brown/20" />
          <span className="text-brown/25 text-[0.6rem]">&#9670;</span>
          <span className="w-20 h-px bg-brown/20" />
        </motion.div>
      </div>
    </section>
  );
}
