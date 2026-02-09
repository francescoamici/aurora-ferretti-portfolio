import { motion } from 'framer-motion';
import { skills } from '@auror/data';
import { useTranslation } from '@auror/i18n';

/* Deterministic skill levels for the bar visualization */
const skillLevels: Record<string, number> = {
  'Art Direction': 95,
  'Visual Design': 92,
  'Illustration': 90,
  'UX Design': 85,
  'Brand Identity': 88,
  'Editorial Design': 87,
  'Typography': 93,
  'Adobe Creative Suite': 95,
  'Figma': 92,
  'Adobe Illustrator': 94,
  'Adobe Photoshop': 91,
  'Adobe InDesign': 88,
  'After Effects': 78,
  'Creative Problem Solving': 90,
  'Team Leadership': 85,
  'Client Communication': 88,
};

const categoryLabels: Record<string, string> = {
  design: 'Design',
  tools: 'Tools',
  soft: 'Soft Skills',
};

export default function Skills() {
  const { t } = useTranslation();

  /* Group skills by category */
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-[80px]">
      <div className="mx-auto max-w-[1200px] px-[24px]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-[12px] mb-[48px]"
        >
          <span className="red-square" />
          <span className="section-label">{t('sections.skills')}</span>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {/* Table header */}
          <div className="grid grid-cols-12 gap-[24px] pb-[12px] border-b border-black">
            <div className="col-span-3">
              <span className="font-mono text-[11px] uppercase tracking-[1px] text-black">
                Category
              </span>
            </div>
            <div className="col-span-4">
              <span className="font-mono text-[11px] uppercase tracking-[1px] text-black">
                Skill
              </span>
            </div>
            <div className="col-span-5">
              <span className="font-mono text-[11px] uppercase tracking-[1px] text-black">
                Level
              </span>
            </div>
          </div>

          {/* Table rows */}
          {Object.entries(grouped).map(([category, categorySkills]) =>
            categorySkills.map((skill, i) => (
              <div
                key={skill.id}
                className={`grid grid-cols-12 gap-[24px] py-[12px] border-b border-light-gray ${
                  i % 2 === 1 ? 'bg-subtle-gray' : ''
                }`}
              >
                {/* Category — only show for first item in group */}
                <div className="col-span-3">
                  {i === 0 && (
                    <span className="font-sans font-medium text-[14px] text-black">
                      {t(`skillCategories.${category}`, { defaultValue: categoryLabels[category] })}
                    </span>
                  )}
                </div>

                {/* Skill name */}
                <div className="col-span-4">
                  <span className="font-sans text-[14px] text-black">
                    {skill.name}
                  </span>
                </div>

                {/* Level bar */}
                <div className="col-span-5 flex items-center">
                  <div className="w-full h-[2px] bg-light-gray relative">
                    <div
                      className="absolute top-0 left-0 h-full bg-red"
                      style={{ width: `${skillLevels[skill.name] || 80}%` }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="mt-[80px] mx-auto max-w-[1200px] px-[24px]">
        <div className="w-full h-[1px] bg-light-gray" />
      </div>
    </section>
  );
}
