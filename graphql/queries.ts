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

export const GET_USER_ORG = gql`
    query GetUserOrgs($userId: String) {
        getUserOrgs(userId: $userId) {
            name
            id
        }
    }

`;

export const GET_USER_CREATED_TEAMS = gql`
    query GetUserCreatedTeams($adminId: String) {
        getUserCreatedTeams(adminId: $adminId) {
            name
            id
    }
}
`;