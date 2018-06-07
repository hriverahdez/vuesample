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
        template(slot="headerCell" slot-scope="props")
          span {{ props.header.text }}
          v-menu(bottom offset-y @click.native.stop="" class="header-menu")
            a(slot="activator" class="header-activator")
              icon(name="cog" color="white" class="cog-icon")
            v-list(class="menu-filter")
              v-list-tile Edit network profile
              v-list-tile Enable / disable

        template(slot="items" slot-scope="props")
            td(class="text-xs-left app")
              div(class="app-container")
                icon(v-if="props.item.platform === 'android'" name="android" color="DimGray")
                icon(v-if="props.item.platform === 'ios'" name="apple" color="LimeGreen ")
                span(class="app__text") {{ props.item.name }}
                v-tooltip(bottom)
                  icon(name="cog" color="indigo" slot="activator" class="cog-icon")
                  div lalalala
                  div lalalala
                  div lalalala
                  div lalalala
            td(class="text-xs-left padding-scroll")
              div(class="network-item-container") ADDCOLONY
                v-tooltip(bottom)
                  icon(name="cog" color="indigo" slot="activator" class="cog-icon")
                  div lalalala
                  div lalalala
                  div lalalala
                  div lalalala
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
      { text: 'ADCOLONY', value: 'ADCOLONY', sortable: false },
      { text: 'ADMOB', value: 'ADMOB', sortable: false },
      { text: 'APPLOVIN', value: 'APPLOVIN', sortable: false },
      { text: 'CHARTBOOST', value: 'CHARTBOOST', sortable: false },
      { text: 'CUSTOM CAMPAIGN', value: 'CUSTOM CAMPAIGN', sortable: false },
      { text: 'FACEBOOK', value: 'FACEBOOK', sortable: false },
      { text: 'HYPRMX', value: 'HYPRMX', sortable: false },
      { text: 'KIIP', value: 'KIIP', sortable: false },
      { text: 'INMOBI', value: 'INMOBI', sortable: false },
      { text: 'IRONSOURCE', value: 'IRONSOURCE', sortable: false },
      { text: 'MOBUSI', value: 'MOBUSI', sortable: false },
      { text: 'MOBUSI SSP', value: 'MOBUSI SSP', sortable: false },
      { text: 'MOBVISTA', value: 'MOBVISTA', sortable: false },
      { text: 'MOPUB', value: 'MOPUB', sortable: false },
      { text: 'UNITYADS', value: 'UNITYADS', sortable: false },
      { text: 'STARTAPP', value: 'STARTAPP', sortable: false },
      { text: 'VUNGLE', value: 'VUNGLE', sortable: false }
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
.apps-datatable {
  /deep/ td {
    cursor: pointer;
    z-index: 2!important;
  }
  /deep/ th {
    cursor: pointer;
    z-index: 2!important;
  }
  .app {
    position: absolute;
    background: white;
    display: flex;
    align-items: center;
    border-right: 1px solid rgba(0,0,0,0.12);
    border-bottom: 1px solid rgba(0,0,0,0.12);

    .tooltip {
      /deep/ span {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  tr:nth-child(1) > .app {
    border-bottom: none;
  }
  .padding-scroll {
    padding-left: 300px!important;
  }
  .app-container {
    display: flex;
    align-items: center;
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
  .header-menu {
    height: 16px;
    margin-right: 8px;
    width: 13px;
    z-index: 0;
  }
  th:first-of-type {
    .header-menu  {
      display: none!important;
    }
  }
  .header-activator {
    height: 13px;
    margin-left: 4px;
  }
  .cog-icon {
    height: 13px;
  }
  .network-item-container {
    display: flex;
    align-items: center;
    justify-content: center;

    .tooltip {
      /deep/ span {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 4px;
      }
    }
  }
}

</style>
