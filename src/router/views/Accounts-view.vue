<template lang="pug">
  v-container(class="accounts__section")
    v-layout(wrap class="card__row-title")
      v-flex(xs12)
        //- v-breadcrumbs(divider="/" large)
        //-   v-breadcrumbs-item {{ $t('navigation.accounts') }}
        accounts-data-table(v-if="accountsDataTable.length")
        template(v-else)
          loader-component
</template>

<script>
// Components
import AccountsDataTable from '@/components/accounts/AccountsDataTable'
import LoaderComponent from '@/components/LoaderComponent'
// Mixins
import accountMixin from '@/mixins/accountMixin'
import appMixin from '@/mixins/appMixin'
// Vuex imports
import { mapGetters } from 'vuex'

export default {
  components: {
    AccountsDataTable,
    LoaderComponent
  },
  computed: {
    ...mapGetters({
      accountsDataTable: 'accountsDataGetter'
    })
  },
  mixins: [accountMixin, appMixin]
}
</script>
