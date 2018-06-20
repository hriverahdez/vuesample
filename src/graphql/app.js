import gql from 'graphql-tag'

// Queries
export const APPS_DATA = gql`
query ($_idAccount: ID!) {
  apps (_idAccount: $_idAccount) {
    _id
    name
    description
    account
    disabled
    bundle
    platform
    icon
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

export const APP_DATA_BY_ID = gql`
query ($_id: ID!) {
  appById(_id: $_id) {
    name
    _id
    disabled
    networks {
      active
      profile
      networkId
      formats {
        format
        active
        premium
        formatFields{
          key
          value
        }
      }
    }
  }
}
`

export const APPS_IDS_AND_NAMES_BY_ACCOUNT_ID = gql`
query ($_idAccount: ID!, $filter: [AppFilter]) {
  apps(_idAccount: $_idAccount, filter: $filter) {
    name
    _id
  }
}
`

// Mutations
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
