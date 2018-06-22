import gql from 'graphql-tag'

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
