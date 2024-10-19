export const typeDefs = `#graphql
    scalar DateTime

    enum Status {
        PENDING
        WORKING
        DONE
    }

    type Todo{
        id: ID
        title: String
        desc: String
        completed: Status
        ownerId: String
        orgsId: String
        date: DateTime
    }

    type Organization{
        id: ID
        name: String
        adminId: String
        todos: [Todo]
    }

    type OrganizationMember {
        
        organizationId: ID!
        userId: ID!
    }

    input CreateOrganizationMemberInput {
        organizationId: ID!
        userId: ID!
    }

    type Mutation{
        addTodo(title: String!, desc: String!, completed: Status,orgsId: String,  ownerId: String,date:DateTime): Todo
        createOrg(name: String!, adminId: String): Organization
        addTodoToOrg(title: String!, desc: String!, completed: Status, orgsId: String!,  ownerId: String,date:DateTime): Todo
        createOrganizationMember(input: CreateOrganizationMemberInput!): OrganizationMember
    }
    type Query {
        todos:[Todo]
        getuserTodos(ownerId: String): [Todo]
        getOrgTodo(orgsId: String): [Todo]
        getUserOrgs(userId: String): [Organization!]!
        getUserCreatedTeams(adminId: String): [Organization!]!
        getteamDetails(orgsId: String): Organization
    }


`;