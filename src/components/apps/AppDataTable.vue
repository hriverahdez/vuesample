<template lang="pug">
  v-card(class="app-card")
    v-container
      v-layout(wrap xs12 class="card__row-title")
        v-flex(xs2)
            v-card-title(class="app-title") {{ $t('apps_view.apps_title' )}}
        v-flex(xs6)
            div(class="help-colors")
              div(class="API-working help-text") {{ $t('apps_view.API_working') }}
              div(class="API-check-config help-text") {{ $t('apps_view.API_check_config') }}
              div(class="API-failing help-text") {{ $t('apps_view.API_failing') }}
              div(class="API-no-data help-text" ) {{ $t('apps_view.API_no_data') }}
              div(class="API-not-integrated help-text") {{ $t('apps_view.API_not_integrated') }}
        v-flex(xs4)
            v-text-field(
            append-icon="search"
            :label="this.$t('apps_view.app_search')"
            single-line
            hide-details
            v-model="search"
            class="search-field"
            )
    v-data-table(
        :headers="datatableHeaders"
        :items="apps"
        :search="search"
        class="elevation-1 apps-datatable"
        hide-actions
        :rows-per-page-items="[10, 20, 30]"
        )
        template(slot="headerCell" slot-scope="props")
          span {{ props.header.text }}
          v-menu(offset-y bottom @click.native.stop="getNetworkStatus(props.header.text)" class="network-header-menu")
            a(slot="activator" class="header-activator")
              icon(name="cog" class="cog-icon")
            v-list(class="apps-view-list")
              v-list-tile(
                @click.native.stop="showManageNetworkProfiles(props.header.text)"
                class="header-tile"
                ) {{ $t('apps_view.manage_network_profiles')}}
              v-list-tile(@click.native.stop="" class="header-tile") {{ $t('apps_view.enable_disable_network')}}
                v-switch(
                  light
                  color="success"
                  hide-details
                  class="switch"
                  @change="toggleEnableDisableNetwork(networkProfile.active, props.header.text, networkProfile.networkId)"
                  :value="true"
                  :input-value="networkProfile.active"
                  )

        template(slot="items" slot-scope="props")
            td(class="text-xs-left app" :class="{'disabled': props.item.disabled }")
              div(class="app-container")
                img(:src="props.item.icon" class="app-logo")
                icon(v-if="props.item.platform === 'android'" name="android" color="gray")
                icon(v-if="props.item.platform === 'ios'" name="apple" color="gray")
                span(
                  class="app__text"
                  :data="props.item._id"
                  ) {{ props.item.name }}
                //- Apps menu
                v-menu(offset-y bottom class="app-column-menu")
                  a(slot="activator" class="activator")
                    icon(name="cog" class="cog-icon")
                  v-list(class="app-column-menu__list apps-view-list")
                    v-list-tile(
                      class="app-column-menu__list__item"
                      @click.native.stop="showEditAppDialog(props.item)"
                    ) {{ $t('apps_view.app_edit') }}
                    v-list-tile(
                      class="app-column-menu__list__item"
                      @click.native="showDeleteDialog(props.item)"
                    ) {{ $t('apps_view.app_delete') }}
                    v-list-tile(
                      class="app-column-menu__list__item"
                      @click.native.stop=""
                    ) {{ $t('apps_view.app_enable_disable') }}
                      v-switch(
                        light
                        color="success"
                        :value="true"
                        :input-value="!props.item.disabled"
                        @change="toggleEnableDisableApp(props.item._id, props.item.platform, props.item.disabled)"
                        hide-details
                        class="switch"
                      )
                    // v-list-tile(
                    //   class="app-column-menu__list__item"
                    //   @click.native.stop=""
                    // ) {{ $t('apps_view.manage_ad_placements') }}
                    // v-list-tile(
                    //   class="app-column-menu__list__item"
                    //   @click.native.stop=""
                    // ) {{ $t('apps_view.waterfall_debugger') }}

            td(v-for="(network, index) in createdNetworksObject" v-bind:class="{ 'padding-scroll': network.name === 'ADMOB', 'disabled' : (props.item.disabled || network.active === false), 'no-profiles-length' : !network.numberOfProfiles }")
              div(class="network-item-container" @click.stop="selectedCell(network, props.item.name, props.item._id)")
                icon(name="cog" slot="activator" class="cog-icon")

        template(slot="no-data")
            v-alert(
            :value="true"
            color="error"
            icon="warning") {{ $t('apps_view.alert_message')}}
</template>

<script>
// Vuex imports
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'AppsDataTable',
  data: () => ({
    // appMenuOptions: [
    //   'apps_view.app_edit',
    //   'apps_view.app_delete',
    //   'apps_view.app_enable_disable',
    //   'apps_view.manage_ad_placements',
    //   'apps_view.waterfall_debugger'
    // ],
    editedApp: {
      name: '',
      bundle: '',
      platform: '',
      URL: '',
      description: ''
    },
    appSwitchStatus: {
      switch: [true]
    },
    networkSwitchStatus: false,
    search: ''
  }),
  computed: {
    ...mapGetters({
      apps: 'appsDataGetter',
      // networks: 'networksIdsAndNamesGetter',
      networkProfilesLength: 'getNetworksProfilesLengthGetter',
      networkIds: 'networkIdsGetter',
      networksInfo: 'networksInfoGetter',
      networkProfile: 'networkProfilesDataGetter',
      networkProfilesStatus: 'networkProfilesStatusGetter'
    }),
    createdNetworksObject () {
      if (this.networks && this.networkProfilesStatus && this.networkProfilesLength) {
        let clonedNetworks = JSON.parse(JSON.stringify(this.networks))

        clonedNetworks.map((network) => {
          this.networkProfilesStatus.map((networkItem) => {
            if (parseInt(network.id) === networkItem.networkId) {
              network.active = networkItem.active || false
            }
          })
          this.networkProfilesLength.map((networkItem) => {
            if (parseInt(network.id) === networkItem.networkId) {
              network.numberOfProfiles = networkItem.numberOfProfiles || false
            }
          })
        })

        return clonedNetworks
      }
    },
    // Get cuurrent netqork actives
    currentNetworksActive () {
      if (this.networksInfo && this.networkIds) {
        let currentNetworksActive = []
        for (let key in this.networksInfo) {
          if (this.networkIds.includes(parseInt(key))) {
            currentNetworksActive.push(key)
          }
        }
        return currentNetworksActive
      }
    },
    // Get datatable headers
    datatableHeaders () {
      if (this.networksInfo && this.currentNetworksActive) {
        let headers = [
          {
            text: 'Name',
            align: 'left',
            value: 'name'
          }
        ]
        this.currentNetworksActive.map((network) => {
          let newObject = {}
          newObject['text'] = this.networksInfo[parseInt(network)].name.toUpperCase()
          newObject['value'] = this.networksInfo[parseInt(network)].name.toUpperCase()
          newObject['sortable'] = false
          headers.push(newObject)
        })
        return headers
      }
    },
    // Get data networks for datatable cells
    networks () {
      if (this.networksInfo && this.currentNetworksActive) {
        let networks = []
        this.currentNetworksActive.map((network) => {
          let newObject = {}
          newObject['id'] = network
          newObject['name'] = this.networksInfo[parseInt(network)].name.toUpperCase()
          networks.push(newObject)
        })
        return networks
      }
    },
    networkObjectForDataTableHeaders () {
      if (this.createdNetworkObject) {
        return this.createdNetworkObject.filter(item => item.name)
      }
    }
  },
  methods: {
    ...mapActions([
      'appDialogStatusAction',
      'appManageNetworkProfileDialogStatusAction',
      'appNetworkConfigDialogStatusAction',
      'appRemoveDialogStatusAction',
      'appIdAction',
      'editedAppIndexStatusAction',
      'selectedAppNetworkInDatatableAction',
      'selectedNetworkToManageAction',
      'skipAppByIdQueryAction',
      'skipAppByIdAndNetworkQueryAction',
      'skipAppNetworkFormFieldsAction',
      'skipNetworkProfilesAction'
    ]),
    ...mapMutations(['APP_DATA']),
    // Obtenemos el estado de red en la cabecera de la tabla de apps (enble/disable)
    getNetworkStatus (networkName) {
      this.$root.$emit('launchNetworkProfilesQuery', networkName)
    },
    showDeleteDialog (app) {
      this.appRemoveDialogStatusAction(true)
      .then(() => this.appIdAction(app._id))
    },
    // Show edit app dialog
    showEditAppDialog (app) {
      this.editedAppIndexStatusAction(this.apps.indexOf(app))
      this.editedApp = Object.assign({}, app)
      this.APP_DATA(this.editedApp)
      this.appDialogStatusAction(true)
    },
    // Send data to show the app-network configuration corresponding dialog from datatable cell
    selectedCell (networkName, appName, appId) {
      this.selectedAppNetworkInDatatableAction({networkName, appName, appId})
      this.selectedNetworkToManageAction(networkName)
      this.appNetworkConfigDialogStatusAction(true)
      this.skipAppNetworkFormFieldsAction(false)
      this.skipAppByIdQueryAction(false)
      this.skipAppByIdAndNetworkQueryAction(false)
      this.$root.$emit('launchNetworkProfilesQuery', networkName.name)
    },
     // Show the corresponding network profile dialog from datatable header
    showManageNetworkProfiles (networkName) {
      this.appManageNetworkProfileDialogStatusAction(true)
      this.selectedNetworkToManageAction(networkName)
      this.$root.$emit('launchNetworkProfilesQuery', networkName)
    },
    // Enable/disable app status
    toggleEnableDisableApp (appId, platform, status) {
      this.$root.$emit('enableDisableApp', appId, platform, status)
    },
    // Enable/disable network status
    toggleEnableDisableNetwork (status, networkName, networkId) {
      this.$root.$emit('enableDisableNetwork', status, networkName, networkId)
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin help-text-content {
  content: '';
  display: inline-block;
  margin-right: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.app-card {
  border-top: 3px solid #BDD0FB;
}
.app-logo {
  display: block;
  width: 20px;
  margin-right: 10px;
  height: auto;
}

.app-title {
   font-size: 18px;
   color: rgba(0,0,0,0.54);
}

.menu__activator a {
  color: #BFBFBF!important;
}

.apps-datatable {
  /deep/ td {
    border-right: 1px solid rgba(0,0,0,0.12);
  }
  /deep/ th {
    z-index: 2!important;
  }
  /deep/ tr:hover {
    background: none!important;
  }
  .app {
    position: absolute;
    background: white;
    display: flex;
    align-items: center;
    border-right: 1px solid rgba(0,0,0,0.12);

    &:hover {
      background: #ededed;
    }

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
    padding-left: 335px!important;
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
  .network-header-menu {
    height: 16px;
    margin-right: 8px;
    width: 13px;
    z-index: 0;
  }
  th:first-of-type {
    .network-header-menu  {
      display: none!important;
    }
  }
  .header-activator {
    height: 12px;
    margin-left: 4px;
    color: #BFBFBF!important;
  }
  .cog-icon {
    height: 12px;
    cursor: pointer;
  }
  .network-item-container {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #BFBFBF!important;

    .cog-icon {
      height: 22px;
    }

      svg {
        margin-left: 4px;
      }
  }
  .activator {
    display: flex
  }
}
.apps-view-list {
  /deep/ .list__tile {
    font-size: 14px;
  }
}

.disabled {
  background: repeating-linear-gradient(
    45deg,
    #fff,
    #fff 10px,
    #F9DAE6 10px,
    #F9DAE6 20px
  )!important;
  pointer-events: none;
}

.app.disabled {
  pointer-events: all;
}

.help-colors {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .help-text {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-right: 12px;
    color: rgba(0,0,0,0.54);

    &.API-working {
      &:before {
          background: #58C0B7;
          @include help-text-content
      }
    }

    &.API-check-config {
      &:before {
          background: #FFE7BE;
          @include help-text-content
      }
    }

    &.API-failing {
      &:before {
          background: #E6A3C3;
          @include help-text-content
      }
    }

    &.API-no-data {
      &:before {
          background: #FFF;
          border: 1px solid rgba(0,0,0,0.12);
          @include help-text-content
      }
    }

    &.API-not-integrated {
      &:before {
          background: #BFBFBF;
          @include help-text-content
      }
    }
  }
}

.no-profiles-length {
  background: repeating-linear-gradient(
    45deg,
    #EAEAEA,
    #EAEAEA 10px,
    #F9DAE6 10px,
    #F9DAE6 20px
  )!important;
  pointer-events: none;
}

.search-field {
  padding-right: 21px;
}

.switch {
  margin-left: 12px;
  padding-top: 5px;
}

.app-column-menu__list__item:hover, .header-tile:hover {
  background: rgba(0,0,0,0.12);
}

</style>
