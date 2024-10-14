import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
    mutation Mutation($title: String!, $desc: String!, $completed: Boolean, $orgsId: String, $ownerId: String) {
        addTodo(title: $title, desc: $desc, completed: $completed, orgsId: $orgsId, ownerId: $ownerId) {
        title
        }
    }
`