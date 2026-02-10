import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects } from '@auror/data';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';

export default function Portfolio() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  // Extract unique categories from all projects
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => p.categories.forEach((c) => cats.add(c)));
    return Array.from(cats);
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.categories.includes(activeCategory));
  }, [activeCategory]);

  return (
    <div className="bg-cream min-h-screen">
      <Nav />

      <main className="pt-28 pb-24">
        <div className="mx-auto max-w-6xl px-6">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl md:text-6xl text-forest font-light">
              {t('sections.allProjects')}
            </h1>

            {/* Botanical divider */}
            <svg
              className="mx-auto mt-6 text-forest/20"
              width="180"
              height="30"
              viewBox="0 0 180 30"
              fill="none"
            >
              <line x1="30" y1="15" x2="75" y2="15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <line x1="105" y1="15" x2="150" y2="15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              <circle cx="90" cy="15" r="4" fill="currentColor" opacity="0.3" />
              <path d="M90 15 C85 9, 78 7, 76 12 C74 17, 82 19, 90 15Z" fill="currentColor" opacity="0.4" />
              <path d="M90 15 C95 9, 102 7, 104 12 C106 17, 98 19, 90 15Z" fill="currentColor" opacity="0.4" />
            </svg>

            <p className="font-hand text-xl text-terra/60 mt-4">
              {t('skillCategories.design') === 'Design'
                ? `${projects.length} projects cultivated with care`
                : `${projects.length} progetti coltivati con cura`}
            </p>
          </motion.div>

          {/* Category filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            <button
              onClick={() => setActiveCategory('all')}
              className={`font-body text-sm font-medium px-5 py-2.5 rounded-full border transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-forest text-cream border-forest shadow-[0_2px_12px_rgba(45,80,22,0.25)]'
                  : 'bg-transparent text-forest/60 border-forest/20 hover:border-forest/40 hover:text-forest'
              }`}
            >
              {t('categories.all')}
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-body text-sm font-medium px-5 py-2.5 rounded-full border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-forest text-cream border-forest shadow-[0_2px_12px_rgba(45,80,22,0.25)]'
                    : 'bg-transparent text-forest/60 border-forest/20 hover:border-forest/40 hover:text-forest'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Masonry grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-1 md:columns-2 lg:columns-2 gap-6 md:gap-8 space-y-6 md:space-y-8"
            >
              {filtered.map((project, i) => (
                <div key={project.id} className="break-inside-avoid">
                  <ProjectCard project={project} index={i} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-hand text-2xl text-forest/40">
                {t('skillCategories.design') === 'Design'
                  ? 'No projects in this garden yet...'
                  : 'Nessun progetto in questo giardino...'}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
