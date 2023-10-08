import { z } from "zod";

export const passwordValidator = z.object({
    id: z.string().nonempty(),
    website: z.string().nonempty("Website is required"),
    username: z.string().nonempty("Username is required"),
    password: z.string().nonempty("Password is required"),
})

export const passwordListValidator = z.array(passwordValidator);

export type Password = z.infer<typeof passwordValidator>;

