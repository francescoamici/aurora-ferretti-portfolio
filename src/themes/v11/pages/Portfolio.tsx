import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects } from '@auror/data';
import Nav from '../components/Nav';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';

export default function Portfolio() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  // Extract unique categories from all projects
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => p.categories.forEach((c) => cats.add(c)));
    return Array.from(cats);
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-cream"
    >
      <Nav />

      <main className="pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          {/* Page header */}
          <div ref={headerRef} className="mb-16 md:mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-accent text-xs tracking-[0.3em] uppercase text-gold block mb-4"
            >
              Portfolio
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-charcoal leading-none"
            >
              {t('sections.allProjects')}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={isHeaderInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-20 h-px bg-gold mt-8 origin-left"
            />
          </div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 md:mb-16 flex flex-wrap gap-4 md:gap-6"
          >
            <button
              onClick={() => setActiveFilter('all')}
              className={`relative font-accent text-sm md:text-base tracking-wider pb-1 transition-colors duration-300 ${
                activeFilter === 'all' ? 'text-charcoal' : 'text-charcoal-light/50 hover:text-charcoal-light'
              }`}
            >
              {t('categories.all')}
              <span
                className={`absolute bottom-0 left-0 h-px bg-gold transition-all duration-300 ${
                  activeFilter === 'all' ? 'w-full' : 'w-0'
                }`}
              />
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative font-accent text-sm md:text-base tracking-wider pb-1 transition-colors duration-300 ${
                  activeFilter === cat ? 'text-charcoal' : 'text-charcoal-light/50 hover:text-charcoal-light'
                }`}
              >
                {cat}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-gold transition-all duration-300 ${
                    activeFilter === cat ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            ))}
          </motion.div>

          {/* Masonry-style grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8"
            >
              {filteredProjects.map((project, i) => (
                <div key={project.id} className="break-inside-avoid">
                  <ProjectCard
                    project={project}
                    index={i}
                    large={i % 3 === 0}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="font-accent text-lg text-charcoal-light/50 tracking-wider">
                No projects found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
