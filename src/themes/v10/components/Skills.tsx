import { motion } from 'framer-motion';
import { skills } from '@auror/data';
import { useTranslation } from '@auror/i18n';

export default function Skills() {
  const { t } = useTranslation();

  const designSkills = skills.filter((s) => s.category === 'design');
  const toolSkills = skills.filter((s) => s.category === 'tools');
  const softSkills = skills.filter((s) => s.category === 'soft');

  const departments = [
    { label: t('skillCategories.design'), skills: designSkills },
    { label: t('skillCategories.tools'), skills: toolSkills },
    { label: t('skillCategories.soft'), skills: softSkills },
  ];

  return (
    <div>
      {/* CREDITS header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.5 }}
        className="mb-16"
      >
        <h3
          className="font-display text-gold text-xs tracking-[0.4em] uppercase text-center mb-3"
          style={{ fontVariant: 'small-caps' }}
        >
          Credits
        </h3>
        <div className="gold-rule max-w-xs mx-auto" />
      </motion.div>

      {/* Credits-style two-column layout */}
      <div className="max-w-2xl mx-auto space-y-12">
        {departments.map((dept, deptIdx) => (
          <motion.div
            key={dept.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: deptIdx * 0.2 }}
          >
            {/* Department name */}
            <p
              className="font-display text-[10px] tracking-[0.35em] text-gold/60 uppercase mb-5 text-center"
              style={{ fontVariant: 'small-caps' }}
            >
              {dept.label}
            </p>

            {/* Skill entries — credits style */}
            <div className="space-y-2">
              {dept.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-baseline"
                >
                  <span className="font-mono text-xs md:text-sm text-warm-white/70 tracking-wide whitespace-nowrap">
                    {skill.name}
                  </span>
                  <span className="leader-dots" />
                  <span className="font-mono text-xs md:text-sm text-gold/70 tracking-wide whitespace-nowrap">
                    Aurora Ferretti
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
