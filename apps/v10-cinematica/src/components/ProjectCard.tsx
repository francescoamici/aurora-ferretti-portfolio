import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@auror/data';

interface ProjectCardProps {
  project: Project;
  index: number;
}

function toRoman(num: number): string {
  const romanNumerals: [number, string][] = [
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let result = '';
  let remaining = num;
  for (const [value, symbol] of romanNumerals) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.2, delay: 0.1 }}
    >
      <Link
        to={`/portfolio/${project.slug}`}
        className="group block"
      >
        {/* Scene number */}
        <div className="mb-4">
          <span className="font-mono text-[10px] tracking-[0.3em] text-gold/50 uppercase">
            Scene {toRoman(index + 1)}
          </span>
        </div>

        {/* Widescreen image frame */}
        <div className="relative widescreen rounded-sm overflow-hidden">
          {/* Project color placeholder */}
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{ backgroundColor: project.color }}
          />

          {/* Film grain on image */}
          <div className="absolute inset-0 film-grain" />

          {/* Gold spotlight on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 transition-opacity duration-700" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gold/10" />

          {/* Gold border on hover */}
          <div className="absolute inset-0 border border-transparent group-hover:border-gold/40 transition-all duration-700 rounded-sm" />

          {/* Project title overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h3 className="font-display text-warm-white group-hover:text-gold text-xl md:text-2xl tracking-[0.1em] transition-colors duration-700">
              {project.title}
            </h3>
          </div>

          {/* Year - film style */}
          <div className="absolute top-4 right-5 md:top-6 md:right-8">
            <span className="font-mono text-[10px] tracking-[0.15em] text-warm-white/50">
              ({project.year})
            </span>
          </div>
        </div>

        {/* Info below frame */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="font-mono text-[10px] tracking-[0.2em] text-gold/60 uppercase"
              >
                {cat}
              </span>
            ))}
          </div>

          <span className="font-mono text-[10px] tracking-[0.25em] text-warm-white/40 uppercase group-hover:text-gold transition-colors duration-500">
            Watch &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
