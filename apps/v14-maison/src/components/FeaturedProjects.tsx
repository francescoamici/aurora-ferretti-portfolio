import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '@auror/data';
import { useTranslation } from '@auror/i18n';
import ProjectCard from './ProjectCard';

export default function FeaturedProjects() {
  const { t } = useTranslation();
  const featured = projects.slice(0, 4);

  return (
    <section id="projects" className="py-24 md:py-36 bg-cream-dark/50">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section heading with gold line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-5 mb-16 md:mb-20"
        >
          <h2 className="font-display text-2xl md:text-3xl text-espresso tracking-wide">
            {t('sections.featuredProjects')}
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/40 to-transparent" />
        </motion.div>

        {/* Asymmetric grid: first project full width, next three in 3-col */}
        <div className="space-y-8">
          {/* First project - large, full width */}
          {featured[0] && (
            <ProjectCard project={featured[0]} index={0} featured />
          )}

          {/* Remaining three in a 3-column row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featured.slice(1).map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i + 1} />
            ))}
          </div>
        </div>

        {/* View All link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-3 font-body text-sm font-medium text-sienna uppercase tracking-[0.15em] hover:text-burgundy transition-colors duration-400"
          >
            {t('caseStudy.viewAll')}
            <motion.svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                className="group-hover:translate-x-0.5 transition-transform duration-300"
              />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
