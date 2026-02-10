import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '@auror/data';
import { useTranslation } from '@auror/i18n';

const categoryConfig = {
  design: {
    color: 'cyan',
    borderClass: 'border-cyan/40',
    textClass: 'text-cyan',
    glowClass: 'neon-border-cyan',
    shadowColor: 'rgba(0,240,255,0.2)',
  },
  tools: {
    color: 'magenta',
    borderClass: 'border-magenta/40',
    textClass: 'text-magenta',
    glowClass: 'neon-border-magenta',
    shadowColor: 'rgba(255,0,229,0.2)',
  },
  soft: {
    color: 'green',
    borderClass: 'border-green/40',
    textClass: 'text-green',
    glowClass: 'neon-border-green',
    shadowColor: 'rgba(57,255,20,0.2)',
  },
};

export default function Skills() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const designSkills = skills.filter((s) => s.category === 'design');
  const toolSkills = skills.filter((s) => s.category === 'tools');
  const softSkills = skills.filter((s) => s.category === 'soft');

  return (
    <section id="skills" ref={ref} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-[0.15em] uppercase text-cyan neon-cyan">
            SKILLS<span className="text-magenta neon-magenta">_</span>
          </h2>
          <div className="mt-2 font-mono text-xs text-white/30">
            {'> '}aurora.skills.map()
          </div>
        </motion.div>

        {/* Orbit visualization */}
        <div className="relative flex items-center justify-center min-h-[500px] md:min-h-[600px]">
          {/* Central node */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, type: 'spring' }}
            className="absolute z-10 w-24 h-24 md:w-32 md:h-32 rounded-full glass border border-cyan/40 flex items-center justify-center neon-border-cyan"
          >
            <span className="font-display text-[10px] md:text-xs font-bold tracking-[0.2em] text-cyan neon-cyan">
              SKILLS
            </span>
          </motion.div>

          {/* Ring 1 - Design (inner) */}
          <div className="absolute w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full border border-cyan/10">
            <div className="animate-orbit w-full h-full relative">
              {designSkills.map((skill, i) => {
                const angle = (360 / designSkills.length) * i;
                const rad = (angle * Math.PI) / 180;
                const radius = 50;
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;
                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                    className="absolute"
                    style={{
                      left: `${50 + x}%`,
                      top: `${50 + y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="animate-orbit-reverse">
                      <div
                        className={`px-3 py-1.5 rounded-full border ${categoryConfig.design.borderClass} ${categoryConfig.design.glowClass} bg-space/80 whitespace-nowrap`}
                      >
                        <span
                          className={`font-mono text-[10px] md:text-xs ${categoryConfig.design.textClass}`}
                        >
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Ring 2 - Tools (middle) */}
          <div className="absolute w-[460px] h-[460px] md:w-[560px] md:h-[560px] rounded-full border border-magenta/10">
            <div className="animate-orbit-reverse w-full h-full relative">
              {toolSkills.map((skill, i) => {
                const angle = (360 / toolSkills.length) * i;
                const rad = (angle * Math.PI) / 180;
                const radius = 50;
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;
                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
                    className="absolute"
                    style={{
                      left: `${50 + x}%`,
                      top: `${50 + y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="animate-orbit">
                      <div
                        className={`px-3 py-1.5 rounded-full border ${categoryConfig.tools.borderClass} ${categoryConfig.tools.glowClass} bg-space/80 whitespace-nowrap`}
                      >
                        <span
                          className={`font-mono text-[10px] md:text-xs ${categoryConfig.tools.textClass}`}
                        >
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Ring 3 - Soft (outer) */}
          <div className="absolute w-[600px] h-[600px] md:w-[720px] md:h-[720px] rounded-full border border-green/10">
            <div className="animate-orbit-slow w-full h-full relative">
              {softSkills.map((skill, i) => {
                const angle = (360 / softSkills.length) * i + 30;
                const rad = (angle * Math.PI) / 180;
                const radius = 50;
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;
                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.9 + i * 0.08, duration: 0.5 }}
                    className="absolute"
                    style={{
                      left: `${50 + x}%`,
                      top: `${50 + y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="animate-orbit-reverse">
                      <div
                        className={`px-3 py-1.5 rounded-full border ${categoryConfig.soft.borderClass} ${categoryConfig.soft.glowClass} bg-space/80 whitespace-nowrap`}
                      >
                        <span
                          className={`font-mono text-[10px] md:text-xs ${categoryConfig.soft.textClass}`}
                        >
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 flex justify-center gap-8 font-mono text-xs"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_6px_#00F0FF]" />
            <span className="text-cyan/60">{t('skillCategories.design')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-magenta shadow-[0_0_6px_#FF00E5]" />
            <span className="text-magenta/60">{t('skillCategories.tools')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green shadow-[0_0_6px_#39FF14]" />
            <span className="text-green/60">{t('skillCategories.soft')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
