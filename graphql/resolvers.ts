import { Context } from "@/app/api/graphql/route";
import { use } from "react";
export const resolvers = {
  Mutation: {
    addTodo: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.todo.create({
        data: {
          title: args.title,
          desc: args.desc,
          completed: args.completed,
          ownerId: args.ownerId,
          orgsId: args.orgsId,
          date: args.date,
        },
      });
    },

    createOrg: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.organization.create({
        data: {
          name: args.name,
          adminId: args.adminId,
        },
      });
    },

    addTodoToOrg: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.todo.create({
        data: {
          title: args.title,
          desc: args.desc,
          completed: args.completed,
          ownerId: args.ownerId,
          orgsId: args.orgsId,
          date: args.date,
        },
      });
    },
    createOrganizationMember: async (
      _parent: any,
      args: any,
      context: Context
    ) => {
      const user = await context.prisma.user.findUnique({
        where: {
          email: args.input.email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const userunique = user?.id;

      return await context.prisma.organizationMember.create({
        data: {
          organizationId: args.input.organizationId,
          userId: userunique,
        },
      });
    },
    updateTodo: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.todo.update({
        where: {
          id: args.id,
        },
        data: {
          title: args.title,
          desc: args.desc,
          completed: args.completed,
          ownerId: args.ownerId,
          orgsId: args.orgsId,
          date: args.date,
        },
      });
    },
    assignTodoTouser: async (_parent: any, args: any, context: Context) => {
      const user = await context.prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const userunique = user?.id;
      return await context.prisma.todo.update({
        where: {
          id: args.todoId,
        },
        data: {
          assigneeId: userunique,
        },
      });
    },
  },

  Query: {
    todos: async (_parent: any, _args: any, context: Context) => {
      return await context.prisma.todo.findMany();
    },

    getuserTodos: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.todo.findMany({
        where: {
          ownerId: args.ownerId,
          orgsId: null,
        },
      });
    },
    getOrgTodo: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.todo.findMany({
        where: {
          orgsId: args.orgsId,
        },
      });
    },
    getUserOrgs: async (_parent: any, args: any, context: Context) => {
      const memberships = await context.prisma.organizationMember.findMany({
        where: {
          userId: args.userId,
        },
        include: {
          organization: true,
        },
      });
      //console.log(memberships.map((m: any) => m.organization))
      return memberships.map((m: any) => m.organization);
    },

    getUserCreatedTeams: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.organization.findMany({
        where: {
          adminId: args.adminId,
        },
      });
    },
    getteamDetails: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.organization.findUnique({
        where: {
          id: args.orgsId,
        },
      });
    },
    getTodobyId: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.todo.findUnique({
        where: {
          id: args.id,
        },
        include:{
          assignee: true
        }
      });
    },
    getOrgMembers: async (_parent: any, args: any, context: Context) => {
      return await context.prisma.organizationMember.findMany({
        where: {
          organizationId: args.orgsId,
        },
        include:{
          user: true
        }
      });
    }
  },
};
