<template lang="pug">
    v-data-table(
        :headers="headers"
        :items="accounts"
        :search="search"
        class="elevation-1 dashboard-datatable"
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
import { GET_ACCOUNTS } from '@/graphql/accounts'

export default {
  name: 'dashboard-data-table',
  data () {
    return {
      accounts: [],
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
      search: ''
    }
  },
  apollo: {
    accounts: {
      query: GET_ACCOUNTS,
      pollInterval: 100,
      loadingKey: 'loading'
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-datatable {
    margin-top: 30px;
}
</style>


