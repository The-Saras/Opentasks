import { gql } from "@apollo/client";


export const GET_TODOS = gql`
    query Query($ownerId: String) {
        getuserTodos(ownerId: $ownerId) {
            completed
            desc
            id
            orgsId
            ownerId
            title
        }
    }

`;