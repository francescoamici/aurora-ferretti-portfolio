import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '@auror/i18n';
import { LanguageSwitcher } from '@auror/shared-ui';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { key: 'home', path: '/', hash: '' },
  { key: 'projects', path: '/', hash: '#progetti' },
  { key: 'skills', path: '/', hash: '#competenze' },
  { key: 'experience', path: '/', hash: '#esperienza' },
  { key: 'contact', path: '/', hash: '#contatto' },
  { key: 'portfolio', path: '/portfolio', hash: '' },
];

export default function Nav() {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (link: (typeof navLinks)[0]) => {
    if (link.hash) {
      return location.hash === link.hash;
    }
    return location.pathname === link.path && !location.hash;
  };

  const handleClick = (link: (typeof navLinks)[0]) => {
    setMobileOpen(false);
    if (link.hash && location.pathname === '/') {
      const el = document.querySelector(link.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Main nav bar */}
      <div className="bg-prussian/95 backdrop-blur-sm border-b border-prussian-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.span
                className="font-display text-2xl tracking-[0.2em] text-white uppercase"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
              >
                AURORA
              </motion.span>
              <span className="text-red font-big text-3xl font-bold leading-none">/</span>
              <motion.span
                className="font-display text-2xl tracking-[0.2em] text-red uppercase"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
              >
                F
              </motion.span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.path + link.hash}
                  onClick={() => handleClick(link)}
                  className="relative group"
                >
                  <motion.span
                    className={`font-display text-sm tracking-[0.25em] uppercase px-4 py-2 block transition-colors duration-150 ${
                      isActive(link) ? 'text-orange' : 'text-white/80 hover:text-white'
                    }`}
                    whileHover={{ x: 3 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  >
                    {t(`nav.${link.key}`)}
                  </motion.span>
                  {isActive(link) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-orange"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}

              {/* Language gear shift */}
              <div className="ml-4 pl-4 border-l border-prussian-light">
                <div className="relative">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menu"
            >
              <motion.span
                className="block w-7 h-[2px] bg-red"
                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block w-5 h-[2px] bg-white"
                animate={mobileOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.1 }}
              />
              <motion.span
                className="block w-7 h-[2px] bg-red"
                animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.15 }}
              />
            </button>
          </div>
        </div>

        {/* Racing stripe accent */}
        <div className="h-[2px] racing-stripe" />
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-prussian/98 backdrop-blur-md border-b border-red/30 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.15 }}
                >
                  <Link
                    to={link.path + link.hash}
                    onClick={() => handleClick(link)}
                    className={`block font-display text-xl tracking-[0.3em] uppercase py-3 border-b border-prussian-light transition-all duration-150 ${
                      isActive(link) ? 'text-orange pl-4 border-orange/30' : 'text-white/70 hover:text-white hover:pl-2'
                    }`}
                  >
                    {isActive(link) && <span className="text-red mr-2">/</span>}
                    {t(`nav.${link.key}`)}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
