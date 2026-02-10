import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@auror/data';
import { useTranslation } from '@auror/i18n';
import ProjectCard from '../components/ProjectCard';

export default function Portfolio() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  /* Extract unique categories from all projects */
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => p.categories.forEach((c) => cats.add(c)));
    return ['all', ...Array.from(cats)];
  }, []);

  /* Filter projects by category */
  const filtered = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.categories.includes(activeCategory));
  }, [activeCategory]);

  return (
    <div className="grid-overlay baseline-grid pt-[64px]">
      <div className="mx-auto max-w-[1200px] px-[24px] py-[80px]">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between mb-[48px]"
        >
          <div className="flex items-center gap-[12px]">
            <span className="red-square" />
            <span className="section-label">{t('sections.allProjects')}</span>
          </div>
          <span className="font-mono text-[11px] text-gray uppercase tracking-[1px]">
            {filtered.length} Projects
          </span>
        </motion.div>

        {/* Category filters — plain text tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-wrap gap-[24px] mb-[48px] border-b border-light-gray pb-[16px]"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative font-mono text-[11px] uppercase tracking-[1px] pb-[4px] bg-transparent border-0 cursor-pointer transition-colors duration-200 ${
                activeCategory === cat ? 'text-black' : 'text-gray hover:text-black'
              }`}
            >
              {cat === 'all' ? t('categories.all') : cat}
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red" />
              )}
            </button>
          ))}
        </motion.div>

        {/* Project grid — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
