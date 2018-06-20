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
            app: this.appFiltersGetter,
            format: this.formatFiltersGetter,
            source: this.networkFiltersGetter,
            country: this.countryFiltersGetter.name
          }
        }
      },
      skip () {
        return this.skipDashboardDataQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.statsDataAction(data.networkStats).then(() => {
          // Loader control
          this.dashboardLoaderStatusAction(false)
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
            app: this.appFiltersGetter,
            format: this.formatFiltersGetter,
            source: this.networkFiltersGetter,
            country: this.countryFiltersGetter.name
          }
        }
      },
      skip () {
        return this.skipDatatableDataQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.datatableDataAction(data.networkStats)
      }
    }
  },
  data () {
    return {
      skipDashboardDataQuery: true,
      skipDatatableDataQuery: true
    }
  },
  computed: {
    ...mapGetters([
      'appFiltersGetter',
      'accountIdGetter',
      'countryFiltersGetter',
      'datatableGroupByGetter',
      'dateGetter',
      'formatFiltersGetter',
      'groupByGetter',
      'networkFiltersGetter'
    ])
  },
  methods: {
    ...mapActions([
      'statsDataAction',
      'dashboardLoaderStatusAction',
      'datatableDataAction'
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
