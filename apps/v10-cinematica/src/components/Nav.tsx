import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { LanguageSwitcher } from '@auror/shared-ui';

export default function Nav() {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/portfolio', label: t('nav.portfolio') },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-film-black/90 backdrop-blur-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo / Name */}
            <Link
              to="/"
              className="font-display text-gold text-xs md:text-sm tracking-[0.3em] uppercase hover:opacity-80 transition-opacity duration-500"
            >
              A. Ferretti
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative font-display text-[10px] tracking-[0.25em] uppercase transition-colors duration-500 ${
                    location.pathname === link.to
                      ? 'text-gold'
                      : 'text-warm-white/60 hover:text-warm-white'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.to && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gold"
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}

              <div className="w-px h-4 bg-warm-white/20" />

              <LanguageSwitcher
                variant="minimal"
                className="font-mono text-[10px] tracking-[0.2em] text-warm-white/50 hover:text-gold"
              />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden font-mono text-[10px] tracking-[0.2em] text-gold uppercase"
              aria-label="Toggle menu"
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {/* Subtle gold line at bottom when scrolled */}
        {scrolled && (
          <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        )}
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-40 bg-film-black/98 flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              >
                <Link
                  to={link.to}
                  className={`font-display text-lg tracking-[0.3em] uppercase transition-colors duration-500 ${
                    location.pathname === link.to
                      ? 'text-gold'
                      : 'text-warm-white/60 hover:text-warm-white'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <LanguageSwitcher
                variant="minimal"
                className="font-mono text-xs tracking-[0.2em] text-warm-white/50"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
