// Vue import
import Vue from 'vue'

// Vuetify import
import {
    Vuetify,
    VApp,
    VAvatar,
    VBreadcrumbs,
    VBtn,
    VCard,
    VDataTable,
    VDialog,
    VFooter,
    VGrid,
    VIcon,
    VList,
    VNavigationDrawer,
    VSelect,
    VTabs,
    VTextField,
    VToolbar,
    VTooltip,
    transitions
  } from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

  // Vuetify config
Vue.use(Vuetify, {
  components: {
    VApp,
    VAvatar,
    VBreadcrumbs,
    VBtn,
    VCard,
    VDataTable,
    VDialog,
    VFooter,
    VGrid,
    VIcon,
    VList,
    VNavigationDrawer,
    VSelect,
    VTabs,
    VTextField,
    VToolbar,
    VTooltip,
    transitions
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
