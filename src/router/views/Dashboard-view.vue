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
                class="white pa-4"
              )
              v-flex(
                xs12 text-xs-right
                class="actions-row"
                )
                v-btn(
                  color="form_elements_color"
                  @click="dialog = false"
                  class="white--text"
                  ) Close
            v-tabs(icons-and-text centered dark color="purple")
                v-tabs-slider(color="orange")
                v-flex(xs7)
                  v-tab(href="#tab-1") App
                  v-tab(href="#tab-2") Country
                  v-tab(href="#tab-3") Format
                  v-tab(href="#tab-3") Network
                  v-tab(href="#tab-3") Placement tag
                v-flex(xs3)
                  v-btn(color="primary" dark @click.native.stop="dialog = true")
                    v-icon(left) event
                    | Select date
                v-flex(xs1 v-if="range.length")
                  div From: {{ range[0] }}
                  div To: {{ range[1] }}


                  //- v-layout(slot="activator" row wrap)
                  //-   span From:
                  //-   v-text-field(
                  //-     v-model="range[0]"
                  //-     label="Start date"
                  //-     readonly
                  //-     )
                  //-   span to:
                  //-   v-text-field(
                  //-     v-model="range[1]"
                  //-     label="End Date"
                  //-     readonly
                  //-     )
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


            //- v-dialog(
            //-           ref="dialog"
            //-           v-model="modal"
            //-           :return-value.sync="date"
            //-           persistent
            //-           lazy
            //-           full-width
            //-           width="290px"
            //-         )
            //-   v-text-field(
            //-     slot="activator"
            //-     v-model="date"
            //-     label="Picker in dialog"
            //-     prepend-icon="event"
            //-     readonly
            //-     )
            //-   v-date-picker(v-model="date" scrollable)
            //-     v-spacer
            //-     v-btn(color="purple" @click="modal = false")

            //- v-dialog(
            //-           ref="dialog"
            //-           v-model="modal"
            //-           :return-value.sync="date"
            //-           persistent
            //-           lazy
            //-           full-width
            //-           width="800"
            //-         )
            //-   v-layout(xs12 slot="activator" row wrap)
            //-     v-flex(xs6)
            //-       v-text-field(
            //-         v-model="range[0]"
            //-         label="Start date"
            //-         prepend-icon="event"
            //-         readonly
            //-         )
            //-     v-flex(xs6)
            //-       v-text-field(
            //-         v-model="range[1]"
            //-         label="End Date"
            //-         prepend-icon="event"
            //-         readonly
            //-         )
            //-   v-daterange(
            //-     :options="dateRangeOptions"
            //-     @input="onDateRangeChange"
            //-     class="white pa-4"
            //-   )

            //-   v-flex(
            //-     xs12 text-xs-right
            //-     class="actions-row"
            //-     )
            //-     v-btn(
            //-       color="form_elements_color"
            //-       @click="modal = false"
            //-       class="white--text"
            //-       ) Close

</template>


<script>
  import { format, subDays } from 'date-fns'
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
        format: 'MM/DD/YYYY',
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
</style>


