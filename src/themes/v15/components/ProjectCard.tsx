import { useRef } from 'react';
import { ThemeLink as Link } from '@auror/shared-ui';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import type { Project } from '@auror/data';

interface ProjectCardProps {
  project: Project;
  index?: number;
  featured?: boolean;
}

export default function ProjectCard({ project, index = 0, featured = false }: ProjectCardProps) {
  const { t } = useTranslation('projects');
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });

  const title = t(`${project.slug}.title`, { defaultValue: project.title });
  const description = t(`${project.slug}.description`, { defaultValue: '' });

  if (featured) {
    const isEven = index % 2 === 0;

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          to={`/portfolio/${project.slug}`}
          className={`group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center py-10 md:py-16 ${
            isEven ? '' : 'md:direction-rtl'
          }`}
        >
          {/* Image / Color Block */}
          <div className={`relative overflow-hidden rounded-lg aspect-[4/3] ${isEven ? '' : 'md:order-2'}`}>
            <motion.div
              className="w-full h-full"
              style={{ backgroundColor: project.color }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {project.thumbnail && (
                <img
                  src={project.thumbnail}
                  alt={title}
                  className="w-full h-full object-cover opacity-0"
                  onLoad={(e) => {
                    (e.target as HTMLImageElement).style.opacity = '1';
                  }}
                  style={{ transition: 'opacity 0.5s ease' }}
                />
              )}
            </motion.div>
            {/* Gold border on hover */}
            <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-gold/40 transition-all duration-500 pointer-events-none" />
          </div>

          {/* Text Info */}
          <div className={`${isEven ? '' : 'md:order-1 md:text-right'}`}>
            <span className="font-body text-[10px] uppercase tracking-[0.25em] text-gray">
              {project.year} {project.client && ` / ${project.client}`}
            </span>
            <h3 className="font-display text-3xl md:text-5xl lg:text-6xl text-noir mt-3 group-hover:text-blush-deep transition-colors duration-500">
              {title}
            </h3>
            {description && (
              <p className="font-body text-sm text-noir/50 mt-4 leading-relaxed max-w-md">
                {description}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1">
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className={`font-body text-[10px] uppercase tracking-[0.15em] text-gray-light ${
                    isEven ? '' : 'md:ml-auto'
                  }`}
                >
                  {cat}
                  {project.categories.indexOf(cat) < project.categories.length - 1 && ','}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
              <span className={`font-body text-xs uppercase tracking-[0.15em] text-gold ${isEven ? '' : 'md:ml-auto'}`}>
                View
              </span>
              <svg
                width="20"
                height="8"
                viewBox="0 0 20 8"
                fill="none"
                className="text-gold"
              >
                <line x1="0" y1="4" x2="18" y2="4" stroke="currentColor" strokeWidth="0.5" />
                <path d="M15 1l3 3-3 3" stroke="currentColor" strokeWidth="0.5" fill="none" />
              </svg>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Grid card mode
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/portfolio/${project.slug}`} className="group block">
        {/* Image */}
        <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
          <motion.div
            className="w-full h-full"
            style={{ backgroundColor: project.color }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {project.thumbnail && (
              <img
                src={project.thumbnail}
                alt={title}
                className="w-full h-full object-cover opacity-0"
                onLoad={(e) => {
                  (e.target as HTMLImageElement).style.opacity = '1';
                }}
                style={{ transition: 'opacity 0.5s ease' }}
              />
            )}
          </motion.div>

          {/* Year badge */}
          <span className="absolute top-4 right-4 font-body text-[10px] tracking-[0.2em] text-white/70">
            {project.year}
          </span>

          {/* Hover overlay with title */}
          <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/30 transition-all duration-500 flex items-end p-6">
            <motion.span
              className="font-display text-2xl md:text-3xl text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
            >
              {title}
            </motion.span>
          </div>

          {/* Gold border on hover */}
          <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-gold/40 transition-all duration-500 pointer-events-none" />
        </div>

        {/* Info below */}
        <div className="mt-4">
          <h3 className="font-display text-xl md:text-2xl text-noir group-hover:text-blush-deep transition-colors duration-300">
            {title}
          </h3>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="font-body text-[10px] uppercase tracking-[0.15em] text-gray">
              {project.categories.join(', ')}
            </span>
          </div>
          {project.client && (
            <span className="font-accent text-xs italic text-noir/40 mt-1 block">
              {project.client}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
