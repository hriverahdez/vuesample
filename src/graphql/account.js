import gql from 'graphql-tag'

/* ----------------- QUERIES ---------------------- */
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

/* ------------------------- ADCOLONY --------------------------- */
// Query
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
// Mutations
export const CREATE_ACCOUNT_NETWORK_INTEGRATION_1003 = gql`
mutation createAccountNetworkIntegration1003 ($input: CreateAccountNetIntegration1003Input!){
  createAccountNetworkIntegration1003(input: $input) {
    account {
      _id
      name
    }
  }
}
`

export const UPDATE_NETWORK_1003_PROFILE = gql`
mutation updateAccountNetworkIntegration1003byIdAccount ($_idAccount: ID!, $_profileName: String!, $input: UpdateAccountNetIntegration1003Input!){
  updateAccountNetworkIntegration1003byIdAccount(
    _idAccount: $_idAccount,
    _profileName: $_profileName,
    input: $input) {
    account {
      _id
      name
    }
  }
}
`

/* ------------------------- APPLOVIN --------------------------- */
// Query
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
export const CREATE_ACCOUNT_NETWORK_INTEGRATION_1008 = gql`
mutation createAccountNetworkIntegration1008 ($input: CreateAccountNetIntegration1008Input!){
  createAccountNetworkIntegration1008(input: $input) {
    account {
      _id
      name
    }
  }
}
`

export const UPDATE_NETWORK_1008_PROFILE = gql`
mutation updateAccountNetworkIntegration1008byIdAccount ($_idAccount: ID!, $_profileName: String!, $input: UpdateAccountNetIntegration1008Input!){
  updateAccountNetworkIntegration1008byIdAccount(
    _idAccount: $_idAccount,
    _profileName: $_profileName,
    input: $input) {
    account {
      _id
      name
    }
  }
}
`

/* ------------------------- APPLOVIN --------------------------- */
// Query
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

// Mutations
export const CREATE_ACCOUNT_NETWORK_INTEGRATION_1007 = gql`
mutation createAccountNetworkIntegration1007 ($input: CreateAccountNetIntegration1007Input!){
  createAccountNetworkIntegration1007(input: $input) {
    account {
      _id
      name
    }
  }
}
`

export const UPDATE_NETWORK_1007_PROFILE = gql`
mutation updateAccountNetworkIntegration1007byIdAccount ($_idAccount: ID!, $_profileName: String!, $input: UpdateAccountNetIntegration1007Input!){
  updateAccountNetworkIntegration1007byIdAccount(
    _idAccount: $_idAccount,
    _profileName: $_profileName,
    input: $input) {
    account {
      _id
      name
    }
  }
}
`

/* ------------------------- INMOBI --------------------------- */
// Query
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

// Mutations
export const CREATE_ACCOUNT_NETWORK_INTEGRATION_1012 = gql`
mutation createAccountNetworkIntegration1012 ($input: CreateAccountNetIntegration1012Input!){
  createAccountNetworkIntegration1012(input: $input) {
    account {
      _id
      name
    }
  }
}
`

export const UPDATE_NETWORK_1012_PROFILE = gql`
mutation updateAccountNetworkIntegration1012byIdAccount ($_idAccount: ID!, $_profileName: String!, $input: UpdateAccountNetIntegration1012Input!){
  updateAccountNetworkIntegration1012byIdAccount(
    _idAccount: $_idAccount,
    _profileName: $_profileName,
    input: $input) {
    account {
      _id
      name
    }
  }
}
`

/* ------------------------- IRONSOURCE --------------------------- */
// Query
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
// Mutations
export const CREATE_ACCOUNT_NETWORK_INTEGRATION_1017 = gql`
mutation createAccountNetworkIntegration1017 ($input: CreateAccountNetIntegration1017Input!){
  createAccountNetworkIntegration1017(input: $input) {
    account {
      _id
      name
    }
  }
}
`

export const UPDATE_NETWORK_1017_PROFILE = gql`
mutation updateAccountNetworkIntegration1017byIdAccount ($_idAccount: ID!, $_profileName: String!, $input: UpdateAccountNetIntegration1017Input!){
  updateAccountNetworkIntegration1017byIdAccount(
    _idAccount: $_idAccount,
    _profileName: $_profileName,
    input: $input) {
    account {
      _id
      name
    }
  }
}
`

/* ------------------------- MOBUSI --------------------------- */
// Query
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

// Mutations
export const CREATE_ACCOUNT_NETWORK_INTEGRATION_1001 = gql`
mutation createAccountNetworkIntegration1001 ($input: CreateAccountNetIntegration1001Input!){
  createAccountNetworkIntegration1001(input: $input) {
    account {
      _id
      name
    }
  }
}
`

export const UPDATE_NETWORK_1001_PROFILE = gql`
mutation updateAccountNetworkIntegration1001byIdAccount ($_idAccount: ID!, $_profileName: String!, $input: UpdateAccountNetIntegration1001Input!){
  updateAccountNetworkIntegration1001byIdAccount(
    _idAccount: $_idAccount,
    _profileName: $_profileName,
    input: $input) {
    account {
      _id
      name
    }
  }
}
`

/* ------------------------- MOBVISTA --------------------------- */
// Query
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

// Mutations
export const CREATE_ACCOUNT_NETWORK_INTEGRATION_1014 = gql`
mutation createAccountNetworkIntegration1014 ($input: CreateAccountNetIntegration1014Input!){
  createAccountNetworkIntegration1014(input: $input) {
    account {
      _id
      name
    }
  }
}
`

export const UPDATE_NETWORK_1014_PROFILE = gql`
mutation updateAccountNetworkIntegration1014byIdAccount ($_idAccount: ID!, $_profileName: String!, $input: UpdateAccountNetIntegration1014Input!){
  updateAccountNetworkIntegration1014byIdAccount(
    _idAccount: $_idAccount,
    _profileName: $_profileName,
    input: $input) {
    account {
      _id
      name
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

/* -------------- General Mutations ------------ */
export const GET_ACCOUNTS_FILTERING = gql`
    query accountsByFilter($filter: [AccountFilter]) {
        accounts(orderBy: [name_DESC], filter: $filter) {
           _id
           name
        }
    }
`
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

export const DELETE_NETWORK_PROFILE = gql`
mutation deleteAccountNetworkIntegrationProfile ($_idAccount: ID!, $_idNetwork: Int!, $_profileName: String!) {
  deleteAccountNetworkIntegrationProfile(
    _idAccount: $_idAccount,
    _idNetwork: $_idNetwork,
    _profileName: $_profileName
  ) {
      account {
          _id
          name
      }
  }
}
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
