<template lang="pug">
  v-dialog(v-model="dialog" persistent width="300" content-class="loading")
    v-card(tile)
      v-card-text
        div(class="text-xs-center")
          v-progress-circular(indeterminate color="loader")
        div(class="text-xs-center loading-text") {{ $t('loader.loading_text')}}
</template>

<script>
export default {
  name: 'loader-component',
  data: () => ({
    dialog: true
  })
}
</script>


<style lang="scss">
.loading {
  background: transparent!important;
  box-shadow: none;
  .card {
    background: transparent!important;
    box-shadow: none;
  }
}
.loading-text {
  color: white;
}
</style>


