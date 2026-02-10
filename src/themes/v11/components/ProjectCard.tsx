import { ThemeLink as Link } from '@auror/shared-ui';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import type { Project } from '@auror/data';

interface ProjectCardProps {
  project: Project;
  index: number;
  large?: boolean;
}

export default function ProjectCard({ project, index, large = false }: ProjectCardProps) {
  const { t } = useTranslation('projects');

  const projectTitle = t(`${project.slug}.title`, { defaultValue: project.title });
  const projectDesc = t(`${project.slug}.description`, { defaultValue: '' });
  const clientName = t(`${project.slug}.client`, { defaultValue: project.client || '' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/portfolio/${project.slug}`}
        className="group block relative overflow-hidden rounded-sm"
      >
        {/* Card container with hover lift */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative shadow-md group-hover:shadow-xl transition-shadow duration-500"
        >
          {/* Color block */}
          <div
            className={`relative w-full overflow-hidden ${
              large ? 'aspect-[4/5] md:aspect-[3/4]' : 'aspect-[3/4]'
            }`}
            style={{ backgroundColor: project.color }}
          >
            {/* Subtle gradient overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)`,
              }}
            />

            {/* Decorative diagonal lines */}
            <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
              <line x1="0" y1="100%" x2="100%" y2="0" stroke="white" strokeWidth="0.5" />
              <line x1="20%" y1="100%" x2="100%" y2="20%" stroke="white" strokeWidth="0.5" />
            </svg>

            {/* Year in top-right */}
            <div className="absolute top-5 right-5 z-10">
              <span className="font-display text-sm text-white/50 tracking-wider">
                {project.year}
              </span>
            </div>

            {/* Project initial watermark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[8rem] md:text-[10rem] italic text-white/5 select-none leading-none">
                {project.title.charAt(0)}
              </span>
            </div>

            {/* Hover overlay sliding up from bottom */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-6 md:p-8"
              initial={false}
            >
              <div className="relative">
                {/* Background overlay */}
                <motion.div
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
                  style={{ height: '160%', top: '-60%' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Always-visible minimal info */}
                <div className="relative z-10">
                  <motion.div
                    className="overflow-hidden"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <h3
                      className={`font-display text-white leading-tight mb-2 ${
                        large ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
                      }`}
                    >
                      {projectTitle}
                    </h3>
                  </motion.div>

                  {/* Client name */}
                  {clientName && (
                    <span className="block font-accent text-sm text-white/60 tracking-wide mb-3">
                      for {clientName}
                    </span>
                  )}

                  {/* Category tags - visible on hover */}
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {project.categories.slice(0, 3).map((cat) => (
                      <span
                        key={cat}
                        className="font-accent text-xs tracking-wider text-white/70 border border-white/20 px-2.5 py-1 rounded-sm"
                      >
                        {cat}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Description on hover for large cards */}
            {large && projectDesc && (
              <motion.div
                className="absolute top-0 left-0 right-0 p-6 md:p-8"
                initial={{ opacity: 0, y: -10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <p className="font-body text-sm text-white/60 leading-relaxed line-clamp-3">
                  {projectDesc}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
