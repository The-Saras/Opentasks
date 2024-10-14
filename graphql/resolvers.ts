import { Context } from "@/app/api/graphql/route";
export const resolvers = {
    Mutation: {
        addTodo : async(_parent: any, args: any, context: Context) => {
            return await context.prisma.todo.create({
                data:{
                    title: args.title,
                    desc: args.desc,
                    completed: args.completed,
                    ownerId: args.ownerId,
                    orgsId: args.orgsId

                }
            })
        },

        createOrg: async(_parent: any, args: any, context: Context) => {
            return await context.prisma.organization.create({
                data:{
                    name: args.name,
                    adminId: args.adminId
                }
            })
        },

        addTodoToOrg: async(_parent: any, args: any, context: Context) => {
            return await context.prisma.todo.create({
                data:{
                    title: args.title,
                    desc: args.desc,
                    completed: args.completed,
                    ownerId: args.ownerId,
                    orgsId: args.orgsId
                }
            })
        }
    },

    Query: {
        todos: async (_parent: any, _args: any, context: Context) => {
            return await context.prisma.todo.findMany()
        },

        getuserTodos: async (_parent: any, args: any, context: Context) => {
            return await context.prisma.todo.findMany({
                where: {
                    ownerId: args.ownerId
                }
            })
        },
        getOrgTodo: async (_parent: any, args: any, context: Context) => {
            return await context.prisma.todo.findMany({
                where: {
                    orgsId: args.orgsId
                }
            })
        }

    }


} 