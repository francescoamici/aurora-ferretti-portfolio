import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

function SplitText({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`inline-flex overflow-hidden ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ y: '120%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

function Marquee({ children, speed = 30 }: { children: React.ReactNode; speed?: number }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        <span className="inline-flex">{children}</span>
        <span className="inline-flex">{children}</span>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const { t } = useTranslation('profile');
  const { t: tc } = useTranslation();
  const [showMarquee, setShowMarquee] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMarquee(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const titles = [
    t('titles.artDirector'),
    t('titles.visualDesigner'),
    t('titles.illustrator'),
  ];

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Blush gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full bg-blush/[0.06] blur-[120px] pointer-events-none" />

      {/* Main name - Aurora */}
      <div className="relative z-10 text-center">
        <h1 className="leading-[0.85]">
          <span className="block">
            <SplitText
              text={profile.firstName}
              className="font-display italic font-light text-noir text-[clamp(5rem,15vw,15rem)]"
              delay={0.3}
            />
          </span>
          <span className="block -mt-2 md:-mt-4">
            <SplitText
              text={profile.lastName}
              className="font-display font-normal text-noir text-[clamp(5rem,15vw,15rem)]"
              delay={0.7}
            />
          </span>
        </h1>

        {/* Titles with gold separators */}
        <motion.div
          className="mt-8 md:mt-12 flex items-center justify-center gap-4 md:gap-6 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {titles.map((title, i) => (
            <span key={title} className="flex items-center gap-4 md:gap-6">
              {i > 0 && <span className="w-6 md:w-10 h-px bg-gold" />}
              <span className="font-accent text-xs md:text-sm uppercase tracking-[0.3em] text-noir/70">
                {title}
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-24 md:bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="font-body text-[9px] uppercase tracking-[0.3em] text-gray">
          {tc('hero.scroll')}
        </span>
        <div className="relative w-px h-10 bg-gold/30 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gold"
            animate={{ height: ['0%', '100%'], top: ['0%', '0%'] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />
        </div>
        <motion.div
          className="w-1.5 h-1.5 rounded-full border border-gold/50"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Bottom Marquee Band */}
      {showMarquee && (
        <motion.div
          className="absolute bottom-6 md:bottom-8 left-0 right-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1.5 }}
        >
          <Marquee speed={35}>
            <span className="font-body text-xs tracking-[0.2em] uppercase text-noir mx-4">
              Art Director &nbsp;&bull;&nbsp; Visual Designer &nbsp;&bull;&nbsp; Illustrator &nbsp;&bull;&nbsp;
              Art Director &nbsp;&bull;&nbsp; Visual Designer &nbsp;&bull;&nbsp; Illustrator &nbsp;&bull;&nbsp;
              Art Director &nbsp;&bull;&nbsp; Visual Designer &nbsp;&bull;&nbsp; Illustrator &nbsp;&bull;&nbsp;
            </span>
          </Marquee>
        </motion.div>
      )}
    </section>
  );
}
