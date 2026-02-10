import { useState, useMemo } from 'react';
import { useTranslation } from '@auror/i18n';
import { projects } from '@auror/data';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';

export default function Portfolio() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  // Collect all unique categories
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach(p => p.categories.forEach(c => cats.add(c)));
    return ['all', ...Array.from(cats)];
  }, []);

  // Filter projects
  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.categories.includes(activeCategory));

  return (
    <section className="min-h-screen bg-raw-white">
      {/* PAGE HEADER */}
      <div className="border-b-[8px] border-harsh-black px-4 md:px-8 py-8 md:py-16">
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="font-display uppercase leading-[0.85]"
          style={{ fontSize: 'clamp(60px, 15vw, 180px)' }}
        >
          {t('sections.allProjects')}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: 0.05 }}
          className="font-mono text-sm mt-4 text-blue font-bold"
        >
          [{filtered.length} {filtered.length === 1 ? 'PROJECT' : 'PROJECTS'}]
        </motion.div>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="border-b-[4px] border-harsh-black px-4 md:px-8 py-4 flex flex-wrap gap-2">
        {allCategories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.05 }}
            className={`
              font-mono text-xs uppercase tracking-[0.15em] px-4 py-2
              border-[4px] border-harsh-black
              transition-none
              ${activeCategory === cat
                ? 'bg-blue text-raw-white hard-shadow-sm'
                : 'bg-raw-white text-harsh-black hover:bg-harsh-black hover:text-raw-white'
              }
            `}
          >
            {cat === 'all' ? t('categories.all') : cat}
          </motion.button>
        ))}
      </div>

      {/* PROJECTS GRID - intentionally misaligned */}
      <div className="px-4 md:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`
                ${i % 3 === 1 ? 'md:mt-12' : ''}
                ${i % 3 === 2 ? 'md:-mt-6' : ''}
              `}
            >
              <ProjectCard
                project={project}
                index={i}
                size={i % 3 === 0 ? 'large' : 'small'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <div className="px-4 md:px-8 py-24 text-center">
          <div className="font-heading text-3xl uppercase">NO PROJECTS FOUND</div>
          <div className="font-mono text-sm mt-4 text-blue">
            TRY ANOTHER CATEGORY
          </div>
        </div>
      )}
    </section>
  );
}
