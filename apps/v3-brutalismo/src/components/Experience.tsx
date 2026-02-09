import { useTranslation } from '@auror/i18n';
import { experience, education } from '@auror/data';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export default function Experience() {
  const { t } = useTranslation();
  const { t: tExp } = useTranslation('experience');

  // Random rotations for each card
  const rotations = useMemo(
    () => [...experience, ...education].map(() => (Math.random() * 2 - 1)),
    []
  );

  return (
    <section id="experience" className="relative bg-raw-white border-b-[8px] border-harsh-black">
      {/* SECTION HEADER */}
      <div className="border-b-[4px] border-harsh-black px-4 md:px-8 py-6">
        <motion.h2
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.1 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-6xl uppercase"
        >
          {t('sections.experience')}
        </motion.h2>
      </div>

      {/* EXPERIENCE CARDS */}
      <div className="px-4 md:px-8 py-8 md:py-16 space-y-6 md:space-y-8">
        {experience.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ x: i % 2 === 0 ? -40 : 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.1, delay: i * 0.05 }}
            viewport={{ once: true }}
            style={{ transform: `rotate(${rotations[i]}deg)` }}
            className={`
              border-[4px] border-harsh-black p-6 md:p-8 bg-raw-white hard-shadow
              ${i % 2 === 0 ? 'md:mr-24' : 'md:ml-24'}
            `}
          >
            {/* DATE */}
            <div className="font-mono text-sm md:text-base font-bold mb-2 tracking-[0.2em]">
              {exp.startDate} {'\u2192'} {exp.current ? t('dates.present').toUpperCase() : exp.endDate}
            </div>

            {/* ROLE */}
            <h3 className="font-heading text-xl md:text-3xl uppercase mb-2">
              {tExp(`experience.${exp.id}.role`, { defaultValue: exp.role })}
            </h3>

            {/* COMPANY */}
            <div className="font-mono text-base md:text-lg text-blue font-bold underline underline-offset-4 decoration-2 mb-1">
              {tExp(`experience.${exp.id}.company`, { defaultValue: exp.company })}
            </div>

            {/* LOCATION */}
            <div className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">
              {tExp(`experience.${exp.id}.location`, { defaultValue: exp.location })}
            </div>

            {/* DESCRIPTION */}
            <p className="font-mono text-xs md:text-sm mt-4 leading-relaxed opacity-80">
              {tExp(`experience.${exp.id}.description`, { defaultValue: '' })}
            </p>
          </motion.div>
        ))}
      </div>

      {/* THICK DIVIDER */}
      <div className="h-2 bg-blue" />

      {/* EDUCATION HEADER */}
      <div className="border-b-[4px] border-harsh-black px-4 md:px-8 py-6 bg-harsh-black">
        <motion.h2
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.1 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-5xl uppercase text-raw-white"
        >
          {t('sections.education')}
        </motion.h2>
      </div>

      {/* EDUCATION CARDS */}
      <div className="px-4 md:px-8 py-8 md:py-16 space-y-6 md:space-y-8 bg-harsh-black">
        {education.map((edu, i) => {
          const rotIdx = experience.length + i;
          return (
            <motion.div
              key={edu.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.1, delay: i * 0.05 }}
              viewport={{ once: true }}
              style={{ transform: `rotate(${rotations[rotIdx]}deg)` }}
              className="border-[4px] border-blue p-6 md:p-8 bg-harsh-black hard-shadow-blue"
            >
              {/* DATE */}
              <div className="font-mono text-sm font-bold mb-2 tracking-[0.2em] text-yellow">
                {edu.startDate} {'\u2192'} {edu.endDate}
              </div>

              {/* DEGREE */}
              <h3 className="font-heading text-xl md:text-2xl uppercase text-raw-white mb-2">
                {tExp(`education.${edu.id}.degree`, { defaultValue: edu.degree })}
              </h3>

              {/* INSTITUTION */}
              <div className="font-mono text-base text-blue font-bold underline underline-offset-4 decoration-2">
                {tExp(`education.${edu.id}.institution`, { defaultValue: edu.institution })}
              </div>

              {/* GRADE */}
              {edu.grade && (
                <div className="font-mono text-sm mt-3 text-yellow font-bold">
                  {'\u2605'} {edu.grade}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
