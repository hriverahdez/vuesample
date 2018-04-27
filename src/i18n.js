import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en', // set locale
  messages: {
    'en': require('./locales/en.json'),
    'fr': require('./locales/fr.json')
  }
})
