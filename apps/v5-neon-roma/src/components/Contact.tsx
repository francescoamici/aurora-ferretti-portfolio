import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { profile } from '@auror/data';
import { useTranslation } from '@auror/i18n';

function ConnectionAnimation({ isHovered }: { isHovered: boolean }) {
  if (!isHovered) return null;
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="font-mono text-xs text-cyan/60 ml-3"
    >
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        initializing connection...
      </motion.span>
    </motion.span>
  );
}

export default function Contact() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass rounded-lg p-8 md:p-16 text-center neon-border-cyan"
        >
          {/* Title with cycling glow */}
          <motion.h2
            className="font-display text-4xl md:text-6xl font-bold tracking-[0.15em] uppercase"
            animate={{
              color: ['#00F0FF', '#FF00E5', '#39FF14', '#00F0FF'],
              textShadow: [
                '0 0 7px #00F0FF, 0 0 10px #00F0FF, 0 0 21px #00F0FF, 0 0 42px #00F0FF',
                '0 0 7px #FF00E5, 0 0 10px #FF00E5, 0 0 21px #FF00E5, 0 0 42px #FF00E5',
                '0 0 7px #39FF14, 0 0 10px #39FF14, 0 0 21px #39FF14, 0 0 42px #39FF14',
                '0 0 7px #00F0FF, 0 0 10px #00F0FF, 0 0 21px #00F0FF, 0 0 42px #00F0FF',
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          >
            CONNECT_
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 font-mono text-sm text-white/40"
          >
            {'// '}{t('contact.subtitle')}
          </motion.p>

          {/* Email with neon underline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10"
          >
            <a
              href={`mailto:${profile.email}`}
              className="inline-block font-mono text-lg md:text-xl text-cyan hover:neon-cyan transition-all duration-300 relative group"
              onMouseEnter={() => setHoveredLink('email')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <span className="text-white/30">{'> '}</span>
              {profile.email}
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-cyan shadow-[0_0_8px_#00F0FF,0_0_16px_#00F0FF] group-hover:shadow-[0_0_12px_#00F0FF,0_0_24px_#00F0FF,0_0_48px_#00F0FF] transition-all duration-300" />
              <ConnectionAnimation isHovered={hoveredLink === 'email'} />
            </a>
          </motion.div>

          {/* Social links as terminal commands */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            {profile.links.map((link, i) => (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
                onMouseEnter={() => setHoveredLink(link.platform)}
                onMouseLeave={() => setHoveredLink(null)}
                className="font-mono text-sm text-white/50 hover:text-magenta hover:neon-magenta transition-all duration-300 group flex items-center"
              >
                <span className="text-white/20 group-hover:text-magenta/40 transition-colors">
                  {'> '}
                </span>
                <span className="text-green/60 group-hover:text-green transition-colors">
                  link
                </span>
                <span className="text-white/20">.</span>
                <span>{link.platform}</span>
                <ConnectionAnimation isHovered={hoveredLink === link.platform} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
