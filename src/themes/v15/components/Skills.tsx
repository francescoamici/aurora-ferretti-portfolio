import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { skills } from '@auror/data';

type SkillCategory = 'design' | 'tools' | 'soft';

const categories: SkillCategory[] = ['design', 'tools', 'soft'];

export default function Skills() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const groupedSkills = categories.map((cat) => ({
    category: cat,
    label: t(`skillCategories.${cat}`),
    items: skills.filter((s) => s.category === cat),
  }));

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section label */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-accent text-xs uppercase tracking-[0.3em] text-gold block mb-3">
            {t('sections.skills')}
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-noir">
            {t('sections.skills')}
          </h2>
        </motion.div>

        {/* Skill categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {groupedSkills.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: groupIndex * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Category header */}
              <div className="mb-8">
                <h3 className="font-accent text-sm uppercase tracking-[0.25em] text-noir">
                  {group.label}
                </h3>
                <div className="mt-3 h-px bg-gold/40" />
                <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gray mt-2 block">
                  {group.items.length} {group.items.length === 1 ? 'skill' : 'skills'}
                </span>
              </div>

              {/* Skills list */}
              <ul className="space-y-0">
                {group.items.map((skill, skillIndex) => (
                  <motion.li
                    key={skill.id}
                    className="flex items-center justify-between py-3.5 border-b border-noir/5 last:border-b-0"
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: groupIndex * 0.15 + skillIndex * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span className="font-body text-sm text-noir/80">
                      {skill.name}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blush/60 flex-shrink-0" />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
