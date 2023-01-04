import { createI18n } from 'vue-i18n/dist/vue-i18n.cjs'
import langEn from '../locales/en.json'
import langAr from '../locales/ar.json'

const i18n = createI18n({
    locale: 'ar', // set locale
    fallbackLocale: 'en', // set fallback locale
    
    messages: {
        en: langEn,
        ar: langAr
    },
  })

  
export default i18n;