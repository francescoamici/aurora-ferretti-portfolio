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
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-7xl px-6 md:px-10"
    >
      <div className="h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
    </motion.div>
  );
}

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-cream"
    >
      <Nav />

      <main>
        <Hero />

        <GoldDivider />

        <About />

        <GoldDivider />

        <FeaturedProjects />

        <GoldDivider />

        <Skills />

        <GoldDivider />

        <Experience />

        <GoldDivider />

        <Contact />
      </main>

      <Footer />
    </motion.div>
  );
}
