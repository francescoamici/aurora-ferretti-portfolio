import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { skills } from '@auror/data';

export default function Skills() {
  const { t } = useTranslation();

  const categories = useMemo(() => {
    const grouped = {
      design: skills.filter((s) => s.category === 'design'),
      tools: skills.filter((s) => s.category === 'tools'),
      soft: skills.filter((s) => s.category === 'soft'),
    };
    return grouped;
  }, []);

  const categoryLabels: Record<string, string> = {
    design: t('skillCategories.design'),
    tools: t('skillCategories.tools'),
    soft: t('skillCategories.soft'),
  };

  return (
    <section className="py-32 md:py-44 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section label with extending line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="flex items-center gap-6 mb-16 md:mb-20"
        >
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-dove whitespace-nowrap">
            {t('sections.skills')}
          </span>
          <div className="flex-1 h-px bg-silver" />
        </motion.div>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {(Object.keys(categories) as Array<keyof typeof categories>).map(
            (cat, catIndex) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: catIndex * 0.15 }}
              >
                {/* Category header with count */}
                <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-silver">
                  <h3 className="font-body text-[10px] tracking-[0.25em] uppercase text-charcoal">
                    {categoryLabels[cat]}
                  </h3>
                  <span className="font-accent text-xs text-dove italic">
                    {categories[cat].length}
                  </span>
                </div>

                {/* Skills list */}
                <ul className="space-y-3">
                  {categories[cat].map((skill, i) => (
                    <motion.li
                      key={skill.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: catIndex * 0.15 + i * 0.05 }}
                      className="font-body text-sm text-charcoal-light hover:text-charcoal hover:bg-lavender/30 px-2 py-1 -mx-2 rounded transition-all duration-300 cursor-default"
                    >
                      {skill.name}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
