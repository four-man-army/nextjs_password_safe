"use client";

import { FC, useContext, useRef, useState } from "react";
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
import { PasswordContext } from "@/context/Password";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { passwordValidator } from "@/lib/validators/password";
import { trpc } from "@/app/_trpc/client";

interface RemovePasswordProps {
  id: string;
}

const RemovePassword: FC<RemovePasswordProps> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { removePassword } = useContext(PasswordContext);

  const { mutate, isLoading} = trpc.removePassword.useMutation({
    onSuccess() {
      setOpen(false);
      toast.success("Password removed");
      removePassword(id);
    },
    onError(error) {
      setOpen(false);
      toast.error(error.message);
    },
  });
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger>
        <Trash2 className="cursor-pointer hover:text-red-500 transition-colors sm:w-6 w-4 duration-300" />
      </DialogTrigger>
      <DialogContent className="bg-white bottom-0 sm:bottom-auto">
        <DialogHeader>
          <DialogTitle>Remove Password</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove your password
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogPrimitive.Close>
            <Button className="w-full sm:w-auto mt-2 sm:mt-0">Cancel</Button>
          </DialogPrimitive.Close>
          <Button
            variant="error"
            onClick={() => mutate({id})}
            isLoading={isLoading}
          >
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemovePassword;
