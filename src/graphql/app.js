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

export const APP_DATA_BY_ID_AND_NETWORK = gql`
query ($_id: ID!, $_idAccount: ID!, $_IdNetwork: Int!, $_profileName: String!) {
  appByIdNetworkProfile(_id: $_id, _idAccount: $_idAccount, _IdNetwork: $_IdNetwork, _profileName: $_profileName) {
    name
    _id
    icon
    platform
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

export const ENABLE_DISABLE_APP = gql`
mutation updateAppById ($_id: ID!, $input: UpdateAppInput!){
  updateAppById(_id: $_id, input: $input) {
    app {
      _id
      name
      disabled
    }
  }
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

export const UPDATE_APP_NETWORK = gql`
mutation updateAppNetwork($idApp: ID!, $idAccount: ID!, $idNetwork: Int!, $input: UpdateAppNetworkInput!) {
  updateAppNetwork(idApp: $idApp, idAccount: $idAccount, idNetwork: $idNetwork, input: $input) {
    app {
      _id
      name
      disabled
    }
  }
}
`
