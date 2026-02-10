import { ThemeLink as Link } from '@auror/shared-ui';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects } from '@auror/data';
import ProjectCard from './ProjectCard';

const decorColors = ['#FFB4C8', '#FFE66D', '#4361EE', '#FF6B6B', '#95E1D3'];

function Star({ color, size, x, y }: { color: string; size: number; x: string; y: string }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className="absolute"
      style={{ left: x, top: y }}
      animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
    >
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={color}
      />
    </motion.svg>
  );
}

export default function FeaturedProjects() {
  const { t } = useTranslation('common');
  const featured = projects.slice(0, 4);

  return (
    <section id="projects" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background decorations */}
      <Star color="#FFE66D" size={30} x="5%" y="10%" />
      <Star color="#FF6B6B" size={22} x="92%" y="15%" />
      <Star color="#4361EE" size={26} x="88%" y="85%" />
      <Star color="#95E1D3" size={18} x="8%" y="80%" />

      {/* Scattered dots */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            backgroundColor: decorColors[i % decorColors.length],
            left: `${10 + Math.random() * 80}%`,
            top: `${5 + Math.random() * 90}%`,
            opacity: 0.3,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 150 }}
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl inline-flex flex-wrap items-center justify-center gap-3">
            <span className="text-blue">{t('sections.featuredProjects')}</span>
            <motion.span
              className="text-coral"
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              !
            </motion.span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            {decorColors.map((c, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: c }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Memphis grid - cards at different sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              className={i === 0 ? 'md:col-span-2' : ''}
              style={{ transform: `rotate(${(i % 3 - 1) * 0.5}deg)` }}
            >
              <ProjectCard project={project} index={i} variant="featured" />
            </motion.div>
          ))}
        </div>

        {/* Geometric decoration between */}
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="w-12 h-1 bg-pink rounded-full" />
          <div className="w-4 h-4 bg-yellow rotate-45" />
          <div className="w-12 h-1 bg-blue rounded-full" />
          <div className="w-4 h-4 rounded-full bg-coral" />
          <div className="w-12 h-1 bg-mint rounded-full" />
        </div>

        {/* See All button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{
              scale: 1.08,
              rotate: [0, -2, 2, 0],
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/portfolio"
              className="inline-block font-fun text-2xl md:text-3xl px-10 py-5 rounded-2xl text-white bg-blue"
              style={{
                border: '5px solid #1A1A2E',
                transform: 'rotate(-1deg)',
              }}
            >
              {t('caseStudy.viewAll')} →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
