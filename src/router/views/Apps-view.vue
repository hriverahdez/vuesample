<template lang="pug">
  v-container(class="apps__section")
      v-layout(wrap class="card__row-title")
        v-flex(xs12)
          //- v-breadcrumbs(divider="/" large)
          //-   v-breadcrumbs-item {{ $t('dashboard_view.apps') }}
          apps-data-table(v-if="appsDataTable.length")
          template(v-else)
            loader-component
</template>



<script>
// Components imports
import AppsDataTable from '@/components/apps/AppDataTable'
import LoaderComponent from '@/components/LoaderComponent'
// Mixins imports
import accountMixin from '@/mixins/accountMixin'
import appMixin from '@/mixins/appMixin'
// Vuex imports
import { mapGetters } from 'vuex'

export default {
  name: 'apps-view',
  components: {
    AppsDataTable,
    LoaderComponent
  },
  computed: {
    ...mapGetters({
      appsDataTable: 'appDataGetter'
    })
  },
  mixins: [
    accountMixin,
    appMixin
  ]
}
</script>






