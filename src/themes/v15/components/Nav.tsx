import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeLink as Link, useThemeBasePath } from '@auror/shared-ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { LanguageSwitcher } from '@auror/shared-ui';

const navLinks = [
  { key: 'home', path: '/', section: null },
  { key: 'about', path: '/#about', section: 'about' },
  { key: 'projects', path: '/#projects', section: 'projects' },
  { key: 'skills', path: '/#skills', section: 'skills' },
  { key: 'experience', path: '/#experience', section: 'experience' },
  { key: 'contact', path: '/#contact', section: 'contact' },
];

export default function Nav() {
  const { t } = useTranslation();
  const location = useLocation();
  const basePath = useThemeBasePath();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (section: string | null) => {
    setMobileOpen(false);
    if (section && (location.pathname === basePath || location.pathname === basePath + '/')) {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (key: string) => {
    if (key === 'home' && (location.pathname === basePath || location.pathname === basePath + '/')) return true;
    if (key === 'projects' && location.pathname.startsWith('/portfolio')) return true;
    return false;
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-sm border-b border-gold/20'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="font-accent text-xs tracking-[0.3em] uppercase text-noir hover:text-gold transition-colors duration-300"
            onClick={() => handleNavClick(null)}
          >
            Aurora Ferretti
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.key}
                to={link.path}
                onClick={() => handleNavClick(link.section)}
                className="relative font-body text-[10px] uppercase tracking-[0.2em] text-noir/70 hover:text-noir transition-colors duration-300"
              >
                {t(`nav.${link.key}`)}
                {isActive(link.key) && (
                  <motion.span
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blush"
                    layoutId="nav-dot"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            <span className="w-px h-4 bg-gray-light/50" />

            <LanguageSwitcher
              variant="minimal"
              className="text-[10px] tracking-[0.2em] text-noir/50 hover:text-noir"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col items-end gap-1.5 py-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-px bg-noir" />
            <span className="block w-4 h-px bg-noir" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-ivory flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-blush-deep hover:text-noir transition-colors"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.path}
                    onClick={() => handleNavClick(link.section)}
                    className="font-display text-4xl md:text-5xl text-noir hover:text-blush-deep transition-colors duration-300"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-6"
              >
                <LanguageSwitcher
                  variant="minimal"
                  className="text-xs tracking-[0.2em] text-gray"
                />
              </motion.div>
            </nav>

            {/* Decorative gold line at bottom */}
            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2 w-12 h-px bg-gold/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
