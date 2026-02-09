import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '@auror/i18n';
import { LanguageSwitcher } from '@auror/shared-ui';

const navLinks = [
  { key: 'home', path: '/' },
  { key: 'portfolio', path: '/portfolio' },
  { key: 'contact', path: '/#contact' },
];

export default function Nav() {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black">
      <div className="mx-auto max-w-[1200px] px-[24px]">
        <div className="grid grid-cols-12 gap-[24px] items-center h-[64px]">
          {/* Logo — cols 1-2 */}
          <div className="col-span-2">
            <Link
              to="/"
              className="font-sans font-bold text-[18px] tracking-[-0.02em] text-black no-underline"
            >
              AF
            </Link>
          </div>

          {/* Nav links — cols 7-10, desktop */}
          <div className="col-span-7 hidden md:flex items-center justify-end gap-[32px]">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                className="relative flex items-center gap-[8px] font-sans font-medium text-[11px] uppercase tracking-[2px] text-black no-underline transition-opacity duration-200 hover:opacity-70"
              >
                {isActive(link.path) && (
                  <span className="w-[6px] h-[6px] bg-red" />
                )}
                {t(`nav.${link.key}`)}
              </Link>
            ))}
          </div>

          {/* Language switcher — cols 11-12 */}
          <div className="col-span-3 md:col-span-3 flex items-center justify-end gap-[16px]">
            {/* DE crossed out — Swiss humor */}
            <span className="hidden md:inline font-mono text-[11px] text-gray line-through select-none">
              DE
            </span>
            <LanguageSwitcher className="font-mono text-[11px] tracking-[1px]" />

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-[4px] p-[8px]"
              aria-label="Menu"
            >
              <span className={`block w-[18px] h-[1px] bg-black transition-transform duration-200 ${mobileOpen ? 'translate-y-[5px] rotate-45' : ''}`} />
              <span className={`block w-[18px] h-[1px] bg-black transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-[18px] h-[1px] bg-black transition-transform duration-200 ${mobileOpen ? '-translate-y-[5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-black">
          <div className="mx-auto max-w-[1200px] px-[24px] py-[24px]">
            <div className="flex flex-col gap-[24px]">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-[8px] font-sans font-medium text-[11px] uppercase tracking-[2px] text-black no-underline"
                >
                  {isActive(link.path) && (
                    <span className="w-[6px] h-[6px] bg-red" />
                  )}
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
