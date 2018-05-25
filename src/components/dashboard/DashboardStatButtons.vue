<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex(xs12)
        v-btn(color="buttonColor" dark) {{ $t('dashboard_view.requests')}}
        v-btn(color="buttonColor" dark) {{ $t('dashboard_view.impressions')}}
        v-btn(color="buttonColor" dark) {{ $t('dashboard_view.fill_rate')}}
        v-btn(color="buttonColor" dark) {{ $t('dashboard_view.clicks')}}
        v-btn(color="buttonColor" dark) {{ $t('dashboard_view.ctr')}}
        v-btn(color="buttonColor" dark) {{ $t('dashboard_view.revenue')}}
        v-btn(color="buttonColor" dark) {{ $t('dashboard_view.ecpm')}}
</template>

<script>
export default {
  name: 'dashboard-stat-buttons'
}
</script>


