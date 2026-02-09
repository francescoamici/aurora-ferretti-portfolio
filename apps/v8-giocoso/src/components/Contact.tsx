import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

const colors = ['#FFB4C8', '#FFE66D', '#4361EE', '#FF6B6B', '#95E1D3'];
const titleColors = ['#FF6B6B', '#FFE66D', '#4361EE', '#95E1D3'];

function ConfettiBurst({ active }: { active: boolean }) {
  if (!active) return null;

  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * 360;
    const distance = 60 + Math.random() * 80;
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * distance,
      y: Math.sin(rad) * distance,
      color: colors[i % colors.length],
      size: Math.random() * 8 + 4,
      delay: Math.random() * 0.1,
    };
  });

  return (
    <AnimatePresence>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: '50%',
            top: '50%',
          }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{
            x: p.x,
            y: p.y,
            scale: [0, 1.5, 0.5],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 0.8,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </AnimatePresence>
  );
}

function SquigglyUnderline({ color }: { color: string }) {
  return (
    <svg width="100%" height="8" viewBox="0 0 200 8" preserveAspectRatio="none" className="mt-1">
      <path
        d="M0 4 Q10 0 20 4 Q30 8 40 4 Q50 0 60 4 Q70 8 80 4 Q90 0 100 4 Q110 8 120 4 Q130 0 140 4 Q150 8 160 4 Q170 0 180 4 Q190 8 200 4"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarDecoration({ color, size, className }: { color: string; size: number; className?: string }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
    >
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={color}
      />
    </motion.svg>
  );
}

export default function Contact() {
  const { t } = useTranslation('common');
  const [emailHover, setEmailHover] = useState(false);
  const [confettiLinks, setConfettiLinks] = useState<Record<string, boolean>>({});

  const triggerConfetti = (key: string) => {
    setConfettiLinks((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setConfettiLinks((prev) => ({ ...prev, [key]: false }));
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden bg-white">
      {/* Star decorations */}
      <StarDecoration color="#FFE66D" size={35} className="absolute top-12 left-[8%]" />
      <StarDecoration color="#FF6B6B" size={25} className="absolute top-20 right-[12%]" />
      <StarDecoration color="#4361EE" size={20} className="absolute bottom-24 left-[15%]" />
      <StarDecoration color="#95E1D3" size={30} className="absolute bottom-16 right-[8%]" />
      <StarDecoration color="#FFB4C8" size={22} className="absolute top-1/2 right-[5%]" />

      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
        {/* Title - multicolored */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 150 }}
        >
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none">
            {"LET'S".split('').map((letter, i) => (
              <span key={i} style={{ color: titleColors[i % titleColors.length] }}>
                {letter}
              </span>
            ))}
            <br />
            <span className="inline-flex">
              {"PLAY".split('').map((letter, i) => (
                <motion.span
                  key={i}
                  style={{ color: titleColors[(i + 2) % titleColors.length] }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
            <motion.span
              className="text-coral"
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              !
            </motion.span>
          </h2>

          <SquigglyUnderline color="#4361EE" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="font-body text-lg md:text-xl text-dark/70 mt-8 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {t('contact.subtitle')}
        </motion.p>

        {/* Rainbow email button */}
        <motion.div
          className="mt-10 relative inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: 'spring' }}
          onHoverStart={() => setEmailHover(true)}
          onHoverEnd={() => setEmailHover(false)}
        >
          <motion.a
            href={`mailto:${profile.email}`}
            className="relative z-10 inline-block font-display text-xl md:text-2xl text-white px-10 py-5 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #FF6B6B, #FFE66D, #4361EE, #95E1D3, #FFB4C8)',
              backgroundSize: '300% 300%',
              border: '5px solid #1A1A2E',
            }}
            whileHover={{
              scale: 1.08,
              y: -4,
            }}
            whileTap={{ scale: 0.95 }}
            animate={
              emailHover
                ? { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
                : { y: [0, -4, 0] }
            }
            transition={
              emailHover
                ? { duration: 2, repeat: Infinity }
                : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            {t('contact.email')} ✉
          </motion.a>

          {/* Confetti on hover */}
          <ConfettiBurst active={emailHover} />
        </motion.div>

        {/* Say hi! */}
        <motion.p
          className="font-fun text-2xl md:text-3xl text-coral mt-8"
          style={{ transform: 'rotate(-2deg)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Say hi!
        </motion.p>

        {/* Social links as colorful badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {profile.links.map((link, i) => (
            <motion.div key={link.platform} className="relative">
              <motion.a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-display text-sm md:text-base uppercase px-6 py-3 rounded-xl text-white"
                style={{
                  backgroundColor: colors[i % colors.length],
                  border: '4px solid #1A1A2E',
                  transform: `rotate(${(i - 1.5) * 3}deg)`,
                  boxShadow: '4px 4px 0px #1A1A2E',
                }}
                whileHover={{
                  scale: 1.12,
                  rotate: 0,
                  y: -6,
                  boxShadow: '6px 6px 0px #1A1A2E',
                }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => triggerConfetti(link.platform)}
              >
                {link.label}
              </motion.a>
              <ConfettiBurst active={!!confettiLinks[link.platform]} />
            </motion.div>
          ))}
        </motion.div>

        {/* Fun decoration at bottom */}
        <div className="flex items-center justify-center gap-3 mt-16">
          {colors.map((c, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: c }}
              animate={{
                y: [0, -12, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.12 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
