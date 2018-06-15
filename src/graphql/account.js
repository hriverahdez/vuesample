// Store import
import { store } from '@/store/store'

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
export const NETWORK_PROFILES = gql`
{
  accounts(orderBy: [name_DESC]) {
      _id
      name
      networkProfiles {
        ... on ${store.state.network.title}{
          networkId
          profiles {
            name
            default
            ${store.state.network.vars}
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
