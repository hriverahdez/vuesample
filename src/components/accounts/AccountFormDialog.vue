<template lang="pug">
    v-dialog(v-model="$store.state.accountModule.accountDialogStatus" max-width="500px" light)
      //- dialog-alert
      v-card
        v-card-title.formElementColor.py-4.title.white--text {{ formTitle }}
        v-card-text.card__text__form
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12)
                //- dialog-alert
                v-form(
                  lazy-validation
                  v-model="valid"
                  ).accounts__form
                    v-text-field(
                      :disabled="this.editedIndex !== -1"
                      label="Account name"
                      v-model="accountData.name"
                      :rules="this.editedIndex === -1 ? newAccountNameRules : editAccountNameRules"
                      :counter="30"
                      required
                      ).formElementColor--text
                    v-text-field(
                      label="Description"
                      v-model="accountData.description"
                      ).formElementColor--text
                    div.accounts-form__status
                        div.accounts-form__status__span Status:
                        v-switch(
                            light
                            v-model="accountData.disabled"
                            :label="check"
                            color="success"
                            :value="!accountData"
                            hide-details
                        )
        v-card-actions
          v-spacer
          v-btn(
            color="buttonColor"
            flat
            @click.native="closeDialog"
            ) {{ $t('buttons.cancel') }}
          v-btn(
            class="white--text"
            color="buttonColor"
            @click.native="accountEventHandler"
            :disabled="!valid"
            ) {{ formButtonTitle }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// Components
import DialogAlert from '@/components/DialogAlert'

export default {
  name: 'AccountDialog',
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
    ...mapGetters(['accountNames']),
    // Change switch text label
    check () {
      if (this.accountData.disabled) {
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
    accountData () {
      return this.$store.state.accountModule.accountData
    },
    editedIndex () {
      return this.$store.state.accountModule.editedIndex
    }
  },
  methods: {
    ...mapActions([
      'accountDialogStatusAction',
      'editedIndexStatusAction',
      'accountSchemaAction',
      'accountsDataAction'
    ]),
    // Choose between create or edit account
    accountEventHandler () {
      if (this.editedIndex === -1) {
        this.sendCreateAccountEvent()
      } else {
        this.sendEditAccountEvent()
      }
    },
    // Close dialog layer
    closeDialog () {
      this.accountDialogStatusAction(false)
      setTimeout(() => {
        this.editedIndexStatusAction(-1)
        this.accountSchemaAction({
          name: '',
          description: '',
          disabled: false})
      }, 300)
    },
    // Send event to create account
    sendCreateAccountEvent () {
      this.$root.$emit('createAccount', this.accountData.name, this.accountData.description, this.accountData.disabled)
    },
    // Send event to edit account
    sendEditAccountEvent () {
      this.$root.$emit('editAccount', this.accountData._id, this.accountData.name, this.accountData.description, this.accountData.disabled)
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
