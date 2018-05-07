<template lang="pug">
  section.accounts__section
    v-flex(xs12)
        v-breadcrumbs(divider="-")
            v-breadcrumbs-item(
                v-for="breadcrumb in breadcrumbs"
                :key="breadcrumb.text"
                :disabled="breadcrumb.disabled"
            ) {{ breadcrumb.text }}
    // New account dialog
    v-dialog(v-model="dialog" max-width="500px")
      v-card
        v-card-title
          span.headline {{ formTitle }}
        v-card-text
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12)
                v-form.accounts__form
                    v-text-field(
                      label="Account name"
                      v-model="newAccount.name"
                      :rules="accountNameRules"
                      )
                    v-text-field(label="Description" v-model="newAccount.description")
                    div.accounts-form__status
                        Span.accounts-form__status__span Status:
                        v-switch(
                            v-model="newAccount.status"
                            :label="check"
                            color="teal"
                            value="true"
                            hide-details
                        )
        v-card-actions
          v-spacer
          v-btn(color="blue darken-1" flat @click.native="closeDialog") Cancel
          v-btn(color="blue darken-1" flat @click.native="accountEventHandler") {{ formButtonTitle }}
    // Accounts data table
    v-card
        v-card-title(color="blue darken-1") Accounts list
            v-spacer
            v-btn(color="blue darken-1" dark @click="activeDialog").mb-2 New account
        v-layout(wrap).card__row2
            v-flex(xs3 offset-xs9)
                v-text-field(
                append-icon="search"
                label="Search"
                single-line
                hide-details
                v-model="search"
                )
    v-data-table(
      :headers="headers"
      :items="accounts"
      :search="search"
      class="elevation-1"
    )
      template(slot="items" slot-scope="props")
        td.text-xs-left {{ props.item.name}}
        td.text-xs-left {{ props.item.disabled }}
        td.justify-center
          v-btn(icon @click="editAccountDialog(props.item)").mx-0
            v-icon(color="teal") edit
          v-btn(icon @click="").mx-0
            v-icon(color="blue") clear
          v-btn(icon @click="deleteAccount(props.item)").mx-0
            v-icon(color="pink") delete
      template(slot="no-data")
        v-alert(
         :value="true"
         color="error"
         icon="warning") {{ $t('accounts_view.alert_message')}}
</template>

<script>
  import { GET_ACCOUNTS, CREATE_NEW_ACCOUNT, DELETE_ACCOUNT, UPDATE_ACCOUNT } from '../graphql'

  export default {

    data () {
      return {
        accounts: [],
        accountNameRules: [
          (v) => !!v || this.$t('validations.required'),
          (v) => v.length >= 5 || this.$t('validations.errorLength', {minLength: 5, maxLengt: 30})
        ],
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
        ],
        dialog: false,
        editedIndex: -1,
        headers: [
          {
            text: 'Name',
            align: 'left',
            value: 'name'
          },
          { text: 'Active', value: 'active' },
          { text: 'Actions',
            sortable: false,
            align: 'center',
            value: 'actions'
          }
        ],
        newAccount: {
          name: null,
          description: null,
          status: false
        },
        search: ''
      }
    },

    computed: {
      // Temporal pruebas cambiar texto del switch
      check () {
        if (this.newAccount.status) {
          return 'Active'
        } else {
          return 'Inactive'
        }
      },
      // Temporal para eliminar cuentas
      cuentas () {
        let ids = []
        this.accounts.map((id) => {
          ids.push(id._id)
        })
        return ids.join()
      },
      formButtonTitle () {
        return this.editedIndex === -1 ? 'Create' : 'Edit'
      },
      formTitle () {
        return this.editedIndex === -1 ? 'New account' : 'Edit account'
      }
    },

    apollo: {
      accounts: {
        query: GET_ACCOUNTS,
        pollInterval: 100,
        loadingKey: 'loading'
      }
    },

    // watch: {
    //   dialog (val) {
    //     val || this.closeDialog()
    //   }
    // },

    methods: {
      // Choose between create or edit account
      accountEventHandler () {
        if (this.editedIndex === -1) {
          this.createAccount()
        } else {
          this.editAccount()
        }
      },
      // Active dialog layer
      activeDialog () {
        this.dialog = true
      },
      // Close dialog layer
      closeDialog () {
        this.dialog = false
        setTimeout(() => {
          this.editedIndex = -1
        }, 300)
      },
      // Create new account Apollo mutation
      createAccount () {
        const {newAccount} = this.$data
        this.$apollo.mutate({
          mutation: CREATE_NEW_ACCOUNT,
          variables: {
            input: {
              name: newAccount.name,
              description: newAccount.description
            }
          }
        //   update: (store, { data: { createAccount } }) => {
        //     const data = store.readQuery({
        //       query: GET_ACCOUNTS
        //     })
        //     data.accounts.push(createAccount)
        //     store.writeQuery({
        //       query: GET_ACCOUNTS,
        //       data })
        //   }
        }).then(() => {
          this.newAccount = {}
          this.search = ''
          this.closeDialog()
        })
      },
      // Delete account
      deleteAccount (account) {
        this.$apollo.mutate({
          mutation: DELETE_ACCOUNT,
          variables: {
            ids: account._id
          }
        }).then(() => {
          this.newAccount = {}
        })
      },
      // Edit account
      editAccount () {
        const {newAccount} = this.$data
        this.$apollo.mutate({
          mutation: UPDATE_ACCOUNT,
          variables: {
            id: newAccount._id,
            input: {
              name: newAccount.name,
              description: newAccount.description
            }
          }
        }).then(() => {
          this.newAccount = {}
          this.closeDialog()
        })
      },
      // Show edit account dialog
      editAccountDialog (account) {
        this.editedIndex = this.accounts.indexOf(account)
        this.newAccount = Object.assign({}, account)
        this.dialog = true
      }
    }
  }
</script>

<style lang="scss" scoped>
.card__title {
    border-bottom: 1px solid rgba(0,0,0,0.12);
    text-transform: uppercase;
}
.card__row2 {
    padding: 15px;
}
.accounts-form__status {
    align-items: center;
    display: flex;
    color: rgba(0,0,0,0.54);
    font-size: 16px;

    &__span {
          padding-right: 18px;
    }
}
</style>
