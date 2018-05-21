<template lang="pug">
    section.dashboard__section
        v-layout(wrap).card__row-title
          v-flex(xs12)
            v-card
              v-card-title.title.headings--text {{ $t('dashboard_view.dashboard_title' )}}
                dashboard-tabs
            dashboard-data-table
</template>


<script>
  import DashboardDataTable from '@/components/datatables/DashboardDataTable'
  import DashboardTabs from '@/components/dashboard/DashboardTabs'

  export default {
    name: 'dashboard-view',
    components: {
      DashboardDataTable,
      DashboardTabs
    }
  }
</script>



