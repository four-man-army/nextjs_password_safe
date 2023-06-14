import List from "@/components/List";
import PasswordInput from "@/components/PasswordInput";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { Password, passwordListValidator } from "@/lib/validators/password";
import { Key } from "lucide-react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const getPasswords = async (userId: string) => {
  try {
    const result: string[] = await fetchRedis(
      "zrange",
      `safe:${userId}:passwords`,
      0,
      -1
    );

    const dbPasswords = result.map(
      (password) => JSON.parse(password) as Password
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

  const passwords = await getPasswords(session.user.id);

  return (
    <div className="flex flex-col mt-4 items-center">
      <div className="flex justify-center gap-5">
        <Key className="h-16 w-16" />
        <h1 className="text-6xl font-medium">Password Safe</h1>
      </div>
      <div className="lg:w-1/2 w-full">
        <div className="p-4 rounded-sm shadow-md w-full">
          <List initialPasswords={passwords} />
          <PasswordInput />
        </div>
      </div>
    </div>
  );
}
