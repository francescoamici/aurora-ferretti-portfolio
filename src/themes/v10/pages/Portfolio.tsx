import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@auror/data';
import { useTranslation } from '@auror/i18n';
import ProjectCard from '../components/ProjectCard';

export default function Portfolio() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const allCats = projects.flatMap((p) => p.categories);
    return ['All', ...Array.from(new Set(allCats))];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.categories.includes(activeCategory));
  }, [activeCategory]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative min-h-screen bg-film-black"
    >
      {/* Film grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 film-grain" />

      {/* Header section */}
      <div className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="font-display text-gold tracking-[0.2em] uppercase"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
          >
            The Complete Works
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="gold-rule max-w-xs mx-auto mt-8"
          />
        </div>
      </div>

      {/* Genre filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="max-w-5xl mx-auto px-6 md:px-12 mb-16"
      >
        <div className="flex flex-wrap items-center gap-4 justify-center">
          <span className="font-mono text-[10px] tracking-[0.25em] text-warm-white/30 uppercase">
            Genre:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-500 pb-0.5 ${
                activeCategory === cat
                  ? 'text-gold border-b border-gold/60'
                  : 'text-warm-white/40 hover:text-warm-white/70 border-b border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects grid */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 pb-24 md:pb-36">
        <div className="space-y-16 md:space-y-24">
          {filteredProjects.map((project, i) => (
            <div key={project.id}>
              <ProjectCard project={project} index={i} />
              {i < filteredProjects.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  className="mt-16 md:mt-24 gold-rule"
                />
              )}
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center font-body italic text-warm-white/40 text-lg mt-20"
          >
            No films in this genre yet.
          </motion.p>
        )}
      </div>
    </motion.main>
  );
}
