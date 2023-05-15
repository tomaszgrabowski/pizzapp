import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const tableRouter = createTRPCRouter({
  getTables: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.table.findMany();
  }),
});
