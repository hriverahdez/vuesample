
<template lang="pug">

    div.alert__container
        v-alert(
            :value="$store.state.alert.show"
            :type="$store.state.alert.type"
            transition="fade-transition"
        ) {{ $store.state.alert.message }}

</template>

<script>
// Show message alerts in dialogs
export default {
  name: 'dialog-alert'
}
</script>

