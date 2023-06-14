import { Password } from "@/lib/validators/password";
import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";

interface ListProps {
  passwords: Password[];
}

const List: FC<ListProps> = ({ passwords }) => {
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
          <TableRow>
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
