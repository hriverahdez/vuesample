<template lang="pug">
    v-container(class="login__section fullscreen")
        v-layout(wrap class="card__row-title")
            v-flex(xs12 sm12 offset-sm1 mt-3).account_selection
                h1.account_selection_title {{ $t('accounts_selection_view.title') }}
                v-form(
                    ref="form"
                    lazy-validation
                    v-model="valid"
                    ).account_selection__form
                        p {{ $t('accounts_selection_view.p1') }}
                        p {{ $t('accounts_selection_view.p2') }}
                        v-select(
                            :label="this.$t('accounts_selection_view.select_account')"
                            v-model="accountSelection"
                            :rules="accountSelectionRules"
                            required
                            class="input-group--focused"
                            :items="getUserAccounts"
                            item-value="_id"
                            item-text="name"
                        )
                        v-btn(
                            color="info"
                            @click.stop.prevent="submit"
                        ) {{ $t('buttons.apply') }}
</template>

<script>
  import userMixin from '@/mixins/userMixin'
  import { mapGetters, mapActions, mapMutations } from 'vuex'

  export default {
    name: 'account-selection-view',
    mixins: [userMixin],
    data: () => ({
      valid: true,
      accountSelection: '',
      accountSelectionRules: [
        v => !!v || 'You must select an account'
      ],
      isLoading: false
    }),
    computed: {
      ...mapGetters({
        getUserAccountsIds: 'userAccountsIds',
        getUserAccounts: 'userAccounts'
      })
    },
    methods: {
      ...mapActions(['setActiveUserAccountAction']),
      // ...mapMutations(['SET_ALERT_MESSAGE']),
      submit () {
        if (this.$refs.form.validate()) {
          console.log(this.accountSelection)
          this.setActiveUserAccountAction(this.accountSelection)
          this.$router.push({ name: 'dashboard' })
        }
      }
    },
    mounted () {
      this.skipQueryUserAccounts = false
    }
  }
</script>

<style lang="scss" scoped>

  /*.login__section{
     background: transparent url("../../assets/background.jpg") !important;
  }

  .fullscreen{
      position: fixed;
      z-index: 20000;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      overflow-y: auto;
      margin: 0 auto;
      background-size: cover !important;
      max-width: 100%;
  }

  .login{
      min-width: 21.42rem;
      max-width: 50rem;
      margin: 0 auto;
      padding: 5.50rem 4.85rem 5.50rem !important;
      -webkit-border-radius: 10px;
      border-radius: 10px;
      overflow: hidden;
      background-color: #ffffff;
      position: relative;
      margin-top: 12% !important;
  }

  @media (min-width: 992px) {
      .login__form{
          margin-right: 21.42rem;
      }
  }

  .login__form{
      position: relative;
      z-index: 2;
      box-sizing: inherit;
      color: #514d6a;
  }

  .login_sidebar{
    display: none;
  }

  @media (min-width: 992px) {
    .login_sidebar{
      position: absolute;
      display: block;
      top: 0;
      right: 0;
      bottom: 0;
      width: 21.42rem;
      padding: 2.71rem 2.85rem;
      color: #ffffff;
      background: #222034;
      border-radius: 0 10px 10px 0;
    }
  }

  .login_title{
      text-transform: uppercase!important;
      text-align: left !important;
      font-size: 1.5rem;
  }

  .block__sidebar__title{
      font-size: 1.5rem;
      margin-bottom: 1.42rem;
      line-height: 1.5;
  }

  .login__block__sidebar__item{
      text-align: justify !important;
      padding-left: 1.42rem;
      border-left: 2px solid #74708d;
      margin-bottom: 1.42rem;
      color: #74708d;
  }

  .login__block__sidebar__place {
      text-align: left !important;
      font-weight: bold;
      position: absolute;
      z-index: 2;
      bottom: 1rem;
      left: 2.85rem;
      color: #fff !important;
      font-size: 0.9rem;
  }

  .login__block__sidebar__place i {
      color: #fff !important;
  }

  .login__block__sidebar__place a {
      text-decoration: none;
      color: #74708d;
  }

  .login__block__sidebar__place a:hover {
      text-decoration: none;
  }

  .content--wrap{
      background: transparent url("../../assets/background.jpg") !important;
  }*/
</style>