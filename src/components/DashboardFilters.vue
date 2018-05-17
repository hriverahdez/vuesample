<template lang="pug">
  v-container(grid-list-md text-xs-center)
    v-layout(row wrap)
        v-flex(xs3)
            v-select(
                v-model="emptyApp"
                :items="app"
                item-text="name"
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
                :items="country"
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
                :items="format"
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
                :items="network"
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

</template>

<script>
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
      emptyNetwork: []
    }
  }
}
</script>

