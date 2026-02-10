import { useParams } from 'react-router-dom';
import { ThemeLink as Link, useThemeNavigate } from '@auror/shared-ui';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects, caseStudies } from '@auror/data';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import OrnamentalDivider from '../components/OrnamentalDivider';
import { toRomanYear } from '../components/ProjectCard';

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useThemeNavigate();
  const { t, i18n } = useTranslation();
  const { t: tProjects } = useTranslation('projects');
  const lang = i18n.language?.startsWith('it') ? 'it' : 'en';

  const project = projects.find((p) => p.slug === slug);
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const caseStudy = project ? caseStudies.find((cs) => cs.projectId === project.id) : null;

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  if (!project) {
    return (
      <div className="bg-parchment min-h-screen">
        <Nav />
        <div className="pt-40 text-center">
          <p className="font-display italic text-brown text-2xl">
            {lang === 'it' ? 'Progetto non trovato' : 'Project not found'}
          </p>
          <Link
            to="/portfolio"
            className="inline-block mt-6 font-caps text-[0.65rem] tracking-[0.2em] uppercase text-terracotta small-caps border-b border-terracotta/30 pb-0.5"
          >
            {t('nav.backToPortfolio')}
          </Link>
        </div>
      </div>
    );
  }

  const title = tProjects(`${project.slug}.title`, { defaultValue: project.title });
  const description = tProjects(`${project.slug}.description`, { defaultValue: '' });
  const categories = tProjects(`${project.slug}.categories`, { defaultValue: project.categories.join(', ') });
  const romanYear = toRomanYear(project.year);
  const authorByline = lang === 'it' ? 'di Aurora Ferretti' : 'by Aurora Ferretti';
  const prevLabel = lang === 'it' ? 'Articolo precedente' : 'Previous article';
  const nextLabel = lang === 'it' ? 'Articolo successivo' : 'Next article';

  const sectionLabels = {
    overview: lang === 'it' ? 'Panoramica' : 'Overview',
    challenge: lang === 'it' ? 'La Sfida' : 'The Challenge',
    process: lang === 'it' ? 'Il Processo' : 'The Process',
    solution: lang === 'it' ? 'La Soluzione' : 'The Solution',
    results: lang === 'it' ? 'I Risultati' : 'The Results',
    testimonial: lang === 'it' ? 'Testimonianza' : 'Testimonial',
    gallery: lang === 'it' ? 'Galleria' : 'Gallery',
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] },
    }),
  };

  return (
    <div className="bg-parchment min-h-screen">
      <Nav />

      <main className="pt-32 md:pt-40">
        {/* Back to portfolio */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/portfolio"
              className="font-caps text-[0.6rem] tracking-[0.2em] uppercase text-brown/40 hover:text-terracotta transition-colors duration-500 small-caps"
            >
              &larr; {t('nav.backToPortfolio')}
            </Link>
          </motion.div>
        </div>

        {/* Article header */}
        <header className="max-w-4xl mx-auto px-6 md:px-12 text-center mb-16">
          <motion.p
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="font-caps text-[0.6rem] tracking-[0.25em] uppercase text-brown/40 small-caps mb-6"
          >
            {categories}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={0.15}
            initial="hidden"
            animate="visible"
            className="font-display italic text-brown text-3xl md:text-5xl lg:text-6xl leading-tight mb-6"
          >
            {title}
          </motion.h1>

          <motion.div
            variants={fadeUp}
            custom={0.3}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="w-12 h-px bg-brown/20" />
            <span className="text-brown/25 text-[0.5rem]">&#9670;</span>
            <span className="w-12 h-px bg-brown/20" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.45}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-4 text-brown/40"
          >
            <span className="font-subhead italic text-sm">{authorByline}</span>
            <span>&middot;</span>
            <span className="font-caps text-[0.6rem] tracking-[0.15em] uppercase small-caps">
              Anno {romanYear}
            </span>
            {project.client && (
              <>
                <span>&middot;</span>
                <span className="font-caps text-[0.6rem] tracking-[0.15em] uppercase small-caps">
                  {project.client}
                </span>
              </>
            )}
          </motion.div>
        </header>

        {/* Hero image placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-6xl mx-auto px-6 md:px-12 mb-20"
        >
          <div
            className="aspect-[16/9] md:aspect-[2/1] flex items-center justify-center"
            style={{ backgroundColor: project.color }}
          >
            <span className="font-display italic text-white/15 text-5xl md:text-7xl">
              {title}
            </span>
          </div>
          <p className="font-caps text-[0.55rem] tracking-[0.15em] uppercase text-brown/30 small-caps text-center mt-3">
            {title} &mdash; {categories}
          </p>
        </motion.div>

        {/* Article body */}
        {caseStudy && (
          <article className="max-w-4xl mx-auto px-6 md:px-12">
            {/* Overview - with drop cap */}
            <motion.section
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-20"
            >
              <h2 className="font-caps text-[0.65rem] tracking-[0.25em] uppercase text-brown/45 small-caps mb-6">
                {sectionLabels.overview}
              </h2>
              <div className="drop-cap font-body text-brown/85 text-base md:text-lg leading-[1.85]">
                {caseStudy.overview[lang]}
              </div>
            </motion.section>

            {/* Challenge */}
            <motion.section
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-20"
            >
              <h2 className="font-caps text-[0.65rem] tracking-[0.25em] uppercase text-brown/45 small-caps mb-6">
                {sectionLabels.challenge}
              </h2>
              <div className="editorial-columns font-body text-brown/85 text-base md:text-lg leading-[1.85]">
                {caseStudy.challenge[lang]}
              </div>
            </motion.section>

            {/* Pull quote between sections */}
            {caseStudy.testimonial && (
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1 }}
                className="max-w-3xl mx-auto my-20 text-center"
              >
                <div className="h-px bg-terracotta/30 mb-8" />
                <p className="font-subhead italic text-terracotta text-xl md:text-2xl leading-relaxed px-4">
                  &ldquo;{caseStudy.testimonial.quote[lang]}&rdquo;
                </p>
                <p className="font-caps text-[0.6rem] tracking-[0.15em] uppercase text-brown/40 small-caps mt-4">
                  {caseStudy.testimonial.author}, {caseStudy.testimonial.role}
                </p>
                <div className="h-px bg-terracotta/30 mt-8" />
              </motion.blockquote>
            )}

            {/* Process */}
            <motion.section
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-20"
            >
              <h2 className="font-caps text-[0.65rem] tracking-[0.25em] uppercase text-brown/45 small-caps mb-6">
                {sectionLabels.process}
              </h2>
              <div className="editorial-columns font-body text-brown/85 text-base md:text-lg leading-[1.85]">
                {caseStudy.process[lang]}
              </div>
            </motion.section>

            {/* Image gallery placeholder */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1 }}
              className="mb-20"
            >
              <h2 className="font-caps text-[0.65rem] tracking-[0.25em] uppercase text-brown/45 small-caps mb-6 text-center">
                {sectionLabels.gallery}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.slice(0, 4).map((_, imgIndex) => (
                  <motion.div
                    key={imgIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: imgIndex * 0.1 }}
                    className="relative"
                  >
                    <div
                      className="aspect-[4/3] flex items-center justify-center"
                      style={{
                        backgroundColor: project.color,
                        opacity: 0.7 + imgIndex * 0.075,
                      }}
                    >
                      <span className="font-display italic text-white/15 text-2xl">
                        {imgIndex + 1}
                      </span>
                    </div>
                    <p className="font-caps text-[0.5rem] tracking-[0.12em] uppercase text-brown/25 small-caps text-center mt-2">
                      Fig. {imgIndex + 1}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Solution */}
            <motion.section
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-20"
            >
              <h2 className="font-caps text-[0.65rem] tracking-[0.25em] uppercase text-brown/45 small-caps mb-6">
                {sectionLabels.solution}
              </h2>
              <div className="editorial-columns font-body text-brown/85 text-base md:text-lg leading-[1.85]">
                {caseStudy.solution[lang]}
              </div>
            </motion.section>

            {/* Results */}
            <motion.section
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-20"
            >
              <h2 className="font-caps text-[0.65rem] tracking-[0.25em] uppercase text-brown/45 small-caps mb-6">
                {sectionLabels.results}
              </h2>
              <div className="font-body text-brown/85 text-base md:text-lg leading-[1.85]">
                {caseStudy.results[lang]}
              </div>
            </motion.section>
          </article>
        )}

        {/* If no case study, show description */}
        {!caseStudy && description && (
          <article className="max-w-4xl mx-auto px-6 md:px-12 mb-20">
            <div className="drop-cap font-body text-brown/85 text-base md:text-lg leading-[1.85]">
              {description}
            </div>
          </article>
        )}

        <OrnamentalDivider className="my-16" />

        {/* Article navigation */}
        <nav className="max-w-5xl mx-auto px-6 md:px-12 mb-20">
          <div className="flex items-stretch justify-between gap-8">
            {/* Previous */}
            <div className="flex-1">
              {prevProject && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <Link
                    to={`/portfolio/${prevProject.slug}`}
                    className="group block text-left"
                  >
                    <span className="font-caps text-[0.55rem] tracking-[0.2em] uppercase text-brown/35 small-caps block mb-2">
                      &larr; {prevLabel}
                    </span>
                    <span className="font-display italic text-brown text-lg group-hover:text-terracotta transition-colors duration-500">
                      {tProjects(`${prevProject.slug}.title`, { defaultValue: prevProject.title })}
                    </span>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Divider */}
            <div className="w-px bg-brown/10 hidden md:block" />

            {/* Next */}
            <div className="flex-1">
              {nextProject && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <Link
                    to={`/portfolio/${nextProject.slug}`}
                    className="group block text-right"
                  >
                    <span className="font-caps text-[0.55rem] tracking-[0.2em] uppercase text-brown/35 small-caps block mb-2">
                      {nextLabel} &rarr;
                    </span>
                    <span className="font-display italic text-brown text-lg group-hover:text-terracotta transition-colors duration-500">
                      {tProjects(`${nextProject.slug}.title`, { defaultValue: nextProject.title })}
                    </span>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </nav>
      </main>

      <Footer />
    </div>
  );
}
