import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@auror/data';
import { useTranslation } from '@auror/i18n';
import ProjectCard from '../components/ProjectCard';

export default function Portfolio() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');

  // Derive unique categories from all projects
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => p.categories.forEach((c) => cats.add(c)));
    return Array.from(cats);
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) =>
      p.categories.some((c) => c === activeFilter)
    );
  }, [activeFilter]);

  return (
    <main className="min-h-screen pt-32 pb-40 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-16"
        >
          {t('sections.allProjects')}
        </motion.h1>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-6 mb-20"
        >
          <button
            onClick={() => setActiveFilter('all')}
            className={`font-body text-sm transition-all duration-300 pb-1 border-b-2 ${
              activeFilter === 'all'
                ? 'text-black border-red'
                : 'text-black/30 border-transparent hover:text-black/60'
            }`}
          >
            {t('categories.all')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`font-body text-sm transition-all duration-300 pb-1 border-b-2 ${
                activeFilter === cat
                  ? 'text-black border-red'
                  : 'text-black/30 border-transparent hover:text-black/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project list */}
        <div>
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              layout
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
