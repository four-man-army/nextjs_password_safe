"use client";

import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Trash2 } from "lucide-react";
import Button from "./ui/Button";

interface RemovePasswordProps {
    id: string;
}

const RemovePassword: FC<RemovePasswordProps> = ({ id }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Trash2 />
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Remove Password</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove your password
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogPrimitive.Close>
            <Button>Cancel</Button>
          </DialogPrimitive.Close>
          <Button variant="error">Remove</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemovePassword;
