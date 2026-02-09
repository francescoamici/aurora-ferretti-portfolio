import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import type { Project } from '@auror/data';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { t } = useTranslation('projects');

  const translatedTitle = t(`${project.slug}.title`, { defaultValue: project.title });
  const translatedDesc = t(`${project.slug}.description`, { defaultValue: '' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
    >
      <Link to={`/portfolio/${project.slug}`} className="block group">
        <motion.div
          whileHover={{
            y: -8,
            rotate: index % 2 === 0 ? 1 : -1,
            transition: { duration: 0.3, ease: 'easeOut' },
          }}
          className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_4px_30px_rgba(45,80,22,0.08)] hover:shadow-[0_12px_50px_rgba(45,80,22,0.15)] transition-shadow duration-500"
        >
          {/* Handwritten project number */}
          <div className="absolute top-4 left-5 z-20">
            <span className="font-hand text-3xl md:text-4xl text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Year badge */}
          <div className="absolute top-4 right-5 z-20">
            <span className="font-body text-xs font-medium text-white/70 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full">
              {project.year}
            </span>
          </div>

          {/* Image / color area */}
          <div
            className="relative aspect-[4/3] md:aspect-[3/2]"
            style={{ backgroundColor: project.color }}
          >
            {/* Cream overlay gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${project.color}CC 0%, ${project.color}99 40%, #FDF8F030 100%)`,
              }}
            />

            {/* Decorative botanical pattern on card */}
            <svg
              className="absolute bottom-0 right-0 w-32 h-32 text-white/10"
              viewBox="0 0 100 100"
              fill="none"
            >
              <path
                d="M80 100 C80 80, 70 60, 50 50 C60 40, 80 35, 100 40"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M50 50 C55 40, 65 35, 75 35"
                stroke="currentColor"
                strokeWidth="0.8"
              />
              <circle cx="75" cy="35" r="3" fill="currentColor" opacity="0.5" />
            </svg>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h3 className="font-display text-xl md:text-2xl text-white font-medium leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                {translatedTitle}
              </h3>
              {translatedDesc && (
                <p className="font-body text-sm text-white/70 mt-2 line-clamp-2 leading-relaxed">
                  {translatedDesc}
                </p>
              )}
            </div>
          </div>

          {/* Bottom info area */}
          <div className="bg-cream-light p-5 md:p-6">
            <div className="flex flex-wrap gap-2">
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className="font-body text-xs font-medium text-forest/70 border border-forest/20 rounded-full px-3 py-1 hover:bg-forest/5 transition-colors"
                >
                  {cat}
                </span>
              ))}
            </div>

            {project.client && (
              <div className="mt-3 flex items-center gap-2">
                <span className="font-hand text-base text-terra/60">per</span>
                <span className="font-body text-sm font-medium text-terra">{project.client}</span>
              </div>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
