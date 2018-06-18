import gql from 'graphql-tag'

// Queries
export const GET_ACCOUNTS = gql`
{
 accounts(orderBy: [name_DESC]) {
     _id
     name
     description
     disabled
     dateCreation
         {
             date
             timezone
         }
  }
}
`
export const NETWORK_PROFILES_ADCOLONY = gql`
query ($filter: [AccountFilter]) {
  accounts(filter: $filter) {
      _id
      name
      networkProfiles {
        ... on NetworkIntegration1003 {
          networkId
          profiles {
            name
            default
            api_key
        }
      }
    }
  }
 }
`

export const NETWORK_PROFILES_APPLOVIN = gql`
query ($filter: [AccountFilter]) {
  accounts(filter: $filter) {
      _id
      name
      networkProfiles {
        ... on NetworkIntegration1008 {
          networkId
          profiles {
            name
            default
            report_key
            sdk_key
        }
      }
    }
  }
 }
`
// Mutations
export const CREATE_NEW_ACCOUNT = gql`
  mutation createAccount($input: CreateAccountInput!){
    createAccount(input: $input) {
      account {
        _id
        name
      }
    }
  }
`
export const DELETE_ACCOUNT = gql`
  mutation deleteAccountById ($ids: [ID!]) {
    deleteAccountById(_id: $ids) }
`

export const UPDATE_ACCOUNT = gql`
mutation updateAccountById ($id: ID!, $input: UpdateAccountInput!){
  updateAccountById(_id: $id, input: $input) {
    account {
      _id
      name
    }
  }
}
`
