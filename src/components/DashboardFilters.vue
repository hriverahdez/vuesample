<template lang="pug">
  v-container(grid-list-md text-xs-center)
    v-layout(row wrap)
        v-flex(xs6 pr-3)
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
        v-flex(xs6 pl-3)
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

        v-flex(xs6 pr-3)
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

        v-flex(xs6 pl-3)
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
      valid: false
    }
  }
}
</script>

<style lang="scss" scoped>
.prueba {
    height: 50px;
    background: red;
    width: 100%;
}
</style>


