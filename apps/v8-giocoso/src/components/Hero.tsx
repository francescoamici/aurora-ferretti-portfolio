import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

const letterColors = ['#FFB4C8', '#FFE66D', '#4361EE', '#FF6B6B', '#95E1D3', '#4361EE'];

function ColoredText({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span className="inline-flex">
      {text.split('').map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotate: -10 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{
            delay: (i + offset) * 0.06,
            type: 'spring',
            stiffness: 200,
            damping: 12,
          }}
          style={{ color: letterColors[(i + offset) % letterColors.length] }}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}

/* Floating geometric shapes */
function FloatingCircle({ color, size, x, y, delay }: { color: string; size: number; x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ width: size, height: size, backgroundColor: color, left: x, top: y }}
      animate={{
        y: [0, -20, 0, 20, 0],
        rotate: [0, 10, 0, -10, 0],
      }}
      transition={{ duration: 8, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

function FloatingTriangle({ color, size, x, y, delay }: { color: string; size: number; x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: x,
        top: y,
        width: 0,
        height: 0,
        borderLeft: `${size / 2}px solid transparent`,
        borderRight: `${size / 2}px solid transparent`,
        borderBottom: `${size}px solid ${color}`,
      }}
      animate={{
        y: [0, 15, 0, -15, 0],
        rotate: [0, 20, 0, -20, 0],
      }}
      transition={{ duration: 7, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

function FloatingSquare({ color, size, x, y, delay }: { color: string; size: number; x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ width: size, height: size, backgroundColor: color, left: x, top: y }}
      animate={{
        y: [0, -25, 0, 25, 0],
        rotate: [0, 45, 90, 135, 180],
      }}
      transition={{ duration: 12, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

function Squiggle({ color, x, y, delay }: { color: string; x: string; y: string; delay: number }) {
  return (
    <motion.svg
      width="80"
      height="30"
      viewBox="0 0 80 30"
      className="absolute"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -12, 0, 12, 0],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{ duration: 9, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <path
        d="M5 15 Q15 5 25 15 Q35 25 45 15 Q55 5 65 15 Q75 25 80 15"
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

function Zigzag({ color, x, y, delay }: { color: string; x: string; y: string; delay: number }) {
  return (
    <motion.svg
      width="70"
      height="40"
      viewBox="0 0 70 40"
      className="absolute"
      style={{ left: x, top: y }}
      animate={{
        y: [0, 18, 0, -18, 0],
        rotate: [0, -8, 0, 8, 0],
      }}
      transition={{ duration: 10, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <path
        d="M5 35 L15 5 L25 35 L35 5 L45 35 L55 5 L65 35"
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

/* Confetti dot */
function ConfettiDot({ color, x, y, size, delay }: { color: string; x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ width: size, height: size, backgroundColor: color, left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 1, 0.5], scale: [0, 1.2, 1, 1] }}
      transition={{ delay, duration: 1.2, ease: 'easeOut' }}
    />
  );
}

export default function Hero() {
  const { t } = useTranslation('profile');
  const { t: tc } = useTranslation('common');
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const roles = [
    t('titles.artDirector'),
    t('titles.visualDesigner'),
    t('titles.illustrator'),
  ];

  const confettiDots = Array.from({ length: 30 }, (_, i) => ({
    color: letterColors[i % letterColors.length],
    x: `${Math.random() * 95}%`,
    y: `${Math.random() * 95}%`,
    size: Math.random() * 8 + 4,
    delay: Math.random() * 1.5,
  }));

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Confetti dots */}
      {showConfetti && confettiDots.map((dot, i) => (
        <ConfettiDot key={i} {...dot} />
      ))}

      {/* Floating geometric shapes */}
      <FloatingCircle color="#FFB4C8" size={60} x="5%" y="15%" delay={0} />
      <FloatingCircle color="#FFE66D" size={35} x="85%" y="60%" delay={1.5} />
      <FloatingCircle color="#4361EE" size={20} x="70%" y="10%" delay={0.8} />
      <FloatingTriangle color="#FFE66D" size={50} x="90%" y="20%" delay={0.5} />
      <FloatingTriangle color="#FF6B6B" size={30} x="12%" y="75%" delay={2} />
      <FloatingSquare color="#95E1D3" size={40} x="80%" y="80%" delay={1} />
      <FloatingSquare color="#4361EE" size={25} x="15%" y="45%" delay={2.5} />
      <Squiggle color="#4361EE" x="65%" y="40%" delay={0.3} />
      <Squiggle color="#FFB4C8" x="3%" y="60%" delay={1.8} />
      <Zigzag color="#FF6B6B" x="75%" y="70%" delay={0.7} />
      <Zigzag color="#95E1D3" x="25%" y="10%" delay={2.2} />

      {/* Extra scattered small dots */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`dot-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 6 + 3,
            height: Math.random() * 6 + 3,
            backgroundColor: letterColors[i % letterColors.length],
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            opacity: 0.5,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-none tracking-tight"
          style={{ transform: 'rotate(-2deg)' }}
        >
          <ColoredText text={profile.firstName.toUpperCase()} />
        </motion.h1>

        <motion.h1
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] leading-none tracking-tight mt-2"
          style={{ transform: 'rotate(1deg)' }}
        >
          <ColoredText text={profile.lastName.toUpperCase()} offset={6} />
        </motion.h1>

        {/* Roles */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, type: 'spring', stiffness: 150 }}
        >
          {roles.map((role, i) => (
            <motion.span
              key={role}
              className="font-fun text-lg sm:text-xl md:text-2xl lg:text-3xl"
              style={{
                color: letterColors[i * 2 % letterColors.length],
                transform: `rotate(${(i - 1) * 3}deg)`,
              }}
              whileHover={{ scale: 1.1, rotate: (i - 1) * -3 }}
            >
              {role}!
              {i < roles.length - 1 && (
                <span className="mx-2" style={{ color: letterColors[(i * 2 + 1) % letterColors.length] }}>
                  /
                </span>
              )}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Arrow */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.a
            href="#projects"
            className="inline-block font-fun text-xl md:text-2xl text-blue px-8 py-4 rounded-2xl"
            style={{ border: '4px solid #4361EE', background: '#FFE66D' }}
            whileHover={{
              scale: 1.08,
              rotate: [0, -2, 2, -2, 0],
              transition: { rotate: { duration: 0.4 } },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-fun">{tc('hero.cta')}</span> &#x2193;
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
