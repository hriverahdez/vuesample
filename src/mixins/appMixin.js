import { APP_DATA } from '@/graphql/app'
import { mapActions } from 'vuex'

const appMixin = {
  apollo: {
    apps: {
      query: APP_DATA,
      context: {
        uri: 'app'
      },
      loadingKey: 'loading',
      update (data) {
        this.appDataAction(data.apps)
      }
    }
  },
  methods: {
    ...mapActions(['appDataAction'])
  }
}

export default appMixin
