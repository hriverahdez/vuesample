<template lang="pug">
  div
    h1 Dashboard
    p {{ getWords['menu.dashboard.label'] }}

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  mounted () {
    this.$store.dispatch('getWords')
  },
  computed: {
    ...mapGetters(['getWords'])
  }
}
</script>
