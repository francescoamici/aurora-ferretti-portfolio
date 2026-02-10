import Hero from '../components/Hero';
import About from '../components/About';
import FeaturedProjects from '../components/FeaturedProjects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

function NeonDivider() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="neon-divider" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative">
      {/* Persistent grid background */}
      <div className="fixed inset-0 grid-bg animate-grid opacity-20 pointer-events-none" />

      <Hero />
      <NeonDivider />
      <About />
      <NeonDivider />
      <FeaturedProjects />
      <NeonDivider />
      <Skills />
      <NeonDivider />
      <Experience />
      <NeonDivider />
      <Contact />
    </main>
  );
}
