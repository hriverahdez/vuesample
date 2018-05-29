<template lang="pug">
    v-data-table(
        :headers="headers"
        :items="stats"
        :search="search"
        hide-actions
        class="elevation-1 dashboard-datatable"
        )
        template(slot="items" slot-scope="props")
            td.text-xs-left(@click="selectTableItem(props.item)") {{ props.item.label}}
            td.text-xs-left(@click="selectTableItem(props.item)") {{ props.item.requests }}
            td.text-xs-left(@click="selectTableItem(props.item)") {{ props.item.imps }}
            td.text-xs-left(@click="selectTableItem(props.item)") {{ props.item.fillRate }}
            td.text-xs-left(@click="selectTableItem(props.item)") {{ props.item.clicks }}
            td.text-xs-left(@click="selectTableItem(props.item)") {{ props.item.ctr }}
            td.text-xs-left(@click="selectTableItem(props.item)") {{ props.item.revenue }}
            td.text-xs-left(@click="selectTableItem(props.item)") {{ props.item.ecpm }}

        template(slot="no-data")
            v-alert(
            :value="true"
            color="error"
            icon="warning") {{ $t('accounts_view.alert_message')}}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'dashboard-data-table',
  data () {
    return {
      headers: [
        {
          text: 'Group by date',
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
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      stats: 'statsDataGetter',
      groupedBy: 'groupedByGetter'
    })
  },
  methods: {
    ...mapActions([
      'activeTabAction',
      'addItemFiltersAction',
      'getDateAction',
      'groupedByVarDataAction'
    ]),
    // Change current tab and filtars when clicked data table row
    selectTableItem (item) {
      let originalGroupedByValue = this.groupedBy
      let sendItemLabel = item.label
      if (originalGroupedByValue === 'DATE') {
        this.activeTabAction('tab-app').then(() => {
          this.groupedByVarDataAction('APP')
        })
      } else {
        this.activeTabAction('tab-date')
        .then(() => {
          this.addItemFiltersAction([sendItemLabel, originalGroupedByValue])
          .then(() => {
            this.groupedByVarDataAction('DATE')
          })
        })
      }
        // console.log('entra', item)
        // this.getDateAction({
        //   startDate: item.label,
        //   endDate: item.label
        // })

      // .then(() => {
      //   this.setAlertMessage({
      //     show: true,
      //     type: 'success',
      //     message: this.$t('dashboard_view.confirm_selected_date_range'),
      //     buttonText: this.$t('buttons.close')
      //   })
      //   this.dialog = false
      // })
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


