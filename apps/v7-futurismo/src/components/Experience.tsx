import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { experience, education } from '@auror/data';

export default function Experience() {
  const { t, i18n } = useTranslation('common');
  const tExp = useTranslation('experience').t;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="esperienza"
      className="relative py-32 overflow-hidden bg-prussian-light"
      ref={ref}
    >
      {/* Top diagonal cut */}
      <div
        className="absolute top-0 left-0 right-0 h-24 bg-prussian"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 20%, 0 100%)' }}
      />

      {/* Speed lines */}
      <div className="absolute top-32 right-0 w-[40%] h-[1px] bg-gradient-to-l from-red/25 to-transparent" />
      <div className="absolute top-36 right-0 w-[25%] h-[1px] bg-gradient-to-l from-orange/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div style={{ transform: 'rotate(-4deg)', transformOrigin: 'left center' }}>
            <h2 className="font-big font-800 text-7xl sm:text-8xl lg:text-9xl uppercase tracking-tight text-white/5">
              CIRCUITO
            </h2>
          </div>
          <div className="flex items-center gap-4 -mt-6">
            <div className="w-20 h-[3px] racing-stripe" />
            <span className="font-display text-xl sm:text-2xl tracking-[0.3em] uppercase text-white">
              {t('sections.experience')}
            </span>
          </div>
        </motion.div>

        {/* Racing timeline - horizontal on desktop */}
        <div className="hidden lg:block relative">
          {/* Track line */}
          <div className="absolute top-12 left-0 right-0 h-[3px] racing-stripe opacity-30" />

          <div className="flex gap-8">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: index * 0.15 }}
                className="flex-1 relative pt-20"
              >
                {/* Flag marker / checkpoint */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  {/* Dot */}
                  <div className={`w-4 h-4 ${exp.current ? 'bg-red' : 'bg-orange/60'} relative`} style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}>
                    {exp.current && (
                      <motion.div
                        className="absolute inset-0 bg-red/40"
                        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                      />
                    )}
                  </div>
                  {/* Flag pole */}
                  <div className="w-px h-6 bg-white/20" />
                </div>

                {/* Checkpoint card */}
                <div
                  className="bg-prussian/80 border border-white/5 p-6 relative"
                  style={{ transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)` }}
                >
                  {/* Lap time / dates */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-display text-xs tracking-[0.3em] text-orange uppercase">
                      {exp.startDate}
                    </span>
                    <span className="text-red font-display">&rarr;</span>
                    <span className="font-display text-xs tracking-[0.3em] text-orange uppercase">
                      {exp.endDate || t('dates.present')}
                    </span>
                    {exp.current && (
                      <span className="ml-2 w-2 h-2 rounded-full bg-red animate-pulse" />
                    )}
                  </div>

                  {/* Role */}
                  <h3 className="font-display text-xl tracking-[0.1em] uppercase text-white">
                    {tExp(`experience.${exp.id}.role`, { defaultValue: exp.role })}
                  </h3>

                  {/* Company */}
                  <p className="font-body text-base tracking-[0.1em] text-white/50 mt-1">
                    {tExp(`experience.${exp.id}.company`, { defaultValue: exp.company })}
                  </p>

                  {/* Location */}
                  <p className="font-body text-sm tracking-[0.05em] text-white/30 mt-1">
                    {tExp(`experience.${exp.id}.location`, { defaultValue: exp.location })}
                  </p>

                  {/* Speed line accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red/40 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden relative">
          {/* Vertical speed line connector */}
          <div className="absolute top-0 bottom-0 left-6 w-[2px] bg-gradient-to-b from-red/40 via-orange/30 to-yellow/20" />

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative pl-16"
              >
                {/* Checkpoint dot */}
                <div className="absolute left-4 top-4 w-5 h-5 flex items-center justify-center">
                  <div className={`w-3 h-3 ${exp.current ? 'bg-red' : 'bg-orange/60'}`} style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                  {exp.current && (
                    <motion.div
                      className="absolute w-5 h-5 bg-red/30"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                    />
                  )}
                </div>

                {/* Speed line connector */}
                <div className="absolute left-[30px] top-5 w-8 h-px bg-red/30" />

                <div className="bg-prussian/60 border border-white/5 p-5" style={{ transform: 'rotate(-1deg)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-display text-xs tracking-[0.3em] text-orange uppercase">
                      {exp.startDate}
                    </span>
                    <span className="text-red font-display text-sm">&rarr;</span>
                    <span className="font-display text-xs tracking-[0.3em] text-orange uppercase">
                      {exp.endDate || t('dates.present')}
                    </span>
                  </div>
                  <h3 className="font-display text-lg tracking-[0.1em] uppercase text-white">
                    {tExp(`experience.${exp.id}.role`, { defaultValue: exp.role })}
                  </h3>
                  <p className="font-body text-sm tracking-[0.1em] text-white/50 mt-1">
                    {tExp(`experience.${exp.id}.company`, { defaultValue: exp.company })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PIT STOPS - Education */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-24"
        >
          {/* Pit stop header */}
          <div className="flex items-center gap-4 mb-10">
            <span className="text-red font-big font-700 text-2xl">/</span>
            <h3
              className="font-display text-xl tracking-[0.3em] uppercase text-orange/60"
              style={{ transform: 'rotate(-2deg)' }}
            >
              PIT STOPS
            </h3>
            <span className="font-body text-sm tracking-[0.15em] text-white/30 uppercase">
              / {t('sections.education')}
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="bg-prussian/60 border border-white/5 p-6 relative overflow-hidden"
                style={{ transform: `rotate(${index === 0 ? -1 : 1}deg)` }}
              >
                {/* Accent stripe */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-yellow/40 via-orange/20 to-transparent" />

                {/* Dates */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display text-xs tracking-[0.3em] text-yellow/60 uppercase">
                    {edu.startDate}
                  </span>
                  <span className="text-orange/40 font-display text-sm">&rarr;</span>
                  <span className="font-display text-xs tracking-[0.3em] text-yellow/60 uppercase">
                    {edu.endDate}
                  </span>
                </div>

                {/* Degree */}
                <h4 className="font-display text-lg tracking-[0.1em] uppercase text-white">
                  {tExp(`education.${edu.id}.degree`, { defaultValue: edu.degree })}
                </h4>

                {/* Institution */}
                <p className="font-body text-sm tracking-[0.1em] text-white/50 mt-1">
                  {tExp(`education.${edu.id}.institution`, { defaultValue: edu.institution })}
                </p>

                {/* Grade */}
                {edu.grade && (
                  <div className="flex items-center gap-2 mt-3">
                    <span className="w-6 h-[2px] bg-yellow/40" />
                    <span className="font-display text-sm tracking-[0.2em] text-yellow/70">
                      {edu.grade}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom diagonal cut */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-prussian"
        style={{ clipPath: 'polygon(0 80%, 100% 0, 100% 100%, 0 100%)' }}
      />
    </section>
  );
}
