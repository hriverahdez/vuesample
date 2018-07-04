import {
  CREATE_NEW_ACCOUNT,
  CREATE_ACCOUNT_NETWORK_INTEGRATION_1001,
  CREATE_ACCOUNT_NETWORK_INTEGRATION_1003,
  CREATE_ACCOUNT_NETWORK_INTEGRATION_1004,
  CREATE_ACCOUNT_NETWORK_INTEGRATION_1005,
  CREATE_ACCOUNT_NETWORK_INTEGRATION_1007,
  CREATE_ACCOUNT_NETWORK_INTEGRATION_1008,
  CREATE_ACCOUNT_NETWORK_INTEGRATION_1012,
  CREATE_ACCOUNT_NETWORK_INTEGRATION_1013,
  CREATE_ACCOUNT_NETWORK_INTEGRATION_1014,
  CREATE_ACCOUNT_NETWORK_INTEGRATION_1016,
  CREATE_ACCOUNT_NETWORK_INTEGRATION_1017,
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
  UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1002,
  UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1003,
  UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1004,
  UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1005,
  UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1007,
  UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1008,
  UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1012,
  UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1013,
  UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1014,
  UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1016,
  UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1017,
  UPDATE_NETWORK_1001_PROFILE,
  UPDATE_NETWORK_1003_PROFILE,
  UPDATE_NETWORK_1004_PROFILE,
  UPDATE_NETWORK_1005_PROFILE,
  UPDATE_NETWORK_1007_PROFILE,
  UPDATE_NETWORK_1008_PROFILE,
  UPDATE_NETWORK_1012_PROFILE,
  UPDATE_NETWORK_1013_PROFILE,
  UPDATE_NETWORK_1014_PROFILE,
  UPDATE_NETWORK_1016_PROFILE,
  UPDATE_NETWORK_1017_PROFILE
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
      skip () {
        return this.skipAccounts
      },
      loadingKey: 'loading',
      update (data) {
        this.accountsDataAction(data.accounts).then(() => {
          this.accountsLoaderStatusAction(false)
        })
        this.skipAccounts = true
      },
      error () {
        this.skipAccounts = true
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
          id: this.accountId
        }
      },
      skip () {
        return this.skipNetworkProfilesAdmobQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accountById.networkProfiles.find(e => e.profiles))
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
          id: this.accountId
        }
      },
      skip () {
        return this.skipNetworkProfilesAdcolonyQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accountById.networkProfiles.find(e => e.profiles))
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
          id: this.accountId
        }
      },
      skip () {
        return this.skipNetworkProfilesApplovinQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accountById.networkProfiles.find(e => e.profiles))
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
          id: this.accountId
        }
      },
      skip () {
        return this.skipNetworkProfilesChartboostQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accountById.networkProfiles.find(e => e.profiles))
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
          id: this.accountId
        }
      },
      skip () {
        return this.skipNetworkProfilesInmobiQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accountById.networkProfiles.find(e => e.profiles))
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
          id: this.accountId
        }
      },
      skip () {
        return this.skipNetworkProfilesIronsourceQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accountById.networkProfiles.find(e => e.profiles))
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
          id: this.accountId
        }
      },
      skip () {
        return this.skipNetworkProfilesMobusiQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accountById.networkProfiles.find(e => e.profiles))
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
          id: this.accountId
        }
      },
      skip () {
        return this.skipNetworkProfilesMobvistaQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accountById.networkProfiles.find(e => e.profiles))
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
          id: this.accountId
        }
      },
      skip () {
        return this.skipNetworkProfilesMopubQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accountById.networkProfiles.find(e => e.profiles))
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
          id: this.accountId
        }
      },
      skip () {
        return this.skipNetworkProfilesStartappQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accountById.networkProfiles.find(e => e.profiles))
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
          id: this.accountId
        }
      },
      skip () {
        return this.skipNetworkProfilesUnityadsQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accountById.networkProfiles.find(e => e.profiles))
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
          id: this.accountId
        }
      },
      skip () {
        return this.skipNetworkProfilesVungleQuery
      },
      loadingKey: 'loading',
      update (data) {
        this.networkProfilesDataAction(data.accountById.networkProfiles.find(e => e.profiles))
      }
    }
  },
  data () {
    return {
      skipAccounts: true,
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
    createAccountNetworkIntegration1001 (profileName, input) {
      this.$apollo.mutate({
        mutation: CREATE_ACCOUNT_NETWORK_INTEGRATION_1001,
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
                api_key: input.input[0],
                user_id: input.input[1]
              }
            ],
            active: true
          }
        },
        update: (store, { data: { createAccountNetworkIntegration1001 } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesMobusiQuery = false
          this.$apollo.queries.networkProfilesMobusi.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_MOBUSI,
            variables: {
              id: this.accountId
            }
          })
          // Add our tag from the mutation to the end
          // data.accounts.push(createAccountNetworkIntegration1001)
          // Write our data back to the cache.
          store.writeQuery({
            query: NETWORK_PROFILES_MOBUSI,
            data,
            variables: {
              id: this.accountId
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
    updateAccountNetworkIntegrationStatusAdmob (status, networkId) {
      this.$apollo.mutate({
        mutation: UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1002,
        context: {
          uri: URI
        },
        variables: {
          _idAccount: this.accountId,
          _idNetwork: networkId,
          input: {
            active: status
          }
        },
        update: (store, { data: { updateAccountNetworkIntegrationStatusAdmob } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesAdmobQuery = false
          this.$apollo.queries.networkProfilesAdmob.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_ADMOB,
            variables: {
              id: this.accountId
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_ADMOB,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
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
            ],
            active: true
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
              id: this.accountId
            }
          })
          // Add our tag from the mutation to the end
          // let profiles = data.accountById.networkProfiles.find(e => e.profiles)
          // profiles.push(createAccountNetworkIntegration1003)
          // Write our data back to the cache.
          store.writeQuery({
            query: NETWORK_PROFILES_ADCOLONY,
            data,
            variables: {
              id: this.accountId
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
    updateAccountNetworkIntegrationStatusAdcolony (status, networkId) {
      this.$apollo.mutate({
        mutation: UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1003,
        context: {
          uri: URI
        },
        variables: {
          _idAccount: this.accountId,
          _idNetwork: networkId,
          input: {
            active: status
          }
        },
        update: (store, { data: { updateAccountNetworkIntegrationStatusAdcolony } }) => {
          console.log('update', status, networkId)
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesAdcolonyQuery = false
          this.$apollo.queries.networkProfilesAdcolony.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_ADCOLONY,
            variables: {
              id: this.accountId
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_ADCOLONY,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
    createAccountNetworkIntegration1004 (profileName, input) {
      this.$apollo.mutate({
        mutation: CREATE_ACCOUNT_NETWORK_INTEGRATION_1004,
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
            ],
            active: true
          }
        },
        update: (store, { data: { createAccountNetworkIntegration1004 } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesUnityadsQuery = false
          this.$apollo.queries.networkProfilesUnityads.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_UNITYADS,
            variables: {
              id: this.accountId
            }
          })
          // Add our tag from the mutation to the end
          // data.accounts.push(createAccountNetworkIntegration1004)
          // Write our data back to the cache.
          store.writeQuery({
            query: NETWORK_PROFILES_UNITYADS,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
      .then(() => {
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('apps_view.new_profile_created'),
          buttonText: this.$t('buttons.close')
        })
      })
    },
    updateAccountNetworkIntegrationStatusUnityads (status, networkId) {
      this.$apollo.mutate({
        mutation: UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1004,
        context: {
          uri: URI
        },
        variables: {
          _idAccount: this.accountId,
          _idNetwork: networkId,
          input: {
            active: status
          }
        },
        update: (store, { data: { updateAccountNetworkIntegrationStatusUnityads } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesUnityadsQuery = false
          this.$apollo.queries.networkProfilesUnityads.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_UNITYADS,
            variables: {
              id: this.accountId
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_UNITYADS,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
    createAccountNetworkIntegration1005 (profileName, input) {
      this.$apollo.mutate({
        mutation: CREATE_ACCOUNT_NETWORK_INTEGRATION_1005,
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
            ],
            active: true
          }
        },
        update: (store, { data: { createAccountNetworkIntegration1005 } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesVungleQuery = false
          this.$apollo.queries.networkProfilesVungle.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_VUNGLE,
            variables: {
              id: this.accountId
            }
          })
          // Add our tag from the mutation to the end
          // data.accounts.push(createAccountNetworkIntegration1005)
          // Write our data back to the cache.
          store.writeQuery({
            query: NETWORK_PROFILES_VUNGLE,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
      .then(() => {
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('apps_view.new_profile_created'),
          buttonText: this.$t('buttons.close')
        })
      })
    },
    updateAccountNetworkIntegrationStatusVungle (status, networkId) {
      this.$apollo.mutate({
        mutation: UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1005,
        context: {
          uri: URI
        },
        variables: {
          _idAccount: this.accountId,
          _idNetwork: networkId,
          input: {
            active: status
          }
        },
        update: (store, { data: { updateAccountNetworkIntegrationStatusVungle } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesVungleQuery = false
          this.$apollo.queries.networkProfilesVungle.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_VUNGLE,
            variables: {
              id: this.accountId
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_VUNGLE,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
    createAccountNetworkIntegration1007 (profileName, input) {
      this.$apollo.mutate({
        mutation: CREATE_ACCOUNT_NETWORK_INTEGRATION_1007,
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
                user_id: input.input[0],
                user_signature: input.input[1]
              }
            ],
            active: true
          }
        },
        update: (store, { data: { createAccountNetworkIntegration1007 } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesChartboostQuery = false
          this.$apollo.queries.networkProfilesChartboost.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_CHARTBOOST,
            variables: {
              id: this.accountId
            }
          })
          // Add our tag from the mutation to the end
          // data.accounts.push(createAccountNetworkIntegration1007)
          // Write our data back to the cache.
          store.writeQuery({
            query: NETWORK_PROFILES_CHARTBOOST,
            data,
            variables: {
              id: this.accountId
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
    updateAccountNetworkIntegrationStatusChartboost (status, networkId) {
      this.$apollo.mutate({
        mutation: UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1007,
        context: {
          uri: URI
        },
        variables: {
          _idAccount: this.accountId,
          _idNetwork: networkId,
          input: {
            active: status
          }
        },
        update: (store, { data: { updateAccountNetworkIntegrationStatusChartboost } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesChartboostQuery = false
          this.$apollo.queries.networkProfilesChartboost.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_CHARTBOOST,
            variables: {
              id: this.accountId
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_CHARTBOOST,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
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
            ],
            active: true
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
              id: this.accountId
            }
          })
          // Add our tag from the mutation to the end
          // data.accounts.push(createAccountNetworkIntegration1008)
          // Write our data back to the cache.
          store.writeQuery({
            query: NETWORK_PROFILES_APPLOVIN,
            data,
            variables: {
              id: this.accountId
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
    updateAccountNetworkIntegrationStatusApplovin (status, networkId) {
      this.$apollo.mutate({
        mutation: UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1008,
        context: {
          uri: URI
        },
        variables: {
          _idAccount: this.accountId,
          _idNetwork: networkId,
          input: {
            active: status
          }
        },
        update: (store, { data: { updateAccountNetworkIntegrationStatusApplovin } }) => {
          console.log('update', status, networkId)
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesApplovinQuery = false
          this.$apollo.queries.networkProfilesApplovin.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_APPLOVIN,
            variables: {
              id: this.accountId
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_APPLOVIN,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
    // updateAccountNetworkIntegrationStatusFacebook (status, networkId) {
    //   this.$apollo.mutate({
    //     mutation: UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1009,
    //     context: {
    //       uri: URI
    //     },
    //     variables: {
    //       _idAccount: this.accountId,
    //       _idNetwork: networkId,
    //       input: {
    //         active: status
    //       }
    //     },
    //     update: (store, { data: { updateAccountNetworkIntegrationStatusFacebook } }) => {
    //       console.log('update', status, networkId)
    //       // Actualizamos la query correspondiente
    //       this.skipNetworkProfilesFacebookQuery = false
    //       this.$apollo.queries.networkProfilesFacebook.refetch()
    //       // Read the data from our cache for this query.
    //       const data = store.readQuery({
    //         query: NETWORK_PROFILES_FACEBOOK,
    //         variables: {
    //           id: this.accountId
    //         }
    //       })
    //       store.writeQuery({
    //         query: NETWORK_PROFILES_FACEBOOK,
    //         data,
    //         variables: {
    //           id: this.accountId
    //         }
    //       })
    //     }
    //   })
    // },
    createAccountNetworkIntegration1012 (profileName, input) {
      this.$apollo.mutate({
        mutation: CREATE_ACCOUNT_NETWORK_INTEGRATION_1012,
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
                acountId: input.input[0],
                apiKey: input.input[1],
                username: input.input[2],
                password: input.input[3]
              }
            ],
            active: true
          }
        },
        update: (store, { data: { createAccountNetworkIntegration1012 } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesInmobiQuery = false
          this.$apollo.queries.networkProfilesInmobi.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_INMOBI,
            variables: {
              id: this.accountId
            }
          })
          // Add our tag from the mutation to the end
          // data.accounts.push(createAccountNetworkIntegration1012)
          // Write our data back to the cache.
          store.writeQuery({
            query: NETWORK_PROFILES_INMOBI,
            data,
            variables: {
              id: this.accountId
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
    updateAccountNetworkIntegrationStatusInmobi (status, networkId) {
      this.$apollo.mutate({
        mutation: UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1012,
        context: {
          uri: URI
        },
        variables: {
          _idAccount: this.accountId,
          _idNetwork: networkId,
          input: {
            active: status
          }
        },
        update: (store, { data: { updateAccountNetworkIntegrationStatusInmobi } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesInmobiQuery = false
          this.$apollo.queries.networkProfilesInmobi.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_INMOBI,
            variables: {
              id: this.accountId
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_INMOBI,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
    createAccountNetworkIntegration1013 (profileName, input) {
      this.$apollo.mutate({
        mutation: CREATE_ACCOUNT_NETWORK_INTEGRATION_1013,
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
                acountId: input.input[0],
                token: input.input[1]
              }
            ],
            active: true
          }
        },
        update: (store, { data: { createAccountNetworkIntegration1013 } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesStartappQuery = false
          this.$apollo.queries.networkProfilesStartapp.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_STARTAPP,
            variables: {
              id: this.accountId
            }
          })
          // Add our tag from the mutation to the end
          // data.accounts.push(createAccountNetworkIntegration1013)
          // Write our data back to the cache.
          store.writeQuery({
            query: NETWORK_PROFILES_STARTAPP,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
      .then(() => {
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('apps_view.new_profile_created'),
          buttonText: this.$t('buttons.close')
        })
      })
    },
    updateAccountNetworkIntegrationStatusStartapp (status, networkId) {
      this.$apollo.mutate({
        mutation: UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1013,
        context: {
          uri: URI
        },
        variables: {
          _idAccount: this.accountId,
          _idNetwork: networkId,
          input: {
            active: status
          }
        },
        update: (store, { data: { updateAccountNetworkIntegrationStatusStartapp } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesStartappQuery = false
          this.$apollo.queries.networkProfilesStartapp.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_STARTAPP,
            variables: {
              id: this.accountId
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_STARTAPP,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
    createAccountNetworkIntegration1014 (profileName, input) {
      this.$apollo.mutate({
        mutation: CREATE_ACCOUNT_NETWORK_INTEGRATION_1014,
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
                skey: input.input[0],
                secret: input.input[1]
              }
            ],
            active: true
          }
        },
        update: (store, { data: { createAccountNetworkIntegration1014 } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesMobvistaQuery = false
          this.$apollo.queries.networkProfilesMobvista.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_MOBVISTA,
            variables: {
              id: this.accountId
            }
          })
          // Add our tag from the mutation to the end
          // data.accounts.push(createAccountNetworkIntegration1014)
          // Write our data back to the cache.
          store.writeQuery({
            query: NETWORK_PROFILES_MOBVISTA,
            data,
            variables: {
              id: this.accountId
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
    updateAccountNetworkIntegrationStatusMobvista (status, networkId) {
      this.$apollo.mutate({
        mutation: UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1014,
        context: {
          uri: URI
        },
        variables: {
          _idAccount: this.accountId,
          _idNetwork: networkId,
          input: {
            active: status
          }
        },
        update: (store, { data: { updateAccountNetworkIntegrationStatusMobvista } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesMobvistaQuery = false
          this.$apollo.queries.networkProfilesMobvista.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_MOBVISTA,
            variables: {
              id: this.accountId
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_MOBVISTA,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
    // updateAccountNetworkIntegrationStatusHyprmx (status, networkId) {
    //   this.$apollo.mutate({
    //     mutation: UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1016,
    //     context: {
    //       uri: URI
    //     },
    //     variables: {
    //       _idAccount: this.accountId,
    //       _idNetwork: networkId,
    //       input: {
    //         active: status
    //       }
    //     },
    //     update: (store, { data: { updateAccountNetworkIntegrationStatusHyprmx } }) => {
    //       console.log('update', status, networkId)
    //       // Actualizamos la query correspondiente
    //       this.skipNetworkProfilesHyprmxQuery = false
    //       this.$apollo.queries.networkProfilesHyprmx.refetch()
    //       // Read the data from our cache for this query.
    //       const data = store.readQuery({
    //         query: NETWORK_PROFILES_HYPRMX,
    //         variables: {
    //           id: this.accountId
    //         }
    //       })
    //       store.writeQuery({
    //         query: NETWORK_PROFILES_HYPRMX,
    //         data,
    //         variables: {
    //           id: this.accountId
    //         }
    //       })
    //     }
    //   })
    // },
    createAccountNetworkIntegration1016 (profileName, input) {
      this.$apollo.mutate({
        mutation: CREATE_ACCOUNT_NETWORK_INTEGRATION_1016,
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
                apiKey: input.input[0],
                inventoryReport: input.input[1],
                campaignReport: input.input[2]
              }
            ],
            active: true
          }
        },
        update: (store, { data: { createAccountNetworkIntegration1016 } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesMopubQuery = false
          this.$apollo.queries.networkProfilesMopub.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_MOPUB,
            variables: {
              id: this.accountId
            }
          })
          // Add our tag from the mutation to the end
          // data.accounts.push(createAccountNetworkIntegration1016)
          // Write our data back to the cache.
          store.writeQuery({
            query: NETWORK_PROFILES_MOPUB,
            data,
            variables: {
              id: this.accountId
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
    updateAccountNetworkIntegrationStatusMopub (status, networkId) {
      this.$apollo.mutate({
        mutation: UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1016,
        context: {
          uri: URI
        },
        variables: {
          _idAccount: this.accountId,
          _idNetwork: networkId,
          input: {
            active: status
          }
        },
        update: (store, { data: { updateAccountNetworkIntegrationStatusMopub } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesMopubQuery = false
          this.$apollo.queries.networkProfilesMopub.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_MOPUB,
            variables: {
              id: this.accountId
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_MOPUB,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
    createAccountNetworkIntegration1017 (profileName, input) {
      this.$apollo.mutate({
        mutation: CREATE_ACCOUNT_NETWORK_INTEGRATION_1017,
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
                username: input.input[0],
                secret_key: input.input[1]
              }
            ],
            active: true
          }
        },
        update: (store, { data: { createAccountNetworkIntegration1017 } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesIronsourceQuery = false
          this.$apollo.queries.networkProfilesIronsource.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_IRONSOURCE,
            variables: {
              id: this.accountId
            }
          })
          // Add our tag from the mutation to the end
          // data.accounts.push(createAccountNetworkIntegration1017)
          // Write our data back to the cache.
          store.writeQuery({
            query: NETWORK_PROFILES_IRONSOURCE,
            data,
            variables: {
              id: this.accountId
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
    updateAccountNetworkIntegrationStatusIronsource (status, networkId) {
      this.$apollo.mutate({
        mutation: UPDATE_ACCOUNT_NETWORK_INTEGRATION_STATUS_1017,
        context: {
          uri: URI
        },
        variables: {
          _idAccount: this.accountId,
          _idNetwork: networkId,
          input: {
            active: status
          }
        },
        update: (store, { data: { updateAccountNetworkIntegrationStatusIronsource } }) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesIronsourceQuery = false
          this.$apollo.queries.networkProfilesIronsource.refetch()
          // Read the data from our cache for this query.
          const data = store.readQuery({
            query: NETWORK_PROFILES_IRONSOURCE,
            variables: {
              id: this.accountId
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_IRONSOURCE,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
    // Remove network profile
    removeNetworkProfile1001 (profileName, selectedNetworkId, skipVar, queryName) {
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
            query: NETWORK_PROFILES_MOBUSI,
            variables: {
              id: this.accountId
            }
          })
          // data.accounts = data.accounts.filter((item) => {
          //   return item._idAccount !== this.accountId
          // })
          store.writeQuery({
            query: NETWORK_PROFILES_MOBUSI,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
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
              id: this.accountId
            }
          })
          // data.accounts = data.accounts.filter((item) => {
          //   return item._idAccount !== this.accountId
          // })
          store.writeQuery({
            query: NETWORK_PROFILES_ADCOLONY,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
    removeNetworkProfile1004 (profileName, selectedNetworkId, skipVar, queryName) {
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
            query: NETWORK_PROFILES_UNITYADS,
            variables: {
              id: this.accountId
            }
          })
          // data.accounts = data.accounts.filter((item) => {
          //   return item._idAccount !== this.accountId
          // })
          store.writeQuery({
            query: NETWORK_PROFILES_UNITYADS,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
    removeNetworkProfile1005 (profileName, selectedNetworkId, skipVar, queryName) {
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
            query: NETWORK_PROFILES_VUNGLE,
            variables: {
              id: this.accountId
            }
          })
          // data.accounts = data.accounts.filter((item) => {
          //   return item._idAccount !== this.accountId
          // })
          store.writeQuery({
            query: NETWORK_PROFILES_VUNGLE,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
    removeNetworkProfile1007 (profileName, selectedNetworkId, skipVar, queryName) {
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
            query: NETWORK_PROFILES_CHARTBOOST,
            variables: {
              id: this.accountId
            }
          })
          // data.accounts = data.accounts.filter((item) => {
          //   return item._idAccount !== this.accountId
          // })
          store.writeQuery({
            query: NETWORK_PROFILES_CHARTBOOST,
            data,
            variables: {
              id: this.accountId
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
              id: this.accountId
            }
          })
          // data.accounts = data.accounts.filter((item) => {
          //   return item._idAccount !== this.accountId
          // })
          store.writeQuery({
            query: NETWORK_PROFILES_APPLOVIN,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
    removeNetworkProfile1012 (profileName, selectedNetworkId, skipVar, queryName) {
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
            query: NETWORK_PROFILES_INMOBI,
            variables: {
              id: this.accountId
            }
          })
          // data.accounts = data.accounts.filter((item) => {
          //   return item._idAccount !== this.accountId
          // })
          store.writeQuery({
            query: NETWORK_PROFILES_INMOBI,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
    removeNetworkProfile1013 (profileName, selectedNetworkId, skipVar, queryName) {
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
            query: NETWORK_PROFILES_STARTAPP,
            variables: {
              id: this.accountId
            }
          })
          // data.accounts = data.accounts.filter((item) => {
          //   return item._idAccount !== this.accountId
          // })
          store.writeQuery({
            query: NETWORK_PROFILES_STARTAPP,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
    removeNetworkProfile1014 (profileName, selectedNetworkId, skipVar, queryName) {
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
            query: NETWORK_PROFILES_MOBVISTA,
            variables: {
              id: this.accountId
            }
          })
          // data.accounts = data.accounts.filter((item) => {
          //   return item._idAccount !== this.accountId
          // })
          store.writeQuery({
            query: NETWORK_PROFILES_MOBVISTA,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
    removeNetworkProfile1016 (profileName, selectedNetworkId, skipVar, queryName) {
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
            query: NETWORK_PROFILES_MOPUB,
            variables: {
              id: this.accountId
            }
          })
          // data.accounts = data.accounts.filter((item) => {
          //   return item._idAccount !== this.accountId
          // })
          store.writeQuery({
            query: NETWORK_PROFILES_MOPUB,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
    removeNetworkProfile1017 (profileName, selectedNetworkId, skipVar, queryName) {
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
            query: NETWORK_PROFILES_IRONSOURCE,
            variables: {
              id: this.accountId
            }
          })
          // data.accounts = data.accounts.filter((item) => {
          //   return item._idAccount !== this.accountId
          // })
          store.writeQuery({
            query: NETWORK_PROFILES_IRONSOURCE,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
    },
    // Update network profiles
    updateNetwork1001Profile (profileName, edittedValue, selected) {
      this.$apollo.mutate({
        mutation: UPDATE_NETWORK_1001_PROFILE,
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
              api_key: edittedValue[0] ? edittedValue[0] : selected.api_key,
              user_id: edittedValue[1] ? edittedValue[1] : selected.user_id
            }
          }
        },
        update: (store) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesMobusiQuery = false
          this.$apollo.queries.networkProfilesMobusi.refetch()
          const data = store.readQuery({
            query: NETWORK_PROFILES_MOBUSI,
            variables: {
              id: this.accountId
            }
          })
          data.accounts.map((item) => {
            if (item._id === this.accountId) {
              item.name = profileName
              item.default = true
              item.api_key = edittedValue[0] ? edittedValue[0] : selected.api_key
              item.user_id = edittedValue[1] ? edittedValue[1] : selected.user_id
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_MOBUSI,
            data,
            variables: {
              id: this.accountId
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
    updateNetwork1003Profile (profileName, edittedValue, selected) {
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
              api_key: edittedValue[0] ? edittedValue[0] : selected.api_key
            }
          }
        },
        update: (store) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesAdcolonyQuery = false
          this.$apollo.queries.networkProfilesAdcolony.refetch()
          const data = store.readQuery({
            query: NETWORK_PROFILES_ADCOLONY,
            variables: {
              id: this.accountId
            }
          })
          // data.accounts.map((item) => {
          //   if (item._id === this.accountId) {
          //     item.name = profileName
          //     item.default = true
          //     item.api_key = edittedValue[0] ? edittedValue[0] : selected.api_key
          //   }
          // })
          store.writeQuery({
            query: NETWORK_PROFILES_ADCOLONY,
            data,
            variables: {
              id: this.accountId
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
    updateNetwork1004Profile (profileName, edittedValue, selected) {
      this.$apollo.mutate({
        mutation: UPDATE_NETWORK_1004_PROFILE,
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
              api_key: edittedValue[0] ? edittedValue[0] : selected.api_key
            }
          }
        },
        update: (store) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesUnityadsQuery = false
          this.$apollo.queries.networkProfilesUnityads.refetch()
          const data = store.readQuery({
            query: NETWORK_PROFILES_UNITYADS,
            variables: {
              id: this.accountId
            }
          })
          // data.accounts.map((item) => {
          //   if (item._id === this.accountId) {
          //     item.name = profileName
          //     item.default = true
          //     item.api_key = edittedValue[0] ? edittedValue[0] : selected.api_key
          //   }
          // })
          store.writeQuery({
            query: NETWORK_PROFILES_UNITYADS,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
      .then(() => {
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('apps_view.updated_network_profile'),
          buttonText: this.$t('buttons.close')
        })
      })
    },
    updateNetwork1005Profile (profileName, edittedValue, selected) {
      this.$apollo.mutate({
        mutation: UPDATE_NETWORK_1005_PROFILE,
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
              api_key: edittedValue[0] ? edittedValue[0] : selected.api_key
            }
          }
        },
        update: (store) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesVungleQuery = false
          this.$apollo.queries.networkProfilesVungle.refetch()
          const data = store.readQuery({
            query: NETWORK_PROFILES_VUNGLE,
            variables: {
              id: this.accountId
            }
          })
          // data.accounts.map((item) => {
          //   if (item._id === this.accountId) {
          //     item.name = profileName
          //     item.default = true
          //     item.api_key = edittedValue[0] ? edittedValue[0] : selected.api_key
          //   }
          // })
          store.writeQuery({
            query: NETWORK_PROFILES_VUNGLE,
            data,
            variables: {
              id: this.accountId
            }
          })
        }
      })
      .then(() => {
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('apps_view.updated_network_profile'),
          buttonText: this.$t('buttons.close')
        })
      })
    },
    updateNetwork1007Profile (profileName, edittedValue, selected) {
      this.$apollo.mutate({
        mutation: UPDATE_NETWORK_1007_PROFILE,
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
              user_id: edittedValue[0] ? edittedValue[0] : selected.user_id,
              user_signature: edittedValue[1] ? edittedValue[1] : selected.user_signature
            }
          }
        },
        update: (store) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesChartboostQuery = false
          this.$apollo.queries.networkProfilesChartboost.refetch()
          const data = store.readQuery({
            query: NETWORK_PROFILES_CHARTBOOST,
            variables: {
              id: this.accountId
            }
          })
          data.accounts.map((item) => {
            if (item._id === this.accountId) {
              item.name = profileName
              item.default = true
              item.report_key = edittedValue[0] ? edittedValue[0] : selected.user_id
              item.sdk_key = edittedValue[1] ? edittedValue[1] : selected.user_signature
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_CHARTBOOST,
            data,
            variables: {
              id: this.accountId
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
              id: this.accountId
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
              id: this.accountId
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
    },
    updateNetwork1012Profile (profileName, edittedValue, selected) {
      this.$apollo.mutate({
        mutation: UPDATE_NETWORK_1012_PROFILE,
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
              acountId: edittedValue[0] ? edittedValue[0] : selected.acountId,
              apiKey: edittedValue[1] ? edittedValue[1] : selected.apiKey,
              username: edittedValue[2] ? edittedValue[2] : selected.username,
              password: edittedValue[3] ? edittedValue[3] : selected.password
            }
          }
        },
        update: (store) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesInmobiQuery = false
          this.$apollo.queries.networkProfilesInmobi.refetch()
          const data = store.readQuery({
            query: NETWORK_PROFILES_INMOBI,
            variables: {
              id: this.accountId
            }
          })
          data.accounts.map((item) => {
            if (item._id === this.accountId) {
              item.name = profileName
              item.default = true
              item.acountId = edittedValue[0] ? edittedValue[0] : selected.accountId
              item.apiKey = edittedValue[1] ? edittedValue[1] : selected.apiKey
              item.username = edittedValue[2] ? edittedValue[2] : selected.username
              item.password = edittedValue[3] ? edittedValue[3] : selected.password
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_INMOBI,
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
    },
    updateNetwork1013Profile (profileName, edittedValue, selected) {
      this.$apollo.mutate({
        mutation: UPDATE_NETWORK_1013_PROFILE,
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
              acountId: edittedValue[0] ? edittedValue[0] : selected.acountId,
              token: edittedValue[1] ? edittedValue[1] : selected.token
            }
          }
        },
        update: (store) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesStartappQuery = false
          this.$apollo.queries.networkProfilesStartapp.refetch()
          const data = store.readQuery({
            query: NETWORK_PROFILES_STARTAPP,
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
              item.acountId = edittedValue[0] ? edittedValue[0] : selected.acountId
              item.token = edittedValue[1] ? edittedValue[1] : selected.token
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_STARTAPP,
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
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('apps_view.updated_network_profile'),
          buttonText: this.$t('buttons.close')
        })
      })
    },
    updateNetwork1014Profile (profileName, edittedValue, selected) {
      this.$apollo.mutate({
        mutation: UPDATE_NETWORK_1014_PROFILE,
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
              skey: edittedValue[0] ? edittedValue[0] : selected.skey,
              secret: edittedValue[1] ? edittedValue[1] : selected.secret
            }
          }
        },
        update: (store) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesMobvistaQuery = false
          this.$apollo.queries.networkProfilesMobvista.refetch()
          const data = store.readQuery({
            query: NETWORK_PROFILES_MOBVISTA,
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
              item.skey = edittedValue[0] ? edittedValue[0] : selected.skey
              item.secret = edittedValue[1] ? edittedValue[1] : selected.secret
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_MOBVISTA,
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
    updateNetwork1016Profile (profileName, edittedValue, selected) {
      this.$apollo.mutate({
        mutation: UPDATE_NETWORK_1016_PROFILE,
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
              apiKey: edittedValue[0] ? edittedValue[0] : selected.apiKey,
              inventoryReport: edittedValue[1] ? edittedValue[1] : selected.inventoryReport,
              campaignReport: edittedValue[2] ? edittedValue[2] : selected.campaignReport
            }
          }
        },
        update: (store) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesMopubQuery = false
          this.$apollo.queries.networkProfilesMopub.refetch()
          const data = store.readQuery({
            query: NETWORK_PROFILES_MOPUB,
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
              item.apiKey = edittedValue[0] ? edittedValue[0] : selected.apiKey
              item.inventoryReport = edittedValue[1] ? edittedValue[1] : selected.inventoryReport
              item.campaignReport = edittedValue[2] ? edittedValue[2] : selected.campaignReport
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_MOPUB,
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
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('apps_view.updated_network_profile'),
          buttonText: this.$t('buttons.close')
        })
      })
    },
    updateNetwork1017Profile (profileName, edittedValue, selected) {
      this.$apollo.mutate({
        mutation: UPDATE_NETWORK_1017_PROFILE,
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
              username: edittedValue[0] ? edittedValue[0] : selected.username,
              secret_key: edittedValue[1] ? edittedValue[1] : selected.secret_key
            }
          }
        },
        update: (store) => {
          // Actualizamos la query correspondiente
          this.skipNetworkProfilesIronsourceQuery = false
          this.$apollo.queries.networkProfilesIronsource.refetch()
          const data = store.readQuery({
            query: NETWORK_PROFILES_IRONSOURCE,
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
              item.username = edittedValue[0] ? edittedValue[0] : selected.username
              item.secret_key = edittedValue[1] ? edittedValue[1] : selected.secret_key
            }
          })
          store.writeQuery({
            query: NETWORK_PROFILES_IRONSOURCE,
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
    // this.$root.$on('launchNetworkStatusQuery', (networkName) => {
    //   let formattedName = networkName.charAt(0).toUpperCase() + networkName.slice(1).toLowerCase()
    //   let skipVar = `skipNetworkProfiles${formattedName}Query`
    //   let queryName = `networkProfiles${formattedName}`
    //   this[skipVar] = false
    //   this.$apollo.queries[queryName].refetch()
    //   this.skipNetworkProfilesAdcolonyQuery = false
    //   this.$apollo.queries.networkProfilesAdcolony.refetch()
    // })
    this.$root.$on('enableDisableNetwork', (status, networkName, networkId) => {
      let formattedName = networkName.charAt(0).toUpperCase() + networkName.slice(1).toLowerCase()
      let queryName = `updateAccountNetworkIntegrationStatus${formattedName}`
      this[queryName](!status, networkId)
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
      } else if ((name === 'CHARTBOOST')) {
        this.removeNetworkProfile1007(profileName, parseInt(selectedNetworkId), skipVar, queryName, name)
      } else if ((name === 'INMOBI')) {
        this.removeNetworkProfile1012(profileName, parseInt(selectedNetworkId), skipVar, queryName, name)
      } else if ((name === 'IRONSOURCE')) {
        this.removeNetworkProfile1017(profileName, parseInt(selectedNetworkId), skipVar, queryName, name)
      } else if ((name === 'MOBUSI')) {
        this.removeNetworkProfile1001(profileName, parseInt(selectedNetworkId), skipVar, queryName, name)
      } else if ((name === 'MOBVISTA')) {
        this.removeNetworkProfile1014(profileName, parseInt(selectedNetworkId), skipVar, queryName, name)
      } else if ((name === 'MOPUB')) {
        this.removeNetworkProfile1016(profileName, parseInt(selectedNetworkId), skipVar, queryName, name)
      } else if ((name === 'UNITYADS')) {
        this.removeNetworkProfile1004(profileName, parseInt(selectedNetworkId), skipVar, queryName, name)
      } else if ((name === 'STARTAPP')) {
        this.removeNetworkProfile1013(profileName, parseInt(selectedNetworkId), skipVar, queryName, name)
      } else if ((name === 'VUNGLE')) {
        this.removeNetworkProfile1005(profileName, parseInt(selectedNetworkId), skipVar, queryName, name)
      }
    })
  },
  beforeDestroy () {
    this.$root.$off()
  }
}

export default accountMixin
