
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
                color="form_elements_color"
                flat
                @click.native="closeDialog"
                ) {{ $store.state.dialogAlertModule.alert.buttonText }}

</template>

<script>
// Show message alerts in dialogs
export default {
  name: 'dialog-alert',
  methods: {
    closeDialog () {
      this.$store.commit('closeAlertDialog')
    }
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

