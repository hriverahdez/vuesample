<template lang="pug">
    v-card
        v-container
            v-layout(wrap xs12 class="card__row-title")
                v-flex(xs8)
                    v-card-title(class="title headings--text") {{ $t('admin_users_view.admin_users_title' )}}
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
        :items="users"
        :search="search"
        class="elevation-1"
        :rows-per-page-items="[10,20, 30]"
        )
            template(slot="items" slot-scope="props")
                td.text-xs-left {{ props.item.name }}
                td.text-xs-left {{ props.item.email }}
                td.text-xs-left
                    v-badge(:color="colorStatus(props.item.isActive)")
                        span(slot="badge").badge {{ textStatus(props.item.isActive) }}
                td.text-xs-left
                    v-badge(:color="colorStatus(props.item.isAdmin)")
                        span(slot="badge").badge {{ textStatus(props.item.isAdmin) }}
                td.justify-center
                    v-btn(icon @click.stop="editUserDialog(props.item)").mx-0
                        v-icon(color="primary") edit
                    v-btn(icon @click="").mx-0
                        v-icon(color="blue") clear
                    v-btn(icon @click="sendDeleteUserEvent(props.item)").mx-0
                        v-icon(color="pink") delete
            template(slot="no-data")
                v-alert(
                :value="true"
                color="error"
                icon="warning") {{ $t('admin_users_view.alert_message')}}

</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'admin-users-data-table',
  data: () => ({
    headers: [
      {
        text: 'Name',
        align: 'left',
        value: 'name_key_name'
      },
      {
        text: 'Email',
        align: 'left'
      },
      {
        text: 'Active'
      },
      {
        text: 'Admin'
      },
      { text: 'Actions',
        sortable: false,
        align: 'center',
        value: 'actions'
      }
    ],
    editedUser: {
      name: null,
      email: null,
      isActive: true,
      isAdmin: false
    },
    search: ''
  }),
  computed: {
    ...mapGetters({
      users: 'usersDataGetter'
    })
  },
  methods: {
    ...mapActions([
      'setUserEditedIndexStatusAction',
      'userDialogStatusAction'
    ]),
    colorStatus (status) {
      return (status) ? 'green' : 'red'
    },
    ...mapMutations(['USER_DATA_CRUD']),
    sendActiveInactiveUserEvent (user) {
      // console.log('active/inactive', user)
      this.$root.$emit('changeActiveStatusUser', user)
    },
    sendDeleteUserEvent (user) {
      // console.log('delete', user)
      this.$root.$emit('deleteUser', user)
    },
    // Show edit account dialog
    editUserDialog (user) {
      this.setUserEditedIndexStatusAction(this.users.indexOf(user))
      this.editedUser = Object.assign({}, user)
      this.USER_DATA_CRUD(this.editedUser)
      this.userDialogStatusAction(true)
    },
    textStatus (status) {
      return (status) ? 'Yes' : 'No'
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

    .badge {
        font-size: 10px !important;
    }
</style>