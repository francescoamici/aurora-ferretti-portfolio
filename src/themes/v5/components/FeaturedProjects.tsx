import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '@auror/data';
import { useTranslation } from '@auror/i18n';
import { ThemeLink as Link } from '@auror/shared-ui';
import ProjectCard from './ProjectCard';

export default function FeaturedProjects() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const featured = projects.slice(0, 4);

  return (
    <section id="projects" ref={ref} className="relative py-32 px-6">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[0.15em] uppercase text-cyan neon-cyan">
            PROJECTS<span className="text-magenta neon-magenta">_</span>
          </h2>
          <div className="mt-2 font-mono text-xs text-white/30">
            {'> '}{t('sections.featuredProjects').toLowerCase()}.render()
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-3 font-mono text-sm text-cyan hover:neon-cyan transition-all duration-300 group"
          >
            <span className="text-white/30">{'> '}</span>
            {t('caseStudy.viewAll')}
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-magenta"
            >
              {'>>'}
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
