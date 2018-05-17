<template lang="pug">
    section
        v-card
          v-layout(wrap).card__row-title
              v-flex(xs8)
                  v-card-title.title.headings--text {{ $t('accounts_view.account_title' )}}
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
                    v-btn(icon @click="deleteAccount(props.item)").mx-0
                        v-icon(color="pink") delete
            template(slot="no-data")
                v-alert(
                :value="true"
                color="error"
                icon="warning") {{ $t('accounts_view.alert_message')}}

</template>

<script>
import { GET_ACCOUNTS, DELETE_ACCOUNT } from '@/graphql/accounts'

export default {
  name: 'accounts-data-table',
  data () {
    return {
      accounts: [],
      editedIndex: -1,
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
    }
  },
  watch: {
    // Copy accounts to store
    accounts (accounts) {
      this.$store.commit('getAccountsMutation', accounts)
    }
  },
  apollo: {
    accounts: {
      query: GET_ACCOUNTS,
      pollInterval: 100,
      loadingKey: 'loading'
    }
  },
  methods: {
    // Show edit account dialog
    editAccountDialog (account) {
      this.editedIndex = this.accounts.indexOf(account)
      this.editedAccount = Object.assign({}, account)
      this.$store.commit('dataAccountMutation', this.editedAccount)
      this.$store.dispatch('accountDialogStatusAction', true)
      this.$store.dispatch('editedIndexAction', this.editedIndex)
    },
    // Delete account
    deleteAccount (account) {
      this.$apollo.mutate({
        mutation: DELETE_ACCOUNT,
        variables: {
          ids: account._id
        }
      }).then(() => {
        this.editAccount = {}
      })
    }
  }
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


