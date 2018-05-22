<template lang="pug">
    v-container
        v-layout(wrap)
            v-flex(xs12)
                v-subheader {{ `${$t('dashboard_view.grouped_by')} ${groupedBy} `}}
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
                v-tabs(dark color="tab_heading")
                    v-tabs-slider(color="blue lighten-4")
                    v-tab(href="#tab-1") App
                    v-tab(href="#tab-2") Country
                    v-tab(href="#tab-3") Date
                    v-tab(href="#tab-4") Format
                    v-tab(href="#tab-5") Network
                    v-spacer
                    section.date-container
                      v-btn(color="buttonColor" @click.native.stop="dialog = true" class="date-button")
                          v-icon(left) event
                          | {{ $t('dashboard_view.select_date')}}
                      div.date-container__startDate
                          span {{ $t('dashboard_view.from') }}
                          strong {{ ` ${startDateText}` }}
                      div.date-container__endDate
                          span {{ $t('dashboard_view.to') }}
                          strong {{ ` ${startDateText}` }}

                    // Tab items
                    v-tab-item(id="tab-1")
                        dashboard-filters
                        v-divider
                        v-flex(xs12)
                            v-btn(color="primary" dark) {{ $t('dashboard_view.requests')}}
                            v-btn(color="primary" dark) {{ $t('dashboard_view.impressions')}}
                            v-btn(color="primary" dark) {{ $t('dashboard_view.fill_rate')}}
                            v-btn(color="primary" dark) {{ $t('dashboard_view.clicks')}}
                            v-btn(color="primary" dark) {{ $t('dashboard_view.ctr')}}
                            v-btn(color="primary" dark) {{ $t('dashboard_view.revenue')}}
                            v-btn(color="primary" dark) {{ $t('dashboard_view.ecpm')}}
                        line-chart(:data="{'2017-05-13': 2, '2017-05-14': 5}")
                    v-tab-item(id="tab-2")
                        v-card(flat)
                        pie-chart(:data="[['Blueberry', 44], ['Strawberry', 23]]")
                    v-tab-item(id="tab-3")
                        v-card(flat)
                        column-chart(:data="[['Sun', 32], ['Mon', 46], ['Tue', 28]]")
</template>

<script>
import { format, subDays } from 'date-fns'
import DashboardFilters from '@/components/dashboard/DashboardFilters'

export default {
  name: 'dashboard-tabs',
  data: () => ({
    dialog: false,
    date: null,
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
    DashboardFilters
  },
  computed: {
    endDateText () {
      return this.range[1] || this.$t('dashboard_view.not_selected')
    },
    groupedBy () {
      return 'Date'
    },
    startDateText () {
      return this.range[0] || this.$t('dashboard_view.not_selected')
    }
  },
  methods: {
    onDateRangeChange (range) {
      this.range = range
    }
  }
}
</script>

<style lang="scss" scoped>
.date-container {
    text-transform: lowercase;
    color: white;
    display: flex;
    align-items: center;
    padding-right: 14px;

    &__endDate {
        padding-left: 10px;
        text-transform: capitalize;
    }

    &__startDate {
        padding-left: 10px;
        text-transform: capitalize;
    }
}
.date-button {
  margin: 4px;
  height: 30px;
}
.prueba {
  height: auto;
  width: 50px;
  background-color: red;
}
</style>




