import { createContext } from "react";

export const PasswordContext = createContext({
    password: "",
    setPassword: (password: string) => { }
});