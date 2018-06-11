import gql from 'graphql-tag'

export const APPS_DATA = gql`
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
      networkId
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
export const DELETE_APP = gql`
  mutation deleteAppById($_id: [ID!]) {
    deleteAppById(_id: $_id)
  }
`

export const UPDATE_APP = gql`
mutation updateAppById ($_id: ID!, $input: UpdateAppInput!){
  updateAppById(_id: $_id, input: $input) {
    app {
      _id
      name
      description
    }
  }
}
`
