<template lang="pug">
    v-container(class="stats-container")
        v-layout(row wrap stats-container__layout)
            v-flex(xs12 pa-0)
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
                    v-tab(href="#tab-date" @click="requestDataFromAPI($event)" ripple) {{ $t('dashboard_view.date')}}
                    v-tab(href="#tab-app" @click="requestDataFromAPI($event)" ripple) {{ $t('dashboard_view.app')}}
                    v-tab(href="#tab-country" @click="requestDataFromAPI($event)" ripple) {{ $t('dashboard_view.country')}}
                    v-tab(href="#tab-format" @click="requestDataFromAPI($event)" ripple) {{ $t('dashboard_view.format')}}
                    v-tab(href="#tab-network" @click="requestDataFromAPI($event)" ripple) {{ $t('dashboard_view.network')}}
                    v-spacer
                    section.date-container
                      div(class="date-container__btn-date")
                        v-btn(@click.native.stop="selectDateDialog = true" class="date-button")
                            v-icon(left small) event
                            | {{ $t('dashboard_view.select_date')}}
                      div.date-container__startDate
                          span {{ $t('dashboard_view.from') }}
                          span(class="strong") {{ ` ${startDateText}` }}
                      div.date-container__endDate
                          span {{ $t('dashboard_view.to') }}
                          span(class="strong") {{ ` ${endDateText}` }}

                    // Tab items
                    // Date tab
                    v-tab-item(id="tab-date" transition="false")
                        dashboard-filters
                        div(class="graph")
                          line-chart(
                            v-if="statsDataFormattedGetter"
                            :ytitle="statYText | capitalize"
                            :data="statsDataFormattedGetter[buttonSelectedGetter]"
                            :legend="false"
                            :discrete= "true"
                          )
                          dashboard-no-data-filter(v-else)

                    // App tab
                    v-tab-item(id="tab-app" ransition="false")
                        dashboard-filters
                        line-chart(
                          v-if="statsDataFormattedGetter"
                          legend="bottom"
                          :ytitle="statYText | capitalize"
                          :data="statsDataFormattedGetter[buttonSelectedGetter]"
                        )
                        dashboard-no-data-filter(v-else)

                    // Country tab
                    v-tab-item(id="tab-country")
                        dashboard-filters
                        line-chart(
                          :legend="false"
                          v-if="statsDataFormattedGetter"
                          :ytitle="statYText | capitalize"
                          :data="statsDataFormattedGetter[buttonSelectedGetter]"
                          :discrete= "true"
                        )
                        dashboard-no-data-filter(v-else)

                    // Format tab
                    v-tab-item(id="tab-format")
                        dashboard-filters
                        pie-chart(
                          legend="bottom"
                          v-if="statsDataFormattedGetter"
                          :ytitle="statYText | capitalize"
                          :data="statsDataFormattedGetter[buttonSelectedGetter][0].data"
                        )
                        dashboard-no-data-filter(v-else)

                    // Network tab
                    v-tab-item(id="tab-network")
                        dashboard-filters
                        column-chart(
                          v-if="statsDataFormattedGetter"
                          legend="bottom"
                          :ytitle="statYText | capitalize"
                          :data="statsDataFormattedGetter[buttonSelectedGetter]"
                        )
                        dashboard-no-data-filter(v-else)

                dashboard-stat-buttons
</template>

<script>
import { format, subDays } from 'date-fns'
import { mapGetters, mapActions, mapMutations } from 'vuex'
// Import components
import DashboardFilters from '@/components/dashboard/DashboardFilters'
import DashboardNoDataFilter from '@/components/dashboard/DashboardNoDataFilter'
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
    DashboardNoDataFilter,
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
      })
      .then(() => {
        // this.SET_ALERT_MESSAGE({
        //   show: true,
        //   type: 'success',
        //   message: this.$t('dashboard_view.confirm_selected_date_range'),
        //   buttonText: this.$t('buttons.close')
        // })
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
      // this.groupByVarDataAction(e.target.text.toUpperCase())
      // this.datatableGroupByAction(e.target.text.toUpperCase())
      setTimeout(() => {
        this.groupByVarDataAction(e.target.text.toUpperCase())
        this.datatableGroupByAction(e.target.text.toUpperCase())
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
    color: rgba(0, 0, 0, 0.54);
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
.date-container__btn-date {
  border-left: 1px solid #F4F4F4;
  border-right: 1px solid #F4F4F4;
}

.date-button {
  margin: 4px;
  height: 30px;
  box-shadow: none!important;

  .btn__content {
    background: #fff!important;
    padding: 0 18px;
    color: rgba(0,0,0,0.54)!important;
  }
}

.stat-buttons-container {
  background: white!important;
  border-left: 1px solid  rgba(0,0,0,0.12);
  border-right: 1px solid  rgba(0,0,0,0.12);
}

.stats-container {
  padding: 0;
}

.stats-container__layout {
  max-width: 100%;
  margin: 0!important;;
}

.graph {
  background: #FAFBFC;
  padding: 30px;
}

.tabs__div {
  color: rgba(0,0,0,0.54)!important;
}
</style>




