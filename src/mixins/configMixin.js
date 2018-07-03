import { BANNER_POSITIONS, GET_DATA_FILTERS, GET_ROLES_ADMIN } from '@/graphql/config'
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
    rolesAdmin: {
      query: GET_ROLES_ADMIN,
      context: {
        uri: URI
      },
      loadingKey: 'loading',
      update (data) {
        console.log('GET_ROLES_ADMIN ')
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
  methods: {
    ...mapActions([
      'bannerPositionsDataAction',
      'dashboardFiltersAction',
      'rolesAdminAction',
      'skipQueryRolesAdminAction'
    ])
  },
  computed: {
    ...mapGetters([
      'skipQueryRolesAdminGetter'
    ])
  }

}

export default configMixin
