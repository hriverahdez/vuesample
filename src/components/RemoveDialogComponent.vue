<template lang="pug">
    v-dialog(v-model="$store.state.removeDialogModule.removeDialogStatus" max-width="500px" light)
      v-card
        v-card-title(
          class="formElementColor py-4 title white--text"
          ) {{ $t(headerText) }}
        v-card-text(class="card-text-form")
          v-container(grid-list-md)
            v-layout(wrap)
              v-flex(xs12)
                div(class="card-text-form__msg" class="teal white--text")
                  span {{ $t('remove_component.text', {number: randomNumber}) }}
                v-text-field(
                  label="Write the number"
                  v-model="$store.state.removeDialogModule.inputValue"
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
// import DialogAlert from '@/components/DialogAlert'

export default {
  name: 'RemoveDialog',
  // components: {
  //   DialogAlert
  // },
  data () {
    return {
      valid: false
    }
  },
  computed: {
    ...mapGetters({
      dataToSendOnEmit: 'removeDialogDataGetter',
      headerText: 'headerTextGetter',
      inputValue: 'inputValueGetter',
      nameOfTheEventToEmit: 'nameOfTheEventToEmitGetter'
    }),
    randomNumber () {
      return Math.floor(Math.random() * 100000000)
    }
  },
  watch: {
    inputValue (val) {
      if (val === this.randomNumber.toString()) {
        this.valid = true
      } else {
        this.valid = false
      }
    }
  },

  methods: {
    ...mapActions([
      'inputValueAction',
      'removeDialogStatusAction'
    ]),
    // Cerramos la capa del dialog
    closeDialog () {
      this.removeDialogStatusAction(false)
      this.inputValueAction('')
    },
    sendDeleteAppEvent () {
      this.$root.$emit(this.nameOfTheEventToEmit, this.dataToSendOnEmit)
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
