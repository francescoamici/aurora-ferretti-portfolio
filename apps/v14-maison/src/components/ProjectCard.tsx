import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import type { Project } from '@auror/data';

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const { t } = useTranslation('projects');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <Link to={`/portfolio/${project.slug}`} className="group block">
        <div
          className={`relative overflow-hidden rounded-2xl shadow-warm transition-all duration-500 group-hover:shadow-warm-lg group-hover:-translate-y-1.5 ${
            featured ? 'aspect-[16/9]' : 'aspect-[4/3]'
          }`}
        >
          {/* Project color background */}
          <div className="absolute inset-0" style={{ backgroundColor: project.color }} />

          {/* Warm gradient overlay */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: 'linear-gradient(160deg, rgba(255,248,240,0.08) 0%, transparent 40%, rgba(61,43,31,0.35) 100%)',
            }}
          />

          {/* Gold corner accents */}
          <div className="absolute top-4 left-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 left-0 w-full h-px bg-gold/50" />
            <div className="absolute top-0 left-0 w-px h-full bg-gold/50" />
          </div>
          <div className="absolute top-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 right-0 w-full h-px bg-gold/50" />
            <div className="absolute top-0 right-0 w-px h-full bg-gold/50" />
          </div>
          <div className="absolute bottom-4 left-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute bottom-0 left-0 w-full h-px bg-gold/50" />
            <div className="absolute bottom-0 left-0 w-px h-full bg-gold/50" />
          </div>
          <div className="absolute bottom-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute bottom-0 right-0 w-full h-px bg-gold/50" />
            <div className="absolute bottom-0 right-0 w-px h-full bg-gold/50" />
          </div>

          {/* Glassmorphism info panel at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <div className="glass-warm rounded-xl px-5 py-4 backdrop-blur-md">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base md:text-lg text-espresso truncate">
                    {project.title}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-espresso/50 font-body">
                    <span>{project.year}</span>
                    {project.client && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-taupe/40" />
                        <span>{project.client}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="w-8 h-8 rounded-full bg-sienna-light flex items-center justify-center flex-shrink-0 group-hover:bg-sienna transition-colors duration-500">
                  <svg
                    className="w-3.5 h-3.5 text-sienna group-hover:text-cream transition-colors duration-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>

              {/* Categories pills */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.categories.slice(0, 3).map((cat) => (
                  <span
                    key={cat}
                    className="px-2.5 py-0.5 rounded-full bg-taupe-light text-[10px] font-body font-medium text-espresso/60 uppercase tracking-wider"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
