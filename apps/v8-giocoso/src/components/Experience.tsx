import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { experience, education } from '@auror/data';

const pathColors = ['#FFB4C8', '#FFE66D', '#4361EE', '#FF6B6B', '#95E1D3'];

function BoardSpace({
  color,
  index,
  total,
  children,
  isSpecial,
}: {
  color: string;
  index: number;
  total: number;
  children: React.ReactNode;
  isSpecial?: boolean;
}) {
  const isEvenRow = Math.floor(index / 1) % 2 === 0;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: 'spring',
        stiffness: 150,
        delay: index * 0.15,
      }}
    >
      {/* Connecting path */}
      {index < total - 1 && (
        <div className="hidden md:block absolute top-1/2 -right-8 w-8 h-1">
          <svg width="32" height="20" viewBox="0 0 32 20" className="absolute -top-2.5">
            <path
              d="M0 10 Q8 0 16 10 Q24 20 32 10"
              stroke={pathColors[(index + 1) % pathColors.length]}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      {/* The space */}
      <div
        className={`relative p-6 md:p-8 rounded-2xl ${
          isSpecial ? 'rounded-3xl' : ''
        }`}
        style={{
          backgroundColor: color,
          border: isSpecial ? '5px dashed #1A1A2E' : '5px solid #1A1A2E',
          transform: `rotate(${(index % 3 - 1) * 1.5}deg)`,
        }}
      >
        {/* Space number / marker */}
        <div className="absolute -top-4 -left-4">
          {index === 0 ? (
            <motion.div
              className="w-10 h-10 rounded-full bg-coral flex items-center justify-center"
              style={{ border: '3px solid #1A1A2E' }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-white font-display text-xs">NOW</span>
            </motion.div>
          ) : isSpecial ? (
            <div
              className="w-10 h-10 flex items-center justify-center"
              style={{
                width: 0,
                height: 0,
                borderLeft: '20px solid transparent',
                borderRight: '20px solid transparent',
                borderBottom: '35px solid #FFE66D',
              }}
            >
              <span
                className="absolute text-dark font-display text-[10px] mt-3"
              >
                ★
              </span>
            </div>
          ) : (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: pathColors[(index + 2) % pathColors.length],
                border: '3px solid #1A1A2E',
              }}
            >
              <span className="font-fun text-sm text-dark">
                {index + 1}
              </span>
            </div>
          )}
        </div>

        {children}

        {/* Decorative dots */}
        <div
          className="absolute bottom-2 right-2 w-3 h-3 rounded-full opacity-30"
          style={{ backgroundColor: '#1A1A2E' }}
        />
        <div
          className="absolute bottom-4 right-6 w-2 h-2 rounded-full opacity-20"
          style={{ backgroundColor: '#1A1A2E' }}
        />
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { t } = useTranslation('common');
  const { t: te } = useTranslation('experience');

  const allItems = [
    ...experience.map((exp) => ({
      ...exp,
      type: 'experience' as const,
      label: te(`experience.${exp.id}.role`),
      sublabel: te(`experience.${exp.id}.company`),
      location: te(`experience.${exp.id}.location`),
      description: te(`experience.${exp.id}.description`),
      period: exp.current
        ? `${exp.startDate} — ${t('dates.present')}`
        : `${exp.startDate} — ${exp.endDate}`,
    })),
    ...education.map((edu) => ({
      ...edu,
      type: 'education' as const,
      label: te(`education.${edu.id}.degree`),
      sublabel: te(`education.${edu.id}.institution`),
      location: '',
      description: te(`education.${edu.id}.description`),
      period: `${edu.startDate} — ${edu.endDate}`,
      current: false,
    })),
  ];

  return (
    <section id="experience" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background decorations */}
      <motion.svg
        className="absolute top-10 right-10 opacity-20"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <rect x="5" y="5" width="50" height="50" rx="8" stroke="#4361EE" strokeWidth="4" fill="none" />
      </motion.svg>
      <motion.div
        className="absolute bottom-20 left-10 w-16 h-16 rounded-full opacity-15"
        style={{ border: '4px solid #FF6B6B' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Section title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 150 }}
        >
          <h2 className="font-display text-4xl md:text-6xl">
            <span className="text-blue">{t('sections.experience')}</span>
            <span className="text-coral"> & </span>
            <span className="text-mint">{t('sections.education')}</span>
          </h2>
          <p className="font-fun text-lg text-yellow mt-3" style={{ transform: 'rotate(-1deg)' }}>
            Board Game Timeline
          </p>

          {/* START marker */}
          <motion.div
            className="inline-block mt-6 px-6 py-2 bg-mint rounded-full font-display text-dark"
            style={{ border: '4px solid #1A1A2E' }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            START →
          </motion.div>
        </motion.div>

        {/* Board game path */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {allItems.map((item, i) => (
            <BoardSpace
              key={item.id}
              color={
                item.type === 'education'
                  ? '#FFE66D'
                  : pathColors[i % pathColors.length]
              }
              index={i}
              total={allItems.length}
              isSpecial={item.type === 'education'}
            >
              <div className="pt-2">
                {/* Type badge */}
                {item.type === 'education' && (
                  <span
                    className="inline-block font-fun text-[10px] uppercase px-2 py-0.5 rounded-full bg-coral text-white mb-2"
                    style={{ border: '2px solid #1A1A2E' }}
                  >
                    BONUS!
                  </span>
                )}

                <h3
                  className="font-display text-lg md:text-xl leading-tight"
                  style={{
                    color:
                      pathColors[i % pathColors.length] === '#4361EE' ||
                      pathColors[i % pathColors.length] === '#FF6B6B'
                        ? '#FFFFFF'
                        : '#1A1A2E',
                  }}
                >
                  {item.label}
                </h3>
                <p
                  className="font-body text-sm md:text-base font-semibold mt-1 opacity-80"
                  style={{
                    color:
                      pathColors[i % pathColors.length] === '#4361EE' ||
                      pathColors[i % pathColors.length] === '#FF6B6B'
                        ? '#FFFFFF'
                        : '#1A1A2E',
                  }}
                >
                  {item.sublabel}
                </p>
                <p
                  className="font-fun text-xs mt-2 opacity-70"
                  style={{
                    color:
                      pathColors[i % pathColors.length] === '#4361EE' ||
                      pathColors[i % pathColors.length] === '#FF6B6B'
                        ? '#FFFFFF'
                        : '#1A1A2E',
                  }}
                >
                  {item.period}
                </p>
                {item.description && (
                  <p
                    className="font-body text-xs md:text-sm mt-3 opacity-70 line-clamp-3"
                    style={{
                      color:
                        pathColors[i % pathColors.length] === '#4361EE' ||
                        pathColors[i % pathColors.length] === '#FF6B6B'
                          ? '#FFFFFF'
                          : '#1A1A2E',
                    }}
                  >
                    {item.description}
                  </p>
                )}

                {item.current && (
                  <motion.div
                    className="inline-flex items-center gap-1 mt-3"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                    <span className="font-display text-[10px] text-white uppercase">
                      {t('dates.present')}
                    </span>
                  </motion.div>
                )}

                {item.type === 'education' && (item as any).grade && (
                  <div
                    className="inline-block mt-3 px-3 py-1 bg-white/30 rounded-full font-fun text-xs text-dark"
                    style={{ border: '2px solid #1A1A2E' }}
                  >
                    {(item as any).grade}
                  </div>
                )}
              </div>
            </BoardSpace>
          ))}
        </div>

        {/* Dice decoration */}
        <motion.div
          className="flex justify-center mt-12"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div
            className="w-14 h-14 rounded-xl bg-white flex items-center justify-center"
            style={{ border: '4px solid #1A1A2E', transform: 'rotate(15deg)' }}
          >
            <div className="grid grid-cols-2 gap-1.5">
              <div className="w-2 h-2 rounded-full bg-dark" />
              <div className="w-2 h-2 rounded-full bg-dark" />
              <div className="w-2 h-2 rounded-full bg-dark" />
              <div className="w-2 h-2 rounded-full bg-dark" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
