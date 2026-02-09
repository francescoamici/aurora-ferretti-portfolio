import { useEffect } from 'react';
import { useTranslation } from '@auror/i18n';

interface SEOHeadProps {
  themeName: string;
  themeColor?: string;
}

export function SEOHead({ themeName, themeColor = '#000000' }: SEOHeadProps) {
  const { t, i18n } = useTranslation('profile');
  const lang = i18n.language?.startsWith('it') ? 'it' : 'en';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `Aurora Ferretti — ${t('title')} | ${themeName}`;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setMetaProperty = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', t('bio'));
    setMeta('theme-color', themeColor);
    setMetaProperty('og:title', `Aurora Ferretti — ${t('title')}`);
    setMetaProperty('og:description', t('bio'));
    setMetaProperty('og:type', 'website');
  }, [lang, t, themeName, themeColor]);

  return null;
}
