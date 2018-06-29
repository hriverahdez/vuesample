<template lang="pug">
  div
    v-navigation-drawer(
      fixed,
      :clipped='$vuetify.breakpoint.lgAndUp',
      app,
      class="nav"
      v-model='drawer'
      width="275"
      )
      v-list(dense)
        template(v-for='item in items')
          v-list-group(
            v-if='item.children',
            v-model='item.model',
            :prepend-icon="item.icon",
            class="white--text",
            :key='item.text'
            )
            v-list-tile(slot='activator')
              v-list-tile-content
                v-list-tile-title
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
      color='toolbar',
      app,
      :clipped-left='$vuetify.breakpoint.lgAndUp',
      fixed
      height="54"
      )
      div.logo
        div(class="logo__container")
          img(src='@/assets/logo-labcave.png', alt='Labcave logo').logo
        v-toolbar-side-icon(@click.stop='drawer = !drawer' light)
      v-spacer
      v-toolbar-items
        v-avatar(slot="activator" size="32")
          //- img(src='@/assets/spiderman.png' alt="User")
          v-icon(light) account_circle
        div(class="user__info")
          div(class="user__info__user") {{ $t('navigation.user') }}:
            span(class="user__info__label") {{ userData.name }}
          div(class="user__info__accouny") {{ $t('navigation.account') }}:
            span(class="user__info__label") Marvel
      v-menu(bottom left dark offset-y)
        v-btn(icon slot="activator" dark)
          v-icon(light) more_vert
        v-list(class="options__list")
          v-list-tile(v-for="(item, i) in user_menu_options" :key="i" @click="" class="option" :to="item.action")
            v-list-tile-action
              v-icon {{ item.icon }}
            v-list-tile-content {{ $t(item.text) }}


</template>

<script>
import { mapGetters } from 'vuex'

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
            { text: 'navigation.dashboard', action: '/panel' },
            // { text: 'navigation.waterfall_rules', action: '#' },
            { text: 'navigation.apps', action: '/panel/apps' }
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
        // {
        //   icon: 'list',
        //   text: 'navigation.account',
        //   model: true,
        //   children: [
            // { text: 'navigation.profile', action: '#' },
            // { icon: 'timeline', text: 'navigation.finance', action: '#' },
            // { text: 'navigation.account_users', action: '#' },
            // { text: 'navigation.tags', action: '#' }
            // { icon: 'label', text: 'navigation.tags', action: '#' }
        //   ]
        // },
        {
          icon: 'account_box',
          text: 'navigation.admin',
          model: true,
          children: [
            // { text: 'navigation.users', action: '#' },
            // { text: 'navigation.roles', action: '#' },
            { text: 'navigation.accounts', action: '/panel/accounts' }
          ]
        }
      ],
      user_menu_options: [
        // { icon: 'how_to_reg', text: 'navigation.change_user', action: '#' },
        // { icon: 'swap_horiz', text: 'navigation.change_account', action: '#' },
        // { icon: 'face', text: 'navigation.profile', action: '#' },
        { icon: 'exit_to_app', text: 'navigation.logout', action: '/panel/logout' }
      ],
      items_select: [
        'English', 'Spanish'
      ],
      lang: 'English'
    }
  },
  computed: {
    ...mapGetters({
      userData: 'userGetter',
      userAccountName: 'userActiveAccountNameGetter'
    })
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
  .list__group__header {
    background: #424852!important;
    i {
      color: #818A9B!important;
    }
  }

  .list__tile:hover {
    color: #A9B0BF!important;
    background: transparent!important;
  }

  .list__tile--active {
    color: #58C0B7!important;
  }

  .logo {
    display: flex;
    width: 275px!important;
    margin-left: 0!important;
    justify-content: space-between;
    align-items: center;
    height: 54px;
    border-right: 1px solid #F4F4F4;

    img {
      max-width: 90%;
      height: auto;
      border: none;
    }
  }

  .logo__container {
    display: flex;
    align-items: center;
    padding-left: 10px;
    width: 50%;
  }

  .options__list {
    background: #383D47!important;

    i {
      color: #818A9B!important;
    }

    .list__tile__content {
        font-size: 12px;
    }
  }

  .toolbar__title {
    display: flex;
  }

  .toolbar__items {
    display: flex;
    align-items: center
  }

  .user__info {
    padding: 12px 0 12px 12px;
    color: rgba(0,0,0,0.54);
    font-size: 12px;

    &__label {
      color: #000;
      display: inline-block;
      margin-left: 4px;
    }
  }

</style>

