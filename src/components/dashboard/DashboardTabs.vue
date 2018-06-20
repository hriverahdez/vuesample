<template lang="pug">
    v-container(class="stats-container" v-if="statsDataFormattedGetter")
        v-layout(wrap)
            v-flex(xs12)
                //- v-subheader {{ `${$t('dashboard_view.grouped_by')} ${groupedByGetter} `}}
                v-dialog(v-model="selectDateDialog" width="800")
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

                // Confirm Apply Filters
                //- dialog-alert

                v-tabs(dark color="tab_heading" v-model="$store.state.reportModule.activeTab" hide-slider)
                    v-tabs-slider(color="primary")
                    v-tab(href="#tab-date" @click="requestDataFromAPI($event)") {{ $t('dashboard_view.date')}}
                    v-tab(href="#tab-app" @click="requestDataFromAPI($event)") {{ $t('dashboard_view.app')}}
                    v-tab(href="#tab-country" @click="requestDataFromAPI($event)") {{ $t('dashboard_view.country')}}
                    v-tab(href="#tab-format" @click="requestDataFromAPI($event)") {{ $t('dashboard_view.format')}}
                    v-tab(href="#tab-network" @click="requestDataFromAPI($event)") {{ $t('dashboard_view.network')}}
                    v-spacer
                    section.date-container
                      v-btn(color="buttonColor" @click.native.stop="selectDateDialog = true" class="date-button")
                          v-icon(left small) event
                          | {{ $t('dashboard_view.select_date')}}
                      div.date-container__startDate
                          span {{ $t('dashboard_view.from') }}
                          strong {{ ` ${startDateText}` }}
                      div.date-container__endDate
                          span {{ $t('dashboard_view.to') }}
                          strong {{ ` ${endDateText}` }}

                    // Tab items
                    // Date tab
                    v-tab-item(id="tab-date")
                        dashboard-filters
                        line-chart(
                          :ytitle="statYText | capitalize"
                          :colors="['#C9651B']"
                          :data="statsDataFormattedGetter[buttonSelectedGetter]"
                          :legend="false"
                          :discrete= "true")
                    // App tab
                    v-tab-item(id="tab-app")
                        dashboard-filters
                        column-chart(
                          :ytitle="statYText | capitalize"
                          :colors="['#C9651B']"
                          :data="statsDataFormattedGetter[buttonSelectedGetter]"
                          )
                    // Country tab
                    v-tab-item(id="tab-country")
                        dashboard-filters
                        line-chart(
                          :ytitle="statYText | capitalize"
                          :colors="['#C9651B']"
                          :data="statsDataFormattedGetter[buttonSelectedGetter]"
                          :discrete= "true")
                    // Format tab
                    v-tab-item(id="tab-format")
                        dashboard-filters
                        pie-chart(
                          :ytitle="statYText | capitalize"
                          :colors="['#00A0D3', '#910287', '#00962B', '#FF982A', '#E4371E', '#1A237E']"
                          :data="statsDataFormattedGetter[buttonSelectedGetter][0].data"
                        )
                    // Network tab
                    v-tab-item(id="tab-network")
                        dashboard-filters
                        column-chart(
                          :ytitle="statYText | capitalize"
                          :colors="['#C9651B']"
                          :data="statsDataFormattedGetter[buttonSelectedGetter]"
                          )

                    //- v-tab-item(id="tab-country")
                    //-     v-card(flat)
                    //-     column-chart(:data="[['Sun', 32], ['Mon', 46], ['Tue', 28]]")

                dashboard-stat-buttons
</template>

<script>
import { format, subDays } from 'date-fns'
import { mapGetters, mapActions, mapMutations } from 'vuex'
// Import components
import DashboardFilters from '@/components/dashboard/DashboardFilters'
import DashboardStatButtons from '@/components/dashboard/DashboardStatButtons'
// import DialogAlert from '@/components/DialogAlert'

export default {
  name: 'dashboard-tabs',
  data: () => ({
    prueba: {'2017-05-13': 2, '2017-05-14': 5, '2017-05-15': 5},
    selectDateDialog: false,
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
    // data2: [
    //   {name: 'Workout', data: {'2017-01-01 00:00:00 -0800': 3, '2017-01-02 00:00:00 -0800': 4}},
    //   {name: 'Call parents', data: {'2017-01-03 00:00:00 -0800': 5, '2017-01-04 00:00:00 -0800': 3}}
    // ],
    // alvaro: [
    // {
    //   "name": "App 01",
    //   "data": {
    //     "2018-02-01": 3,
    //     "2018-02-02": 30,
    //     "2018-02-03": 33,
    //     "2018-02-07": 1
    //   }
    // },
    // {
    //   "name": "App 05",
    //   "data": {
    //     "2018-02-07": 1
    //   }
    // },
    // {
    //   "name": "App 03",
    //   "data": {
    //     "2018-02-07": 1
    //   }
    // },
    // {
    //   "name": "App 04",
    //   "data": {
    //     "2018-02-01": 11,
    //     "2018-02-02": 13,
    //     "2018-02-03": 10,
    //     "2018-02-04": 10,
    //     "2018-02-05": 9,
    //     "2018-02-06": 13,
    //     "2018-02-07": 13
    //   }
    // }
    // ]
  }),
  components: {
    DashboardFilters,
    DashboardStatButtons
    // DialogAlert
  },
  computed: {
    ...mapGetters([
      'groupByGetter',
      'dateGetter',
      'statsDataFormattedGetter',
      // 'statsDataFormattedWithoutNameGetter',
      'buttonSelectedGetter',
      'rangeGetter'
    ]),
    statYText () {
      if (this.buttonSelectedGetter) {
        switch (this.buttonSelectedGetter) {
          case 'req': {
            return this.$t('dashboard_view.requests')
          }
          case 'imp': {
            return this.$t('dashboard_view.impressions')
          }
          case 'fillrate': {
            return this.$t('dashboard_view.fill_rate')
          }
          case 'click': {
            return this.$t('dashboard_view.clicks')
          }
          case 'ctr': {
            return this.$t('dashboard_view.ctr').toUpperCase()
          }
          case 'money': {
            return this.$t('dashboard_view.revenue')
          }
          case 'ecpm': {
            return this.$t('dashboard_view.ecpm').toUpperCase()
          }
          default: {
            return this.$t('dashboard_view.revenue')
          }
        }
      }
    },
    endDateText () {
      return this.dateGetter.endDate
    },
    startDateText () {
      return this.dateGetter.startDate
    }
  },
  methods: {
    ...mapActions([
      'datatableGroupByAction',
      'groupByVarDataAction',
      'getDateAction',
      'rangeAction'
      // 'skipDashboardDataQueryAction',
      // 'skipDatatableDataQueryAction'
    ]),
    ...mapMutations(['SET_ALERT_MESSAGE']),
    // Dialog button select date action
    applyDateSelection () {
      // Resume  query
      // this.skipDashboardDataQueryAction(false)
      // this.skipDatatableDataQueryAction(false)

      this.getDateAction({
        startDate: this.rangeGetter[0],
        endDate: this.rangeGetter[1]
      }).then(() => {
        this.SET_ALERT_MESSAGE({
          show: true,
          type: 'success',
          message: this.$t('dashboard_view.confirm_selected_date_range'),
          buttonText: this.$t('buttons.close')
        })
        this.selectDateDialog = false
      })
    },
    // Close dialog without apply selection
    exitDialogWithoutSelectRangeOfDates () {
      // Resume  query

      setTimeout(() => {
        this.$refs['dateRange'].startDate = format(subDays(new Date(), 30), 'YYYY-MM-DD')
        this.$refs['dateRange'].endDate = format(new Date(), 'YYYY-MM-DD')
        this.getDateAction({
          startDate: format(subDays(new Date(), 30), 'YYYY-MM-DD'),
          endDate: format(new Date(), 'YYYY-MM-DD')
        })
        // .then(() => {
        //   this.skipDashboardDataQueryAction(false)
        //   this.skipDatatableDataQueryAction(false)
        // })
      }, 300)
      this.selectDateDialog = false
    },
    onDateRangeChange (range) {
      this.rangeAction(range)
    },
    // Draw data from server
    requestDataFromAPI (e) {
      setTimeout(() => {
        // Stats
        this.groupByVarDataAction(e.target.text.toUpperCase())
        .then(() => {
          // Stop Query
          this.skipDashboardDataQueryAction(false)
        })
        // Table
        this.datatableGroupByAction(e.target.text.toUpperCase())
        .then(() => {
          // Stop Query
          this.skipDatatableDataQueryAction(false)
        })
      }, 240)
    }
  },
  mounted () {
    this.$root.$on('sendDateToRoot', (date) => {
      this.$refs['dateRange'].startDate = date
      this.$refs['dateRange'].endDate = date
    })
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
.stats-container {
  padding: 24px;
}
</style>




