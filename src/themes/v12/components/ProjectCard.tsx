import { ThemeLink as Link } from '@auror/shared-ui';
import { motion } from 'framer-motion';
import type { Project } from '@auror/data';

/* ---------- Botanical Pattern Overlay ---------- */

function BotanicalOverlay() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.06]"
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="leafPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path
            d="M30 5C30 5 22 15 22 25C22 30 25.5 33 30 33C34.5 33 38 30 38 25C38 15 30 5 30 5Z"
            fill="white"
            opacity="0.5"
          />
          <path d="M30 33V12" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#leafPattern)" />
    </svg>
  );
}

/* ---------- Project Card ---------- */

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  // Make alternating cards taller for masonry effect
  const isTall = index % 3 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="mb-6 break-inside-avoid"
    >
      <Link to={`/portfolio/${project.slug}`}>
        <motion.article
          className="group relative overflow-hidden rounded-2xl shadow-[0_2px_20px_rgba(107,91,78,0.06)] transition-shadow hover:shadow-[0_8px_40px_rgba(107,91,78,0.12)] lg:rounded-3xl"
          whileHover={{ y: -6, rotate: 0.5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Image area */}
          <div
            className={`relative overflow-hidden ${isTall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
            style={{
              background: `linear-gradient(135deg, ${project.color}dd, ${project.color}99)`,
            }}
          >
            {/* Botanical pattern overlay */}
            <BotanicalOverlay />

            {/* Gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Handwritten number */}
            <motion.span
              className="absolute top-4 left-5 font-hand text-3xl font-bold text-white/25"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.08 }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.span>

            {/* Year badge */}
            <div className="absolute top-4 right-4 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
              {project.year}
            </div>

            {/* Title at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="font-display text-xl font-medium text-white sm:text-2xl">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Info below image */}
          <div className="bg-cream-light p-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-1.5">
              {project.categories.slice(0, 3).map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-sage-light px-2.5 py-0.5 text-xs font-medium text-sage"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Client */}
            {project.client && (
              <p className="mt-2.5 flex items-center gap-1.5">
                <span className="font-hand text-sm text-earth/40">per</span>
                <span className="text-sm font-medium text-earth/70">{project.client}</span>
              </p>
            )}
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
