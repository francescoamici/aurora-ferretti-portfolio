import { useParams, Navigate } from 'react-router-dom';
import { ThemeLink as Link } from '@auror/shared-ui';
import { motion } from 'framer-motion';
import { projects, caseStudies } from '@auror/data';
import { useTranslation } from '@auror/i18n';

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language?.startsWith('it') ? 'it' : 'en') as 'it' | 'en';

  const project = projects.find((p) => p.slug === slug);
  if (!project) return <Navigate to="/portfolio" replace />;

  const caseStudy = caseStudies.find((cs) => cs.projectId === project.id);
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const sections = caseStudy
    ? [
        { key: 'overview', label: t('caseStudy.overview'), text: caseStudy.overview[lang] },
        { key: 'challenge', label: t('caseStudy.challenge'), text: caseStudy.challenge[lang] },
        { key: 'process', label: t('caseStudy.process'), text: caseStudy.process[lang] },
        { key: 'solution', label: t('caseStudy.solution'), text: caseStudy.solution[lang] },
        { key: 'results', label: t('caseStudy.results'), text: caseStudy.results[lang] },
      ]
    : [];

  return (
    <main className="min-h-screen pt-32 pb-40 px-6">
      <div className="mx-auto max-w-2xl">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-20"
        >
          <Link
            to="/portfolio"
            className="font-body text-sm text-black/30 hover:text-black transition-colors duration-300"
          >
            &larr; {t('nav.backToPortfolio')}
          </Link>
        </motion.div>

        {/* Project header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <span className="font-mono text-xs text-black/30">
              {project.year}
            </span>
            <span className="w-px h-3 bg-black/10" />
            <span className="font-mono text-xs text-black/30">
              {project.categories.join(', ')}
            </span>
            {project.client && (
              <>
                <span className="w-px h-3 bg-black/10" />
                <span className="font-mono text-xs text-black/30">
                  {project.client}
                </span>
              </>
            )}
          </div>
        </motion.div>

        {/* Hero image placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-24 aspect-[16/9] border border-black/5"
          style={{ backgroundColor: project.color }}
        />

        {/* Case study sections */}
        {sections.map((section, i) => (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            className="mb-20"
          >
            <h2 className="font-display text-xl font-medium tracking-tight mb-6 text-black">
              {section.label}
            </h2>
            <p className="font-body text-base leading-[1.9] text-black/60">
              {section.text}
            </p>
          </motion.div>
        ))}

        {/* Gallery placeholders */}
        {project.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-24"
          >
            <h2 className="font-display text-xl font-medium tracking-tight mb-10 text-black">
              {t('caseStudy.gallery')}
            </h2>
            <div className="space-y-6">
              {project.images.map((_, imgIndex) => (
                <div
                  key={imgIndex}
                  className="aspect-[3/2] border border-black/5"
                  style={{ backgroundColor: `${project.color}20` }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Testimonial */}
        {caseStudy?.testimonial && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mb-24 py-16 border-t border-b border-black/5"
          >
            <blockquote className="font-body text-lg italic leading-[1.9] text-black/50 text-center max-w-xl mx-auto mb-6">
              &ldquo;{caseStudy.testimonial.quote[lang]}&rdquo;
            </blockquote>
            <p className="font-mono text-xs text-black/30 text-center">
              {caseStudy.testimonial.author} &mdash; {caseStudy.testimonial.role}
            </p>
          </motion.div>
        )}

        {/* Prev / Next navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex justify-between items-center pt-12 border-t border-black/5"
        >
          {prevProject ? (
            <Link
              to={`/portfolio/${prevProject.slug}`}
              className="font-body text-sm text-black/30 hover:text-black transition-colors duration-300"
            >
              &larr; {prevProject.title}
            </Link>
          ) : (
            <span />
          )}
          {nextProject ? (
            <Link
              to={`/portfolio/${nextProject.slug}`}
              className="font-body text-sm text-black/30 hover:text-black transition-colors duration-300 text-right"
            >
              {nextProject.title} &rarr;
            </Link>
          ) : (
            <span />
          )}
        </motion.div>
      </div>
    </main>
  );
}
