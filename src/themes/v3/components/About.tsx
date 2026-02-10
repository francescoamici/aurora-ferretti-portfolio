import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';
import { motion } from 'framer-motion';

export default function About() {
  const { t } = useTranslation('profile');

  // Split bio into sentences and add some "blue link" words
  const bioExtended = t('bioExtended');
  const blueWords = ['Art Director', 'Visual Designer', 'Rome', 'Roma', 'Arkage', 'Quasar', 'Lufthansa', 'Oreo', 'UPS', 'design'];

  const renderBioWithBlueWords = (text: string) => {
    // Split by spaces but preserve them
    const words = text.split(/(\s+)/);
    return words.map((word, i) => {
      const cleanWord = word.replace(/[.,;:!?'"()]/g, '');
      const isBlue = blueWords.some(bw => cleanWord.toLowerCase().includes(bw.toLowerCase()));
      if (isBlue && word.trim()) {
        return (
          <span key={i} className="text-blue underline underline-offset-4 decoration-2">
            {word}
          </span>
        );
      }
      return <span key={i}>{word}</span>;
    });
  };

  return (
    <section id="about" className="relative bg-raw-white border-b-[8px] border-harsh-black">
      {/* SECTION HEADER */}
      <div className="border-b-[4px] border-harsh-black px-4 md:px-8 py-4">
        <motion.h2
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.1 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-5xl uppercase"
        >
          {t('name')}
        </motion.h2>
      </div>

      {/* PORTRAIT BLOCK */}
      <div className="relative px-4 md:px-8 py-8 md:py-0">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.1 }}
          viewport={{ once: true }}
          className="w-48 md:w-64 mx-auto md:mx-0 md:ml-8"
        >
          <div className="border-[4px] border-harsh-black bg-yellow hard-shadow p-0 overflow-hidden">
            <img
              src={profile.portraitCutout}
              alt={profile.name}
              className="w-full h-auto object-cover grayscale contrast-125"
            />
          </div>
        </motion.div>
      </div>

      {/* BROKEN GRID BIO */}
      <div className="relative px-4 md:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0">
          {/* MAIN BIO BLOCK - overlaps */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-8 md:col-start-1 relative z-10"
          >
            <div className="border-[4px] border-harsh-black p-6 md:p-10 bg-raw-white hard-shadow">
              <p className="font-mono text-sm md:text-base leading-[1.8]">
                {renderBioWithBlueWords(bioExtended)}
              </p>
            </div>
          </motion.div>

          {/* LOCATION BLOCK - overlaps the bio */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.05 }}
            viewport={{ once: true }}
            className="md:col-span-5 md:col-start-7 md:-mt-12 relative z-20"
          >
            <div className="bg-yellow border-[4px] border-harsh-black p-6 hard-shadow-sm">
              <div className="font-mono text-xs uppercase tracking-[0.3em] mb-2 font-bold">Location</div>
              <div className="font-heading text-2xl md:text-3xl uppercase">{profile.location}</div>
            </div>
          </motion.div>

          {/* TITLE BLOCK - also overlapping */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-6 md:col-start-1 md:-mt-8 relative z-15"
          >
            <div className="bg-blue border-[4px] border-harsh-black p-6">
              <div className="font-mono text-xs uppercase tracking-[0.3em] mb-2 text-raw-white font-bold">Role</div>
              <div className="font-heading text-lg md:text-xl uppercase text-raw-white">
                {profile.title.join(' / ')}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* THICK DIVIDER */}
      <div className="h-2 bg-harsh-black" />

      {/* STATS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t-[4px] border-harsh-black">
        {[
          { label: 'BRANDS', value: '6+' },
          { label: 'YEARS', value: '3+' },
          { label: 'PROJECTS', value: '20+' },
          { label: 'AWARDS', value: 'N/A' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.1, delay: i * 0.03 }}
            viewport={{ once: true }}
            className="border-r-[4px] border-b-[4px] border-harsh-black p-6 text-center last:border-r-0"
          >
            <div className="font-display text-4xl md:text-6xl">{stat.value}</div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] mt-2">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
