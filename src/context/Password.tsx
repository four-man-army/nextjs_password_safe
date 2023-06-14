"use client";

import { Password } from "@/lib/validators/password";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export const PasswordContext = createContext<{
  passwords: Password[];
  setPasswords: Dispatch<SetStateAction<Password[]>>;
  addPassword: (password: Password) => void;
  removePassword: (id: string) => void;
}>({
  passwords: [],
  setPasswords: () => {},
  addPassword: () => {},
  removePassword: () => {},
});

export function PasswordProvider({ children }: { children: React.ReactNode }) {
  const [passwords, setPasswords] = useState<Password[]>([]);

  const addPassword = (password: Password) => {
    setPasswords([...passwords, password]);
  };

  const removePassword = (id: string) => {
    setPasswords(passwords.filter((password) => password.id !== id));
  };

  return (
    <PasswordContext.Provider
      value={{ passwords, setPasswords, addPassword, removePassword }}
    >
      {children}
    </PasswordContext.Provider>
  );
}
