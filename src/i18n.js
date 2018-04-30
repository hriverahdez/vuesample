import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {store} from '@/store'

Vue.use(VueI18n)

let p = 'pepe'

setTimeout(() => {
  p = store.state.words
  console.log(p)
}, 1000)

export const i18n = new VueI18n({
  locale: 'en', // set locale
  messages: p
})



console.log('entra', store.state.pepe.hola)
console.log(i18n)
