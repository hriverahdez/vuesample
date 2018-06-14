<template lang="pug">
    v-container(class="login__section fullscreen")
        v-layout(wrap class="card__row-title")
            v-flex(xs12 sm12 offset-sm1 mt-3).login
                h4.login_title LOG IN
                v-form(
                    ref="form"
                    lazy-validation
                    v-model="valid"
                    ).login__form
                        v-text-field(
                            :label="this.$t('login_view.email')"
                            v-model="email"
                            :rules="emailRules"
                            required
                            :disabled="!checkIsLoading"
                        )
                        v-text-field(
                            :label="this.$t('login_view.password')"
                            v-model="password"
                            :rules="passwordRules"
                            required
                            type="password"
                            :disabled="checkIsLoading()"
                        )
                        v-checkbox(
                            v-model="checkbox"
                            :label="this.$t('login_view.remember')"
                            :disabled="checkIsLoading()"
                        )
                        v-btn(
                            color="info"
                            @click.stop.prevent="submit"
                            :disabled="checkIsLoading()"
                        ) {{ $t('buttons.signin') }}
                v-card().login_sidebar
                    h4().block__sidebar__title
                        img(src="@/assets/logo.png", alt="Mediation logo", style="height: 54px")
                        strong Mediation layer panel
                    div().login__block__sidebar__item
                        p The mediation panel helps you configure your apps and ad networks to monetize your campaigns in the best way.
                    div().login__block__sidebar__place
                        v-icon location_on
                        span Madrid, SPAIN
                        br
                        a(href="https://www.mobusi.com/" target="_blank") https://www.mobusi.com
</template>

<script>
  import axios from 'axios'
  import userMixin from '@/mixins/userMixin'
  import { mapGetters, mapActions, mapMutations } from 'vuex'

  export default {
    name: 'login-view',
    mixins: [userMixin],
    data: () => ({
      valid: true,
      password: '',
      passwordRules: [
        v => !!v || 'Password can not be empty',
        v => (v && v.length >= 6) || 'Password must be greater than 6 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail can not be empty',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      checkbox: false,
      isLoading: false
    }),
    computed: {
      ...mapGetters({
        getUser: 'userGetter',
        getUserAccountsNum: 'userAccountsNumberGetter'
      })
    },
    methods: {
      ...mapActions(['tokenDataAction', 'setActiveUserAccountByIndexAction']),
      ...mapMutations(['SET_ALERT_MESSAGE']),
      checkIsLoading () {
        return this.isLoading
      },
      submit () {
        if (this.$refs.form.validate()) {
          this.isLoading = true
          axios
            .post('http://stage.do.linkitox.com/api/token', {}, {
              auth: {
                username: this.email,
                password: this.password
              }
            })
            .then(response => {
              if (response.data.token) {
                this.tokenDataAction(response.data.token)
                // vamos a consultar en graphQL por los datos de usuario
                this.queryUser(this.email)
              } else {
                this.SET_ALERT_MESSAGE({
                  show: true,
                  type: 'success',
                  message: this.$t('login_view.error_user_not_valid'),
                  buttonText: this.$t('buttons.close')
                })
              }
            })
            .catch(error => {
              console.log(error)
              this.isLoading = false
              this.SET_ALERT_MESSAGE({
                show: true,
                type: 'success',
                message: this.$t('login_view.error_user_not_valid'),
                buttonText: this.$t('buttons.close')
              })
            })
            .finally(() => (this.isLoading = false))
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .login__section{
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
  }
</style>