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
