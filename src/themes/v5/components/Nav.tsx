import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeLink as Link, useThemeBasePath } from '@auror/shared-ui';
import { useTranslation } from '@auror/i18n';
import { LanguageSwitcher } from '@auror/shared-ui';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '#about', key: 'about' },
  { href: '#projects', key: 'projects' },
  { href: '#skills', key: 'skills' },
  { href: '#experience', key: 'experience' },
  { href: '#contact', key: 'contact' },
];

export default function Nav() {
  const { t } = useTranslation();
  const location = useLocation();
  const basePath = useThemeBasePath();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = location.pathname === basePath || location.pathname === basePath + '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHome && href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-cyan/20 shadow-[0_2px_20px_rgba(0,240,255,0.1)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-sm font-bold tracking-[0.3em] uppercase text-cyan hover:neon-cyan transition-all duration-300"
        >
          AURORA_
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {isHome ? (
            navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-display text-[10px] font-medium tracking-[0.25em] uppercase text-white/60 hover:text-cyan hover:neon-cyan transition-all duration-300 relative group"
              >
                {t(`nav.${link.key}`)}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan group-hover:w-full transition-all duration-300 neon-underline-cyan" />
              </a>
            ))
          ) : (
            <Link
              to="/"
              className="font-display text-[10px] font-medium tracking-[0.25em] uppercase text-white/60 hover:text-cyan hover:neon-cyan transition-all duration-300"
            >
              {t('nav.backToHome')}
            </Link>
          )}
          <Link
            to="/portfolio"
            className="font-display text-[10px] font-medium tracking-[0.25em] uppercase text-white/60 hover:text-cyan hover:neon-cyan transition-all duration-300 relative group"
          >
            {t('nav.portfolio')}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan group-hover:w-full transition-all duration-300 neon-underline-cyan" />
          </Link>
          <div className="border border-cyan/30 rounded px-2 py-1 neon-border-cyan">
            <LanguageSwitcher
              variant="minimal"
              className="text-cyan font-display text-[10px] tracking-[0.2em]"
            />
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[2px] bg-cyan"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-[2px] bg-cyan"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[2px] bg-cyan"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-cyan/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {isHome &&
                navLinks.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      setMobileOpen(false);
                    }}
                    className="font-display text-xs tracking-[0.25em] uppercase text-white/60 hover:text-cyan transition-colors"
                  >
                    {'> '}{t(`nav.${link.key}`)}
                  </a>
                ))}
              {!isHome && (
                <Link
                  to="/"
                  className="font-display text-xs tracking-[0.25em] uppercase text-white/60 hover:text-cyan transition-colors"
                >
                  {'> '}{t('nav.backToHome')}
                </Link>
              )}
              <Link
                to="/portfolio"
                className="font-display text-xs tracking-[0.25em] uppercase text-white/60 hover:text-cyan transition-colors"
              >
                {'> '}{t('nav.portfolio')}
              </Link>
              <div className="pt-2 border-t border-cyan/10">
                <LanguageSwitcher
                  variant="minimal"
                  className="text-cyan font-display text-xs tracking-[0.2em]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom glow line */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan/40 to-transparent shadow-[0_0_8px_rgba(0,240,255,0.4)]" />
      )}
    </nav>
  );
}
