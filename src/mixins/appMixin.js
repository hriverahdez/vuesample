import {
  APP_DATA_BY_ID,
  APP_DATA_BY_ID_AND_NETWORK,
  APPS_IDS_AND_NAMES_BY_ACCOUNT_ID,
  APPS_DATA,
  CREATE_NEW_APP,
  DELETE_APP,
  ENABLE_DISABLE_APP,
  UPDATE_APP,
  UPDATE_APP_NETWORK
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
    appByIdNetworkProfile: {
      query: APP_DATA_BY_ID_AND_NETWORK,
      context: {
        uri: URI
      },
      variables () {
        return {
          _id: this.appAndNetworkData.appId,
          _idAccount: this.accountId,
          _IdNetwork: parseInt(this.appAndNetworkData.networkName.id),
          _profileName: 'default'
        }
      },
      skip () {
        return this.skipAppByIdAndNetworkQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.appByIdAndNetworkDataAction(data.appByIdNetworkProfile)
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
      appAndNetworkData: 'selectedAppNetworkInDatatableGetter',
      // skipAppById: 'skipAppByIdQueryGetter',
      skipAppByIdAndNetworkQuery: 'skipAppByIdAndNetworkGetter'
    })
  },
  methods: {
    ...mapActions([
      // 'appByIdDataAction',
      'appByIdAndNetworkDataAction',
      'appDataAction',
      'appDialogStatusAction',
      'appIdAction',
      'appsNamesAndIdsAction',
      'appRemoveDialogStatusAction',
      'appSchemaAction',
      'appsLoaderStatusAction',
      'editedAppIndexStatusAction',
      'removeAppPermissionInputAction',
      'skipAppByIdAndNetworkQueryAction'
    ]),
    createApp (name, platform, bundle, description, bannerPosition, icon) {
      this.$apollo.mutate({
        mutation: CREATE_NEW_APP,
        context: {
          uri: URI
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
          const data = store.readQuery({
            query: APPS_DATA,
            variables: { _idAccount: this.accountId }
          })
          // Add our tag from the mutation to the end
          data.apps.push(createApp)
          // Write our data back to the cache.
          store.writeQuery({
            query: APPS_DATA,
            data,
            variables: { _idAccount: this.accountId }
          })
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
          uri: URI
        },
        variables: {
          _id: app
        },
        update: (store) => {
          const data = store.readQuery({
            query: APPS_DATA,
            variables: { _idAccount: this.accountId }
          })
          data.apps = data.apps.filter((item) => {
            return item._id !== app
          })
          store.writeQuery({
            query: APPS_DATA,
            data,
            variables: { _idAccount: this.accountId }
          })
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
    editApp (id, name, platform, bundle, description, bannerPosition, icon) {
      this.$apollo.mutate({
        mutation: UPDATE_APP,
        context: {
          uri: URI
        },
        variables: {
          _id: id,
          input: {
            name,
            platform
          }
        },
        update: (store) => {
          const data = store.readQuery({
            query: APPS_DATA,
            variables: { _idAccount: this.accountId }
          })
          data.apps.map((item) => {
            if (item._id === id) {
              item.name = name
              item.description = description
            }
          })
          store.writeQuery({
            query: APPS_DATA,
            data,
            variables: { _idAccount: this.accountId }
          })
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
    },
    enableDisableApp (_id, platform, status) {
      this.$apollo.mutate({
        mutation: ENABLE_DISABLE_APP,
        context: {
          uri: URI
        },
        variables: {
          _id,
          input: {
            disabled: status,
            platform
          }
        },
        update: (store) => {
          const data = store.readQuery({
            query: APPS_DATA,
            variables: { _idAccount: this.accountId }
          })
          data.apps.map((item) => {
            if (item._id === _id) {
              item.disabled = status
            }
          })
          store.writeQuery({
            query: APPS_DATA,
            data,
            variables: { _idAccount: this.accountId }
          })
        }
      })
      .then(() => {
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('apps_view.updated_app_status'),
          buttonText: this.$t('buttons.close')
        })
      })
    },
    updateAppNetwork (appId, networkId, profile) {
      this.$apollo.mutate({
        mutation: UPDATE_APP_NETWORK,
        context: {
          uri: URI
        },
        variables: {
          idApp: appId,
          idAccount: this.accountId,
          idNetwork: networkId,
          idProfile: profile,
          input: {
            active: false,
            profile: 'default',
            formats: [{
              format: 'interstitial',
              active: false,
              premium: false,
              formatFields: [{
                key: 'id',
                value: 'Lemmyyyyyyyyyyyy'
              }, {
                key: 'appId',
                value: 'bottom'
              }]
            },
            {
              format: 'rewarded_video',
              active: true,
              premium: true,
              formatFields: [{
                key: 'id',
                value: 'AleeMar'
              }, {
                key: 'appId',
                value: 'top-right'
              }]
            }]
          }
        },
        update: (store) => {
          const data = store.readQuery({
            query: APPS_DATA,
            variables: { _idAccount: this.accountId }
          })
          data.apps.map((item) => {
            if (item._id === '5b10f0d89a5fd624626b8e78') {
              item.networks[0].formats[0].formatFields[0].value = 'Lemmyyyyyyyyyyyy'
            }
          })
          store.writeQuery({
            query: APPS_DATA,
            data,
            variables: { _idAccount: this.accountId }
          })
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
    this.$root.$on('editApp', (id, name, platform, bundle, description, bannerPosition, icon) => {
      this.editApp(id, name, platform, bundle, description, bannerPosition, icon)
    })
    this.$root.$on('enableDisableApp', (_id, platform, status) => {
      this.enableDisableApp(_id, platform, !status)
    })
    this.$root.$on('updateAppNetworkProfile', (appId, networkId, profile, input) => {
      console.log(input)
      // this.updateAppNetwork(appId, networkId, profile, input)
    })
  },
  beforeDestroy () {
    this.$root.$off()
  }
}

export default appMixin
