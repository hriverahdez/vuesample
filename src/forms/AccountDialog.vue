<template lang="pug">
    v-dialog(v-model="$store.state.accountsModule.accountDialogStatus" max-width="500px")
      v-card
        v-card-title.grey.lighten-4.py-4.title {{ formTitle }}
        v-card-text
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12)
                v-form.accounts__form
                    v-text-field(label="Account name" v-model="newAccount.name")
                    v-text-field(label="Description" v-model="newAccount.description")
                    div.accounts-form__status
                        Span.accounts-form__status__span Status:
                        v-switch(
                            v-model="newAccount.disabled"
                            :label="check"
                            color="teal"
                            :value="!newAccount"
                            hide-details
                        )
        v-card-actions
          v-spacer
          v-btn(color="blue darken-1" flat @click.native="closeDialog") Cancel
          v-btn(color="blue darken-1" flat @click.native="accountEventHandler") {{ formButtonTitle }}
</template>

<script>
import { CREATE_NEW_ACCOUNT } from '@/graphql/accounts'

export default {
  name: 'account-dialog',
  data () {
    return {
      editedIndex: -1,
      newAccount: {
        name: null,
        description: null,
        disabled: false
      }
    }
  },
  computed: {
    // Temporal pruebas cambiar texto del switch
    check () {
      if (this.newAccount.disabled) {
        return 'Active'
      } else {
        return 'Inactive'
      }
    },
    // Form button title
    formButtonTitle () {
      return this.editedIndex === -1 ? 'Create' : 'Edit'
    },
    // Form title
    formTitle () {
      return this.editedIndex === -1 ? 'New account' : 'Edit account'
    }
  },
  methods: {
    // Choose between create or edit account
    accountEventHandler () {
      if (this.editedIndex === -1) {
        this.createAccount()
      } else {
        this.editAccount()
      }
    },
    // Close dialog layer
    closeDialog () {
      this.$store.dispatch('accountDialogStatusAction', false)
      setTimeout(() => {
        this.newAccount = {}
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
            description: newAccount.description,
            disabled: newAccount.disabled
          }
        }
      }).then(() => {
        this.closeDialog()
      })
    }
  }
}
</script>

