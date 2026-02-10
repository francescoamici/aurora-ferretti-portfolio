import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeLink as Link, useThemeBasePath } from '@auror/shared-ui';
import { useTranslation } from '@auror/i18n';
import { LanguageSwitcher } from '@auror/shared-ui';
import { motion, AnimatePresence } from 'framer-motion';

export default function Nav() {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/portfolio', label: t('nav.portfolio') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* BRUTAL NAV BAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-harsh-black border-b-[4px] border-blue">
        <div className="flex items-center justify-between px-4 md:px-8">
          {/* LOGO - raw text */}
          <Link
            to="/"
            className="font-heading text-raw-white text-sm md:text-base uppercase tracking-wider py-4 hover:text-yellow transition-none"
          >
            A.F.
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-0">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  font-mono font-bold text-xs uppercase tracking-[0.2em] px-6 py-4
                  border-l-[4px] border-harsh-black
                  transition-none
                  ${isActive(link.to)
                    ? 'bg-blue text-raw-white'
                    : 'bg-harsh-black text-raw-white hover:bg-blue hover:text-raw-white'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}

            {/* CONTACT as anchor */}
            <a
              href="#contact"
              className="font-mono font-bold text-xs uppercase tracking-[0.2em] px-6 py-4 border-l-[4px] border-harsh-black bg-harsh-black text-raw-white hover:bg-yellow hover:text-harsh-black transition-none"
            >
              {t('nav.contact')}
            </a>

            {/* LANG SWITCHER */}
            <div className="border-l-[4px] border-harsh-black px-4 py-4">
              <LanguageSwitcher
                variant="minimal"
                className="!text-raw-white !font-mono !font-bold !tracking-[0.2em] hover:!text-yellow !transition-none"
              />
            </div>
          </div>

          {/* MOBILE BURGER */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-raw-white font-mono font-bold text-2xl px-4 py-4 hover:text-yellow transition-none"
            aria-label="Menu"
          >
            {mobileOpen ? '✕' : '///'}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.15, ease: 'linear' }}
            className="fixed inset-0 z-40 bg-harsh-black pt-20 flex flex-col"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05, duration: 0.1 }}
              >
                <Link
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    block font-mono font-bold text-2xl uppercase tracking-[0.2em] px-8 py-6
                    border-b-[4px] border-blue
                    ${isActive(link.to) ? 'bg-blue text-raw-white' : 'text-raw-white hover:bg-blue'}
                  `}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.1 }}
              className="block font-mono font-bold text-2xl uppercase tracking-[0.2em] px-8 py-6 border-b-[4px] border-blue text-raw-white hover:bg-yellow hover:text-harsh-black"
            >
              {t('nav.contact')}
            </motion.a>

            <div className="px-8 py-6">
              <LanguageSwitcher
                variant="minimal"
                className="!text-raw-white !font-mono !font-bold !text-xl !tracking-[0.2em]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAV SPACER */}
      <div className="h-14" />
    </>
  );
}
