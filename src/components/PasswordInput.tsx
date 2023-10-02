"use client";
import { trpc } from "@/app/_trpc/client";
import { PasswordContext } from "@/context/Password";
import { Password } from "@/lib/validators/password";
import { nanoid } from "nanoid";
import { FC, FormEvent, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "./ui/Button";
import { Input } from "./ui/Input";

interface PasswordInputProps {}

interface FormElements extends HTMLFormControlsCollection {
  website: HTMLInputElement;
  username: HTMLInputElement;
  password: HTMLInputElement;
}

interface PasswordForm extends HTMLFormElement {
  readonly elements: FormElements;
}

const PasswordInput: FC<PasswordInputProps> = ({}) => {
  const { addPassword: add, removePassword } = useContext(PasswordContext);

  const addPassword = async (e: FormEvent<PasswordForm>) => {
    e.preventDefault();
    const data: Password = {
      id: nanoid(),
      website: (e.target as PasswordForm).elements.website.value,
      username: (e.target as PasswordForm).elements.username.value,
      password: (e.target as PasswordForm).elements.password.value,
    };
    add(data);
    mutate(data);
    setIsAdding(false)
  };

  const { mutate, isLoading} = trpc.addPassword.useMutation({
    onSuccess() { 
      toast.success("Password added");
    },
    onError(error, password) {
      toast.error(error.message);
      removePassword(password.id);
    },
  });

  const [isAdding, setIsAdding] = useState(false);
  if (isAdding)
    return (
      <div className="w-full mt-4">
        <form onSubmit={addPassword}>
          <div className="flex flex-row gap-2">
            <Input
              autoFocus
              type="text"
              placeholder="Username"
              id="username"
            />
            <Input type="text" placeholder="Website" id="website" />
            <Input type="text" placeholder="Password" id="password" />
          </div>
          <div className="flex flex-row gap-4 mt-4 w-full">
            <Button
              type="reset"
              variant="error"
              onClick={() => setIsAdding(false)}
              className="w-full"
            >
              Cancel
            </Button>
            <Button isLoading={isLoading} type="submit" className="w-full">
              Add
            </Button>
          </div>
        </form>
      </div>
    );
  return (
    <div className="w-full mt-4">
      <Button
        onClick={() => setIsAdding(true)}
        isLoading={isLoading}
        className="w-full"
      >
        Add
      </Button>
    </div>
  );
};

export default PasswordInput;
