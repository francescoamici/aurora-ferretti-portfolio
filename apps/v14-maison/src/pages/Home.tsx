import { motion } from 'framer-motion';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedProjects from '../components/FeaturedProjects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

/** Warm ornamental divider with diamond center */
function WarmDivider() {
  return (
    <div className="py-4 md:py-6">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-center gap-3">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/20" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold/30" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/20" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative bg-cream"
    >
      <Nav />

      {/* Hero */}
      <Hero />

      {/* Divider */}
      <WarmDivider />

      {/* About */}
      <About />

      {/* Divider */}
      <WarmDivider />

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* Divider */}
      <WarmDivider />

      {/* Skills */}
      <Skills />

      {/* Divider */}
      <WarmDivider />

      {/* Experience & Education */}
      <Experience />

      {/* Divider */}
      <WarmDivider />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </motion.main>
  );
}
