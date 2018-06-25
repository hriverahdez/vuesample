import {
  CREATE_NEW_ACCOUNT,
  CREATE_ACCOUNT_NETWORK_INTEGRATION_1003,
  CREATE_ACCOUNT_NETWORK_INTEGRATION_1008,
  GET_ACCOUNTS,
  DELETE_ACCOUNT,
  DELETE_NETWORK_PROFILE,
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
  NETWORK_PROFILES_VUNGLE,
  UPDATE_NETWORK_1003_PROFILE,
  UPDATE_NETWORK_1008_PROFILE
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
      accountId: this.activeAccount,
      selectedNetworkId: 'selectedNetworkIdToManageGetter',
      selectedNetworkName: 'selectedNetworkToManageGetter'
    })
  },
  methods: {
    ...mapActions([
      'accountsDataAction',
      'accountDialogStatusAction',
      'accountsLoaderStatusAction',
      'accountSchemaAction',
      'appManageNetworkProfileDialogStatusAction',
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
    createAccountNetworkIntegration1003 (profileName, input) {
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
                name: profileName,
                default: true,
                api_key: input.input[0]
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
        }
      })
      .then(() => {
        // this.editedIndexStatusAction(-1)
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('apps_view.new_profile_created'),
          buttonText: this.$t('buttons.close')
        })
        // this.appManageNetworkProfileDialogStatusAction(false)
        // this.accountSchemaAction({
        //   name: '',
        //   description: '',
        //   disabled: ''
        // })
      })
    },
    createAccountNetworkIntegration1008 (profileName, input) {
      this.$apollo.mutate({
        mutation: CREATE_ACCOUNT_NETWORK_INTEGRATION_1008,
        context: {
          uri: URI
        },
        variables: {
          input: {
            accountId: this.accountId,
            profiles: [
              {
                name: profileName,
                default: true,
                report_key: input.input[0],
                sdk_key: input.input[1]
              }
            ]
          }
        },
        update: (store, { data: { createAccountNetworkIntegration1008 } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesApplovinQuery = false
          this.$apollo.queries.networkProfilesApplovin.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_APPLOVIN,
            variables: {
              filter: {
                filter: {
                  _id: this.accountId
                }
              }
            }
          })
          // Add our tag from the mutation to the end
          data.accounts.push(createAccountNetworkIntegration1008)
          // Write our data back to the cache.
          store.writeQuery({
            query: NETWORK_PROFILES_APPLOVIN,
            data,
            variables: {
              filter: {
                filter: {
                  _id: this.accountId
                }
              }
            }
          })
        }
      })
      .then(() => {
        // this.editedIndexStatusAction(-1)
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('apps_view.new_profile_created'),
          buttonText: this.$t('buttons.close')
        })
        // this.appManageNetworkProfileDialogStatusAction(false)
        // this.accountSchemaAction({
        //   name: '',
        //   description: '',
        //   disabled: ''
        // })
      })
    },
    // Remove network profile
    removeNetworkProfile1003 (profileName, selectedNetworkId, skipVar, queryName) {
      this.$apollo.mutate({
        mutation: DELETE_NETWORK_PROFILE,
        context: {
          uri: URI
        },
        variables: {
          _idAccount: this.accountId,
          _idNetwork: selectedNetworkId,
          _profileName: profileName
        },
        update: (store) => {
          // Actualizamos la query correspondiente
          this[skipVar] = false
          this.$apollo.queries[queryName].refetch()
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
          data.accounts = data.accounts.filter((item) => {
            return item._idAccount !== this.accountId
          })
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
        }
      })
    },
    removeNetworkProfile1008 (profileName, selectedNetworkId, skipVar, queryName) {
      this.$apollo.mutate({
        mutation: DELETE_NETWORK_PROFILE,
        context: {
          uri: URI
        },
        variables: {
          _idAccount: this.accountId,
          _idNetwork: selectedNetworkId,
          _profileName: profileName
        },
        update: (store) => {
          // Actualizamos la query correspondiente
          this[skipVar] = false
          this.$apollo.queries[queryName].refetch()
          const data = store.readQuery({
            query: NETWORK_PROFILES_APPLOVIN,
            variables: {
              filter: {
                filter: {
                  _id: this.accountId
                }
              }
            }
          })
          data.accounts = data.accounts.filter((item) => {
            return item._idAccount !== this.accountId
          })
          store.writeQuery({
            query: NETWORK_PROFILES_APPLOVIN,
            data,
            variables: {
              filter: {
                filter: {
                  _id: this.accountId
                }
              }
            }
          })
        }
      })
    },
    updateNetwork1003Profile (profileName, edittedValue) {
      this.$apollo.mutate({
        mutation: UPDATE_NETWORK_1003_PROFILE,
        context: {
          uri: URI
        },
        variables: {
          _idAccount: this.accountId,
          _profileName: profileName,
          input: {
            profile: {
              name: profileName,
              default: true,
              api_key: edittedValue
            }
          }
        },
        update: (store) => {
          console.log(edittedValue)
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesAdcolonyQuery = false
          this.$apollo.queries.networkProfilesAdcolony.refetch()
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
          data.accounts.map((item) => {
            if (item._id === this.accountId) {
              item.name = profileName
              item.default = true
              item.api_key = edittedValue
            }
          })
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
        }
      })
      .then(() => {
        // this.editedIndexStatusAction(-1)
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('apps_view.updated_network_profile'),
          buttonText: this.$t('buttons.close')
        })
        this.accountDialogStatusAction(false)
        // this.accountSchemaAction({
        //   name: '',
        //   description: '',
        //   disabled: ''
        // })
      })
    },
    updateNetwork1008Profile (profileName, edittedValue, selected) {
      this.$apollo.mutate({
        mutation: UPDATE_NETWORK_1008_PROFILE,
        context: {
          uri: URI
        },
        variables: {
          _idAccount: this.accountId,
          _profileName: profileName,
          input: {
            profile: {
              name: profileName,
              default: true,
              report_key: edittedValue[0] ? edittedValue[0] : selected.report_key,
              sdk_key: edittedValue[1] ? edittedValue[1] : selected.sdk_key
            }
          }
        },
        update: (store) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesApplovinQuery = false
          this.$apollo.queries.networkProfilesApplovin.refetch()
          const data = store.readQuery({
            query: NETWORK_PROFILES_APPLOVIN,
            variables: {
              filter: {
                filter: {
                  _id: this.accountId
                }
              }
            }
          })
          data.accounts.map((item) => {
            if (item._id === this.accountId) {
              item.name = profileName
              item.default = true
              item.report_key = edittedValue[0] ? edittedValue[0] : selected.report_key
              item.sdk_key = edittedValue[1] ? edittedValue[1] : selected.sdk_key
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_APPLOVIN,
            data,
            variables: {
              filter: {
                filter: {
                  _id: this.accountId
                }
              }
            }
          })
        }
      })
      .then(() => {
        // this.editedIndexStatusAction(-1)
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('apps_view.updated_network_profile'),
          buttonText: this.$t('buttons.close')
        })
        // this.accountDialogStatusAction(false)
        // this.accountSchemaAction({
        //   name: '',
        //   description: '',
        //   disabled: ''
        // })
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
    this.$root.$on('launchNetworkProfilesQuery', (networkName) => {
      let formattedName = networkName.charAt(0).toUpperCase() + networkName.slice(1).toLowerCase()
      let skipVar = `skipNetworkProfiles${formattedName}Query`
      let queryName = `networkProfiles${formattedName}`
      this[skipVar] = false
      this.$apollo.queries[queryName].refetch()
    })
    // createAccountNetworkIntegration events
    this.$root.$on('createAccountNetworkIntegration', (profileName, input) => {
      let currentNetwork = `createAccountNetworkIntegration${this.selectedNetworkId}`
      this[currentNetwork](profileName, input)
    })
    // editAccountNetworkIntegration events
    this.$root.$on('editAccountNetworkIntegration', (profileName, edittedValue, selected) => {
      let currentNetwork = `updateNetwork${this.selectedNetworkId}Profile`
      this[currentNetwork](profileName, edittedValue, selected)
    })
    // Remove network profile
    this.$root.$on('removeNetworkProfile', (profileName, selectedNetworkId) => {
      let name = this.selectedNetworkName
      let formattedName = this.selectedNetworkName.charAt(0).toUpperCase() + this.selectedNetworkName.slice(1).toLowerCase()
      let skipVar = `skipNetworkProfiles${formattedName}Query`
      let queryName = `networkProfiles${formattedName}`
      if (name === 'ADCOLONY') {
        this.removeNetworkProfile1003(profileName, parseInt(selectedNetworkId), skipVar, queryName, name)
      } else if (name === 'APPLOVIN') {
        this.removeNetworkProfile1008(profileName, parseInt(selectedNetworkId), skipVar, queryName, name)
      }
    })
  },
  beforeDestroy () {
    this.$root.$off()
  }
}

export default accountMixin
