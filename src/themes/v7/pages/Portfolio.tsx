import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects } from '@auror/data';
import ProjectCard from '../components/ProjectCard';

export default function Portfolio() {
  const { t, i18n } = useTranslation('common');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [activeFilter, setActiveFilter] = useState('all');

  // Extract unique categories
  const allCategories = Array.from(
    new Set(projects.flatMap((p) => p.categories))
  ).sort();

  const filters = ['all', ...allCategories];

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter));

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="pt-24 pb-32 min-h-screen"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Page header */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div style={{ transform: 'rotate(-4deg)', transformOrigin: 'left center' }}>
            <h1 className="font-big font-800 text-8xl sm:text-9xl lg:text-[10rem] uppercase tracking-tight text-white/5">
              {i18n.language === 'it' ? 'TUTTI' : 'ALL'}
            </h1>
          </div>
          <div className="flex items-center gap-4 -mt-8 sm:-mt-10">
            <div className="w-20 h-[3px] racing-stripe" />
            <span className="font-display text-2xl sm:text-3xl tracking-[0.3em] uppercase text-white">
              {t('sections.allProjects')}
            </span>
          </div>

          {/* Speed accent */}
          <div className="flex items-center gap-2 mt-4 ml-24">
            <div className="w-12 h-[1px] bg-red/40" />
            <span className="font-body text-sm tracking-[0.15em] text-white/30">
              {filtered.length} {i18n.language === 'it' ? 'progetti' : 'projects'}
            </span>
          </div>
        </motion.div>

        {/* GEAR selector - filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-red font-big font-700 text-xl">/</span>
            <span className="font-display text-sm tracking-[0.3em] uppercase text-orange/60">
              {i18n.language === 'it' ? 'MARCE' : 'GEARS'}
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative font-display text-xs sm:text-sm tracking-[0.2em] uppercase px-4 py-2 transition-all duration-150 ${
                  activeFilter === filter
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {/* Racing stripe active state */}
                {activeFilter === filter && (
                  <motion.div
                    layoutId="gear-active"
                    className="absolute inset-0 border border-red/40"
                    style={{ clipPath: 'polygon(4% 0, 100% 0, 96% 100%, 0 100%)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] racing-stripe" />
                  </motion.div>
                )}
                <span className="relative z-10">
                  {filter === 'all'
                    ? t('categories.all')
                    : filter}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project grid - diagonal cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                style={{
                  marginLeft: `${index % 3 === 0 ? 0 : index % 3 === 1 ? 6 : 3}%`,
                  marginRight: `${index % 3 === 0 ? 6 : index % 3 === 1 ? 0 : 3}%`,
                }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-xl tracking-[0.2em] text-white/30 uppercase">
              {i18n.language === 'it' ? 'Nessun progetto trovato' : 'No projects found'}
            </p>
          </div>
        )}
      </div>
    </motion.main>
  );
}
