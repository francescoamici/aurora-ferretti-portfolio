import { ThemeLink as Link } from '@auror/shared-ui';
import { motion } from 'framer-motion';
import { projects } from '@auror/data';
import { useTranslation } from '@auror/i18n';
import ProjectCard from './ProjectCard';

export default function FeaturedProjects() {
  const { t } = useTranslation();
  // Show first 4 projects as featured
  const featured = projects.slice(0, 4);

  return (
    <section className="relative bg-film-black py-24 md:py-36 film-grain">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* ACT II chapter marker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.5 }}
          className="flex items-center gap-6 mb-20"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/40" />
          <h2 className="font-display text-gold text-xs md:text-sm tracking-[0.4em] uppercase text-center whitespace-nowrap">
            Act II &mdash; Selected Works
          </h2>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>

        {/* Project stack */}
        <div className="space-y-16 md:space-y-24">
          {featured.map((project, i) => (
            <div key={project.id}>
              <ProjectCard project={project} index={i} />

              {/* Gold divider between projects */}
              {i < featured.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2 }}
                  className="mt-16 md:mt-24 gold-rule"
                />
              )}
            </div>
          ))}
        </div>

        {/* View Full Reel link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mt-20 md:mt-28 text-center"
        >
          <Link
            to="/portfolio"
            className="inline-block font-display text-xs tracking-[0.3em] text-gold/70 uppercase hover:text-gold transition-colors duration-500 border-b border-gold/30 hover:border-gold/60 pb-1"
          >
            View Full Reel &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
