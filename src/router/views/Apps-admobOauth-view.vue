<template lang="pug">
</template>
<script>

// Vuex imports
import axios from 'axios'
import querystring from 'querystring'
export default {
  mounted () {
    this.endpointPost()
  },
  methods: {
    async endpointPost () {
      const params = {
        code: this.$router.history.current.query.code,
        admobAccount: localStorage.getItem('admobAccount'),
        admobProfile: localStorage.getItem('admobProfile')
      }
      // TO DO Poner una espera activa mientras se carga la página
      console.log('params to get', params)
      const url = `http://stage.do.linkitox.com/admob/grant`
      axios.post(url, querystring.stringify(params)).then((response) => {
        localStorage.removeItem('admobAccount')
        localStorage.removeItem('admobProfile')
        window.close()
      })
        .catch((error) => console.log('error', error))
    }
  }
}
</script>

<style lang="scss" scoped>
.accounts__section__card .card {
  border-top: 3px solid #BDD0FB;
}
</style>
