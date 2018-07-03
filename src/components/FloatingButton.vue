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

        v-btn(
          dark
          color="buttonColor"
          @click="showCreateNewAppDialog"
          class="speed-dial__button"
          )
            //- v-icon(dark pink) remove_circle
            span.speed-dial_label {{ $t('floating_btn.new_app')}}

        v-btn(
          dark
          color="buttonColor"
           @click="showCreateNewAccountDialog"
           class="speed-dial__button"
           )
            //- v-icon(dark pink) remove_circle
            span.speed-dial__label  {{ $t('floating_btn.new_account')}}

        v-btn(
        dark
        color="buttonColor"
        @click="showCreateNewUserDialog"
        class="speed-dial__button"
        )
            //- v-icon(dark pink) remove_circle
            span.speed-dial__label  {{ $t('floating_btn.new_user')}}

</template>


<script>
import { mapActions } from 'vuex'

export default {
  name: 'floating-button',
  data: () => ({
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: 'slide-y-reverse-transition',
    direction: 'top',
    fab: false,
    fling: false,
    hover: false
  }),
  methods: {
    ...mapActions([
      'accountDialogStatusAction',
      'appDialogStatusAction',
      'userDialogStatusAction',
      'skipQueryAccountsAction'
    ]),
    showCreateNewAccountDialog () {
      this.accountDialogStatusAction(true)
    },
    showCreateNewAppDialog () {
      this.appDialogStatusAction(true)
    },
    showCreateNewUserDialog () {
      this.skipQueryAccountsAction(false)
      this.userDialogStatusAction(true)
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


