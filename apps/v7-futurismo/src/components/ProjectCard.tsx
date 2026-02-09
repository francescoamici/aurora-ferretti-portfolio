import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import type { Project } from '@auror/data';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { t, i18n } = useTranslation('projects');
  const tCommon = useTranslation('common').t;

  const title = t(`${project.slug}.title`, { defaultValue: project.title });
  const description = t(`${project.slug}.description`, { defaultValue: '' });
  const categories = project.categories.slice(0, 3);

  return (
    <Link to={`/portfolio/${project.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 40, rotate: 0 }}
        whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 2 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.35, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{
          scale: 1.04,
          x: 12,
          transition: { duration: 0.15, ease: 'easeOut' },
        }}
        className="group relative bg-prussian-light border border-white/5 overflow-hidden cursor-pointer"
        style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}
      >
        {/* Diagonal stripe accent using project color */}
        <div
          className="absolute top-0 right-0 w-24 h-full opacity-20 group-hover:opacity-40 transition-opacity duration-150"
          style={{
            background: `repeating-linear-gradient(-45deg, transparent, transparent 8px, ${project.color}33 8px, ${project.color}33 16px)`,
          }}
        />

        {/* Project color accent bar */}
        <div
          className="absolute top-0 left-0 w-1 h-full transition-all duration-150 group-hover:w-2"
          style={{ backgroundColor: project.color }}
        />

        <div className="relative p-6 sm:p-8 pl-8">
          {/* Number */}
          <span className="font-display text-5xl sm:text-6xl text-white/5 absolute top-2 right-4 group-hover:text-white/10 transition-colors duration-150">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Year */}
          <span className="font-display text-xs tracking-[0.3em] text-orange/60 uppercase">
            {project.year}
          </span>

          {/* Title */}
          <h3 className="font-display text-3xl sm:text-4xl tracking-[0.05em] uppercase text-white mt-2 group-hover:text-orange transition-colors duration-150">
            {title}
          </h3>

          {/* Client */}
          {project.client && (
            <span className="font-body text-sm tracking-[0.2em] text-white/40 uppercase mt-1 block">
              {i18n.language === 'it' ? 'Cliente' : 'Client'}: {project.client}
            </span>
          )}

          {/* Description */}
          {description && (
            <p className="font-body text-base text-white/50 mt-3 line-clamp-2 max-w-lg">
              {description}
            </p>
          )}

          {/* Categories with diagonal yellow underline */}
          <div className="flex flex-wrap gap-3 mt-4">
            {categories.map((cat) => (
              <span
                key={cat}
                className="relative font-body text-sm tracking-[0.1em] text-white/60 uppercase"
              >
                {cat}
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow/30"
                  style={{ transform: 'rotate(-3deg)' }}
                />
              </span>
            ))}
          </div>

          {/* CTA arrow */}
          <div className="flex items-center gap-2 mt-6">
            <span className="font-body text-sm tracking-[0.2em] uppercase text-white/40 group-hover:text-red transition-colors duration-150">
              {tCommon('caseStudy.viewProject')}
            </span>
            <motion.span
              className="text-red font-display text-xl"
              animate={{ x: [0, 0] }}
              whileHover={{ x: 8 }}
            >
              <span className="group-hover:inline hidden">&rarr;&rarr;</span>
              <span className="group-hover:hidden">&rarr;</span>
            </motion.span>
          </div>
        </div>

        {/* Bottom speed line on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red via-orange to-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />

        {/* Motion blur shadow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-[8px_0_30px_rgba(230,57,70,0.15)]" />
      </motion.article>
    </Link>
  );
}
