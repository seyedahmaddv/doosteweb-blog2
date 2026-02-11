import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from '../utils/languages/en.json';
import french from '../utils/languages/fr.json';
import arabic from '../utils/languages/ar.json';
import chinese from '../utils/languages/ch.json';
import persian from '../utils/languages/fa.json';

const resources = {
  en: {
    translation: english,
  },
  fr: {
    translation: french,
  },
  ar: {
    translation: arabic,
  },
  ch: {
    translation: chinese,
  },
  fa: {
    translation: persian,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'fa',
    fallbackLng: 'fa',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
