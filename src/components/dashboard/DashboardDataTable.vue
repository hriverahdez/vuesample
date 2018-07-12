<template lang="pug">
  section
    v-data-table(
        :headers="showDAU ? headersWithDAU : headers"
        :items="datatableData"
        :search="search"
        :class="['column sortable', pagination.descending ? 'desc' : 'asc']"
        hide-actions
        item-key="text"
        class="elevation-1 dashboard-datatable"
        )

        // template(slot="headers" slot-scope="props")
        //   tr
        //     th(
        //       v-for="header in props.headers"
        //       :key="header.text"
        //       align="left"
        //       @click="changeSort(header.value)"
        //       :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
        //       ) {{ header.text === "groupBy" ? `Group by ${datatableGroupBy.toLowerCase()}` : header.text }}
        //       v-icon(small) arrow_upward

        template(slot="items" slot-scope="props")
          td(class="text-xs-left clicked-cell" @click="selectTableItem(props.item, props.index)") {{ props.item.formattedLabel }}
          //- td.text-xs-left {{ props.item.requests }}
          td.text-xs-left(v-if="showDAU") DAU
          td.text-xs-left {{ props.item.imp | currency('', 0, { thousandsSeparator: '.' }) |  noneValueCharacter }}
          //- td.text-xs-left {{ props.item.fillRate }}
          td.text-xs-left {{ props.item.click | currency('', 0, { thousandsSeparator: '.' }) | noneValueCharacter }}
          td.text-xs-left {{ props.item.ctr | percentageFormat | noneValueCharacter }}
          td.text-xs-left {{ props.item.money | currency('$', 2, { thousandsSeparator: '.', decimalSeparator: ',', symbolOnLeft: false }) | noneValueCharacter }}
          td.text-xs-left {{ props.item.ecpm | currency('$', 2, { thousandsSeparator: '.', decimalSeparator: ',', symbolOnLeft: false }) | noneValueCharacter }}

        template(slot="no-data")
            v-alert(
            :value="true"
            color="error"
            icon="warning") {{ $t('validations.no_data_available')}}

        template(slot="footer" v-if="datatableTotals[0]")
          td.text-xs-left TOTAL
          //- td.text-xs-left {{ datatableTotals[0].req }}
          td.text-xs-left {{ datatableTotals[0].imp | currency('', 0,  { thousandsSeparator: '.' }) | noneValueCharacter }}
          //- td.text-xs-left {{ datatableTotals[0].fillRate }}
          td.text-xs-left {{ datatableTotals[0].click | currency('', 0, { thousandsSeparator: '.' }) | noneValueCharacter }}
          td.text-xs-left {{ datatableTotals[0].ctr | percentageFormat | noneValueCharacter }}
          td.text-xs-left {{ datatableTotals[0].money | currency('$', 2, { thousandsSeparator: '.', decimalSeparator: ',', symbolOnLeft: false }) | noneValueCharacter }}
          td.text-xs-left {{ datatableTotals[0].ecpm | currency('$', 2, { thousandsSeparator: '.', decimalSeparator: ',', symbolOnLeft: false }) | noneValueCharacter }}

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'DashboardDataTable',
  data: () => ({
    pagination: {
      sortBy: 'groupBy',
      descending: true
    },
    headers: [
      {
        text: 'groupBy',
        align: 'left',
        value: 'date'
      },
      // { text: 'Request', value: 'request' },
      { text: 'Impressions', value: 'impressions' },
      // { text: 'Fill rate', value: 'rate' },
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
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        console.log('entra')
        this.pagination.descending = !this.pagination.descending
        console.log(this.pagination.descending)
      } else {
        console.log('entra2')
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
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
.clicked-cell {
  cursor: pointer;
  &:hover {
    color: #009688;
  }
 }
</style>
