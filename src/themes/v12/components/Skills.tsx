import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { skills } from '@auror/data';

/* ---------- Vine SVG ---------- */

function VineLine() {
  return (
    <svg
      className="absolute left-1/2 top-0 hidden h-full w-8 -translate-x-1/2 text-sage/15 lg:block"
      viewBox="0 0 32 800"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M16 0C16 100 20 150 16 200C12 250 20 300 16 350C12 400 20 450 16 500C12 550 20 600 16 650C12 700 16 750 16 800"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        strokeLinecap="round"
      />
      {/* Small leaf buds along the vine */}
      <circle cx="16" cy="120" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="16" cy="300" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="16" cy="480" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="16" cy="660" r="3" fill="currentColor" opacity="0.3" />
      {/* Small branches */}
      <path d="M16 120C10 115 6 112 4 110" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M16 300C22 295 26 292 28 290" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M16 480C10 475 6 472 4 470" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M16 660C22 655 26 652 28 650" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Category Config ---------- */

const categoryConfig = {
  design: {
    color: 'sage',
    bgClass: 'bg-sage-light',
    textClass: 'text-sage',
    borderClass: 'border-sage/20',
    pillBg: 'bg-sage/8',
    pillText: 'text-sage',
  },
  tools: {
    color: 'terra',
    bgClass: 'bg-terra-light',
    textClass: 'text-terra',
    borderClass: 'border-terra/20',
    pillBg: 'bg-terra/8',
    pillText: 'text-terra',
  },
  soft: {
    color: 'petal',
    bgClass: 'bg-petal-light',
    textClass: 'text-petal',
    borderClass: 'border-petal/20',
    pillBg: 'bg-petal/8',
    pillText: 'text-[#B07878]',
  },
} as const;

type CategoryKey = keyof typeof categoryConfig;

/* ---------- Category Block ---------- */

function CategoryBlock({
  category,
  items,
  index,
}: {
  category: CategoryKey;
  items: typeof skills;
  index: number;
}) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const config = categoryConfig[category];
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`relative lg:w-[45%] ${isLeft ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'}`}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {/* Connector dot on vine */}
      <div
        className={`absolute top-6 hidden h-3 w-3 rounded-full lg:block ${config.bgClass} ring-2 ring-cream ${
          isLeft ? '-right-1.5 translate-x-1/2' : '-left-1.5 -translate-x-1/2'
        }`}
        style={{ background: `var(--color-${config.color})`, opacity: 0.4 }}
      />

      {/* Category header */}
      <h3 className={`mb-4 font-hand text-2xl font-semibold ${config.textClass}`}>
        {t(`skillCategories.${category}`)}
      </h3>

      {/* Skills pills */}
      <div className="flex flex-wrap gap-2">
        {items.map((skill, i) => (
          <motion.span
            key={skill.id}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium ${config.borderClass} ${config.pillBg} ${config.pillText}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------- Skills Component ---------- */

export default function Skills() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const categories: CategoryKey[] = ['design', 'tools', 'soft'];
  const grouped = categories.map((cat) => ({
    category: cat,
    items: skills.filter((s) => s.category === cat),
  }));

  return (
    <section id="skills" className="relative py-24 lg:py-32" ref={sectionRef}>
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl font-medium tracking-tight text-earth sm:text-4xl lg:text-5xl">
            {t('sections.skills')}
          </h2>
          <p className="mt-3 font-hand text-lg text-earth/40">
            {categories.length} {t('sections.skills').toLowerCase()}
          </p>
        </motion.div>

        {/* Vine + Categories */}
        <div className="relative space-y-12 lg:space-y-16">
          <VineLine />
          {grouped.map((group, i) => (
            <CategoryBlock
              key={group.category}
              category={group.category}
              items={group.items}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
