import { motion } from 'framer-motion';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedProjects from '../components/FeaturedProjects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

/* Botanical section divider */
function SectionDivider({ variant = 1 }: { variant?: number }) {
  if (variant === 1) {
    return (
      <div className="flex justify-center py-4">
        <svg width="300" height="40" viewBox="0 0 300 40" fill="none" className="text-forest/10 w-48 md:w-72">
          <path
            d="M0 20 C30 10, 60 30, 90 20 C120 10, 150 30, 180 20 C210 10, 240 30, 270 20 C285 14, 295 18, 300 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Small leaves along the wave */}
          <path d="M60 20 C57 14, 52 12, 50 16 C48 20, 54 22, 60 20Z" fill="currentColor" opacity="0.5" />
          <path d="M150 20 C153 14, 158 12, 160 16 C162 20, 156 22, 150 20Z" fill="currentColor" opacity="0.5" />
          <path d="M240 20 C237 14, 232 12, 230 16 C228 20, 234 22, 240 20Z" fill="currentColor" opacity="0.5" />
        </svg>
      </div>
    );
  }

  if (variant === 2) {
    return (
      <div className="flex justify-center py-4">
        <svg width="200" height="50" viewBox="0 0 200 50" fill="none" className="text-forest/10 w-40 md:w-52">
          <path
            d="M20 25 L90 25"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <path
            d="M110 25 L180 25"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          {/* Center ornament */}
          <circle cx="100" cy="25" r="5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <circle cx="100" cy="25" r="2" fill="currentColor" opacity="0.4" />
          {/* End dots */}
          <circle cx="20" cy="25" r="2" fill="currentColor" opacity="0.3" />
          <circle cx="180" cy="25" r="2" fill="currentColor" opacity="0.3" />
          {/* Leaf accents */}
          <path d="M50 25 C48 20, 44 18, 42 22 C40 26, 46 27, 50 25Z" fill="currentColor" opacity="0.3" />
          <path d="M150 25 C152 20, 156 18, 158 22 C160 26, 154 27, 150 25Z" fill="currentColor" opacity="0.3" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-4">
      <svg width="160" height="40" viewBox="0 0 160 40" fill="none" className="text-forest/10 w-32 md:w-40">
        <path
          d="M30 20 L130 20"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="4 6"
        />
        {/* Three leaves cluster at center */}
        <path d="M80 20 C75 13, 68 11, 66 16 C64 21, 72 23, 80 20Z" fill="currentColor" opacity="0.4" />
        <path d="M80 20 C85 13, 92 11, 94 16 C96 21, 88 23, 80 20Z" fill="currentColor" opacity="0.4" />
        <path d="M80 20 C77 12, 76 5, 80 4 C84 3, 83 12, 80 20Z" fill="currentColor" opacity="0.3" />
      </svg>
    </div>
  );
}

/* Floating fireflies for the whole page */
function PageFirefly({ delay, duration }: { delay: number; duration: number }) {
  const randomX = Math.random() * 100;
  const randomY = 20 + Math.random() * 60;

  return (
    <motion.div
      className="fixed pointer-events-none z-0"
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(198,125,74,0.4) 0%, transparent 70%)',
      }}
      animate={{
        x: [0, 30, -20, 15, -10, 0],
        y: [0, -40, 20, -30, 15, 0],
        opacity: [0, 0.6, 0.2, 0.8, 0.3, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}

const pageFireflies = Array.from({ length: 8 }, (_, i) => ({
  delay: i * 1.8,
  duration: 10 + Math.random() * 6,
}));

export default function Home() {
  return (
    <div className="relative bg-cream min-h-screen">
      {/* Page-level floating fireflies */}
      {pageFireflies.map((f, i) => (
        <PageFirefly key={i} {...f} />
      ))}

      <Nav />

      <main className="relative z-10">
        <Hero />

        <SectionDivider variant={1} />
        <About />

        <SectionDivider variant={2} />
        <FeaturedProjects />

        <SectionDivider variant={3} />
        <Skills />

        <SectionDivider variant={1} />
        <Experience />

        <SectionDivider variant={2} />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
