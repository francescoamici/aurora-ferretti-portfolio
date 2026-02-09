import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@auror/data';
import { useTranslation } from '@auror/i18n';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { t } = useTranslation('projects');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        to={`/portfolio/${project.slug}`}
        className="group block no-underline text-black"
      >
        {/* Image placeholder — sharp rectangle */}
        <div
          className="relative w-full aspect-[4/3] overflow-hidden"
          style={{ backgroundColor: project.color }}
        >
          {/* Project number */}
          <span className="absolute top-[16px] left-[16px] font-mono text-[11px] text-white/60">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Hover: Swiss Red square in corner */}
          <div className="absolute bottom-[16px] right-[16px] w-[16px] h-[16px] bg-red opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>

        {/* Title */}
        <h3 className="mt-[16px] font-sans font-semibold text-[16px] leading-[24px] tracking-[-0.01em]">
          {t(`${project.slug}.title`, { defaultValue: project.title })}
        </h3>

        {/* Categories and year */}
        <div className="mt-[8px] flex items-center justify-between">
          <span className="font-mono text-[11px] text-gray">
            {t(`${project.slug}.categories`, { defaultValue: project.categories.join(', ') })}
          </span>
          <span className="font-mono text-[11px] text-gray">
            {project.year}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
