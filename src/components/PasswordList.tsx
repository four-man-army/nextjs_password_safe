"use client";
import { Password } from "@/lib/validators/password";
import { FC, useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";
import { PasswordContext } from "@/context/Password";
import PasswordField from "./PasswordField";

interface ListProps {
  initialPasswords: Password[];
}

const List: FC<ListProps> = ({ initialPasswords }) => {
  const { passwords, setPasswords } = useContext(PasswordContext);
  
  useEffect(() => {
    setPasswords(initialPasswords);
  }, [initialPasswords]);

  if (passwords.length === 0) {
    return (
      <div>
        <p className="text-center text-2xl">No passwords found</p>
        <p className="text-center text-gray-700 text-sm">
          Go ahead and add your first password.
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="text-lg">
            <TableHead className="sm:px-4 px-2">Username</TableHead>
            <TableHead className="sm:px-4 px-2">Website</TableHead>
            <TableHead className="sm:px-4 px-2">Password</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {passwords.map((password) => (
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
    </div>
  );
};

export default List;
