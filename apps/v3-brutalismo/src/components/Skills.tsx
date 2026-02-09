import { skills } from '@auror/data';
import { motion } from 'framer-motion';

export default function Skills() {
  const designSkills = skills.filter(s => s.category === 'design');
  const toolSkills = skills.filter(s => s.category === 'tools');
  const softSkills = skills.filter(s => s.category === 'soft');

  const row1 = [...designSkills, ...toolSkills, ...softSkills].map(s => s.name.toUpperCase()).join(' \u2605 ');
  const row2 = [...toolSkills, ...softSkills, ...designSkills].map(s => s.name.toUpperCase()).join(' \u2605 ');
  const row3 = [...softSkills, ...designSkills, ...toolSkills].map(s => s.name.toUpperCase()).join(' \u2605 ');

  const content1 = `${row1} \u2605 ${row1} \u2605 `;
  const content2 = `${row2} \u2605 ${row2} \u2605 `;
  const content3 = `${row3} \u2605 ${row3} \u2605 `;

  return (
    <section id="skills" className="border-b-[8px] border-harsh-black overflow-hidden">
      {/* ROW 1 - Yellow bg, scrolls left */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
        viewport={{ once: true }}
        className="bg-yellow border-b-[4px] border-harsh-black py-4 overflow-hidden"
      >
        <div className="animate-marquee-left whitespace-nowrap">
          <span className="font-mono font-bold text-sm md:text-lg text-harsh-black tracking-wider">
            {content1}
          </span>
        </div>
      </motion.div>

      {/* ROW 2 - Black bg, scrolls right */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.1, delay: 0.03 }}
        viewport={{ once: true }}
        className="bg-harsh-black border-b-[4px] border-blue py-4 overflow-hidden"
      >
        <div className="animate-marquee-right whitespace-nowrap">
          <span className="font-mono font-bold text-sm md:text-lg text-raw-white tracking-wider">
            {content2}
          </span>
        </div>
      </motion.div>

      {/* ROW 3 - Blue bg, scrolls left */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.1, delay: 0.06 }}
        viewport={{ once: true }}
        className="bg-blue border-b-[4px] border-harsh-black py-4 overflow-hidden"
      >
        <div className="animate-marquee-left whitespace-nowrap" style={{ animationDuration: '25s' }}>
          <span className="font-mono font-bold text-sm md:text-lg text-raw-white tracking-wider">
            {content3}
          </span>
        </div>
      </motion.div>

      {/* ROW 4 - Yellow again, scrolls right, faster */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.1, delay: 0.09 }}
        viewport={{ once: true }}
        className="bg-yellow py-4 overflow-hidden"
      >
        <div className="animate-marquee-right whitespace-nowrap" style={{ animationDuration: '15s' }}>
          <span className="font-mono font-bold text-sm md:text-lg text-harsh-black tracking-wider">
            {content1}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
