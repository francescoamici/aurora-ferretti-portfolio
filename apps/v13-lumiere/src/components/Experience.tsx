import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { experience, education } from '@auror/data';

export default function Experience() {
  const { t } = useTranslation();

  return (
    <section className="py-32 md:py-44 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Experience section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="flex items-center gap-6 mb-16 md:mb-20"
        >
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-dove whitespace-nowrap">
            {t('sections.experience')}
          </span>
          <div className="flex-1 h-px bg-silver" />
        </motion.div>

        {/* Experience entries */}
        <div className="space-y-0">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="py-8 border-b border-silver last:border-b-0"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-charcoal text-lg md:text-xl">
                      {t(`experience.${exp.id}.role`, { ns: 'experience', defaultValue: exp.role })}
                    </h3>
                    {/* Current indicator — small pulsing rose dot */}
                    {exp.current && (
                      <motion.div
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-1.5 h-1.5 rounded-full bg-rose shrink-0"
                      />
                    )}
                  </div>
                  <p className="font-accent text-charcoal-light text-sm mt-1 italic">
                    {t(`experience.${exp.id}.company`, { ns: 'experience', defaultValue: exp.company })}
                  </p>
                  <p className="font-body text-[11px] tracking-wide text-dove mt-1">
                    {t(`experience.${exp.id}.location`, { ns: 'experience', defaultValue: exp.location })}
                  </p>
                </div>

                {/* Dates aligned right */}
                <p className="font-body text-[11px] tracking-[0.15em] text-dove shrink-0">
                  {exp.startDate} &mdash; {exp.current ? t('dates.present') : exp.endDate}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="flex items-center gap-6 mt-24 md:mt-32 mb-16 md:mb-20"
        >
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-dove whitespace-nowrap">
            {t('sections.education')}
          </span>
          <div className="flex-1 h-px bg-silver" />
        </motion.div>

        {/* Education entries */}
        <div className="space-y-0">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="py-8 border-b border-silver last:border-b-0"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-6">
                <div className="flex-1">
                  <h3 className="font-display text-charcoal text-lg md:text-xl">
                    {t(`education.${edu.id}.degree`, { ns: 'experience', defaultValue: edu.degree })}
                  </h3>
                  <p className="font-accent text-charcoal-light text-sm mt-1 italic">
                    {t(`education.${edu.id}.institution`, { ns: 'experience', defaultValue: edu.institution })}
                  </p>
                  {/* Grade with accent */}
                  {edu.grade && (
                    <p className="font-body text-[11px] tracking-wide text-charcoal-light mt-2 flex items-center gap-2">
                      <span className="text-lavender-deep">*</span>
                      <span>{edu.grade}</span>
                    </p>
                  )}
                </div>

                {/* Dates aligned right */}
                <p className="font-body text-[11px] tracking-[0.15em] text-dove shrink-0">
                  {edu.startDate} &mdash; {edu.endDate}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
