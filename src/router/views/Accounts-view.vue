<template lang="pug">
  section.accounts__section
    v-flex(xs12)
    accounts-data-table
</template>

<script>
  import { UPDATE_ACCOUNT } from '@/graphql/accounts'
  import AccountsDataTable from '@/components/accounts/AccountsDataTable'

  export default {

    data () {
      return {
        breadcrumbs: [
          {
            text: 'Accounts',
            disabled: false
          },
          {
            text: 'Link 1',
            disabled: false
          },
          {
            text: 'Link 2',
            disabled: true
          }
        ]
      }
    },
    components: {
      AccountsDataTable
    },

    methods: {
      // Edit account
      editAccount () {
        const {newAccount} = this.$data
        this.$apollo.mutate({
          mutation: UPDATE_ACCOUNT,
          variables: {
            id: newAccount._id,
            input: {
              name: newAccount.name,
              description: newAccount.description,
              disabled: newAccount.disabled
            }
          }
        }).then(() => {
          this.newAccount = {}
          this.closeDialog()
        })
      }
    }
  }
</script>
