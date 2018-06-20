import { BANNER_POSITIONS, GET_DATA_FILTERS } from '@/graphql/config'
import { mapActions } from 'vuex'

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
        console.log('Config query')
        this.dashboardFiltersAction(data.config)
      }
    }
  },
  methods: {
    ...mapActions([
      'bannerPositionsDataAction',
      'dashboardFiltersAction'
    ])
  }
}

export default configMixin
