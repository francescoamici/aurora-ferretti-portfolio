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
    [slug],
  );

  const caseStudy = useMemo(
    () => (project ? caseStudies.find((cs) => cs.projectId === project.id) : undefined),
    [project],
  );

  // Find prev/next projects
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
      transition={{ duration: 1 }}
      className="relative min-h-screen bg-white"
    >
      <Nav />

      {/* Hero — clean project color block */}
      <div className="pt-20 md:pt-24">
        <div
          className="w-full aspect-[16/7] md:aspect-[16/6] relative"
          style={{ backgroundColor: project.color }}
        >
          {/* Subtle vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.15) 100%)',
            }}
          />

          {/* Title overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="font-display text-white"
                style={{ fontSize: 'clamp(1.5rem, 5vw, 4rem)' }}
              >
                {project.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-4 flex flex-wrap items-center justify-center gap-4"
              >
                <span className="font-body text-[11px] tracking-[0.15em] text-white/60">
                  {project.year}
                </span>
                {project.client && (
                  <>
                    <span className="w-px h-3 bg-white/20" />
                    <span className="font-accent text-sm italic text-white/60">
                      {project.client}
                    </span>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Back link and categories */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 pt-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <Link
            to="/portfolio"
            className="font-body text-[11px] tracking-[0.15em] uppercase text-dove hover:text-charcoal transition-colors duration-500"
          >
            &larr; {t('nav.backToPortfolio')}
          </Link>

          <div className="flex flex-wrap gap-4">
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="font-body text-[11px] tracking-[0.1em] text-dove"
              >
                {cat}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Case study content */}
      {caseStudy && (
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
          {/* Content sections */}
          <div className="space-y-16 md:space-y-24">
            {sections.map((section, i) => (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1 }}
              >
                {/* Section label */}
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-display text-charcoal text-lg md:text-xl">
                    {section.label}
                  </h2>
                  <div className="flex-1 h-px bg-silver" />
                </div>

                {/* Content */}
                <p className="font-accent text-charcoal-light text-base md:text-lg leading-relaxed md:leading-[1.9]">
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
            transition={{ duration: 1 }}
            className="mt-20 md:mt-28"
          >
            <div className="flex items-center gap-4 mb-10">
              <h2 className="font-display text-charcoal text-lg md:text-xl">
                {t('caseStudy.gallery')}
              </h2>
              <div className="flex-1 h-px bg-silver" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((img, i) => (
                <motion.div
                  key={img}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                  className={`relative aspect-[4/3] rounded-lg overflow-hidden ${
                    i === 0 ? 'md:col-span-2 md:aspect-[16/9]' : ''
                  }`}
                  style={{ backgroundColor: project.color }}
                >
                  {/* Subtle inner shadow */}
                  <div
                    className="absolute inset-0"
                    style={{
                      boxShadow: 'inset 0 0 60px rgba(0,0,0,0.06)',
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonial */}
          {caseStudy.testimonial && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="mt-20 md:mt-28"
            >
              <div className="flex items-center gap-4 mb-10">
                <h2 className="font-display text-charcoal text-lg md:text-xl">
                  {t('caseStudy.testimonial')}
                </h2>
                <div className="flex-1 h-px bg-silver" />
              </div>

              <div className="border-l-2 border-lavender pl-6 md:pl-10 py-2">
                <p className="font-display italic text-charcoal text-lg md:text-xl leading-relaxed">
                  &ldquo;{caseStudy.testimonial.quote[lang]}&rdquo;
                </p>
                <div className="mt-6">
                  <p className="font-body text-sm tracking-wide text-charcoal">
                    {caseStudy.testimonial.author}
                  </p>
                  <p className="font-body text-[11px] tracking-wide text-dove mt-0.5">
                    {caseStudy.testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Prev/Next navigation */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 pb-24 md:pb-36">
        <div className="h-px bg-silver mb-12" />

        <div className="flex items-start justify-between">
          {/* Previous project */}
          <div>
            {prevProject ? (
              <Link
                to={`/portfolio/${prevProject.slug}`}
                className="group"
              >
                <span className="font-body text-[10px] tracking-[0.2em] text-dove uppercase block mb-2">
                  &larr; {t('caseStudy.prevProject')}
                </span>
                <span className="font-display text-sm md:text-base text-charcoal-light group-hover:text-charcoal transition-colors duration-500">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* View All */}
          <Link
            to="/portfolio"
            className="font-body text-[10px] tracking-[0.2em] text-dove uppercase hover:text-charcoal transition-colors duration-500"
          >
            {t('caseStudy.viewAll')}
          </Link>

          {/* Next project */}
          <div className="text-right">
            {nextProject ? (
              <Link
                to={`/portfolio/${nextProject.slug}`}
                className="group"
              >
                <span className="font-body text-[10px] tracking-[0.2em] text-dove uppercase block mb-2">
                  {t('caseStudy.nextProject')} &rarr;
                </span>
                <span className="font-display text-sm md:text-base text-charcoal-light group-hover:text-charcoal transition-colors duration-500">
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
