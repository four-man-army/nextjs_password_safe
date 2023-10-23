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
import Button from "./ui/Button";
import { Input } from "./ui/Input";

interface PasswordInputProps {}

const PasswordInput: FC<PasswordInputProps> = ({}) => {
  const { addPassword: add, removePassword } = useContext(PasswordContext);

  const onSubmit = (password: Password) => {
    reset();
    add(password);
    setIsAdding(false);
    mutate(password);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Password>({
    defaultValues: {
      id: nanoid(),
    },
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
            </motion.div>
            <motion.div className="flex flex-row gap-4 mt-4 w-full" exit={{gap:0}}>
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
                  variant="error"
                  onClick={() => setIsAdding(false)}
                  className="w-full"
                  onFocus={(e) => e.currentTarget.blur()}
                >
                  <motion.p exit={{x: -100}}>
                  Cancel
                  </motion.p>
                </Button>
              </motion.div>
              <motion.div className="w-full" layoutId="1">
                <Button type="submit" className="w-full">
                  <motion.p layoutId="2">Add</motion.p>
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </div>
      ) : (
        <motion.div layoutId="1" className="w-full mt-4" key="closed">
          <Button
            type="submit"
            onClick={() => setIsAdding(true)}
            isLoading={isLoading}
            className="w-full"
            >
            <motion.p layoutId="2">Add</motion.p>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasswordInput;
