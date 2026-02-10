import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeLink as Link, useThemeNavigate } from '@auror/shared-ui';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects, caseStudies } from '@auror/data';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

/* Small botanical decoration for section headers */
function SectionLeaf() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-terra/40 inline-block mr-3 -mt-1">
      <path
        d="M12 20 C12 20 6 14 6 10 C6 6 9 4 12 4 C15 4 18 6 18 10 C18 14 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path d="M12 12V20" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

/* Image placeholder with organic styling */
function ImagePlaceholder({ color, index }: { color: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(45,80,22,0.08)]"
    >
      <div
        className="aspect-[16/10] relative"
        style={{ backgroundColor: color }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${color}DD 0%, ${color}AA 50%, #FDF8F030 100%)`,
          }}
        />
        {/* Decorative botanical pattern */}
        <svg
          className="absolute bottom-4 right-4 w-20 h-20 text-white/10"
          viewBox="0 0 80 80"
          fill="none"
        >
          <path
            d="M40 70 C40 70 20 50 20 35 C20 20 30 15 40 15 C50 15 60 20 60 35 C60 50 40 70 40 70Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M40 40V70" stroke="currentColor" strokeWidth="1" />
        </svg>
        <div className="absolute top-4 left-4">
          <span className="font-hand text-xl text-white/50">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useThemeNavigate();
  const { t, i18n } = useTranslation();
  const { t: tp } = useTranslation('projects');

  const lang = (i18n.language?.startsWith('en') ? 'en' : 'it') as 'it' | 'en';

  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug]);
  const caseStudy = useMemo(
    () => (project ? caseStudies.find((cs) => cs.projectId === project.id) : null),
    [project]
  );

  const projectIndex = useMemo(() => projects.findIndex((p) => p.slug === slug), [slug]);

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  if (!project || !caseStudy) {
    return (
      <div className="bg-cream min-h-screen">
        <Nav />
        <div className="pt-32 text-center">
          <p className="font-hand text-3xl text-forest/40">
            {lang === 'en' ? 'Project not found...' : 'Progetto non trovato...'}
          </p>
          <Link
            to="/portfolio"
            className="inline-block mt-8 font-body text-terra hover:text-forest transition-colors underline"
          >
            {t('nav.backToPortfolio')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const translatedTitle = tp(`${project.slug}.title`, { defaultValue: project.title });

  const sections = [
    { key: 'overview', label: t('caseStudy.overview'), content: caseStudy.overview[lang] },
    { key: 'challenge', label: t('caseStudy.challenge'), content: caseStudy.challenge[lang] },
    { key: 'process', label: t('caseStudy.process'), content: caseStudy.process[lang] },
    { key: 'solution', label: t('caseStudy.solution'), content: caseStudy.solution[lang] },
    { key: 'results', label: t('caseStudy.results'), content: caseStudy.results[lang] },
  ];

  return (
    <div className="bg-cream min-h-screen">
      <Nav />

      <main className="pt-24 pb-24">
        {/* Hero area */}
        <div
          className="relative py-20 md:py-28"
          style={{ backgroundColor: project.color }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${project.color}EE 0%, ${project.color}CC 60%, #FDF8F0 100%)`,
            }}
          />

          {/* Botanical overlay */}
          <svg
            className="absolute top-8 right-8 w-32 h-32 text-white/5"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M50 90 C50 90 25 65 25 45 C25 25 37 15 50 15 C63 15 75 25 75 45 C75 65 50 90 50 90Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M50 50V90" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          <div className="relative z-10 mx-auto max-w-4xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 font-body text-sm text-white/60 hover:text-white/90 transition-colors mb-8"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t('nav.backToPortfolio')}
              </Link>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="font-hand text-4xl text-white/40">
                  {String(projectIndex + 1).padStart(2, '0')}
                </span>
                <span className="font-body text-sm text-white/50">{project.year}</span>
                {project.client && (
                  <>
                    <span className="text-white/30">&middot;</span>
                    <span className="font-body text-sm text-white/50">{project.client}</span>
                  </>
                )}
              </div>

              <h1 className="font-display text-4xl md:text-6xl text-white font-light leading-tight">
                {translatedTitle}
              </h1>

              <div className="flex flex-wrap gap-2 mt-6">
                {project.categories.map((cat) => (
                  <span
                    key={cat}
                    className="font-body text-xs font-medium text-white/70 border border-white/20 rounded-full px-3 py-1"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Case study content */}
        <div className="mx-auto max-w-4xl px-6 mt-16">
          {sections.map((section, i) => (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-16"
            >
              <h2 className="font-display text-2xl md:text-3xl text-forest font-light mb-6">
                <SectionLeaf />
                {section.label}
              </h2>
              <p className="font-body text-lg leading-[1.9] text-forest/75">
                {section.content}
              </p>

              {/* Insert image placeholders after overview and solution */}
              {(section.key === 'overview' || section.key === 'solution') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                  {project.images
                    .slice(
                      section.key === 'overview' ? 0 : 2,
                      section.key === 'overview' ? 2 : 4
                    )
                    .map((_, imgIdx) => (
                      <ImagePlaceholder
                        key={imgIdx}
                        color={project.color}
                        index={section.key === 'overview' ? imgIdx : imgIdx + 2}
                      />
                    ))}
                </div>
              )}
            </motion.div>
          ))}

          {/* Testimonial garden card */}
          {caseStudy.testimonial && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="my-20"
            >
              <h2 className="font-display text-2xl md:text-3xl text-forest font-light mb-8">
                <SectionLeaf />
                {t('caseStudy.testimonial')}
              </h2>

              <div className="relative bg-cream-light rounded-3xl p-8 md:p-12 border-2 border-rose/20 shadow-[0_4px_30px_rgba(196,121,139,0.08)]">
                {/* Rose corner decorations */}
                <svg className="absolute top-3 left-3 w-8 h-8 text-rose/20" viewBox="0 0 30 30" fill="none">
                  <path d="M3 27 C3 15, 15 3, 27 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="27" cy="3" r="2" fill="currentColor" opacity="0.5" />
                </svg>
                <svg className="absolute bottom-3 right-3 w-8 h-8 text-rose/20 rotate-180" viewBox="0 0 30 30" fill="none">
                  <path d="M3 27 C3 15, 15 3, 27 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="27" cy="3" r="2" fill="currentColor" opacity="0.5" />
                </svg>

                {/* Quote mark */}
                <span className="font-display text-6xl text-rose/20 leading-none block mb-4">&ldquo;</span>

                <blockquote className="font-display italic text-xl md:text-2xl text-forest/80 leading-relaxed font-light -mt-8 ml-4">
                  {caseStudy.testimonial.quote[lang]}
                </blockquote>

                <div className="mt-8 ml-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose/15 flex items-center justify-center">
                    <span className="font-display text-sm text-rose font-medium">
                      {caseStudy.testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-forest">
                      {caseStudy.testimonial.author}
                    </p>
                    <p className="font-body text-xs text-forest/50">
                      {caseStudy.testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Handwritten annotation */}
                <motion.p
                  initial={{ opacity: 0, rotate: 3 }}
                  whileInView={{ opacity: 1, rotate: 3 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-6 right-8 font-hand text-lg text-rose/40 rotate-3 hidden md:block"
                >
                  {lang === 'en' ? 'so kind!' : 'che gentile!'}
                </motion.p>
              </div>
            </motion.div>
          )}

          {/* Gallery section */}
          {project.images.length > 4 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="mb-20"
            >
              <h2 className="font-display text-2xl md:text-3xl text-forest font-light mb-8">
                <SectionLeaf />
                {t('caseStudy.gallery')}
              </h2>
              <div className="columns-1 md:columns-2 gap-4 space-y-4">
                {project.images.slice(4).map((_, imgIdx) => (
                  <div key={imgIdx} className="break-inside-avoid">
                    <ImagePlaceholder color={project.color} index={imgIdx + 4} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Prev / Next navigation */}
          <div className="mt-20 pt-12 border-t border-forest/10">
            <div className="flex items-stretch justify-between gap-4">
              {prevProject ? (
                <button
                  onClick={() => navigate(`/portfolio/${prevProject.slug}`)}
                  className="group text-left flex-1 max-w-[45%]"
                >
                  <span className="font-body text-xs text-forest/40 uppercase tracking-wider">
                    {t('caseStudy.prevProject')}
                  </span>
                  <div className="flex items-center gap-3 mt-2">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" className="text-forest/40 group-hover:text-terra transition-colors shrink-0">
                      <path d="M5 3L0 8L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0 8H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className="font-display text-lg text-forest group-hover:text-terra transition-colors truncate">
                      {tp(`${prevProject.slug}.title`, { defaultValue: prevProject.title })}
                    </span>
                  </div>
                </button>
              ) : (
                <div />
              )}

              {nextProject ? (
                <button
                  onClick={() => navigate(`/portfolio/${nextProject.slug}`)}
                  className="group text-right flex-1 max-w-[45%] ml-auto"
                >
                  <span className="font-body text-xs text-forest/40 uppercase tracking-wider">
                    {t('caseStudy.nextProject')}
                  </span>
                  <div className="flex items-center justify-end gap-3 mt-2">
                    <span className="font-display text-lg text-forest group-hover:text-terra transition-colors truncate">
                      {tp(`${nextProject.slug}.title`, { defaultValue: nextProject.title })}
                    </span>
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" className="text-forest/40 group-hover:text-terra transition-colors shrink-0">
                      <path d="M15 3L20 8L15 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0 8H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </button>
              ) : (
                <div />
              )}
            </div>

            {/* Back to portfolio link */}
            <div className="text-center mt-12">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 font-hand text-xl text-terra hover:text-forest transition-colors"
              >
                <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                  <path d="M5 1L0 6L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M0 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {t('caseStudy.viewAll')}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
