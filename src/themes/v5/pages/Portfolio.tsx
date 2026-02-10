import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@auror/data';
import { useTranslation } from '@auror/i18n';
import ProjectCard from '../components/ProjectCard';

export default function Portfolio() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Collect all unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => p.categories.forEach((c) => cats.add(c)));
    return ['all', ...Array.from(cats)];
  }, []);

  // Filter projects
  const filtered = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-6">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg animate-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[0.15em] uppercase text-cyan neon-cyan">
            PORTFOLIO<span className="text-magenta neon-magenta">_</span>
          </h1>
          <div className="mt-2 font-mono text-xs text-white/30">
            {'> '}projects.list({`{count: ${projects.length}}`})
          </div>
        </motion.div>

        {/* Terminal-style filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12 glass rounded-lg p-4 md:p-6 neon-border-cyan"
        >
          <div className="font-mono text-xs text-white/30 mb-3">
            {'> '}filter --category=
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`font-mono text-[11px] px-3 py-1.5 rounded border transition-all duration-300 ${
                  activeFilter === cat
                    ? 'border-cyan/60 text-cyan bg-cyan/10 neon-border-cyan'
                    : 'border-white/10 text-white/40 hover:border-cyan/30 hover:text-cyan/70'
                }`}
              >
                {cat === 'all' ? (
                  <>
                    <span className="text-green">{`"*"`}</span>
                  </>
                ) : (
                  <>
                    <span className="text-magenta">{`"`}</span>
                    {cat}
                    <span className="text-magenta">{`"`}</span>
                  </>
                )}
              </button>
            ))}
          </div>
          <div className="mt-3 font-mono text-[10px] text-white/20">
            {'// '}results: {filtered.length} projects found
          </div>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 font-mono text-sm text-white/30"
          >
            {'> '}ERROR: no projects match filter
            <br />
            {'> '}try: filter --category="*"
          </motion.div>
        )}
      </div>
    </main>
  );
}
