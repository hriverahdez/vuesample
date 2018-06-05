import gql from 'graphql-tag'

export const GET_DASHBOARD_REPORT_DATA = gql`
query ($groupBy: [StatsGroupBy], $filter: StatsFilter) {
    stats (groupBy: $groupBy, filter: $filter) {
        label
        requests
        imps
        fillRate
        ctr
        clicks
        revenue
        ecpm
    }
}
`
