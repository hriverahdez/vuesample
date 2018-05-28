<template lang="pug">
  v-container.stat-buttons-container
    v-layout(row wrap)
      v-flex(xs12)
        v-btn(color="buttonColor" dark @click="showStat($event)") {{ $t('dashboard_view.requests')}}
        v-btn(color="buttonColor" dark @click="showStat($event)") {{ $t('dashboard_view.impressions')}}
        v-btn(color="buttonColor" dark @click="showStat($event)") {{ $t('dashboard_view.fill_rate')}}
        v-btn(color="buttonColor" dark @click="showStat($event)") {{ $t('dashboard_view.clicks')}}
        v-btn(color="buttonColor" dark @click="showStat($event)") {{ $t('dashboard_view.ctr')}}
        v-btn(color="buttonColor" dark @click="showStat($event)") {{ $t('dashboard_view.revenue')}}
        v-btn(color="buttonColor" dark @click="showStat($event)") {{ $t('dashboard_view.ecpm')}}
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'dashboard-stat-buttons',
  methods: {
    ...mapActions([
      'buttonSelectedAction'
    ]),
    // Show clicked button Stat
    showStat (e) {
      switch (e.target.innerText.toLowerCase()) {
        case this.$t('dashboard_view.impressions'): {
          this.buttonSelectedAction('imps')
          break
        }
        case this.$t('dashboard_view.requests'): {
          this.buttonSelectedAction('requests')
          break
        }
        case this.$t('dashboard_view.fill_rate'): {
          this.buttonSelectedAction('fillRate')
          break
        }
        case this.$t('dashboard_view.clicks'): {
          this.buttonSelectedAction('clicks')
          break
        }
        case this.$t('dashboard_view.ctr'): {
          this.buttonSelectedAction('ctr')
          break
        }
        case this.$t('dashboard_view.revenue'): {
          this.buttonSelectedAction('revenue')
          break
        }
        case this.$t('dashboard_view.ecpm'): {
          this.buttonSelectedAction('ecpm')
          break
        }
        default: {
          this.buttonSelectedAction('revenue')
          break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.stat-buttons-container {
  padding-bottom: 0;
}
</style>



