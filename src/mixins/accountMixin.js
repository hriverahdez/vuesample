import { CREATE_NEW_ACCOUNT, GET_ACCOUNTS, DELETE_ACCOUNT, UPDATE_ACCOUNT } from '@/graphql/account'
import { mapMutations, mapActions } from 'vuex'

const accountMixin = {
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
      'accountSchemaAction',
      'editedIndexStatusAction'
    ]),
    ...mapMutations(['SET_ALERT_MESSAGE']),
    // Create account mutation
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
      })
      .then(() => {
        this.$apollo.queries.accounts.refresh()
        this.SET_ALERT_MESSAGE({
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
    // Delete account mutation
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
    },
    editAccount (id, name, description, disabled) {
      this.$apollo.mutate({
        mutation: UPDATE_ACCOUNT,
        context: {
          uri: 'account'
        },
        variables: {
          id: id,
          input: {
            name: name,
            description: description,
            disabled: disabled
          }
        },
        update: (store) => {
          const data = store.readQuery({ query: GET_ACCOUNTS })
          data.accounts.map((item) => {
            if (item._id === id) {
              item.description = description
              item.disabled = disabled
            }
          })
          store.writeQuery({ query: GET_ACCOUNTS, data })
        }
      })
      .then(() => {
        this.editedIndexStatusAction(-1)
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('accounts_view.edit_success'),
          buttonText: this.$t('buttons.close')
        })
        this.accountDialogStatusAction(false)
        this.accountSchemaAction({
          name: '',
          description: '',
          disabled: ''
        })
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
    this.$root.$on('editAccount', (id, name, description, disabled) => {
      this.editAccount(id, name, description, disabled)
    })
  },
  beforeDestroy () {
    this.$root.$off()
  }
}

export default accountMixin
