import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects } from '@auror/data';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';

const filterColors = ['#4361EE', '#FFB4C8', '#FFE66D', '#FF6B6B', '#95E1D3', '#FFB4C8', '#4361EE', '#FF6B6B'];

export default function Portfolio() {
  const { t } = useTranslation('common');
  const [activeFilter, setActiveFilter] = useState('all');

  // Collect unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => p.categories.forEach((c) => cats.add(c)));
    return ['all', ...Array.from(cats)];
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        {/* Page title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 150 }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl">
            <span className="text-blue">{t('sections.allProjects')}</span>
            <motion.span
              className="text-coral"
              animate={{ rotate: [0, 12, -12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              !
            </motion.span>
          </h1>

          {/* Decorative dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {['#FFB4C8', '#FFE66D', '#4361EE', '#FF6B6B', '#95E1D3'].map((c, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: c }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.12 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          {categories.map((cat, i) => {
            const isActive = activeFilter === cat;
            const color = filterColors[i % filterColors.length];

            return (
              <motion.button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="font-display text-xs md:text-sm uppercase px-4 md:px-5 py-2 md:py-2.5 rounded-xl transition-all"
                style={{
                  backgroundColor: isActive ? color : 'transparent',
                  color: isActive
                    ? color === '#FFE66D'
                      ? '#1A1A2E'
                      : '#FFFFFF'
                    : color,
                  border: `3px solid ${color}`,
                  transform: `rotate(${isActive ? 0 : (i % 3 - 1) * 2}deg)`,
                  boxShadow: isActive ? `3px 3px 0px #1A1A2E` : 'none',
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: 0,
                  y: -3,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {cat === 'all' ? t('categories.all') : cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Memphis pattern background section */}
        <div className="relative">
          {/* Subtle background dots */}
          <div className="absolute inset-0 memphis-bg-subtle rounded-3xl -m-4 p-4 -z-10" />

          {/* Project grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            layout
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{ transform: `rotate(${((i * 3) % 7 - 3) * 0.8}deg)` }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="font-fun text-2xl text-coral">No projects found!</p>
            <p className="font-body text-dark/50 mt-2">Try a different filter</p>
          </motion.div>
        )}

        {/* Bottom decoration */}
        <div className="flex items-center justify-center gap-3 mt-16">
          {['#FFB4C8', '#FFE66D', '#4361EE', '#FF6B6B', '#95E1D3'].map((c, i) => (
            <motion.div
              key={i}
              className={i % 2 === 0 ? 'w-4 h-4 rounded-full' : 'w-3 h-3 rotate-45'}
              style={{ backgroundColor: c }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
