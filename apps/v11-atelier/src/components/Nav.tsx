import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { LanguageSwitcher } from '@auror/shared-ui';
import { profile } from '@auror/data';

const navSections = ['about', 'projects', 'skills', 'experience', 'contact'] as const;

export default function Nav() {
  const { t } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '';
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const observeSections = useCallback(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const sorted = visible.sort((a, b) => {
            const aRect = a.boundingClientRect;
            const bRect = b.boundingClientRect;
            return Math.abs(aRect.top) - Math.abs(bRect.top);
          });
          setActiveSection(sorted[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );
    navSections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    const cleanup = observeSections();
    return cleanup;
  }, [observeSections]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream/90 backdrop-blur-md shadow-[0_1px_0_0_theme(colors.gold-dim)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-10 py-4 md:py-5">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-xl md:text-2xl tracking-wide text-charcoal hover:text-gold transition-colors duration-300"
          >
            <span className="font-semibold">{profile.firstName}</span>{' '}
            <span className="font-light">{profile.lastName}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {isHome ? (
              navSections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="relative font-accent text-base tracking-wide text-charcoal-light hover:text-charcoal transition-colors duration-300 py-1 group"
                >
                  {t(`nav.${section}`)}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-gold transition-all duration-300 ${
                      activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              ))
            ) : (
              <>
                <Link
                  to="/"
                  className="relative font-accent text-base tracking-wide text-charcoal-light hover:text-charcoal transition-colors duration-300 py-1 group"
                >
                  {t('nav.backToHome')}
                  <span className="absolute bottom-0 left-0 h-px bg-gold w-0 group-hover:w-full transition-all duration-300" />
                </Link>
                <Link
                  to="/portfolio"
                  className="relative font-accent text-base tracking-wide text-charcoal-light hover:text-charcoal transition-colors duration-300 py-1 group"
                >
                  {t('nav.portfolio')}
                  <span className="absolute bottom-0 left-0 h-px bg-gold w-0 group-hover:w-full transition-all duration-300" />
                </Link>
              </>
            )}

            {isHome && (
              <Link
                to="/portfolio"
                className="relative font-accent text-base tracking-wide text-charcoal-light hover:text-charcoal transition-colors duration-300 py-1 group"
              >
                {t('nav.portfolio')}
                <span className="absolute bottom-0 left-0 h-px bg-gold w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            )}

            <div className="w-px h-5 bg-gold/30 mx-1" />

            <LanguageSwitcher
              variant="minimal"
              className="font-accent text-sm tracking-widest text-charcoal-light hover:text-gold"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col items-end gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6, width: 24 } : { rotate: 0, y: 0, width: 24 }}
              className="block h-px bg-charcoal origin-center"
              style={{ width: 24 }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px bg-charcoal"
              style={{ width: 18 }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6, width: 24 } : { rotate: 0, y: 0, width: 24 }}
              className="block h-px bg-charcoal origin-center"
              style={{ width: 14 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-cream/98 backdrop-blur-lg flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              {isHome ? (
                navSections.map((section, i) => (
                  <motion.button
                    key={section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    onClick={() => scrollToSection(section)}
                    className="font-display text-2xl text-charcoal hover:text-gold transition-colors duration-300"
                  >
                    {t(`nav.${section}`)}
                  </motion.button>
                ))
              ) : (
                <>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Link
                      to="/"
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-2xl text-charcoal hover:text-gold transition-colors"
                    >
                      {t('nav.backToHome')}
                    </Link>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
                    <Link
                      to="/portfolio"
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-2xl text-charcoal hover:text-gold transition-colors"
                    >
                      {t('nav.portfolio')}
                    </Link>
                  </motion.div>
                </>
              )}

              {isHome && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navSections.length * 0.08 }}
                >
                  <Link
                    to="/portfolio"
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-2xl text-charcoal hover:text-gold transition-colors"
                  >
                    {t('nav.portfolio')}
                  </Link>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 pt-6 border-t border-gold/20"
              >
                <LanguageSwitcher
                  variant="minimal"
                  className="font-accent text-lg tracking-widest text-charcoal-light hover:text-gold"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
