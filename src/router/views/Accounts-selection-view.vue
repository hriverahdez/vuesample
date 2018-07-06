<template lang="pug">
    v-container(class="account__body fullscreen")
        v-layout(wrap class="card__row-title")
            v-flex().account_selection
                h1.t1 {{ $t('accounts_selection_view.title') }}
                v-form(
                    ref="form"
                    lazy-validation
                    v-model="valid"
                    )
                        br
                        p {{ $t('accounts_selection_view.p1') }}
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
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'AccountSelectionView',
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
        getUser: 'userGetter',
        getUserAccounts: 'userAccounts'
      })
    },
    mounted () {
      this.skipQueryUserAccounts = false
    },
    methods: {
      ...mapActions(['setActiveUserAccountAction']),
      submit () {
        if (this.$refs.form.validate()) {
          this.setActiveUserAccountAction(this.accountSelection)
          this.$router.push({ name: 'dashboard' })
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
    .account__body{
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

    p {
        text-align: left !important;
    }

    .account_selection{
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
    .account_selection .logo{
        display:block;
        max-width:100%;
        margin:0 auto
    }
    .account_selection .t1{
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
    .account_selection .t1.error{
        color:#eb2224
    }
    .account_selection .form-control{
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
    .account_selection .form-control:focus{
        border-color:#8ed2ce
    }
    .account_selection .form-control.error{
        border-color:#eb2224
    }
    .account_selection .checkbox{
        color:#bfc2c5;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none
    }
    .account_selection .checkbox input[type=checkbox]{
        position:absolute;
        width:1px;
        height:1px;
        margin:4px 0 0;
        outline:none;
        border:1px solid transparent;
        background-color:transparent
    }
    .account_selection .checkbox input[type=checkbox]+label::before{
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
    .account_selection .checkbox input[type=checkbox]:focus+label::before{
        border-color:#8ed2ce
    }
    .account_selection .checkbox input[type=checkbox]:checked+label::before{
        background:url(../../assets/checkbox.png) no-repeat center/contain;
        border-color:#039fbf
    }
    .account_selection .checkbox label{
        font-size:14px;
        cursor:pointer
    }
    .account_selection .btn{
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
    .account_selection .t2{
        text-align:center;
        margin:42px auto 0;
        letter-spacing:0.05em
    }
    .account_selection .t2 a{
        color:#03b0bb
    }
    .account_selection label {
        color: #8a9cad !important;
    }
</style>
