import { passwordValidator } from "@/lib/validators/password";
import { privateProcedure, router } from "./trpc";
import { db } from "@/lib/db";
import { encrypt } from "@/lib/utils";
import { z } from "zod";

export const appRouter = router({
  addPassword: privateProcedure
    .input(passwordValidator)
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;

      const timestamp = Date.now();

      await db.zadd(`safe:${userId}:passwords`, {
        score: timestamp,
        member: encrypt(input, user.encryptKey),
      });

      return { status: "OK" };
    }),
  removePassword: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const member = (await db.zrange(
        `safe:${userId}:passwords`,
        0,
        -1
      )) as DBMember[];

      const pipeline = db.pipeline();

      member.forEach((m) => {
        if (m.id === input.id) pipeline.zrem(`safe:${userId}:passwords`, m);
      });

      pipeline.exec();

      return { status: "OK" };
    }),
});

export type AppRouter = typeof appRouter;
