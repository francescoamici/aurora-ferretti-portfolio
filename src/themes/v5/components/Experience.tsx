import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience, education } from '@auror/data';
import { useTranslation } from '@auror/i18n';

export default function Experience() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" ref={ref} className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[0.15em] uppercase text-cyan neon-cyan">
            EXPERIENCE<span className="text-magenta neon-magenta">_</span>
          </h2>
          <div className="mt-2 font-mono text-xs text-white/30">
            {'> '}career.log
          </div>
        </motion.div>

        {/* Terminal output container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-lg p-6 md:p-10 neon-border-cyan"
        >
          {/* Terminal header bar */}
          <div className="flex items-center gap-2 mb-8 pb-4 border-b border-cyan/10">
            <span className="w-3 h-3 rounded-full bg-magenta/80" />
            <span className="w-3 h-3 rounded-full bg-green/80" />
            <span className="w-3 h-3 rounded-full bg-cyan/80" />
            <span className="ml-4 font-mono text-[10px] text-white/30">
              aurora@neon-roma:~/career
            </span>
          </div>

          {/* Career command */}
          <div className="font-mono text-sm mb-8">
            <span className="text-white/30">{'> '}</span>
            <span className="text-cyan">career</span>
            <span className="text-white/30">.log()</span>
          </div>

          {/* Experience entries */}
          <div className="space-y-8">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.2 }}
                className="font-mono"
              >
                {/* Date range */}
                <div className="text-sm">
                  <span className="text-cyan">
                    [{exp.startDate}-{exp.current ? t('dates.present').toUpperCase() : exp.endDate}]
                  </span>
                  <span className="text-white/80 ml-3">{exp.role}</span>
                </div>

                {/* Company */}
                <div className="text-sm mt-1">
                  <span className="text-white/30">@ </span>
                  <span className="text-magenta">{exp.company}</span>
                  <span className="text-white/30"> | </span>
                  <span className="text-white/40">{exp.location}</span>
                </div>

                {/* Status */}
                {exp.current && (
                  <div className="text-xs mt-2 flex items-center gap-2">
                    <span className="text-white/30">STATUS:</span>
                    <span className="text-green neon-green">ACTIVE</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse shadow-[0_0_6px_#39FF14]" />
                  </div>
                )}

                {/* Separator */}
                {i < experience.length - 1 && (
                  <div className="mt-6 border-t border-white/5" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Education section */}
          <div className="mt-12 pt-8 border-t border-cyan/10">
            <div className="font-mono text-sm mb-8">
              <span className="text-white/30">{'> '}</span>
              <span className="text-cyan">education</span>
              <span className="text-white/30">.log()</span>
            </div>

            <div className="space-y-8">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.2 }}
                  className="font-mono"
                >
                  {/* Date range */}
                  <div className="text-sm">
                    <span className="text-cyan">
                      [{edu.startDate}-{edu.endDate}]
                    </span>
                    <span className="text-white/80 ml-3">{edu.degree}</span>
                  </div>

                  {/* Institution */}
                  <div className="text-sm mt-1">
                    <span className="text-white/30">@ </span>
                    <span className="text-magenta">{edu.institution}</span>
                  </div>

                  {/* Grade */}
                  {edu.grade && (
                    <div className="text-xs mt-2">
                      <span className="text-white/30">GRADE: </span>
                      <span className="text-green neon-green">{edu.grade}</span>
                    </div>
                  )}

                  {/* Separator */}
                  {i < education.length - 1 && (
                    <div className="mt-6 border-t border-white/5" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* End of log */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="mt-10 font-mono text-xs text-white/20"
          >
            {'// '}end_of_log
            <span className="text-cyan animate-pulse ml-1">_</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
