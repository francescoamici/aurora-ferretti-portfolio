import { motion } from 'framer-motion';
import { experience, education } from '@auror/data';
import { useTranslation } from '@auror/i18n';

export default function Experience() {
  const { t } = useTranslation();
  const { t: tExp } = useTranslation('experience');

  return (
    <section id="experience" className="py-[80px]">
      <div className="mx-auto max-w-[1200px] px-[24px]">
        {/* EXPERIENCE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-[12px] mb-[48px]"
        >
          <span className="red-square" />
          <span className="section-label">{t('sections.experience')}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {experience.map((exp, i) => (
            <div
              key={exp.id}
              className={`grid grid-cols-12 gap-[24px] py-[16px] ${
                i < experience.length - 1 ? 'border-b border-light-gray' : ''
              }`}
            >
              {/* Date range — fixed width left */}
              <div className="col-span-12 md:col-span-3">
                <span className="font-mono text-[12px] text-gray">
                  {exp.startDate} &mdash; {exp.current ? t('dates.present') : exp.endDate}
                </span>
              </div>

              {/* Role — center */}
              <div className="col-span-12 md:col-span-5">
                <span className="font-sans font-medium text-[14px] text-black">
                  {tExp(`experience.${exp.id}.role`, { defaultValue: exp.role })}
                </span>
              </div>

              {/* Company — right */}
              <div className="col-span-12 md:col-span-4 md:text-right">
                <span className="font-sans text-[14px] text-gray">
                  {tExp(`experience.${exp.id}.company`, { defaultValue: exp.company })}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* EDUCATION — identical format */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-[12px] mt-[80px] mb-[48px]"
        >
          <span className="red-square" />
          <span className="section-label">{t('sections.education')}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {education.map((edu, i) => (
            <div
              key={edu.id}
              className={`grid grid-cols-12 gap-[24px] py-[16px] ${
                i < education.length - 1 ? 'border-b border-light-gray' : ''
              }`}
            >
              {/* Date range */}
              <div className="col-span-12 md:col-span-3">
                <span className="font-mono text-[12px] text-gray">
                  {edu.startDate} &mdash; {edu.endDate}
                </span>
              </div>

              {/* Degree */}
              <div className="col-span-12 md:col-span-5">
                <span className="font-sans font-medium text-[14px] text-black">
                  {tExp(`education.${edu.id}.degree`, { defaultValue: edu.degree })}
                  {edu.grade && (
                    <span className="ml-[8px] font-mono text-[11px] text-gray">
                      {edu.grade}
                    </span>
                  )}
                </span>
              </div>

              {/* Institution */}
              <div className="col-span-12 md:col-span-4 md:text-right">
                <span className="font-sans text-[14px] text-gray">
                  {tExp(`education.${edu.id}.institution`, { defaultValue: edu.institution })}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="mt-[80px] mx-auto max-w-[1200px] px-[24px]">
        <div className="w-full h-[1px] bg-light-gray" />
      </div>
    </section>
  );
}
