import { useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeLink as Link, useThemeNavigate } from '@auror/shared-ui';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects, caseStudies } from '@auror/data';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function SectionBlock({
  label,
  title,
  children,
  delay = 0,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16 md:mb-20"
    >
      <span className="font-accent text-xs tracking-[0.3em] uppercase text-gold block mb-3">
        {label}
      </span>
      <h3 className="font-display text-2xl md:text-3xl text-charcoal mb-6">{title}</h3>
      <div className="font-body text-base md:text-lg leading-relaxed text-charcoal-light">
        {children}
      </div>
    </motion.div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useThemeNavigate();
  const { t, i18n } = useTranslation();
  const { t: tProj } = useTranslation('projects');
  const lang = i18n.language?.startsWith('it') ? 'it' : 'en';

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const project = useMemo(
    () => projects.find((p) => p.slug === slug),
    [slug]
  );
  const caseStudy = useMemo(
    () => (project ? caseStudies.find((cs) => cs.projectId === project.id) : undefined),
    [project]
  );

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (!project || !caseStudy) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Nav />
        <div className="text-center">
          <h1 className="font-display text-4xl text-charcoal mb-4">Project not found</h1>
          <button
            onClick={() => navigate('/portfolio')}
            className="font-accent text-gold tracking-wider hover:underline"
          >
            {t('nav.backToPortfolio')}
          </button>
        </div>
      </div>
    );
  }

  const projectTitle = tProj(`${project.slug}.title`, { defaultValue: project.title });
  const projectDesc = tProj(`${project.slug}.description`, { defaultValue: '' });

  const sections = [
    { key: 'overview', label: '01', text: caseStudy.overview[lang] },
    { key: 'challenge', label: '02', text: caseStudy.challenge[lang] },
    { key: 'process', label: '03', text: caseStudy.process[lang] },
    { key: 'solution', label: '04', text: caseStudy.solution[lang] },
    { key: 'results', label: '05', text: caseStudy.results[lang] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-cream"
    >
      <Nav />

      {/* Hero section */}
      <div ref={heroRef} className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroScale }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: project.color }}
          />
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

          {/* Decorative diagonal lines */}
          <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="0.5" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="0.5" />
          </svg>

          {/* Large watermark initial */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[15rem] md:text-[25rem] italic text-white/5 select-none leading-none">
              {project.title.charAt(0)}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-20"
          style={{ opacity: heroOpacity }}
        >
          <div className="mx-auto max-w-7xl w-full px-6 md:px-10">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-2 font-accent text-sm tracking-wider text-white/60 hover:text-white transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                {t('nav.backToPortfolio')}
              </Link>
            </motion.div>

            {/* Project title */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-none">
                {projectTitle}
              </h1>
            </motion.div>

            {/* Meta info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 flex flex-wrap items-center gap-4"
            >
              <span className="font-accent text-sm tracking-wider text-white/50">
                {project.year}
              </span>
              {project.client && (
                <>
                  <span className="text-white/20">&#9671;</span>
                  <span className="font-accent text-sm tracking-wider text-white/50">
                    {tProj(`${project.slug}.client`, { defaultValue: project.client })}
                  </span>
                </>
              )}
              <span className="text-white/20">&#9671;</span>
              <div className="flex flex-wrap gap-2">
                {project.categories.map((cat) => (
                  <span
                    key={cat}
                    className="font-accent text-xs tracking-wider text-white/50 border border-white/15 px-2 py-0.5 rounded-sm"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-6 md:px-10 py-20 md:py-28">
        {/* Description intro */}
        {projectDesc && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-xl md:text-2xl lg:text-3xl italic text-charcoal leading-snug mb-16 md:mb-20"
          >
            {projectDesc}
          </motion.p>
        )}

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-16 h-px bg-gold mb-16 md:mb-20 origin-left"
        />

        {/* Case study sections */}
        {sections.map((section) => (
          <SectionBlock
            key={section.key}
            label={section.label}
            title={t(`caseStudy.${section.key}`)}
          >
            <p>{section.text}</p>
          </SectionBlock>
        ))}

        {/* Image placeholders (gallery) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20"
        >
          <span className="font-accent text-xs tracking-[0.3em] uppercase text-gold block mb-3">
            06
          </span>
          <h3 className="font-display text-2xl md:text-3xl text-charcoal mb-8">
            {t('caseStudy.gallery')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {project.images.slice(0, 4).map((_, imgIdx) => (
              <motion.div
                key={imgIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: imgIdx * 0.1 }}
                className="relative aspect-[4/3] rounded-sm overflow-hidden"
                style={{ backgroundColor: project.color }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-accent text-sm tracking-widest text-white/30 uppercase">
                    {projectTitle} — {String(imgIdx + 1).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial */}
        {caseStudy.testimonial && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 md:mb-20 relative py-12 md:py-16"
          >
            {/* Gold accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent" />

            <div className="pl-8 md:pl-12">
              <span className="font-accent text-xs tracking-[0.3em] uppercase text-gold block mb-6">
                {t('caseStudy.testimonial')}
              </span>

              {/* Large opening quote mark */}
              <span className="font-display text-6xl md:text-7xl text-gold/20 leading-none block -mb-6 md:-mb-8">
                &#8220;
              </span>

              <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl italic text-charcoal leading-snug">
                {caseStudy.testimonial.quote[lang]}
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                {/* Small gold circle avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-blush/30 flex items-center justify-center">
                  <span className="font-display text-sm text-charcoal/40">
                    {caseStudy.testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-display text-base text-charcoal">
                    {caseStudy.testimonial.author}
                  </p>
                  <p className="font-accent text-sm text-charcoal-light/60 tracking-wide">
                    {caseStudy.testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Gold divider before nav */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-12"
        />

        {/* Prev/Next navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          {prevProject ? (
            <Link
              to={`/portfolio/${prevProject.slug}`}
              className="group flex items-center gap-3 text-charcoal-light hover:text-charcoal transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <div className="text-left">
                <span className="block font-accent text-xs tracking-wider text-charcoal-light/50 mb-1">
                  {t('caseStudy.prevProject')}
                </span>
                <span className="block font-display text-base md:text-lg group-hover:text-gold transition-colors duration-300">
                  {tProj(`${prevProject.slug}.title`, { defaultValue: prevProject.title })}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link
            to="/portfolio"
            className="hidden md:flex items-center justify-center w-10 h-10 border border-gold/30 hover:border-gold hover:bg-gold/10 transition-all duration-300 rounded-sm"
          >
            <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 16 16">
              <rect x="1" y="1" width="5" height="5" rx="0.5" />
              <rect x="10" y="1" width="5" height="5" rx="0.5" />
              <rect x="1" y="10" width="5" height="5" rx="0.5" />
              <rect x="10" y="10" width="5" height="5" rx="0.5" />
            </svg>
          </Link>

          {nextProject ? (
            <Link
              to={`/portfolio/${nextProject.slug}`}
              className="group flex items-center gap-3 text-charcoal-light hover:text-charcoal transition-colors duration-300"
            >
              <div className="text-right">
                <span className="block font-accent text-xs tracking-wider text-charcoal-light/50 mb-1">
                  {t('caseStudy.nextProject')}
                </span>
                <span className="block font-display text-base md:text-lg group-hover:text-gold transition-colors duration-300">
                  {tProj(`${nextProject.slug}.title`, { defaultValue: nextProject.title })}
                </span>
              </div>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </motion.div>
      </main>

      <Footer />
    </motion.div>
  );
}
