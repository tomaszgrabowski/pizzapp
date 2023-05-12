import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const orderRouter = createTRPCRouter({
  getRestaurantOrders: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.order.findMany({
      include: {
        dishes: true,
      },
    });
  }),
  upsertOrder: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
        tableId: z.string().optional(),
        companyId: z.string(),
        dishes: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const sum = await ctx.prisma.dish.aggregate({
        where: {
          id: {
            in: input.dishes,
          },
        },
        _sum: {
          price: true,
        },
      });

      const obj = {
        address: input.address,
        phone: input.phone,
        tableId: input.tableId,
        companyId: input.companyId,
        dishes: {
          connect: input.dishes?.map((dishId) => ({ id: dishId })),
        },
        status: "In progress",
        total: sum._sum.price ?? 0,
      };

      await ctx.prisma.order.upsert({
        where: {
          id: input.id || "",
        },
        create: obj,
        update: obj,
      });
    }),
});
