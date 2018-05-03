<template lang="pug">
    section
        v-flex(xs12)
            v-breadcrumbs(divider="-")
                v-breadcrumbs-item(
                    v-for="breadcrumb in breadcrumbs"
                    :key="breadcrumb.text"
                    :disabled="breadcrumb.disabled"
                ) {{ breadcrumb.text }}
        v-flex(xs12)
            v-tabs(icons-and-text centered dark color="blue darken-3")
                v-tabs-slider(color="primary")
                v-tab(href="#tab-1") Global
                v-tab(href="#tab-2") Days
                v-tab(href="#tab-3") Countries
                v-tab-item(id="tab-1")
                    v-card(flat)
                        line-chart(:data="{'2017-05-13': 2, '2017-05-14': 5}")
                v-tab-item(id="tab-2")
                    v-card(flat)
                        pie-chart(:data="[['Blueberry', 44], ['Strawberry', 23]]")
                v-tab-item(id="tab-3")
                    v-card(flat)
                        column-chart(:data="[['Sun', 32], ['Mon', 46], ['Tue', 28]]")
</template>


<script>
  export default {
    data: () => ({
      breadcrumbs: [
        {
          text: 'Dashboard',
          disabled: false
        },
        {
          text: 'Link 1',
          disabled: false
        },
        {
          text: 'Link 2',
          disabled: true
        }
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    })
  }
</script>

<style lang="scss">
.dashboard__container {
    padding: 0;
    width: 100%;
}
</style>

