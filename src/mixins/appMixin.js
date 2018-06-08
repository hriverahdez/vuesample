import { APP_DATA, CREATE_NEW_APP } from '@/graphql/app'
import { mapActions } from 'vuex'

const appMixin = {
  apollo: {
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
      'appDataAction',
      'appDialogStatusAction'
    ]),
    createApp (name, platform, bundle) {
      console.log('entraaaaaaaaaa')
      this.$apollo.mutate({
        mutation: CREATE_NEW_APP,
        context: {
          uri: 'app'
        },
        variables: {
          input: {
            name: name,
            platform: platform,
            bundle: bundle,
            account: '5b1a34e69a5fd6634e7690a2'
          }
        },
        update: (store, { data: { createApp } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: APP_DATA })
          // Add our tag from the mutation to the end
          data.app.push(createApp)
          // Write our data back to the cache.
          store.writeQuery({ query: APP_DATA, data })
        }
      })
      .then(() => {
        this.$apollo.queries.apps.refresh()
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('accounts_view.new_success'),
          buttonText: this.$t('buttons.close')
        })
      })
      this.appDialogStatusAction(false)
    }
  },
  mounted () {
    // Receive events from components
    this.$root.$on('createApp', (name, platform, bundle) => {
      this.createApp(name, platform, bundle)
    })
  },
  beforeDestroy () {
    this.$root.$off()
  }
}

export default appMixin
