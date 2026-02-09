import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from '@auror/i18n';
import { projects, caseStudies } from '@auror/data';

function SpeedometerGauge({ label, value, delay = 0 }: { label: string; value: number; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center">
      <div className="relative w-28 h-28 mx-auto mb-3">
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="6"
            strokeLinecap="butt"
            strokeDasharray={`${2 * Math.PI * 42}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
            animate={isInView ? { strokeDashoffset: 2 * Math.PI * 42 * (1 - value / 100) } : {}}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E63946" />
              <stop offset="50%" stopColor="#F77F00" />
              <stop offset="100%" stopColor="#FCBF49" />
            </linearGradient>
          </defs>
        </svg>
        {/* Value text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl text-white">{value}%</span>
        </div>
      </div>
      <span className="font-body text-xs tracking-[0.15em] uppercase text-white/40">{label}</span>
    </div>
  );
}

function CaseStudySection({
  title,
  content,
  index,
}: {
  title: string;
  content: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Section header with speed lines */}
      <div className="flex items-center gap-4 mb-6" style={{ transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)` }}>
        <span className="font-big font-700 text-4xl sm:text-5xl text-white/5">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="w-12 h-[2px] racing-stripe" />
        <h3 className="font-display text-xl sm:text-2xl tracking-[0.2em] uppercase text-red">
          {title}
        </h3>
      </div>

      {/* Content */}
      <div className="ml-4 sm:ml-20 relative">
        {/* Speed line decoration */}
        <div className="absolute -left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-red/20 to-transparent" />
        <p className="font-body text-lg sm:text-xl leading-relaxed text-white/70 font-400">
          {content}
        </p>
      </div>
    </motion.div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('common');
  const tProjects = useTranslation('projects').t;

  const project = projects.find((p) => p.slug === slug);
  const caseStudy = project
    ? caseStudies.find((cs) => cs.projectId === project.id)
    : null;

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const lang = i18n.language as 'it' | 'en';

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="font-display text-4xl tracking-[0.2em] text-white/30 uppercase mb-8">
            {i18n.language === 'it' ? 'Progetto non trovato' : 'Project not found'}
          </h1>
          <Link
            to="/portfolio"
            className="font-display text-sm tracking-[0.3em] uppercase text-red hover:text-orange transition-colors"
          >
            &larr;&larr;&larr; {t('nav.backToPortfolio')}
          </Link>
        </div>
      </div>
    );
  }

  const title = tProjects(`${project.slug}.title`, { defaultValue: project.title });

  const sections = caseStudy
    ? [
        { key: 'overview', title: t('caseStudy.overview'), content: caseStudy.overview[lang] },
        { key: 'challenge', title: t('caseStudy.challenge'), content: caseStudy.challenge[lang] },
        { key: 'process', title: t('caseStudy.process'), content: caseStudy.process[lang] },
        { key: 'solution', title: t('caseStudy.solution'), content: caseStudy.solution[lang] },
        { key: 'results', title: t('caseStudy.results'), content: caseStudy.results[lang] },
      ]
    : [];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="pt-24 pb-32 min-h-screen"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Back navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="mb-12"
        >
          <Link
            to="/portfolio"
            className="group flex items-center gap-3"
          >
            <motion.span
              className="font-display text-lg text-red"
              whileHover={{ x: -8 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              &larr;&larr;&larr;
            </motion.span>
            <span className="font-display text-sm tracking-[0.3em] uppercase text-white/40 group-hover:text-white transition-colors duration-150">
              {t('nav.backToPortfolio')}
            </span>
          </Link>
        </motion.div>

        {/* Project header */}
        <div className="mb-20">
          {/* Year and categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-4"
          >
            <span className="font-display text-sm tracking-[0.3em] text-orange/60 uppercase">
              {project.year}
            </span>
            <span className="text-red/30">/</span>
            {project.client && (
              <>
                <span className="font-body text-sm tracking-[0.15em] text-white/40 uppercase">
                  {project.client}
                </span>
                <span className="text-red/30">/</span>
              </>
            )}
            {project.categories.map((cat, i) => (
              <span key={cat} className="relative font-body text-sm tracking-[0.1em] text-white/30 uppercase">
                {cat}
                {i < project.categories.length - 1 && (
                  <span className="ml-4 text-red/20">/</span>
                )}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ x: -80, opacity: 0, filter: 'blur(8px)' }}
            animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="font-big font-800 text-6xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-white leading-[0.9]"
              style={{ transform: 'rotate(-3deg)' }}
            >
              {title}
            </h1>
            {/* Velocity lines */}
            <div className="flex gap-1 mt-3 ml-4">
              <div className="w-32 h-[2px] bg-gradient-to-r from-red/50 to-transparent" />
              <div className="w-20 h-[1px] bg-gradient-to-r from-orange/30 to-transparent mt-1" />
            </div>
          </motion.div>

          {/* Project color accent bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-1 mt-8 origin-left"
            style={{ backgroundColor: project.color, maxWidth: '200px' }}
          />
        </div>

        {/* Image placeholders with diagonal clip-path */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 gap-4">
            {project.images.slice(0, 4).map((img, i) => (
              <motion.div
                key={img}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                className="relative aspect-[4/3] bg-prussian-light overflow-hidden"
                style={{
                  clipPath:
                    i % 2 === 0
                      ? 'polygon(0 0, 100% 3%, 100% 100%, 0 97%)'
                      : 'polygon(0 3%, 100% 0, 100% 97%, 0 100%)',
                }}
              >
                {/* Placeholder with project color */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}40, transparent)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-4xl text-white/5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                {/* Diagonal stripe overlay */}
                <div className="absolute inset-0 diagonal-stripe opacity-30" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Case study sections */}
        {sections.length > 0 && (
          <div className="space-y-20">
            {sections.map((section, index) => (
              <CaseStudySection
                key={section.key}
                title={section.title}
                content={section.content}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Speedometer gauges for results */}
        {caseStudy && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-20 py-12 border-t border-b border-white/5"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-[2px] racing-stripe" />
              <span className="font-display text-sm tracking-[0.3em] uppercase text-orange/60">
                {i18n.language === 'it' ? 'PERFORMANCE' : 'PERFORMANCE'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <SpeedometerGauge
                label={i18n.language === 'it' ? 'Impatto' : 'Impact'}
                value={92}
                delay={0}
              />
              <SpeedometerGauge
                label={i18n.language === 'it' ? 'Innovazione' : 'Innovation'}
                value={88}
                delay={0.15}
              />
              <SpeedometerGauge
                label={i18n.language === 'it' ? 'Risultato' : 'Results'}
                value={95}
                delay={0.3}
              />
            </div>
          </motion.div>
        )}

        {/* Testimonial */}
        {caseStudy?.testimonial && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-20 relative"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-red font-big font-700 text-3xl">/</span>
              <h3 className="font-display text-lg tracking-[0.2em] uppercase text-white/60">
                {t('caseStudy.testimonial')}
              </h3>
            </div>

            <blockquote
              className="ml-4 sm:ml-12 relative"
              style={{ transform: 'rotate(-1deg)' }}
            >
              {/* Big quote mark */}
              <span className="absolute -left-8 -top-6 font-big font-800 text-7xl text-red/10 select-none">
                &ldquo;
              </span>
              <p className="font-body text-xl sm:text-2xl leading-relaxed text-white/60 italic font-300">
                {caseStudy.testimonial.quote[lang]}
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="w-8 h-[2px] bg-orange/40" />
                <span className="font-display text-sm tracking-[0.2em] uppercase text-orange/60">
                  {caseStudy.testimonial.author}
                </span>
                <span className="text-white/20">/</span>
                <span className="font-body text-sm text-white/30">
                  {caseStudy.testimonial.role}
                </span>
              </footer>
            </blockquote>
          </motion.div>
        )}

        {/* Prev / Next navigation */}
        <div className="mt-24 pt-12 border-t border-white/5">
          <div className="flex items-center justify-between">
            {/* PREV */}
            {prevProject ? (
              <Link
                to={`/portfolio/${prevProject.slug}`}
                className="group flex items-center gap-3"
              >
                <motion.span
                  className="font-display text-xl text-red"
                  whileHover={{ x: -10 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  &larr;&larr;&larr;
                </motion.span>
                <div>
                  <span className="block font-body text-xs tracking-[0.2em] text-white/30 uppercase">
                    {t('caseStudy.prevProject')}
                  </span>
                  <span className="font-display text-lg tracking-[0.1em] uppercase text-white/60 group-hover:text-white transition-colors duration-150">
                    {tProjects(`${prevProject.slug}.title`, { defaultValue: prevProject.title })}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {/* NEXT */}
            {nextProject ? (
              <Link
                to={`/portfolio/${nextProject.slug}`}
                className="group flex items-center gap-3 text-right"
              >
                <div>
                  <span className="block font-body text-xs tracking-[0.2em] text-white/30 uppercase">
                    {t('caseStudy.nextProject')}
                  </span>
                  <span className="font-display text-lg tracking-[0.1em] uppercase text-white/60 group-hover:text-white transition-colors duration-150">
                    {tProjects(`${nextProject.slug}.title`, { defaultValue: nextProject.title })}
                  </span>
                </div>
                <motion.span
                  className="font-display text-xl text-red"
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  &rarr;&rarr;&rarr;
                </motion.span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </motion.main>
  );
}
