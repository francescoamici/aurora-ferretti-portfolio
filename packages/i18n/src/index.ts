import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import itCommon from './locales/it/common.json';
import itProfile from './locales/it/profile.json';
import itProjects from './locales/it/projects.json';
import itExperience from './locales/it/experience.json';

import enCommon from './locales/en/common.json';
import enProfile from './locales/en/profile.json';
import enProjects from './locales/en/projects.json';
import enExperience from './locales/en/experience.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      it: {
        common: itCommon,
        profile: itProfile,
        projects: itProjects,
        experience: itExperience,
      },
      en: {
        common: enCommon,
        profile: enProfile,
        projects: enProjects,
        experience: enExperience,
      },
    },
    fallbackLng: 'it',
    defaultNS: 'common',
    ns: ['common', 'profile', 'projects', 'experience'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'auror-language',
      caches: ['localStorage'],
    },
  });

export default i18n;
export { i18n };
export { useTranslation, Trans } from 'react-i18next';
