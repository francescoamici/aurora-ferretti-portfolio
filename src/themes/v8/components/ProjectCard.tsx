import { ThemeLink as Link } from '@auror/shared-ui';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import type { Project } from '@auror/data';

const cardColors = ['#FFB4C8', '#FFE66D', '#4361EE', '#FF6B6B', '#95E1D3'];
const borderColors = ['#4361EE', '#FF6B6B', '#FFE66D', '#95E1D3', '#FFB4C8'];

interface ProjectCardProps {
  project: Project;
  index: number;
  variant?: 'grid' | 'featured';
}

export default function ProjectCard({ project, index, variant = 'grid' }: ProjectCardProps) {
  const { t } = useTranslation('projects');
  const bgColor = cardColors[index % cardColors.length];
  const bColor = borderColors[index % borderColors.length];
  const rotation = ((index % 5) - 2) * 1.5;
  const isDark = bgColor === '#4361EE';
  const textColor = isDark ? '#FFFFFF' : '#1A1A2E';

  const projectData = t(project.slug, { returnObjects: true }) as {
    title?: string;
    description?: string;
    categories?: string;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: rotation * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      whileHover={{
        scale: 1.04,
        rotate: 0,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 10,
        },
      }}
      whileTap={{ scale: 0.97 }}
      className="relative"
    >
      <Link to={`/portfolio/${project.slug}`}>
        <div
          className={`rounded-2xl p-6 md:p-8 relative overflow-hidden ${
            variant === 'featured' ? 'min-h-[320px]' : 'min-h-[260px]'
          } flex flex-col justify-between`}
          style={{
            backgroundColor: bgColor,
            border: `5px solid ${bColor}`,
          }}
        >
          {/* Project number - large, angled */}
          <div
            className="absolute -top-2 -right-2 font-fun text-[5rem] md:text-[7rem] leading-none opacity-20"
            style={{
              color: textColor,
              transform: 'rotate(12deg)',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Content */}
          <div className="relative z-10">
            <span
              className="font-fun text-xs uppercase tracking-wider"
              style={{ color: textColor, opacity: 0.7 }}
            >
              {project.year}
              {project.client && ` / ${project.client}`}
            </span>

            <h3
              className="font-display text-xl md:text-2xl lg:text-3xl mt-2 leading-tight"
              style={{ color: textColor }}
            >
              {projectData?.title || project.title}
            </h3>

            {projectData?.description && (
              <p
                className="font-body text-sm md:text-base mt-3 opacity-80 line-clamp-2"
                style={{ color: textColor }}
              >
                {projectData.description}
              </p>
            )}
          </div>

          {/* Category tags */}
          <div className="flex flex-wrap gap-2 mt-4 relative z-10">
            {project.categories.slice(0, 3).map((cat, ci) => (
              <span
                key={cat}
                className="font-body text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)',
                  color: textColor,
                  border: `2px solid ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)'}`,
                  transform: `rotate(${(ci - 1) * 2}deg)`,
                }}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Small geometric decorations */}
          <div
            className="absolute bottom-3 right-3 w-6 h-6 rounded-full opacity-30"
            style={{ backgroundColor: bColor }}
          />
          <div
            className="absolute bottom-6 right-10 w-4 h-4 rotate-45 opacity-20"
            style={{ backgroundColor: textColor }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
