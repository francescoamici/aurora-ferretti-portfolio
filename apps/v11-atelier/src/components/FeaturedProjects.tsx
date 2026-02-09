import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects } from '@auror/data';
import ProjectCard from './ProjectCard';

export default function FeaturedProjects() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  const featured = projects.slice(0, 4);

  return (
    <section id="projects" ref={sectionRef} className="relative py-28 md:py-36 bg-cream">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section header with extending lines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-6 mb-16 md:mb-20"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block flex-1 h-px bg-gradient-to-r from-transparent to-gold/30 origin-right"
          />
          <div className="flex flex-col items-start md:items-center">
            <span className="font-accent text-xs tracking-[0.3em] uppercase text-gold mb-2">
              Portfolio
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-charcoal">
              {t('sections.featuredProjects')}
            </h2>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block flex-1 h-px bg-gradient-to-l from-transparent to-gold/30 origin-left"
          />
        </motion.div>

        {/* Asymmetric grid: first row 2/3 + 1/3, second row 1/3 + 2/3 */}
        <div className="space-y-6 md:space-y-8">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            <div className="md:col-span-8">
              <ProjectCard project={featured[0]} index={0} large />
            </div>
            <div className="md:col-span-4">
              <ProjectCard project={featured[1]} index={1} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            <div className="md:col-span-4">
              <ProjectCard project={featured[2]} index={2} />
            </div>
            <div className="md:col-span-8">
              <ProjectCard project={featured[3]} index={3} large />
            </div>
          </div>
        </div>

        {/* View All link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20 text-center"
        >
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-3 font-accent text-lg tracking-wider text-charcoal hover:text-gold transition-colors duration-300"
          >
            <span className="relative">
              {t('caseStudy.viewAll')}
              <span className="absolute bottom-0 left-0 w-full h-px bg-gold/40 group-hover:bg-gold transition-colors duration-300" />
            </span>
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
