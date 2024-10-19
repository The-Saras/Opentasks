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
                    orgsId: args.orgsId,
                    date: args.date

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
                    orgsId: args.orgsId,
                    date:args.date
                }
            })
        },
        createOrganizationMember:async(_parent: any, args: any, context: Context) => {
            return await context.prisma.organizationMember.create({
                data:{
                    organizationId: args.input.organizationId,
                    userId: args.input.userId
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
        },
        getUserOrgs: async(_parent: any, args: any, context: Context) => {
            const memberships =  await context.prisma.organizationMember.findMany({
                where:{
                    userId: args.userId
                },
                include:{
                    organization:true
                }
            })
            console.log(memberships.map((m: any) => m.organization))
            return memberships.map((m: any) => m.organization);
        },

        getUserCreatedTeams: async(_parent: any, args: any, context: Context) => {
            return await context.prisma.organization.findMany({
                where:{
                    adminId: args.adminId
                }
            })
        },
        getteamDetails :async(_parent: any, args: any, context: Context) => {
            return await context.prisma.organization.findUnique({
                where:{
                    id: args.orgsId
                }
            })
        }

    }


} 