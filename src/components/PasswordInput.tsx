"use client";
import { FC, FormEvent, useContext, useState } from "react";
import Button from "./ui/Button";
import { Input } from "./ui/Input";
import { nanoid } from "nanoid";
import { Password, passwordValidator } from "@/lib/validators/password";
import axios from "axios";
import { PasswordContext } from "@/context/Password";
import { ZodError } from "zod";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

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
    mutate(data);
    };
    
    const {mutate, isLoading } = useMutation({
        mutationKey: ["addPassword"],
        mutationFn: async (data: Password) => { 
            setIsAdding(false);
            const validPassword = passwordValidator.parse(data);
            await axios.post("/api/passwords/add", validPassword);

        },
        onSuccess(_, password) {
            toast.success("Password added");
            add(password);
        },
        onError(error, password) { 
            if (error instanceof ZodError) {
                toast.error(error.issues[0].message);
            } else {
                toast.error("Something went wrong");
            }
            removePassword(password.id);
        }
    })

  const [isAdding, setIsAdding] = useState(false);
  if (isAdding)
    return (
      <div className="w-full mt-4">
        <form onSubmit={addPassword}>
          <div className="flex flex-row gap-2">
            <Input type="text" placeholder="Website" id="website" />
            <Input type="text" placeholder="Username" id="username" />
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
      <Button onClick={() => setIsAdding(true)} isLoading={isLoading} className="w-full">
        Add
      </Button>
    </div>
  );
};

export default PasswordInput;
