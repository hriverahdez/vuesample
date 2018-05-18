import gql from 'graphql-tag'

// Report
export const GET_DASHBOARD_REPORT_DATA = gql`
{
 stats(groupBy: [DATE]) {
     label
     requests
     imps
     clicks
     fillRate
     ctr
     revenue
     ecpm
     }
}
`
