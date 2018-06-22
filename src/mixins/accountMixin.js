import {
  CREATE_NEW_ACCOUNT,
  CREATE_ACCOUNT_NETWORK_INTEGRATION_1003,
  GET_ACCOUNTS,
  DELETE_ACCOUNT,
  UPDATE_ACCOUNT,
  NETWORK_PROFILES_ADCOLONY,
  NETWORK_PROFILES_ADMOB,
  NETWORK_PROFILES_APPLOVIN,
  NETWORK_PROFILES_CHARTBOOST,
  NETWORK_PROFILES_INMOBI,
  NETWORK_PROFILES_IRONSOURCE,
  NETWORK_PROFILES_MOBUSI,
  NETWORK_PROFILES_MOBVISTA,
  NETWORK_PROFILES_MOPUB,
  NETWORK_PROFILES_STARTAPP,
  NETWORK_PROFILES_UNITYADS,
  NETWORK_PROFILES_VUNGLE
} from '@/graphql/account'
import { mapMutations, mapActions, mapGetters } from 'vuex'

const URI = 'account'

const accountMixin = {
  apollo: {
    accounts: {
      query: GET_ACCOUNTS,
      context: {
        uri: URI
      },
      loadingKey: 'loading',
      update (data) {
        this.accountsDataAction(data.accounts).then(() => {
          this.accountsLoaderStatusAction(false)
        })
      }
    },
    // ADMOB QUERY
    networkProfilesAdmob: {
      query: NETWORK_PROFILES_ADMOB,
      context: {
        uri: URI
      },
      variables () {
        return {
          filter: {
            filter: {
              _id: this.accountId
            }
          }
        }
      },
      skip () {
        return this.skipNetworkProfilesAdmobQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accounts)
      }
    },
    // ADCOLONY QUERY
    networkProfilesAdcolony: {
      query: NETWORK_PROFILES_ADCOLONY,
      context: {
        uri: URI
      },
      variables () {
        return {
          filter: {
            filter: {
              _id: this.accountId
            }
          }
        }
      },
      skip () {
        return this.skipNetworkProfilesAdcolonyQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accounts)
      }
    },
    // APPLOVIN QUERY
    networkProfilesApplovin: {
      query: NETWORK_PROFILES_APPLOVIN,
      context: {
        uri: URI
      },
      variables () {
        return {
          filter: {
            filter: {
              _id: this.accountId
            }
          }
        }
      },
      skip () {
        return this.skipNetworkProfilesApplovinQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accounts)
      }
    },
    // CHARTBOOST QUERY
    networkProfilesChartboost: {
      query: NETWORK_PROFILES_CHARTBOOST,
      context: {
        uri: URI
      },
      variables () {
        return {
          filter: {
            filter: {
              _id: this.accountId
            }
          }
        }
      },
      skip () {
        return this.skipNetworkProfilesChartboostQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accounts)
      }
    },
    // INMOBI QUERY
    networkProfilesInmobi: {
      query: NETWORK_PROFILES_INMOBI,
      context: {
        uri: URI
      },
      variables () {
        return {
          filter: {
            filter: {
              _id: this.accountId
            }
          }
        }
      },
      skip () {
        return this.skipNetworkProfilesInmobiQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accounts)
      }
    },
    // IRONSOURCE QUERY
    networkProfilesIronsource: {
      query: NETWORK_PROFILES_IRONSOURCE,
      context: {
        uri: URI
      },
      variables () {
        return {
          filter: {
            filter: {
              _id: this.accountId
            }
          }
        }
      },
      skip () {
        return this.skipNetworkProfilesIronsourceQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accounts)
      }
    },
    // MOBUSI QUERY
    networkProfilesMobusi: {
      query: NETWORK_PROFILES_MOBUSI,
      context: {
        uri: URI
      },
      variables () {
        return {
          filter: {
            filter: {
              _id: this.accountId
            }
          }
        }
      },
      skip () {
        return this.skipNetworkProfilesMobusiQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accounts)
      }
    },
    // MOBVISTA QUERY
    networkProfilesMobvista: {
      query: NETWORK_PROFILES_MOBVISTA,
      context: {
        uri: URI
      },
      variables () {
        return {
          filter: {
            filter: {
              _id: this.accountId
            }
          }
        }
      },
      skip () {
        return this.skipNetworkProfilesMobvistaQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accounts)
      }
    },
    // MOPUB QUERY
    networkProfilesMopub: {
      query: NETWORK_PROFILES_MOPUB,
      context: {
        uri: URI
      },
      variables () {
        return {
          filter: {
            filter: {
              _id: this.accountId
            }
          }
        }
      },
      skip () {
        return this.skipNetworkProfilesMopubQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accounts)
      }
    },
    // STARTAPP QUERY
    networkProfilesStartapp: {
      query: NETWORK_PROFILES_STARTAPP,
      context: {
        uri: URI
      },
      variables () {
        return {
          filter: {
            filter: {
              _id: this.accountId
            }
          }
        }
      },
      skip () {
        return this.skipNetworkProfilesStartappQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accounts)
      }
    },
    // UNITYADS QUERY
    networkProfilesUnityads: {
      query: NETWORK_PROFILES_UNITYADS,
      context: {
        uri: URI
      },
      variables () {
        return {
          filter: {
            filter: {
              _id: this.accountId
            }
          }
        }
      },
      skip () {
        return this.skipNetworkProfilesUnityadsQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accounts)
      }
    },
    // UNITYADS QUERY
    networkProfilesVungle: {
      query: NETWORK_PROFILES_VUNGLE,
      context: {
        uri: URI
      },
      variables () {
        return {
          filter: {
            filter: {
              _id: this.accountId
            }
          }
        }
      },
      skip () {
        return this.skipNetworkProfilesVungleQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accounts)
      }
    }
  },
  data () {
    return {
      skipNetworkProfilesAdmobQuery: true,
      skipNetworkProfilesAdcolonyQuery: true,
      skipNetworkProfilesApplovinQuery: true,
      skipNetworkProfilesChartboostQuery: true,
      skipNetworkProfilesInmobiQuery: true,
      skipNetworkProfilesIronsourceQuery: true,
      skipNetworkProfilesMobusiQuery: true,
      skipNetworkProfilesMobvistaQuery: true,
      skipNetworkProfilesMopubQuery: true,
      skipNetworkProfilesStartappQuery: true,
      skipNetworkProfilesUnityadsQuery: true,
      skipNetworkProfilesVungleQuery: true
    }
  },
  computed: {
    ...mapGetters({
      accountId: this.activeAccount
    })
  },
  methods: {
    ...mapActions([
      'accountsDataAction',
      'accountDialogStatusAction',
      'accountsLoaderStatusAction',
      'accountSchemaAction',
      'editedIndexStatusAction',
      'networkProfilesDataAction'
    ]),
    ...mapMutations(['SET_ALERT_MESSAGE']),
    // Create account mutation
    createAccount (name, description, disabled) {
      this.$apollo.mutate({
        mutation: CREATE_NEW_ACCOUNT,
        context: {
          uri: URI
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
        this.$apollo.queries.accounts.refresh()
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
    },
    // Delete account mutation
    deleteAccount (account) {
      this.$apollo.mutate({
        mutation: DELETE_ACCOUNT,
        context: {
          uri: URI
        },
        variables: {
          ids: account._id
        },
        update: (store) => {
          const data = store.readQuery({ query: GET_ACCOUNTS })
          data.accounts = data.accounts.filter((item) => {
            return item._id !== account._id
          })
          store.writeQuery({ query: GET_ACCOUNTS, data })
        }
      })
    },
    editAccount (id, name, description, disabled) {
      this.$apollo.mutate({
        mutation: UPDATE_ACCOUNT,
        context: {
          uri: URI
        },
        variables: {
          id: id,
          input: {
            name: name,
            description: description,
            disabled: disabled
          }
        },
        update: (store) => {
          const data = store.readQuery({ query: GET_ACCOUNTS })
          data.accounts.map((item) => {
            if (item._id === id) {
              item.description = description
              item.disabled = disabled
            }
          })
          store.writeQuery({ query: GET_ACCOUNTS, data })
        }
      })
      .then(() => {
        this.editedIndexStatusAction(-1)
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('accounts_view.edit_success'),
          buttonText: this.$t('buttons.close')
        })
        this.accountDialogStatusAction(false)
        this.accountSchemaAction({
          name: '',
          description: '',
          disabled: ''
        })
      })
    },
    createAccountNetworkIntegration1003 () {
      this.$apollo.mutate({
        mutation: CREATE_ACCOUNT_NETWORK_INTEGRATION_1003,
        context: {
          uri: URI
        },
        variables: {
          input: {
            accountId: this.accountId,
            profiles: [
              {
                name: 'pipiopioipioipioipioi',
                default: true,
                api_key: 'Lemmyyyyyyyyyyy'
              }
            ]
          }
        },
        update: (store, { data: { createAccountNetworkIntegration1003 } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesAdcolonyQuery = false
          this.$apollo.queries.networkProfilesAdcolony.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_ADCOLONY,
            variables: {
              filter: {
                filter: {
                  _id: this.accountId
                }
              }
            }
          })
          // Add our tag from the mutation to the end
          data.accounts.push(createAccountNetworkIntegration1003)
          // Write our data back to the cache.
          store.writeQuery({
            query: NETWORK_PROFILES_ADCOLONY,
            data,
            variables: {
              filter: {
                filter: {
                  _id: this.accountId
                }
              }
            }
          })
          console.log('entraquery')
        }
      })
      // .then(() => {
      //   this.editedIndexStatusAction(-1)
      //   this.SET_ALERT_MESSAGE({
      //     show: true,
      //     type: 'success',
      //     message: this.$t('accounts_view.edit_success'),
      //     buttonText: this.$t('buttons.close')
      //   })
      //   this.accountDialogStatusAction(false)
      //   this.accountSchemaAction({
      //     name: '',
      //     description: '',
      //     disabled: ''
      //   })
      // })
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
    this.$root.$on('launchNetworkProfilesQuery', (networkName) => {
      let formattedName = networkName.charAt(0).toUpperCase() + networkName.slice(1).toLowerCase()
      let skipVar = `skipNetworkProfiles${formattedName}Query`
      let queryName = `networkProfiles${formattedName}`
      this[skipVar] = false
      this.$apollo.queries[queryName].refetch()
    })
    // createAccountNetworkIntegration events
    this.$root.$on('createAccountNetworkIntegration', (profileName) => {
      console.log('entra', profileName)
      // this.createAccountNetworkIntegration1003()
    })
  },
  beforeDestroy () {
    this.$root.$off()
  }
}

export default accountMixin
