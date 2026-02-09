import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { LanguageSwitcher } from '@auror/shared-ui';

const navLinks = [
  { key: 'about', href: '#about' },
  { key: 'projects', href: '#projects' },
  { key: 'skills', href: '#skills' },
  { key: 'experience', href: '#experience' },
  { key: 'contact', href: '#contact' },
];

function LeafLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-sage">
      <path
        d="M14 2C14 2 6 8 6 16C6 20.4183 9.58172 24 14 24C18.4183 24 22 20.4183 22 16C22 8 14 2 14 2Z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M14 2C14 2 6 8 6 16C6 20.4183 9.58172 24 14 24C18.4183 24 22 20.4183 22 16C22 8 14 2 14 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 24V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 16C11 14 9 12 9 12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M14 13C16.5 11.5 18 10 18 10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WavyUnderline({ isActive }: { isActive: boolean }) {
  return (
    <svg
      className="absolute -bottom-1 left-0 w-full"
      height="6"
      viewBox="0 0 100 6"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0 3 Q 10 0, 20 3 T 40 3 T 60 3 T 80 3 T 100 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-sage"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </svg>
  );
}

export default function Nav() {
  const { t } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/85 backdrop-blur-md shadow-[0_1px_20px_rgba(122,155,109,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2.5"
          onClick={() => setMobileOpen(false)}
        >
          <motion.div
            whileHover={{ rotate: 12 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <LeafLogo />
          </motion.div>
          <span className="font-display text-xl font-medium tracking-tight text-earth">
            Aurora
          </span>
        </Link>

        {/* Desktop links */}
        {isHome && (
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  className="relative py-1 text-sm font-medium text-earth/70 transition-colors hover:text-earth"
                >
                  {t(`nav.${link.key}`)}
                  <WavyUnderline isActive={activeSection === link.key.replace('#', '')} />
                </a>
              </li>
            ))}
          </ul>
        )}

        {!isHome && (
          <Link
            to="/"
            className="hidden items-center gap-1.5 text-sm font-medium text-earth/70 transition-colors hover:text-sage md:flex"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 12L6 8L10 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t('nav.backToHome')}
          </Link>
        )}

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LanguageSwitcher className="font-hand text-lg text-earth/60 hover:text-earth" variant="minimal" />
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block h-[2px] w-6 bg-earth origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-[2px] w-6 bg-earth"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="block h-[2px] w-6 bg-earth origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: 'ellipse(0% 0% at 100% 0%)' }}
            animate={{ clipPath: 'ellipse(150% 150% at 50% 0%)' }}
            exit={{ clipPath: 'ellipse(0% 0% at 100% 0%)' }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-cream"
          >
            {/* Decorative background blob */}
            <div className="absolute top-1/4 left-1/3 h-64 w-64 rounded-full bg-sage-light blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-terra-light blur-3xl" />

            <ul className="flex flex-col items-center gap-6">
              {isHome &&
                navLinks.map((link, i) => (
                  <motion.li
                    key={link.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-3xl font-medium text-earth transition-colors hover:text-sage"
                    >
                      {t(`nav.${link.key}`)}
                    </a>
                  </motion.li>
                ))}

              {!isHome && (
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.15 }}
                >
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl font-medium text-earth transition-colors hover:text-sage"
                  >
                    {t('nav.backToHome')}
                  </Link>
                </motion.li>
              )}

              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <LanguageSwitcher className="font-hand text-2xl text-earth/60" variant="minimal" />
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
