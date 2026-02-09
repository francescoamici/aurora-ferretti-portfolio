import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@auror/data';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link to={`/portfolio/${project.slug}`}>
        <div
          ref={cardRef}
          className="group relative overflow-hidden rounded-lg border border-transparent transition-colors duration-500 hover:border-gold/40"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Spotlight / lens glow effect */}
          {isHovered && (
            <div
              className="pointer-events-none absolute z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 transition-opacity"
              style={{
                left: mousePos.x,
                top: mousePos.y,
                background:
                  'radial-gradient(circle, rgba(201,169,110,0.3) 0%, transparent 70%)',
              }}
            />
          )}

          {/* Project image placeholder */}
          <div
            className="relative aspect-[4/3] overflow-hidden"
            style={{ backgroundColor: project.color }}
          >
            {/* Subtle grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />

            {/* Project title overlay on image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-3xl font-bold text-white/20 md:text-4xl">
                {project.title}
              </span>
            </div>

            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 bg-nero/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* View Project arrow (shows on hover) */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-accent text-lg tracking-widest text-gold">
                &#8594;
              </span>
            </motion.div>
          </div>

          {/* Card info */}
          <div className="bg-nero-light p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-ivory transition-colors group-hover:text-gold">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs tracking-wider text-ivory/40">
                  {project.categories.join(' / ')}
                </p>
              </div>
              <span className="font-accent text-sm text-gold/50">
                {project.year}
              </span>
            </div>

            {project.client && (
              <p className="mt-2 text-xs tracking-wider text-ivory/30 uppercase">
                {project.client}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
