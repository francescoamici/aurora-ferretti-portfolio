import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { experience, education } from '@auror/data';

export default function Experience() {
  const { t } = useTranslation();
  const { t: tExp } = useTranslation('experience');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  return (
    <section id="experience" ref={sectionRef} className="relative py-28 md:py-36 bg-cream">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-6 mb-16 md:mb-20"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block flex-1 h-px bg-gradient-to-r from-transparent to-gold/30 origin-right"
          />
          <div className="flex flex-col items-start md:items-center">
            <span className="font-accent text-xs tracking-[0.3em] uppercase text-gold mb-2">
              Career
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-charcoal">
              {t('sections.experience')}
            </h2>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block flex-1 h-px bg-gradient-to-l from-transparent to-gold/30 origin-left"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Experience timeline */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-accent text-sm tracking-[0.25em] uppercase text-gold mb-10"
            >
              {t('sections.experience')}
            </motion.h3>

            <div className="relative">
              {/* Timeline vertical line */}
              <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: '100%' } : {}}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-3 top-0 w-px bg-gradient-to-b from-gold via-gold/40 to-gold/10"
              />

              <div className="space-y-10">
                {experience.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + i * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative pl-10"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5">
                      {exp.current ? (
                        <div className="relative w-6 h-6 flex items-center justify-center">
                          <motion.div
                            className="absolute inset-0 rounded-full bg-gold/20"
                            animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          />
                          <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-gold/50 border border-gold/30" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-display text-xl md:text-2xl text-charcoal leading-tight">
                          {tExp(`experience.${exp.id}.role`)}
                        </h4>
                        <p className="font-accent text-base text-gold tracking-wide mt-1">
                          {tExp(`experience.${exp.id}.company`)}
                        </p>
                        <p className="font-body text-sm text-charcoal-light/60 mt-2">
                          {tExp(`experience.${exp.id}.location`)}
                        </p>
                        <p className="font-body text-sm text-charcoal-light mt-3 leading-relaxed">
                          {tExp(`experience.${exp.id}.description`)}
                        </p>
                      </div>
                      <div className="sm:text-right flex-shrink-0">
                        <span className="font-accent text-sm tracking-wider text-charcoal-light/60">
                          {exp.startDate} — {exp.current ? t('dates.present') : exp.endDate}
                        </span>
                        {exp.current && (
                          <span className="block font-accent text-xs tracking-[0.2em] uppercase text-gold mt-1">
                            {t('dates.present')}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Education timeline */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-accent text-sm tracking-[0.25em] uppercase text-blush-deep mb-10"
            >
              {t('sections.education')}
            </motion.h3>

            <div className="relative">
              {/* Timeline vertical line (blush color for education) */}
              <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: '100%' } : {}}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-3 top-0 w-px bg-gradient-to-b from-blush-deep via-blush/60 to-blush/10"
              />

              <div className="space-y-10">
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.5 + i * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative pl-10"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 w-6 h-6 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blush-deep/50 border border-blush-deep/30" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-display text-xl md:text-2xl text-charcoal leading-tight">
                          {tExp(`education.${edu.id}.degree`)}
                        </h4>
                        <p className="font-accent text-base text-blush-deep tracking-wide mt-1">
                          {tExp(`education.${edu.id}.institution`)}
                        </p>
                        {edu.grade && (
                          <p className="font-accent text-sm text-gold tracking-wide mt-1">
                            {edu.grade}
                          </p>
                        )}
                        <p className="font-body text-sm text-charcoal-light mt-3 leading-relaxed">
                          {tExp(`education.${edu.id}.description`)}
                        </p>
                      </div>
                      <div className="sm:text-right flex-shrink-0">
                        <span className="font-accent text-sm tracking-wider text-charcoal-light/60">
                          {edu.startDate} — {edu.endDate}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
