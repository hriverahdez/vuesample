<template lang="pug">
  div
    h1 Dashboard
    p {{ getWords['menu.dashboard.label'] }}
    p {{ $t("links.home") }}
    button(@click="cambiarIdioma") Cambiar idioma

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['getWords'])
  },
  mounted () {
    this.$store.dispatch('getWords')
  },

  methods: {
    cambiarIdioma () {
      if (this.$i18n.locale === 'en') {
        this.$i18n.locale = 'es'
      } else {
        this.$i18n.locale = 'en'
      }
    }
  }
}
</script>
