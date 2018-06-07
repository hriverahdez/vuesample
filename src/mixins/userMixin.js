import { GET_USER } from '@/graphql/user'
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
            this.$router.push({ name: 'dashboard' })
          } else {
            console.log('entro3')
            // TODO: si tiene mas de una redirigimos o es admin a la pantalla de selección de cuentas
          }
        }
      },
      // Deshabilitamos la query,para lanzarla cuando queramos
      skip () {
        return this.skipQuery
      }
    }
  },
  data: () => ({
    skipQuery: true,
    email: ''
  }),
  methods: {
    ...mapActions([
      'userDataAction'
    ]),
    queryUser (email) {
      this.email = email
      this.$apollo.queries.user.skip = false
      this.$apollo.queries.user.refetch()
    }
  }
}

export default userMixin
