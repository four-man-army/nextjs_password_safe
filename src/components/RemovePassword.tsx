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

interface RemovePasswordProps {
  id: string;
}

const RemovePassword: FC<RemovePasswordProps> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { getPassword, removePassword } = useContext(PasswordContext);

  const { mutate, isLoading } = useMutation({
    mutationKey: ["removePassword"],
    mutationFn: async (id: string) => {
      const password = getPassword(id);
        if (!password) return new Error("no password found");
      await axios.post("/api/passwords/remove", password);
    },
    onSuccess() {
      setOpen(false);
      toast.success("Password removed");
      removePassword(id);
    },
    onError(error) {
      setOpen(false);
      toast.error((error as Error).message);
    },
  });
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
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
          <Button
            variant="error"
            onClick={() => mutate(id)}
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
