import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeLink as Link, useThemeBasePath } from '@auror/shared-ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { LanguageSwitcher } from '@auror/shared-ui';

export default function Nav() {
  const { t } = useTranslation();
  const location = useLocation();
  const basePath = useThemeBasePath();
  const isHome = location.pathname === basePath || location.pathname === basePath + '/';
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/#about', label: t('nav.about'), isAnchor: true },
    { to: '/portfolio', label: t('nav.portfolio') },
    { to: '/#experience', label: t('nav.experience'), isAnchor: true },
    { to: '/#contact', label: t('nav.contact'), isAnchor: true },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    setMobileOpen(false);
    if (link.isAnchor && isHome) {
      const id = link.to.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-parchment/95 backdrop-blur-sm"
    >
      {/* Top thin border */}
      <div className="h-px bg-brown/20" />

      {/* Masthead */}
      <div className="max-w-6xl mx-auto px-6 pt-5 pb-3 text-center">
        <Link to="/" className="inline-block">
          <h1 className="font-caps text-brown text-xs tracking-[0.3em] uppercase small-caps">
            Aurora Ferretti
          </h1>
        </Link>
        <p className="font-caps text-brown/40 text-[0.6rem] tracking-[0.25em] uppercase mt-1">
          Portfolio N&deg;I &mdash; MMXXV
        </p>
      </div>

      {/* Thin rule */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-brown/20" />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center justify-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => handleNavClick(link)}
              className="font-caps text-[0.65rem] tracking-[0.2em] uppercase text-brown/70 hover:text-terracotta transition-colors duration-500 small-caps"
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-4 pl-4 border-l border-brown/15">
            <LanguageSwitcher
              variant="minimal"
              className="font-caps text-[0.65rem] tracking-[0.2em] text-brown/50 hover:text-terracotta transition-colors duration-500"
            />
          </div>
        </div>
      </nav>

      {/* Mobile hamburger */}
      <div className="md:hidden flex items-center justify-between px-6 py-3">
        <LanguageSwitcher
          variant="minimal"
          className="font-caps text-[0.6rem] tracking-[0.2em] text-brown/50"
        />
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-brown/70 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-brown"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-px bg-brown"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-brown"
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-parchment border-t border-brown/10"
          >
            <nav className="flex flex-col items-center py-6 gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => handleNavClick(link)}
                  className="font-caps text-[0.7rem] tracking-[0.2em] uppercase text-brown/70 hover:text-terracotta transition-colors duration-500 small-caps"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom thin border */}
      <div className="h-px bg-brown/20" />
    </motion.header>
  );
}
