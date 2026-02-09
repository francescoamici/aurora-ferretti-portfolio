import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@auror/data';
import { useTranslation } from '@auror/i18n';
import Nav from '../components/Nav';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';

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
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-cream"
    >
      <Nav />

      {/* Header section */}
      <div className="pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-5"
          >
            <h1 className="font-display text-3xl md:text-5xl text-espresso tracking-wide">
              {t('sections.allProjects')}
            </h1>
            <div className="flex-1 h-px bg-gradient-to-r from-gold/40 to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Tab-style category filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-6xl mx-auto px-6 md:px-10 mb-12"
      >
        <div className="flex flex-wrap items-center gap-4 md:gap-6 border-b border-taupe/15 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative font-body text-xs font-medium uppercase tracking-[0.12em] pb-4 -mb-4 transition-colors duration-400 ${
                activeCategory === cat
                  ? 'text-sienna'
                  : 'text-espresso/40 hover:text-espresso/70'
              }`}
            >
              {cat === 'All' ? t('categories.all') : cat}

              {activeCategory === cat && (
                <motion.div
                  layoutId="portfolio-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-sienna rounded-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-24 md:pb-36">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
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
            transition={{ duration: 0.6 }}
            className="text-center font-accent italic text-taupe text-lg mt-20"
          >
            {t('categories.all')}
          </motion.p>
        )}
      </div>

      <Footer />
    </motion.main>
  );
}
