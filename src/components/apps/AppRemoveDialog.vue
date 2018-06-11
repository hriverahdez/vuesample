<template lang="pug">
    v-dialog(v-model="$store.state.appModule.appRemoveDialogStatus" max-width="500px" light)
      v-card
        v-card-title(
          class="formElementColor py-4 title white--text"
          ) {{ $t('apps_view.remove_app') }}
        v-card-text(class="card__text__form")
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12)
                v-text-field(
                  :label="this.$t('apps_view.remove_app_message')"
                  v-model="remove_permission"
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
  name: 'app-dialog',
  components: {
    DialogAlert
  },
  data () {
    return {
      remove_permission: '',
      valid: false
    }
  },
  watch: {
    remove_permission (val) {
      if (val === this.$t('buttons.remove').toUpperCase()) {
        this.valid = true
      } else {
        this.valid = false
      }
    }
  },
  computed: {
    ...mapGetters({
      appId: 'appIdGetter'
    })
  },
  methods: {
    ...mapActions([
      'appRemoveDialogStatusAction'
    ]),
    // Close dialog layer
    closeDialog () {
      this.appRemoveDialogStatusAction(false)
    },
    sendDeleteAppEvent () {
      this.$root.$emit('deleteApp', this.appId)
    }
  }
}
</script>

<style lang="scss" scoped>
.card__actions {
  padding: 0 20px 20px 20px;
}
</style>


