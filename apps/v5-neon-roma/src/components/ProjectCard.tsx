import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@auror/data';
import { useTranslation } from '@auror/i18n';

const neonColors = ['cyan', 'magenta', 'green'] as const;

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { t } = useTranslation('projects');
  const color = neonColors[index % 3];

  const borderColor = {
    cyan: 'border-cyan/30 hover:border-cyan/70',
    magenta: 'border-magenta/30 hover:border-magenta/70',
    green: 'border-green/30 hover:border-green/70',
  }[color];

  const glowClass = {
    cyan: 'neon-border-cyan',
    magenta: 'neon-border-magenta',
    green: 'neon-border-green',
  }[color];

  const textColor = {
    cyan: 'text-cyan',
    magenta: 'text-magenta',
    green: 'text-green',
  }[color];

  const neonClass = {
    cyan: 'neon-cyan',
    magenta: 'neon-magenta',
    green: 'neon-green',
  }[color];

  const translationKey = project.slug;
  const title = t(`${translationKey}.title`, { defaultValue: project.title });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Link to={`/portfolio/${project.slug}`}>
        <div
          className={`glass rounded-lg overflow-hidden border ${borderColor} transition-all duration-500 group-hover:${glowClass}`}
          style={{
            boxShadow: `0 0 5px ${
              color === 'cyan'
                ? 'rgba(0,240,255,0.1)'
                : color === 'magenta'
                ? 'rgba(255,0,229,0.1)'
                : 'rgba(57,255,20,0.1)'
            }`,
          }}
        >
          {/* Image placeholder with scanlines */}
          <div
            className="relative h-48 md:h-56 overflow-hidden"
            style={{ backgroundColor: project.color }}
          >
            {/* Project color overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-space/80" />

            {/* Scanline overlay on image */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
              }}
            />

            {/* Project number */}
            <div className="absolute top-4 left-4 font-mono text-xs text-white/60">
              {String(index + 1).padStart(2, '0')}
              <span className="text-white/30">{'//'}</span>
            </div>

            {/* Year */}
            <div className="absolute top-4 right-4 font-mono text-xs text-white/40">
              {project.year}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3
              className={`font-display text-sm font-bold tracking-[0.15em] uppercase ${textColor} group-hover:${neonClass} transition-all duration-300`}
            >
              {title}
            </h3>

            {/* Categories */}
            <div className="mt-3 flex flex-wrap gap-2">
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                    color === 'cyan'
                      ? 'border-cyan/20 text-cyan/60'
                      : color === 'magenta'
                      ? 'border-magenta/20 text-magenta/60'
                      : 'border-green/20 text-green/60'
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Link */}
            <div className="mt-4 font-mono text-xs">
              <span className={`${textColor} group-hover:${neonClass} transition-all duration-300`}>
                ACCESS{' '}
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {'>'}
                </motion.span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
