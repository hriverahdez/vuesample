<template lang="pug">
    v-dialog(v-model="$store.state.appModule.appManageNetworkProfileDialogStatus" max-width="600px" light)
      v-card
        v-card-title(
          class="formElementColor py-4 title white--text"
          ) {{ $t('apps_view.manage_network_profiles') }}
        v-card-text(class="card__text__form")
          v-container(grid-list-md class="manage-network__container")
            v-layout(wrap)
              v-flex(xs12)
                div(class="manage-network__container__text-info")
                  p {{ $t('apps_view.manage_network_info_text')}}
                div(class="manage-network__container__network-logo")
                  img(:src="imageSrc" class="network-logo")
                div(class="manage-network__container__actions-row")
                  v-flex(xs8)
                    v-select(
                      :items="networkProfiles"
                      :label="this.$t('apps_view.select_profile')"
                      item-text="name"
                      required
                      v-model="selected"
                    )
                  v-flex(xs2 offset-xs1)
                    v-btn(
                        class="white--text"
                        color="buttonColor"
                        @click.native="sendCreateAccountNetworkIntegrationEvent"
                    ) {{ $t('apps_view.new_profile') }}
                v-form(class="manage-network__container__form")
                  div(
                    v-for="(field, key, index) in networksInfo[selectednetworkId].params_by_network"
                    :key="index"
                    class="manage-network__container__form__input-container"
                    )
                    v-text-field(
                      :label="field.label"
                      :value="selected[key]"
                      )
                    p {{ field.help_text }}

        v-card-actions
          v-btn(
            class="white--text"
            color="buttonColor"
            @click.native=""
            ) {{ $t('buttons.remove_network') }}
          v-spacer
          v-btn(
            class="white--text"
            color="buttonColor"
            @click.native="closeDialog"
            ) {{ $t('buttons.cancel') }}
          v-btn(
            class="white--text"
            color="buttonColor"
            ) {{ $t('buttons.edit')}}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// Components
// import DialogAlert from '@/components/DialogAlert'

export default {
  name: 'app-manage-network-profile-dialog',
  // components: {
  //   DialogAlert
  // },
  data () {
    return {
      valid: false,
      selected: ''
    }
  },
  // watch: {
  //   remove_permission (val) {
  //     if (val === this.randomNumber.toString()) {
  //       this.valid = true
  //     } else {
  //       this.valid = false
  //     }
  //   }
  // },
  computed: {
    ...mapGetters({
      networksInfo: 'networksInfoGetter',
      selectednetworkId: 'selectedNetworkIdToManageGetter',
      selectedNetworkName: 'selectedNetworkToManageGetter',
      networkProfiles: 'networkProfilesListGetter'
    }),
    imageSrc () {
      return require(`../../assets/networks/${this.selectednetworkId}.png`)
    }
    // formattedSelectedVar () {
    //   if (this.networkProfiles) {
    //     console.log('computed')
    //     this.selected = Object.assign({}, this.networkProfiles[0])
    //   }
    // }
  },
  methods: {
    ...mapActions([
      'appManageNetworkProfileDialogStatusAction'
    ]),
    // Close dialog layer
    closeDialog () {
      this.appManageNetworkProfileDialogStatusAction(false)
    },
    // Edit profile on click button
    sendCreateAccountNetworkIntegrationEvent () {
      this.$root.$emit('createAccountNetworkIntegration')
    }
    // formatSelectedObject (e) {
    //   console.log('formateo', e)
    //   this.selected = 'kikikikikikikki'
    // }
    // sendDeleteAppEvent () {
    //   this.$root.$emit('deleteApp', this.appId)
    // }
  }
  // created () {
  //   console.log('mounted')
  //   if (this.networkProfiles) {
  //     console.log('entaaaaaaa')
  //     this.selected = Object.assign({}, this.networkProfiles[0])
  //   }
  // },
  // beforeDestroy () {
  //   console.log('destroy')
  //   this.selected = {}
  // }
  // watch: {
  //   formattedSelectedVar () {
  //     return
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.card__actions {
  padding: 0 20px 20px 20px;
}
.manage-network__container {

  &__actions-row {
    display: flex;
    align-items: center;
  }

  &__form {
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 1px solid rgba(0,0,0,0.54);
    padding: 0 40px;

    &__input-container {
      width: 100%;
    }
  }

  &__network-logo {
    margin: 0 auto;
    text-align: center;

    .network-logo {
      max-width: 300px;
      height: auto;
    }
  }
}
</style>


