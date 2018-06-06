<template lang="pug">
  v-container.apps__section
      v-layout(wrap).card__row-title
        v-flex(xs12)
          //- v-breadcrumbs(divider="/" large)
          //-   v-breadcrumbs-item {{ $t('dashboard_view.apps') }}
          apps-data-table
</template>



<script>
// Components imports
import AppsDataTable from '@/components/apps/AppDataTable'
// Mixins imports
import accountMixin from '@/mixins/accountMixin'
import appMixin from '@/mixins/appMixin'

export default {
  name: 'apps-view',
  components: {
    AppsDataTable
  },
  mixins: [
    appMixin,
    accountMixin
  ]
}
</script>



