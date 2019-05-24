import gql from 'graphql-tag'

export const CREATE_NEW_USER = gql`
  mutation createUser($input: CreateUserInput!){
    createUser(input: $input) {
      user {
        _id
        name
        email
        isActive
        isAdmin
        accounts {
            account
            roles
        }
      }
    }
  }
`

export const DELETE_USER = gql`
  mutation deleteUserById ($ids: [ID!]) {
    deleteUserById(_id: $ids) }
`

export const GET_USER = gql`    
    query user($email: String!) {
        userByEmail (email: $email) {
             _id
            name
            email
            isAdmin
            accounts {
                account
                roles
            }
        }
    }
`

export const GET_USER_BY_TOKEN = gql`    
    query one($token: String!) {
        checkUserToken (token: $token) {
             _id
            name
            email
            isAdmin
            accounts {
                account
                roles
            }
        }
    }
`

export const GET_USERS = gql`
{
    users (orderBy: [name_DESC]) {
        _id
        name
        email
        isActive
        isAdmin
        accounts {
            account
            roles
        }
    }
}    
`

export const UPDATE_USER = gql`
mutation updateUserById ($id: ID!, $input: UpdateUserInput!){
  updateUserById(_id: $id, input: $input) {
    user {
      _id
      name
      email
      isActive
      isAdmin
      accounts {
        account
        roles
      }
    }
  }
}    
`
