<template lang="pug">
    v-dialog(v-model="$store.state.appModule.appDialogStatus" max-width="500px" light)
      //- dialog-alert
      v-card
        v-card-title(
          class="formElementColor py-4 title white--text"
          ) {{ $t('apps_view.create_new_app') }}
        v-card-text(class="card__text__form")
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12)
                //- dialog-alert
                v-form(
                  lazy-validation
                  v-model="valid"
                  class="apps__form"
                )
                    v-text-field(
                      :label="this.$t('apps_view.app_name')"
                      v-model="appName"
                      class="formElementColor--text"
                      required
                    )
                    v-select(
                      :items="platforms"
                      :label="this.$t('apps_view.select_platform')"
                      v-model="appPlatform"
                      required
                    )
                    v-text-field(
                      :label="this.$t('apps_view.app_URL')"
                      v-model="appURL"
                      class="formElementColor--text"
                    )
                    v-text-field(
                      :label="this.$t('apps_view.bundle_identifier')"
                      v-model="appBundleIdentifier"
                      class="formElementColor--text"
                      required
                    )
                    v-text-field(
                      :label="this.$t('apps_view.app_description')"
                      v-model="appDescription"
                      class="formElementColor--text"
                      textarea
                    )
                    div(class="select-icon-container")
                      span(class="icon-text") {{ $t('apps_view.icon_text')}}
                      div(class="draganddrop-container")
                        v-icon cloud_upload
                        span {{ $t('copies.drag_and_drop')}}
        v-card-actions
          v-spacer
          v-btn(
            color="buttonColor"
            flat
            @click.native="closeDialog"
            ) {{ $t('buttons.exit') }}
          v-btn(
            class="white--text"
            color="buttonColor"
            @click.native="sendCreateNewAppEvent"
            :disabled="!valid"
            ) {{ $t('buttons.create')}}
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
// Components
import DialogAlert from '@/components/DialogAlert'

export default {
  name: 'app-dialog',
  components: {
    DialogAlert
  },
  data () {
    // let component = this
    return {
      appBundleIdentifier: '',
      appDescription: '',
      appName: '',
      appPlatform: '',
      appURL: '',
      platforms: ['ios', 'android'],
      valid: false
    }
  },
  computed: {
    // ...mapGetters(['accountNames']),
  },
  methods: {
    // ...mapActions([
    //   'accountDialogStatusAction'
    // ]),
    sendCreateNewAppEvent () {
      this.$root.$emit('createApp', this.appName, this.appPlatform, this.appBundleIdentifier)
    }
  }
}
</script>

<style lang="scss" scoped>
// .alert__container {
//   height: 50px;
// }
// .card__text.card__text__form {
//   padding: 30px;
// }
.card__actions {
  padding: 0 20px 20px 20px;
}
// .accounts-form__status {
//   display: flex;
//   align-items: center;
//   height: 30px;
//   font-size: 16px;

//   &__span {
//     margin-right: 14px;
//   }
// }
.select-icon-container {
  display: flex;
}
.icon-text {
  margin-right: 10px;
}
.draganddrop-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid black;
  width:100%;
  height: 100px;
  margin: 0 auto;
}
</style>


