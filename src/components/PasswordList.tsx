"use client";
import { trpc } from "@/app/_trpc/client";
import { PasswordContext } from "@/context/Password";
import { addHttps, decrypt, escapeHtml } from "@/lib/utils";
import { Password } from "@/lib/validators/password";
import { Ghost } from "lucide-react";
import type { User } from "next-auth";
import { FC, useContext, useEffect } from "react";
import PasswordField from "./PasswordField";
import { Skeleton } from "./ui/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";

interface ListProps {
  user: User & {
    id: string;
    encryptKey: string;
  };
}

const List: FC<ListProps> = ({ user }) => {
  const { passwords, setPasswords } = useContext(PasswordContext);
  const { data, isLoading, isSuccess } = trpc.getPasswords.useQuery();

  useEffect(() => {
    if (isSuccess) {
      setPasswords(
        data.map((password) => {
          return JSON.parse(
            decrypt(password.hashedPassword, user.encryptKey),
          ) as Password;
        }),
      );
    }
  }, [isSuccess, user.encryptKey, data, setPasswords]);

  if (isLoading) {
    return (
      <div className="h-full w-full">
        <Skeleton className="w-full p-5" />
        <Skeleton className="w-full p-5" />
        <Skeleton className="w-full p-5" />
        <Skeleton className="w-full p-5" />
      </div>
    );
  }

  if (passwords?.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center gap-2">
        <Ghost className="h-8 w-8 text-zinc-800" />
        <h3 className="font-semibold text-xl">Pretty empty around here</h3>
        <p>
          Let&apos;s upload your first{" "}
          <span className="font-medium">password</span>.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-lg">
          <TableHead className="sm:px-4 px-2">Username</TableHead>
          <TableHead className="sm:px-4 px-2">Website</TableHead>
          <TableHead className="sm:px-4 px-2">Password</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="h-full">
        {passwords?.map((password) => (
          <TableRow key={password.id}>
            <TableCell className="sm:p-4 p-2">{password.username}</TableCell>
            <TableCell className="sm:p-4 p-2">
              <a className="hover:underline" href={addHttps(escapeHtml(password.website))}>
                {password.website}
              </a>
            </TableCell>
            <TableCell className="sm:p-4 p-2">
              <PasswordField password={password.password} id={password.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default List;
