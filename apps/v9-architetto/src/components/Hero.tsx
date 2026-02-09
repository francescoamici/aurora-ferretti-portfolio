import { motion } from 'framer-motion';
import { profile } from '@auror/data';
import { useTranslation } from '@auror/i18n';

export default function Hero() {
  const { t } = useTranslation('profile');

  return (
    <section className="pt-[64px]">
      <div className="mx-auto max-w-[1200px] px-[24px] grid-overlay baseline-grid">
        <div className="grid grid-cols-12 gap-[24px]">
          {/* Main content area */}
          <div className="col-span-12 pt-[96px] pb-[96px]">
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-sans font-bold text-[clamp(48px,8vw,96px)] leading-[1] tracking-[-0.03em] text-black m-0 p-0"
            >
              {profile.firstName}
              <br />
              {profile.lastName}
            </motion.h1>

            {/* Titles with vertical rules */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-[32px] flex flex-wrap items-center gap-[16px]"
            >
              {profile.title.map((title, i) => (
                <span key={title} className="flex items-center gap-[16px]">
                  {i > 0 && (
                    <span className="w-[1px] h-[16px] bg-black opacity-30" />
                  )}
                  <span className="font-sans font-light text-[16px] tracking-[0.5px] text-black">
                    {t(`titles.${['artDirector', 'visualDesigner', 'illustrator'][i]}`)}
                  </span>
                </span>
              ))}
            </motion.div>

            {/* Swiss Red accent square — positioned on grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-[40px]"
            >
              <div className="red-square" />
            </motion.div>

            {/* Coordinates reference */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="mt-[32px] font-mono text-[12px] text-gray tracking-[0.5px]"
            >
              41.9028&deg; N, 12.4964&deg; E &rarr; Roma
            </motion.p>
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="w-full h-[1px] bg-light-gray" />
    </section>
  );
}
