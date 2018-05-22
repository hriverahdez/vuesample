import gql from 'graphql-tag'

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

export const GET_DATA_FILTERS = gql`
{
 config {
    networkIds
    countries {
      name
      code
    }
    formats
    platforms
 }
}
`
