<template lang="pug">
    v-container.dashboard__section
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
  import { mapActions, mapGetters, mapMutations } from 'vuex'
  // Components imports
  import DashboardDataTable from '@/components/dashboard/DashboardDataTable'
  import DashboardTabs from '@/components/dashboard/DashboardTabs'
  // Query imports
  import { APP_DATA } from '@/graphql/app'
  import { GET_DASHBOARD_REPORT_DATA } from '@/graphql/report'
  import { GET_DATA_FILTERS } from '@/graphql/config'
  import { CREATE_NEW_ACCOUNT, GET_ACCOUNTS } from '@/graphql/account'

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
              countries: this.countryFiltersGetter
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
      },
      apps: {
        query: APP_DATA,
        context: {
          uri: 'app'
        },
        loadingKey: 'loading',
        update (data) {
          this.appDataAction(data.apps)
        }
      }
    },
    methods: {
      ...mapActions([
        'accountDialogStatusAction',
        'accountSchemaAction',
        'appDataAction',
        'dashboardFiltersAction',
        'statsDataAction'
      ]),
      ...mapMutations(['SET_ALERT_MESSAGE']),
      createAccount (name, description, disabled) {
        this.$apollo.mutate({
          mutation: CREATE_NEW_ACCOUNT,
          context: {
            uri: 'account'
          },
          variables: {
            input: {
              name: name,
              description: description,
              disabled: disabled || false
            }
          },
          update: (store, { data: { createAccount } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: GET_ACCOUNTS })
            // Add our tag from the mutation to the end
            data.accounts.push(createAccount)
            // Write our data back to the cache.
            store.writeQuery({ query: GET_ACCOUNTS, data })
          }
        })
        .then(() => {
          this.SET_ALERT_MESSAGE({
            show: true,
            type: 'success',
            message: this.$t('accounts_view.new_success'),
            buttonText: this.$t('buttons.close')
          })
        })
        this.accountDialogStatusAction(false)
        this.accountSchemaAction({
          name: '',
          description: '',
          disabled: ''
        })
      }
    },
    mounted () {
      // Receive events from components
      this.$root.$on('createAccount', (name, description, disabled) => {
        this.createAccount(name, description, disabled)
      })
      this.$root.$on('deleteAccount', (account) => {
        this.deleteAccount(account)
      })
      this.$root.$on('editAccount', (id, name, description, disabled) => {
        this.editAccount(id, name, description, disabled)
      })
    },
    beforeDestroy () {
      this.$root.$off()
    }
  }
</script>



