import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { LanguageSwitcher } from '@auror/shared-ui';

function WavyUnderline() {
  return (
    <svg
      className="absolute -bottom-1 left-0 w-full"
      height="6"
      viewBox="0 0 100 6"
      preserveAspectRatio="none"
      fill="none"
    >
      <motion.path
        d="M0 3 C10 0.5, 20 5.5, 30 3 C40 0.5, 50 5.5, 60 3 C70 0.5, 80 5.5, 90 3 C95 1.5, 98 2.5, 100 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </svg>
  );
}

export default function Nav() {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/' || location.pathname === '';

  const scrollToSection = (id: string) => {
    if (!isHome) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = isHome
    ? [
        { label: t('nav.about'), action: () => scrollToSection('about') },
        { label: t('nav.projects'), action: () => scrollToSection('projects') },
        { label: t('nav.skills'), action: () => scrollToSection('skills') },
        { label: t('nav.experience'), action: () => scrollToSection('experience') },
        { label: t('nav.contact'), action: () => scrollToSection('contact') },
      ]
    : [];

  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (!isHome) return;
    const sections = ['about', 'projects', 'skills', 'experience', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/90 backdrop-blur-md shadow-[0_2px_20px_rgba(45,80,22,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-forest">
            <path
              d="M14 2C14 2 8 8 8 14C8 17.3 10.7 20 14 20C17.3 20 20 17.3 20 14C20 8 14 2 14 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 20V26"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M11 23C11 23 12.5 21.5 14 21.5C15.5 21.5 17 23 17 23"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-display text-lg font-medium text-forest tracking-wide group-hover:text-terra transition-colors duration-300">
            Aurora
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {isHome && navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className="relative font-body text-sm font-medium text-forest/80 hover:text-forest transition-colors duration-300 py-1"
            >
              {link.label}
              {activeSection === link.label.toLowerCase() && <WavyUnderline />}
            </button>
          ))}

          {!isHome && (
            <Link
              to="/"
              className="font-body text-sm font-medium text-forest/80 hover:text-forest transition-colors duration-300"
            >
              {t('nav.backToHome')}
            </Link>
          )}

          <Link
            to="/portfolio"
            className="relative font-body text-sm font-medium text-forest/80 hover:text-forest transition-colors duration-300 py-1"
          >
            {t('nav.portfolio')}
            {location.pathname.startsWith('/portfolio') && <WavyUnderline />}
          </Link>

          <div className="font-hand text-lg">
            <LanguageSwitcher className="!font-hand !text-base text-terra hover:text-forest transition-colors" />
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-forest rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            className="block w-6 h-0.5 bg-forest rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-forest rounded-full"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-cream/95 backdrop-blur-md border-t border-forest/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {isHome && navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={link.action}
                  className="font-body text-base text-forest/80 hover:text-forest text-left transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}

              {!isHome && (
                <Link
                  to="/"
                  className="font-body text-base text-forest/80 hover:text-forest transition-colors"
                >
                  {t('nav.backToHome')}
                </Link>
              )}

              <Link
                to="/portfolio"
                className="font-body text-base text-forest/80 hover:text-forest transition-colors"
              >
                {t('nav.portfolio')}
              </Link>

              <div className="pt-2 border-t border-forest/10 font-hand text-lg">
                <LanguageSwitcher className="!font-hand !text-lg text-terra" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
