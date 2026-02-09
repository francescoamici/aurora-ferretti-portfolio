import { useTranslation } from '@auror/i18n';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'minimal' | 'pill';
}

export function LanguageSwitcher({ className = '', variant = 'default' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('it') ? 'it' : 'en';

  const toggle = () => {
    const newLang = currentLang === 'it' ? 'en' : 'it';
    i18n.changeLanguage(newLang);
  };

  if (variant === 'minimal') {
    return (
      <button
        onClick={toggle}
        className={`text-sm font-medium tracking-wide uppercase transition-opacity hover:opacity-70 ${className}`}
        aria-label={currentLang === 'it' ? 'Switch to English' : 'Passa all\'italiano'}
      >
        {currentLang === 'it' ? 'EN' : 'IT'}
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <div className={`inline-flex rounded-full border overflow-hidden text-xs font-medium ${className}`}>
        <button
          onClick={() => i18n.changeLanguage('it')}
          className={`px-3 py-1.5 transition-colors ${currentLang === 'it' ? 'bg-current-text text-current-bg' : ''}`}
        >
          IT
        </button>
        <button
          onClick={() => i18n.changeLanguage('en')}
          className={`px-3 py-1.5 transition-colors ${currentLang === 'en' ? 'bg-current-text text-current-bg' : ''}`}
        >
          EN
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70 ${className}`}
      aria-label={currentLang === 'it' ? 'Switch to English' : 'Passa all\'italiano'}
    >
      <span className={currentLang === 'it' ? 'opacity-100' : 'opacity-40'}>IT</span>
      <span className="opacity-30">/</span>
      <span className={currentLang === 'en' ? 'opacity-100' : 'opacity-40'}>EN</span>
    </button>
  );
}
