<template lang="pug">
  section
    v-data-table(
        :headers="showDAU ? headersWithDAU : headers"
        :items="datatableData"
        :search="search"
        hide-actions
        class="elevation-1 dashboard-datatable"
        )

        template(slot="headers" slot-scope="props")
          th(v-for="header in props.headers" :key="header.text") {{ header.text === "groupBy" ? `Group by ${datatableGroupBy.toLowerCase()}` : header.text }}

        template(slot="items" slot-scope="props")
            td.text-xs-left(@click="selectTableItem(props.item, props.index)") {{ props.item.formattedLabel }}
            td.text-xs-left(@click="selectTableItem(props.item, props.index)") {{ props.item.requests }}
            td.text-xs-left(@click="selectTableItem(props.item, props.index)" v-if="showDAU") DAU
            td.text-xs-left(@click="selectTableItem(props.item, props.index)") {{ props.item.imp | currency('', 0) }}
            td.text-xs-left(@click="selectTableItem(props.item, props.index)") {{ props.item.fillRate }}
            td.text-xs-left(@click="selectTableItem(props.item, props.index)") {{ props.item.click | currency('', 0) }}
            td.text-xs-left(@click="selectTableItem(props.item, props.index)") {{ props.item.ctr | percentageFormat }}
            td.text-xs-left(@click="selectTableItem(props.item, props.index)") {{ props.item.money | currency }}
            td.text-xs-left(@click="selectTableItem(props.item, props.index)") {{ props.item.ecpm | percentageFormat }}

        template(slot="no-data")
            v-alert(
            :value="true"
            color="error"
            icon="warning") {{ $t('accounts_view.alert_message')}}

        template(slot="footer")
          td.text-xs-left TOTAL
          td.text-xs-left {{ datatableTotals[0].req }}
          td.text-xs-left {{ datatableTotals[0].imp | currency('', 0) }}
          td.text-xs-left {{ datatableTotals[0].fillRate }}
          td.text-xs-left {{ datatableTotals[0].click | currency('', 0) }}
          td.text-xs-left {{ datatableTotals[0].ctr | percentageFormat }}
          td.text-xs-left {{ datatableTotals[0].money | currency }}
          td.text-xs-left {{ datatableTotals[0].ecpm | percentageFormat }}

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'dashboard-data-table',
  data: () => ({
    headers: [
      {
        text: 'groupBy',
        align: 'left',
        value: 'date'
      },
      { text: 'Request', value: 'request' },
      { text: 'Impressions', value: 'impressions' },
      { text: 'Fill rate', value: 'rate' },
      { text: 'Clicks', value: 'clicks' },
      { text: 'CTR', value: 'ctr' },
      { text: 'Revenue', value: 'revenue' },
      { text: 'eCPM', value: 'ecpm' }
    ],
    headersWithDAU: [
      {
        text: 'Group by date',
        align: 'left',
        value: 'date'
      },
      { text: 'Request', value: 'request' },
      { text: 'DAU', value: 'DAU' },
      { text: 'Impressions', value: 'impressions' },
      { text: 'Fill rate', value: 'rate' },
      { text: 'Clicks', value: 'clicks' },
      { text: 'CTR', value: 'ctr' },
      { text: 'Revenue', value: 'revenue' },
      { text: 'eCPM', value: 'ecpm' }
    ],
    search: ''
  }),
  computed: {
    ...mapGetters({
      apps: 'appIdAndNameGetter',
      groupedBy: 'groupByGetter',
      networks: 'networksGetter',
      datatableData: 'dashboardDatatableDataWithFormattedLabelGetter',
      datatableGroupBy: 'datatableGroupByGetter',
      datatableTotals: 'datatableTotalsDataGetter',
      showDAU: 'checkDAUState'
    })
  },
  methods: {
    ...mapActions([
      'activeTabAction',
      'addItemFiltersAction',
      'datatableGroupByAction',
      'getDateAction',
      'groupByVarDataAction',
      'rangeAction'
    ]),
    // Show correct formatted label data depending on groupedby type
    // formatDataLabelDependingOnGroupedby (item) {
    //   if (this.groupedBy === 'DATE') {
    //     return item.label
    //   } else if (this.groupedBy === 'APP') {
    //     for (let i = 0; i < this.apps.length; i++) {
    //       if (item.label === this.apps[i].id) {
    //         return this.apps[i].name
    //       }
    //     }
    //   } else if (this.groupedBy === 'NETWORK') {
    //     for (let key in this.networks) {
    //       if (item.label === this.networks[key]) {
    //         return key
    //       }
    //     }
    //   } else {
    //     return item.label
    //   }
    // },
    // Change current tab and filters when clicked data table row
    selectTableItem (item, index) {
      let originalGroupedByValue = this.datatableGroupBy
      let sendItemLabel
      if (originalGroupedByValue === 'DATE') {
        sendItemLabel = item.formattedLabel
        this.activeTabAction('tab-app').then(() => {
          this.datatableGroupByAction('APP')
          this.groupByVarDataAction('APP')
          this.$root.$emit('sendDateToRoot', sendItemLabel)
          this.rangeAction([sendItemLabel, sendItemLabel])
          this.getDateAction({
            startDate: sendItemLabel,
            endDate: sendItemLabel
          })
        })
      } else {
        this.activeTabAction('tab-date')
        .then(() => {
          this.datatableGroupByAction('DATE')
          this.groupByVarDataAction('DATE')
          .then(() => {
            if (originalGroupedByValue === 'APP') {
              sendItemLabel = this.apps[index]
            } else if (originalGroupedByValue === 'SOURCE') {
              for (let key in this.networks) {
                if (item.label === this.networks[key]) {
                  sendItemLabel = {
                    name: item.formattedLabel,
                    id: item.label
                  }
                  originalGroupedByValue = 'NETWORK'
                }
              }
            } else if (originalGroupedByValue === 'COUNTRY') {
              sendItemLabel = {
                name: item.formattedLabel,
                code: item.label
              }
            } else if (originalGroupedByValue === 'FORMAT') {
              console.log(item)
              sendItemLabel = {
                name: item.formattedLabel,
                id: item.label
              }
            }
            this.addItemFiltersAction([sendItemLabel, originalGroupedByValue])
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-datatable {
    margin-top: 20px;
}
td {
  cursor: pointer;
}
</style>


