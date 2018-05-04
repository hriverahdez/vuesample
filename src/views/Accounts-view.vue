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
      v-btn(color="blue darken-1" dark slot="activator").mb-2 New account
      v-card
        v-card-title
          span.headline {{ formTitle }}
        v-card-text
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12)
                v-text-field(label="Account name" v-model="newAccount.name")
              v-flex(xs12)
                v-text-field(label="Description" v-model="newAccount.description")
              v-flex(xs12)
                v-text-field(label="Status" v-model="newAccount.disabled")
        v-card-actions
          v-spacer
          v-btn(color="blue darken-1" flat @click.native="closeDialog") Cancel
          v-btn(color="blue darken-1" flat @click.native="createAccount") Create
    // Accounts data table
    v-data-table(
      :headers="headers"
      :items="accounts"
      hide-actions
      class="elevation-1"
    )
      template(slot="items" slot-scope="props")
        td.text-xs-left {{ props.item.name}}
        td.text-xs-left {{ props.item.disabled }}
        td.justify-center
          v-btn(icon @click="").mx-0
            v-icon(color="teal") edit
          v-btn(icon @click="").mx-0
            v-icon(color="blue") clear
          v-btn(icon @click="deleteAccount(props.item)").mx-0
            v-icon(color="pink") delete
</template>

<script>
  import { GET_ACCOUNTS, CREATE_NEW_ACCOUNT } from '../graphql'

  export default {
    apollo: {
      accounts: {
        query: GET_ACCOUNTS,
        pollInterval: 100,
        loadingKey: 'loading'
      }
    },
    watch: {
      dialog (val) {
        val || this.closeDialog()
      }
    },
    data () {
      return {
        formTitle: 'New Account',
        newAccount: {
          name: null,
          description: null
        },
        defaultItem: {
          name: '',
          status: null
        },
        editedIndex: -1,
        dialog: false,
        accounts: [],
        headers: [
          {
            text: 'Name',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Active', value: 'active' },
          { text: 'Actions',
            align: 'center',
            value: 'actions'
          }
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
        ]
      }
    },
    computed: {
      // Temporal para eliminar cuentas
      cuentas () {
        let ids = []
        this.accounts.map((id) => {
          ids.push(id._id)
        })
        return ids.join()
      }
    },
    methods: {
      closeDialog () {
        this.dialog = false
      },
      deleteAccount (account) {
        console.log(account._id)
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
          },
          update: (store, { data: { createAccount } }) => {
            const data = store.readQuery({
              query: GET_ACCOUNTS
            })
            data.accounts.push(createAccount)
            store.writeQuery({
              query: GET_ACCOUNTS,
              data })
          }
        })
        this.closeDialog()
      }
    }
  }
</script>