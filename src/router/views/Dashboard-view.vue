<template lang="pug">
    section.dashboard__section
        v-layout(wrap).card__row-title
          v-flex(xs12)
            v-breadcrumbs(divider="/" large)
              v-breadcrumbs-item Dashboard
            v-card
              //- v-card-title.title.headings--text {{ $t('dashboard_view.dashboard_title' )}}
              dashboard-tabs
            dashboard-data-table
</template>


<script>
  import DashboardDataTable from '@/components/dashboard/DashboardDataTable'
  import DashboardTabs from '@/components/dashboard/DashboardTabs'
  import { GET_DASHBOARD_REPORT_DATA } from '@/graphql/report'
  import { GET_DATA_FILTERS } from '@/graphql/config'
  import { mapActions, mapGetters } from 'vuex'

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
              countries: this.countryCodesGetter
            }
          }
        },
        // pollInterval: 100,
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
        // pollInterval: 100,
        loadingKey: 'loading',
        update (data) {
          this.dashboardFiltersAction(data.config)
        }
      }
    },
    methods: {
      ...mapActions([
        'statsDataAction',
        'dashboardFiltersAction'
      ])
    }
  }
</script>



