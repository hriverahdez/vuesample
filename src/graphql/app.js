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

export const CREATE_NEW_APP = gql`
  mutation createApp($input: CreateAppInput!){
    createApp(input: $input) {
      app {
        _id
        name
      }
    }
  }
`
