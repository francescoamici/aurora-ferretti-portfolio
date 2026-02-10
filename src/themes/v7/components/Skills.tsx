import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { skills } from '@auror/data';
import type { Skill } from '@auror/data';

const categoryOrder: Skill['category'][] = ['design', 'tools', 'soft'];

// Assign "gauge" fill levels per skill (simulated proficiency for visual effect)
const gaugeLevels: Record<string, number> = {
  'Art Direction': 95,
  'Visual Design': 92,
  'Illustration': 88,
  'UX Design': 85,
  'Brand Identity': 90,
  'Editorial Design': 87,
  'Typography': 93,
  'Adobe Creative Suite': 95,
  'Figma': 90,
  'Adobe Illustrator': 94,
  'Adobe Photoshop': 92,
  'Adobe InDesign': 88,
  'After Effects': 78,
  'Creative Problem Solving': 91,
  'Team Leadership': 86,
  'Client Communication': 89,
};

function SkillGauge({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const level = gaugeLevels[skill.name] || 80;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.25, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="flex items-center gap-4">
        {/* Skill name */}
        <span className="font-display text-sm sm:text-base tracking-[0.2em] uppercase text-white/70 w-44 sm:w-52 shrink-0 text-right">
          {skill.name}
        </span>

        {/* Gauge bar */}
        <div className="flex-1 h-3 sm:h-4 bg-white/5 relative overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${level}%` } : { width: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.05 + 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="h-full gauge-fill relative"
          >
            {/* Speed highlight */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </motion.div>

          {/* Tick marks */}
          {[25, 50, 75].map((tick) => (
            <div
              key={tick}
              className="absolute top-0 bottom-0 w-px bg-white/10"
              style={{ left: `${tick}%` }}
            />
          ))}
        </div>

        {/* Level number */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.05 + 0.6 }}
          className="font-display text-xs tracking-[0.2em] text-orange/60 w-10 text-right"
        >
          {level}
        </motion.span>
      </div>
    </motion.div>
  );
}

function SkillMarquee() {
  const allSkillNames = skills.map((s) => s.name);
  const repeated = [...allSkillNames, ...allSkillNames, ...allSkillNames, ...allSkillNames];

  return (
    <div className="overflow-hidden py-6 border-y border-white/5">
      <div className="animate-marquee flex gap-8 whitespace-nowrap">
        {repeated.map((name, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-2xl sm:text-3xl tracking-[0.2em] uppercase text-white/10 hover:text-red/40 transition-colors duration-150">
              {name}
            </span>
            <span className="text-red/20 font-big text-xl">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useTranslation('common');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    items: skills.filter((s) => s.category === cat),
  }));

  return (
    <section id="competenze" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Diagonal stripe background */}
      <div className="absolute inset-0 diagonal-stripe opacity-15 pointer-events-none" />

      {/* Speed lines */}
      <div className="absolute top-24 left-0 w-[45%] h-[1px] bg-gradient-to-r from-orange/20 to-transparent" />
      <div className="absolute top-28 left-0 w-[30%] h-[1px] bg-gradient-to-r from-red/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="text-right" style={{ transform: 'rotate(3deg)', transformOrigin: 'right center' }}>
            <h2 className="font-big font-800 text-7xl sm:text-8xl lg:text-9xl uppercase tracking-tight text-white/5">
              VELOCITA
            </h2>
          </div>
          <div className="flex items-center gap-4 justify-end -mt-6">
            <span className="font-display text-xl sm:text-2xl tracking-[0.3em] uppercase text-white">
              {t('sections.skills')}
            </span>
            <div className="w-20 h-[3px] racing-stripe" />
          </div>
        </motion.div>

        {/* Velocity marquee */}
        <SkillMarquee />

        {/* Speedometer gauges by category */}
        <div className="mt-16 space-y-16">
          {grouped.map((group) => (
            <div key={group.category}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-red font-big font-700 text-xl">/</span>
                <h3 className="font-display text-lg tracking-[0.3em] uppercase text-orange/70">
                  {t(`skillCategories.${group.category}`)}
                </h3>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              {/* Gauge bars */}
              <div className="space-y-3">
                {group.items.map((skill, i) => (
                  <SkillGauge key={skill.id} skill={skill} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
