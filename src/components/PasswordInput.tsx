"use client";
import { trpc } from "@/app/_trpc/client";
import { PasswordContext } from "@/context/Password";
import { Password, passwordValidator } from "@/lib/validators/password";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { nanoid } from "nanoid";
import { FC, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import type { User } from "next-auth";
import { Button } from "@nextui-org/react";
import { Input } from "./ui/Input";
import { cn, encrypt } from "@/lib/utils";
import { buttonVariants } from "./ui/Button";

interface PasswordInputProps {
  user: User & {
    id: string;
    encryptKey: string;
  };
}

const PasswordInput: FC<PasswordInputProps> = ({ user }) => {
  const { addPassword: add, removePassword } = useContext(PasswordContext);

  const utils = trpc.useContext();

  const onSubmit = (password: Password) => {
    reset();
    add(password);
    setIsAdding(false);
    mutate({
      id: password.id,
      hashedPassword: encrypt(password, user.encryptKey),
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Password>({
    resolver: zodResolver(passwordValidator),
  });

  const { mutate, isLoading } = trpc.addPassword.useMutation({
    onSuccess() {
      toast.success("Password added");
    },
    onError(error, password) {
      toast.error(error.message);
      removePassword(password.id);
    },
  });

  const input: Variants = {
    show: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 },
    close: { opacity: 0 },
  };

  const closeButton: Variants = {
    show: { width: "100%" },
    hidden: { width: 0 },
    close: { width: 0, padding: 0 },
  };

  const [isAdding, setIsAdding] = useState(false);
  return (
    <AnimatePresence mode="wait">
      {isAdding ? (
        <div className="w-full mt-4" key="open">
          <form onSubmit={handleSubmit(onSubmit)}>
            <motion.div
              key="expand"
              variants={input}
              animate="show"
              initial="hidden"
              exit="close"
              className="flex flex-row gap-2 justify-between"
            >
              <Input
                {...register("username")}
                autoFocus
                type="text"
                placeholder="Username"
                id="username"
                error={errors.username?.message}
              />
              <Input
                {...register("website")}
                type="text"
                placeholder="Website"
                id="website"
                error={errors.website?.message}
              />
              <Input
                {...register("password")}
                type="text"
                placeholder="Password"
                id="password"
                error={errors.password?.message}
              />
              <input
                {...register("id")}
                type="hidden"
                value={nanoid()}
                id="id"
              />
            </motion.div>
            <motion.div
              className="flex flex-row gap-4 mt-4 w-full"
              exit={{ gap: 0 }}
            >
              <motion.div
                key="close"
                variants={closeButton}
                animate="show"
                initial="hidden"
                exit="close"
                className="w-full overflow-hidden"
              >
                <Button
                  type="reset"
                  color="danger"
                  onClick={() => setIsAdding(false)}
                  className={cn(buttonVariants({ variant: "error" }), "w-full")}
                >
                  <motion.p exit={{ x: -100 }}>Cancel</motion.p>
                </Button>
              </motion.div>
              <motion.div layout className="w-full" layoutId="1">
                <Button
                  type="submit"
                  color="primary"
                  isLoading={isLoading}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "w-full"
                  )}
                >
                  <motion.p layoutId="2">Add</motion.p>
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </div>
      ) : (
        <motion.div layout layoutId="1" className="w-full mt-4" key="closed">
          <Button
            type="submit"
            onClick={() => setIsAdding(true)}
            isLoading={isLoading}
            className={cn(buttonVariants({ variant: "default" }), "w-full")}
            color="primary"
          >
            <motion.p layoutId="2">Add</motion.p>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasswordInput;
