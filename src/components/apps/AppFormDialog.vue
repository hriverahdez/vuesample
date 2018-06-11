<template lang="pug">
    v-dialog(v-model="$store.state.appModule.appDialogStatus" max-width="500px" light)
      //- dialog-alert
      v-card
        v-card-title(
          class="formElementColor py-4 title white--text"
          ) {{ formTitle }}
        v-card-text(class="card__text__form")
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12)
                //- dialog-alert
                v-form(
                  lazy-validation
                  v-model="valid"
                  class="apps__form"
                  ref="newAppForm"
                )
                    v-text-field(
                      :label="this.$t('apps_view.app_name')"
                      v-model="appData.name"
                      class="formElementColor--text"
                      required
                    )
                    v-select(
                      :items="platforms"
                      :label="this.$t('apps_view.select_platform')"
                      v-model="appData.platform"
                      required
                    )
                    v-text-field(
                      :label="this.$t('apps_view.app_URL')"
                      v-model="appData.URL"
                      class="formElementColor--text"
                    )
                    v-text-field(
                      :label="this.$t('apps_view.bundle_identifier')"
                      v-model="appData.bundle"
                      class="formElementColor--text"
                      required
                    )
                    v-text-field(
                      :label="this.$t('apps_view.app_description')"
                      v-model="appData.description"
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
            ) {{ $t('buttons.cancel') }}
          v-btn(
            class="white--text"
            color="buttonColor"
            @click.native="accountEventHandler"
            :disabled="!valid"
            ) {{ formButtonTitle }}
</template>

<script>
import { mapActions } from 'vuex'
// Components
import DialogAlert from '@/components/DialogAlert'

export default {
  name: 'app-dialog',
  components: {
    DialogAlert
  },
  data () {
    return {
      platforms: ['ios', 'android'],
      valid: false
    }
  },
  computed: {
    appData () {
      return this.$store.state.appModule.appData
    },
    editedIndex () {
      return this.$store.state.appModule.editedAppIndex
    },
    // Form button title
    formButtonTitle () {
      return this.editedIndex === -1 ? this.$t('buttons.create') : this.$t('buttons.edit')
    },
    // Form title
    formTitle () {
      return this.editedIndex === -1 ? this.$t('apps_view.new_app') : this.$t('apps_view.edit_app')
    }
  },
  methods: {
    ...mapActions([
      'appDialogStatusAction',
      'editedAppIndexStatusAction'
    ]),
    // Choose between create or edit app
    accountEventHandler () {
      if (this.editedIndex === -1) {
        this.sendCreateNewAppEvent()
      } else {
        this.sendEditAppEvent()
      }
    },
    // Close dialog layer
    closeDialog () {
      this.appDialogStatusAction(false)
      setTimeout(() => {
        this.$refs['newAppForm'].reset()
        this.editedAppIndexStatusAction(-1)
      }, 300)
    },
    sendCreateNewAppEvent () {
      this.$root.$emit('createApp', this.appData.name, this.appData.platform, this.appData.bundle)
      setTimeout(() => {
        this.$refs['newAppForm'].reset()
      }, 300)
    },
    // Send event to edit account
    sendEditAppEvent () {
      this.$root.$emit('editApp', this.appData._id, this.appData.name, this.appData.description)
    }
  }
}
</script>

<style lang="scss" scoped>

.card__actions {
  padding: 0 20px 20px 20px;
}

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


