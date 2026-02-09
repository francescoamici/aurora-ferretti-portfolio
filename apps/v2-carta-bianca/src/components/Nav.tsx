import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '@auror/i18n';
import { LanguageSwitcher } from '@auror/shared-ui';

export default function Nav() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-500 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 flex items-center justify-between h-14 border-b border-black/5">
        <Link
          to="/"
          className="font-display text-sm font-medium tracking-tight hover:text-red transition-colors duration-300"
        >
          A.F.
        </Link>

        <div className="flex items-center gap-8">
          {!isHome && (
            <Link
              to="/"
              className="font-body text-xs tracking-wide text-black/40 hover:text-black transition-colors duration-300"
            >
              {t('nav.home')}
            </Link>
          )}
          <Link
            to="/portfolio"
            className="font-body text-xs tracking-wide text-black/40 hover:text-black transition-colors duration-300"
          >
            {t('nav.portfolio')}
          </Link>
          <a
            href="#contact"
            className="font-body text-xs tracking-wide text-black/40 hover:text-black transition-colors duration-300"
          >
            {t('nav.contact')}
          </a>
          <LanguageSwitcher variant="minimal" className="text-xs text-black/40" />
        </div>
      </nav>
    </header>
  );
}
