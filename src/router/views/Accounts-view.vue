<template lang="pug">
  v-container(class="accounts__section")
    v-layout(wrap class="card__row-title")
      v-flex(xs12 class="accounts__section__card")
        //- v-breadcrumbs(divider="/" large)
        //-   v-breadcrumbs-item {{ $t('navigation.accounts') }}
        accounts-data-table(v-if="loaderStatus === false")
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
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    AccountsDataTable,
    LoaderComponent
  },
  mixins: [accountMixin, appMixin],
  computed: {
    ...mapGetters({
      accountsDataTable: 'accountsDataGetter',
      loaderStatus: 'accountsLoaderStatusGetter'
    })
  },
  mounted () {
    this.skipQueryAccountsAction(false)
  },
  methods: {
    ...mapActions([
      'skipQueryAccountsAction'
    ])
  }

}
</script>

<style lang="scss" scoped>
.accounts__section__card .card {
  border-top: 3px solid #BDD0FB;
}
</style>
