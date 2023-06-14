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

interface ListProps {
  initialPasswords: Password[];
}

const List: FC<ListProps> = ({ initialPasswords }) => {
  const [passwords, setPasswords] = useState<Password[]>(initialPasswords);
    const { passwords: passwordsUpdater, setPasswords: setInitialPasswords } = useContext(PasswordContext);
    useEffect(() => {
      setInitialPasswords(initialPasswords);
    }, [initialPasswords]);
    useEffect(() => {
        setPasswords(passwordsUpdater);
  }, [passwordsUpdater]);
  if (passwords.length === 0) {
    return (
      <div>
        <p className="text-center text-2xl">No passwords found</p>
      </div>
    );
  }
  return (
    <div className="max-h-full overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow className="text-lg">
            <TableHead>Username</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Password</TableHead>
          </TableRow>
        </TableHeader>
        {passwords.map((password) => (
          <TableBody>
            <TableRow>
              <TableCell>{password.username}</TableCell>
              <TableCell>{password.website}</TableCell>
              <TableCell>{password.password}</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default List;
