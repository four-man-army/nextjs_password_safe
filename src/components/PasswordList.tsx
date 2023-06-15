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
    <div>
      <Table>
        <TableHeader>
          <TableRow className="text-lg">
            <TableHead>Username</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Password</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {passwords.map((password) => (
            <TableRow key={password.id}>
              <TableCell>{password.username}</TableCell>
              <TableCell>{password.website}</TableCell>
              <TableCell><PasswordField password={password.password} /></TableCell>
            </TableRow>
        ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default List;
