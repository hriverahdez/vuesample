<template lang="pug">
  v-container.apps__section
      v-layout(wrap).card__row-title
        v-flex(xs12)
          v-breadcrumbs(divider="/" large)
            v-breadcrumbs-item Apps
          apps-data-table
</template>



<script>
// Query imports
import { APP_TOTAL_DATA } from '@/graphql/app'
// Components
import AppsDataTable from '@/components/apps/AppDataTable'

import { mapActions } from 'vuex'

export default {
  name: 'apps-view',
  apollo: {
    accounts: {
      query: APP_TOTAL_DATA,
      context: {
        uri: 'app'
      },
      loadingKey: 'loading',
      update (data) {
        this.appTotalDataAction(data.apps)
      }
    }
  },
  components: {
    AppsDataTable
  },
  methods: {
    ...mapActions(['appTotalDataAction'])
  }
}
</script>



