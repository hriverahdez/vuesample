<template lang="pug">
    v-dialog(v-model='$store.state.accountsModule.accountDialogStatus', width='800px')
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
          v-btn(flat, color='primary') Cancel
          v-btn(flat) Save
</template>

<script>

export default {
  name: 'account-dialog'
}
</script>

