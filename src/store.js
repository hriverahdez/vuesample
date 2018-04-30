import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// Vuex
Vue.use(Vuex)

export const ADD_WORDS = 'ADD_WORDS'

export const store = new Vuex.Store({
  state: {
    browserLang: 'en',
    words: [],
    pepe: {
      name: {'hola': 'popo'}
    }
  },
  getters: {
    browserLangGetter (state) {
      return state.browserLang
    },
    getWords (state) {
      return state.words
    }
  },
  mutations: {
    browserLangUpdate (state, lang) {
      state.browserLang = lang
    },
    [ADD_WORDS] (state, words) {
      state.words = words
    }
  },
  actions: {
    browserLangUpdate (context, lang) {
      context.commit('browserLangUpdate', lang)
    },
    getWords (context) {
      return axios.get(`http://stage.do.linkitox.com/i18n-messages/${context.state.browserLang}`)
        .then(response => {
          context.commit('ADD_WORDS', response.data[`${context.state.browserLang}`])
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
})