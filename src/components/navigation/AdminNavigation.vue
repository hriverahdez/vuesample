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
      color='cyan darken-3',
      dark,
      app,
      :clipped-left='$vuetify.breakpoint.lgAndUp',
      fixed
      height="54"
      )
      v-toolbar-title.ml-0.pl-3(style='width: 300px')
        v-toolbar-side-icon(@click.stop='drawer = !drawer')
        span.hidden-sm-and-down {{ $t('navigation.enterprise') }}
      //- v-text-field.hidden-sm-and-down(flat, solo-inverted, prepend-icon='search', label='Search')
      v-spacer
      v-select(
        :items="items_select"
        v-model="lang"
        label="Select"
        single-line
        @change="selectedLanguage($event)"
        hide-details
      )
      v-btn(icon)
        v-icon apps
      v-btn(icon)
        v-icon notifications
      v-btn(icon, large)
        v-avatar(size='32px', tile)
          img(src='https://vuetifyjs.com/static/doc-images/logo.svg', alt='Vuetify')
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
</style>

