<template lang="pug">
  v-container(class="accounts__section")
    v-layout(wrap class="card__row-title")
      v-flex(xs12)
        v-breadcrumbs(divider="/" large)
          v-breadcrumbs-item {{ $t('navigation.accounts') }}
        accounts-data-table
</template>

<script>
  import { mapActions, mapMutations } from 'vuex'
  // Queries
  import { CREATE_NEW_ACCOUNT, DELETE_ACCOUNT, GET_ACCOUNTS } from '@/graphql/account'
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
      ...mapActions([
        'accountsDataAction',
        'accountDialogStatusAction',
        'accountSchemaAction'
      ]),
      ...mapMutations(['setAlertMessage']),
      // Create account
      createAccount (name, description, disabled) {
        this.$apollo.mutate({
          mutation: CREATE_NEW_ACCOUNT,
          context: {
            uri: 'account'
          },
          variables: {
            input: {
              name: name,
              description: description,
              disabled: disabled || false
            }
          },
          update: (store, { data: { createAccount } }) => {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query: GET_ACCOUNTS })
            // Add our tag from the mutation to the end
            data.accounts.push(createAccount)
            // Write our data back to the cache.
            store.writeQuery({ query: GET_ACCOUNTS, data })
          }
        }).then(() => {
          this.$apollo.queries.accounts.refresh()
          this.setAlertMessage({
            show: true,
            type: 'success',
            message: this.$t('accounts_view.new_success'),
            buttonText: this.$t('buttons.close')
          })
        })
        this.accountDialogStatusAction(false)
        this.accountSchemaAction({
          name: '',
          description: '',
          disabled: ''
        })
      },
      // Delete account
      deleteAccount (account) {
        this.$apollo.mutate({
          mutation: DELETE_ACCOUNT,
          context: {
            uri: 'account'
          },
          variables: {
            ids: account._id
          },
          update: (store) => {
            const data = store.readQuery({ query: GET_ACCOUNTS })
            data.accounts = data.accounts.filter((item) => {
              return item._id !== account._id
            })
            store.writeQuery({ query: GET_ACCOUNTS, data })
          }
        })
        .then(() => {
          this.$apollo.queries.accounts.refresh()
        })
      }
    },
    mounted () {
      // Receive events from components
      this.$root.$on('createAccount', (name, description, disabled) => {
        this.createAccount(name, description, disabled)
      })
      this.$root.$on('deleteAccount', (account) => {
        this.deleteAccount(account)
      })
    }
  }
</script>
