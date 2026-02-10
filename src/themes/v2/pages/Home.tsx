import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedProjects from '../components/FeaturedProjects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />

      <div className="py-16" aria-hidden="true" />

      <About />

      <div className="py-16" aria-hidden="true" />

      <FeaturedProjects />

      <div className="py-16" aria-hidden="true" />

      <Skills />

      <div className="py-16" aria-hidden="true" />

      <Experience />

      <div className="py-16" aria-hidden="true" />

      <Contact />
    </main>
  );
}
