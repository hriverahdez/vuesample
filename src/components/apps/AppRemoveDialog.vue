<template lang="pug">
    v-dialog(v-model="$store.state.appModule.appRemoveDialogStatus" max-width="500px" light)
      v-card
        v-card-title(
          class="formElementColor py-4 title white--text"
          ) {{ $t('apps_view.remove_app') }}
        v-card-text(class="card-text-form")
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12)
                div(class="card-text-form__msg" class="teal white--text")
                  span {{ $t('apps_view.remove_app_message', {number: randomNumber}) }}
                v-text-field(
                  label="Write the number"
                  v-model="$store.state.appModule.removeAppPermissionInput"
                  class="formElementColor--text"
                  hide-details
                  required
                )
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
import { mapActions, mapGetters } from 'vuex'
// Components
import DialogAlert from '@/components/DialogAlert'

export default {
  name: 'AppRemoveDialog',
  components: {
    DialogAlert
  },
  data () {
    return {
      valid: false
    }
  },
  computed: {
    ...mapGetters({
      appId: 'appIdGetter',
      remove_permission: 'removeAppPermissionInputGetter'
    }),
    randomNumber () {
      return Math.floor(Math.random() * 100000000)
    }
  },
  watch: {
    remove_permission (val) {
      if (val === this.randomNumber.toString()) {
        this.valid = true
      } else {
        this.valid = false
      }
    }
  },

  methods: {
    ...mapActions([
      'appRemoveDialogStatusAction',
      'removeAppPermissionInputAction'
    ]),
    // Close dialog layer
    closeDialog () {
      this.appRemoveDialogStatusAction(false)
      this.removeAppPermissionInputAction('')
    },
    sendDeleteAppEvent () {
      this.$root.$emit('deleteApp', this.appId)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-text-form {
  padding-top: 14px;
}
.card__actions {
  padding: 0 20px 20px 20px;
}
.card-text-form__msg {
  padding: 18px 0 ;
  display: flex;
  align-items: center;
  justify-content: center;
  background: olive;
}
</style>
