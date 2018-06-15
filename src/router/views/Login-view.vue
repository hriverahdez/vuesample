<template lang="pug">
    v-container(class="login__body fullscreen")
        v-layout(wrap class="card__row-title")
            v-flex().login
                img(src="@/assets/logo-labcave.png").logo
                h2.t1 Sign in to start your sesion
                v-form(
                    ref="form"
                    lazy-validation
                    v-model="valid"
                    )
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
                        ).checkbox
                        v-btn(
                            @click.stop.prevent="submit"
                            :disabled="checkIsLoading()"
                        ).btn-submit {{ $t('buttons.signin') }}
                        br
                        p.t2 {{ $t('login_view.not_register') }}&nbsp;
                            a(href="mailto:mediation@labcavegames.com") {{ $t('login_view.click_here') }}
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
                this.tokenDataAction({token: response.data.token, rememberMe: this.checkbox})
                // vamos a consultar en graphQL por los datos de usuario
                this.queryUser(this.email)
              } else {
                // TODO: no se ven los alerts de mensajes de error
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

    .login__body{
        font-family:'brandon-grotesque', sans-serif !important;
        font-weight:400 !important;
        -webkit-font-smoothing:antialiased !important;
        background:#fafbfc !important;
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

    img{
        height:auto  !important
    }
    a{
        color: #03b0bb;
        text-decoration:none
    }
    .login{
        width:100%;
        max-width:380px;
        margin:0 auto;
        padding:27.1vh 0 0 !important;
        color:#8a9cad
    }
    @media (max-width: 420px){
        .login{
            padding:10vh 7.5% 0
        }
    }
    .login .logo{
        display:block;
        max-width:100%;
        margin:0 auto
    }
    .login .t1{
        margin-top:55px;
        padding:0 0 25px;
        font-size:14px;
        font-weight:700;
        letter-spacing:0.065em;
        text-transform:uppercase;
        color:rgba(169,173,177,0.75);
        text-align:center;
        border-bottom:1px solid #ecedee
    }
    .login .t1.error{
        color:#eb2224
    }
    .login .form-control{
        display:block;
        width:100%;
        margin:15px 0 0;
        padding:13px 20px 12px;
        font-size:17px;
        letter-spacing:0.02em;
        color:#383d47;
        background:#f5f6f7;
        border-radius:3px;
        outline:none;
        border:1px solid transparent
    }
    .login .form-control:focus{
        border-color:#8ed2ce
    }
    .login .form-control.error{
        border-color:#eb2224
    }
    .login .checkbox{
        color:#bfc2c5;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none
    }
    .login .checkbox input[type=checkbox]{
        position:absolute;
        width:1px;
        height:1px;
        margin:4px 0 0;
        outline:none;
        border:1px solid transparent;
        background-color:transparent
    }
    .login .checkbox input[type=checkbox]+label::before{
        content:'';
        display:inline-block;
        margin:0 8px 0 0;
        width:13px;
        height:13px;
        border:1px solid #bfc2c5;
        position:relative;
        top:2px;
        background-color:#fff
    }
    .login .checkbox input[type=checkbox]:focus+label::before{
        border-color:#8ed2ce
    }
    .login .checkbox input[type=checkbox]:checked+label::before{
        background:url(../../assets/checkbox.png) no-repeat center/contain;
        border-color:#039fbf
    }
    .login .checkbox label{
        font-size:14px;
        cursor:pointer
    }
    .login .btn{
        width:100%;
        margin: 0px;
        padding:19px 0 38px;
        font-size:15px;
        font-weight:700;
        letter-spacing:0.1em;
        text-transform:uppercase;
        color:#fff;
        border-radius:3px;
        background-color:#02a6c3;
        background-image:-webkit-gradient(linear, left top, right top, from(#02a6c3), to(#01ced7));
        background-image:linear-gradient(to right, #02a6c3 0%, #01ced7 100%);
        outline:none;
        cursor:pointer
    }
    .login .t2{
        text-align:center;
        margin:42px auto 0;
        letter-spacing:0.05em
    }
    .login .t2 a{
        color:#03b0bb
    }
    .login label {
        color: #8a9cad !important;
    }
</style>