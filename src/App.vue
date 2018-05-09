<template lang="pug">
  v-app(light)
    admin-navigation
    v-content
      v-container(grid-list-md text-xs-center align-content-start).dashboard__container
          v-layout(row wrap align-content-start)
          router-view
    account-dialog
    floating-button
    //- v-footer(app)


</template>

<script>
  import AccountDialog from '@/components/forms/AccountDialog'
  import AdminNavigation from '@/components/navigation/AdminNavigation'
  import FloatingButton from '@/components/FloatingButton'

  export default {
    components: {
      AccountDialog,
      AdminNavigation,
      FloatingButton
    }
  }
</script>

<style lang="scss" scoped>
.container {
  padding: 30px;
}
</style>


