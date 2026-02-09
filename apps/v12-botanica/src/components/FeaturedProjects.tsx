import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects } from '@auror/data';
import ProjectCard from './ProjectCard';

/* ---------- Botanical SVG Divider ---------- */

function BotanicalDivider() {
  return (
    <svg
      className="mx-auto mb-12 h-8 w-64 text-sage/20"
      viewBox="0 0 256 32"
      fill="none"
    >
      {/* Center flower */}
      <circle cx="128" cy="16" r="4" fill="currentColor" opacity="0.5" />
      <circle cx="128" cy="16" r="7" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />

      {/* Left vine */}
      <path
        d="M120 16C100 16 90 12 70 14C55 16 40 14 20 16"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      {/* Left leaves */}
      <path d="M85 14C82 10 80 8 80 8" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
      <circle cx="80" cy="8" r="2" fill="currentColor" opacity="0.2" />
      <path d="M55 15C58 11 60 9 60 9" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
      <circle cx="60" cy="9" r="2" fill="currentColor" opacity="0.2" />
      <path d="M35 15C32 11 30 9 30 9" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
      <circle cx="30" cy="9" r="1.5" fill="currentColor" opacity="0.2" />

      {/* Right vine */}
      <path
        d="M136 16C156 16 166 12 186 14C201 16 216 14 236 16"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      {/* Right leaves */}
      <path d="M171 14C174 10 176 8 176 8" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
      <circle cx="176" cy="8" r="2" fill="currentColor" opacity="0.2" />
      <path d="M201 15C198 11 196 9 196 9" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
      <circle cx="196" cy="9" r="2" fill="currentColor" opacity="0.2" />
      <path d="M221 15C224 11 226 9 226 9" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
      <circle cx="226" cy="9" r="1.5" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

/* ---------- Featured Projects Component ---------- */

export default function FeaturedProjects() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const featured = projects.slice(0, 4);

  return (
    <section id="projects" className="relative py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl font-medium tracking-tight text-earth sm:text-4xl lg:text-5xl">
            {t('sections.featuredProjects')}
          </h2>
        </motion.div>

        {/* Botanical divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <BotanicalDivider />
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 gap-6 md:columns-2">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 font-hand text-xl text-sage transition-colors hover:text-terra"
          >
            {t('caseStudy.viewAll')}
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M4 10H16M12 6L16 10L12 14" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
