<template lang="pug">
  v-container(class="apps__section")
      v-layout(wrap class="card__row-title")
        v-flex(xs12)
          //- v-breadcrumbs(divider="/" large)
          //-   v-breadcrumbs-item {{ $t('dashboard_view.apps') }}
          apps-data-table(v-if="appsDataTable.length")
          template(v-else)
            loader-component
          app-remove-dialog
          app-network-configuration-dialog
          app-manage-network-profile-dialog
</template>



<script>
// Components imports
import AppsDataTable from '@/components/apps/AppDataTable'
import AppManageNetworkProfileDialog from '@/components/apps/AppManageNetworkProfileDialog'
import AppNetworkConfigurationDialog from '@/components/apps/AppNetworkConfigurationDialog'
import AppRemoveDialog from '@/components/apps/AppRemoveDialog'
import LoaderComponent from '@/components/LoaderComponent'
// Mixins imports
import accountMixin from '@/mixins/accountMixin'
import appMixin from '@/mixins/appMixin'
// Vuex imports
import { mapGetters } from 'vuex'

export default {
  name: 'apps-view',
  components: {
    AppsDataTable,
    AppManageNetworkProfileDialog,
    AppNetworkConfigurationDialog,
    AppRemoveDialog,
    LoaderComponent
  },
  computed: {
    ...mapGetters({
      appsDataTable: 'appsDataGetter'
    })
  },
  mixins: [
    accountMixin,
    appMixin
  ]
}
</script>






