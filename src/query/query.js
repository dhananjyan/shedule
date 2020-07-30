import { gql } from '@apollo/client';
import { graphql } from '@apollo/react-hoc';


export const addUserQuery = graphql(gql`
    mutation addNewUser($username: String, $password: String, $email: String) {
        addUser(username:$username, password:$password, email:$email) {
            username
          }
    }
`)

export const loginQuery = graphql(gql`
    mutation Login($username: String, $password: String){
        login(username:$username, password:$password){
            username 
            email
        }
    }
`)

export const addAllCategoriesQuery = gql`
    query getCategory {
        categories {
            id
            name
          }
    }
`

export const categoriedDoctors = gql`
    query categoriedDoctors($id:ID) {
        category(id:$id) {
            providers {
                id
                username
                events {
                    start
                    end
                }
                
            }    
        }
    }
`