import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { skills } from '@auror/data';

const categoryOrder = ['design', 'tools', 'soft'] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function SkillPill({ name, index }: { name: string; index: number }) {
  return (
    <motion.span
      variants={pillVariants}
      className="group relative inline-flex overflow-hidden rounded-full border border-gold/25 px-5 py-2.5 text-sm tracking-wider text-ivory/80 transition-colors duration-500 hover:border-gold/60 hover:text-gold"
    >
      {/* Shimmer sweep */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative z-10">{name}</span>
    </motion.span>
  );
}

export default function Skills() {
  const { t } = useTranslation();

  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    label: t(`skillCategories.${cat}`),
    items: skills.filter((s) => s.category === cat),
  }));

  return (
    <section id="skills" className="relative bg-nero px-6 py-32">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-xs tracking-[0.4em] text-gold/60 uppercase">
            {t('sections.skills')}
          </p>
          <h2 className="font-display text-4xl font-bold text-ivory md:text-5xl">
            {t('nav.skills')}
          </h2>
        </motion.div>

        {/* Skill groups */}
        <div className="mt-16 space-y-14">
          {grouped.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                delay: gi * 0.15,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h3 className="mb-6 font-accent text-xl font-medium tracking-wider text-gold/70">
                {group.label}
              </h3>

              <motion.div
                className="flex flex-wrap gap-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                {group.items.map((skill, si) => (
                  <SkillPill key={skill.id} name={skill.name} index={si} />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
