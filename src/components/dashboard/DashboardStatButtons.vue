<template lang="pug">
  v-container.stat-buttons-container
    v-layout(row wrap)
      v-flex(xs12)
        v-btn(
          v-for="(button, index) in buttons"
          :key="index"
          :class="{'active-button': activeButtonIndex === index}"
          class="stat-button"
          flat
          @click="showStat($event, index)"
          dark)
          | {{ $t(button.title) }}
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DashboardStatButtons',
  data: () => ({
    activeButtonIndex: 0,
    buttons: [
      {title: 'dashboard_view.revenue'},
      // {title: 'dashboard_view.requests'},
      {title: 'dashboard_view.impressions'},
      // {title: 'dashboard_view.fill_rate'},
      {title: 'dashboard_view.clicks'},
      {title: 'dashboard_view.ctr'},
      {title: 'dashboard_view.ecpm'}
    ]
  }),
  methods: {
    ...mapActions([
      'buttonSelectedAction'
    ]),
    // Show clicked button Stat
    showStat (e, index) {
      // Check clicked button index an add 'active-button' class
      this.activeButtonIndex = index
      switch (e.target.innerText.toLowerCase()) {
        case this.$t('dashboard_view.impressions'): {
          this.buttonSelectedAction('imp')
          break
        }
        case this.$t('dashboard_view.requests'): {
          this.buttonSelectedAction('req')
          break
        }
        case this.$t('dashboard_view.fill_rate'): {
          this.buttonSelectedAction('fillrate')
          break
        }
        case this.$t('dashboard_view.clicks'): {
          this.buttonSelectedAction('click')
          break
        }
        case this.$t('dashboard_view.ctr'): {
          this.buttonSelectedAction('ctr')
          break
        }
        case this.$t('dashboard_view.revenue'): {
          this.buttonSelectedAction('money')
          break
        }
        case this.$t('dashboard_view.ecpm'): {
          this.buttonSelectedAction('ecpm')
          break
        }
        default: {
          this.buttonSelectedAction('money')
          break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.stat-buttons-container {
  padding: 30px 0;
}

.stat-button {
  margin: 0 16px;
  color: #818A9B!important;

    &.active-button {
      color: #58C0B7!important;
    }
}
</style>
