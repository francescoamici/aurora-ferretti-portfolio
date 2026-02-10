import { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ThemeLink as Link } from '@auror/shared-ui';
import { motion } from 'framer-motion';
import { projects, caseStudies } from '@auror/data';
import { useTranslation } from '@auror/i18n';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language?.startsWith('it') ? 'it' : 'en') as 'it' | 'en';

  const project = useMemo(
    () => projects.find((p) => p.slug === slug),
    [slug]
  );

  const caseStudy = useMemo(
    () => (project ? caseStudies.find((cs) => cs.projectId === project.id) : undefined),
    [project]
  );

  const projectIndex = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  const sections = caseStudy
    ? [
        { key: 'overview', label: t('caseStudy.overview'), content: caseStudy.overview[lang] },
        { key: 'challenge', label: t('caseStudy.challenge'), content: caseStudy.challenge[lang] },
        { key: 'process', label: t('caseStudy.process'), content: caseStudy.process[lang] },
        { key: 'solution', label: t('caseStudy.solution'), content: caseStudy.solution[lang] },
        { key: 'results', label: t('caseStudy.results'), content: caseStudy.results[lang] },
      ]
    : [];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-cream"
    >
      <Nav />

      {/* Hero with project color */}
      <div className="relative pt-16 md:pt-20">
        <div
          className="relative w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden"
          style={{ backgroundColor: project.color }}
        >
          {/* Warm overlay gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(160deg, rgba(255,248,240,0.1) 0%, transparent 40%, rgba(61,43,31,0.4) 100%)`,
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(61,43,31,0.25) 100%)',
            }}
          />

          {/* Title overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="font-display italic text-cream tracking-wide"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)' }}
              >
                {project.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-3 flex flex-wrap items-center justify-center gap-3"
              >
                <span className="font-body text-sm text-cream/60">{project.year}</span>
                {project.client && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-cream/30" />
                    <span className="font-body text-sm text-cream/60">{project.client}</span>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Back link + categories */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 font-body text-sm text-taupe hover:text-sienna transition-colors duration-400"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {t('nav.backToPortfolio')}
          </Link>

          <div className="flex flex-wrap gap-2">
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 rounded-full bg-taupe-light text-[10px] font-body font-medium text-espresso/55 uppercase tracking-wider"
              >
                {cat}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Case study content */}
      {caseStudy && (
        <div className="max-w-4xl mx-auto px-6 md:px-10 pb-16">
          {/* Sections */}
          <div className="space-y-16 md:space-y-20">
            {sections.map((section, i) => (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
              >
                {/* Section label with gold line */}
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-display text-lg md:text-xl text-espresso">
                    {section.label}
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
                </div>

                {/* Content */}
                <p className="font-accent text-espresso/75 text-base md:text-lg leading-relaxed md:leading-[1.85]">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Image gallery */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20 md:mt-28"
          >
            {/* Gallery heading */}
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-display text-lg md:text-xl text-espresso">
                {t('caseStudy.gallery')}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            </div>

            <div className="space-y-5">
              {project.images.map((img, i) => (
                <motion.div
                  key={img}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-warm"
                  style={{ backgroundColor: project.color }}
                >
                  {/* Warm vignette */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(ellipse at center, transparent 50%, rgba(61,43,31,0.2) 100%)',
                    }}
                  />

                  {/* Image number */}
                  <div className="absolute bottom-3 right-4 z-10">
                    <span className="font-body text-[10px] tracking-wider text-cream/40 uppercase">
                      {String(i + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonial */}
          {caseStudy.testimonial && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-20 md:mt-28"
            >
              {/* Heading */}
              <div className="flex items-center gap-4 mb-10">
                <h2 className="font-display text-lg md:text-xl text-espresso">
                  {t('caseStudy.testimonial')}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
              </div>

              <div className="glass-warm rounded-2xl p-8 md:p-10 shadow-warm-lg relative overflow-hidden">
                {/* Burgundy accent left border */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-burgundy via-burgundy/60 to-transparent rounded-l-2xl" />

                {/* Large gold quote mark */}
                <svg
                  className="absolute top-4 right-6 w-16 h-16 md:w-20 md:h-20 text-gold/10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                </svg>

                <div className="relative z-10">
                  <p className="font-display italic text-espresso/80 text-lg md:text-xl leading-relaxed">
                    &ldquo;{caseStudy.testimonial.quote[lang]}&rdquo;
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-burgundy/10 flex items-center justify-center">
                      <span className="font-display text-xs text-burgundy">
                        {caseStudy.testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-espresso">
                        {caseStudy.testimonial.author}
                      </p>
                      <p className="font-body text-xs text-taupe">
                        {caseStudy.testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Prev / Next navigation */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 pb-20 md:pb-28">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-10" />

        <div className="flex items-center justify-between">
          {/* Previous */}
          <div>
            {prevProject ? (
              <Link to={`/portfolio/${prevProject.slug}`} className="group">
                <span className="font-body text-[10px] uppercase tracking-[0.2em] text-taupe block mb-1.5">
                  &larr; {t('caseStudy.prevProject')}
                </span>
                <span className="font-display text-sm md:text-base text-espresso/60 group-hover:text-sienna tracking-wide transition-colors duration-500">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* View all */}
          <Link
            to="/portfolio"
            className="font-body text-[10px] uppercase tracking-[0.2em] text-gold hover:text-sienna transition-colors duration-400"
          >
            {t('caseStudy.viewAll')}
          </Link>

          {/* Next */}
          <div className="text-right">
            {nextProject ? (
              <Link to={`/portfolio/${nextProject.slug}`} className="group">
                <span className="font-body text-[10px] uppercase tracking-[0.2em] text-taupe block mb-1.5">
                  {t('caseStudy.nextProject')} &rarr;
                </span>
                <span className="font-display text-sm md:text-base text-espresso/60 group-hover:text-sienna tracking-wide transition-colors duration-500">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </motion.main>
  );
}
