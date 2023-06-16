import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { encrypt } from "@/lib/utils";
import { Password, passwordValidator } from "@/lib/validators/password";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const passwordData: Password = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) return new Response("Unauthorized", { status: 401 });

    const password = passwordValidator.parse(passwordData);

    const member = await db.zrange(`safe:${session.user.id}:passwords`, 0, -1) as DBMember[];

    const pipeline = db.pipeline();

    member.forEach(m => { 
      if (m.id === password.id) pipeline.zrem(`safe:${session.user.id}:passwords`, m)
    })

    pipeline.exec();

    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}
