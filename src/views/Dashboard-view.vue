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
                v-tab-item(
                v-for="i in 3"
                :key="i"
                :id="'tab-' + i"
                )
                    v-card(flat)
                        v-card-text {{ text }}
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

