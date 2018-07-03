<template lang="pug">
    v-dialog(v-model="$store.state.userModule.userDialogStatus" max-width="800px" light)
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
                            ).users__form
                                v-text-field(
                                label="User name"
                                v-model="userData.name"
                                :rules="this.userEditedIndex === -1 ? newUserNameRules : editUserNameRules"
                                :counter="100"
                                required
                                ).formElementColor--text
                                v-text-field(
                                label="Email"
                                required
                                v-model="userData.email"
                                :rules="emailRules"
                                ).formElementColor--text
                                v-text-field(
                                label="Password"
                                required
                                type="password"
                                v-model="userData.password"
                                :rules="passwordRules"
                                :counter="50"
                                v-if="this.userEditedIndex === -1"
                                ).formElementColor--text
                                v-text-field(
                                label="Repeat password"
                                required
                                type="password"
                                v-model="repeatPassword"
                                :rules="repeatedPasswordRules"
                                :counter="50"
                                v-if="this.userEditedIndex === -1"
                                ).formElementColor--text
                                div.users-form__status
                                    div.users-form__status__span Is active:
                                    v-switch(
                                    light
                                    v-model="userData.isActive"
                                    :label="check"
                                    color="success"
                                    :value="!userData"
                                    hide-details
                                    )
                                div.users-form__status
                                    div.users-form__status__span Is admin:
                                    v-switch(
                                    light
                                    v-model="userData.isAdmin"
                                    :label="checkAdmin"
                                    color="success"
                                    :value="!userData"
                                    hide-details
                                    )
                                h2(v-if="$store.state.userModule.userCRUD && !$store.state.userModule.userCRUD.isAdmin") {{ $t('admin_users_view.users')}}
                                v-flex()
                                    v-select(
                                    v-model="userCrudAccountsSelect"
                                    :items="accountsDataGetter"
                                    item-text="name"
                                    item-value="_id"
                                    :label="this.$t('admin_users_view.user')"
                                    multiple
                                    autocomplete
                                    clearable
                                    @input="addAccountToUserList"
                                    ref="accountsSelect"
                                    v-if="$store.state.userModule.userCRUD && !$store.state.userModule.userCRUD.isAdmin"
                                    )
                                        template(slot="selection" slot-scope="data")
                                            v-chip(
                                            :selected="data.selected"
                                            close
                                            @input="data.parent.selectItem(data.item)"
                                            ) {{ data.item.name }}
                                h2(v-if="$store.state.userModule.userCRUD && !$store.state.userModule.userCRUD.isAdmin") {{ $t('admin_users_view.roles')}}

                                v-data-table(
                                :headers="headers"
                                :items="$store.state.userModule.userCRUD.accounts"
                                class="elevation-1"
                                hide-actions
                                disable-initial-sort
                                v-if="$store.state.userModule.userCRUD && !$store.state.userModule.userCRUD.isAdmin"
                                )
                                    template(slot="items" slot-scope="props")
                                        td.text-xs-left {{ getAccountNameFromId(props.item.account) }}
                                        td.text-xs-left
                                            div( v-for="(item, index) in $store.state.configModule.rolesAdmin" :key="index")
                                                v-checkbox(
                                                v-model="prueba"
                                                :label="item"
                                                color="success"
                                                :value="item"
                                                hide-details
                                                :attr-account="props.item.account"
                                                ref="pepepeep-indeex"
                                                )
                                    template(slot="no-data")
                                        v-alert(
                                        :value="true"
                                        color="info"
                                        icon="info") {{ $t('admin_users_view.info_message')}}
                            // TODO: formulario de cambio de contraseña (solo en edicion)
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
                @click.native="userEventHandler"
                :disabled="!valid"
                ) {{ formButtonTitle }}
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  // Components
  import DialogAlert from '@/components/DialogAlert'

  export default {
    name: 'admin-user-dialog',
    components: {
      DialogAlert
    },
    data () {
      return {
        prueba: [],
        inner: false,
        alert: true,
        name: '',
        repeatPassword: '',
        emailRules: [
          (v) => !!v || this.$t('validations.required'),
          v => (typeof v !== 'undefined' && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)) || this.$t('validations.email_format')
          // Check if exists an user email with the same name
          // (v) => !component.userEmails.includes(v) || this.$t('validations.same_email_name')
        ],
        newUserNameRules: [
          (v) => !!v || this.$t('validations.required'),
          (v) => (typeof v !== 'undefined' && v.length > 4 && v.length <= 100) || this.$t('validations.length', {minLength: 5, maxLength: 100})
        ],
        editUserNameRules: [
          (v) => !!v || this.$t('validations.required'),
          (v) => (typeof v !== 'undefined' && v.length > 4 && v.length <= 100) || this.$t('validations.length', {minLength: 5, maxLength: 100})
        ],
        passwordRules: [
          (v) => !!v || this.$t('validations.required'),
          (v) => (typeof v !== 'undefined' && v.length > 5 && v.length <= 50) || this.$t('validations.length', {minLength: 6, maxLength: 50})
        ],
        repeatedPasswordRules: [
          (v) => !!v || this.$t('validations.required'),
          (v) => (typeof v !== 'undefined' && v.length > 5 && v.length <= 50) || this.$t('validations.length', {minLength: 6, maxLength: 50}),
          (v) => (typeof v !== 'undefined' && this.matchPassword) || this.$t('validations.password_must_match')
        ],
        userAccounts: [],
        valid: false,
        headers: [
          {
            text: 'Account',
            align: 'left',
            value: 'name_key_account',
            width: '20%'
          },
          {
            text: 'Roles',
            align: 'left'
          }
        ],
        roles: this.rolesAdminGetter
      }
    },
    computed: {
      ...mapGetters(['accountsDataGetter', 'userNames', 'getUserDialogStatus', 'userCrudAccounts', 'rolesAdminGetter']),
      // Change switch text label
      check () {
        if (this.userData.length && this.userData.isActive) {
          return 'Yes'
        } else {
          return 'No'
        }
      },
      checkAdmin () {
        if (this.userData.length && this.userData.isAdmin) {
          return 'Yes'
        } else {
          return 'No'
        }
      },
      // Form button title
      formButtonTitle () {
        return this.userEditedIndex === -1 ? this.$t('buttons.create') : this.$t('buttons.edit')
      },
      // Form title
      formTitle () {
        return this.userEditedIndex === -1 ? this.$t('admin_users_view.new_user') : this.$t('admin_users_view.edit_user')
      },
      userCrudAccountsSelect: {
        get: function () {
          if (!this.userData.accounts) {
            return []
          }

          let accountsNames = []
          this.userData.accounts.forEach((account) => {
            accountsNames.push({ '_id': account.account })
          })

          return accountsNames
        },
        set: function (e) {
          if (this.userData.accounts) {
            if (e.length > 0) {
              // Quitamos las eliminadas
              let accounts = []
              this.userData.accounts.forEach((account) => {
                e.forEach((selectInputAccount) => {
                  if (account.account === selectInputAccount) {
                    accounts.push(account)
                  }
                })
              })

              // Añadimos las nuevas cuentas
              e.forEach((selectInputAccount) => {
                let found = false
                this.userData.accounts.forEach((account) => {
                  if (account.account === selectInputAccount) {
                    found = true
                  }
                })

                if (!found) {
                  accounts.push({'account': selectInputAccount, 'roles': [], '_typename': 'UserAccount'})
                }
              })
              this.userData.accounts = accounts
            } else {
              this.userData.accounts = []
            }
          }
        }
      },
      //
      userData () {
        return this.$store.state.userModule.userCRUD
      },
      userEditedIndex () {
        return this.$store.state.userModule.userEditedIndex
      },
      matchPassword: function () {
        return this.userData.password === this.repeatPassword
      }
    },
    methods: {
      ...mapActions([
        'userDialogStatusAction',
        'setUserEditedIndexStatusAction',
        'userSchemaAction',
        'usersDataAction',
        'skipQueryAccountsAction'
      ]),
      addAccountToUserList (e) {
        /* if (this.userAccounts.length) {
          this.$refs['accountsSelect'].$el.children[1].children[0].innerText = `${this.$t('admin_users_view.accounts')} (${this.userAccounts.length})`
        } else {
          this.$refs['accountsSelect'].$el.children[1].children[0].innerText = ''
        } */
      },
      // Choose between create or edit user
      userEventHandler () {
        if (this.userEditedIndex === -1) {
          this.sendCreateUserEvent()
        } else {
          this.sendEditUserEvent()
        }
      },
      // Close dialog layer
      closeDialog () {
        this.userDialogStatusAction(false)
        setTimeout(() => {
          this.setUserEditedIndexStatusAction(-1)
          this.userSchemaAction({
            name: '',
            email: '',
            isActive: true,
            isAdmin: false,
            password: ''
          })
        }, 300)
      },
      getAccountNameFromId (id) {
        let name = ''
        this.accountsDataGetter.forEach((account) => {
          if (account._id === id) {
            name = account.name
          }
        })

        return name
      },
      // Send event to create user
      sendCreateUserEvent () {
        this.$root.$emit('createUser', this.userData.name, this.userData.email, this.userData.isActive, this.userData.isAdmin, this.userData.password, this.repeatPassword)
      },
      // Send event to edit user
      sendEditUserEvent () {
        this.$root.$emit('editUser', this.userData._id, this.userData.name, this.userData.email, this.userData.isActive, this.userData.isAdmin)
      },
      createDinamicRole (index, account) {
        console.log(index + '-' + account)
      }
    },
    mounted () {
      // this.skipQueryAccountsAction(false)
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
    .users-form__status {
        display: flex;
        align-items: center;
        height: 30px;
        font-size: 16px;

        &__span {
            margin-right: 14px;
        }
    }
</style>