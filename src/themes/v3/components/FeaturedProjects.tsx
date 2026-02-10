import { ThemeLink as Link } from '@auror/shared-ui';
import { useTranslation } from '@auror/i18n';
import { projects, skills } from '@auror/data';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

export default function FeaturedProjects() {
  const { t } = useTranslation();

  const featured = projects.slice(0, 4);
  const skillNames = skills.map(s => s.name).join(' \u2605 ');
  const tickerContent = `${skillNames} \u2605 ${skillNames} \u2605 `;

  return (
    <section id="projects" className="relative bg-raw-white border-b-[8px] border-harsh-black">
      {/* TICKER TAPE */}
      <div className="bg-harsh-black border-b-[4px] border-blue py-3 overflow-hidden">
        <div className="animate-marquee-left whitespace-nowrap">
          <span className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-raw-white">
            {tickerContent}
            {tickerContent}
          </span>
        </div>
      </div>

      {/* SECTION HEADER */}
      <div className="border-b-[4px] border-harsh-black px-4 md:px-8 py-6 flex items-end justify-between">
        <motion.h2
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.1 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-6xl uppercase"
        >
          {t('sections.featuredProjects')}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: 0.05 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-blue font-bold hidden md:block"
        >
          [{featured.length}/{projects.length}]
        </motion.div>
      </div>

      {/* BROKEN GRID PROJECTS */}
      <div className="px-4 md:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4">
          {/* Project 1 - LARGE, spans left */}
          <div className="md:col-span-7 md:row-span-2">
            <ProjectCard project={featured[0]} index={0} size="large" />
          </div>

          {/* Project 2 - SMALL, top right */}
          <div className="md:col-span-5 md:-ml-8 md:mt-12">
            <ProjectCard project={featured[1]} index={1} size="small" />
          </div>

          {/* Project 3 - SMALL, overlapping */}
          <div className="md:col-span-5 md:-ml-4 md:-mt-8">
            <ProjectCard project={featured[2]} index={2} size="small" />
          </div>

          {/* Project 4 - LARGE, spans right with offset */}
          {featured[3] && (
            <div className="md:col-span-8 md:col-start-3 md:-mt-16">
              <ProjectCard project={featured[3]} index={3} size="large" />
            </div>
          )}
        </div>
      </div>

      {/* ALL PROJECTS LINK */}
      <div className="border-t-[4px] border-harsh-black">
        <Link
          to="/portfolio"
          className="block px-4 md:px-8 py-8 md:py-12 group hover:bg-blue transition-none"
        >
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between"
          >
            <span className="font-display text-4xl md:text-8xl uppercase group-hover:text-raw-white transition-none">
              {t('caseStudy.viewAll')} {'\u2192'}
            </span>
            <span className="font-mono text-sm text-blue group-hover:text-yellow font-bold hidden md:block">
              [{projects.length}]
            </span>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
