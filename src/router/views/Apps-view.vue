<template lang="pug">
  v-container(class="apps__section")
      v-layout(wrap class="card__row-title")
        template(v-if="$apollo.queries.apps.loading")
          loader-component
        v-flex(xs12 v-else)
          //- v-breadcrumbs(divider="/" large)
          //-   v-breadcrumbs-item {{ $t('dashboard_view.apps') }}
          apps-data-table
            loader-component
          //- app-remove-dialog(v-if="$store.state.appModule.appRemoveDialogStatus")
          remove-dialog-component(v-if="$store.state.removeDialogModule.removeDialogStatus")
          app-network-configuration-dialog(v-if="$store.state.appModule.appNetworkConfigDialogStatus")
          app-manage-network-profile-dialog(v-if="$store.state.appModule.appManageNetworkProfileDialogStatus")
</template>

<script>
// Components imports
import AppsDataTable from '@/components/apps/AppDataTable'
import AppManageNetworkProfileDialog from '@/components/apps/AppManageNetworkProfileDialog'
import AppNetworkConfigurationDialog from '@/components/apps/AppNetworkConfigurationDialog'
// import AppRemoveDialog from '@/components/apps/AppRemoveDialog'
import LoaderComponent from '@/components/LoaderComponent'
import RemoveDialogComponent from '@/components/RemoveDialogComponent'
// Mixins imports
import accountMixin from '@/mixins/accountMixin'
import appMixin from '@/mixins/appMixin'
import configMixin from '@/mixins/configMixin'
// Vuex imports
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppsView',
  components: {
    AppsDataTable,
    AppManageNetworkProfileDialog,
    AppNetworkConfigurationDialog,
    // AppRemoveDialog,
    LoaderComponent,
    RemoveDialogComponent
  },
  mixins: [
    accountMixin,
    appMixin,
    configMixin
  ],
  computed: {
    ...mapGetters({
      appsDataTable: 'appsDataGetter',
      loaderStatus: 'appsLoaderStatusGetter'
    })
  },
  mounted () {
    this.skipQueryAccountByIdAction(false)
    this.skipQueryGetNetworksProfilesAction(false)
  },
  updated () {
    this.$apollo.queries.appByIdNetworkProfile.refetch()
  },
  methods: {
    ...mapActions([
      'skipQueryAccountByIdAction',
      'skipQueryGetNetworksProfilesAction'
    ])
  }
}
</script>
