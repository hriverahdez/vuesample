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
                :items="formatsToFilters"
                :label="this.$t('dashboard_view.format')"
                tags
                autocomplete
                item-text="name"
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
                item-text="name"
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
            //- v-checkbox(
            //--    class="dau__text"
            //-    v-model="$store.state.DAU"
            //-     label="Add DAU/AU data"
            //-     color="indigo darken-3"
            //-     value="indigo darken-3"
            //-     hide-details)

        //-Confirm appiled filters
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
                  v-chip(close @input="removeChip(format, 'formatFilters')") {{ format.name }}

    transition(name="fade")
      v-flex(xs12 v-if="networks.length" class="list-container")
          v-list(class="list")
              v-subheader(class="list-title") {{`${$t('dashboard_view.networks')}:`}}
              template(v-for="(network, index) in networks")
                  v-chip(close @input="removeChip(network, 'networkFilters')") {{ network.name }}

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'dashboard-filters',
  data () {
    return {
      valid: false
    }
  },
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
      appsIdAndName: 'appIdAndNameGetter',
      config: 'dashboardFiltersGetter',
      countries: 'countryFiltersGetter',
      formats: 'formatFiltersGetter',
      formatsToFilters: 'formatsIdsAndNamesGetter',
      networks: 'networkFiltersGetter',
      networksToFilters: 'networksKeysGetter',
      networkNames: 'networksIdsAndNamesGetter',
      formatsArray: 'formatsArrayForDashboardFiltersGetter'
    })
  },
  methods: {
    ...mapActions([
      'appFiltersAction',
      'appIdsFiltersAction',
      'countryFiltersAction',
      'countryIdsFiltersAction',
      'formatFiltersAction',
      'formatIdsFiltersAction',
      'networkFiltersAction',
      'networkIdsFiltersAction',
      'removeFilterItemAction'
      // 'skipDashboardDataQueryAction',
      // 'skipDatatableDataQueryAction'
    ]),
    ...mapMutations(['SET_ALERT_MESSAGE']),
    // Push selected apps to apps list
    addAppToList () {
      if (this.apps.length) {
        this.$refs['appSelect'].$el.children[1].children[0].innerText = `${this.$t('dashboard_view.apps')} (${this.apps.length})`
      } else {
        this.$refs['appSelect'].$el.children[1].children[0].innerText = ''
        this.appIdsFiltersAction([])
      }
    },
    // Push selected country to countries list
    addCountryToList () {
      if (this.countries.length) {
        this.$refs['countrySelect'].$el.children[1].children[0].innerText = `${this.$t('dashboard_view.countries')} (${this.countries.length})`
      } else {
        this.$refs['countrySelect'].$el.children[1].children[0].innerText = ''
        this.countryIdsFiltersAction([])
      }
    },
    // Push selected format to formats list
    addFormatToList () {
      if (this.formats.length) {
        this.$refs['formatSelect'].$el.children[1].children[0].innerText = `${this.$t('dashboard_view.formats')} (${this.formats.length})`
      } else {
        this.$refs['formatSelect'].$el.children[1].children[0].innerText = ''
        this.formatIdsFiltersAction([])
      }
    },
    // Push selected network to networks list
    addNetworkToList () {
      if (this.networks.length) {
        this.$refs['networkSelect'].$el.children[1].children[0].innerText = `${this.$t('dashboard_view.networks')} (${this.networks.length})`
      } else {
        this.$refs['networkSelect'].$el.children[1].children[0].innerText = ''
        this.networkIdsFiltersAction([])
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
      this.appIdsFiltersAction([])
      this.countryIdsFiltersAction([])
      this.formatIdsFiltersAction([])
      this.networkIdsFiltersAction([])
      this.valid = false
    },
    // Get filters info
    sendFilterValues () {
      // App
      let appIds = []
      this.appsIdAndName.map((app, index) => {
        if (app.name === this.apps[index]) {
          appIds.push(app.id)
        }
      })
      this.appFiltersAction(this.apps)
      this.appIdsFiltersAction(appIds)
      // Country
      let countryCodes = []
      this.countries.map((country) => {
        countryCodes.push(country.code)
      })
      this.countryIdsFiltersAction(countryCodes)
      // Network
      let networksIds = []
      this.networks.map((network) => {
        networksIds.push(network.id)
      })
      this.networkIdsFiltersAction(networksIds)
      // Format
      let formatsIds = []
      this.formats.map((format) => {
        formatsIds.push(format.id)
      })
      this.formatIdsFiltersAction(formatsIds)

      // Resume queries
      // this.skipDashboardDataQueryAction(false)
      // this.skipDatatableDataQueryAction(false)
      // this.SET_ALERT_MESSAGE({
      //   show: true,
      //   type: 'success',
      //   message: this.$t('dashboard_view.confirm_filters_applied_message'),
      //   buttonText: this.$t('buttons.close')
      // })
    }
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










