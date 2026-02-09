import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects } from '@auror/data';
import { toRomanYear } from './ProjectCard';
import OrnamentalDivider from './OrnamentalDivider';

function toRomanNumeral(n: number): string {
  const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  return numerals[n - 1] || String(n);
}

export default function FeaturedProjects() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('it') ? 'it' : 'en';
  const { t: tProjects } = useTranslation('projects');

  const featured = projects.slice(0, 5);
  const heroProject = featured[0];
  const tocProjects = featured.slice(1);

  const heroTitle = tProjects(`${heroProject.slug}.title`, { defaultValue: heroProject.title });
  const heroDescription = tProjects(`${heroProject.slug}.description`, { defaultValue: '' });
  const heroCategories = tProjects(`${heroProject.slug}.categories`, { defaultValue: heroProject.categories.join(', ') });

  const sectionTitle = lang === 'it' ? 'Sommario' : 'Table of Contents';
  const continueLabel = lang === 'it' ? 'Continua...' : 'Continue...';
  const featuredLabel = lang === 'it' ? 'In Evidenza' : 'Featured';

  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Section header - TOC style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-caps text-[0.7rem] tracking-[0.3em] uppercase text-brown/50 small-caps">
            {sectionTitle}
          </h2>
        </motion.div>

        {/* Hero article - featured project */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20"
        >
          <Link to={`/portfolio/${heroProject.slug}`} className="group block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.6 }}
                className="aspect-[3/4] relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: heroProject.color }}
                >
                  <span className="font-display italic text-white/20 text-5xl md:text-6xl">
                    {heroTitle}
                  </span>
                </div>
                <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/10 transition-colors duration-700" />
              </motion.div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <span className="font-caps text-[0.6rem] tracking-[0.25em] uppercase text-terracotta/70 small-caps mb-4">
                  {featuredLabel}
                </span>
                <span className="font-display text-brown/20 text-6xl md:text-8xl leading-none mb-4">
                  I
                </span>
                <h3 className="font-display italic text-brown text-2xl md:text-3xl lg:text-4xl leading-snug mb-4 group-hover:text-terracotta transition-colors duration-500">
                  {heroTitle}
                </h3>
                <div className="w-10 h-px bg-terracotta/50 mb-5" />
                <p className="font-body text-brown/70 text-base md:text-lg leading-[1.8] mb-4">
                  {heroDescription}
                </p>
                <p className="font-caps text-[0.6rem] tracking-[0.15em] uppercase text-brown/40 small-caps">
                  {heroCategories} &middot; {toRomanYear(heroProject.year)}
                </p>
              </div>
            </div>
          </Link>
        </motion.article>

        {/* Thin divider */}
        <div className="h-px bg-brown/15 mb-12" />

        {/* TOC-style project list */}
        <div className="space-y-0">
          {tocProjects.map((project, i) => {
            const title = tProjects(`${project.slug}.title`, { defaultValue: project.title });
            const description = tProjects(`${project.slug}.description`, { defaultValue: '' });
            const categories = tProjects(`${project.slug}.categories`, { defaultValue: project.categories.join(', ') });
            const romanNum = toRomanNumeral(i + 2);

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <Link
                  to={`/portfolio/${project.slug}`}
                  className="group block py-6 border-b border-brown/10 hover:border-terracotta/30 transition-colors duration-500"
                >
                  <div className="flex items-start gap-6 md:gap-10">
                    {/* Roman numeral */}
                    <span className="font-display text-brown/15 text-3xl md:text-4xl leading-none shrink-0 w-12 md:w-16 group-hover:text-terracotta/30 transition-colors duration-500">
                      {romanNum}
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <h3 className="font-display italic text-brown text-lg md:text-xl group-hover:text-terracotta transition-colors duration-500 shrink-0">
                          {title}
                        </h3>
                        <span className="leader-dots hidden md:block" />
                        <span className="font-caps text-[0.6rem] tracking-[0.15em] uppercase text-brown/40 small-caps shrink-0 hidden md:block">
                          {categories}
                        </span>
                      </div>
                      <p className="font-body text-brown/50 text-sm leading-relaxed line-clamp-1 mt-1">
                        {description}
                      </p>
                      <p className="font-caps text-[0.55rem] tracking-[0.15em] uppercase text-brown/30 small-caps mt-2 md:hidden">
                        {categories}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Continue link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link
            to="/portfolio"
            className="inline-block font-display italic text-terracotta hover:text-terracotta-light transition-colors duration-500 text-lg"
          >
            {continueLabel}
          </Link>
        </motion.div>
      </div>

      <OrnamentalDivider className="mt-20" />
    </section>
  );
}
