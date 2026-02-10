import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeLink as Link, useThemeBasePath } from '@auror/shared-ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { LanguageSwitcher } from '@auror/shared-ui';
import { profile } from '@auror/data';

export default function Nav() {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/portfolio', label: t('nav.portfolio') },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo — Name in display font */}
            <Link
              to="/"
              className="font-display text-charcoal text-base md:text-lg tracking-wide hover:text-charcoal-light transition-colors duration-500"
            >
              {profile.name}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative group"
                >
                  <span
                    className={`font-body text-[11px] tracking-[0.2em] uppercase transition-colors duration-500 ${
                      location.pathname === link.to
                        ? 'text-charcoal'
                        : 'text-charcoal-light hover:text-charcoal'
                    }`}
                  >
                    {link.label}
                  </span>
                  {/* Active indicator — tiny dot */}
                  {location.pathname === link.to && (
                    <motion.div
                      layoutId="nav-dot"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rose"
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    />
                  )}
                </Link>
              ))}

              <div className="w-px h-3 bg-silver" />

              <LanguageSwitcher
                variant="minimal"
                className="font-body text-[11px] tracking-[0.15em] text-charcoal-light hover:text-charcoal uppercase"
              />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden font-body text-[11px] tracking-[0.2em] text-charcoal uppercase"
              aria-label="Toggle menu"
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {/* Bottom border on scroll */}
        <motion.div
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="h-px bg-silver"
        />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-12"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={link.to}
                  className={`font-display text-2xl tracking-wide transition-colors duration-500 ${
                    location.pathname === link.to
                      ? 'text-charcoal'
                      : 'text-dove hover:text-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4"
            >
              <LanguageSwitcher
                variant="minimal"
                className="font-body text-xs tracking-[0.15em] text-charcoal-light"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
