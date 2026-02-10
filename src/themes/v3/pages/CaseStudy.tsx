import { useParams } from 'react-router-dom';
import { ThemeLink as Link, useThemeNavigate } from '@auror/shared-ui';
import { useTranslation } from '@auror/i18n';
import { projects, caseStudies } from '@auror/data';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const { t: tProjects } = useTranslation('projects');
  const navigate = useThemeNavigate();

  const lang = (i18n.language?.startsWith('it') ? 'it' : 'en') as 'it' | 'en';

  const project = projects.find(p => p.slug === slug);
  const projectIndex = projects.findIndex(p => p.slug === slug);
  const caseStudy = project ? caseStudies.find(cs => cs.projectId === project.id) : null;

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  // Random rotations for section headers
  const rotations = useMemo(() => Array.from({ length: 6 }, () => (Math.random() * 4 - 2)), []);

  if (!project) {
    return (
      <section className="min-h-screen bg-raw-white flex items-center justify-center">
        <div className="text-center">
          <div className="font-display text-6xl md:text-9xl">404</div>
          <div className="font-mono text-sm mt-4">PROJECT NOT FOUND</div>
          <Link to="/portfolio" className="font-mono text-sm text-blue underline underline-offset-4 decoration-2 mt-4 inline-block">
            {'\u2190'} {t('nav.backToPortfolio')}
          </Link>
        </div>
      </section>
    );
  }

  const sections = caseStudy
    ? [
        { key: 'overview', label: t('caseStudy.overview'), content: caseStudy.overview[lang] },
        { key: 'challenge', label: t('caseStudy.challenge'), content: caseStudy.challenge[lang] },
        { key: 'process', label: t('caseStudy.process'), content: caseStudy.process[lang] },
        { key: 'solution', label: t('caseStudy.solution'), content: caseStudy.solution[lang] },
        { key: 'results', label: t('caseStudy.results'), content: caseStudy.results[lang] },
      ]
    : [];

  return (
    <section className="min-h-screen bg-raw-white">
      {/* BACK LINK */}
      <div className="border-b-[4px] border-harsh-black px-4 md:px-8 py-4">
        <button
          onClick={() => navigate(-1)}
          className="font-mono text-xs uppercase tracking-[0.2em] text-blue font-bold hover:bg-blue hover:text-raw-white px-2 py-1 transition-none"
        >
          {'\u2190'} {t('nav.backToPortfolio')}
        </button>
      </div>

      {/* PROJECT HERO */}
      <div className="border-b-[8px] border-harsh-black">
        {/* TITLE */}
        <div className="px-4 md:px-8 py-8 md:py-16">
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="font-display uppercase leading-[0.85]"
            style={{ fontSize: 'clamp(50px, 12vw, 160px)' }}
          >
            {tProjects(`${project.slug}.title`, { defaultValue: project.title })}
          </motion.h1>
        </div>

        {/* META ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t-[4px] border-harsh-black">
          <div className="border-r-[4px] border-b-[4px] border-harsh-black p-4 md:p-6">
            <div className="font-mono text-xs uppercase tracking-[0.3em] mb-1 opacity-60">Year</div>
            <div className="font-heading text-lg md:text-xl">{project.year}</div>
          </div>
          <div className="border-r-[4px] border-b-[4px] border-harsh-black p-4 md:p-6">
            <div className="font-mono text-xs uppercase tracking-[0.3em] mb-1 opacity-60">Category</div>
            <div className="font-mono text-xs md:text-sm text-blue font-bold">
              {tProjects(`${project.slug}.categories`, { defaultValue: project.categories.join(', ') })}
            </div>
          </div>
          {project.client && (
            <div className="border-r-[4px] border-b-[4px] border-harsh-black p-4 md:p-6">
              <div className="font-mono text-xs uppercase tracking-[0.3em] mb-1 opacity-60">Client</div>
              <div className="font-heading text-lg md:text-xl">{project.client}</div>
            </div>
          )}
          <div className="border-b-[4px] border-harsh-black p-4 md:p-6 bg-yellow">
            <div className="font-mono text-xs uppercase tracking-[0.3em] mb-1">Status</div>
            <div className="font-heading text-lg md:text-xl">COMPLETED</div>
          </div>
        </div>

        {/* HERO IMAGE PLACEHOLDER */}
        <div
          className="w-full border-t-[4px] border-harsh-black"
          style={{
            backgroundColor: project.color,
            height: 'clamp(250px, 40vw, 500px)',
          }}
        >
          <div className="h-full flex items-center justify-center">
            <span className="font-display text-raw-white uppercase opacity-20 select-none"
              style={{ fontSize: 'clamp(40px, 8vw, 120px)' }}
            >
              {project.title}
            </span>
          </div>
        </div>
      </div>

      {/* CASE STUDY SECTIONS */}
      {sections.map((section, i) => (
        <motion.div
          key={section.key}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.1 }}
          viewport={{ once: true }}
          className={`
            border-b-[4px] border-harsh-black
            ${i % 2 === 0 ? 'bg-raw-white' : 'bg-harsh-black text-raw-white'}
          `}
        >
          <div className="px-4 md:px-8 py-8 md:py-16">
            <div className="max-w-4xl">
              {/* SECTION HEADER - slightly rotated */}
              <h2
                className={`font-heading text-2xl md:text-4xl uppercase mb-6 md:mb-8 inline-block ${
                  i % 2 === 0 ? '' : 'text-yellow'
                }`}
                style={{ transform: `rotate(${rotations[i]}deg)` }}
              >
                {section.label}
              </h2>

              {/* SECTION CONTENT - monospace */}
              <p className="font-mono text-sm md:text-base leading-[1.8]">
                {section.content}
              </p>
            </div>
          </div>
        </motion.div>
      ))}

      {/* TESTIMONIAL */}
      {caseStudy?.testimonial && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.1 }}
          viewport={{ once: true }}
          className="border-b-[4px] border-harsh-black bg-blue px-4 md:px-8 py-12 md:py-20"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="font-display text-4xl md:text-6xl text-yellow mb-8">{'\u201C'}</div>
            <blockquote className="font-mono text-base md:text-xl text-raw-white leading-relaxed italic mb-8">
              {caseStudy.testimonial.quote[lang]}
            </blockquote>
            <div className="font-mono text-sm text-raw-white">
              <span className="font-bold">{caseStudy.testimonial.author}</span>
              <br />
              <span className="opacity-60">{caseStudy.testimonial.role}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* IMAGE GALLERY PLACEHOLDERS */}
      <div className="border-b-[4px] border-harsh-black px-4 md:px-8 py-8 md:py-16">
        <h2
          className="font-heading text-2xl md:text-4xl uppercase mb-8"
          style={{ transform: `rotate(${rotations[5] || 0}deg)`, display: 'inline-block' }}
        >
          {t('caseStudy.gallery')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {project.images.map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.1, delay: i * 0.03 }}
              viewport={{ once: true }}
              className={`
                border-[4px] border-harsh-black hard-shadow overflow-hidden
                ${i === 0 ? 'md:col-span-2' : ''}
              `}
              style={{
                height: i === 0 ? '400px' : '280px',
                backgroundColor: project.color,
                transform: `rotate(${(Math.random() * 2 - 1)}deg)`,
              }}
            >
              <div className="h-full flex items-center justify-center">
                <span className="font-mono text-raw-white text-xs uppercase tracking-[0.3em] opacity-40">
                  [{String(i + 1).padStart(2, '0')}]
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PREV / NEXT NAVIGATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b-[4px] border-harsh-black">
        {/* PREV */}
        <div className="border-r-0 md:border-r-[4px] border-b-[4px] md:border-b-0 border-harsh-black">
          {prevProject ? (
            <Link
              to={`/portfolio/${prevProject.slug}`}
              className="block px-4 md:px-8 py-8 md:py-12 hover:bg-harsh-black hover:text-raw-white transition-none group"
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em] mb-2 opacity-60 group-hover:text-yellow">
                {t('caseStudy.prevProject')}
              </div>
              <div className="font-display text-2xl md:text-4xl uppercase">
                {'\u2190'} {prevProject.title}
              </div>
            </Link>
          ) : (
            <Link
              to="/portfolio"
              className="block px-4 md:px-8 py-8 md:py-12 hover:bg-blue hover:text-raw-white transition-none"
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em] mb-2 opacity-60">
                {t('nav.backToPortfolio')}
              </div>
              <div className="font-display text-2xl md:text-4xl uppercase">
                {'\u2190'} {t('sections.allProjects')}
              </div>
            </Link>
          )}
        </div>

        {/* NEXT */}
        <div>
          {nextProject ? (
            <Link
              to={`/portfolio/${nextProject.slug}`}
              className="block px-4 md:px-8 py-8 md:py-12 hover:bg-harsh-black hover:text-raw-white transition-none group text-right"
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em] mb-2 opacity-60 group-hover:text-yellow">
                {t('caseStudy.nextProject')}
              </div>
              <div className="font-display text-2xl md:text-4xl uppercase">
                {nextProject.title} {'\u2192'}
              </div>
            </Link>
          ) : (
            <Link
              to="/portfolio"
              className="block px-4 md:px-8 py-8 md:py-12 hover:bg-blue hover:text-raw-white transition-none text-right"
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em] mb-2 opacity-60">
                {t('nav.backToPortfolio')}
              </div>
              <div className="font-display text-2xl md:text-4xl uppercase">
                {t('sections.allProjects')} {'\u2192'}
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
