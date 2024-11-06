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

export const GET_ORG_TASKS = gql`
    query GetOrgTodo($orgsId: String) {
        getOrgTodo(orgsId: $orgsId) {
        completed
        desc
        title
        ownerId
        orgsId
        id
        date
    }
    }

`;

export const GET_TEAM_DETAILS = gql`
    query GetteamDetails($orgsId: String) {
        getteamDetails(orgsId: $orgsId) {
        name
        adminId
    }
    }

`;

export const GET_TODO_BYID = gql`
    query GetTodobyId($getTodobyIdId: ID!) {
        getTodobyId(id: $getTodobyIdId) {
        title
        ownerId
        orgsId
        id
        date
        desc
        completed
        assigneeId
        assignee {
        name
        }
    }
    }
`;