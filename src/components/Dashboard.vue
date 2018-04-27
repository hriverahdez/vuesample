<template lang="pug">
  div
    h1 Dashboard
    p {{ $t("links.home") }}
    button(@click="cambiarIdioma") Cambiar idioma
    p {{ this.$store.getters.browserLangGetter }}
    button(@click="actualizarIdioma") Actualizar idioma
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    cambiarIdioma () {
      console.log('entra', this.$i18n.locale)
      if (this.$i18n.locale === 'en') {
        this.$i18n.locale = 'fr'
      } else {
        this.$i18n.locale = 'en'
      }
    },
    actualizarIdioma () {
      this.$store.dispatch('browserLangUpdate', 'por')
    }
  },
  created () {
    axios.get('http://stage.do.linkitox.com/i18n-messages/es~en')
        .then(response => {
          console.log(response)
        })
        .catch(e => {
          console.log(e)
        })
  }
}
</script>
