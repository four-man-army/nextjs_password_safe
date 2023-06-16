import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { encrypt } from "@/lib/utils";
import { Password, passwordValidator } from "@/lib/validators/password";
import { AES, DES } from "crypto-js";
import CryptoJS from "crypto-js";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    try {
        const passwordData: Password = await req.json();
        const session = await getServerSession(authOptions)

        if (!session) return new Response('Unauthorized', { status: 401 });

        const timestamp = Date.now();

        const password = passwordValidator.parse(passwordData);

        await db.zadd(`safe:${session.user.id}:passwords`, {
            score: timestamp,
            member: encrypt(password, session.user.encryptKey)
        });
        return new Response('OK', { status: 200 });
    } catch (error) {
        return new Response((error as Error).message, { status: 500 });
    }
}