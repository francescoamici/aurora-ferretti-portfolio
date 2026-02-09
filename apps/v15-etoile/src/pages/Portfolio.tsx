import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
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
  const isInView = useInView(headerRef, { once: true });

  // Extract unique categories
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => p.categories.forEach((c) => cats.add(c)));
    return Array.from(cats);
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />

      {/* Header */}
      <div ref={headerRef} className="pt-28 md:pt-36 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.2em] text-gray hover:text-noir transition-colors"
            >
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-gold">
                <line x1="16" y1="4" x2="2" y2="4" stroke="currentColor" strokeWidth="0.5" />
                <path d="M5 1L2 4l3 3" stroke="currentColor" strokeWidth="0.5" fill="none" />
              </svg>
              {t('nav.backToHome')}
            </Link>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl text-noir mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('sections.allProjects')}
          </motion.h1>

          {/* Gold accent line */}
          <motion.div
            className="w-16 h-px bg-gold/50 mt-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />

          {/* Filters */}
          <motion.div
            className="mt-10 md:mt-14 flex flex-wrap items-center gap-x-6 gap-y-3"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={() => setActiveFilter('all')}
              className={`relative font-body text-[10px] uppercase tracking-[0.2em] pb-1.5 transition-colors duration-300 ${
                activeFilter === 'all' ? 'text-noir' : 'text-gray hover:text-noir/70'
              }`}
            >
              {t('categories.all')}
              {activeFilter === 'all' && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                  layoutId="filter-underline"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>

            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative font-body text-[10px] uppercase tracking-[0.2em] pb-1.5 transition-colors duration-300 ${
                  activeFilter === cat ? 'text-noir' : 'text-gray hover:text-noir/70'
                }`}
              >
                {cat}
                {activeFilter === cat && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                    layoutId="filter-underline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Project grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-24 md:pb-36">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-body text-sm text-gray">No projects found in this category.</p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
