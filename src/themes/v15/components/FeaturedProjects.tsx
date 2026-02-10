import { useRef } from 'react';
import { ThemeLink as Link } from '@auror/shared-ui';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects } from '@auror/data';
import ProjectCard from './ProjectCard';

function DecorativeMarquee() {
  const titles = projects.map((p) => p.title).join(' \u2014 ') + ' \u2014 ';

  return (
    <div className="overflow-hidden whitespace-nowrap py-6 md:py-8">
      <motion.div
        className="inline-flex"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear',
          },
        }}
      >
        <span className="inline-flex">
          <span className="font-display text-4xl md:text-6xl lg:text-8xl text-noir/[0.04] whitespace-nowrap">
            {titles}
          </span>
        </span>
        <span className="inline-flex">
          <span className="font-display text-4xl md:text-6xl lg:text-8xl text-noir/[0.04] whitespace-nowrap">
            {titles}
          </span>
        </span>
      </motion.div>
    </div>
  );
}

export default function FeaturedProjects() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const featured = projects.slice(0, 4);

  return (
    <section id="projects" ref={sectionRef} className="relative py-16 md:py-24">
      {/* Decorative marquee */}
      <DecorativeMarquee />

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          className="flex items-center justify-between mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="font-accent text-xs uppercase tracking-[0.3em] text-gold block mb-3">
              {t('sections.featuredProjects')}
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-noir">
              {t('nav.portfolio')}
            </h2>
          </div>
        </motion.div>

        {/* Featured project rows */}
        <div className="divide-y divide-noir/5">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              featured
            />
          ))}
        </div>

        {/* View all link */}
        <motion.div
          className="mt-12 md:mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-3 hover:gap-5 transition-all duration-300"
          >
            <span className="font-body text-xs uppercase tracking-[0.2em] text-noir/60 group-hover:text-noir transition-colors">
              {t('caseStudy.viewAll')}
            </span>
            <svg
              width="32"
              height="8"
              viewBox="0 0 32 8"
              fill="none"
              className="text-gold"
            >
              <line x1="0" y1="4" x2="28" y2="4" stroke="currentColor" strokeWidth="0.5" />
              <path d="M26 1l3 3-3 3" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
