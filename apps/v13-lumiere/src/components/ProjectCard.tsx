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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <Link
        to={`/portfolio/${project.slug}`}
        className="group block"
      >
        {/* Image area */}
        <div
          className="relative aspect-[4/3] rounded-lg overflow-hidden border border-transparent group-hover:border-silver transition-all duration-700"
        >
          <motion.div
            className="w-full h-full"
            style={{ backgroundColor: project.color }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>

        {/* Info below image */}
        <div className="mt-5 md:mt-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-charcoal text-lg md:text-xl group-hover:text-charcoal-light transition-colors duration-500">
              {t(`${project.slug}.title`, project.title)}
            </h3>
            <span className="font-body text-[11px] tracking-wide text-dove shrink-0">
              {project.year}
            </span>
          </div>

          {/* Categories as comma-separated text */}
          <p className="mt-1.5 font-body text-[11px] tracking-wide text-dove">
            {project.categories.join(', ')}
          </p>

          {/* Client name */}
          {project.client && (
            <p className="mt-1 font-accent text-sm italic text-charcoal-light/50">
              {project.client}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
