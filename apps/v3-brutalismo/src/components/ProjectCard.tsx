import { Link } from 'react-router-dom';
import { useTranslation } from '@auror/i18n';
import { motion } from 'framer-motion';
import type { Project } from '@auror/data';
import { useMemo } from 'react';

interface ProjectCardProps {
  project: Project;
  index: number;
  size?: 'large' | 'small';
}

export default function ProjectCard({ project, index, size = 'small' }: ProjectCardProps) {
  const { t } = useTranslation('projects');

  // Random slight rotation per card
  const rotation = useMemo(() => (Math.random() * 4 - 2), []);

  const description = t(`${project.slug}.description`, { defaultValue: '' });
  const categories = t(`${project.slug}.categories`, { defaultValue: project.categories.join(', ') });

  return (
    <motion.div
      initial={{ y: 40, opacity: 0, rotate: 0 }}
      whileInView={{ y: 0, opacity: 1, rotate: rotation }}
      transition={{ duration: 0.1, delay: index * 0.03 }}
      viewport={{ once: true }}
      whileHover={{
        rotate: 0,
        x: -4,
        y: -4,
        transition: { duration: 0.05 },
      }}
      className="group"
    >
      <Link to={`/portfolio/${project.slug}`}>
        <div
          className={`
            border-[4px] border-harsh-black bg-raw-white
            hard-shadow
            transition-none
            group-hover:shadow-none
            ${size === 'large' ? 'p-6 md:p-8' : 'p-4 md:p-6'}
          `}
        >
          {/* IMAGE PLACEHOLDER */}
          <div
            className="w-full border-[4px] border-harsh-black mb-4 md:mb-6 relative overflow-hidden"
            style={{
              backgroundColor: project.color,
              height: size === 'large' ? '400px' : '250px',
              transform: `rotate(${rotation > 0 ? 1 : -1}deg)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-raw-white text-4xl md:text-6xl uppercase opacity-30 select-none">
                {project.title}
              </span>
            </div>

            {/* YEAR BADGE */}
            <div className="absolute top-0 right-0 bg-yellow border-l-[4px] border-b-[4px] border-harsh-black px-3 py-1">
              <span className="font-mono font-bold text-xs">{project.year}</span>
            </div>
          </div>

          {/* TITLE */}
          <h3 className={`
            font-heading uppercase
            ${size === 'large' ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'}
            mb-2
          `}>
            {t(`${project.slug}.title`, { defaultValue: project.title })}
          </h3>

          {/* CATEGORIES */}
          <div className="font-mono text-xs md:text-sm">
            {categories.split(', ').map((cat: string, i: number) => (
              <span key={i}>
                <span className="text-blue underline underline-offset-4 decoration-2">{cat}</span>
                {i < categories.split(', ').length - 1 && (
                  <span className="text-harsh-black mx-2">/</span>
                )}
              </span>
            ))}
          </div>

          {/* CLIENT */}
          {project.client && (
            <div className="font-mono text-xs mt-2 uppercase tracking-[0.2em]">
              Client: <span className="font-bold">{project.client}</span>
            </div>
          )}

          {/* DESCRIPTION (truncated) */}
          {description && size === 'large' && (
            <p className="font-mono text-xs mt-4 leading-relaxed line-clamp-2 opacity-70">
              {description}
            </p>
          )}

          {/* ARROW */}
          <div className="font-mono text-blue font-bold text-sm mt-4 group-hover:translate-x-2 transition-transform duration-75">
            {'>>>'}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
