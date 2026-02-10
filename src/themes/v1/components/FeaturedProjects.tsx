import { ThemeLink as Link } from '@auror/shared-ui';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects } from '@auror/data';
import ProjectCard from './ProjectCard';

export default function FeaturedProjects() {
  const { t } = useTranslation();
  const featured = projects.slice(0, 4);

  return (
    <section id="projects" className="relative bg-nero px-6 py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          className="mb-16 flex items-end justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="mb-3 text-xs tracking-[0.4em] text-gold/60 uppercase">
              {t('sections.featuredProjects')}
            </p>
            <h2 className="font-display text-4xl font-bold text-ivory md:text-5xl">
              {t('nav.projects')}
            </h2>
          </div>

          <Link
            to="/portfolio"
            className="group hidden items-center gap-2 text-sm tracking-wider text-gold/70 transition-colors hover:text-gold md:flex"
          >
            <span>{t('caseStudy.viewAll')}</span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              &#8594;
            </motion.span>
          </Link>
        </motion.div>

        {/* Projects grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {featured.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Mobile view all link */}
        <motion.div
          className="mt-12 text-center md:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-8 py-3 text-sm tracking-wider text-gold transition-colors hover:border-gold hover:bg-gold/10"
          >
            {t('caseStudy.viewAll')}
            <span>&#8594;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
