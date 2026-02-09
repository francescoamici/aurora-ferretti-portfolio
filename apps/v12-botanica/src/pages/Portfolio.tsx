import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects } from '@auror/data';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';

/* ---------- Botanical SVG Divider ---------- */

function PortfolioDivider() {
  return (
    <svg
      className="mx-auto mb-10 h-6 w-48 text-sage/20"
      viewBox="0 0 192 24"
      fill="none"
    >
      {/* Horizontal vine */}
      <path
        d="M0 12C32 6 64 18 96 12C128 6 160 18 192 12"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      {/* Center dot cluster */}
      <circle cx="96" cy="12" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="48" cy="10" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="144" cy="10" r="1.5" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

/* ---------- Portfolio Page ---------- */

export default function Portfolio() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => p.categories.forEach((c) => cats.add(c)));
    return ['all', ...Array.from(cats)];
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.categories.includes(activeCategory));
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-cream">
      <Nav />

      {/* Header */}
      <div ref={headerRef} className="pt-32 pb-8">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Back link */}
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-earth/50 transition-colors hover:text-sage"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 12L6 8L10 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t('nav.backToHome')}
            </Link>

            <h1 className="font-display text-4xl font-medium tracking-tight text-earth sm:text-5xl lg:text-6xl">
              {t('sections.allProjects')}
            </h1>

            <p className="mt-3 font-hand text-lg text-earth/40">
              {projects.length} {t('nav.projects').toLowerCase()}
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={headerInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <PortfolioDivider />
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 15 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {categories.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-sage text-cream-light shadow-[0_2px_8px_rgba(122,155,109,0.2)]'
                      : 'bg-sage-light text-earth/60 hover:bg-sage/15 hover:text-earth'
                  }`}
                >
                  {cat === 'all' ? t('categories.all') : cat}
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="columns-1 gap-6 md:columns-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.p
            className="py-20 text-center font-hand text-xl text-earth/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Nessun progetto in questa categoria
          </motion.p>
        )}
      </div>

      <Footer />
    </div>
  );
}
