import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedProjects from '../components/FeaturedProjects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="grid-overlay baseline-grid">
      <Hero />
      <About />
      <FeaturedProjects />
      <Skills />
      <Experience />
      <Contact />
    </div>
  );
}
