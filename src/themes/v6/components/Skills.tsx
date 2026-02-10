import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { skills } from '@auror/data';

const categoryColors: Record<string, { bg: string; text: string; border: string; label: string }> = {
  design: { bg: 'bg-forest/10', text: 'text-forest', border: 'border-forest/20', label: 'forest' },
  tools: { bg: 'bg-terra/10', text: 'text-terra', border: 'border-terra/20', label: 'terra' },
  soft: { bg: 'bg-rose/10', text: 'text-rose', border: 'border-rose/20', label: 'rose' },
};

/* Vine SVG that acts as the skill tree */
function SkillVine() {
  return (
    <svg
      className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-8 text-forest/15 hidden lg:block"
      viewBox="0 0 32 600"
      preserveAspectRatio="none"
      fill="none"
      style={{ height: '100%' }}
    >
      <path
        d="M16 0 C16 30, 14 60, 16 100 C18 140, 12 180, 16 220 C20 260, 14 300, 16 340 C18 380, 12 420, 16 460 C20 500, 16 540, 16 600"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Small leaf branches */}
      <path d="M16 80 C10 72, 4 70, 2 76 C0 82, 8 84, 16 80Z" fill="currentColor" opacity="0.5" />
      <path d="M16 180 C22 172, 28 170, 30 176 C32 182, 24 184, 16 180Z" fill="currentColor" opacity="0.4" />
      <path d="M16 300 C10 292, 4 290, 2 296 C0 302, 8 304, 16 300Z" fill="currentColor" opacity="0.5" />
      <path d="M16 420 C22 412, 28 410, 30 416 C32 422, 24 424, 16 420Z" fill="currentColor" opacity="0.4" />
      <path d="M16 520 C10 512, 4 510, 2 516 C0 522, 8 524, 16 520Z" fill="currentColor" opacity="0.5" />
      {/* Small dots / berries */}
      <circle cx="4" cy="120" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="28" cy="240" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="4" cy="380" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="28" cy="480" r="2.5" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export default function Skills() {
  const { t } = useTranslation();

  const categories = ['design', 'tools', 'soft'] as const;

  const grouped = categories.map((cat) => ({
    key: cat,
    label: t(`skillCategories.${cat}`),
    items: skills.filter((s) => s.category === cat),
  }));

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl text-forest font-light">
            {t('sections.skills')}
          </h2>
          <p className="font-hand text-xl text-terra/60 mt-3">
            {t('skillCategories.design') === 'Design' ? 'Growing every day' : 'In crescita ogni giorno'}
          </p>
        </motion.div>

        {/* Skill categories */}
        <div className="relative">
          <SkillVine />

          <div className="space-y-16 lg:space-y-20">
            {grouped.map((group, groupIdx) => {
              const colors = categoryColors[group.key];
              const isLeft = groupIdx % 2 === 0;

              return (
                <motion.div
                  key={group.key}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={`lg:w-[45%] ${isLeft ? 'lg:mr-auto' : 'lg:ml-auto'}`}
                >
                  {/* Category label in handwriting */}
                  <div className={`flex items-center gap-3 mb-6 ${isLeft ? '' : 'lg:justify-end'}`}>
                    <div className={`w-3 h-3 rounded-full ${colors.bg} border ${colors.border}`} />
                    <h3 className={`font-hand text-2xl md:text-3xl ${colors.text}`}>
                      {group.label}
                    </h3>
                  </div>

                  {/* Skill pills */}
                  <div className={`flex flex-wrap gap-3 ${isLeft ? '' : 'lg:justify-end'}`}>
                    {group.items.map((skill, i) => (
                      <motion.span
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`inline-block font-body text-sm font-medium px-5 py-2.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border} transition-shadow hover:shadow-md cursor-default`}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
