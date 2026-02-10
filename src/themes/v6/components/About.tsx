import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

/* Organic blob shapes for decoration */
function BlobDecoration({ className }: { className?: string }) {
  return (
    <div
      className={`absolute opacity-[0.07] pointer-events-none ${className}`}
      style={{
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        background: 'linear-gradient(135deg, #2D5016, #C67D4A)',
      }}
    />
  );
}

function BlobDecoration2({ className }: { className?: string }) {
  return (
    <div
      className={`absolute opacity-[0.05] pointer-events-none ${className}`}
      style={{
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        background: 'linear-gradient(225deg, #C4798B, #2D5016)',
      }}
    />
  );
}

export default function About() {
  const { t } = useTranslation('profile');
  const { t: tc } = useTranslation();

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Blob decorations */}
      <BlobDecoration className="w-80 h-80 -top-20 -left-40" />
      <BlobDecoration2 className="w-96 h-96 -bottom-32 -right-48" />

      <div className="mx-auto max-w-5xl px-6">
        {/* Section title with leaf */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-forest/40 shrink-0">
            <path
              d="M16 28 C16 28 8 20 8 14 C8 8 12 4 16 4 C20 4 24 8 24 14 C24 20 16 28 16 28Z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <path d="M16 16V28" stroke="currentColor" strokeWidth="1" />
          </svg>
          <h2 className="font-display text-3xl md:text-4xl text-forest font-light">
            {tc('sections.about')}
          </h2>
        </motion.div>

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12 flex justify-center"
        >
          <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] overflow-hidden shadow-[0_4px_40px_rgba(45,80,22,0.1)]">
            <img
              src={profile.portraitCutout}
              alt={profile.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>

        <div className="relative grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-start">
          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="bg-cream-light/80 rounded-3xl p-8 md:p-12 shadow-[0_4px_40px_rgba(45,80,22,0.06)]">
              <p className="font-body text-lg md:text-xl leading-[1.9] text-forest/80">
                {t('bioExtended').split(/(Arkage|Lufthansa|Oreo|UPS|Quasar Institute for Advanced Design|110\/110|UX)/g).map((part, i) => {
                  const highlights = ['Arkage', 'Lufthansa', 'Oreo', 'UPS', 'Quasar Institute for Advanced Design', '110/110', 'UX'];
                  if (highlights.includes(part)) {
                    return (
                      <span key={i} className="text-terra font-medium">
                        {part}
                      </span>
                    );
                  }
                  return <span key={i}>{part}</span>;
                })}
              </p>

              <div className="mt-8 flex items-center gap-3 text-forest/50">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M2 14C2 10.7 4.7 8 8 8C11.3 8 14 10.7 14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span className="font-body text-sm">{profile.location}</span>
              </div>
            </div>
          </motion.div>

          {/* Handwritten margin annotations */}
          <motion.div
            initial={{ opacity: 0, x: 20, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:flex flex-col gap-8 w-48"
          >
            {/* Arrow + annotation 1 */}
            <div className="relative">
              <svg width="40" height="30" viewBox="0 0 40 30" fill="none" className="text-terra/50 mb-1">
                <path
                  d="M38 15 C30 15, 15 10, 5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M10 2 L5 5 L10 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="font-hand text-xl text-terra/70 leading-tight -rotate-3">
                &larr; this is me!
              </p>
            </div>

            {/* Arrow + annotation 2 */}
            <div className="mt-12 relative">
              <svg width="40" height="30" viewBox="0 0 40 30" fill="none" className="text-rose/50 mb-1">
                <path
                  d="M38 15 C30 15, 15 20, 5 25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M10 22 L5 25 L10 28"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="font-hand text-xl text-rose/70 leading-tight rotate-2">
                Roma, Italia
              </p>
              <p className="font-hand text-lg text-rose/50 leading-tight rotate-1 mt-1">
                La Citta Eterna
              </p>
            </div>

            {/* Small leaf doodle */}
            <svg width="40" height="50" viewBox="0 0 40 50" fill="none" className="text-forest/20 mt-8 ml-4">
              <path
                d="M20 45 C20 45 10 35 10 25 C10 15 15 10 20 10 C25 10 30 15 30 25 C30 35 20 45 20 45Z"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path d="M20 25V45" stroke="currentColor" strokeWidth="1" />
              <path d="M15 30 L20 25 L25 30" stroke="currentColor" strokeWidth="0.8" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
