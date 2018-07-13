<template lang="pug">
  section
    v-data-table(
      :headers="headers"
      :items="datatableData"
      :pagination.sync="pagination"
      class="elevation-1 dashboard-datatable"
      hide-actions
    )
      //- Slot para las cabeceras
      template(slot="headers" slot-scope="props")
        tr
          th(
            v-for="header in props.headers"
            :class="['column sortable', 'text-xs-left', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          ) {{ getHeaderText(header.text) }}
            v-icon(small) arrow_upward

      //- Items de la tabla
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

      //- Estado tabla son datos
      template(slot="no-data")
          v-alert(
          :value="true"
          color="error"
          icon="warning") {{ $t('validations.no_data_available')}}

      //- Footer con totales en la tabla
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
      sortBy: 'formattedLabel',
      descending: true,
      rowsPerPage: -1
    },
    headers: [
      {
        text: 'Grouped by',
        align: 'left',
        value: 'formattedLabel'
      },
      // { text: 'Request', value: 'request' },
      { text: 'Impressions', value: 'imp' },
      // { text: 'Fill rate', value: 'rate' },
      { text: 'Clicks', value: 'click' },
      { text: 'CTR', value: 'ctr' },
      { text: 'Revenue', value: 'money' },
      { text: 'eCPM', value: 'ecpm' }

    ],
    // headersWithDAU: [
    //   {
    //     text: 'Group by date',
    //     align: 'left',
    //     value: 'date'
    //   },
    //   { text: 'Request', value: 'request' },
    //   { text: 'DAU', value: 'DAU' },
    //   { text: 'Impressions', value: 'imp' },
    //   { text: 'Fill rate', value: 'fillrate' },
    //   { text: 'Clicks', value: 'click' },
    //   { text: 'CTR', value: 'ctr' },
    //   { text: 'Revenue', value: 'revenue' },
    //   { text: 'eCPM', value: 'ecpm' }
    // ],
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
    // Change current tab and filters when clicked data table row
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    // Se utiliza para asignar el nombre de las cabeceras de la tabla. Muestra el tipo de agrupación en el literal
    getHeaderText (headerText) {
      return headerText === 'Grouped by' ? `${headerText} ${this.datatableGroupBy.toLowerCase()}` : headerText
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
