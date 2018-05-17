<template lang="pug">
    section.dashboard__section
      v-card
        v-layout(wrap).card__row-title
            v-flex(xs12)
                v-card-title.title.headings--text {{ $t('dashboard_view.dashboard_title' )}}

        v-flex(xs12)
            v-dialog(v-model="dialog" width="800")
              v-daterange(
                :options="dateRangeOptions"
                @input="onDateRangeChange"
                class="lightGray pa-4"
              )
              v-flex(
                xs12 text-xs-right
                class="actions-row lightGray"
                )
                v-btn(
                  color="buttonColor"
                  @click="dialog = false"
                  class="white--text"
                  ) Close
            v-tabs(icons-and-text centered dark color="blue darken-4")
                v-tabs-slider(color="blue lighten-4")
                v-flex(xs7)
                  v-tab(href="#tab-1") App
                  v-tab(href="#tab-2") Country
                  v-tab(href="#tab-3") Format
                  v-tab(href="#tab-4") Network
                v-flex(xs3 class="select-date-button-container")
                  v-btn(color="buttonColor" @click.native.stop="dialog = true")
                    v-icon(left) event
                    | Select date
                v-flex(xs2).dates-container
                  section(v-if="range.length")
                    div From:
                      strong {{ ` ${range[0]}` }}
                    div To:
                      strong {{ ` ${range[1]}` }}
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

      dashboard-data-table
</template>


<script>
  import { format, subDays } from 'date-fns'
  import DashboardDataTable from '@/components/datatables/DashboardDataTable'
  import DashboardFilters from '@/components/DashboardFilters'

  export default {
    data: () => ({
      dialog: false,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      date: null,
      // menu: false,
      range: [],
      dateRangeOptions: {
        startDate: format(subDays(new Date(), 7), 'YYYY-MM-DD'),
        endDate: format(new Date(), 'YYYY-MM-DD'),
        format: 'YYYY/MM/DD',
        presets: [
          {
            label: 'Today',
            range: [
              format(new Date(), 'YYYY-MM-DD'),
              format(new Date(), 'YYYY-MM-DD')
            ]
          },
          {
            label: 'Yesterday',
            range: [
              format(subDays(new Date(), 1), 'YYYY-MM-DD'),
              format(subDays(new Date(), 1), 'YYYY-MM-DD')
            ]
          },
          {
            label: 'Last 30 Days',
            range: [
              format(subDays(new Date(), 30), 'YYYY-MM-DD'),
              format(subDays(new Date(), 1), 'YYYY-MM-DD')
            ]
          }
        ]
      }
    }),
    components: {
      DashboardFilters,
      DashboardDataTable
    },
    methods: {
      onDateRangeChange (range) {
        this.range = range
      }
    }
  }
</script>

<style lang="scss" scoped>
.actions-row {
  padding: 0 34px 20px 0;
}
.dates-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  text-align: left;
  padding-left: 16px;
  border-bottom: 1px solid #7E57C2;
}
.select-date-button-container {
  display: flex;
  justify-content: flex-end;
  padding-right: 6px;
}
</style>


