<template lang="pug">
  v-container(grid-list-xs text-xs-center)
    v-layout(row wrap)
        v-flex(xs2)
            v-select(
                v-model="apps"
                :items="config.platforms"
                :label="this.$t('dashboard_view.app')"
                tags
                autocomplete
                clearable
                @change="checkIfApplyButtonAvailable"
                @input="addAppToList"
                ref="appSelect"
            )
                template(slot="selection" slot-scope="data")
                    v-chip(
                        :selected="data.selected"
                        close
                        @input="data.parent.selectItem(data.item)"
                    )
                        v-avatar(class="accent") {{ data.item.slice(0, 1).toUpperCase() }}
                        | {{ data.item }}
        v-flex(xs2)
            v-select(
                v-model="countries"
                :items="config.countries"
                item-text="name"
                :label="this.$t('dashboard_view.country')"
                tags
                autocomplete
                clearable
                @input="addCountryToList"
                ref="countrySelect"
                @change="checkIfApplyButtonAvailable"
            )
                template(slot="selection" slot-scope="data")
                    v-chip(
                        :selected="data.selected"
                        close
                        @input="data.parent.selectItem(data.item)"
                    ) {{ data.item }}

        v-flex(xs2)
            v-select(
                v-model="formats"
                :items="config.formats"
                :label="this.$t('dashboard_view.format')"
                tags
                autocomplete
                clearable
                @change="checkIfApplyButtonAvailable"
                @input="addFormatToList"
                ref="formatSelect"
            )
                template(slot="selection" slot-scope="data")
                    v-chip(
                        :selected="data.selected"
                        close
                        @input="data.parent.selectItem(data.item)"
                    ) {{ data.item }}

        v-flex(xs2)
            v-select(
                v-model="networks"
                :items="config.networkIds"
                :label="this.$t('dashboard_view.network')"
                tags
                autocomplete
                clearable
                @change="checkIfApplyButtonAvailable"
                @input="addNetworkToList"
                ref="networkSelect"
            )
                template(slot="selection" slot-scope="data")
                    v-chip(
                        :selected="data.selected"
                        close
                        @input="data.parent.selectItem(data.item)"
                    ) {{ data.item }}

        v-flex(xs4 class="dau buttons-container")
            v-btn(
                :disabled="!valid"
                class="white--text"
                color="buttonColor"
                @click.native="resetFilters"
                ) {{ $t('dashboard_view.reset_filters')}}
            v-btn(
                class="white--text"
                color="buttonColor"
                @click.native="accountEventHandler"
                :disabled="!valid"
                ) {{ $t('dashboard_view.apply_filters')}}
            v-checkbox(
                class="dau__text"
                v-model="dau"
                label="Add DAU/AU data"
                color="indigo darken-3"
                value="indigo darken-3"
                hide-details)

    // Lists
    // Rows
    v-flex(xs12 v-if="apps.length")
        v-list(class="list")
            v-subheader(class="list-title") {{`${$t('dashboard_view.apps')}:`}}
            template(v-for="(app, index) in apps")
                v-list-tile
                    v-list-tile-content {{ app }}

    v-flex(xs12 v-if="countries.length")
        v-list(class="list")
            v-subheader(class="list-title") {{`${$t('dashboard_view.countries')}:`}}
            template(v-for="(country, index) in countries")
                v-list-tile
                    v-list-tile-content {{ country.name }}

    v-flex(xs12 v-if="formats.length")
        v-list(class="list")
            v-subheader(class="list-title") {{`${$t('dashboard_view.formats')}:`}}
            template(v-for="(format, index) in formats")
                v-list-tile
                    v-list-tile-content {{ format }}

    v-flex(xs12 v-if="networks.length")
        v-list(class="list")
            v-subheader(class="list-title") {{`${$t('dashboard_view.networks')}:`}}
            template(v-for="(network, index) in networks")
                v-list-tile
                    v-list-tile-content {{ network }}


    //- // Columns
    //- v-layout(row v-if="checkIfVisibleLists()")
    //-     v-flex(xs3 v-if="apps.length")
    //-         v-list
    //-             template(v-for="(app, index) in apps")
    //-                 v-list-tile
    //-                     v-list-tile-content {{ app }}
    //-     v-flex(xs3)
    //-         v-list
    //-             template(v-for="(country, index) in countries")
    //-                 v-list-tile
    //-                     v-list-tile-content {{ country.name }}

    //-     v-flex(xs3)
    //-         v-list
    //-             template(v-for="(item, index) in apps")
    //-                 v-list-tile
    //-                     v-list-tile-content {{ item }}

    //-     v-flex(xs3)
    //-         v-list
    //-             template(v-for="(item, index) in apps")
    //-                 v-list-tile
    //-                     v-list-tile-content {{ item }}

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard-filters',
  data () {
    return {
      apps: [],
      countries: [],
      formats: [],
      networks: [],
      dau: false,
      valid: false
    }
  },
  watch: {
    apps (val) {
      this.checkIfApplyButtonAvailable()
    },
    countries (val) {
      this.checkIfApplyButtonAvailable()
    },
    formats (val) {
      this.checkIfApplyButtonAvailable()
    },
    networks (val) {
      this.checkIfApplyButtonAvailable()
    }
  },
  computed: {
    ...mapGetters({
      config: 'dashboardFiltersGetter'
    })
  },
  methods: {
    // Push selected apps to apps list
    addAppToList () {
      if (this.apps.length) {
        this.$refs['appSelect'].$el.children[1].children[0].innerText = `${this.$t('dashboard_view.apps')} (${this.apps.length})`
      } else {
        this.$refs['appSelect'].$el.children[1].children[0].innerText = ''
      }
    },
    // Push selected country to countries list
    addCountryToList () {
      if (this.countries.length) {
        this.$refs['countrySelect'].$el.children[1].children[0].innerText = `${this.$t('dashboard_view.countries')} (${this.countries.length})`
      } else {
        this.$refs['countrySelect'].$el.children[1].children[0].innerText = ''
      }
    },
    // Push selected format to formats list
    addFormatToList () {
      if (this.formats.length) {
        this.$refs['formatSelect'].$el.children[1].children[0].innerText = `${this.$t('dashboard_view.formats')} (${this.formats.length})`
      } else {
        this.$refs['formatSelect'].$el.children[1].children[0].innerText = ''
      }
    },
    // Push selected network to networks list
    addNetworkToList () {
      if (this.networks.length) {
        this.$refs['networkSelect'].$el.children[1].children[0].innerText = `${this.$t('dashboard_view.networks')} (${this.networks.length})`
      } else {
        this.$refs['networkSelect'].$el.children[1].children[0].innerText = ''
      }
    },
    resetFilters () {
      this.apps = []
      this.$refs['appSelect'].$el.children[1].children[0].innerText = ''
      this.countries = []
      this.$refs['countrySelect'].$el.children[1].children[0].innerText = ''
      this.formats = []
      this.$refs['formatSelect'].$el.children[1].children[0].innerText = ''
      this.networks = []
      this.$refs['networkSelect'].$el.children[1].children[0].innerText = ''
      this.valid = false
    },
    checkIfApplyButtonAvailable () {
      if (this.apps.length || this.countries.length || this.formats.length || this.networks.length) {
        this.valid = true
      } else {
        this.valid = false
      }
    }
    // Show or hide lists elements
    // checkIfVisibleLists () {
    //   if (this.apps.length || this.countries.length) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.buttons-container {
    display: flex;
    align-items: center;
    justify-content: center;
    .btn {
        font-size: 11px;
    }
    .dau {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.list {
    display: flex;
    overflow: auto;
}
.list-title {
    margin: 0 4px 0 20px;
}

</style>










