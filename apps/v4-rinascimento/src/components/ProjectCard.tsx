import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import type { Project } from '@auror/data';

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

function toRomanYear(year: number): string {
  const thousands = ['', 'M', 'MM', 'MMM'];
  const hundreds = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'];
  const tens = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
  const ones = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

  return (
    thousands[Math.floor(year / 1000)] +
    hundreds[Math.floor((year % 1000) / 100)] +
    tens[Math.floor((year % 100) / 10)] +
    ones[year % 10]
  );
}

export { toRomanYear };

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const { t, i18n } = useTranslation('projects');
  const lang = i18n.language?.startsWith('it') ? 'it' : 'en';

  const title = t(`${project.slug}.title`, { defaultValue: project.title });
  const description = t(`${project.slug}.description`, { defaultValue: '' });
  const categories = t(`${project.slug}.categories`, { defaultValue: project.categories.join(', ') });
  const romanYear = toRomanYear(project.year);
  const annoLabel = lang === 'it' ? 'Anno' : 'Year';

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className={`group ${featured ? '' : ''}`}
    >
      <Link to={`/portfolio/${project.slug}`} className="block">
        {/* Image placeholder */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`relative overflow-hidden ${featured ? 'aspect-[3/4] md:aspect-[4/3]' : 'aspect-[3/4]'} mb-5`}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: project.color }}
          >
            <span className="font-display italic text-white/20 text-4xl md:text-5xl">
              {title}
            </span>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/10 transition-colors duration-700" />
        </motion.div>

        {/* Thin terracotta rule accent */}
        <div className="w-8 h-px bg-terracotta/60 mb-4 group-hover:w-12 transition-all duration-500" />

        {/* Content */}
        <div>
          <p className="font-caps text-[0.6rem] tracking-[0.2em] uppercase text-brown/40 small-caps mb-2">
            {annoLabel} {romanYear}
          </p>
          <h3 className="font-display italic text-brown text-lg md:text-xl leading-snug mb-2 group-hover:text-terracotta transition-colors duration-500">
            {title}
          </h3>
          {description && (
            <p className="font-body text-brown/60 text-sm leading-relaxed mb-3 line-clamp-2">
              {description}
            </p>
          )}
          <p className="font-caps text-[0.6rem] tracking-[0.15em] uppercase text-brown/40 small-caps">
            {categories}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
