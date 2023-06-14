import { z } from "zod";

export const passwordValidator = z.object({
    id: z.string(),
    website: z.string(),
    username: z.string(),
    password: z.string(),
})

export const passwordListValidator = z.array(passwordValidator);

export type Password = z.infer<typeof passwordValidator>;

