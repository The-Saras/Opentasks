export const typeDefs = `#graphql
    scalar DateTime

    enum Status {
        PENDING
        WORKING
        DONE
    }

    type User{
        id:ID
        email: String
        name: String
    }

    type Todo{
        id: ID
        title: String
        desc: String
        completed: Status
        ownerId: String
        orgsId: String
        date: DateTime
        assigneeId: String
        assignee: User 
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
        user:User
    }

    input CreateOrganizationMemberInput {
        email: String!
        organizationId: ID!
        
    }

    type Mutation{
        addTodo(title: String!, desc: String!, completed: Status,orgsId: String,  ownerId: String,date:DateTime): Todo
        createOrg(name: String!, adminId: String): Organization
        addTodoToOrg(title: String!, desc: String!, completed: Status, orgsId: String!,  ownerId: String,date:DateTime): Todo
        createOrganizationMember(input: CreateOrganizationMemberInput!): OrganizationMember
        updateTodo(id: ID!, title: String, desc: String, completed: Status, ownerId: String, orgsId: String, date: DateTime): Todo
        assignTodoTouser(todoId: ID!, email: String): Todo 
    }
    type Query {
        todos:[Todo]
        getuserTodos(ownerId: String): [Todo]
        getOrgTodo(orgsId: String): [Todo]
        getUserOrgs(userId: String): [Organization!]!
        getUserCreatedTeams(adminId: String): [Organization!]!
        getteamDetails(orgsId: String): Organization
        getTodobyId(id: ID!): Todo
        getOrgMembers(orgsId: String): [OrganizationMember]
    }


`;