import { useRef } from 'react';
import { motion, useMotionValue, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

function MagneticButton({
  children,
  href,
  className = '',
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      style={{ x, y }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

function GoldCorner({ position }: { position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const rotations: Record<string, string> = {
    'top-left': '',
    'top-right': 'rotate(90deg)',
    'bottom-right': 'rotate(180deg)',
    'bottom-left': 'rotate(270deg)',
  };

  const positions: Record<string, string> = {
    'top-left': 'top-6 left-6 md:top-10 md:left-10',
    'top-right': 'top-6 right-6 md:top-10 md:right-10',
    'bottom-right': 'bottom-6 right-6 md:bottom-10 md:right-10',
    'bottom-left': 'bottom-6 left-6 md:bottom-10 md:left-10',
  };

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`absolute ${positions[position]} text-gold/30`}
      style={{ transform: rotations[position] }}
    >
      <path d="M0 24V0h24" stroke="currentColor" strokeWidth="0.5" fill="none" />
    </svg>
  );
}

export default function Contact() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-noir py-28 md:py-40 overflow-hidden"
    >
      {/* Gold corner decorations */}
      <GoldCorner position="top-left" />
      <GoldCorner position="top-right" />
      <GoldCorner position="bottom-left" />
      <GoldCorner position="bottom-right" />

      {/* Subtle blush glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blush/[0.03] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 text-center">
        {/* Section label */}
        <motion.span
          className="font-accent text-xs uppercase tracking-[0.3em] text-gold/60 block mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t('sections.contact')}
        </motion.span>

        {/* Main heading */}
        <motion.h2
          className="font-display italic text-5xl md:text-7xl lg:text-8xl text-ivory leading-[0.95]"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('contact.title').split(' ').length >= 2 ? (
            <>
              <span className="block">{t('contact.title').split(' ').slice(0, -1).join(' ')}</span>
              <span className="block">{t('contact.title').split(' ').slice(-1)}</span>
            </>
          ) : (
            t('contact.title')
          )}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="font-body text-sm md:text-base text-ivory/40 mt-6 md:mt-8 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {t('contact.subtitle')}
        </motion.p>

        {/* Magnetic email button */}
        <motion.div
          className="mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <MagneticButton
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 border border-ivory/30 rounded-full text-ivory font-body text-xs md:text-sm uppercase tracking-[0.2em] hover:border-gold hover:text-gold transition-colors duration-500"
          >
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="0.75">
              <rect x="0.5" y="0.5" width="15" height="11" rx="1.5" />
              <path d="M1 1l7 5 7-5" />
            </svg>
            {profile.email}
          </MagneticButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="mt-14 md:mt-20 flex items-center justify-center gap-8 md:gap-10"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {profile.links.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-ivory/40 hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {/* Decorative gold line */}
        <motion.div
          className="mt-14 mx-auto w-12 h-px bg-gold/30"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        />
      </div>
    </section>
  );
}
