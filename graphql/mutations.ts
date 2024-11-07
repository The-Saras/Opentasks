import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation Mutation(
    $title: String!
    $desc: String!
    $completed: Status
    $orgsId: String
    $ownerId: String
    $date: DateTime
  ) {
    addTodo(
      title: $title
      desc: $desc
      completed: $completed
      orgsId: $orgsId
      ownerId: $ownerId
      date: $date
    ) {
      id
    }
  }
`;

export const CREATE_ORG_TODO = gql`
  mutation Mutation(
    $title: String!
    $desc: String!
    $orgsId: String!
    $completed: Status
    $ownerId: String
    $date: DateTime
  ) {
    addTodoToOrg(
      title: $title
      desc: $desc
      orgsId: $orgsId
      completed: $completed
      ownerId: $ownerId
      date: $date
    ) {
      id
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation Mutation(
    $updateTodoId: ID!
    $title: String
    $desc: String
    $completed: Status
    $ownerId: String
    $orgsId: String
    $date: DateTime
  ) {
    updateTodo(
      id: $updateTodoId
      title: $title
      desc: $desc
      completed: $completed
      ownerId: $ownerId
      orgsId: $orgsId
      date: $date
    ) {
      id
    }
  }
`;

export const CREATE_ORG_MEMBER = gql`
  mutation CreateOrganizationMember($input: CreateOrganizationMemberInput!) {
    createOrganizationMember(input: $input) {
      organizationId
      userId
    }
  }
`;

export const CREATE_TEAM = gql`
  mutation Mutation($name: String!, $adminId: String) {
    createOrg(name: $name, adminId: $adminId) {
      id
    }
  }
`;

export const ASSIGN_TASK = gql`
  mutation AssignTodoTouser($todoId: ID!, $email: String) {
    assignTodoTouser(todoId: $todoId, email: $email) {
      assigneeId
    }
  }
`;
