import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { skills } from '@auror/data';
import type { Skill } from '@auror/data';

const stickerColors = [
  { bg: '#FFB4C8', border: '#FF6B6B' },
  { bg: '#FFE66D', border: '#FF6B6B' },
  { bg: '#4361EE', border: '#1A1A2E' },
  { bg: '#FF6B6B', border: '#4361EE' },
  { bg: '#95E1D3', border: '#4361EE' },
  { bg: '#FFE66D', border: '#95E1D3' },
  { bg: '#FFB4C8', border: '#4361EE' },
  { bg: '#95E1D3', border: '#FF6B6B' },
];

const categoryColors: Record<string, string> = {
  design: '#4361EE',
  tools: '#FF6B6B',
  soft: '#95E1D3',
};

function StickerSkill({ skill, index }: { skill: Skill; index: number }) {
  const colors = stickerColors[index % stickerColors.length];
  const rotation = ((index * 7) % 11) - 5; // pseudo-random rotation
  const isDark = colors.bg === '#4361EE';

  return (
    <motion.div
      className="inline-block"
      initial={{ opacity: 0, scale: 0, rotate: rotation * 3 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
      viewport={{ once: true }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 12,
        delay: index * 0.05,
      }}
      whileHover={{
        scale: 1.12,
        rotate: 0,
        rotateX: -15,
        y: -8,
        transition: { type: 'spring', stiffness: 400, damping: 15 },
      }}
      style={{ perspective: 600 }}
    >
      <div
        className="px-5 py-3 rounded-xl cursor-default select-none"
        style={{
          backgroundColor: colors.bg,
          border: `3px solid ${colors.border}`,
          color: isDark ? '#FFFFFF' : '#1A1A2E',
          boxShadow: '3px 3px 0px rgba(0,0,0,0.15)',
        }}
      >
        <span className="font-display text-sm md:text-base whitespace-nowrap">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
}

function BubbleSkill({ skill, index }: { skill: Skill; index: number }) {
  const colors = stickerColors[index % stickerColors.length];
  const size = 90 + ((index * 17) % 50);
  const isDark = colors.bg === '#4361EE';

  return (
    <motion.div
      className="inline-flex items-center justify-center rounded-full cursor-default select-none"
      style={{
        width: size,
        height: size,
        backgroundColor: colors.bg,
        border: `3px solid ${colors.border}`,
        color: isDark ? '#FFFFFF' : '#1A1A2E',
      }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: 'spring',
        stiffness: 150,
        delay: index * 0.06,
      }}
      whileHover={{
        scale: 1.15,
        y: -10,
        transition: { type: 'spring', stiffness: 500, damping: 15 },
      }}
      animate={{
        y: [0, -5, 0, 5, 0],
      }}
      // @ts-ignore
      transition2={{ duration: 4 + (index % 3), repeat: Infinity }}
    >
      <span className="font-body text-xs md:text-sm font-bold text-center px-2 leading-tight">
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const { t } = useTranslation('common');

  const categories = ['design', 'tools', 'soft'] as const;
  const grouped = categories.map((cat) => ({
    key: cat,
    label: t(`skillCategories.${cat}`),
    skills: skills.filter((s) => s.category === cat),
  }));

  return (
    <section id="skills" className="py-20 md:py-28 relative overflow-hidden bg-white">
      {/* Background geometric shapes */}
      <motion.div
        className="absolute top-16 left-[5%] w-14 h-14 rounded-full bg-pink opacity-20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-[8%] w-10 h-10 bg-yellow opacity-25 rotate-45"
        animate={{ rotate: [45, 90, 45] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 150 }}
        >
          <h2 className="font-display text-4xl md:text-6xl">
            <span className="text-blue">{t('sections.skills')}</span>
            <motion.span
              className="text-coral inline-block ml-2"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              !
            </motion.span>
          </h2>
          <p className="font-fun text-lg text-coral mt-3" style={{ transform: 'rotate(-1deg)' }}>
            Sticker Collection
          </p>
        </motion.div>

        {/* Skill categories */}
        {grouped.map((group, gi) => (
          <motion.div
            key={group.key}
            className="mb-14"
            initial={{ opacity: 0, x: gi % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 120, delay: gi * 0.1 }}
          >
            {/* Category label */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: categoryColors[group.key] }}
              />
              <h3
                className="font-fun text-xl md:text-2xl"
                style={{
                  color: categoryColors[group.key],
                  transform: `rotate(${(gi - 1) * 2}deg)`,
                }}
              >
                {group.label}
              </h3>
              <div
                className="flex-1 h-1 rounded-full opacity-30"
                style={{ backgroundColor: categoryColors[group.key] }}
              />
            </div>

            {/* Stickers layout */}
            <div className="flex flex-wrap gap-3 md:gap-4">
              {group.skills.map((skill, si) => (
                <StickerSkill
                  key={skill.id}
                  skill={skill}
                  index={gi * 10 + si}
                />
              ))}
            </div>
          </motion.div>
        ))}

        {/* Decorative footer element */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: stickerColors[i % stickerColors.length].bg }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
