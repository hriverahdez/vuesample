import gql from 'graphql-tag'

export const GET_DASHBOARD_REPORT_DATA = gql`
query ($accountId: ID!, $groupBy: [StatsGroupBy], $filter: StatsFilter) {
    networkStats (accountId: $accountId, groupBy: $groupBy, filter: $filter) {
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

export const GET_DASHBOARD_DATATABLE_DATA = gql`
query ($accountId: ID!, $groupBy: [StatsGroupBy], $filter: StatsFilter) {
    networkStats (accountId: $accountId, groupBy: $groupBy, filter: $filter) {
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
