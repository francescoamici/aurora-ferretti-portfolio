import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects } from '@auror/data';
import Nav from '../components/Nav';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';
import OrnamentalDivider from '../components/OrnamentalDivider';

function toRomanNumeral(n: number): string {
  const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  return numerals[n - 1] || String(n);
}

export default function Portfolio() {
  const { t, i18n } = useTranslation();
  const { t: tProjects } = useTranslation('projects');
  const lang = i18n.language?.startsWith('it') ? 'it' : 'en';

  const [activeFilter, setActiveFilter] = useState<string>('all');

  const sezioniLabel = lang === 'it' ? 'Sezioni' : 'Sections';
  const allLabel = t('categories.all');
  const portfolioLabel = lang === 'it' ? 'Portfolio' : 'Portfolio';
  const worksLabel = lang === 'it' ? 'Opere Selezionate' : 'Selected Works';

  // Get unique categories from all projects
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

  const heroProject = filteredProjects[0];
  const gridProjects = filteredProjects.slice(1);

  return (
    <div className="bg-parchment min-h-screen">
      <Nav />

      <main className="pt-32 md:pt-40">
        {/* Page header */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="font-display italic text-brown text-4xl md:text-5xl lg:text-6xl mb-4"
          >
            {portfolioLabel}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-caps text-[0.65rem] tracking-[0.25em] uppercase text-brown/40 small-caps"
          >
            {worksLabel}
          </motion.p>
        </div>

        <OrnamentalDivider className="mb-12" />

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-5xl mx-auto px-6 md:px-12 mb-16"
        >
          <p className="font-caps text-[0.6rem] tracking-[0.25em] uppercase text-brown/40 small-caps text-center mb-6">
            {sezioniLabel}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <button
              onClick={() => setActiveFilter('all')}
              className={`font-caps text-[0.6rem] tracking-[0.15em] uppercase small-caps transition-colors duration-500 pb-0.5 ${
                activeFilter === 'all'
                  ? 'text-terracotta border-b border-terracotta/50'
                  : 'text-brown/40 hover:text-terracotta border-b border-transparent'
              }`}
            >
              {allLabel}
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`font-caps text-[0.6rem] tracking-[0.15em] uppercase small-caps transition-colors duration-500 pb-0.5 ${
                  activeFilter === cat
                    ? 'text-terracotta border-b border-terracotta/50'
                    : 'text-brown/40 hover:text-terracotta border-b border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects grid */}
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero project - full width */}
              {heroProject && (
                <div className="mb-16">
                  <ProjectCard project={heroProject} index={0} featured />
                </div>
              )}

              {/* Dotted TOC listing for all projects */}
              <div className="mb-16">
                <div className="h-px bg-brown/15 mb-8" />
                {filteredProjects.map((project, i) => {
                  const title = tProjects(`${project.slug}.title`, { defaultValue: project.title });
                  const categories = tProjects(`${project.slug}.categories`, { defaultValue: project.categories.join(', ') });
                  const romanNum = toRomanNumeral(i + 1);

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                      className="flex items-baseline gap-4 py-3 border-b border-brown/8"
                    >
                      <span className="font-display text-brown/20 text-sm shrink-0 w-8">
                        {romanNum}
                      </span>
                      <span className="font-display italic text-brown/70 text-sm">
                        {title}
                      </span>
                      <span className="leader-dots" />
                      <span className="font-caps text-[0.55rem] tracking-[0.12em] uppercase text-brown/35 small-caps shrink-0">
                        {categories}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Grid of remaining projects */}
              {gridProjects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                  {gridProjects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i + 1} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <OrnamentalDivider className="mt-24 mb-8" />
      </main>

      <Footer />
    </div>
  );
}
