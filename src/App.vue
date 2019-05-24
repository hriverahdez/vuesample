<template lang="pug">
  v-app(light)
    admin-navigation(v-if="checkIfVisibleDependingOnRoute()")
    v-content
      v-container(grid-list-xl text-xs-center align-content-center class="view__container")
        router-view
        account-dialog(v-if="$store.state.accountModule.accountDialogStatus")
        admin-user-form-dialog(v-if="$store.state.userModule.userDialogStatus")
        app-dialog(v-if="$store.state.appModule.appDialogStatus")
        dialog-alert
    v-layout(class="floating-button-container" v-if="checkIfVisibleDependingOnRoute()")
      floating-button(v-if="checkIsGranted")
    v-footer(class="footer-container blue_dark" v-if="checkIfVisibleDependingOnRoute()")
     span.copyright {{ $t('footer.copyright') }}

</template>

<script>
// Component imports
import AccountDialog from '@/components/accounts/AccountFormDialog'
import AdminNavigation from '@/components/navigation/AdminNavigation'
import AdminUserFormDialog from '@/components/adminusers/AdminUserFormDialog'
import AppDialog from '@/components/apps/AppFormDialog'
import DialogAlert from '@/components/DialogAlert'
import FloatingButton from '@/components/FloatingButton'

// Mixin imports
import securityMixin from '@/mixins/securityMixin'

export default {
  components: {
    AccountDialog,
    AdminNavigation,
    AdminUserFormDialog,
    AppDialog,
    DialogAlert,
    FloatingButton
  },
  mixins: [ securityMixin ],
  computed: {
    checkIsGranted () {
      return this.isGrantedComponent(['ROLE_ADMIN', 'ROLE_ACCOUNT_MANAGER', 'ROLE_MULTIACCOUNT_MANAGER'], this.$store)
    }
  },
  mounted () {
    console.log('entra app', process.env.API_BASE_URL)
  },
  methods: {
    checkIfVisibleDependingOnRoute () {
      if (this.$route.name === 'login' || this.$route.name === 'accounts_selection') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.view__container {
  max-width: 1600px;
}
.floating-button-container {
  position: fixed;
  bottom: 0;
  right: 0;
}
.footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.copyright {
  font-size: 10px;
}
.content--wrap {
  background: red!important;
}
</style>
