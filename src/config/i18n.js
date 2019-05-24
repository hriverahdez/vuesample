import Vue from 'vue'
import VueI18n from 'vue-i18n'
import englishTranslations from '@/translations/en.json'
import spanishTranslations from '@/translations/es.json'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en', // set locale
  messages: {
    'en': englishTranslations,
    'es': spanishTranslations
  }
})
