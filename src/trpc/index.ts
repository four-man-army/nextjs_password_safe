import { db } from "@/lib/db";
import { z } from "zod";
import { privateProcedure, router } from "./trpc";

export const appRouter = router({
  addPassword: privateProcedure
    .input(z.object({ id: z.string(), hashedPassword: z.string()}))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      await db.password.create({
        data: {
          id: input.id,
          hashedPassword: input.hashedPassword,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return { status: "OK" };
    }),
  removePassword: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      await db.password.deleteMany({
        where: {
          id: input.id,
          userId,
        },
      });

      return { status: "OK" };
    }),
  getPasswords: privateProcedure
    .query(async ({ ctx }) => {
      const { userId } = ctx;

      const passwords = await db.password.findMany({
        where: {
          userId,
        },
      });

      return passwords ;
    }),
});

export type AppRouter = typeof appRouter;
