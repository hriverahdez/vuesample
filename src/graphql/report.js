import gql from 'graphql-tag'

// export const GET_DASHBOARD_REPORT_DATA = gql`
// query ($groupBy: [StatsGroupBy], $filter: StatsFilter) {
//     networkStats (accountId: "5b10f0ea9a5fd6246022fd55", groupBy: $groupBy, filter: $filter) {
//         total {
//             label
//             req
//             reqfail
//             imp
//             fillrate
//             click
//             ctr
//             money
//             ecpm
//           }
//           rowData {
//             label
//             req
//             reqfail
//             imp
//             fillrate
//             click
//             ctr
//             money
//             ecpm
//         }
//     }
// }
// `

export const GET_DASHBOARD_REPORT_DATA = gql`
query ($groupBy: [StatsGroupBy], $filter: StatsFilter) {
    networkStats (accountId: "5b10f0ea9a5fd6246022fd55", groupBy: $groupBy, filter: $filter) {
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
query ($groupBy: [StatsGroupBy], $filter: StatsFilter) {
    networkStats (accountId: "5b10f0ea9a5fd6246022fd55", groupBy: $groupBy, filter: $filter) {
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
