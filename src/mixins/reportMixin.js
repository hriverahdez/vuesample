import {
  GET_DASHBOARD_REPORT_DATA,
  GET_DASHBOARD_DATATABLE_DATA
  } from '@/graphql/report'
import { mapGetters, mapActions } from 'vuex'

const URI = 'report'

const reportMixin = {
  apollo: {
    networkStats: {
      query: GET_DASHBOARD_REPORT_DATA,
      context: {
        uri: URI
      },
      variables () {
        return {
          accountId: this.accountIdGetter,
          groupBy: this.groupByGetter,
          filter: {
            // from: '2018-02-01',
            // to: '2018-02-10',
            from: this.dateGetter.startDate,
            to: this.dateGetter.endDate,
            app: this.appIdFiltersGetter,
            format: this.formatIdFiltersGetter,
            source: this.netwworkIdFiltersGetter,
            country: this.countryIdFiltersGetter
          }
        }
      },
      // skip () {
      //   return this.skipDashboardDataQueryGetter
      // },
      loadingKey: 'loading',
      update (data) {
        this.statsDataAction(data.networkStats).then(() => {
          // Loader control
          this.dashboardLoaderStatusAction(false)
          // Stop Query
          // this.skipDashboardDataQueryAction(true)
        })
      }
    },
    datatableData: {
      query: GET_DASHBOARD_DATATABLE_DATA,
      context: {
        uri: URI
      },
      variables () {
        return {
          accountId: this.accountIdGetter,
          groupBy: this.datatableGroupByGetter,
          filter: {
            // from: '2018-02-01',
            // to: '2018-02-10',
            from: this.dateGetter.startDate,
            to: this.dateGetter.endDate,
            app: this.appIdFiltersGetter,
            format: this.formatIdFiltersGetter,
            source: this.netwworkIdFiltersGetter,
            country: this.countryIdFiltersGetter
          }
        }
      },
      // skip () {
      //   return this.skipDatatableDataQueryGetter
      // },
      loadingKey: 'loading',
      update (data) {
        this.datatableDataAction(data.networkStats)
        // Stop Query
        // this.skipDatatableDataQueryAction(true)
      }
    }
  },
  computed: {
    ...mapGetters([
      'appIdFiltersGetter',
      'accountIdGetter',
      // 'countryFiltersGetter',
      'countryIdFiltersGetter',
      'datatableGroupByGetter',
      'dateGetter',
      'formatFiltersGetter',
      'formatIdFiltersGetter',
      'groupByGetter',
      // 'networkFiltersGetter',
      'netwworkIdFiltersGetter',
      'skipDashboardDataQueryGetter',
      'skipDatatableDataQueryGetter'
    ])
  },
  methods: {
    ...mapActions([
      'statsDataAction',
      'dashboardLoaderStatusAction',
      'datatableDataAction'
      // 'skipDashboardDataQueryAction',
      // 'skipDatatableDataQueryAction'
    ])
  }
  // mounted () {
  //   // Receive events from components
  //   this.$root.$on('createAccount', (name, description, disabled) => {
  //     this.createAccount(name, description, disabled)
  //   })
  //   this.$root.$on('deleteAccount', (account) => {
  //     this.deleteAccount(account)
  //   })
  //   this.$root.$on('editAccount', (id, name, description, disabled) => {
  //     this.editAccount(id, name, description, disabled)
  //   })
  // },
  // beforeDestroy () {
  //   this.$root.$off()
  // }
}

export default reportMixin
