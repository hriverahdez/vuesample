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
                  p {{ selectedNetworkName }}
                div(class="manage-network__container__actions-row")
                  v-flex(xs8)
                    v-select(
                      :label="this.$t('apps_view.select_profile')"
                      required
                    )
                  v-flex(xs2 offset-xs1)
                    v-btn(
                        class="white--text"
                        color="buttonColor"
                        @click.native=""
                    ) {{ $t('apps_view.new_profile') }}
                v-form(class="manage-network__container__form")
                  //- v-text-field(
                  //-   :label="this.$t('apps_view.profile_name')"
                  //-   required
                  //- )
                  //- v-text-field(
                  //-   :label="this.$t('apps_view.API_key')"
                  //-   required
                  //- )
                  div(
                    v-for="(field,index) in networksInfo[selectednetworkId].params_by_network"
                    :key="index"
                    class="manage-network__container__form__input-container"
                    )
                    v-text-field(
                      :label="field.label"
                      )
                    p {{  field.help_text }}

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
  name: 'app-manage-network-profile-dialog',
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
      networksInfo: 'networksInfoGetter',
      selectednetworkId: 'selectedNetworkIdToManageGetter',
      selectedNetworkName: 'selectedNetworkToManageGetter'
    })
  },
  methods: {
    ...mapActions([
      'appManageNetworkProfileDialogStatusAction'
    ]),
    // Close dialog layer
    closeDialog () {
      this.appManageNetworkProfileDialogStatusAction(false)
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
}
</style>


