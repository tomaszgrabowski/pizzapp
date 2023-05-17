import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const dishesRouter = createTRPCRouter({
  getRestaurantMenu: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.dish.findMany({});
  }),
});
