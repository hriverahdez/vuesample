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
                      v-model="switchCreateStatus"
                      @change="createInputNewFormatVariables"
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
                      @input="createInputNewFormatVariables"
                      v-model="selected"
                      required
                    )

                section(
                  class="network-config-container__formats-config")
                  h4 {{ $t('apps_view.format_config')}} lololo
                  div(v-for="(format, index) in formatFields" v-if="formatFields" :key="index" class="network-config-container__formats-config__block")
                    div(class="network-config-container__formats-config__header")
                      div(class="network-config-container__formats-config__header__title") {{ getFormatLabel(format.format) }}
                      v-switch(
                          light
                          :label="check"
                          color="success"
                          v-model="switchCreateFormatStatus.status[index]"
                          @change="createInputNewFormatVariables"
                          hide-details
                        )
                    div(v-for="(field, index) in format.fields")
                      v-text-field(
                        :label="field"
                        @change="getNewValue($event, index, format.format, field)"
                        hide-details
                        )
                      p(class="help-text" v-html="$t(`networks_info.${nameAndIdNetworkFormatted}.format_profile_text.${field}`)")

                section(class="network-config-container__btn")
                  v-alert(v-model="alert" type="error" class="alert")
                    span {{ $t('apps_view.alert_dialog_app_network') }}
                  v-alert(v-model="fullFormEmptyMsg" type="error" class="alert")
                    span {{ $t('apps_view.full_form_empty') }}
                  v-btn(
                    color="buttonColor"
                    class="white--text"
                    flat
                    @click.native.stop="closeDialog"
                    ) {{ $t('buttons.cancel') }}
                  v-btn(
                    color="buttonColor"
                    class="white--text"
                    @click.native.stop="sendCreateAppNetworkProfileEvent(app._id, selectednetwork.id)"
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
      alert: false,
      fullFormEmptyMsg: false,
      copyAppNetwork: false,
      configStatus: false,
      newInputValue: false,
      switchCreateStatus: false,
      switchStatus: {
        status: []
      },
      switchCreateFormatStatus: {
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
      selectedAppNetworkConfig: 'selectedAppNetworkInDatatableGetter',
      selectednetwork: 'selectedNetworkToManageGetter'
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
    createInputNewFormatVariables () {
      let cloned = false
      let input = {}

      if (this.copyAppNetwork) {
        input = this.copyAppNetwork
        cloned = true
      }

      input['active'] = this.switchCreateStatus
      input['profile'] = this.selected

      if (!cloned) {
        input['formats'] = []
        this.formatFields.map((item, index) => {
          let object = {}
          object.format = item.format
          object.active = this.switchCreateFormatStatus.status[index] || false
          object.premium = item.format.includes('premium')
          object.formatFields = []
          item.fields.map((field, index2) => {
            let subObject = {
              key: '',
              value: ''
            }
            if (typeof this.newInputValue.format !== 'undefined' && item.format === this.newInputValue.format && index2 === this.newInputValue.index) {
              subObject = {
                key: this.newInputValue.label,
                value: this.newInputValue.value
              }
            }
            object.formatFields.push(subObject)
          })
          input['formats'].push(object)
        })
      } else {
        this.switchCreateFormatStatus.status.map((status, index) => {
          input['formats'][index].active = status
        })

        input['formats'].map((item, index) => {
          if (typeof this.newInputValue.format !== 'undefined' && item.format === this.newInputValue.format) { // && index2 === this.newInputValue.index) {
            item.formatFields[this.newInputValue.index].value = this.newInputValue.value
            item.formatFields[this.newInputValue.index].key = this.newInputValue.label
          }
        })
      }

      this.copyAppNetwork = input
    },
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
    getNewValue (value, index, format, label) {
      this.newInputValue = { value, index, format, label }
      this.createInputNewFormatVariables()
    },
    // Send event to update app-network
    sendEditAppNetworkProfileEvent (appId, networkId, profile) {
      if (!this.queryError) {
        this.$root.$emit('updateAppNetworkProfile', appId, networkId, profile, this.createInputVariables)
      } else {
        this.queryErrorAction(false)
      }
    },
    filterFormats (formats) {
      return formats.filter((format) =>
          format.formatFields.filter((field) =>
            field.value !== '' && field.key !== ''
          ).length === format.formatFields.length
        )
    },
    // Send event to create format data app-network
    sendCreateAppNetworkProfileEvent (appId, networkId) {
      this.alert = false
      this.fullFormEmptyMsg = false

      if (this.copyAppNetwork) {
        let allEmpty = false
        let countFields = 0
        this.copyAppNetwork.formats.map((format) => {
          let emptyField = 0
          format.formatFields.map((field) => {
            if (field.value === '') {
              emptyField++
              allEmpty++
            }
            countFields++
          })
          if (emptyField > 0 && emptyField !== format.formatFields.length) {
            this.alert = true
            return false
          }
        })
        if (countFields === allEmpty) {
          this.alert = false
          this.fullFormEmptyMsg = true
        }
      } else {
        this.alert = false
        this.fullFormEmptyMsg = true
      }

      if (!this.alert && !this.fullFormEmptyMsg) {
        this.copyAppNetwork.formats = this.filterFormats(this.copyAppNetwork.formats)
        this.$root.$emit('createAppNetworkProfile', appId, networkId, this.copyAppNetwork)
      }
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
.alert {
  width: 100%;
  text-align: center;
}
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
  align-items: center;
  justify-content: flex-end;
}

.help-text {
  margin-top: 10px;
}
</style>


