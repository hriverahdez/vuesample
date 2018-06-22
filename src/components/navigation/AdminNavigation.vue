<template lang="pug">
  div
    v-navigation-drawer(
      fixed,
      :clipped='$vuetify.breakpoint.lgAndUp',
      app,
      dark,
      v-model='drawer'
      width="275"
      )
      v-list(dense)
        template(v-for='item in items')
          v-list-group(
            v-if='item.children',
            v-model='item.model',
            :key='item.text',
            :prepend-icon="item.icon"
            )
            v-list-tile(slot='activator')
              v-list-tile-content
                v-list-tile-title
                  | {{ $t(item.text) }}
            v-list-tile(v-for='(child, i) in item.children', :key='i' router :to="child.action")
              v-list-tile-action(v-if='child.icon')
                v-icon(color="floatingButton") {{ child.icon }}
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
      color='toolbar',
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
          //- img(src='@/assets/spiderman.png' alt="User")
          v-icon(dark) account_circle
        div.user__info
          div.user__info__user  {{ $t('navigation.user') }}:
            span.user__info__label.primary--text Spiderman
          div.user__info__account {{ $t('navigation.account') }}:
            span.user__info__label.primary--text Marvel group
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
        {
          'icon': 'monetization_on',
          text: 'navigation.monetization',
          model: true,
          children: [
            { text: 'navigation.dashboard', action: '/' },
            // { text: 'navigation.waterfall_rules', action: '#' },
            { text: 'navigation.network_integration', action: '#' }
          ]
        },
        // {
        //   'icon': 'stay_current_portrait',
        //   text: 'navigation.apps',
        //   model: true,
        //   children: [
        //     { text: 'navigation.apps', action: '/apps' },
        //     { text: 'navigation.tags', action: '#' }
        //   ]
        // },
        // { icon: 'edit', text: 'navigation.custom_campaigns', action: '#' },
        {
          icon: 'list',
          text: 'navigation.account',
          model: true,
          children: [
            // { text: 'navigation.profile', action: '#' },
            // { icon: 'timeline', text: 'navigation.finance', action: '#' },
            { text: 'navigation.account_users', action: '/apps' },
            { text: 'navigation.tags', action: '#' }
            // { icon: 'label', text: 'navigation.tags', action: '#' }
          ]
        },
        {
          icon: 'account_box',
          text: 'navigation.admin',
          model: true,
          children: [
            { text: 'navigation.users', action: '#' },
            // { text: 'navigation.roles', action: '#' },
            { text: 'navigation.accounts', action: 'accounts' }
          ]
        }
      ],
      user_menu_options: [
        // { icon: 'how_to_reg', text: 'navigation.change_user', action: '#' },
        // { icon: 'swap_horiz', text: 'navigation.change_account', action: '#' },
        { icon: 'face', text: 'navigation.profile', action: '#' },
        { icon: 'exit_to_app', text: 'navigation.logout', action: '/logout' }
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

  // .list__group__header__prepend-icon {
  //   color: #00A0D3!important;
  // }

  .options__list {

    .list__tile__content {
        font-size: 12px;
    }
  }

</style>

