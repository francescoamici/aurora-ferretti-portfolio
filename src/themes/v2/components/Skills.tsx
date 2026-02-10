import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '@auror/data';
import { useTranslation } from '@auror/i18n';

export default function Skills() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-32 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/30 mb-16"
        >
          {t('sections.skills')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-base leading-loose text-black/60"
        >
          {skills.map((skill, i) => (
            <span key={skill.id}>
              <span className="inline">{skill.name}</span>
              {i < skills.length - 1 && (
                <span className="inline-block mx-2 w-1 h-1 rounded-full bg-red align-middle" />
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
