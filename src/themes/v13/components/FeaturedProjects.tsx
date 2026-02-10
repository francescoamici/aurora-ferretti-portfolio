import { ThemeLink as Link } from '@auror/shared-ui';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects } from '@auror/data';
import ProjectCard from './ProjectCard';

export default function FeaturedProjects() {
  const { t } = useTranslation();

  // Show first 4 projects as featured
  const featured = projects.slice(0, 4);

  return (
    <section className="py-32 md:py-44 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section label with extending line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="flex items-center gap-6 mb-16 md:mb-20"
        >
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-dove whitespace-nowrap">
            {t('sections.featuredProjects')}
          </span>
          <div className="flex-1 h-px bg-silver" />
        </motion.div>

        {/* Projects grid — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View All link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 md:mt-20 text-center"
        >
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-3 font-body text-[11px] tracking-[0.2em] uppercase text-charcoal-light hover:text-charcoal transition-colors duration-500"
          >
            <span>{t('caseStudy.viewAll')}</span>
            <motion.span
              className="inline-block w-8 h-px bg-charcoal-light group-hover:bg-charcoal group-hover:w-12 transition-all duration-500"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
