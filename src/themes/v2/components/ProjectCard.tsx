import { useState } from 'react';
import { ThemeLink as Link } from '@auror/shared-ui';
import type { Project } from '@auror/data';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const number = String(index + 1).padStart(2, '0');

  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-baseline gap-6 py-8 border-b border-black/5 relative overflow-hidden">
        {/* Number */}
        <span className="font-mono text-xs text-black/20 flex-shrink-0 w-8">
          {number}
        </span>

        {/* Title */}
        <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight flex-1 group-hover:text-black/70 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Meta */}
        <div className="hidden md:flex items-center gap-6 flex-shrink-0">
          <span className="font-mono text-xs text-black/30 tracking-wide">
            {project.categories.slice(0, 2).join(', ')}
          </span>
          <span className="font-mono text-xs text-black/20">
            {project.year}
          </span>
        </div>

        {/* Color swatch on hover */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1 transition-all duration-500 ease-out"
          style={{
            backgroundColor: project.color,
            transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'right',
            width: hovered ? '4px' : '0px',
          }}
        />
      </div>
    </Link>
  );
}
