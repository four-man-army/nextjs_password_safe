import List from "@/components/PasswordList";
import PasswordInput from "@/components/PasswordInput";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { Password, passwordListValidator } from "@/lib/validators/password";
import { Key } from "lucide-react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { decrypt } from "@/lib/utils";

export const dynamic = "force-dynamic";

const getPasswords = async (userId: string, encryptionKey: string) => {
  try {
    const result: string[] = await fetchRedis(
      "zrange",
      `safe:${userId}:passwords`,
      0,
      -1
    );

    const dbPasswords = result.map(
      (member) => JSON.parse(decrypt(member, encryptionKey)) as Password
    );

    const passwords = passwordListValidator.parse(dbPasswords);

    return passwords;
  } catch (error) {
    notFound();
  }
};

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session) notFound();

  const passwords = await getPasswords(
    session.user.id,
    session.user.encryptKey
  );

  return (
    <div className="w-full h-4/5">
      <div className="flex flex-col h-full mt-4 items-center">
        <div className="flex justify-center gap-5">
          <Key className="h-16 w-16" />
          <h1 className="text-6xl font-medium">Password Safe</h1>
        </div>
        <div className="lg:w-1/2 w-full h-full">
          <div className="p-4 rounded-sm shadow-md w-full max-h-full overflow-y-auto scrollbar-w-2 scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-thumb-rounded">
            <List initialPasswords={passwords} />
            <PasswordInput />
          </div>
        </div>
      </div>
    </div>
  );
}
