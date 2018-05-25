<template lang="pug">
    v-container
        v-layout(wrap)
            v-flex(xs12)
                //- v-subheader {{ `${$t('dashboard_view.grouped_by')} ${groupedByGetter} `}}
                v-dialog(v-model="dialog" width="800")
                    v-daterange(
                        :options="dateRangeOptions"
                        @input="onDateRangeChange"
                        class="lightGray pa-4"
                        ref="dateRange"
                    )
                    v-flex(
                        xs12 text-xs-right
                        class="actions-row lightGray"
                        )
                        v-btn(
                          color="buttonColor"
                          @click="exitDialogWithoutSelectRangeOfDates"
                          flat
                          class="white--text"
                        ) {{ $t('buttons.close') }}
                        v-btn(
                          color="buttonColor"
                          @click="applyDateSelection"
                          class="white--text"
                        ) {{ $t('buttons.apply') }}

                v-tabs(dark color="tab_heading")
                    v-tabs-slider(color="primary")
                    v-tab(href="#tab-1" @click="requestDataFromAPI($event)") {{ $t('dashboard_view.date')}}
                    v-tab(href="#tab-2" @click="requestDataFromAPI($event)") {{ $t('dashboard_view.app')}}
                    v-tab(href="#tab-3" @click="requestDataFromAPI($event)") {{ $t('dashboard_view.country')}}
                    v-tab(href="#tab-4" @click="requestDataFromAPI($event)") {{ $t('dashboard_view.format')}}
                    v-tab(href="#tab-5" @click="requestDataFromAPI($event)") {{ $t('dashboard_view.network')}}
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
                          strong {{ ` ${endDateText}` }}

                    // Tab items
                    v-tab-item(id="tab-1")
                        dashboard-filters
                        v-divider.divider
                        line-chart(
                          ytitle="Requests"
                          :colors="['#00A0D3']"
                          :data="statsDataFormattedWithoutNameGetter")
                    v-tab-item(id="tab-2")
                        v-card(flat)
                        pie-chart(:data="[['Blueberry', 44], ['Strawberry', 23]]")
                    v-tab-item(id="tab-3")
                        v-card(flat)
                        column-chart(:data="[['Sun', 32], ['Mon', 46], ['Tue', 28]]")

                dashboard-stat-buttons
</template>

<script>
import { format, subDays } from 'date-fns'
import { mapGetters, mapActions } from 'vuex'
// Import components
import DashboardFilters from '@/components/dashboard/DashboardFilters'
import DashboardStatButtons from '@/components/dashboard/DashboardStatButtons'

export default {
  name: 'dashboard-tabs',
  data: () => ({
    dialog: false,
    range: [],
    dateRangeOptions: {
      startDate: format(subDays(new Date(), 30), 'YYYY-MM-DD'),
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
    DashboardStatButtons
  },
  computed: {
    ...mapGetters([
      'groupedByGetter',
      'dateGetter',
      'statsDataFormattedGetter',
      'statsDataFormattedWithoutNameGetter'
    ]),
    endDateText () {
      return this.range[1]
    },
    startDateText () {
      return this.range[0]
    }
  },
  methods: {
    ...mapActions([
      'groupedByVarDataAction',
      'getDateAction'
    ]),
    // Dialog button select date action
    applyDateSelection () {
      this.getDateAction({
        startDate: this.range[0],
        endDate: this.range[1]
      })
      this.dialog = false
    },
    // Close dialog without apply selection
    exitDialogWithoutSelectRangeOfDates () {
      setTimeout(() => {
        this.$refs['dateRange'].startDate = format(subDays(new Date(), 30), 'YYYY-MM-DD')
        this.$refs['dateRange'].endDate = format(new Date(), 'YYYY-MM-DD')
      }, 300)
      this.dialog = false
    },
    onDateRangeChange (range) {
      this.range = range
    },
    // Draw data from server
    requestDataFromAPI (e) {
      this.groupedByVarDataAction(e.target.text.toUpperCase())
    }
  },
  mounted () {
    this.range.push(this.dateGetter.startDate, this.dateGetter.endDate)
  }
}
</script>

<style lang="scss">
.date-container {
    text-transform: lowercase;
    color: white;
    display: flex;
    align-items: center;
    padding-right: 14px;

    &__endDate {
        padding-left: 10px;
        font-size: 12px;
        text-transform: capitalize;
    }

    &__startDate {
        padding-left: 10px;
        font-size: 12px;
        text-transform: capitalize;
    }
}
.date-button {
  margin: 4px;
  height: 30px;
}
.divider {
  margin-bottom: 20px;
}
</style>




