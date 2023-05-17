import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const orderStatus = ["Pending", "Ready", "Delivered"] as const;

const orderValidator = {
  status: z.enum(orderStatus),
};

export const orderRouter = createTRPCRouter({
  insertOrder: protectedProcedure
    .input(
      z.object({
        tableId: z.string(),
        dishes: z.array(
          z.object({
            dishId: z.string(),
            quantity: z.number().min(1),
          })
        ),
        userId: z.string().optional(),
        status: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.create({
        data: {
          tableId: input.tableId,
          userId: input.userId,
          status: input.status,
          total: 0,
          DishOnOrder: {
            create: input.dishes.map((dish) => ({
              dishId: dish.dishId,
              quantity: dish.quantity,
            })),
          },
        },
      });
      const dishOnOrder = await ctx.prisma.dishOnOrder.findMany({
        where: {
          orderId: order.id,
        },
        include: {
          dish: true,
        },
      });
      const total = dishOnOrder
        .map((dish) => dish.quantity * dish.dish.price)
        .reduce((a, b) => a + b, 0);

      await ctx.prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          total,
        },
      });

      return order;
    }),
  getOrders: protectedProcedure
    .input(orderValidator.status)
    .query(async ({ ctx, input }) => {
      return ctx.prisma.order.findMany({
        include: {
          DishOnOrder: {
            include: {
              dish: true,
            },
          },
          table: true,
        },
        where: {
          status: input,
        },
      });
    }),
  changeOrderStatus: protectedProcedure
    .input(z.object({ status: orderValidator.status, orderId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.order.update({
        where: {
          id: input.orderId,
        },
        data: {
          status: input.status,
        },
      });
    }),
});
