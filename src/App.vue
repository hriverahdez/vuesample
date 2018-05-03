<template lang="pug">
  v-app(light)
    v-navigation-drawer(fixed, :clipped='$vuetify.breakpoint.lgAndUp', app, v-model='drawer')
      v-list(dense)
        template(v-for='item in items')
          v-layout(row, v-if='item.heading', align-center, :key='item.heading')
            v-flex(xs6)
              v-subheader(v-if='item.heading')
                | {{ item.heading }}
            v-flex.text-xs-center(xs6)
              a.body-2.black--text(href='#!') EDIT
          v-list-group(v-else-if='item.children', v-model='item.model', :key='item.text', :prepend-icon="item.model ? item.icon : item['icon-alt']", append-icon)
            v-list-tile(slot='activator')
              v-list-tile-content
                v-list-tile-title
                  | {{ item.text }}
            v-list-tile(v-for='(child, i) in item.children', :key='i')
              v-list-tile-action(v-if='child.icon')
                v-icon {{ child.icon }}
              v-list-tile-content
                v-list-tile-title
                  | {{ child.text }}
          v-list-tile(v-else, :key='item.text' router :to="item.action")
            v-list-tile-action
              v-icon {{ item.icon }}
            v-list-tile-content
              v-list-tile-title
                  | {{ item.text }}
    v-toolbar(color='blue darken-3', dark, app, :clipped-left='$vuetify.breakpoint.lgAndUp', fixed)
      v-toolbar-title.ml-0.pl-3(style='width: 300px')
        v-toolbar-side-icon(@click.stop='drawer = !drawer')
        span.hidden-sm-and-down Mobusi mediation
      v-text-field.hidden-sm-and-down(flat, solo-inverted, prepend-icon='search', label='Search')
      v-spacer
      v-select(
        :items="items_select"
        v-model="lang"
        label="Select"
        single-line
        @change="selectedLanguage($event)"
      )
      v-btn(icon)
        v-icon apps
      v-btn(icon)
        v-icon notifications
      v-btn(icon, large)
        v-avatar(size='32px', tile)
          img(src='https://vuetifyjs.com/static/doc-images/logo.svg', alt='Vuetify')
    v-content
      v-container(grid-list-md text-xs-center align-content-start).dashboard__container
          v-layout(row wrap align-content-start)
          router-view
          //- v-tooltip(right)
          //-   v-btn(icon, large, :href='source', target='_blank', slot='activator')
          //-     v-icon(large) code
          //-   span Source
    v-btn(fab, bottom, right, color='pink', dark, fixed, @click.stop='dialog = !dialog')
      v-icon add
    v-dialog(v-model='dialog', width='800px')
      v-card
        v-card-title.grey.lighten-4.py-4.title
          | Create contact
        v-container.pa-4(grid-list-sm)
          v-layout(row, wrap)
            v-flex(xs12, align-center, justify-space-between)
              v-layout(align-center)
                v-avatar.mr-3(size='40px')
                  img(src='//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png', alt)
                v-text-field(placeholder='Name')
            v-flex(xs6)
              v-text-field(prepend-icon='business', placeholder='Company')
            v-flex(xs6)
              v-text-field(placeholder='Job title')
            v-flex(xs12)
              v-text-field(prepend-icon='mail', placeholder='Email')
            v-flex(xs12)
              v-text-field(type='tel', prepend-icon='phone', placeholder='(000) 000 - 0000', mask='phone')
            v-flex(xs12)
              v-text-field(prepend-icon='notes', placeholder='Notes')
        v-card-actions
          v-btn(flat, color='primary') More
          v-spacer
          v-btn(flat, color='primary', @click='dialog = false') Cancel
          v-btn(flat, @click='dialog = false') Save
    v-footer(app)
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        { icon: 'contacts', text: 'Accounts', action: 'info' },
        { icon: 'history', text: 'Frequently contacted' },
        { icon: 'content_copy', text: 'Duplicates' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Labels',
          model: true,
          children: [
            { icon: 'add', text: 'Create label' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'More',
          model: false,
          children: [
            { text: 'Import' },
            { text: 'Export' },
            { text: 'Print' },
            { text: 'Undo changes' },
            { text: 'Other contacts' }
          ]
        },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Send feedback' },
        { icon: 'help', text: 'Help' },
        { icon: 'phonelink', text: 'App downloads' },
        { icon: 'keyboard', text: 'Go to the old version' }
      ],
      lang: 'English',
      items_select: [
        'English', 'Spanish'
      ]
    }),
    props: {
      source: String
    },
    methods: {
      selectedLanguage (lang) {
        if (lang === 'Spanish') {
          this.$store.dispatch('browserLangUpdate', 'es')
        } else {
          this.$store.dispatch('browserLangUpdate', 'en')
        }
        this.$store.dispatch('getWords')
      }
    }
  }
</script>

<style lang="scss" scoped>
.container {
  padding: 0;
}
</style>


