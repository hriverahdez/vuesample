<template lang="pug">
  section.accounts__section
    v-flex(xs12)
        //- v-breadcrumbs(divider="-")
        //-     v-breadcrumbs-item(
        //-         v-for="breadcrumb in breadcrumbs"
        //-         :key="breadcrumb.text"
        //-         :disabled="breadcrumb.disabled"
        //-     ) {{ breadcrumb.text }}
    accounts-data-table
    // Accounts data table
    //- v-card
    //-     v-card-title(color="blue darken-1") Accounts list
    //-         v-spacer
    //-         v-btn(color="blue darken-1" dark @click="activeDialog").mb-2 New account
    //-     v-layout(wrap).card__row2
    //-         v-flex(xs3 offset-xs9)
    //-             v-text-field(
    //-             append-icon="search"
    //-             label="Search"
    //-             single-line
    //-             hide-details
    //-             v-model="search"
    //-             )
    //- v-data-table(
    //-   :headers="headers"
    //-   :items="accounts"
    //-   :search="search"
    //-   class="elevation-1"
    //- )
    //-   template(slot="items" slot-scope="props")
    //-     td.text-xs-left {{ props.item.name}}
    //-     td.text-xs-left {{ props.item.disabled }}
    //-     td.justify-center
    //-       v-btn(icon @click="editAccountDialog(props.item)").mx-0
    //-         v-icon(color="teal") edit
    //-       v-btn(icon @click="").mx-0
    //-         v-icon(color="blue") clear
    //-       v-btn(icon @click="deleteAccount(props.item)").mx-0
    //-         v-icon(color="pink") delete
    //-   template(slot="no-data")
    //-     v-alert(
    //-      :value="true"
    //-      color="error"
    //-      icon="warning") {{ $t('accounts_view.alert_message')}}
</template>

<script>
  import { UPDATE_ACCOUNT } from '@/graphql/accounts'
  import AccountsDataTable from '@/components/datatables/AccountsDataTable'

  export default {

    data () {
      return {
        breadcrumbs: [
          {
            text: 'Accounts',
            disabled: false
          },
          {
            text: 'Link 1',
            disabled: false
          },
          {
            text: 'Link 2',
            disabled: true
          }
        ]
      }
    },
    components: {
      AccountsDataTable
    },

    methods: {
      // Edit account
      editAccount () {
        const {newAccount} = this.$data
        this.$apollo.mutate({
          mutation: UPDATE_ACCOUNT,
          variables: {
            id: newAccount._id,
            input: {
              name: newAccount.name,
              description: newAccount.description,
              disabled: newAccount.disabled
            }
          }
        }).then(() => {
          this.newAccount = {}
          this.closeDialog()
        })
      }
    }
  }
</script>
