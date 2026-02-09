import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { skills } from '@auror/data';

type SkillCategory = 'design' | 'tools' | 'soft';

const CATEGORIES: SkillCategory[] = ['design', 'tools', 'soft'];

export default function Skills() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('design');

  const categoryCounts = useMemo(() => {
    const counts: Record<SkillCategory, number> = { design: 0, tools: 0, soft: 0 };
    skills.forEach((s) => counts[s.category]++);
    return counts;
  }, []);

  const filteredSkills = useMemo(
    () => skills.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  const categoryLabels: Record<SkillCategory, string> = {
    design: t('skillCategories.design'),
    tools: t('skillCategories.tools'),
    soft: t('skillCategories.soft'),
  };

  return (
    <section id="skills" className="py-24 md:py-36">
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
            {t('sections.skills')}
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/40 to-transparent" />
        </motion.div>

        {/* Tab-style category switcher */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-8 mb-12 border-b border-taupe/15 pb-4"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative font-body text-sm font-medium uppercase tracking-[0.12em] pb-4 -mb-4 transition-colors duration-400 flex items-center gap-2 ${
                activeCategory === cat
                  ? 'text-sienna'
                  : 'text-espresso/40 hover:text-espresso/70'
              }`}
            >
              {categoryLabels[cat]}
              <span
                className={`text-[10px] font-normal px-1.5 py-0.5 rounded-full transition-colors duration-400 ${
                  activeCategory === cat
                    ? 'bg-sienna-light text-sienna'
                    : 'bg-taupe-light text-taupe'
                }`}
              >
                {categoryCounts[cat]}
              </span>

              {activeCategory === cat && (
                <motion.div
                  layoutId="skills-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-sienna rounded-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredSkills.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative bg-taupe-light/60 rounded-xl p-5 shadow-warm hover:shadow-warm-lg transition-all duration-400 hover:-translate-y-0.5"
              >
                {/* Gold accent dot */}
                <div className="w-2 h-2 rounded-full bg-gold/40 mb-4 group-hover:bg-gold/70 transition-colors duration-400" />

                <p className="font-accent text-sm text-espresso/80 leading-snug">
                  {skill.name}
                </p>

                {/* Subtle warm border on hover */}
                <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-gold/15 transition-colors duration-400 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
