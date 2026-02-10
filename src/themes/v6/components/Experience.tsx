import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { experience, education } from '@auror/data';

/* Garden path SVG connector */
function GardenPath({ height = 120 }: { height?: number }) {
  return (
    <svg
      className="mx-auto text-forest/20"
      width="40"
      height={height}
      viewBox={`0 0 40 ${height}`}
      fill="none"
    >
      <path
        d={`M20 0 C25 ${height * 0.25}, 15 ${height * 0.5}, 20 ${height * 0.75} C22 ${height * 0.9}, 18 ${height}, 20 ${height}`}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 4"
      />
    </svg>
  );
}

/* Blooming flower icon for current roles */
function BloomIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-terra">
      <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.6" />
      {/* Petals */}
      <ellipse cx="12" cy="5" rx="3" ry="4" fill="currentColor" opacity="0.25" />
      <ellipse cx="19" cy="12" rx="4" ry="3" fill="currentColor" opacity="0.25" />
      <ellipse cx="12" cy="19" rx="3" ry="4" fill="currentColor" opacity="0.25" />
      <ellipse cx="5" cy="12" rx="4" ry="3" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

/* Small circle marker */
function PathMarker({ active }: { active?: boolean }) {
  return (
    <div className="flex items-center justify-center w-10 h-10 shrink-0">
      {active ? (
        <BloomIcon />
      ) : (
        <div className="w-4 h-4 rounded-full bg-forest/15 border-2 border-forest/30" />
      )}
    </div>
  );
}

export default function Experience() {
  const { t } = useTranslation();
  const { t: te } = useTranslation('experience');

  return (
    <section id="experience" className="relative py-24 md:py-32 bg-cream-dark/30 overflow-hidden">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl text-forest font-light">
            {t('sections.experience')}
          </h2>
          <p className="font-hand text-xl text-terra/60 mt-3">
            {t('skillCategories.design') === 'Design' ? 'The garden path' : 'Il sentiero del giardino'}
          </p>
        </motion.div>

        {/* Experience entries along the path */}
        <div className="relative">
          {experience.map((exp, i) => (
            <div key={exp.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="flex gap-4 md:gap-6 items-start"
              >
                <PathMarker active={exp.current} />

                <div className="bg-cream-light rounded-2xl p-6 md:p-8 shadow-[0_2px_24px_rgba(45,80,22,0.06)] flex-1 mb-2">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg md:text-xl text-forest font-medium">
                        {te(`experience.${exp.id}.role`, { defaultValue: exp.role })}
                      </h3>
                      <p className="font-body text-base text-terra mt-1">
                        {te(`experience.${exp.id}.company`, { defaultValue: exp.company })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-hand text-lg text-forest/50">
                        {exp.startDate} &mdash; {exp.current ? t('dates.present') : exp.endDate}
                      </span>
                      {exp.current && (
                        <span className="font-body text-xs font-medium text-white bg-forest/70 rounded-full px-2.5 py-0.5">
                          {t('dates.present')}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="font-body text-sm text-forest/60 mt-3">
                    {te(`experience.${exp.id}.location`, { defaultValue: exp.location })}
                  </p>

                  <p className="font-body text-sm text-forest/70 mt-3 leading-relaxed">
                    {te(`experience.${exp.id}.description`, { defaultValue: '' })}
                  </p>
                </div>
              </motion.div>

              {i < experience.length - 1 && <GardenPath height={60} />}
            </div>
          ))}
        </div>

        {/* Divider between experience and education */}
        <div className="my-16 flex items-center justify-center">
          <svg width="120" height="30" viewBox="0 0 120 30" fill="none" className="text-forest/15">
            <path
              d="M0 15 C15 5, 30 25, 45 15 C60 5, 75 25, 90 15 C100 8, 110 12, 120 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path d="M55 15 C52 10, 48 8, 46 12 C44 16, 50 17, 55 15Z" fill="currentColor" opacity="0.4" />
            <path d="M65 15 C68 10, 72 8, 74 12 C76 16, 70 17, 65 15Z" fill="currentColor" opacity="0.4" />
          </svg>
        </div>

        {/* Education section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl md:text-4xl text-forest font-light">
            {t('sections.education')}
          </h2>
        </motion.div>

        <div className="relative">
          {education.map((edu, i) => (
            <div key={edu.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="flex gap-4 md:gap-6 items-start"
              >
                <PathMarker />

                <div className="bg-cream-light rounded-2xl p-6 md:p-8 shadow-[0_2px_24px_rgba(45,80,22,0.06)] flex-1 mb-2">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg md:text-xl text-forest font-medium">
                        {te(`education.${edu.id}.degree`, { defaultValue: edu.degree })}
                      </h3>
                      <p className="font-body text-base text-terra mt-1">
                        {te(`education.${edu.id}.institution`, { defaultValue: edu.institution })}
                      </p>
                    </div>
                    <span className="font-hand text-lg text-forest/50">
                      {edu.startDate} &mdash; {edu.endDate}
                    </span>
                  </div>

                  {edu.grade && (
                    <div className="mt-3 inline-flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-terra">
                        <path d="M8 1L10 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H6L8 1Z" fill="currentColor" opacity="0.5" />
                      </svg>
                      <span className="font-body text-sm font-medium text-terra">
                        {te(`education.${edu.id}.grade`, { defaultValue: edu.grade })}
                      </span>
                    </div>
                  )}

                  <p className="font-body text-sm text-forest/70 mt-3 leading-relaxed">
                    {te(`education.${edu.id}.description`, { defaultValue: '' })}
                  </p>
                </div>
              </motion.div>

              {i < education.length - 1 && <GardenPath height={60} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
