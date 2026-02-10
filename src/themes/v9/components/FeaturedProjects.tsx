import { ThemeLink as Link } from '@auror/shared-ui';
import { motion } from 'framer-motion';
import { projects } from '@auror/data';
import { useTranslation } from '@auror/i18n';
import ProjectCard from './ProjectCard';

export default function FeaturedProjects() {
  const { t } = useTranslation();
  const featured = projects.slice(0, 3);

  return (
    <section id="projects" className="py-[80px]">
      <div className="mx-auto max-w-[1200px] px-[24px]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between mb-[48px]"
        >
          <div className="flex items-center gap-[12px]">
            <span className="red-square" />
            <span className="section-label">Selected Work</span>
          </div>
          <Link
            to="/portfolio"
            className="font-mono text-[11px] text-gray no-underline hover:text-red transition-colors duration-200 tracking-[1px]"
          >
            {t('caseStudy.viewAll')} &rarr;
          </Link>
        </motion.div>

        {/* 3-column grid (4 cols each of 12) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="mt-[80px] mx-auto max-w-[1200px] px-[24px]">
        <div className="w-full h-[1px] bg-light-gray" />
      </div>
    </section>
  );
}
