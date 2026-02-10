import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { experience, education } from '@auror/data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Experience() {
  const { t } = useTranslation();

  return (
    <section id="experience" className="relative bg-nero px-6 py-32">
      <div className="mx-auto max-w-4xl">
        {/* Experience section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-xs tracking-[0.4em] text-gold/60 uppercase">
            {t('sections.experience')}
          </p>
          <h2 className="font-display text-4xl font-bold text-ivory md:text-5xl">
            {t('nav.experience')}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-16 pl-8">
          {/* Gold vertical line */}
          <motion.div
            className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-gold via-gold/40 to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="relative mb-12 last:mb-0"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {/* Gold dot */}
              <div className="absolute -left-8 top-1.5 flex h-3 w-3 items-center justify-center">
                <div className="h-3 w-3 rounded-full border-2 border-gold bg-nero" />
                <div className="absolute h-5 w-5 animate-ping rounded-full bg-gold/20" />
              </div>

              <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold text-ivory">
                    {t(`experience.${exp.id}.role`, { ns: 'experience' })}
                  </h3>
                  <p className="mt-1 font-accent text-lg text-gold/70">
                    {t(`experience.${exp.id}.company`, { ns: 'experience' })}
                  </p>
                  <p className="mt-1 text-sm text-ivory/40">
                    {t(`experience.${exp.id}.location`, { ns: 'experience' })}
                  </p>
                </div>
                <span className="mt-1 text-sm tracking-wider text-gold/50 md:mt-0">
                  {exp.startDate} &mdash;{' '}
                  {exp.current ? t('dates.present') : exp.endDate}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education section */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-xs tracking-[0.4em] text-gold/60 uppercase">
            {t('sections.education')}
          </p>
          <h2 className="font-display text-3xl font-bold text-ivory md:text-4xl">
            {t('sections.education')}
          </h2>
        </motion.div>

        {/* Education timeline */}
        <div className="relative mt-12 pl-8">
          <motion.div
            className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-gold/60 via-gold/30 to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              className="relative mb-12 last:mb-0"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {/* Gold dot */}
              <div className="absolute -left-8 top-1.5 h-3 w-3 rounded-full border-2 border-gold/60 bg-nero" />

              <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold text-ivory">
                    {t(`education.${edu.id}.degree`, { ns: 'experience' })}
                  </h3>
                  <p className="mt-1 font-accent text-lg text-gold/70">
                    {t(`education.${edu.id}.institution`, { ns: 'experience' })}
                  </p>
                  {edu.grade && (
                    <p className="mt-1 text-sm font-medium text-gold/50">
                      {edu.grade}
                    </p>
                  )}
                </div>
                <span className="mt-1 text-sm tracking-wider text-gold/50 md:mt-0">
                  {edu.startDate} &mdash; {edu.endDate}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
