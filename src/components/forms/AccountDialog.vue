<template lang="pug">
    v-dialog(v-model="$store.state.accountsModule.accountDialogStatus" max-width="500px" light)
      dialog-alert
      v-card
        v-card-title.form_elements_color.py-4.title.white--text {{ formTitle }}
        v-card-text.card__text__form
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12)
                dialog-alert
                v-form(
                  lazy-validation
                  v-model="valid"
                  ).accounts__form
                    v-text-field(
                      :disabled="this.editedIndex !== -1"
                      label="Account name"
                      v-model="dataAccount.name"
                      :rules="this.editedIndex === -1 ? newAccountNameRules : editAccountNameRules"
                      :counter="30"
                      required
                      ).form_elements_color--text
                    v-text-field(
                      label="Description"
                      v-model="dataAccount.description"
                      ).form_elements_color--text
                    div.accounts-form__status
                        div.accounts-form__status__span Status:
                        v-switch(
                            light
                            v-model="dataAccount.disabled"
                            :label="check"
                            color="success"
                            :value="!dataAccount"
                            hide-details
                        )
        v-card-actions
          v-spacer
          v-btn(
            color="form_elements_color"
            flat
            @click.native="closeDialog"
            ) {{ $t('buttons.cancel') }}
          v-btn(
            class="white--text"
            color="form_elements_color"
            @click.native="accountEventHandler"
            :disabled="!valid"
            ) {{ formButtonTitle }}
</template>

<script>
import DialogAlert from '@/components/DialogAlert'
import { CREATE_NEW_ACCOUNT, UPDATE_ACCOUNT } from '@/graphql/accounts'

export default {
  name: 'account-dialog',
  components: {
    DialogAlert
  },
  data () {
    let component = this
    return {
      inner: false,
      alert: true,
      name: '',
      newAccountNameRules: [
        (v) => !!v || this.$t('validations.required'),
        (v) => (v.length > 4 && v.length <= 30) || this.$t('validations.length', {minLength: 5, maxLength: 30}),
        // Check if exists an account with the same name
        (v) => !component.accountNames.includes(v) || this.$t('validations.same_account_name')
      ],
      editAccountNameRules: [
        (v) => !!v || this.$t('validations.required'),
        (v) => (v.length > 4 && v.length <= 30) || this.$t('validations.length', {minLength: 5, maxLength: 30})
      ],
      valid: false
    }
  },
  computed: {
    // Get the account names from store
    accountNames () {
      return this.$store.getters.accountNames
    },
    // Change switch text label
    check () {
      if (this.dataAccount.disabled) {
        return 'Active'
      } else {
        return 'Inactive'
      }
    },
    // Form button title
    formButtonTitle () {
      return this.editedIndex === -1 ? this.$t('buttons.create') : this.$t('buttons.edit')
    },
    // Form title
    formTitle () {
      return this.editedIndex === -1 ? this.$t('accounts_view.new_account') : this.$t('accounts_view.edit_account')
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
        this.$store.commit('setAlertMessage', {
          show: true,
          type: 'success',
          message: this.$t('accounts_view.new_success'),
          buttonText: this.$t('buttons.close')
        })
      })
      this.$store.dispatch('accountDialogStatusAction', false)
      this.$store.dispatch('dataAccountAction', {
        name: '',
        description: '',
        disabled: ''
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
        this.$store.dispatch('editedIndexAction', -1)
        this.$store.commit('setAlertMessage', {
          show: true,
          type: 'success',
          message: this.$t('accounts_view.edit_success'),
          buttonText: this.$t('buttons.close')
        })
        this.$store.dispatch('accountDialogStatusAction', false)
        this.$store.dispatch('dataAccountAction', {
          name: '',
          description: '',
          disabled: ''
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.alert__container {
  height: 50px;
}
.card__text.card__text__form {
  padding: 30px;
}
.card__actions {
  padding: 0 20px 20px 20px;
}
.accounts-form__status {
  display: flex;
  align-items: center;
  height: 30px;
  font-size: 16px;

  &__span {
    margin-right: 14px;
  }
}
</style>


