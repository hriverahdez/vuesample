// Vue import
import Vue from 'vue'

// Vuetify import
import {
    Vuetify,
    VAlert,
    VApp,
    VAvatar,
    VBreadcrumbs,
    VBtn,
    VCard,
    VDataTable,
    VDialog,
    VForm,
    VFooter,
    VGrid,
    VIcon,
    VList,
    VNavigationDrawer,
    VSelect,
    VSpeedDial,
    VSubheader,
    VSwitch,
    VTabs,
    VTextField,
    VToolbar,
    VTooltip,
    transitions
  } from 'vuetify'
import '../../node_modules/vuetify/src/stylus/app.styl'

// Modifying Stylus variables
import '@/stylus/main.styl'

  // Vuetify config
Vue.use(Vuetify, {
  components: {
    VAlert,
    VApp,
    VAvatar,
    VBreadcrumbs,
    VBtn,
    VCard,
    VDataTable,
    VDialog,
    VForm,
    VFooter,
    VGrid,
    VIcon,
    VList,
    VNavigationDrawer,
    VSelect,
    VSpeedDial,
    VSubheader,
    VSwitch,
    VTabs,
    VTextField,
    VToolbar,
    VTooltip,
    transitions
  },
  theme: {
    primary: '#00838F',
    secondary: '#FF5722',
    accent: '#FF8A65',
    error: '#e04d4d',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    floatingButton: '#FF5722'
  }
  // theme: {
  //   primary: '#ee44aa', #004daf
  //   secondary: '#424242',
  //   accent: '#82B1FF',
  //   error: '#FF5252',
  //   info: '#2196F3',
  //   success: '#4CAF50',
  //   warning: '#FFC107'
  // }
})
