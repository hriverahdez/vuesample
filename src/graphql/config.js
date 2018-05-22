import gql from 'graphql-tag'

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
