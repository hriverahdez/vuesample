<template lang="pug">
  v-container(class="accounts__section")
    v-layout(wrap class="card__row-title")
      v-flex(xs12)
        v-breadcrumbs(divider="/" large)
          v-breadcrumbs-item {{ $t('navigation.accounts') }}
        accounts-data-table
</template>

<script>
  import { mapActions } from 'vuex'
  // Queries
  import { GET_ACCOUNTS } from '@/graphql/account'
  // import { UPDATE_ACCOUNT, GET_ACCOUNTS, DELETE_ACCOUNT } from '@/graphql/account'
  // Components
  import AccountsDataTable from '@/components/accounts/AccountsDataTable'

  export default {
    components: {
      AccountsDataTable
    },
    apollo: {
      accounts: {
        query: GET_ACCOUNTS,
        context: {
          uri: 'account'
        },
        loadingKey: 'loading',
        update (data) {
          this.accountsDataAction(data.accounts)
        }
      }
    },
    methods: {
      ...mapActions(['accountsDataAction'])
      // Edit account
      // editAccount () {
      //   const {newAccount} = this.$data
      //   this.$apollo.mutate({
      //     mutation: UPDATE_ACCOUNT,
      //     variables: {
      //       id: newAccount._id,
      //       input: {
      //         name: newAccount.name,
      //         description: newAccount.description,
      //         disabled: newAccount.disabled
      //       }
      //     }
      //   }).then(() => {
      //     this.newAccount = {}
      //     this.closeDialog()
      //   })
      // }
    }
  }
</script>
