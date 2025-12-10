import * as z from "zod";

export const RegisterSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "Username is required!" })
    .min(2, { message: "Username must be at least 2 characters!" }),
  name: z
    .string()
    .nonempty({ message: "Name is required!" })
    .min(2, { message: "Name must be at least 2 characters!" }),
  password: z
    .string()
    .nonempty({ message: "Password is required!" })
    .min(2, { message: "Password must be at least 2 characters!" }),
  confirmPassword: z
    .string()
    .nonempty({ message: "Confirm Password is required!" })
    .min(2, { message: "Confirm password must be at least 2 characters!" })
}).required();

export const LoginSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "Username is required!" })
    .min(2, { message: "Username must be at least 2 characters!" }),
  password: z
    .string()
    .nonempty({ message: "Password is required!" })
    .min(2, { message: "Password must be at least 2 characters!" }),
}).required();

export const postSchema = z.object({
  content: z
    .string()
    .nonempty({ message: "Content is required!" })
    .min(2, { message: "Content must be at least 2 characters!" }),
}).required();
