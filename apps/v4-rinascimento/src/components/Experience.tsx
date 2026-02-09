import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { experience, education } from '@auror/data';
import OrnamentalDivider from './OrnamentalDivider';

export default function Experience() {
  const { t, i18n } = useTranslation();
  const { t: tExp } = useTranslation('experience');
  const lang = i18n.language?.startsWith('it') ? 'it' : 'en';

  const curriculumLabel = lang === 'it' ? 'Curriculum' : 'Curriculum';
  const formazioneLabel = lang === 'it' ? 'Formazione' : 'Education';
  const presentLabel = t('dates.present');

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] },
    }),
  };

  return (
    <section id="experience" className="bg-parchment py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-caps text-[0.7rem] tracking-[0.3em] uppercase text-brown/50 small-caps">
            {curriculumLabel}
          </h2>
        </motion.div>

        {/* Experience entries */}
        <div className="max-w-3xl mx-auto space-y-12 mb-24">
          {experience.map((exp, i) => {
            const role = tExp(`experience.${exp.id}.role`, { defaultValue: exp.role });
            const company = tExp(`experience.${exp.id}.company`, { defaultValue: exp.company });
            const location = tExp(`experience.${exp.id}.location`, { defaultValue: exp.location });
            const description = tExp(`experience.${exp.id}.description`, { defaultValue: '' });
            const dateRange = exp.current
              ? `${exp.startDate} \u2013 ${presentLabel}`
              : `${exp.startDate} \u2013 ${exp.endDate}`;

            return (
              <motion.article
                key={exp.id}
                variants={fadeUp}
                custom={i * 0.15}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="group"
              >
                {/* Date range */}
                <p className="font-caps text-[0.6rem] tracking-[0.25em] uppercase text-brown/40 small-caps mb-3">
                  {dateRange}
                </p>

                {/* Company name */}
                <h3 className="font-display font-bold text-brown text-xl md:text-2xl leading-snug mb-1">
                  {company}
                </h3>

                {/* Role */}
                <p className="font-subhead italic text-terracotta/80 text-base md:text-lg mb-2">
                  {role}
                </p>

                {/* Location */}
                <p className="font-caps text-[0.6rem] tracking-[0.15em] uppercase text-brown/35 small-caps mb-3">
                  {location}
                </p>

                {/* Description */}
                {description && (
                  <p className="font-body text-brown/60 text-sm leading-[1.75] mt-3">
                    {description}
                  </p>
                )}

                {/* Thin rule below */}
                <div className="h-px bg-brown/10 mt-8" />
              </motion.article>
            );
          })}
        </div>

        {/* Education section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-caps text-[0.7rem] tracking-[0.3em] uppercase text-brown/50 small-caps">
            {formazioneLabel}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-12">
          {education.map((edu, i) => {
            const institution = tExp(`education.${edu.id}.institution`, { defaultValue: edu.institution });
            const degree = tExp(`education.${edu.id}.degree`, { defaultValue: edu.degree });
            const grade = tExp(`education.${edu.id}.grade`, { defaultValue: edu.grade || '' });
            const description = tExp(`education.${edu.id}.description`, { defaultValue: '' });
            const dateRange = `${edu.startDate} \u2013 ${edu.endDate}`;

            return (
              <motion.article
                key={edu.id}
                variants={fadeUp}
                custom={i * 0.15}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {/* Date range */}
                <p className="font-caps text-[0.6rem] tracking-[0.25em] uppercase text-brown/40 small-caps mb-3">
                  {dateRange}
                </p>

                {/* Institution */}
                <h3 className="font-display font-bold text-brown text-xl md:text-2xl leading-snug mb-1">
                  {institution}
                </h3>

                {/* Degree */}
                <p className="font-subhead italic text-brown/70 text-base md:text-lg mb-2">
                  {degree}
                </p>

                {/* Grade - highlighted in terracotta */}
                {grade && (
                  <p className="font-subhead italic text-terracotta text-base font-medium mt-2">
                    {grade}
                  </p>
                )}

                {/* Description */}
                {description && (
                  <p className="font-body text-brown/60 text-sm leading-[1.75] mt-3">
                    {description}
                  </p>
                )}

                {/* Thin rule below */}
                <div className="h-px bg-brown/10 mt-8" />
              </motion.article>
            );
          })}
        </div>
      </div>

      <OrnamentalDivider className="mt-20" />
    </section>
  );
}
