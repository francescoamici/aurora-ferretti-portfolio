import { motion } from 'framer-motion';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedProjects from '../components/FeaturedProjects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function GoldDivider() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10">
      <motion.div
        className="w-full h-px bg-gold/15"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'center' }}
      />
    </div>
  );
}

function MarqueeBand({ text, reverse = false }: { text: string; reverse?: boolean }) {
  const repeatedText = `${text} \u2014 `.repeat(8);

  return (
    <div className="overflow-hidden whitespace-nowrap py-4 md:py-6">
      <motion.div
        className="inline-flex"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 40,
            ease: 'linear',
          },
        }}
      >
        <span className="inline-flex">
          <span className="font-accent text-[10px] uppercase tracking-[0.4em] text-noir/[0.06] whitespace-nowrap">
            {repeatedText}
          </span>
        </span>
        <span className="inline-flex">
          <span className="font-accent text-[10px] uppercase tracking-[0.4em] text-noir/[0.06] whitespace-nowrap">
            {repeatedText}
          </span>
        </span>
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-ivory">
      <Nav />

      {/* Hero - full viewport */}
      <Hero />

      {/* About section */}
      <About />

      {/* Decorative marquee band */}
      <MarqueeBand text="Art Direction \u2022 Visual Design \u2022 Illustration \u2022 Brand Identity \u2022 Editorial" />

      {/* Featured projects */}
      <FeaturedProjects />

      {/* Gold divider */}
      <GoldDivider />

      {/* Skills */}
      <Skills />

      {/* Decorative marquee band reversed */}
      <MarqueeBand
        text="Roma \u2022 Creativity \u2022 Design \u2022 Innovation \u2022 Beauty \u2022 Strategy"
        reverse
      />

      {/* Experience */}
      <Experience />

      {/* Gold divider */}
      <GoldDivider />

      {/* Contact - noir section for dramatic contrast */}
      <Contact />

      {/* Footer - back to ivory */}
      <Footer />
    </div>
  );
}
