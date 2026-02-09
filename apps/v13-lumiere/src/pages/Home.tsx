import { motion } from 'framer-motion';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedProjects from '../components/FeaturedProjects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function SilverDivider() {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12">
      <div className="h-px bg-silver" />
    </div>
  );
}

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative bg-white"
    >
      <Nav />

      <Hero />

      <SilverDivider />

      <About />

      <SilverDivider />

      <FeaturedProjects />

      <SilverDivider />

      <Skills />

      <SilverDivider />

      <Experience />

      <SilverDivider />

      <Contact />

      <Footer />
    </motion.main>
  );
}
