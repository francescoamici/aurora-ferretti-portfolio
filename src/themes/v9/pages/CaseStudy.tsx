import { useParams } from 'react-router-dom';
import { ThemeLink as Link, useThemeNavigate } from '@auror/shared-ui';
import { motion } from 'framer-motion';
import { projects, caseStudies } from '@auror/data';
import { useTranslation } from '@auror/i18n';

interface SectionRowProps {
  label: string;
  children: React.ReactNode;
}

function SectionRow({ label, children }: SectionRowProps) {
  return (
    <div className="grid grid-cols-12 gap-[24px] py-[40px] border-b border-light-gray">
      {/* Label column — 3 cols */}
      <div className="col-span-12 md:col-span-3">
        <span className="section-label">{label}</span>
      </div>
      {/* Content column — 9 cols */}
      <div className="col-span-12 md:col-span-9">
        {children}
      </div>
    </div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useThemeNavigate();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language?.startsWith('it') ? 'it' : 'en') as 'it' | 'en';

  const project = projects.find((p) => p.slug === slug);
  const caseStudy = project
    ? caseStudies.find((cs) => cs.projectId === project.id)
    : null;

  if (!project) {
    return (
      <div className="pt-[64px]">
        <div className="mx-auto max-w-[1200px] px-[24px] py-[80px]">
          <p className="font-sans text-[16px] text-gray">Project not found.</p>
          <Link
            to="/portfolio"
            className="font-mono text-[11px] text-red no-underline uppercase tracking-[1px] mt-[16px] inline-block"
          >
            &larr; {t('nav.backToPortfolio')}
          </Link>
        </div>
      </div>
    );
  }

  /* Previous / Next navigation */
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="grid-overlay baseline-grid pt-[64px]">
      <div className="mx-auto max-w-[1200px] px-[24px] py-[80px]">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-[48px]"
        >
          <Link
            to="/portfolio"
            className="font-mono text-[11px] text-gray no-underline uppercase tracking-[1px] hover:text-red transition-colors duration-200"
          >
            &larr; {t('nav.backToPortfolio')}
          </Link>
        </motion.div>

        {/* Project header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="grid grid-cols-12 gap-[24px] mb-[64px]"
        >
          <div className="col-span-12 md:col-span-8">
            <div className="flex items-center gap-[12px] mb-[24px]">
              <span className="red-square" />
              <span className="font-mono text-[11px] text-gray uppercase tracking-[1px]">
                {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
            </div>
            <h1 className="font-sans font-bold text-[clamp(32px,5vw,64px)] leading-[1.1] tracking-[-0.02em] text-black m-0">
              {project.title}
            </h1>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col justify-end">
            <div className="space-y-[8px]">
              <div className="flex justify-between">
                <span className="font-mono text-[11px] text-gray uppercase tracking-[1px]">Year</span>
                <span className="font-mono text-[12px] text-black">{project.year}</span>
              </div>
              {project.client && (
                <div className="flex justify-between">
                  <span className="font-mono text-[11px] text-gray uppercase tracking-[1px]">Client</span>
                  <span className="font-mono text-[12px] text-black">{project.client}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-mono text-[11px] text-gray uppercase tracking-[1px]">Type</span>
                <span className="font-mono text-[12px] text-black">{project.categories.join(', ')}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero image placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="w-full aspect-[16/9] mb-[64px]"
          style={{ backgroundColor: project.color }}
        />

        {/* Case study content */}
        {caseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <SectionRow label={t('caseStudy.overview')}>
              <p className="body-justified m-0">{caseStudy.overview[lang]}</p>
            </SectionRow>

            <SectionRow label={t('caseStudy.challenge')}>
              <p className="body-justified m-0">{caseStudy.challenge[lang]}</p>
            </SectionRow>

            <SectionRow label={t('caseStudy.process')}>
              <p className="body-justified m-0">{caseStudy.process[lang]}</p>
            </SectionRow>

            {/* Image gallery — sharp rectangles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] py-[40px] border-b border-light-gray">
              {project.images.slice(0, 4).map((_, i) => (
                <div
                  key={i}
                  className="w-full aspect-[4/3]"
                  style={{
                    backgroundColor: project.color,
                    opacity: 0.7 + i * 0.08,
                  }}
                />
              ))}
            </div>

            <SectionRow label={t('caseStudy.solution')}>
              <p className="body-justified m-0">{caseStudy.solution[lang]}</p>
            </SectionRow>

            <SectionRow label={t('caseStudy.results')}>
              <p className="body-justified m-0">{caseStudy.results[lang]}</p>
            </SectionRow>

            {/* Testimonial */}
            {caseStudy.testimonial && (
              <SectionRow label={t('caseStudy.testimonial')}>
                <blockquote className="m-0 p-0">
                  <p className="font-sans font-light text-[18px] leading-[28px] text-black italic m-0">
                    &ldquo;{caseStudy.testimonial.quote[lang]}&rdquo;
                  </p>
                  <footer className="mt-[16px]">
                    <span className="font-sans font-medium text-[14px] text-black">
                      {caseStudy.testimonial.author}
                    </span>
                    <span className="font-mono text-[11px] text-gray ml-[8px]">
                      {caseStudy.testimonial.role}
                    </span>
                  </footer>
                </blockquote>
              </SectionRow>
            )}
          </motion.div>
        )}

        {/* Previous / Next navigation */}
        <div className="grid grid-cols-2 gap-[24px] mt-[80px] pt-[32px] border-t border-black">
          <div>
            {prevProject && (
              <button
                onClick={() => navigate(`/portfolio/${prevProject.slug}`)}
                className="group flex items-center gap-[8px] bg-transparent border-0 cursor-pointer p-0"
              >
                <span className="font-mono text-[14px] text-red group-hover:text-black transition-colors duration-200">
                  &larr;
                </span>
                <span className="font-mono text-[11px] text-gray uppercase tracking-[1px] group-hover:text-black transition-colors duration-200">
                  {t('caseStudy.prevProject')}
                </span>
              </button>
            )}
          </div>
          <div className="text-right">
            {nextProject && (
              <button
                onClick={() => navigate(`/portfolio/${nextProject.slug}`)}
                className="group flex items-center gap-[8px] justify-end bg-transparent border-0 cursor-pointer p-0 ml-auto"
              >
                <span className="font-mono text-[11px] text-gray uppercase tracking-[1px] group-hover:text-black transition-colors duration-200">
                  {t('caseStudy.nextProject')}
                </span>
                <span className="font-mono text-[14px] text-red group-hover:text-black transition-colors duration-200">
                  &rarr;
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
