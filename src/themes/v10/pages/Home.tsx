import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedProjects from '../components/FeaturedProjects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

function SceneDivider() {
  return (
    <div className="scene-divider h-24 md:h-32" />
  );
}

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative"
    >
      {/* Film grain overlay on entire page */}
      <div className="fixed inset-0 pointer-events-none z-50 film-grain" />

      {/* Opening — Fade from black */}
      <Hero />

      {/* Transition to Act I */}
      <SceneDivider />

      {/* ACT I — About the Director */}
      <About />

      {/* Transition to Act II */}
      <SceneDivider />

      {/* ACT II — Selected Works */}
      <FeaturedProjects />

      {/* Transition to Act III */}
      <SceneDivider />

      {/* ACT III — Skills & Experience */}
      <section className="relative bg-film-black py-24 md:py-36 film-grain">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          {/* ACT III chapter marker */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.5 }}
            className="flex items-center gap-6 mb-20"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/40" />
            <h2 className="font-display text-gold text-xs md:text-sm tracking-[0.4em] uppercase text-center whitespace-nowrap">
              Act III &mdash; Craft &amp; Mastery
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/40" />
          </motion.div>

          <Skills />
          <Experience />
        </div>
      </section>

      {/* Transition to Epilogue */}
      <SceneDivider />

      {/* EPILOGUE — Contact */}
      <Contact />
    </motion.main>
  );
}
