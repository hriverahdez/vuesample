<template lang="pug">
  h1 Dashboard
</template>

<script>
import axios from 'axios'

export default {
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
