import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { skills } from '@auror/data';

const categories = ['design', 'tools', 'soft'] as const;

export default function Skills() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  const grouped = {
    design: skills.filter((s) => s.category === 'design'),
    tools: skills.filter((s) => s.category === 'tools'),
    soft: skills.filter((s) => s.category === 'soft'),
  };

  return (
    <section id="skills" ref={sectionRef} className="relative py-28 md:py-36 bg-cream-dark/40">
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
              Expertise
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-charcoal">
              {t('sections.skills')}
            </h2>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block flex-1 h-px bg-gradient-to-l from-transparent to-gold/30 origin-left"
          />
        </motion.div>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + catIdx * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Category name */}
              <div className="mb-8">
                <span className="font-accent text-xs tracking-[0.25em] uppercase text-gold/70 block mb-3">
                  0{catIdx + 1}
                </span>
                <h3 className="font-accent text-xl md:text-2xl text-charcoal tracking-wide">
                  {t(`skillCategories.${category}`)}
                </h3>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + catIdx * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-3 w-full h-px bg-gold/30 origin-left"
                />
              </div>

              {/* Skills list */}
              <ul className="space-y-0">
                {grouped[category].map((skill, skillIdx) => (
                  <motion.li
                    key={skill.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + catIdx * 0.15 + skillIdx * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="group flex items-center py-3 cursor-default">
                      {/* Gold dot */}
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors duration-300 mr-4 flex-shrink-0" />
                      <span className="font-body text-base text-charcoal-light group-hover:text-charcoal transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                    {/* Separator */}
                    {skillIdx < grouped[category].length - 1 && (
                      <div className="ml-5 h-px bg-gold/10" />
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-32 h-32 border border-gold/5 rounded-full hidden lg:block" />
      <div className="absolute bottom-20 left-10 w-24 h-24 border border-blush/10 rounded-full hidden lg:block" />
    </section>
  );
}
