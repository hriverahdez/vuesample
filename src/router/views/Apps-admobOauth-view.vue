<template lang="pug">
</template>
<script>

// Vuex imports
import querystring from 'querystring'
import axios from 'axios'
export default {
  mounted () {
    console.log('mounted')
    console.log('active account admob', localStorage.getItem('admobAccount'))
    console.log('admob profile', localStorage.getItem('admobProfile'))
    this.endpointPost()
  },
  methods: {
    async endpointPost () {
      console.log('active account admob', localStorage.getItem('admobAccount'))
      console.log('admob profile', localStorage.getItem('admobProfile'))
      console.log('doing get')
      const params = {
        code: this.$router.history.current.query.code,
        account: localStorage.getItem('admobAccount'),
        profile: localStorage.getItem('admobProfile')
      }
      console.log('params to get', params)
      const url = `http://139.59.191.152:8550/oauth2callback?${querystring.stringify(params)}`
      axios.get(url).then((response) => {
        console.log('respuestaaar', response)
        localStorage.removeItem('admobAccount')
        localStorage.removeItem('admobProfile')
      })
        .catch((error) => console.log('error', error))
      await setTimeout(() => window.close(), 10000)
    }
  }
}
</script>

<style lang="scss" scoped>
.accounts__section__card .card {
  border-top: 3px solid #BDD0FB;
}
</style>

