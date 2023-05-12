import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const dishesRouter = createTRPCRouter({
  getRestaurantMenu: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.dish.findMany({});
  }),
  addDishToOrder: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        dishId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.findUnique({
        where: {
          id: input.orderId,
        },
      });
      if (!order) {
        throw new Error("Order not found");
      } else {
        const dish = await ctx.prisma.dish.findUnique({
          where: {
            id: input.dishId,
          },
        });
        if (!dish) {
          throw new Error("Dish not found");
        } else {
          return ctx.prisma.order.update({
            where: {
              id: input.orderId,
            },
            data: {
              dishes: {
                connect: {
                  id: input.dishId,
                },
              },
              total: order.total + dish.price,
            },
          });
        }
      }
    }),
  removeDishFromOrder: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        dishId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.findUnique({
        where: {
          id: input.orderId,
        },
      });
      if (!order) {
        throw new Error("Order not found");
      } else {
        const dish = await ctx.prisma.dish.findUnique({
          where: {
            id: input.dishId,
          },
        });
        if (!dish) {
          throw new Error("Dish not found");
        } else {
          return ctx.prisma.order.update({
            where: {
              id: input.orderId,
            },
            data: {
              dishes: {
                disconnect: {
                  id: input.dishId,
                },
              },
              total: order.total + dish.price,
            },
          });
        }
      }
    }),
});
