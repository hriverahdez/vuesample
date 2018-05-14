<template lang="pug">
  v-container(grid-list-md text-xs-center)
    v-layout(row wrap)
        v-flex(xs4)
            v-select(
                v-model="emptyApps"
                :items="apps"
                item-text="name"
                :label="this.$t('dashboard_view.apps')"
                tags
            )
                template(slot="selection" slot-scope="data")
                    v-chip(
                        :selected="data.selected"
                        close
                        @input="data.parent.selectItem(data.item)"
                    )
                        v-avatar(class="accent") {{ data.item.slice(0, 1).toUpperCase() }}
                        | {{ data.item }}


</template>

<script>
export default {
  name: 'dashboard-filters',
  data () {
    return {
      apps: [
        'Android',
        'IOS',
        'Ejemplo app 1',
        'Ejemplo app 2'
      ],
      emptyApps: []
    }
  }
}
</script>

