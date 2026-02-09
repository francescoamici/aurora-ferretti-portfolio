import { motion } from 'framer-motion';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedProjects from '../components/FeaturedProjects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

/* ---------- Section Dividers ---------- */

function WaveVineDivider() {
  return (
    <div className="py-6">
      <svg
        className="mx-auto h-10 w-72 text-sage/12"
        viewBox="0 0 288 40"
        fill="none"
      >
        {/* Wave line */}
        <path
          d="M0 20C24 8 48 32 72 20C96 8 120 32 144 20C168 8 192 32 216 20C240 8 264 32 288 20"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* Small leaf accents */}
        <path d="M72 20C68 14 66 10 66 10" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        <circle cx="66" cy="10" r="2" fill="currentColor" opacity="0.3" />
        <path d="M144 20C148 14 150 10 150 10" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        <circle cx="150" cy="10" r="2" fill="currentColor" opacity="0.3" />
        <path d="M216 20C212 14 210 10 210 10" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        <circle cx="210" cy="10" r="2" fill="currentColor" opacity="0.3" />
      </svg>
    </div>
  );
}

function DotVineDivider() {
  return (
    <div className="py-6">
      <svg
        className="mx-auto h-6 w-56 text-terra/12"
        viewBox="0 0 224 24"
        fill="none"
      >
        <line x1="0" y1="12" x2="224" y2="12" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 6" />
        <circle cx="32" cy="12" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="72" cy="12" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="112" cy="12" r="3" fill="currentColor" opacity="0.5" />
        <circle cx="152" cy="12" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="192" cy="12" r="2" fill="currentColor" opacity="0.4" />
      </svg>
    </div>
  );
}

function LeafClusterDivider() {
  return (
    <div className="py-6">
      <svg
        className="mx-auto h-12 w-32 text-olive/15"
        viewBox="0 0 128 48"
        fill="none"
      >
        {/* Center leaf */}
        <path
          d="M64 8C64 8 56 18 56 28C56 34 59 38 64 38C69 38 72 34 72 28C72 18 64 8 64 8Z"
          fill="currentColor"
          opacity="0.3"
        />
        <path d="M64 38V14" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        {/* Left leaf */}
        <path
          d="M48 14C48 14 42 22 42 30C42 35 44.5 37 48 37C51.5 37 54 35 54 30C54 22 48 14 48 14Z"
          fill="currentColor"
          opacity="0.2"
        />
        <path d="M48 37V18" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        {/* Right leaf */}
        <path
          d="M80 14C80 14 74 22 74 30C74 35 76.5 37 80 37C83.5 37 86 35 86 30C86 22 80 14 80 14Z"
          fill="currentColor"
          opacity="0.2"
        />
        <path d="M80 37V18" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        {/* Far left small leaf */}
        <path
          d="M36 22C36 22 32 28 32 33C32 36 33.5 37 36 37C38.5 37 40 36 40 33C40 28 36 22 36 22Z"
          fill="currentColor"
          opacity="0.15"
        />
        {/* Far right small leaf */}
        <path
          d="M92 22C92 22 88 28 88 33C88 36 89.5 37 92 37C94.5 37 96 36 96 33C96 28 92 22 92 22Z"
          fill="currentColor"
          opacity="0.15"
        />
      </svg>
    </div>
  );
}

/* ---------- Floating Fireflies (page-level) ---------- */

function FloatingFireflies() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 15 + Math.random() * 70,
    size: 3 + Math.random() * 4,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 8,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, #C67D4A50, #C67D4A00)',
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px #C67D4A10`,
          }}
          animate={{
            y: [0, -60, -20, -80, 0],
            x: [0, 30, -20, 40, 0],
            opacity: [0, 0.5, 0.2, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Home Page ---------- */

export default function Home() {
  return (
    <div className="relative bg-cream">
      <Nav />
      <FloatingFireflies />

      <main>
        <Hero />
        <WaveVineDivider />
        <About />
        <DotVineDivider />
        <FeaturedProjects />
        <LeafClusterDivider />
        <Skills />
        <WaveVineDivider />
        <Experience />
        <DotVineDivider />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
