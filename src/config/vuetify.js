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
    VChip,
    VDataTable,
    VDatePicker,
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

// Datepicker component
import VDateRange from 'vuetify-daterange-picker'
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css'

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
    VChip,
    VDataTable,
    VDatePicker,
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
    primary: '#90CAF9',
    secondary: '#ee44aa',
    accent: '#FF8A65',
    error: '#EF5350',
    info: '#2196F3',
    success: '#66BB6A',
    warning: '#D32F2F',
    floatingButton: '#E65100',
    toolBar: '#00695C',
    formElementColor: '#0D47A1',
    buttonColor: '#009688',
    headings: '#1565C0',
    purple: '#7E57C2',
    orange: '#DB6E1E',
    pink: '#ee44aa',
    lightGray: '#efefef'
  }
  // theme: {
  //   primary: '#00A0BD',
  //   secondary: '#ee44aa',
  //   accent: '#FF8A65',
  //   error: '#EF5350',
  //   info: '#2196F3',
  //   success: '#66BB6A',
  //   warning: '#D32F2F',
  //   floatingButton: '#FF5722',
  //   toolBar: '#00A0BD',
  //   formElementColor: '#00A0BD',
  //   headings: '#00838F',
  //   purple: '#7E57C2',
  //   orange: '#FF5722',
  //   pink: '#ee44aa',
  //   lightGray: '#efefef'
  // }
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

Vue.use(VDateRange)
