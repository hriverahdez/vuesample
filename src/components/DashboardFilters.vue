<template lang="pug">
  v-container(grid-list-md text-xs-center)
    v-layout(row wrap)
        v-flex(xs4)
            v-select(
                v-model="emptyApps"
                :items="apps"
                item-text="name"
                :label="this.$t('dashboard_view.apps')"
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
        v-flex(xs4)
            v-select(
                v-model="emptyNetworks"
                :items="networks"
                :label="this.$t('dashboard_view.networks')"
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
        v-flex(xs4)
            v-select(
                v-model="emptyFormats"
                :items="formats"
                :label="this.$t('dashboard_view.formats')"
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
      apps: [
        'Android',
        'IOS',
        'Ejemplo app 1',
        'Ejemplo app 2'
      ],
      formats: [
        'Banner',
        'Banner premium',
        'Interstitials',
        'Interstitiasl premium',
        ' Reward video'
      ],
      networks: [
        'Addcolony',
        'Addmob',
        'Applovin',
        'Chartboost'
      ],
      emptyApps: [],
      emptyFormats: [],
      emptyNetworks: []
    }
  }
}
</script>

