<template lang="pug">
  v-app(light)
    admin-navigation
    v-content
      v-container(grid-list-xl text-xs-center align-content-center).dashboard__container
        router-view
        account-dialog
        dialog-alert
    v-layout(class="floating-button-container")
      floating-button
    //- v-footer(app)


</template>

<script>
  import AccountDialog from '@/components/accounts/AccountFormDialog'
  import AdminNavigation from '@/components/navigation/AdminNavigation'
  import DialogAlert from '@/components/DialogAlert'
  import FloatingButton from '@/components/FloatingButton'

  export default {
    components: {
      AccountDialog,
      AdminNavigation,
      DialogAlert,
      FloatingButton
    }
  }
</script>

<style lang="scss" scoped>
.dashboard__container {
  max-width: 1400px;
}
.floating-button-container {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>


