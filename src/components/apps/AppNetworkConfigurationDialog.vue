<template lang="pug">
    //- Formulario de edición
    v-dialog(
      v-if="formats && networkStatus"
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
                      :label="checkNetworkStatus"
                      v-model="configStatus"
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
                      v-model="selected"
                      required
                    )

                section(
                  class="network-config-container__formats-config")
                  h4 {{ $t('apps_view.format_config')}}
                  div(:ref="`format${index}`" v-for="(format, index) in formats" :key="index" class="network-config-container__formats-config__block")
                    div(class="network-config-container__formats-config__header")
                      div(class="network-config-container__formats-config__header__title") {{ getFormatLabel(format.format)}}
                      v-switch(
                          light
                          :label="checkFormatStatus(index)"
                          color="success"
                          v-model="switchStatus.status[index]"
                          @change="createInputNewFormatVariables"
                          hide-details
                        )
                    div(v-for="(formatField, index) in format.formatFields")
                      v-text-field(
                        :label="formatField.key"
                        :value="formatField.value"
                        @change="getNewValue($event, index, format.format, formatField.key, format.premium)"
                        hide-details
                        )
                      p(class="help-text" v-html="$t(`networks_info.${nameAndIdNetworkFormatted}.format_profile_text.${formatField.key}`)")

                section(class="network-config-container__btn")
                  v-btn(
                    color="buttonColor"
                    flat
                    class="white--text"
                    @click.native.stop="closeDialog"
                    ) {{ $t('buttons.cancel') }}
                  v-btn(
                    color="buttonColor"
                    class="white--text"
                    @click.native.stop="sendEditAppNetworkProfileEvent(app._id, selectednetwork.id, selected)"
                    :disabled="disabledButton"
                    ) {{ $t('buttons.edit') }}

    //- Formulario de creación
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
                      :label="checkNetworkStatus"
                      v-model="configStatus"
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
                  h4 {{ $t('apps_view.format_config')}}
                  div(v-for="(format, index) in formatFields" v-if="formatFields" :key="index" class="network-config-container__formats-config__block")
                    div(class="network-config-container__formats-config__header")
                      div(class="network-config-container__formats-config__header__title") {{ getFormatLabel(format.format) }}
                      v-switch(
                          light
                          :label="checkFormatStatus(index)"
                          color="success"
                          v-model="switchStatus.status[index]"
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
                    :disabled="disabledButton"
                    ) {{ $t('buttons.save') }}

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// Components
// import DialogAlert from '@/components/DialogAlert'

export default {
  name: 'AppNetworkConfigurationDialog',
  // components: {
  //   DialogAlert
  // },
  data () {
    return {
      alert: false,
      fullFormEmptyMsg: false,
      copyAppNetwork: false,
      configStatus: false,
      disabledButton: true,
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
    nameAndIdNetworkFormatted () {
      return `${this.selectedAppNetworkConfig.networkName.name.toLowerCase()}${this.selectedAppNetworkConfig.networkName.id}`
    },
    // Obtenemos el estado del switch de network para la etiqueta
    checkNetworkStatus () {
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
  watch: {
    // remove_permission (val) {
    //   if (val === this.randomNumber.toString()) {
    //     this.valid = true
    //   } else {
    //     this.valid = false
    //   }
    // }
  },
  mounted () {
    setTimeout(() => {
      if (this.networkStatus) {
        this.configStatus = this.networkStatus
      } else {
        this.configStatus = this.selectednetwork.active
      }
      // Asignamos el valor que viene por defecto de las queries a los switches (activo/inactivo)
      if (this.formats) {
        this.formats.map((item) => {
          this.switchStatus.status.push(item.active)
        })
      }
    }, 300)
  },
  beforeDestroy () {
    this.appByIdAndNetworkDataAction({})
  },
  methods: {
    ...mapActions([
      'appByIdAndNetworkDataAction',
      'appNetworkConfigDialogStatusAction',
      'queryErrorAction',
      'skipAppByIdAndNetworkQueryAction'
    ]),
    // Obtenemos el estado del switch de formato para etiqutarlo
    checkFormatStatus (index) {
      if (this.switchStatus.status[index]) {
        return this.$t('switch.on')
      } else {
        return this.$t('switch.off')
      }
    },
    createInputNewFormatVariables () {
      let cloned = false
      let input = {}

      this.disabledButton = false

      if (this.copyAppNetwork) {
        input = this.copyAppNetwork
        cloned = true
      }

      input['active'] = this.configStatus
      input['profile'] = this.selected

      if (!cloned) {
        // creación
        if (this.queryError) {
          input['formats'] = []
          this.formatFields.map((item, index) => {
            let object = {}
            let fixedFormatName = item.format.split('_premium')[0]
            object.format = fixedFormatName
            object.active = this.switchStatus.status[index] || false
            object.premium = item.format.includes('premium')
            object.formatFields = []
            item.fields.map((field, index2) => {
              let subObject = {
                key: '',
                value: ''
              }
              if (typeof this.newInputValue.format !== 'undefined' && fixedFormatName === this.newInputValue.format && index2 === this.newInputValue.index && this.newInputValue.premium === item.format.includes('premium')) {
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
          // Edicion
          const omitTypename = (key, value) => (key === '__typename' ? undefined : value)
          let cloneFormats = JSON.parse(JSON.stringify(this.formats), omitTypename)
          input['formats'] = cloneFormats
          input = this.setNetworkFormatFieldValues(input)
        }
      } else {
        input = this.setNetworkFormatFieldValues(input)
      }

      this.copyAppNetwork = input
    },
    setNetworkFormatFieldValues (input) {
      if (this.switchStatus) {
        this.switchStatus.status.map((status, index) => {
          input['formats'][index].active = status
        })
      }

      input['formats'].map((item, index) => {
        if (typeof this.newInputValue.format !== 'undefined' && item.format === this.newInputValue.format && this.newInputValue.premium === item.premium) {
          item.formatFields[this.newInputValue.index].value = this.newInputValue.value
          item.formatFields[this.newInputValue.index].key = this.newInputValue.label
        }
      })
      return input
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
    getNewValue (value, index, format, label, premium) {
      if (!premium) {
        premium = format.includes('_premium')
        format = format.split('_premium')[0]
      }
      this.newInputValue = { value, index, format, label, premium }
      this.createInputNewFormatVariables()
    },
    // Send event to update app-network
    sendEditAppNetworkProfileEvent (appId, networkId, profile) {
      if (!this.queryError) {
        this.copyAppNetwork.formats = this.filterFormats(this.copyAppNetwork.formats)
        this.$root.$emit('updateAppNetworkProfile', appId, networkId, profile, this.copyAppNetwork)
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
