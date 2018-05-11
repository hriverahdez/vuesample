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
    VMenu,
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
    VMenu,
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
    primary: '#00A0BD',
    secondary: '#ee44aa',
    accent: '#FF8A65',
    error: '#EF5350',
    info: '#2196F3',
    success: '#66BB6A',
    warning: '#D32F2F',
    floatingButton: '#FF5722',
    toolBar: '#00A0BD',
    form_elements_color: '#7E57C2',
    headings: '#00838F'
  }
  // theme: {
  //   primary: '#ee44aa',
  //   secondary: '#424242',
  //   accent: '#82B1FF',
  //   error: '#FF5252',
  //   info: '#2196F3',
  //   success: '#4CAF50',
  //   warning: '#FFC107'
  // }
})
