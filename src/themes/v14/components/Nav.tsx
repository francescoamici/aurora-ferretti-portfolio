import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeLink as Link, useThemeBasePath } from '@auror/shared-ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { LanguageSwitcher } from '@auror/shared-ui';
import { profile } from '@auror/data';

const NAV_SECTIONS = ['about', 'projects', 'skills', 'experience', 'contact'] as const;

export default function Nav() {
  const { t } = useTranslation();
  const location = useLocation();
  const basePath = useThemeBasePath();
  const isHome = location.pathname === basePath || location.pathname === basePath + '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection observer for active section detection
  useEffect(() => {
    if (!isHome) return;
    const observers: IntersectionObserver[] = [];
    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isHome, location]);

  const scrollToSection = useCallback((id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const navLinks = NAV_SECTIONS.map((section) => ({
    id: section,
    label: t(`nav.${section}`),
  }));

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-warm border-b border-gold/15 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
            <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center group-hover:border-gold transition-colors duration-500">
              <span className="font-display text-sm text-gold tracking-wide">AF</span>
            </div>
            <span className="hidden md:block font-display text-base text-espresso tracking-wide">
              {profile.firstName} <span className="text-sienna">{profile.lastName}</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {isHome ? (
              navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative font-body text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-400 ${
                    activeSection === link.id
                      ? 'text-sienna'
                      : 'text-espresso/60 hover:text-espresso'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-sienna"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))
            ) : (
              <>
                <Link
                  to="/"
                  className="font-body text-xs font-medium uppercase tracking-[0.15em] text-espresso/60 hover:text-espresso transition-colors duration-400"
                >
                  {t('nav.home')}
                </Link>
                <Link
                  to="/portfolio"
                  className="font-body text-xs font-medium uppercase tracking-[0.15em] text-sienna"
                >
                  {t('nav.portfolio')}
                </Link>
              </>
            )}

            <div className="w-px h-5 bg-taupe/30" />
            <LanguageSwitcher />
          </nav>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              aria-label="Menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="w-5 h-px bg-espresso block origin-center"
                transition={{ duration: 0.3 }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="w-5 h-px bg-espresso block"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="w-5 h-px bg-espresso block origin-center"
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-x-0 top-[60px] z-40 bg-cream-dark/98 backdrop-blur-xl border-b border-gold/10 md:hidden"
          >
            <nav className="flex flex-col items-center gap-6 py-10 px-6">
              {isHome ? (
                navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => scrollToSection(link.id)}
                    className={`font-body text-sm font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                      activeSection === link.id ? 'text-sienna' : 'text-espresso/60'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))
              ) : (
                <>
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className="font-body text-sm font-medium uppercase tracking-[0.2em] text-espresso/60"
                  >
                    {t('nav.home')}
                  </Link>
                  <Link
                    to="/portfolio"
                    onClick={() => setMobileOpen(false)}
                    className="font-body text-sm font-medium uppercase tracking-[0.2em] text-sienna"
                  >
                    {t('nav.portfolio')}
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
