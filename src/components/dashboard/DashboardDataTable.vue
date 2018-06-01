<template lang="pug">
    v-data-table(
        :headers="showDAU ? headersWithDAU : headers"
        :items="stats"
        :search="search"
        hide-actions
        class="elevation-1 dashboard-datatable"
        )
        template(slot="items" slot-scope="props")
            td.text-xs-left(@click="selectTableItem(props.item, props.index)") {{ formatDataLabelDependingOnGroupedby(props.item) }}
            td.text-xs-left(@click="selectTableItem(props.item, props.index)") {{ props.item.requests }}
            td.text-xs-left(@click="selectTableItem(props.item, props.index)" v-if="showDAU") DAU
            td.text-xs-left(@click="selectTableItem(props.item, props.index)") {{ props.item.imps }}
            td.text-xs-left(@click="selectTableItem(props.item, props.index)") {{ props.item.fillRate }}
            td.text-xs-left(@click="selectTableItem(props.item, props.index)") {{ props.item.clicks }}
            td.text-xs-left(@click="selectTableItem(props.item, props.index)") {{ props.item.ctr }}
            td.text-xs-left(@click="selectTableItem(props.item, props.index)") {{ props.item.revenue }}
            td.text-xs-left(@click="selectTableItem(props.item, props.index)") {{ props.item.ecpm }}

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
  data: () => ({
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
      groupedBy: 'groupedByGetter',
      networks: 'networksGetter',
      stats: 'statsDataGetter',
      showDAU: 'checkDAUState'
    })
  },
  methods: {
    ...mapActions([
      'activeTabAction',
      'addItemFiltersAction',
      'getDateAction',
      'groupedByVarDataAction',
      'rangeAction'
    ]),
    // Show correct formatted label data depending on groupedby type
    formatDataLabelDependingOnGroupedby (item) {
      if (this.groupedBy === 'DATE') {
        return item.label
      } else if (this.groupedBy === 'APP') {
        for (let i = 0; i < this.apps.length; i++) {
          if (item.label === this.apps[i].id) {
            return this.apps[i].name
          }
        }
      } else if (this.groupedBy === 'NETWORK') {
        for (let key in this.networks) {
          if (item.label === this.networks[key]) {
            return key
          }
        }
      } else {
        return item.label
      }
    },
    // Change current tab and filtars when clicked data table row
    selectTableItem (item, index) {
      let originalGroupedByValue = this.groupedBy
      let sendItemLabel
      if (originalGroupedByValue === 'DATE') {
        sendItemLabel = item.label
        this.activeTabAction('tab-app').then(() => {
          this.getDateAction({
            startDate: item.label,
            endDate: item.label
          })
          this.$root.$emit('sendDateToRoot', item.label)
          this.rangeAction([item.label, item.label])
          this.groupedByVarDataAction('APP')
        })
      } else {
        this.activeTabAction('tab-date')
        .then(() => {
          this.groupedByVarDataAction('DATE')
          .then(() => {
            if (originalGroupedByValue === 'APP') {
              sendItemLabel = this.apps[index].name
            } else if (originalGroupedByValue === 'NETWORK') {
              for (let key in this.networks) {
                if (item.label === this.networks[key]) {
                  sendItemLabel = key
                }
              }
            } else {
              sendItemLabel = item.label
            }
            this.addItemFiltersAction([sendItemLabel, originalGroupedByValue])
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


