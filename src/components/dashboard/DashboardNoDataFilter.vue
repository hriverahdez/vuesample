<template lang="pug">
  div(class="no-data")
    v-icon report_problem
    div(class="no-data__text") {{ $t('validations.no_data_available') }}
</template>

<script>
export default {
  name: 'dashboard-no-data-filter'
}
</script>

<style lang="scss">
.no-data {
  display: flex;
  background: #ff5252;
  padding: 10px;
  color: #fff;

  &__text {
    width: 90%;
  }
}
</style>


