<template lang="pug">
  v-container(text-xs-center)
    v-layout(row wrap)
        v-flex(xs2)
            v-select(
                v-model="$store.state.configModule.appFilters"
                :items="appNames"
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
                        v-avatar(class="accent") 
                        | {{ data.item }}
        v-flex(xs2)
            v-select(
                v-model="$store.state.configModule.countryFilters"
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
                v-model="$store.state.configModule.formatFilters"
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
                v-model="$store.state.configModule.networkFilters"
                :items="networkNames"
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
                @click.native="sendFilterValues"
                :disabled="!valid"
                ) {{ $t('dashboard_view.apply_filters')}}
            v-checkbox(
                class="dau__text"
                v-model="$store.state.DAU"
                label="Add DAU/AU data"
                color="indigo darken-3"
                value="indigo darken-3"
                hide-details)

        //Confirm appiled filters
        //- dialog-alert

    // Lists
    // Rows
    transition(name="fade")
      v-flex(xs12 v-if="apps.length" class="list-container")
          v-list(class="list")
              v-subheader(class="list-title") {{`${$t('dashboard_view.apps')}:`}}
              template(v-for="(app, index) in apps")
                  v-fade-transition
                      v-chip(close @input="removeChip(app, 'appFilters')") {{ app }}

    transition(name="fade")
      v-flex(xs12 v-if="countries.length" class="list-container")
          v-list(class="list")
              v-subheader(class="list-title") {{`${$t('dashboard_view.countries')}:`}}
              template(v-for="(country, index) in countries")
                  v-chip(close @input="removeChip(country, 'countryFilters')") {{ country.name }}

    transition(name="fade")
      v-flex(xs12 v-if="formats.length" class="list-container")
          v-list(class="list")
              v-subheader(class="list-title") {{`${$t('dashboard_view.formats')}:`}}
              template(v-for="(format, index) in formats")
                  v-chip(close @input="removeChip(format, 'formatFilters')") {{ format }}

    transition(name="fade")
      v-flex(xs12 v-if="networks.length" class="list-container")
          v-list(class="list")
              v-subheader(class="list-title") {{`${$t('dashboard_view.networks')}:`}}
              template(v-for="(network, index) in networks")
                  v-chip(close @input="removeChip(network, 'networkFilters')") {{ network }}


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
import { mapActions, mapGetters, mapMutations } from 'vuex'
// Import components
// import DialogAlert from '@/components/DialogAlert'

export default {
  name: 'dashboard-filters',
  data () {
    return {
      // apps: [],
      // countries: [],
      // formats: [],
      // networks: [],
      // dau: false,
      valid: false
    }
  },
  // components: {
  //   DialogAlert
  // },
  watch: {
    apps (val) {
      this.checkIfApplyButtonAvailable()
      this.addAppToList()
    },
    countries (val) {
      this.checkIfApplyButtonAvailable()
      this.addCountryToList()
    },
    formats (val) {
      this.checkIfApplyButtonAvailable()
      this.addFormatToList()
    },
    networks (val) {
      this.checkIfApplyButtonAvailable()
      this.addNetworkToList()
    }
  },
  computed: {
    ...mapGetters({
      appNames: 'appNamesGetter',
      apps: 'appFiltersGetter',
      config: 'dashboardFiltersGetter',
      countries: 'countryFiltersGetter',
      formats: 'formatFiltersGetter',
      networks: 'networkFiltersGetter',
      networkNames: 'networkNamesGetter'

    })
  },
  methods: {
    ...mapActions([
      'appFiltersAction',
      'countryFiltersAction',
      'formatFiltersAction',
      'networkFiltersAction',
      'removeFilterItemAction'
    ]),
    ...mapMutations(['setAlertMessage']),
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
    checkIfApplyButtonAvailable () {
      if (this.apps.length || this.countries.length || this.formats.length || this.networks.length) {
        this.valid = true
      } else {
        this.valid = false
      }
    },
    // Remove chip item from list
    removeChip (item, filterType) {
      this.removeFilterItemAction({item, filterType})
      // this.formatFiltersAction([])
      // this[type].splice(this[type].indexOf(item), 1)
      // this[type] = [...this[type]]
    },
    resetFilters () {
      // this.apps = []
      this.$refs['appSelect'].$el.children[1].children[0].innerText = ''
      // this.countries = []
      this.$refs['countrySelect'].$el.children[1].children[0].innerText = ''
      // this.formats = []
      this.$refs['formatSelect'].$el.children[1].children[0].innerText = ''
      // this.networks = []
      this.$refs['networkSelect'].$el.children[1].children[0].innerText = ''
      this.appFiltersAction([])
      this.countryFiltersAction([])
      this.formatFiltersAction([])
      this.networkFiltersAction([])
      this.valid = false
    },
    // Get filters info
    sendFilterValues () {
      let countryCodes = []
      let networksToString = []
      this.countries.map((country) => {
        countryCodes.push(country.code)
      })
      this.networks.map((network) => {
        networksToString.push(network.toString())
      })
      this.appFiltersAction(this.apps)
      this.countryFiltersAction(countryCodes)
      this.formatFiltersAction(this.formats)
      this.networkFiltersAction(networksToString)
      this.setAlertMessage({
        show: true,
        type: 'success',
        message: this.$t('dashboard_view.confirm_filters_applied_message'),
        buttonText: this.$t('buttons.close')
      })
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
    align-items: center;
    border: 1px solid  rgba(0,0,0,0.12);
    border-radius: 4px;
    padding: 4px;
}
.list-title {
    margin: 0 4px 0 20px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}

</style>










