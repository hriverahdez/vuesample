import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// Vuex
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    browserLang: 'fin',
    words: []
  },
  getters: {
    browserLangGetter (state) {
      return state.browserLang
    }
  },
  mutations: {
    browserLangUpdate (state, lang) {
      state.browserLang = lang
    },
    getWords (state, words) {
      state.words = words
    }
  },
  actions: {
    browserLangUpdate (context, lang) {
      context.commit('browserLangUpdate', lang)
    },
    getWords (context) {
      return axios.get('http://stage.do.linkitox.com/i18n-messages/es~en')
        .then(response => {
          console.log(response)
          context.commit('getWords', response.data)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
})
