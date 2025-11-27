import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import enTranslations from './locales/en/translation.json';
import zhTranslations from './locales/zh/translation.json';
import enContent from './locales/en/content.json';
import zhContent from './locales/zh/content.json';

const savedLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          ...enTranslations,
          content: enContent
        }
      },
      zh: {
        translation: {
          ...zhTranslations,
          content: zhContent
        }
      }
    },
    lng: savedLanguage,
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;