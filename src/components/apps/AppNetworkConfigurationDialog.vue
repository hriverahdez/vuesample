<template lang="pug">
    //- Exist formats
    v-dialog(
      v-if="formats"
      v-model="$store.state.appModule.appNetworkConfigDialogStatus"
      max-width="700"
      light)
      v-card
        v-card-title(
          class="formElementColor py-4 title white--text"
          ) {{ $t('apps_view.network_configuration') }}
        v-card-text
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12)
                section(class="network-config-container")
                  div(class="network-config-container__data")
                    div(class="network-config-container__data__network")
                      span {{ $t('apps_view.network')}}:
                      img(:src="imageSrc" class="network-logo")
                      //- {{ selectedAppNetworkConfig.networkName }}
                    div(class="network-config-container__data__app")
                      span {{ $t('apps_view.app')}}:
                      img(:src="app.icon" alt="" class="app-logo" v-if="app.icon")
                      span {{ selectedAppNetworkConfig.appName }}
                    div(class="network-config-container__data__platform")
                      span {{ $t('apps_view.platform') }}:
                      icon(v-if="app.platform === 'android'" name="android" color="gray" class="platform-icon")
                      icon(v-if="app.platform === 'ios'" name="apple" color="gray" class="platform-icon")
                  div
                    v-switch(
                      light
                      :label="check"
                      v-model="configStatus"
                      color="success"
                      hide-details
                    )
                section(class="network-config-container__manage")
                  v-flex(xs7)
                    v-select(
                      :items="networkProfiles"
                      item-text="name"
                      item-value="name"
                      :label="this.$t('apps_view.select_profile')"
                      v-model="selected"
                      required
                    )

                section(
                  class="network-config-container__formats-config")
                  h4 {{ $t('apps_view.format_config')}}
                  div(:ref="`format${index}`" v-for="(format, index) in formats" v-if="formats" :key="index" class="network-config-container__formats-config__block")
                    div(class="network-config-container__formats-config__header")
                      div(class="network-config-container__formats-config__header__title") {{ getFormatLabel(format.format)}}
                      v-switch(
                          light
                          :label="check"
                          color="success"
                          v-model="switchStatus.status[index]"
                          hide-details
                        )
                    div(v-for="(formatField, index) in format.formatFields")
                      v-text-field(
                        :label="formatField.key"
                        :value="formatField.value"
                        @change="getNewValue($event, index, format.format)"
                        hide-details
                        )
                      p(class="help-text" v-html="$t(`networks_info.${nameAndIdNetworkFormatted}.format_profile_text.${formatField.key}`)")

                section(class="network-config-container__btn")
                  v-btn(
                    v-if="!queryError"
                    color="buttonColor"
                    class="white--text"
                    @click.native.stop="sendEditAppNetworkProfileEvent(app._id, app.networks[0].networkId, selected)"
                    ) {{ $t('buttons.edit') }}
                  v-btn(
                    v-else
                    color="buttonColor"
                    class="white--text"
                    @click.native.stop="closeDialog"
                    ) {{ $t('buttons.cancel') }}

    //- Empty form
    v-dialog(
      v-else
      v-model="$store.state.appModule.appNetworkConfigDialogStatus"
      max-width="700"
      light)
      v-card
        v-card-title(
          class="formElementColor py-4 title white--text"
          ) {{ $t('apps_view.network_configuration') }}
        v-card-text
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12)
                section(class="network-config-container")
                  div(class="network-config-container__data")
                    div(class="network-config-container__data__network")
                      span {{ $t('apps_view.network')}}:
                      img(:src="imageSrc" class="network-logo")
                      //- {{ selectedAppNetworkConfig.networkName }}
                    div(class="network-config-container__data__app")
                      span {{ $t('apps_view.app')}}:
                      img(:src="app.icon" alt="" class="app-logo" v-if="app.icon")
                      span {{ selectedAppNetworkConfig.appName }}
                    div(class="network-config-container__data__platform")
                      span {{ $t('apps_view.platform') }}:
                      icon(v-if="app.platform === 'android'" name="android" color="gray" class="platform-icon")
                      icon(v-if="app.platform === 'ios'" name="apple" color="gray" class="platform-icon")
                  div
                    v-switch(
                      light
                      :label="check"
                      v-model="configStatus"
                      color="success"
                      hide-details
                    )
                section(class="network-config-container__manage")
                  v-flex(xs7)
                    v-select(
                      :items="networkProfiles"
                      item-text="name"
                      item-value="name"
                      :label="this.$t('apps_view.select_profile')"
                      v-model="selected"
                      required
                    )

                section(
                  class="network-config-container__formats-config")
                  h4 {{ $t('apps_view.format_config')}}
                  div(:ref="`format${index}`" v-for="(format, index) in formatFields" v-if="formatFields" :key="index" class="network-config-container__formats-config__block")
                    div(class="network-config-container__formats-config__header")
                      div(class="network-config-container__formats-config__header__title") {{ getFormatLabel(format.format) }}
                      v-switch(
                          light
                          :label="check"
                          color="success"
                          v-model="switchStatus.status[index]"
                          hide-details
                        )
                    div(v-for="(field, index) in format.fields")
                      v-text-field(
                        :label="field"
                        @change="getNewValue($event, index, format.format)"
                        hide-details
                        )
                      p(class="help-text") {{ $t(`networks_info.${nameAndIdNetworkFormatted}.format_profile_text.${field}`) }}

                section(class="network-config-container__btn")
                  v-btn(
                    color="buttonColor"
                    class="white--text"
                    flat
                    @click.native.stop="closeDialog"
                    ) {{ $t('buttons.cancel') }}
                  v-btn(
                    color="buttonColor"
                    class="white--text"
                    @click.native.stop="sendCreateAppNetworkProfileEvent"
                    ) {{ $t('buttons.save') }}

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// Components
// import DialogAlert from '@/components/DialogAlert'

export default {
  name: 'app-network-configuration-dialog',
  // components: {
  //   DialogAlert
  // },
  data () {
    return {
      configStatus: false,
      newInputValue: false,
      switchStatus: {
        status: []
      },
      selected: 'default',
      valid: false
    }
  },
  // props: {
  //   error: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  watch: {
    // remove_permission (val) {
    //   if (val === this.randomNumber.toString()) {
    //     this.valid = true
    //   } else {
    //     this.valid = false
    //   }
    // }
  },
  computed: {
    ...mapGetters({
      app: 'appByIdDataGetter',
      formats: 'formatsSelectedAppAndNetworkGetter',
      formatFields: 'configAppNetworkFormFieldsGetter',
      formatTypes: 'formatsIdsAndNamesGetter',
      networkProfiles: 'networkProfilesListGetter',
      networkStatus: 'networkStatusGetter',
      queryError: 'queryErrorGetter',
      selectedAppNetworkConfig: 'selectedAppNetworkInDatatableGetter'
      // skippedQuery: 'skipAppByIdQueryGetter'
    }),
    createInputVariables () {
      let input = {}
      const omitTypename = (key, value) => (key === '__typename' ? undefined : value)
      let cloneFormats = JSON.parse(JSON.stringify(this.formats), omitTypename)

      input['active'] = this.configStatus
      input['profile'] = this.selected
      input['formats'] = cloneFormats
      // input['switchs'] = this.switchStatus

      this.switchStatus.status.map((item, index) => {
        input['formats'][index].active = item
      })

      if (this.newInputValue) {
        input['formats'].map((item, index) => {
          if (item.format === this.newInputValue.format) {
            item.formatFields[this.newInputValue.index].value = this.newInputValue.value
          }
        })
      }
      return input
    },
    nameAndIdNetworkFormatted () {
      return `${this.selectedAppNetworkConfig.networkName.name.toLowerCase()}${this.selectedAppNetworkConfig.networkName.id}`
    },
    // Change switch text label
    check () {
      if (this.configStatus) {
        return this.$t('switch.on')
      } else {
        return this.$t('switch.off')
      }
    },
    imageSrc () {
      return require(`../../assets/networks/${this.selectedAppNetworkConfig.networkName.id}.png`)
    }
  },
  methods: {
    ...mapActions([
      'appByIdAndNetworkDataAction',
      'appNetworkConfigDialogStatusAction',
      'queryErrorAction',
      'skipAppByIdAndNetworkQueryAction'
    ]),
    // Close dialog layer
    closeDialog () {
      this.appNetworkConfigDialogStatusAction(false)
    },
    // Get translation format label
    getFormatLabel (format) {
      if (this.formatTypes) {
        let label = ''
        this.formatTypes.map((item) => {
          if (format === item.id) {
            label = item.name
          }
        })
        return label
      }
    },
    // Get values from input texts
    getNewValue (value, index, format) {
      this.newInputValue = { value, index, format }
    },
    // Send event to update app-network
    sendEditAppNetworkProfileEvent (appId, networkId, profile) {
      if (!this.queryError) {
        this.$root.$emit('updateAppNetworkProfile', appId, networkId, profile, this.createInputVariables)
      } else {
        this.queryErrorAction(false)
      }
    },
    // Send event to create format data app-network
    sendCreateAppNetworkProfileEvent () {
      console.log('entra')
      // this.$root.$emit('updateAppNetworkProfile', appId, networkId, profile, this.createInputVariables)
    }
    // sendDeleteAppEvent () {
    //   this.$root.$emit('deleteApp', this.appId)
    // }
  },
  mounted () {
    // Asignamos el valor que viene por defecto de las queries a los switches (activo/inactivo)
    this.configStatus = this.networkStatus
    if (this.formats) {
      this.formats.map((item) => {
        this.switchStatus.status.push(item.active)
      })
    }
  },
  beforeDestroy () {
    this.appByIdAndNetworkDataAction({})
  }
}
</script>

<style lang="scss" scoped>
.network-config-container__data__app {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
    .app-logo {
      display: block;
      width: 20px;
      margin: 0 10px;
  }
}

.network-config-container__data__platform {
  display: flex;
  align-items: center;

  .platform-icon {
    margin: 0 10px;
  }
}

.network-config-container {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.54);
  margin: 16px 0;

  /deep/ .input-group__input {
    width: 100px;
  }
}

.network-config-container__data {
  width: 50%;
}

.network-config-container__data__network {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;

  .network-logo {
    max-width: 50%;
    height: auto;
    margin-left: 10px;
  }
}

.network-config-container__formats-config__block {
  margin: 20px 0;
  padding: 10px 20px;
  background: #FAFBFC;
  border: 1px solid rgba(0, 0, 0, 0.54);
}

.network-config-container__manage {
  display: flex;
  align-items: center
}

.network-config-container__formats-config__header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.54);
  margin: 10px 0;

  &__title {
    margin-right: 16px;
  }
}

.network-config-container__btn {
  display: flex;
  justify-content: flex-end;
}

.help-text {
  margin-top: 10px;
}
</style>


