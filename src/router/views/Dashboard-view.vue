<template lang="pug">
    v-container.dashboard__section
        v-layout(wrap).card__row-title
          v-flex(xs12)
            //- v-breadcrumbs(divider="/" large)
            //-   v-breadcrumbs-item Dashboard
            v-card
              //- v-card-title.title.headings--text {{ $t('dashboard_view.dashboard_title' )}}
              dashboard-tabs
            dashboard-data-table(v-if="loaderStatus === false")
            template(v-else)
              loader-component
</template>


<script>
import { mapGetters } from 'vuex'
// Mixins
import accountMixin from '@/mixins/accountMixin'
import appMixin from '@/mixins/appMixin'
import configMixin from '@/mixins/configMixin'
import reportMixin from '@/mixins/reportMixin'
// Components imports
import DashboardDataTable from '@/components/dashboard/DashboardDataTable'
import DashboardTabs from '@/components/dashboard/DashboardTabs'
import LoaderComponent from '@/components/LoaderComponent'

export default {
  name: 'dashboard-view',
  computed: {
    ...mapGetters({
      // date: 'dateGetter',
      dashboardDatatableData: 'dashboardDatatableDataWithFormattedLabelGetter',
      loaderStatus: 'dashboardLoaderStatusGetter'
    })
  },
  components: {
    DashboardDataTable,
    DashboardTabs,
    LoaderComponent
  },
  mixins: [accountMixin, appMixin, configMixin, reportMixin],
  created () {
    this.skipDashboardDataQuery = false
  }
}
</script>



