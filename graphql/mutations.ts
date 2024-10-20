import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
    mutation Mutation($title: String!, $desc: String!, $completed: Status, $orgsId: String, $ownerId: String) {
        addTodo(title: $title, desc: $desc, completed: $completed, orgsId: $orgsId, ownerId: $ownerId) {
        title
        }
    }
`

export const CREATE_ORG_TODO = gql`
      mutation Mutation($title: String!, $desc: String!, $orgsId: String!, $completed: Status, $ownerId: String, $date: DateTime) {
    addTodoToOrg(title: $title, desc: $desc, orgsId: $orgsId, completed: $completed, ownerId: $ownerId, date: $date) {
      id
    }
  }
`;