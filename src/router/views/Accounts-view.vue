<template lang="pug">
  v-container(class="accounts__section")
    v-layout(wrap class="card__row-title")
      v-flex(xs12)
        //- v-breadcrumbs(divider="/" large)
        //-   v-breadcrumbs-item {{ $t('navigation.accounts') }}
        accounts-data-table
</template>

<script>
  // Mixins
  import accountMixin from '@/mixins/accountMixin'
  // Components
  import AccountsDataTable from '@/components/accounts/AccountsDataTable'

  export default {
    components: {
      AccountsDataTable
    },
    mixins: [accountMixin]
  }
</script>
