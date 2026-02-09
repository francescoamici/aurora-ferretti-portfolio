import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedProjects from '../components/FeaturedProjects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const confettiColors = ['#FFB4C8', '#FFE66D', '#4361EE', '#FF6B6B', '#95E1D3'];
const dividerColors = ['#FFB4C8', '#4361EE', '#FFE66D', '#FF6B6B', '#95E1D3'];

function ConfettiParticle({ color, delay }: { color: string; delay: number }) {
  const left = Math.random() * 100;
  const size = Math.random() * 10 + 4;
  const duration = Math.random() * 2 + 2;
  const isCircle = Math.random() > 0.5;

  return (
    <motion.div
      className={`fixed z-50 pointer-events-none ${isCircle ? 'rounded-full' : 'rotate-45'}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: `${left}%`,
        top: -20,
      }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{
        y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
        opacity: [1, 1, 0.8, 0],
        rotate: Math.random() * 720,
      }}
      transition={{
        duration,
        delay,
        ease: 'easeIn',
      }}
    />
  );
}

function SectionDivider({ color, variant = 0 }: { color: string; variant?: number }) {
  if (variant === 0) {
    return (
      <div className="flex items-center justify-center py-2">
        <div className="flex-1 h-1 mx-4 rounded-full" style={{ backgroundColor: color }} />
        <motion.div
          className="w-5 h-5 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="flex-1 h-1 mx-4 rounded-full" style={{ backgroundColor: color }} />
      </div>
    );
  }
  if (variant === 1) {
    return (
      <div className="py-2">
        <svg width="100%" height="12" viewBox="0 0 400 12" preserveAspectRatio="none">
          <path
            d="M0 6 Q10 0 20 6 Q30 12 40 6 Q50 0 60 6 Q70 12 80 6 Q90 0 100 6 Q110 12 120 6 Q130 0 140 6 Q150 12 160 6 Q170 0 180 6 Q190 12 200 6 Q210 0 220 6 Q230 12 240 6 Q250 0 260 6 Q270 12 280 6 Q290 0 300 6 Q310 12 320 6 Q330 0 340 6 Q350 12 360 6 Q370 0 380 6 Q390 12 400 6"
            stroke={color}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }
  if (variant === 2) {
    return (
      <div className="flex items-center justify-center gap-3 py-2">
        {confettiColors.map((c, i) => (
          <motion.div
            key={i}
            className={i % 2 === 0 ? 'w-4 h-4 rounded-full' : 'w-3 h-3 rotate-45'}
            style={{ backgroundColor: c }}
            animate={{ y: [0, -6, 0], rotate: i % 2 === 0 ? 0 : [45, 90, 45] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center py-2">
      <div className="h-[4px] flex-1 mx-8" style={{ backgroundColor: color }} />
    </div>
  );
}

/* Floating geometric decorations that persist while scrolling */
function FloatingDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Left side */}
      <motion.div
        className="absolute left-3 top-1/4 w-4 h-4 rounded-full bg-pink opacity-20"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute left-6 top-2/3 w-3 h-3 bg-yellow opacity-15 rotate-45"
        animate={{ rotate: [45, 90, 45], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Right side */}
      <motion.div
        className="absolute right-4 top-1/3 w-5 h-5 opacity-15"
        style={{
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: '17px solid #4361EE',
        }}
        animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-6 top-3/4 w-3 h-3 rounded-full bg-coral opacity-15"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
    </div>
  );
}

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const confettiParticles = Array.from({ length: 40 }, (_, i) => ({
    color: confettiColors[i % confettiColors.length],
    delay: Math.random() * 1.5,
  }));

  return (
    <div className="relative bg-white">
      {/* Page-load confetti effect */}
      <AnimatePresence>
        {showConfetti && confettiParticles.map((p, i) => (
          <ConfettiParticle key={i} {...p} />
        ))}
      </AnimatePresence>

      {/* Floating decorations */}
      <FloatingDecor />

      <div className="relative z-10">
        <Hero />
        <SectionDivider color={dividerColors[0]} variant={1} />
        <About />
        <SectionDivider color={dividerColors[1]} variant={0} />
        <FeaturedProjects />
        <SectionDivider color={dividerColors[2]} variant={2} />
        <Skills />
        <SectionDivider color={dividerColors[3]} variant={1} />
        <Experience />
        <SectionDivider color={dividerColors[4]} variant={0} />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
