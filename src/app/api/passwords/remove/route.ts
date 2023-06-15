import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Password, passwordValidator } from "@/lib/validators/password";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const passwordData = await req.json();
    console.log(passwordData)

    const session = await getServerSession(authOptions);

    if (!session) return new Response("Unauthorized", { status: 401 });
      

    const password = passwordValidator.parse(passwordData);
    db.zrem(`safe:${session.user.id}:passwords`, JSON.stringify(password));
    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}
