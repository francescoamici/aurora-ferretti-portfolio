import { useRef, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects, caseStudies } from '@auror/data';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function SectionBlock({
  label,
  content,
  delay = 0,
}: {
  label: string;
  content: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="py-12 md:py-16 border-b border-gold/10"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12">
        <div>
          <span className="font-accent text-xs uppercase tracking-[0.25em] text-gold">
            {label}
          </span>
          <div className="mt-3 w-8 h-px bg-gold/30 hidden md:block" />
        </div>
        <p className="font-body text-sm md:text-base text-noir/70 leading-relaxed md:leading-loose max-w-2xl">
          {content}
        </p>
      </div>
    </motion.div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const { t: tp } = useTranslation('projects');
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const lang = i18n.language?.startsWith('en') ? 'en' : 'it';

  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug]);
  const caseStudy = useMemo(
    () => (project ? caseStudies.find((cs) => cs.projectId === project.id) : null),
    [project]
  );

  // Prev/Next navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <Nav />
        <div className="text-center">
          <h1 className="font-display text-4xl text-noir mb-4">Project not found</h1>
          <Link
            to="/portfolio"
            className="font-body text-xs uppercase tracking-[0.2em] text-gold hover:text-noir transition-colors"
          >
            {t('nav.backToPortfolio')}
          </Link>
        </div>
      </div>
    );
  }

  const title = tp(`${project.slug}.title`, { defaultValue: project.title });
  const description = tp(`${project.slug}.description`, { defaultValue: '' });

  return (
    <div className="min-h-screen bg-ivory">
      <Nav />

      {/* Hero Section */}
      <div ref={heroRef} className="relative pt-20 md:pt-24">
        {/* Color hero block */}
        <div
          className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden"
          style={{ backgroundColor: project.color }}
        >
          {project.thumbnail && (
            <img
              src={project.thumbnail}
              alt={title}
              className="w-full h-full object-cover opacity-0"
              onLoad={(e) => {
                (e.target as HTMLImageElement).style.opacity = '0.5';
              }}
              style={{ transition: 'opacity 0.8s ease' }}
            />
          )}

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-noir/20 to-transparent" />

          {/* Hero content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-16">
            <div className="max-w-6xl mx-auto w-full">
              {/* Back link */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.2em] text-ivory/60 hover:text-ivory transition-colors mb-6"
                >
                  <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-gold">
                    <line x1="16" y1="4" x2="2" y2="4" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M5 1L2 4l3 3" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  </svg>
                  {t('nav.backToPortfolio')}
                </Link>
              </motion.div>

              {/* Project info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-body text-[10px] uppercase tracking-[0.25em] text-ivory/50">
                  {project.year} {project.client && ` / ${project.client}`}
                </span>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-ivory mt-2 leading-[0.95]">
                  {title}
                </h1>
                <div className="mt-4 flex flex-wrap gap-3">
                  {project.categories.map((cat) => (
                    <span
                      key={cat}
                      className="font-body text-[10px] uppercase tracking-[0.15em] text-ivory/40"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Content */}
      {caseStudy && (
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
          {/* Overview / Description */}
          {description && (
            <motion.p
              className="font-display italic text-2xl md:text-3xl lg:text-4xl text-noir leading-snug max-w-3xl mb-12 md:mb-16"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {description}
            </motion.p>
          )}

          {/* Case Study Sections */}
          <div>
            <SectionBlock
              label={t('caseStudy.overview')}
              content={caseStudy.overview[lang]}
            />
            <SectionBlock
              label={t('caseStudy.challenge')}
              content={caseStudy.challenge[lang]}
              delay={0.05}
            />
            <SectionBlock
              label={t('caseStudy.process')}
              content={caseStudy.process[lang]}
              delay={0.05}
            />
            <SectionBlock
              label={t('caseStudy.solution')}
              content={caseStudy.solution[lang]}
              delay={0.05}
            />
            <SectionBlock
              label={t('caseStudy.results')}
              content={caseStudy.results[lang]}
              delay={0.05}
            />
          </div>

          {/* Testimonial */}
          {caseStudy.testimonial && (
            <motion.div
              className="py-16 md:py-24"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-accent text-xs uppercase tracking-[0.25em] text-gold mb-8 block">
                {t('caseStudy.testimonial')}
              </span>
              <div className="border-l-2 border-blush/40 pl-8 md:pl-12">
                <blockquote className="font-display italic text-xl md:text-3xl text-noir leading-relaxed max-w-3xl">
                  &ldquo;{caseStudy.testimonial.quote[lang]}&rdquo;
                </blockquote>
                <div className="mt-6">
                  <p className="font-body text-sm text-noir font-medium">
                    {caseStudy.testimonial.author}
                  </p>
                  <p className="font-body text-xs text-gray mt-0.5">
                    {caseStudy.testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Image Gallery */}
          {project.images.length > 0 && (
            <motion.div
              className="py-12 md:py-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-accent text-xs uppercase tracking-[0.25em] text-gold mb-8 block">
                {t('caseStudy.gallery')}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {project.images.map((img, i) => (
                  <motion.div
                    key={i}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden"
                    style={{ backgroundColor: project.color }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                  >
                    <img
                      src={img}
                      alt={`${title} - ${i + 1}`}
                      className="w-full h-full object-cover opacity-0"
                      onLoad={(e) => {
                        (e.target as HTMLImageElement).style.opacity = '1';
                      }}
                      style={{ transition: 'opacity 0.5s ease' }}
                    />
                    <div className="absolute inset-0 rounded-lg border border-gold/10" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Prev / Next Navigation */}
          <div className="border-t border-gold/15 pt-12 md:pt-16 mt-8">
            <div className="flex items-center justify-between">
              {/* Prev */}
              <div>
                {prevProject ? (
                  <button
                    onClick={() => navigate(`/portfolio/${prevProject.slug}`)}
                    className="group inline-flex items-center gap-3 hover:gap-5 transition-all duration-300"
                  >
                    <svg
                      width="24"
                      height="8"
                      viewBox="0 0 24 8"
                      fill="none"
                      className="text-gold"
                    >
                      <line x1="24" y1="4" x2="2" y2="4" stroke="currentColor" strokeWidth="0.5" />
                      <path d="M5 1L2 4l3 3" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    </svg>
                    <div className="text-left">
                      <span className="font-body text-[9px] uppercase tracking-[0.2em] text-gray block">
                        {t('caseStudy.prevProject')}
                      </span>
                      <span className="font-display text-lg md:text-xl text-noir group-hover:text-blush-deep transition-colors">
                        {prevProject.title}
                      </span>
                    </div>
                  </button>
                ) : (
                  <div />
                )}
              </div>

              {/* View all */}
              <Link
                to="/portfolio"
                className="hidden md:flex items-center font-body text-[10px] uppercase tracking-[0.2em] text-gray hover:text-noir transition-colors"
              >
                {t('caseStudy.viewAll')}
              </Link>

              {/* Next */}
              <div>
                {nextProject ? (
                  <button
                    onClick={() => navigate(`/portfolio/${nextProject.slug}`)}
                    className="group inline-flex items-center gap-3 hover:gap-5 transition-all duration-300"
                  >
                    <div className="text-right">
                      <span className="font-body text-[9px] uppercase tracking-[0.2em] text-gray block">
                        {t('caseStudy.nextProject')}
                      </span>
                      <span className="font-display text-lg md:text-xl text-noir group-hover:text-blush-deep transition-colors">
                        {nextProject.title}
                      </span>
                    </div>
                    <svg
                      width="24"
                      height="8"
                      viewBox="0 0 24 8"
                      fill="none"
                      className="text-gold"
                    >
                      <line x1="0" y1="4" x2="22" y2="4" stroke="currentColor" strokeWidth="0.5" />
                      <path d="M19 1l3 3-3 3" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    </svg>
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fallback if no case study data */}
      {!caseStudy && (
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
          {description && (
            <p className="font-display italic text-2xl md:text-3xl text-noir leading-snug max-w-3xl mb-12">
              {description}
            </p>
          )}

          {/* Image Gallery */}
          {project.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {project.images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden"
                  style={{ backgroundColor: project.color }}
                >
                  <img
                    src={img}
                    alt={`${title} - ${i + 1}`}
                    className="w-full h-full object-cover opacity-0"
                    onLoad={(e) => {
                      (e.target as HTMLImageElement).style.opacity = '1';
                    }}
                    style={{ transition: 'opacity 0.5s ease' }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Back to portfolio */}
          <div className="mt-12 pt-8 border-t border-gold/15">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.2em] text-gray hover:text-noir transition-colors"
            >
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-gold">
                <line x1="16" y1="4" x2="2" y2="4" stroke="currentColor" strokeWidth="0.5" />
                <path d="M5 1L2 4l3 3" stroke="currentColor" strokeWidth="0.5" fill="none" />
              </svg>
              {t('caseStudy.viewAll')}
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
