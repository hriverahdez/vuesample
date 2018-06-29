import { GET_USER, GET_USER_BY_TOKEN } from '@/graphql/user'
import { GET_ACCOUNTS_BY_USER_ID } from '@/graphql/account'
import { mapActions } from 'vuex'

cot userMixin = {
  apollo: {
    user: {
      query: GET_USER,
      context: {
        uri: 'user'
      },
      variables () {
        return {
          email: this.email
        }
      },
      loadingKey: 'loading',
      update (data) {
        this.login(data.userByEmail)
      },
      // Deshabilitamos la query,para lanzarla cuando queramos
      skip () {
        return this.skipQuery
      }
    },
    userAccounts: {
      query: GET_ACCOUNTS_BY_USER_ID,
      context: {
        uri: 'account'
      },
      variables () {
        return {
          userId: this.getUser._id
        }
      },
      loadingKey: 'loading',
      update (data) {
        this.setUserAccounts(data.accountsByUserId)
      },
      // Deshabilitamos la query,para lanzarla cuando queramos
      skip () {
        return this.skipQueryUserAccounts
      }
    },
    userByToken: {
      query: GET_USER_BY_TOKEN,
      context: {
        uri: 'oauth?user=oauth&pwd=ViYNrRk4xF' // aunque es otro endpoint lo que nos devuelve es un user, sino, excepción,pero al fin y al cabo gestín de user
      },
      variables () {
        return {
          token: localStorage.getItem('token')
        }
      },
      loadingKey: 'loading',
      update (data) {
        // si me viene un user -> autologin
        // vamos a consultar en graphQL por los datos de usuario
        this.tokenDataAction({token: localStorage.getItem('token'), rememberMe: true})
        this.setActiveUserAccountAction(localStorage.getItem('activeAccount'))
        this.login(data.checkUserToken)
      },
      skip () {
        return this.skipQueryUserByToken
      },
      error () {
        this.setUserTokenChecking(false)
        localStorage.removeItem('activeAccount')
        localStorage.removeItem('token')
        localStorage.removeItem('rememberMe')
      }
    }
  },
  data: () => ({
    accountIds: [],
    email: '',
    skipQuery: true,
    skipQueryUserAccounts: true,
    skipQueryUserByToken: true
  }),
  methods: {
    ...mapActions([
      'userDataAction',
      'setUserAccounts',
      'setActiveUserAccountAction',
      'setUserTokenChecking',
      'tokenDataAction'
    ]),
    queryUser (email) {
      this.email = email
      this.$apollo.queries.user.skip = false
      this.$apollo.queries.user.refetch()
    },
    queryUserByToken () {
      this.$apollo.queries.userByToken.skip = false
      this.$apollo.queries.userByToken.refetch()
    },
    login (data) {
      if (typeof data === 'undefined' && typeof localStorage.getItem('rememberMe') !== 'undefined' &&
          localStorage.getItem('rememberMe') !== null) {
        localStorage.removeItem('token')
      }
      // guardamos en el store (vuex)
      this.userDataAction(data)
      if (this.getUserAccountsNum === 0 && this.getUser.isAdmin === false) {
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('login_view.error'),
          buttonText: this.$t('buttons.close')
        })
      } else {
        // si tiene una cuenta redirigimos al dashboard
        if (this.getUserAccountsNum === 1) {
          // setear en otra propiedad del store la cuenta activa,q es la unica que tiene
          this.setActiveUserAccountAction(this.getUser.accounts[0].account)
          this.$router.push({ name: 'dashboard' })
        } else {
          // si tenemos en el local storage una cuenta por defecto y existe en las cuentas de usuario,le redirigimos atumaticamente a ella
          if (localStorage.getItem('activeAccount') && this.$store.getters.userAccountsIds.includes(localStorage.getItem('activeAccount'))) {
            this.setActiveUserAccountAction(localStorage.getItem('activeAccount'))
            this.$router.push({ name: 'dashboard' })
          } else {
            // si tiene mas de una redirigimos o es admin a la pantalla de selección de cuentas
            this.$router.push({ name: 'accounts_selection' })
          }
        }
      }
    }
  }
}

export default userMixin
