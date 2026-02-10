import { useRef } from 'react';
import { ThemeLink as Link } from '@auror/shared-ui';
import { motion, useInView } from 'framer-motion';
import { projects } from '@auror/data';
import { useTranslation } from '@auror/i18n';
import ProjectCard from './ProjectCard';

export default function FeaturedProjects() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const featured = projects.slice(0, 4);

  return (
    <section id="projects" className="py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <motion.p
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/30 mb-16"
        >
          {t('sections.featuredProjects')}
        </motion.p>

        <div className="space-y-0">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-right"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 font-body text-sm text-black/40 hover:text-black transition-colors duration-300"
          >
            {t('caseStudy.viewAll')}
            <span className="text-red">&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
