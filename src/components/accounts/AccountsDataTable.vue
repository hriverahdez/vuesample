<template lang="pug">
  v-card
    v-container
      v-layout(wrap xs12 class="card__row-title")
        v-flex(xs8)
            v-card-title(class="title headings--text") {{ $t('accounts_view.account_title' )}}
        v-flex(xs4)
            v-text-field(
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
            )
    v-data-table(
        :headers="headers"
        :items="accounts"
        :search="search"
        class="elevation-1"
        :rows-per-page-items="[10,20, 30]"
        )
        template(slot="items" slot-scope="props")
            td.text-xs-left {{ props.item.name}}
            td.text-xs-left {{ props.item.disabled }}
            td.justify-center
                v-btn(icon @click="editAccountDialog(props.item)").mx-0
                    v-icon(color="primary") edit
                v-btn(icon @click="").mx-0
                    v-icon(color="blue") clear
                v-btn(icon @click="sendDeleteAccountEvent(props.item)").mx-0
                    v-icon(color="pink") delete
        template(slot="no-data")
            v-alert(
            :value="true"
            color="error"
            icon="warning") {{ $t('accounts_view.alert_message')}}

</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'accounts-data-table',
  data: () => ({
    headers: [
      {
        text: 'Name',
        align: 'left',
        value: 'name'
      },
      { text: 'Active', value: 'active' },
      { text: 'Actions',
        sortable: false,
        align: 'center',
        value: 'actions'
      }
    ],
    editedAccount: {
      name: null,
      description: null,
      disabled: false
    },
    search: ''
  }),
  computed: {
    ...mapGetters({
      accounts: 'accountsDataGetter'
    })
  },
  methods: {
    ...mapActions([
      'editedIndexStatusAction',
      'accountDialogStatusAction'
    ]),
    ...mapMutations(['ACCOUNT_DATA']),
    sendDeleteAccountEvent (account) {
      this.$root.$emit('deleteAccount', account)
    },
    // Show edit account dialog
    editAccountDialog (account) {
      this.editedIndexStatusAction(this.accounts.indexOf(account))
      this.editedAccount = Object.assign({}, account)
      // this.$store.commit('dataAccountMutation', this.editedAccount)
      this.ACCOUNT_DATA(this.editedAccount)
      // this.$store.dispatch('accountDialogStatusAction', true)
      this.accountDialogStatusAction(true)
      // this.$store.dispatch('editedIndexAction', this.editedIndex)
    }
  }
  // beforeCreate () {
  //   this.$store.dispatch('endpointModifyAction', 'account')
  // }
}
</script>

<style lang="scss" scoped>
.accounts-form__status {
    align-items: center;
    display: flex;
    color: rgba(0,0,0,0.54);
    font-size: 16px;

    &__span {
          padding-right: 18px;
    }
}
</style>


