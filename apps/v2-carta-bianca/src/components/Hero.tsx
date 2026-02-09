import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '@auror/data';
import { useTranslation } from '@auror/i18n';

export default function Hero() {
  const { t } = useTranslation('profile');
  const subtitleWords = (t('bio') as string).split(' ');
  const [visibleWords, setVisibleWords] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mountTimer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(mountTimer);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setVisibleWords((prev) => {
        if (prev >= subtitleWords.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [mounted, subtitleWords.length]);

  const titles = profile.title.join(' \u00B7 ');

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="font-display font-bold tracking-tight leading-none text-black"
          style={{
            fontSize: 'clamp(3rem, 12vw, 11.25rem)',
          }}
        >
          {profile.name}
        </motion.h1>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.8, ease: 'easeOut' }}
          className="mx-auto mt-6 w-1.5 h-1.5 rounded-full bg-red"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-8 font-body text-sm tracking-widest uppercase text-black/30"
        >
          {titles}
        </motion.p>

        <div className="mt-12 max-w-xl mx-auto">
          <p className="font-body text-base leading-relaxed text-black/50">
            <AnimatePresence>
              {subtitleWords.slice(0, visibleWords).map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            </AnimatePresence>
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-8 bg-black/10 mx-auto mb-3" />
        <p className="font-mono text-[10px] tracking-widest uppercase text-black/20">
          {t('scroll', { ns: 'common', defaultValue: 'Scroll' })}
        </p>
      </motion.div>
    </section>
  );
}
