<template lang="pug">
    v-dialog(v-model="$store.state.appModule.appNetworkConfigDialogStatus" fullscreen light)
      v-card
        v-card-title(
          class="formElementColor py-4 title white--text"
          ) {{ $t('apps_view.app_network_configuration') }}
        v-card-text(class="card__text__form")
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12)
                p {{ selectedAppNetworkConfig.networkName }}
                p {{ selectedAppNetworkConfig.appName }}
                p {{ selectedAppNetworkConfig.appId }}
        //-         v-text-field(
        //-           :label="this.$t('apps_view.remove_app_message', {number: randomNumber})"
        //-           v-model="$store.state.appModule.removeAppPermissionInput"
        //-           class="formElementColor--text"
        //-           hide-details
        //-           required
        //-         )
        v-card-actions
          v-spacer
          v-btn(
            color="buttonColor"
            flat
            @click.native="closeDialog"
            ) {{ $t('buttons.cancel') }}
          v-btn(
            class="white--text"
            color="buttonColor"
            @click.native="sendDeleteAppEvent"
            :disabled="!valid"
            ) {{ $t('buttons.remove')}}
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
      selectedAppNetworkConfig: 'selectedAppNetworkInDatatableGetter'
    })
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
.card__actions {
  padding: 0 20px 20px 20px;
}
</style>


