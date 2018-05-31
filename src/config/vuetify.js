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
    VCheckbox,
    VChip,
    VDataTable,
    VDatePicker,
    VDialog,
    VDivider,
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
    VCheckbox,
    VChip,
    VDataTable,
    VDatePicker,
    VDialog,
    VDivider,
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

  // BLue darken-3 theme
  // theme: {
  //   primary: '#00A0D3',
  //   secondary: '#ee44aa',
  //   accent: '#FF8A65',
  //   error: '#EF5350',
  //   info: '#2196F3',
  //   success: '#66BB6A',
  //   warning: '#D32F2F',
  //   floatingButton: '#E65100',
  //   toolBar: '#0D47A1',
  //   formElementColor: '#0D47A1',
  //   buttonColor: '#009688',
  //   headings: '#1565C0',
  //   purple: '#7E57C2',
  //   orange: '#DB6E1E',
  //   pink: '#ee44aa',
  //   lightGray: '#efefef',
  //   tab_heading: '#0D47A1',
  //   tab_content: '#BBDEFB',
  //   gray_lighten_4: '#F5F5F5'
  // }

// Fibonad Theme
  theme: {
    blue_dark: '#232E37',
    blue_light: '#01579B',
    gray_dark: '#27333C',
    primary: '#00A0D3',
    teal: '#009688',
    // secondary: '#ee44aa',
    // accent: '#FF8A65',
    // error: '#EF5350',
    // info: '#2196F3',
    // success: '#66BB6A',
    // warning: '#D32F2F',
    floatingButton: '#E65100',
    toolbar: '#232E37',
    // formElementColor: '#0D47A1',
    buttonColor: '#009688',
    headings: '#1A237E',
    // purple: '#7E57C2',
    // orange: '#DB6E1E',
    // pink: '#ee44aa',
    // lightGray: '#efefef',
    tab_heading: '#1A237E'
    // tab_content: '#BBDEFB',
    // gray_lighten_4: '#F5F5F5'
  }

  // theme: {
  //   primary: '#00A0D3',
  //   secondary: '#ee44aa',
  //   accent: '#FF8A65',
  //   error: '#EF5350',
  //   info: '#2196F3',
  //   success: '#66BB6A',
  //   warning: '#D32F2F',
  //   floatingButton: '#E65100',
  //   toolBar: '#232E37',
  //   formElementColor: '#0D47A1',
  //   buttonColor: '#009688',
  //   headings: '#1565C0',
  //   purple: '#7E57C2',
  //   orange: '#DB6E1E',
  //   pink: '#ee44aa',
  //   lightGray: '#efefef'
  // }

  // Default theme
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
