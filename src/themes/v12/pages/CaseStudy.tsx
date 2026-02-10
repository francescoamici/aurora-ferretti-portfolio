import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeLink as Link, useThemeNavigate } from '@auror/shared-ui';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects, caseStudies } from '@auror/data';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

/* ---------- Botanical Overlay for Hero ---------- */

function HeroBotanicalOverlay() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.04]"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="csLeafPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path
            d="M40 10C40 10 30 25 30 38C30 45 34 50 40 50C46 50 50 45 50 38C50 25 40 10 40 10Z"
            fill="white"
            opacity="0.5"
          />
          <path d="M40 50V18" stroke="white" strokeWidth="0.5" />
          <path d="M40 30C36 26 33 24 33 24" stroke="white" strokeWidth="0.3" />
          <path d="M40 24C44 20 47 18 47 18" stroke="white" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#csLeafPattern)" />
    </svg>
  );
}

/* ---------- Section Leaf Icon ---------- */

function SectionLeafIcon() {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" className="inline-block text-sage">
      <path
        d="M8 2C8 2 3 7 3 12C3 15.5 5.2 18 8 18C10.8 18 13 15.5 13 12C13 7 8 2 8 2Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path d="M8 18V5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Botanical Pattern for Image Placeholder ---------- */

function ImagePlaceholder({ color, index }: { color: string; index: number }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: `linear-gradient(${135 + index * 30}deg, ${color}cc, ${color}88)`,
        aspectRatio: index % 2 === 0 ? '16/10' : '4/3',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Botanical decoration */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.06]"
        viewBox="0 0 200 150"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id={`imgLeaf${index}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M25 8C25 8 18 16 18 24C18 28 21 31 25 31C29 31 32 28 32 24C32 16 25 8 25 8Z"
              fill="white"
              opacity="0.4"
            />
            <path d="M25 31V12" stroke="white" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="200" height="150" fill={`url(#imgLeaf${index})`} />
      </svg>

      {/* Image number */}
      <span className="absolute bottom-4 right-4 font-hand text-2xl text-white/30">
        {String(index + 1).padStart(2, '0')}
      </span>
    </motion.div>
  );
}

/* ---------- Rose Corner for Testimonial ---------- */

function RoseCornerTopLeft() {
  return (
    <svg className="absolute -top-2 -left-2 h-12 w-12 text-petal/25" viewBox="0 0 48 48" fill="none">
      <path d="M6 42C6 24 14 10 32 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <circle cx="18" cy="20" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="28" cy="10" r="2.5" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

function RoseCornerBottomRight() {
  return (
    <svg className="absolute -bottom-2 -right-2 h-12 w-12 rotate-180 text-petal/25" viewBox="0 0 48 48" fill="none">
      <path d="M6 42C6 24 14 10 32 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <circle cx="18" cy="20" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="28" cy="10" r="2.5" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

/* ---------- Case Study Page ---------- */

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useThemeNavigate();
  const lang = i18n.language?.startsWith('it') ? 'it' : 'en';

  const project = useMemo(
    () => projects.find((p) => p.slug === slug),
    [slug]
  );

  const caseStudy = useMemo(
    () => (project ? caseStudies.find((cs) => cs.projectId === project.id) : undefined),
    [project]
  );

  const projectIndex = useMemo(
    () => projects.findIndex((p) => p.slug === slug),
    [slug]
  );

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="text-center">
          <p className="font-hand text-2xl text-earth/40">Progetto non trovato</p>
          <Link
            to="/portfolio"
            className="mt-4 inline-flex items-center gap-2 font-hand text-lg text-sage hover:text-terra"
          >
            {t('nav.backToPortfolio')}
          </Link>
        </div>
      </div>
    );
  }

  const sections = caseStudy
    ? [
        { key: 'overview', content: caseStudy.overview[lang] },
        { key: 'challenge', content: caseStudy.challenge[lang] },
        { key: 'process', content: caseStudy.process[lang] },
        { key: 'solution', content: caseStudy.solution[lang] },
        { key: 'results', content: caseStudy.results[lang] },
      ]
    : [];

  return (
    <div className="min-h-screen bg-cream">
      <Nav />

      {/* Hero */}
      <section
        className="relative overflow-hidden pt-20"
        style={{
          background: `linear-gradient(180deg, ${project.color}dd 0%, ${project.color}88 60%, #FDF6ED 100%)`,
        }}
      >
        <HeroBotanicalOverlay />

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-28">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 12L6 8L10 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t('nav.backToPortfolio')}
            </Link>
          </motion.div>

          {/* Project info */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
                {project.year}
              </span>
              {project.client && (
                <span className="flex items-center gap-1.5">
                  <span className="font-hand text-sm text-white/40">per</span>
                  <span className="text-sm font-medium text-white/70">{project.client}</span>
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium text-white/70"
                >
                  {cat}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
        {/* Case Study Sections */}
        {sections.map((section, i) => (
          <motion.div
            key={section.key}
            className="mb-14"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="mb-4 flex items-center gap-2 font-display text-2xl font-medium text-earth">
              <SectionLeafIcon />
              {t(`caseStudy.${section.key}`)}
            </h2>
            <p className="text-base leading-relaxed text-earth/70 sm:text-lg sm:leading-relaxed">
              {section.content}
            </p>

            {/* Image placeholders after certain sections */}
            {(section.key === 'overview' || section.key === 'solution') && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {project.images.slice(i * 2, i * 2 + 2).map((_, imgIdx) => (
                  <ImagePlaceholder
                    key={imgIdx}
                    color={project.color}
                    index={i * 2 + imgIdx}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}

        {/* Testimonial */}
        {caseStudy?.testimonial && (
          <motion.div
            className="relative my-16 rounded-3xl bg-petal-light p-8 sm:p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <RoseCornerTopLeft />
            <RoseCornerBottomRight />

            {/* Large quote mark */}
            <span className="mb-4 block font-display text-6xl leading-none text-petal/40">
              &ldquo;
            </span>

            <blockquote className="font-display text-xl font-light italic leading-relaxed text-earth sm:text-2xl">
              {caseStudy.testimonial.quote[lang]}
            </blockquote>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-petal/20" />
              <div className="text-right">
                <p className="text-sm font-medium text-earth">
                  {caseStudy.testimonial.author}
                </p>
                <p className="font-hand text-sm text-earth/50">
                  {caseStudy.testimonial.role}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Gallery Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-6 flex items-center gap-2 font-display text-2xl font-medium text-earth">
            <SectionLeafIcon />
            {t('caseStudy.gallery')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.images.map((_, i) => (
              <ImagePlaceholder key={i} color={project.color} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Prev / Next Navigation */}
        <div className="mt-20 flex items-stretch justify-between gap-4 border-t border-sage/10 pt-10">
          {prevProject ? (
            <button
              onClick={() => navigate(`/portfolio/${prevProject.slug}`)}
              className="group flex flex-1 flex-col items-start gap-1 rounded-2xl bg-cream-light/80 p-5 ring-1 ring-earth/5 transition-all hover:ring-sage/20"
            >
              <span className="flex items-center gap-1 text-xs text-earth/40">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M8 10L5 7L8 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t('caseStudy.prevProject')}
              </span>
              <span className="font-display text-base font-medium text-earth transition-colors group-hover:text-sage">
                {prevProject.title}
              </span>
            </button>
          ) : (
            <div className="flex-1" />
          )}

          {nextProject ? (
            <button
              onClick={() => navigate(`/portfolio/${nextProject.slug}`)}
              className="group flex flex-1 flex-col items-end gap-1 rounded-2xl bg-cream-light/80 p-5 ring-1 ring-earth/5 transition-all hover:ring-sage/20"
            >
              <span className="flex items-center gap-1 text-xs text-earth/40">
                {t('caseStudy.nextProject')}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M6 4L9 7L6 10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-display text-base font-medium text-earth transition-colors group-hover:text-sage">
                {nextProject.title}
              </span>
            </button>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
