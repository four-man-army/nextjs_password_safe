import PasswordInput from "@/components/PasswordInput";
import List from "@/components/PasswordList";
import { auth } from "@/lib/auth";
import { Key } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function page() {
  const session = await auth();

  if (!session) notFound();

  return (
    <div className="w-full h-4/5">
      <div className="flex flex-col h-full mt-4 items-center">
        <div className="flex justify-center gap-5">
          <Key className="h-16 w-16" />
          <h1 className="text-6xl font-medium">Password Safe</h1>
        </div>
        <div className="lg:w-1/2 w-full h-full min-h-0">
          <div className="p-4 rounded-sm shadow-md w-full h-full flex flex-col">
            <div className="flex-grow overflow-y-auto">
              <List user={session.user} />
            </div>
            <PasswordInput user={session.user} />
          </div>
        </div>
      </div>
    </div>
  );
}
