import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeLink as Link, useThemeNavigate } from '@auror/shared-ui';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { projects, caseStudies } from '@auror/data';
import Footer from '../components/Footer';

const panelColors = ['#FFB4C8', '#FFE66D', '#4361EE', '#FF6B6B', '#95E1D3'];
const exclamations = ['POW!', 'BOOM!', 'ZAP!', 'WOW!', 'POP!'];

function ComicPanel({
  title,
  content,
  color,
  index,
  exclamation,
}: {
  title: string;
  content: string;
  color: string;
  index: number;
  exclamation: string;
}) {
  const isDark = color === '#4361EE' || color === '#FF6B6B';
  const textColor = isDark ? '#FFFFFF' : '#1A1A2E';
  const rotation = ((index % 5) - 2) * 0.8;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50, rotate: rotation * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
    >
      {/* Exclamation decoration */}
      <motion.div
        className="absolute -top-6 -right-4 z-20 font-display text-lg md:text-xl px-3 py-1 rounded-xl"
        style={{
          backgroundColor: panelColors[(index + 2) % panelColors.length],
          border: '3px solid #1A1A2E',
          color: '#1A1A2E',
          transform: `rotate(${12 + index * 5}deg)`,
        }}
        whileHover={{ scale: 1.2, rotate: 0 }}
      >
        {exclamation}
      </motion.div>

      <div
        className="p-6 md:p-8 rounded-2xl relative overflow-hidden"
        style={{
          backgroundColor: color,
          border: '5px solid #1A1A2E',
        }}
      >
        {/* Panel number */}
        <div
          className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
          }}
        >
          <span className="font-fun text-sm" style={{ color: textColor }}>
            {index + 1}
          </span>
        </div>

        {/* Section title */}
        <h3
          className="font-fun text-xl md:text-2xl mt-6 mb-4"
          style={{ color: textColor }}
        >
          {title}
        </h3>

        {/* Content */}
        <p
          className="font-body text-sm md:text-base leading-relaxed"
          style={{ color: textColor, opacity: 0.9 }}
        >
          {content}
        </p>

        {/* Decorative corner dots */}
        <div
          className="absolute bottom-3 right-3 w-3 h-3 rounded-full"
          style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }}
        />
        <div
          className="absolute bottom-3 right-8 w-2 h-2 rounded-full"
          style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.07)' }}
        />
      </div>
    </motion.div>
  );
}

function SpeechBubble({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 150 }}
    >
      <div
        className="p-6 md:p-8 rounded-2xl bg-yellow relative"
        style={{ border: '5px solid #1A1A2E' }}
      >
        <p className="font-fun text-lg md:text-xl text-dark leading-relaxed">
          "{quote}"
        </p>
        <p className="font-body text-sm font-semibold text-dark/70 mt-4">
          -- {author}, {role}
        </p>

        {/* Speech bubble tail */}
        <div
          className="absolute -bottom-6 left-12"
          style={{
            width: 0,
            height: 0,
            borderLeft: '18px solid transparent',
            borderRight: '18px solid transparent',
            borderTop: '24px solid #1A1A2E',
          }}
        />
        <div
          className="absolute -bottom-4 left-[52px]"
          style={{
            width: 0,
            height: 0,
            borderLeft: '14px solid transparent',
            borderRight: '14px solid transparent',
            borderTop: '20px solid #FFE66D',
          }}
        />
      </div>
    </motion.div>
  );
}

function ImagePlaceholder({ index }: { index: number }) {
  const color = panelColors[index % panelColors.length];
  const borderColor = panelColors[(index + 2) % panelColors.length];

  return (
    <motion.div
      className="aspect-video rounded-xl flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${color}, ${borderColor})`,
        border: `5px solid ${borderColor}`,
        transform: `rotate(${(index % 3 - 1) * 1.5}deg)`,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 120 }}
      whileHover={{ rotate: 0, scale: 1.02 }}
    >
      <div className="text-center">
        <span className="font-display text-3xl md:text-4xl text-white/60">
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className="font-fun text-white/40 text-sm mt-1">Image</p>
      </div>
    </motion.div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useThemeNavigate();
  const { t } = useTranslation('common');
  const { t: tp } = useTranslation('projects');
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'it';

  const project = useMemo(() => projects.find((p) => p.slug === slug), [slug]);
  const caseStudy = useMemo(
    () => (project ? caseStudies.find((cs) => cs.projectId === project.id) : null),
    [project]
  );

  const projectIndex = useMemo(
    () => projects.findIndex((p) => p.slug === slug),
    [slug]
  );

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const projectTrans = useMemo(() => {
    if (!slug) return null;
    return tp(slug, { returnObjects: true }) as {
      title?: string;
      description?: string;
    };
  }, [slug, tp]);

  if (!project || !caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="font-display text-4xl text-coral mb-4">Oops!</h1>
          <p className="font-body text-dark/60 mb-6">Project not found</p>
          <Link
            to="/portfolio"
            className="font-display text-sm px-6 py-3 rounded-xl text-white bg-blue"
            style={{ border: '3px solid #1A1A2E' }}
          >
            {t('nav.backToPortfolio')}
          </Link>
        </div>
      </div>
    );
  }

  const sections = [
    {
      key: 'overview',
      title: t('caseStudy.overview'),
      content: caseStudy.overview[lang],
    },
    {
      key: 'challenge',
      title: t('caseStudy.challenge'),
      content: caseStudy.challenge[lang],
    },
    {
      key: 'process',
      title: t('caseStudy.process'),
      content: caseStudy.process[lang],
    },
    {
      key: 'solution',
      title: t('caseStudy.solution'),
      content: caseStudy.solution[lang],
    },
    {
      key: 'results',
      title: t('caseStudy.results'),
      content: caseStudy.results[lang],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/portfolio"
            className="inline-block font-fun text-base text-blue hover:text-coral transition-colors"
          >
            ← {t('nav.backToPortfolio')}
          </Link>
        </motion.div>

        {/* Project header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 150 }}
        >
          {/* Project number */}
          <motion.span
            className="font-fun text-6xl md:text-8xl opacity-20 text-blue"
            style={{ transform: 'rotate(8deg)', display: 'inline-block' }}
          >
            {String(projectIndex + 1).padStart(2, '0')}
          </motion.span>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mt-2">
            {(projectTrans?.title || project.title).split('').map((letter, i) => (
              <span
                key={i}
                style={{ color: panelColors[i % panelColors.length] }}
              >
                {letter}
              </span>
            ))}
          </h1>

          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {project.categories.map((cat, i) => (
              <span
                key={cat}
                className="font-display text-xs uppercase px-4 py-1.5 rounded-full"
                style={{
                  backgroundColor: panelColors[i % panelColors.length],
                  border: '3px solid #1A1A2E',
                  color: panelColors[i % panelColors.length] === '#4361EE' ? '#FFFFFF' : '#1A1A2E',
                  transform: `rotate(${(i - 1) * 3}deg)`,
                }}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Year + Client */}
          <p className="font-fun text-lg text-coral mt-4">
            {project.year}
            {project.client && ` / ${project.client}`}
          </p>
        </motion.div>

        {/* Hero image placeholder */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ImagePlaceholder index={0} />
        </motion.div>

        {/* Comic strip panels - case study sections */}
        <div className="space-y-10 md:space-y-14">
          {sections.map((section, i) => (
            <div key={section.key}>
              <ComicPanel
                title={section.title}
                content={section.content}
                color={panelColors[i % panelColors.length]}
                index={i}
                exclamation={exclamations[i % exclamations.length]}
              />

              {/* Image placeholder between some sections */}
              {i === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <ImagePlaceholder index={1} />
                  <ImagePlaceholder index={2} />
                </div>
              )}
              {i === 3 && (
                <div className="mt-8">
                  <ImagePlaceholder index={3} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Testimonial speech bubble */}
        {caseStudy.testimonial && (
          <div className="mt-16 mb-12">
            <motion.h3
              className="font-fun text-xl md:text-2xl text-coral text-center mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {t('caseStudy.testimonial')}
            </motion.h3>
            <SpeechBubble
              quote={caseStudy.testimonial.quote[lang]}
              author={caseStudy.testimonial.author}
              role={caseStudy.testimonial.role}
            />
          </div>
        )}

        {/* Gallery */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="font-display text-2xl md:text-3xl text-blue text-center mb-8">
            {t('caseStudy.gallery')}
            <span className="text-coral">!</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.slice(0, 4).map((_, i) => (
              <ImagePlaceholder key={i} index={i + 4} />
            ))}
          </div>
        </motion.div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 my-16">
          {panelColors.map((c, i) => (
            <motion.div
              key={i}
              className={i % 2 === 0 ? 'w-4 h-4 rounded-full' : 'w-3 h-3 rotate-45'}
              style={{ backgroundColor: c }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>

        {/* Navigation: Prev / Next with bouncy arrows */}
        <div className="flex items-center justify-between gap-4">
          {prevProject ? (
            <motion.button
              onClick={() => navigate(`/portfolio/${prevProject.slug}`)}
              className="flex items-center gap-3 font-display text-sm md:text-base px-5 py-3 rounded-xl"
              style={{
                backgroundColor: '#FFB4C8',
                border: '4px solid #1A1A2E',
                boxShadow: '3px 3px 0px #1A1A2E',
              }}
              whileHover={{
                x: -5,
                scale: 1.05,
                boxShadow: '5px 5px 0px #1A1A2E',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-xl"
              >
                ←
              </motion.span>
              <span className="hidden sm:inline">{t('caseStudy.prevProject')}</span>
            </motion.button>
          ) : (
            <div />
          )}

          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/portfolio"
              className="font-fun text-sm md:text-base px-5 py-3 rounded-xl bg-yellow"
              style={{
                border: '4px solid #1A1A2E',
                boxShadow: '3px 3px 0px #1A1A2E',
              }}
            >
              {t('caseStudy.viewAll')}
            </Link>
          </motion.div>

          {nextProject ? (
            <motion.button
              onClick={() => navigate(`/portfolio/${nextProject.slug}`)}
              className="flex items-center gap-3 font-display text-sm md:text-base px-5 py-3 rounded-xl"
              style={{
                backgroundColor: '#95E1D3',
                border: '4px solid #1A1A2E',
                boxShadow: '3px 3px 0px #1A1A2E',
              }}
              whileHover={{
                x: 5,
                scale: 1.05,
                boxShadow: '5px 5px 0px #1A1A2E',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="hidden sm:inline">{t('caseStudy.nextProject')}</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-xl"
              >
                →
              </motion.span>
            </motion.button>
          ) : (
            <div />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
