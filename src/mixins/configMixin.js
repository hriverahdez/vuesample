import {
  BANNER_POSITIONS,
  CONFIG_APP_NETWORK_FORM,
  GET_DATA_FILTERS
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
    }
  },
  computed: {
    ...mapGetters({
      skipAppNetworkFormFields: 'skipAppNetworkFormFieldsGetter',
      selectedNetwork: 'selectedAppNetworkInDatatableGetter'
    })
  },
  methods: {
    ...mapActions([
      'bannerPositionsDataAction',
      'configAppNetworkFormFieldsAction',
      'dashboardFiltersAction',
      'skipAppNetworkFormFieldsAction'
    ])
  }
}

export default configMixin
