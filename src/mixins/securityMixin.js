const securityMixin = {
  data: () => ({
    accountIds: [],
    email: '',
    skipQuery: true,
    skipQueryUserAccounts: true,
    skipQueryUserByToken: true
  }),
  methods: {
    isGranted (route, store) {
      if (route.meta.requiresAuth) {
        // si es admin - palante
        if (store.getters.userGetter.isAdmin) {
          console.log('Es admin')
          return true
        }

        // chequeamos los roles del user en la cuenta activa
        let userRoles = store.getters.userAccountRoles

        if (userRoles.length > 0 && this.checkRolesInPath(route.meta.roles, userRoles)) { // route.meta.roles.includes(userRoles)) {
          console.log('Autorizado')
          return true
        } else {
          console.log('No autorizado')
          return false
        }
      }

      return true
    },
    isGrantedComponent (roles, store) {
      if (store.getters.userGetter.isAdmin) {
        console.log('Es admin')
        return true
      }

      // chequeamos los roles del user en la cuenta activa
      let userRoles = store.getters.userAccountRoles

      if (userRoles.length > 0 && this.checkRolesInPath(roles, userRoles)) { // route.meta.roles.includes(userRoles)) {
        console.log('Autorizado')
        return true
      } else {
        console.log('No autorizado')
        return false
      }
    },
    checkRolesInPath (pathRoles, userRoles) {
      // recorro todos los del user, si hay alguno dentro de los que piden en la ruta, devuelvo true,sino false
      let allow = false
      userRoles.forEach((rolUser) => {
        if (pathRoles.includes(rolUser)) {
          allow = true
        }
      })

      console.log(allow)
      return allow
    }
  }
}

export default securityMixin
