<template lang="pug">
    v-container(class="admin_users__section")
        v-layout(wrap class="card__row-title")
            v-flex(xs12)
                //- v-breadcrumbs(divider="/" large)
                //-   v-breadcrumbs-item {{ $t('navigation.accounts') }}
                admin-users-data-table(v-if="adminUsersDataTable.length")
                template(v-else)
                    loader-component

</template>

<script>

// Components
import AdminUsersDataTable from '@/components/adminusers/AdminUsersDataTable'
import LoaderComponent from '@/components/LoaderComponent'
// Mixins
import accountMixin from '@/mixins/accountMixin'
import appMixin from '@/mixins/appMixin'
import configMixin from '@/mixins/configMixin'
import userMixin from '@/mixins/userMixin'
// Vuex imports
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    AdminUsersDataTable,
    LoaderComponent
  },
  mixins: [accountMixin, configMixin, userMixin, appMixin],
  computed: {
    ...mapGetters({
      adminUsersDataTable: 'usersDataGetter'
    })
  },
  mounted () {
    this.skipAdminUsersQueryAction(false)
    this.skipQueryRolesAdminAction(false)
    this.$apollo.queries.accounts.skip = false
  },
  methods: {
    ...mapActions([
      'skipAdminUsersQueryAction',
      'skipQueryRolesAdminAction',
      'skipA'
    ])
  }

}
</script>
