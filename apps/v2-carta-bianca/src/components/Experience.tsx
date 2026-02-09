import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience, education } from '@auror/data';
import { useTranslation } from '@auror/i18n';

export default function Experience() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="py-32 px-6">
      <div className="mx-auto max-w-4xl" ref={ref}>
        {/* Experience */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/30 mb-12"
        >
          {t('sections.experience')}
        </motion.p>

        <div className="mb-24">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-0 py-5 border-b border-black/5"
            >
              <span className="font-mono text-xs text-black/25 md:w-32 flex-shrink-0">
                {exp.startDate} &mdash; {exp.current ? t('dates.present') : exp.endDate}
              </span>
              <span className="font-body text-sm text-black/70 md:flex-1">
                {exp.role}
              </span>
              <span className="font-body text-sm text-black/35 md:text-right">
                {exp.company}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/30 mb-12"
        >
          {t('sections.education')}
        </motion.p>

        <div>
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-0 py-5 border-b border-black/5"
            >
              <span className="font-mono text-xs text-black/25 md:w-32 flex-shrink-0">
                {edu.startDate} &mdash; {edu.endDate}
              </span>
              <span className="font-body text-sm text-black/70 md:flex-1">
                {edu.degree}
                {edu.grade && (
                  <span className="text-black/35 ml-2">({edu.grade})</span>
                )}
              </span>
              <span className="font-body text-sm text-black/35 md:text-right">
                {edu.institution}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
