<template lang="pug">
  v-card
    v-container
      v-layout(wrap xs12 class="card__row-title")
        v-flex(xs8)
            v-card-title(class="title headings--text") {{ $t('apps_view.apps_title' )}}
        v-flex(xs4)
            v-text-field(
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
            )
    v-data-table(
        :headers="headers"
        :items="apps"
        :search="search"
        class="elevation-1 apps-datatable"
        :rows-per-page-items="[10, 20, 30]"
        )
        template(slot="items" slot-scope="props")
            td(class="text-xs-left app")
              div(class="app__container")
                icon(v-if="props.item.platform === 'android'" name="android" color="DimGray")
                icon(v-if="props.item.platform === 'ios'" name="apple" color="LimeGreen ")
                span(class="app__text") {{ props.item.name }}
            td(class="text-xs-left padding-scroll") ADDCOLONY
            td.text-xs-left ADMOB
            td.text-xs-left APPLOVIN
            td.text-xs-left CHARBOOST
            td.text-xs-left CUSTOM CAMPAING
            td.text-xs-left FACEBOOK
            td.text-xs-left HYPRMX
            td.text-xs-left KIIP
            td.text-xs-left INMOBI
            td.text-xs-left IRON SOURCE
            td.text-xs-left MOBUSI
            td.text-xs-left MOBUSI SSP
            td.text-xs-left MOBVISTA
            td.text-xs-left MOPUB
            td.text-xs-left UNITYADS
            td.text-xs-left STARTAPP
            td.text-xs-left VUNGLE

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
        value: 'name',
        color: 'red'
      },
      // { text: 'Impressions', value: 'impressions' },
      { text: 'ADCOLONY', value: 'ADCOLONY' },
      { text: 'ADMOB', value: 'ADMOB' },
      { text: 'APPLOVIN', value: 'APPLOVIN' },
      { text: 'CHARTBOOST', value: 'CHARTBOOST' },
      { text: 'CUSTOM CAMPAIGN', value: 'CUSTOM CAMPAIGN' },
      { text: 'FACEBOOK', value: 'FACEBOOK' },
      { text: 'HYPRMX', value: 'HYPRMX' },
      { text: 'KIIP', value: 'KIIP' },
      { text: 'INMOBI', value: 'INMOBI' },
      { text: 'IRONSOURCE', value: 'IRONSOURCE' },
      { text: 'MOBUSI', value: 'MOBUSI' },
      { text: 'MOBUSI SSP', value: 'MOBUSI SSP' },
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
      apps: 'appDataGetter'
    })
  }
}
</script>

<style lang="scss" scoped>
td {
  cursor: pointer;
}
.app {
  position: absolute;
  background: white;
  display: flex;
  align-items: center;
  height: 47px;
  border-right: 1px solid rgba(0,0,0,0.12)
}
.padding-scroll {
  padding-left: 300px!important;
}
.app__container {
  display: flex;
  svg {
    margin-right: 8px;
  }
}
.app__text {
  min-width: 200px;
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
