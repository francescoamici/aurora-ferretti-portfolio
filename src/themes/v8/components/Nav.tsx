import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeLink as Link, useThemeBasePath } from '@auror/shared-ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@auror/i18n';
import { LanguageSwitcher } from '@auror/shared-ui';

const navColors = ['#FFB4C8', '#FFE66D', '#4361EE', '#FF6B6B', '#95E1D3'];

const borderColors = [
  'border-t-pink',
  'border-t-yellow',
  'border-t-blue',
  'border-t-coral',
  'border-t-mint',
];

interface NavLinkProps {
  to: string;
  label: string;
  color: string;
  bgColor: string;
  isActive: boolean;
  onClick?: () => void;
}

function NavLink({ to, label, color, bgColor, isActive, onClick }: NavLinkProps) {
  return (
    <motion.div
      whileHover={{ rotate: [0, -3, 3, -3, 0] }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
    >
      <Link
        to={to}
        onClick={onClick}
        className="font-display text-sm md:text-base px-3 py-2 rounded-lg transition-all duration-200 block whitespace-nowrap"
        style={{
          color: isActive ? '#FFFFFF' : color,
          backgroundColor: isActive ? bgColor : 'transparent',
          border: `3px solid ${bgColor}`,
        }}
      >
        {label}
      </Link>
    </motion.div>
  );
}

export default function Nav() {
  const { t } = useTranslation();
  const location = useLocation();
  const basePath = useThemeBasePath();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/', label: t('nav.home'), section: '' },
    { to: '/#about', label: t('nav.about'), section: 'about' },
    { to: '/#projects', label: t('nav.projects'), section: 'projects' },
    { to: '/#skills', label: t('nav.skills'), section: 'skills' },
    { to: '/#experience', label: t('nav.experience'), section: 'experience' },
    { to: '/#contact', label: t('nav.contact'), section: 'contact' },
  ];

  const isActive = (link: typeof links[0]) => {
    if (link.to === '/' && (location.pathname === basePath || location.pathname === basePath + '/') && !location.hash) return true;
    if (link.section && location.hash === `#${link.section}`) return true;
    return false;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm"
        style={{
          borderTop: `4px solid`,
          borderImage: `linear-gradient(to right, ${navColors.join(', ')}) 1`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <motion.span
                className="font-display text-xl md:text-2xl"
                whileHover={{ scale: 1.05 }}
                style={{
                  background: `linear-gradient(90deg, ${navColors.join(', ')})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                AF
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              {links.map((link, i) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  label={link.label}
                  color={navColors[i % navColors.length]}
                  bgColor={navColors[i % navColors.length]}
                  isActive={isActive(link)}
                />
              ))}
            </div>

            {/* Language Switcher + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <div
                className="rounded-full px-3 py-1.5"
                style={{
                  border: '3px solid #4361EE',
                  background: '#FFE66D',
                }}
              >
                <LanguageSwitcher variant="minimal" className="!text-blue font-display text-sm" />
              </div>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex flex-col gap-1.5 p-2"
                aria-label="Menu"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="block w-7 h-1 rounded-full bg-coral"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                  className="block w-7 h-1 rounded-full bg-blue"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="block w-7 h-1 rounded-full bg-mint"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Memphis pattern bottom border */}
        <div className="h-1 memphis-bg opacity-30" />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 top-[68px] z-40 bg-white memphis-bg-subtle p-6 flex flex-col gap-4 md:hidden overflow-auto"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <NavLink
                  to={link.to}
                  label={link.label}
                  color={navColors[i % navColors.length]}
                  bgColor={navColors[i % navColors.length]}
                  isActive={isActive(link)}
                  onClick={() => setMobileOpen(false)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
}
