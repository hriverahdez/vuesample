import gql from 'graphql-tag'

export const PRUEBA = gql`
{
 accounts(orderBy: [name_DESC]) {
     _id
     name
     disabled
     dateCreation
         {
             date
             timezone
         }
     }
}
`
