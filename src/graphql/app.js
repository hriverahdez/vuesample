import gql from 'graphql-tag'

export const APP_DATA = gql`
{
  apps {
    _id
    name
    description
    account
    disabled
    bundle
    platform
    dateCreation {
      date
    }
    dateLastUpdate {
      date
    }
    adPlacements {
      slug
      formatId
    }
    networks {
      profile
      formats {
        premium
        active
        formatFields {
          key
          value
        }
      }
    }
  }
}
`
