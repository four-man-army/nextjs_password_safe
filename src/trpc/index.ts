import { Password, passwordValidator } from "@/lib/validators/password";
import { privateProcedure, router } from "./trpc";
import { db } from "@/lib/db";
import { decrypt, encrypt } from "@/lib/utils";
import { z } from "zod";

export const appRouter = router({
  addPassword: privateProcedure
    .input(z.object({ id: z.string(), hashedPassword: z.string()}))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      await db.password.create({
        data: {
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
      const { userId, user } = ctx;

      const passwords = await db.password.findMany({
        where: {
          userId,
        },
      });

      return passwords ;
    }),
});

export type AppRouter = typeof appRouter;
