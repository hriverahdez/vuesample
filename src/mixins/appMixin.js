import { APPS_DATA, CREATE_NEW_APP, DELETE_APP } from '@/graphql/app'
import { mapActions } from 'vuex'

const appMixin = {
  apollo: {
    apps: {
      query: APPS_DATA,
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
      'appDialogStatusAction',
      'appIdAction',
      'appRemoveDialogStatusAction',
      'appSchemaAction',
      'removeAppPermissionInputAction'
    ]),
    createApp (name, platform, bundle) {
      this.$apollo.mutate({
        mutation: CREATE_NEW_APP,
        context: {
          uri: 'app'
        },
        variables: {
          input: {
            name: name,
            bundle: bundle,
            platform: platform,
            account: '5b1a34e69a5fd6634e7690a2'
          }
        },
        update: (store, { data: { createApp } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: APPS_DATA })
          // Add our tag from the mutation to the end
          data.apps.push(createApp)
          // Write our data back to the cache.
          store.writeQuery({ query: APPS_DATA, data })
        }
      })
      .then(() => {
        this.$apollo.queries.apps.refresh()
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('apps_view.new_success'),
          buttonText: this.$t('buttons.close')
        })
      })
      this.appDialogStatusAction(false)
      this.appSchemaAction({
        name: '',
        bundle: '',
        platform: '',
        URL: '',
        description: ''
      })
    },
    // Delete App mutation
    deleteApp (app) {
      this.$apollo.mutate({
        mutation: DELETE_APP,
        context: {
          uri: 'app'
        },
        variables: {
          _id: app
        },
        update: (store) => {
          const data = store.readQuery({ query: APPS_DATA })
          data.apps = data.apps.filter((item) => {
            return item._id !== app
          })
          store.writeQuery({ query: APPS_DATA, data })
        }
      }).then(() => {
        this.appRemoveDialogStatusAction(false)
        this.removeAppPermissionInputAction('')
      })
    }
  },
  mounted () {
    // Receive events from components
    this.$root.$on('createApp', (name, platform, bundle) => {
      this.createApp(name, platform, bundle)
    })
    this.$root.$on('deleteApp', (app) => {
      this.deleteApp(app)
      this.appIdAction('')
    })
  },
  beforeDestroy () {
    this.$root.$off()
  }
}

export default appMixin
