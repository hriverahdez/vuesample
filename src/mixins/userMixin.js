import { GET_USER } from '@/graphql/user'
import { GET_ACCOUNTS_FILTERING } from '@/graphql/account'
import { mapActions } from 'vuex'

const userMixin = {
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
        // guardamos en el store (vuex)
        this.userDataAction(data.userByEmail)
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
            // si tiene mas de una redirigimos o es admin a la pantalla de selección de cuentas
            this.$router.push({ name: 'accounts_selection' })
          }
        }
      },
      // Deshabilitamos la query,para lanzarla cuando queramos
      skip () {
        return this.skipQuery
      }
    },
    userAccounts: {
      query: GET_ACCOUNTS_FILTERING,
      context: {
        uri: 'account'
      },
      variables () {
        return {
          filter: {
            filter: {
              _id_in: this.getUserAccountsIds
            }
          }
        }
      },
      loadingKey: 'loading',
      update (data) {
        console.log(data)
        this.setUserAccounts(data.accounts)
      },
      // Deshabilitamos la query,para lanzarla cuando queramos
      skip () {
        return this.skipQueryUserAccounts
      }
    }
  },
  data: () => ({
    accountIds: [],
    email: '',
    skipQuery: true,
    skipQueryUserAccounts: true
  }),
  methods: {
    ...mapActions([
      'userDataAction',
      'setUserAccounts',
      'setActiveUserAccountAction'
    ]),
    queryUser (email) {
      this.email = email
      this.$apollo.queries.user.skip = false
      this.$apollo.queries.user.refetch()
    }
  }
}

export default userMixin
