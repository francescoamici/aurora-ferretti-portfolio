import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@auror/data';
import { useTranslation } from '@auror/i18n';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
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
      transition={{ duration: 1 }}
      className="relative min-h-screen bg-white"
    >
      <Nav />

      {/* Header */}
      <div className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="font-display text-charcoal"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            {t('sections.allProjects')}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-px bg-silver mt-8 origin-left"
          />
        </div>
      </div>

      {/* Filter — minimal text links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="max-w-5xl mx-auto px-6 md:px-12 mb-16"
      >
        <div className="flex flex-wrap items-center gap-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative font-body text-[11px] tracking-[0.15em] uppercase transition-all duration-500 pb-1 ${
                activeCategory === cat
                  ? 'text-charcoal'
                  : 'text-dove hover:text-charcoal-light'
              }`}
            >
              {cat === 'All' ? t('categories.all') : cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="filter-underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-rose"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects grid */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 pb-24 md:pb-36">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14"
          >
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center font-accent italic text-dove text-lg mt-20"
          >
            No projects in this category yet.
          </motion.p>
        )}
      </div>

      <Footer />
    </motion.main>
  );
}
