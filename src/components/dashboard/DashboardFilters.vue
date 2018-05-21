<template lang="pug">
  v-container(grid-list-xs text-xs-center)
    v-layout(row wrap)
        v-flex(xs3)
            v-select(
                v-model="emptyApp"
                :items="config.platforms"
                :label="this.$t('dashboard_view.app')"
                tags
                autocomplete
                clearable
            )
                template(slot="selection" slot-scope="data")
                    v-chip(
                        :selected="data.selected"
                        close
                        @input="data.parent.selectItem(data.item)"
                    )
                        v-avatar(class="accent") {{ data.item.slice(0, 1).toUpperCase() }}
                        | {{ data.item }}
        v-flex(xs3)
            v-select(
                v-model="emptyCountry"
                :items="config.countries"
                item-text="name"
                :label="this.$t('dashboard_view.country')"
                tags
                autocomplete
                clearable
            )
                template(slot="selection" slot-scope="data")
                    v-chip(
                        :selected="data.selected"
                        close
                        @input="data.parent.selectItem(data.item)"
                    ) {{ data.item }}

        v-flex(xs3)
            v-select(
                v-model="emptyFormat"
                :items="config.formats"
                :label="this.$t('dashboard_view.format')"
                tags
                autocomplete
                clearable
            )
                template(slot="selection" slot-scope="data")
                    v-chip(
                        :selected="data.selected"
                        close
                        @input="data.parent.selectItem(data.item)"
                    ) {{ data.item }}

        v-flex(xs3)
            v-select(
                v-model="emptyNetwork"
                :items="config.networkIds"
                :label="this.$t('dashboard_view.network')"
                tags
                autocomplete
                clearable
            )
                template(slot="selection" slot-scope="data")
                    v-chip(
                        :selected="data.selected"
                        close
                        @input="data.parent.selectItem(data.item)"
                    ) {{ data.item }}

        v-layout(row justify-end)
            v-flex(xs1 offset-xs5)
                v-btn(
                    color="buttonColor"
                    flat
                    @click.native="closeDialog"
                    ) lolololo
            v-flex(xs1 )
                v-btn(
                    class="white--text"
                    color="buttonColor"
                    @click.native="accountEventHandler"
                    :disabled="!valid"
                    ) lalala

</template>

<script>
import { GET_DATA_FILTERS } from '@/graphql/dashboardReport'

export default {
  name: 'dashboard-filters',
  data () {
    return {
      app: [
        'Android',
        'IOS',
        'Ejemplo app 1',
        'Ejemplo app 2'
      ],
      country: [
        'Spain',
        'England',
        'Anngola'
      ],
      format: [
        'Banner',
        'Banner premium',
        'Interstitials',
        'Interstitiasl premium',
        ' Reward video'
      ],
      network: [
        'Addcolony',
        'Addmob',
        'Applovin',
        'Chartboost'
      ],
      emptyApp: [],
      emptyCountry: [],
      emptyFormat: [],
      emptyNetwork: [],
      valid: false,
      config: []
    }
  },
  apollo: {
    config: {
      query: GET_DATA_FILTERS,
      context: {
        uri: 'config'
      },
      pollInterval: 100,
      loadingKey: 'loading'
    }
  }
}
</script>



