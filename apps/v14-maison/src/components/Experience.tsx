import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { experience, education } from '@auror/data';

export default function Experience() {
  const { t } = useTranslation();
  const { t: te } = useTranslation('experience');

  return (
    <section id="experience" className="py-24 md:py-36 bg-cream-dark/40">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section heading with gold line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-5 mb-16 md:mb-20"
        >
          <h2 className="font-display text-2xl md:text-3xl text-espresso tracking-wide">
            {t('sections.experience')}
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/40 to-transparent" />
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Vertical gold line */}
          <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />

          <div className="space-y-10 md:space-y-14">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative pl-12 md:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 md:left-4.5 top-2">
                  {exp.current ? (
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-burgundy" />
                      <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-burgundy/40"
                      />
                    </div>
                  ) : (
                    <div className="w-3 h-3 rounded-full border-2 border-gold/50 bg-cream" />
                  )}
                </div>

                {/* Card */}
                <div className="bg-cream-light rounded-xl p-6 md:p-7 shadow-warm relative">
                  {/* Current badge */}
                  {exp.current && (
                    <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-burgundy text-cream text-[10px] font-body font-medium uppercase tracking-wider">
                      {t('dates.present')}
                    </span>
                  )}

                  <h3 className="font-display text-lg text-espresso pr-20">
                    {te(`experience.${exp.id}.role`, { defaultValue: exp.role })}
                  </h3>

                  <p className="mt-1.5 font-body text-sm text-sienna font-medium">
                    {te(`experience.${exp.id}.company`, { defaultValue: exp.company })}
                  </p>

                  <div className="mt-3 flex items-center gap-4 text-xs text-espresso/45 font-body">
                    <span className="font-accent italic">
                      {exp.startDate} &mdash; {exp.current ? t('dates.present') : exp.endDate}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-taupe/30" />
                    <span>{te(`experience.${exp.id}.location`, { defaultValue: exp.location })}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-5 mt-24 mb-16"
        >
          <h2 className="font-display text-2xl md:text-3xl text-espresso tracking-wide">
            {t('sections.education')}
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/40 to-transparent" />
        </motion.div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Vertical taupe line */}
          <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-taupe/40 via-taupe/20 to-transparent" />

          <div className="space-y-10 md:space-y-14">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative pl-12 md:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 md:left-4.5 top-2">
                  <div className="w-3 h-3 rounded-full border-2 border-taupe/50 bg-cream" />
                </div>

                {/* Card */}
                <div className="bg-cream-light rounded-xl p-6 md:p-7 shadow-warm">
                  <h3 className="font-display text-lg text-espresso">
                    {te(`education.${edu.id}.degree`, { defaultValue: edu.degree })}
                  </h3>

                  <p className="mt-1.5 font-body text-sm text-taupe font-medium">
                    {te(`education.${edu.id}.institution`, { defaultValue: edu.institution })}
                  </p>

                  <div className="mt-3 flex items-center gap-4 text-xs text-espresso/45 font-body">
                    <span className="font-accent italic">
                      {edu.startDate} &mdash; {edu.endDate}
                    </span>

                    {edu.grade && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-taupe/30" />
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          {te(`education.${edu.id}.grade`, { defaultValue: edu.grade })}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
