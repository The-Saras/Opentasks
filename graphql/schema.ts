export const typeDefs = `#graphql
    

    type Todo{
        id: ID
        title: String
        desc: String
        completed: Boolean
        ownerId: String
        orgsId: Boolean
    }
    type Mutation{
        addTodo(title: String!, desc: String!, completed: Boolean,orgsId: Boolean,  ownerId: String): Todo
    }
    type Query {
        todos:[Todo]
    }


`;