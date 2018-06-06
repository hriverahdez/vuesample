<template lang="pug">
    v-container.dashboard__section
        v-layout(wrap).card__row-title
          v-flex(xs12)
            //- v-breadcrumbs(divider="/" large)
            //-   v-breadcrumbs-item Dashboard
            v-card
              //- v-card-title.title.headings--text {{ $t('dashboard_view.dashboard_title' )}}
              dashboard-tabs
            dashboard-data-table
</template>


<script>
import { mapActions, mapGetters } from 'vuex'
// Mixins
import accountMixin from '@/mixins/accountMixin'
import appMixin from '@/mixins/appMixin'
// Components imports
import DashboardDataTable from '@/components/dashboard/DashboardDataTable'
import DashboardTabs from '@/components/dashboard/DashboardTabs'
// Query imports
import { GET_DASHBOARD_REPORT_DATA } from '@/graphql/report'
import { GET_DATA_FILTERS } from '@/graphql/config'

export default {
  name: 'dashboard-view',
  computed: {
    ...mapGetters([
      'appFiltersGetter',
      'countryFiltersGetter',
      'dateGetter',
      'formatFiltersGetter',
      'groupedByGetter',
      'networkFiltersGetter'
    ])
  },
  components: {
    DashboardDataTable,
    DashboardTabs
  },
  mixins: [accountMixin, appMixin],
  apollo: {
    stats: {
      query: GET_DASHBOARD_REPORT_DATA,
      context: {
        uri: 'report'
      },
      variables () {
        return {
          groupBy: this.groupedByGetter,
          filter: {
            from: this.dateGetter.startDate,
            to: this.dateGetter.endDate,
            apps: this.appFiltersGetter,
            formats: this.formatFiltersGetter,
            networks: this.networkFiltersGetter,
            countries: this.countryFiltersGetter
          }
        }
      },
      loadingKey: 'loading',
      update (data) {
        this.statsDataAction(data.stats)
      }
    },
    config: {
      query: GET_DATA_FILTERS,
      context: {
        uri: 'config'
      },
      loadingKey: 'loading',
      update (data) {
        this.dashboardFiltersAction(data.config)
      }
    }
    // apps: {
    //   query: APP_DATA,
    //   context: {
    //     uri: 'app'
    //   },
    //   loadingKey: 'loading',
    //   update (data) {
    //     this.appDataAction(data.apps)
    //   }
    // }
  },
  methods: {
    ...mapActions([
      'dashboardFiltersAction',
      'statsDataAction'
    ])
  }
}
</script>



