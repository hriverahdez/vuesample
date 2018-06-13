import { BANNER_POSITIONS } from '@/graphql/config'
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
    }
  },
  methods: {
    ...mapActions([
      'bannerPositionsDataAction'
    ])
  }
}

export default configMixin
