import { z } from "zod";

export const LoginSchema = z.object({
    username: z
        .string({ message: "Username is required." })
        .min(3, { message: "The username must be longer than 3 characters." })
        .max(24, { message: "The username must be shorter than 24 characters." }),

    password: z
        .string({ message: "Password is required." })
        .min(6, { message: "The password must be longer than 6 characters." })
        .max(64, { message: "The password must be shorter than 64 characters." }),
});

export const RegisterSchema = z.object({
    email: z.email({ message: "Invalid email format" }),
    avatarUrl: z.url().optional(),
    ...LoginSchema.shape,
});

export type LoginDTO = z.infer<typeof LoginSchema>;
export type RegisterDTO = z.infer<typeof RegisterSchema>;