import {
  APP_DATA_BY_ID,
  APPS_IDS_AND_NAMES_BY_ACCOUNT_ID,
  APPS_DATA,
  CREATE_NEW_APP,
  DELETE_APP,
  UPDATE_APP
} from '@/graphql/app'
import { mapActions, mapGetters } from 'vuex'

const URI = 'app'

const appMixin = {
  apollo: {
    apps: {
      query: APPS_DATA,
      context: {
        uri: URI
      },
      variables () {
        return {
          _idAccount: this.accountId
        }
      },
      loadingKey: 'loading',
      update (data) {
        console.log(data)
        this.appDataAction(data.apps).then(() => {
          this.appsLoaderStatusAction(false)
        })
      }
    },
    appById: {
      query: APP_DATA_BY_ID,
      context: {
        uri: URI
      },
      variables: {
        _id: this.accountId
      },
      skip () {
        return this.skipAppById
      },
      loadingKey: 'loading',
      update (data) {
        this.appByIdDataAction(data.appById)
      }
    },
    appsNamesAndIds: {
      query: APPS_IDS_AND_NAMES_BY_ACCOUNT_ID,
      context: {
        uri: URI
      },
      variables () {
        return {
          _idAccount: this.accountId
        }
      },
      loadingKey: 'loading',
      update (data) {
        this.appsNamesAndIdsAction(data.apps)
      }
    }
  },
  computed: {
    ...mapGetters({
      accountId: 'activeAccount',
      skipAppById: 'skipAppByIdQueryGetter'
    })
  },
  methods: {
    ...mapActions([
      'appByIdDataAction',
      'appDataAction',
      'appDialogStatusAction',
      'appIdAction',
      'appsNamesAndIdsAction',
      'appRemoveDialogStatusAction',
      'appSchemaAction',
      'appsLoaderStatusAction',
      'editedAppIndexStatusAction',
      'removeAppPermissionInputAction'
    ]),
    createApp (name, platform, bundle, description, bannerPosition, icon) {
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
            description: description,
            bannerPosition: bannerPosition,
            icon: icon,
            account: this.accountId
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
        platform: '',
        bundle: '',
        description: '',
        banner_position: '',
        icon: ''
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
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('apps_view.delete_app'),
          buttonText: this.$t('buttons.close')
        })
        this.appRemoveDialogStatusAction(false)
        this.removeAppPermissionInputAction('')
      })
    },
    editApp (id, name, description) {
      this.$apollo.mutate({
        mutation: UPDATE_APP,
        context: {
          uri: 'app'
        },
        variables: {
          _id: id,
          input: {
            name: name,
            description: description
          }
        },
        update: (store) => {
          const data = store.readQuery({ query: APPS_DATA })
          data.apps.map((item) => {
            if (item._id === id) {
              item.name = name
              item.description = description
            }
          })
          store.writeQuery({ query: APPS_DATA, data })
        }
      })
      .then(() => {
        this.editedAppIndexStatusAction(-1)
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('apps_view.edit_success'),
          buttonText: this.$t('buttons.close')
        })
        this.appDialogStatusAction(false)
        this.appSchemaAction({
          name: '',
          description: '',
          disabled: ''
        })
      })
    }
  },
  mounted () {
    // Receive events from components
    this.$root.$on('createApp', (name, platform, bundle, description, bannerPosition, icon) => {
      this.createApp(name, platform, bundle, description, bannerPosition, icon)
    })
    this.$root.$on('deleteApp', (app) => {
      this.deleteApp(app)
      this.appIdAction('')
    })
    this.$root.$on('editApp', (id, name, description) => {
      this.editApp(id, name, description)
    })
  },
  beforeDestroy () {
    this.$root.$off()
  }
}

export default appMixin
