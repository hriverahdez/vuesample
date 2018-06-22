<template lang="pug">
    v-dialog(v-model="$store.state.appModule.appNetworkConfigDialogStatus" max-width="500" light)
      v-card
        v-card-title(
          class="formElementColor py-4 title white--text"
          ) {{ $t('apps_view.network_configuration') }}
        v-card-text(class="card__text__form")
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12)
                section(class="info-container")
                  div(class="info-container__appAndNetwork")
                    div(class="info-container__appnAndNetwork__app")
                      span {{ $t('apps_view.network')}}: {{ selectedAppNetworkConfig.networkName }}
                    div(class="info-container__appnAndNetwork__app")
                      span {{ $t('apps_view.app')}}: {{ selectedAppNetworkConfig.appName }}
                  div(class="info-container__switch")
                    v-switch(
                      light
                      :label="check"
                      v-model="enableConfig"
                      color="success"
                      hide-details
                    )
                
                section(class="profile-container")
                  v-select(
                    :items="profiles"
                    :label="this.$t('apps_view.select_profile')"
                    v-model="selectedProfile"
                    required
                  )
                p {{ skippedQuery }}
                div  {{ app }}
                //- p {{ selectedAppNetworkConfig.appId }}
        //-         v-text-field(
        //-           :label="this.$t('apps_view.remove_app_message', {number: randomNumber})"
        //-           v-model="$store.state.appModule.removeAppPermissionInput"
        //-           class="formElementColor--text"
        //-           hide-details
        //-           required
        //-         )
        //- v-card-actions
        //-   v-spacer
        //-   v-btn(
        //-     color="buttonColor"
        //-     flat
        //-     @click.native="closeDialog"
        //-     ) {{ $t('buttons.cancel') }}
        //-   v-btn(
        //-     class="white--text"
        //-     color="buttonColor"
        //-     @click.native="sendDeleteAppEvent"
        //-     :disabled="!valid"
        //-     ) {{ $t('buttons.remove')}}
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
      enableConfig: false,
      profiles: ['default', 'lololo', 'lalala'],
      selectedProfile: '',
      valid: false
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
      app: 'appByIdDataGetter',
      selectedAppNetworkConfig: 'selectedAppNetworkInDatatableGetter',
      skippedQuery: 'skipAppByIdQueryGetter'
    }),
    // Change switch text label
    check () {
      if (this.enableConfig) {
        return this.$t('switch.enabled')
      } else {
        return this.$t('switch.disabled')
      }
    }
  },
  methods: {
    ...mapActions([
      'appNetworkConfigDialogStatusAction'
    ]),
    // Close dialog layer
    closeDialog () {
      this.appNetworkConfigDialogStatusAction(false)
    }
    // sendDeleteAppEvent () {
    //   this.$root.$emit('deleteApp', this.appId)
    // }
  }
}
</script>

<style lang="scss" scoped>
.info-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border:1px solid rgba(0,0,0,0.12);
  padding: 8px 12px;
}
.info-container {

  &__appAndNetwork {
      margin-right: 40px;

        div {
          padding: 6px 0;
        }
  }

  &__switch {
    width: 100px;
  }
}
.profile-container {
  margin-top: 16px;
}
</style>


