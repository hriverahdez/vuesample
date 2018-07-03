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

export const GET_ROLES_ADMIN = gql`
{
 config {
    availableRolesAdmin
 }
}
`

export const BANNER_POSITIONS = gql`
{
  config {
    bannerPositions
  }
}
`
