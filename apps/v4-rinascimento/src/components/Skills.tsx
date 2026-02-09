import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { skills } from '@auror/data';
import OrnamentalDivider from './OrnamentalDivider';

export default function Skills() {
  const { t } = useTranslation();

  const designSkills = skills.filter((s) => s.category === 'design');
  const toolSkills = skills.filter((s) => s.category === 'tools');
  const softSkills = skills.filter((s) => s.category === 'soft');

  const categories = [
    { key: 'design', label: t('skillCategories.design'), items: designSkills },
    { key: 'tools', label: t('skillCategories.tools'), items: toolSkills },
    { key: 'soft', label: t('skillCategories.soft'), items: softSkills },
  ];

  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-caps text-[0.7rem] tracking-[0.3em] uppercase text-brown/50 small-caps">
            {t('sections.skills')}
          </h2>
        </motion.div>

        {/* Three-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: catIndex * 0.15 }}
            >
              {/* Category header */}
              <h3 className="font-caps text-[0.65rem] tracking-[0.25em] uppercase text-brown/60 small-caps mb-6 pb-3 border-b border-brown/15">
                {category.label}
              </h3>

              {/* Skills list */}
              <ul className="space-y-3">
                {category.items.map((skill, i) => (
                  <motion.li
                    key={skill.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: catIndex * 0.15 + i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-terracotta/60 text-xs mt-1 shrink-0">&mdash;</span>
                    <span className="font-body text-brown/75 text-sm md:text-base leading-relaxed">
                      {skill.name}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <OrnamentalDivider className="mt-20" />
    </section>
  );
}
