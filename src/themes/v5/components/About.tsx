import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function TerminalReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (inView && !started) {
      const timer = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(timer);
    }
  }, [inView, delay, started]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, 8);
      return () => clearTimeout(timer);
    }
  }, [started, displayed, text]);

  return (
    <div ref={ref}>
      {started ? displayed : ''}
      {started && displayed.length < text.length && (
        <span className="text-cyan animate-pulse">_</span>
      )}
    </div>
  );
}

export default function About() {
  const { t } = useTranslation('profile');
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Portrait with neon glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative w-44 h-44 md:w-52 md:h-52">
            <div className="absolute inset-0 rounded-full blur-xl" style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(255,0,229,0.1) 50%, transparent 70%)' }} />
            <img
              src={profile.portraitCutout}
              alt={profile.name}
              className="relative w-full h-full object-cover object-top brightness-110"
              style={{ filter: 'brightness(1.1) drop-shadow(0 0 12px rgba(0,240,255,0.3))' }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass rounded-lg p-8 md:p-12 neon-border-cyan"
        >
          {/* Terminal prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-mono text-sm mb-6"
          >
            <span className="text-white/30">{'> '}</span>
            <span className="text-cyan">aurora</span>
            <span className="text-white/40">.</span>
            <span className="text-green">bio</span>
          </motion.div>

          {/* Bio text with terminal reveal */}
          <div className="font-body text-lg md:text-xl leading-relaxed text-cyan/80">
            <TerminalReveal text={t('bioExtended')} delay={800} />
          </div>

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded border border-green/30 neon-border-green"
          >
            <span className="w-2 h-2 rounded-full bg-green animate-pulse shadow-[0_0_8px_#39FF14]" />
            <span className="font-mono text-sm text-green">
              {profile.location}
            </span>
          </motion.div>

          {/* Status line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="mt-6 font-mono text-xs text-white/20"
          >
            <span className="text-white/30">{'// '}</span>
            status: available_for_projects
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
