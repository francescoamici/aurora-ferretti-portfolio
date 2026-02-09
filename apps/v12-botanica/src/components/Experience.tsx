import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { experience, education } from '@auror/data';

/* ---------- Flower Icon (current role) ---------- */

function FlowerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-sage">
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.4" />
      {/* Petals */}
      <ellipse cx="12" cy="6" rx="2.5" ry="3.5" fill="currentColor" opacity="0.15" />
      <ellipse cx="12" cy="18" rx="2.5" ry="3.5" fill="currentColor" opacity="0.15" />
      <ellipse cx="6" cy="12" rx="3.5" ry="2.5" fill="currentColor" opacity="0.15" />
      <ellipse cx="18" cy="12" rx="3.5" ry="2.5" fill="currentColor" opacity="0.15" />
      {/* Diagonal petals */}
      <ellipse cx="7.7" cy="7.7" rx="2.2" ry="3.2" transform="rotate(45 7.7 7.7)" fill="currentColor" opacity="0.1" />
      <ellipse cx="16.3" cy="7.7" rx="2.2" ry="3.2" transform="rotate(-45 16.3 7.7)" fill="currentColor" opacity="0.1" />
      <ellipse cx="7.7" cy="16.3" rx="2.2" ry="3.2" transform="rotate(-45 7.7 16.3)" fill="currentColor" opacity="0.1" />
      <ellipse cx="16.3" cy="16.3" rx="2.2" ry="3.2" transform="rotate(45 16.3 16.3)" fill="currentColor" opacity="0.1" />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/* ---------- Wave Divider ---------- */

function WaveDivider() {
  return (
    <svg
      className="mx-auto my-16 h-6 w-48 text-olive/20"
      viewBox="0 0 192 24"
      fill="none"
    >
      <path
        d="M0 12C16 4 32 20 48 12C64 4 80 20 96 12C112 4 128 20 144 12C160 4 176 20 192 12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------- Experience Card ---------- */

function ExperienceCard({
  item,
  index,
}: {
  item: (typeof experience)[0];
  index: number;
}) {
  const { t } = useTranslation();
  const { t: te } = useTranslation('experience');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-5"
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        {/* Icon */}
        <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center">
          {item.current ? (
            <FlowerIcon />
          ) : (
            <div className="h-3 w-3 rounded-full border-2 border-olive/40 bg-cream" />
          )}
        </div>
        {/* Dashed line */}
        <div className="mt-1 w-px flex-1 border-l border-dashed border-olive/20" />
      </div>

      {/* Content */}
      <div className="pb-10">
        {/* Date */}
        <div className="mb-1 flex items-center gap-2">
          <span className="font-hand text-base text-earth/40">
            {item.startDate} — {item.endDate || t('dates.present')}
          </span>
          {item.current && (
            <span className="rounded-full bg-sage/10 px-2.5 py-0.5 text-xs font-medium text-sage">
              {t('dates.present')}
            </span>
          )}
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-cream-light/80 p-5 shadow-[0_2px_16px_rgba(107,91,78,0.04)] ring-1 ring-earth/5">
          <h3 className="font-display text-lg font-medium text-earth">
            {te(`${item.id}.role`, { defaultValue: item.role })}
          </h3>
          <p className="mt-1 text-sm text-earth/60">
            {te(`${item.id}.company`, { defaultValue: item.company })}
            <span className="mx-1.5 text-earth/20">|</span>
            {item.location}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Education Card ---------- */

function EducationCard({
  item,
  index,
}: {
  item: (typeof education)[0];
  index: number;
}) {
  const { t: te } = useTranslation('experience');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-5"
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center">
          {/* Seed icon for education */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-terra">
            <path
              d="M8 2C8 2 4 6 4 10C4 12.5 5.8 14 8 14C10.2 14 12 12.5 12 10C12 6 8 2 8 2Z"
              fill="currentColor"
              opacity="0.2"
            />
            <path
              d="M8 14V6"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
        {index < education.length - 1 && (
          <div className="mt-1 w-px flex-1 border-l border-dashed border-terra/15" />
        )}
      </div>

      {/* Content */}
      <div className="pb-8">
        <span className="font-hand text-base text-earth/40">
          {item.startDate} — {item.endDate}
        </span>
        <div className="mt-1 rounded-2xl bg-cream-light/80 p-5 shadow-[0_2px_16px_rgba(107,91,78,0.04)] ring-1 ring-earth/5">
          <h3 className="font-display text-lg font-medium text-earth">
            {te(`${item.id}.degree`, { defaultValue: item.degree })}
          </h3>
          <p className="mt-1 text-sm text-earth/60">
            {te(`${item.id}.institution`, { defaultValue: item.institution })}
          </p>
          {item.grade && (
            <p className="mt-2 inline-block rounded-full bg-terra/8 px-3 py-0.5 font-hand text-sm text-terra">
              {item.grade}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Experience Section ---------- */

export default function Experience() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="relative py-24 lg:py-32" ref={sectionRef}>
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        {/* Experience Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl font-medium tracking-tight text-earth sm:text-4xl lg:text-5xl">
            {t('sections.experience')}
          </h2>
        </motion.div>

        {/* Experience Timeline */}
        <div>
          {experience.map((exp, i) => (
            <ExperienceCard key={exp.id} item={exp} index={i} />
          ))}
        </div>

        {/* Wave Divider */}
        <WaveDivider />

        {/* Education Header */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl font-medium tracking-tight text-earth sm:text-4xl">
            {t('sections.education')}
          </h2>
        </motion.div>

        {/* Education Timeline */}
        <div>
          {education.map((edu, i) => (
            <EducationCard key={edu.id} item={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
