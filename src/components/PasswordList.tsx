"use client";
import { trpc } from "@/app/_trpc/client";
import { Ghost } from "lucide-react";
import { FC, useContext, useEffect, useState } from "react";
import PasswordField from "./PasswordField";
import { ScrollArea } from "./ui/ScrollArea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";
import { decrypt } from "@/lib/utils";
import type { User } from "next-auth";
import { Password } from "@/lib/validators/password";
import { PasswordContext } from "@/context/Password";

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
  }, [isSuccess]);

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
              <a className="hover:underline" href={password.website}>
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
