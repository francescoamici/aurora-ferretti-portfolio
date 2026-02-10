import { ThemeLink as Link } from '@auror/shared-ui';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects } from '@auror/data';
import ProjectCard from './ProjectCard';

/* Botanical divider SVG */
function BotanicalDivider() {
  return (
    <svg
      className="mx-auto my-8 text-forest/20"
      width="200"
      height="40"
      viewBox="0 0 200 40"
      fill="none"
    >
      {/* Center stem */}
      <line x1="40" y1="20" x2="160" y2="20" stroke="currentColor" strokeWidth="1" />
      {/* Left leaf */}
      <path
        d="M70 20 C65 12, 55 10, 50 15 C45 20, 55 25, 70 20Z"
        fill="currentColor"
        opacity="0.5"
      />
      {/* Right leaf */}
      <path
        d="M130 20 C135 12, 145 10, 150 15 C155 20, 145 25, 130 20Z"
        fill="currentColor"
        opacity="0.5"
      />
      {/* Center flower / seed */}
      <circle cx="100" cy="20" r="4" fill="currentColor" opacity="0.4" />
      <circle cx="100" cy="20" r="7" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      {/* Small dots at ends */}
      <circle cx="40" cy="20" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="160" cy="20" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export default function FeaturedProjects() {
  const { t } = useTranslation();

  const featured = projects.slice(0, 4);

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-cream-dark/30">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section title with leaf decoration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <h2 className="font-display text-3xl md:text-5xl text-forest font-light">
            {t('sections.featuredProjects')}
          </h2>
        </motion.div>

        <BotanicalDivider />

        {/* Masonry layout */}
        <div className="mt-12 columns-1 md:columns-2 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {featured.map((project, i) => (
            <div key={project.id} className="break-inside-avoid">
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

        {/* See all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-3 group"
          >
            <span className="font-hand text-2xl md:text-3xl text-terra group-hover:text-forest transition-colors duration-300">
              {t('caseStudy.viewAll')}
            </span>
            <motion.svg
              width="30"
              height="16"
              viewBox="0 0 30 16"
              fill="none"
              className="text-terra group-hover:text-forest transition-colors duration-300"
            >
              <motion.path
                d="M0 8 L25 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <motion.path
                d="M20 3 L25 8 L20 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
