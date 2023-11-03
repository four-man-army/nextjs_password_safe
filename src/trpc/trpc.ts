import { authOptions } from "@/lib/auth";
import { TRPCError, initTRPC } from "@trpc/server";
import { getServerSession } from "next-auth";

const t = initTRPC.create();
const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session.user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      userId: session.user.id,
      user: session.user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
