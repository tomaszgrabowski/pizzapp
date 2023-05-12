import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { dishesRouter } from "@/server/api/routers/dishes";
import { orderRouter } from "@/server/api/routers/order";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  dishes: dishesRouter,
  orders: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
