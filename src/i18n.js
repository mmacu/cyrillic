import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import common_en from './locales/en/common.json'
import common_pl from './locales/pl/common.json'


const resources = {
  'en': { common: common_en },
  'pl': { common: common_pl },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'pl'],
    ns: ['common'],
    defaultNS: 'common',
    debug: process.env.REACT_APP_ENVIRONMENT === 'dev',
    load: 'currentOnly',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n