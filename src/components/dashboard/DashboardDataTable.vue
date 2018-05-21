<template lang="pug">
    v-data-table(
        :headers="headers"
        :items="stats"
        :search="search"
        hide-actions
        class="elevation-1 dashboard-datatable"
        )
        template(slot="items" slot-scope="props")
            td.text-xs-left {{ props.item.label}}
            td.text-xs-left {{ props.item.requests }}
            td.text-xs-left {{ props.item.imps }}
            td.text-xs-left {{ props.item.fillRate }}
            td.text-xs-left {{ props.item.clicks }}
            td.text-xs-left {{ props.item.ctr }}
            td.text-xs-left {{ props.item.revenue }}
            td.text-xs-left {{ props.item.ecpm }}

        template(slot="no-data")
            v-alert(
            :value="true"
            color="error"
            icon="warning") {{ $t('accounts_view.alert_message')}}
</template>

<script>
import { GET_DASHBOARD_REPORT_DATA } from '@/graphql/dashboardReport'

export default {
  name: 'dashboard-data-table',
  data () {
    return {
      stats: [],
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
  apollo: {
    stats: {
      query: GET_DASHBOARD_REPORT_DATA,
      context: {
        uri: 'report'
      },
      pollInterval: 100,
      loadingKey: 'loading'
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.dashboard-datatable {
    margin-top: 20px;
}
</style>


