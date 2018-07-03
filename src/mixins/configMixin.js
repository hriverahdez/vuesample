import {
  BANNER_POSITIONS,
  CONFIG_APP_NETWORK_FORM,
  GET_DATA_FILTERS,
  GET_ROLES_ADMIN
} from '@/graphql/config'

import { mapActions, mapGetters } from 'vuex'

const URI = 'config'

const configMixin = {
  apollo: {
    config: {
      query: BANNER_POSITIONS,
      context: {
        uri: URI
      },
      loadingKey: 'loading',
      update (data) {
        this.bannerPositionsDataAction(data.config)
      }
    },
    filters: {
      query: GET_DATA_FILTERS,
      context: {
        uri: URI
      },
      loadingKey: 'loading',
      update (data) {
        this.dashboardFiltersAction(data.config)
      }
    },
    configAppNetworkForm: {
      query: CONFIG_APP_NETWORK_FORM,
      context: {
        uri: URI
      },
      variables () {
        return {
          _id: parseInt(this.selectedNetwork.networkName.id)
        }
      },
      skip () {
        return this.skipAppNetworkFormFields
      },
      loadingKey: 'loading',
      update (data) {
        this.configAppNetworkFormFieldsAction(data.configAppNetworkForm)
        this.skipAppNetworkFormFieldsAction(true)
      },
      error (error) {
        console.info(error)
        this.skipAppNetworkFormFieldsAction(true)
      }
    },
    rolesAdmin: {
      query: GET_ROLES_ADMIN,
      context: {
        uri: URI
      },
      loadingKey: 'loading',
      update (data) {
        this.rolesAdminAction(data.config.availableRolesAdmin)
        this.skipQueryRolesAdminAction(true)
      },
      // Deshabilitamos la query,para lanzarla cuando queramos
      skip () {
        return this.skipQueryRolesAdminGetter
      },
      error () {
        this.skipQueryRolesAdminAction(true)
      }
    }
  },
  computed: {
    ...mapGetters({
      skipAppNetworkFormFields: 'skipAppNetworkFormFieldsGetter',
      selectedNetwork: 'selectedAppNetworkInDatatableGetter',
      skipQueryRolesAdminGetter: 'skipQueryRolesAdminGetter'
    })
  },
  methods: {
    ...mapActions([
      'bannerPositionsDataAction',
      'dashboardFiltersAction',
      'rolesAdminAction',
      'skipQueryRolesAdminAction'
    ])
  }
}

export default configMixin
