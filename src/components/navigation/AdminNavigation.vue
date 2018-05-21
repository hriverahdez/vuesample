<template lang="pug">
  div
    v-navigation-drawer(fixed, :clipped='$vuetify.breakpoint.lgAndUp', app, dark, v-model='drawer')
      v-list(dense)
        template(v-for='item in items')
          v-list-group(
            v-if='item.children',
            v-model='item.model',
            :key='item.text',
            :prepend-icon="item.model ? item.icon : item['icon-alt']",
            append-icon)
            v-list-tile(slot='activator')
              v-list-tile-content
                v-list-tile-title(color="blue")
                  | {{ $t(item.text) }}
            v-list-tile(v-for='(child, i) in item.children', :key='i' router :to="child.action")
              v-list-tile-action(v-if='child.icon')
                v-icon {{ child.icon }}
              v-list-tile-content
                v-list-tile-title
                  | {{ $t(child.text) }}
          v-list-tile(v-else, :key='item.text' router :to="item.action")
            v-list-tile-action
              v-icon {{ item.icon }}
            v-list-tile-content
              v-list-tile-title
                  | {{ $t(item.text) }}
    v-toolbar(
      color='toolBar',
      dark,
      app,
      :clipped-left='$vuetify.breakpoint.lgAndUp',
      fixed
      height="54"
      )
      v-toolbar-side-icon(@click.stop='drawer = !drawer')
      div.logo__container
        img(src='@/assets/logo.png', alt='Labcave logo').logo
      v-spacer
      v-toolbar-items
        v-avatar(slot="activator" size="32")
          img(src='@/assets/spiderman.png' alt="User")
        div.user__info
          div.user__info__user  {{ $t('navigation.user') }}:
            span.user__info__label Spiderman
          div.user__info__account {{ $t('navigation.account') }}:
            span.user__info__label Marvel group
      v-menu(bottom left dark offset-y)
        v-btn(icon slot="activator" dark)
          v-icon more_vert
        v-list.options__list
          v-list-tile(v-for="(item, i) in user_menu_options" :key="i" @click="").option
            v-list-tile-action
              v-icon {{ item.icon }}
            v-list-tile-content {{ $t(item.text) }}


</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      items: [
        { icon: 'poll', text: 'navigation.dashboard', action: '/' },
        { icon: 'assignment', text: 'navigation.reporting_status', action: '#' },
        { icon: 'language', text: 'navigation.networks_integration', action: '#' },
        { icon: 'stay_current_portrait', text: 'navigation.apps', action: '#' },
        { icon: 'create', text: 'navigation.custom_campaign', action: '#' },
        { icon: 'filter_list', text: 'navigation.waterfall_management', action: '#' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'navigation.account_management',
          model: true,
          children: [
            { icon: 'group', text: 'navigation.account_users', action: '#' },
            { icon: 'group_add', text: 'navigation.create_account', action: '#' },
            { icon: 'label', text: 'navigation.placement_tags', action: '#' },
            { icon: 'public', text: 'navigation.country_groups', action: '#' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'navigation.admin',
          model: true,
          children: [
            { text: 'navigation.accounts', action: 'accounts' },
            { text: 'navigation.apps', action: '#' },
            { text: 'navigation.roles', action: '#' },
            { text: 'navigation.users', action: '#' }
          ]
        }
      ],
      user_menu_options: [
        { icon: 'how_to_reg', text: 'navigation.change_user', action: '#' },
        { icon: 'swap_horiz', text: 'navigation.change_account', action: '#' },
        { icon: 'face', text: 'navigation.profile', action: '#' },
        { icon: 'exit_to_app', text: 'navigation.logout', action: '#' }
      ],
      items_select: [
        'English', 'Spanish'
      ],
      lang: 'English'
    }
  },
  methods: {
    selectedLanguage (lang) {
      if (lang === 'Spanish') {
        this.$store.dispatch('browserLangUpdate', 'es')
        this.$i18n.locale = 'es'
      } else {
        this.$store.dispatch('browserLangUpdate', 'en')
        this.$i18n.locale = 'en'
      }
      this.$store.dispatch('getWords')
    }
  }
}
</script>

<style lang="scss">
  .list__group__items {
    background-color: #333;
  }

  .toolbar__title {
    display: flex;
  }

  .logo__container {
    display: flex;
    align-items: center;
    padding-left: 10px;
  }

  .logo {
    width: 65%;
  }

  .toolbar__items {
    display: flex;
    align-items: center
  }

  .user__info {
    padding: 12px 0 12px 12px;
    font-size: 12px;

    &__label {
      display: inline-block;
      margin-left: 4px;
      font-weight: bold;
    }
  }

  .options__list {

    .list__tile__content {
        font-size: 12px;
    }
  }

</style>

