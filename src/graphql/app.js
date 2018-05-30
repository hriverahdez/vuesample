import gql from 'graphql-tag'

export const APP_DATA = gql`
{
 apps {
    _id
    name
    description
    account
    disabled
    bundle
    platform
 }
}
`
