import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { LanguageSwitcher } from '@auror/shared-ui';

const navItems = [
  { key: 'home', section: 'hero' },
  { key: 'about', section: 'about' },
  { key: 'projects', section: 'projects' },
  { key: 'skills', section: 'skills' },
  { key: 'experience', section: 'experience' },
  { key: 'contact', section: 'contact' },
] as const;

export default function Nav() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      const sections = navItems.map((item) => {
        const el = document.getElementById(item.section);
        if (!el) return { key: item.section, top: 0, bottom: 0 };
        const rect = el.getBoundingClientRect();
        return { key: item.section, top: rect.top, bottom: rect.bottom };
      });

      const viewportCenter = window.innerHeight / 3;
      const current = sections.find(
        (s) => s.top <= viewportCenter && s.bottom > viewportCenter,
      );
      if (current) {
        setActiveSection(current.key);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome, lastScrollY]);

  const handleNavClick = (section: string) => {
    if (isHome) {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${section}`);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
        >
          <div className="flex items-center gap-1 rounded-full border border-gold-dim bg-nero/80 px-2 py-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.section)}
                className={`relative rounded-full px-4 py-2 text-xs font-medium tracking-wider uppercase transition-colors duration-300 ${
                  isHome && activeSection === item.section
                    ? 'text-gold'
                    : 'text-ivory/60 hover:text-ivory'
                }`}
              >
                {isHome && activeSection === item.section && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-gold/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {t(`nav.${item.key}`)}
                </span>
              </button>
            ))}

            <div className="mx-1 h-5 w-px bg-gold-dim" />

            <LanguageSwitcher
              variant="minimal"
              className="px-3 py-2 text-xs text-gold/70 hover:text-gold"
            />
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
