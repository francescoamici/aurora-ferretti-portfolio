import { useRef } from 'react';
import { ThemeLink as Link } from '@auror/shared-ui';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects } from '@auror/data';
import ProjectCard from './ProjectCard';

export default function FeaturedProjects() {
  const { t, i18n } = useTranslation('common');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const featured = projects.slice(0, 4);

  return (
    <section
      id="progetti"
      className="relative py-32 overflow-hidden bg-prussian-light"
      ref={ref}
    >
      {/* Diagonal background cut */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-prussian" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 100%)' }} />

      {/* Speed line decorations */}
      <div className="absolute top-40 right-0 w-[30%] h-[1px] bg-gradient-to-l from-red/30 to-transparent" />
      <div className="absolute top-44 right-0 w-[20%] h-[1px] bg-gradient-to-l from-orange/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div style={{ transform: 'rotate(5deg)', transformOrigin: 'left center' }}>
            <h2 className="font-big font-800 text-8xl sm:text-9xl lg:text-[10rem] uppercase tracking-tight text-white/5">
              {i18n.language === 'it' ? 'PROGETTI' : 'PROJECTS'}
            </h2>
          </div>
          <div className="flex items-center gap-4 -mt-8 sm:-mt-10">
            <div className="w-20 h-[3px] racing-stripe" />
            <span className="font-display text-xl sm:text-2xl tracking-[0.3em] uppercase text-white">
              {t('sections.featuredProjects')}
            </span>
          </div>
        </motion.div>

        {/* Project cards - overlapping diagonal layout */}
        <div className="space-y-6 sm:space-y-4">
          {featured.map((project, index) => (
            <motion.div
              key={project.id}
              style={{
                marginLeft: `${index % 2 === 0 ? 0 : 8}%`,
                marginRight: `${index % 2 === 0 ? 8 : 0}%`,
              }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Speed link to all projects */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mt-16 flex justify-end"
        >
          <Link
            to="/portfolio"
            className="group flex items-center gap-3"
          >
            <span className="font-display text-xl sm:text-2xl tracking-[0.2em] uppercase text-white/60 group-hover:text-red transition-colors duration-150">
              {t('caseStudy.viewAll')}
            </span>
            <motion.span
              className="font-display text-2xl text-red"
              whileHover={{ x: 12 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              &rarr;&rarr;&rarr;
            </motion.span>
            <span className="w-16 h-[2px] bg-gradient-to-r from-red to-transparent group-hover:w-24 transition-all duration-200" />
          </Link>
        </motion.div>
      </div>

      {/* Bottom diagonal cut */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-prussian" style={{ clipPath: 'polygon(0 70%, 100% 0, 100% 100%, 0 100%)' }} />
    </section>
  );
}
