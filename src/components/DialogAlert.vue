
<template lang="pug">

    v-dialog(v-model="$store.state.dialogAlertModule.alert.show" max-width="500px")
        v-card
            v-alert(
                :value="$store.state.dialogAlertModule.alert.show"
                :type="$store.state.dialogAlertModule.alert.type"
                transition="fade-transition"
            ) {{ $store.state.dialogAlertModule.alert.message }}
            v-card-actions
                v-spacer
                v-btn(
                color="formElementColor"
                flat
                @click.native="CLOSE_ALERT_MESSAGE"
                ) {{ $store.state.dialogAlertModule.alert.buttonText }}

</template>

<script>
// Show message alerts in dialogs
import { mapMutations } from 'vuex'

export default {
  name: 'DialogAlert',
  methods: {
    ...mapMutations(['CLOSE_ALERT_MESSAGE'])
  }
}
</script>

<style lang="scss" scoped>
  .card {
    padding: 10px 10px 0 10px;
  }
  .card__actions {
      padding: 10px;
  }
</style>
