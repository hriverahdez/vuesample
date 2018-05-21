<template lang="pug">
  v-app(light)
    admin-navigation
    v-content
      v-container(grid-list-md text-xs-center align-content-center).dashboard__container
        router-view
        account-dialog
    v-layout(class="floating-button-container")
      floating-button
    //- v-footer(app)


</template>

<script>
  import AccountDialog from '@/components/dialogs/AccountFormDialog'
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
.floating-button-container {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>


