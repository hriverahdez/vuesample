import gql from 'graphql-tag'

export const GET_DASHBOARD_REPORT_DATA = gql`
query ($groupBy: [StatsGroupBy], $filter: StatsFilter) {
    networkStats (accountId: "5b1a34e69a5fd6634e7690a2", groupBy: $groupBy, filter: $filter) {
        total {
            label
            req
            reqfail
            imp
            fillrate
            click
            ctr
            money
            ecpm
          }
          rowData {
            label
            req
            reqfail
            imp
            fillrate
            click
            ctr
            money
            ecpm
        }
    }
}
`
