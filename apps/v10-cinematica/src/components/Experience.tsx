import { motion } from 'framer-motion';
import { experience, education } from '@auror/data';
import { useTranslation } from '@auror/i18n';

export default function Experience() {
  const { t } = useTranslation();

  return (
    <div className="mt-20 md:mt-28">
      {/* FILMOGRAPHY header */}
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
          Filmography
        </h3>
        <div className="gold-rule max-w-xs mx-auto" />
      </motion.div>

      {/* Experience entries */}
      <div className="max-w-2xl mx-auto space-y-10">
        {experience.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: i * 0.15 }}
          >
            {/* Company and date on same line */}
            <div className="flex items-baseline justify-between gap-4">
              <h4 className="font-display text-warm-white text-sm md:text-base tracking-[0.15em] uppercase">
                {exp.company}
              </h4>
              <span className="font-mono text-[10px] md:text-xs tracking-[0.15em] text-warm-white/40 whitespace-nowrap">
                {exp.startDate}&ndash;{exp.current ? t('dates.present') : exp.endDate}
              </span>
            </div>

            {/* Role */}
            <p className="font-body text-warm-white/70 text-sm md:text-base mt-1 italic">
              {exp.role}
            </p>

            {/* Location */}
            <p className="font-mono text-[10px] tracking-[0.15em] text-warm-white/30 mt-1">
              {exp.location}
            </p>

            {/* Gold separator */}
            <div className="mt-8 h-px bg-gold/15" />
          </motion.div>
        ))}
      </div>

      {/* TRAINING / FORMATION header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.5 }}
        className="mt-20 mb-16"
      >
        <h3
          className="font-display text-gold text-xs tracking-[0.4em] uppercase text-center mb-3"
          style={{ fontVariant: 'small-caps' }}
        >
          Training &amp; Formation
        </h3>
        <div className="gold-rule max-w-xs mx-auto" />
      </motion.div>

      {/* Education entries */}
      <div className="max-w-2xl mx-auto space-y-10">
        {education.map((edu, i) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: i * 0.15 }}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h4 className="font-display text-warm-white text-sm md:text-base tracking-[0.15em] uppercase">
                {edu.institution}
              </h4>
              <span className="font-mono text-[10px] md:text-xs tracking-[0.15em] text-warm-white/40 whitespace-nowrap">
                {edu.startDate}&ndash;{edu.endDate}
              </span>
            </div>

            <p className="font-body text-warm-white/70 text-sm md:text-base mt-1 italic">
              {edu.degree}
            </p>

            {edu.grade && (
              <p className="font-mono text-[10px] tracking-[0.15em] text-gold/60 mt-1">
                {edu.grade}
              </p>
            )}

            <div className="mt-8 h-px bg-gold/15" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
