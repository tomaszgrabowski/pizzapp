import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { crypt } from "@/utils/crypt";

export const usersRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (user) {
        throw new Error("User already exists");
      }
      return ctx.prisma.user.create({
        data: {
          email: input.email,
          password: await crypt(input.password),
          name: input.name,
          //TODO: add email verification
          emailVerified: new Date(),
        },
      });
    }),
});
