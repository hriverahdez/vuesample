<template lang="pug">
    v-data-table(
        :headers="headers"
        :items="apps"
        :search="search"
        hide-actions
        class="elevation-1 dashboard-datatable"
        )
        template(slot="items" slot-scope="props")
            td.text-xs-left <span>{{ props.item.platform }}</span> {{ props.item.name }}
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
import { mapGetters } from 'vuex'

export default {
  name: 'apps-data-table',
  data: () => ({
    headers: [
      {
        text: 'Name',
        align: 'left',
        value: 'name'
      },
      { text: 'Impressions', value: 'impressions' },
      { text: 'ADCOLONY', value: 'ADCOLONY' },
      { text: 'ADMOB', value: 'ADMOB' },
      { text: 'APPLOVIN', value: 'APPLOVIN' },
      { text: 'CHARTBOOST', value: 'CHARTBOOST' },
      { text: 'CUSTOM_CAMPAIGN', value: 'CUSTOM_CAMPAIGN' },
      { text: 'FACEBOOK', value: 'FACEBOOK' },
      { text: 'HYPRMX', value: 'HYPRMX' },
      { text: 'KIIP', value: 'KIIP' },
      { text: 'INMOBI', value: 'INMOBI' },
      { text: 'IRONSOURCE', value: 'IRONSOURCE' },
      { text: 'MOBUSI', value: 'MOBUSI' },
      { text: 'MOBUSI_SSP', value: 'MOBUSI_SSP' },
      { text: 'MOBVISTA', value: 'MOBVISTA' },
      { text: 'MOPUB', value: 'MOPUB' },
      { text: 'UNITYADS', value: 'UNITYADS' },
      { text: 'STARTAPP', value: 'STARTAPP' },
      { text: 'VUNGLE', value: 'VUNGLE' }
    ],
    search: ''
  }),
  computed: {
    ...mapGetters({
      apps: 'appTotalDataGetter'
    })
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


