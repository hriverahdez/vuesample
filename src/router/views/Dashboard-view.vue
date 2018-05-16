<template lang="pug">
    section.dashboard__section
      v-card
        v-layout(wrap).card__row-title
            v-flex(xs12)
                v-card-title.title.headings--text {{ $t('dashboard_view.dashboard_title' )}}

        v-flex(xs12)
            v-tabs(icons-and-text centered dark color="purple")
                v-tabs-slider(color="orange")
                v-tab(href="#tab-1") Global
                v-tab(href="#tab-2") Days
                v-tab(href="#tab-3") Countries
                v-tab-item(id="tab-1")
                    v-card(flat)
                      dashboard-filters
                      line-chart(:data="{'2017-05-13': 2, '2017-05-14': 5}")
                v-tab-item(id="tab-2")
                    v-card(flat)
                      pie-chart(:data="[['Blueberry', 44], ['Strawberry', 23]]")
                v-tab-item(id="tab-3")
                    v-card(flat)
                      column-chart(:data="[['Sun', 32], ['Mon', 46], ['Tue', 28]]")
</template>


<script>
  import DashboardFilters from '@/components/DashboardFilters'
  export default {
    data: () => ({
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }),
    components: {
      DashboardFilters
    }
  }
</script>

<style lang="scss" scoped>

</style>


