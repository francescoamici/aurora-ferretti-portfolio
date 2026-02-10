import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { experience, education } from '@auror/data';

export default function Experience() {
  const { t } = useTranslation();
  const { t: te } = useTranslation('experience');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 md:py-36">
      {/* Top gold line */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          className="w-full h-px bg-gold/20"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 mt-16 md:mt-24">
        {/* Section label */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-accent text-xs uppercase tracking-[0.3em] text-gold block mb-3">
            {t('sections.experience')}
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-noir">
            {t('sections.experience')}
          </h2>
        </motion.div>

        {/* Experience entries */}
        <div className="space-y-0">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-12 py-8 border-b border-gold/10 last:border-b-0"
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Date column */}
              <div className="flex items-start gap-3">
                <span className="font-display text-sm md:text-base text-gray tracking-wide">
                  {exp.startDate} — {exp.current ? t('dates.present') : exp.endDate}
                </span>
                {exp.current && (
                  <span className="inline-flex items-center px-2 py-0.5 bg-blush/20 text-blush-deep text-[9px] font-body uppercase tracking-[0.15em] rounded-full">
                    Now
                  </span>
                )}
              </div>

              {/* Content column */}
              <div>
                <h3 className="font-display text-xl md:text-2xl text-noir">
                  {te(`experience.${exp.id}.role`, { defaultValue: exp.role })}
                </h3>
                <p className="font-accent text-sm tracking-[0.1em] text-noir/50 mt-1">
                  {te(`experience.${exp.id}.company`, { defaultValue: exp.company })}
                </p>
                <p className="font-body text-xs text-gray mt-1.5">
                  {te(`experience.${exp.id}.location`, { defaultValue: exp.location })}
                </p>
                {te(`experience.${exp.id}.description`, { defaultValue: '' }) && (
                  <p className="font-body text-sm text-noir/50 mt-3 leading-relaxed max-w-xl">
                    {te(`experience.${exp.id}.description`)}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          className="mt-20 md:mt-28"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="font-accent text-xs uppercase tracking-[0.3em] text-gold block mb-3">
            {t('sections.education')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-noir mb-12">
            {t('sections.education')}
          </h2>

          <div className="space-y-0">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-12 py-8 border-b border-gold/10 last:border-b-0"
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.4 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Date column */}
                <div>
                  <span className="font-display text-sm md:text-base text-gray tracking-wide">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>

                {/* Content column */}
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-noir">
                    {te(`education.${edu.id}.degree`, { defaultValue: edu.degree })}
                  </h3>
                  <p className="font-accent text-sm tracking-[0.1em] text-noir/50 mt-1">
                    {te(`education.${edu.id}.institution`, { defaultValue: edu.institution })}
                  </p>
                  {(edu.grade || te(`education.${edu.id}.grade`, { defaultValue: '' })) && (
                    <p className="font-accent text-xs italic text-gold mt-2 tracking-wider">
                      {te(`education.${edu.id}.grade`, { defaultValue: edu.grade || '' })}
                    </p>
                  )}
                  {te(`education.${edu.id}.description`, { defaultValue: '' }) && (
                    <p className="font-body text-sm text-noir/50 mt-3 leading-relaxed max-w-xl">
                      {te(`education.${edu.id}.description`)}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
