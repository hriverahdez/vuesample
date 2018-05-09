<template lang="pug">
    v-dialog(v-model="$store.state.accountsModule.accountDialogStatus" max-width="500px")
      v-card
        v-card-title.grey.lighten-4.py-4.title {{ formTitle }}
        v-card-text
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12)
                v-form(
                  lazy-validation
                  v-model="valid"
                  ).accounts__form
                    v-text-field(
                      label="Account name"
                      v-model="dataAccount.name"
                      :rules="accountNameRules"
                      :counter="30"
                      required
                      )
                    v-text-field(label="Description" v-model="dataAccount.description")
                    div.accounts-form__status
                        Span.accounts-form__status__span Status:
                        v-switch(
                            v-model="dataAccount.disabled"
                            :label="check"
                            color="teal"
                            :value="!dataAccount"
                            hide-details
                        )
        v-card-actions
          v-spacer
          //- v-btn(color="blue darken-1" flat @click.native="clear") Reset
          v-btn(color="blue darken-1" flat @click.native="closeDialog") Cancel
          v-btn(
            color="blue darken-1"
            flat
            @click.native="accountEventHandler"
            :disabled="!valid"
            ) {{ formButtonTitle }}
</template>

<script>
import { CREATE_NEW_ACCOUNT, UPDATE_ACCOUNT } from '@/graphql/accounts'

export default {
  name: 'account-dialog',
  data () {
    return {
      name: '',
      accountNameRules: [
        (v) => !!v || this.$t('validations.required'),
        (v) => (v.length > 4 && v.length <= 30) || this.$t('validations.length', {minLength: 5, maxLength: 30})
      ],
      valid: false
    }
  },
  computed: {
    // Temporal pruebas cambiar texto del switch
    check () {
      if (this.dataAccount.disabled) {
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
    },
    //
    dataAccount () {
      return this.$store.state.accountsModule.dataAccount
    },
    editedIndex () {
      return this.$store.state.accountsModule.editedIndex
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
        this.$store.dispatch('editedIndexAction', -1)
        this.$store.dispatch('dataAccountAction', {
          name: '',
          description: '',
          disabled: false})
      }, 300)
    },
    // Create new account Apollo mutation
    createAccount () {
      this.$apollo.mutate({
        mutation: CREATE_NEW_ACCOUNT,
        variables: {
          input: {
            name: this.dataAccount.name,
            description: this.dataAccount.description,
            disabled: this.dataAccount.disabled
          }
        }
      }).then(() => {
        this.closeDialog()
      })
    },
    // Edit account
    editAccount () {
      this.$apollo.mutate({
        mutation: UPDATE_ACCOUNT,
        variables: {
          id: this.dataAccount._id,
          input: {
            name: this.dataAccount.name,
            description: this.dataAccount.description,
            disabled: this.dataAccount.disabled
          }
        }
      }).then(() => {
        this.$store.dispatch('dataAccountAction', {
          name: '',
          description: '',
          disabled: ''})
        this.closeDialog()
      })
    }
  }
}
</script>

