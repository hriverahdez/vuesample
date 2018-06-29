<template lang="pug">
    v-container.dashboard__section
        v-layout(wrap).card__row-title
          template(v-if="$apollo.queries.networkStats.loading && $apollo.queries.datatableData.loading && $apollo.queries.filters.loading")
            loader-component
          v-flex(xs12 v-else)
            //- v-breadcrumbs(divider="/" large)
            //-   v-breadcrumbs-item Dashboard
            v-card
              //- v-card-title.title.headings--text {{ $t('dashboard_view.dashboard_title' )}}
              dashboard-tabs
            dashboard-data-table
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
      dashboardDatatableData: 'dashboardDatatableDataWithFormattedLabelGetter'
      // loaderStatus: 'dashboardLoaderStatusGetter'
    })
  },
  components: {
    DashboardDataTable,
    DashboardTabs,
    LoaderComponent
  },
  // methods: {
  //   ...mapActions(['skipDashboardDataQueryAction', 'skipDatatableDataQueryAction'])
  // },
  mixins: [accountMixin, appMixin, configMixin, reportMixin]
  // created () {
  //   this.skipDashboardDataQueryAction(false)
  //   this.skipDatatableDataQueryAction(false)
  // }
}
</script>



