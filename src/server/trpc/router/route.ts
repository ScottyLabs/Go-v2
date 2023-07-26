import {
  createRouteSchema,
  deleteManyRouteSchema,
  deleteRouteSchema,
  getOneRouteSchema,
  updateRouteSchema,
} from "server/schemas";
import { publicProcedure, router } from "../trpc";

export default router({
  create: publicProcedure
    .input(createRouteSchema)
    .mutation(({ ctx, input }) => ctx.prisma.route.create({ data: input })),
  update: publicProcedure
    .input(updateRouteSchema)
    .mutation(({ ctx, input }) =>
      ctx.prisma.route.update({ where: { id: input.id }, data: input }),
    ),
  getAll: publicProcedure.query(({ ctx }) => ctx.prisma.route.findMany()),
  delete: publicProcedure
    .input(deleteRouteSchema)
    .mutation(({ ctx, input }) =>
      ctx.prisma.route.delete({ where: { id: input.id } }),
    ),
  deleteMany: publicProcedure
    .input(deleteManyRouteSchema)
    .mutation(({ ctx, input }) =>
      ctx.prisma.route.deleteMany({ where: { id: { in: input.ids } } }),
    ),
  getOne: publicProcedure
    .input(getOneRouteSchema)
    .query(({ ctx, input }) =>
      ctx.prisma.route.findUniqueOrThrow({ where: { id: input.id } }),
    ),
});
