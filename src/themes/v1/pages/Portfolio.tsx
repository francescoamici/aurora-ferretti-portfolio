import { useState, useMemo } from 'react';
import { ThemeLink as Link } from '@auror/shared-ui';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects } from '@auror/data';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';

export default function Portfolio() {
  const { t } = useTranslation();
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="min-h-screen bg-nero"
    >
      {/* Header */}
      <div className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-6xl">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm tracking-wider text-gold/60 transition-colors hover:text-gold"
            >
              <span>&#8592;</span>
              <span>{t('nav.backToHome')}</span>
            </Link>
          </motion.div>

          {/* Title */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <p className="mb-3 text-xs tracking-[0.4em] text-gold/60 uppercase">
              {t('sections.allProjects')}
            </p>
            <h1 className="font-display text-5xl font-bold text-ivory md:text-6xl">
              {t('nav.portfolio')}
            </h1>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            className="mt-12 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-full border px-5 py-2 text-xs tracking-wider uppercase transition-all duration-300 ${
                  activeFilter === cat
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-gold-dim text-ivory/50 hover:border-gold/40 hover:text-ivory'
                }`}
              >
                {cat === 'all' ? t('categories.all') : cat}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Projects grid */}
      <div className="px-6 pb-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            layout
          >
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <motion.p
              className="py-20 text-center font-accent text-xl text-ivory/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No projects found in this category.
            </motion.p>
          )}
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}
