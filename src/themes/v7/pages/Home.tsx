import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedProjects from '../components/FeaturedProjects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />

      {/* Transition speed line between Hero and About */}
      <div className="relative h-20 bg-prussian overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red/20 to-transparent" />
        <div className="absolute top-1/2 left-[10%] w-[30%] h-[1px] bg-gradient-to-r from-orange/15 to-transparent translate-y-2" />
      </div>

      <About />

      {/* Diagonal transition */}
      <div className="relative h-4 bg-prussian overflow-hidden">
        <div className="absolute inset-0 racing-stripe opacity-10" style={{ clipPath: 'polygon(0 0, 100% 50%, 100% 100%, 0 50%)' }} />
      </div>

      <FeaturedProjects />

      {/* Speed transition */}
      <div className="relative h-16 bg-prussian overflow-hidden">
        <div className="absolute top-4 left-0 w-[60%] h-[1px] bg-gradient-to-r from-red/15 to-transparent" />
        <div className="absolute top-6 left-0 w-[40%] h-[1px] bg-gradient-to-r from-orange/10 to-transparent" />
        <div className="absolute bottom-4 right-0 w-[50%] h-[1px] bg-gradient-to-l from-red/10 to-transparent" />
      </div>

      <Skills />

      {/* Diagonal transition */}
      <div className="relative h-4 bg-prussian overflow-hidden">
        <div className="absolute inset-0 racing-stripe opacity-10" style={{ clipPath: 'polygon(0 50%, 100% 0, 100% 50%, 0 100%)' }} />
      </div>

      <Experience />

      {/* Speed transition */}
      <div className="relative h-16 bg-prussian overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red/15 to-transparent" />
      </div>

      <Contact />
    </motion.main>
  );
}
