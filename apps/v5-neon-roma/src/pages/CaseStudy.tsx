import { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects, caseStudies } from '@auror/data';
import { useTranslation } from '@auror/i18n';

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language?.startsWith('it') ? 'it' : 'en') as 'it' | 'en';

  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug]);
  const caseStudy = useMemo(
    () => (project ? caseStudies.find((cs) => cs.projectId === project.id) : undefined),
    [project],
  );

  // Navigation: prev/next
  const currentIndex = useMemo(
    () => (project ? projects.findIndex((p) => p.id === project.id) : -1),
    [project],
  );
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

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
    <main className="relative min-h-screen pt-28 pb-20 px-6">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg animate-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/portfolio"
            className="font-mono text-sm text-cyan/60 hover:text-cyan hover:neon-cyan transition-all duration-300"
          >
            <span className="text-white/30">{'< '}</span>
            {t('nav.backToPortfolio')}
          </Link>
        </motion.div>

        {/* Project header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="font-mono text-xs text-white/30 mb-3">
            {'> '}project.load("{project.slug}")
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-[0.1em] uppercase text-cyan neon-cyan">
            {project.title}
          </h1>

          {/* Meta */}
          <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-sm">
            <span className="text-magenta">{project.year}</span>
            {project.client && (
              <>
                <span className="text-white/20">|</span>
                <span className="text-white/50">
                  <span className="text-white/20">client: </span>
                  {project.client}
                </span>
              </>
            )}
          </div>

          {/* Categories */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="font-mono text-[10px] px-2 py-0.5 rounded border border-cyan/20 text-cyan/60"
              >
                {cat}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Hero image placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-lg overflow-hidden mb-16 aspect-video"
          style={{ backgroundColor: project.color }}
        >
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 6px)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space/60 to-transparent" />

          {/* Centered project title */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-2xl md:text-4xl font-bold text-white/20 tracking-[0.2em] uppercase">
              {project.title}
            </span>
          </div>
        </motion.div>

        {/* Case study sections */}
        {sections.map((section, i) => (
          <motion.div
            key={section.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-12"
          >
            {/* Terminal command header */}
            <div className="font-mono text-sm mb-4">
              <span className="text-white/30">{'> '}</span>
              <span className="text-cyan">project</span>
              <span className="text-white/30">.</span>
              <span className="text-green">{section.key}</span>
            </div>

            {/* Content in glass panel */}
            <div className="glass rounded-lg p-6 md:p-8 neon-border-cyan">
              <h3 className="font-display text-sm font-bold tracking-[0.15em] uppercase text-magenta mb-4">
                {section.label}
              </h3>
              <p className="font-body text-base md:text-lg leading-relaxed text-white/70">
                {section.text}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Image gallery */}
        {project.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <div className="font-mono text-sm mb-4">
              <span className="text-white/30">{'> '}</span>
              <span className="text-cyan">project</span>
              <span className="text-white/30">.</span>
              <span className="text-green">gallery</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative rounded-lg overflow-hidden aspect-[4/3]"
                  style={{ backgroundColor: project.color }}
                >
                  {/* Scanline overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-xs text-white/20">
                      [{String(i + 1).padStart(2, '0')}]
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Testimonial */}
        {caseStudy?.testimonial && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <div className="font-mono text-sm mb-4">
              <span className="text-white/30">{'> '}</span>
              <span className="text-cyan">project</span>
              <span className="text-white/30">.</span>
              <span className="text-green">testimonial</span>
            </div>

            <blockquote className="relative glass-magenta rounded-lg p-8 md:p-10 neon-border-magenta">
              {/* Quote mark */}
              <div className="absolute top-4 left-6 font-display text-6xl text-magenta/20 leading-none">
                "
              </div>

              <p className="relative font-body text-lg md:text-xl italic leading-relaxed text-magenta/80 pl-8">
                {caseStudy.testimonial.quote[lang]}
              </p>

              <div className="mt-6 pl-8 font-mono text-sm">
                <span className="text-cyan">{caseStudy.testimonial.author}</span>
                <span className="text-white/30"> // </span>
                <span className="text-white/50">{caseStudy.testimonial.role}</span>
              </div>
            </blockquote>
          </motion.div>
        )}

        {/* Neon divider */}
        <div className="neon-divider mb-12" />

        {/* Navigation: prev / next */}
        <div className="flex items-center justify-between">
          {prevProject ? (
            <Link
              to={`/portfolio/${prevProject.slug}`}
              className="font-mono text-sm text-cyan/60 hover:text-cyan hover:neon-cyan transition-all duration-300 group"
            >
              <span className="text-white/30">{'> '}</span>
              <span className="text-green">prev_project</span>
              <br />
              <span className="text-white/40 text-xs group-hover:text-cyan/60 transition-colors">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              to={`/portfolio/${nextProject.slug}`}
              className="font-mono text-sm text-cyan/60 hover:text-cyan hover:neon-cyan transition-all duration-300 text-right group"
            >
              <span className="text-white/30">{'> '}</span>
              <span className="text-green">next_project</span>
              <br />
              <span className="text-white/40 text-xs group-hover:text-cyan/60 transition-colors">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
}
