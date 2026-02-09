import { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects, caseStudies } from '@auror/data';
import { useTranslation } from '@auror/i18n';

function toRoman(num: number): string {
  const romanNumerals: [number, string][] = [
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let result = '';
  let remaining = num;
  for (const [value, symbol] of romanNumerals) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
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

  const sequences = caseStudy
    ? [
        { label: 'Overview', content: caseStudy.overview[lang] },
        { label: 'The Challenge', content: caseStudy.challenge[lang] },
        { label: 'The Process', content: caseStudy.process[lang] },
        { label: 'The Solution', content: caseStudy.solution[lang] },
        { label: 'The Results', content: caseStudy.results[lang] },
      ]
    : [];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative min-h-screen bg-film-black"
    >
      {/* Film grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 film-grain" />

      {/* Hero — widescreen letterboxed image */}
      <div className="pt-16 md:pt-20">
        <div className="letterbox">
          <div
            className="widescreen w-full relative"
            style={{ backgroundColor: project.color }}
          >
            {/* Vignette overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)',
              }}
            />

            {/* Title overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="font-display text-warm-white tracking-[0.15em]"
                  style={{ fontSize: 'clamp(1.5rem, 5vw, 4rem)' }}
                >
                  {project.title}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="mt-4 flex flex-wrap items-center justify-center gap-4"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-warm-white/50">
                    ({project.year})
                  </span>
                  {project.client && (
                    <>
                      <span className="text-warm-white/20">&mdash;</span>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-warm-white/50">
                        {project.client}
                      </span>
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="max-w-3xl mx-auto px-6 md:px-12 py-8 flex flex-wrap items-center justify-center gap-4"
      >
        {project.categories.map((cat) => (
          <span
            key={cat}
            className="font-mono text-[10px] tracking-[0.2em] text-gold/60 uppercase"
          >
            {cat}
          </span>
        ))}
      </motion.div>

      {/* Scene Analysis content */}
      {caseStudy && (
        <div className="max-w-3xl mx-auto px-6 md:px-12 pb-16">
          {/* SCENE ANALYSIS header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="flex items-center gap-6 mb-20"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/40" />
            <h2
              className="font-display text-gold text-[10px] md:text-xs tracking-[0.4em] uppercase whitespace-nowrap"
              style={{ fontVariant: 'small-caps' }}
            >
              Scene Analysis
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/40" />
          </motion.div>

          {/* Sequences */}
          <div className="space-y-16 md:space-y-24">
            {sequences.map((seq, i) => (
              <motion.div
                key={seq.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.2 }}
              >
                {/* Sequence label */}
                <p className="font-display text-[10px] tracking-[0.35em] text-gold/70 uppercase mb-6">
                  Sequence {toRoman(i + 1)} &mdash; {seq.label}
                </p>

                {/* Content */}
                <p className="font-body text-warm-white/80 text-base md:text-lg leading-relaxed md:leading-[1.9]">
                  {seq.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Image gallery as "stills" */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="mt-20 md:mt-28"
          >
            <p
              className="font-display text-[10px] tracking-[0.35em] text-gold/70 uppercase mb-10 text-center"
              style={{ fontVariant: 'small-caps' }}
            >
              Production Stills
            </p>

            <div className="space-y-6">
              {project.images.map((img, i) => (
                <motion.div
                  key={img}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="relative widescreen rounded-sm overflow-hidden"
                  style={{ backgroundColor: project.color }}
                >
                  {/* Film grain on still */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="film-grain w-full h-full" />
                  </div>

                  {/* Vignette */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
                    }}
                  />

                  {/* Frame number */}
                  <div className="absolute bottom-3 right-4 z-10">
                    <span className="font-mono text-[9px] tracking-[0.15em] text-warm-white/30">
                      FRM {String(i + 1).padStart(3, '0')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonial as "Critical Review" */}
          {caseStudy.testimonial && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="mt-20 md:mt-28"
            >
              <p
                className="font-display text-[10px] tracking-[0.35em] text-gold/70 uppercase mb-10 text-center"
                style={{ fontVariant: 'small-caps' }}
              >
                Critical Review
              </p>

              <div className="border-l-2 border-gold/40 pl-6 md:pl-10 py-2">
                <p className="font-display italic text-gold/80 text-lg md:text-xl leading-relaxed">
                  &ldquo;{caseStudy.testimonial.quote[lang]}&rdquo;
                </p>
                <div className="mt-6">
                  <p className="font-mono text-xs tracking-[0.15em] text-warm-white/60">
                    {caseStudy.testimonial.author}
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.15em] text-warm-white/30 mt-1">
                    {caseStudy.testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Navigation — Next/Prev films */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 pb-24 md:pb-36">
        <div className="gold-rule mb-12" />

        <div className="flex items-center justify-between">
          {/* Previous Film */}
          <div>
            {prevProject ? (
              <Link
                to={`/portfolio/${prevProject.slug}`}
                className="group"
              >
                <span className="font-mono text-[9px] tracking-[0.25em] text-warm-white/30 uppercase block mb-2">
                  &larr; Previous Film
                </span>
                <span className="font-display text-sm md:text-base text-warm-white/60 group-hover:text-gold tracking-[0.1em] transition-colors duration-500">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Back to portfolio */}
          <Link
            to="/portfolio"
            className="font-mono text-[9px] tracking-[0.25em] text-gold/50 uppercase hover:text-gold transition-colors duration-500"
          >
            All Films
          </Link>

          {/* Next Film */}
          <div className="text-right">
            {nextProject ? (
              <Link
                to={`/portfolio/${nextProject.slug}`}
                className="group"
              >
                <span className="font-mono text-[9px] tracking-[0.25em] text-warm-white/30 uppercase block mb-2">
                  Next Film &rarr;
                </span>
                <span className="font-display text-sm md:text-base text-warm-white/60 group-hover:text-gold tracking-[0.1em] transition-colors duration-500">
                  {nextProject.title}
                </span>
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
