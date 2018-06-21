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
// ADMOB
export const NETWORK_PROFILES_ADMOB = gql`
query ($filter: [AccountFilter]) {
  accounts(filter: $filter) {
      _id
      name
      networkProfiles {
        ... on NetworkIntegration1002 {
          networkId
          profiles {
            name
            default
            pub_id
            button_grant
        }
      }
    }
  }
 }
`

// ADCOLONY
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

// APPLOVIN
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

// CHARTBOOST
export const NETWORK_PROFILES_CHARTBOOST = gql`
query ($filter: [AccountFilter]) {
  accounts(filter: $filter) {
      _id
      name
      networkProfiles {
        ... on NetworkIntegration1007 {
          networkId
          profiles {
            name
            default
            user_id
            user_signature
        }
      }
    }
  }
 }
`

// INMOBI
export const NETWORK_PROFILES_INMOBI = gql`
query ($filter: [AccountFilter]) {
  accounts(filter: $filter) {
      _id
      name
      networkProfiles {
        ... on NetworkIntegration1012 {
          networkId
          profiles {
            name
            default
            apiKey
            acountId
            username
            password
        }
      }
    }
  }
 }
`

// IRONSOURCE
export const NETWORK_PROFILES_IRONSOURCE = gql`
query ($filter: [AccountFilter]) {
  accounts(filter: $filter) {
      _id
      name
      networkProfiles {
        ... on NetworkIntegration1017 {
          networkId
          profiles {
            name
            default
            username
            secret_key
        }
      }
    }
  }
 }
`

// MOBUSI
export const NETWORK_PROFILES_MOBUSI = gql`
query ($filter: [AccountFilter]) {
  accounts(filter: $filter) {
      _id
      name
      networkProfiles {
        ... on NetworkIntegration1001 {
          networkId
          profiles {
            name
            default
            user_id
            api_key
        }
      }
    }
  }
 }
`

// MOBVISTA
export const NETWORK_PROFILES_MOBVISTA = gql`
query ($filter: [AccountFilter]) {
  accounts(filter: $filter) {
      _id
      name
      networkProfiles {
        ... on NetworkIntegration1014 {
          networkId
          profiles {
            name
            default
            skey
            secret
        }
      }
    }
  }
 }
`

// MOPUB
export const NETWORK_PROFILES_MOPUB = gql`
query ($filter: [AccountFilter]) {
  accounts(filter: $filter) {
      _id
      name
      networkProfiles {
        ... on NetworkIntegration1016 {
          networkId
          profiles {
            name
            default
            apiKey
            inventoryReport
            campaignReport
        }
      }
    }
  }
 }
`
// STARTAPP
export const NETWORK_PROFILES_STARTAPP = gql`
query ($filter: [AccountFilter]) {
  accounts(filter: $filter) {
      _id
      name
      networkProfiles {
        ... on NetworkIntegration1013 {
          networkId
          profiles {
            name
            default
            acountId
            token
        }
      }
    }
  }
 }
`

// UNITYADS
export const NETWORK_PROFILES_UNITYADS = gql`
query ($filter: [AccountFilter]) {
  accounts(filter: $filter) {
      _id
      name
      networkProfiles {
        ... on NetworkIntegration1004 {
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

// VUNGLE
export const NETWORK_PROFILES_VUNGLE = gql`
query ($filter: [AccountFilter]) {
  accounts(filter: $filter) {
      _id
      name
      networkProfiles {
        ... on NetworkIntegration1005 {
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

/* -------------- Mutations ------------ */
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
