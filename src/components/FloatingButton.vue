<template lang="pug">
    v-speed-dial(
    v-model="fab"
    :top="top"
    :bottom="bottom"
    :right="right"
    :left="left"
    :direction="direction"
    :open-on-hover="hover"
    :transition="transition"
    )
        v-btn(
        slot="activator"
        v-model="fab"
        color="floatingButton"
        dark
        fab
        hover)
            v-icon add
            v-icon close

        v-btn(dark color="buttonColor").speed-dial__button
            //- v-icon(dark pink) remove_circle
            span.speed-dial_label New app

        v-btn(dark color="buttonColor"  @click="showAccountDialog").speed-dial__button
            //- v-icon(dark pink) remove_circle
            span.speed-dial__label New account
</template>


<script>
export default {
  name: 'floating-button',
  data () {
    return {
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
      direction: 'top',
      fab: false,
      fling: false,
      hover: false
    }
  },
  methods: {
    showAccountDialog () {
      this.$store.dispatch('accountDialogStatusAction', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn--floating {
  z-index: 7;
}
.speed-dial {
  position: absolute;
  display: flex;
  justify-content: flex-end;
  width: 130px;
}
.speed-dial__label {
  padding: 0 8px;
}
.speed-dial__button {
  width: 130px;
  height: 32px;
  border-radius: 4px;
}
</style>


