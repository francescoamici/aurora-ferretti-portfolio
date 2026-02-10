import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { profile } from '@auror/data';

const highlightColors = ['#FFB4C8', '#FFE66D', '#95E1D3', '#FFB4C8', '#FFE66D'];
const highlightWords = ['Art Director', 'Visual Designer', 'Arkage', 'Quasar Institute', 'design'];

function HighlightedBio({ text }: { text: string }) {
  let result: (string | React.ReactNode)[] = [text];

  highlightWords.forEach((word, idx) => {
    const newResult: (string | React.ReactNode)[] = [];
    result.forEach((part) => {
      if (typeof part !== 'string') {
        newResult.push(part);
        return;
      }
      const segments = part.split(new RegExp(`(${word})`, 'gi'));
      segments.forEach((seg, i) => {
        if (seg.toLowerCase() === word.toLowerCase()) {
          newResult.push(
            <span
              key={`${idx}-${i}`}
              className="px-1.5 py-0.5 rounded-md inline-block"
              style={{ backgroundColor: highlightColors[idx % highlightColors.length] }}
            >
              {seg}
            </span>
          );
        } else {
          newResult.push(seg);
        }
      });
    });
    result = newResult;
  });

  return <>{result}</>;
}

export default function About() {
  const { t } = useTranslation('profile');
  const { t: tc } = useTranslation('common');

  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden">
      {/* Geometric decorations */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 rounded-full bg-pink opacity-40"
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-8 w-12 h-12 bg-yellow opacity-50"
        animate={{ y: [0, 12, 0], rotate: [0, 45, 90] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-[5%] w-16 h-16 opacity-30"
        style={{
          width: 0,
          height: 0,
          borderLeft: '30px solid transparent',
          borderRight: '30px solid transparent',
          borderBottom: '52px solid #4361EE',
        }}
        animate={{ y: [0, -20, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section title */}
        <motion.h2
          className="font-display text-4xl md:text-6xl text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 150 }}
        >
          <span className="text-coral">{tc('sections.about')}</span>
          <span className="text-yellow">!</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Profile photo placeholder */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            <div
              className="aspect-square rounded-3xl relative overflow-hidden"
              style={{
                border: '6px solid #4361EE',
              }}
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />

              {/* Decorative shapes inside */}
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/30" />
              <div className="absolute bottom-6 right-6 w-10 h-10 bg-white/20 rotate-45" />
              <div
                className="absolute top-8 right-8"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '12px solid transparent',
                  borderRight: '12px solid transparent',
                  borderBottom: '20px solid rgba(255,255,255,0.25)',
                }}
              />
            </div>

            {/* Corner decorations */}
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-coral" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-mint" />
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-yellow rotate-12" />
          </motion.div>

          {/* Bio content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
          >
            <p className="font-body text-lg md:text-xl leading-relaxed text-dark/80 mb-8">
              <HighlightedBio text={t('bioExtended')} />
            </p>

            {/* Speech bubble quote */}
            <motion.div
              className="relative p-6 rounded-2xl bg-yellow mt-8"
              style={{
                border: '4px solid #1A1A2E',
                transform: 'rotate(1deg)',
              }}
              whileHover={{ rotate: -1, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {/* Speech bubble tail */}
              <div
                className="absolute -bottom-5 left-10 w-0 h-0"
                style={{
                  borderLeft: '15px solid transparent',
                  borderRight: '15px solid transparent',
                  borderTop: '20px solid #1A1A2E',
                }}
              />
              <div
                className="absolute -bottom-3 left-[42px] w-0 h-0"
                style={{
                  borderLeft: '12px solid transparent',
                  borderRight: '12px solid transparent',
                  borderTop: '16px solid #FFE66D',
                }}
              />

              <p className="font-fun text-lg md:text-xl text-dark/90 leading-relaxed">
                "{t('bioShort')}"
              </p>
            </motion.div>

            {/* Social links */}
            <div className="flex gap-3 mt-10">
              {profile.links.map((link, i) => (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xs uppercase px-4 py-2 rounded-lg text-white"
                  style={{
                    backgroundColor: ['#FFB4C8', '#4361EE', '#FF6B6B', '#95E1D3'][i % 4],
                    border: '3px solid #1A1A2E',
                    transform: `rotate(${(i - 1.5) * 2}deg)`,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    y: -4,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
