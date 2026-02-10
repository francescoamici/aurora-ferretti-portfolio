import { useParams } from 'react-router-dom';
import { ThemeLink as Link, useThemeNavigate } from '@auror/shared-ui';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects, caseStudies } from '@auror/data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function SectionBlock({
  label,
  content,
  index,
}: {
  label: string;
  content: string;
  index: number;
}) {
  return (
    <motion.div
      className="py-16"
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <p className="mb-4 text-xs tracking-[0.4em] text-gold/60 uppercase">
        {label}
      </p>
      <p className="font-accent text-xl leading-relaxed text-ivory/80 md:text-2xl">
        {content}
      </p>
    </motion.div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useThemeNavigate();
  const lang = (i18n.language?.startsWith('it') ? 'it' : 'en') as 'it' | 'en';

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];
  const caseStudy = project
    ? caseStudies.find((cs) => cs.projectId === project.id)
    : undefined;

  if (!project || !caseStudy) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex min-h-screen items-center justify-center bg-nero px-6"
      >
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold text-ivory">
            Project Not Found
          </h1>
          <Link
            to="/portfolio"
            className="mt-8 inline-flex items-center gap-2 text-sm text-gold"
          >
            <span>&#8592;</span>
            {t('nav.backToPortfolio')}
          </Link>
        </div>
      </motion.div>
    );
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="min-h-screen bg-nero"
    >
      {/* Hero area */}
      <div
        className="relative flex min-h-[70vh] items-end overflow-hidden"
        style={{ backgroundColor: project.color }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-nero via-nero/50 to-transparent" />

        {/* Content */}
        <div className="relative z-10 w-full px-6 pb-16 pt-32">
          <div className="mx-auto max-w-4xl">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-sm tracking-wider text-ivory/60 transition-colors hover:text-gold"
              >
                <span>&#8592;</span>
                <span>{t('nav.backToPortfolio')}</span>
              </Link>
            </motion.div>

            {/* Project info */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="flex flex-wrap items-center gap-3 text-xs tracking-wider text-ivory/50 uppercase">
                <span>{project.year}</span>
                <span className="text-gold/40">&#8226;</span>
                <span>{project.categories.join(' / ')}</span>
                {project.client && (
                  <>
                    <span className="text-gold/40">&#8226;</span>
                    <span>{project.client}</span>
                  </>
                )}
              </div>

              <h1 className="mt-4 font-display text-5xl font-bold text-ivory md:text-7xl">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Case Study content */}
      <div className="px-6">
        <div className="mx-auto max-w-4xl">
          {/* Overview */}
          <SectionBlock
            label={t('caseStudy.overview')}
            content={caseStudy.overview[lang]}
            index={0}
          />

          <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          {/* Challenge */}
          <SectionBlock
            label={t('caseStudy.challenge')}
            content={caseStudy.challenge[lang]}
            index={1}
          />

          <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          {/* Image Gallery */}
          <motion.div
            className="py-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-8 text-xs tracking-[0.4em] text-gold/60 uppercase">
              {t('caseStudy.gallery')}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {project.images.slice(0, 4).map((_, idx) => (
                <motion.div
                  key={idx}
                  className="aspect-[4/3] overflow-hidden rounded-lg"
                  style={{ backgroundColor: project.color }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  {/* Placeholder grid pattern */}
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                      backgroundSize: '30px 30px',
                    }}
                  >
                    <span className="font-accent text-sm tracking-widest text-white/20 uppercase">
                      {project.title} &mdash; {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          {/* Process */}
          <SectionBlock
            label={t('caseStudy.process')}
            content={caseStudy.process[lang]}
            index={2}
          />

          <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          {/* Solution */}
          <SectionBlock
            label={t('caseStudy.solution')}
            content={caseStudy.solution[lang]}
            index={3}
          />

          <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          {/* Results */}
          <SectionBlock
            label={t('caseStudy.results')}
            content={caseStudy.results[lang]}
            index={4}
          />

          {/* Testimonial */}
          {caseStudy.testimonial && (
            <>
              <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

              <motion.div
                className="py-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8 }}
              >
                <p className="mb-8 text-xs tracking-[0.4em] text-gold/60 uppercase">
                  {t('caseStudy.testimonial')}
                </p>

                <div className="relative pl-8">
                  {/* Gold quote line */}
                  <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-gold via-gold/40 to-transparent" />

                  <blockquote className="font-accent text-2xl leading-relaxed font-light italic text-ivory/80 md:text-3xl">
                    &ldquo;{caseStudy.testimonial.quote[lang]}&rdquo;
                  </blockquote>

                  <div className="mt-6">
                    <p className="font-display text-sm font-semibold tracking-wider text-gold">
                      {caseStudy.testimonial.author}
                    </p>
                    <p className="mt-1 text-xs tracking-wider text-ivory/40">
                      {caseStudy.testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Next/Previous navigation */}
      <div className="border-t border-gold-dim px-6 py-0">
        <div className="mx-auto grid max-w-4xl md:grid-cols-2">
          {/* Previous */}
          <div className="border-b border-gold-dim py-12 md:border-b-0 md:border-r md:pr-12">
            {prevProject ? (
              <button
                onClick={() => navigate(`/portfolio/${prevProject.slug}`)}
                className="group block text-left"
              >
                <p className="mb-2 text-xs tracking-widest text-gold/50 uppercase">
                  {t('caseStudy.prevProject')}
                </p>
                <p className="font-display text-xl text-ivory transition-colors group-hover:text-gold">
                  <span className="mr-2">&#8592;</span>
                  {prevProject.title}
                </p>
              </button>
            ) : (
              <div />
            )}
          </div>

          {/* Next */}
          <div className="py-12 md:pl-12 md:text-right">
            {nextProject ? (
              <button
                onClick={() => navigate(`/portfolio/${nextProject.slug}`)}
                className="group block w-full text-right"
              >
                <p className="mb-2 text-xs tracking-widest text-gold/50 uppercase">
                  {t('caseStudy.nextProject')}
                </p>
                <p className="font-display text-xl text-ivory transition-colors group-hover:text-gold">
                  {nextProject.title}
                  <span className="ml-2">&#8594;</span>
                </p>
              </button>
            ) : (
              <button
                onClick={() => navigate('/portfolio')}
                className="group block w-full text-right"
              >
                <p className="mb-2 text-xs tracking-widest text-gold/50 uppercase">
                  {t('nav.portfolio')}
                </p>
                <p className="font-display text-xl text-ivory transition-colors group-hover:text-gold">
                  {t('caseStudy.viewAll')}
                  <span className="ml-2">&#8594;</span>
                </p>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gold-dim bg-nero px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3">
          <p className="text-xs tracking-wider text-ivory/30">
            &copy; {new Date().getFullYear()} Aurora Ferretti.{' '}
            {t('footer.rights')}.
          </p>
          <p className="text-xs tracking-wider text-ivory/20">
            {t('footer.madeWith')}{' '}
            <span className="text-burgundy">&hearts;</span>{' '}
            {t('footer.inRome')}
          </p>
        </div>
      </footer>
    </motion.div>
  );
}
